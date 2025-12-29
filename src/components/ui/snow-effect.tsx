
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Snowflake component
function Snowflake({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute text-primary"
      style={style}
      initial={{ y: "-10vh", opacity: 0 }}
      animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
      transition={{
        duration: Math.random() * 10 + 10, // Slower fall
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: Math.random() * 15,
      }}
    >
      <motion.div
        animate={{
            x: [0, -20, 20, -20, 0],
            rotate: [0, 180, 360]
        }}
        transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
        }}
      >
        &#10052;
      </motion.div>
    </motion.div>
  );
}

// SnowEffect component
export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<React.ReactElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const generateSnowflakes = () => {
        const newSnowflakes = Array.from({ length: 50 }).map((_, index) => {
          const style = {
            left: `${Math.random() * 100}vw`,
            fontSize: `${Math.random() * 1 + 0.5}rem`, // 0.5rem to 1.5rem
            animationDelay: `${Math.random() * 20}s`,
          };
          return <Snowflake key={index} style={style} />;
        });
        setSnowflakes(newSnowflakes);
      };
      
      generateSnowflakes();
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return <div className="fixed inset-0 -z-40 pointer-events-none">{snowflakes}</div>;
}
