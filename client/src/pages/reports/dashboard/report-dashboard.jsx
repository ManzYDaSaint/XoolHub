import React from "react";
import ReportOverview from "./components/report-overview";
import AverageScore from "./components/averagescore";

const ReportDashboard = () => {
  return (
    <>
      <ReportOverview />
      <AverageScore />
    </>
  );
};

export default ReportDashboard;
