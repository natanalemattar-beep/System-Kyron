'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Calculator, Shield, Brain, Zap, Signal, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

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
        glow: "rgba(59,130,246,0.4)",
        label: "Contabilidad & Fiscal",
        desc: "IVA, IGTF e ISLR calculados automáticamente. Libros VEN-NIF y cumplimiento SENIAT en tiempo real.",
        stat: "100%",
        statLabel: "Cumplimiento fiscal",
    },
    {
        icon: Signal,
        color: "from-cyan-400 to-blue-500",
        glow: "rgba(34,211,238,0.4)",
        label: "Mi Línea 5G",
        desc: "Provisión de líneas eSIM 5G, gestión de flota móvil empresarial y conectividad de alto rendimiento.",
        stat: "5G",
        statLabel: "Velocidad de red",
    },
    {
        icon: Brain,
        color: "from-violet-500 to-purple-600",
        glow: "rgba(139,92,246,0.4)",
        label: "IA Integrada",
        desc: "Asistente Kyron con Gemini 2.0 y GPT-4o. Automatiza reportes, genera documentos y analiza datos.",
        stat: "2.0",
        statLabel: "Gemini Flash",
    },
    {
        icon: Shield,
        color: "from-emerald-500 to-cyan-600",
        glow: "rgba(16,185,129,0.4)",
        label: "Seguridad AES-256",
        desc: "Cifrado de grado bancario, JWT con HTTP-only cookies y auditoría inmutable de cada operación.",
        stat: "256",
        statLabel: "Bits de cifrado",
    },
    {
        icon: Users,
        color: "from-orange-400 to-rose-500",
        glow: "rgba(251,146,60,0.4)",
        label: "RR.HH & Nómina",
        desc: "Gestión LOTTT completa: nóminas, beneficios laborales, vacaciones y liquidaciones en un clic.",
        stat: "LOTTT",
        statLabel: "Marco legal",
    },
    {
        icon: Zap,
        color: "from-yellow-400 to-orange-500",
        glow: "rgba(250,204,21,0.35)",
        label: "Facturación Fiscal",
        desc: "Facturas y notas de crédito/débito con validación IGTF y tasa BCV actualizada automáticamente.",
        stat: "3%",
        statLabel: "IGTF automático",
    },
];

