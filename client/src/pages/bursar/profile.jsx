import React from "react";
import Sidebar from "../../components/input/sidebar";
import AuthT from "../../hooks/tauth";
import Profile from "./components/profile";

const BProfile = () => {
  return (
    <AuthT>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Profile />
            </div>
          </div>
        </div>
    </AuthT>
  );
};

export default BProfile;
