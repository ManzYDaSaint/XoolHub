// Teacher/Administrator Telegram Bot for Conversation Management
// Handles conversation requests from parents and allows teachers/admins to respond

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const db = require('../database/mysql.js');

// ------------------------------- CONFIG ---------------------------------

const BOT_TOKEN = process.env.TELEGRAM_TEACHER_BOT_TOKEN;
const AUTO_START = (process.env.AUTO_START_TELEGRAM_TEACHER_BOT || 'true').toLowerCase() !== 'false';
const SESSION_FILE = path.join(__dirname, 'teacherSessions.json');

// Session lifetime (ms) before treated as stale
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

// ------------------------------- UTILITIES ---------------------------------

function nowTs() {
  return Date.now();
}

// ------------------------------- SESSIONS ---------------------------------

/**
 * Lightweight persisted sessions: Map<chatId, Session>
 * Session: { chatId, userId, userType, name, schoolId, createdAt, lastActive, expiresAt }
 */
const sessions = new Map();
let savePending = false;

function loadSessions() {
  try {
    if (fs.existsSync(SESSION_FILE)) {
      const raw = fs.readFileSync(SESSION_FILE, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        for (const s of data) {
          sessions.set(String(s.chatId), s);
        }
      }
    }
  } catch (err) {
    console.error('[TeacherBot] Failed to load sessions:', err.message);
  }
}

function saveSessions() {
  if (savePending) return; // debounce writes
  savePending = true;
  setTimeout(() => {
    try {
      const arr = Array.from(sessions.values());
      fs.writeFileSync(SESSION_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (err) {
      console.error('[TeacherBot] Failed to save sessions:', err.message);
    } finally {
      savePending = false;
    }
  }, 200);
}

function upsertSession(chatId, patch) {
  const id = String(chatId);
  const prev = sessions.get(id) || {};
  const now = nowTs();
  const merged = {
    chatId: id,
    createdAt: prev.createdAt || now,
    lastActive: now,
    expiresAt: now + SESSION_TTL_MS,
    ...prev,
    ...patch,
  };
  sessions.set(id, merged);
  saveSessions();
  return merged;
}

function getSession(chatId) {
  const s = sessions.get(String(chatId));
  if (!s) return null;
  if (s.expiresAt && s.expiresAt < nowTs()) {
    sessions.delete(String(chatId));
    saveSessions();
    return null;
  }
  return s;
}

function removeSession(chatId) {
  sessions.delete(String(chatId));
  saveSessions();
}

// ------------------------------- DATABASE FUNCTIONS ---------------------------------

/**
 * Get conversation requests for a teacher/administrator
 */
async function getConversationRequests(userId, userType) {
  try {
    const [rows] = await db.query(`
      SELECT cr.*, s.name as student_name, p.name as parent_name
      FROM conversation_requests cr
      INNER JOIN students s ON s.id = cr.student_id
      INNER JOIN parents p ON p.contact = cr.parent_id
      WHERE cr.recipient_id = ? AND cr.recipient_type = ? AND cr.status = 'pending'
      ORDER BY cr.created_at DESC
    `, [userId, userType]);
    return rows;
  } catch (err) {
    console.error('[TeacherBot] getConversationRequests error:', err);
    return [];
  }
}

/**
 * Get conversation request by ID
 */
async function getConversationRequest(requestId) {
  try {
    const [rows] = await db.query(`
      SELECT * FROM conversation_requests WHERE id = ?
    `, [requestId]);
    return rows[0] || null;
  } catch (err) {
    console.error('[TeacherBot] getConversationRequest error:', err);
    return null;
  }
}

/**
 * Update conversation request status
 */
async function updateConversationRequestStatus(requestId, status) {
  try {
    await db.query(`
      UPDATE conversation_requests 
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `, [status, requestId]);
    return true;
  } catch (err) {
    console.error('[TeacherBot] updateConversationRequestStatus error:', err);
    return false;
  }
}

/**
 * Create a new conversation
 */
async function createConversation(requestId, parentId, recipientId, recipientType) {
  try {
    const [result] = await db.query(`
      INSERT INTO conversations 
      (request_id, parent_id, recipient_id, recipient_type, status, created_at)
      VALUES (?, ?, ?, ?, 'active', NOW())
    `, [requestId, parentId, recipientId, recipientType]);
    return result.insertId;
  } catch (err) {
    console.error('[TeacherBot] createConversation error:', err);
    return null;
  }
}

/**
 * Add message to conversation
 */
async function addConversationMessage(conversationId, senderId, senderType, message) {
  try {
    const [result] = await db.query(`
      INSERT INTO conversation_messages 
      (conversation_id, sender_id, sender_type, message, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `, [conversationId, senderId, senderType, message]);
    return result.insertId;
  } catch (err) {
    console.error('[TeacherBot] addConversationMessage error:', err);
    return null;
  }
}

/**
 * Get conversation messages
 */
async function getConversationMessages(conversationId) {
  try {
    const [rows] = await db.query(`
      SELECT * FROM conversation_messages 
      WHERE conversation_id = ?
      ORDER BY created_at ASC
    `, [conversationId]);
    return rows;
  } catch (err) {
    console.error('[TeacherBot] getConversationMessages error:', err);
    return [];
  }
}

/**
 * Close conversation
 */
async function closeConversation(conversationId) {
  try {
    await db.query(`
      UPDATE conversations 
      SET status = 'closed', closed_at = NOW()
      WHERE id = ?
    `, [conversationId]);
    return true;
  } catch (err) {
    console.error('[TeacherBot] closeConversation error:', err);
    return false;
  }
}

/**
 * Get active conversations for a user
 */
async function getActiveConversations(userId, userType) {
  try {
    const [rows] = await db.query(`
      SELECT c.*, cr.message as initial_message, s.name as student_name
      FROM conversations c
      INNER JOIN conversation_requests cr ON cr.id = c.request_id
      INNER JOIN students s ON s.id = cr.student_id
      WHERE c.recipient_id = ? AND c.recipient_type = ? AND c.status = 'active'
      ORDER BY c.created_at DESC
    `, [userId, userType]);
    return rows;
  } catch (err) {
    console.error('[TeacherBot] getActiveConversations error:', err);
    return [];
  }
}

/**
 * Get classes assigned to a teacher
 */
async function getTeacherClasses(teacherId) {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.name, c.sid
      FROM classteacher ct
      INNER JOIN class c ON c.id = ct.classid
      WHERE ct.teacherid = ?
      ORDER BY c.name ASC
    `, [teacherId]);
    return rows;
  } catch (err) {
    console.error('[TeacherBot] getTeacherClasses error:', err);
    return [];
  }
}

/**
 * Get students in a class
 */
async function getClassStudents(classId) {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.name, s.contact, s.gender
      FROM students s
      INNER JOIN history h ON h.studentid = s.id
      WHERE h.classid = ? AND h.status = 'Active'
      ORDER BY s.name ASC
    `, [classId]);
    return rows;
  } catch (err) {
    console.error('[TeacherBot] getClassStudents error:', err);
    return [];
  }
}

