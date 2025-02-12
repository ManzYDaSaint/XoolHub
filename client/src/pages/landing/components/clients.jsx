import React, { useEffect, useState } from 'react';
import api from '../../../services/apiServices';

const Schools = () => {
  const [schools, setSchoolData] = useState([]);

  // Fetch all the exams
  const fetchData = async () => {
      const res = await api.getXuls();
      const data = res.data.school;
      setSchoolData(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="schools">
      <h2>Our Clients</h2>
      <h5>Trusted and partnered <br />with leading schools</h5>
      <p>Our platform is trusted and partnered with leading schools across <br />the country and used by teachers, administrators, and parents daily.</p>
      <div className="plan-cards">
        {schools.map((item, index) => (
          <div key={index} className="plan-card">
            <img src={item.logo} alt={item.name} className='plan-icons' />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;
