import React from 'react'
import Auth0 from '../../hooks/auth'
import { Toaster } from 'react-hot-toast'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import Tabs from './components/tabs'

const Config = () => {

  return (
    <Auth0>
    <div className='dashboard__container'>
      <Toaster />
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <div className="settingContainer">
            <Tabs />
          </div>
        </div>
      </div>
    </div>
    </Auth0>
  )
}

export default Config