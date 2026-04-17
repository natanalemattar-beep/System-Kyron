'use client';

import { ArrowRight, Play, Sparkles, Shield, Zap, Globe, TrendingUp, Users, Landmark, Receipt, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeImage } from '@/components/ui/theme-image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { VideoHeroBg } from "./video-hero-bg";


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
                    viewport={{ once: true }}
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
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
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
    const { resolvedTheme } = useTheme();
    const [themeMounted, setThemeMounted] = useState(false);
    const [liveStats, setLiveStats] = useState<{ totalUsuarios: number; totalEmpresas: number } | null>(null);
    useEffect(() => { setThemeMounted(true); }, []);
    useEffect(() => {
        fetch('/api/stats').then(r => r.json()).then(json => {
            const data = json.data ?? json;
            if (data.totalUsuarios !== undefined) setLiveStats(data);
        }).catch(() => {});
    }, []);
    const isDark = themeMounted && resolvedTheme === 'dark';

    const rotatingTexts = t.raw('rotating_words') as string[];

    return (
        <section 
            id="inicio" 
            className="relative min-h-screen flex flex-col items-center lg:justify-center overflow-x-clip pt-20"
        >
            <VideoHeroBg />

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10 pt-16 pb-8 md:pt-24 lg:pb-32 flex-1 flex items-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                        <motion.div
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md transition-all hover:bg-cyan-500/20 group"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.05}
                        >
                            <Sparkles className="h-4 w-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200/80">{t('badge')}</span>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.15}
                            className="space-y-4"
                        >
                            <h1 className="text-[clamp(2.5rem,8vw,5.8rem)] font-black tracking-[-0.04em] leading-[0.95] text-white">
                                <span className="block opacity-90">{t('title_line1')}</span>
                                <span className="block text-glow-cyan mb-2">{t('title_line2')}</span>
                                <div className="h-[1.1em] overflow-visible">
                                    <RotatingWords words={rotatingTexts} interval={3500} />
                                </div>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-lg md:text-xl text-cyan-100/60 max-w-2xl mx-auto lg:ml-0 font-medium leading-relaxed"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.25}
                        >
                            {t('subtitle')}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 pt-4"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.35}
                        >
                            <Button asChild size="lg" className="h-16 px-12 text-xs font-black uppercase tracking-[0.25em] rounded-2xl overflow-hidden group border-0 kyron-gradient-bg text-white shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.7)] transition-all duration-500 hover:scale-[1.05] active:scale-95 shine-effect">
                                <Link href="/login" className="flex items-center gap-3">
                                    {t('cta_main')} <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </Button>
                            
                            <Button variant="outline" asChild size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-xl group hover:scale-[1.02]">
                                <Link href="/manual-usuario" className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Play className="h-3 w-3 fill-current ml-1" />
                                    </div>
                                    {t('cta_secondary')}
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 opacity-50"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.45}
                        >
                            {trustLogos.map((logo, i) => (
                                <div key={i} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all hover:opacity-100">
                                    <logo.icon className="h-4 w-4 text-cyan-400" />
                                    <span className="text-[10px] font-black tracking-widest text-white">{logo.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="hidden lg:block lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="perspective-2000"
                        >
                            <div className="relative glass-elite p-2 rounded-[2.5rem] shadow-2xl border-white/10 hover:border-white/20 transition-all group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/5">
                                    <ThemeImage
                                        darkSrc="/images/landing/hero-dashboard-dark.jpg"
                                        lightSrc="/images/landing/hero-dashboard-light.jpg"
                                        alt="Kyron Elite Dashboard"
                                        width={1000}
                                        height={600}
                                        className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                                        priority
                                    />
                                    
                                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                                        <div className="glass-elite p-3 rounded-2xl border-white/20 backdrop-blur-3xl animate-float-slow">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[10px] font-black text-white/80 tabular-nums">99.9% UPTIME</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <FloatingCard className="top-10 -left-12 p-5 glass-elite animate-float-slow" delay={1.2}>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{t('live_users_label')}</p>
                                        <p className="text-xl font-black text-white">{liveStats?.totalUsuarios.toLocaleString() ?? "2,840"}</p>
                                    </div>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="-bottom-10 -right-8 p-5 glass-elite animate-float-slow-reverse" delay={1.5}>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">SEGURIDAD</p>
                                        <p className="text-xl font-black text-white">MIL-GRADE</p>
                                    </div>
                                </div>
                            </FloatingCard>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gradient-to-b from-transparent to-[#050816] relative z-20 pb-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {heroStats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="glass-elite-interactive p-6 flex flex-col items-center gap-2 group"
                            >
                                <span className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">{s.val}</span>
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-center">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
