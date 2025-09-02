// Parent Telegram Bot for Parent Portal (School Management)
// Uses node-telegram-bot-api (long polling) with lightweight session storage
// Exposes helpers to send notifications to logged-in parents by phone or chatId

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const db = require('../database/mysql.js');

const {
  getStudentNameByContact,
  getFeeBalance,
  getEvents,
} = require('../model/apiModel.js');


// ------------------------------- CONFIG ---------------------------------

const BOT_TOKEN = process.env.TELEGRAM_PARENT_BOT_TOKEN;
const AUTO_START = (process.env.AUTO_START_TELEGRAM_PARENT_BOT || 'true').toLowerCase() !== 'false';
const SESSION_FILE = path.join(__dirname, 'parentSessions.json');

// Session lifetime (ms) before treated as stale (parent can log back in easily)
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days


// ------------------------------- UTILITIES ---------------------------------

function nowTs() {
  return Date.now();
}

function normalizePhone(raw) {
  if (!raw) return '';
  let p = String(raw).trim();
  // Keep only digits, keep leading +
  p = p.replace(/[^\d+]/g, '');
  // Common normalization: ensure country code prefix if missing
  // If starts with 0 and you want +265 style for Malawi, adapt as needed by school country
  // We will leave as-is except stripping spaces/symbols, since DB stores exact contact
  return p;
}

function formatEvent(e) {
  const date = e.date ? `${e.date}` : '';
  const time = e.time ? ` at ${e.time}` : '';
  const loc = e.location ? `\nLocation: ${e.location}` : '';
  const desc = e.description ? `\n${e.description}` : '';
  return `• ${e.title || 'School Event'}${date ? ` — ${date}` : ''}${time}${loc}${desc}`;
}


// ------------------------------- CONVERSATION FUNCTIONS ---------------------------------

/**
 * Get student's class teacher information
 */
async function getStudentClassTeacher(studentId) {
  try {
    const [rows] = await db.query(`
      SELECT t.id, t.name, t.contact, t.email, c.name as className
      FROM classteacher ct
      INNER JOIN teachers t ON t.id = ct.teacherid
      INNER JOIN class c ON c.id = ct.classid
      INNER JOIN history h ON h.classid = ct.classid
      WHERE h.studentid = ? AND h.status = 'Active'
      LIMIT 1
    `, [studentId]);
    return rows[0] || null;
  } catch (err) {
    console.error('[ParentBot] getStudentClassTeacher error:', err);
    return null;
  }
}

/**
 * Get school administrator information
 */
async function getSchoolAdministrator(schoolId) {
  try {
    const [rows] = await db.query(`
      SELECT id, name, contact, email
      FROM administrator
      WHERE sid = ?
      LIMIT 1
    `, [schoolId]);
    return rows[0] || null;
  } catch (err) {
    console.error('[ParentBot] getSchoolAdministrator error:', err);
    return null;
  }
}

/**
 * Create a new conversation request
 */
async function createConversationRequest(parentId, recipientId, recipientType, studentId, schoolId, message) {
  try {
    const [result] = await db.query(`
      INSERT INTO conversation_requests 
      (parent_id, recipient_id, recipient_type, student_id, school_id, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())
    `, [parentId, recipientId, recipientType, studentId, schoolId, message]);
    return result.insertId;
  } catch (err) {
    console.error('[ParentBot] createConversationRequest error:', err);
    return null;
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
    console.error('[ParentBot] getConversationRequest error:', err);
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
    console.error('[ParentBot] updateConversationRequestStatus error:', err);
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
    console.error('[ParentBot] createConversation error:', err);
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
    console.error('[ParentBot] addConversationMessage error:', err);
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
    console.error('[ParentBot] getConversationMessages error:', err);
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
    console.error('[ParentBot] closeConversation error:', err);
    return false;
  }
}


// ------------------------------- SESSIONS ---------------------------------

