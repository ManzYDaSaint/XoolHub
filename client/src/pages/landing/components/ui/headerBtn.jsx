import React from "react";

const HeaderBtn = ({ children }) => {
  return (
    <div className="p-[2px] rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-green-400">
      <button
        className="inline-flex gap-2 shadow-md border-0 bg-white/80 px-3 py-0.1 md:px-6 md:py-2 text-sm md:text-md rounded-full font-semibold text-gray-700"
        style={{ backgroundClip: "padding-box" }}
      > 
        {children}
      </button>
    </div>
  );
};

export default HeaderBtn;
