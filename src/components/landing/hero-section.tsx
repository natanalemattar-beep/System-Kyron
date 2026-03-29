'use client';

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/landing/hero-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030B1A]/80 via-[#030B1A]/60 to-[#030B1A]/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030B1A]/70 via-transparent to-[#030B1A]/50" />
            </div>

            <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mx-auto lg:ml-0"
                        >
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/80">{t('badge')}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[1.02]">
                            <span className="block text-white">{t('title_line1')}</span>
                            <span className="block text-white">{t('title_line2')}</span>
                            <span className="block bg-gradient-to-r from-cyan-400 via-primary to-emerald-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
                                {t('title_line3')}
                            </span>
                        </h1>

                        <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto lg:ml-0 font-medium leading-relaxed">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <Button asChild size="lg" className="relative h-14 px-10 text-xs font-black uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden group bg-gradient-to-r from-cyan-500 to-primary hover:from-cyan-400 hover:to-primary/90 text-white border-0 transition-all duration-500">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {t('cta_main')} <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-14 px-10 text-xs font-black uppercase tracking-widest rounded-2xl border-white/15 bg-white/5 backdrop-blur-sm text-white/80 hover:border-white/30 hover:bg-white/10 transition-all duration-500">
                                <Link href="/manual-usuario" className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    {t('cta_secondary')}
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-4">
                            {["VEN-NIF Certificado", "IVA & IGTF Auto", "BCV Tiempo Real", "IA Integrada"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative">
                        <div className="relative mx-auto max-w-[560px] lg:max-w-none">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-primary/20 to-emerald-500/20 rounded-[2rem] blur-2xl opacity-60" />
                            <div className="relative rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/images/landing/hero-dashboard.png"
                                    alt="System Kyron Dashboard"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto"
                                    
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030B1A]/40 via-transparent to-transparent" />
                            </div>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 md:-left-8 bg-[#0A1628]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-wider text-white/50">Cumplimiento</p>
                                        <p className="text-lg font-black text-emerald-400">100%</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute -top-3 -right-3 md:-right-6 bg-[#0A1628]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                        <span className="text-white text-xs font-black">12+</span>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-wider text-white/50">Módulos</p>
                                        <p className="text-lg font-black text-cyan-400">Integrados</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />

            <div className="absolute bottom-6 left-0 right-0 z-10">
                <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { val: "IVA 16%", label: "Automático", color: "from-primary/20 to-primary/5", text: "text-primary" },
                            { val: "IGTF 3%", label: "Integrado", color: "from-blue-500/20 to-blue-500/5", text: "text-blue-400" },
                            { val: "BCV", label: "Tiempo Real", color: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400" },
                            { val: "VEN-NIF", label: "Certificado", color: "from-emerald-500/20 to-emerald-500/5", text: "text-emerald-400" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-center gap-0.5 p-3 rounded-2xl bg-gradient-to-b ${s.color} border border-white/5 backdrop-blur-sm`}
                            >
                                <p className={`text-sm font-black leading-none ${s.text}`}>{s.val}</p>
                                <p className="text-[8px] font-bold text-foreground/50 uppercase tracking-widest">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
