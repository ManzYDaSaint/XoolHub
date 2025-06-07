import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { File, GraduationCap, House, User, CalendarDays, LayoutDashboard, CreditCard, FolderSearch } from "lucide-react";
import api from "../../services/apiServices";
import { Link } from "react-router-dom";

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
      { path: "/teachers", icon: <User size={23} />, label: "Teachers" },
      { path: "/admin-report", icon: <FolderSearch size={23} />, label: "Report" },
      { path: "/events", icon: <CalendarDays size={23} />, label: "Events" },
      { path: "/expenses", icon: <CreditCard size={23} />, label: "Expenses" },
    ],
    Teacher: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
    ],
    Bursar: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/bursar/dashboard", icon: <LayoutDashboard size={23} />, label: "Dashboard" },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/bursar/expenses", icon: <CreditCard size={23} />, label: "Expenses" },
    ],
    Hoa: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/hoa/dashboard", icon: <House size={23} />, label: "Dashboard" },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/report", icon: <FolderSearch size={23} />, label: "Report" },
    ],
    Hod: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/hod/dashboard", icon: <House size={23} />, label: "Dashboard" },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/report", icon: <FolderSearch size={23} />, label: "Report" },
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
