import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Cog, DollarSign, File, GraduationCap, House, User } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(true);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={closeMenu === false ? "sidebarMenu" : "sidebarMenu active"}>
      <div className="logoContainer">

      </div>
      <div className="burgerTrigger" onClick={handleCloseMenu}></div>
      <div className="burgerMenu"></div>
      <ul>
        <Link to={"/administrator"} className="Links">
          <li
            className={
              location.pathname === "/administrator"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><House size={23} /></p>
            <p className="actualP">Dashboard</p>
          </li>
        </Link>
        <Link to={"/student"} className="Links">
          <li
            className={
              location.pathname === "/student" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><GraduationCap size={23} /></p>
            <p className="actualP">Students</p>
          </li>
        </Link>
        <Link to={"/teachers"} className="Links">
          <li
            className={
              location.pathname === "/teachers" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><User size={23} /></p>
            <p className="actualP">Teachers</p>
          </li>
        </Link>
        <Link to={"/fees"} className="Links">
          <li
            className={
              location.pathname === "/fees" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><DollarSign size={23} /></p>
            <p className="actualP">Fees</p>
          </li>
        </Link>
        <Link to={"/report"} className="Links">
          <li
            className={
              location.pathname === "/report" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><File size={23} /></p>
            <p className="actualP">Report</p>
          </li>
        </Link>
        <Link to={"/setting"} className="Links">
          <li
            className={
              location.pathname === "/setting" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><Cog size={23} /></p>
            <p className="actualP">Settings</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
