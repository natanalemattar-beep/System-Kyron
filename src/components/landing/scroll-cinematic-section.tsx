'use client';

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Calculator, Shield, Brain, Zap, Signal, Users, Cpu, TrendingUp, Lock, Globe } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface Highlight {
    icon: LucideIcon;
    color: string;
    glow: string;
    label: string;
    desc: string;
    stat: string;
    statLabel: string;
}

const highlights: Highlight[] = [
    {
        icon: Calculator,
        color: "from-blue-500 to-primary",
        glow: "rgba(59,130,246,0.5)",
        label: "Contabilidad & Fiscal",
        desc: "IVA, IGTF e ISLR automáticos. Libros VEN-NIF y cumplimiento SENIAT en tiempo real.",
        stat: "100%",
        statLabel: "Cumplimiento fiscal",
    },
    {
        icon: Signal,
        color: "from-cyan-400 to-blue-500",
        glow: "rgba(34,211,238,0.5)",
        label: "Mi Línea 5G",
        desc: "Provisión de eSIM 5G, gestión de flota móvil empresarial y conectividad de alto rendimiento.",
        stat: "5G",
        statLabel: "Velocidad de red",
    },
    {
        icon: Brain,
        color: "from-violet-500 to-purple-600",
        glow: "rgba(139,92,246,0.5)",
        label: "IA Integrada",
        desc: "Asistente Kyron con Gemini 2.0 y GPT-4o. Automatiza reportes, documentos y análisis.",
        stat: "2.0",
        statLabel: "Gemini Flash",
    },
    {
        icon: Shield,
        color: "from-emerald-500 to-cyan-600",
        glow: "rgba(16,185,129,0.5)",
        label: "Seguridad AES-256",
        desc: "Cifrado de grado bancario, JWT HTTP-only y auditoría inmutable de cada operación.",
        stat: "256",
        statLabel: "Bits de cifrado",
    },
    {
        icon: Users,
        color: "from-orange-400 to-rose-500",
        glow: "rgba(251,146,60,0.5)",
        label: "RR.HH & Nómina",
        desc: "Gestión LOTTT completa: nóminas, beneficios, vacaciones y liquidaciones en un clic.",
        stat: "LOTTT",
        statLabel: "Marco legal",
    },
    {
        icon: Zap,
        color: "from-yellow-400 to-orange-500",
        glow: "rgba(250,204,21,0.45)",
        label: "Facturación Fiscal",
        desc: "Facturas y notas crédito/débito con validación IGTF y tasa BCV automática.",
        stat: "3%",
        statLabel: "IGTF automático",
    },
];

const powerStats = [
    { value: "7", label: "Módulos", icon: Cpu, color: "from-cyan-400 to-blue-500" },
    { value: "100%", label: "Cumplimiento", icon: TrendingUp, color: "from-emerald-400 to-green-500" },
    { value: "AES", label: "256 bits", icon: Lock, color: "from-violet-400 to-purple-500" },
    { value: "VEN", label: "Hecho aquí", icon: Globe, color: "from-orange-400 to-rose-500" },
];

