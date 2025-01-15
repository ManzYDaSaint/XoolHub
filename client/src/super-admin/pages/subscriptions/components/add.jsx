import React from "react";
import SuperAuth0 from "../../../../hooks/superauth";
import SuperSidebar from "../../../components/navbar/navbar";
import Menu from "../../../components/Top/menu";
import PlanData from "./data";
import { Toaster } from "react-hot-toast";

const AddSubsciptions = () => {
  return (
    <SuperAuth0>
      <Toaster />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <Menu />
            <div className="settingContainer">
              <div className="settingContent">
              <div className="student_containo">
                <PlanData />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default AddSubsciptions;
