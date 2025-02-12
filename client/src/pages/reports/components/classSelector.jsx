import React, { useState, useEffect } from 'react';
import api from '../../../services/apiServices';

const ClassSelector = ({ label, onChange, name, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getClass();
        const data = response.data.classs;
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="formInputContainer">
        {label && <label htmlFor={''}>{label}</label>}
        <div className="inputContainer">
          <select name={name} value={value} onChange={onChange}>
            <option value={''} disabled selected>Select an option</option>
            {options.map((option) => (
              <option key={option.classid} value={option.classid}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
  );
};

export default ClassSelector;
