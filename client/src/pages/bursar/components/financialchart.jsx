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

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white p-4 shadow rounded-lg ${className}`}>{children}</div>
  );

  return (
    <Card className="p-5 mt-6">
      <h3 className="text-lg font-semibold mb-4 pt-3">Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#34D399" fill="#34D39930" />
          <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="#EF444430" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default FinancialChart;