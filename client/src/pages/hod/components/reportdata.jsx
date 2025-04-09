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
      <div className="div ml-6" style={{ display: showReport ? "none" : "block" }}>
        <button
          type="button"
          onClick={handleReportOpen}
          className="add__rows__btn"
        >
          <Filter size={15} className="plus" />
          Filter
        </button>
      </div>
      <div className="px-6 mt-4">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <div
            className="toggleDiv"
            style={{ display: showReport ? "block" : "none", backgroundColor: "white" }}
          >
            <FormButton
              label={"Close"}
              id={"closeBtn"}
              onClick={handleReportClose}
            />
            <ReportForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportData;
