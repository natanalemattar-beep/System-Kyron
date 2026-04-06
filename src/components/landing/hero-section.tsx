'use client';

import { ArrowRight, Play, CheckCircle2, Sparkles, Shield, Zap, Globe, TrendingUp, Receipt, Users, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
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

function AnimatedGrid({ reduced }: { reduced?: boolean }) {
    if (reduced) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[4]">
            <svg className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-grid-fine" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M40 0L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid-fine)" />
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
        </div>
    );
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            className={cn("absolute rounded-2xl liquid-glass shadow-xl border border-white/[0.08] dark:border-white/[0.06] backdrop-blur-xl", className)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
            {children}
        </motion.div>
    );
}

function TypingText({ texts, interval = 3000 }: { texts: string[]; interval?: number }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIndex(i => (i + 1) % texts.length), interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);

    return (
        <span className="block overflow-visible">
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="liquid-glass-text italic"
            >
                {texts[index]}
            </motion.span>
        </span>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
    })
};

const trustLogos = [
    { name: "SENIAT", icon: Shield },
    { name: "BCV", icon: Landmark },
    { name: "VEN-NIF", icon: Receipt },
    { name: "AES-256", icon: Shield },
];


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

    const rotatingTexts = useMemo(() => [
        t('title_line3'),
        'IA Integrada',
        'Riesgo Cero',
    ], [t]);

    return (
        <section id="inicio" className="relative min-h-screen flex flex-col items-center lg:justify-center overflow-x-clip">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/landing/hero-bg-light.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={85}
                    className={`object-cover transition-opacity duration-700 ${isDark ? 'opacity-15' : 'opacity-100'}`}
                    priority
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${isDark
                    ? 'bg-gradient-to-b from-[#0a0e1a]/95 via-[#0d1117]/90 to-[#0a0e1a]/95'
                    : 'bg-gradient-to-b from-[#e8f0fe]/92 via-[#edf2fb]/75 to-[#e8f0fe]'
                }`} />
                <div className={`absolute inset-0 transition-colors duration-700 ${isDark
                    ? 'bg-gradient-to-r from-[#0a0e1a]/80 via-transparent to-[#0a0e1a]/60'
                    : 'bg-gradient-to-r from-[#e8f0fe]/70 via-transparent to-[#e8f0fe]/50'
                }`} />
            </div>

            {config.enableBlur && (
                <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
                    <motion.div
                        className={`absolute top-[15%] -left-20 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 ${isDark ? 'bg-[#0ea5e9]/[0.07]' : 'bg-[#0ea5e9]/[0.10]'}`}
                        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className={`absolute bottom-[20%] right-[-5%] w-[450px] h-[450px] rounded-full blur-[100px] transition-colors duration-700 ${isDark ? 'bg-[#8b5cf6]/[0.05]' : 'bg-[#8b5cf6]/[0.08]'}`}
                        animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                    <motion.div
                        className={`absolute top-[40%] left-[40%] w-[350px] h-[350px] rounded-full blur-[80px] transition-colors duration-700 ${isDark ? 'bg-[#22c55e]/[0.04]' : 'bg-[#22c55e]/[0.07]'}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    />
                </div>
            )}

            {config.enableParticles && <AnimatedGrid reduced={tier === 'low'} />}

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10 pt-24 pb-8 sm:pt-28 md:pt-36 md:pb-24 lg:pb-48 flex-1 flex items-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
                        <motion.div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full liquid-glass-subtle mx-auto lg:ml-0"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.05}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">{t('badge')}</span>
                        </motion.div>

                        <motion.h1
                            className="text-[clamp(2rem,5.8vw,4.75rem)] font-extrabold tracking-tight uppercase leading-[0.95]"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                        >
                            <span className="block text-foreground">{t('title_line1')}</span>
                            <span className="block text-foreground">{t('title_line2')}</span>
                            <TypingText texts={rotatingTexts} interval={3500} />
                        </motion.h1>

                        <motion.p
                            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 font-medium leading-relaxed"
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
                            <Button asChild size="lg" className="relative h-13 sm:h-14 px-8 sm:px-10 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl overflow-hidden group border-0 transition-all duration-500 kyron-gradient-bg text-white shadow-kyron hover:shadow-[0_16px_48px_-8px_rgba(14,165,233,0.35)] hover:scale-[1.02]">
                                <Link href="/login" className="flex items-center gap-2 sm:gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-13 sm:h-14 px-8 sm:px-10 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl border-border/30 bg-muted/30 text-foreground/80 hover:border-[#0ea5e9]/30 hover:bg-muted/60 hover:text-foreground transition-all duration-500 backdrop-blur-sm hover:scale-[1.02]">
                                <Link href="/manual-usuario" className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    {t('cta_secondary')}
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2.5 pt-2"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.25}
                        >
                            {heroFeatures.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 group/feat">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e] group-hover/feat:scale-110 transition-transform" />
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{feat}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-center lg:justify-start gap-6 pt-4 opacity-50"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.35}
                        >
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Respaldado por</span>
                            <div className="flex items-center gap-4">
                                {trustLogos.map((logo, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-muted-foreground/60 hover:text-foreground/60 transition-colors">
                                        <logo.icon className="h-3.5 w-3.5" />
                                        <span className="text-[10px] font-bold tracking-wider">{logo.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hidden lg:block lg:col-span-6 relative"
                        initial={{ opacity: 0, x: 60, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative mx-auto max-w-[580px] lg:max-w-none">
                            {config.enableBlur && (
                                <div className="absolute -inset-8 rounded-[3rem] opacity-40" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.10), rgba(34,197,94,0.10))', filter: 'blur(40px)' }} />
                            )}

                            <div className={`relative rounded-[1.5rem] overflow-hidden border transition-all duration-700 ${isDark
                                ? 'border-white/10 shadow-[0_25px_70px_-15px_rgba(14,165,233,0.12),0_10px_30px_-10px_rgba(0,0,0,0.5)]'
                                : 'border-blue-200/50 shadow-[0_25px_70px_-15px_rgba(14,165,233,0.18),0_10px_30px_-10px_rgba(0,0,0,0.08)]'
                            }`}>
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9]/50 to-transparent" />
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
                                    ? 'bg-gradient-to-t from-[#0a0e1a]/50 via-transparent to-transparent'
                                    : 'bg-gradient-to-t from-[#e8f0fe]/40 via-transparent to-transparent'
                                }`} />
                            </div>

                            <FloatingCard className="hidden sm:flex -top-4 -right-4 md:-right-8 p-3 sm:p-4 items-center gap-3" delay={0.5}>
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center kyron-gradient-bg shadow-lg shadow-cyan-500/20">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Módulos</p>
                                    <p className="text-lg font-extrabold text-[#22c55e] tabular-nums">{modulesCount}+</p>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="hidden sm:flex -bottom-3 -left-4 md:-left-8 p-3 sm:p-4 items-center gap-3" delay={0.7}>
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Automatizaciones</p>
                                    <p className="text-lg font-extrabold text-violet-400 tabular-nums">{automationsCount}</p>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="hidden xl:flex top-1/2 -translate-y-1/2 -right-12 p-2.5 items-center gap-2" delay={0.9}>
                                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-600">
                                    <Shield className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">AES-256</p>
                                    <p className="text-[9px] text-muted-foreground font-medium">Cifrado activo</p>
                                </div>
                            </FloatingCard>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-44 z-[5] transition-colors duration-700 ${isDark
                ? 'bg-gradient-to-t from-[hsl(224,28%,8%)] via-[hsl(224,28%,8%)]/70 to-transparent'
                : 'bg-gradient-to-t from-background via-background/70 to-transparent'
            }`} />

            <motion.div
                className="relative lg:absolute lg:bottom-6 left-0 right-0 z-10 pb-8 lg:pb-0 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {heroStats.map((s, i) => {
                            const gradients = [
                                { text: "text-[#0ea5e9]", icon: TrendingUp },
                                { text: "text-[#3b82f6]", icon: Globe },
                                { text: "text-[#06b6d4]", icon: Users },
                                { text: "text-[#22c55e]", icon: Shield },
                            ];
                            const g = gradients[i % gradients.length];
                            return (
                                <motion.div
                                    key={i}
                                    className="group flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl sm:rounded-2xl liquid-glass-subtle transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default"
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                >
                                    <g.icon className={cn("h-4 w-4 mb-0.5 opacity-40 group-hover:opacity-70 transition-opacity", g.text)} />
                                    <p className={`text-sm sm:text-base font-extrabold leading-none ${g.text}`}>{s.val}</p>
                                    <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-widest text-center">{s.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
