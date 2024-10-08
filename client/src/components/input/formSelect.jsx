import React from 'react'

const FormSelect = ({label, type, value, name, onChange}) => {
  return (
    <div className="formInputContainer">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="inputContainer">
            <select type={type} name={name} value={value} onChange={onChange}>
                <option value={''} disabled selected>--select option--</option>
                <option value={'JCE'}>JCE</option>
                <option value={'MSCE'}>MSCE</option>
            </select>
        </div>
        
    </div>
  )
}

export default FormSelect