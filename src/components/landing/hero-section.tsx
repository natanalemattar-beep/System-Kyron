'use client';

import { ArrowRight, Play, Sparkles, Shield, Zap, Globe, TrendingUp, Users, Landmark, Receipt, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { ThemeImage } from '@/components/ui/theme-image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

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

function RotatingWords({ words, interval = 3000 }: { words: string[]; interval?: number }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className="inline-block relative min-w-[200px] sm:min-w-[280px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            className={cn(
                "absolute rounded-2xl bg-white/[0.07] dark:bg-white/[0.05] shadow-2xl border border-white/[0.1] dark:border-white/[0.08] backdrop-blur-2xl",
                className
            )}
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

function ParticleField({ reduced }: { reduced?: boolean }) {
    if (reduced) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[4]">
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '50px 50px'
            }} />
        </div>
    );
}

const trustLogos = [
    { name: "SENIAT", icon: Shield },
    { name: "BCV", icon: Landmark },
    { name: "VEN-NIF", icon: Receipt },
    { name: "AES-256", icon: Shield },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
    })
};

export function HeroSection() {
    const t = useTranslations('HeroSection');
    const modulesCount = useCountUp(9, 2.5, 1);
    const automationsCount = useCountUp(19, 3, 1.3);
    const heroFeatures = t.raw('features') as string[];
    const heroStats = t.raw('stats') as { val: string; label: string }[];
    const { tier, config } = useDevicePerformance();
    const { resolvedTheme } = useTheme();
    const [themeMounted, setThemeMounted] = useState(false);
    useEffect(() => { setThemeMounted(true); }, []);
    const isDark = themeMounted && resolvedTheme === 'dark';

    const rotatingTexts = t.raw('rotating_words') as string[];

    return (
        <section id="inicio" className="relative min-h-screen flex flex-col items-center lg:justify-center overflow-x-clip">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/landing/hero-bg-light.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={85}
                    className={`object-cover transition-opacity duration-700 ${isDark ? 'opacity-10' : 'opacity-100'}`}
                    priority
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${isDark
                    ? 'bg-gradient-to-b from-[#050816]/98 via-[#080c1a]/95 to-[#0a0e1a]/98'
                    : 'bg-gradient-to-b from-[#e8f0fe]/92 via-[#edf2fb]/75 to-[#e8f0fe]'
                }`} />
                <div className={`absolute inset-0 transition-colors duration-700 ${isDark
                    ? 'bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(14,165,233,0.08),transparent_70%)]'
                    : 'bg-gradient-to-r from-[#e8f0fe]/70 via-transparent to-[#e8f0fe]/50'
                }`} />
            </div>

            {config.enableBlur && (
                <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
                    <motion.div
                        className={`absolute top-[10%] -left-32 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-700 ${isDark ? 'bg-cyan-500/[0.06]' : 'bg-[#0ea5e9]/[0.10]'}`}
                        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className={`absolute bottom-[15%] right-[-8%] w-[500px] h-[500px] rounded-full blur-[130px] transition-colors duration-700 ${isDark ? 'bg-violet-500/[0.05]' : 'bg-[#8b5cf6]/[0.08]'}`}
                        animate={{ scale: [1, 1.15, 1], y: [0, -30, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    />
                    <motion.div
                        className={`absolute top-[50%] left-[35%] w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-700 ${isDark ? 'bg-emerald-500/[0.03]' : 'bg-[#22c55e]/[0.06]'}`}
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
                    />
                </div>
            )}

            {config.enableParticles && <ParticleField reduced={tier === 'low'} />}

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10 pt-28 pb-8 sm:pt-32 md:pt-40 md:pb-24 lg:pb-48 flex-1 flex items-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    <div className="lg:col-span-6 space-y-7 sm:space-y-9 text-center lg:text-left">
                        <motion.div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] mx-auto lg:ml-0"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.05}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/70">{t('badge')}</span>
                        </motion.div>

                        <motion.h1
                            className="text-[clamp(2.2rem,7vw,5.5rem)] font-black tracking-[-0.02em] leading-[0.9]"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.15}
                        >
                            <span className="block text-foreground">{t('title_line1')}</span>
                            <span className="block text-foreground">{t('title_line2')}</span>
                            <RotatingWords words={rotatingTexts} interval={3500} />
                        </motion.h1>

                        <motion.p
                            className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto lg:ml-0 font-medium leading-relaxed"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.25}
                        >
                            {t('subtitle')}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.35}
                        >
                            <Button asChild size="lg" className="relative h-14 sm:h-16 px-10 sm:px-12 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-2xl overflow-hidden group border-0 transition-all duration-500 kyron-gradient-bg text-white shadow-kyron hover:shadow-[0_16px_48px_-8px_rgba(14,165,233,0.35)] hover:scale-[1.03]">
                                <Link href="/login" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-14 sm:h-16 px-10 sm:px-12 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-2xl border-2 border-white/[0.1] dark:border-white/[0.08] bg-white/[0.03] text-foreground/80 hover:border-cyan-500/30 hover:bg-white/[0.06] hover:text-foreground transition-all duration-500 backdrop-blur-sm hover:scale-[1.03]">
                                <Link href="/manual-usuario" className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    {t('cta_secondary')}
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.45}
                        >
                            {heroFeatures.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 group/feat">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 group-hover/feat:scale-110 transition-transform" />
                                    <span className="text-[11px] font-semibold text-muted-foreground/60">{feat}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-center lg:justify-start gap-6 pt-4 opacity-40"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.55}
                        >
                            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">{t('backed_by')}</span>
                            <div className="flex items-center gap-5">
                                {trustLogos.map((logo, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-muted-foreground/50 hover:text-foreground/50 transition-colors">
                                        <logo.icon className="h-3.5 w-3.5" />
                                        <span className="text-[10px] font-bold tracking-wider">{logo.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hidden lg:block lg:col-span-6 relative"
                        initial={{ opacity: 0, x: 80, scale: 0.85 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative mx-auto max-w-[580px] lg:max-w-none">
                            {config.enableBlur && (
                                <div className="absolute -inset-12 rounded-[3rem] opacity-30" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.12), rgba(34,197,94,0.10))', filter: 'blur(50px)' }} />
                            )}

                            <div className={`relative rounded-[2rem] overflow-hidden border-2 transition-all duration-700 ${isDark
                                ? 'border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(14,165,233,0.15),0_15px_40px_-15px_rgba(0,0,0,0.6)]'
                                : 'border-blue-200/40 shadow-[0_30px_80px_-20px_rgba(14,165,233,0.2),0_15px_40px_-15px_rgba(0,0,0,0.08)]'
                            }`}>
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                                <ThemeImage
                                    darkSrc="/images/landing/hero-dashboard-dark.jpg"
                                    lightSrc="/images/landing/hero-dashboard-light.jpg"
                                    alt="System Kyron — Centro de Contabilidad"
                                    width={800}
                                    height={450}
                                    quality={75}
                                    className="w-full h-auto"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                                />
                                <div className={`absolute inset-0 transition-colors duration-700 ${isDark
                                    ? 'bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent'
                                    : 'bg-gradient-to-t from-[#e8f0fe]/30 via-transparent to-transparent'
                                }`} />
                            </div>

                            <FloatingCard className="hidden sm:flex -top-6 -right-6 md:-right-10 p-4 items-center gap-3" delay={0.6}>
                                <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t('modules_card')}</p>
                                    <p className="text-xl font-black text-emerald-400 tabular-nums">{modulesCount}+</p>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="hidden sm:flex -bottom-5 -left-6 md:-left-10 p-4 items-center gap-3" delay={0.8}>
                                <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t('automations_card')}</p>
                                    <p className="text-xl font-black text-violet-400 tabular-nums">{automationsCount}</p>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="hidden xl:flex top-1/2 -translate-y-1/2 -right-14 p-3 items-center gap-2" delay={1.0}>
                                <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/20">
                                    <Shield className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.15em]">{t('encryption_label')}</p>
                                    <p className="text-[9px] text-muted-foreground font-medium">{t('encryption_active')}</p>
                                </div>
                            </FloatingCard>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-48 z-[5] transition-colors duration-700 ${isDark
                ? 'bg-gradient-to-t from-[hsl(224,28%,6%)] via-[hsl(224,28%,6%)]/70 to-transparent'
                : 'bg-gradient-to-t from-background via-background/70 to-transparent'
            }`} />

            <motion.div
                className="relative lg:absolute lg:bottom-8 left-0 right-0 z-10 pb-8 lg:pb-0 w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {heroStats.map((s, i) => {
                            const configs = [
                                { text: "text-cyan-400", icon: TrendingUp, hoverGlow: 'hover:shadow-cyan-500/5' },
                                { text: "text-blue-400", icon: Globe, hoverGlow: 'hover:shadow-blue-500/5' },
                                { text: "text-violet-400", icon: Users, hoverGlow: 'hover:shadow-violet-500/5' },
                                { text: "text-emerald-400", icon: Shield, hoverGlow: 'hover:shadow-emerald-500/5' },
                            ];
                            const g = configs[i % configs.length];
                            return (
                                <motion.div
                                    key={i}
                                    className={cn(
                                        "group flex flex-col items-center gap-1.5 p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.12] cursor-default",
                                        g.hoverGlow
                                    )}
                                    initial={{ opacity: 0, y: 25, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.7 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <g.icon className={cn("h-4 w-4 mb-0.5 opacity-40 group-hover:opacity-70 transition-opacity", g.text)} />
                                    <p className={`text-base sm:text-lg font-black leading-none ${g.text}`}>{s.val}</p>
                                    <p className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-[0.2em] text-center">{s.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
