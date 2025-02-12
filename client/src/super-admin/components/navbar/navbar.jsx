import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CircleDollarSign, Cog, House, LayoutGrid, MessageSquareDiff } from "lucide-react";

const SuperSidebar = () => {
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
        <Link to={"/super"} className="Links">
          <li
            className={
              location.pathname === "/super"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><House size={23} /></p>
            <p className="actualP">Dashboard</p>
          </li>
        </Link>
        <Link to={"/schools"} className="Links">
          <li
            className={
              location.pathname === "/schools"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><LayoutGrid size={23} /></p>
            <p className="actualP">Schools</p>
          </li>
        </Link>
        <Link to={"/subscriptions"} className="Links">
          <li
            className={
              location.pathname === "/subscriptions"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><CircleDollarSign size={23} /></p>
            <p className="actualP">Subscriptions</p>
          </li>
        </Link>
        <Link to={"/feeds"} className="Links">
          <li
            className={
              location.pathname === "/feeds"
                ? "sideItem active"
                : "sideItem"
            }
          >
            <p className="sideIcons"><MessageSquareDiff size={23} /></p>
            <p className="actualP">Feedback</p>
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

export default SuperSidebar;
