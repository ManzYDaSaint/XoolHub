import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import api from '../../services/apiServices';

// Custom active shape for pie chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 12 : -12)} y={ey} textAnchor={textAnchor} fill="#333">{`Count ${value}`}</text>
      <text x={ex + (cos >= 0 ? 12 : -12)} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const DashPieChart = ({ id }) => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // State for active segment

  const fetchData = async () => {
    try {
      const res = await api.getStudentByGender();
      const formattedData = res.data.studentGender.map(item => ({
        name: item.studentGender.charAt(0).toUpperCase() + item.studentGender.slice(1),
        value: parseInt(item.count, 10)
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042']; // Adding a third color for 'Other'

  // Event handler to set active segment
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={400} height={400} className='dashActualPie'>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape} // Use custom active shape
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter} // Trigger on mouse enter
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default DashPieChart;
