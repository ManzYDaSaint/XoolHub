import React, { useState, useEffect } from 'react';
import api from '../../../services/apiServices.jsx';

const YearSelectInput = ({ label, onChange, name, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getYear();
        const data = response.data.year;
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []);

  return (
      <div className="formInputContainer">
        {label && <label htmlFor={''}>{label}</label>}
        <div className="inputContainer">
          <select name={name} value={value} onChange={onChange}>
            <option value="" selected disabled>Select an option</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
  );
};

export default YearSelectInput;