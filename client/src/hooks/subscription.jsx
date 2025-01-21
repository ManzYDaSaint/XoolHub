import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import api from '../services/apiServices';

function PAID({ children }) {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaid = async() => {
      try {
        // Make a request to your authentication endpoint
        const response = await api.checkPaidStatus();
        if (response.data.success === true) {
          setIsActivated(true);
        }
      } catch (error) {
        console.error('Activation error:', error);
      } finally {
        setLoading(false);
      }
    }

    checkPaid();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <InfinitySpin width='200' color="#007BFE" />
            </div>;
  }

  if(!isActivated) {
    return <Navigate to={'/pricing'} />
  }
  return children;
}

export default PAID;