import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../logo.png";
import { Menu, X, Sparkles } from "lucide-react";
import api from "../../../services/apiServices";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavClick = (e, to) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.Verify();
        if (response.data.success === true) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items
  const navLinks = [
    { to: "/about", label: "About" },
    { to: "#features", label: "Features" },
    { to: "#testimonials", label: "Testimonials" },
    { to: "#pricing", label: "Pricing" },
  ];

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20" 
          : "bg-white/80 backdrop-blur-md shadow-lg"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img src={logo} alt="XoolHub Logo" className="h-10 w-auto" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h2 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                XoolHub
              </h2>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className={`relative transition-all duration-300 text-md font-medium group ${
                    link.highlight 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:scale-105" 
                      : `text-gray-700 hover:text-blue-700 ${location.pathname === link.to ? "text-blue-700 font-semibold" : ""}`
                  }`}
                >
                  {link.highlight && <Sparkles className="inline h-4 w-4 mr-1" />}
                  {link.label}
                  {!link.highlight && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  to="/administrator"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/pilot-program"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Pilot Program</span>
                </Link> 
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {isLoggedIn ? (
              <Link
                to="/administrator"
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-4 py-2 text-white text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
            
            <motion.button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              onClick={handleToggleMenu}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} className="text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} className="text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="lg:hidden bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      link.highlight 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg" 
                        : `text-gray-700 hover:text-blue-600 hover:bg-blue-50 ${location.pathname === link.to ? "text-blue-600 bg-blue-50" : ""}`
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.highlight && <Sparkles className="inline h-4 w-4 mr-2" />}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {!isLoggedIn && (
                <motion.div
                  className="pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Link
                    to="/pilot-program"
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Pilot Program
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
