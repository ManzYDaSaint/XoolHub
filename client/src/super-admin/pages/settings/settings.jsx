import React from 'react'
import Tabs from './components/tabs.jsx'
import { Toaster } from 'react-hot-toast'
import SuperAuth0 from '../../../hooks/superauth.jsx'
import SuperSidebar from '../../components/navbar/navbar.jsx'
import Menu from '../../components/Top/menu.jsx'

const Setting = () => {
  return (
    <SuperAuth0>
    <div className='dashboard__container'>
      <Toaster />
      <div className="dashboard__content">
        <SuperSidebar />
        <div className="dashboard">
          <Menu />
          <div className="settingContainer">
              <Tabs />
          </div>
        </div>
      </div>
    </div>
    </SuperAuth0>
  )
}

export default Setting