import React from "react";
import PasswordToggleButton from "../password-button";

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  icon: Icon,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="group relative inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 p-3 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 w-full">
      {Icon && (
        <Icon 
          size={18} 
          className="mr-3 text-gray-500 group-focus-within:text-blue-600 transition-colors duration-200" 
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={autoComplete}
        className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
      />
      {(type === "password" || type === "text") &&
        typeof showPassword === "boolean" &&
        setShowPassword && (
          <PasswordToggleButton
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
    </div>
  );
};

export default Input;
