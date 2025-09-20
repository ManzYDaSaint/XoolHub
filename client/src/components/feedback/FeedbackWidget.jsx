import React, { useState, useEffect } from "react";
import { MessageSquare, X, Star, Send, CheckCircle, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/apiServices";
import toast from "react-hot-toast";

const FeedbackWidget = ({ 
  position = "bottom-right", 
  theme = "default",
  categories = null,
  showCategories = true 
}) => { 
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const defaultCategories = [
    { id: "general", label: "General", icon: "💬" },
    { id: "bug", label: "Bug Report", icon: "🐛" },
    { id: "feature", label: "Feature Request", icon: "💡" },
    { id: "improvement", label: "Improvement", icon: "⚡" }
  ];

  const feedbackCategories = categories || defaultCategories;

  // Animation effects
  useEffect(() => {
    // Show pulse animation after 3 seconds
    const pulseTimer = setTimeout(() => {
      setShowPulse(true);
    }, 3000);

    // Show sparkles animation after 5 seconds
    const sparklesTimer = setTimeout(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    }, 5000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(sparklesTimer);
    };
  }, []);

  // Reset animations when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
      setShowSparkles(false);
    }
  }, [isOpen]);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  };

  const themeClasses = {
    default: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
    primary: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    success: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    warning: "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating || (showCategories && !selectedCategory)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.insertFeedback({
        rating,
        comment,
        selectedOption: "widget_feedback",
        category: selectedCategory || "general",
        timestamp: new Date().toISOString(),
        source: "widget"
      });

      if (res.data.success) {
        toast.success("Thank you for your feedback!");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsOpen(false);
          resetForm();
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(0);
    setComment("");
    setSelectedCategory("");
  };

  if (showSuccess) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl p-6 w-80"
        >
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-sm text-gray-600">Your feedback has been submitted successfully.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {/* Pulse Ring Animation */}
        {showPulse && !isOpen && (
          <motion.div
            className={`absolute inset-0 ${themeClasses[theme].split(' ')[0]} rounded-full opacity-30`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Sparkles Animation */}
        {showSparkles && !isOpen && (
          <div className="absolute -top-2 -right-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                <Sparkles size={12} className="text-yellow-400" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`${themeClasses[theme]} text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
          }}
          whileTap={{ scale: 0.9 }}
          animate={showPulse && !isOpen ? {
            y: [0, -5, 0],
          } : {}}
          transition={{
            y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Button Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                >
                  <MessageSquare size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification Badge */}
          {showPulse && !isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center z-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Heart size={12} className="fill-current" />
            </motion.div>
          )}
        </motion.button>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div
            className="absolute right-full mr-3 top-3 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center space-x-2">
              <Heart size={14} className="text-red-400 fill-current" />
              <span>Share your feedback!</span>
            </div>
            {/* Arrow */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </motion.div>
        )}
      </div>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.h3 
                    className="text-lg font-semibold text-gray-900"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Quick Feedback
                  </motion.h3>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Categories */}
                  {showCategories && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {feedbackCategories.map((category, index) => (
                          <motion.button
                            key={category.id}
                            type="button"
                            onClick={() => setSelectedCategory(category.id)}
                            className={`p-2 text-sm border rounded-lg transition-all duration-200 ${
                              selectedCategory === category.id
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <span className="mr-1">{category.icon}</span>
                            {category.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <Star
                            size={24}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer transition-all duration-200 ${
                              rating >= star ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-200"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Comment */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-200"
                      placeholder="Tell us more..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !rating || (showCategories && !selectedCategory)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;
