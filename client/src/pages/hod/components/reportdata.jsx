import React, { useState } from "react";
import { Filter } from "lucide-react";
import ReportForm from "./form.jsx";
import FormButton from "../../../components/input/formButton.jsx";

const ReportData = () => {
  // const dispatch = useDispatch();
  const [showReport, setShowReport] = useState(false);
  const handleReportOpen = () => {
    setShowReport(true);
  };
  const handleReportClose = () => {
    setShowReport(false);
  };

  return (
    <>
      <div className="mb-8" style={{ display: showReport ? "none" : "block" }}>
        <button
          type="button"
          onClick={handleReportOpen}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <span className="relative flex items-center gap-2">
            <Filter size={16} className="group-hover:scale-110 transition-transform duration-200" />
            Filter Reports
          </span>
        </button>
      </div>
      
      <div style={{ display: showReport ? "block" : "none" }}>
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Report Filters</h3>
              </div>
              <FormButton
                label={"Close"}
                id={"closeBtn"}
                onClick={handleReportClose}
              />
            </div>
            <ReportForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportData;
