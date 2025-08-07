import React from 'react'
import { Eye, EyeOff } from 'lucide-react'

const PasswordToggleButton = ({ showPassword, setShowPassword }) => (
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="text-gray-300 hover:text-gray-600 transition duration-200"
    tabIndex={-1}
  >
    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
  </button>
)

export default PasswordToggleButton