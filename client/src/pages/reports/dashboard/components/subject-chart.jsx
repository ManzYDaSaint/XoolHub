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

const SubjectChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={450} className={'text-sm'}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="average" stroke="#66DA81" name="Average Score Per Subject" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SubjectChart;
