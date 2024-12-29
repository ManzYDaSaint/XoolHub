import React from 'react'
import FormButton from '../../components/input/formButton.jsx'

const Welcome = () => {
  const today = new Date();
  
  const date = today.getDate();
  
  const dayOfWeek = today.toLocaleString('default', { weekday: 'short' });
  
  const month = today.toLocaleString('default', { month: 'long' });

  return (
    <>
      <div className="welcomeContainer">
        <div className="dateContainer">
          <h3>{date}</h3>
          <div className="dateSection">
            <p>{dayOfWeek},</p>
            <p>{month}</p>
          </div>
        </div>
        <div className="tasker">
          <FormButton
            id={'tyepButton'}
            label={'Show my tasks'}
            icon={'arrow right'}
          />
        </div>
      </div>
    </>
  )
}

export default Welcome