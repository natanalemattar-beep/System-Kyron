'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
    Sparkles, 
    ShieldCheck, 
    Zap, 
    Globe, 
    ArrowRight, 
    ChevronRight,
    TrendingUp,
    Lock,
    Cpu,
    CheckCircle2,
    PlayCircle,
    Building2,
    Users,
    Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const slides = [
    {
        id: "hero",
        title: "System Kyron",
        subtitle: "La Próxima Frontera de la Inteligencia Corporativa en Venezuela",
        description: "Unificando contabilidad, telecomunicaciones e inteligencia artificial en una sola infraestructura de misión crítica.",
        icon: Rocket,
        color: "from-cyan-500 to-blue-600",
        bg: "bg-background"
    },
    {
        id: "problem",
        title: "El Caos Operativo",
        subtitle: "La fragmentación mata la eficiencia",
        description: "Las empresas venezolanas operan hoy con herramientas desconectadas: Excel para nómina, otro software para contabilidad, y procesos manuales para la tasa BCV y el SENIAT.",
        icon: Zap,
        color: "from-rose-500 to-orange-600",
        points: [
            "Datos duplicados y errores manuales",
            "Falta de visibilidad en tiempo real",
            "Riesgo de incumplimiento fiscal (SENIAT)",
            "Lentitud en la toma de decisiones"
        ]
    },
    {
        id: "solution",
        title: "La Solución Kyron",
        subtitle: "Un Ecosistema, Control Total",
        description: "Diseñamos la primera plataforma 'All-in-One' adaptada 100% a la realidad venezolana. No adaptamos software extranjero; construimos soberanía tecnológica.",
        icon: HexagonIcon,
        color: "from-emerald-500 to-teal-600",
        points: [
            "Sincronización BCV Automática",
            "Cumplimiento VEN-NIF Nativo",
            "Triple Motor de IA (Claude, Gemini, GPT)",
            "Conectividad 5G Integrada"
        ]
    },
    {
        id: "security",
        title: "Seguridad Grado Bancario",
        subtitle: "Confianza Inquebrantable",
        description: "Protegemos el activo más valioso de su empresa: su información. Con protocolos de cifrado militar y auditoría inmutable.",
        icon: Lock,
        color: "from-blue-600 to-indigo-700",
        stats: [
            { label: "Cifrado", value: "AES-256" },
            { label: "Auth", value: "JWT + 2FA" },
            { label: "Audit", value: "Blockchain" }
        ]
    },
    {
        id: "future",
        title: "El Futuro es Hoy",
        subtitle: "Únase a la Revolución Corporativa",
        description: "No espere a que el futuro lo alcance. Lidere su sector con la infraestructura tecnológica más avanzada de Venezuela.",
        icon: Sparkles,
        color: "from-violet-600 to-purple-700",
        cta: true
    }
];

function HexagonIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    );
}

