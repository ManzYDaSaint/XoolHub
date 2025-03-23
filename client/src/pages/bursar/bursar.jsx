import React from "react";
import Sidebar from "../../components/input/sidebar";
import AuthT from "../../hooks/tauth";
import Dashboard from "./components/dashboard";

const Bursar = () => {
  return (
    <AuthT>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Dashboard />
            </div>
          </div>
        </div>
    </AuthT>
  );
};

export default Bursar;
