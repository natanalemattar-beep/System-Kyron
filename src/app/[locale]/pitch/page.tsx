"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Rocket, Leaf,
    Shield, BrainCircuit, TrendingUp,
    Users, Globe, Zap, CircleCheck, QrCode,
    TriangleAlert, Banknote, X, ArrowRight,
    Network, DollarSign, Download, Monitor, Smartphone,
    Activity, Lock, Cpu, MessageSquare, Instagram,
    Radar, Terminal, Command
} from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { PasswordGate } from "@/components/auth/password-gate";

const slides = [
    {
        id: "cover",
        tag: "INTRODUCCIÓN",
        title: "SYSTEM\nKYRON",
        subtitle: "Hacemos que tu negocio sea eficiente, sin complicaciones.",
        body: "Equipo: Carlos Mattar (Líder / Fundador). Líneas corporativas, automatización operativa y soluciones tecnológicas para escalar tu empresa de forma sostenible.",
        icon: Rocket,
        accent: "#3b82f6",
        bg: "from-blue-600/30 via-indigo-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Hola. Soy Carlos Mattar. No venimos a venderte tecnología complicada. Venimos a presentarte System Kyron: la forma más fácil y directa de conectar a tu equipo, automatizar tus procesos y hacer que tu negocio crezca.",
        stats: null,
    },
    {
        id: "problem",
        tag: "EL DESAFÍO",
        title: "EL DOLOR\nDE CABEZA",
        subtitle: "Pelear con la tecnología no debería ser tu trabajo.",
        body: "Los emprendedores pierden tiempo y dinero contratando entre 3 y 5 proveedores distintos para sus líneas, su contabilidad y sus sistemas legales. Más del 60% de los negocios venezolanos no tiene una infraestructura digital profesional.",
        icon: TriangleAlert,
        accent: "#f43f5e",
        bg: "from-rose-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        script: "El problema real es que los emprendedores gastan horas peleando con la tecnología en lugar de atender a sus clientes. Tienen proveedores separados para internet, para los sistemas, para todo. Es un caos que cuesta tiempo y frena el crecimiento.",
        stats: [
            { label: "Tiempo Perdido", value: "40", suffix: "%" },
            { label: "Caos Legal", value: "70", suffix: "%" },
            { label: "Proveedores", value: "4", suffix: "+" },
        ],
    },
    {
        id: "solution",
        tag: "PROPUESTA DE VALOR",
        title: "TODO EN UN\nSOLO LUGAR",
        subtitle: "La única empresa que te da todo lo que necesita tu negocio.",
        body: "Líneas corporativas activas al instante, contabilidad VEN-NIF automatizada y soluciones legales integrales. Todo bajo un mismo proveedor.",
        icon: Zap,
        accent: "#06b6d4",
        bg: "from-cyan-900/30 via-blue-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
        script: "La solución es System Kyron. Somos el ecosistema integral. Entregamos líneas corporativas, automatizamos tu contabilidad bajo normas VEN-NIF y blindamos legalmente tu empresa. Todo con soporte humano y un solo pago.",
        stats: [
            { label: "Comunicación", value: "Líneas" },
            { label: "Legal", value: "Asesoría" },
            { label: "Fiscal", value: "Contabilidad" },
        ],
        isMobileMockup: true
    },
    {
        id: "market",
        tag: "MERCADO OBJETIVO",
        title: "NUESTROS\nCLIENTES",
        subtitle: "Emprendedores y dueños de negocios que buscan crecer.",
        body: "Nos enfocamos en emprendedores y PyMEs en Venezuela (22 a 50 años) que necesitan proyectar una imagen profesional y ahorrar tiempo en gestiones operativas.",
        icon: Users,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestro mercado está claro: más de 500.000 micro y PyMEs en el país. Si captamos solo el 1%, estamos hablando de 5.000 clientes buscando formalizarse y vender más en un entorno cada vez más digital.",
        stats: [
            { label: "Mercado Total", value: "500", suffix: "K+" },
            { label: "Meta Inicial (1%)", value: "5000", suffix: "" },
            { label: "Expansión", value: "Regional" },
        ],
    },
    {
        id: "business_model",
        tag: "MODELO DE NEGOCIO",
        title: "INGRESOS\nESCALABLES",
        subtitle: "Simple, transparente y recurrente.",
        body: "Generamos ingresos por suscripción mensual de líneas corporativas, cobro inicial más mantenimiento de páginas web, y paquetes integrales con descuento para fidelizar.",
        icon: Banknote,
        accent: "#f59e0b",
        bg: "from-amber-900/30 via-blue-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        script: "Ganamos dinero de forma recurrente y escalable. Suscripciones por líneas, licencias de módulos SaaS contables y legales, y planes todo-en-uno. A mayor volumen de clientes, nuestro costo operativo por usuario se reduce drásticamente.",
        stats: [
            { label: "Líneas", value: "Mensual" },
            { label: "SaaS", value: "Licencia" },
            { label: "Paquetes", value: "Integral" },
        ],
    },
    {
        id: "marketing",
        tag: "MARKETING",
        title: "CÓMO NOS\nCONOCEN",
        subtitle: "Generamos confianza antes de vender.",
        body: "Usamos TikTok e Instagram para educar al emprendedor sobre cómo armar su negocio sin pagar de más. Además, aprovechamos el boca a boca y alianzas con incubadoras.",
        icon: Globe,
        accent: "#8b5cf6",
        bg: "from-violet-900/30 via-indigo-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestra estrategia es educativa: enseñamos a vender online en redes sociales. Implementamos un programa de referidos agresivo y hacemos alianzas con cámaras de comercio para ser la opción por defecto de quien abre una empresa.",
        stats: [
            { label: "Redes", value: "Educación" },
            { label: "Boca a Boca", value: "Referidos" },
            { label: "Alianzas", value: "Cámaras" },
        ],
    },
    {
        id: "impact",
        tag: "IMPACTO",
        title: "MÁS QUE UN\nNEGOCIO",
        subtitle: "Democratizamos la tecnología y eliminamos el papel.",
        body: "Social: Un pequeño negocio ahora tiene la misma tecnología que una corporación grande. Ambiental: Fomentamos el modelo Cero Papel, reduciendo la huella de carbono.",
        icon: Leaf,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "El Reto Inspira nos enseñó que el propósito importa. Socialmente, igualamos las oportunidades para el microempresario. Ambientalmente, cada cliente de Kyron abandona el papeleo tradicional por un sistema digital sostenible.",
        stats: [
            { label: "Social", value: "Inclusión" },
            { label: "Ambiental", value: "Cero Papel" },
            { label: "Económico", value: "Empleos" },
        ],
        isMockup: true
    },
    {
        id: "roadmap",
        tag: "ESTADO ACTUAL",
        title: "NUESTRA HOJA\nDE RUTA",
        subtitle: "Del prototipo al escalamiento.",
        body: "Actualmente somos una idea con un prototipo funcional (esta web). Ya tenemos la formalización legal (RIF J-50832149-9) y en los próximos meses buscaremos nuestros primeros clientes reales.",
        icon: TrendingUp,
        accent: "#3b82f6",
        bg: "from-blue-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
        script: "Siendo honestos, estamos en etapa de prototipo para este concurso. Ya tenemos la estructura legal lista. En los primeros 3 meses lanzaremos ventas para asegurar nuestros 10 primeros clientes e iterar con feedback real.",
        stats: [
            { label: "Fase 1", value: "Prototipo" },
            { label: "Fase 2", value: "10 Clientes" },
            { label: "Fase 3", value: "Escalar" },
        ],
    },
    {
        id: "closing",
        tag: "EL SIGUIENTE PASO",
        title: "HAGÁMOSLO\nREALIDAD",
        subtitle: "System Kyron: Tu ecosistema de confianza.",
        body: "Deja que nosotros nos encarguemos de la tecnología. Tú dedícate a hacer lo que amas y a llevar tu negocio al siguiente nivel.",
        promise: {
            title: "NUESTRA PROMESA",
            items: [
                "Te hablamos claro, sin términos raros o técnicos.",
                "Soporte rápido de personas reales, no de robots.",
                "Ingeniería avanzada desarrollada para negocios locales."
            ]
        },
        contact: {
            phone: "0424-1846016",
            instagram: "@systemkyron"
        },
        icon: CircleCheck,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-blue-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop",
        isQRSlide: true,
        script: "Soy Carlos Mattar. En System Kyron estamos listos para ser el mejor aliado tecnológico de las empresas en Venezuela. Muchas gracias por su tiempo y atención en este Reto Inspira.",
        stats: null,
    },
];

