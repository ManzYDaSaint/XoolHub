import React, { useState, useEffect } from 'react';
import api from '../../../services/apiServices.jsx';

const FeesSelectInput = ({ label, name, onChange, value }) => {
  const [options, setOptions] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectChange = (event) => {
    const selectedOption = options.find(
      (option) => option.id === event.target.value
    );
    if (selectedOption) {
      setSelectedAmount(selectedOption.amount);
      setSelectedId(selectedOption.id);
      // Call the provided onChange function with selected data
      onChange({ id: selectedOption.id, amount: selectedOption.amount });
    } else {
      // Handle case where no option is selected (e.g., reset state)
      setSelectedAmount(null);
      setSelectedId(null);
      onChange({ id: null, amount: null }); // Pass null values if needed
    }
  };
  console.log(selectedId, selectedAmount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.gettFee();
        const data = response.data.fee;
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
          <select name={name} value={value || ""} onChange={handleSelectChange}>
            <option value="" disabled>Select an option</option>
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

export default FeesSelectInput;
