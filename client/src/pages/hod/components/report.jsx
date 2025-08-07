import React from "react";
import ReportData from "./reportdata";

const Report = () => {
  return (
    <div className="bg-gray-100 pb-3">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-2 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
          <div className="ml-16">
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Examination Report Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage and update student examination reports.
            </p>
          </div>
          <div className="mt-4 sm:mt-0"></div>
        </div>

        {/* Report Information */}
        <ReportData />
      </div>
  );
};

export default Report;
