import React from "react";
import Auth0 from "../../hooks/auth";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import { useNavigate } from "react-router-dom";
import TeacherBoard from "../teacher/dashboard/teacher-dashboard";
import PAID from "../../hooks/subscription";
import FormButton from "../../components/input/formButton";

const Teachers = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/config");
  };

  return (
    <Auth0>
      <PAID>
        <div className="dashboard__container">
          <Toaster />
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Navbar />
              <div className="settingContainer">
                <div className="settingContent">
                  <div className="teacher_container shadow-lg rounded-lg p-5 bg-gray-100">
                    <div className="splitter">
                      <div className="headerTitle">
                        <h5>User Management</h5>
                      </div>
                      <FormButton 
                        type="button"
                        label="Create"
                        id={'tyepButton'}
                        onClick={handleRedirect}
                      />
                    </div>
                    <div className="teacher_dashboard">
                      <TeacherBoard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PAID>
    </Auth0>
  );
};

export default Teachers;
