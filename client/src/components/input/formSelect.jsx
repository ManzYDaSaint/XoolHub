import React from 'react'
import { ChevronDown } from 'lucide-react'

const FormSelect = ({
  label, 
  name, 
  value, 
  onChange, 
  children, 
  placeholder = "--select option--",
  required = false,
  disabled = false,
  error = false,
  errorMessage = "",
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-2 text-sm bg-gray-100 px-4 py-2 rounded-lg ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full px-3 py-2 pr-10 border rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
            ${error 
              ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 bg-white hover:border-gray-400'
            }
            ${disabled 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'text-gray-900 cursor-pointer'
            }
            appearance-none
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown 
            className={`h-5 w-5 ${
              disabled ? 'text-gray-400' : 'text-gray-500'
            }`} 
          />
        </div>
      </div>
      
      {error && errorMessage && (
        <p className="text-sm text-red-600 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default FormSelect