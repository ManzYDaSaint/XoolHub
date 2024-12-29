// File: MessagesApp.js

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./notificaton.css";

const contactsData = [
  { id: 1, name: "John Doe", unread: 3, lastMessage: "Hey there!", time: "10:45 AM" },
  { id: 2, name: "Jane Smith", unread: 1, lastMessage: "See you soon!", time: "09:30 AM" },
  { id: 3, name: "Alice Brown", unread: 0, lastMessage: "Got it!", time: "Yesterday" },
];

const messagesData = {
  1: [
    { sender: "John Doe", text: "Hey! How are you?", time: "10:30 AM" },
    { sender: "You", text: "I'm good! You?", time: "10:35 AM" },
  ],
  2: [
    { sender: "Jane Smith", text: "Let's meet at 3.", time: "09:20 AM" },
    { sender: "You", text: "Sure, see you then!", time: "09:25 AM" },
  ],
  3: [
    { sender: "Alice Brown", text: "Got it!", time: "Yesterday" },
  ],
};

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contactId) => {
    setSelectedContact(contactId);
  };

  return (
    <div className="flex h-screen bg-gray-100 master_container">
      {/* Contact List */}
      <div className="w-1/3 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Notifications</h2>
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            className={`p-3 cursor-pointer flex items-center justify-between hover:bg-gray-200 transition border-b ${
              selectedContact === contact.id ? "bg-gray-200" : ""
            }`}
            onClick={() => handleContactClick(contact.id)}
          >
            <div>
              <h3 className="text-lg">{contact.name}</h3>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{contact.time}</p>
              {contact.unread > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {contact.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Messages Panel */}
      <div className="w-2/3 p-4 bg-gray-50 relative">
        <AnimatePresence>
          {selectedContact ? (
            <motion.div
              key={selectedContact}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className=" p-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                Chat with {contactsData.find((c) => c.id === selectedContact).name}
              </h2>
              <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                {messagesData[selectedContact].map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-sm ${
                        msg.sender === "You"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs mt-2 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a contact to view messages
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}