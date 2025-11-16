import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices.jsx";

const FeesSelectInput = ({ label, name, onChange, value }) => {
  const [options, setOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selectedOption = options.find(
      (option) => option.id === event.target.value
    );
    if (selectedOption) {
      // Call the provided onChange function with selected data
      onChange({ id: selectedOption.id, amount: selectedOption.amount });
    } else {
      // Handle case where no option is selected (e.g., reset state)
      onChange({ id: null, amount: null }); // Pass null values if needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.gettFee();
        const data = response.data.fee;
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []);

  return (
    <div className="bg-gray-100 px-4 py-2 rounded-lg flex flex-col mb-4">
      {label && (
        <label htmlFor={""} className="text-sm font-medium text-gray-700 py-2">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value || ""}
        onChange={handleSelectChange}
        className="w-full bg-transparent text-sm outline-none px-4 pb-2"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FeesSelectInput;
