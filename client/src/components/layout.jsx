import React, { useState } from "react";
import Sidebar from "./input/sidebar";
import { Toaster } from "react-hot-toast";

function SidebarTrigger({ onClick, className }) {
  return (
    <button
      className={`mr-4 p-2 border-2 border-blue-600 rounded hover:bg-gray-100 focus:outline-none ${
        className || ""
      }`}
      aria-label="Open sidebar"
      onClick={onClick}
      style={{ zIndex: 60, position: "fixed", top: 16, left: 16 }} // Always visible, fixed
    >
      <span className="block w-5 h-0.5 bg-blue-600 mb-1"></span>
      <span className="block w-5 h-0.5 bg-blue-600 mb-1"></span>
      <span className="block w-5 h-0.5 bg-blue-600"></span>
    </button>
  );
}
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div>
      <Toaster />
      {/* SidebarTrigger only visible when sidebar is closed */}
      {!sidebarOpen && (
        <SidebarTrigger onClick={() => setSidebarOpen((v) => !v)} />
      )}
      {/* Sidebar, only visible when sidebarOpen */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content, full width */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
