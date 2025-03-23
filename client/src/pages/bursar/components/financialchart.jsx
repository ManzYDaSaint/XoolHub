import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const FinancialChart = () => {
  const data = [
    { name: "Jan", income: 40000, expenses: 30000 },
    { name: "Feb", income: 50000, expenses: 35000 },
    { name: "Mar", income: 70000, expenses: 45000 },
    { name: "Apr", income: 60000, expenses: 50000 },
    { name: "May", income: 75000, expenses: 55000 },
  ];

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