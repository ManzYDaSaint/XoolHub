import React, { useState } from "react";
import Input from "../../components/input/input";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import api from "../../services/apiServices.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginData } from "../../helpers/examination/examSlice.jsx";
import { Mail, Lock, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../logo.png";
import { handleValidationErrors, showSuccessToast } from "../../utils/validationErrorHandler";

const Login = () => {
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.exam.loginData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.Logon(data);
      if (res.data.success === true) {
        showSuccessToast(res.data.message);

        // Redirecting to administrator dashboard after successful login
        setTimeout(() => {
          navigate("/administrator");
        }, 2000);
        return;
      } else if (res.data.tsuccess === true) {
        showSuccessToast(res.data.tmessage);
        if (res.data.role === "bursar") {
          // Redirecting to bursar dashboard after successful login
          setTimeout(() => {
            navigate("/bursar/dashboard");
          }, 2000);
          return;
        } else if (res.data.role === "hoa") {
          // Redirecting to Head of academics dashboard after successful login
          setTimeout(() => {
            navigate("/hoa/dashboard");
          }, 2000);
          return;
        } else if (res.data.role === "hod") {
          // Redirecting to Head of department dashboard after successful login
          setTimeout(() => {
            navigate("/hod/dashboard");
          }, 2000);
          return;
        } else {
          // Redirecting to teacher dashboard after successful login
          setTimeout(() => {
            navigate("/entry");
          }, 2000);
          return;
        }
      } else if (res.data.ssuccess === true) {
        showSuccessToast(res.data.smessage);

        // Redirecting to Super Admin dashboard after successful login
        setTimeout(() => {
          navigate("/super");
        }, 2000);
        return;
      } else if (res.data.osuccess === true) {
        navigate("/authenticate", { state: { email: res.data.email } });
      } else if (res.data.message) {
        toast.error(res.data.message);
      } else {
        toast.error(res.data.tmessage);
      }
      dispatch(
        setLoginData({
          schoolEmail: "",
          schoolPassword: "",
        })
      );
    } catch (error) {
      // Handle axios error responses with validation errors
      handleValidationErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setLoginData({
        ...loginData,
        [name]: value,
      })
    );
  }; 

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(loginData);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <Toaster />
        
        {/* Login Card */}
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
              <Link to={"/"}>
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <img src={logo} alt="XoolHub Logo" className="h-8 w-auto" />
                </motion.div>
              </Link>
              
              <motion.h1
                className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Welcome Back
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Let's get you logged in to your account
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={onSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Input
                  type="email"
                  name="schoolEmail"
                  placeholder="Enter your email"
                  value={loginData.schoolEmail}
                  onChange={handleChange}
                  autoComplete="email"
                  icon={Mail}
                  required
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  name="schoolPassword"
                  placeholder="Enter your password"
                  value={loginData.schoolPassword}
                  onChange={handleChange}
                  autoComplete="current-password"
                  icon={Lock}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  required
                />
              </motion.div>

              {/* Forgot Password */}
              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  to="/forgot"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </motion.div>

              {/* Sign In Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.button>

              {/* Sign Up Link */}
              <motion.div 
                className="text-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Sign up here
                  </Link>
                </p>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
