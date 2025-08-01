import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StudentBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="class" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Male" fill="#8884d8" />
        <Bar dataKey="Female" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StudentBarChart;