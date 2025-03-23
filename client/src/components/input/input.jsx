import React from 'react'

const Input = ({name, type, placeholder, value, onChange, autoComplete, icon: Icon}) => {
  return (
    <div className="formInput">
        <div className="Input">
            {Icon && <Icon size={18} className="lucideIcon" />}
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