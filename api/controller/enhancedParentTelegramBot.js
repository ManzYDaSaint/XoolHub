// Enhanced parent Telegram Bot with AI Capabilities
// Integrates NLP, sentiment analysis, and automated insights

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const db = require('../database/mysql.js');
const aiUtils = require('./aiUtils.js');

const {
  getStudentNameByContact,
  getFeeBalance,
  getEvents,
  conversationRequest,
  getConversationRequest,
  updateConversationRequestStatus,
  createConversation,
  addConversationMessage,
  getStudentDataForAI,
  getConversationMessages,
  closeConversation,
  getYear,
  getExam,
  getClass,
  getTerm,
  getStudentCard,
  getClassTeacherByStudentID,
  getSingleTeacher,
  getAdmin,
  getSchoolByID,
  addFeedback,
  addParentBotFeedback,
} = require('../model/apiModel.js');

// ------------------------------- CONFIG ---------------------------------

const BOT_TOKEN = process.env.TELEGRAM_PARENT_BOT_TOKEN;
const AUTO_START = (process.env.AUTO_START_TELEGRAM_PARENT_BOT || 'true').toLowerCase() !== 'false';
const SESSION_FILE = path.join(__dirname, 'enhancedParentSessions.json');

// Session lifetime (ms) before treated as stale
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

// ------------------------------- UTILITIES ---------------------------------

function nowTs() {
  return Date.now();
}

function normalizePhone(raw) {
  if (!raw) return '';
  let p = String(raw).trim();
  p = p.replace(/[^\d+]/g, '');
  return p;
}

function trackFeatureUsage(chatId, featureName) {
  const session = getSession(chatId);
  if (session && session.featuresUsed) {
    if (!session.featuresUsed.includes(featureName)) {
      session.featuresUsed.push(featureName);
      upsertSession(chatId, { featuresUsed: session.featuresUsed });
    }
  }
}

function formatEvent(e) {
  const date = e.date ? new Date(e.date).toLocaleDateString() : '';
  const time = e.time ? `🕐 ${e.time}` : '';
  const loc = e.location ? `\n📍 **Location:** ${e.location}` : '';
  const desc = e.description ? `\n📝 **Description:** ${e.description}` : '';
  
  // Determine event type icon
  const eventIcon = e.title?.toLowerCase().includes('exam') ? '📝' :
                   e.title?.toLowerCase().includes('holiday') ? '🎉' :
                   e.title?.toLowerCase().includes('meeting') ? '👥' :
                   e.title?.toLowerCase().includes('sport') ? '⚽' :
                   e.title?.toLowerCase().includes('graduation') ? '🎓' :
                   e.title?.toLowerCase().includes('parent') ? '👨‍👩‍👧‍👦' :
                   '📅';
  
  return `┌─────────────────────────────────────────┐
│ ${eventIcon} **${e.title || 'School Event'}**
│ 📅 **Date:** ${date}${time ? `\n│ ${time}` : ''}${loc}
│ ${desc}
└─────────────────────────────────────────┘`;
}

// ------------------------------- DATA SERVICE LAYER ---------------------------------

/**
 * Get student data from session or database (optimized)
 */
async function getStudentDataFromSession(chatId) {
  const session = getSession(chatId);
  if (session && session.studentData) {
    performanceMetrics.sessionHits++;
    return session.studentData;
  }
  
  // Fallback to database query if session data missing
  if (session && session.phone) {
    performanceMetrics.sessionMisses++;
    try {
      const student = await getStudentNameByContact(session.phone);
      if (student) {
        const studentData = {
          id: student.id,
          name: student.name,
          contact: session.phone,
          schoolId: student.schoolid
        };
        // Update session with complete data
        upsertSession(chatId, { studentData });
        return studentData;
      }
    } catch (error) {
      // Silent error handling
    }
  }
  
  return null;
}

/**
 * Optimized student data fetching with caching
 */
async function getStudentDataOptimized(chatId) {
  const startTime = Date.now();
  const studentData = await getStudentDataFromSession(chatId);
  const queryTime = Date.now() - startTime;
  
  // Update performance metrics
  performanceMetrics.queryCount++;
  performanceMetrics.totalQueryTime += queryTime;
  
  if (queryTime > 100) {
    performanceMetrics.slowQueries++;
  }
  
  return studentData;
}

// ------------------------------- AI-ENHANCED FUNCTIONS ---------------------------------


/**
 * Generate AI insights for student
 */
async function generateAIInsights(chatId, studentId, schoolId) {
  try {
    const studentData = await getStudentDataForAI(studentId, schoolId);
    const insights = aiUtils.generateStudentInsights(
      studentData, // Pass the full enhanced student data
      studentData.academic,
      studentData.attendance,
      studentData.disciplinary
    );
    
    const recommendations = aiUtils.generateRecommendations(
      { sentiment: { score: 0 }, intent: { category: 'insights' } },
      insights
    );
    
    return aiUtils.formatInsightsForTelegram(insights, recommendations);
  } catch (error) {
    return '🤖 **AI Insights**\n\nSorry, I\'m having trouble generating insights right now. Please try again later.';
  }
}

// ------------------------------- SESSIONS ---------------------------------

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
    // Silent error handling
  }
}

