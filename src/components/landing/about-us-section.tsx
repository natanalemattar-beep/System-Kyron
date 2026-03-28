'use client';

import { Card } from "@/components/ui/card";
import { ShieldCheck, Zap, Lock, Cpu, Globe } from "lucide-react";
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
    { icon: Lock, label: "AES-256", desc: "Cifrado militar", color: "text-blue-600 dark:text-blue-400", bg: "bg-gradient-to-br from-blue-500/15 to-blue-500/5", border: "border-blue-500/15" },
    { icon: Globe, label: "VEN-NIF", desc: "Cumplimiento fiscal", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5", border: "border-emerald-500/15" },
    { icon: Cpu, label: "Gemini 2.0", desc: "IA integrada", color: "text-violet-600 dark:text-violet-400", bg: "bg-gradient-to-br from-violet-500/15 to-violet-500/5", border: "border-violet-500/15" },
];

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
        <section id="nosotros" className="py-12 md:py-20 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    className="text-center space-y-4 mb-10 md:mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[1.2]">
                        Construido para <span className="text-primary italic">Venezuela</span>
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto font-medium">
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
                    {[
                        { val: stats.totalUsuarios, label: "Usuarios", icon: ShieldCheck, color: "text-primary" },
                        { val: stats.cumplimiento, label: "Cumplimiento", suffix: "%", icon: Zap, color: "text-secondary" },
                        { val: stats.totalEmpresas, label: "Empresas", icon: ShieldCheck, color: "text-emerald-500" }
                    ].map((stat, i) => (
                        <Card key={i} className="glass-card p-6 text-center rounded-[2rem] bg-card/60 dark:bg-white/[0.02] relative overflow-hidden group shadow-xl border border-border/30 dark:border-white/[0.06] hover:scale-[1.02] transition-all duration-300 cursor-default">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all"><stat.icon className="h-16 w-16" /></div>
                            <p className={cn("text-3xl font-black italic tracking-tighter mb-1", stat.color)}>
                                <Counter from={0} to={stat.val} />{stat.suffix}
                            </p>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                        </Card>
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
                        <div key={i} className="flex items-center gap-4 p-5 rounded-3xl border border-border/30 dark:border-white/[0.06] bg-card/50 dark:bg-white/[0.02] group hover:border-primary/20 transition-all duration-300 shadow-lg">
                            <div className={cn("p-2.5 rounded-xl shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border", v.bg, v.border)}>
                                <v.icon className={cn("h-5 w-5", v.color)} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-tight text-foreground leading-none mb-0.5">{v.label}</p>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
