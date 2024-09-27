import React from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/navbar'
import AuthT from '../../hooks/tauth'

const TStudent = () => {
  return (
    <AuthT>
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        Students
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default TStudent