function CountUpNumber({ value, suffix = "" }: { value: string, suffix?: string }) {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return <span>{value} {suffix}</span>;

    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let startTime: number | null = null;
        const duration = 1500;
        
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }, [numericValue]);

    return <span>{count}{suffix}</span>;
}

function KyronMockup() {
    return (
        <div className="w-full aspect-video rounded-[2.5rem] bg-black/40 border border-white/10 overflow-hidden relative shadow-2xl backdrop-blur-md group">
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-pulse delay-75" />
                </div>
                <div className="absolute top-4 right-4 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">System.OS Alpha 4.0</div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <div className="text-[7px] font-black text-blue-500/40 uppercase tracking-widest">Protocolo: SK-CORE-V2</div>
                    <div className="text-[7px] font-black text-blue-500/40 uppercase tracking-widest text-right">Coord: 10.4806° N, 66.9036° W</div>
                </div>
            </div>

            {/* Top Bar */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between relative z-10">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                </div>
                <div className="text-[10px] text-white/40 font-black uppercase tracking-widest flex items-center gap-2">
                    <Lock className="h-3 w-3 text-emerald-500" /> system-kyron.secure
                </div>
                <div className="flex gap-3">
                    <div className="w-12 h-1 bg-white/10 rounded-full" />
                </div>
            </div>

            {/* Content area */}
            <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-8 bg-black/20">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-blue-400" />
                    </div>
                    {[Shield, BrainCircuit, Network, Globe, Activity].map((Icon, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.2, color: "#60a5fa" }}
                            className="cursor-pointer"
                        >
                            <Icon className={cn("h-4 w-4", i === 0 ? "text-blue-400" : "text-white/20")} />
                        </motion.div>
                    ))}
                </div>

                {/* Main Dashboard */}
                <div className="flex-1 p-8 space-y-8 bg-gradient-to-br from-blue-900/5 to-transparent">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h4 className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">Global Neural Dashboard</h4>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Resumen de Operación</h3>
                        </motion.div>
                        <div className="flex gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest animate-pulse flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-emerald-500" /> Link Live
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { label: "Sincronización BCV", value: "Sincronizado", color: "text-blue-400", icon: Activity },
                            { label: "Carga Impositiva Q3", value: "12.4%", color: "text-emerald-400", icon: Banknote },
                            { label: "Flota 5G Activa", value: "98.2%", color: "text-purple-400", icon: Zap },
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all"
                            >
                                <item.icon className={cn("h-5 w-5 mb-4", item.color)} />
                                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                <p className="text-lg font-black tracking-tight text-white">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Chart Mockup */}
                    <div className="h-40 rounded-3xl bg-white/[0.01] border border-white/5 p-6 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]">
                            <div className="h-full w-full" style={{
                                backgroundImage: "linear-gradient(90deg, #3b82f6 1px, transparent 1px), linear-gradient(#3b82f6 1px, transparent 1px)",
                                backgroundSize: "20px 20px"
                            }} />
                        </div>
                        <div className="flex items-end justify-between h-full gap-2 relative z-10">
                            {[40, 70, 45, 90, 65, 80, 50, 100, 60, 85, 45, 75, 55, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.8 + i * 0.04, duration: 1, ease: "easeOut" }}
                                    className="flex-1 bg-gradient-to-t from-blue-600/60 to-blue-400/10 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Glowing effect */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full" />
        </div>
    );
}

