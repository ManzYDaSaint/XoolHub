import { Search } from 'lucide-react'
import React from 'react'

const Searchbar = ({type, placeholder, onChange}) => {
  return (
    <div className='inline-flex items-center border-2 border-gray-300 p-2 rounded-lg text-sm px-4'>
        <Search className='mr-2 text-gray-600'/>
        <input 
            type={type} 
            placeholder={placeholder}
            className='outline-none bg-transparent'
            onChange={onChange}
        />
    </div>
  )
}

export default Searchbar