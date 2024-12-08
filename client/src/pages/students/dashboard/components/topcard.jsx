import React from "react";

const TopPerforming = ({ icon: Icon, score, student, term, exam, form }) => {
  return (
    <div className="student_card">
      <div className="student_card_top">
        {Icon && <Icon size={50} className="student_card_icon" />}
        <div className="student_card_detail">
          <h4>{score}</h4>
          <p>{student}</p>
        </div>
      </div>
      <hr />
      <div className="student_card_bottom">
        <p>{term}</p>
        <div className="vr"></div>
        <p>{exam}</p>
        <div className="vr"></div>
        <p>{form}</p>
      </div>
    </div>
  );
};

export default TopPerforming;
