import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DollarSign, BookOpenCheck, House, CalendarDays } from "lucide-react";
import './index.css';

const ParentNavBar = () => {
  const location = useLocation();

  return (
    <div className={"pNavBar"}>
      <ul>
        <Link to={"/parent"} className="Links">
          <li
            className={
              location.pathname === "/parent"
                ? "pItem active"
                : "pItem"
            }
          >
            <p className="paIcons"><House size={23} /></p>
          </li>
        </Link>
        <Link to={"/parent-academic"} className="Links">
          <li
            className={
              location.pathname === "/parent-academic" ? "pItem active" : "pItem"
            }
          >
            <p className="paIcons"><BookOpenCheck size={23} /></p>
          </li>
        </Link>
        <Link to={"/parent-fees"} className="Links">
          <li
            className={
              location.pathname === "/parent-fees" ? "pItem active" : "pItem"
            }
          >
            <p className="paIcons"><DollarSign size={23} /></p>
          </li>
        </Link>
        <Link to={"/parent-events"} className="Links">
          <li
            className={
              location.pathname === "/parent-events" ? "pItem active" : "pItem"
            }
          >
            <p className="paIcons"><CalendarDays size={23} /></p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default ParentNavBar;
