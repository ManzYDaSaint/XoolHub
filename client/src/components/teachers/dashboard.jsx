import React from 'react'
import Auth0 from '../../hooks/auth'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import TeacherTabs from '../../components/teachers/add/teachers.jsx'

const TeacherDashboard = () => {
  return (
    <Auth0>
    <div className='dashboard__container'>
      <Toaster />
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <div className="settingContainer">
            <div className="headerTitle">
              <h4>TEACHER DASHBOARD</h4>
            </div>
            <TeacherTabs />
          </div>
        </div>
      </div>
    </div>
    </Auth0>
  )
}

export default TeacherDashboard