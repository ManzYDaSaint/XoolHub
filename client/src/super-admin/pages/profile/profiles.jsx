import React from "react";
import SuperSidebar from "../../components/navbar/navbar";
import Menu from "../../components/Top/menu";
import SuperAuth0 from "../../../hooks/superauth";
import SuperTabs from "./components/tabs";
import { Toaster } from "react-hot-toast";

const ProfileSuper = () => {
  return (
    <SuperAuth0>
        <Toaster />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="settingContent">
                <div className="profile_container">
                  <div>
                    <SuperTabs />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default ProfileSuper;
