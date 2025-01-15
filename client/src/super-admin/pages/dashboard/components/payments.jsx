import React, { useState, useEffect } from 'react';
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
// import api from '../../../../services/apiServices';

const PaymentChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Mock data for monthly subscription amounts
        const mockData = [
          { month: "January", amount: 250640 },
          { month: "February", amount: 782742 },
          { month: "March", amount: 650239 },
          { month: "April", amount: 409238 },
          { month: "May", amount: 128436 },
          { month: "June", amount: 982362 },
          { month: "July", amount: 623492 },
          { month: "August", amount: 203847 },
          { month: "September", amount: 348139 },
          { month: "October", amount: 861357 },
          { month: "November", amount: 503765 },
          { month: "December", amount: 213745 },
        ];
        setData(mockData);
      }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis dataKey="amount" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#007BFE" name="Subscription Payments" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PaymentChart;