/**
 * Check if attendance already exists for a class on a given date
 */
async function checkAttendanceExists(classId, date) {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) as count
      FROM attendance a
      INNER JOIN history h ON h.studentid = a.studentid
      WHERE h.classid = ? AND DATE(a.date) = ?
      LIMIT 1
    `, [classId, date]);
    return rows[0].count > 0;
  } catch (err) {
    console.error('[TeacherBot] checkAttendanceExists error:', err);
    return false;
  }
}

/**
 * Mark student attendance
 */
async function markStudentAttendance(studentId, date, status, note = null) {
  try {
    // Check if attendance already exists for this student on this date
    const [existing] = await db.query(`
      SELECT id FROM attendance 
      WHERE studentid = ? AND DATE(date) = ?
    `, [studentId, date]);

    if (existing.length > 0) {
      // Update existing attendance
      await db.query(`
        UPDATE attendance 
        SET status = ?, note = ?, updated_at = NOW()
        WHERE studentid = ? AND DATE(date) = ?
      `, [status, note, studentId, date]);
    } else {
      // Insert new attendance
      await db.query(`
        INSERT INTO attendance (studentid, date, status, note, created_at)
        VALUES (?, ?, ?, ?, NOW())
      `, [studentId, date, status, note]);
    }
    return true;
  } catch (err) {
    console.error('[TeacherBot] markStudentAttendance error:', err);
    return false;
  }
}

/**
 * Get attendance summary for a class on a given date
 */
async function getAttendanceSummary(classId, date) {
  try {
    const [rows] = await db.query(`
      SELECT 
        COUNT(CASE WHEN a.status = 'Present' THEN 1 END) as present,
        COUNT(CASE WHEN a.status = 'Absent' THEN 1 END) as absent,
        COUNT(CASE WHEN a.status = 'Late' THEN 1 END) as late,
        COUNT(*) as total
      FROM attendance a
      INNER JOIN history h ON h.studentid = a.studentid
      WHERE h.classid = ? AND DATE(a.date) = ?
    `, [classId, date]);
    return rows[0] || { present: 0, absent: 0, late: 0, total: 0 };
  } catch (err) {
    console.error('[TeacherBot] getAttendanceSummary error:', err);
    return { present: 0, absent: 0, late: 0, total: 0 };
  }
}

// ------------------------------- BOT HANDLERS ---------------------------------

let bot = null;

async function handleStart(msg) {
  const chatId = msg.chat.id;
  const text = `Welcome to XoolHub Teacher/Administrator Portal!\n\nPlease log in to manage conversation requests from parents.`;

  const keyboard = {
    keyboard: [
      [{ text: 'Login as Teacher' }, { text: 'Login as Administrator' }],
      [{ text: 'Help' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };

  await bot.sendMessage(chatId, text, { reply_markup: keyboard });
}

async function handleHelp(msg) {
  const chatId = msg.chat.id;
  const help = [
    '*Available Commands*',
    '/start — Show welcome and login options',
    '/help — Show this help',
    '/login — Login options',
    '/requests — View pending conversation requests',
    '/conversations — View active conversations',
    '/logout — Disconnect this chat',
  ].join('\n');

  await bot.sendMessage(chatId, help, { parse_mode: 'Markdown' });
}

async function handleLoginTeacher(msg) {
  const chatId = msg.chat.id;
  const keyboard = {
    keyboard: [
      [{ text: 'Enter Teacher ID' }],
      [{ text: 'Cancel' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
  upsertSession(chatId, { expectingTeacherId: true });
  await bot.sendMessage(chatId, 'Please enter your Teacher ID:', { reply_markup: keyboard });
}

async function handleLoginAdministrator(msg) {
  const chatId = msg.chat.id;
  const keyboard = {
    keyboard: [
      [{ text: 'Enter Administrator ID' }],
      [{ text: 'Cancel' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
  upsertSession(chatId, { expectingAdminId: true });
  await bot.sendMessage(chatId, 'Please enter your Administrator ID:', { reply_markup: keyboard });
}

async function handleRequests(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.userId || !s.userType) {
    return bot.sendMessage(chatId, 'You are not logged in. Please login first.');
  }

  try {
    const requests = await getConversationRequests(s.userId, s.userType);
    if (requests.length === 0) {
      return bot.sendMessage(chatId, 'No pending conversation requests.');
    }

    for (const request of requests.slice(0, 10)) { // Limit to 10 requests
      const keyboard = {
        inline_keyboard: [
          [
            { text: 'Accept', callback_data: `conv:accept:${request.id}` },
            { text: 'Reject', callback_data: `conv:reject:${request.id}` },
          ],
        ],
      };

      const text = `*Conversation Request*\n\nFrom: ${request.parent_name}\nStudent: ${request.student_name}\nMessage: ${request.message}\n\nCreated: ${request.created_at}`;
      await bot.sendMessage(chatId, text, { 
        parse_mode: 'Markdown',
        reply_markup: keyboard 
      });
    }
  } catch (err) {
    console.error('[TeacherBot] handleRequests error:', err);
    await bot.sendMessage(chatId, 'Failed to load requests. Please try again later.');
  }
}

async function handleConversations(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.userId || !s.userType) {
    return bot.sendMessage(chatId, 'You are not logged in. Please login first.');
  }

  try {
    const conversations = await getActiveConversations(s.userId, s.userType);
    if (conversations.length === 0) {
      return bot.sendMessage(chatId, 'No active conversations.');
    }

    for (const conv of conversations.slice(0, 10)) { // Limit to 10 conversations
      const keyboard = {
        inline_keyboard: [
          [
            { text: 'View Messages', callback_data: `conv:view:${conv.id}` },
            { text: 'Close', callback_data: `conv:close:${conv.id}` },
          ],
        ],
      };

      const text = `*Active Conversation*\n\nStudent: ${conv.student_name}\nInitial Message: ${conv.initial_message}\n\nStarted: ${conv.created_at}`;
      await bot.sendMessage(chatId, text, { 
        parse_mode: 'Markdown',
        reply_markup: keyboard 
      });
    }
  } catch (err) {
    console.error('[TeacherBot] handleConversations error:', err);
    await bot.sendMessage(chatId, 'Failed to load conversations. Please try again later.');
  }
}

async function handleLogout(msg) {
  const chatId = msg.chat.id;
  removeSession(chatId);
  await bot.sendMessage(chatId, 'You have been logged out. Use /start to login again.', {
    reply_markup: { remove_keyboard: true },
  });
}

async function handleTextButtons(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim().toLowerCase();
  
  if (text === 'help') return handleHelp(msg);
  if (text === 'login as teacher') return handleLoginTeacher(msg);
  if (text === 'login as administrator') return handleLoginAdministrator(msg);
  if (text === 'requests') return handleRequests(msg);
  if (text === 'conversations') return handleConversations(msg);
  if (text === 'attendance') return handleAttendance(msg);
  if (text === 'mark another class') return handleAttendance(msg);
  if (text === 'main menu') return handleStart(msg);
  if (text === 'logout') return handleLogout(msg);

  // Handle login ID entry
  const s = getSession(chatId);
  if (s && s.expectingTeacherId) {
    return handleTeacherIdEntry(msg);
  }
  if (s && s.expectingAdminId) {
    return handleAdminIdEntry(msg);
  }

  // Handle conversation messages
  if (s && s.activeConversation) {
    return handleConversationMessage(msg);
  }

  // Handle attendance marking
  if (s && s.markingAttendance) {
    return handleAttendanceMarking(msg);
  }

  // Handle cancel
  if (text === 'cancel') {
    upsertSession(chatId, { 
      expectingTeacherId: false, 
      expectingAdminId: false,
      markingAttendance: null
    });
    return handleStart(msg);
  }
}

async function handleTeacherIdEntry(msg) {
  const chatId = msg.chat.id;
  const teacherId = msg.text;

  try {
    const [rows] = await db.query('SELECT id, name, sid FROM teachers WHERE id = ?', [teacherId]);
    const teacher = rows[0];
    
    if (!teacher) {
      return bot.sendMessage(chatId, 'Teacher ID not found. Please try again or contact administration.');
    }

    upsertSession(chatId, {
      userId: teacher.id,
      userType: 'teacher',
      name: teacher.name,
      schoolId: teacher.sid,
      expectingTeacherId: false
    });

    const menu = {
      keyboard: [
        [{ text: 'Requests' }, { text: 'Conversations' }],
        [{ text: 'Attendance' }, { text: 'Logout' }],
      ],
      resize_keyboard: true,
    };

    await bot.sendMessage(chatId, `Logged in as ${teacher.name} (Teacher).`, { reply_markup: menu });
  } catch (err) {
    console.error('[TeacherBot] teacher login error:', err);
    await bot.sendMessage(chatId, 'Login failed. Please try again later.');
  }
}

async function handleAdminIdEntry(msg) {
  const chatId = msg.chat.id;
  const adminId = msg.text;

  try {
    const [rows] = await db.query('SELECT id, name, sid FROM administrator WHERE id = ?', [adminId]);
    const admin = rows[0];
    
    if (!admin) {
      return bot.sendMessage(chatId, 'Administrator ID not found. Please try again or contact administration.');
    }

    upsertSession(chatId, {
      userId: admin.id,
      userType: 'administrator',
      name: admin.name,
      schoolId: admin.sid,
      expectingAdminId: false
    });

    const menu = {
      keyboard: [
        [{ text: 'Requests' }, { text: 'Conversations' }],
        [{ text: 'Attendance' }, { text: 'Logout' }],
      ],
      resize_keyboard: true,
    };

    await bot.sendMessage(chatId, `Logged in as ${admin.name} (Administrator).`, { reply_markup: menu });
  } catch (err) {
    console.error('[TeacherBot] admin login error:', err);
    await bot.sendMessage(chatId, 'Login failed. Please try again later.');
  }
}

async function handleConversationMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const s = getSession(chatId);

  if (!s || !s.activeConversation) {
    return bot.sendMessage(chatId, 'No active conversation. Please start a new conversation.');
  }

  if (text.toLowerCase() === 'close conversation') {
    await closeConversation(s.activeConversation.id);
    upsertSession(chatId, { activeConversation: null });
    await bot.sendMessage(chatId, 'Conversation closed.', { reply_markup: { remove_keyboard: true } });
    return handleConversations(msg);
  }

  // Add message to conversation
  const messageId = await addConversationMessage(
    s.activeConversation.id,
    chatId,
    s.userType,
    text
  );

  if (messageId) {
    // Send message to parent
    const { sendParentTelegramNotification } = require('./parentTelegramBot.js');
    await sendParentTelegramNotification({
      chatId: s.activeConversation.parentId,
      message: `${s.userType === 'teacher' ? 'Teacher' : 'Administrator'} message: ${text}`
    });
    
    await bot.sendMessage(chatId, `Message sent: ${text}`);
  }
}

async function handleAttendance(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  
  if (!s || !s.userId || s.userType !== 'teacher') {
    return bot.sendMessage(chatId, 'Only teachers can mark attendance. Please login as a teacher.');
  }

  try {
    const classes = await getTeacherClasses(s.userId);
    if (classes.length === 0) {
      return bot.sendMessage(chatId, 'No classes assigned to you. Please contact administration.');
    }

    const keyboard = {
      inline_keyboard: classes.map(c => ([
        { text: c.name, callback_data: `attendance:class:${c.id}` }
      ]))
    };

    await bot.sendMessage(chatId, 
      '📊 **Attendance Management**\n\nSelect a class to mark attendance:', 
      { 
        parse_mode: 'Markdown',
        reply_markup: keyboard 
      }
    );
  } catch (err) {
    console.error('[TeacherBot] handleAttendance error:', err);
    await bot.sendMessage(chatId, 'Failed to load classes. Please try again later.');
  }
}

async function handleAttendanceMarking(msg) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const s = getSession(chatId);

  if (!s || !s.markingAttendance) {
    return bot.sendMessage(chatId, 'No active attendance session.');
  }

  const attendance = s.markingAttendance;

  if (text.toLowerCase() === 'finish' || text.toLowerCase() === 'done') {
    // Finish attendance marking
    const summary = await getAttendanceSummary(attendance.classId, attendance.date);
    const keyboard = {
      keyboard: [
        [{ text: 'Mark Another Class' }, { text: 'Main Menu' }],
      ],
      resize_keyboard: true,
    };

    await bot.sendMessage(chatId, 
      `✅ **Attendance Complete!**\n\n📊 **Summary for ${attendance.className}**\n📅 Date: ${attendance.date}\n\n✅ Present: ${summary.present}\n❌ Absent: ${summary.absent}\n⚠️ Late: ${summary.late}\n📝 Total: ${summary.total}`, 
      { 
        parse_mode: 'Markdown',
        reply_markup: keyboard 
      }
    );

    upsertSession(chatId, { markingAttendance: null });
    return;
  }

  if (text.toLowerCase() === 'cancel') {
    upsertSession(chatId, { markingAttendance: null });
    return handleAttendance(msg);
  }

  // Handle student attendance marking
  const parts = text.split(' ');
  if (parts.length < 2) {
    await bot.sendMessage(chatId, 
      '❌ **Invalid format!**\n\nUse: `[Student Number] [Status]`\n\n**Examples:**\n`1 present` - Mark student #1 as present\n`3 absent` - Mark student #3 as absent\n`5 late` - Mark student #5 as late\n\n**Status options:** present, absent, late\n\nType `finish` when done or `cancel` to stop.',
      { parse_mode: 'Markdown' }
    );
    return;
  }

  const studentNumber = parseInt(parts[0]);
  const status = parts[1].toLowerCase();

  if (isNaN(studentNumber) || studentNumber < 1 || studentNumber > attendance.students.length) {
    await bot.sendMessage(chatId, `❌ Invalid student number. Please use 1-${attendance.students.length}`);
    return;
  }

  if (!['present', 'absent', 'late'].includes(status)) {
    await bot.sendMessage(chatId, '❌ Invalid status. Use: present, absent, or late');
    return;
  }

  const student = attendance.students[studentNumber - 1];
  const note = parts.slice(2).join(' ') || null;

  const success = await markStudentAttendance(student.id, attendance.date, status.charAt(0).toUpperCase() + status.slice(1), note);
  
  if (success) {
    const statusEmoji = status === 'present' ? '✅' : status === 'absent' ? '❌' : '⚠️';
    await bot.sendMessage(chatId, `${statusEmoji} **${student.name}** marked as **${status}**`);
  } else {
    await bot.sendMessage(chatId, '❌ Failed to mark attendance. Please try again.');
  }
}

async function handleCallbackQuery(query) {
  try {
    const chatId = query.message && query.message.chat && query.message.chat.id;
    if (!chatId) return;
    const data = String(query.data || '');
    const s = getSession(chatId);
    if (!s) return bot.answerCallbackQuery(query.id, { text: 'Session expired, use /start', show_alert: true });

    // Conversation callbacks
    if (data.startsWith('conv:')) {
      await processConversationCallback(chatId, data, query.id);
      return;
    }

    // Attendance callbacks
    if (data.startsWith('attendance:')) {
      await processAttendanceCallback(chatId, data, query.id);
      return;
    }
  } catch (e) {
    console.error('[TeacherBot] callback error:', e);
  }
}

async function processConversationCallback(chatId, data, callbackId) {
  try {
    const s = getSession(chatId);
    if (!s) return bot.answerCallbackQuery(callbackId, { text: 'Session expired. Use /start again.' });

    const m = data.match(/^conv:(accept|reject|close|view):(\d+)$/);
    if (!m) return bot.answerCallbackQuery(callbackId);
    
    const action = m[1];
    const id = Number(m[2]);
    
    if (action === 'accept' || action === 'reject') {
      const request = await getConversationRequest(id);
      if (!request) {
        return bot.answerCallbackQuery(callbackId, { text: 'Request not found', show_alert: true });
      }

      if (action === 'accept') {
        await updateConversationRequestStatus(id, 'accepted');
        const conversationId = await createConversation(id, request.parent_id, request.recipient_id, request.recipient_type);
        
        if (conversationId) {
          upsertSession(chatId, { 
            activeConversation: {
              id: conversationId,
              requestId: id,
              parentId: request.parent_id,
              recipientType: request.recipient_type
            }
          });

          const keyboard = {
            keyboard: [
              [{ text: 'Close Conversation' }],
            ],
            resize_keyboard: true,
          };

          await bot.sendMessage(chatId, 
            `Conversation started with parent. You can now exchange messages.\n\nType "Close Conversation" to end the conversation.`, 
            { reply_markup: keyboard }
          );
        }
      } else {
        await updateConversationRequestStatus(id, 'rejected');
        await bot.sendMessage(chatId, 'Conversation request rejected.');
      }
    } else if (action === 'close') {
      const s = getSession(chatId);
      if (s && s.activeConversation) {
        await closeConversation(s.activeConversation.id);
        upsertSession(chatId, { activeConversation: null });
        await bot.sendMessage(chatId, 'Conversation closed.', { reply_markup: { remove_keyboard: true } });
      }
    } else if (action === 'view') {
      const messages = await getConversationMessages(id);
      if (messages.length === 0) {
        await bot.sendMessage(chatId, 'No messages in this conversation.');
      } else {
        const messageText = messages.map(m => `${m.sender_type}: ${m.message}`).join('\n\n');
        await bot.sendMessage(chatId, `Conversation messages:\n\n${messageText}`);
      }
    }

    await bot.answerCallbackQuery(callbackId, { text: `${action} successful` });
  } catch (err) {
    console.error('[TeacherBot] conversation callback error:', err);
    await bot.answerCallbackQuery(callbackId, { text: 'Error processing request', show_alert: true });
  }
}

async function processAttendanceCallback(chatId, data, callbackId) {
  try {
    const s = getSession(chatId);
    if (!s) return bot.answerCallbackQuery(callbackId, { text: 'Session expired. Use /start again.' });

    const m = data.match(/^attendance:class:(\d+)$/);
    if (!m) return bot.answerCallbackQuery(callbackId);
    
    const classId = Number(m[1]);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Get class details
    const classes = await getTeacherClasses(s.userId);
    const selectedClass = classes.find(c => c.id === classId);
    
    if (!selectedClass) {
      return bot.answerCallbackQuery(callbackId, { text: 'Class not found', show_alert: true });
    }

    // Get students in the class
    const students = await getClassStudents(classId);
    if (students.length === 0) {
      return bot.answerCallbackQuery(callbackId, { text: 'No students found in this class', show_alert: true });
    }

    // Check if attendance already exists
    const attendanceExists = await checkAttendanceExists(classId, today);
    
    // Store attendance session
    upsertSession(chatId, {
      markingAttendance: {
        classId,
        className: selectedClass.name,
        date: today,
        students,
        attendanceExists
      }
    });

    // Create student list message
    let studentList = `📊 **Attendance for ${selectedClass.name}**\n📅 Date: ${today}\n\n`;
    
    students.forEach((student, index) => {
      const number = index + 1;
      studentList += `${number}. ${student.name}\n`;
    });

    studentList += `\n**Instructions:**\nUse: \`[Number] [Status]\`\n\n**Examples:**\n\`1 present\` - Mark student #1 as present\n\`3 absent\` - Mark student #3 as absent\n\`5 late\` - Mark student #5 as late\n\n**Status options:** present, absent, late\n\nType \`finish\` when done or \`cancel\` to stop.`;

    if (attendanceExists) {
      studentList += `\n\n⚠️ **Note:** Attendance for today already exists. You can update individual records.`;
    }

    const keyboard = {
      keyboard: [
        [{ text: 'Cancel' }],
      ],
      resize_keyboard: true,
    };

    await bot.sendMessage(chatId, studentList, { 
      parse_mode: 'Markdown',
      reply_markup: keyboard 
    });

    await bot.answerCallbackQuery(callbackId, { text: 'Attendance session started' });
  } catch (err) {
    console.error('[TeacherBot] attendance callback error:', err);
    await bot.answerCallbackQuery(callbackId, { text: 'Error starting attendance session', show_alert: true });
  }
}

