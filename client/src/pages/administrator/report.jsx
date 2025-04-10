import React from "react";
import Sidebar from "../../components/input/sidebar";
import ReportData from "../reports/reportData";
import ReportDashboard from "../reports/dashboard/report-dashboard";
import PAID from "../../hooks/subscription";
import { Toaster } from "react-hot-toast";
import Auth0 from "../../hooks/auth";
import Navbar from "../../components/input/top";

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
              {/* Profile Information */}
              <div className="p-6 mt-20">
                <div className="p-6 bg-white shadow-lg rounded-lg">
                  <ReportData />
                  <ReportDashboard />
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
