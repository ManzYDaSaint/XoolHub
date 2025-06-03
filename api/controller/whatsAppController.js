// whatsAppController.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { getStudentNameByContact } = require("../model/apiModel");

const router = express.Router();

// Webhook GET route for verification
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  if (mode && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Simple in-memory session store
const sessions = {};
const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes

function isSessionActive(userId) {
  const session = sessions[userId];
  if (!session) return false;
  // Expire session if timeout passed
  if (Date.now() - session.lastActive > SESSION_TIMEOUT) {
    delete sessions[userId];
    return false;
  }
  return true;
}

function updateSession(userId) {
  sessions[userId] = { lastActive: Date.now() };
}

function endSession(userId) {
  delete sessions[userId];
}

router.post("/", async (req, res) => {
  try {
    const { entry } = req.body;

    if (!entry || !Array.isArray(entry) || entry.length === 0) {
      return res.status(400).send("Invalid Request: No entry");
    }

    const changes = entry[0].changes;
    if (!changes || !Array.isArray(changes) || changes.length === 0) {
      return res.status(400).send("Invalid Request: No changes");
    }

    const value = changes[0].value;
    const messages = changes[0].value.messages ? changes[0].value.messages[0] : null;

    // ✅ Only proceed if this is an actual incoming message
    if (
      !value.messages ||
      !Array.isArray(value.messages) ||
      value.messages.length === 0
    ) {
      return res.status(200).send("No user message to process");
    }

    const message = value.messages[0];

    // ✅ Ignore system or delivery/status messages
    if (
      message.type !== 'text' &&
      message.type !== 'button' &&
      message.type !== 'list_reply' &&
      message.type !== 'interactive' // <-- add this line
    ) {
      return res.status(200).send("Ignoring non-text, button, list_reply, or interactive message");
    }

    const text = message.text?.body;
    const contact = value.contacts?.[0];
    const profile = contact?.wa_id;

    if (!profile) {
      return res.status(400).send("Invalid request: No contact");
    }

    const Student = await getStudentNameByContact(profile);

    if (!Student) {
      await sendText(profile, "Your number is not registered, Please contact the school administrator!", messages.id);
      return res.status(200).send("Unregistered number");
    }

    const lower = text?.trim().toLowerCase();

    // Only respond with menu if greeting
    if (["hi", "hello", "hie"].includes(lower)) {
      if (isSessionActive(profile)) {
        await sendText(profile, "⚠️ You already have an active session. Please complete your current session or wait for it to expire before starting a new one.", messages.id);
        return res.status(200).send("Session already active");
      }
      updateSession(profile);
      await sendMenu(profile, Student.name, messages.id);
      return res.status(200).send("Menu sent, session started");
    }

    // Handle list reply (only if session is active)
    let listReplyId = null;
    if (message.type === "list_reply" && message.list_reply) {
      listReplyId = message.list_reply.id;
    } else if (message.type === "interactive" && message.interactive?.type === "list_reply") {
      listReplyId = message.interactive.list_reply.id;
    }

    if (listReplyId) {
      if (!isSessionActive(profile)) {
        await sendText(profile, "❗ Your session has expired. Please type 'Hi', 'Hello' or 'Hie' to start again.", messages.id);
        return res.status(200).send("Session expired");
      }
      updateSession(profile); // refresh session activity
      switch (listReplyId) {
        case "view_balance":
          await sendText(profile, `💰 Your current balance is MWK 35,000`, messages.id);
          break;
        case "view_results":
          await sendText(profile, `📊 Results:\nMath: 89%\nEnglish: 78%`, messages.id);
          break;
        case "view_attendance":
          await sendText(profile, `📌 Attendance: 22/25 days present`, messages.id);
          break;
        default:
          await sendText(profile, `❓ Option not recognized.`, messages.id);
      }
      endSession(profile); // <-- End session after handling a menu action
      return res.status(200).send("List reply handled");
    }

    // Default fallback for any other message
    if (!isSessionActive(profile)) {
      await sendText(
        profile,
        `Type 'Hi', 'Hello' or 'Hie' to start using the service.`,
        messages.id
      );
      return res.status(200).send("Prompted user to start");
    } else {
      updateSession(profile);
      await sendText(
        profile,
        `⚠️ Please select an option from the menu or wait for your session to expire before starting a new one.`,
        messages.id
      );
      return res.status(200).send("Session active, waiting for menu selection");
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Send WhatsApp List Menu
const sendMenu = async (to, studentName, messageId) => {
  try {
    const response = await axios({
      method: "POST",
      url: process.env.WHATSAPP_API_URL,
      data: {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        context: {
          message_id: messageId
        },
        interactive: {
          type: "list",
          header: {
            type: "text",
            text: `👋 Welcome back ${studentName}!`
          },
          body: {
            text: "_Please choose one from the options below to proceed with the system:_"
          },
          footer: {
            text: "XoolHub System"
          },
          action: {
            button: "Select Option",
            sections: [
              {
                title: "Menu",
                rows: [
                  {
                    id: "view_balance",
                    title: "1. View Balance",
                    description: "Check your current balance"
                  },
                  {
                    id: "view_results",
                    title: "2. Exam Results",
                    description: "View your latest exam results"
                  },
                  {
                    id: "view_attendance",
                    title: "3. Attendance",
                    description: "See your attendance record"
                  }
                ]
              }
            ]
          }
        }
      },
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      }
    });

    console.log("✅ List menu sent:", response.data);
  } catch (error) {
    console.error("❌ Failed to send list menu:", error.response?.data || error.message);
  }
};

// Send plain text message
const sendText = async (to, text, messageId) => {
  try {
    const response = await axios({
      method: "POST",
      url: process.env.WHATSAPP_API_URL,
      data: {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        context: {
          message_id: messageId
        },
        text: {
          body: text
        }
      },
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      }
    });

    console.log("✅ Text message sent:", response.data);
  } catch (error) {
    console.error("❌ Failed to send text message:", error.response?.data || error.message);
  }
};

module.exports = router;
