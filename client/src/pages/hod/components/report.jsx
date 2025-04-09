import React from "react";
import { Toaster } from "react-hot-toast";
import ReportData from "./reportdata";

const Report = () => {
  return (
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
              Examination Report Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and update student examination reports.
            </p>
          </div>
          <div className="mt-4 sm:mt-0"></div>
        </div>

        {/* Report Information */}
        <ReportData />
      </div>
    </div>
  );
};

export default Report;
