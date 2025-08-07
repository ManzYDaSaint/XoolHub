import React from "react";
import Sidebar from "../../components/input/sidebar";
import Navbar from "../../components/input/top";
import FeedbackForm from "../feedback/feedback";

const Feedback = () => {
  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
