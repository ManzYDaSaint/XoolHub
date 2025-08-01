import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import api from '../services/apiServices';

function SuperAuth0({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual authentication logic
    const checkAuthentication = async () => {
      try {
        // Make a request to your authentication endpoint
        const response = await api.superVerify();
        if (response.data.success === true) {
          setIsAuthenticated(true);
        }
        else {
          <Navigate to={'/login'} />
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <InfinitySpin width='200' color="#007BFE" />
            </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }
  return children;
}

export default SuperAuth0;