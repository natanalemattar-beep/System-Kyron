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
import { VideoModal } from "./video-modal";

// ─── HELPER COMPONENTS ────────────────────────────────

// Hook removed as it was unused and causing lint errors in Vercel build


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

    // 5-Layer Parallax System
    // 4-Layer active Parallax System (Unused Layer 1 removed for Vercel build stability)

    const yLayer2 = useTransform(scrollYProgress, [0, 1], [0, 100]); // Stats/Badges
    const yLayer3 = useTransform(scrollYProgress, [0, 1], [0, -50]); // Main Text (Counter-scroll)
    const yLayer4 = useTransform(scrollYProgress, [0, 1], [0, 40]);  // Dashboard
    const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.85]);


    const [liveStats, setLiveStats] = useState({ totalUsuarios: 0 });
    const [videoOpen, setVideoOpen] = useState(false);
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
        <>
            <section 
                id="inicio" 
                ref={containerRef}
                className="relative min-h-[100svh] flex flex-col items-center justify-start lg:justify-center overflow-hidden pt-32 pb-10 md:pt-28 md:pb-0"
            >
                <VideoHeroBg />
                
                {/* Diffused Gradient Background Glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[120px] animate-pulse-slow" />
                </div>
                    <div className="w-full container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full py-8 lg:py-16">

                        <motion.div 
                            style={{ y: yLayer3, opacity: opacityHero }}
                            className="lg:col-span-7 space-y-8 text-center lg:text-left"
                        >
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
                                        <span className="block relative">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-gradient-flow bg-[length:300%_100%]">
                                                {t('title_line2')}
                                            </span>
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
                                    <motion.div whileHover={{ scale: 1.05, translateZ: 20 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                        <Button asChild size="lg" className="h-16 px-12 text-xs font-black uppercase tracking-[0.25em] rounded-2xl overflow-hidden group border-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-emerald-600 bg-size-200 animate-gradient-flow text-white shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.7)] transition-all duration-500 active:scale-95 shine-effect" aria-label="Registrarse ahora en el ecosistema">
                                            <Link href="/login" className="flex items-center gap-3">
                                                {t('cta_main')} <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                            </Link>
                                        </Button>
                                    </motion.div>
                                    
                                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={() => setVideoOpen(true)}
                                            className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-xl group"
                                            aria-label="Ver tutorial de registro en video"
                                        >
                                            <span className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                                    <Play className="h-3 w-3 fill-current ml-0.5" />
                                                </div>
                                                {t('cta_secondary')}
                                            </span>
                                        </Button>
                                    </motion.div>
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
                        </motion.div>

                        <div className="hidden lg:block lg:col-span-5 relative">
                            <motion.div
                                style={{ 
                                    y: yLayer4, 
                                    scale: scaleHero, 
                                    opacity: opacityHero 
                                }}
                                initial={{ opacity: 0, x: 40, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10"
                            >
                                {/* Main Dashboard Preview Container */}
                                <div className="relative glass-elite p-3 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-white/10 hover:border-white/20 transition-all duration-700 group perspective-2000">
                                    <motion.div 
                                        whileHover={{ rotateY: -12, rotateX: 8, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                        className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-950"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />
                                        
                                        {/* Holographic Scanline */}
                                        <motion.div 
                                            animate={{ top: ['-10%', '110%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
                                        />

                                        {/* Hud Grid Overlay */}
                                        <div className="absolute inset-0 hud-grid opacity-10 z-10 pointer-events-none" />

                                        <ThemeImage
                                            darkSrc="/images/landing/hero-dashboard-dark.jpg"
                                            lightSrc="/images/landing/hero-dashboard-light.jpg"
                                            alt="Panel de control principal Kyron Elite mostrando estadísticas y gráficas en tiempo real"
                                            width={1000}
                                            height={600}
                                            className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                                            priority={true}
                                        />
                                        
                                        <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
                                            <div className="glass-elite px-4 py-2 rounded-2xl border-white/20 backdrop-blur-3xl shadow-glow-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span className="text-[10px] font-black text-white tracking-widest tabular-nums uppercase">Protocolo Alfa Activo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Decorative HUD Glow */}
                                    <div className="absolute -inset-4 bg-cyan-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                                </div>

                                {/* Floating Context Cards - Re-positioned for safety */}
                                <FloatingCard className="-top-6 -left-12 p-5 glass-elite shadow-glow-sm border-cyan-500/20 animate-float-slow" delay={1.2}>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{t('live_users_label') || "USUARIOS ELITE"}</p>
                                            <p className="text-xl font-black text-white tabular-nums">{liveStats ? liveStats.totalUsuarios.toLocaleString() : "2,840"}</p>
                                        </div>
                                    </div>
                                </FloatingCard>

                                <FloatingCard className="-bottom-8 -right-6 p-5 glass-elite shadow-glow-sm border-emerald-500/20 animate-float-slow-reverse" delay={1.5}>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                                            <Shield className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">ENCRIPTACIÓN</p>
                                            <p className="text-xl font-black text-white uppercase tracking-tighter">AES-256</p>
                                        </div>
                                    </div>
                                </FloatingCard>
                            </motion.div>
                        </div>
                    </div>
                    </div>

                <motion.div 
                    style={{ y: yLayer2 }}
                    className="w-full bg-gradient-to-b from-transparent via-[#050816]/50 to-[#050816] relative z-20 pb-20 mt-16"
                >
                    <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                            {heroStats.map((stat, i) => (
                                <ScrollReveal key={stat.label} delay={0.1 * i}>
                                    <div className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 shadow-2xl overflow-hidden">
                                        {/* HUD accent corner */}
                                        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                                            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-cyan-500/40 rounded-full animate-pulse" />
                                            <div className="absolute top-3 right-3 w-[1px] h-4 bg-cyan-500/20" />
                                            <div className="absolute top-3 right-3 w-4 h-[1px] bg-cyan-500/20" />
                                        </div>
                                        
                                        <div className="relative z-10 text-center md:text-left">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 group-hover:text-cyan-400 transition-colors duration-300">{stat.label}</p>
                                            <p className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left">{stat.val}</p>
                                            
                                            {/* Progress bar HUD */}
                                            <div className="mt-6 h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '85%' }}
                                                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                                                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-500"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Sub-glow effect */}
                                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>
            <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoId="dQw4w9WgXcQ" />
        </>
    );
}

