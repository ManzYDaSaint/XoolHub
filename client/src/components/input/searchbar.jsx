import { Search } from 'lucide-react'
import React from 'react'

const Searchbar = ({type, placeholder, onChange}) => {
  return (
    <div className='searchBar_Container'>
        <Search size={18} className='mr-3'/>
        <input 
            type={type} 
            placeholder={placeholder}
            className='searchInput'
            onChange={onChange}
        />
    </div>
  )
}

export default Searchbar