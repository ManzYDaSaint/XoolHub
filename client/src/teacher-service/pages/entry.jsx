import React from 'react'
import AuthT from '../../hooks/tauth'
import NavBar from '../components/navbar' 
import { Toaster } from 'react-hot-toast'
import EntryData from '../data/entryData'

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
                        <EntryData />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </AuthT>
  )
}

export default Entry