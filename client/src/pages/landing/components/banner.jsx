import { useEffect, useState } from "react";
import { Megaphone, Sparkles, CheckCircle, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PilotBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setVisible(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setVisible(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mt-2 sm:mt-10 w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              aria-label="Close"
              onClick={() => setVisible(false)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-30 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-gray-700 shadow-lg ring-1 ring-black/10 hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-110 touch-manipulation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>

            {/* Header Section */}
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-4 sm:px-6 pt-6 pb-4 sm:pt-8 sm:pb-6 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="rounded-xl sm:rounded-2xl bg-white/20 p-3 sm:p-4 ring-1 ring-white/30 backdrop-blur-sm self-center sm:self-start">
                      <Megaphone size={24} className="text-white sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <motion.div
                        className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm font-semibold">50% Off for 1 Year</span>
                      </motion.div>
                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 sm:mb-3">
                        Join Our Pilot Program - 50% Off for 1 Year
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
                        Be among the first schools to experience XoolHub at an exclusive 50% discount. Start with a small initial payment and save thousands over the year.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
              {/* Benefits Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  "50% off all plans for a full year - save up to MK 187,500",
                  "Start with a small initial payment, no long-term commitment",
                  "Priority support and dedicated onboarding assistance",
                  "Early access to new features and direct product influence"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.button
                  onClick={() => (window.location.href = "/pilot-program")}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 hover:scale-105 touch-manipulation min-h-[48px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">View Pilot Plans</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                </motion.button>
                
                <motion.a
                  href="/pilot-program#apply"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 sm:px-8 py-3 sm:py-4 text-gray-800 font-semibold shadow-md hover:shadow-lg hover:border-indigo-300 transition-all duration-200 hover:scale-105 touch-manipulation min-h-[48px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm sm:text-base">Apply Now</span>
                </motion.a>
              </motion.div>

              {/* Footer Note */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="inline-flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <span>Limited Time Offer - 50% Off for 1 Year</span>
                  </span>
                  . Start with a small initial payment and save thousands.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
