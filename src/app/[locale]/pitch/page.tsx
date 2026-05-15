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
import { Logo } from "@/components/logo";
import { PitchCoachAI } from "@/components/ai/pitch-coach-ai";

const slides = [
    {
        id: "cover_official",
        tag: "INFORMACIÓN GENERAL // ID: SK-2026-ALPHA",
        title: "SYSTEM KYRON",
        subtitle: "Visionary Intelligence Ecosystem",
        body: "Ecosistema de Mando Único (Single Pane of Glass) diseñado para la reingeniería digital de empresas en Venezuela. Integramos en una sola arquitectura Cloud-Native: Telecomunicaciones 5G, Motores de Gestión Fiscal (ERP) y Blindaje Legal Automatizado. No somos una herramienta, somos la infraestructura.",
        icon: Rocket,
        accent: "#3b82f6",
        bg: "from-blue-900/20 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        script: "Buen día. Soy Carlos Mattar. System Kyron es la respuesta a la obsolescencia digital. Hemos construido un ecosistema de mando único que fusiona tres pilares vitales: conectividad, legalidad y fiscalidad. Nuestra arquitectura permite que una PyME opere con la potencia de una transnacional desde el primer día.",
        stats: [
            { label: "Equity", value: "Carlos Mattar" },
            { label: "Status", value: "Seed/Alpha" }
        ],
    },
    {
        id: "problem_definition",
        tag: "DIAGNÓSTICO DEL MERCADO",
        title: "FRAGMENTACIÓN\nESTRUCTURAL",
        subtitle: "El 'Impuesto de la Ineficiencia'.",
        body: "Las empresas venezolanas sufren de 'Desconexión Sistémica': operan con silos de datos entre banca, SENIAT e inventarios. Esto genera un costo operativo oculto de hasta $4,000 anuales por empresa en procesos manuales y errores humanos. El 85% de las PyMEs no cumple al 100% con las normativas VEN-NIF por falta de herramientas integradas.",
        icon: X,
        accent: "#f43f5e",
        bg: "from-rose-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
        script: "El problema es la fragmentación estructural. Las empresas están atrapadas en una 'burocracia analógica' donde pierden el 40% de su tiempo productivo. Además, el riesgo de multas por el IGTF y el IVA es constante debido a la falta de sincronización en tiempo real con las tasas oficiales.",
        stats: [
            { label: "Pérdida ROI", value: "40", suffix: "%" },
            { label: "Desconexión", value: "Silos" }
        ],
        visualType: "chaos_grid"
    },
    {
        id: "value_proposition",
        tag: "PROPUESTA DE VALOR // CORE TECH",
        title: "BLINDAJE Y\nAUTONOMÍA",
        subtitle: "Cifrado AES-256 + Sincronización Multicanal.",
        body: "Kyron ofrece un 'Escudo Operativo': Conectividad 5G dedicada mediante eSIMs corporativas, un motor contable autogestionado bajo normas internacionales y asesoría legal predictiva. Todo centralizado bajo protocolos de seguridad OAuth 2.0 y encriptación de extremo a extremo para garantizar la soberanía de los datos empresariales.",
        icon: Zap,
        accent: "#06b6d4",
        bg: "from-cyan-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        script: "Nuestra propuesta de valor es la Autonomía. Con Kyron, el empresario recupera el control. Nuestra tecnología no solo gestiona facturas; blinda la operación con cifrado grado militar y asegura que la empresa esté siempre conectada, legalmente protegida y fiscalmente al día.",
        stats: [
            { label: "Uptime", value: "99.9", suffix: "%" },
            { label: "Seguridad", value: "AES-256" }
        ],
        visualType: "pillars"
    },
    {
        id: "target_market",
        tag: "SEGMENTACIÓN Y OPORTUNIDAD",
        title: "EL DESPERTAR\nDEL B2B",
        subtitle: "Mercado de 500k contribuyentes.",
        body: "Segmento objetivo: Contribuyentes Especiales y PyMEs en expansión. Mercado Total Direccionable (TAM) de $150M anuales. Nuestro Servicio de Mercado Obtenible (SOM) apunta a 5,000 empresas en los primeros 24 meses, aprovechando la necesidad crítica de cumplimiento con la Providencia 00071 del SENIAT.",
        icon: Users,
        accent: "#a855f7",
        bg: "from-purple-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000",
        script: "Hablamos de un mercado desatendido. En Venezuela hay más de medio millón de contribuyentes que necesitan una transición digital segura. Nuestra meta es capturar el 1% de este mercado en dos años, enfocándonos en sectores de alto flujo como comercio y servicios profesionales.",
        stats: [
            { label: "SOM (24m)", value: "5000", suffix: "cia" },
            { label: "TAM", value: "150", suffix: "M$" }
        ],
    },
    {
        id: "business_model",
        tag: "FINANZAS Y ESCALABILIDAD",
        title: "ECONOMÍA\nRECURRENTE",
        subtitle: "LTV:CAC de 4.5x proyectado.",
        body: "Modelo SaaS Multitier: 'Starter' ($15/mes), 'Business' ($45/mes) y 'Enterprise' (Custom). Adicionalmente, ingresos por 'Hardware-as-a-Service' (Puntos de Venta Fiscales) y comisiones por procesamiento de pagos integrados. Estructura de costos optimizada mediante infraestructura serverless, permitiendo márgenes brutos superiores al 70%.",
        icon: DollarSign,
        accent: "#10b981",
        bg: "from-emerald-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
        script: "Nuestro modelo es altamente rentable. Con un costo de adquisición bajo gracias a nuestra red de aliados, proyectamos un valor de vida del cliente que supera por 4.5 veces el costo de captarlo. Es un negocio escalable que crece junto con la economía digital del país.",
        stats: [
            { label: "Margen", value: "70", suffix: "%" },
            { label: "Starter", value: "15", suffix: "$" }
        ],
        visualType: "comparison"
    },
    {
        id: "marketing_strategy",
        tag: "GO-TO-MARKET STRATEGY",
        title: "VIRALIDAD\nCORPORATIVA",
        subtitle: "Kyron Hubs y Alianzas de Gremio.",
        body: "Canal Directo: Inbound Marketing enfocado en SEO fiscal y legal. Canal de Alianzas: Integración con cámaras de comercio y colegios de contadores. Estrategia de 'Kyron Certified Partners' para capacitar a consultores externos que actúen como fuerza de ventas técnica, reduciendo el CAC orgánicamente.",
        icon: Globe,
        accent: "#3b82f6",
        bg: "from-blue-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1000",
        script: "No solo vendemos software; creamos una comunidad de expertos. Nuestros socios certificados llevan la tecnología Kyron a cada rincón de Venezuela, convirtiéndose en nuestros principales promotores a cambio de una plataforma robusta para sus propios clientes.",
        stats: [
            { label: "CAC", value: "Optimizado" },
            { label: "Canal", value: "Omni" }
        ],
        isMobileMockup: true
    },
    {
        id: "sustainability_impact",
        tag: "IMPACTO ESG (SOCIAL/AMBIENTAL)",
        title: "ECONOMÍA DE\nIMPACTO",
        subtitle: "Zero-Waste & Digital Compliance.",
        body: "Impacto Ambiental: Reducción del 95% en el uso de papel mediante digitalización legal completa. Impacto Social: Formalización de la economía venezolana, facilitando que micro-empresas cumplan con sus deberes formales de manera sencilla y a bajo costo, democratizando el acceso a tecnología de clase mundial.",
        icon: Leaf,
        accent: "#22c55e",
        bg: "from-green-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1510784722466-f2aa9c52dee6?q=80&w=1000",
        script: "System Kyron tiene un alma verde. Estamos eliminando toneladas de papel de la burocracia venezolana. Pero más allá de lo ambiental, estamos formalizando el país, permitiendo que cualquier emprendedor sea legal y exitoso sin complicaciones.",
        stats: [
            { label: "Cero Papel", value: "95", suffix: "%" },
            { label: "ODS", value: "9 & 12" }
        ],
    },
    {
        id: "roadmap_status",
        tag: "ROADMAP & EXECUTION",
        title: "HITOS Y\nEXPANSIÓN",
        subtitle: "Hacia el Ecosistema 5G Propio.",
        body: "Hito Q3 2026: Lanzamiento de infraestructura de red propia para datos empresariales. Hito Q4 2026: Integración de Inteligencia Artificial para auditoría fiscal predictiva. Estado actual: Prototipo funcional probado con 10 clientes 'Early Adopters' con satisfacción del 100%.",
        icon: Activity,
        accent: "#f59e0b",
        bg: "from-orange-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
        script: "Estamos en una fase emocionante. Ya validamos el producto con nuestros primeros clientes y el feedback es increíble. Los próximos meses serán de expansión agresiva para convertirnos en el estándar de oro de la tecnología B2B en el país.",
        stats: [
            { label: "Fase", value: "Expansion" },
            { label: "Satisfacción", value: "100", suffix: "%" }
        ],
        visualType: "team"
    },
    {
        id: "closing_qr",
        tag: "CALL TO ACTION // FINAL",
        title: "CONSTRUYE EL\nFUTURO",
        subtitle: "Acceso Exclusivo al Portal de Inversión.",
        body: "Escanea para acceder al Whitepaper técnico, proyecciones financieras detalladas y el acceso a la plataforma en vivo. System Kyron: Donde la tecnología se encuentra con la soberanía empresarial.",
        icon: QrCode,
        accent: "#ffffff",
        bg: "from-zinc-900/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        script: "El futuro no se espera, se construye. Escaneen este código para entrar al portal ejecutivo y ver por sí mismos cómo Kyron está cambiando las reglas del juego. Gracias por ser parte de este viaje.",
        isQRSlide: true,
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
                                    <div style="font-size: 18px; color: #0f172a; font-weight: 900;">${st.value}${(st as any).suffix || ""}</div>
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
                                <p style="font-size: 10px; color: #3b82f6; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; margin-top: 5px;">Identidad Digital para Empresas System Kyron</p>
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
            // @ts-ignore
            const PptxGenJS = (await import("pptxgenjs")).default;
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
                        slide.addText(`${st.label}: ${st.value}${(st as any).suffix || ""}`, { 
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
            description="Documentación confidencial para inversores y competencia."
        >
            <PitchCoachAI currentSlide={slide} />
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
                        <p className="text-[13px] font-black tracking-widest text-white/90 uppercase mt-1">Visionary Intelligence Ecosystem</p>
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
                                {isExporting ? "Generando..." : "PPTX System Kyron"}
                            </span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Monitor className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">PDF System Kyron</span>
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
                        className="absolute inset-0 flex items-center px-12 md:px-24 lg:px-32 overflow-hidden"
                    >
                        {/* Cinematic Background Layer */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-[#020617] z-10 opacity-80" />
                            <img 
                                src={slide.image} 
                                className="w-full h-full object-cover blur-[100px] opacity-30 scale-110"
                                alt=""
                            />
                            <div 
                                className="absolute inset-0 z-20 opacity-20"
                                style={{ background: `radial-gradient(circle at 50% 50%, ${slide.accent}44, transparent 70%)` }}
                            />
                        </div>

                        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
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

                                {slide.id === "cover_official" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.1, duration: 1, type: "spring" }}
                                        className="w-48 h-48 mb-12"
                                    >
                                        <Logo className="w-full h-full" />
                                    </motion.div>
                                )}

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
                                ) : (slide as any).visualType === "chaos_grid" ? (
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: "Servicios Fragmentados", icon: X, color: "text-rose-500", bg: "bg-rose-500/10" },
                                            { label: "Costos Ocultos", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-500/10" },
                                            { label: "Burocracia Manual", icon: FileText, color: "text-slate-500", bg: "bg-slate-500/10" },
                                            { label: "Inestabilidad 5G", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.6 + i * 0.1 }}
                                                className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 flex flex-col items-center gap-6 text-center backdrop-blur-3xl"
                                            >
                                                <div className={cn("p-4 rounded-2xl", item.bg)}>
                                                    <item.icon className={cn("h-8 w-8", item.color)} />
                                                </div>
                                                <span className="text-[12px] font-black uppercase tracking-widest text-white/40 leading-tight">{item.label}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (slide as any).visualType === "pillars" ? (
                                    <div className="relative h-[600px] flex items-center justify-center">
                                        <div className="absolute inset-0 bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
                                        <div className="grid grid-cols-1 gap-8 w-full max-w-md relative z-10">
                                            {[
                                                { title: "Telecom Integration", icon: Wifi, accent: "text-cyan-400" },
                                                { title: "Fiscal Engine", icon: Calculator, accent: "text-emerald-400" },
                                                { title: "Legal Shield", icon: Shield, accent: "text-blue-400" },
                                            ].map((p, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + i * 0.2 }}
                                                    className="flex items-center gap-8 p-8 rounded-[3rem] bg-white/[0.05] border border-white/10 backdrop-blur-3xl group hover:bg-white/10 transition-all shadow-2xl"
                                                >
                                                    <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                                        <p.icon className={cn("h-8 w-8", p.accent)} />
                                                    </div>
                                                    <span className="text-xl font-black uppercase tracking-[0.2em] text-white/80">{p.title}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (slide as any).visualType === "comparison" ? (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-10 rounded-[3.5rem] bg-rose-500/10 border border-rose-500/20 text-center backdrop-blur-3xl">
                                                <p className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-6">Solución Tradicional</p>
                                                <p className="text-6xl font-black text-white">$130<span className="text-xl text-white/40">/mes</span></p>
                                                <p className="text-[10px] text-white/30 uppercase mt-6 tracking-widest font-black">Solo Software</p>
                                            </div>
                                            <div className="p-10 rounded-[3.5rem] bg-emerald-500/10 border border-emerald-500/40 text-center relative overflow-hidden group backdrop-blur-3xl shadow-2xl">
                                                <div className="absolute top-0 right-0 p-6">
                                                    <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
                                                </div>
                                                <p className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6">Kyron SaaS</p>
                                                <p className="text-6xl font-black text-white">$15<span className="text-xl text-white/40">/mes</span></p>
                                                <p className="text-[10px] text-white/30 uppercase mt-6 tracking-widest font-black">Todo Integrado</p>
                                            </div>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl">
                                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/40 mb-4">
                                                <span>Eficiencia Operativa / ROI</span>
                                                <span className="text-emerald-400">Potencial Máximo</span>
                                            </div>
                                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: "94%" }}
                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (slide as any).visualType === "team" ? (
                                    <div className="relative h-[650px] flex items-center justify-center">
                                        <div className="absolute inset-0 bg-amber-500/10 blur-[150px] rounded-full" />
                                        <div className="relative w-full max-w-sm space-y-8">
                                            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 relative group shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                                                <img 
                                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                                    alt="Carlos Mattar"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                                <div className="absolute bottom-12 left-12 right-12">
                                                    <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter">Carlos Mattar</h4>
                                                    <p className="text-[11px] font-black text-amber-400 uppercase tracking-[0.4em] mt-3">Founder & Architect</p>
                                                </div>
                                            </div>
                                        </div>
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
                                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        transition={{ delay: 0.4, duration: 1.5 }}
                                        className="relative w-full aspect-video rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] group border border-white/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                        <img 
                                            src={slide.image} 
                                            alt={slide.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                                        />
                                        <div className="absolute bottom-10 left-10 z-20">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl glass-pill flex items-center justify-center">
                                                    <Icon className="h-6 w-6" style={{ color: slide.accent }} />
                                                </div>
                                                <div className="h-1 w-20 rounded-full bg-white/20" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
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
