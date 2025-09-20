import React, { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/apiServices";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, RefreshCw, Mail } from "lucide-react";

const Authenticate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Toaster />
        
        {/* Authentication Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6">
            {/* Logo Section */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              
              <motion.div
                className="flex items-center justify-center mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </motion.div>
              
              <motion.h1
                className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Verify Your Account
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                We've sent a verification code to your email
              </motion.p>
            </motion.div>

            {/* Email Display */}
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">{email}</span>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {/* OTP Input Fields */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Enter verification code</label>
                <div className="flex justify-center space-x-3">
                  {inputs.map((input, index) => (
                    <motion.input
                      key={index}
                      type="text"
                      value={input}
                      maxLength="1"
                      className={`w-12 h-12 text-2xl text-center border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                        input === index.toString()
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : input
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onChange={(event) => handleChange(index, event)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Verify Account</span>
                </div>
              </motion.button>

              {/* Resend Code */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <p className="text-sm text-gray-600 mb-3">
                  Didn't receive the code? Check your spam folder.
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>Resend Code</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Back to Login */}
              <motion.div
                className="text-center pt-4 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Login</span>
                </Link>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Authenticate;