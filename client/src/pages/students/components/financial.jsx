import React from 'react'
import PfData from '../financial/data'
 
const Financial = () => {
  return (
    <div className='personalContainer'>
        <div className="border-b-2 border-gray-300 pb-4 mb-5">
            <h5 className=''><strong>Fees Information</strong></h5>
            <p className='text-sm text-gray-700'>Here you can add, edit, delete, view and manage fees <br />for a particular student and track fees progress</p>
        </div>
        <div className='mt-5'>
          <PfData />
        </div>
    </div>
  )
}

export default Financial