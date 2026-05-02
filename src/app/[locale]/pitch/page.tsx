"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Rocket,
    Shield, BrainCircuit, TrendingUp,
    Users, Globe, Zap, CircleCheck,
    TriangleAlert, Banknote, X, ArrowRight,
    Network, DollarSign
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const slides = [
    {
        id: "cover",
        tag: "ALPHA · 2026",
        title: "SYSTEM\nKYRON",
        subtitle: "El Sistema Operativo del Sector Privado Venezolano",
        body: null,
        icon: Rocket,
        accent: "#3b82f6",
        bg: "from-blue-600/30 via-indigo-900/20 to-transparent",
        script: "Bienvenidos. No estamos presentando una app — estamos presentando la infraestructura digital que sostendrá el crecimiento empresarial en Venezuela.",
        stats: null,
    },
    {
        id: "problem",
        tag: "EL PROBLEMA",
        title: "CAOS\nDIGITAL",
        subtitle: "El empresario venezolano opera en fragmentación total",
        body: "Cada proceso crítico vive en una isla diferente: un software para facturar, otro para nómina, uno más para impuestos — y todo sobre una conexión a internet que falla cuando más se necesita.",
        icon: TriangleAlert,
        accent: "#f43f5e",
        bg: "from-rose-900/30 via-slate-900/20 to-transparent",
        script: "El empresario hoy vive en el caos: fragmentación operativa, riesgo fiscal y dependencia de herramientas que no se hablan entre sí. Esta desconexión mata la rentabilidad.",
        stats: [
            { label: "Herramientas promedio por empresa", value: "7+" },
            { label: "Tiempo perdido en procesos manuales", value: "40%" },
            { label: "Empresas sin contabilidad VEN-NIF formal", value: "68%" },
        ],
    },
    {
        id: "solution",
        tag: "LA SOLUCIÓN",
        title: "TODO\nEN UNO",
        subtitle: "Ecosistema all-in-one de grado empresarial",
        body: "Kyron unifica Contabilidad VEN-NIF automatizada, Conectividad 5G dedicada, Asesoría Legal con IA y Gestión de RRHH en un solo tablero. Control total, cero fricción.",
        icon: Shield,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-blue-900/20 to-transparent",
        script: "Kyron unifica todo: un solo login, un solo panel, un solo proveedor. Contabilidad que se hace sola, conectividad que no falla y asistencia legal en segundos.",
        stats: [
            { label: "Módulos integrados nativamente", value: "12+" },
            { label: "Reducción de costos operativos", value: "40%" },
            { label: "Tiempo de onboarding", value: "< 24h" },
        ],
    },
    {
        id: "market",
        tag: "MERCADO",
        title: "$500M+",
        subtitle: "Oportunidad direccionable en Venezuela y LATAM",
        body: "Más de 300,000 empresas del sector privado venezolano sin una solución integrada. El mercado LATAM de SaaS empresarial supera los $8B y crece al 18% anual.",
        icon: Globe,
        accent: "#06b6d4",
        bg: "from-cyan-900/30 via-blue-900/20 to-transparent",
        script: "Apuntamos a 300,000 empresas en Venezuela como mercado inicial. Una captura conservadora del 5% convierte a Kyron en el líder indiscutible del sector tecnológico local.",
        stats: [
            { label: "TAM — Venezuela + LATAM", value: "$500M+" },
            { label: "SAM — Empresas objetivo Venezuela", value: "300K+" },
            { label: "SOM — Año 3 con 5% penetración", value: "$25M" },
        ],
    },
    {
        id: "product",
        tag: "PRODUCTO",
        title: "TECNOLOGÍA\nVIVA",
        subtitle: "Tres pilares que ningún competidor puede replicar juntos",
        body: null,
        icon: Zap,
        accent: "#a855f7",
        bg: "from-purple-900/30 via-indigo-900/20 to-transparent",
        script: "Contabilidad que se hace sola, eSIMs 5G que se activan al instante, y un asistente legal que resuelve en segundos. Tres pilares, un ecosistema.",
        stats: [
            { label: "Contabilidad VEN-NIF Automatizada", value: "IA" },
            { label: "Conectividad 5G Dedicada por eSIM", value: "5G" },
            { label: "Asistencia Legal con IA las 24/7", value: "24/7" },
        ],
    },
    {
        id: "traction",
        tag: "TRACCIÓN",
        title: "100%\nRETENCIÓN",
        subtitle: "Beta validado con resultados medibles",
        body: "Nuestros primeros 50 clientes beta llevan 6 meses activos sin una sola baja. La retención habla más que cualquier proyección.",
        icon: TrendingUp,
        accent: "#10b981",
        bg: "from-emerald-600/20 via-slate-900/20 to-transparent",
        script: "50 clientes beta, 100% de retención, 6 meses de operación. No estamos proyectando — estamos reportando resultados reales.",
        stats: [
            { label: "Clientes beta activos", value: "50" },
            { label: "Retención a 6 meses", value: "100%" },
            { label: "NPS (Net Promoter Score)", value: "78" },
        ],
    },
    {
        id: "business_model",
        tag: "MODELO DE NEGOCIO",
        title: "TRIPLE-\nPLAY",
        subtitle: "SaaS recurrente + Telecom + FinTech",
        body: "Tres flujos de ingresos que se refuerzan mutuamente: suscripción mensual, margen de telecomunicaciones y comisiones por transacciones financieras B2B.",
        icon: Banknote,
        accent: "#f59e0b",
        bg: "from-amber-900/20 via-slate-900/20 to-transparent",
        script: "La magia está en la monetización cruzada: un cliente que usa el SaaS eventualmente adopta telecom y pagos. El ARPU crece solo.",
        stats: [
            { label: "ARPU mensual objetivo", value: "$180" },
            { label: "Margen bruto SaaS", value: "72%" },
            { label: "LTV / CAC proyectado", value: "8x" },
        ],
    },
    {
        id: "advantage",
        tag: "VENTAJA COMPETITIVA",
        title: "LA\nRED",
        subtitle: "Integración vertical que ningún competidor tiene",
        body: "Controlamos el tubo (datos) y el cerebro (software). Somos el único operador en Venezuela que puede ofrecer infraestructura de conectividad + software empresarial integrado nativamente.",
        icon: Network,
        accent: "#3b82f6",
        bg: "from-blue-600/20 via-slate-900/20 to-transparent",
        script: "Nuestra gran ventaja: controlamos el tubo y el cerebro. Nadie puede competir con esta estabilidad operativa porque replicar ambas capas toma años y cientos de millones.",
        stats: [
            { label: "Competidores con integración vertical", value: "0" },
            { label: "Años para replicar el stack", value: "3-5" },
            { label: "Patentes en proceso", value: "2" },
        ],
    },
    {
        id: "team",
        tag: "EL EQUIPO",
        title: "EXPERTOS\nEN CAMPO",
        subtitle: "Veteranos de Big Four y Telecomunicaciones",
        body: "El equipo fundador combina experiencia en consultoría Big Four, telecomunicaciones empresariales y desarrollo de software a escala. Sabemos cómo ejecutar en Venezuela.",
        icon: Users,
        accent: "#8b5cf6",
        bg: "from-violet-900/20 via-slate-900/20 to-transparent",
        script: "No aprendemos sobre la marcha. Traemos años de experiencia construyendo sistemas de misión crítica en el entorno venezolano — el más complejo de LATAM.",
        stats: [
            { label: "Años de experiencia combinada", value: "25+" },
            { label: "Industrias cubiertas", value: "8" },
            { label: "Proyectos de tecnología ejecutados", value: "40+" },
        ],
    },
    {
        id: "roadmap",
        tag: "ROADMAP",
        title: "Q3 · Q4\n2026",
        subtitle: "Expansión nacional y lanzamiento de Kyron Pay",
        body: null,
        icon: Rocket,
        accent: "#6366f1",
        bg: "from-indigo-600/20 via-slate-900/20 to-transparent",
        script: "Q3: Despliegue nacional de red 5G y 500 nuevas empresas. Q4: Kyron Pay para transacciones B2B automatizadas y expansión a Colombia.",
        stats: [
            { label: "Q3 2026 — Despliegue 5G Nacional", value: "500 emp." },
            { label: "Q4 2026 — Kyron Pay B2B", value: "Live" },
            { label: "Q1 2027 — Expansión Colombia", value: "Planif." },
        ],
    },
    {
        id: "cta",
        tag: "INVERSIÓN",
        title: "$2.5M\nUSD",
        subtitle: "Capital semilla para la Revolución 5G",
        body: "Buscamos inversión estratégica para desplegar nuestra red 5G a nivel nacional, blindar operativamente a 10,000 nuevas empresas y lanzar Kyron Pay antes de fin de 2026.",
        icon: DollarSign,
        accent: "#3b82f6",
        bg: "from-blue-600/30 via-indigo-600/20 to-transparent",
        script: "Dos millones y medio de dólares para escalar lo que ya funciona. No estamos probando hipótesis — estamos acelerando una realidad validada.",
        stats: [
            { label: "Uso: Infraestructura 5G", value: "60%" },
            { label: "Uso: Tecnología y equipo", value: "30%" },
            { label: "Uso: GTM y ventas", value: "10%" },
        ],
    },
    {
        id: "closing",
        tag: "CIERRE",
        title: "EL\nFUTURO",
        subtitle: "System Kyron está listo. ¿Lo están ustedes?",
        body: "Venezuela necesita infraestructura digital empresarial de clase mundial. Nosotros ya la construimos. La pregunta es quién quiere ser parte de este sistema.",
        icon: CircleCheck,
        accent: "#10b981",
        bg: "from-emerald-600/20 via-blue-900/20 to-transparent",
        script: "System Kyron está listo. La pregunta es: ¿Están listos para ser parte del sistema operativo del futuro empresarial de Venezuela? Muchas gracias.",
        stats: null,
    },
];

