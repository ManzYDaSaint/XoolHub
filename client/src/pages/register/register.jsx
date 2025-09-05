import React, { useState } from "react";
import Input from "../../components/input/input";
import api from "../../services/apiServices.jsx";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setRegisterData } from "../../helpers/examination/examSlice.jsx";
import { CircleCheck, Lock, Mail, ArrowRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const registerData = useSelector((state) => state.exam.registerData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const res = await api.createSchool(data);
      if (res.data.success === true) {
        toast.success(res.data.message);

        // Redirecting to dashboard after successful login
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    dispatch(
      setRegisterData({
        schoolEmail: "",
        schoolPassword: "",
        confirm: "",
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setRegisterData({
        ...registerData,
        [name]: value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(registerData);
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
        
        {/* Register Card */}
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
                Get Started
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Let's create your school account
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
                  value={registerData.schoolEmail}
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
                  placeholder="Create a password"
                  value={registerData.schoolPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  icon={Lock}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  required
                />
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Input
                  type={confirmPassword ? "text" : "password"}
                  name="confirm"
                  placeholder="Confirm your password"
                  value={registerData.confirm}
                  onChange={handleChange}
                  autoComplete="new-password"
                  icon={CircleCheck}
                  showPassword={confirmPassword}
                  setShowPassword={setConfirmPassword}
                  required
                />
              </motion.div>

              {/* Sign Up Button */}
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.button>

              {/* Divider */}
              <motion.div
                className="relative my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </motion.div>

              {/* Google Sign Up */}
              <motion.button
                type="button"
                className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign up with Google</span>
              </motion.button>

              {/* Login Link */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Sign in here
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

export default Register;
