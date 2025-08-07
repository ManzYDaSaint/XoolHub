import React from "react";

const CustomBtn = ({ children }) => {
  return (
    <button className="rounded-full bg-gradient-to-r from-blue-700 to-purple-700 px-3 py-1 md:px-6 md:py-3 text-sm md:text-md text-white">
      {children}
    </button>
  );
};

export default CustomBtn;
