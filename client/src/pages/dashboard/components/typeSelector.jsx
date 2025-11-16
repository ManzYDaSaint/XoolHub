import React from "react";

const TypeSelect = ({ label, type, name, value, onChange }) => {
  return (
    <div className="formInputContainer">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="inputContainer">
        <select type={type} name={name} value={value} onChange={onChange}>
          <option value={""} disabled>
            --select option--
          </option>
          <option value={"public"}>public</option>
          <option value={"private"}>private</option>
        </select>
      </div>
    </div>
  );
};

export default TypeSelect;
