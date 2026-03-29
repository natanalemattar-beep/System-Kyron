'use client';

import { motion } from "framer-motion";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { LiveStatsPanel } from "@/components/landing/live-stats-panel";

export function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section id="inicio" className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden min-h-[85vh] flex items-center">

            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.15, 0.95, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/12 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -25, 15, 0], y: [0, 30, -15, 0], scale: [1, 1.1, 1.02, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, 20, -8, 0], y: [0, -15, 12, 0], scale: [1, 1.12, 0.93, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]"
                />
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/[0.03]"
                />
                <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-400/[0.04] border-dashed"
                />
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -40 - i * 4, 0],
                            opacity: [0, 0.5, 0],
                            scale: [0.6, 1.2, 0.6],
                        }}
                        transition={{
                            duration: 5 + i * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.6,
                        }}
                        className="absolute rounded-full"
                        style={{
                            width: 2 + (i % 4),
                            height: 2 + (i % 4),
                            left: `${8 + i * 11}%`,
                            bottom: `${10 + (i % 4) * 18}%`,
                            background: i % 3 === 0
                                ? 'hsl(var(--primary) / 0.4)'
                                : i % 3 === 1
                                    ? 'rgba(6, 182, 212, 0.35)'
                                    : 'rgba(139, 92, 246, 0.3)',
                        }}
                    />
                ))}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <div className="absolute top-24 left-8 md:left-12 w-8 h-8 border-t-2 border-l-2 border-primary/20" />
                <div className="absolute top-24 right-8 md:right-12 w-8 h-8 border-t-2 border-r-2 border-primary/20" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mx-auto lg:ml-0 shadow-[0_0_15px_rgba(var(--primary-rgb,30,64,175),0.1)]">
                            <Zap className="h-3 w-3 text-primary animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">{t('badge')}</span>
                            <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[1.05]">
                            <span className="block text-foreground/90">{t('title_line1')}</span>
                            <span className="block text-foreground/90">{t('title_line2')}</span>
                            <span className="block bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
                                {t('title_line3')}
                            </span>
                        </h1>

                        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto lg:ml-0 font-medium leading-relaxed lg:border-l-[3px] border-primary/30 lg:pl-5">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                            <Button asChild size="lg" className="relative h-13 px-8 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-[0_8px_30px_rgba(var(--primary-rgb,30,64,175),0.3)] overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-500">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-13 px-8 text-[10px] font-black uppercase tracking-widest rounded-2xl border-border/60 bg-card/30 backdrop-blur-sm text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,30,64,175),0.08)] transition-all duration-500">
                                <Link href="/manual-usuario">{t('cta_secondary')}</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-3 pt-5 border-t border-border/30">
                            {[
                                { val: "IVA 16%", label: "Automático", color: "text-primary" },
                                { val: "IGTF 3%", label: "Integrado", color: "text-blue-500 dark:text-blue-400" },
                                { val: "BCV",     label: "Tiempo Real", color: "text-cyan-500 dark:text-cyan-400" },
                                { val: "VEN-NIF", label: "Certificado", color: "text-emerald-500 dark:text-emerald-400" },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="flex flex-col items-center lg:items-start gap-0.5 cursor-default"
                                >
                                    <p className={`text-sm font-black leading-none ${s.color}`}>{s.val}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <LiveStatsPanel />
                    </div>

                </div>
            </div>
        </section>
    );
}
