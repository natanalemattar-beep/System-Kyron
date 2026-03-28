'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { Target, Eye, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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


export function AboutUsSection() {
    const economyImage = PlaceHolderImages.find(img => img.id === "digital-economy");
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
        <section id="nosotros" className="py-20 md:py-32 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-primary/5 blur-[150px] pointer-events-none -z-10" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-start">
                    
                    <motion.div 
                        className="lg:col-span-5 space-y-12 text-center lg:text-left"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/20 mx-auto lg:ml-0 shadow-glow-sm">
                                <Sparkles className="h-3 w-3" /> Equipo Profesional
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-foreground italic-shadow leading-[1.1] break-words overflow-hidden">Sobre <span className="text-primary not-italic">Nosotros</span></h2>
                            <p className="text-base md:text-xl text-muted-foreground font-bold uppercase tracking-tight leading-relaxed italic border-l-0 lg:border-l-4 border-primary/30 lg:pl-8">Desarrollamos ingeniería de software diseñada para la excelencia operativa.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Card className="glass-card border border-border/30 dark:border-white/[0.06] p-8 rounded-3xl bg-card/60 dark:bg-white/[0.02] hover:bg-card/80 dark:hover:bg-white/[0.04] transition-all duration-500 group shadow-xl">
                                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-6 mx-auto lg:ml-0 shadow-inner border border-primary/10">
                                    <Target className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-foreground mb-2 leading-none">Misión</h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">Garantizar la gestión empresarial mediante registros seguros, transparentes e inmutables.</p>
                            </Card>
                            <Card className="glass-card border border-border/30 dark:border-white/[0.06] p-8 rounded-3xl bg-card/60 dark:bg-white/[0.02] hover:bg-card/80 dark:hover:bg-white/[0.04] transition-all duration-500 group shadow-xl">
                                <div className="p-3 bg-secondary/10 rounded-xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-6 mx-auto lg:ml-0 shadow-inner border border-secondary/10">
                                    <Eye className="text-secondary h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-foreground mb-2 leading-none">Visión</h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">Consolidarnos como el estándar global de eficiencia para empresas e instituciones de vanguardia.</p>
                            </Card>
                        </div>

                        <Card className="glass-card border border-border/30 dark:border-none p-2 rounded-[2.5rem] bg-card/40 dark:bg-white/[0.01] overflow-hidden group shadow-2xl">
                            <div className="aspect-video relative rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                                {economyImage && (
                                    <Image src={economyImage.imageUrl} alt={economyImage.description} fill className="object-cover contrast-[1.1]" />
                                )}
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div 
                        className="lg:col-span-7 space-y-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { val: stats.totalEmpresas, label: "EMPRESAS", icon: ShieldCheck, color: "text-primary" },
                                { val: stats.cumplimiento, label: "CUMPLIMIENTO", suffix: "%", icon: Zap, color: "text-secondary" },
                                { val: stats.erroresFiscales, label: "ERRORES FISCALES", suffix: "%", icon: Zap, color: "text-rose-400" }
                            ].map((stat, i) => (
                                <Card key={i} className="glass-card p-8 text-center rounded-[2rem] bg-card/60 dark:bg-white/[0.02] relative overflow-hidden group shadow-xl border border-border/30 dark:border-white/[0.06] hover:scale-[1.02] transition-all duration-300 cursor-default">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all"><stat.icon className="h-16 w-16" /></div>
                                    <p className={cn("text-4xl font-black italic tracking-tighter mb-2", stat.color)}>
                                        <Counter from={0} to={stat.val} />{stat.suffix}
                                    </p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">{stat.label}</p>
                                </Card>
                            ))}
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}