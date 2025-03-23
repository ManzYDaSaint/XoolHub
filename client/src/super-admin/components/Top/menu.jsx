import React from "react";
import Searchbar from "../../../components/input/searchbar";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import Logo from "../../../logo.png";

const Menu = () => {
  return (
    <div className="navbarContainer">
      <div className="searchBar">
        <Searchbar icon={"search"} type={"text"} placeholder={"Type here..."} />
      </div>
      <div className="topRight">
        <div className="notify">
          <Link to={"/notifications"}>
            <Bell size={23} className={"noteIcon"} />{" "}
          </Link>
        </div>
        <div className="profileContainer">
          <Link to={"/suprofile"}>
            <img src={Logo} alt="logo" className="profilePicture" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
