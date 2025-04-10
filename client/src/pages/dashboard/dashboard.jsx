import React, { useState, useEffect } from "react";
import Welcome from "../../teacher-service/components/welcome";
import MasterCards from "./components/master-cards";
import FeeCollectionLineChart from "../fees/dashboard/components/feeCollectionChart";
import PieChartComponent from "./components/piechart";
import FinancialChart from "../bursar/components/financialchart";
import StudentBarChart from "../students/dashboard/components/barchart";
import GenderPieChart from "../students/dashboard/components/piechart";
import api from "../../services/apiServices";

const AdminDashboard = () => {
  const [chart, setChart] = useState([]);
  const fetchGenderClass = async () => {
      try {
        const res = await api.countGenderByClass();
        const data = res.data.counter;
        setChart(data);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchGenderClass();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    // Reshape Data
    const reshapedData =
      chart && Array.isArray(chart) && chart.length > 0
        ? chart.reduce((acc, item) => {
            const existingClass = acc.find((entry) => entry.class === item.class);
            if (existingClass) {
              existingClass[item.gender] = parseInt(item.count, 10);
            } else {
              acc.push({
                class: item.class,
                [item.gender]: parseInt(item.count, 10),
              });
            }
            return acc;
          }, [])
        : [];
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
      <div className="px-3 w-100">
        <FinancialChart />
      </div>
      <div className="grid grid-cols-3 gap-4 py-8">
        <div className="col-span-2 bg-white-700 p-5 rounded-lg shadow-lg">
        <StudentBarChart data={reshapedData} />
        </div>
        <GenderPieChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
