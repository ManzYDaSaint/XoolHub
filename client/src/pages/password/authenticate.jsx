import React, { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/apiServices";
import logo from "../../logo.png";

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
    <div className="flex justify-center items-center h-screen w-screen space-y-4 bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 md:bg-none">
        <Toaster />
        <div className="bg-none md:bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 text-white px-6 py-5 text-center rounded-lg w-[400px]">
          <Link to={"/"}>
                    <p className="inline-flex my-6 md:my-7 px-1 md:px-1 py-2 bg-white rounded-lg md:rounded-xl border-0 md:border-4 border-blue-600">
                      <img src={logo} alt="logo" className="h-6 md:h-10" />
                    </p>
                  </Link>
          <div className="body">
            <div className="dotted">
              <h1 className="text-md md:text-xl font-bold text-center mb-4 text-gray-100">Authenticate Your Account</h1>
              <div className="dot"></div>
            </div>
            <p className="text-sm md:text-md text-gray-300 mt-3">
              Protecting your tickets is our priority. Please confirm your
               account by entering the authorization code sent to {" "} <br />
              <strong>{email}</strong>
            </p>
            <form onSubmit={handleSubmit} className="mt-5 w-full" autoComplete="off">
              <div className="codeBase">
                <div id="hols" className={`one_field ${activeInputId === "5" ? "active" : ""}`}>
                  <div id="hola" className="flex justify-between items-center gap-2">
                    {inputs.map((input, index) => (
                      <input
                        key={index}
                        type="text"
                        value={input}
                        maxLength="1"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-12 h-12 text-2xl text-gray-700 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) => handleChange(index, event)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                  Verify
                </button>
              <div className="mt-5 gap-5">
                <p className="mt-1 text-sm md:text-md text-gray-300">
                  Check the Spam folder if you can't find it. <br /> Haven't received it?{" "}
                  <span className="text-blue-600 cursor-pointer" onClick={handleResendCode}>{isResending ? "Resending..." : "Resend a new code"}</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Authenticate;