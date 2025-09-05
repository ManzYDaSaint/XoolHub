import React from "react";

const Tabs = ({
  tabs = [],
  selectedTab,
  setSelectedTab,
  children,
  className = "",
}) => {
  return (
    <>
      <div
        className={`flex space-x-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-gray-200/50 shadow-lg mt-6 ${className}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`group relative px-6 py-3 text-sm font-semibold transition-all duration-200 rounded-xl ${
              selectedTab === tab
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
            }`}
          >
            {selectedTab === tab && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-sm opacity-30"></div>
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))} 
      </div>
      <div className="mt-6">{children}</div>
    </>
  );
};

export default Tabs;