function saveSessions() {
  if (savePending) return;
  savePending = true;
  setTimeout(() => {
    try {
      const arr = Array.from(sessions.values());
      fs.writeFileSync(SESSION_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (err) {
      // Silent error handling
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
let isInitializing = false;
let botInstanceId = null;

// ------------------------------- START ---------------------------------

async function handleStart(msg) {
  const chatId = msg.chat.id;
  
  // First, show the AI intro message
  const aiIntroText = `🤖 **Welcome to XoolHub AI-Enhanced parent Portal!**\n\nI'm your intelligent assistant that can:\n• 📊 Generate AI-powered insights about your child\n• 💬 Understand natural language questions\n• 📈 Analyze academic trends and patterns\n• 🎯 Provide personalized recommendations\n\nUse the menu or type your questions naturally!`;

  const introKeyboard = {
    keyboard: [
      [{ text: 'Help' }, { text: 'AI Demo' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };

  await bot.sendMessage(chatId, aiIntroText, { reply_markup: introKeyboard, parse_mode: 'Markdown' });

  // After 5 seconds, show the login request
  setTimeout(async () => {
    const loginText = `To get started, please log in with your phone number (the one registered at school).`;
    
    // Set expectingContact flag when showing login request
    upsertSession(chatId, { expectingContact: true });
    
    const loginKeyboard = {
      keyboard: [
        [{ text: 'Login with my phone number', request_contact: true }],
        [{ text: 'Help' }, { text: 'AI Demo' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    };

    await bot.sendMessage(chatId, loginText, { reply_markup: loginKeyboard });
  }, 5000); // 5 second delay
}

// ------------------------------- HELP ---------------------------------

async function handleHelp(msg) {
  const chatId = msg.chat.id;
  const help = [
    '🤖 **AI-Enhanced Commands**',
    '/start — Show welcome and login keyboard',
    '/help — Show this help',
    '/login — Log in using your phone number',
    '/me — Show linked student info',
    '/fees — Show current term fee balance',
    '/events — Show recent school events',
    '/results — View student results',
    '/attendance — Recent attendance records',
    '/discipline — Recent disciplinary records',
    '/insights — 🤖 AI-powered student insights',
    '/ai — Ask me anything about your child',
    '/feedback — Submit feedback about the bot',
    '/menu — Restore main menu',
    '/logout — Disconnect this chat',
    '',
    '💬 **Natural Language Examples:**',
    '• "How is my child doing?"',
    '• "Show me attendance trends"',
    '• "What are the recent grades?"',
    '• "Generate insights about performance"',
    '• "I want to talk to the teacher"'
  ].join('\n');

  await bot.sendMessage(chatId, help, { parse_mode: 'Markdown' });
}

// ------------------------------- AI DEMO ---------------------------------

async function handleAIDemo(msg) {
  const chatId = msg.chat.id;
  const demoText = `🤖 **AI Demo - Natural Language Processing**\n\nTry asking me questions like:\n\n• "How is my child performing academically?"\n• "Show me attendance patterns"\n• "What are the recent disciplinary issues?"\n• "Generate a performance report"\n• "I'm concerned about grades"\n• "Schedule a meeting with teacher"\n\nI'll understand your intent and provide relevant information!`;

  await bot.sendMessage(chatId, demoText, { parse_mode: 'Markdown' });
}

// ------------------------------- LOGIN ---------------------------------

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



// ------------------------------- CANCEL LOGIN ---------------------------------

async function handleCancelLogin(msg) {
  const chatId = msg.chat.id;
  upsertSession(chatId, { expectingContact: false });
  
  const keyboard = {
    keyboard: [
      [{ text: 'Help' }, { text: 'AI Demo' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
  
  await bot.sendMessage(chatId, 'Login cancelled. Use /start to begin the login process again.', { reply_markup: keyboard });
}



// ------------------------------- CONTACT ---------------------------------

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

    upsertSession(chatId, {
      phone,
      studentName: student.name,
      studentId: student.id,
      schoolId: student.schoolid,
      school: student.school,
      class: student.class,
      admission: student.admission,
      address: student.address,
      gender: student.gender,
      dob: student.dob,
      expectingContact: false,
      prefs: { events: true, fees: true, aiInsights: true },
      sessionStart: Date.now(),
      featuresUsed: [],
      studentData: {
        id: student.id,
        name: student.name,
        contact: phone,
        schoolId: student.schoolid,
        school: student.school,
        class: student.class,
        admission: student.admission,
        address: student.address,
        gender: student.gender,
        dob: student.dob
      }
    });

    const menu = {
      keyboard: [
        [{ text: 'My student' }, { text: 'My fees' }],
        [{ text: 'Events' }, { text: 'Settings' }],
        [{ text: 'Results' }, { text: 'Attendance' }],
        [{ text: '🤖 AI Insights' }, { text: 'Discipline' }],
        [{ text: 'Talk to teacher' }, { text: 'Talk to administrator' }],
        [{ text: 'Feedback' }, { text: 'Menu' }],
        [{ text: 'Logout' }],
      ],
      resize_keyboard: true,
    };

    await bot.sendMessage(chatId, `✅ Logged in as guardian of ${student.name}.\n\n🤖 AI features are now active! Try asking me questions naturally.`, { reply_markup: menu });
  } catch (err) {
    console.error('[EnhancedBot] login error:', err);
    await bot.sendMessage(chatId, 'Login failed. Please try again later.');
  }
}



// ------------------------------- STUDENT INFORMATION ---------------------------------

async function handleMe(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  
  const name = s.studentName || '(unknown)';
  const schoolInfo = s.school ? `🏫 **School:** ${s.school}` : '';
  const addressInfo = s.address ? `📍 **Address:** ${s.address}` : '';
  const genderInfo = s.gender ? `⚧ **Gender:** ${s.gender}` : '';
  const dobInfo = s.dob ? `🎂 **Date of Birth:** ${new Date(s.dob).toLocaleDateString()}` : '';
  const classInfo = s.class ? `📚 **Class:** ${s.class}` : '';
  const admissionInfo = s.admission ? `📅 **Admission Date:** ${new Date(s.admission).toLocaleDateString()}` : '';
  
  // Calculate age if DOB is available
  const ageInfo = s.dob ? ` (${Math.floor((new Date() - new Date(s.dob)) / (365.25 * 24 * 60 * 60 * 1000))} years old)` : '';
  
  const message = `
🎓 **STUDENT PROFILE**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 **Student Name:** ${name}${ageInfo}
📱 **Guardian Phone:** ${s.phone}
${schoolInfo}
${addressInfo}
${genderInfo}
${dobInfo}
${classInfo}
${admissionInfo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 **AI Features:** ${s.prefs?.aiInsights ? '✅ Enabled' : '❌ Disabled'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
  
  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}




// ------------------------------- FEES ---------------------------------

async function handleFees(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  // Track feature usage
  trackFeatureUsage(chatId, 'fees');

  try {
    const feeRecords = await getFeeBalance(s.phone);
    if (!feeRecords || feeRecords.length === 0) {
      return bot.sendMessage(chatId, 'No fee records found yet.');
    }

    // Group records by academic year and term
    const groupedFees = {};
    let totalOutstanding = 0;
    let totalPaid = 0;
    let admissionDate = null;

    feeRecords.forEach(record => {
      if (!admissionDate) admissionDate = record.admission_date;
      
      const yearKey = record.academic_year;
      const termKey = record.term;
      
      if (!groupedFees[yearKey]) {
        groupedFees[yearKey] = {};
      }
      if (!groupedFees[yearKey][termKey]) {
        groupedFees[yearKey][termKey] = {
          term: termKey,
          year: yearKey,
          termStart: record.term_start,
          termEnd: record.term_end,
          fees: []
        };
      }
      
      groupedFees[yearKey][termKey].fees.push({
        name: record.fee_name,
        amount: record.fee_amount,
        paid: record.paid,
        balance: record.balance,
        status: record.status,
        paymentDate: record.payment_date,
        lastUpdated: record.last_updated
      });
      
      totalOutstanding += Number(record.balance) || 0;
      totalPaid += Number(record.paid) || 0;
    });

    // Build comprehensive message with modern formatting
    let message = `
💳 **FEE STATEMENT & HISTORY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    if (admissionDate) {
      message += `\n📅 **Admission Date:** ${new Date(admissionDate).toLocaleDateString()}\n`;
    }

    // Display by academic year and term
    Object.keys(groupedFees).sort().reverse().forEach(year => {
      message += `\n\n🎓 **ACADEMIC YEAR: ${year}**\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      
      Object.keys(groupedFees[year]).sort().reverse().forEach(term => {
        const termData = groupedFees[year][term];
        message += `\n📚 **${term.toUpperCase()} TERM**\n`;
        message += `📅 **Period:** ${new Date(termData.termStart).toLocaleDateString()} - ${new Date(termData.termEnd).toLocaleDateString()}\n`;
        message += `┌─────────────────────────────────────────┐\n`;
        
        termData.fees.forEach((fee, index) => {
          const statusIcon = fee.status === 'paid' ? '✅' : fee.status === 'Partial' ? '🟡' : '❌';
          const statusText = fee.status === 'paid' ? 'PAID' : fee.status === 'Partial' ? 'PARTIAL' : 'PENDING';
          const paymentInfo = fee.paymentDate ? `\n│ 💳 **Last Payment:** ${new Date(fee.paymentDate).toLocaleDateString()}` : '';
          
          message += `│ ${statusIcon} **${fee.name.toUpperCase()}**\n`;
          message += `│ 💰 **Amount:** ₦${Number(fee.amount).toLocaleString()}\n`;
          message += `│ 💵 **paid:** ₦${Number(fee.paid).toLocaleString()}\n`;
          message += `│ 📊 **Balance:** ₦${Number(fee.balance).toLocaleString()}\n`;
          message += `│ 🏷️ **Status:** ${statusText}${paymentInfo}\n`;
          
          if (index < termData.fees.length - 1) {
            message += `├─────────────────────────────────────────┤\n`;
          }
        });
        
        message += `└─────────────────────────────────────────┘\n`;
      });
    });

    // Summary section
    message += `\n\n📊 **FINANCIAL SUMMARY**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 **Total paid:** ₦${totalPaid.toLocaleString()}\n`;
    message += `📈 **Outstanding:** ₦${totalOutstanding.toLocaleString()}\n`;
    message += `📊 **Payment Progress:** ${totalPaid > 0 ? Math.round((totalPaid / (totalPaid + totalOutstanding)) * 100) : 0}%\n`;
    
    // AI analysis with enhanced formatting
    message += `\n\n🤖 **AI INSIGHTS**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (totalOutstanding > 0) {
      const overdueTerms = Object.values(groupedFees).flatMap(year => 
        Object.values(year).filter(term => 
          term.fees.some(fee => Number(fee.balance) > 0 && new Date() > new Date(term.termEnd))
        )
      );
      
      if (overdueTerms.length > 0) {
        message += `⚠️ **Alert:** You have ${overdueTerms.length} overdue term(s)\n`;
        message += `💡 **Recommendation:** Consider immediate payment to avoid service interruptions\n`;
        message += `📞 **Support:** Contact school administration for payment plans`;
      } else {
        message += `⚠️ **Notice:** Outstanding balance detected\n`;
        message += `💡 **Recommendation:** Schedule payment before term ends\n`;
        message += `📅 **Deadline:** Check term end dates above`;
      }
    } else {
      message += `✅ **Excellent:** All fees are up to date!\n`;
      message += `🎉 **Achievement:** Outstanding payment record\n`;
      message += `💪 **Keep it up:** Continue this great momentum`;
    }
    
    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    // Split message if too long (Telegram limit is 4096 characters)
    if (message.length > 4000) {
      const chunks = message.match(/.{1,4000}/g) || [message];
      for (let i = 0; i < chunks.length; i++) {
        await bot.sendMessage(chatId, chunks[i], { parse_mode: 'Markdown' });
        if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }
    
  } catch (err) {
    console.error('[EnhancedBot] fees error:', err);
    await bot.sendMessage(chatId, 'failed to fetch fee balance. Please try again later.');
  }
}


// ------------------------------- EVENTS ---------------------------------

async function handleEvents(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  // Track feature usage
  trackFeatureUsage(chatId, 'events');
  if (!s.schoolId) return bot.sendMessage(chatId, 'No school information available. Please contact support.');
  
  try {
    const events = await getEvents(s.schoolId);
    if (!Array.isArray(events) || events.length === 0) {
      return bot.sendMessage(chatId, `
📅 **SCHOOL EVENTS CALENDAR**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📭 **No Events Scheduled**
Currently, there are no upcoming events for ${s.school || 'your school'}.

💡 **Stay Updated:** Check back regularly for new announcements and events.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(), { parse_mode: 'Markdown' });
    }

    // Sort events by date (upcoming first)
    const sortedEvents = events
      .filter(event => event.date && new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    if (sortedEvents.length === 0) {
      return bot.sendMessage(chatId, `
📅 **SCHOOL EVENTS CALENDAR**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📭 **No Upcoming Events**
All scheduled events have passed. New events will be announced soon.

💡 **Stay Updated:** Check back regularly for new announcements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(), { parse_mode: 'Markdown' });
    }

    // Build modern event display
    let message = `
📅 **SCHOOL EVENTS CALENDAR**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏫 **School:** ${s.school || 'Your School'}
📊 **Upcoming Events:** ${sortedEvents.length} event(s) found

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Add each event with modern formatting
    sortedEvents.forEach((event, index) => {
      message += `\n\n${formatEvent(event)}`;
      if (index < sortedEvents.length - 1) {
        message += '\n';
      }
    });

    // Add footer with additional info
    message += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 **Tip:** Mark important dates in your calendar
📱 **Updates:** You'll receive notifications for major events
📞 **Questions:** Contact school administration for more details
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Split message if too long
    if (message.length > 4000) {
      const chunks = message.match(/.{1,4000}/g) || [message];
      for (let i = 0; i < chunks.length; i++) {
        await bot.sendMessage(chatId, chunks[i], { parse_mode: 'Markdown' });
        if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }
    
  } catch (err) {
    console.error('[EnhancedBot] events error:', err);
    await bot.sendMessage(chatId, `
❌ **Error Loading Events**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚫 **Issue:** failed to fetch school events
💡 **Solution:** Please try again in a few moments
📞 **Support:** Contact school administration if problem persists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(), { parse_mode: 'Markdown' });
  }
}





// ------------------------------- AI INSIGHTS ---------------------------------

async function handleAIInsights(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  // Track feature usage
  trackFeatureUsage(chatId, 'ai_insights');

  // Under development
  await bot.sendMessage(chatId, '🤖 AI insights are currently under development. \nPlease try again later.');

  // try {
  //   // Use optimized student data
  //   const studentData = await getStudentDataOptimized(chatId);
  //   if (!studentData) return bot.sendMessage(chatId, 'Student information not available. Please contact support.');

  //   await bot.sendMessage(chatId, '🤖 Generating AI insights... Please wait.');
  //   const insights = await generateAIInsights(chatId, studentData.id, studentData.schoolId);
  //   await bot.sendMessage(chatId, insights, { parse_mode: 'Markdown' });
  // } catch (err) {
  //   console.error('[EnhancedBot] AI insights error:', err);
  //   await bot.sendMessage(chatId, 'failed to generate insights. Please try again later.');
  // }
}




// ------------------------------- RESULTS ---------------------------------


async function handleResults(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    // Use optimized session data instead of redundant query
    const studentData = await getStudentDataOptimized(chatId);
    if (!studentData) return bot.sendMessage(chatId, 'Student not found for your account.');
    
    const studentId = studentData.id;

    // Fetch academic years first - these are the top-level filter
    const academicYears = await getYear();

    // Also fetch exam types and classes for later use
    const types = await getExam();
    const classes = await getClass();

    upsertSession(chatId, {
      results: {
        studentId,
        academicYearId: null,
        termId: null,
        typeId: null,
        classId: null,
        academicYears,
        terms: [], // Will be populated when academic year is selected
        types,
        classes,
      },
    });

    await bot.sendMessage(chatId, '📊 **Results:** \n\nFilter results by academic year, term, exam type, and class.');
    await showAcademicYearPicker(chatId);
  } catch (e) {
    console.error('[EnhancedBot] results init error:', e);
    await bot.sendMessage(chatId, 'failed to load options. Please try again later.');
  }
}


async function showAcademicYearPicker(chatId) {
  const s = getSession(chatId);
  const academicYears = (s && s.results && s.results.academicYears) || [];

  if (!academicYears.length) {
    return bot.sendMessage(chatId, '❌ No academic years found in the system. Please contact the administrator.');
  }
  
  const rows = academicYears.slice(0, 24).map(item => {
    const callbackData = `results:set:academicyear:${item.id}`;
    return [{ 
      text: `${item.name} (${new Date(item.start_date).getFullYear()}-${new Date(item.end_date).getFullYear()})`, 
      callback_data: callbackData
    }];
  });
  await bot.sendMessage(chatId, '📅 **Select Academic Year:**', { reply_markup: { inline_keyboard: rows } });
}

async function showTermPicker(chatId) {
  const s = getSession(chatId);
  const terms = (s && s.results && s.results.terms) || [];
  if (!terms.length) {
    return bot.sendMessage(chatId, '❌ No terms found for the selected academic year. Please select a different academic year.');
  }
  const rows = terms.slice(0, 24).map(t => ([{ text: t.name, callback_data: `results:set:term:${t.id}` }]));
  await bot.sendMessage(chatId, '📚 **Select Term:**', { reply_markup: { inline_keyboard: rows } });
}

async function showTypePicker(chatId) {
  const s = getSession(chatId);
  const types = (s && s.results && s.results.types) || [];
  if (!types.length) {
    return bot.sendMessage(chatId, '❌ No exam types configured in the system. Please contact the administrator.');
  }
  const rows = types.slice(0, 24).map(t => ([{ text: t.name, callback_data: `results:set:type:${t.id}` }]));
  await bot.sendMessage(chatId, '📝 **Select Exam Type:**', { reply_markup: { inline_keyboard: rows } });
}

async function showClassPicker(chatId) {
  const s = getSession(chatId);
  const classes = (s && s.results && s.results.classes) || [];
  if (!classes.length) {
    return bot.sendMessage(chatId, '❌ No classes found in the system. Please contact the administrator.');
  }
  const rows = classes.slice(0, 24).map(c => ([{ text: c.name, callback_data: `results:set:class:${c.id}` }]));
  await bot.sendMessage(chatId, '🏫 **Select Class:**', { reply_markup: { inline_keyboard: rows } });
}

async function processResultsCallback(chatId, data, callbackId) {
  const s = getSession(chatId);
  if (!s || !s.results) return bot.answerCallbackQuery(callbackId, { text: 'Session expired. Use /results again.' });

  if (data === 'results:init') {
    await bot.answerCallbackQuery(callbackId);
    return showAcademicYearPicker(chatId);
  }

  const m = data.match(/^results:set:(academicyear|term|type|class):(.+)$/);
  if (!m) {
    console.log('[EnhancedBot] No match for callback data:', data);
    return bot.answerCallbackQuery(callbackId);
  }
  const key = m[1];
  const val = m[2]; // Keep as string since IDs might be UUIDs
  
  // Handle academic year selection - fetch terms for that year
  if (key === 'academicyear') {
    try {
      // Use model function to get all terms, then filter by academic year
      const allTerms = await getTerm();
      const terms = allTerms.filter(term => term.yearid === val);
      
      const results = Object.assign({}, s.results, { 
        academicYearId: val,
        terms,
        termId: null, // Reset term selection
        typeId: null, // Reset type selection
        classId: null // Reset class selection
      });
      upsertSession(chatId, { results });
      await bot.answerCallbackQuery(callbackId, { text: 'Academic year selected' });
      return showTermPicker(chatId);
    } catch (e) {
      await bot.answerCallbackQuery(callbackId, { text: 'Error loading terms' });
      return;
    }
  }
  
  const results = Object.assign({}, s.results, { [`${key}Id`]: val });
  upsertSession(chatId, { results });
  await bot.answerCallbackQuery(callbackId, { text: `${key} selected` });

  // Check flow: Academic Year → Term → Exam Type → Class
  if (!results.academicYearId) return showAcademicYearPicker(chatId);
  if (!results.termId) return showTermPicker(chatId);
  if (!results.typeId) return showTypePicker(chatId);
  if (!results.classId) return showClassPicker(chatId);

  try {
    // Get comprehensive student and academic information
    const studentInfoQuery = `
      SELECT 
        s.name AS student_name,
        ay.name AS academic_year,
        t.name AS term_name,
        e.name AS exam_type,
        c.name AS class_name,
        c.denom AS class_denom
      FROM students s
      INNER JOIN acyear ay ON ay.id = ?
      INNER JOIN term t ON t.id = ?
      INNER JOIN exam e ON e.id = ?
      INNER JOIN class c ON c.id = ?
      WHERE s.id = ?
    `;
    const [studentInfoResult] = await db.query(studentInfoQuery, [
      results.academicYearId, 
      results.termId, 
      results.typeId, 
      results.classId, 
      results.studentId
    ]);
    
    if (!studentInfoResult || studentInfoResult.length === 0) {
      return bot.sendMessage(chatId, 'Student information not found.');
    }
    
    const studentInfo = studentInfoResult[0];
    const classDenom = studentInfo.class_denom;
    
    // Get individual subject results
    const sql = `SELECT subj.name AS subject, r.score, r.grade, r.remarks
      FROM results r
      INNER JOIN subject subj ON subj.id = r.subjectid
      WHERE r.studentid = ? AND r.termid = ? AND r.typeid = ? AND r.classid = ?
      ORDER BY r.score DESC`;
    const params = [results.studentId, results.termId, results.typeId, results.classId];
    const [studentResults] = await db.query(sql, params);
    
    if (!studentResults || studentResults.length === 0) {
      return bot.sendMessage(chatId, 'No results found for the selected filters.');
    }
 
    // Create modern report card design
    let message = `🎓 **ACADEMIC REPORT CARD**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Student Information Header
    message += `👤 **Student:** ${studentInfo.student_name}\n`;
    message += `📅 **Academic Year:** ${studentInfo.academic_year}\n`;
    message += `📚 **Term:** ${studentInfo.term_name}\n`;
    message += `📝 **Examination:** ${studentInfo.exam_type}\n`;
    message += `🏫 **Class:** ${studentInfo.class_name} (${classDenom})\n\n`;
    
    message += `📊 **SUBJECT RESULTS**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    // Subject results with modern formatting
    const lines = studentResults.map((r, index) => {
      const rank = index + 1;
      const numericScore = parseFloat(r.score) || 0;
      const scoreBar = '█'.repeat(Math.floor(numericScore / 10)) + '░'.repeat(10 - Math.floor(numericScore / 10));
      return `${rank}. ${r.subject}\n   Score: ${numericScore}% (${r.grade}) ${scoreBar}\n   ${r.remarks ? `📝 ${r.remarks}` : ''}`;
    });
    message += lines.join('\n\n');
    
    // Calculate aggregation and performance summary
    message += `\n\n📈 **PERFORMANCE SUMMARY**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    // Calculate aggregation based on class denomination
    if (classDenom === 'MSCE') {
      // MSCE: Sum top 6 grades (convert grades to numeric values)
      const top6Results = studentResults.slice(0, 6);
      const gradeSum = top6Results.reduce((sum, r) => {
        const gradeValue = parseInt(r.grade) || 0; // Convert grade to number
        return sum + gradeValue;
      }, 0);
      message += `🎯 **Total Points (Top 6):** ${gradeSum}\n`;
    } else if (classDenom === 'JCE') {
      // JCE: Sum top 6 scores
      const top6Results = studentResults.slice(0, 6);
      const scoreSum = top6Results.reduce((sum, r) => sum + (parseFloat(r.score) || 0), 0);
      message += `🎯 **Total Marks (Top 6):** ${scoreSum}\n`;
    }
    
    // Overall performance statistics
    // Ensure scores are properly converted to numbers
    const numericScores = studentResults.map(r => parseFloat(r.score) || 0);
    const avgScore = numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length;
    const highestScore = Math.max(...numericScores);
    const lowestScore = Math.min(...numericScores);
    
    message += `📊 **Average Score:** ${avgScore.toFixed(1)}%\n`;
    message += `🏆 **Highest Score:** ${highestScore}%\n`;
    message += `📉 **Lowest Score:** ${lowestScore}%\n`;
    message += `📚 **Total Subjects:** ${studentResults.length}\n`;
    // AI Performance Analysis
    message += `\n\n🤖 **AI PERFORMANCE ANALYSIS**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (avgScore >= 80) {
      message += `🎉 **Outstanding Performance!**\n`;
      message += `Your child is excelling academically with an average of ${avgScore.toFixed(1)}%.\n`;
      message += `This demonstrates excellent understanding and consistent effort.`;
    } else if (avgScore >= 70) {
      message += `🌟 **Very Good Performance!**\n`;
      message += `Your child is performing well with an average of ${avgScore.toFixed(1)}%.\n`;
      message += `Continue the great work and aim for even higher scores.`;
    } else if (avgScore >= 60) {
      message += `📚 **Good Progress!**\n`;
      message += `Your child is making steady progress with an average of ${avgScore.toFixed(1)}%.\n`;
      message += `Focus on areas that need improvement for better results.`;
    } else {
      message += `💪 **Keep Working Hard!**\n`;
      message += `Your child has an average of ${avgScore.toFixed(1)}% and needs more support.\n`;
      message += `Consider additional study time and teacher consultation.`;
    }
    
    // Add footer
    message += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📅 **Report Generated:** ${new Date().toLocaleDateString()}\n`;
    message += `🏫 **XoolHub School Management System**`;
    
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (e) {
    console.error('[EnhancedBot] results fetch error:', e);
    await bot.sendMessage(chatId, 'failed to load results. Please try again later.');
  }
}


// ------------------------------- ATTENDANCE ---------------------------------

async function handleAttendance(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  
  try {
    // Use optimized session data instead of redundant query
    const studentData = await getStudentDataOptimized(chatId);
    if (!studentData) return bot.sendMessage(chatId, 'Student not found for your account.');
    
    const studentId = studentData.id;

    const [rows] = await db.query('SELECT date, status, note FROM attendance WHERE studentid = ? ORDER BY date DESC LIMIT 15', [studentId]);
    if (!rows || rows.length === 0) {
      return bot.sendMessage(chatId, `
📊 **ATTENDANCE RECORD**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📭 **No Attendance Data**
No attendance records found for ${studentData.name || 'your student'}.

💡 **Note:** Attendance data will appear here once the school starts recording daily attendance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(), { parse_mode: 'Markdown' });
    }
    
    // Calculate attendance statistics
    const presentCount = rows.filter(r => r.status === 'present').length;
    const absentCount = rows.filter(r => r.status === 'absent').length;
    const lateCount = rows.filter(r => r.status === 'Late').length;
    const totalDays = rows.length;
    const attendanceRate = (presentCount / totalDays) * 100;
    
    // Build modern attendance display
    let message = `
📊 **ATTENDANCE RECORD**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 **Student:** ${studentData.name || 'Unknown'}
📅 **Period:** Last ${totalDays} school days
📈 **Attendance Rate:** ${attendanceRate.toFixed(1)}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Add attendance summary
    message += `\n\n📈 **ATTENDANCE SUMMARY**\n`;
    message += `┌─────────────────────────────────────────┐\n`;
    message += `│ ✅ **present:** ${presentCount} days\n`;
    message += `│ ❌ **absent:** ${absentCount} days\n`;
    message += `│ ⏰ **Late:** ${lateCount} days\n`;
    message += `│ 📊 **Total Days:** ${totalDays} days\n`;
    message += `└─────────────────────────────────────────┘\n`;

    // Add recent attendance records
    message += `\n\n📅 **RECENT ATTENDANCE HISTORY**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    rows.slice(0, 10).forEach((record, index) => {
      const date = new Date(record.date).toLocaleDateString();
      const statusIcon = record.status === 'present' ? '✅' : 
                        record.status === 'Late' ? '⏰' : '❌';
      const statusText = record.status.toUpperCase();
      const note = record.note ? `\n│ 📝 **Note:** ${record.note}` : '';
      
      message += `┌─────────────────────────────────────────┐\n`;
      message += `│ ${statusIcon} **${date}** - ${statusText}${note}\n`;
      message += `└─────────────────────────────────────────┘\n`;
      
      if (index < Math.min(rows.length, 10) - 1) {
        message += '\n';
      }
    });

    // Enhanced AI insights
    message += `\n\n🤖 **AI INSIGHTS & RECOMMENDATIONS**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (attendanceRate >= 95) {
      message += `🏆 **Outstanding:** Perfect attendance record!\n`;
      message += `💪 **Achievement:** ${attendanceRate.toFixed(1)}% attendance rate\n`;
      message += `🎉 **Recognition:** This level of commitment is exemplary\n`;
      message += `💡 **Tip:** Keep up this excellent attendance pattern`;
    } else if (attendanceRate >= 90) {
      message += `✅ **Excellent:** Very good attendance record\n`;
      message += `📊 **Performance:** ${attendanceRate.toFixed(1)}% attendance rate\n`;
      message += `👍 **Status:** Above average attendance\n`;
      message += `💡 **Goal:** Aim for 95%+ for perfect record`;
    } else if (attendanceRate >= 80) {
      message += `📈 **Good:** Solid attendance performance\n`;
      message += `📊 **Current:** ${attendanceRate.toFixed(1)}% attendance rate\n`;
      message += `🎯 **Improvement:** Room for enhancement\n`;
      message += `💡 **Action:** Focus on reducing absences`;
    } else if (attendanceRate >= 70) {
      message += `⚠️ **Concerning:** Attendance needs attention\n`;
      message += `📊 **Rate:** ${attendanceRate.toFixed(1)}% attendance rate\n`;
      message += `🚨 **Alert:** Below recommended threshold\n`;
      message += `💡 **Priority:** Immediate improvement needed`;
    } else {
      message += `🚨 **critical:** Poor attendance record\n`;
      message += `📊 **Rate:** ${attendanceRate.toFixed(1)}% attendance rate\n`;
      message += `⚠️ **Warning:** This affects academic progress\n`;
      message += `💡 **Urgent:** Contact school administration immediately`;
    }

    // Add additional insights based on patterns
    if (lateCount > 0) {
      const lateRate = (lateCount / totalDays) * 100;
      message += `\n\n⏰ **PUNCTUALITY ANALYSIS**\n`;
      message += `📊 **Late Rate:** ${lateRate.toFixed(1)}%\n`;
      if (lateRate > 20) {
        message += `⚠️ **Issue:** Frequent lateness detected\n`;
        message += `💡 **Solution:** Consider earlier departure times`;
      } else {
        message += `✅ **Status:** Good punctuality overall`;
      }
    }

    message += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💡 **Tip:** Regular attendance is crucial for academic success\n`;
    message += `📞 **Support:** Contact school for attendance concerns\n`;
    message += `📱 **Updates:** You'll receive notifications for absences\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    // Split message if too long
    if (message.length > 4000) {
      const chunks = message.match(/.{1,4000}/g) || [message];
      for (let i = 0; i < chunks.length; i++) {
        await bot.sendMessage(chatId, chunks[i], { parse_mode: 'Markdown' });
        if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }
    
  } catch (e) {
    console.error('[EnhancedBot] attendance error:', e);
    await bot.sendMessage(chatId, `
❌ **Error Loading Attendance**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚫 **Issue:** failed to fetch attendance data
💡 **Solution:** Please try again in a few moments
📞 **Support:** Contact school administration if problem persists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(), { parse_mode: 'Markdown' });
  }
}




// ------------------------------- DISCIPLINE ---------------------------------

async function handleDiscipline(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  
  try {
    // Use optimized session data instead of redundant query
    const studentData = await getStudentDataOptimized(chatId);
    if (!studentData) return bot.sendMessage(chatId, 'Student not found for your account.');
    
    const studentId = studentData.id;

    const [rows] = await db.query('SELECT incident_date, category, action_taken, severity_level, remarks FROM disciplinary_records WHERE student_id = ? ORDER BY incident_date DESC LIMIT 15', [studentId]);
    if (!rows || rows.length === 0) {
      return bot.sendMessage(chatId, `
📋 **DISCIPLINARY RECORDS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ **Clean Record**
No disciplinary records found for ${studentData.name || 'your student'}.

🎉 **Excellent Behavior:** This student maintains good conduct and follows school rules.

💡 **Keep it up:** Continue positive reinforcement and good behavior at home.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(), { parse_mode: 'Markdown' });
    }
    
    // Calculate disciplinary statistics
    const criticalIssues = rows.filter(r => r.severity === 'critical').length;
    const highIssues = rows.filter(r => r.severity === 'high').length;
    const mediumIssues = rows.filter(r => r.severity === 'medium').length;
    const lowIssues = rows.filter(r => r.severity === 'low').length;
    const totalRecords = rows.length;
    
    // Group by category
    const categoryCounts = {};
    rows.forEach(record => {
      categoryCounts[record.category] = (categoryCounts[record.category] || 0) + 1;
    });
    
    // Build modern disciplinary display
    let message = `
📋 **DISCIPLINARY RECORDS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 **Student:** ${studentData.name || 'Unknown'}
📅 **Period:** Last ${totalRecords} disciplinary record(s)
📊 **Total Issues:** ${totalRecords} incident(s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Add severity summary
    message += `\n\n🚨 **SEVERITY BREAKDOWN**\n`;
    message += `┌─────────────────────────────────────────┐\n`;
    if (criticalIssues > 0) message += `│ 🔴 **critical:** ${criticalIssues} incident(s)\n`;
    if (highIssues > 0) message += `│ 🟠 **high:** ${highIssues} incident(s)\n`;
    if (mediumIssues > 0) message += `│ 🟡 **medium:** ${mediumIssues} incident(s)\n`;
    if (lowIssues > 0) message += `│ 🟢 **low:** ${lowIssues} incident(s)\n`;
    message += `└─────────────────────────────────────────┘\n`;

    // Add category breakdown
    if (Object.keys(categoryCounts).length > 0) {
      message += `\n\n📂 **CATEGORY ANALYSIS**\n`;
      message += `┌─────────────────────────────────────────┐\n`;
      Object.entries(categoryCounts).forEach(([category, count]) => {
        const categoryIcon = category.toLowerCase().includes('behavior') ? '👥' :
                           category.toLowerCase().includes('academic') ? '📚' :
                           category.toLowerCase().includes('attendance') ? '⏰' :
                           category.toLowerCase().includes('uniform') ? '👔' :
                           category.toLowerCase().includes('respect') ? '🤝' :
                           '📋';
        message += `│ ${categoryIcon} **${category}:** ${count} time(s)\n`;
      });
      message += `└─────────────────────────────────────────┘\n`;
    }

    // Add recent disciplinary records
    message += `\n\n📅 **RECENT DISCIPLINARY HISTORY**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    rows.slice(0, 10).forEach((record, index) => {
      const date = new Date(record.date).toLocaleDateString();
      const severityIcon = record.severity === 'critical' ? '🔴' :
                          record.severity === 'high' ? '🟠' :
                          record.severity === 'medium' ? '🟡' : '🟢';
      const severityText = record.severity.toUpperCase();
      const action = record.action ? `\n│ ⚡ **Action:** ${record.action}` : '';
      const remarks = record.remarks ? `\n│ 📝 **Remarks:** ${record.remarks}` : '';
      
      message += `┌─────────────────────────────────────────┐\n`;
      message += `│ ${severityIcon} **${date}** - ${severityText} SEVERITY\n`;
      message += `│ 📂 **Category:** ${record.category}${action}${remarks}\n`;
      message += `└─────────────────────────────────────────┘\n`;
      
      if (index < Math.min(rows.length, 10) - 1) {
        message += '\n';
      }
    });

    // Enhanced AI insights
    message += `\n\n🤖 **AI INSIGHTS & RECOMMENDATIONS**\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (criticalIssues > 0) {
      message += `🚨 **CRITICAL ALERT:** Immediate intervention required\n`;
      message += `🔴 **Status:** ${criticalIssues} critical incident(s) detected\n`;
      message += `⚠️ **Impact:** This affects academic progress and school standing\n`;
      message += `💡 **Action:** Schedule immediate meeting with school administration\n`;
      message += `📞 **Priority:** Contact school counselor and principal today`;
    } else if (highIssues > 0) {
      message += `⚠️ **HIGH PRIORITY:** Serious behavioral concerns\n`;
      message += `🟠 **Status:** ${highIssues} high-severity incident(s) recorded\n`;
      message += `📊 **Trend:** Requires immediate attention and intervention\n`;
      message += `💡 **Action:** Schedule meeting with teachers and administration\n`;
      message += `🏠 **Home:** Implement consistent discipline and positive reinforcement`;
    } else if (mediumIssues > 0) {
      message += `📊 **MODERATE CONCERN:** Behavioral patterns need attention\n`;
      message += `🟡 **Status:** ${mediumIssues} medium-severity incident(s)\n`;
      message += `🎯 **Focus:** Address specific behavioral areas\n`;
      message += `💡 **Action:** Work with teachers on improvement strategies\n`;
      message += `🏠 **Home:** Reinforce positive behavior and clear expectations`;
    } else if (lowIssues > 0) {
      message += `✅ **MINOR ISSUES:** Generally good behavior with minor concerns\n`;
      message += `🟢 **Status:** ${lowIssues} low-severity incident(s)\n`;
      message += `👍 **Overall:** Student maintains good conduct\n`;
      message += `💡 **Action:** Continue positive reinforcement\n`;
      message += `🏠 **Home:** Acknowledge good behavior and address minor issues`;
    } else {
      message += `🎉 **EXCELLENT BEHAVIOR:** No disciplinary issues recorded\n`;
      message += `✅ **Status:** Clean disciplinary record\n`;
      message += `🏆 **Achievement:** Outstanding conduct and behavior\n`;
      message += `💡 **Recognition:** This student sets a positive example\n`;
      message += `🏠 **Home:** Continue current positive reinforcement strategies`;
    }

    // Add behavioral improvement tips
    if (totalRecords > 0) {
      message += `\n\n💡 **BEHAVIORAL IMPROVEMENT STRATEGIES**\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `🏠 **At Home:**\n`;
      message += `• Establish clear rules and consequences\n`;
      message += `• Use positive reinforcement for good behavior\n`;
      message += `• Maintain consistent discipline\n`;
      message += `• Communicate regularly with teachers\n\n`;
      message += `🏫 **At School:**\n`;
      message += `• Work closely with teachers and counselors\n`;
      message += `• Attend parent-teacher conferences\n`;
      message += `• Support school disciplinary measures\n`;
      message += `• Encourage positive peer relationships`;
    }

    message += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💡 **Remember:** Consistent communication between home and school is key\n`;
    message += `📞 **Support:** Contact school administration for behavioral concerns\n`;
    message += `📱 **Updates:** You'll receive notifications for new disciplinary records\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    // Split message if too long
    if (message.length > 4000) {
      const chunks = message.match(/.{1,4000}/g) || [message];
      for (let i = 0; i < chunks.length; i++) {
        await bot.sendMessage(chatId, chunks[i], { parse_mode: 'Markdown' });
        if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }
    
  } catch (e) {
    console.error('[EnhancedBot] discipline error:', e);
    await bot.sendMessage(chatId, `
❌ **Error Loading Disciplinary Records**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚫 **Issue:** failed to fetch disciplinary data
💡 **Solution:** Please try again in a few moments
📞 **Support:** Contact school administration if problem persists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(), { parse_mode: 'Markdown' });
  }
}

async function handleLogout(msg) {
  const chatId = msg.chat.id;
  removeSession(chatId);
  await bot.sendMessage(chatId, 'You have been logged out. Use /login to sign in again.', {
    reply_markup: { remove_keyboard: true },
  });
}

// ------------------------------- NATURAL LANGUAGE PROCESSING ---------------------------------

async function handleNaturalLanguage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const s = getSession(chatId);
  
  if (!s || !s.phone) {
    return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  }

  try {
    // Analyze the user input
    const analysis = aiUtils.analyzeText(text);
    
    // Get optimized student data for context
    const studentData = await getStudentDataOptimized(chatId);
    if (!studentData) {
      return bot.sendMessage(chatId, 'Student data not available. Please try logging in again.');
    }
    
    // Get AI data for comprehensive analysis
    const aiData = await getStudentDataForAI(studentData.id, studentData.schoolId);
    
    // Generate smart response
    const response = aiUtils.generateSmartResponse(text, aiData, { 
      studentName: studentData.name,
      chatId: chatId 
    });
    
    // Send response with analysis info
    let message = response;
    if (analysis.intent.confidence > 0.7) {
      message += `\n\n🤖 *I understood you're asking about: ${analysis.intent.category}*`;
    }
    
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    
    // Log the interaction for learning
    console.log(`[EnhancedBot] NLP - User: "${text}" | Intent: ${analysis.intent.category} | Sentiment: ${analysis.sentiment.score}`);
    
  } catch (error) {
    console.error('[EnhancedBot] NLP error:', error);
    await bot.sendMessage(chatId, 'I\'m having trouble understanding that. Please try rephrasing or use the menu buttons.');
  }
}

async function handleTextButtons(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim().toLowerCase();
  
  // Handle button commands
  if (text === 'help') return handleHelp(msg);
  if (text === 'ai demo') return handleAIDemo(msg);
  if (text === 'cancel') return handleCancelLogin(msg);
  if (text === 'my student') return handleMe(msg);
  if (text === 'my fees') return handleFees(msg);
  if (text === 'events') return handleEvents(msg);
  if (text === 'settings') return handleSettings(msg);
  if (text === 'menu') return handleMenu(msg);
  if (text === 'results') return handleResults(msg);
  if (text === 'attendance') return handleAttendance(msg);
  if (text === 'discipline') return handleDiscipline(msg);
  if (text === '🤖 ai insights') return handleAIInsights(msg);
  if (text === 'talk to teacher') return handleTalkToTeacher(msg);
  if (text === 'talk to administrator') return handleTalkToAdministrator(msg);
  if (text === 'feedback') return handleFeedback(msg);
  if (text === 'logout') return handleLogout(msg);

  // Handle conversation messages
  const s = getSession(chatId);
  if (s && s.activeConversation) {
    return handleConversationMessage(msg);
  }

  // Handle conversation request messages
  if (s && s.conversationRequest) {
    return handleConversationRequestMessage(msg);
  }

  // Handle feedback comment input
  if (s && s.expectingFeedbackComment) {
    // Store the comment in the feedback data
    const feedbackData = s.feedbackData || {};
    feedbackData.comment = text;
    upsertSession(chatId, { 
      feedbackData,
      expectingFeedbackComment: false 
    });
    
    const message = `📝 **Comment Added**

Your comment has been saved:
"${text}"

Click "Submit Feedback" to complete your feedback submission.`;

    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Submit Feedback', callback_data: 'feedback:submit' }
        ],
        [
          { text: '❌ Cancel', callback_data: 'feedback:cancel' }
        ]
      ]
    };

    return bot.sendMessage(chatId, message, { 
      reply_markup: keyboard, 
      parse_mode: 'Markdown' 
    });
  }

  // Prevent manual phone number entry during login
  if (s && s.expectingContact && /\+?\d[\d\s()-]{5,}/.test(text)) {
    return bot.sendMessage(chatId, 'For security, please use the "Share my phone number" button so we can verify it is your Telegram-verified number.');
  }

  // Handle natural language input
  if (s && s.phone) {
    return handleNaturalLanguage(msg);
  }
}

async function handleMenu(msg) {
  const chatId = msg.chat.id;
  const menu = {
    keyboard: [
      [{ text: 'My student' }, { text: 'My fees' }],
      [{ text: 'Events' }, { text: 'Settings' }],
      [{ text: 'Results' }, { text: 'Attendance' }],
      [{ text: '🤖 AI Insights' }, { text: 'Discipline' }],
      [{ text: 'Talk to teacher' }, { text: 'Talk to administrator' }],
      [{ text: 'Feedback' }, { text: 'Menu' }],
      [{ text: 'Logout' }],
    ],
    resize_keyboard: true,
  };
  await bot.sendMessage(chatId, '🤖 **AI-Enhanced Menu** restored.', { reply_markup: menu, parse_mode: 'Markdown' });
}


// ------------------------------- SETTINGS ---------------------------------

async function handleSettings(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');
  
  const eventsOn = !!(s.prefs && s.prefs.events);
  const feesOn = !!(s.prefs && s.prefs.fees);
  const aiOn = !!(s.prefs && s.prefs.aiInsights);
  
  // Build modern settings display
  const message = `
⚙️ **NOTIFICATION SETTINGS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 **User:** ${s.studentName || 'parent'}
📱 **Phone:** ${s.phone}
🏫 **School:** ${s.school || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 **CURRENT PREFERENCES**
┌─────────────────────────────────────────┐
│ 📅 **Events:** ${eventsOn ? '✅ Enabled' : '❌ Disabled'}
│ 💰 **Fees:** ${feesOn ? '✅ Enabled' : '❌ Disabled'}
│ 🤖 **AI Insights:** ${aiOn ? '✅ Enabled' : '❌ Disabled'}
└─────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **What you'll receive:**
• 📅 **Events:** School announcements, holidays, meetings
• 💰 **Fees:** Payment reminders, balance updates
• 🤖 **AI Insights:** Smart analysis and recommendations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 **Manage your preferences below:**
  `.trim();
  
  const keyboard = {
    inline_keyboard: [
      [
        { 
          text: `📅 Events ${eventsOn ? '✅' : '❌'}`, 
          callback_data: 'settings:toggle:events' 
        },
        { 
          text: `💰 Fees ${feesOn ? '✅' : '❌'}`, 
          callback_data: 'settings:toggle:fees' 
        },
      ],
      [
        { 
          text: `🤖 AI Insights ${aiOn ? '✅' : '❌'}`, 
          callback_data: 'settings:toggle:ai' 
        },
      ],
      [
        { 
          text: '🔄 Reset to Defaults', 
          callback_data: 'settings:reset' 
        },
        { 
          text: '📵 Unsubscribe All', 
          callback_data: 'settings:unsubscribe' 
        },
      ],
      [
        { 
          text: 'ℹ️ Help & Support', 
          callback_data: 'settings:help' 
        },
      ],
    ],
  };
  
  await bot.sendMessage(chatId, message, { 
    reply_markup: keyboard, 
    parse_mode: 'Markdown' 
  });
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
      const prefs = Object.assign({ events: true, fees: true, aiInsights: true }, s.prefs || {});
      if (data === 'settings:unsubscribe') {
        prefs.events = false;
        prefs.fees = false;
        prefs.aiInsights = false;
        upsertSession(chatId, { prefs });
        await bot.answerCallbackQuery(query.id, { text: 'All notifications turned off' });
        return handleSettings({ chat: { id: chatId } });
      }
      const m = data.match(/^settings:toggle:(events|fees|ai)$/);
      if (m) {
        const key = m[1];
        if (key === 'ai') {
          prefs.aiInsights = !prefs.aiInsights;
        } else {
          prefs[key] = !prefs[key];
        }
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

    // Message Director callback
    if (data === 'message_director') {
      await bot.answerCallbackQuery(query.id, { 
        text: '🚧 Under Development - Coming Soon!', 
        show_alert: true 
      });
      return;
    }

    // Contact teacher callback
    if (data === 'contact_teacher') {
      await bot.answerCallbackQuery(query.id, { 
        text: '🚧 Under Development - Coming Soon!', 
        show_alert: true 
      });
      return;
    }

    // Feedback callbacks
    if (data.startsWith('feedback:')) {
      if (data === 'feedback:cancel') {
        await handleFeedbackCancel(chatId, query.id);
        return;
      }
      
      // Handle feedback type selection
      const typeMatch = data.match(/^feedback:type:(.+)$/);
      if (typeMatch) {
        await handleFeedbackType(chatId, typeMatch[1], query.id);
        return;
      }
      
      // Handle rating selection (with optional feedback type)
      const ratingMatch = data.match(/^feedback:rating:(\d+)(?::(.+))?$/);
      if (ratingMatch) {
        await handleFeedbackRating(chatId, ratingMatch[1], query.id, ratingMatch[2]);
        return;
      }
      
      if (data === 'feedback:comment') {
        await handleFeedbackComment(chatId, query.id);
        return;
      }
      
      if (data === 'feedback:submit') {
        await handleFeedbackSubmission(chatId, query.id);
        return;
      }
    }
  } catch (e) {
    console.error('[EnhancedBot] callback error:', e);
  }
}

// ------------------------------- FEEDBACK ---------------------------------

async function handleFeedback(msg) {
  const chatId = msg.chat.id;
  const session = getSession(chatId);
  
  if (!session || !session.studentData) {
    await bot.sendMessage(chatId, '❌ Please login first to submit feedback.');
    return;
  }

  const message = `📝 **Submit Feedback**

We value your opinion! Please help us improve our services by sharing your feedback.

**What would you like to rate?**`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '🤖 Bot Experience', callback_data: 'feedback:type:bot_experience' },
        { text: '🏫 School Communication', callback_data: 'feedback:type:school_communication' }
      ],
      [
        { text: '📊 Student Info Access', callback_data: 'feedback:type:student_info_access' },
        { text: '🧠 AI Features', callback_data: 'feedback:type:ai_features' }
      ],
      [
        { text: '⭐ Overall Experience', callback_data: 'feedback:type:overall' }
      ],
      [
        { text: '❌ Cancel', callback_data: 'feedback:cancel' }
      ]
    ]
  };

  await bot.sendMessage(chatId, message, { 
    reply_markup: keyboard, 
    parse_mode: 'Markdown' 
  });
}

async function handleFeedbackType(chatId, feedbackType, callbackId) {
  const session = getSession(chatId);
  if (!session) {
    await bot.answerCallbackQuery(callbackId, { text: 'Session expired. Please login again.', show_alert: true });
    return;
  }

  // Store the feedback type in session
  upsertSession(chatId, { 
    feedbackData: { 
      feedbackType,
      timestamp: Date.now() 
    } 
  });

  const typeLabels = {
    'bot_experience': '🤖 Bot Experience',
    'school_communication': '🏫 School Communication', 
    'student_info_access': '📊 Student Info Access',
    'ai_features': '🧠 AI Features',
    'overall': '⭐ Overall Experience'
  };

  const message = `📝 **Feedback - ${typeLabels[feedbackType]}**

Thank you for selecting the feedback category!

**Please rate your experience:**`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '⭐ Excellent (5)', callback_data: `feedback:rating:5:${feedbackType}` },
        { text: '👍 Good (4)', callback_data: `feedback:rating:4:${feedbackType}` }
      ],
      [
        { text: '😐 Average (3)', callback_data: `feedback:rating:3:${feedbackType}` },
        { text: '👎 Poor (2)', callback_data: `feedback:rating:2:${feedbackType}` }
      ],
      [
        { text: '😞 Very Poor (1)', callback_data: `feedback:rating:1:${feedbackType}` }
      ],
      [
        { text: '❌ Cancel', callback_data: 'feedback:cancel' }
      ]
    ]
  };

  await bot.answerCallbackQuery(callbackId, { text: `Selected: ${typeLabels[feedbackType]}` });
  await bot.sendMessage(chatId, message, { 
    reply_markup: keyboard, 
    parse_mode: 'Markdown' 
  });
}

async function handleFeedbackRating(chatId, rating, callbackId, feedbackType = null) {
  const session = getSession(chatId);
  if (!session) {
    await bot.answerCallbackQuery(callbackId, { text: 'Session expired. Please login again.', show_alert: true });
    return;
  }

  // Store the rating in session for later submission
  const feedbackData = session.feedbackData || {};
  feedbackData.rating = parseInt(rating);
  feedbackData.timestamp = Date.now();
  if (feedbackType) {
    feedbackData.feedbackType = feedbackType;
  }
  
  upsertSession(chatId, { feedbackData });

  const ratingText = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][rating];
  
  const message = `📝 **Feedback - Rating: ${ratingText} (${rating}/5)**

Thank you for your rating! 

**Optional:** Would you like to add a comment to help us understand your experience better?

You can:
• Type your comment and send it as a message
• Or click "Skip Comment" to submit without additional details`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📝 Add Comment', callback_data: 'feedback:comment' },
        { text: '⏭️ Skip Comment', callback_data: 'feedback:submit' }
      ],
      [
        { text: '❌ Cancel', callback_data: 'feedback:cancel' }
      ]
    ]
  };

  await bot.answerCallbackQuery(callbackId, { text: `Rating: ${ratingText}` });
  await bot.sendMessage(chatId, message, { 
    reply_markup: keyboard, 
    parse_mode: 'Markdown' 
  });
}

