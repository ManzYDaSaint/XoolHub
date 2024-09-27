import React from 'react'
import AuthT from '../../hooks/tauth'
import NavBar from '../components/navbar' 
import { Toaster } from 'react-hot-toast'

const Entry = () => {
  return (
    <AuthT>
        <div className='dashboard__container'>
        <Toaster />
        <div className="dashboard__content">
            <NavBar />
            <div className="dashboard">
                <div className="teacher-container">
                    <div className="settingContent">
                        Entry
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default Entry