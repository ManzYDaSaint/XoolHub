import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const FeeCollectionLineChart = () => {
  const data = [
    { day: "Monday", amount: 20 },
    { day: "Tuesday", amount: 25 },
    { day: "Wednesday", amount: 18 },
    { day: "Thursday", amount: 58 },
    { day: "Friday", amount: 49 },
  ]; 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#007BFE" name="Fee Collected" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FeeCollectionLineChart;