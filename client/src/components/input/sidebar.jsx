import React, { useState, useEffect } from "react";
import Logo from "../../logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../../services/apiServices";
import { CalendarFold, ChartPie, Cog, DollarSign, File, GraduationCap, House, MessagesSquare, User } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(true);
  const [logoFile, setLogoFile] = useState(null);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  const fetchData = async () => {
    try {
      const res = await api.getSchool();
      const data = res.data.details;

      // If the logo is retrieved as a URL, display it
      if (data.logo) {
        setLogoFile(data.logo); // URL to show the image
      }
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  return (
    <div className={closeMenu === false ? "sidebarMenu" : "sidebarMenu active"}>
      <div className="logoContainer">
        {logoFile ? (
          <img src={logoFile} alt="Logo Preview" className="schoolLogo" />
        ) : (
          <img src={Logo} alt="logo" className="schoolLogo" />
        )}
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
        <Link to={"/attendance"} className="Links">
          <li
            className={
              location.pathname === "/attendance" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><ChartPie size={23} /></p>
            <p className="actualP">Attendance</p>
          </li>
        </Link>
        <Link to={"/events"} className="Links">
          <li
            className={
              location.pathname === "/events" ? "sideItem active" : "sideItem"
            }
          >
            <p className="sideIcons"><CalendarFold size={23} /></p>
            <p className="actualP">Events</p>
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
        <Link to={"/communication"} className="Links">
          <li
            className={
              location.pathname === "/communication"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><MessagesSquare size={23} /></p>
            <p className="actualP">Communication</p>
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
