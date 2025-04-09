import React from "react";
import PromotionData from "./data";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../../components/input/sidebar";
import AuthT from "../../../hooks/tauth";

const PromoteStudents = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <PromotionData />
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default PromoteStudents;
