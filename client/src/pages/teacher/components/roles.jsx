import React from "react";

const Roles = ({ label, type, name, value, onChange }) => {
  return (
    <div className="bg-gray-100 px-4 py-2 rounded-lg flex flex-col mb-4">
      {label && <label htmlFor={name} className="text-sm font-medium text-gray-700 py-2">{label}</label>}
        <select type={type} name={name} value={value} onChange={onChange} className="w-full bg-transparent text-sm outline-none px-4 pb-2">
          <option value={""} disabled selected>
            --select option--
          </option>
          <option value={"teacher"}>teacher</option>
          <option value={"bursar"}>bursar</option>
          <option value={"hoa"}>Head of Academics</option>
          <option value={"hod"}>Head of Department</option>
        </select>
      </div>
  );
};

export default Roles;
