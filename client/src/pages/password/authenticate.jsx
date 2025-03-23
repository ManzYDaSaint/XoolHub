import React, { useState, useRef } from "react";
import Shield from "./assets/auth.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/apiServices";

const Authenticate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [activeInputId, setActiveInputId] = useState(null);
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const inputRefs = useRef(Array(6).fill(null)); // Array of refs for focusing
  const [isResending, setIsResending] = useState(false); // Resend button state

  const handleChange = (index, event) => {
    const newValue = event.target.value.slice(0, 1); // Get only the first character
    if (!isNaN(newValue)) {
      const updatedInputs = [...inputs]; // Create a copy of the state
      updatedInputs[index] = newValue; // Update the specific input

      setInputs(updatedInputs);

      // Focus the next input (if it exists and not the last one)
      if (index < inputs.length - 1) {
        inputRefs.current[index + 1].focus(); // Focus using ref
      }
    }
  };

  const handleFocus = (event) => {
    setActiveInputId(event.target.id);
  };

  const handleBlur = () => {
    setActiveInputId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpCode = inputs.join(""); // Combine the inputs into a single OTP string

    if (otpCode.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      const res = await api.VerifyOTP({email, otp: otpCode});
      if (res.data.success === true) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(res.data.message);
        setInputs(Array(6).fill(""));
        inputRefs.current[0]?.focus(); // Move focus to first input
      }

    } catch (error) {
      console.error("Error verifying OTP:", error);
      setInputs(Array(6).fill(""));
      inputRefs.current[0]?.focus(); // Move focus to first input
    }
  };

  // Resend Code
  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const res = await api.ResendOTP({email});
      if (res.data.success === true) {
        toast.success(res.data.message);
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
    setIsResending(false);
  };

  return (
    <div className="notFound">
      <Toaster />
      <div className="logContainer">
        <div className="logSider">
          <div className="header">
            <img src={Shield} alt="My" className="pass__master__icon" />
          </div>
          <div className="body">
            <div className="dotted">
              <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">Authenticate Your Account</h1>
              <div className="dot"></div>
            </div>
            <p>
              Protecting your tickets is our priority. Please confirm your{" "}
              <br /> account by entering the authorization code sent to{" "}
              <br />
              <strong>{email}</strong>
            </p>
            <form onSubmit={handleSubmit} className="custom_form mt-5" autoComplete="off">
              <div className="codeBase">
                <div id="hols" className={`one_field ${activeInputId === "5" ? "active" : ""}`}>
                  <div id="hola" className="input_right">
                    {inputs.map((input, index) => (
                      <input
                        key={index}
                        type="text"
                        value={input}
                        maxLength="1"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="auth_code"
                        onChange={(event) => handleChange(index, event)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-5">
                <p className="mt-3">
                  It may take a minute to receive your code. <br /> Haven't received it?{" "}
                  <span className="text-blue-600 cursor-pointer" onClick={handleResendCode}>{isResending ? "Resending..." : "Resend a new code"}</span>
                </p>
                <button type="submit" className="form_button" id="resetBtn">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;