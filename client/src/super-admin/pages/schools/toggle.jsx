import React, { useState, useEffect } from "react";

const ToggleSwitch = ({ id, status, onToggle }) => {
  // Determine if the toggle should be initially checked
  const [isChecked, setIsChecked] = useState(status === 'Activated' || status === 'Approved');

  useEffect(() => {
      // Update local state if props change
      setIsChecked(status === 'Activated');
      setIsChecked(status === 'Approved');
  }, [status]);

  const handleChange = () => {
      onToggle(id, status);
  };
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all duration-300"></div>
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-all duration-300"></div>
    </label>
  );
};

export default ToggleSwitch;