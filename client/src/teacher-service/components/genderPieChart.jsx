import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import api from '../../services/apiServices';

const GenderPieChart = ({ id }) => { // Destructure 'id' from props
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.getStudentByGender(id); // Pass 'id' to the API call

      const formattedData = res.data.gender.map(item => ({
        name: item.gender.charAt(0).toUpperCase() + item.gender.slice(1),
        value: parseInt(item.count, 10)
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  }

  useEffect(() => {
      fetchData();
  }, [id]); // eslint-disable-next-line 

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042']; // Adding a third color for 'Other'

  return (
    <PieChart width={50} height={50}>
      <Pie
        data={data}
        cx={25}
        cy={25}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={20}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default GenderPieChart;
