// PieChartComponent.jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import api from '../../../services/apiServices';

const COLORS = ['#0088FE', '#FF8042'];

const PieChartComponent = () => {

  const [sum, setSum] = useState(0);
    const [count, setCount] = useState(0);
    const [tuition, setTuition] = useState(0);
  
    const pendingFee = count * tuition - sum;
  
    const fethCount = async () => {
      try {
        const res = await api.sumPay();
        const data = res.data.sum;
        setSum(data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fethCount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchCount = async () => {
      try {
        const res = await api.countStudent();
        const data = res.data.counter;
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchCount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    const fetchTuition = async () => {
      try {
        const res = await api.getTuition();
        const data = res.data.tuition;
        setTuition(data.amount);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchTuition();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const data = [
        { name: 'Fees Collected', value: sum + "MK"},
        { name: 'Pending Fees', value: pendingFee + "MK" },
      ];
      
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;

