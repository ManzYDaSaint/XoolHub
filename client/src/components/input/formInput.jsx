import React from 'react'

const FormInput = ({label, type, value, name, onChange, placeholder}) => {
  return (
    <div className="formInputContainer">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="inputContainer">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
        
    </div>
  )
}

export default FormInput