function HighlightCard({
    h,
    index,
    smoothProgress,
}: {
    h: Highlight;
    index: number;
    smoothProgress: MotionValue<number>;
}) {
    const cardStart = 0.34 + index * 0.035;
    const cardEnd = cardStart + 0.06;
    const Icon = h.icon;

    const cardOpacity = useTransform(smoothProgress, [cardStart, cardEnd], [0, 1]);
    const cardY = useTransform(smoothProgress, [cardStart, cardEnd], [30, 0]);
    const cardBlur = useTransform(smoothProgress, [cardStart, cardEnd], [8, 0]);
    const filterVal = useTransform(cardBlur, (v) => `blur(${v}px)`);

    return (
        <motion.div
            style={{ opacity: cardOpacity, y: cardY, filter: filterVal }}
            className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm p-4 md:p-5 overflow-hidden hover:border-white/15 transition-colors duration-500"
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                    background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${h.glow.replace("0.4", "0.07")} 0%, transparent 70%)`,
                }}
            />
            <div className="flex items-start justify-between mb-3">
                <div
                    className={`h-9 w-9 rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center flex-shrink-0`}
                    style={{ boxShadow: `0 4px 16px -4px ${h.glow}` }}
                >
                    <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-right">
                    <p className="text-base font-black text-white/90 leading-none">{h.stat}</p>
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider leading-tight mt-0.5">
                        {h.statLabel}
                    </p>
                </div>
            </div>
            <p className="text-[11px] font-black uppercase tracking-wider text-white/80 mb-1">{h.label}</p>
            <p className="text-[10px] text-white/35 leading-relaxed">{h.desc}</p>
        </motion.div>
    );
}

export function ScrollCinematicSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });

    const bgScale = useTransform(smoothProgress, [0, 0.22], [1, 1.08]);
    const bgOpacity = useTransform(smoothProgress, [0, 0.04, 0.22, 0.30], [0, 1, 1, 0]);

    const taglineOpacity = useTransform(smoothProgress, [0.01, 0.06], [0, 1]);
    const taglineY = useTransform(smoothProgress, [0.01, 0.06], [28, 0]);

    const line1Opacity = useTransform(smoothProgress, [0.05, 0.11], [0, 1]);
    const line1BlurRaw = useTransform(smoothProgress, [0.05, 0.11], [14, 0]);
    const line1Blur = useTransform(line1BlurRaw, (v) => `blur(${v}px)`);
    const line1Y = useTransform(smoothProgress, [0.05, 0.11], [44, 0]);

    const line2Opacity = useTransform(smoothProgress, [0.09, 0.155], [0, 1]);
    const line2BlurRaw = useTransform(smoothProgress, [0.09, 0.155], [14, 0]);
    const line2Blur = useTransform(line2BlurRaw, (v) => `blur(${v}px)`);
    const line2Y = useTransform(smoothProgress, [0.09, 0.155], [44, 0]);

    const line3Opacity = useTransform(smoothProgress, [0.14, 0.20], [0, 1]);
    const line3BlurRaw = useTransform(smoothProgress, [0.14, 0.20], [14, 0]);
    const line3Blur = useTransform(line3BlurRaw, (v) => `blur(${v}px)`);
    const line3Y = useTransform(smoothProgress, [0.14, 0.20], [44, 0]);

    const subtitleOpacity = useTransform(smoothProgress, [0.17, 0.22], [0, 1]);
    const subtitleY = useTransform(smoothProgress, [0.17, 0.22], [20, 0]);

    const exitOpacity = useTransform(smoothProgress, [0.22, 0.30], [1, 0]);
    const exitY = useTransform(smoothProgress, [0.22, 0.30], [0, -50]);

    const featuresOpacity = useTransform(smoothProgress, [0.28, 0.36], [0, 1]);
    const featuresY = useTransform(smoothProgress, [0.28, 0.36], [50, 0]);

    const scrollHintOpacity = useTransform(smoothProgress, [0, 0.02, 0.08], [0, 1, 0]);

    return (
        <div ref={containerRef} className="relative" style={{ height: "560vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[#030B1A]" />

                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: bgOpacity, scale: bgScale }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: [
                                "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(6,182,212,0.10) 0%, transparent 60%)",
                                "radial-gradient(ellipse 60% 50% at 20% 70%, rgba(59,130,246,0.08) 0%, transparent 60%)",
                                "radial-gradient(ellipse 50% 40% at 80% 60%, rgba(16,185,129,0.06) 0%, transparent 60%)",
                            ].join(", "),
                        }}
                    />
                </motion.div>

                <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none" />

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-6"
                    style={{ opacity: exitOpacity, y: exitY }}
                >
                    <div className="text-center max-w-5xl mx-auto w-full">
                        <motion.div
                            style={{ opacity: taglineOpacity, y: taglineY }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.45em] text-cyan-400/60">
                                <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/40 inline-block" />
                                System Kyron — Inteligencia Corporativa
                                <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/40 inline-block" />
                            </span>
                        </motion.div>

                        <h2 className="font-black tracking-tighter leading-[1.0] uppercase">
                            <motion.span
                                className="block text-white"
                                style={{
                                    opacity: line1Opacity,
                                    filter: line1Blur,
                                    y: line1Y,
                                    fontSize: "clamp(3rem, 9vw, 7.5rem)",
                                }}
                            >
                                Tu empresa.
                            </motion.span>
                            <motion.span
                                className="block text-white"
                                style={{
                                    opacity: line2Opacity,
                                    filter: line2Blur,
                                    y: line2Y,
                                    fontSize: "clamp(3rem, 9vw, 7.5rem)",
                                }}
                            >
                                Toda.
                            </motion.span>
                            <motion.span
                                className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent"
                                style={{
                                    opacity: line3Opacity,
                                    filter: line3Blur,
                                    y: line3Y,
                                    fontSize: "clamp(3rem, 9vw, 7.5rem)",
                                    backgroundSize: "200% auto",
                                }}
                            >
                                En un solo lugar.
                            </motion.span>
                        </h2>

                        <motion.p
                            style={{ opacity: subtitleOpacity, y: subtitleY }}
                            className="mt-8 text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
                        >
                            Contabilidad, nóminas, facturación, 5G y mucho más — diseñado para Venezuela,
                            con IA integrada y cumplimiento fiscal automatizado.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-10"
                    style={{ opacity: featuresOpacity, y: featuresY }}
                >
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="text-center mb-8">
                            <p className="text-[9px] font-black uppercase tracking-[0.45em] text-white/25 mb-2">
                                Todo lo que tu empresa necesita
                            </p>
                            <h3
                                className="font-black tracking-tighter text-white uppercase"
                                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                            >
                                12+ módulos integrados.
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    style={{ opacity: scrollHintOpacity }}
                >
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">
                        Desplázate
                    </span>
                    <div className="w-5 h-8 rounded-full border border-white/12 flex items-start justify-center pt-1.5">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-1.5 rounded-full bg-white/35"
                        />
                    </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
