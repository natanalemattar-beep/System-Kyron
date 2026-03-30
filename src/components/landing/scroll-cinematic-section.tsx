'use client';

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calculator, Shield, Brain, Zap, Signal, Users, Cpu, TrendingUp, Lock, Globe } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface Highlight {
    icon: LucideIcon;
    color: string;
    label: string;
    desc: string;
    stat: string;
    statLabel: string;
}

const highlights: Highlight[] = [
    { icon: Calculator, color: "from-blue-500 to-primary", label: "Contabilidad & Fiscal", desc: "IVA, IGTF e ISLR automáticos. Libros VEN-NIF y cumplimiento SENIAT en tiempo real.", stat: "100%", statLabel: "Cumplimiento fiscal" },
    { icon: Signal, color: "from-cyan-400 to-blue-500", label: "Mi Línea 5G", desc: "Provisión de eSIM 5G, gestión de flota móvil empresarial y conectividad de alto rendimiento.", stat: "5G", statLabel: "Velocidad de red" },
    { icon: Brain, color: "from-violet-500 to-purple-600", label: "IA Integrada", desc: "Kyron AI potenciado por Claude de Anthropic. Automatiza reportes, documentos y análisis.", stat: "IA", statLabel: "Claude · Anthropic" },
    { icon: Shield, color: "from-emerald-500 to-cyan-600", label: "Seguridad AES-256", desc: "Cifrado de grado bancario, JWT HTTP-only y auditoría inmutable de cada operación.", stat: "256", statLabel: "Bits de cifrado" },
    { icon: Users, color: "from-orange-400 to-rose-500", label: "RR.HH & Nómina", desc: "Gestión LOTTT completa: nóminas, beneficios, vacaciones y liquidaciones en un clic.", stat: "LOTTT", statLabel: "Marco legal" },
    { icon: Zap, color: "from-yellow-400 to-orange-500", label: "Facturación Fiscal", desc: "Facturas y notas crédito/débito con validación IGTF y tasa BCV automática.", stat: "3%", statLabel: "IGTF automático" },
];

const powerStats = [
    { value: "7", label: "Módulos", icon: Cpu, color: "from-cyan-400 to-blue-500" },
    { value: "100%", label: "Cumplimiento", icon: TrendingUp, color: "from-emerald-400 to-green-500" },
    { value: "AES", label: "256 bits", icon: Lock, color: "from-violet-400 to-purple-500" },
    { value: "VEN", label: "Hecho aquí", icon: Globe, color: "from-orange-400 to-rose-500" },
];

