'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const loadingSteps = [
    { label: "Inicializando núcleo", module: "CORE v2.6" },
    { label: "Cargando módulos fiscales", module: "VEN-NIF · SENIAT" },
    { label: "Conectando inteligencia artificial", module: "GEMINI 2.0 · GPT-4o" },
    { label: "Verificando seguridad", module: "AES-256 · JWT" },
    { label: "Sincronizando BCV", module: "TASA EN TIEMPO REAL" },
    { label: "Preparando interfaz", module: "HUD TITANIUM" },
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [exiting, setExiting] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    const handleComplete = useCallback(() => {
        setExiting(true);
        const t = setTimeout(onComplete, prefersReducedMotion ? 0 : 800);
        timeoutsRef.current.push(t);
    }, [onComplete, prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) {
            setProgress(100);
            setCurrentStep(loadingSteps.length - 1);
            handleComplete();
            return;
        }

        const stepDuration = 350;
        const totalSteps = loadingSteps.length;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            const newProgress = Math.min((step / totalSteps) * 100, 100);
            setProgress(newProgress);
            setCurrentStep(Math.min(step, totalSteps - 1));

            if (step >= totalSteps) {
                clearInterval(interval);
                const t = setTimeout(handleComplete, 500);
                timeoutsRef.current.push(t);
            }
        }, stepDuration);

        return () => {
            clearInterval(interval);
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, [handleComplete, prefersReducedMotion]);

    const motionProps = prefersReducedMotion
        ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
        : {};

    return (
        <AnimatePresence>
            {!exiting ? (
                <motion.div
                    key="loader"
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020810]"
                >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: [
                                    "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 60%)",
                                    "radial-gradient(ellipse 40% 30% at 30% 70%, rgba(59,130,246,0.08) 0%, transparent 60%)",
                                ].join(", "),
                            }}
                        />
                        <div className="absolute inset-0 hud-grid opacity-15" />
                    </div>

                    <div className="relative flex flex-col items-center gap-8 px-6 w-full max-w-md">
                        <motion.div
                            initial={prefersReducedMotion ? undefined : { scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-emerald-500/20 blur-2xl animate-pulse-soft" />
                            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#0D1D35] border border-white/10 flex items-center justify-center shadow-[0_8px_40px_-8px_rgba(6,182,212,0.3)]">
                                <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                                    <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" fill="rgba(6,182,212,0.08)" />
                                    <path d="M20 4L6 12l14 8 14-8L20 4z" fill="rgba(6,182,212,0.15)" />
                                    <path d="M6 12v16l14 8V20L6 12z" fill="rgba(59,130,246,0.12)" />
                                    <path d="M34 12v16l-14 8V20l14-8z" fill="rgba(16,185,129,0.10)" />
                                    <motion.path
                                        d="M20 4L6 12l14 8 14-8L20 4z"
                                        stroke="rgba(6,182,212,0.8)"
                                        strokeWidth="1"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-lg font-black uppercase tracking-[0.4em] text-white/90 mb-1">
                                System Kyron
                            </h1>
                            <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-cyan-400/50">
                                Inteligencia Corporativa
                            </p>
                        </motion.div>

                        <motion.div
                            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.4 }}
                            className="w-full space-y-4"
                        >
                            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: "linear-gradient(90deg, rgba(6,182,212,0.8), rgba(59,130,246,0.8), rgba(16,185,129,0.8))",
                                        boxShadow: "0 0 12px rgba(6,182,212,0.4)",
                                    }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-h-[24px]">
                                    <motion.div
                                        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="w-3 h-3 rounded-full border border-cyan-400/40 border-t-cyan-400"
                                    />
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStep}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <p className="text-[10px] font-bold text-white/50">
                                                {loadingSteps[currentStep]?.label}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <span className="text-[9px] font-black text-white/25 tabular-nums">
                                    {Math.round(progress)}%
                                </span>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.35em] text-white/30">
                                        {loadingSteps[currentStep]?.module}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.4 }}
                        className="absolute bottom-8 text-[7px] font-bold uppercase tracking-[0.5em] text-white/15"
                    >
                        v2.6.5 — Cero Riesgo
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div
                    key="exit"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.1 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#020810] pointer-events-none"
                />
            )}
        </AnimatePresence>
    );
}
