import React from "react";

const FormInput = ({ label, type, value, name, onChange, placeholder }) => {
  return (
    <div className="bg-gray-100 px-4 py-2 rounded-lg flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 py-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        className="w-full bg-transparent text-sm outline-none px-4 pb-2"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
