import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-3 top-3">
          <button
            aria-label="Close"
            onClick={() => setVisible(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-700 shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white hover:text-gray-900 transition"
          >
            ✕
          </button>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 pt-8 pb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
              <Megaphone size={28} className="" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                Be First: Join the XoolHub Pilot Program
              </h3>
              <p className="mt-1 text-white/90 text-sm md:text-base">
                Early partner schools get premium onboarding, direct product influence, and launch incentives.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-7">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
              Priority onboarding and white‑glove setup for your school
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
              Early access to new features and roadmap input
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
              Free during the pilot, with loyalty pricing afterward
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
              Secure, reliable, and fast support when you need it
            </li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => (window.location.href = "/register")}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-white shadow-md hover:bg-indigo-700 active:bg-indigo-800 transition"
            >
              Request Pilot Access
            </button>
            <a
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-800 shadow-sm hover:bg-gray-50 transition"
            >
              Talk to our Team
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Limited seats available. We onboard schools in waves to ensure quality support.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
// Centered, dismissible pilot banner modal encouraging schools to join the pilot.
