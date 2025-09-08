import React, { useState } from "react";
import Sidebar from "./input/sidebar";
import { Toaster } from "react-hot-toast";

function SidebarTrigger({ onClick, className }) {
  return (
    <button
      className={`group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-200 ${
        className || ""
      }`}
      aria-label="Open sidebar"
      onClick={onClick}
      style={{ zIndex: 60, position: "fixed", top: 31, left: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      <div className="relative p-3">
        <div className="flex flex-col gap-1">
          <span className="block w-5 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200"></span>
          <span className="block w-5 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200"></span>
          <span className="block w-5 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200"></span>
        </div>
      </div>
    </button>
  );
}
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      {/* SidebarTrigger only visible when sidebar is closed */}
      {!sidebarOpen && (
        <SidebarTrigger onClick={() => setSidebarOpen((v) => !v)} />
      )}
      {/* Sidebar, only visible when sidebarOpen */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content, full width */}
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
