import React from 'react'
import './components.css'
import { Icon } from 'semantic-ui-react'

const Input = ({icon, label, name, type, placeholder, value, onChange, id}) => {
  return (
    <div class="form__text__input">
        <div class="input__icon__container">
            <Icon name={icon} inverted color='black' class="input__icon"/>
        </div>
        <div className="inputs">
            {label && <label htmlFor={name}>{label}</label>}
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              name={name}
              id={id}
              className='text__input'
              // required
            />
        </div>
    </div>
  )
}

export default Input