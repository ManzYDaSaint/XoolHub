import React, { useState, useEffect } from "react";
import MasterCards from "./components/master-cards";
import FeeCollectionLineChart from "../fees/dashboard/components/feeCollectionChart";
import PieChartComponent from "./components/piechart";
import FinancialChart from "../bursar/components/financialchart";
import StudentBarChart from "../students/dashboard/components/barchart";
import GenderPieChart from "../students/dashboard/components/piechart";
import api from "../../services/apiServices";
import Navbar from "../../components/input/top";

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
    <div className="">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex h-16 items-center gap-4 px-6">
          <div className="flex items-center justify-between w-full">
            <div className="ml-16 border-l-2 border-blue-600 pl-6">
              <h1 className="text-lg bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent font-semibold">
                Overview
              </h1>
            </div>
            <Navbar />
          </div>
        </div>
      </header>

      <div className="mt-4">
        <MasterCards />
      </div>

      <div className="px-6 py-4 flex flex-col md:flex-row items-center gap-4 h-auto">
        <div className="p-4 border-2 border-gray-300 rounded-lg w-full">
          <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md">Payment Tracking</h4>
          <FeeCollectionLineChart />
        </div>
        <div className="p-4 border-2 border-gray-300 rounded-lg">
          <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md">Collected Fees Vs Pending</h4>
          <PieChartComponent />
        </div>
      </div>
      <div className="px-6 py-4 w-full">
        <FinancialChart />
      </div>
      <div className="px-6 py-4 flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="p-4 border-2 border-gray-300 rounded-lg w-full">
          <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md mb-4">Student class distribution</h4>
        <StudentBarChart data={reshapedData} />
        </div>
        <div className="p-4 border-2 border-gray-300 rounded-lg w-full">
          <h4 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md mb-4">Student gender by percentage</h4>
        <GenderPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
