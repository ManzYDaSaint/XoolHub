import React from "react";
import { Toaster } from "react-hot-toast";
import AverageScore from "../../reports/dashboard/components/averagescore";

const Howa = () => {
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
              Head Of Academics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage, edit and update your academics.
            </p>
          </div>
          <div className="mt-4 sm:mt-0"></div>
        </div>

        {/* Profile Information */}
        <div className="px-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <AverageScore />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howa;
