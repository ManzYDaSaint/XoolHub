import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
  Zap,
  Play,
  ArrowRight,
  Sparkles,
  Activity,
  Globe,
  Clock,
} from "lucide-react";

const ModernHeroShowcase = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const modules = [
    {
      id: "students",
      title: "Student Management",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      stats: { value: 1247, label: "Students", trend: "+12%" },
      features: ["Profile Management", "Academic History", "Enrollment Tracking"],
      description: "Comprehensive student lifecycle management with real-time updates"
    },
    {
      id: "scheduling",
      title: "Smart Scheduling",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      stats: { value: 500, label: "Classes", trend: "+8%" },
      features: ["Auto Scheduling", "Conflict Detection", "Timetable Generation"],
      description: "AI-powered scheduling that eliminates conflicts and optimizes resources"
    },
    {
      id: "attendance",
      title: "Attendance Tracking",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      stats: { value: 94, label: "Attendance %", trend: "+3%" },
      features: ["Real-time Tracking", "parent Notifications", "Analytics"],
      description: "Automated attendance with instant parent notifications and insights"
    },
    {
      id: "communication",
      title: "Telegram Integration",
      icon: MessageSquare,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      stats: { value: 500, label: "Daily Messages", trend: "+25%" },
      features: ["AI Chatbots", "parent Portal", "Instant Updates"],
      description: "Seamless communication through AI-powered Telegram integration"
    }
  ];

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveModule((prev) => (prev + 1) % modules.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, modules.length]);

  // Animation controls
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Main Container with Glass Morphism */}
      <div className="relative bg-gradient-to-br from-white/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 100 - 200,
              y: mousePosition.y * 100 - 200,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl"
            animate={{
              x: (1 - mousePosition.x) * 150 - 100,
              y: (1 - mousePosition.y) * 150 - 100,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
          />
        </div>

        {/* Header Section */}
        <motion.div className="relative z-10 text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Live System Preview</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Experience XoolHub in Action
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive preview of our comprehensive school management platform
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div className="relative z-10 flex justify-center mb-8" variants={itemVariants}>
          <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isPlaying 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isPlaying ? (
                <>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Auto Play</span>
                </>
              )}
            </button>
            
            <div className="flex space-x-2">
              {modules.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModule(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeModule === index
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module Cards */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                className={`relative cursor-pointer group transition-all duration-500 ${
                  activeModule === index ? 'scale-105 z-20' : 'hover:scale-102'
                }`}
                onClick={() => setActiveModule(index)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-500
                  ${activeModule === index 
                    ? 'bg-white shadow-2xl border-blue-200' 
                    : 'bg-white/70 hover:bg-white/90 border-white/30 hover:border-blue-100'
                  }
                `}>
                  {/* Module Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`
                      w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center
                      ${activeModule === index ? 'scale-110' : 'group-hover:scale-105'}
                      transition-transform duration-300
                    `}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg transition-colors duration-300 ${
                        activeModule === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {module.title}
                      </h4>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className={`text-2xl font-bold transition-colors duration-300 ${
                        activeModule === index 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                          : 'text-gray-600'
                      }`}>
                        {module.stats.value}
                        {module.stats.label.includes('%') ? '%' : '+'}
                      </div>
                      <div className="text-xs text-gray-500">{module.stats.label}</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          activeModule === index
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* active Indicator */}
                  {activeModule === index && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <Zap className="h-3 w-3 text-white" />
                    </motion.div>
                  )}

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* active Module Details */}
          <motion.div
            key={activeModule}
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm rounded-2xl p-8 border border-white/30 h-full">
              {/* Module Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`
                  w-16 h-16 bg-gradient-to-br ${modules[activeModule].color} rounded-2xl flex items-center justify-center
                  shadow-xl
                `}>
                  {React.createElement(modules[activeModule].icon, { className: "h-8 w-8 text-white" })}
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {modules[activeModule].title}
                  </h4>
                  <p className="text-gray-600">{modules[activeModule].description}</p>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/60 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {modules[activeModule].stats.value}
                    {modules[activeModule].stats.label.includes('%') ? '%' : '+'}
                  </div>
                  <div className="text-sm text-gray-600">{modules[activeModule].stats.label}</div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 mr-1" />
                    {modules[activeModule].stats.trend}
                  </div>
                  <div className="text-sm text-gray-600">Growth</div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-900 mb-3">Key Features:</h5>
                {modules[activeModule].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore {modules[activeModule].title}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div className="relative z-10 mt-8 flex items-center justify-between" variants={itemVariants}>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-green-600">
              <Activity className="h-4 w-4" />
              <span>Live System</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Globe className="h-4 w-4" />
              <span>Multi-School</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Clock className="h-4 w-4" />
              <span>Real-time</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Module {activeModule + 1} of {modules.length}
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute top-8 right-8 w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-gradient-to-br from-orange-500 to-red-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </motion.div>
  );
};

export default ModernHeroShowcase;
