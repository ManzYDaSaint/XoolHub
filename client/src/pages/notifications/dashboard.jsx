import React from "react";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import Messages from "./notification";

const Notifications = () => {
  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
