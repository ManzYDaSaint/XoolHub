import React from "react";
import { Link } from "react-router-dom";
// import { Bell } from "lucide-react";

const Navbar = () => {
  
  return (
    <div className="navbarContainer">
      <div className="topRight">
        <div className="notify">
          <Link to={"/notifications"}>
            {/* <Bell size={23} className={"text-blue-600 w-5 h-5 mr-6"} />{" "} */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
