import React from "react";

const Tabs = ({ selectedTab, setSelectedTab, children }) => {
  const tabs = ["Overview", "Transactions", "Fee Payments", "Reports"];
  return (
    <>
      <div className="flex space-x-4 bg-gray-300 p-1 rounded-lg border-b border-gray-200 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedTab === tab
                ? "border-black text-black bg-white rounded-md"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </>
  );
};

export default Tabs;