function SmartphoneMockup() {
    return (
        <div className="w-[300px] h-[620px] bg-[#0c0c0c] rounded-[3.5rem] border-[10px] border-[#1a1a1a] relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] mx-auto group">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1a1a1a] rounded-b-3xl z-30 flex items-center justify-center gap-3">
                <div className="w-12 h-1.5 bg-white/5 rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20" />
            </div>

            {/* Screen Content */}
            <div className="h-full w-full bg-[#04060f] relative p-8 flex flex-col pt-16">
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-10 px-2">
                    <span className="text-[11px] font-black tracking-tighter">9:41 AM</span>
                    <div className="flex gap-2 items-center">
                        <Network className="h-3.5 w-3.5 text-emerald-500" />
                        <Zap className="h-3.5 w-3.5 text-blue-500" />
                        <div className="w-6 h-3 border border-white/20 rounded-[3px] relative flex items-center px-[1px]">
                            <div className="h-full bg-white rounded-[1px] w-[85%]" />
                        </div>
                    </div>
                </div>

                {/* App Content */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                            <Smartphone className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.3em]">Kyron Mobile</h4>
                            <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-0.5">Alfa Protocol v4.0</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">eSIM Status</span>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-black text-emerald-400 uppercase">Activo 5G</span>
                            </div>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Facturas', icon: Banknote, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'Seguridad', icon: Shield, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                            { label: 'Red', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                            { label: 'AI Sync', icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                                className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-3 transition-all cursor-pointer"
                            >
                                <div className={cn("p-2.5 rounded-xl", item.bg)}>
                                    <item.icon className={cn("h-5 w-5", item.color)} />
                                </div>
                                <span className="text-[9px] font-black uppercase text-white/40 tracking-[0.2em]">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-8 p-5 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <TriangleAlert className="h-3 w-3 text-blue-400" />
                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">IA Predictiva</p>
                        </div>
                        <p className="text-[11px] font-bold text-white/80 leading-relaxed uppercase tracking-tight">Cambio detectado en tasa BCV. Ajustando proyecciones de flujo de caja para el cierre de hoy...</p>
                    </motion.div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Reflection */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-30" />
        </div>
    );
}

