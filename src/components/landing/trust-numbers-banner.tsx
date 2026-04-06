'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shield, Building2, Cpu, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const metrics = [
    { target: 19, suffix: '', label: 'Automatizaciones Activas', icon: Cpu, color: 'text-cyan-600 dark:text-cyan-400' },
    { target: 9, suffix: '+', label: 'Módulos Integrados', icon: Building2, color: 'text-blue-600 dark:text-blue-400' },
    { target: 256, suffix: '-bit', label: 'Cifrado AES', icon: Lock, color: 'text-emerald-600 dark:text-emerald-400' },
    { target: 100, suffix: '%', label: 'Cumplimiento VEN-NIF', icon: CheckCircle2, color: 'text-violet-600 dark:text-violet-400' },
    { target: 6, suffix: '', label: 'Regulaciones Cubiertas', icon: Shield, color: 'text-amber-600 dark:text-amber-400' },
];

export function TrustNumbersBanner() {
    return (
        <section className="relative py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-blue-50/80 to-slate-100 dark:from-[#0a0e1a] dark:via-[#0d1420] dark:to-[#0a0e1a]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.04),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.06),transparent_50%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 dark:via-cyan-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 dark:via-violet-500/20 to-transparent" />

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center text-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <metric.icon className={cn("h-5 w-5 mb-1 opacity-60", metric.color)} />
                            <p className={cn("text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight", metric.color)}>
                                <AnimatedCounter target={metric.target} suffix={metric.suffix} />
                            </p>
                            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-foreground/40">
                                {metric.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
