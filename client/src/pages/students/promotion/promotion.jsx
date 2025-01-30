import React from "react";
import PromotionData from "./data";
import Auth0 from "../../../hooks/auth";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../../components/input/sidebar";
import Navbar from "../../../components/input/top";
import './promote.css'

const PromoteStudents = () => {

  return (
    <Auth0>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Navbar />
            <div className="settingContainer">
              <div className="settingContent">
                <div className="student_containo">
                  <PromotionData />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth0>
  );
};

export default PromoteStudents;
