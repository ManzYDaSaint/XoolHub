import React from "react";
import { Calendar, Download, RefreshCcw } from "lucide-react";
import { CalendarDateRangePicker } from "./date-picker";

const Navbar = () => {

  return (
    <div className="flex justify-between items-center shadow p-4">
      <div className="left">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: "'Poppins', san-serif" }}
        >
          Financial Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500">Overview of all the finances</p>
      </div>
      <div className="flex justify-between items-center space-x-8">
        <div className="flex items-center space-x-2 py-2 px-10 border border-gray-300 rounded-xl">
          <Calendar className="w-5 h-5 text-gray-500" />
          <CalendarDateRangePicker />
        </div>
        <div className="flex items-center space-x-5">
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600">
            <Download className="w-4 h-4" /> <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600">
            <RefreshCcw className="w-4 h-4" /> <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
