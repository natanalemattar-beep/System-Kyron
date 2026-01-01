
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

// --- Firework Particle ---
const fireworkColors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#8b5cf6", "#f97316", "#ec4899"];
const FireworkParticle = ({ x, y }: { x: number, y: number }) => {
    const count = 20; // Number of sparks per firework

    return (
        <div style={{ position: 'absolute', top: `${y}%`, left: `${x}%` }}>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * 360;
                const distance = Math.random() * 80 + 50;
                const duration = Math.random() * 0.8 + 0.5;

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            x: Math.cos(angle * (Math.PI / 180)) * distance,
                            y: Math.sin(angle * (Math.PI / 180)) * distance,
                            scale: [1, 0],
                            opacity: [1, 0],
                        }}
                        transition={{
                            duration: duration,
                            ease: "easeOut",
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

    if (type === 'fireworks') {
        const fireworkCount = 10;
        return Array.from({ length: fireworkCount }).map((_, index) => {
            const x = Math.random() * 80 + 10; // 10% to 90% of width
            const y = Math.random() * 60 + 10; // 10% to 70% of height
            return <FireworkParticle key={`firework-${index}`} x={x} y={y} />;
        });
    }

    return [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, type]);

  useEffect(() => {
    if (type === 'fireworks' && isClient) {
      // For fireworks, we want to regenerate them on an interval to simulate a show
      const interval = setInterval(() => {
        setParticles(generatedParticles);
      }, 2000); // New burst every 2 seconds

      setParticles(generatedParticles); // Initial burst

      return () => clearInterval(interval);
    } else {
      setParticles(generatedParticles);
    }
  }, [generatedParticles, isClient, type]);

  if (!isClient) {
    return null;
  }

  return <div className="fixed inset-0 -z-40 pointer-events-none">{particles}</div>;
}
