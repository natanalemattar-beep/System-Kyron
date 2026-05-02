"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronLeft, ChevronRight, Play, Presentation, 
    Shield, Smartphone, BrainCircuit, TrendingUp, 
    Users, Rocket, Globe, Zap, Landmark, Map, CircleCheck,
    TriangleAlert, Banknote, Eye, X
} from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const slides = [
    {
        id: "cover",
        title: "SYSTEM KYRON",
        subtitle: "The Operating System of the Private Sector",
        tag: "ALPHA PHASE 2026",
        icon: Rocket,
        bg: "from-blue-600 via-indigo-900 to-[#050816]",
        script: "Bienvenidos a System Kyron. No estamos presentando una app; estamos presentando la infraestructura digital que sostendrá el crecimiento empresarial en Venezuela."
    },
    {
        id: "problem",
        title: "EL CAOS",
        subtitle: "Fragmentación & Riesgo Operativo",
        tag: "THE CHALLENGE",
        icon: TriangleAlert,
        bg: "from-rose-900/40 via-slate-900 to-[#050816]",
        script: "El empresario hoy vive en el caos: un software para facturar, un gestor para impuestos y una conexión a internet que falla cuando más se necesita. Esta desconexión mata la rentabilidad."
    },
    {
        id: "solution",
        title: "LA SOLUCIÓN",
        subtitle: "Ecosistema All-in-One de Grado Bancario",
        tag: "THE VISION",
        icon: Shield,
        bg: "from-emerald-900/40 via-blue-900/40 to-[#050816]",
        script: "Kyron unifica todo: Contabilidad VEN-NIF automatizada, Conectividad 5G dedicada y Consultoría Legal con IA. Un solo tablero, control total."
    },
    {
        id: "market",
        title: "$500M+",
        subtitle: "Oportunidad de Mercado en Expansión",
        tag: "MARKET SIZE",
        icon: Globe,
        bg: "from-cyan-900/40 via-blue-900/40 to-[#050816]",
        script: "Apuntamos a un mercado total de más de 300,000 empresas. Con una captura conservadora del 5%, Kyron se convierte en un gigante tecnológico regional."
    },
    {
        id: "product",
        title: "PRODUCTO",
        subtitle: "Tecnología que se siente como Magia",
        tag: "LIVE TECH",
        icon: Zap,
        bg: "from-purple-900/40 via-indigo-900/40 to-[#050816]",
        script: "Contabilidad que se hace sola, eSIMs que se activan al instante y un asistente legal que resuelve dudas en segundos. Eso es Kyron."
    },
    {
        id: "traction",
        title: "TRACCIÓN",
        subtitle: "Crecimiento Exponencial Validado",
        tag: "MILESTONES",
        icon: TrendingUp,
        bg: "from-emerald-600/20 via-slate-900 to-[#050816]",
        script: "Ya hemos validado el modelo con nuestros primeros 50 clientes beta, logrando una retención del 100% y una reducción del 40% en sus costos operativos."
    },
    {
        id: "business_model",
        title: "TRIPLE-PLAY",
        subtitle: "SaaS + FinTech + Telecom",
        tag: "REVENUE STREAMS",
        icon: Banknote,
        bg: "from-emerald-950/60 via-slate-900 to-[#050816]",
        script: "Nuestra monetización es robusta: suscripciones mensuales, márgenes de telecomunicaciones y comisiones por procesamiento financiero."
    },
    {
        id: "advantage",
        title: "VENTAJA",
        subtitle: "Integración Vertical Imbatible",
        tag: "THE MOAT",
        icon: BrainCircuit,
        bg: "from-blue-600/20 via-slate-900 to-[#050816]",
        script: "Nuestra gran ventaja: controlamos el tubo (los datos) y el cerebro (el software). Nadie en el mercado puede ofrecer esta estabilidad operativa."
    },
    {
        id: "competition",
        title: "EL OCÉANO",
        subtitle: "Kyron vs Software Tradicional",
        tag: "COMPETITION",
        icon: Map,
        bg: "from-blue-900/30 via-indigo-900/30 to-[#050816]",
        script: "Mientras otros son solo software, nosotros somos infraestructura. No competimos contra el contador, le damos superpoderes con nuestra red dedicada."
    },
    {
        id: "team",
        title: "EL EQUIPO",
        subtitle: "Expertos en Ejecución de Misión Crítica",
        tag: "THE FOUNDERS",
        icon: Users,
        bg: "from-blue-800/20 via-purple-800/20 to-[#050816]",
        script: "Contamos con veteranos de las Big Four y expertos en telecomunicaciones. No estamos aprendiendo sobre la marcha; sabemos cómo escalar sistemas complejos."
    },
    {
        id: "roadmap",
        title: "ROADMAP",
        subtitle: "Escalando la Revolución Digital",
        tag: "FUTURE STEPS",
        icon: Rocket,
        bg: "from-indigo-600/30 via-slate-900 to-[#050816]",
        script: "Q3 2026: Despliegue nacional de red 5G. Q4 2026: Lanzamiento de Kyron Pay para transacciones B2B automatizadas."
    },
    {
        id: "cta",
        title: "$2.5M USD",
        subtitle: "Capital para la Revolución 5G",
        tag: "INVESTMENT",
        icon: Rocket,
        bg: "from-blue-600 via-indigo-600 to-[#050816]",
        script: "Buscamos inversión estratégica para desplegar nuestra red 5G a nivel nacional y blindar operativamente a 10,000 nuevas empresas este año."
    },
    {
        id: "closing",
        title: "CIERRE",
        subtitle: "Blindando el Futuro de Venezuela",
        tag: "THE END",
        icon: CheckCircle,
        bg: "from-blue-600 to-indigo-900",
        script: "System Kyron está listo. La pregunta es: ¿Están listos para ser parte del sistema operativo del futuro? Muchas gracias."
    }
];

