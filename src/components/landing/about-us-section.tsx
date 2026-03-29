'use client';

import { Card } from "@/components/ui/card";
import { ShieldCheck, Zap, Lock, Cpu, Globe, TrendingUp } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SiteStats {
    totalUsuarios: number;
    totalEmpresas: number;
    cumplimiento: number;
    erroresFiscales: number;
}

const Counter = ({ from, to, duration = 1.5 }: { from: number, to: number, duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(from);
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            animate(count, to, { duration });
        }
    }, [count, inView, to, duration]);

    useEffect(() => {
        return rounded.on('change', (latest: number) => setDisplayValue(latest));
    }, [rounded]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const pillars = [
    { icon: Lock, label: "AES-256", desc: "Cifrado militar", color: "text-blue-600 dark:text-blue-400", bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5", border: "border-blue-500/15", glow: "hover:shadow-[0_8px_25px_-8px_rgba(59,130,246,0.3)]" },
    { icon: Globe, label: "VEN-NIF", desc: "Cumplimiento fiscal", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/15", glow: "hover:shadow-[0_8px_25px_-8px_rgba(16,185,129,0.3)]" },
    { icon: Cpu, label: "Gemini 2.0", desc: "IA integrada", color: "text-violet-600 dark:text-violet-400", bg: "bg-gradient-to-br from-violet-500/20 to-violet-500/5", border: "border-violet-500/15", glow: "hover:shadow-[0_8px_25px_-8px_rgba(139,92,246,0.3)]" },
];

const statConfigs = [
    { key: 'totalUsuarios', label: "Usuarios", icon: ShieldCheck, color: "text-primary", gradient: "from-primary/10 via-primary/5 to-transparent", iconColor: "text-primary/50" },
    { key: 'cumplimiento', label: "Cumplimiento", suffix: "%", icon: TrendingUp, color: "text-emerald-500", gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent", iconColor: "text-emerald-500/50" },
    { key: 'totalEmpresas', label: "Empresas", icon: Zap, color: "text-blue-500 dark:text-blue-400", gradient: "from-blue-500/10 via-blue-500/5 to-transparent", iconColor: "text-blue-500/50" }
] as const;

export function AboutUsSection() {
    const [stats, setStats] = useState<SiteStats>({
        totalUsuarios: 0,
        totalEmpresas: 0,
        cumplimiento: 100,
        erroresFiscales: 0,
    });

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then((data: SiteStats) => setStats(data))
            .catch(() => {});
    }, []);

    return (
        <section id="nosotros" className="py-16 md:py-24 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-0 w-[450px] h-[450px] rounded-full bg-primary/8 blur-[150px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    className="text-center space-y-4 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.35em] text-primary mx-auto">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Hecho en Venezuela
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.1]">
                        Construido para <br className="sm:hidden" /><span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>Venezuela</span>
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-lg mx-auto font-medium leading-relaxed">
                        Ingeniería de software diseñada para la excelencia operativa y el cumplimiento normativo total.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {statConfigs.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Card className={cn("glass-card p-7 text-center rounded-[2rem] bg-gradient-to-b bg-card/60 dark:bg-white/[0.02] relative overflow-hidden group shadow-xl border border-border/30 dark:border-white/[0.06] cursor-default transition-all duration-500 hover:shadow-2xl", stat.gradient)}>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent group-hover:to-primary/[0.02] transition-all duration-500" />
                                <div className="absolute top-3 right-3 opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-500">
                                    <stat.icon className="h-14 w-14" />
                                </div>
                                <div className="relative">
                                    <p className={cn("text-4xl font-black italic tracking-tighter mb-1", stat.color)}>
                                        <Counter from={0} to={stats[stat.key]} />{stat.suffix}
                                    </p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {pillars.map((v, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className={cn("flex items-center gap-4 p-5 rounded-3xl border border-border/30 dark:border-white/[0.06] bg-card/50 dark:bg-white/[0.02] group transition-all duration-500 cursor-default", v.glow)}
                        >
                            <div className={cn("p-3 rounded-xl shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border", v.bg, v.border)}>
                                <v.icon className={cn("h-5 w-5", v.color)} />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight text-foreground leading-none mb-1">{v.label}</p>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{v.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