export default function PitchPage() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((p) => (p + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((p) => (p - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
            if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    const slide = slides[current];
    const progress = ((current + 1) / slides.length) * 100;

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d * 60, filter: "blur(12px)" }),
        center: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: (d: number) => ({ opacity: 0, x: d * -60, filter: "blur(12px)" }),
    };

    return (
        <div className="fixed inset-0 bg-[#04060f] text-white flex flex-col overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id + "-bg"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className={cn("absolute inset-0 bg-gradient-to-br", slide.bg)}
                    />
                </AnimatePresence>
                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "64px 64px"
                    }}
                />
            </div>

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: slide.accent + "22", border: `1px solid ${slide.accent}44` }}>
                        <Rocket className="h-4 w-4" style={{ color: slide.accent }} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black tracking-[0.35em] uppercase text-white/30">System Kyron</p>
                        <p className="text-[10px] font-bold tracking-widest text-white/60">Investor Pitch · 2026</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Progress bar */}
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-[10px] font-bold text-white/30 tabular-nums">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
                        <div className="h-0.5 w-32 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: slide.accent }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>
                    {/* Dot nav */}
                    <div className="hidden md:flex items-center gap-1.5">
                        {slides.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                                className="rounded-full transition-all"
                                style={{
                                    width: i === current ? "20px" : "6px",
                                    height: "6px",
                                    backgroundColor: i === current ? slide.accent : "rgba(255,255,255,0.15)",
                                }}
                            />
                        ))}
                    </div>
                    <Link href="/" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
                        <X className="h-4 w-4 text-white/40" />
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 relative overflow-hidden flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
                    >
                        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left */}
                            <div className="space-y-8">
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] uppercase"
                                    style={{ backgroundColor: slide.accent + "18", border: `1px solid ${slide.accent}35`, color: slide.accent }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: slide.accent }} />
                                    {slide.tag}
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-6xl md:text-8xl xl:text-[100px] font-black leading-[0.85] tracking-tighter"
                                >
                                    {slide.title.split("\n").map((line, i) => (
                                        <span key={i} style={{ display: "block", color: i === 0 ? "white" : "rgba(255,255,255,0.2)" }}>
                                            {line}
                                        </span>
                                    ))}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xl md:text-2xl text-white/50 font-medium leading-snug max-w-lg"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                {slide.body && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-base text-white/35 leading-relaxed max-w-md"
                                    >
                                        {slide.body}
                                    </motion.p>
                                )}
                            </div>

                            {/* Right — Stats or Icon */}
                            <div className="hidden lg:block">
                                {slide.stats ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="space-y-4"
                                    >
                                        {slide.stats.map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.35 + i * 0.08 }}
                                                className="p-6 rounded-2xl border flex items-center justify-between gap-6"
                                                style={{ backgroundColor: slide.accent + "08", borderColor: slide.accent + "20" }}
                                            >
                                                <span className="text-sm text-white/40 font-medium">{stat.label}</span>
                                                <span className="text-3xl font-black tabular-nums" style={{ color: slide.accent }}>{stat.value}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="flex items-center justify-center"
                                    >
                                        <div
                                            className="h-64 w-64 rounded-[3rem] flex items-center justify-center"
                                            style={{ backgroundColor: slide.accent + "10", border: `1px solid ${slide.accent}25` }}
                                        >
                                            <slide.icon className="h-32 w-32" style={{ color: slide.accent + "60" }} />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer / Teleprompter + Controls */}
            <footer className="relative z-20 border-t border-white/[0.06] px-8 py-5">
                <div className="max-w-7xl mx-auto flex items-center gap-8">
                    {/* Script */}
                    <div className="flex-1 relative">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: slide.accent }} />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: slide.accent }}>Script</span>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={current + "-script"}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm md:text-base text-white/40 font-medium italic leading-relaxed line-clamp-2"
                            >
                                "{slide.script}"
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft className="h-5 w-5 text-white/60" />
                        </button>
                        <button
                            onClick={next}
                            disabled={current === slides.length - 1}
                            className="h-12 px-5 rounded-xl flex items-center gap-2 font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                            style={{ backgroundColor: slide.accent }}
                        >
                            {current === slides.length - 1 ? "Fin" : "Siguiente"}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile progress */}
                <div className="md:hidden mt-3 flex items-center gap-2">
                    <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: slide.accent }} animate={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[10px] text-white/30 tabular-nums">{current + 1}/{slides.length}</span>
                </div>
            </footer>
        </div>
    );
}
