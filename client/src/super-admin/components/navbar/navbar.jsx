import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SuperSidebar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-lg shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-16">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/super"
              className={`px-3 py-2 rounded-md transition font-medium ${
                location.pathname === "/super"
                  ? "bg-blue-100 text-blue-700 shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/schools"
              className={`px-3 py-2 rounded-md transition font-medium ${
                location.pathname === "/schools"
                  ? "bg-blue-100 text-blue-700 shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Schools
            </Link>
          </li>
          <li>
            <Link
              to="/subscriptions"
              className={`px-3 py-2 rounded-md transition font-medium ${
                location.pathname === "/subscriptions"
                  ? "bg-blue-100 text-blue-700 shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Subscriptions
            </Link>
          </li>
          <li>
            <Link
              to="/feeds"
              className={`px-3 py-2 rounded-md transition font-medium ${
                location.pathname === "/feeds"
                  ? "bg-blue-100 text-blue-700 shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              className={`px-3 py-2 rounded-md transition font-medium ${
                location.pathname === "/setting"
                  ? "bg-blue-100 text-blue-700 shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              Settings
            </Link>
          </li>
        </ul>
        <div className="ml-auto">
          <Link
            to="/suprofile"
            className={`px-3 py-2 rounded-md transition font-medium ${
              location.pathname === "/suprofile"
                ? "bg-blue-100 text-blue-700 shadow"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SuperSidebar;
