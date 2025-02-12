import { MessageSquarePlus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FeedbackButton() {
  return (
    <Link to={"/feedback"}>
      <motion.button
        className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-600 hover:text-dark dark:text-dark focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center">
          <MessageSquarePlus
            className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12"
            size={20}
          />
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Give Feedback
          </motion.span>
        </span>
      </motion.button>
    </Link>
  );
}
