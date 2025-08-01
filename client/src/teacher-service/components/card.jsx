import React from 'react'
import CountUp from "react-countup";
import { FlipVertical } from 'lucide-react';

const DashboardCard = ({ label, figure, icon, note, dico, cardTop }) => {

  return (
    <div className='cardContainer'>
        <div className="cardTop" id={cardTop}>
            <div className="cardHeader">
                <h5>{
                  <CountUp
                  start={0}
                  end={figure}
                  duration={2.5}
                  separator=","
                />
              }</h5>
                <p>{label}</p>
            </div>
            <div className="dicon">
                {icon && <FlipVertical id={dico} />}
            </div>
        </div>
        <p className='note'>{note}</p>
    </div>
  )
}

export default DashboardCard