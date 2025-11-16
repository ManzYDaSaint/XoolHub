import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  MessageSquare,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Globe,
  Bell,
  Bot,
  Heart,
  Star,
} from "lucide-react";

const ParentPortalShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      description: "Natural conversations with intelligent bot assistance",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Users,
      title: "Student Tracking",
      description: "Real-time updates on your child's academic progress",
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get notified immediately about important updates",
      color: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Protected with enterprise-grade security",
      color: "from-purple-500 to-pink-500",
      delay: 0.4
    }
  ];

  const benefits = [
    "24/7 Access to Student Information",
    "Real-time Attendance Updates",
    "Direct Communication with Teachers",
    "Fee Payment Reminders",
    "Academic Progress Tracking",
    "Event Notifications"
  ];

  // Animation controls
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setIsVisible(true);
    }
  }, [isInView, controls]);

  // Auto-rotate features
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, features.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="h-4 w-4" />
              <span>Parent Portal</span>
              <Sparkles className="h-4 w-4" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-900">Stay Connected with</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Your Child's Education
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience seamless communication through our intelligent Telegram bot. 
              <span className="font-semibold text-gray-800"> Get instant updates, track progress, and stay informed</span> about your child's academic journey. No app download required - access directly through Telegram!
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Features */}
            <motion.div className="space-y-8" variants={itemVariants}>
              
              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      activeFeature === index ? 'scale-105 z-20' : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                  >
                    <div className={`
                      relative p-6 rounded-2xl border-2 transition-all duration-500
                      ${activeFeature === index 
                        ? 'bg-white shadow-2xl border-purple-200' 
                        : 'bg-white/70 hover:bg-white/90 border-white/30 hover:border-purple-100'
                      }
                    `}>
                      {/* Feature Icon */}
                      <div className={`
                        w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4
                        ${activeFeature === index ? 'scale-110' : 'group-hover:scale-105'}
                        transition-transform duration-300
                      `}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h4 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                        activeFeature === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {feature.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600">{feature.description}</p>

                      {/* Active Indicator */}
                      {activeFeature === index && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, type: "spring" }}
                        >
                          <Zap className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits List */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
                variants={itemVariants}
              >
                <h5 className="font-bold text-xl text-gray-900 mb-6 flex items-center">
                  <Heart className="h-5 w-5 text-pink-500 mr-2" />
                  What Parents Love
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Telegram Bot Screenshot */}
            <motion.div 
              className="relative flex justify-center lg:justify-end"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Phone Frame with Actual Screenshot */}
                <motion.div
                  className="relative w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  {/* Phone Screen with Actual Image */}
                  <div className="w-full h-full bg-gray-800 rounded-[2.5rem] overflow-hidden relative">
                    {/* Actual Telegram Bot Screenshot */}
                    <div className="w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-6 py-3 text-white text-sm bg-gray-800">
                        <span className="font-medium">16:30</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-2 bg-white rounded-sm"></div>
                          <div className="w-4 h-2 bg-white rounded-sm"></div>
                          <div className="w-4 h-2 bg-white rounded-sm"></div>
                        </div>
                      </div>

                      {/* Chat Header */}
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold">XoolHub (Parent Portal)</h3>
                            <p className="text-xs opacity-90">bot</p>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="p-4 space-y-4 bg-gray-800 h-full">
                        {/* Bot Messages */}
                        <div className="space-y-2">
                          <div className="bg-gray-700 rounded-2xl rounded-bl-md p-3 max-w-xs">
                            <p className="text-white text-sm">Use the menu to access detailed academic reports.</p>
                            <p className="text-gray-400 text-xs mt-1">16:30</p>
                          </div>
                          <div className="bg-gray-700 rounded-2xl rounded-bl-md p-3 max-w-xs">
                            <p className="text-white text-sm">To get started, please log in with your phone number (the one registered at school).</p>
                            <p className="text-gray-400 text-xs mt-1">16:30</p>
                          </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl rounded-br-md p-4 max-w-xs ml-auto">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">LS</span>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm">Lil Saint</h4>
                              <p className="text-white/80 text-xs">+265 99 000 0000</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-white/20 text-white px-3 py-1 rounded-lg text-xs">MESSAGE</button>
                            <button className="bg-white/20 text-white px-3 py-1 rounded-lg text-xs">ADD</button>
                          </div>
                          <p className="text-white/80 text-xs mt-2">16:30 ✓✓</p>
                        </div>

                        {/* Success Messages */}
                        <div className="space-y-2">
                          <div className="bg-green-600 rounded-2xl rounded-bl-md p-3 max-w-xs">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-white" />
                              <p className="text-white text-sm">Logged in as guardian of Chisomo Banda.</p>
                            </div>
                            <p className="text-white/80 text-xs mt-1">16:30</p>
                          </div>
                          <div className="bg-gray-700 rounded-2xl rounded-bl-md p-3 max-w-xs">
                            <div className="flex items-center space-x-2">
                              <Bot className="h-4 w-4 text-white" />
                              <p className="text-white text-sm">AI features are now active! Try asking me questions naturally.</p>
                            </div>
                            <p className="text-gray-400 text-xs mt-1">16:30</p>
                          </div>
                        </div>

                        {/* Menu Grid */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {['My student', 'My fees', 'Events', 'Settings', 'Results', 'Attendance', 'AI Insights', 'Discipline', 'Talk to teacher', 'Talk to administrator', 'Feedback', 'Menu'].map((item, index) => (
                            <motion.button
                              key={index}
                              className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-white text-xs font-medium transition-colors duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {item}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Overlay with Telegram Bot Info */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[2.5rem] flex items-end">
                      <div className="p-6 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="h-5 w-5 text-purple-400" />
                          <span className="font-semibold text-sm">Telegram Bot</span>
                        </div>
                        <p className="text-xs opacity-90">Access via Telegram - No app download required</p>
                      </div>
                    </div> */}
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="h-4 w-4 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Heart className="h-3 w-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Stay Connected?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of parents who are already using our intelligent Telegram bot to stay informed about their child's education. No app download required!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="border-2 border-purple-600 text-purple-600 px-8 py-2 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Access via Telegram
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-purple-500" />
                    <span>Multi-Language</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ParentPortalShowcase;
