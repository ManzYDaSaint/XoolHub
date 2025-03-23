import React from "react";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import Auth0 from "../../hooks/auth";
import PAID from "../../hooks/subscription";
import FeedbackForm from "../feedback/feedback";

const Feedback = () => {
  return (
    <Auth0>
      <PAID>
        <div className="dashboard__container">
          <div className="dashboard__content">
            <Sidebar />
            <div className="dashboard">
              <Navbar />
              <FeedbackForm />
            </div>
          </div>
        </div>
      </PAID>
    </Auth0>
  );
};

export default Feedback;
