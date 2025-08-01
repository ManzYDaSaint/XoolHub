import React from "react";
import Sidebar from "../../components/input/sidebar.jsx";
import Tabs from "./components/tabs.jsx";
import AuthT from "../../hooks/tauth.jsx";
import { Toaster } from "react-hot-toast";

const StudentProfile = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <div className="flex bg-gray-100 pb-3">
              <div className="flex-1 flex flex-col">
                <div className="mb-8 sm:items-center shadow p-4">
                  <div>
                    <h1
                      className="text-lg font-semibold"
                      style={{ fontFamily: "'Poppins', san-serif" }}
                    >
                      Update Student Information
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage fees, edit and update student information.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0"></div>
                </div>
                <Tabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default StudentProfile;