async function handleFeedbackComment(chatId, callbackId) {
  const session = getSession(chatId);
  if (!session) {
    await bot.answerCallbackQuery(callbackId, { text: 'Session expired. Please login again.', show_alert: true });
    return;
  }

  // Set session to expect feedback comment
  upsertSession(chatId, { expectingFeedbackComment: true });

  const message = `📝 **Add Your Comment**

Please type your feedback comment and send it as a message. 

**Tips for helpful feedback:**
• What did you like most?
• What could be improved?
• Any specific suggestions?
• How has the bot helped you?

You can also click "Skip Comment" if you prefer not to add details.`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '⏭️ Skip Comment', callback_data: 'feedback:submit' }
      ],
      [
        { text: '❌ Cancel', callback_data: 'feedback:cancel' }
      ]
    ]
  };

  await bot.answerCallbackQuery(callbackId, { text: 'Please type your comment' });
  await bot.sendMessage(chatId, message, { 
    reply_markup: keyboard, 
    parse_mode: 'Markdown' 
  });
}

async function handleFeedbackSubmission(chatId, callbackId) {
  const session = getSession(chatId);
  if (!session || !session.feedbackData) {
    await bot.answerCallbackQuery(callbackId, { text: 'No feedback data found. Please start over.', show_alert: true });
    return;
  }

  try {
    const { rating, comment, feedbackType } = session.feedbackData;
    const studentData = session.studentData;
    
    // Get school ID from student data
    const schoolId = studentData.schoolId;
    const studentId = studentData.id;
    const userId = chatId.toString();
    
    // Calculate session duration (approximate)
    const sessionStart = session.sessionStart || Date.now();
    const sessionDuration = Math.round((Date.now() - sessionStart) / (1000 * 60)); // in minutes
    
    // Get features used from session
    const featuresUsed = session.featuresUsed || [];
    
    // Submit feedback to new parent bot feedback table
    const success = await addParentBotFeedback(
      userId,
      schoolId,
      studentId,
      rating,
      feedbackType || 'overall',
      comment || '',
      'v2.0', // Bot version
      sessionDuration,
      featuresUsed
    );
    
    if (success) {
      // Clear feedback data from session
      upsertSession(chatId, { 
        feedbackData: null, 
        expectingFeedbackComment: false 
      });

      const message = `✅ **Feedback Submitted Successfully!**

Thank you for taking the time to share your feedback. Your input helps us improve our services.

**Your Rating:** ${['', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'][rating]} (${rating}/5)
${comment ? `**Your Comment:** ${comment}` : '**No additional comment provided**'}

We appreciate your continued support! 🙏`;

      await bot.answerCallbackQuery(callbackId, { text: 'Feedback submitted successfully!' });
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } else {
      throw new Error('Database submission failed');
    }
  } catch (error) {
    console.error('[EnhancedBot] Feedback submission error:', error);
    await bot.answerCallbackQuery(callbackId, { 
      text: 'failed to submit feedback. Please try again later.', 
      show_alert: true 
    });
  }
}

