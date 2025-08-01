import React from "react";
import AuthT from "../../hooks/tauth";
import Sidebar from "../../components/input/sidebar";
import Howa from "./components/hoa";

const Hoa = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Howa />
          </div>
        </div>
      </div>
    </AuthT>
  )
}

export default Hoa