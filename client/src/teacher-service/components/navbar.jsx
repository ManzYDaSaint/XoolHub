import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { House, GraduationCap, FilePenLine, User } from 'lucide-react'

const NavBar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(true)

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  }

  return (
    <div className={closeMenu === false ? "sidebarMenu" : "sidebarMenu active"}>
      <div className="logoContainer">

      </div>
      <div className="burgerTrigger" onClick={handleCloseMenu}></div>
      <div className="burgerMenu"></div>
      <ul>
        <Link to={"/teacher-profile"} className="Links">
          <li
            className={
              location.pathname === "/teacher-profile"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><User size={23} /></p>
            <p className="actualP">Profile</p>
          </li>
        </Link>
        <Link to={"/tdashboard"} className="Links">
          <li
            className={
              location.pathname === "/tdashboard"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><House size={23} /></p>
            <p className="actualP">Dashboard</p>
          </li>
        </Link>
        <Link to={"/tstudent"} className="Links">
          <li
            className={
              location.pathname === "/tstudent" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><GraduationCap size={23} /></p>
            <p className="actualP">Students</p>
          </li>
        </Link>
        <Link to={"/entry"} className="Links">
                  <li
                    className={
                      location.pathname === "/entry" ? "sideItem active" : "sideItem"
                    }
                  >
                    <p className="sideIcons"><FilePenLine size={23} /></p>
                    <p className="actualP">Entry</p>
                  </li>
                </Link>
      </ul>
    </div>
  )
}

export default NavBar