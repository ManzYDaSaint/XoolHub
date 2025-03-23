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
    <>
      <div className="div" style={{ display: showReport ? "none" : "block" }}>
        <button
          type="button"
          onClick={handleReportOpen}
          className="add__rows__btn"
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
    </>
  );
};

export default ReportData;
