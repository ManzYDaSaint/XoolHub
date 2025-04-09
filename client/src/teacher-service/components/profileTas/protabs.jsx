import React, { useState } from "react";
import { UserRoundPen } from "lucide-react";
import Profile from "./profile";

const ProTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [active, setActive] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    setActive(!active);
  };

  return (
    <div className="settingContent">
      <div className="tab">
        <button
          className={selectedTab === 0 ? "tablinks active" : "tablinks"}
          onClick={() => handleTabClick(0)}
        >
          Profile <UserRoundPen size={22} className="adminIcon" />
        </button>
        {/* <button className={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(1)}>Messages <MessageCircleMore size={22} className='adminIcon' /></button> */}
        {/* <button className={selectedTab === 2 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(2)}>Notifications <BellRing size={22} className='adminIcon' /></button> */}
      </div>
      {selectedTab === 0 && (
        <div id="Personal" className="tabcontent animate-bottom">
          <Profile />
        </div>
      )}
      {selectedTab === 1 && (
        <div id="Academic" className="tabcontent animate-bottom">
          {/* <Billing /> */}
        </div>
      )}
      {selectedTab === 2 && (
        <div id="Academic" className="tabcontent animate-bottom">
          {/* <Academical /> */}
        </div>
      )}
    </div>
  );
};

export default ProTabs;
