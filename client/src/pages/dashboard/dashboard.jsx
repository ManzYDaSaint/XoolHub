import React from 'react'
import Welcome from '../../teacher-service/components/welcome'
import MasterCards from './components/master-cards'

const AdminDashboard = () => {
  return (
    <div className='master_container'>
        <Welcome />
        <div className="master_cards mt-4">
            <MasterCards />
        </div>
    </div>
  )
}

export default AdminDashboard