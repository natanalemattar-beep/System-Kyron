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

const diffMeta = [
    { icon: Globe, color: 'text-blue-600 dark:text-blue-400', accent: 'from-blue-500/15 to-blue-500/5', glow: 'group-hover:shadow-blue-500/10' },
    { icon: Brain, color: 'text-violet-600 dark:text-violet-400', accent: 'from-violet-500/15 to-violet-500/5', glow: 'group-hover:shadow-violet-500/10', badge: 'IA' },
    { icon: Lock, color: 'text-emerald-600 dark:text-emerald-400', accent: 'from-emerald-500/15 to-emerald-500/5', glow: 'group-hover:shadow-emerald-500/10' },
    { icon: Zap, color: 'text-amber-600 dark:text-amber-400', accent: 'from-amber-500/15 to-amber-500/5', glow: 'group-hover:shadow-amber-500/10' },
    { icon: Server, color: 'text-cyan-600 dark:text-cyan-400', accent: 'from-cyan-500/15 to-cyan-500/5', glow: 'group-hover:shadow-cyan-500/10' },
    { icon: Clock, color: 'text-rose-600 dark:text-rose-400', accent: 'from-rose-500/15 to-rose-500/5', glow: 'group-hover:shadow-rose-500/10' },
];

export function WhyKyronSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('WhyKyronSection');
    const differentiators = t.raw('differentiators') as Array<{ title: string; description: string }>;
    const comparisonRows = t.raw('comparison_rows') as string[];

    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-slate-50/60 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300/30 dark:via-indigo-500/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/25 dark:via-blue-500/10 to-transparent" />
                <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-400/[0.06] dark:bg-indigo-500/[0.03] blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-400/[0.05] dark:bg-blue-500/[0.02] blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[11px] font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4">
                        {t('title_prefix')}{' '}
                        <span className="liquid-glass-text italic">{t('title_highlight')}</span>?
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                    {diffMeta.map((item, i) => {
                        const diff = differentiators[i];
                        return (
                            <motion.div
                                key={i}
                                className={cn(
                                    "group relative p-6 rounded-2xl liquid-glass transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default",
                                    item.glow
                                )}
                                initial={animate ? { opacity: 0, y: 25, scale: 0.97 } : undefined}
                                whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-[1]", item.accent)} />

                                <div className="flex items-start gap-4">
                                    <div className={cn("p-3 rounded-xl border border-border/20 shrink-0 group-hover:scale-110 transition-transform duration-300", `bg-gradient-to-br ${item.accent}`)}>
                                        <item.icon className={cn("h-5 w-5", item.color)} />
                                    </div>
                                    <div className="space-y-2 min-w-0">
                                        <h3 className={cn("text-sm font-bold uppercase tracking-tight flex items-center gap-2", item.color)}>
                                            {diff.title}
                                            {item.badge && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/20 text-[7px] font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400">
                                                    <Sparkles className="h-2 w-2" /> {item.badge}
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-[11.5px] text-muted-foreground font-medium leading-relaxed">
                                            {diff.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    className="relative"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="text-center mb-10">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-foreground mb-2">
                            System Kyron <span className="text-muted-foreground font-medium lowercase">{t('comparison_title_vs')}</span>{' '}
                            <span className="text-muted-foreground">{t('comparison_title_generic')}</span>
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                            {t('comparison_subtitle')}
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto rounded-2xl liquid-glass overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto_auto] text-[11px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/30">
                            <div className="px-5 py-3.5">{t('comparison_header')}</div>
                            <div className="px-5 py-3.5 text-center min-w-[120px] kyron-gradient-text">System Kyron</div>
                            <div className="px-5 py-3.5 text-center min-w-[120px]">{t('comparison_title_generic')}</div>
                        </div>
                        {comparisonRows.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border/15 last:border-b-0 hover:bg-primary/[0.02] transition-colors"
                                initial={animate ? { opacity: 0, x: -10 } : undefined}
                                whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * i, duration: 0.4 }}
                            >
                                <div className="px-5 py-3 text-xs font-medium text-foreground/80">
                                    {feature}
                                </div>
                                <div className="px-5 py-3 text-center min-w-[120px]">
                                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mx-auto" />
                                </div>
                                <div className="px-5 py-3 text-center min-w-[120px]">
                                    <X className="h-4 w-4 text-red-400/60 mx-auto" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12 flex justify-center"
                    initial={animate ? { opacity: 0, y: 10 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
