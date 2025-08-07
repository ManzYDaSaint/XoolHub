import { ChevronRight } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Card = ({ icon: Icon, title, description, small, link }) => {
  return (
    <div className="p-2 border-2 border-gray-300 rounded-lg">
      <div className="bg-blue-600 rounded-md mb-3 cursor-pointer">
        <Link to={link}>
          <span className="text-xs flex items-center justify-end p-1 mr-2 text-white">
            View details <ChevronRight className="w-3 h-3" />{" "}
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="p-2 bg-blue-600 rounded-md ml-1">
          {Icon && (
            <Icon size={40} className="h-5 w-5 md:h-6 md:w-6 text-white" />
          )}
        </div>
        <div className="card_detail">
          <p className="text-gray-600 text-xs md:text-sm">{description}</p>
          <h4>
            <small>{small}</small>
            {<CountUp start={0} end={title} duration={2.5} separator="," />}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Card;