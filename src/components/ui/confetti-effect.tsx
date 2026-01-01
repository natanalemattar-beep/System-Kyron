
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// --- Snowflake Particle ---
const Snowflake = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute text-blue-400"
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

// --- Firework Particle ---
const fireworkColors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#8b5cf6", "#f97316", "#ec4899"];

const Firework = ({ x, y, delay }: { x: number, y: number, delay: number }) => {
    const sparkCount = 25;
    const trailDuration = 0.5;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {/* Trail */}
            <motion.div
                className="absolute"
                style={{
                    left: `${x}%`,
                    bottom: 0,
                    width: '3px',
                    height: '0px',
                    background: `linear-gradient(to top, ${fireworkColors[Math.floor(Math.random() * fireworkColors.length)]}, transparent)`,
                }}
                initial={{ height: '0px', opacity: 0 }}
                animate={{
                    height: `${100 - y}%`,
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: trailDuration,
                    ease: "easeOut",
                    delay: delay,
                }}
            />

            {/* Explosion */}
            {Array.from({ length: sparkCount }).map((_, i) => {
                const angle = (i / sparkCount) * 360;
                const distance = Math.random() * 100 + 50;
                const sparkDuration = Math.random() * 0.8 + 0.6;
                const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            width: '5px',
                            height: '5px',
                            backgroundColor: color,
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            x: Math.cos(angle * (Math.PI / 180)) * distance,
                            y: Math.sin(angle * (Math.PI / 180)) * distance,
                            scale: [1, 0],
                            opacity: [1, 0],
                        }}
                        transition={{
                            duration: sparkDuration,
                            ease: "easeOut",
                            delay: delay + trailDuration,
                        }}
                    />
                );
            })}
        </div>
    );
};


// --- Main FestiveEffect Component ---
type EffectType = 'snow' | 'fireworks';

export function FestiveEffect({ type }: { type: EffectType }) {
  const [particles, setParticles] = useState<React.ReactElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Effect to hide the message after 15 seconds for fireworks
  useEffect(() => {
    if (type === 'fireworks') {
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
    } else {
        setShowMessage(true); // Ensure message is shown for other effects if needed
    }
  }, [type]);

  const generateFireworks = useMemo(() => {
    if (!isClient || type !== 'fireworks') return [];
    
    const fireworkCount = Math.floor(Math.random() * 5) + 8; // 8 to 12 fireworks per burst
    return Array.from({ length: fireworkCount }).map((_, index) => {
        const x = Math.random() * 80 + 10; // 10% to 90% of width
        const y = Math.random() * 50 + 10; // 10% to 60% of height
        const delay = Math.random() * 1.5;
        return <Firework key={`fw-${Date.now()}-${index}`} x={x} y={y} delay={delay} />;
    });
  }, [isClient, type]);


  useEffect(() => {
    if (!isClient) return;

    if (type === 'snow') {
        const snowParticles = Array.from({ length: 50 }).map((_, index) => {
            const style = {
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 1 + 0.5}rem`,
            };
            return <Snowflake key={`snow-${index}`} style={style} />;
        });
        setParticles(snowParticles);
    } else if (type === 'fireworks') {
        const interval = setInterval(() => {
            setParticles(generateFireworks);
        }, 3500); // New burst every 3.5 seconds

        setParticles(generateFireworks);

        return () => clearInterval(interval);
    }
  }, [isClient, type, generateFireworks]);


  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-40 pointer-events-none overflow-hidden">
        {particles}
        <AnimatePresence>
        {type === 'fireworks' && showMessage && (
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white/80"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h2 className="text-6xl font-bold">¡Feliz Año Nuevo!</h2>
                <p className="text-8xl font-extrabold">{currentYear}</p>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
    );
}
