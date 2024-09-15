import React from 'react'
import { Icon } from 'semantic-ui-react'

const FormButton = ({type, label, id, onClick, icon}) => {
  return (
    <div className='formButtonContainer'>
        <button 
            icon={Icon}
            className='formButton'
            id={id}
            type={type}
            onClick={onClick}
        >
          {icon && <Icon name={icon} />}
            {label}
        </button>
    </div>
  )
}

export default FormButton