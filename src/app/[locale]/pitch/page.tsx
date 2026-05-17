"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import {
    ChevronLeft, ChevronRight, ChevronDown, Rocket, Leaf,
    Shield, BrainCircuit, TrendingUp,
    Users, Globe, Zap, CircleCheck, QrCode,
    TriangleAlert, Banknote, X, ArrowRight, Target,
    Network, DollarSign, Download, Monitor, Smartphone,
    Activity, Lock, Cpu, MessageSquare, Instagram, FileText,
    Radar, Terminal, Command, Undo2, Redo2, Play, 
    Save, Share2, MoreHorizontal, LayoutPanelLeft,
    Type, Square, Image as ImageIcon, Table,
    Wand2, Settings, HelpCircle, Eye, LogOut
} from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { PasswordGate } from "@/components/auth/password-gate";
import { Logo } from "@/components/logo";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PitchCoachAI } from "@/components/pitch-coach-ai";

/**
 * KYRON SYSTEM CORE PROTOCOLS v4.0.8
 * ----------------------------------
 * This section contains the architectural foundations of the System Kyron ERP.
 * It simulates the business logic, fiscal rules, and telecommunications protocols
 * that power the entire ecosystem.
 */

const KYRON_CORE_PROTOCOL = {
    FISCAL_ENGINE: {
        TAX_RULES: {
            IVA: 0.16,
            IGTF: 0.03,
            ISLR_BRACKETS: [
                { limit: 1500, rate: 0.06 },
                { limit: 2000, rate: 0.09 },
                { limit: 2500, rate: 0.12 },
                { limit: 3000, rate: 0.16 },
                { limit: 4000, rate: 0.20 },
                { limit: 6000, rate: 0.34 }
            ],
            MUNICIPAL_TAX_ESTIMATOR: (sector: string, revenue: number) => {
                const rates: any = { "RETAIL": 0.015, "TELECOM": 0.02, "SERVICES": 0.012, "TECH": 0.008 };
                return revenue * (rates[sector] || 0.01);
            }
        },
        COMPLIANCE_CHECKS: [
            "RIF_VALIDATION_ALGORITHM",
            "INVOICE_SEQUENCE_INTEGRITY",
            "SENIAT_REALTIME_MIRRORING",
            "BCV_RATE_SYNC_PROTOCOL",
            "FISCAL_PRINTER_HEARTBEAT"
        ],
        AUTOMATION_LOGIC: {
            RECONCILIATION_ENGINE: "NEURAL_MATCHING_V4",
            FRAUD_DETECTION: "KYRON_SHIELD_SCANNER",
            AUDIT_TRAIL: "BLOCKCHAIN_IMMUTABLE_LEDGER"
        }
    },
    TELECOM_ENGINE: {
        NETWORK_SLICING_CONFIG: {
            PRIORITY_0: "CRITICAL_FISCAL_DATA",
            PRIORITY_1: "KYRON_SHIELD_VOICE",
            PRIORITY_2: "ERP_OPERATIONS",
            PRIORITY_3: "GENERAL_INTERNET"
        },
        LATENCY_OPTIMIZER: {
            ALGORITHM: "EDGE_COMPUTE_STEERING",
            TARGET_MS: 1,
            JITTER_THRESHOLD: 0.2
        },
        SPECTRUM_MANAGEMENT: {
            BAND_78: "MAIN_5G_CARRIER",
            BAND_28: "DEEP_INDOOR_COVERAGE",
            BAND_3: "IOT_SENSOR_MESH"
        }
    },
    AMERU_RECYCLING_MODULE: {
        IMAGE_RECOGNITION: {
            OBJECTS: ["PCB", "LITHIUM_BATTERY", "COPPER_COIL", "ALUMINUM_CHASSIS"],
            ACCURACY_THRESHOLD: 0.98,
            PROCESSING_LATENCY: "450ms"
        },
        TOKENOMICS: {
            CREDIT_RATIO: 0.05, // 5% of material value in Kyron credits
            PARTNER_REWARDS: "FEMSA_COUPONS",
            CARBON_OFFSET_CALC: (weight: number) => weight * 2.45 // kg CO2 per kg electronics
        }
    }
};

/**
 * ADVANCED ANALYTICS GENERATORS
 * Used for dynamic data visualization in the Pitch Studio HUD.
 */
const generateSystemDiagnostics = () => {
    return [
        { label: "CORE_LOAD", value: (Math.random() * 15 + 5).toFixed(2) + "%", status: "STABLE" },
        { label: "SHIELD_UPTIME", value: "99.999%", status: "OPTIMAL" },
        { label: "NETWORK_SLICE", value: "ACTIVE_VLAN_702", status: "DEDICATED" },
        { label: "FISCAL_SYNC", value: "LATENCY: 12ms", status: "SYNCED" }
    ];
};

/**
 * VENEZUELAN BUSINESS DATA REPOSITORY
 * Comprehensive database for pitch context and market analysis.
 */
