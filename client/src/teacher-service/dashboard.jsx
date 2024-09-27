import React from 'react'
import NavBar from './components/navbar.jsx'
import { Toaster } from 'react-hot-toast'
import AuthT from '../hooks/tauth.jsx'
import './teacher-service.css'

const TeacherDashboard = () => {
  return (
    <AuthT>
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        Teacher Dashboard
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default TeacherDashboard