import React from 'react'
import Sidebar from '../../components/input/sidebar'
import './dashboard.css'
import Navbar from '../../components/input/top'

const Dashboard = () => {
  return (
    <div className='dashboard__container'>
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          Dashboard
        </div>
      </div>
    </div>
  )
}

export default Dashboard