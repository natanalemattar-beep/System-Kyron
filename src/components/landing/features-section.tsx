'use client';

import { Zap, Clock, Gauge, BarChart3, ArrowRight, TrendingUp, Timer, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { Link } from '@/navigation';

function AnimatedBar({ value, maxValue, color, delay = 0 }: { value: number; maxValue: number; color: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const width = (value / maxValue) * 100;

    return (
        <div ref={ref} className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
                className={cn("h-full rounded-full", color)}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${width}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
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
    { color: 'bg-gradient-to-r from-cyan-400 to-blue-500', textColor: 'text-cyan-400', isFastest: true },
    { color: 'bg-gradient-to-r from-orange-400/40 to-orange-500/40', textColor: 'text-orange-400/60' },
    { color: 'bg-gradient-to-r from-red-400/30 to-red-500/30', textColor: 'text-red-400/50' },
    { color: 'bg-gradient-to-r from-gray-400/20 to-gray-500/20', textColor: 'text-gray-400/40' },
];

const metricConfigs = [
    { icon: Timer, color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-700', border: 'border-cyan-500/20', bg: 'bg-cyan-500/5' },
    { icon: TrendingUp, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-700', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
    { icon: Clock, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-700', border: 'border-violet-500/20', bg: 'bg-violet-500/5' },
    { icon: Gauge, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-700', border: 'border-amber-500/20', bg: 'bg-amber-500/5' },
];

export function FeaturesSection() {
    const t = useTranslations('FeaturesSection');
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const competitors = t.raw('competitors') as { name: string; speed: number }[];
    const metrics = t.raw('metrics') as { value: number; suffix: string; label: string }[];

    return (
        <section id="caracteristicas" className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-bl from-violet-50/70 via-fuchsia-50/40 to-rose-50/50 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
                <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/[0.02] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                <motion.div
                    className="mb-20 md:mb-24 space-y-5 text-center"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400 mx-auto">
                        <Zap className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.02em] text-foreground leading-[0.95]">
                        <span className="text-foreground">{t('title_highlight')}</span>{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">{t('title_rest')}</span>
                    </h2>
                    <p className="text-muted-foreground/60 max-w-xl mx-auto font-medium text-base leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
                        initial={animate ? { opacity: 0, x: -30 } : undefined}
                        whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-lg">
                                <Gauge className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">{t('speed_title')}</h3>
                                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/30">{t('speed_subtitle')}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {competitors.map((comp, i) => {
                                const style = competitorStyles[i] || competitorStyles[competitorStyles.length - 1];
                                return (
                                    <div key={comp.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className={cn("text-xs font-bold", style.isFastest ? style.textColor : 'text-muted-foreground/40')}>
                                                {comp.name}
                                                {style.isFastest && (
                                                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[7px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                                                        <Zap className="h-2 w-2" /> {t('fastest')}
                                                    </span>
                                                )}
                                            </span>
                                            <span className={cn("text-xs font-bold tabular-nums", style.textColor)}>
                                                {comp.speed}ms
                                            </span>
                                        </div>
                                        <AnimatedBar value={comp.speed} maxValue={1200} color={style.color} delay={i * 0.15} />
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial={animate ? { opacity: 0, x: 30 } : undefined}
                        whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {metrics.map((metric, i) => {
                            const config = metricConfigs[i];
                            return (
                                <motion.div
                                    key={i}
                                    className={cn(
                                        "group flex flex-col items-center justify-center text-center p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default",
                                        config.border,
                                        config.bg
                                    )}
                                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                >
                                    <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300", config.gradient)}>
                                        <config.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className={cn("text-4xl font-black tracking-tight mb-2", config.color)}>
                                        <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/35 leading-tight">
                                        {metric.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <motion.div
                    className="flex justify-center"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <Link href="/register" className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_8px_32px_-4px_rgba(14,165,233,0.3)] hover:shadow-[0_16px_48px_-8px_rgba(14,165,233,0.4)] hover:scale-[1.03] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
