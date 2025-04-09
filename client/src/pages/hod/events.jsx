import React from "react";
import AuthT from "../../hooks/tauth";
import Sidebar from "../../components/input/sidebar";
import Events from "../administrator/events";

const HEvents = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Events />
          </div>
        </div>
      </div>
    </AuthT>
  )
}

export default HEvents;