import React from 'react'
import AuthT from '../../hooks/tauth'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/navbar'
import ProTabs from '../components/profileTas/protabs'

const UserProfile = () => {
  return (
    <AuthT>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <NavBar />
          <div className="dashboard">
            <div className="settingContainer mt-0">
              <div className="settingContent">
                <div className="student_container">
                    <ProTabs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthT>
  )
}

export default UserProfile