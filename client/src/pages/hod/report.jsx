import React from "react";
import AuthT from "../../hooks/tauth";
import Sidebar from "../../components/input/sidebar";
import Report from "./components/report";

const HReports = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Report />
          </div>
        </div>
      </div>
    </AuthT>
  )
}

export default HReports