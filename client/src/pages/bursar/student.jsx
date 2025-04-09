import React from "react";
import StudentData from "../../teacher-service/data/studentData";
import { Toaster } from "react-hot-toast";
import AuthT from "../../hooks/tauth";
import Sidebar from "../../components/input/sidebar";

const BStudent = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <div className="flex bg-gray-100 pb-3">
              <Toaster />
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
                  <div>
                    <h1
                      className="text-lg font-semibold"
                      style={{ fontFamily: "'Poppins', san-serif" }}
                    >
                      Student Management
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage and update student information
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0"></div>
                </div>

                {/* Profile Information */}
                <div className="p-6">
                  <div className="p-6 bg-white shadow-lg rounded-lg">
                    <StudentData />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default BStudent;
