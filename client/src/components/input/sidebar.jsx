import React, { useState, useEffect } from "react";
import {
  File,
  GraduationCap,
  House,
  User,
  CalendarDays,
  LayoutDashboard,
  CreditCard,
  FolderSearch,
  PowerIcon,
} from "lucide-react";
import api from "../../services/apiServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../logo.png";
import toast from "react-hot-toast";

// Sidebar wrapper (renamed from Sidebar to avoid shadowing)
const SidebarWrapper = ({ children, className }) => (
  <aside
    className={`fixed left-0 top-0 w-64 h-screen bg-white border-r flex flex-col z-50 transition-transform duration-300 ${className}`}
    style={{ minHeight: "100vh" }}
  >
    {children}
  </aside>
);

const Sidebar = ({ open, onClose }) => {
  const [role, setRole] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [school, setSchool] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await api.Logout();
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const schoolRes = await api.Verify();
        if (schoolRes.data.success) {
          setRole("admin");
          return;
        }
      } catch (err) {
        console.error("Admin verification error:", err);
      }

      try {
        const userRes = await api.tVerify();
        const user = userRes?.data?.teacher;
        const normalizedRole = user?.role
          ? user.role.toLowerCase()
          : "";
        setRole(normalizedRole);
      } catch (err) {
        console.error("User verification error:", err);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await api.getSchool();
        const data = res.data.details;
        setSchool(data.name);
        if (data.logo) setLogoFile(data.logo);
      } catch (err) {
        console.error("School fetch error:", err);
      }
    };

    fetchSchool();
  }, []);

  const navLinks = {
    admin: [
      { path: "/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/administrator", icon: <House size={23} />, label: "Dashboard", active: true },
      { path: "/teachers", icon: <User size={23} />, label: "Teachers" },
      { path: "/admin-report", icon: <FolderSearch size={23} />, label: "Report" },
      { path: "/events", icon: <CalendarDays size={23} />, label: "Events" },
      { path: "/expenses", icon: <CreditCard size={23} />, label: "Expenses" },
    ],
    teacher: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/entry", icon: <File size={23} />, label: "Entry", active: true },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
    ],
    bursar: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/bursar/dashboard", icon: <LayoutDashboard size={23} />, label: "Dashboard", active: true },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/attendance", icon: <CalendarDays size={23} />, label: "Attendance" },
      { path: "/bursar/expenses", icon: <CreditCard size={23} />, label: "Expenses" },
    ], 
    hoa: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/hoa/dashboard", icon: <House size={23} />, label: "Dashboard", active: true },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/attendance", icon: <CalendarDays size={23} />, label: "Attendance" },
      { path: "/report", icon: <FolderSearch size={23} />, label: "Report" },
    ],
    hod: [
      { path: "/bursar/profile", icon: <User size={23} />, label: "Profile" },
      { path: "/hod/dashboard", icon: <House size={23} />, label: "Dashboard", active: true },
      { path: "/entry", icon: <File size={23} />, label: "Entry" },
      { path: "/tstudents", icon: <GraduationCap size={23} />, label: "Students" },
      { path: "/attendance", icon: <CalendarDays size={23} />, label: "Attendance" },
      { path: "/report", icon: <FolderSearch size={23} />, label: "Report" },
    ],
  };

  return (
    <SidebarWrapper className={`${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex flex-col h-full relative">
        {/* Header */}
        <div className="flex items-center space-x-2 px-4 py-3 border-b-2 border-gray-300">
          <div className="flex-shrink-0">
            <img
              src={logoFile || Logo}
              alt="Logo"
              className="h-10 w-10 mx-auto"
            />
          </div>
          <div className="border-l-2 border-gray-300 pl-3 ml-3">
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {school || "XoolHub"}
            </h2>
            <p className="text-sm text-gray-600">
              Welcome, {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          className="absolute top-1 right-1 px-2 py-4 rounded hover:bg-gray-100 focus:outline-none shadow-md border-2 border-gray-300"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <span className="block w-5 h-0.5 bg-gray-700 rotate-45 absolute"></span>
          <span className="block w-5 h-0.5 bg-gray-700 -rotate-45"></span>
        </button>

        {/* Navigation */}
        <ul className="flex-1 overflow-y-auto">
          {navLinks[role]?.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <Link to={link.path} key={idx}>
                <li
                  className={`space-x-3 px-4 py-3 hover:bg-gray-100 transition duration-600 border-b border-gray-200 flex items-center gap-2 font-medium ${
                    isActive ? "border-l-2 border-blue-600 font-semibold text-blue-600" : ""
                  }`}
                >
                  <span className="h-4 w-4 flex-shrink-0 -mt-1">{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                </li>
              </Link>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200">
          <button
            onClick={handleLogOut}
            className="flex items-center space-x-2 text-red-700 hover:text-red-800 transition duration-300"
          >
            <PowerIcon size={23} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;