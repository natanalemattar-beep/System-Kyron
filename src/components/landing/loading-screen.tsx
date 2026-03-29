'use client';

import { useState, useEffect, useRef } from "react";
import { Logo } from "../logo";
import { useTranslations } from 'next-intl';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const t = useTranslations('LoadingScreen');
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [exiting, setExiting] = useState(false);
    const onCompleteRef = useRef(onComplete);
    const hasCompletedRef = useRef(false);
    const completionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (hasCompletedRef.current) return;

        const prefersReduced = typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            hasCompletedRef.current = true;
            setProgress(100);
            setVisible(false);
            onCompleteRef.current();
            return;
        }

        const steps = 40;
        const intervalMs = 40;
        let current = 0;

        const intervalId = setInterval(() => {
            current += 100 / steps;
            if (current >= 100) {
                current = 100;
                clearInterval(intervalId);
                setProgress(100);
                if (!hasCompletedRef.current) {
                    hasCompletedRef.current = true;
                    setExiting(true);
                    completionTimerRef.current = setTimeout(() => {
                        setVisible(false);
                        onCompleteRef.current();
                    }, 500);
                }
                return;
            }
            setProgress(current);
        }, intervalMs);

        return () => {
            clearInterval(intervalId);
            if (completionTimerRef.current) {
                clearTimeout(completionTimerRef.current);
            }
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020810]"
            style={{
                opacity: exiting ? 0 : 1,
                transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
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
                <div
                    className="relative animate-[fadeScaleIn_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                >
                    <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/8 to-emerald-500/10 blur-3xl" />
                    <div className="animate-[gentlePulse_2.5s_ease-in-out_infinite]">
                        <Logo className="h-24 w-24 relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]" />
                    </div>
                </div>

                <div
                    className="text-center space-y-1 animate-[fadeSlideUp_0.4s_0.2s_both]"
                >
                    <h1 className="text-base font-black uppercase tracking-[0.5em] text-white/80">
                        System Kyron
                    </h1>
                    <p className="text-[7px] font-bold uppercase tracking-[0.6em] text-cyan-400/40">
                        {t('subtitle')}
                    </p>
                </div>

                <div
                    className="w-full space-y-3 animate-[fadeIn_0.3s_0.3s_both]"
                >
                    <div className="w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-100 ease-linear"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #0ea5e9, #3b82f6, #22c55e)",
                                boxShadow: "0 0 8px rgba(6,182,212,0.3)",
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 tabular-nums">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>
            </div>

            <p
                className="absolute bottom-8 text-[7px] font-bold uppercase tracking-[0.5em] text-white/10 animate-[fadeIn_0.3s_0.5s_both]"
            >
                v2.8.5
            </p>
        </div>
    );
}
