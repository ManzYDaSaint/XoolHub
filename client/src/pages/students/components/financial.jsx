import React from 'react'
import PfData from '../financial/data'

const Financial = () => {
  return (
    <div className='personalContainer'>
        <div className="profileUpdate">
            <h5><strong>Fees Information</strong></h5>
            <p>Here you can add, edit, delete, view and manage fees <br />for a particular student and track fees progress</p>
        </div>
        <div className='mt-5'>
          <PfData />
        </div>
    </div>
  )
}

export default Financial