'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import {
    Zap, Brain, Globe, Lock, CheckCircle2,
    X, ArrowRight, Sparkles, Server, Clock, BadgeCheck
} from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const differentiatorConfigs = [
    { icon: Globe, color: 'text-blue-400', gradient: 'from-blue-500 to-blue-700', accent: 'from-blue-500/15 to-blue-500/5', border: 'border-blue-500/15', glow: 'group-hover:shadow-blue-500/10', visual: '🇻🇪' },
    { icon: Brain, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-700', accent: 'from-violet-500/15 to-violet-500/5', border: 'border-violet-500/15', glow: 'group-hover:shadow-violet-500/10', badge: 'IA', visual: '🧠' },
    { icon: Lock, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-700', accent: 'from-emerald-500/15 to-emerald-500/5', border: 'border-emerald-500/15', glow: 'group-hover:shadow-emerald-500/10', visual: '🔐' },
    { icon: Zap, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-700', accent: 'from-amber-500/15 to-amber-500/5', border: 'border-amber-500/15', glow: 'group-hover:shadow-amber-500/10', visual: '⚡' },
    { icon: Server, color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-700', accent: 'from-cyan-500/15 to-cyan-500/5', border: 'border-cyan-500/15', glow: 'group-hover:shadow-cyan-500/10', visual: '📦' },
    { icon: Clock, color: 'text-rose-400', gradient: 'from-rose-500 to-pink-700', accent: 'from-rose-500/15 to-rose-500/5', border: 'border-rose-500/15', glow: 'group-hover:shadow-rose-500/10', visual: '📊' },
];

export function WhyKyronSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('WhyKyronSection');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const differentiators = t.raw('differentiators') as Array<{ title: string; description: string }>;
    const comparisonRows = t.raw('comparison_rows') as string[];

    return (
        <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-slate-50/60 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] dark:bg-indigo-500/[0.02] blur-[150px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] dark:bg-blue-500/[0.02] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-20 md:mb-24"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400 mx-auto mb-6">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        {t('title_prefix')}{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent italic">{t('title_highlight')}</span>?
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
                    {differentiators.map((item, i) => {
                        const config = differentiatorConfigs[i];
                        if (!config) return null;
                        return (
                            <motion.div
                                key={i}
                                className={cn(
                                    "group relative p-7 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 cursor-default overflow-hidden",
                                    config.border,
                                    hoveredCard === i ? 'shadow-2xl' : 'shadow-none',
                                    config.glow
                                )}
                                style={{
                                    background: hoveredCard === i
                                        ? 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))'
                                        : 'rgba(255,255,255,0.02)'
                                }}
                                initial={animate ? { opacity: 0, y: 30, scale: 0.95 } : undefined}
                                whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-[1]", config.accent)} />

                                <div className="flex items-start gap-4">
                                    <div className={cn("p-3.5 rounded-2xl bg-gradient-to-br shrink-0 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", config.gradient)}>
                                        <config.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="space-y-2.5 min-w-0">
                                        <h3 className={cn("text-sm font-bold uppercase tracking-tight flex items-center gap-2", config.color)}>
                                            {item.title}
                                            {config.badge && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/20 text-[7px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                                                    <Sparkles className="h-2 w-2" /> {config.badge}
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-[12px] text-muted-foreground/60 font-medium leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 text-3xl opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 group-hover:scale-125 transform">
                                    {config.visual}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    className="relative"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-3 uppercase">
                            {t('comparison_title_kyron')} <span className="text-muted-foreground/40 font-medium text-lg lowercase">{t('comparison_vs')}</span>{' '}
                            <span className="text-muted-foreground/60">{t('comparison_title_generic')}</span>
                        </h3>
                        <p className="text-sm text-muted-foreground/50 font-medium">
                            {t('comparison_subtitle')}
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto rounded-2xl liquid-glass overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto_auto] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/30">
                            <div className="px-3 sm:px-5 py-3.5">{t('comparison_header')}</div>
                            <div className="px-3 sm:px-5 py-3.5 text-center min-w-[80px] sm:min-w-[120px] kyron-gradient-text">System Kyron</div>
                            <div className="px-3 sm:px-5 py-3.5 text-center min-w-[80px] sm:min-w-[120px]">{t('comparison_title_generic')}</div>
                        </div>
                        {comparisonRows.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="grid grid-cols-[1fr_auto_auto] items-center border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                                initial={animate ? { opacity: 0, x: -15 } : undefined}
                                whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * i, duration: 0.5 }}
                            >
                                <div className="px-3 sm:px-5 py-3 text-[11px] sm:text-xs font-medium text-foreground/80">
                                    {feature}
                                </div>
                                <div className="px-3 sm:px-5 py-3 text-center min-w-[80px] sm:min-w-[120px]">
                                    <CheckCircle2 className="h-[18px] w-[18px] text-emerald-500 mx-auto" />
                                </div>
                                <div className="px-3 sm:px-5 py-3 text-center min-w-[80px] sm:min-w-[120px]">
                                    <X className="h-4 w-4 text-red-400/60 mx-auto" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="mt-14 flex justify-center"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <Link href="/register" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
