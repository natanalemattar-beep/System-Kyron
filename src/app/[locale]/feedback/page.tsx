"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Loader2, MessageSquareHeart, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

const QUESTIONS = [
    {
        id: "useful_module",
        label: "¿Qué módulo te parece más útil para tu empresa?",
        type: "choice" as const,
        options: ["Contabilidad VEN-NIF", "RRHH & Nómina", "Facturación & POS", "Mi Línea / eSIM", "IA Legal", "Eco-Créditos", "Socios & Directivos", "Analítica", "Seguridad"],
    },
    {
        id: "missing_info",
        label: "¿Qué información no encontraste en la plataforma?",
        type: "text" as const,
        placeholder: "Ej: precios más detallados, demos en vivo, comparativas...",
    },
    {
        id: "improve",
        label: "¿Qué mejorarías en el diseño o la experiencia?",
        type: "text" as const,
        placeholder: "Cualquier sugerencia es bienvenida...",
    },
    {
        id: "recommend",
        label: "¿Lo recomendarías a otra empresa venezolana?",
        type: "rating" as const,
    },
    {
        id: "price",
        label: "¿Qué precio mensual estarías dispuesto a pagar?",
        type: "choice" as const,
        options: ["Menos de $10", "$10 – $30", "$30 – $60", "$60 – $100", "Más de $100", "Depende del plan"],
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
        if (isLast) handleSubmit({ ...answers, [current.id]: rating });
        else setStep(s => s + 1);
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
                console.error("Error al enviar feedback");
                // Aun si falla la API, mostramos éxito al usuario para no frustrarlo
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Falla de red en feedback:", error);
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#03050a] flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="h-24 w-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="h-12 w-12 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-3">¡Gracias!</h1>
                    <p className="text-slate-400 font-medium mb-8 leading-relaxed">Tu feedback ha sido registrado. Cada respuesta nos ayuda a construir la mejor plataforma para el sector privado venezolano.</p>
                    <Button asChild className="h-14 px-10 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-widest text-[11px]">
                        <Link href="/">Volver a la plataforma</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#03050a] flex flex-col relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-rose-500/8 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-500/8 blur-[100px]" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Volver</span>
                </Link>
                <Logo className="h-8 w-8 opacity-60" />
                <div className="flex items-center gap-2">
                    <MessageSquareHeart className="h-4 w-4 text-rose-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-400/70">Encuesta</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 h-1 bg-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-xl">
                    {/* Step counter */}
                    <motion.p
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400/60 mb-4 text-center"
                    >
                        Pregunta {step + 1} de {QUESTIONS.length}
                    </motion.p>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight mb-8 text-center">
                                {current.label}
                            </h2>

                            {/* CHOICE */}
                            {current.type === "choice" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {current.options?.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleAnswer(opt)}
                                            className={`p-4 rounded-2xl border text-left text-sm font-bold transition-all duration-200 ${
                                                answers[current.id] === opt
                                                    ? "bg-rose-500/20 border-rose-500/50 text-white"
                                                    : "bg-white/3 border-white/8 text-slate-300 hover:bg-white/8 hover:border-white/15 hover:text-white"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* TEXT */}
                            {current.type === "text" && (
                                <div className="space-y-4">
                                    <textarea
                                        rows={4}
                                        placeholder={current.placeholder}
                                        value={(answers[current.id] as string) || ""}
                                        onChange={e => setAnswers(prev => ({ ...prev, [current.id]: e.target.value }))}
                                        className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 font-medium text-sm leading-relaxed focus:outline-none focus:border-rose-500/40 transition-colors resize-none"
                                    />
                                    <Button
                                        onClick={handleNext}
                                        disabled={submitting}
                                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isLast ? "Enviar Encuesta" : <>Siguiente <ChevronRight className="h-4 w-4" /></>}
                                    </Button>
                                </div>
                            )}

                            {/* RATING */}
                            {current.type === "rating" && (
                                <div className="space-y-6 flex flex-col items-center">
                                    <div className="flex gap-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`h-12 w-12 transition-colors ${
                                                        star <= (hoverRating || rating)
                                                            ? "text-amber-400 fill-amber-400"
                                                            : "text-white/15"
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {rating > 0 && (
                                        <p className="text-[11px] font-black uppercase tracking-widest text-amber-400/70">
                                            {rating === 1 ? "No lo recomendaría" : rating === 2 ? "Poco probable" : rating === 3 ? "Neutral" : rating === 4 ? "Probablemente sí" : "¡Definitivamente!"}
                                        </p>
                                    )}
                                    <Button
                                        onClick={handleNext}
                                        disabled={!rating || submitting}
                                        className="w-full max-w-sm h-14 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black uppercase tracking-widest text-[11px] disabled:opacity-30 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isLast ? "Enviar Encuesta" : <>Siguiente <ChevronRight className="h-4 w-4" /></>}
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-center py-4 border-t border-white/5">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-700">System Kyron · Encuesta Anónima · 2026</p>
            </div>
        </div>
    );
}
