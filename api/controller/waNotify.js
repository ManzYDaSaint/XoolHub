require("dotenv").config();
const axios = require("axios");

/**
 * Send a WhatsApp notification to a parent.
 * @param {string} parentWaId - WhatsApp number in international format (e.g., "265991234567")
 * @param {string} message - The message body to send
 */
const sendParentNotification = async (parentWaId, message) => {
  try {
    await axios({
      method: "POST",
      url: process.env.WHATSAPP_API_URL,
      data: {
        messaging_product: "whatsapp",
        to: parentWaId,
        type: "text",
        text: { body: message }
      },
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      }
    });
    console.log(`✅ Notification sent to ${parentWaId}`);
  } catch (error) {
    console.error(`❌ Failed to send notification to ${parentWaId}:`, error.response?.data || error.message);
  }
};

module.exports = {
  sendParentNotification
};