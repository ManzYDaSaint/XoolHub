import React from "react";
import { Progress } from 'semantic-ui-react'

const CustomCard = ({ icon: Icon, title, description, small, percentage }) => {
  return (
    <div className="custom_card_container mb-3">
      {Icon && <Icon size={30} className="custom_card_icon" />}
      <div className="custom_card_detail">
        <h4>{title}</h4>
        <Progress percent={percentage} size='tiny' active indicating></Progress>
        <p className="percenta">{small}{description}</p>
      </div>
    </div>
  );
};

export default CustomCard;