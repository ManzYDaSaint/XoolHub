import React from 'react'
import { Icon } from 'semantic-ui-react'

const Searchbar = ({icon, type, placeholder, onChange}) => {
  return (
    <div className='searchBar_Container'>
        <Icon name={icon} className='searchIcon' />
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