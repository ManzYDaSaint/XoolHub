import React from 'react'

const Buttonee = ({label, type}) => {
  return (
    <div>
        <button 
            type={type}
            className='form_button' 
        >
          {label}
        </button>
    </div>
  )
}

export default Buttonee