async function handleFeedbackCancel(chatId, callbackId) {
  const session = getSession(chatId);
  if (session) {
    // Clear any pending feedback data
    upsertSession(chatId, { 
      feedbackData: null, 
      expectingFeedbackComment: false 
    });
  }

  await bot.answerCallbackQuery(callbackId, { text: 'Feedback cancelled' });
  await bot.sendMessage(chatId, '❌ Feedback submission cancelled. You can try again anytime using the "Feedback" button in the menu.');
}

// ------------------------------- CONVERSATION FUNCTIONS (Simplified) ---------------------------------

/**
 * Get class teacher information with contact details
 */
async function getClassTeacherInfo(studentId, schoolId) {
  try {
    // Get class teacher assignment
    const classTeachers = await getClassTeacherByStudentID(studentId);
    if (!classTeachers || classTeachers.length === 0) {
      return null;
    }

    // Get the first class teacher (assuming one primary class teacher)
    const classTeacher = classTeachers[0];
    
    // Get full teacher details including contact information
    const teacherDetails = await getSingleTeacher(schoolId, classTeacher.id);
    if (!teacherDetails) {
      return null;
    }

    return {
      id: teacherDetails.id,
      name: teacherDetails.name,
      email: teacherDetails.email,
      contact: teacherDetails.contact,
      address: teacherDetails.address,
      gender: teacherDetails.gender,
      role: teacherDetails.role,
      class: classTeacher.class
    };
  } catch (error) {
    console.error('[EnhancedBot] Error fetching class teacher info:', error);
    return null;
  }
}

