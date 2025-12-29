
"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// --- Snowflake Particle ---
const Snowflake = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute text-primary"
    style={style}
    initial={{ y: "-10vh", opacity: 0 }}
    animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
    transition={{
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      delay: Math.random() * 15,
    }}
  >
    <motion.div
      animate={{ x: [0, -20, 20, -20, 0], rotate: [0, 180, 360] }}
      transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      &#10052;
    </motion.div>
  </motion.div>
);

// --- Confetti Particle ---
const confettiColors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#8b5cf6"];
const ConfettiParticle = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute rounded-full"
    style={style}
    initial={{ y: "-10vh", opacity: 0 }}
    animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
    transition={{
      duration: Math.random() * 5 + 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      delay: Math.random() * 8,
    }}
  >
     <motion.div
      className="w-full h-full"
      animate={{ rotate: [0, 360, 720] }}
      transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'linear' }}
     />
  </motion.div>
);


// --- Main FestiveEffect Component ---
type EffectType = 'snow' | 'confetti';

export function FestiveEffect({ type }: { type: EffectType }) {
  const [particles, setParticles] = useState<React.ReactElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generatedParticles = useMemo(() => {
    if (!isClient) return [];

    if (type === 'snow') {
      return Array.from({ length: 50 }).map((_, index) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          fontSize: `${Math.random() * 1 + 0.5}rem`,
        };
        return <Snowflake key={`snow-${index}`} style={style} />;
      });
    }

    if (type === 'confetti') {
      return Array.from({ length: 100 }).map((_, index) => {
        const size = Math.random() * 8 + 4;
        const style = {
          left: `${Math.random() * 100}vw`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        };
        return <ConfettiParticle key={`confetti-${index}`} style={style} />;
      });
    }

    return [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, type]);

  useEffect(() => {
    setParticles(generatedParticles);
  }, [generatedParticles]);

  if (!isClient) {
    return null;
  }

  return <div className="fixed inset-0 -z-40 pointer-events-none">{particles}</div>;
}
