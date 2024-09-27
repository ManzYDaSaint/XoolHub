import React from 'react'

const GenderSelect = ({label, type, name, value, onChange}) => {
  return (
    <div className="formInputContainer">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="inputContainer">
            <select type={type} name={name} value={value} onChange={onChange}>
                <option disabled selected>--select option--</option>
                <option value={'Male'}>Male</option>
                <option value={'Female'}>Female</option>
            </select>
        </div>
        
    </div>
  )
}

export default GenderSelect