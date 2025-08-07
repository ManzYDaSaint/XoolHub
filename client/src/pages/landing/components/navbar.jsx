import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../logo.png";
import { Menu, X } from "lucide-react";
import api from "../../../services/apiServices";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavClick = (e, to) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false); // close mobile menu if open
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

  // Menu items
  const navLinks = [
    { to: "/about", label: "About" },
    { to: "#features", label: "Features" },
    { to: "#testimonials", label: "Testimonials" },
    { to: "#pricing", label: "Pricing" },
  ];

  return (
    <nav className="bg-white/60 backdrop-blur-md shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <h2 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
              XoolHub
            </h2>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`text-gray-700 hover:text-blue-700 transition text-md ${
                  location.pathname === link.to ? "font-bold text-blue-700" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <li>
              <Link
                to="/administrator"
                className={`bg-gradient-to-r from-blue-700 to-purple-500 rounded-full px-6 py-2 text-white ${
                  location.pathname === "/administrator"
                    ? "font-bold text-blue-600"
                    : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <div className="flex items-center space-x-6">
              <li>
                <Link
                  to="/login"
                  className={`text-gray-700 hover:text-blue-600 transition ${
                    location.pathname === "/login"
                      ? "font-bold text-blue-600"
                      : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`bg-gradient-to-r from-blue-700 to-purple-500 rounded-full px-6 py-2 text-white ${
                    location.pathname === "/register"
                      ? "font-bold text-blue-600"
                      : ""
                  }`}
                >
                  Start Free Trial
                </Link>
              </li>
            </div>
          )}
        </ul>

        {/* Hamburger Button */}
        <div className="flex md:hidden">
          {isLoggedIn ? (
            <li className="list-none block">
              <Link
                to="/administrator"
                className={`bg-gradient-to-r from-blue-700 to-purple-500 rounded-full px-6 py-2 text-white ${
                  location.pathname === "/administrator"
                    ? "font-bold text-blue-600"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <li className="list-none block">
              <Link
                to="/login"
                className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition ${
                  location.pathname === "/login"
                    ? "font-bold text-blue-600"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
          <button
            className="flex items-center text-gray-700"
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-16 z-30">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition ${
                    location.pathname === link.to
                      ? "font-bold text-blue-600"
                      : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
