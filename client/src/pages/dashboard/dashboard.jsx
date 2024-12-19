import React from "react";
import Welcome from "../../teacher-service/components/welcome";
import MasterCards from "./components/master-cards";
import FeeCollectionLineChart from "../fees/dashboard/components/feeCollectionChart";
import PieChartComponent from "./components/piechart";

const AdminDashboard = () => {
  return (
    <div className="master_container">
      <Welcome />
      <div className="master_cards mt-4">
        <MasterCards />
      </div>
      <div className="fees_deatils_container">
        <div className="line_chart">
          <h4>Payment Tracking</h4>
          <FeeCollectionLineChart />
        </div>
        <div className="pie_chart">
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
