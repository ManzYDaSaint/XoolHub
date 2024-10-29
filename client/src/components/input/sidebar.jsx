import React, { useState, useEffect } from 'react'
import Logo from '../../logo.png'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import api from '../../services/apiServices'

const Sidebar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(true)
  const [logoFile, setLogoFile] = useState(null);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  }

  const fetchData = async () => {
    try {
        const res = await api.getSchool();
        const data = res.data.details;

        // If the logo is retrieved as a URL, display it
        if (data.logo) {
            setLogoFile(data.logo); // URL to show the image
        }
    } catch (error) {
        console.error('Error fetching individual:', error);
    }
  };

  useEffect(() => {
      fetchData(); // eslint-disable-next-line
  }, []);

  return (
    <div className={closeMenu === false ? "sidebarMenu" : "sidebarMenu active"}>
      <div className="logoContainer">
        {logoFile ? (
            <img 
            src={logoFile} 
            alt="Logo Preview" 
            className='schoolLogo' />
        ) : (
            <img src={Logo} alt="logo" className='schoolLogo' />
        )}
      </div>
      <div className="burgerTrigger" onClick={handleCloseMenu}></div>
      <div className="burgerMenu"></div>
      <ul>
      <Link to={'/administrator'} className='Links'>
          <li className={location.pathname === "/administrator" ? "sideItem active" : "sideItem"}>
            <Icon name='home' className='sideIcons' />
            <p>Dashboard</p>
          </li>
        </Link>
      <Link to={'/student'} className='Links'>
          <li className={location.pathname === "/student" ? "sideItem active" : "sideItem"}>
            <Icon name='student' className='sideIcons' />
            <p>Students</p>
          </li>
        </Link>
        <Link to={'/teachers'} className='Links'>
          <li className={location.pathname === "/teachers" ? "sideItem active" : "sideItem"}>
            <Icon name='male' className='sideIcons' />
            <p>Teachers</p>
          </li>
        </Link>
        <Link to={'/fees'} className='Links'>
          <li className={location.pathname === "/fees" ? "sideItem active" : "sideItem"}>
            <Icon name='money bill alternate' className='sideIcons' />
            <p>Fees</p>
          </li>
        </Link>
        <Link to={'/report'} className='Links'>
          <li className={location.pathname === "/report" ? "sideItem active" : "sideItem"}>
            <Icon name='file alternate' className='sideIcons' />
            <p>Report</p>
          </li>
        </Link>
        <Link to={'/general'} className='Links'>
          <li className={location.pathname === "/general" ? "sideItem active" : "sideItem"}>
            <Icon name='chart bar' className='sideIcons' />
            <p>General</p>
          </li>
        </Link>
        <Link to={'/setting'} className='Links'>
          <li className={location.pathname === "/setting" ? "sideItem active" : "sideItem"}>
            <Icon name='settings' className='sideIcons' />
            <p>Settings</p>
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default Sidebar