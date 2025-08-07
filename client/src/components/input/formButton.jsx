import React from 'react'

const FormButton = ({type, label, id, onClick}) => {
  return (
    <div className=''>
        <button 
            className='bg-gradient-to-r from-blue-600 to-green-600 outline-none px-3 py-2 rounded-lg text-white text-sm'
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