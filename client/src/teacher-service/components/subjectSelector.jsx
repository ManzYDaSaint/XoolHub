import React, { useState, useEffect } from 'react';
import api from '../../services/apiServices';

const SubjectSelector = ({ label, onChange, name, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAssignSubject();
        const data = response.data.st;
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
            <option value="" selected disabled>Select an option</option>
            {options.map((option) => (
              <option key={option.subjectid} value={option.subjectid}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
  );
};

export default SubjectSelector;
