import React, { useState } from "react";
import SuperAuth0 from "../../../hooks/superauth.jsx";
import SuperSidebar from "../../components/navbar/navbar.jsx";
import FeedbackAnalytics from "./FeedbackAnalytics.jsx";
import { BarChart3 } from "lucide-react";

const Feeds = () => {
  const [viewMode, setViewMode] = useState('analytics'); // 'analytics' or 'table'

  return (
    <SuperAuth0>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <SuperSidebar />
          <div className="dashboard">
            <div className="settingContainer">
              <div className="settingContent">
                <div className="flex bg-gray-100 pb-3">
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
                      <div>
                        <h1
                          className="text-lg font-semibold"
                          style={{ fontFamily: "'Poppins', san-serif" }}
                        >
                          Feedback Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage feedback from schools and their details.
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex space-x-2">
                        <button
                          onClick={() => setViewMode('analytics')}
                          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            viewMode === 'analytics'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <BarChart3 size={16} className="mr-2" />
                          Analytics
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5">
                      <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
                        <FeedbackAnalytics />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAuth0>
  );
};

export default Feeds;
