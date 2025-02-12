"use client";

import { useState } from "react";
import NotificationList from "./list";
import MessageDisplay from "./display";

const mockNotifications = [
  { id: "1", title: "New message", message: "You have a new message from John Doe.", timestamp: "2 min ago", viewed: false },
  { id: "2", title: "Meeting reminder", message: "Your team meeting starts in 15 minutes.", timestamp: "15 min ago", viewed: false },
  {
    id: "3",
    title: "Task completed",
    message: "Great job! You've completed all your tasks for today.",
    timestamp: "1 hour ago",
    viewed: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    // Mark the clicked notification as viewed
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notification.id ? { ...notif, viewed: true } : notif
    );
    setNotifications(updatedNotifications);

    // Set the selected notification
    setSelectedNotification(notification);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex">
          {/* Left panel with notification list */}
          <NotificationList
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            selectedId={selectedNotification?.id}
          />

          {/* Right panel with message display */}
          <div className="flex-grow p-4 border-l border-gray-200">
            {selectedNotification ? (
              <MessageDisplay
                notification={selectedNotification}
                onClose={() => setSelectedNotification(null)}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Select a notification to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
