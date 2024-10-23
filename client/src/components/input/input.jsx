import React from 'react'
import './components.css'

const Input = ({name, type, placeholder, value, onChange, autoComplete}) => {
  return (
    <div className="formInput">
        <div className="Input">
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              name={name}
              autoComplete={autoComplete}
            />
        </div>
    </div>
  )
}

export default Input