function CSSParticles() {
    const particles = useMemo(() => {
        return Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            duration: Math.random() * 15 + 12,
            delay: Math.random() * 8,
            opacity: Math.random() * 0.25 + 0.05,
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

function ConcentricRings({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
    const ringOpacity = useTransform(smoothProgress, [0.02, 0.08, 0.24, 0.30], [0, 0.5, 0.5, 0]);
    const ringScale1 = useTransform(smoothProgress, [0.02, 0.28], [0.3, 2.5]);
    const ringScale2 = useTransform(smoothProgress, [0.04, 0.28], [0.2, 2.2]);
    const ringScale3 = useTransform(smoothProgress, [0.06, 0.28], [0.1, 2.0]);
    const ringRotate = useTransform(smoothProgress, [0, 0.5], [0, 90]);

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-[opacity,transform]"
            style={{ opacity: ringOpacity, rotate: ringRotate }}
        >
            {[ringScale1, ringScale2, ringScale3].map((scale, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border will-change-transform"
                    style={{
                        scale,
                        width: "40vmin",
                        height: "40vmin",
                        borderColor: i === 0 ? "rgba(6,182,212,0.12)" : i === 1 ? "rgba(59,130,246,0.08)" : "rgba(16,185,129,0.06)",
                    }}
                />
            ))}
        </motion.div>
    );
}

function AmbientGlow({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
    const glowOpacity = useTransform(smoothProgress, [0, 0.05, 0.22, 0.30], [0, 0.6, 0.4, 0]);

    return (
        <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-[opacity]"
            style={{
                opacity: glowOpacity,
                width: "60vmin",
                height: "60vmin",
                background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
                borderRadius: "50%",
            }}
        />
    );
}

function PowerStatCard({ stat, index, smoothProgress }: {
    stat: typeof powerStats[0];
    index: number;
    smoothProgress: MotionValue<number>;
}) {
    const cardStart = 0.56 + index * 0.03;
    const cardEnd = cardStart + 0.04;
    const Icon = stat.icon;

    const opacity = useTransform(smoothProgress, [cardStart, cardEnd], [0, 1]);
    const scale = useTransform(smoothProgress, [cardStart, cardEnd], [0.7, 1]);
    const y = useTransform(smoothProgress, [cardStart, cardEnd], [40, 0]);

    return (
        <motion.div
            style={{ opacity, scale, y }}
            className="text-center group will-change-[opacity,transform]"
        >
            <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                style={{ boxShadow: `0 8px 32px -8px rgba(6,182,212,0.4)` }}
            >
                <Icon className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</p>
            <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/35">{stat.label}</p>
        </motion.div>
    );
}

function HighlightCard({ h, index, smoothProgress }: {
    h: Highlight;
    index: number;
    smoothProgress: MotionValue<number>;
}) {
    const cardStart = 0.30 + index * 0.03;
    const cardEnd = cardStart + 0.04;
    const Icon = h.icon;

    const cardOpacity = useTransform(smoothProgress, [cardStart, cardEnd], [0, 1]);
    const cardY = useTransform(smoothProgress, [cardStart, cardEnd], [40, 0]);

    return (
        <motion.div
            style={{
                opacity: cardOpacity,
                y: cardY,
            }}
            className="group relative rounded-xl sm:rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-2.5 sm:p-4 md:p-5 overflow-hidden hover:border-white/15 transition-colors duration-300 will-change-[opacity,transform]"
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"
                style={{
                    background: `radial-gradient(ellipse 100% 100% at 50% 100%, ${h.glow.replace("0.5", "0.08")} 0%, transparent 70%)`,
                }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between mb-2 sm:mb-3 relative">
                <div
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center flex-shrink-0`}
                    style={{ boxShadow: `0 4px 16px -4px ${h.glow}` }}
                >
                    <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 text-white" />
                </div>
                <div className="text-right">
                    <p className="text-sm sm:text-lg font-black text-white/90 leading-none">{h.stat}</p>
                    <p className="text-[6px] sm:text-[7px] font-bold text-white/25 uppercase tracking-wider leading-tight mt-0.5">
                        {h.statLabel}
                    </p>
                </div>
            </div>
            <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-white/80 mb-1">{h.label}</p>
            <p className="text-[8px] sm:text-[10px] text-white/30 leading-relaxed hidden sm:block">{h.desc}</p>
        </motion.div>
    );
}

export function ScrollCinematicSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 25, restDelta: 0.001 });

    // Phase 1: Title "Tu empresa. Toda. En un solo lugar." (0.00 - 0.30)
    const taglineOpacity = useTransform(smoothProgress, [0.01, 0.05], [0, 1]);
    const taglineY = useTransform(smoothProgress, [0.01, 0.05], [30, 0]);

    const line1Opacity = useTransform(smoothProgress, [0.03, 0.09], [0, 1]);
    const line1BlurRaw = useTransform(smoothProgress, [0.03, 0.09], [12, 0]);
    const line1Blur = useTransform(line1BlurRaw, (v) => `blur(${v}px)`);
    const line1Y = useTransform(smoothProgress, [0.03, 0.09], [50, 0]);
    const line1Scale = useTransform(smoothProgress, [0.03, 0.09], [0.9, 1]);

    const line2Opacity = useTransform(smoothProgress, [0.07, 0.13], [0, 1]);
    const line2BlurRaw = useTransform(smoothProgress, [0.07, 0.13], [12, 0]);
    const line2Blur = useTransform(line2BlurRaw, (v) => `blur(${v}px)`);
    const line2Y = useTransform(smoothProgress, [0.07, 0.13], [50, 0]);
    const line2Scale = useTransform(smoothProgress, [0.07, 0.13], [0.9, 1]);

    const line3Opacity = useTransform(smoothProgress, [0.11, 0.17], [0, 1]);
    const line3BlurRaw = useTransform(smoothProgress, [0.11, 0.17], [12, 0]);
    const line3Blur = useTransform(line3BlurRaw, (v) => `blur(${v}px)`);
    const line3Y = useTransform(smoothProgress, [0.11, 0.17], [50, 0]);
    const line3Scale = useTransform(smoothProgress, [0.11, 0.17], [0.9, 1]);

    const subtitleOpacity = useTransform(smoothProgress, [0.15, 0.20], [0, 1]);
    const subtitleY = useTransform(smoothProgress, [0.15, 0.20], [24, 0]);

    const exitOpacity = useTransform(smoothProgress, [0.24, 0.30], [1, 0]);
    const exitY = useTransform(smoothProgress, [0.24, 0.30], [0, -80]);
    const exitScale = useTransform(smoothProgress, [0.24, 0.30], [1, 0.9]);

    // Phase 2: Highlights / Feature cards (0.28 - 0.55)
    const featuresOpacity = useTransform(smoothProgress, [0.28, 0.34], [0, 1]);
    const featuresY = useTransform(smoothProgress, [0.28, 0.34], [60, 0]);
    const featuresExitOpacity = useTransform(smoothProgress, [0.50, 0.55], [1, 0]);
    const featuresExitY = useTransform(smoothProgress, [0.50, 0.55], [0, -60]);

    // Phase 3: Stats (0.53 - 0.78)
    const statsPhaseOpacity = useTransform(smoothProgress, [0.53, 0.58], [0, 1]);
    const statsPhaseY = useTransform(smoothProgress, [0.53, 0.58], [50, 0]);
    const statsExitOpacity = useTransform(smoothProgress, [0.73, 0.78], [1, 0]);
    const statsExitY = useTransform(smoothProgress, [0.73, 0.78], [0, -50]);

    // Phase 4: Dashboard (0.76 - 1.0, stays visible to end)
    const dashboardOpacity = useTransform(smoothProgress, [0.76, 0.82], [0, 1]);
    const dashboardScale = useTransform(smoothProgress, [0.76, 0.82], [0.7, 1]);
    const dashboardY = useTransform(smoothProgress, [0.76, 0.82], [80, 0]);

    const scrollHintOpacity = useTransform(smoothProgress, [0, 0.02, 0.06], [0, 1, 0]);

    const particlesOpacity = useTransform(smoothProgress, [0, 0.02, 0.95, 1.0], [0, 1, 1, 0]);

    const highlightsOpacity = useTransform(smoothProgress, (v: number) => {
        const enterOp = Math.min(1, Math.max(0, (v - 0.28) / 0.06));
        const exitOp = Math.min(1, Math.max(0, 1 - (v - 0.50) / 0.05));
        return Math.min(enterOp, exitOp);
    });
    const highlightsY = useTransform(smoothProgress, (v: number) => {
        if (v < 0.34) return 60 * (1 - Math.min(1, (v - 0.28) / 0.06));
        if (v > 0.50) return -60 * Math.min(1, (v - 0.50) / 0.05);
        return 0;
    });

    const statsOpacity = useTransform(smoothProgress, (v: number) => {
        const enterOp = Math.min(1, Math.max(0, (v - 0.53) / 0.05));
        const exitOp = Math.min(1, Math.max(0, 1 - (v - 0.73) / 0.05));
        return Math.min(enterOp, exitOp);
    });
    const statsY = useTransform(smoothProgress, (v: number) => {
        if (v < 0.58) return 50 * (1 - Math.min(1, (v - 0.53) / 0.05));
        if (v > 0.73) return -50 * Math.min(1, (v - 0.73) / 0.05);
        return 0;
    });

    return (
        <div ref={containerRef} className="relative" style={{ height: "350vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[#020810]" />

                <motion.div style={{ opacity: particlesOpacity }} className="absolute inset-0">
                    <CSSParticles />
                </motion.div>

                <AmbientGlow smoothProgress={smoothProgress} />
                <ConcentricRings smoothProgress={smoothProgress} />

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 will-change-[opacity,transform]"
                    style={{ opacity: exitOpacity, y: exitY, scale: exitScale }}
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

                        <h2 className="font-black tracking-tighter leading-[0.95] uppercase">
                            <motion.span
                                className="block text-white will-change-[opacity,transform,filter]"
                                style={{
                                    opacity: line1Opacity,
                                    filter: line1Blur,
                                    y: line1Y,
                                    scale: line1Scale,
                                    fontSize: "clamp(2.2rem, 10vw, 8rem)",
                                }}
                            >
                                Tu empresa.
                            </motion.span>
                            <motion.span
                                className="block text-white will-change-[opacity,transform,filter]"
                                style={{
                                    opacity: line2Opacity,
                                    filter: line2Blur,
                                    y: line2Y,
                                    scale: line2Scale,
                                    fontSize: "clamp(2.2rem, 10vw, 8rem)",
                                }}
                            >
                                Toda.
                            </motion.span>
                            <motion.span
                                className="block italic will-change-[opacity,transform,filter]"
                                style={{
                                    opacity: line3Opacity,
                                    filter: line3Blur,
                                    y: line3Y,
                                    scale: line3Scale,
                                    fontSize: "clamp(2.2rem, 10vw, 8rem)",
                                    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 40%, #10b981 80%, #22d3ee 100%)",
                                    backgroundSize: "300% 300%",
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
                    style={{
                        opacity: highlightsOpacity,
                        y: highlightsY,
                    }}
                >
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="text-center mb-4 sm:mb-6 md:mb-8">
                            <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/20 mb-2 sm:mb-3">
                                Todo lo que tu empresa necesita
                            </p>
                            <h3
                                className="font-black tracking-tighter text-white uppercase"
                                style={{ fontSize: "clamp(1.2rem, 4vw, 3rem)" }}
                            >
                                7 módulos integrados.
                            </h3>
                            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mx-auto mt-3 sm:mt-4" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                            {highlights.map((h, i) => (
                                <HighlightCard
                                    key={i}
                                    h={h}
                                    index={i}
                                    smoothProgress={smoothProgress}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 will-change-[opacity,transform]"
                    style={{
                        opacity: statsOpacity,
                        y: statsY,
                    }}
                >
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/20 mb-4 sm:mb-6">
                            Poder sin precedentes
                        </p>
                        <h3
                            className="font-black tracking-tighter text-white uppercase mb-8 sm:mb-12 md:mb-16"
                            style={{ fontSize: "clamp(1.4rem, 4.5vw, 3.5rem)" }}
                        >
                            Cifras que hablan por sí solas.
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                            {powerStats.map((stat, i) => (
                                <PowerStatCard
                                    key={i}
                                    stat={stat}
                                    index={i}
                                    smoothProgress={smoothProgress}
                                />
                            ))}
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
                        <h3
                            className="font-black tracking-tighter text-white uppercase mb-5 sm:mb-8"
                            style={{ fontSize: "clamp(1.2rem, 4vw, 3rem)" }}
                        >
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
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/40 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2"
                    style={{ opacity: scrollHintOpacity }}
                >
                    <span className="text-[6px] sm:text-[7px] font-bold text-white/15 uppercase tracking-[0.3em] sm:tracking-[0.45em]">
                        Desplázate para explorar
                    </span>
                    <div className="w-5 h-9 rounded-full border border-white/10 flex items-start justify-center pt-2">
                        <div className="w-1 h-1.5 rounded-full bg-cyan-400/50 animate-scroll-dot" />
                    </div>
                </motion.div>

                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#020810] to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020810] to-transparent pointer-events-none z-20" />
            </div>
        </div>
    );
}
