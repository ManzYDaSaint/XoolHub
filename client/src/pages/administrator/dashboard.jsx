import React from 'react'
import Sidebar from '../../components/input/sidebar'
import './dashboard.css'
import Navbar from '../../components/input/top'
import { Toaster } from 'react-hot-toast'

const Dashboard = () => {
  return (
    <div className='dashboard__container'>
      <Toaster />
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