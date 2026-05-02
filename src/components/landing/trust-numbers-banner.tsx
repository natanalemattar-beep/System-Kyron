'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shield, Building2, Cpu, CircleCheck, Lock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start: number | null = null;
        const duration = 2500;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{value.toLocaleString()}{suffix}
        </span>
    );
}

const metricsMeta = [
    { target: 19, suffix: '', icon: Zap, gradient: 'from-cyan-400 to-cyan-600', text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { target: 9, suffix: '+', icon: Building2, gradient: 'from-blue-400 to-blue-600', text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { target: 256, suffix: '-bit', icon: Lock, gradient: 'from-emerald-400 to-emerald-600', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { target: 100, suffix: '%', icon: CircleCheck, gradient: 'from-violet-400 to-violet-600', text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { target: 6, suffix: '', icon: Shield, gradient: 'from-amber-400 to-amber-600', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

export function TrustNumbersBanner() {
    const t = useTranslations('TrustNumbersBanner');
    const labels = t.raw('metrics') as string[];

    return (
        <section className="relative py-20 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(14,165,233,0.06),transparent_60%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                    {metricsMeta.map((metric, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                "group flex flex-col items-center text-center gap-3 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default",
                                metric.border,
                                metric.bg
                            )}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className={cn("p-2.5 rounded-xl bg-gradient-to-br", metric.gradient, "shadow-lg")}>
                                <metric.icon className="h-4 w-4 text-white" />
                            </div>
                            <p className={cn("text-3xl sm:text-4xl md:text-5xl font-black tracking-tight", metric.text)}>
                                <AnimatedCounter target={metric.target} suffix={metric.suffix} />
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35">
                                {labels[i]}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
