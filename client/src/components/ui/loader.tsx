// src/components/Loader.tsx
import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 z-50">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-300"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0"
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 0.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
              initial={{
                x: 30 * Math.cos((i * 60) * Math.PI / 180),
                y: 30 * Math.sin((i * 60) * Math.PI / 180)
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Loading text */}
      <motion.div
        className="absolute mt-32 text-slate-600 font-medium text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Loader;