/**
 * Lightweight persisted sessions: Map<chatId, Session>
 * Session: { chatId, phone, studentName, sid, createdAt, lastActive, expiresAt }
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
    console.error('[ParentBot] Failed to load sessions:', err.message);
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
      console.error('[ParentBot] Failed to save sessions:', err.message);
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

// Reverse lookup: phone -> chatId(s)
function findChatIdsByPhone(phone) {
  const normalized = normalizePhone(phone);
  const res = [];
  for (const s of sessions.values()) {
    if (normalizePhone(s.phone) === normalized) res.push(s.chatId);
  }
  return res;
}


// ------------------------------- BOT CORE ---------------------------------

let bot = null;

async function handleStart(msg) {
  const chatId = msg.chat.id;
  const text = `Welcome to XoolHub Parent Portal Bot!\n\nUse the menu or type /help to see features.\n\nTo get started, please log in with your phone number (the one registered at school).`;

  const keyboard = {
    keyboard: [
      [{ text: 'Login with my phone number', request_contact: true }],
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
    '/start — Show welcome and login keyboard',
    '/help — Show this help',
    '/login — Log in using your phone number',
    '/me — Show linked student info',
    '/fees — Show current term fee balance',
    '/events — Show recent school events (requires linked school ID)',
    '/linkschool <SCHOOL_ID> — Link your school to receive events',
    '/settings — Notification preferences',
    '/menu — Restore main menu',
    '/unsubscribe — Turn off all notifications',
    '/results — View student results (select term/type/class)',
    '/attendance — Recent attendance (if available)',
    '/discipline — Recent disciplinary records (if available)',
    '/logout — Disconnect this chat',
  ].join('\n');

  await bot.sendMessage(chatId, help, { parse_mode: 'Markdown' });
}

async function handleLogin(msg) {
  const chatId = msg.chat.id;
  const keyboard = {
    keyboard: [
      [{ text: 'Share my phone number', request_contact: true }],
      [{ text: 'Cancel' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
  upsertSession(chatId, { expectingContact: true });
  await bot.sendMessage(chatId, 'Tap below to share your Telegram phone number (verification required). We do not accept typed numbers.', { reply_markup: keyboard });
}

async function handleContact(msg) {
  const chatId = msg.chat.id;
  const contact = msg.contact;
  if (!contact || !contact.phone_number) {
    return bot.sendMessage(chatId, 'Could not read your phone number. Please try /login again.');
  }

  const s0 = getSession(chatId);
  if (!s0 || !s0.expectingContact) {
    return bot.sendMessage(chatId, 'Please start login first using /login and then share your contact.');
  }

  // Security: ensure the shared contact belongs to the Telegram user
  if (contact.user_id && msg.from && contact.user_id !== msg.from.id) {
    return bot.sendMessage(chatId, 'Please share your own contact using the button. Third-party contacts are not allowed.');
  }

  const phone = normalizePhone(contact.phone_number);
  try {
    const student = await getStudentNameByContact(phone);
    if (!student || !student.name) {
      upsertSession(chatId, { phone, expectingContact: false });
      return bot.sendMessage(chatId, `No student found for ${phone}. If your phone is correct, contact the school to update records.`);
    }

    // initialize default notification preferences if not present
    upsertSession(chatId, {
      phone,
      studentName: student.name,
      expectingContact: false,
      prefs: { events: true, fees: true },
    });

    const menu = {
      keyboard: [
        [{ text: 'My student' }, { text: 'My fees' }],
        [{ text: 'Events' }, { text: 'Settings' }],
        [{ text: 'Results' }, { text: 'Attendance' }],
        [{ text: 'Discipline' }, { text: 'Talk to Teacher' }],
        [{ text: 'Talk to Administrator' }, { text: 'Menu' }],
        [{ text: 'Menu' }, { text: 'Logout' }],
      ],
      resize_keyboard: true,
    };

    await bot.sendMessage(chatId, `Logged in as guardian of ${student.name}.`, { reply_markup: menu });
  } catch (err) {
    console.error('[ParentBot] login error:', err);
    await bot.sendMessage(chatId, 'Login failed. Please try again later.');
  }
}

async function handleMe(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  const name = s.studentName || '(unknown)';
  await bot.sendMessage(chatId, `Linked student: ${name}\nGuardian phone: ${s.phone}${s.sid ? `\nLinked school ID: ${s.sid}` : ''}`);
}

async function handleFees(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    const bal = await getFeeBalance(s.phone);
    if (!bal) {
      return bot.sendMessage(chatId, 'No fee record found yet.');
    }
    const term = bal.term ? `Term: ${bal.term}\n` : '';
    const balance = bal.balance != null ? Number(bal.balance).toFixed(2) : 'N/A';
    await bot.sendMessage(chatId, `${term}Current balance: ${balance}`);
  } catch (err) {
    console.error('[ParentBot] fees error:', err);
    await bot.sendMessage(chatId, 'Failed to fetch fee balance. Please try again later.');
  }
}

async function handleEvents(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  if (!s.sid) return bot.sendMessage(chatId, 'No school linked. Use /linkschool <SCHOOL_ID> to link your school.');
  try {
    const events = await getEvents(s.sid);
    if (!Array.isArray(events) || events.length === 0) {
      return bot.sendMessage(chatId, 'No recent events.');
    }
    const text = events.slice(0, 5).map(formatEvent).join('\n\n');
    await bot.sendMessage(chatId, `Recent school events:\n\n${text}`);
  } catch (err) {
    console.error('[ParentBot] events error:', err);
    await bot.sendMessage(chatId, 'Failed to fetch events. Please try again later.');
  }
}

async function handleLinkSchool(msg) {
  const chatId = msg.chat.id;
  const parts = (msg.text || '').trim().split(/\s+/);
  if (parts.length < 2) {
    return bot.sendMessage(chatId, 'Usage: /linkschool <SCHOOL_ID>');
  }
  const sid = parts[1];
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  upsertSession(chatId, { sid });
  await bot.sendMessage(chatId, `Linked school ID: ${sid}. You can now use /events.`);
}

async function handleLogout(msg) {
  const chatId = msg.chat.id;
  removeSession(chatId);
  await bot.sendMessage(chatId, 'You have been logged out. Use /login to sign in again.', {
    reply_markup: { remove_keyboard: true },
  });
}

async function handleTextButtons(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim().toLowerCase();
  if (text === 'help') return handleHelp(msg);
  if (text === 'my student') return handleMe(msg);
  if (text === 'my fees') return handleFees(msg);
  if (text === 'events') return handleEvents(msg);
  if (text === 'settings') return handleSettings(msg);
  if (text === 'menu') return handleMenu(msg);
  if (text === 'results') return handleResults(msg);
  if (text === 'attendance') return handleAttendance(msg);
  if (text === 'discipline') return handleDiscipline(msg);
  if (text === 'talk to teacher') return handleTalkToTeacher(msg);
  if (text === 'talk to administrator') return handleTalkToAdministrator(msg);
  if (text === 'logout') return handleLogout(msg);

  // Handle conversation messages
  const s = getSession(chatId);
  if (s && s.activeConversation) {
    return handleConversationMessage(msg);
  }

  // Prevent manual phone number entry during login; enforce Telegram contact share
  if (s && s.expectingContact && /\+?\d[\d\s()-]{5,}/.test(text)) {
    return bot.sendMessage(chatId, 'For security, please use the "Share my phone number" button so we can verify it is your Telegram-verified number.');
  }
}

async function handleMenu(msg) {
  const chatId = msg.chat.id;
  const menu = {
    keyboard: [
      [{ text: 'My student' }, { text: 'My fees' }],
      [{ text: 'Events' }, { text: 'Settings' }],
      [{ text: 'Results' }, { text: 'Attendance' }],
      [{ text: 'Discipline' }, { text: 'Talk to Teacher' }],
      [{ text: 'Talk to Administrator' }, { text: 'Menu' }],
      [{ text: 'Menu' }, { text: 'Logout' }],
    ],
    resize_keyboard: true,
  };
  await bot.sendMessage(chatId, 'Main menu restored.', { reply_markup: menu });
}

async function handleTalkToTeacher(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    // Get student ID
    const [studentRows] = await db.query('SELECT id, sid FROM students WHERE contact = ?', [s.phone]);
    const student = studentRows[0];
    if (!student) return bot.sendMessage(chatId, 'Student not found for your account.');

    // Get class teacher
    const classTeacher = await getStudentClassTeacher(student.id);
    if (!classTeacher) {
      return bot.sendMessage(chatId, 'No class teacher found for your student. Please contact the school administration.');
    }

    // Store conversation request info
    upsertSession(chatId, {
      conversationRequest: {
        type: 'teacher',
        teacherId: classTeacher.id,
        teacherName: classTeacher.name,
        studentId: student.id,
        schoolId: student.sid,
        step: 'message'
      }
    });

    const keyboard = {
      keyboard: [
        [{ text: 'Cancel Request' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    };

    await bot.sendMessage(chatId, 
      `You're requesting to talk to ${classTeacher.name} (Class Teacher for ${classTeacher.className}).\n\nPlease type your message below:`, 
      { reply_markup: keyboard }
    );
  } catch (err) {
    console.error('[ParentBot] talk to teacher error:', err);
    await bot.sendMessage(chatId, 'Failed to process request. Please try again later.');
  }
}

async function handleTalkToAdministrator(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    // Get student ID and school ID
    const [studentRows] = await db.query('SELECT id, sid FROM students WHERE contact = ?', [s.phone]);
    const student = studentRows[0];
    if (!student) return bot.sendMessage(chatId, 'Student not found for your account.');

    // Get administrator
    const administrator = await getSchoolAdministrator(student.sid);
    if (!administrator) {
      return bot.sendMessage(chatId, 'No administrator found for your school. Please contact the school directly.');
    }

    // Store conversation request info
    upsertSession(chatId, {
      conversationRequest: {
        type: 'administrator',
        administratorId: administrator.id,
        administratorName: administrator.name,
        studentId: student.id,
        schoolId: student.sid,
        step: 'message'
      }
    });

    const keyboard = {
      keyboard: [
        [{ text: 'Cancel Request' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    };

    await bot.sendMessage(chatId, 
      `You're requesting to talk to ${administrator.name} (School Administrator).\n\nPlease type your message below:`, 
      { reply_markup: keyboard }
    );
  } catch (err) {
    console.error('[ParentBot] talk to administrator error:', err);
    await bot.sendMessage(chatId, 'Failed to process request. Please try again later.');
  }
}

async function handleConversationMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const s = getSession(chatId);

  // Handle active conversation messages
  if (s && s.activeConversation) {
    if (text.toLowerCase() === 'close conversation') {
      await closeConversation(s.activeConversation.id);
      upsertSession(chatId, { activeConversation: null });
      await bot.sendMessage(chatId, 'Conversation closed.', { reply_markup: { remove_keyboard: true } });
      return handleMenu(msg);
    }

    // Add message to conversation
    const messageId = await addConversationMessage(
      s.activeConversation.id,
      chatId,
      'parent',
      text
    );

    if (messageId) {
      // Send message to the teacher/administrator
      const { sendTeacherTelegramNotification } = require('./teacherTelegramBot.js');
      await sendTeacherTelegramNotification({
        userId: s.activeConversation.recipientId,
        userType: s.activeConversation.recipientType,
        message: `Parent message: ${text}`
      });
      
      await bot.sendMessage(chatId, `Message sent: ${text}`);
    }
    return;
  }

  // Handle conversation request messages
  if (!s || !s.conversationRequest) {
    return bot.sendMessage(chatId, 'No active conversation request. Please start a new request.');
  }

  if (text.toLowerCase() === 'cancel request') {
    upsertSession(chatId, { conversationRequest: null });
    return handleMenu(msg);
  }

  const request = s.conversationRequest;
  
  try {
    let requestId;
    if (request.type === 'teacher') {
      requestId = await createConversationRequest(
        chatId,
        request.teacherId,
        'teacher',
        request.studentId,
        request.schoolId,
        text
      );
    } else if (request.type === 'administrator') {
      requestId = await createConversationRequest(
        chatId,
        request.administratorId,
        'administrator',
        request.studentId,
        request.schoolId,
        text
      );
    }

    if (requestId) {
      upsertSession(chatId, { conversationRequest: null });
      
      const recipientName = request.type === 'teacher' ? request.teacherName : request.administratorName;
      await bot.sendMessage(chatId, 
        `Your conversation request has been sent to ${recipientName}.\n\nYou will be notified when they respond.`, 
        { reply_markup: { remove_keyboard: true } }
      );
      
      // Send notification to recipient (this would need to be implemented for teachers/administrators)
      // For now, we'll just store the request in the database
    } else {
      await bot.sendMessage(chatId, 'Failed to send request. Please try again later.');
    }
  } catch (err) {
    console.error('[ParentBot] conversation message error:', err);
    await bot.sendMessage(chatId, 'Failed to send request. Please try again later.');
  }
}

async function handleSettings(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  const eventsOn = !!(s.prefs && s.prefs.events);
  const feesOn = !!(s.prefs && s.prefs.fees);
  const keyboard = {
    inline_keyboard: [
      [
        { text: `Events: ${eventsOn ? 'On' : 'Off'}`, callback_data: 'settings:toggle:events' },
        { text: `Fees: ${feesOn ? 'On' : 'Off'}`, callback_data: 'settings:toggle:fees' },
      ],
      [
        { text: 'Unsubscribe All', callback_data: 'settings:unsubscribe' },
      ],
    ],
  };
  await bot.sendMessage(chatId, 'Notification preferences:', { reply_markup: keyboard });
}

async function handleUnsubscribe(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  const prefs = { events: false, fees: false };
  upsertSession(chatId, { prefs });
  await bot.sendMessage(chatId, 'All notifications turned off. Use /settings to re-enable.');
}

async function handleCallbackQuery(query) {
  try {
    const chatId = query.message && query.message.chat && query.message.chat.id;
    if (!chatId) return;
    const data = String(query.data || '');
    const s = getSession(chatId);
    if (!s) return bot.answerCallbackQuery(query.id, { text: 'Session expired, use /login', show_alert: true });

    // Settings callbacks
    if (data.startsWith('settings:')) {
      const prefs = Object.assign({ events: true, fees: true }, s.prefs || {});
      if (data === 'settings:unsubscribe') {
        prefs.events = false;
        prefs.fees = false;
        upsertSession(chatId, { prefs });
        await bot.answerCallbackQuery(query.id, { text: 'All notifications turned off' });
        return handleSettings({ chat: { id: chatId } });
      }
      const m = data.match(/^settings:toggle:(events|fees)$/);
      if (m) {
        const key = m[1];
        prefs[key] = !prefs[key];
        upsertSession(chatId, { prefs });
        await bot.answerCallbackQuery(query.id, { text: `${key} notifications ${prefs[key] ? 'enabled' : 'disabled'}` });
        return handleSettings({ chat: { id: chatId } });
      }
      return;
    }

    // Results flow callbacks
    if (data.startsWith('results:')) {
      await processResultsCallback(chatId, data, query.id);
      return;
    }

    // Conversation request callbacks
    if (data.startsWith('conv:')) {
      await processConversationCallback(chatId, data, query.id);
      return;
    }
  } catch (e) {
    console.error('[ParentBot] callback error:', e);
  }
}


// ------------------------------- RESULTS / ATTENDANCE / DISCIPLINE ---------------------------------

async function handleResults(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    const [studentRows] = await db.query('SELECT id FROM students WHERE contact = ?', [s.phone]);
    const studentId = (studentRows && studentRows[0] && studentRows[0].id) || null;
    if (!studentId) return bot.sendMessage(chatId, 'Student not found for your account.');

    const [terms] = await db.query('SELECT id, name FROM term ORDER BY id DESC');
    const [types] = await db.query('SELECT id, name FROM exam ORDER BY id ASC');
    const [classes] = await db.query('SELECT DISTINCT c.id, c.name FROM history h INNER JOIN class c ON c.id = h.classid WHERE h.studentid = ? ORDER BY c.name ASC', [studentId]);

    upsertSession(chatId, {
      results: {
        studentId,
        termId: null,
        typeId: null,
        classId: null,
        terms,
        types,
        classes,
      },
    });

    await bot.sendMessage(chatId, 'Results: choose term, exam type, and class.');
    await showTermPicker(chatId);
  } catch (e) {
    console.error('[ParentBot] results init error:', e);
    await bot.sendMessage(chatId, 'Failed to load options. Please try again later.');
  }
}

async function showTermPicker(chatId) {
  const s = getSession(chatId);
  const terms = (s && s.results && s.results.terms) || [];
  if (!terms.length) return bot.sendMessage(chatId, 'No terms configured.');
  const rows = terms.slice(0, 24).map(t => ([{ text: t.name, callback_data: `results:set:term:${t.id}` }]));
  await bot.sendMessage(chatId, 'Select term:', { reply_markup: { inline_keyboard: rows } });
}

async function showTypePicker(chatId) {
  const s = getSession(chatId);
  const types = (s && s.results && s.results.types) || [];
  if (!types.length) return bot.sendMessage(chatId, 'No exam types configured.');
  const rows = types.slice(0, 24).map(t => ([{ text: t.name, callback_data: `results:set:type:${t.id}` }]));
  await bot.sendMessage(chatId, 'Select exam type:', { reply_markup: { inline_keyboard: rows } });
}

async function showClassPicker(chatId) {
  const s = getSession(chatId);
  const classes = (s && s.results && s.results.classes) || [];
  if (!classes.length) return bot.sendMessage(chatId, 'No classes found for this student.');
  const rows = classes.slice(0, 24).map(c => ([{ text: c.name, callback_data: `results:set:class:${c.id}` }]));
  await bot.sendMessage(chatId, 'Select class:', { reply_markup: { inline_keyboard: rows } });
}

async function processResultsCallback(chatId, data, callbackId) {
  const s = getSession(chatId);
  if (!s || !s.results) return bot.answerCallbackQuery(callbackId, { text: 'Session expired. Use /results again.' });

  if (data === 'results:init') {
    await bot.answerCallbackQuery(callbackId);
    return showTermPicker(chatId);
  }

  const m = data.match(/^results:set:(term|type|class):(\d+)$/);
  if (!m) return bot.answerCallbackQuery(callbackId);
  const key = m[1];
  const val = Number(m[2]);
  const results = Object.assign({}, s.results, { [`${key}Id`]: val });
  upsertSession(chatId, { results });
  await bot.answerCallbackQuery(callbackId, { text: `${key} selected` });

  if (!results.termId) return showTermPicker(chatId);
  if (!results.typeId) return showTypePicker(chatId);
  if (!results.classId) return showClassPicker(chatId);

  try {
    const sql = `SELECT subj.name AS subject, r.score, r.grade, r.remarks
      FROM results r
      INNER JOIN subject subj ON subj.id = r.subjectid
      WHERE r.studentid = ? AND r.termid = ? AND r.typeid = ? AND r.classid = ?
      ORDER BY subj.name ASC`;
    const params = [results.studentId, results.termId, results.typeId, results.classId];
    const [rows] = await db.query(sql, params);
    if (!rows || rows.length === 0) {
      return bot.sendMessage(chatId, 'No results found for the selected filters.');
    }
    const lines = rows.map(r => `${r.subject}: ${r.score} (${r.grade})${r.remarks ? ` — ${r.remarks}` : ''}`);
    await bot.sendMessage(chatId, `Results Summary:\n\n${lines.join('\n')}`);
  } catch (e) {
    console.error('[ParentBot] results fetch error:', e);
    await bot.sendMessage(chatId, 'Failed to load results. Please try again later.');
  }
}

async function processConversationCallback(chatId, data, callbackId) {
  try {
    const s = getSession(chatId);
    if (!s) return bot.answerCallbackQuery(callbackId, { text: 'Session expired. Use /login again.' });

    const m = data.match(/^conv:(accept|reject|close):(\d+)$/);
    if (!m) return bot.answerCallbackQuery(callbackId);
    
    const action = m[1];
    const requestId = Number(m[2]);
    
    const request = await getConversationRequest(requestId);
    if (!request) {
      return bot.answerCallbackQuery(callbackId, { text: 'Request not found', show_alert: true });
    }

    if (action === 'accept') {
      await updateConversationRequestStatus(requestId, 'accepted');
      const conversationId = await createConversation(requestId, request.parent_id, request.recipient_id, request.recipient_type);
      
      if (conversationId) {
        // Store active conversation in session
        upsertSession(chatId, { 
          activeConversation: {
            id: conversationId,
            requestId: requestId,
            parentId: request.parent_id,
            recipientId: request.recipient_id,
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

        // Notify parent that request was accepted
        await sendParentTelegramNotification({
          chatId: request.parent_id,
          message: `Your conversation request has been accepted. You can now start messaging.`
        });
      }
    } else if (action === 'reject') {
      await updateConversationRequestStatus(requestId, 'rejected');
      await bot.sendMessage(chatId, 'Conversation request rejected.');
      
      // Notify parent that request was rejected
      await sendParentTelegramNotification({
        chatId: request.parent_id,
        message: `Your conversation request has been rejected.`
      });
    } else if (action === 'close') {
      const s = getSession(chatId);
      if (s && s.activeConversation) {
        await closeConversation(s.activeConversation.id);
        upsertSession(chatId, { activeConversation: null });
        await bot.sendMessage(chatId, 'Conversation closed.', { reply_markup: { remove_keyboard: true } });
        
        // Notify parent that conversation was closed
        await sendParentTelegramNotification({
          chatId: request.parent_id,
          message: `The conversation has been closed.`
        });
      }
    }

    await bot.answerCallbackQuery(callbackId, { text: `${action} successful` });
  } catch (err) {
    console.error('[ParentBot] conversation callback error:', err);
    await bot.answerCallbackQuery(callbackId, { text: 'Error processing request', show_alert: true });
  }
}

async function handleAttendance(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  try {
    const [studentRows] = await db.query('SELECT id FROM students WHERE contact = ?', [s.phone]);
    const studentId = (studentRows && studentRows[0] && studentRows[0].id) || null;
    if (!studentId) return bot.sendMessage(chatId, 'Student not found for your account.');

    const [rows] = await db.query('SELECT date, status, note FROM attendance WHERE studentid = ? ORDER BY date DESC LIMIT 10', [studentId]);
    if (!rows || rows.length === 0) return bot.sendMessage(chatId, 'No attendance data available.');
    const lines = rows.map(r => `${r.date}: ${r.status}${r.note ? ` — ${r.note}` : ''}`);
    await bot.sendMessage(chatId, `Recent attendance:\n\n${lines.join('\n')}`);
  } catch (e) {
    console.error('[ParentBot] attendance error:', e);
    await bot.sendMessage(chatId, 'Failed to fetch attendance.');
  }
}

async function handleDiscipline(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  try {
    const [studentRows] = await db.query('SELECT id FROM students WHERE contact = ?', [s.phone]);
    const studentId = (studentRows && studentRows[0] && studentRows[0].id) || null;
    if (!studentId) return bot.sendMessage(chatId, 'Student not found for your account.');

    const [rows] = await db.query('SELECT date, category, action, remarks FROM discipline WHERE studentid = ? ORDER BY date DESC LIMIT 10', [studentId]);
    if (!rows || rows.length === 0) return bot.sendMessage(chatId, 'No disciplinary records available.');
    const lines = rows.map(r => `${r.date}: ${r.category}${r.action ? ` — ${r.action}` : ''}${r.remarks ? ` — ${r.remarks}` : ''}`);
    await bot.sendMessage(chatId, `Recent disciplinary records:\n\n${lines.join('\n')}`);
  } catch (e) {
    console.error('[ParentBot] discipline error:', e);
    await bot.sendMessage(chatId, 'Failed to fetch disciplinary records.');
  }
}

// ------------------------------- STARTUP ---------------------------------

function initParentTelegramBot(options = {}) {
  if (bot) return bot;
  if (!BOT_TOKEN) {
    console.warn('[ParentBot] No TELEGRAM_PARENT_BOT_TOKEN provided; bot not started.');
    return null;
  }

  loadSessions();

  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('[ParentBot] Bot started (polling).');

  bot.onText(/^\/start(?:@[\w_]+)?(?:\s+.*)?$/, handleStart);
  bot.onText(/^\/help$/, handleHelp);
  bot.onText(/^\/login$/, handleLogin);
  bot.onText(/^\/me$/, handleMe);
  bot.onText(/^\/fees$/, handleFees);
  bot.onText(/^\/events$/, handleEvents);
  bot.onText(/^\/linkschool\s+(.+)$/, handleLinkSchool);
  bot.onText(/^\/settings$/, handleSettings);
  bot.onText(/^\/menu$/, handleMenu);
  bot.onText(/^\/unsubscribe$/, handleUnsubscribe);
  bot.onText(/^\/results$/, handleResults);
  bot.onText(/^\/attendance$/, handleAttendance);
  bot.onText(/^\/discipline$/, handleDiscipline);
  bot.onText(/^\/logout$/, handleLogout);

  bot.on('message', async (msg) => {
    // keep sessions fresh
    const s = getSession(msg.chat.id);
    if (s) upsertSession(msg.chat.id, {});
  });

  bot.on('contact', handleContact);
  bot.on('text', handleTextButtons);
  bot.on('callback_query', handleCallbackQuery);

  return bot;
}


// ------------------------------- NOTIFICATIONS ---------------------------------

/**
 * Send a notification to a parent by phone (if they are logged in) or by chatId.
 * Provide at least one of { phone, chatId }.
 */
