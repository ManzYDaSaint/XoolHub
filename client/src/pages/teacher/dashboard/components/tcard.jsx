import React from "react";

const Ctcard = ({ icon: Icon, score, student }) => {
  return (
    <div className="student_card">
      <div className="student_card_top">
        {Icon && <Icon size={35} className="student_card_icon" />}
        <div className="student_card_detail">
          <h4>{score}</h4>
          <p>{student}</p>
        </div>
      </div>
    </div>
  );
};

export default Ctcard;
