import React, { useState } from 'react'
import Logo from '../../logo.png'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(true)

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  }

  return (
    <div className={closeMenu === false ? "sidebarMenu" : "sidebarMenu active"}>
      <div className="logoContainer">
        <img src={Logo} alt="logo" className='schoolLogo' />
      </div>
      <div className="burgerTrigger" onClick={handleCloseMenu}></div>
      <div className="burgerMenu"></div>
      <ul>
      <Link to={'/tdashboard'} className='Links'>
          <li className={location.pathname === "/tdashboard" ? "sideItem active" : "sideItem"}>
            <Icon name='home' className='sideIcons' />
            <p>Dashboard</p>
          </li>
        </Link>
      <Link to={'/tstudent'} className='Links'>
          <li className={location.pathname === "/tstudent" ? "sideItem active" : "sideItem"}>
            <Icon name='student' className='sideIcons' />
            <p>Students</p>
          </li>
        </Link>
        <Link to={'/entry'} className='Links'>
          <li className={location.pathname === "/entry" ? "sideItem active" : "sideItem"}>
            <Icon name='edit' className='sideIcons' />
            <p>Entry</p>
          </li>
        </Link>
        <Link to={'/reports'} className='Links'>
          <li className={location.pathname === "/reports" ? "sideItem active" : "sideItem"}>
            <Icon name='file alternate' className='sideIcons' />
            <p>Reports</p>
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default NavBar