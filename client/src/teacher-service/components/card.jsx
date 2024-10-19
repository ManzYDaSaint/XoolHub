import React from 'react'
import { Icon } from 'semantic-ui-react'

const DashboardCard = ({ label, figure, icon, note, dico, cardTop }) => {

  return (
    <div className='cardContainer'>
        <div className="cardTop" id={cardTop}>
            <div className="cardHeader">
                <h5>{figure}</h5>
                <p>{label}</p>
            </div>
            <div className="dicon">
                {icon && <Icon name={icon} size='big' id={dico} />}
            </div>
        </div>
        <p className='note'>{note}</p>
    </div>
  )
}

export default DashboardCard