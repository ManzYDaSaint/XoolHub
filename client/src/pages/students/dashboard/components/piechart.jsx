import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from '../../../../services/apiServices';


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const COLORS = ['#0088FE', '#FF69B4'];

const GenderPieChart = () => {
  const [data, setData] = useState([]);

  const fetchPie = async () => {
    try {
      const res = await api.genderPercentage();
      const data = res.data.counter.map(item => ({
        ...item,
        percentage: Number(item.percentage),
      }));
      setData(data);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchPie();
  }, []);

  return (
    <div className="chart-container" style={{ width: '100%', height: '350px' }}>
      <ResponsiveContainer>
        {data.length > 0 ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="gender"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>Loading...</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default GenderPieChart;