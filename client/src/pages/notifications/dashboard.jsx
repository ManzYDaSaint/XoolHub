import React from 'react'
import Auth0 from '../../hooks/auth'
import Sidebar from '../../components/input/sidebar'
import Navbar from '../../components/input/top'
import Messages from './notification'

const Notifications = () => {
  return (
    <Auth0>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <Navbar />
            <Messages />
          </div>
        </div>
      </div>
    </Auth0>
  )
}

export default Notifications