import React from "react";
import AuthT from "../../hooks/tauth";
import Sidebar from "../../components/input/sidebar";
import Hold from "./components/hod";

const Hod = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Hold />
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default Hod;