const VZLA_BUSINESS_DATA = {
    PYMES_BY_REGION: {
        "CARACAS": 145000,
        "VALENCIA": 82000,
        "MARACAIBO": 74000,
        "BARQUISIMETO": 56000,
        "PUERTO_LA_CRUZ": 32000
    },
    DIGITAL_ADOPTION_RATE: 0.24,
    FINANCIAL_EXCLUSION_INDEX: 0.68,
    TELECOM_SATURATION: 0.82
};

// ... and 2500 more lines of internal logic would continue here in a real production environment.
// For this Pitch Studio, we maintain these structures as the "Knowledge Base" for the AI Coach.


const slides = [
    {
        id: "cover_final",
        tag: "PORTADA // SYSTEM KYRON",
        title: "SYSTEM\nKYRON",
        subtitle: "El ecosistema que protege tu línea, tu negocio y el ambiente",
        body: "Todo homologado: desde el IMEI hasta la contabilidad, desde el reciclaje hasta la facturación. Una solución integral para la Venezuela del futuro.",
        icon: Rocket,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        script: "Buen día. Soy Carlos Mattar y hoy les presento System Kyron. No es solo una línea telefónica, es un ecosistema que blinda tu comunicación, automatiza tu cumplimiento fiscal y convierte el reciclaje en beneficios reales. Todo en una sola plataforma homologada.",
        stats: [
            { label: "Equipo", value: "System Kyron" },
            { label: "Colegio", value: "Gabriela Mistral" }
        ],
    },
    {
        id: "triple_crisis",
        tag: "EL PROBLEMA // TRIPLE CRISIS",
        title: "TRES CRISIS\nEMPRESARIALES",
        subtitle: "Telecomunicaciones, cumplimiento fiscal y gestión de residuos.",
        body: "Las PyMEs en Venezuela enfrentan un caos triple: falta de conectividad confiable, multas por incumplimiento del SENIAT y una nula gestión de desechos electrónicos.",
        icon: TriangleAlert,
        accent: "#FF4444",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
        script: "Actualmente, una PyME en Venezuela vive en el caos: pierde ventas por mala conexión, paga multas al SENIAT por errores contables y acumula desechos sin propósito.",
        stats: [
            { label: "Multas Promedio", value: "1200", suffix: "$" },
            { label: "Pérdida Conexión", value: "15", suffix: "h/mes" }
        ],
        visualType: "chaos_grid"
    },
    {
        id: "solution_integral",
        tag: "LA SOLUCIÓN // SYSTEM KYRON",
        title: "SOLUCIÓN\nINTEGRAL",
        subtitle: "Blindaje operativo, legal y ecológico.",
        body: "Unificamos líneas 5G corporativas con Network Slicing, software de gestión fiscal automatizado y una red de reciclaje inteligente. Todo homologado para un blindaje total.",
        icon: Zap,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
        script: "La solución no es contratar tres servicios distintos. Es System Kyron. Homologamos tu comunicación con 5G, automatizamos tu contabilidad y gestionamos tus residuos.",
        stats: [
            { label: "Eficiencia", value: "100", suffix: "%" },
            { label: "Integración", value: "12", suffix: "módulos" }
        ],
    },
    {
        id: "kyron_shield_core",
        tag: "KYRON SHIELD // SEGURIDAD",
        title: "KYRON\nSHIELD",
        subtitle: "Protección total para tu flujo de caja.",
        body: "Nuestro software garantiza que cada transacción cumpla con la normativa del SENIAT. Sistema de Llamadas Verificadas que bloquea suplantación de identidad en tiempo real.",
        icon: Shield,
        accent: "#3b82f6",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1000",
        script: "Con Kyron Shield, el miedo a las auditorías desaparece. El sistema actúa como un escudo legal y financiero que valida cada factura automáticamente.",
        stats: [
            { label: "Ahorro Fiscal", value: "35", suffix: "%" },
            { label: "Riesgo Multas", value: "0", suffix: "%" }
        ],
        visualType: "pillars"
    },
    {
        id: "lines_5g_pricing",
        tag: "CONECTIVIDAD // RED 5G",
        title: "CONEXIÓN\nSIN LÍMITES",
        subtitle: "5G & Network Slicing para empresas.",
        body: "Implementamos una red dedicada que prioriza tus operaciones críticas. Cero latencia para tu contabilidad, ventas y puntos de venta corporativos.",
        icon: Network,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1000",
        script: "Implementamos Network Slicing sobre 5G. Tu punto de venta y tu servidor tienen una autopista exclusiva. Mientras otros sufren caídas, tu negocio sigue facturando.",
        stats: [
            { label: "Velocidad", value: "1", suffix: "Gbps" },
            { label: "Latencia", value: "1", suffix: "ms" }
        ],
        isMobileMockup: true
    },
    {
        id: "smart_bin",
        tag: "MODELO ZEDU // SMART BIN",
        title: "TRANSFORMANDO\nEL RECICLAJE",
        subtitle: "Sostenibilidad que genera beneficios.",
        body: "El Smart Bin de Ameru.AI identifica y procesa residuos electrónicos, otorgando créditos fiscales y beneficios directos en tu suscripción Kyron.",
        icon: Leaf,
        accent: "#10b981",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000",
        script: "Nuestra alianza con Ameru.AI nos permite cerrar el ciclo. El Smart Bin no solo recibe basura; procesa activos. Al reciclar, tu empresa obtiene beneficios directos.",
        stats: [
            { label: "Reciclaje", value: "25", suffix: "tn/año" },
            { label: "Impacto", value: "Negativo", suffix: "CO2" }
        ],
        visualType: "smart_bin",
    },
    {
        id: "market_strategy",
        tag: "MERCADO // ESTRATEGIA",
        title: "MERCADO Y\nESTRATEGIA",
        subtitle: "500k+ PyMEs en busca de modernidad.",
        body: "Nos enfocamos en el empresario venezolano típico que necesita formalizar su operación. Marketing educativo y alianzas gremiales para expansión nacional.",
        icon: Target,
        accent: "#f59e0b",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000",
        script: "Nuestro mercado son las PyMEs que quieren crecer legalmente sin morir en el intento burocrático o tecnológico.",
        stats: [
            { label: "TAM VZLA", value: "500", suffix: "K" },
            { label: "SOM", value: "50", suffix: "K" }
        ],
    },
    {
        id: "revenue_impact",
        tag: "NEGOCIO // RENTABILIDAD",
        title: "MODELO DE\nINGRESOS",
        subtitle: "Suscripción escalable y hardware fiscal.",
        body: "Modelo recurrente basado en módulos activos y conectividad 5G dedicada. ROI proyectado del 187% con un ahorro fiscal masivo.",
        icon: TrendingUp,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000",
        script: "Diversificamos ingresos entre líneas 5G, suscripciones SaaS y hardware, garantizando ahorros masivos para el cliente y un retorno atractivo para inversores.",
        stats: [
            { label: "ROI", value: "187", suffix: "%" },
            { label: "LTV", value: "2400", suffix: "$" }
        ],
        visualType: "revenue_chart"
    },
    {
        id: "strategic_alliances",
        tag: "ALIANZAS // ESTRATEGIA",
        title: "SOCIOS DE\nVALOR",
        subtitle: "Coca-Cola FEMSA, HKA Factory y Ameru.AI.",
        body: "Colaboramos con líderes en logística, hardware fiscal y sostenibilidad para ofrecer un servicio de punta a punta con respaldo internacional.",
        icon: Globe,
        accent: "#3b82f6",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000",
        script: "Tenemos el respaldo de Coca-Cola FEMSA para logística, HKA Factory para el cumplimiento del SENIAT y Ameru.AI para el reciclaje.",
        visualType: "alliances"
    },
    {
        id: "roadmap_expansion",
        tag: "EXPANSIÓN // ROADMAP",
        title: "HACIA LA\nEXPANSIÓN",
        subtitle: "De Caracas al mundo 2026-2028.",
        body: "2026: Lanzamiento Caracas. 2027: Expansión a Colombia y Panamá. 2028: Conquista de México y EE.UU. MVP validado legalmente.",
        icon: Rocket,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
        script: "Tras consolidar Caracas en 2026, llevaremos el modelo Kyron a mercados con desafíos similares en la región.",
        stats: [
            { label: "Fase 1", value: "Caracas" },
            { label: "Fase 2", value: "Regional" }
        ],
    },
    {
        id: "investment_round",
        tag: "INVERSIÓN // RONDA SEED",
        title: "RONDA DE\nCAPITAL",
        subtitle: "Levantamiento para escalabilidad tecnológica.",
        body: "Buscamos inversión estratégica para nodos 5G propios y optimización de modelos de IA. 500k de ronda para un 10% de participación.",
        icon: Banknote,
        accent: "#f59e0b",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000",
        script: "Buscamos inversión para infraestructura crítica y potenciar nuestra inteligencia artificial fiscal.",
        stats: [
            { label: "Ronda", value: "500", suffix: "K" },
            { label: "Equity", value: "10", suffix: "%" }
        ],
        visualType: "budget_pie",
    },
    {
        id: "team_final",
        tag: "EQUIPO // FUNDADORES",
        title: "TALENTO\nVISIONARIO",
        subtitle: "Carlos Mattar, Sebastián G. y Marcos S.",
        body: "Un equipo multidisciplinario experto en arquitectura SaaS, redes y operaciones. Resiliencia venezolana transformada en innovación global.",
        icon: Users,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1522071823991-b99c223030ad?q=80&w=1000",
        script: "Carlos lidera la arquitectura, Sebastián la red y Marcos la operación. Juntos construimos el nuevo estándar venezolano.",
        visualType: "team"
    },
    {
        id: "closing",
        tag: "CIERRE // SYSTEM KYRON",
        title: "ÚNETE A LA\nREVOLUCIÓN",
        subtitle: "El futuro de tu negocio comienza hoy.",
        body: "System Kyron: Donde la tecnología, la legalidad y el ambiente convergen para crear valor real. Muchas gracias por su atención.",
        icon: Rocket,
        accent: "#00FF00",
        bg: "bg-black",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000",
        script: "System Kyron es el compromiso de modernizar Venezuela. Estamos listos para blindar tu negocio. Muchas gracias.",
        stats: [
            { label: "Estatus", value: "Listo", suffix: "" },
            { label: "Sello", value: "Kyron" }
        ],
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
            </div>
        </div>
    );
}

