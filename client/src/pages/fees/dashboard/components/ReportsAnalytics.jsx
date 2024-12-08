import React from "react";
// import { Line } from "react-chartjs-2";

const ReportsAnalytics = () => {
//   const chartData = {
//     labels: ["January", "February", "March", "April", "May"],
//     datasets: [
//       {
//         label: "Outstanding Dues",
//         data: [200, 150, 100, 80, 50],
//         borderColor: "rgba(255, 99, 132, 1)",
//         fill: false,
//       },
//     ],
//   };

  const exportReport = () => {
    console.log("Report Exported");
    // API Call to generate and download the report
  };

  return (
    <div className="reports-analytics">
      <h3>Reports & Analytics</h3>
      {/* <Line data={chartData} /> */}
      <button variant="contained" color="primary" onClick={exportReport} style={{ marginTop: 20 }}>
        Export Report
      </button>
    </div>
  );
};

export default ReportsAnalytics;