// ------------------------------- STARTUP ---------------------------------

function initTeacherTelegramBot(options = {}) {
  if (bot) return bot;
  if (!BOT_TOKEN) {
    console.warn('[TeacherBot] No TELEGRAM_TEACHER_BOT_TOKEN provided; bot not started.');
    return null;
  }

  loadSessions();

  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('[TeacherBot] Bot started (polling).');

  bot.onText(/^\/start(?:@[\w_]+)?(?:\s+.*)?$/, handleStart);
  bot.onText(/^\/help$/, handleHelp);
  bot.onText(/^\/requests$/, handleRequests);
  bot.onText(/^\/conversations$/, handleConversations);
  bot.onText(/^\/logout$/, handleLogout);

  bot.on('message', async (msg) => {
    // keep sessions fresh
    const s = getSession(msg.chat.id);
    if (s) upsertSession(msg.chat.id, {});
  });

  bot.on('text', handleTextButtons);
  bot.on('callback_query', handleCallbackQuery);

  return bot;
}

// ------------------------------- NOTIFICATIONS ---------------------------------

/**
 * Send a notification to a teacher/administrator by their ID
 */
async function sendTeacherTelegramNotification({ userId, userType, message }) {
  if (!bot) initTeacherTelegramBot();
  if (!bot) throw new Error('Teacher Telegram bot is not running');
  if (!message || !message.trim()) return false;

  // Find chat IDs for this user
  const targets = [];
  for (const s of sessions.values()) {
    if (s.userId === userId && s.userType === userType) {
      targets.push(s.chatId);
    }
  }

  if (targets.length === 0) return false;

  const text = message.trim();
  const promises = [];
  for (const id of targets) {
    promises.push(bot.sendMessage(id, text).catch((e) => {
      console.error('[TeacherBot] send notification error:', e.message);
    }));
  }
  await Promise.all(promises);
  return true;
}

module.exports = {
  initTeacherTelegramBot,
  sendTeacherTelegramNotification,
};

// Auto-start if env flag is enabled
if (AUTO_START && BOT_TOKEN) {
  initTeacherTelegramBot();
}
