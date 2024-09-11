import React from 'react'
import Sidebar from '../../components/input/sidebar'
import './dashboard.css'
import Navbar from '../../components/input/top.jsx'
import Tabs from '../../components/tabs.jsx'
import { Toaster } from 'react-hot-toast'
import Auth0 from '../../hooks/auth.jsx'

const Setting = () => {
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
              <h4>SETTINGS</h4>
            </div>
              <Tabs />
          </div>
        </div>
      </div>
    </div>
    </Auth0>
  )
}

export default Setting