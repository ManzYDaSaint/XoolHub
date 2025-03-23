import React from 'react'

const FormButton = ({type, label, id, onClick}) => {
  return (
    <div className='formButtonContainer'>
        <button 
            className='formButton'
            id={id}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    </div>
  )
}

export default FormButton