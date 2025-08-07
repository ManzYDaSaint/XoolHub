import React from "react";
import ReportData from "../reports/reportData";
import ReportDashboard from "../reports/dashboard/report-dashboard";
import Navbar from "../../components/input/top";
import Layout from "../../components/layout";

const Report = () => {
  return (
    <Layout>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex h-16 items-center gap-4 px-6">
          <div className="flex items-center justify-between w-full">
            <div className="ml-16 border-l-2 border-blue-600 pl-6">
              <h1 className="text-lg bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent font-semibold">
                Examination reports
              </h1>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="p-4 border-2 border-gray-300 rounded-lg">
          <ReportData />
          <ReportDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Report;