export default function PitchPage() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPrinting, setIsPrinting] = useState(false);
    const [baseUrl, setBaseUrl] = useState('https://system-kyron.vercel.app');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
        }
    }, []);

    const next = useCallback(() => {
        if (current < slides.length - 1) {
            setDirection(1);
            setCurrent((p) => p + 1);
        }
    }, [current]);

    const prev = useCallback(() => {
        if (current > 0) {
            setDirection(-1);
            setCurrent((p) => p - 1);
        }
    }, [current]);

    const handleDownload = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 500);
    };

    const handleExportWord = () => {
        const scriptContent = slides.map(s => `
            <div style="font-family: 'Segoe UI', sans-serif; margin-bottom: 40px; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                <div style="background: #0f172a; color: white; padding: 12px 24px; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 3px;">
                    MÓDULO DE PITCH: ${s.tag}
                </div>
                <div style="padding: 24px;">
                    <div style="color: #3b82f6; font-size: 24px; font-weight: 900; text-transform: uppercase; margin-bottom: 8px; letter-spacing: -1px;">
                        ${s.title.replace(/\n/g, ' ')}
                    </div>
                    <div style="color: #64748b; font-size: 14px; font-weight: 600; margin-bottom: 24px;">
                        ${s.subtitle}
                    </div>

                    <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 24px; margin-bottom: 24px;">
                        <div style="color: #475569; font-size: 10px; font-weight: 800; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 2px;">
                            Guion de Locución (Script)
                        </div>
                        <div style="color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.6; font-style: italic;">
                            <span style="color: #3b82f6; font-weight: 800;">[INICIO]</span> "${s.script}" <span style="color: #3b82f6; font-weight: 800;">[PAUSA / TRANSICIÓN]</span>
                        </div>
                    </div>

                    ${s.stats ? `
                        <div style="display: table; width: 100%; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                            ${s.stats.map(st => `
                                <div style="display: table-cell; width: 33%;">
                                    <div style="font-size: 9px; color: #94a3b8; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">${st.label}</div>
                                    <div style="font-size: 18px; color: #0f172a; font-weight: 900;">${st.value}${st.suffix || ""}</div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
            <br clear=all style='mso-special-character:line-break;page-break-before:always'>
        `).join('');

        const header = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Kyron Pitch 2026 — Executive Script</title>
                <style>
                    @page { size: 8.5in 11in; margin: 1in; }
                    body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #1e293b; }
                    h1 { margin: 0; }
                </style>
            </head>
            <body>
                <div style="text-align: left; margin-bottom: 50px; border-bottom: 2px solid #0f172a; padding-bottom: 20px;">
                    <table width="100%">
                        <tr>
                            <td>
                                <h1 style="font-size: 28px; font-weight: 900; color: #0f172a; letter-spacing: -1px;">SYSTEM KYRON</h1>
                                <p style="font-size: 10px; color: #3b82f6; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; margin-top: 5px;">Identidad Digital para Empresas Elite</p>
                                <p style="font-size: 9px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-top: 2px;">Executive Pitch Script — Competition Edition v2.5</p>
                            </td>
                            <td align="right">
                                <div style="font-size: 9px; color: #94a3b8; font-weight: 700; text-align: right;">
                                    CONFIDENCIAL - USO COMPETENCIA<br>
                                    EY VENEZUELA / INSPIRA VE 2026
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
        `;
        const footer = `
            <div style="margin-top: 40px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <p style="font-size: 10px; color: #94a3b8; font-weight: 600;">© 2026 System Kyron. Todos los derechos reservados.</p>
            </div>
            </body></html>
        `;
        const sourceHTML = header + scriptContent + footer;

        const blob = new Blob(['\ufeff', sourceHTML], {
            type: 'application/msword'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Script_Ejecutivo_Kyron_2026.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [isExporting, setIsExporting] = useState(false);

    const handleExportPPTX = async () => {
        setIsExporting(true);
        try {
            const PptxGenJS = (await import("pptxgenjs/dist/pptxgen.bundle.js")).default;
            const pptx = new PptxGenJS();
            
            pptx.layout = 'LAYOUT_16x9';
            pptx.defineSlideMaster({
                title: 'KYRON_MASTER',
                background: { color: '020617' },
                objects: [
                    { rect: { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: '3b82f6' } } },
                    { text: { text: 'SYSTEM KYRON // RETO INSPIRA 2026', options: { x: 0.5, y: 5.1, w: 9, color: '334155', fontSize: 8, fontFace: 'Arial' } } }
                ]
            });

            slides.forEach((s) => {
                let slide = pptx.addSlide({ masterName: 'KYRON_MASTER' });
                slide.addText(s.tag, { x: 0.5, y: 0.5, color: '3b82f6', fontSize: 14, fontFace: 'Arial', bold: true, charSpacing: 4 });
                slide.addText(s.title.replace('\n', ' '), { x: 0.5, y: 1.2, color: 'FFFFFF', fontSize: 44, fontFace: 'Arial', bold: true });
                slide.addText(s.subtitle, { x: 0.5, y: 2.2, color: '94a3b8', fontSize: 20, fontFace: 'Arial', italic: true });
                slide.addText(s.body, { x: 0.5, y: 3.2, w: 5.5, color: 'cbd5e1', fontSize: 14, fontFace: 'Arial', lineSpacing: 22 });
                if (s.stats) {
                    s.stats.forEach((st, idx) => {
                        slide.addText(`${st.label}: ${st.value}${st.suffix || ""}`, { 
                            x: 6.5, y: 1.5 + (idx * 0.8), w: 3, 
                            color: '3b82f6', fontSize: 18, fontFace: 'Arial', bold: true,
                            align: 'right'
                        });
                    });
                }
            });

            await pptx.writeFile({ fileName: 'Presentacion_System_Kyron_Reto_Inspira_2026.pptx' });
        } catch (err) {
            console.error("PPTX Error:", err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const jsPDF = (await import("jspdf")).default;
            const doc = new jsPDF('l', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            for (let i = 0; i < slides.length; i++) {
                if (i > 0) doc.addPage();
                const s = slides[i];
                doc.setFillColor(2, 6, 23);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
                doc.setDrawColor(59, 130, 246);
                doc.setLineWidth(2);
                doc.line(10, 10, pageWidth - 10, 10);
                doc.setTextColor(59, 130, 246);
                doc.setFontSize(10);
                doc.text(s.tag, 20, 25);
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(36);
                doc.text(s.title.replace('\n', ' '), 20, 45);
                doc.setTextColor(148, 163, 184);
                doc.setFontSize(18);
                doc.text(s.subtitle, 20, 60);
                doc.setTextColor(203, 213, 225);
                doc.setFontSize(12);
                const splitBody = doc.splitTextToSize(s.body, 120);
                doc.text(splitBody, 20, 75);
                doc.setTextColor(51, 65, 85);
                doc.setFontSize(8);
                doc.text('SYSTEM KYRON // RETO INSPIRA 2026 // CONFIDENCIAL', pageWidth / 2, pageHeight - 10, { align: 'center' });
            }
            doc.save('Presentacion_System_Kyron_Reto_Inspira_2026.pdf');
        } catch (err) {
            console.error("PDF Error:", err);
        } finally {
            setIsExporting(false);
        }
    };


    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
            if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    const slide = slides[current];
    const Icon = slide.icon;
    const progress = ((current + 1) / slides.length) * 100;

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d * 100, rotateY: d * 10, filter: "blur(20px)", scale: 0.95 }),
        center: { opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)", scale: 1 },
        exit: (d: number) => ({ opacity: 0, x: d * -100, rotateY: d * -10, filter: "blur(20px)", scale: 0.95 }),
    };

    return (
        <PasswordGate 
            title="Pitch Ejecutivo" 
            description="Documentación confidencial para inversores y competencia. Ingresa la clave Carlos123."
        >
            <div className={cn(
                "fixed inset-0 bg-[#02040a] text-white flex flex-col overflow-hidden transition-all duration-700 font-[family-name:var(--font-outfit)]",
                isPrinting ? "print-mode" : ""
            )}>
            <style jsx global>{`
                @media print {
                    body { background: #02040a !important; color: white !important; -webkit-print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    main { 
                        display: block !important; 
                        overflow: visible !important;
                    }
                    .fixed { position: relative !important; }
                    section { page-break-after: always; height: 100vh; display: flex; align-items: center; justify-content: center; }
                }

                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-bounce-x { animation: bounce-x 1s infinite; }

                .neural-grid {
                    background-image: 
                        linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
                
                .glass-pill {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>

            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden no-print">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id + "-bg"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className={cn("absolute inset-0 bg-gradient-to-br", slide.bg)}
                    />
                </AnimatePresence>

                {/* Grid Overlay */}
                <div className="absolute inset-0 neural-grid opacity-20" />
                
                {/* HUD Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent h-[50vh] animate-scanline pointer-events-none" />

                {/* Floating Particles/Orbs */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                            y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[400px] h-[400px] rounded-full blur-[120px]"
                        style={{ 
                            backgroundColor: slide.accent + (i % 2 === 0 ? "10" : "05"),
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-30 flex items-center justify-between px-10 py-8 border-b border-white/[0.03] backdrop-blur-3xl bg-black/40 no-print">
                <div className="flex items-center gap-6">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-2xl relative group"
                        style={{
                            background: `linear-gradient(135deg, ${slide.accent}44, ${slide.accent}11)`,
                            border: `1px solid ${slide.accent}44`
                        }}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        <Rocket className="h-6 w-6 relative z-10" style={{ color: slide.accent }} />
                    </motion.div>
                    <div>
                        <div className="flex items-center gap-3">
                            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/30">System Kyron // 2026</p>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">Protocolo Activo</span>
                        </div>
                        <p className="text-[13px] font-black tracking-widest text-white/90 uppercase mt-1 italic">Visionary Intelligence Ecosystem</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    {/* Mode Indicators */}
                    <div className="hidden lg:flex items-center gap-6 pr-8 border-r border-white/5">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Estado</span>
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Sincronizado</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Latencia</span>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">12ms</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleExportWord}
                            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                        >
                            <Terminal className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">Script (.doc)</span>
                        </button>
                        <button
                            onClick={handleExportPPTX}
                            disabled={isExporting}
                            className="group flex items-center gap-3 px-8 py-3 rounded-2xl bg-blue-600 border border-blue-500 hover:bg-blue-500 transition-all active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)] disabled:opacity-50"
                        >
                            <Download className={cn("h-4 w-4 text-white group-hover:animate-bounce", isExporting && "animate-spin")} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">
                                {isExporting ? "Generando..." : "PPTX Elite"}
                            </span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Monitor className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">PDF Elite</span>
                        </button>
                    </div>

                    <Link href="/brand-kit" className="h-10 w-10 rounded-2xl glass-pill flex items-center justify-center hover:bg-white/10 transition-all group">
                        <X className="h-5 w-5 text-white/20 group-hover:text-white" />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className={cn(
                "flex-1 relative flex items-center",
                !isPrinting && "overflow-hidden"
            )}>
                {isPrinting ? (
                    <div className="w-full">
                        {slides.map((s) => (
                            <section key={s.id} className="print-slide w-full min-h-screen flex items-center px-20">
                                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-24 items-center">
                                    <div className="space-y-10">
                                        <span className="text-xl font-black tracking-[0.5em] text-blue-500 uppercase">{s.tag}</span>
                                        <h2 className="text-8xl font-black leading-[0.85] uppercase tracking-tighter italic whitespace-pre-line">{s.title}</h2>
                                        <p className="text-3xl text-white/80 font-bold tracking-tight">{s.subtitle}</p>
                                        <p className="text-xl text-white/40 leading-relaxed border-l-4 border-white/10 pl-10 italic">{s.body}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="aspect-video rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                            {s.image && <img src={s.image} className="w-full h-full object-cover opacity-50" />}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center px-12 md:px-24 lg:px-32"
                    >
                        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
                            {/* Left Content */}
                            <div className="space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="h-px w-20" style={{ backgroundColor: slide.accent }} />
                                    <span className="text-xs font-black tracking-[0.5em] uppercase italic" style={{ color: slide.accent }}>
                                        {slide.tag}
                                    </span>
                                </motion.div>

                                <div className="space-y-6">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 50, rotateX: 20 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-7xl md:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter uppercase italic"
                                    >
                                        {slide.title.split("\n").map((line, i) => (
                                            <span key={i} className="block relative overflow-hidden">
                                                <span className={cn("block", i === 0 ? "text-white" : "text-white/10")}>
                                                    {line}
                                                </span>
                                                {i === 0 && (
                                                    <motion.span
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ delay: 0.8, duration: 1 }}
                                                        className="absolute bottom-0 left-0 h-1"
                                                        style={{ backgroundColor: slide.accent }}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-3xl md:text-4xl text-white/80 font-bold tracking-tight leading-tight max-w-2xl italic"
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-8"
                                >
                                    <p className="text-xl text-white/40 leading-relaxed max-w-xl border-l-2 border-white/5 pl-10 font-medium italic">
                                        {slide.body}
                                    </p>

                                    {slide.promise && (
                                        <div className="grid gap-4 max-w-xl">
                                            {slide.promise.items.map((item, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + i * 0.1 }}
                                                    className="flex items-center gap-5 p-5 rounded-3xl glass-pill group hover:bg-white/[0.05] transition-all"
                                                >
                                                    <div className="h-8 w-8 rounded-full border-2 border-emerald-500/30 flex items-center justify-center shrink-0">
                                                        <CircleCheck className="h-4 w-4 text-emerald-400" />
                                                    </div>
                                                    <p className="text-base font-black uppercase tracking-wide text-white/80">{item}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {slide.contact && (
                                        <div className="pt-10 flex gap-12 border-t border-white/5">
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo Voz</p>
                                                <p className="text-4xl font-black italic tracking-tighter text-white">{slide.contact.phone}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo Social</p>
                                                <div className="flex items-center gap-3 text-cyan-400">
                                                    <Instagram className="h-5 w-5" />
                                                    <p className="text-lg font-black uppercase tracking-widest">{slide.contact.instagram}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right Content — Visuals */}
                            <div className="hidden lg:block relative">
                                {slide.isQRSlide ? (
                                    <div className="grid grid-cols-2 gap-10">
                                        {[
                                            { label: "Ver Plataforma", sub: baseUrl.replace('https://', ''), data: baseUrl, color: "text-cyan-400", delay: 0.3 },
                                            { label: "Instagram", sub: "@systemkyron", data: "https://instagram.com/systemkyron", color: "text-pink-500", delay: 0.4 },
                                            { label: "Tu Feedback", sub: "Encuesta Calidad", data: `${baseUrl}/feedback`, color: "text-amber-400", delay: 0.5 },
                                            { label: "Documentación", sub: "Manual Pro", data: `${baseUrl}/manual-usuario`, color: "text-emerald-400", delay: 0.6 },
                                        ].map((qr, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: qr.delay, type: "spring" }}
                                                className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl flex flex-col items-center text-center group hover:bg-white/[0.05] hover:border-white/20 transition-all shadow-2xl"
                                            >
                                                <div className="w-48 h-48 bg-white rounded-[2.5rem] mb-6 flex items-center justify-center p-4 relative overflow-hidden group-hover:scale-105 transition-transform">
                                                    <img 
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qr.data)}&bgcolor=ffffff&color=000000`} 
                                                        alt={qr.label}
                                                        className="w-full h-full relative z-10"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">{qr.label}</span>
                                                <p className={cn("text-[13px] font-black uppercase italic tracking-tighter", qr.color)}>{qr.sub}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : slide.isMockup ? (
                                    <motion.div
                                        initial={{ opacity: 0, rotateY: 25, scale: 0.9 }}
                                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ perspective: "2000px" }}
                                    >
                                        <KyronMockup />
                                    </motion.div>
                                ) : slide.isMobileMockup ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 100, rotateZ: -5 }}
                                        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                                        transition={{ delay: 0.4, duration: 1, type: "spring" }}
                                    >
                                        <SmartphoneMockup />
                                    </motion.div>
                                ) : slide.stats ? (
                                    <div className="grid gap-8">
                                        {slide.stats.map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + i * 0.15 }}
                                                whileHover={{ x: -20, backgroundColor: slide.accent + "15" }}
                                                className="group p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl transition-all flex items-center justify-between shadow-2xl"
                                                style={{ backgroundColor: slide.accent + "05" }}
                                            >
                                                <div className="space-y-2">
                                                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">{stat.label}</span>
                                                    <div className="h-1 w-12 rounded-full bg-white/10 group-hover:w-full transition-all duration-700" style={{ backgroundColor: slide.accent + "44" }} />
                                                </div>
                                                <div className="text-7xl font-black italic tracking-tighter tabular-nums" style={{ color: slide.accent }}>
                                                    <CountUpNumber value={stat.value} suffix={stat.suffix} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 1.5 }}
                                        className="flex items-center justify-center relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-[150px] animate-pulse rounded-full" />
                                        <div
                                            className="h-96 w-96 rounded-[5rem] flex items-center justify-center relative group backdrop-blur-3xl"
                                            style={{ backgroundColor: slide.accent + "05", border: `1px solid ${slide.accent}22` }}
                                        >
                                            <Icon className="h-48 w-48 relative z-10 group-hover:scale-110 transition-transform duration-1000" style={{ color: slide.accent }} />
                                            <Radar className="absolute inset-0 h-full w-full text-white/5 animate-spin-slow" />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                    </AnimatePresence>
                )}
            </main>

            {/* Footer / Teleprompter HUD */}
            <footer className="relative z-30 border-t border-white/[0.03] px-12 py-10 backdrop-blur-3xl bg-black/60 no-print">
                <div className="max-w-[1600px] mx-auto flex items-center gap-20">
                    {/* Script Section */}
                    <div className="flex-1 relative">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex gap-1.5">
                                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-500" />
                                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-blue-500/60" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Canal de Teleprompter Activo</span>
                            <div className="h-px flex-1 bg-white/[0.05]" />
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current + "-script"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative pr-20"
                            >
                                <p className="text-2xl text-white/50 font-medium italic leading-relaxed line-clamp-2 uppercase tracking-tight">
                                    "{slide.script}"
                                </p>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
                                    <BrainCircuit className="h-16 w-16" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Progress & Controls */}
                    <div className="flex items-center gap-10 shrink-0">
                        <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-black text-white/20 tabular-nums tracking-widest">{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
                                <div className="h-1 w-40 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: slide.accent }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {slides.map((s, i) => (
                                    <motion.div
                                        key={s.id}
                                        animate={{ 
                                            width: i === current ? 24 : 6,
                                            backgroundColor: i === current ? slide.accent : "rgba(255,255,255,0.1)"
                                        }}
                                        className="h-1.5 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={prev}
                                disabled={current === 0}
                                className="h-20 w-20 rounded-3xl glass-pill flex items-center justify-center disabled:opacity-20 transition-all hover:bg-white/10 group"
                            >
                                <ChevronLeft className="h-8 w-8 text-white/30 group-hover:text-white" />
                            </button>
                            <button
                                onClick={next}
                                disabled={current === slides.length - 1}
                                className="h-20 px-12 rounded-3xl flex items-center gap-6 font-black text-xs text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-20 shadow-2xl relative overflow-hidden group"
                                style={{ backgroundColor: slide.accent }}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 uppercase tracking-[0.4em]">
                                    {current === slides.length - 1 ? "Fin de Protocolo" : "Siguiente Módulo"}
                                </span>
                                <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        </PasswordGate>
    );
}
