import React, { useState, useEffect } from 'react';
import '../front.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from '../../../services/apiServices';

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <body className='navbar-body'>

      <nav className="navbar">
        <ul className='navbar-listing'>
          <div className="navbar-left">
            <Link to={'/'} className='all_links'>
              <h2 className={location.pathname === '/' ? 'logo active' : 'logo'}>XoolHub</h2>
            </Link>
          </div>
          <div className="navbar-right">
            <Link to={'/about'} className='all_links'>
              <li className={location.pathname === '/about' ? 'active' : ''}>About</li>
            </Link>
            <Link to={'/faq'} className='all_links'>
              <li className={location.pathname === '/faq' ? 'active' : ''}>FAQ</li>
            </Link>
            <Link to={'/blog'} className='all_links'>
              <li className={location.pathname === '/blog' ? 'active' : ''}>Blog</li>
            </Link>
            <Link to={'/contact'} className='all_links mr-5'>
              <li className={location.pathname === '/contact' ? 'active' : ''}>Contact</li>
            </Link>
            {isLoggedIn ? (
              <Link to={'/administrator'} className='all_links mr-5 dashbtn'>
                <li className={location.pathname === '/administrator' ? 'active' : ''}>Dashboard</li>
              </Link>
              ) : (
                <>
              <Link to="/login" className='all_links ml-5'>
                <li className={location.pathname === '/login' ? 'active' : ''}>Login</li>
              </Link>
              <Link to="/register" className='all_links mr-5'>
                <li className={location.pathname === '/register' ? 'active' : ''}>Sign Up</li>
              </Link>
              </>
            )}
          </div>
        </ul>
      </nav>
    </body>
  );
};

export default Navbar;
