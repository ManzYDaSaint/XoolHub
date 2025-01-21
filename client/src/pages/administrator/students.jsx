import React from "react";
import Auth0 from "../../hooks/auth";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import FormButton from "../../components/input/formButton.jsx";
import { useNavigate } from "react-router-dom";
import "../students/students.css";
import StudentDashboard from "../students/dashboard/student-dashboard.jsx";
import PAID from "../../hooks/subscription.jsx";

const Students = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/addstudents");
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
                  <div className="student_container">
                    <div className="splitter">
                      <div className="headerTitle">
                        <h5>Student Management</h5>
                      </div>
                      <FormButton
                        label={"Create"}
                        id={"tyepButton"}
                        icon={"plus"}
                        onClick={handleRedirect}
                      />
                    </div>
                    <div className="student_dashboard">
                      <StudentDashboard />
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

export default Students;
