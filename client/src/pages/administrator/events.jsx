import React from "react";
import Auth0 from "../../hooks/auth.jsx";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/input/sidebar.jsx";
import Navbar from "../../components/input/top.jsx";
import FormButton from "../../components/input/formButton.jsx";
import { useNavigate } from "react-router-dom";
import "../students/students.css";
import EventPage from "../events/data.jsx";
// import PAID from "../../hooks/subscription.jsx";

const Events = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/addstudents");
  };

  return (
    <Auth0>
      {/* <PAID> */}
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
                        <h5>Events Management</h5>
                      </div>
                    </div>
                    <div className="student_dashboard">
                      <EventPage />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </PAID> */}
    </Auth0>
  );
};

export default Events;
