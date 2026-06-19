import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-black text-gradient leading-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary rounded-xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
            <motion.button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-8 py-4 glass-card rounded-xl text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
            <Search className="w-5 h-5" />
            <span>Quick Links</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["/", "/projects", "/blog", "/resume", "/awards"].map((path) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="px-4 py-2 glass-card rounded-lg text-gray-400 hover:text-white transition-colors text-sm"
              >
                {path}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NotFound;