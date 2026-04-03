'use client';

import { Calculator, Users, Smartphone, BrainCircuit, Gavel, Recycle, BarChart3, Landmark, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const featuresMeta = [
    { icon: Calculator, color: "text-blue-600", accent: "from-primary/20 to-blue-600/5", line: "from-primary to-blue-600", dot: "bg-primary" },
    { icon: Users, color: "text-violet-600", accent: "from-violet-500/20 to-violet-600/5", line: "from-violet-500 to-violet-600", dot: "bg-violet-500" },
    { icon: Smartphone, color: "text-blue-600", accent: "from-blue-500/20 to-blue-600/5", line: "from-blue-500 to-blue-600", dot: "bg-blue-500" },
    { icon: BrainCircuit, color: "text-rose-600", accent: "from-rose-500/20 to-rose-600/5", line: "from-rose-500 to-rose-600", dot: "bg-rose-500", featured: true },
    { icon: Gavel, color: "text-amber-600", accent: "from-amber-500/20 to-amber-600/5", line: "from-amber-500 to-amber-600", dot: "bg-amber-500" },
    { icon: Recycle, color: "text-emerald-600", accent: "from-emerald-500/20 to-emerald-600/5", line: "from-emerald-500 to-emerald-600", dot: "bg-emerald-500" },
    { icon: BarChart3, color: "text-cyan-600", accent: "from-cyan-500/20 to-cyan-600/5", line: "from-cyan-500 to-cyan-600", dot: "bg-cyan-500" },
    { icon: Landmark, color: "text-indigo-600", accent: "from-indigo-500/20 to-indigo-600/5", line: "from-indigo-500 to-indigo-600", dot: "bg-indigo-500" },
    { icon: Lock, color: "text-orange-600", accent: "from-orange-500/20 to-orange-600/5", line: "from-orange-500 to-orange-600", dot: "bg-orange-500" },
];

function FeatureRow({ feature, meta, index, animate }: {
    feature: { title: string; description: string };
    meta: typeof featuresMeta[0];
    index: number;
    animate: boolean;
}) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-center"
            initial={animate ? { opacity: 0, y: 40 } : undefined}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className={cn(
                "md:px-8",
                isLeft ? "md:text-right md:order-1" : "md:text-left md:order-3"
            )}>
                <div className={cn(
                    "group relative p-6 rounded-2xl liquid-glass transition-all duration-500 hover:-translate-y-1"
                )}>
                    <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-[1]", meta.accent)} />

                    <div className="relative">
                        <div className={cn("inline-flex items-center gap-2.5 mb-3", isLeft ? "md:flex-row-reverse" : "")}>
                            <div className={cn("p-2.5 rounded-xl border border-border/20 group-hover:scale-110 transition-transform duration-300", `bg-gradient-to-br ${meta.accent}`)}>
                                <meta.icon className={cn("h-5 w-5", meta.color)} />
                            </div>
                            <h3 className={cn("text-sm font-black uppercase tracking-tight flex items-center gap-2", meta.color)}>
                                {feature.title}
                                {meta.featured && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/20 text-[7px] font-black uppercase tracking-widest text-rose-400">
                                        <Sparkles className="h-2 w-2" /> IA
                                    </span>
                                )}
                            </h3>
                        </div>
                        <p className="text-[11.5px] text-muted-foreground font-medium leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col items-center order-2 relative z-10">
                <div className={cn("w-4 h-4 rounded-full border-2 border-background shadow-lg ring-2 ring-offset-0", meta.dot, `ring-${meta.dot.replace('bg-', '')}/30`)}>
                    <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", meta.dot)} />
                </div>
            </div>

            <div className={cn(
                "hidden md:block md:px-8",
                isLeft ? "md:order-3" : "md:order-1"
            )} />
        </motion.div>
    );
}

function TimelineProgress() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={ref} className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
            <div className="absolute inset-0 bg-blue-200/40 rounded-full" />
            <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-violet-500 to-emerald-500 rounded-full origin-top"
                style={{ scaleY, height: '100%' }}
            />
        </div>
    );
}

export function FeaturesSection() {
    const t = useTranslations('FeaturesSection');
    const features = t.raw('features') as { title: string; description: string }[];
    const stats = t.raw('stats') as { val: string; detail: string }[];
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';

    return (
        <section id="caracteristicas" className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-bl from-violet-50/70 via-fuchsia-50/40 to-rose-50/50 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]" style={{ position: 'relative' }}>
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-300/25 to-transparent" />
                <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-violet-400/[0.08] dark:bg-violet-500/[0.04] blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-rose-400/[0.06] dark:bg-rose-500/[0.03] blur-[100px]" />
            </div>
            <div className="container mx-auto px-4 md:px-10 max-w-6xl">

                <motion.div
                    className="mb-16 md:mb-24 space-y-5 text-center"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-subtle text-[9px] font-black uppercase tracking-[0.3em] text-secondary mx-auto">
                        <Sparkles className="h-3 w-3" /> {t('badge')}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.2]">
                        <span className="liquid-glass-highlight">{t('title_highlight')}</span> <br className="hidden sm:block" />
                        <span className="liquid-glass-text italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto font-semibold text-sm leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="relative">
                    <TimelineProgress />

                    <div className="space-y-8 md:space-y-6">
                        {features.map((f, idx) => {
                            const meta = featuresMeta[idx] || featuresMeta[0];
                            return (
                                <FeatureRow
                                    key={f.title}
                                    feature={f}
                                    meta={meta}
                                    index={idx}
                                    animate={animate}
                                />
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {stats.map((r, i) => {
                        const colors = [
                            "text-cyan-600",
                            "text-violet-600",
                            "text-blue-600",
                            "text-emerald-600",
                        ];
                        return (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center gap-2 p-5 rounded-2xl liquid-glass hover:border-primary/20 transition-all duration-300 cursor-default hover:-translate-y-0.5"
                            >
                                <p className={cn("text-lg font-black uppercase tracking-tight", colors[i % colors.length])}>{r.val}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{r.detail}</p>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
