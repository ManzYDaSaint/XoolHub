import React, { useState } from "react";
import Input from "../../components/input/input";
import api from "../../services/apiServices.jsx";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setRegisterData } from "../../helpers/examination/examSlice.jsx";
import { CircleCheck, Lock, Mail, ArrowRight, UserPlus, Gift } from "lucide-react";
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
        referralCode: "",
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

              {/* Referral Code Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Input
                  type="text"
                  name="referralCode"
                  placeholder="Referral code (optional)"
                  value={registerData.referralCode}
                  onChange={handleChange}
                  icon={Gift}
                />
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  Have a referral code? Enter it to get bonus benefits!
                </p>
              </motion.div>

              {/* Sign Up Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
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
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </motion.div>

              {/* Login Link */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
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
