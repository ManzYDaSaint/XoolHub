import React from "react";
import CountUp from "react-countup";

const Card = ({ icon: Icon, title, description, small }) => {
  return (
    <div className="card_container">
      {Icon && <Icon size={40} className="card_icon" />}
      <div className="card_detail">
        <h4><small>{small}</small>{
          <CountUp
          start={0}
          end={title}
          duration={2.5}
          separator=","
        />
        }</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;