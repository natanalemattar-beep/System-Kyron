"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck, ChevronRight, Loader2, MessageSquareHeart, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

const QUESTIONS = [
    {
        id: "industry",
        label: "Indique el sector económico al que pertenece su organización:",
        type: "choice" as const,
        options: ["Comercio & Retail", "Manufactura & Industria", "Servicios Profesionales", "Tecnología & Energía", "Alimentos & Bebidas", "Logística & Suministros"],
    },
    {
        id: "telecom_satisfaction",
        label: "¿Qué nivel de satisfacción tiene con su actual proveedor de telefonía e internet corporativo?",
        type: "rating" as const,
    },
    {
        id: "provider_improvements",
        label: "¿Qué aspecto es CRÍTICO que su proveedor actual mejore para su empresa?",
        type: "choice" as const,
        options: ["Soporte técnico inmediato 24/7", "Planes de datos más flexibles", "Integración con mi software", "Estabilidad de conexión 5G/Fiber", "Precios más competitivos"],
    },
    {
        id: "future_mobile_needs",
        label: "¿Qué funcionalidad digital le gustaría integrar en sus líneas corporativas?",
        type: "choice" as const,
        options: ["eSIM de activación inmediata", "Gestión centralizada de flota", "Telemetría & Consumo en vivo", "VPN Empresarial integrada", "Asistencia IA por voz"],
    },
    {
        id: "fiscal_priority",
        label: "Valore el nivel de importancia de integrar la fiscalidad SENIAT con sus telecomunicaciones:",
        type: "rating" as const,
    },
    {
        id: "contact",
        label: "Suministre un medio de contacto para recibir una propuesta de optimización personalizada:",
        type: "text" as const,
        placeholder: "Correo electrónico o número telefónico de contacto...",
    },
];

export default function FeedbackPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const current = QUESTIONS[step];
    const isLast = step === QUESTIONS.length - 1;

    const handleAnswer = (value: string | number) => {
        setAnswers(prev => ({ ...prev, [current.id]: value }));
        if (current.type === "choice") {
            setTimeout(() => {
                if (isLast) handleSubmit({ ...answers, [current.id]: value });
                else setStep(s => s + 1);
            }, 300);
        }
    };

    const handleNext = () => {
        if (current.type === "rating") {
            setAnswers(prev => ({ ...prev, [current.id]: rating }));
        }
        if (isLast) {
            const final = { ...answers };
            if (current.type === "rating") final[current.id] = rating;
            handleSubmit(final);
        } else {
            setStep(s => s + 1);
        }
    };

    const handleSubmit = async (finalAnswers: Record<string, string | number>) => {
        setSubmitting(true);
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers }),
            });
            
            if (response.ok) {
                setSubmitted(true);
            } else {
                setSubmitted(true);
            }
        } catch (error) {
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#03050a] flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-lg"
                >
                    <div className="h-16 w-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-8">
                        <CircleCheck className="h-8 w-8 text-slate-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight mb-4">Registro Completado</h1>
                    <p className="text-slate-400 font-medium mb-10 leading-relaxed text-sm">Agradecemos su participación en esta consulta corporativa. La información suministrada será procesada de manera confidencial por nuestro equipo técnico.</p>
                    <Button asChild variant="outline" className="h-12 px-8 rounded-lg border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase">
                        <Link href="/">Finalizar Sesión</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#03050a] flex flex-col relative overflow-hidden font-sans">
            {/* Minimalist Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent" />
            </div>

            {/* Corporate Header */}
            <div className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16 border-b border-white/5 bg-black/40 backdrop-blur-xl">
                <Link href="/" className="flex items-center gap-3 group">
                    <ArrowLeft className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 group-hover:text-white">Regresar</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] leading-none mb-1">System Kyron</p>
                        <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">División Corporativa</p>
                    </div>
                    <div className="h-10 w-10 border-l border-white/10 pl-4 flex items-center">
                        <Logo className="h-6 w-6 opacity-80" />
                    </div>
                </div>
            </div>

            {/* Professional Progress Indicator */}
            <div className="relative z-10 w-full bg-white/5 h-[2px]">
                <motion.div
                    className="h-full bg-slate-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            </div>

            {/* Main Consultation Area */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
                <div className="w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
                                        Consulta {step + 1} / {QUESTIONS.length}
                                    </span>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                                    {current.label}
                                </h2>
                            </div>

                            {/* PROFESSIONAL CHOICE GRID */}
                            {current.type === "choice" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {current.options?.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleAnswer(opt)}
                                            className={`p-6 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between group ${
                                                answers[current.id] === opt
                                                    ? "bg-slate-100 border-white text-black shadow-2xl"
                                                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                                            }`}
                                        >
                                            <span className="text-sm font-bold tracking-tight mb-2 uppercase">{opt}</span>
                                            <div className={`h-1 w-8 transition-all ${
                                                answers[current.id] === opt ? "bg-black" : "bg-white/10 group-hover:bg-white/30"
                                            }`} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* PROFESSIONAL TEXT INPUT */}
                            {current.type === "text" && (
                                <div className="space-y-6">
                                    <textarea
                                        rows={4}
                                        placeholder={current.placeholder}
                                        value={(answers[current.id] as string) || ""}
                                        onChange={e => setAnswers(prev => ({ ...prev, [current.id]: e.target.value }))}
                                        className="w-full p-8 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 font-medium text-base focus:outline-none focus:border-slate-400 transition-all resize-none shadow-inner"
                                    />
                                    <Button
                                        onClick={handleNext}
                                        disabled={submitting || !answers[current.id]}
                                        className="h-14 px-12 rounded-lg bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all disabled:opacity-20"
                                    >
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isLast ? "Completar Consulta" : "Siguiente Sección"}
                                    </Button>
                                </div>
                            )}

                            {/* PROFESSIONAL RATING SYSTEM */}
                            {current.type === "rating" && (
                                <div className="space-y-12">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => setRating(num)}
                                                onMouseEnter={() => setHoverRating(num)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className={`h-12 w-12 rounded-lg font-bold text-sm transition-all border ${
                                                    num <= (hoverRating || rating)
                                                        ? "bg-white border-white text-black scale-105 shadow-lg"
                                                        : "bg-transparent border-white/10 text-slate-500 hover:border-white/30 hover:text-white"
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                                        <span>Baja Complejidad</span>
                                        <span>Alta Complejidad</span>
                                    </div>
                                    <Button
                                        onClick={handleNext}
                                        disabled={!rating || submitting}
                                        className="w-full h-14 rounded-lg bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-[10px] transition-all"
                                    >
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar Valoración"}
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Corporate Footer */}
            <div className="relative z-10 py-10 px-16 border-t border-white/5 bg-black/60 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    © 2026 System Kyron · Caracas, Venezuela
                </p>
                <div className="flex gap-10">
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-slate-500" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">Tratamiento Confidencial</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-slate-500" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">Protocolo Corporativo</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

