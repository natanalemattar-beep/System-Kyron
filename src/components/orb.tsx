
"use client";

import { motion } from "framer-motion";

export function Orb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer Glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-full h-full rounded-full bg-primary/40 blur-3xl"
      />

      {/* Main Orb Sphere */}
      <motion.div
        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-background/50 backdrop-blur-sm rounded-full relative overflow-hidden border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/30" />
        
        {/* Inner Lines */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div 
            className="absolute left-1/2 top-0 h-full w-[1px] bg-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
           <motion.div
            className="absolute inset-0 border border-primary/10 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 0.8, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
           <motion.div
            className="absolute inset-0 border-2 border-primary/10 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 0.6, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
