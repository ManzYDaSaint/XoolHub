import React, { useState } from "react";
import ReportForm from "./reportForm.jsx";
import FormButton from "../../components/input/formButton.jsx";
import { Filter } from "lucide-react";

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
    <main className="px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Filter Button */}
        <div
          className="mb-8 flex justify-end"
          style={{ display: showReport ? "none" : "block" }}
        >
          <button
            type="button"
            onClick={handleReportOpen}
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <Filter size={18} className="group-hover:scale-110 transition-transform duration-200" />
            Filter Reports
          </button>
        </div>

        {/* Report Form */}
        <div
          className="space-y-6"
          style={{ display: showReport ? "block" : "none" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Report Filters</h2>
            </div>
            <FormButton
              label={"Close"}
              id={"closeBtn"}
              onClick={handleReportClose}
            />
          </div>
          
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/30"></div>
            <div className="relative p-8">
              <ReportForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportData;