async function sendParentTelegramNotification({ phone, chatId, message }) {
  if (!bot) initParentTelegramBot();
  if (!bot) throw new Error('Parent Telegram bot is not running');
  if (!message || !message.trim()) return false;

  const targets = new Set();
  if (chatId) targets.add(String(chatId));
  if (phone) {
    for (const id of findChatIdsByPhone(phone)) targets.add(String(id));
  }
  if (targets.size === 0) return false;

  const text = message.trim();
  const promises = [];
  for (const id of targets) {
    promises.push(bot.sendMessage(id, text).catch((e) => {
      console.error('[ParentBot] send notification error:', e.message);
    }));
  }
  await Promise.all(promises);
  return true;
}

async function sendParentEventNotification({ phone, chatId, sid, title, date, time, location, description }) {
  if (!bot) initParentTelegramBot();
  if (!bot) throw new Error('Parent Telegram bot is not running');

  const parts = [];
  if (title) parts.push(`Event: ${title}`);
  if (date) parts.push(`Date: ${date}${time ? ` ${time}` : ''}`);
  if (location) parts.push(`Location: ${location}`);
  if (description) parts.push(description);
  const text = parts.join('\n');

  const sendTo = (id) => {
    const s = getSession(id);
    if (s && s.prefs && s.prefs.events !== false) {
      if (!sid || (s.sid && String(s.sid) === String(sid))) {
        return bot.sendMessage(id, text).catch((e) => console.error('[ParentBot] event notify error:', e.message));
      }
    }
    return Promise.resolve();
  };

  const targets = new Set();
  if (chatId) targets.add(String(chatId));
  if (phone) {
    for (const id of findChatIdsByPhone(phone)) targets.add(String(id));
  }
  const promises = [];
  for (const id of targets) promises.push(sendTo(id));
  await Promise.all(promises);
  return true;
}

async function sendParentFeeReminder({ phone, chatId, amount, term }) {
  if (!bot) initParentTelegramBot();
  if (!bot) throw new Error('Parent Telegram bot is not running');

  const text = `Fee Reminder${term ? ` (${term})` : ''}: Outstanding balance ${amount != null ? Number(amount).toFixed(2) : ''}`;

  const sendTo = (id) => {
    const s = getSession(id);
    if (s && s.prefs && s.prefs.fees !== false) {
      return bot.sendMessage(id, text).catch((e) => console.error('[ParentBot] fee notify error:', e.message));
    }
    return Promise.resolve();
  };

  const targets = new Set();
  if (chatId) targets.add(String(chatId));
  if (phone) {
    for (const id of findChatIdsByPhone(phone)) targets.add(String(id));
  }
  const promises = [];
  for (const id of targets) promises.push(sendTo(id));
  await Promise.all(promises);
  return true;
}


module.exports = {
  initParentTelegramBot,
  sendParentTelegramNotification,
  sendParentEventNotification,
  sendParentFeeReminder,
};


// Auto-start if env flag is enabled
if (AUTO_START && BOT_TOKEN) {
  initParentTelegramBot();
}


