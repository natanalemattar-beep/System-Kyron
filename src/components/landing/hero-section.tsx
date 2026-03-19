'use client';

import { motion, useMotionValue, useTransform, animate, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, Calculator, Users, Smartphone, Recycle, Gavel, BarChart3, TrendingUp, DollarSign, Building2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const modules = [
    { label: "Contabilidad VEN-NIF", icon: Calculator, color: "text-cyan-600 dark:text-cyan-400",   bg: "from-cyan-500/20 to-cyan-500/5",   border: "border-cyan-500/25", href: "/login-empresa" },
    { label: "RRHH & Nómina",        icon: Users,      color: "text-violet-600 dark:text-violet-400", bg: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/25", href: "/login-rrhh" },
    { label: "Telecom 5G / eSIM",    icon: Smartphone, color: "text-blue-600 dark:text-blue-400",   bg: "from-blue-500/20 to-blue-500/5",    border: "border-blue-500/25", href: "/login-linea" },
    { label: "IA Legal & Permisos",  icon: Gavel,      color: "text-amber-600 dark:text-amber-400",  bg: "from-amber-500/20 to-amber-500/5",  border: "border-amber-500/25", href: "/login-escritorio-juridico" },
    { label: "Eco-Créditos Ameru",   icon: Recycle,    color: "text-emerald-600 dark:text-emerald-400",bg: "from-emerald-500/20 to-emerald-500/5",border:"border-emerald-500/25", href: "/login-sostenibilidad" },
    { label: "Analítica Avanzada",   icon: BarChart3,  color: "text-rose-600 dark:text-rose-400",   bg: "from-rose-500/20 to-rose-500/5",    border: "border-rose-500/25", href: "/login-empresa" },
];

const kpis = [
    { label: "Ingresos / Mes", value: "Bs. 0", delta: "+0%", icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Facturas Activas", value: "0", delta: "SENIAT", icon: DollarSign, color: "text-cyan-600 dark:text-cyan-400" },
    { label: "Empleados", value: "0", delta: "LOTTT", icon: Users, color: "text-violet-600 dark:text-violet-400" },
];

const Counter = ({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) => {
    const [display, setDisplay] = useState(from);
    const count  = useMotionValue(from);
    const rounded = useTransform(count, (v) => Math.round(v));
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) animate(count, to, { duration: 1.8, ease: "easeOut" });
    }, [count, inView, to]);

    useEffect(() => rounded.on("change", setDisplay), [rounded]);

    return <motion.span ref={ref}>{display}{suffix}</motion.span>;
};

export function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section id="inicio" className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden min-h-[96vh] flex items-center">

            {/* ── Background Orbs (animated) ── */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[100px]"
                />
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30 - i * 8, 0],
                            opacity: [0, 0.6, 0],
                            x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5), 0],
                        }}
                        transition={{
                            duration: 4 + i * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.7,
                        }}
                        className="absolute rounded-full bg-primary/20"
                        style={{
                            width: 3 + (i % 3),
                            height: 3 + (i % 3),
                            left: `${10 + i * 11}%`,
                            bottom: `${15 + (i % 4) * 15}%`,
                        }}
                    />
                ))}
                {/* HUD grid */}
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                {/* Corner brackets */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute top-24 left-8 md:left-12 w-8 h-8 border-t-2 border-l-2 border-primary/30"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute top-24 right-8 md:right-12 w-8 h-8 border-t-2 border-r-2 border-primary/30"
                />
                <div className="absolute bottom-12 left-8 w-5 h-5 border-b-2 border-l-2 border-primary/20" />
                <div className="absolute bottom-12 right-8 w-5 h-5 border-b-2 border-r-2 border-primary/20" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* ─── LEFT: Copy ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-6 space-y-8 text-center lg:text-left"
                    >
                        {/* Live badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mx-auto lg:ml-0"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Sistema Operativo • v2.6.5</span>
                        </motion.div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.1] lg:leading-[1.0] italic-shadow overflow-hidden break-words">
                                <span className="block text-foreground/90 break-words">{t('title').split(' ').slice(0, 2).join(' ')}</span>
                                <span className="block bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent italic break-words">
                                    {t('title').split(' ').slice(2).join(' ')}
                                </span>
                            </h1>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/50" />
                                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/80">{t('slogan')}</p>
                                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/50" />
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:ml-0 font-semibold leading-relaxed border-l-0 lg:border-l-[3px] border-primary/40 lg:pl-5">
                            {t('subtitle')}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                            <Button asChild size="lg" className="relative h-13 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl overflow-hidden group bg-primary hover:bg-primary/90">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-13 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl border-border/60 bg-card/30 backdrop-blur-sm text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all">
                                <Link href="/manual-usuario">{t('cta_secondary')}</Link>
                            </Button>
                        </div>

                        {/* Compliance strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-border/30">
                            {[
                                { val: "IVA 16%", label: "Automático" },
                                { val: "IGTF 3%", label: "Integrado" },
                                { val: "BCV",     label: "Tiempo Real" },
                                { val: "VEN-NIF", label: "Cumplimiento" },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start gap-0.5">
                                    <p className="text-sm font-black text-foreground/90 leading-none">{s.val}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground/50 uppercase tracking-widest">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── RIGHT: Dashboard Panel ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-6 space-y-3"
                    >
                        {/* Dashboard card */}
                        <div className="rounded-[2rem] border border-border/40 dark:border-white/10 bg-card/60 dark:bg-card/40 backdrop-blur-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
                            {/* Card topbar */}
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 dark:border-white/8 bg-muted/30 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Panel de Control — System Kyron</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[7px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400/80">Live</span>
                                </div>
                            </div>

                            {/* KPI row */}
                            <div className="grid grid-cols-3 divide-x divide-border/40 dark:divide-white/8 p-0">
                                {kpis.map((kpi, i) => (
                                    <motion.div
                                        key={kpi.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="p-4 md:p-5 space-y-1.5 hover:bg-muted/20 dark:hover:bg-white/[0.02] transition-colors"
                                    >
                                        <kpi.icon className={cn("h-3.5 w-3.5 mb-2", kpi.color)} />
                                        <p className="text-xs md:text-sm font-black text-foreground/90 leading-none break-words">{kpi.value}</p>
                                        <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground/50 break-words line-clamp-1">{kpi.label}</p>
                                        <span className={cn("text-[7px] font-black uppercase", kpi.color)}>{kpi.delta}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Module grid */}
                            <div className="p-4 border-t border-border/40 dark:border-white/8">
                                <div className="grid grid-cols-3 gap-2">
                                    {modules.map((mod, i) => (
                                        <motion.div
                                            key={mod.label}
                                            initial={{ opacity: 0, scale: 0.92 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                                        >
                                            <Link
                                                href={mod.href as any}
                                                className={cn(
                                                    "group flex flex-col gap-2.5 p-3.5 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.03] cursor-pointer",
                                                    mod.bg, mod.border
                                                )}
                                            >
                                                <div className={cn("p-1.5 rounded-lg bg-black/10 dark:bg-black/20 w-fit", mod.color)}>
                                                    <mod.icon className="h-3.5 w-3.5" />
                                                </div>
                                                <p className="text-[7px] font-black uppercase tracking-tight text-foreground/70 leading-tight group-hover:text-foreground/90 transition-colors break-words overflow-hidden line-clamp-2">
                                                    {mod.label}
                                                </p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer strip */}
                            <Link href="/register" className="block group">
                                <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-primary/10 to-transparent border-t border-primary/15 hover:from-primary/20 transition-all">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary leading-none">Activar Portal</p>
                                            <p className="text-[7px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">Registro gratuito • 2 minutos</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>

                        {/* Bottom metrics row */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { val: "32", suffix: " tablas", label: "Base de datos", icon: Cpu,       color: "text-cyan-600 dark:text-cyan-400" },
                                { val: "12", suffix: " portales", label: "Módulos activos", icon: Building2,  color: "text-violet-600 dark:text-violet-400" },
                                { val: "100", suffix: "%", label: "Cumplimiento fiscal", icon: ShieldCheck, color: "text-emerald-600 dark:text-emerald-400" },
                            ].map((m, i) => (
                                <motion.div
                                    key={m.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + i * 0.08 }}
                                    className="flex flex-col gap-1.5 p-3.5 rounded-2xl border border-border/40 dark:border-white/8 bg-card/50 dark:bg-card/30 backdrop-blur-sm hover:border-border/60 dark:hover:border-white/15 transition-colors text-center"
                                >
                                    <m.icon className={cn("h-3.5 w-3.5 mx-auto", m.color)} />
                                    <p className={cn("text-base font-black leading-none break-words", m.color)}>
                                        <Counter from={0} to={parseInt(m.val)} />{m.suffix}
                                    </p>
                                    <p className="text-[7px] font-bold text-muted-foreground/50 uppercase tracking-widest leading-tight break-words line-clamp-1">{m.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