export default function PitchPage() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    const currentSlide = slides[current];

    return (
        <div className="fixed inset-0 bg-[#050816] text-white flex flex-col overflow-hidden z-[100]">
            {/* HUD Grid Overlay */}
            <div className="absolute inset-0 hud-grid opacity-10 pointer-events-none" />
            
            {/* Header / HUD */}
            <header className="relative z-20 p-6 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-0.5">Project Alpha</h1>
                        <p className="text-xs font-bold tracking-widest text-white">SYSTEM KYRON</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-white/60 tracking-wider">SECURE CONNECTION ACTIVE</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{current + 1} / {slides.length}</span>
                        <div className="h-1 w-12 md:w-24 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                initial={{ width: 0 }}
                                animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild className="rounded-xl hover:bg-white/10">
                        <Link href="/">
                            <X className="h-5 w-5 text-white/40 hover:text-white transition-colors" />
                        </Link>
                    </Button>
                </div>
            </header>

            {/* Slide Content */}
            <main className="flex-1 relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-7xl h-full flex flex-col justify-center"
                    >
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 space-y-10">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-4"
                                >
                                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black tracking-[0.2em] text-blue-400 uppercase">
                                        {(currentSlide as any).tag}
                                    </span>
                                </motion.div>
                                
                                <div className="space-y-6">
                                    <motion.h2 
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white"
                                    >
                                        {currentSlide.title}
                                    </motion.h2>
                                    <motion.p 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-2xl md:text-4xl text-slate-400 font-medium leading-tight max-w-2xl"
                                    >
                                        {currentSlide.subtitle}
                                    </motion.p>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex items-center gap-6 pt-8"
                                >
                                    <div className="h-px w-24 bg-gradient-to-r from-blue-500/50 to-transparent" />
                                    <currentSlide.icon className="h-8 w-8 text-blue-500/50" />
                                </motion.div>
                            </div>

                            <div className="lg:col-span-5 hidden lg:block">
                                <motion.div
                                    initial={{ opacity: 0, rotateY: 20, x: 40 }}
                                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="relative aspect-[4/5] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl bg-white/[0.02] backdrop-blur-3xl group"
                                >
                                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", currentSlide.bg)} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <currentSlide.icon className="h-48 w-48 text-white/5 transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    
                                    {/* Data Visualization Mock (Dynamic per slide type) */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        className="h-full bg-white/10" 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.random() * 100}%` }}
                                                        transition={{ delay: 0.8 + (i * 0.1), duration: 1 }}
                                                    />
                                                </div>
                                            ))}
                                            <div className="pt-4 flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Analysis Active</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">99.9% ACCURACY</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer / Teleprompter */}
            <footer className="relative z-20 p-8 bg-black/60 backdrop-blur-2xl border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 relative group">
                        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-blue-500/20 group-hover:bg-blue-500/50 transition-colors" />
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Script Sincronizado</span>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-300 font-medium italic leading-relaxed">
                            "{currentSlide.script}"
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={prev} 
                            className="h-16 w-16 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={next} 
                            className="h-16 w-16 rounded-2xl bg-blue-600 text-white border-none shadow-xl shadow-blue-500/20 hover:bg-blue-500 hover:scale-110 active:scale-90 transition-all"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
