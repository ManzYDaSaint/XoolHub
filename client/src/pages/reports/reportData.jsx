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
    <main className="p-6">
      <div
        className="border-b-2 border-gray-300 pb-4 inline-flex justify-end"
        style={{ display: showReport ? "none" : "block" }}
      >
        <button
          type="button"
          onClick={handleReportOpen}
          className="bg-gradient-to-r from-blue-700 via-gray-500 to-green-600 text-white hover:bg-gradient-to-br transition duration-300 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3"
        >
          <Filter size={15} className="plus" />
          Filter
        </button>
      </div>
      <div
        className="toggleDiv"
        style={{ display: showReport ? "block" : "none" }}
      >
        <FormButton
          label={"Close"}
          id={"closeBtn"}
          onClick={handleReportClose}
        />
        <ReportForm />
      </div>
    </main>
  );
};

export default ReportData;
