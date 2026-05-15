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
    Radar, Terminal, Command, Wifi, Calculator, FileText, Sparkles,
    ShieldAlert, Target, Brain, Lightbulb, TrendingDown, Gauge
} from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { PasswordGate } from "@/components/auth/password-gate";
import { Logo } from "@/components/logo";

const slides = [
    {
        id: "cover_official",
        tag: "SYSTEM KYRON 2026",
        title: "EL ADN DE LA\nEMPRESA DIGITAL",
        subtitle: "El Ecosistema Definitivo para la Empresa Moderna.",
        body: "Una sola infraestructura. Control total. Presentado por Carlos Mattar.",
        icon: Rocket,
        accent: "#3b82f6",
        bg: "from-blue-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Buenos días. Soy Carlos Mattar. System Kyron es el ADN de la empresa moderna en Venezuela. Vamos a ver cómo unificamos el caos en un solo ecosistema de confianza.",
    },
    {
        id: "vision_context",
        tag: "LA VISIÓN",
        title: "FUTURO\nSISTÉMICO",
        subtitle: "Venezuela hacia la frontera digital.",
        body: "No somos una agencia web. Somos el sistema operativo que las empresas necesitan para escalar sin fricción.",
        icon: Globe,
        accent: "#06b6d4",
        bg: "from-cyan-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestra visión es clara: convertirnos en la infraestructura base de la economía digital en Venezuela para 2026.",
    },
    {
        id: "problem_1_fragmentation",
        tag: "EL PROBLEMA",
        title: "CAOS EN LA\nOPERACIÓN",
        subtitle: "Demasiados proveedores, poca comunicación.",
        body: "Un empresario promedio lidia con 5 proveedores distintos. La información está regada y el tiempo se pierde.",
        icon: X,
        accent: "#f43f5e",
        bg: "from-rose-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        script: "El primer problema es la fragmentación. Hoy un empresario tiene la contabilidad por un lado y el internet por otro. Todo está regado.",
        stats: [
            { label: "Proveedores", value: "5", suffix: "+" },
        ],
        visualType: "chaos_grid"
    },
    {
        id: "problem_2_risk",
        tag: "EL RIESGO",
        title: "RIESGO FISCAL\nY LEGAL",
        subtitle: "La falta de integración cuesta dinero.",
        body: "Errores en IGTF o IVA pueden causar multas severas. La falta de blindaje es una bomba de tiempo.",
        icon: TriangleAlert,
        accent: "#f59e0b",
        bg: "from-amber-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
        script: "Ese caos genera riesgo. Sin integración, los errores fiscales son constantes y las multas pueden quebrar un negocio.",
        stats: [
            { label: "Riesgo de Multas", value: "90", suffix: "%" },
        ],
    },
    {
        id: "problem_3_compliance",
        tag: "EL DESAFÍO",
        title: "MURO DE\nCUMPLIMIENTO",
        subtitle: "SENIAT, IGTF y VEN-NIF.",
        body: "Las normativas venezolanas son complejas. Mantenerse al día manualmente es casi imposible para una PyME.",
        icon: ShieldAlert,
        accent: "#e11d48",
        bg: "from-red-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop",
        script: "El cumplimiento normativo es un muro. SENIAT, IGTF, VEN-NIF... mantenerse al día manualmente es simplemente imposible.",
    },
    {
        id: "solution_core",
        tag: "LA SOLUCIÓN",
        title: "KYRON\nCORE OS",
        subtitle: "El sistema operativo empresarial.",
        body: "Unificamos Telecom, Fiscal y Legal en una sola plataforma blindada con cifrado AES-256.",
        icon: Zap,
        accent: "#06b6d4",
        bg: "from-cyan-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Kyron Core es la respuesta. No es solo un software, es una integración vertical total para controlar tu infraestructura.",
        visualType: "pillars"
    },
    {
        id: "saas_model",
        tag: "MODELO DE NEGOCIO",
        title: "DEMOCRATIZACIÓN\nDIGITAL",
        subtitle: "SaaS desde $15 al mes.",
        body: "Tecnología de élite para cada PyME. Sin grandes inversiones iniciales, pagas solo por lo que usas.",
        icon: DollarSign,
        accent: "#10b981",
        bg: "from-emerald-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestro modelo SaaS democratiza la tecnología. Desde 15 dólares al mes, cualquier PyME tiene herramientas de grado corporativo.",
        visualType: "comparison"
    },
    {
        id: "saas_value",
        tag: "VALOR AGREGADO",
        title: "ESCALABILIDAD\nTOTAL",
        subtitle: "De PyME a gran corporación.",
        body: "Nuestro sistema crece contigo. Módulos que se activan según tus necesidades operativas.",
        icon: TrendingUp,
        accent: "#3b82f6",
        bg: "from-blue-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        script: "Kyron es escalable. Empiezas con lo básico y activas módulos a medida que tu empresa crece. Sin límites.",
    },
    {
        id: "security_pillar",
        tag: "SEGURIDAD",
        title: "BLINDAJE\nCIBERNÉTICO",
        subtitle: "Cifrado AES-256 de punta a punta.",
        body: "Tus datos son tu activo más valioso. Kyron asegura la soberanía de tu información empresarial.",
        icon: Shield,
        accent: "#3b82f6",
        bg: "from-blue-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        script: "La seguridad es innegociable. Usamos cifrado AES-256 para asegurar que tus datos contables y legales estén siempre protegidos.",
    },
    {
        id: "telecom_pillar",
        tag: "CONECTIVIDAD",
        title: "TELECOM\nINTEGRADO",
        subtitle: "Líneas 5G administradas.",
        body: "Conectividad nativa. Si no hay conexión, no hay gestión. Nosotros aseguramos la base de tu operación.",
        icon: Wifi,
        accent: "#3b82f6",
        bg: "from-blue-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1000&auto=format&fit=crop",
        script: "Somos el único sistema con telecomunicaciones integradas. Ofrecemos líneas 5G administradas directamente desde el panel.",
    },
    {
        id: "esim_tech",
        tag: "TECNOLOGÍA",
        title: "FLOTAS\nVIRTUALES",
        subtitle: "eSIM para cada empleado.",
        body: "Gestiona las líneas móviles de tu equipo sin plásticos físicos. Activación inmediata y control de consumo.",
        icon: Smartphone,
        accent: "#10b981",
        bg: "from-emerald-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1000&auto=format&fit=crop",
        script: "Con tecnología eSIM, eliminamos el plástico. Activamos flotas móviles en segundos y controlamos los límites de consumo en tiempo real.",
        isMobileMockup: true
    },
    {
        id: "fiscal_ledger",
        tag: "FINANZAS",
        title: "LIBRO FISCAL\nEN VIVO",
        subtitle: "Contabilidad que no duerme.",
        body: "Cada transacción se sincroniza automáticamente con las normativas vigentes. Sin cierres manuales de última hora.",
        icon: Calculator,
        accent: "#f59e0b",
        bg: "from-amber-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestra contabilidad está viva. Cada venta se registra y calcula impuestos automáticamente. Olvídate de los cierres manuales eternos.",
    },
    {
        id: "legal_vault",
        tag: "LEGAL",
        title: "BÓVEDA\nJURÍDICA",
        subtitle: "Contratos inteligentes y seguros.",
        body: "Almacenamiento blindado de documentos legales. Generación automática de contratos bajo normativa nacional.",
        icon: Lock,
        accent: "#3b82f6",
        bg: "from-slate-900/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop",
        script: "La bóveda jurídica protege tus documentos clave y genera contratos inteligentes que cumplen con toda la ley venezolana.",
    },
    {
        id: "dashboard_exp",
        tag: "EXPERIENCIA",
        title: "CENTRO DE\nMANDO",
        subtitle: "Control total desde un solo panel.",
        body: "Diseñado para el ejecutivo moderno. Visualiza la salud de tu empresa en segundos.",
        icon: Monitor,
        accent: "#06b6d4",
        bg: "from-cyan-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        script: "El dashboard de Kyron es tu centro de mando. Controlas ventas, impuestos y conectividad desde un solo lugar, con un clic.",
        isMockup: true
    },
    {
        id: "predictive_ai",
        tag: "INTELIGENCIA",
        title: "IA\nPREDICTIVA",
        subtitle: "Anticípate al mercado.",
        body: "Análisis de flujo de caja y proyecciones fiscales inteligentes. Toma decisiones basadas en datos, no en instintos.",
        icon: BrainCircuit,
        accent: "#8b5cf6",
        bg: "from-purple-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestra IA analiza tus datos para predecir flujos de caja y avisarte de riesgos antes de que ocurran. Inteligencia real para tu negocio.",
    },
    {
        id: "market_fit",
        tag: "MERCADO",
        title: "VENEZUELA\nESTÁ LISTA",
        subtitle: "Oportunidad de transformación masiva.",
        body: "Miles de empresas buscando eficiencia. Kyron es la herramienta adecuada en el momento exacto.",
        icon: Target,
        accent: "#10b981",
        bg: "from-emerald-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Venezuela está lista para esto. Hay miles de empresas buscando eficiencia y nosotros tenemos la herramienta perfecta en el momento justo.",
    },
    {
        id: "hardware_fiscal",
        tag: "HARDWARE",
        title: "EXTENSIÓN\nFÍSICA",
        subtitle: "Hardware fiscal certificado (Opcional).",
        body: "Puntos de venta e impresoras que se sincronizan nativamente con la nube Kyron.",
        icon: Monitor,
        accent: "#3b82f6",
        bg: "from-slate-900/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop",
        script: "Y para el mostrador, ofrecemos el hardware fiscal opcional. Equipos certificados que se sincronizan con tu nube Kyron.",
    },
    {
        id: "team_reveal",
        tag: "EL EQUIPO",
        title: "INGENIERÍA Y\nPASIÓN",
        subtitle: "Liderado por Carlos Mattar.",
        body: "Un equipo multidisciplinario enfocado en resolver problemas reales con tecnología venezolana.",
        icon: Users,
        accent: "#f59e0b",
        bg: "from-amber-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        script: "Detrás de Kyron hay ingeniería venezolana de clase mundial. Liderados por mí, estamos construyendo el futuro de la empresa digital.",
        visualType: "team"
    },
    {
        id: "roadmap_2026",
        tag: "EL FUTURO",
        title: "HOJA DE\nRUTA 2026",
        subtitle: "Expansión y consolidación total.",
        body: "Fase 1: PyMEs. Fase 2: Sector Público. Fase 3: Estandarización nacional.",
        icon: Activity,
        accent: "#3b82f6",
        bg: "from-blue-950/40 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Nuestra hoja de ruta es ambiciosa. En 2026 queremos ser el estándar nacional de gestión empresarial integrada.",
    },
    {
        id: "closing_qr",
        tag: "EL SIGUIENTE PASO",
        title: "CONSTRUYAMOS\nEL MAÑANA",
        subtitle: "Escanea y únete al ecosistema.",
        body: "La transformación digital de Venezuela comienza aquí. ¿Estás listo?",
        icon: QrCode,
        accent: "#10b981",
        bg: "from-emerald-950/30 via-black to-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        script: "Cerramos con una invitación: escaneen el código y vean la plataforma en vivo. System Kyron es el futuro digital de Venezuela. ¡Muchas gracias!",
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

function PitchCoachAI({ currentSlide }: { currentSlide: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [analysis, setAnalysis] = useState<{
        impact: number,
        tips: string[],
        remove: string[],
        add: string[]
    }>({ impact: 0, tips: [], remove: [], add: [] });

    useEffect(() => {
        // Simulación de Análisis de IA Kyron
        const baseImpact = 85 + Math.floor(Math.random() * 10);
        
        const generateAnalysis = () => {
            if (currentSlide.id.includes("cover")) {
                return {
                    impact: baseImpact,
                    tips: ["Mantén contacto visual fuerte.", "Proyecta voz de liderazgo.", "No te detengas en detalles técnicos aún."],
                    remove: ["Explicaciones largas del 'cómo'.", "Muletillas de nerviosismo."],
                    add: ["Un saludo enérgico.", "Menciona que es ingeniería venezolana."]
                };
            }
            if (currentSlide.id.includes("problem")) {
                return {
                    impact: baseImpact + 2,
                    tips: ["Transmite la urgencia del dolor.", "Usa un tono serio y preocupado.", "Señala los gráficos de caos."],
                    remove: ["Nombres de empresas específicas.", "Chistes o humor innecesario."],
                    add: ["La palabra 'Pérdida de Dinero'.", "Menciona las multas del SENIAT."]
                };
            }
            if (currentSlide.id.includes("solution") || currentSlide.id.includes("saas")) {
                return {
                    impact: baseImpact + 5,
                    tips: ["Cambia a un tono optimista y brillante.", "Enfatiza el ahorro del 90% en costos.", "Menciona la palabra 'Democratización'."],
                    remove: ["Jerga de programación compleja.", "Comparaciones con marcas locales."],
                    add: ["El precio de $15 como un 'Game Changer'.", "La facilidad de uso ('One-Click')."]
                };
            }
            return {
                impact: baseImpact,
                tips: ["Sigue el ritmo del teleprompter.", "Recuerda respirar entre puntos clave.", "Usa las manos para enfatizar escala."],
                remove: ["Silencios de más de 3 segundos.", "Lectura plana del guion."],
                add: ["Palabras clave: 'Soberanía', 'Eficiencia', '2026'."]
            };
        };

        setAnalysis(generateAnalysis());
    }, [currentSlide]);

    return (
        <div className="fixed top-32 right-10 z-[100] flex flex-col items-end gap-4 no-print">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-16 px-6 rounded-2xl flex items-center gap-4 border shadow-2xl transition-all duration-500",
                    isOpen 
                        ? "bg-white text-black border-white" 
                        : "bg-blue-600/20 text-blue-400 border-blue-500/30 backdrop-blur-3xl hover:bg-blue-600/30"
                )}
            >
                <div className="relative">
                    <Brain className="h-6 w-6" />
                    <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500" 
                    />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kyron AI Coach</span>
                <ChevronRight className={cn("h-4 w-4 transition-transform duration-500", isOpen && "rotate-180")} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        className="w-80 bg-black/80 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
                        
                        <div className="space-y-8">
                            {/* Impact Meter */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Impacto Estimado</h5>
                                    <p className="text-3xl font-black text-white">{analysis.impact}%</p>
                                </div>
                                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Gauge className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="h-3 w-3 text-amber-400" />
                                    <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Consejos de Locución</span>
                                </div>
                                <ul className="space-y-3">
                                    {analysis.tips.map((tip, i) => (
                                        <motion.li 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="text-[11px] font-bold text-white/70 flex gap-3"
                                        >
                                            <span className="text-blue-500">•</span> {tip}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="h-px bg-white/5" />

                            {/* What to Add/Remove */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-3">
                                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                        <TrendingUp className="h-3 w-3" /> Potenciar (+ Puntos)
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.add.map((item, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-2">
                                        <TrendingDown className="h-3 w-3" /> Eliminar (Ahorrar Tiempo)
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.remove.map((item, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[8px] font-black text-rose-400 uppercase">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 italic text-[10px] text-white/40 leading-relaxed">
                                "El jurado valora la precisión. Si vas atrasado, sáltate los ejemplos y ve directo al dato del ROI."
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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

            {/* Clean Professional Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden no-print">
                <div className="absolute inset-0 bg-[#02040a]" />
                
                {/* Minimal Grid Overlay */}
                <div className="absolute inset-0 neural-grid opacity-[0.03]" />
            </div>

            {/* Header */}
            <header className="relative z-30 flex items-center justify-between px-10 py-6 border-b border-white/[0.05] bg-black/40 no-print">
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
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-4"
                                >
                                    {slide.id === "cover_official" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-8 w-8 mr-2"
                                        >
                                            <Logo className="w-full h-full" />
                                        </motion.div>
                                    )}
                                    <span className="text-xs font-black tracking-[0.4em] uppercase" style={{ color: slide.accent }}>
                                        {slide.tag}
                                    </span>
                                </motion.div>

                                <div className="space-y-4">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-6xl md:text-7xl font-black leading-tight tracking-tight uppercase text-white"
                                    >
                                        {slide.title.replace('\n', ' ')}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-2xl text-white/50 italic font-medium tracking-tight leading-snug max-w-2xl"
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-8"
                            >
                                <p className="text-xl text-white/80 leading-relaxed max-w-xl font-medium">
                                    {slide.body}
                                </p>

                                    {slide.stats && (
                                        <div className="grid gap-4 max-w-xl">
                                            {slide.stats.map((stat, i) => (
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
                                                    <p className="text-base font-black uppercase tracking-wide text-white/80">{stat.label}: {stat.value}{stat.suffix || ""}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
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
                                ) : slide.visualType === "chaos_grid" ? (
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
                                ) : slide.visualType === "pillars" ? (
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
                                ) : slide.visualType === "comparison" ? (
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
                                ) : slide.visualType === "team" ? (
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
                                ) : slide.isMobileMockup ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 100, rotateZ: -5 }}
                                        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                                        transition={{ delay: 0.4, duration: 1, type: "spring" }}
                                    >
                                        <SmartphoneMockup />
                                    </motion.div>
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
                                                <div className="h-12 w-12 glass-pill flex items-center justify-center rounded-2xl">
                                                    <Icon className="h-6 w-6" style={{ color: slide.accent }} />
                                                </div>
                                                <div className="h-1 w-20 rounded-full bg-white/20" />
                                            </div>
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
