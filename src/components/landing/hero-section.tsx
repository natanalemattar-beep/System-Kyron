'use client';

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

function useCountUp(target: number, duration: number = 2.5, delay: number = 1) {
    const [value, setValue] = useState(0);
    const rafRef = useRef<number>(0);
    useEffect(() => {
        const timeout = setTimeout(() => {
            let start: number | null = null;
            const step = (ts: number) => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / (duration * 1000), 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.round(eased * target));
                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(step);
                }
            };
            rafRef.current = requestAnimationFrame(step);
        }, delay * 1000);
        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration, delay]);
    return value;
}

function HexGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[4]">
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-hex" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                        <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-hex)" />
            </svg>
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: 4 + (i % 3) * 2,
                        height: 4 + (i % 3) * 2,
                        left: `${15 + i * 14}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        background: i % 2 === 0
                            ? 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(34,197,94,0.2))'
                            : 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(14,165,233,0.2))',
                        boxShadow: i % 2 === 0
                            ? '0 0 8px rgba(14,165,233,0.3)'
                            : '0 0 8px rgba(59,130,246,0.3)',
                    }}
                    animate={{
                        y: [0, -20 - i * 5, 0],
                        x: [0, (i % 2 === 0 ? 8 : -8), 0],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 5 + i * 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    );
}

export function HeroSection() {
    const t = useTranslations('HeroSection');
    const cumplimiento = useCountUp(100, 2.5, 1.5);
    const heroFeatures = t.raw('features') as string[];
    const heroStats = t.raw('stats') as { val: string; label: string }[];

    return (
        <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/landing/hero-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020810]/90 via-[#020810]/70 to-[#020810]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020810]/70 via-transparent to-[#020810]/50" />
            </div>

            <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/8 blur-[120px]" />
                <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#3b82f6]/6 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#22c55e]/4 blur-[80px]" />
            </div>

            <HexGrid />

            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[80%] kyron-accent-line opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 mx-auto lg:ml-0 backdrop-blur-sm"
                        >
                            <span className="kyron-dot animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/80">{t('badge')}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[1.02]"
                        >
                            <span className="block text-white">{t('title_line1')}</span>
                            <span className="block text-white">{t('title_line2')}</span>
                            <span className="block bg-gradient-to-r from-[#0ea5e9] via-[#3b82f6] to-[#22c55e] bg-clip-text text-transparent italic animate-gradient-flow" style={{ backgroundSize: '200% 200%' }}>
                                {t('title_line3')}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="text-base md:text-lg text-white/55 max-w-lg mx-auto lg:ml-0 font-medium leading-relaxed"
                        >
                            {t('subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                        >
                            <Button asChild size="lg" className="relative h-14 px-10 text-xs font-black uppercase tracking-widest rounded-2xl overflow-hidden group border-0 transition-all duration-500 kyron-gradient-bg text-white shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)]">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-14 px-10 text-xs font-black uppercase tracking-widest rounded-2xl border-white/15 bg-white/5 text-white/80 hover:border-[#0ea5e9]/30 hover:bg-white/10 hover:text-white transition-all duration-500 backdrop-blur-sm">
                                <Link href="/manual-usuario" className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    {t('cta_secondary')}
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.55 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-4"
                        >
                            {heroFeatures.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">{feat}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-6 relative"
                    >
                        <div className="relative mx-auto max-w-[560px] lg:max-w-none">
                            <div className="absolute -inset-6 rounded-[2.5rem] opacity-40" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(59,130,246,0.12), rgba(34,197,94,0.12))', filter: 'blur(30px)' }} />
                            
                            <div className="relative rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
                                <Image
                                    src="/images/landing/hero-dashboard.png"
                                    alt="System Kyron Dashboard"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/40 via-transparent to-transparent" />
                            </div>

                            <div className="hidden sm:block absolute -bottom-4 -left-4 md:-left-8 rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] animate-float-slow border border-white/10 backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(10,22,40,0.85))' }}>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl flex items-center justify-center kyron-gradient-bg">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white/50">{t('compliance')}</p>
                                        <p className="text-base sm:text-lg font-black text-[#22c55e] tabular-nums">{cumplimiento}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:block absolute -top-3 -right-3 md:-right-6 rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] animate-float-slow-reverse border border-white/10 backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(10,22,40,0.85))' }}>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] flex items-center justify-center">
                                        <Hexagon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white/50">{t('modules_label')}</p>
                                        <p className="text-base sm:text-lg font-black text-[#0ea5e9]">{t('modules_value')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020810] to-transparent z-[5]" />

            <div className="absolute bottom-6 left-0 right-0 z-10">
                <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {heroStats.map((s, i) => {
                            const gradients = [
                                { gradient: "from-[#0ea5e9]/20 to-[#0ea5e9]/5", text: "text-[#0ea5e9]" },
                                { gradient: "from-[#3b82f6]/20 to-[#3b82f6]/5", text: "text-[#3b82f6]" },
                                { gradient: "from-[#06b6d4]/20 to-[#06b6d4]/5", text: "text-[#06b6d4]" },
                                { gradient: "from-[#22c55e]/20 to-[#22c55e]/5", text: "text-[#22c55e]" },
                            ];
                            const g = gradients[i % gradients.length];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className={`flex flex-col items-center gap-0.5 p-3 rounded-2xl bg-gradient-to-b ${g.gradient} border border-white/5 backdrop-blur-sm`}
                                >
                                    <p className={`text-sm font-black leading-none ${g.text}`}>{s.val}</p>
                                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{s.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