async function handleTalkToTeacher(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    // Get student data
    const studentData = await getStudentDataOptimized(chatId);
    if (!studentData) {
      return bot.sendMessage(chatId, '❌ **Error**\n\nUnable to retrieve student information. Please try again later.');
    }

    // Get class teacher information
    const teacherInfo = await getClassTeacherInfo(studentData.id, studentData.schoolId);
    
    if (!teacherInfo) {
      return bot.sendMessage(chatId, `
📚 **CLASS TEACHER INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ **No Class teacher Assigned**

No class teacher has been assigned to ${studentData.name}'s class (${studentData.class || 'Unknown Class'}).

💡 **What to do:**
• Contact the school administration
• Use the main menu for other inquiries
• Try again later as assignments may be updated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(), { parse_mode: 'Markdown' });
    }

    // Format contact information
    const emailInfo = teacherInfo.email ? `📧 **Email:** ${teacherInfo.email}` : '📧 **Email:** Not provided';
    const phoneInfo = teacherInfo.contact ? `📱 **Phone:** ${teacherInfo.contact}` : '📱 **Phone:** Not provided';
    const addressInfo = teacherInfo.address ? `📍 **Address:** ${teacherInfo.address}` : '';
    const roleInfo = teacherInfo.role ? `👨‍🏫 **Role:** ${teacherInfo.role}` : '';

    // Create modern, professional display
    const message = `
👨‍🏫 **CLASS TEACHER INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 **Student:** ${studentData.name}
📚 **Class:** ${teacherInfo.class || studentData.class || 'Unknown'}
👨‍🏫 **Class teacher:** ${teacherInfo.name}
${roleInfo}

📞 **CONTACT INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${emailInfo}
${phoneInfo}
${addressInfo}

💬 **COMMUNICATION OPTIONS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 📧 Send an email for formal inquiries
• 📱 Call for urgent matters
• 💬 Use school communication channels
• 📅 Schedule meetings through the school

🤖 **AI Tip:** You can also say "I want to talk to the teacher" or "Schedule a meeting" and I'll understand!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Create inline keyboard with Contact teacher button
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '💬 Contact Class teacher',
            callback_data: 'contact_teacher'
          }
        ]
      ]
    };

    await bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });

  } catch (error) {
    console.error('[EnhancedBot] Error in handleTalkToTeacher:', error);
    await bot.sendMessage(chatId, `
❌ **Error Retrieving Information**

We encountered an issue while fetching the class teacher information. Please try again later.

💡 **Alternative options:**
• Contact the school directly
• Use other menu options
• Try again in a few minutes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(), { parse_mode: 'Markdown' });
  }
}

/**
 * Get administrator and school contact information
 */
async function getAdministratorInfo(schoolId) {
  try {
    
    // Get school-specific contact information
    const schoolInfo = await getSchoolByID(schoolId);
    
    return {
      schoolInfo: schoolInfo || null
    };
  } catch (error) {
    console.error('[EnhancedBot] Error fetching school info:', error);
    return null;
  }
}

async function handleTalkToAdministrator(msg) {
  const chatId = msg.chat.id;
  const s = getSession(chatId);
  if (!s || !s.phone) return bot.sendMessage(chatId, 'You are not logged in. Use /login to continue.');

  try {
    // Get student data
    const studentData = await getStudentDataOptimized(chatId);
    if (!studentData) {
      return bot.sendMessage(chatId, '❌ **Error**\n\nUnable to retrieve student information. Please try again later.');
    }

    // Get administrator information
    const adminInfo = await getAdministratorInfo(studentData.schoolId);
    
    if (!adminInfo) {
      return bot.sendMessage(chatId, `
🏫 **ADMINISTRATOR INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ **Unable to Retrieve Information**

We encountered an issue while fetching administrator contact information.

💡 **What to do:**
• Contact the school directly
• Use other menu options
• Try again later

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(), { parse_mode: 'Markdown' });
    }

    // Build the message with available information
    let message = `
🏫 **SCHOOL INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 **Student:** ${studentData.name}
🏫 **School:** ${studentData.school || 'Unknown School'}
📚 **Class:** ${studentData.class || 'Unknown Class'}

`;

    // Add school contact information if available
    if (adminInfo.schoolInfo && adminInfo.schoolInfo.length > 0) {
      const school = adminInfo.schoolInfo[0];
      message += `
🏫 **SCHOOL CONTACT INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 **School Email:** ${school.email || 'Not provided'}
📱 **School Phone:** ${school.contact || 'Not provided'}
🏫 **School Name:** ${school.name || 'Not provided'}

`;
    }

    // Add system administrator information if available
    if (adminInfo.systemAdmin) {
      const admin = adminInfo.systemAdmin;
      message += `
👨‍💼 **SYSTEM ADMINISTRATOR**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 **Email:** ${admin.email || 'Not provided'}
📱 **Phone:** ${admin.phone || 'Not provided'}
📍 **Address:** ${admin.address || 'Not provided'}
💬 **Telegram:** ${admin.telegram || 'Not provided'}

`;
    }

    message += `
💬 **COMMUNICATION OPTIONS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 📧 Send an email for formal inquiries
• 📱 Call for urgent matters
• 🏫 Visit the school office during hours
• 📅 Schedule appointments for complex issues

🤖 **AI Tip:** You can also say "I need to contact the administrator" and I'll understand!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Create inline keyboard with Message Director button
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '💬 Contact administrator',
            callback_data: 'message_director'
          }
        ]
      ]
    };

    await bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });

  } catch (error) {
    console.error('[EnhancedBot] Error in handleTalkToAdministrator:', error);
    await bot.sendMessage(chatId, `
