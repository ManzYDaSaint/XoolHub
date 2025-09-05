import React from "react";

const FormInput = ({ label, type, value, name, onChange, placeholder, disabled }) => {
  return (
    <div className="relative group">
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/90 ${
            disabled 
              ? 'bg-gray-100/80 text-gray-500 cursor-not-allowed border-gray-200' 
              : 'hover:border-gray-300/70 hover:bg-white/90'
          }`}
          onChange={onChange}
          placeholder={placeholder}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default FormInput;
