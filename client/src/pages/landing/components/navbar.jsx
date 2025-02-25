import React, { useState, useEffect } from 'react';
import '../front.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from '../../../services/apiServices';
import logo from '../../../logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [closeMenu, setCloseMenu] = useState(true);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to your authentication endpoint
        const response = await api.Verify();
        if (response.data.success === true) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="navbar-body">
      <nav className="navbar">
        <div className={closeMenu === false ? "navbar-container active" : "navbar-container"}>
          <div className="navbar-left">
            <Link to="/" className="all_links">
              <img
                src={logo}
                alt="logo"
                className={location.pathname === '/' ? 'logo active' : 'logo'}
              />
            </Link>
          </div>
          {/* Hamburger Menu Button */}
          <div className="burgerT" onClick={handleCloseMenu}></div>
            <div className="burgerM"></div>
          <ul className={`navbar-right ${closeMenu ? 'active' : ''}`}>
            <Link to="/about" className="all_links">
              <li className={location.pathname === '/about' ? 'active' : ''}>About</li>
            </Link>
            <Link to="/faq" className="all_links">
              <li className={location.pathname === '/faq' ? 'active' : ''}>FAQ</li>
            </Link>
            <Link to="/blog" className="all_links">
              <li className={location.pathname === '/blog' ? 'active' : ''}>Blog</li>
            </Link>
            <Link to="/contact" className="all_links mr-5">
              <li className={location.pathname === '/contact' ? 'active' : ''}>Contact</li>
            </Link>
            {isLoggedIn ? (
              <Link to="/administrator" className="all_links mr-5 dashbtn">
                <li className={location.pathname === '/administrator' ? 'active' : ''}>Dashboard</li>
              </Link>
            ) : (
              <>
                <Link to="/login" className="all_links ml-5 mr-5 dashbtn px-5 bg-blue-600">
                  <li className={location.pathname === '/login' ? 'active' : ''}>Login</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
