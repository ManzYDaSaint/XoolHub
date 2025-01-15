import React from "react";
import { Bell, NotebookTabs } from "lucide-react";

const TopNav = () => {
  return (
    <div className="parent_topbar">
      <NotebookTabs size={35} className="parent_topbar_icon" />
      <div className="bell_container">
        <Bell size={20} className="bell_icon" />
        <div className="badger"></div>
      </div>
    </div>
  );
};

export default TopNav;
