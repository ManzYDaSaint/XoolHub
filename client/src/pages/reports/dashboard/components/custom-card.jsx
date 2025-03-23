import React from "react";

const CustomCard = ({ icon: Icon, title, description, small, percentage }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-3">
      {Icon && <Icon className="w-8 h-8 text-gray-700" />}
      <div className="mt-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600">{small}{description}</p>
      </div>
    </div>
  );
};

export default CustomCard;