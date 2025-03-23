import React from "react";

const Roles = ({ label, type, name, value, onChange }) => {
  return (
    <div className="formInputContainer">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="inputContainer">
        <select type={type} name={name} value={value} onChange={onChange}>
          <option value={""} disabled selected>
            --select option--
          </option>
          <option value={"Teacher"}>Teacher</option>
          <option value={"Bursar"}>Bursar</option>
          <option value={"Hoa"}>Head of Academics</option>
          <option value={"Hod"}>Head of Department</option>
        </select>
      </div>
    </div>
  );
};

export default Roles;
