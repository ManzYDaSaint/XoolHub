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
import api from '../../../../services/apiServices';

const PaymentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.paymentLineChart();
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis dataKey="total_amount" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="total_amount"
          stroke="#007BFE"
          name="Subscription Payments"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PaymentChart;