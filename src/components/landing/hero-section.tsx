'use client';

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, Calculator, Users, Smartphone, Recycle, Gavel, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";

const modules = [
    { label: "Contabilidad VEN-NIF", icon: Calculator, color: "text-primary", bg: "bg-primary/10" },
    { label: "RRHH & Nómina", icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Telecom 5G / eSIM", icon: Smartphone, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "IA Legal & Permisos", icon: Gavel, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Eco-Créditos Ameru", icon: Recycle, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Analítica Avanzada", icon: BarChart3, color: "text-rose-400", bg: "bg-rose-400/10" },
];

const trustStats = [
    { val: "IVA 16%", label: "Automatizado", icon: ShieldCheck },
    { val: "IGTF 3%", label: "Integrado", icon: Zap },
    { val: "BCV", label: "Tasa en Tiempo Real", icon: Activity },
    { val: "VEN-NIF", label: "Cumplimiento Total", icon: ShieldCheck },
];

export function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section id="inicio" className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden min-h-[95vh] flex items-center bg-transparent">

            {/* HUD Lines */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
                <div className="absolute top-24 left-6 md:left-10 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-primary/40" />
                <div className="absolute top-24 right-6 md:right-10 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-10 left-6 w-4 h-4 border-b-2 border-l-2 border-primary/20" />
                <div className="absolute bottom-10 right-6 w-4 h-4 border-b-2 border-r-2 border-primary/20" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* LEFT — Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 space-y-8 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/5 text-[9px] font-black uppercase tracking-[0.4em] text-primary border border-primary/15 mx-auto lg:ml-0 shadow-glow-sm">
                            <Activity className="h-3 w-3 animate-pulse" /> Sistema Operativo Activo
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground uppercase italic leading-[0.9] italic-shadow">
                                {t('title')}
                            </h1>
                            <p className="text-primary font-black uppercase tracking-[0.35em] text-[10px] md:text-xs opacity-80">
                                {t('slogan')}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:ml-0 font-bold uppercase tracking-tight italic leading-relaxed border-l-0 lg:border-l-4 border-primary/25 lg:pl-6">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                            <Button asChild size="lg" className="btn-3d-primary h-13 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl w-full sm:w-auto shadow-2xl">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    {t('cta_main')} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-13 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl border-border bg-card/50 text-foreground w-full sm:w-auto hover:bg-primary/5 transition-all">
                                <Link href="/login">{t('cta_secondary')}</Link>
                            </Button>
                        </div>

                        {/* Trust bar — normas venezolanas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/50">
                            {trustStats.map((s, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start gap-1">
                                    <p className="text-sm font-black text-foreground">{s.val}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT — Modules Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="lg:col-span-6 space-y-4"
                    >
                        {/* Top status banner */}
                        <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-card border border-border/50 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_theme(colors.emerald.400)]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">Infraestructura Digital</span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Estado: Óptimo</span>
                        </div>

                        {/* 6 module cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {modules.map((mod, i) => (
                                <motion.div
                                    key={mod.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                                    className="group bg-card border border-border/50 hover:border-primary/30 rounded-[1.5rem] p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg cursor-default"
                                >
                                    <div className={cn("p-2.5 rounded-xl w-fit", mod.bg)}>
                                        <mod.icon className={cn("h-5 w-5", mod.color)} />
                                    </div>
                                    <p className="text-[9px] font-black uppercase tracking-tight text-foreground/80 leading-snug group-hover:text-foreground transition-colors">
                                        {mod.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom CTA strip */}
                        <Link href="/register" className="block">
                            <div className="flex items-center justify-between px-6 py-4 rounded-2xl bg-primary/5 border border-primary/15 hover:bg-primary/10 hover:border-primary/30 transition-all group cursor-pointer">
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Comienza Gratis</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Registro en menos de 2 minutos</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
