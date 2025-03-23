import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DollarSign, File, GraduationCap, House, User, CalendarDays, LayoutDashboard, CreditCard } from "lucide-react";
import api from "../../services/apiServices";

const Sidebar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(true);
  const [role, setRole] = useState("");

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Check if the user is an Admin from the school table
        const schoolRes = await api.Verify();
        if (schoolRes.data.success === true) {
          setRole("admin");
          return;
        }
      } catch (error) {
        console.error("Admin authentication error:", error);
      }

      try {
        // If not an admin, check user role from users table
        const userRes = await api.tVerify();
        const user = userRes.data.teacher;
        setRole(user.role);
      } catch (error) {
        console.error("User authentication error:", error);
      }
    };

    checkUserRole();
  }, []);

  // Role-based navigation
  const navLinks = {
    admin: [
      { path: "/administrator", icon: <House size={23} />, label: "Dashboard" },
      { path: "/students", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/teachers", icon: <User size={23} />, label: "Teachers" },
      { path: "/fees", icon: <DollarSign size={23} />, label: "Fees" },
      { path: "/report", icon: <File size={23} />, label: "Report" },
      { path: "/events", icon: <CalendarDays size={23} />, label: "Events" },
    ],
    Teacher: [
      { path: "/dashboard", icon: <House size={23} />, label: "Dashboard" },
      { path: "/students", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/report", icon: <File size={23} />, label: "Report" },
    ],
    Bursar: [
      { path: "/bursar", icon: <LayoutDashboard size={23} />, label: "Dashboard" },
      { path: "/expenses", icon: <CreditCard size={23} />, label: "Expenses" },
      { path: "/report", icon: <File size={23} />, label: "Reports" },
    ],
    Hoa: [
      { path: "/dashboard", icon: <House size={23} />, label: "Dashboard" },
      { path: "/students", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/teachers", icon: <User size={23} />, label: "Teachers" },
      { path: "/report", icon: <File size={23} />, label: "Report" },
    ],
    Hod: [
      { path: "/dashboard", icon: <House size={23} />, label: "Dashboard" },
      { path: "/students", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/teachers", icon: <User size={23} />, label: "Teachers" },
      { path: "/report", icon: <File size={23} />, label: "Report" },
    ],
    student: [
      { path: "/dashboard", icon: <House size={23} />, label: "Dashboard" },
      { path: "/events", icon: <CalendarDays size={23} />, label: "Events" },
    ],
  };

  return (
    <div className={closeMenu ? "sidebarMenu active" : "sidebarMenu"}>
      <div className="logoContainer"></div>
      <div className="burgerTrigger" onClick={handleCloseMenu}></div>
      <div className="burgerMenu"></div>
      <ul>
        {navLinks[role]?.map((link, index) => (
          <Link to={link.path} key={index} className="Links">
            <li className={location.pathname === link.path ? "sideItem active" : "sideItem"}>
              <p className="sideIcons">{link.icon}</p>
              <p className="actualP">{link.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
