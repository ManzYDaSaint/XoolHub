import React, { useState, useEffect } from 'react';
import api from '../../../../services/apiServices';

const YearOptions = ({ onChange, name, value }) => {
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
        <div className="flex items-center justify-end mb-4">
          <select name={name} value={value} onChange={onChange} className='bg-blue-600 rounded-md px-3 py-1 text-white'>
            {options.map((option) => (
              <option key={option.yearid} value={option.yearid}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
  );
};

export default YearOptions;