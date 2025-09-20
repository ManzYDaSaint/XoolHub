import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import api from "../services/apiServices";

function PAID({ children }) {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasPilotProgram, setHasPilotProgram] = useState(false);
  const [hasRedirectTo, setHasRedirectTo] = useState("");

  useEffect(() => {
    const checkPaid = async () => {
      try {
        // Make a request to your authentication endpoint
        const response = await api.checkPaidStatus();
        if (response.data.success === true) {
          setIsActivated(true);
        }
        else {
          setIsActivated(false);
          setHasPilotProgram(response.data.hasPilotProgram);
          setHasRedirectTo(response.data.redirectTo);
          if (response.data.hasPilotProgram === true) {
            setHasPilotProgram(true);
          }          
        }
      } catch (error) {
        console.error("Activation error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkPaid();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <InfinitySpin width="200" color="#007BFE" />
      </div>
    );
  } 
// console.log(hasPilotProgram, hasRedirectTo);
  if (!isActivated) {
    return <Navigate to={hasPilotProgram ? hasRedirectTo : "/pricing"} />;
  }
  return children;
}

export default PAID;