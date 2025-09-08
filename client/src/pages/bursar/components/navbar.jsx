import React from "react";
import { Calendar, Download, RefreshCcw } from "lucide-react";
import { CalendarDateRangePicker } from "./date-picker";

const Navbar = () => {

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="px-8 py-6 pl-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                Financial Dashboard
              </h1>
              <p className="text-gray-600 font-medium">Overview of all the finances</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-2 shadow-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <CalendarDateRangePicker />
            </div>
            <div className="flex items-center gap-4">
              <button className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200">
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Export</span>
              </button>
              <button className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200">
                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
