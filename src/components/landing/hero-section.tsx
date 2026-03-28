'use client';

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
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
                    animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.12, 0.98, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -25, 15, 0], y: [0, 30, -15, 0], scale: [1, 1.08, 1.02, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, 20, -8, 0], y: [0, -15, 12, 0], scale: [1, 1.1, 0.95, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-emerald-500/8 blur-[100px]"
                />
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/15 bg-primary/5 backdrop-blur-sm mx-auto lg:ml-0">
                            <Zap className="h-3 w-3 text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">{t('badge')}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1]">
                            <span className="block text-foreground/90">{t('title_line1')}</span>
                            <span className="block text-foreground/90">{t('title_line2')}</span>
                            <span className="block bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
                                {t('title_line3')}
                            </span>
                        </h1>

                        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto lg:ml-0 font-medium leading-relaxed">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                            <Button asChild size="lg" className="relative h-12 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl overflow-hidden group bg-primary hover:bg-primary/90 transition-all duration-300">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-12 px-8 text-[10px] font-black uppercase tracking-widest rounded-xl border-border/60 bg-card/30 backdrop-blur-sm text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300">
                                <Link href="/manual-usuario">{t('cta_secondary')}</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-3 pt-5 border-t border-border/30">
                            {[
                                { val: "IVA 16%", label: "Automático" },
                                { val: "IGTF 3%", label: "Integrado" },
                                { val: "BCV",     label: "Tiempo Real" },
                                { val: "VEN-NIF", label: "Certificado" },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start gap-0.5">
                                    <p className="text-sm font-black text-foreground/90 leading-none">{s.val}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                </div>
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
