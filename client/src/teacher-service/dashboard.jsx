import React, { useState } from 'react'
import NavBar from './components/navbar.jsx'
import { Toaster } from 'react-hot-toast'
import AuthT from '../hooks/tauth.jsx'
import './teacher-service.css'
import LogOutModal from './components/modal.jsx'
import Info from './components/info.jsx'
import Welcome from './components/welcome.jsx'
import Cards from './components/cards.jsx'

const TeacherDashboard = () => {
    const [open, setOpen] = useState(false);

  return (
    <AuthT>
        <LogOutModal open={open} setOpen={setOpen} />
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        <div className="teacherContent">
                            <div className="righter">
                                <div className="headerr">
                                    <Welcome />
                                    <Cards />
                                </div>
                            </div>
                            <div className="lefter">
                                <Info setOpen={setOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default TeacherDashboard