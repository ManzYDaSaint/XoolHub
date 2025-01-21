import React from "react";
import Sidebar from "../../components/input/sidebar";
import "./dashboard.css";
import Navbar from "../../components/input/top";
import Auth0 from "../../hooks/auth";
import AdminDashboard from "../dashboard/dashboard";
import PAID from "../../hooks/subscription";

const Dashboard = () => {
  return (
    <Auth0>
      <PAID>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Navbar />
              <AdminDashboard />
            </div>
          </div>
        </div>
      </PAID>
    </Auth0>
  );
};

export default Dashboard;
