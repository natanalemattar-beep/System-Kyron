'use client';

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Calculator, Users, Smartphone, Recycle, Gavel, BarChart3, TrendingUp, DollarSign, Building2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { LiveStatsPanel } from "@/components/landing/live-stats-panel";

export function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section id="inicio" className="relative pt-24 pb-12 md:pt-36 md:pb-28 overflow-hidden min-h-[92vh] flex items-center">

            {/* ── Background Orbs ── */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-emerald-500/8 blur-[100px]"
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
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                {/* Corner brackets */}
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-24 left-8 md:left-12 w-8 h-8 border-t-2 border-l-2 border-primary/30"
                />
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-24 right-8 md:right-12 w-8 h-8 border-t-2 border-r-2 border-primary/30"
                />
                <div className="absolute bottom-12 left-8 w-5 h-5 border-b-2 border-l-2 border-primary/20" />
                <div className="absolute bottom-12 right-8 w-5 h-5 border-b-2 border-r-2 border-primary/20" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    {/* ─── LEFT: Copy ─── */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-6 space-y-7 text-center lg:text-left"
                    >
                        {/* Live badge */}
                        <motion.div
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
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
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] overflow-hidden">
                                <span className="block text-foreground/90">{t('title').split(' ').slice(0, 2).join(' ')}</span>
                                <span className="block bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent italic">
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
                        <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:ml-0 font-semibold leading-relaxed lg:border-l-[3px] border-primary/40 lg:pl-5">
                            {t('subtitle')}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                            <Button asChild size="lg" className="relative h-12 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl overflow-hidden group bg-primary hover:bg-primary/90">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-12 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl border-border/60 bg-card/30 backdrop-blur-sm text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all">
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

                    {/* ─── RIGHT: Live Stats Panel ─── */}
                    <div className="lg:col-span-6">
                        <LiveStatsPanel />
                    </div>

                </div>
            </div>
        </section>
    );
}
