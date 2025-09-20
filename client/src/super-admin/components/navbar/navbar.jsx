import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  School, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  User, 
  Bell, 
  Menu,
  X,
  ChevronDown,
  LogOut,
  Shield,
  Star
} from "lucide-react";

const SuperSidebar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      path: "/super",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      path: "/schools",
      label: "Schools",
      icon: School,
      badge: null
    },
    {
      path: "/subscriptions",
      label: "Subscriptions",
      icon: CreditCard,
      badge: "New"
    },
    {
      path: "/feeds",
      label: "Feedback",
      icon: MessageSquare,
      badge: notifications > 0 ? notifications : null
    },
    {
      path: "/pilot-program-dashboard",
      label: "Pilot Program",
      icon: Star,
      badge: "Hot"
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' 
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  XoolHub
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      active
                        ? isScrolled
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-white/20 text-white shadow-lg'
                        : isScrolled
                          ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${
                      active ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Badge */}
                    {item.badge && (
                      <span className={`absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold rounded-full ${
                        isScrolled
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-red-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    
                    {/* active indicator */}
                    {active && (
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        isScrolled ? 'bg-white' : 'bg-white'
                      }`} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">

              {/* Notifications */}
              <button className={`relative p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-blue-600' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}>
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block font-medium">Admin</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/suprofile"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/setting"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      active
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                        active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default SuperSidebar;
