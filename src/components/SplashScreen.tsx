// src/components/SplashScreen.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Ensure cleanup
    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-white z-50"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-48 mb-8"
      >
        <img
          src="/lovable-uploads/558d603b-dfed-48e3-a1da-9133bc2eace8.png"
          alt="Daniola Logo"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Trade smarter.
      </motion.p>

      {/* Progress Bar */}
      <div className="w-72 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-[#FF4B4B] transition-all duration-300 ease-out"
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-600 mt-4 font-medium"
      >
        Loading Today's Market...
      </motion.p>
    </motion.div>
  );
};