export default function PitchPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeSlide, setActiveSlide] = useState(0);
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * slides.length),
            slides.length - 1
        );
        if (index !== activeSlide) setActiveSlide(index);
    });

    return (
        <div ref={containerRef} className="relative min-h-[500vh] bg-[#02040a] text-white selection:bg-cyan-500/30 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-[100] p-6 md:p-10 flex justify-between items-center bg-gradient-to-b from-[#02040a] to-transparent">
                <Link href="/" className="flex items-center gap-3 group">
                    <Logo className="h-10 w-10 drop-shadow-glow group-hover:scale-105 transition-transform" />
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-widest uppercase italic">System Kyron</span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.4em] kyron-gradient-text">Pitch Deck 2026</span>
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {slides.map((slide, i) => (
                        <button
                            key={slide.id}
                            onClick={() => window.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' })}
                            className={cn(
                                "text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                activeSlide === i ? "text-cyan-400 scale-110" : "text-white/30 hover:text-white/60"
                            )}
                        >
                            {slide.id}
                        </button>
                    ))}
                </div>
                <Button asChild className="rounded-full px-8 bg-white text-black hover:bg-cyan-400 hover:text-white transition-all font-black text-xs tracking-widest">
                    <Link href="/register">ACCEDER AHORA</Link>
                </Button>
            </header>

            {/* Progress bar */}
            <motion.div 
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 z-[101] origin-left"
                style={{ scaleX: smoothProgress }}
            />

            {/* Slides container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    {slides.map((slide, index) => index === activeSlide && (
                        <motion.section
                            key={slide.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center p-6 md:p-20"
                        >
                            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                {/* Text Content */}
                                <div className="space-y-8">
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className={cn("inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.2em]", slide.color.split(' ')[0].replace('from-', 'text-'))}
                                    >
                                        <slide.icon className="h-4 w-4" />
                                        0{index + 1} // {slide.id}
                                    </motion.div>

                                    <div className="space-y-4">
                                        <motion.h1 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none"
                                        >
                                            {slide.title}
                                        </motion.h1>
                                        <motion.h2 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-xl md:text-2xl font-bold text-white/60 tracking-tight"
                                        >
                                            {slide.subtitle}
                                        </motion.h2>
                                    </div>

                                    <motion.p 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-lg md:text-xl text-white/40 leading-relaxed max-w-xl"
                                    >
                                        {slide.description}
                                    </motion.p>

                                    {slide.points && (
                                        <motion.ul 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            {slide.points.map((point, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/80 group">
                                                    <div className={cn("h-6 w-6 rounded-lg flex items-center justify-center shrink-0 transition-all group-hover:scale-110", slide.color.split(' ')[0].replace('from-', 'bg-') + "/10")}>
                                                        <CheckCircle2 className={cn("h-3.5 w-3.5", slide.color.split(' ')[0].replace('from-', 'text-'))} />
                                                    </div>
                                                    {point}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}

                                    {slide.stats && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="grid grid-cols-3 gap-8"
                                        >
                                            {slide.stats.map((stat, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="text-3xl font-black italic kyron-gradient-text">{stat.value}</div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {slide.cta && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                            className="flex flex-col sm:flex-row gap-4 pt-4"
                                        >
                                            <Button asChild size="lg" className="rounded-2xl px-10 h-14 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-black text-sm tracking-widest border-0 shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
                                                <Link href="/register">COMENZAR AHORA</Link>
                                            </Button>
                                            <Button asChild variant="outline" size="lg" className="rounded-2xl px-10 h-14 border-white/10 bg-white/5 hover:bg-white/10 font-black text-sm tracking-widest transition-all">
                                                <Link href="/manual-usuario">VER GUÍA</Link>
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Visual Element */}
                                <div className="relative hidden lg:block h-[500px]">
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.4, duration: 1 }}
                                        className={cn("absolute inset-0 rounded-[40px] bg-gradient-to-br opacity-20 blur-3xl", slide.color)}
                                    />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 40, rotateY: -20 }}
                                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="relative z-10 w-full h-full rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden p-1 flex items-center justify-center group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                                        
                                        {index === 0 && (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <Logo className="h-48 w-48 drop-shadow-[0_0_50px_rgba(34,211,238,0.4)] animate-kyron-breathe" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-64 h-64 border-2 border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
                                                    <div className="w-80 h-80 border border-violet-500/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                                                </div>
                                            </div>
                                        )}

                                        {index === 1 && (
                                            <div className="grid grid-cols-2 gap-4 p-10 w-full opacity-40">
                                                {[1,2,3,4,5,6,7,8].map(i => (
                                                    <div key={i} className="h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                                                ))}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Zap className="h-24 w-24 text-rose-500 drop-shadow-glow" />
                                                </div>
                                            </div>
                                        )}

                                        {index === 2 && (
                                            <div className="space-y-6 w-full px-12">
                                                {[1,2,3].map(i => (
                                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                                        <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                                        </div>
                                                        <div className="h-3 w-32 bg-white/10 rounded-full" />
                                                    </div>
                                                ))}
                                                <motion.div 
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                    className="absolute -right-20 -bottom-20 opacity-20"
                                                >
                                                    <HexagonIcon className="h-64 w-64 text-emerald-500" />
                                                </motion.div>
                                            </div>
                                        )}

                                        {index === 3 && (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-48 h-48 bg-blue-500/20 rounded-full blur-[60px]" />
                                                </div>
                                                <div className="relative space-y-6 text-center">
                                                    <Lock className="h-32 w-32 mx-auto text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                                                    <div className="font-mono text-[10px] text-blue-400/50 tracking-[0.5em] uppercase">AES-256 Verified</div>
                                                </div>
                                            </div>
                                        )}

                                        {index === 4 && (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-violet-600/20 animate-kyron-flow" />
                                                <Rocket className="h-40 w-40 text-white drop-shadow-glow animate-kyron-breathe" />
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[100]">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => window.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' })}
                            className={cn(
                                "h-2 transition-all rounded-full",
                                activeSlide === i ? "w-10 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Footer indicator */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 opacity-40">
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Scroll para explorar</span>
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-10 w-[1px] bg-gradient-to-b from-white to-transparent" 
                />
            </div>
        </div>
    );
}

function useMotionValueEvent(value: any, event: string, callback: (v: any) => void) {
    useEffect(() => {
        return value.on(event, callback);
    }, [value, event, callback]);
}
