import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";

export default function PilotBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 15000); // Auto-dismiss after 15s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-sm md:text-base flex items-center justify-between px-6 py-4 shadow-md fixed top-0 z-50"
    >
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <Megaphone size={35} className="animate-pulse" />
          <span>
            🎉 Join our <strong>Piloting Phase</strong> now —{" "}
            <strong>FREE</strong> access for early schools!. Contact the administrator
          </span>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-white hover:text-gray-300 transition duration-200"
      >
        ✕
      </button>
    </motion.div>
  );
}
// This component displays a banner for the piloting phase of the application.