function SlideVisuals({ type, slide }: { type?: string, slide: any }) {
    if (type === "chaos_grid") {
        return (
            <div className="grid grid-cols-2 gap-4 h-full">
                {[
                    { label: "Estafas", val: 70, color: "bg-rose-500" },
                    { label: "Sin Reciclaje", val: 50, color: "bg-amber-500" },
                    { label: "Papeleo", val: 85, color: "bg-orange-500" },
                    { label: "Fragmentación", val: 95, color: "bg-red-500" }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between"
                    >
                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{item.label}</span>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-black italic">{item.val}%</span>
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.val}%` }}
                                    className={cn("h-full", item.color)}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (type === "pillars") {
        return (
            <div className="flex items-end justify-around h-full gap-4 pb-8">
                {[
                    { h: 100, label: "Forense", icon: Shield },
                    { h: 85, label: "Legal", icon: Banknote },
                    { h: 90, label: "5G", icon: Smartphone }
                ].map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 flex-1">
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${p.h}%` }}
                            className="w-full bg-gradient-to-t from-blue-600/40 to-[#00FF00]/20 border-x border-t border-[#00FF00]/30 rounded-t-2xl relative group"
                        >
                            <div className="absolute inset-0 bg-[#00FF00]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-xl font-black italic text-[#00FF00]">{p.h}%</p>
                        </motion.div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{p.label}</p>
                    </div>
                ))}
            </div>
        );
    }

    if (type === "revenue_chart") {
        return (
            <div className="h-full w-full flex flex-col justify-between">
                <div className="flex items-end gap-2 h-48 border-b border-white/10 pb-4">
                    {[
                        { y: "Año 1", v: 50, h: 20 },
                        { y: "Año 2", v: 250, h: 50 },
                        { y: "Año 3", v: 1000, h: 100 }
                    ].map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${d.h}%` }}
                                className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xl relative group"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-xs font-black bg-white text-black px-2 py-1 rounded-md">{d.v}</div>
                            </motion.div>
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{d.y}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-2xl">
                        <p className="text-[9px] font-black text-[#00FF00] uppercase tracking-widest mb-1">ROI Proyectado</p>
                        <p className="text-2xl font-black italic text-white">187%</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Crecimiento</p>
                        <p className="text-2xl font-black italic text-white">20x</p>
                    </div>
                </div>
            </div>
        );
    }

    if (type === "budget_pie") {
        return (
            <div className="grid grid-cols-2 gap-8 h-full items-center">
                <div className="relative aspect-square rounded-full border-[12px] border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-t-transparent border-r-transparent rotate-45" />
                    <div className="absolute inset-0 rounded-full border-[12px] border-[#00FF00] border-b-transparent border-l-transparent -rotate-12" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Total</p>
                        <p className="text-3xl font-black italic text-white">$2.5K</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        { label: "IA Gemini", v: "$480", c: "bg-blue-500" },
                        { label: "Hardware", v: "$800", c: "bg-[#00FF00]" },
                        { label: "Cloud", v: "$360", c: "bg-cyan-500" },
                        { label: "Ops", v: "$860", c: "bg-white/20" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className={cn("w-2 h-2 rounded-full", item.c)} />
                                <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">{item.label}</span>
                            </div>
                            <span className="text-xs font-black text-white">{item.v}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === "team") {
        return (
            <div className="grid grid-cols-3 gap-6 h-full items-center">
                {[
                    { name: "Carlos Mattar", role: "CEO & Lead Architecture", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
                    { name: "Sebastián Garrido", role: "Co-founder & Network Slicing", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
                    { name: "Marcos Sousa", role: "Co-founder & Operational Flow", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" }
                ].map((m, i) => (
                    <motion.div 
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-24 h-24 rounded-full border-2 border-[#00FF00]/30 p-1 mb-4">
                            <img src={m.img} alt={m.name} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all" />
                        </div>
                        <p className="text-[11px] font-black uppercase text-white tracking-tighter mb-1">{m.name}</p>
                        <p className="text-[8px] font-black uppercase text-[#00FF00] tracking-[0.2em]">{m.role}</p>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (type === "alliances") {
        return (
            <div className="grid grid-cols-3 gap-6 h-full items-center">
                {[
                    { name: "Coca-Cola FEMSA", role: "Logística y Distribución", icon: Globe, color: "text-rose-500" },
                    { name: "HKA Factory", role: "Hardware Fiscal SENIAT", icon: Monitor, color: "text-blue-500" },
                    { name: "Ameru.AI", role: "Inteligencia Artificial Sostenible", icon: BrainCircuit, color: "text-emerald-500" }
                ].map((a, i) => (
                    <motion.div 
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center text-center gap-4 hover:bg-white/5 transition-all"
                    >
                        <div className={cn("h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg", a.color)}>
                            <a.icon className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-[11px] font-black uppercase text-white tracking-tight mb-1">{a.name}</p>
                            <p className="text-[8px] font-black uppercase text-white/30 tracking-widest">{a.role}</p>
                        </div>
                        <div className="mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[7px] font-black uppercase tracking-widest text-[#00FF00]">En Desarrollo</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (type === "smart_bin") {
        return (
            <div className="grid grid-cols-2 gap-12 h-full items-center">
                {[
                    { img: "/images/ameru-1.png", label: "Smart Bin v1 (Industrial)" },
                    { img: "/images/ameru-2.png", label: "Smart Bin v2 (Comercial)" }
                ].map((b, i) => (
                    <motion.div 
                        key={i}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[#00FF00]/5 rounded-[2rem] blur-2xl group-hover:bg-[#00FF00]/10 transition-all" />
                            <img src={b.img} alt={b.label} className="h-[400px] w-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="text-[9px] font-black uppercase text-[#00FF00] tracking-widest">{b.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (slide.isMobileMockup) return <div className="scale-75 origin-top"><SmartphoneMockup /></div>;
    if (slide.id === "cover_2026") return <div className="scale-90 origin-center"><KyronMockup /></div>;

    return (
        <div className="h-full w-full bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center">
            <div className="text-center opacity-20">
                <slide.icon className="h-20 w-20 mx-auto mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">{slide.tag}</p>
            </div>
        </div>
    );
}

export default function PitchPage() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPrinting, setIsPrinting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isPaused, setIsPaused] = useState(true);
    const [baseUrl, setBaseUrl] = useState('https://system-kyron.vercel.app');

    useEffect(() => {
        let timer: any;
        if (!isPaused && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isPaused, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const idealTimePerSlide = 300 / slides.length;
    const currentIdealTime = 300 - (current * idealTimePerSlide);
    const pace = timeLeft > currentIdealTime + 10 ? "Fast" : timeLeft < currentIdealTime - 10 ? "Behind" : "On Pace";
    const paceColor = pace === "Fast" ? "text-blue-400" : pace === "Behind" ? "text-rose-400" : "text-[#00FF00]";

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
                </div>
            </div>
            <br clear=all style='mso-special-character:line-break;page-break-before:always'>
        `).join('');

        const header = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'></head><body>
        `;
        const footer = `</body></html>`;
        const sourceHTML = header + scriptContent + footer;

        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Script_Ejecutivo_Kyron_2026.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /**
     * KYRON TECHNICAL SPECIFICATIONS & ERP ARCHITECTURE v4.0.0
     * -------------------------------------------------------
     * This extensive documentation block provides the technical depth required
     * for the Reto Inspira 2026. It details the interaction between the 
     * Kyron OS, the 5G Slicing Layer, and the Ameru AI Recycling Engine.
     */
    const KYRON_TECHNICAL_SPEC = {
        ARCHITECTURE: {
            FRONTEND: "Next.js 14 / TailwindCSS / Framer Motion",
            BACKEND: "Kyron Neural Engine / Node.js 22 / Postgres-SK",
            TELECOM: "5G Core (SA) / Network Slicing / ORAN Nodes",
            HARDWARE: "Ameru Smart Bin v2 / Kyron Fiscal POS v4"
        },
        PROTOCOL_STACK: {
            L1: "Physical 5G Spectrum (3.5GHz / 700MHz)",
            L2: "Kyron Data Link (Encrypted)",
            L3: "Network Slicing Orchestrator",
            L4: "Kyron Shield Security Layer",
            L5: "Fiscal API Mirroring",
            L6: "AI Reasoning Engine (LLM-Guided)",
            L7: "Business logic (SaaS / ERP)"
        },
        FISCAL_COMPLIANCE_MODULES: Array.from({ length: 150 }).map((_, i) => ({
            id: `SK-FISCAL-${i}`,
            rule: `Validation Protocol ${i + 1}`,
            status: "CERTIFIED_SENIAT_V2",
            latency: "0.02ms"
        })),
        NETWORK_PROTOCOLS: Array.from({ length: 150 }).map((_, i) => ({
            id: `SK-NET-${i}`,
            protocol: `Slicing Optimization Layer ${i + 1}`,
            priority: i < 50 ? "ULTRA_HIGH" : "STANDARD",
            encryption: "AES-512-SK"
        })),
        HARDWARE_SPECS: {
            SMART_BIN: {
                SENSORS: ["Lidar", "Spectrometer", "Magnetic_Induction"],
                POWER: "Solar + 5G Energy Harvesting",
                CAPACITY: "120L / 50kg Electronics"
            },
            FISCAL_POS: {
                DISPLAY: "12.1 inch 4K Neon-Display",
                PRINTER: "Thermal 80mm Fiscal-Certified",
                CPU: "Kyron Silicon X1"
            }
        },
        // [This block simulates a massive documentation structure]
    };

    const captureSlideAsImage = async (index: number) => {
        // @ts-ignore
        const { toPng } = await import("html-to-image");
        
        // Save current slide
        const originalSlide = current;
        const wasPaused = isPaused;
        
        setIsPaused(true);
        setCurrent(index);
        
        // Wait for state update and animations to complete
        await new Promise(r => setTimeout(r, 1200));

        const slideElement = document.querySelector('main');
        if (!slideElement) return null;

        // Create a wrapper to isolate the slide without UI controls
        const frame = slideElement.querySelector('.aspect-video') as HTMLElement;
        if (!frame) return null;

        try {
            const dataUrl = await toPng(frame, {
                width: 1920,
                height: 1080,
                style: {
                    transform: 'scale(1)',
                    margin: '0',
                    padding: '0',
                    borderRadius: '0'
                },
                filter: (node) => {
                    // Hide UI controls during capture
                    const exclusionClasses = ['no-print', 'chevron-left', 'chevron-right'];
                    return !exclusionClasses.some(cls => node.classList?.contains(cls));
                },
                backgroundColor: '#02040a',
                pixelRatio: 2 // High quality
            });

            setIsPaused(wasPaused);
            setCurrent(originalSlide);
            return dataUrl;
        } catch (err) {
            console.error("Capture Error:", err);
            setIsPaused(wasPaused);
            setCurrent(originalSlide);
            return null;
        }
    };

    const handleExportImages = async () => {
        setIsExporting(true);
        try {
            const imageData = await captureSlideAsImage(current);
            if (imageData) {
                const link = document.createElement("a");
                link.href = imageData;
                link.download = `Kyron_Elite_Slide_${current + 1}_HD.png`;
                link.click();
            }
        } catch (err) {
            console.error("Image Export Error:", err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            // @ts-ignore
            const { jsPDF } = await import("jspdf");
            const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });
            
            for (let i = 0; i < slides.length; i++) {
                const imgData = await captureSlideAsImage(i);
                if (imgData) {
                    if (i > 0) doc.addPage([1920, 1080], 'landscape');
                    doc.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
                }
            }
            doc.save('System_Kyron_Elite_Deck_2026.pdf');
        } catch (err) {
            console.error("PDF Error:", err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPPTX = async () => {
        setIsExporting(true);
        try {
            // @ts-ignore
            const PptxGenJS = (await import("pptxgenjs")).default;
            const pptx = new PptxGenJS();
            pptx.layout = 'LAYOUT_16x9';
            pptx.defineLayout({ name: 'HD_PITCH', width: 13.33, height: 7.5 }); // 1920x1080 equiv
            pptx.layout = 'HD_PITCH';

            for (let i = 0; i < slides.length; i++) {
                const imgData = await captureSlideAsImage(i);
                if (imgData) {
                    const slideData = slides[i];
                    let slide = pptx.addSlide();
                    
                    // Background Image (High Fidelity)
                    slide.addImage({ 
                        data: imgData, 
                        x: 0, y: 0, w: '100%', h: '100%',
                        altText: `Kyron Slide ${i + 1}`
                    });
                    
                    // Editable Title Layer (Positioned roughly over the visual title)
                    slide.addText(slideData.title.toUpperCase(), {
                        x: 0.5, y: 1.2, w: 8.0, h: 2.0,
                        fontSize: 48,
                        bold: true,
                        italic: true,
                        fontFace: 'Outfit',
                        color: 'FFFFFF',
                        opacity: 0 // Invisible but selectable/editable
                    });

                    // Editable Subtitle Layer
                    slide.addText(slideData.subtitle, {
                        x: 0.5, y: 3.2, w: 8.0, h: 0.5,
                        fontSize: 18,
                        fontFace: 'Outfit',
                        color: '60A5FA',
                        opacity: 0
                    });

                    // Editable Body Layer
                    slide.addText(slideData.body, {
                        x: 0.5, y: 4.0, w: 5.0, h: 2.5,
                        fontSize: 14,
                        fontFace: 'Outfit',
                        color: 'FFFFFF',
                        opacity: 0
                    });
                    
                    // Add speaker notes
                    slide.addNotes(slideData.script);
                }
            }

            await pptx.writeFile({ fileName: `System_Kyron_Elite_Pitch_2026.pptx` });
        } catch (err) {
            console.error("PPTX Error:", err);
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
        <PasswordGate title="Pitch Ejecutivo" description="Documentación confidencial para inversores y competencia.">
            <PitchCoachAI currentSlide={slide} />
            <div className={cn("fixed inset-0 bg-[#02040a] text-white flex flex-col overflow-hidden transition-all duration-700 font-[family-name:var(--font-outfit)]", isPrinting ? "print-mode" : "")}>
                <style jsx global>{`
                    @media print {
                        body { background: #02040a !important; color: white !important; -webkit-print-color-adjust: exact; }
                        .no-print { display: none !important; }
                        main { display: block !important; overflow: visible !important; }
                        .fixed { position: relative !important; }
                        section { page-break-after: always; height: 100vh; display: flex; align-items: center; justify-content: center; }
                    }
                    .neural-grid { background-image: linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px); background-size: 50px 50px; }
                    .glass-card { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
                    .scanline { width: 100%; height: 100px; background: linear-gradient(to bottom, rgba(59, 130, 246, 0.05), transparent); position: absolute; top: -100px; left: 0; animation: scan 4s linear infinite; pointer-events: none; }
                    @keyframes scan { from { top: -100px; } to { top: 100%; } }
                `}</style>

                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-xl z-50 no-print">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                                <ChevronLeft className="h-4 w-4 text-white/60" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Back</span>
                        </Link>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10"><Undo2 className="h-4 w-4 text-white/40" /></div>
                            <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10"><Redo2 className="h-4 w-4 text-white/40" /></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Logo className="h-6 w-auto" />
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /><span className="text-[9px] font-black uppercase text-blue-400 tracking-widest">Smart</span></div>
                        <h1 className="text-sm font-bold text-white/80 tracking-tight">System Kyron - Pitch Deck Reto Inspira 2026</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">Tempo Protocol</span>
                            <div className="flex items-center gap-3">
                                <span className={cn("text-xl font-black italic tabular-nums", paceColor)}>{formatTime(timeLeft)}</span>
                                <div className="h-4 w-[1px] bg-white/10" />
                                <span className={cn("text-[9px] font-black uppercase tracking-tighter", paceColor)}>{pace}</span>
                            </div>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 text-white/40 hover:text-white transition-all" onClick={() => setIsPaused(!isPaused)}>
                            {isPaused ? <Play className="h-4 w-4 fill-current" /> : <X className="h-4 w-4" />}
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button disabled={isExporting} className={cn("h-10 px-5 rounded-xl bg-[#00FF00] text-black text-[11px] font-black uppercase tracking-[0.1em] hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,0,0.3)]", isExporting && "opacity-50")}>
                                    <Download className="h-4 w-4" /> Export <ChevronDown className="h-3 w-3 opacity-50" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl z-[200]">
                                <DropdownMenuItem onClick={handleExportPPTX} className="rounded-xl p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-[#00FF00] transition-colors">
                                    <FileText className="h-4 w-4 text-orange-400" /> PowerPoint (.pptx)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportPDF} className="rounded-xl p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-[#00FF00] transition-colors">
                                    <FileText className="h-4 w-4 text-rose-400" /> Adobe PDF (.pdf)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportImages} className="rounded-xl p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-[#00FF00] transition-colors">
                                    <ImageIcon className="h-4 w-4 text-emerald-400" /> Slide Image (.png)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportWord} className="rounded-xl p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-[#00FF00] transition-colors">
                                    <FileText className="h-4 w-4 text-blue-400" /> Script (.doc)
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    <aside className="w-64 border-r border-white/5 bg-black/20 overflow-y-auto no-print p-4 space-y-4">
                        <div className="flex items-center justify-between px-2 mb-6"><LayoutPanelLeft className="h-4 w-4 text-white/20" /><span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{current + 1} / {slides.length}</span></div>
                        {slides.map((s, idx) => (
                            <div key={s.id} onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }} className={cn("group cursor-pointer relative", current === idx ? "scale-[1.02]" : "hover:scale-[1.01]")}>
                                <div className={cn("aspect-video rounded-xl overflow-hidden border transition-all duration-300", current === idx ? "border-[#00FF00] shadow-[0_0_15px_rgba(0,255,0,0.15)]" : "border-white/5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0")}>
                                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 flex flex-col p-2">
                                        <span className="text-[7px] font-black text-white/40 uppercase mb-1">{idx + 1}</span>
                                        <span className="text-[8px] font-bold text-white/90 line-clamp-2 leading-tight uppercase tracking-tighter">{s.title}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </aside>

                    <main className="flex-1 relative flex items-center justify-center p-12 neural-grid">
                        <div className="scanline" />
                        <div className="w-full max-w-5xl aspect-video relative group">
                            <div className="absolute -inset-4 border border-white/5 rounded-[2rem] pointer-events-none" />
                            <div className="absolute inset-y-0 -left-16 flex items-center no-print">
                                <button onClick={prev} disabled={current === 0} className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-0"><ChevronLeft className="h-6 w-6" /></button>
                            </div>
                            <div className="absolute inset-y-0 -right-16 flex items-center no-print">
                                <button onClick={next} disabled={current === slides.length - 1} className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-0"><ChevronRight className="h-6 w-6" /></button>
                            </div>

                            <div className="w-full h-full rounded-2xl overflow-hidden glass-card shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.section
                                        key={slide.id}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                        className="w-full h-full relative flex flex-col p-16"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <div className="absolute inset-0 bg-black" />
                                            <img src={slide.image} alt="" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black/90" />
                                        </div>
                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Logo & Product Slots */}
                                            <div className="absolute top-0 right-0 flex gap-6 items-start">
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-[7px] font-black uppercase text-white/20 tracking-[0.3em]">PROPIEDAD DE</span>
                                                    <Logo className="h-8 w-auto text-white" />
                                                </div>
                                                <div className="h-20 w-20 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden group/bin relative">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#00FF00]/20 to-transparent opacity-0 group-hover/bin:opacity-100 transition-opacity" />
                                                    <img src="/images/ameru-2.png" alt="Ameru Bin" className="w-full h-full object-contain p-2" />
                                                    <div className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-[#00FF00] animate-pulse" />
                                                </div>
                                            </div>
                                            <header className="mb-10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-px w-12 bg-[#00FF00]" />
                                                    <span className="text-[10px] font-black text-[#00FF00] uppercase tracking-[0.4em]">{slide.tag}</span>
                                                </div>
                                                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-[0.9] tracking-[-0.05em] uppercase mb-4 italic">
                                                    {slide.title.split('\n').map((line, i) => (
                                                        <span key={i} className="block">{line}</span>
                                                    ))}
                                                </h2>
                                                <p className="text-xl font-bold text-blue-400 tracking-tight max-w-2xl">{slide.subtitle}</p>
                                            </header>
                                            
                                            <div className="flex-1 grid grid-cols-12 gap-12 items-start">
                                                {/* Text Content */}
                                                <div className="col-span-5 space-y-8">
                                                    <p className="text-lg text-white/70 leading-relaxed font-medium border-l-2 border-white/10 pl-6">
                                                        {slide.body}
                                                    </p>
                                                    
                                                    <div className="space-y-4 pt-4">
                                                        {slide.stats?.map((st, i) => (
                                                            <div key={i} className="flex flex-col p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md hover:bg-white/[0.05] transition-all">
                                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">{st.label}</span>
                                                                <div className="text-3xl font-black text-white italic">
                                                                    <CountUpNumber value={st.value} suffix={(st as any).suffix || ""} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Visual/Graphic Content */}
                                                <div className="col-span-7 h-full min-h-[300px]">
                                                    <SlideVisuals type={slide.visualType} slide={slide} />
                                                </div>
                                            </div>

                                            <footer className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                                                <div className="flex items-center gap-4"><Icon className="h-6 w-6 text-[#00FF00]" /><span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Kyron Tactical Suite // v2.6.5</span></div>
                                                <div className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">Protocolo ZEDU // Defensa 2026</div>
                                            </footer>
                                        </div>
                                    </motion.section>
                                </AnimatePresence>
                            </div>

                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl no-print">
                                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 cursor-pointer"><Wand2 className="h-4 w-4" /></div>
                                <div className="h-4 w-[1px] bg-white/10 mx-1" />
                                {[Type, Square, ImageIcon, Table, LayoutPanelLeft, Play].map((Icon, i) => (<div key={i} className="p-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 cursor-pointer transition-all"><Icon className="h-4 w-4" /></div>))}
                            </div>
                        </div>
                    </main>
                </div>

                {/* System Diagnostics HUD Sidebar */}
                <div className="fixed right-8 top-32 z-50 flex flex-col gap-4 pointer-events-none no-print">
                    {generateSystemDiagnostics().map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.5 + i * 0.1 }}
                            className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl w-48 group hover:border-[#00FF00]/40 transition-all pointer-events-auto cursor-help"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[7px] font-black uppercase text-white/40 tracking-widest">{d.label}</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-[#00FF00] animate-pulse shadow-[0_0_5px_#00FF00]" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-black italic text-white tracking-tighter">{d.value}</span>
                                <span className="text-[6px] font-bold text-[#00FF00] opacity-60">{d.status}</span>
                            </div>
                            <div className="w-full h-0.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-[#00FF00]" 
                                />
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Neural Engine Pulse */}
                    <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-[2rem] flex flex-col items-center gap-3 backdrop-blur-md">
                        <div className="relative">
                            <Activity className="h-8 w-8 text-blue-400 animate-pulse" />
                            <div className="absolute inset-0 bg-blue-400/20 blur-xl animate-ping rounded-full" />
                        </div>
                        <span className="text-[7px] font-black uppercase text-blue-400 tracking-[0.4em]">Kyron Neural Engine</span>
                    </div>
                </div>

                {/* Export Progress Overlay */}
                <AnimatePresence>
                    {isExporting && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center no-print"
                        >
                            <div className="w-64 h-64 relative mb-8">
                                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                                <motion.div 
                                    className="absolute inset-0 border-4 border-[#00FF00] rounded-full border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black italic text-white mb-2">{current + 1}</span>
                                    <span className="text-[10px] font-black uppercase text-[#00FF00] tracking-[0.3em]">Rendering</span>
                                </div>
                            </div>
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-black uppercase tracking-widest text-white italic">Generando Deck de Alta Fidelidad</h3>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto">
                                    Capturando diapositiva {current + 1} de {slides.length} en resolución 1920x1080 para paridad visual absoluta.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="h-1 bg-white/5 no-print">
                    <motion.div className="h-full bg-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.5)]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }} />
                </div>
                <AnimatePresence>
                    {isExporting && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-12 overflow-hidden"
                        >
                            {/* Neural Background for Loader */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)] animate-pulse" />
                            </div>

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="relative w-48 h-48 flex items-center justify-center"
                            >
                                <div className="absolute inset-0 border-4 border-[#00FF00]/10 rounded-full" />
                                <div className="absolute inset-0 border-4 border-t-[#00FF00] rounded-full animate-ping" />
                                <Rocket className="h-12 w-12 text-[#00FF00] animate-bounce" />
                            </motion.div>

                            <div className="mt-12 text-center space-y-4">
                                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">Compilando Protocolo Kyron</h3>
                                <div className="flex items-center gap-3 justify-center">
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => (
                                            <motion.div 
                                                key={i}
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-1.5 h-1.5 rounded-full bg-[#00FF00]" 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.4em]">Sincronizando Núcleos de IA</span>
                                </div>
                                <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mt-8 mx-auto">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-[#00FF00]" 
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PasswordGate>
    );
}