function CSSParticles() {
    const particles = useMemo(() => {
        return Array.from({ length: 6 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            duration: Math.random() * 15 + 12,
            delay: Math.random() * 8,
            opacity: Math.random() * 0.15 + 0.03,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-400 animate-float-particle"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

export function ScrollCinematicSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const taglineOpacity = useTransform(scrollYProgress, [0.04, 0.09], [0, 1]);
    const taglineY = useTransform(scrollYProgress, [0.04, 0.09], [20, 0]);

    const line1Opacity = useTransform(scrollYProgress, [0.07, 0.13], [0, 1]);
    const line1Y = useTransform(scrollYProgress, [0.07, 0.13], [40, 0]);

    const line2Opacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);
    const line2Y = useTransform(scrollYProgress, [0.12, 0.18], [40, 0]);

    const line3Opacity = useTransform(scrollYProgress, [0.17, 0.23], [0, 1]);
    const line3Y = useTransform(scrollYProgress, [0.17, 0.23], [40, 0]);

    const subtitleOpacity = useTransform(scrollYProgress, [0.22, 0.27], [0, 1]);
    const subtitleY = useTransform(scrollYProgress, [0.22, 0.27], [20, 0]);

    const exitOpacity = useTransform(scrollYProgress, [0.29, 0.34], [1, 0]);
    const exitY = useTransform(scrollYProgress, [0.29, 0.34], [0, -60]);

    const highlightsOpacity = useTransform(scrollYProgress, (v: number) => {
        if (v < 0.33) return 0;
        if (v < 0.38) return (v - 0.33) / 0.05;
        if (v < 0.52) return 1;
        if (v < 0.56) return 1 - (v - 0.52) / 0.04;
        return 0;
    });
    const highlightsY = useTransform(scrollYProgress, (v: number) => {
        if (v < 0.33) return 50;
        if (v < 0.38) return 50 * (1 - (v - 0.33) / 0.05);
        if (v < 0.52) return 0;
        if (v < 0.56) return -40 * ((v - 0.52) / 0.04);
        return -40;
    });

    const statsOpacity = useTransform(scrollYProgress, (v: number) => {
        if (v < 0.55) return 0;
        if (v < 0.60) return (v - 0.55) / 0.05;
        if (v < 0.74) return 1;
        if (v < 0.78) return 1 - (v - 0.74) / 0.04;
        return 0;
    });
    const statsY = useTransform(scrollYProgress, (v: number) => {
        if (v < 0.55) return 40;
        if (v < 0.60) return 40 * (1 - (v - 0.55) / 0.05);
        if (v < 0.74) return 0;
        if (v < 0.78) return -40 * ((v - 0.74) / 0.04);
        return -40;
    });

    const dashboardOpacity = useTransform(scrollYProgress, [0.78, 0.86], [0, 1]);
    const dashboardScale = useTransform(scrollYProgress, [0.78, 0.86], [0.85, 1]);
    const dashboardY = useTransform(scrollYProgress, [0.78, 0.86], [50, 0]);

    const scrollHintOpacity = useTransform(scrollYProgress, [0.0, 0.02, 0.07], [0, 1, 0]);

    return (
        <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[#020810]" />

                <CSSParticles />

                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30"
                    style={{
                        width: "60vmin",
                        height: "60vmin",
                        background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)",
                        borderRadius: "50%",
                    }}
                />

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 will-change-[opacity,transform]"
                    style={{ opacity: exitOpacity, y: exitY }}
                >
                    <div className="text-center max-w-5xl mx-auto w-full">
                        <motion.div
                            style={{ opacity: taglineOpacity, y: taglineY }}
                            className="mb-6 md:mb-8"
                        >
                            <span className="inline-flex items-center gap-2 sm:gap-3 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-cyan-400/50">
                                <span className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent to-cyan-400/50 inline-block" />
                                System Kyron — Inteligencia Corporativa
                                <span className="h-px w-6 sm:w-12 bg-gradient-to-l from-transparent to-cyan-400/50 inline-block" />
                            </span>
                        </motion.div>

                        <h2 className="font-black tracking-tight leading-[0.95] uppercase">
                            <motion.span
                                className="block text-white will-change-[opacity,transform]"
                                style={{ opacity: line1Opacity, y: line1Y, fontSize: "clamp(2.2rem, 10vw, 8rem)" }}
                            >
                                Tu empresa.
                            </motion.span>
                            <motion.span
                                className="block text-white will-change-[opacity,transform]"
                                style={{ opacity: line2Opacity, y: line2Y, fontSize: "clamp(2.2rem, 10vw, 8rem)" }}
                            >
                                Toda.
                            </motion.span>
                            <motion.span
                                className="block italic will-change-[opacity,transform]"
                                style={{
                                    opacity: line3Opacity, y: line3Y,
                                    fontSize: "clamp(2.2rem, 10vw, 8rem)",
                                    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 40%, #10b981 80%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                En un solo lugar.
                            </motion.span>
                        </h2>

                        <motion.p
                            style={{ opacity: subtitleOpacity, y: subtitleY }}
                            className="mt-5 md:mt-8 text-white/40 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-2"
                        >
                            Contabilidad, nóminas, facturación, 5G y mucho más — diseñado para Venezuela,
                            con IA integrada y cumplimiento fiscal automatizado.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-3 sm:px-4 md:px-10 will-change-[opacity,transform]"
                    style={{ opacity: highlightsOpacity, y: highlightsY }}
                >
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="text-center mb-4 sm:mb-6 md:mb-8">
                            <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/20 mb-2 sm:mb-3">
                                Todo lo que tu empresa necesita
                            </p>
                            <h3 className="font-black tracking-tight text-white uppercase" style={{ fontSize: "clamp(1.2rem, 4vw, 3rem)" }}>
                                Un ecosistema completo.
                            </h3>
                            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mx-auto mt-3 sm:mt-4" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                            {highlights.map((h, i) => {
                                const Icon = h.icon;
                                return (
                                    <div
                                        key={i}
                                        className="group relative rounded-xl sm:rounded-2xl border border-white/[0.06] bg-white/[0.03] p-2.5 sm:p-4 md:p-5 overflow-hidden hover:border-white/15 transition-colors duration-300 animate-[fadeSlideUp_0.4s_both]"
                                        style={{ animationDelay: `${i * 0.06}s` }}
                                    >
                                        <div className="flex items-start justify-between mb-2 sm:mb-3 relative">
                                            <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 text-white" />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm sm:text-lg font-black text-white/90 leading-none">{h.stat}</p>
                                                <p className="text-[6px] sm:text-[7px] font-bold text-white/25 uppercase tracking-wider leading-tight mt-0.5">{h.statLabel}</p>
                                            </div>
                                        </div>
                                        <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-white/80 mb-1">{h.label}</p>
                                        <p className="text-[8px] sm:text-[10px] text-white/30 leading-relaxed hidden sm:block">{h.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 will-change-[opacity,transform]"
                    style={{ opacity: statsOpacity, y: statsY }}
                >
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/20 mb-4 sm:mb-6">
                            Poder sin precedentes
                        </p>
                        <h3 className="font-black tracking-tight text-white uppercase mb-8 sm:mb-12 md:mb-16" style={{ fontSize: "clamp(1.4rem, 4.5vw, 3.5rem)" }}>
                            Cifras que hablan por sí solas.
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                            {powerStats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className="text-center group animate-[fadeSlideUp_0.4s_both]"
                                        style={{ animationDelay: `${i * 0.08}s` }}
                                    >
                                        <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                                            <Icon className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                                        </div>
                                        <p className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-1">{stat.value}</p>
                                        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/35">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 will-change-[opacity,transform]"
                    style={{ opacity: dashboardOpacity, scale: dashboardScale, y: dashboardY }}
                >
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/20 mb-2 sm:mb-3">
                            Interfaz intuitiva
                        </p>
                        <h3 className="font-black tracking-tight text-white uppercase mb-5 sm:mb-8" style={{ fontSize: "clamp(1.2rem, 4vw, 3rem)" }}>
                            Un dashboard. Todo el control.
                        </h3>
                        <div className="relative mx-auto max-w-3xl">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 rounded-[2rem] blur-2xl" />
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
                                <Image
                                    src="/images/landing/hero-dashboard.png"
                                    alt="System Kyron Dashboard"
                                    width={900}
                                    height={506}
                                    className="w-full h-auto"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/40 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    style={{ opacity: scrollHintOpacity }}
                >
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">Scroll</p>
                    <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
}
