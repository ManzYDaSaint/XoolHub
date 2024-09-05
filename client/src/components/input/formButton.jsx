import React from 'react'

const FormButton = ({type, label, id}) => {
  return (
    <div className='formButtonContainer'>
        <button 
            className='formButton'
            id={id}
            type={type}
        >
            {label}
        </button>
    </div>
  )
}

export default FormButton