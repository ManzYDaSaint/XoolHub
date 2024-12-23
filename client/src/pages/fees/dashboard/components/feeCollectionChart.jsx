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

const FeeCollectionLineChart = () => {
  const [data, setData] = useState([]);

  const fetchOutstand = async () => {
      try {
        const res = await api.paymentDays();
        const data = res.data.paid;
        setData(data);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchOutstand();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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