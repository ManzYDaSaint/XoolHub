import { ChevronRight } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Card = ({ icon: Icon, title, description, small, link }) => {
  return (
    <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
      
      {/* View Details Link */}
      {link && (
        <div className="relative">
          <Link to={link}>
            <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg px-3 py-1.5 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <span className="text-xs flex items-center gap-1 text-white font-medium">
                View details <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>
      )}
      
      <div className="relative p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
            {Icon && (
              <Icon size={24} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium mb-1">{description}</p>
            <h4 className="text-2xl font-bold text-gray-900">
              {small && <span className="text-sm font-normal text-gray-500 mr-1">{small}</span>}
              <CountUp start={0} end={title} duration={2.5} separator="," />
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;