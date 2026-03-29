'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Logo } from "../logo";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const prefersReducedMotion = useReducedMotion();
    const onCompleteRef = useRef(onComplete);
    const hasCompletedRef = useRef(false);

    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (hasCompletedRef.current) return;

        if (prefersReducedMotion) {
            hasCompletedRef.current = true;
            setProgress(100);
            setVisible(false);
            onCompleteRef.current();
            return;
        }

        const duration = 1800;
        const fps = 60;
        const increment = 100 / (duration / (1000 / fps));
        let current = 0;

        const frame = () => {
            current = Math.min(current + increment, 100);
            setProgress(current);

            if (current < 100) {
                rafId = requestAnimationFrame(frame);
            } else {
                setTimeout(() => {
                    if (hasCompletedRef.current) return;
                    hasCompletedRef.current = true;
                    setVisible(false);
                    setTimeout(() => {
                        onCompleteRef.current();
                    }, 500);
                }, 200);
            }
        };

        let rafId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [prefersReducedMotion]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020810]"
                >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(6,182,212,0.15) 0%, transparent 70%)",
                            }}
                        />
                    </div>

                    <div className="relative flex flex-col items-center gap-10 px-6 w-full max-w-sm">
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/8 to-emerald-500/10 blur-3xl" />
                            <motion.div
                                animate={{ scale: [1, 1.04, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Logo className="h-24 w-24 relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="text-center space-y-1"
                        >
                            <h1 className="text-base font-black uppercase tracking-[0.5em] text-white/80">
                                System Kyron
                            </h1>
                            <p className="text-[7px] font-bold uppercase tracking-[0.6em] text-cyan-400/40">
                                Inteligencia Corporativa
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="w-full space-y-3"
                        >
                            <div className="w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: "linear-gradient(90deg, #0ea5e9, #3b82f6, #22c55e)",
                                        boxShadow: "0 0 8px rgba(6,182,212,0.3)",
                                    }}
                                    transition={{ duration: 0.05, ease: "linear" }}
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 tabular-nums">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="absolute bottom-8 text-[7px] font-bold uppercase tracking-[0.5em] text-white/10"
                    >
                        v2.8.5
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
