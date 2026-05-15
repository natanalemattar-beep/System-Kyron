'use client';

import { Zap, Clock, Gauge, ChartColumn, ArrowRight, TrendingUp, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from '@/navigation';
import { ScrollReveal, ScrollRevealGroup } from "./scroll-reveal";

function AnimatedBar({ value, maxValue, color, delay = 0 }: { value: number; maxValue: number; color: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const width = (value / maxValue) * 100;

    return (
        <div ref={ref} className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden border border-white/5">
            <motion.div
                className={cn("h-full rounded-full", color)}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${width}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    );
}

function AnimatedNumber({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target, duration]);

    return <span ref={ref} className="tabular-nums">{value}{suffix}</span>;
}

const competitorStyles = [
    { color: 'bg-gradient-to-r from-cyan-400 to-blue-600', textColor: 'text-cyan-400', isFastest: true },
    { color: 'bg-white/10', textColor: 'text-white/30' },
    { color: 'bg-white/5', textColor: 'text-white/20' },
    { color: 'bg-white/5', textColor: 'text-white/20' },
];

const metricConfigs = [
    { icon: Timer, color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-700', border: 'border-white/5', bg: 'bg-white/2' },
    { icon: TrendingUp, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-700', border: 'border-white/5', bg: 'bg-white/2' },
    { icon: Clock, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-700', border: 'border-white/5', bg: 'bg-white/2' },
    { icon: Gauge, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-700', border: 'border-white/5', bg: 'bg-white/2' },
];

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest", className)}>
            {children}
        </span>
    );
}

export function FeaturesSection() {
    const animate = true;
    const t = useTranslations('FeaturesSection');
    const competitors = t.raw('competitors') as { name: string; speed: number }[];
    const metrics = t.raw('metrics') as { value: number; suffix: string; label: string }[];

    return (
        <section id="caracteristicas" className="py-24 md:py-40 relative overflow-hidden bg-[#050816] scroll-mt-20">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.05] blur-[150px] animate-mesh-drift" />
                <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-[1440px]">
                <ScrollReveal className="mb-24 md:mb-32 space-y-6 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md transition-all group mx-auto">
                        <Zap className="h-4 w-4 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200/80">{t('badge')}</span>
                    </div>
                    
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.04em] leading-[0.95] text-white">
                        <span className="opacity-90">{t('title_highlight')}</span>{' '}
                        <span className="block text-glow-cyan mt-2">{t('title_rest')}</span>
                    </h2>
                    
                    <p className="text-lg text-cyan-100/40 max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('subtitle')}
                    </p>
                </ScrollReveal>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, i) => {
                        const config = metricConfigs[i];
                        return (
                            <ScrollReveal
                                key={i}
                                delay={0.1 * i}
                                className={cn(
                                    "glass-system-kyron-interactive p-8 md:p-10 flex flex-col items-center justify-center group text-center border-white/5 rounded-3xl",
                                    "hover:bg-cyan-500/5 hover:border-cyan-500/20"
                                )}
                            >
                                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6", 
                                    "bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30"
                                )}>
                                    <config.icon className="h-7 w-7 text-cyan-400" />
                                </div>
                                <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3 underline decoration-cyan-500/30 underline-offset-8">
                                    <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                                </span>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/30 text-balance">
                                    {metric.label}
                                </p>
                            </ScrollReveal>
                        );
                    })}
                </div>

                <ScrollReveal className="mt-32 relative group" delay={0.4}>
                    <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl glass-system-kyron-interactive p-4">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div className="p-10 space-y-6">
                                <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                    Kyron Hub 5G
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                                    El Cerebro de tu <span className="text-cyan-400">Infraestructura</span>
                                </h3>
                                <p className="text-lg text-white/40 font-medium leading-relaxed">
                                    Visualiza y gestiona cada nodo de tu empresa en tiempo real. Nuestra interfaz 4.0 convierte la complejidad de los datos en claridad operativa absoluta.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Latencia</p>
                                        <p className="text-xl font-black text-cyan-400">0.4ms</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Disponibilidad</p>
                                        <p className="text-xl font-black text-emerald-400">99.9%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-[2rem] border border-white/10">
                                <img 
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                                    alt="Platform Showcase" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Final CTA Strip */}
                <ScrollReveal
                    className="flex justify-center mt-32"
                    delay={0.5}
                >
                    <Link href="/precios" className="group relative glass-system-kyron px-12 py-6 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 shine-effect block">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                <Gauge className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">
                                EXPLORAR EL ECOSISTEMA KYRON
                            </span>
                            <ArrowRight className="h-5 w-5 text-cyan-400 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
}
