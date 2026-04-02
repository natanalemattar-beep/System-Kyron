'use client';

import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { ThemeImage } from '@/components/ui/theme-image';

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

function HexGrid({ reduced }: { reduced?: boolean }) {
    if (reduced) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[4]">
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-hex" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                        <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-hex)" />
            </svg>
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 6 + i * 1.5,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: 4 + (i % 3) * 2,
                        height: 4 + (i % 3) * 2,
                        left: `${20 + i * 18}%`,
                        top: `${25 + (i % 3) * 25}%`,
                        background: i % 2 === 0
                            ? 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(34,197,94,0.2))'
                            : 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(14,165,233,0.2))',
                    }}
                />
            ))}
        </div>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
    })
};

export function HeroSection() {
    const t = useTranslations('HeroSection');
    const modulesCount = useCountUp(7, 2, 1);
    const heroFeatures = t.raw('features') as string[];
    const heroStats = t.raw('stats') as { val: string; label: string }[];
    const { tier, config } = useDevicePerformance();

    return (
        <section id="inicio" className="relative min-h-screen flex flex-col items-center lg:justify-center overflow-x-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/landing/hero-bg-light.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={85}
                    className="object-cover dark:opacity-0"
                    priority
                />
                <Image
                    src="/images/landing/hero-bg-dark.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={85}
                    className="object-cover opacity-0 dark:opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#e8f0fe]/90 via-[#edf2fb]/70 to-[#e8f0fe] dark:from-[#020810]/90 dark:via-[#020810]/70 dark:to-[#020810]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#e8f0fe]/70 via-transparent to-[#e8f0fe]/50 dark:from-[#020810]/70 dark:via-transparent dark:to-[#020810]/50" />
            </div>

            {config.enableBlur && (
                <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/[0.12] dark:bg-[#0ea5e9]/[0.04] blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
                    <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#3b82f6]/[0.10] dark:bg-[#3b82f6]/[0.03] blur-[100px] animate-[pulse_12s_ease-in-out_infinite_3s]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#22c55e]/[0.08] dark:bg-[#22c55e]/[0.02] blur-[80px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
                </div>
            )}

            <HexGrid reduced={tier === 'low'} />

            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[80%] kyron-accent-line opacity-30" />

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10 pt-24 pb-8 sm:pt-28 md:pt-36 md:pb-24 flex-1 flex items-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    <div className="lg:col-span-6 space-y-5 sm:space-y-7 text-center lg:text-left">
                        <motion.div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full liquid-glass-subtle mx-auto lg:ml-0"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.05}
                        >
                            <span className="kyron-dot animate-pulse" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80 dark:text-white/80">{t('badge')}</span>
                        </motion.div>

                        <motion.h1
                            className="text-[clamp(1.75rem,6vw,4.5rem)] font-black tracking-tight uppercase leading-[1.02]"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                        >
                            <span className="block text-foreground">{t('title_line1')}</span>
                            <span className="block text-foreground">{t('title_line2')}</span>
                            <span className="block bg-gradient-to-r from-[#0ea5e9] via-[#3b82f6] to-[#22c55e] bg-clip-text text-transparent italic animate-gradient-flow" style={{ backgroundSize: '200% 200%' }}>
                                {t('title_line3')}
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:ml-0 font-medium leading-relaxed"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.15}
                        >
                            {t('subtitle')}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                        >
                            <Button asChild size="lg" className="relative h-12 sm:h-14 px-7 sm:px-10 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl overflow-hidden group border-0 transition-all duration-500 kyron-gradient-bg text-white shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)]">
                                <Link href="/login" className="flex items-center gap-2 sm:gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-12 sm:h-14 px-7 sm:px-10 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl border-border/30 dark:border-white/15 bg-muted/30 dark:bg-white/5 text-foreground/80 dark:text-white/80 hover:border-[#0ea5e9]/30 hover:bg-muted/60 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white transition-all duration-500 backdrop-blur-sm">
                                <Link href="/manual-usuario" className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    {t('cta_secondary')}
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex justify-center lg:justify-start pt-1"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.25}
                        >
                            <Link href="/guia-registro" className="group inline-flex items-center gap-2 text-xs text-foreground/40 dark:text-white/30 hover:text-[#0ea5e9] dark:hover:text-sky-400 transition-colors duration-300">
                                <Play className="h-3 w-3 group-hover:scale-110 transition-transform" />
                                <span>¿Cómo registrarse? — Ver tutorial paso a paso</span>
                                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </Link>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-4"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.3}
                        >
                            {heroFeatures.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{feat}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        className="hidden lg:block lg:col-span-6 relative"
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative mx-auto max-w-[560px] lg:max-w-none">
                            {config.enableBlur && (
                                <div className="absolute -inset-6 rounded-[2.5rem] opacity-40" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(59,130,246,0.12), rgba(34,197,94,0.12))', filter: 'blur(30px)' }} />
                            )}
                            
                            <div className="relative rounded-[1.5rem] overflow-hidden border border-blue-200/50 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
                                <ThemeImage
                                    darkSrc="/images/landing/hero-dashboard-dark.jpg"
                                    lightSrc="/images/landing/hero-dashboard-light.jpg"
                                    alt="System Kyron — Centro de Contabilidad"
                                    width={800}
                                    height={450}
                                    quality={90}
                                    className="w-full h-auto"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#e8f0fe]/50 dark:from-[#020810]/40 via-transparent to-transparent" />
                            </div>

                            <motion.div
                                className="hidden sm:block absolute -top-3 -right-3 md:-right-6 rounded-2xl p-3 sm:p-4 liquid-glass animate-glass-breathe"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl flex items-center justify-center kyron-gradient-bg">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('modules_label')}</p>
                                        <p className="text-base sm:text-lg font-bold text-[#22c55e] tabular-nums">{modulesCount}+</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-[5]" />

            <motion.div
                className="relative lg:absolute lg:bottom-6 left-0 right-0 z-10 pb-8 lg:pb-0 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {heroStats.map((s, i) => {
                            const gradients = [
                                { text: "text-[#0ea5e9]" },
                                { text: "text-[#3b82f6]" },
                                { text: "text-[#06b6d4]" },
                                { text: "text-[#22c55e]" },
                            ];
                            const g = gradients[i % gradients.length];
                            return (
                                <motion.div
                                    key={i}
                                    className="flex flex-col items-center gap-0.5 p-2 sm:p-3 rounded-xl sm:rounded-2xl liquid-glass-subtle transition-all duration-300 hover:-translate-y-0.5"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.55 + i * 0.06, duration: 0.35 }}
                                >
                                    <p className={`text-sm font-bold leading-none ${g.text}`}>{s.val}</p>
                                    <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider sm:tracking-widest">{s.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
