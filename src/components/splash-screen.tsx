
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './logo';

export function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000); // Show splash for 2 seconds

            return () => clearTimeout(timer);
        }
    }, [isClient]);

    return (
        <AnimatePresence>
            {isClient && isLoading && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1, 1.1, 1],
                                rotate: [0, 5, -5, 5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        >
                            <Logo className="h-24 w-24" />
                        </motion.div>
                    </motion.div>
                    <motion.p 
                      className="mt-6 text-lg font-medium text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5}}
                    >
                        Cargando...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
