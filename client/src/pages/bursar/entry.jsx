import React from "react";
import Sidebar from "../../components/input/sidebar";
import AuthT from "../../hooks/tauth";
import Entry from "./components/entry";

const BEntry = () => {
  return (
    <AuthT>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Entry />
            </div>
          </div>
        </div>
    </AuthT>
  );
};

export default BEntry;
