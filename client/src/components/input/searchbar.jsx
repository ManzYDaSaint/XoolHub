import { Search } from 'lucide-react'
import React from 'react'

const Searchbar = ({type, placeholder, onChange, value}) => {
  return (
    <div className='group relative inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 p-3 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50'>
        <Search className='mr-3 text-gray-500 group-focus-within:text-blue-600 transition-colors duration-200' size={18}/>
        <input 
            type={type} 
            placeholder={placeholder}
            value={value}
            className='outline-none bg-transparent text-gray-900 placeholder-gray-500 w-full'
            onChange={onChange}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
    </div>
  )
}

export default Searchbar