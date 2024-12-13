import React from "react";
import { Progress } from 'semantic-ui-react'

const CustomCard = ({ icon: Icon, title, description, small, percentage }) => {
  return (
    <div className="custom_card_container">
      {Icon && <Icon size={30} className="custom_card_icon" />}
      <div className="custom_card_detail">
        <h4><small>{small}</small>{title}</h4>
        <Progress percent={percentage} size='tiny' active indicating></Progress>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CustomCard;