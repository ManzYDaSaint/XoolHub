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

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              aria-label="Close"
              onClick={() => setVisible(false)}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg ring-1 ring-black/10 hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>

            {/* Header Section */}
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 pt-10 pb-8 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="flex items-start gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="rounded-2xl bg-white/20 p-4 ring-1 ring-white/30 backdrop-blur-sm">
                      <Megaphone size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <motion.div
                        className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-semibold">Limited Time Opportunity</span>
                      </motion.div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                        Be First: Join the XoolHub Pilot Program
                      </h3>
                      <p className="text-lg text-white/90 leading-relaxed">
                        Early partner schools get premium onboarding, direct product influence, and exclusive launch incentives.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 py-8 md:px-10 md:py-10">
              {/* Benefits Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  "Priority onboarding and white‑glove setup for your school",
                  "Early access to new features and roadmap input",
                  "Free during the pilot, with loyalty pricing afterward",
                  "Secure, reliable, and fast support when you need it"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.button
                  onClick={() => (window.location.href = "/register")}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Request Pilot Access
                  <ArrowRight className="h-4 w-4 ml-2" />
                </motion.button>
                
                <motion.a
                  href="/contact"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-gray-800 font-semibold shadow-md hover:shadow-lg hover:border-indigo-300 transition-all duration-200 hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Talk to our Team
                </motion.a>
              </motion.div>

              {/* Footer Note */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <p className="text-sm text-gray-500 font-medium">
                  <span className="inline-flex items-center space-x-1">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <span>Limited seats available</span>
                  </span>
                  . We onboard schools in waves to ensure quality support.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
