import React from "react";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import ReportData from "../reports/reportData";
import Auth0 from "../../hooks/auth";
import ReportDashboard from "../reports/dashboard/report-dashboard";
import PAID from "../../hooks/subscription";
import { Toaster } from "react-hot-toast";

const Report = () => {
  return (
    <Auth0>
      <PAID>
        <Toaster />
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Navbar />
              <div className="settingContainer">
                <div className="settingContent">
                  <div className="student_container">
                    <div className="splitter">
                      <div className="headerTitle">
                        <h5>Reports Management</h5>
                      </div>
                    </div>
                    <div className="student_dashboard">
                      <ReportData />
                      <ReportDashboard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PAID>
    </Auth0>
  );
};

export default Report;
