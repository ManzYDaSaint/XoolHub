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
  ShieldCheck,
} from "lucide-react";
import api from "../../services/apiServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../logo.png";
import toast from "react-hot-toast";
import logger from "../../utils/logger";

// Sidebar wrapper (renamed from Sidebar to avoid shadowing)
const SidebarWrapper = ({ children, className }) => (
  <aside
    className={`fixed left-0 top-0 w-72 h-screen bg-white/95 backdrop-blur-xl border-r border-gray-200/50 flex flex-col z-50 transition-all duration-300 ease-in-out shadow-2xl ${className}`}
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
      logger.apiError("logout", err);
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
        logger.apiError("admin verification", err);
      }

      try {
        const userRes = await api.tVerify();
        const user = userRes?.data?.teacher;
        const normalizedRole = user?.role
          ? user.role.toLowerCase()
          : "";
        setRole(normalizedRole);
      } catch (err) {
        logger.apiError("user verification", err);
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
        logger.apiError("school fetch", err);
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
      { path: "/attendance", icon: <CalendarDays size={23} />, label: "Attendance" },
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
      { path: "/disciplinary", icon: <ShieldCheck size={23} />, label: "Disciplinary" },
    ],
  };

  return (
    <SidebarWrapper className={`${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex flex-col h-full relative">
        {/* Header */}
        <div className="flex items-center space-x-3 px-6 py-6 border-b border-gray-100/50 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-sm opacity-20"></div>
            <img
              src={logoFile || Logo}
              alt="Logo"
              className="relative h-12 w-12 rounded-xl shadow-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
              {school || "XoolHub"}
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Welcome, {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 group"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <div className="relative w-5 h-5">
            <span className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 rotate-45 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group-hover:bg-gray-800 group-hover:scale-110"></span>
            <span className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 -rotate-45 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group-hover:bg-gray-800 group-hover:scale-110"></span>
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navLinks[role]?.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={idx}>
                  <Link to={link.path} className="block">
                    <div
                      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 hover:shadow-sm"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-sm opacity-30"></div>
                      )}
                      <span className={`relative z-10 transition-transform duration-200 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`}>
                        {link.icon}
                      </span>
                      <span className={`relative z-10 text-sm font-medium ${isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"}`}>
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="absolute right-3 w-2 h-2 bg-white rounded-full opacity-80"></div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
          <button
            onClick={handleLogOut}
            className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-all duration-200 font-medium"
          >
            <PowerIcon size={20} className="transition-transform duration-200 group-hover:scale-110" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;