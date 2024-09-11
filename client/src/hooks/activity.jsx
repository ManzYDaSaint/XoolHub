import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/apiServices.jsx'

const InactivityHandler = ({ children }) => {
  const navigate = useNavigate();
  let logoutTimer;

  const resetTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);

    // Set the logout timer for 30 minutes (1800000 milliseconds)
    logoutTimer = setTimeout(() => {
      handleLogout();
    }, 1800000);
  };

  const handleLogout = async () => {
    try {
      await api.Logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  useEffect(() => {
    // Listen for user activity
    window.addEventListener('mousemove', resetTimer);

    // Start the timer initially
    resetTimer();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', resetTimer);

      if (logoutTimer) clearTimeout(logoutTimer);
    }; // eslint-disable-next-line
  }, []); 

  return <>{children}</>;
};

export default InactivityHandler;
