import React, { useState, useEffect } from "react";
import api from "../../../services/apiServices.jsx";

const YearSelectInput = ({ label, onChange, name, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getYear();
        const data = response.data.year;
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
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-sm outline-none px-4 pb-2"
      >
        <option value="" selected disabled>
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

export default YearSelectInput;