❌ **Error Retrieving Information**

We encountered an issue while fetching the administrator information. Please try again later.

💡 **Alternative options:**
• Contact the school directly
• Use other menu options
• Try again in a few minutes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(), { parse_mode: 'Markdown' });
  }
}

async function handleConversationMessage(msg) {
  // Simplified conversation handling
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, '💬 Conversation feature is being enhanced with AI capabilities. Please use the main menu for now.');
}

async function handleConversationRequestMessage(msg) {
  // Simplified conversation request handling
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, '💬 Conversation request feature is being enhanced with AI capabilities. Please use the main menu for now.');
}

// ------------------------------- STARTUP ---------------------------------

function initEnhancedParentTelegramBot(options = {}) {
  // Prevent multiple initialization attempts
  if (isInitializing) {
    console.log('[EnhancedBot] Bot initialization already in progress, skipping...');
    return bot;
  }
  
  if (bot) {
    console.log('[EnhancedBot] Bot already initialized, returning existing instance');
    return bot;
  }
  
  if (!BOT_TOKEN) {
    console.warn('[EnhancedBot] No TELEGRAM_PARENT_BOT_TOKEN provided; bot not started.');
    return null;
  }

  isInitializing = true;
  botInstanceId = `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log(`[EnhancedBot] Initializing bot instance: ${botInstanceId}`);

  loadSessions();

  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  
  // Handle polling errors gracefully
  bot.on('polling_error', (error) => {
    // If it's a conflict error, try to restart polling after a delay
    if (error.code === 'ETELEGRAM' && error.message.includes('409 Conflict')) {
      setTimeout(() => {
        try {
          bot.stopPolling();
          setTimeout(() => {
            bot.startPolling();
          }, 2000);
        } catch (restartError) {
          console.error(`[EnhancedBot] Failed to restart polling for instance ${botInstanceId}:`, restartError.message);
        }
      }, 5000);
    }
  });
  
  console.log(`[EnhancedBot] AI-Enhanced bot started (polling) - Instance: ${botInstanceId}`);

  bot.onText(/^\/start(?:@[\w_]+)?(?:\s+.*)?$/, handleStart);
  bot.onText(/^\/help$/, handleHelp);
  bot.onText(/^\/login$/, handleLogin);
  bot.onText(/^\/me$/, handleMe);
  bot.onText(/^\/fees$/, handleFees);
  bot.onText(/^\/events$/, handleEvents);
  bot.onText(/^\/results$/, handleResults);
  bot.onText(/^\/attendance$/, handleAttendance);
  bot.onText(/^\/discipline$/, handleDiscipline);
  bot.onText(/^\/insights$/, handleAIInsights);
  bot.onText(/^\/ai$/, handleAIDemo);
  bot.onText(/^\/feedback$/, handleFeedback);
  bot.onText(/^\/menu$/, handleMenu);
  bot.onText(/^\/logout$/, handleLogout);

  bot.on('message', async (msg) => {
    // keep sessions fresh
    const s = getSession(msg.chat.id);
    if (s) upsertSession(msg.chat.id, {});
  });

  bot.on('contact', handleContact);
  bot.on('text', handleTextButtons);
  bot.on('callback_query', handleCallbackQuery);

  // Mark initialization as complete
  isInitializing = false;
  
  return bot;
}

// Function to properly stop the bot
function stopEnhancedParentTelegramBot() {
  if (bot) {
    try {
      bot.stopPolling();
      console.log(`[EnhancedBot] Bot stopped gracefully - Instance: ${botInstanceId}`);
      bot = null;
      botInstanceId = null;
      isInitializing = false;
    } catch (error) {
      console.error(`[EnhancedBot] Error stopping bot (${botInstanceId}):`, error.message);
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('[EnhancedBot] Received SIGINT, shutting down gracefully...');
  stopEnhancedParentTelegramBot();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('[EnhancedBot] Received SIGTERM, shutting down gracefully...');
  stopEnhancedParentTelegramBot();
  process.exit(0);
});

// ------------------------------- NOTIFICATIONS ---------------------------------

async function sendEnhancedParentTelegramNotification({ phone, chatId, message }) {
  if (!bot) initEnhancedParentTelegramBot();
  if (!bot) throw new Error('Enhanced parent Telegram bot is not running');
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
      console.error('[EnhancedBot] send notification error:', e.message);
    }));
  }
  await Promise.all(promises);
  return true;
}

// ------------------------------- PROCESS MONITORING ---------------------------------

/**
 * Process monitoring to detect and handle bot conflicts
 */
const processMonitor = {
  lastHealthCheck: Date.now(),
  conflictCount: 0,
  restartCount: 0,
  maxRestarts: 3
};

function checkBotHealth() {
  const now = Date.now();
  const timeSinceLastCheck = now - processMonitor.lastHealthCheck;
  
  // If bot exists and is polling, update health check
  if (bot && bot.isPolling && bot.isPolling()) {
    processMonitor.lastHealthCheck = now;
    return true;
  }
  
  // If bot doesn't exist or isn't polling, it might be in a conflict state
  if (bot && timeSinceLastCheck > 30000) { // 30 seconds without health check
    console.warn(`[EnhancedBot] Bot health check failed - Instance: ${botInstanceId}`);
    return false;
  }
  
  return true;
}

function handleBotConflict() {
  processMonitor.conflictCount++;
  console.warn(`[EnhancedBot] Bot conflict detected (${processMonitor.conflictCount} times) - Instance: ${botInstanceId}`);
  
  if (processMonitor.restartCount < processMonitor.maxRestarts) {
    console.log(`[EnhancedBot] Attempting to resolve conflict (attempt ${processMonitor.restartCount + 1}/${processMonitor.maxRestarts})`);
    
    setTimeout(() => {
      try {
        if (bot) {
          bot.stopPolling();
          setTimeout(() => {
            bot.startPolling();
            processMonitor.restartCount++;
            console.log(`[EnhancedBot] Bot restarted after conflict - Instance: ${botInstanceId}`);
          }, 3000);
        }
      } catch (error) {
        console.error(`[EnhancedBot] Failed to restart bot after conflict:`, error.message);
      }
    }, 5000);
  } else {
    console.error(`[EnhancedBot] Maximum restart attempts reached. Bot may need manual intervention.`);
  }
}

// Monitor bot health every 30 seconds
setInterval(() => {
  if (!checkBotHealth()) {
    handleBotConflict();
  }
}, 30000);

// ------------------------------- PERFORMANCE MONITORING ---------------------------------

/**
 * Performance monitoring and metrics
 */
const performanceMetrics = {
  queryCount: 0,
  totalQueryTime: 0,
  slowQueries: 0,
  sessionHits: 0,
  sessionMisses: 0
};

function logPerformanceMetrics() {
  const avgQueryTime = performanceMetrics.queryCount > 0 
    ? performanceMetrics.totalQueryTime / performanceMetrics.queryCount 
    : 0;
  
  console.log(`[EnhancedBot] Performance Metrics:`);
  console.log(`  - Total Queries: ${performanceMetrics.queryCount}`);
  console.log(`  - Average Query Time: ${avgQueryTime.toFixed(2)}ms`);
  console.log(`  - Slow Queries (>200ms): ${performanceMetrics.slowQueries}`);
  console.log(`  - Session Hit Rate: ${((performanceMetrics.sessionHits / (performanceMetrics.sessionHits + performanceMetrics.sessionMisses)) * 100).toFixed(1)}%`);
}

// Log performance metrics every 5 minutes
setInterval(logPerformanceMetrics, 5 * 60 * 1000);

module.exports = {
  initEnhancedParentTelegramBot,
  stopEnhancedParentTelegramBot,
  sendEnhancedParentTelegramNotification,
  getPerformanceMetrics: () => performanceMetrics,
  logPerformanceMetrics,
  getProcessMonitor: () => processMonitor,
  checkBotHealth,
  handleBotConflict
};

// Auto-start if env flag is enabled
if (AUTO_START && BOT_TOKEN) {
  initEnhancedParentTelegramBot();
}
