import React, { useEffect, useState } from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import api from "../../../services/apiServices";

const FinancialChart = () => {
  const [data, setData] = useState([]);

  const fetchChart = async() => {
    const res = await api.LineChart();
    const chartData = res.data.line || [];
    setData(chartData);
  }

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <div className="p-6 border-2 border-gray-300 rounded-lg w-full">
      <h3 className="text-gray-500 font-semibold mt-4 border-b-2 border-gray-300 pb-2 text-md">Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={300} className={'text-sm mt-4'}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#34D399" fill="#34D39930" />
          <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="#EF444430" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;