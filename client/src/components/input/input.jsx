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
    <div className="flex items-center gap-2 border-2 border-gray-300 p-2 rounded-lg">
      {Icon && <Icon size={18} className="lucideIcon" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={autoComplete}
        className="w-full bg-transparent text-sm outline-none"
      />
      {(type === "password" || type === "text") &&
        typeof showPassword === "boolean" &&
        setShowPassword && (
          <PasswordToggleButton
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
    </div>
  );
};

export default Input;
