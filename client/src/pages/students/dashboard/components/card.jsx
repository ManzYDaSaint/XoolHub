import React from "react";

const Card = ({ icon: Icon, title, description, small }) => {
  return (
    <div className="card_container">
      {Icon && <Icon size={40} className="card_icon" />}
      <div className="card_detail">
        <h4><small>{small}</small>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
