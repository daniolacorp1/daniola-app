// src/components/ui/loading.tsx
import { motion } from "framer-motion";

interface LoadingProps {
  type?: 'full' | 'inline' | 'overlay';
  message?: string;
}

export const Loading = ({ type = 'full', message = 'Loading...' }: LoadingProps) => {
  if (type === 'inline') {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="w-6 h-6 border-2 border-[#FF4B4B] border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-sm text-gray-600">{message}</span>
      </div>
    );
  }

  if (type === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-[#FF4B4B] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-[#FF4B4B] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      </div>
    </motion.div>
  );
};