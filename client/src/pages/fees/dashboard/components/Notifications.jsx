import React from "react";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "Payment overdue for John Doe", type: "warning" },
    { id: 2, message: "Fee collection goal met for November", type: "success" },
  ];

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note) => (
          <li key={note.id}>
            {note.message}
          </li>
        ))}
      </ul>
      <button variant="contained" color="primary">
        Send Reminders
      </button>
    </div>
  );
};

export default Notifications;
