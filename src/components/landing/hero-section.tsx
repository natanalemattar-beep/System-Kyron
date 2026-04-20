"use client";

import { ScrollReveal } from "./scroll-reveal";
import { useScroll, useTransform, AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Play, TrendingUp, Shield, Wifi, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VideoHeroBg } from "./video-hero-bg";
import Image from 'next/image';

// ─── HELPER COMPONENTS ────────────────────────────────

function useCountUp(target: number, duration: number = 2.5, delay: number = 1) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = target;
        const totalDuration = duration * 1000;
        const increment = end / (totalDuration / 16);

        const timer = setTimeout(() => {
            const handle = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(handle);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [target, duration, delay]);
    return count;
}

function RotatingWords({ words, interval = 3000 }: { words: string[], interval?: number }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <div className="relative h-[1.1em] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 block text-glow-gold"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

function ThemeImage({ darkSrc, lightSrc, alt, ...props }: any) {
    return <Image src={darkSrc} alt={alt} {...props} />;
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay
                }
            }}
            className={cn("absolute z-30", className)}
        >
            {children}
        </motion.div>
    );
}

// ─── DATA & ANIMATIONS ────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)', scale: 0.97 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }
    })
};

const trustLogos = [
    { name: "SENIAT", icon: Shield },
    { name: "CONATEL", icon: Wifi },
    { name: "BCV", icon: Zap },
    { name: "LOTTT", icon: Shield }
];

const heroStats = [
    { val: "24/7", label: "Soporte Elite" },
    { val: "5G", label: "Red Pro" },
    { val: "12", label: "Portales IA" },
    { val: "100%", label: "Legalidad" }
];

// ─── MAIN COMPONENT ───────────────────────────────────

export function HeroSection() {
    const t = useTranslations('HeroSection');
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const [liveStats, setLiveStats] = useState({ totalUsuarios: 0 });
    const rotatingTexts = t.raw('rotating_words') as string[] || ["Corporativo", "Empresarial", "Soberano", "Elite"];

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(json => {
                const data = json.data ?? json;
                if (data.totalUsuarios !== undefined) {
                    setLiveStats({ totalUsuarios: data.totalUsuarios });
                }
            })
            .catch(() => {});
    }, []);

    return (
        <section 
            id="inicio" 
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center lg:justify-center overflow-x-clip pt-20"
        >
            <VideoHeroBg />
            
            {/* Diffused Gradient Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[120px] animate-pulse-slow" />
            </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">

                    <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                        <ScrollReveal delay={0.1}>
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md transition-all hover:bg-amber-500/20 group shadow-glow-sm">
                                <Sparkles className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/80">Líneas · eSIM · Gestión Elite</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} y={40}>
                            <div className="space-y-4">
                                <h1 className="text-[clamp(2.5rem,8vw,5.8rem)] font-black tracking-[-0.04em] leading-[0.95] text-white text-balance" id="hero-title">
                                    <span className="block opacity-90">{t('title_line1')}</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] mb-2">
                                        {t('title_line2')}
                                    </span>
                                    <RotatingWords words={rotatingTexts} interval={3500} />
                                </h1>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3} y={20}>
                            <p className="text-lg md:text-xl text-slate-100/65 max-w-2xl mx-auto lg:ml-0 font-medium leading-relaxed text-pretty">
                                Infraestructura móvil de grado empresarial, gestión fiscal automatizada y consultoría con IA. Todo en un ecosistema unificado para el sector privado venezolano.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4} scale={0.95}>
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 pt-4">
                                <Button asChild size="lg" className="h-16 px-12 text-xs font-black uppercase tracking-[0.25em] rounded-2xl overflow-hidden group border-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-emerald-600 bg-size-200 animate-gradient-flow text-white shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.7)] transition-all duration-500 hover:scale-[1.05] active:scale-95 shine-effect" aria-label="Registrarse ahora en el ecosistema">
                                    <Link href="/login" className="flex items-center gap-3">
                                        {t('cta_main')} <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                                
                                <Button variant="outline" asChild size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-xl group hover:scale-[1.02]" aria-label="Ver planes y precios">
                                    <Link href="#pricing" className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                            <Play className="h-3 w-3 fill-current ml-1" />
                                        </div>
                                        {t('cta_secondary')}
                                    </Link>
                                </Button>
                            </div>
                        </ScrollReveal>

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
                            style={{ 
                                y: yParallax, 
                                scale: scaleParallax, 
                                opacity: opacityParallax 
                            }}
                            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{t('live_users_label') || "USUARIOS ACTIVOS"}</p>
                                        <p className="text-xl font-black text-white">{liveStats ? liveStats.totalUsuarios.toLocaleString() : "2,840"}</p>
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
                                className="glass-elite-interactive p-6 flex flex-col items-center gap-2 group rounded-3xl"
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
