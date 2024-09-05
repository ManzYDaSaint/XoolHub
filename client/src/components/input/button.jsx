import React from 'react'
import { Icon } from 'semantic-ui-react'

const Buttonee = ({label, type, id, value, icon}) => {
  return (
    <div>
        <button 
            type={type}
            className='form_button' 
        >
          <Icon name={icon} id="button__icon"/> &nbsp;
          {label}
        </button>
    </div>
  )
}

export default Buttonee