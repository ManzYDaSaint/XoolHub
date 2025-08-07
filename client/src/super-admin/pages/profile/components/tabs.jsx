import React, { useState } from "react";
import SuperProfile from "./profile";
import Tabs from "../../../../components/tabs";

const SuperTabs = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  return (
    <>
      <Tabs
        tabs={["Profile", "Notice Board"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === "Profile" && <SuperProfile />}
      {selectedTab === "Notice Board" && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold">Notice Board Coming Soon!</h1>
        </div>
      )}
    </>
  );
};

export default SuperTabs;
