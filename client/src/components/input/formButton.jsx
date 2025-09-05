import React from 'react'

const FormButton = ({type, label, id, onClick, className, children}) => {
  return (
    <div className=''>
        <button 
            className={`group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 ${className || ''}`}
            id={id}
            type={type}
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <span className="relative flex items-center justify-center gap-2">
              {children}
              {label}
            </span>
        </button>
    </div>
  )
}

export default FormButton