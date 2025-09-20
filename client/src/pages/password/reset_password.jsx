import React, { useState } from "react";
import Input from "../../components/input/input";
import { motion } from "framer-motion";
import { Lock, Key, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import api from "../../services/apiServices";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Enhanced password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }
    
    setLoading(true);
    try {
      // Get token from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (!token) {
        toast.error("Invalid reset link. Please request a new password reset.");
        return;
      }

      const res = await api.ResetPassword({ 
        token, 
        password, 
        confirmPassword 
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        // Redirect to login page after successful reset
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid or expired reset token");
      } else if (error.response?.status === 429) {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
        
        {/* Reset Password Card */}
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
                  <Key className="h-6 w-6 text-blue-600" />
                </div>
              </motion.div>
              
              <motion.h1
                className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Set New Password
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Your new password must be different from previously used passwords
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    name="password"
                    id="password"
                    onChange={handlePassword}
                    icon={Lock}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleConfirmPassword}
                    icon={Lock}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Enhanced Password Requirements */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <p className="text-sm text-blue-800 font-semibold mb-3 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password Requirements
                </p>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className={`flex items-center space-x-3 ${password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>At least 6 characters long</span>
                  </li>
                  <li className={`flex items-center space-x-3 ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Contains lowercase letter</span>
                  </li>
                  <li className={`flex items-center space-x-3 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Contains uppercase letter</span>
                  </li>
                  <li className={`flex items-center space-x-3 ${/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${/\d/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Contains number</span>
                  </li>
                  <li className={`flex items-center space-x-3 ${password === confirmPassword && password ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${password === confirmPassword && password ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Passwords match</span>
                  </li>
                </ul>
              </motion.div>

              {/* Reset Password Button */}
              <motion.button
                type="submit"
                disabled={loading || password !== confirmPassword || password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Resetting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>Reset Password</span>
                  </div>
                )}
              </motion.button>

              {/* Back to Login */}
              <motion.div
                className="text-center pt-4 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
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

export default Reset;
