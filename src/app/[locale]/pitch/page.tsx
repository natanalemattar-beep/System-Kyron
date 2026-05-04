"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Rocket, Leaf,
    Shield, BrainCircuit, TrendingUp,
    Users, Globe, Zap, CircleCheck, QrCode,
    TriangleAlert, Banknote, X, ArrowRight,
    Network, DollarSign, Download, Monitor, Smartphone,
    Activity, Lock, Cpu, MessageSquare, Instagram
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const slides = [
    {
        id: "cover",
        tag: "INTRODUCCIÓN",
        title: "SYSTEM\nKYRON",
        subtitle: "La Infraestructura Digital para el Nuevo Siglo en Venezuela.",
        body: "Unificando Conectividad, Contabilidad y Legalidad en un ecosistema soberano.",
        icon: Rocket,
        accent: "#3b82f6",
        bg: "from-blue-600/30 via-indigo-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", // Futuristic earth/data
        script: "Buenos días. No venimos a presentar un software, venimos a presentar System Kyron: la infraestructura digital que permitirá al sector privado venezolano competir en las ligas mayores globales.",
        stats: null,
    },
    {
        id: "problem",
        tag: "EL DESAFÍO",
        title: "EL MURO\nOPERATIVO",
        subtitle: "La fragmentación y la burocracia digital asfixian el crecimiento.",
        body: "Las empresas pierden el 68% de su capacidad productiva lidiando con desconexión técnica y un entorno fiscal complejo que castiga el error manual.",
        icon: TriangleAlert,
        accent: "#f43f5e",
        bg: "from-rose-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Data chaos/charts
        script: "Dirigir una empresa en Venezuela es hoy una labor de resistencia. El empresario vive atrapado entre sistemas que no se hablan, una conectividad que falla y el riesgo constante de multas millonarias.",
        stats: [
            { label: "Carga Administrativa", value: "68%" },
            { label: "Riesgo Fiscal", value: "Crítico" },
            { label: "Sistemas Desconectados", value: "4+" },
        ],
    },
    {
        id: "module_telecom",
        tag: "MÓDULO: TELECOM",
        title: "CONECTIVIDAD\nALPHA 5G",
        subtitle: "La primera red eSIM de grado empresarial en Venezuela.",
        body: "Baja latencia (20ms), seguridad encriptada y gestión de flota directamente desde el panel administrativo. Tu negocio nunca se detiene.",
        icon: Zap,
        accent: "#06b6d4",
        bg: "from-cyan-900/30 via-blue-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", // Tech network
        script: "Nuestra Red Alpha no es solo internet. Es la garantía de que tu facturación, tus cobros y tu comunicación nunca caigan, incluso en los escenarios más exigentes.",
        stats: [
            { label: "Latencia", value: "20ms" },
            { label: "Velocidad", value: "5G" },
            { label: "Security", value: "AES-256" },
        ],
        isMobileMockup: true
    },
    {
        id: "module_accounting",
        tag: "MÓDULO: FINANZAS",
        title: "CONTABILIDAD\nIA VEN-NIF",
        subtitle: "Sincronización total con BCV y SENIAT.",
        body: "Automatización de IGTF, IVA y Retenciones. Libros legales digitales y conciliación bancaria instantánea bajo estándares internacionales.",
        icon: Banknote,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop", // Finance/Calculations
        script: "Convertimos la contabilidad de un dolor de cabeza en una ventaja competitiva. Nuestra IA entiende la tasa BCV y el Código Orgánico Tributario para que tú solo te preocupes por vender.",
        stats: [
            { label: "Precisión", value: "99.9%" },
            { label: "Ahorro Tiempo", value: "80%" },
            { label: "Sincronía BCV", value: "Realtime" },
        ],
        isMockup: true
    },
    {
        id: "module_legal",
        tag: "MÓDULO: LEGAL",
        title: "BLINDAJE\nIA ELITE",
        subtitle: "Asesoría jurídica y cumplimiento LOTTT preventivo.",
        body: "Generación automática de contratos, gestión de litigios y alertas de cumplimiento laboral. Tu escritorio jurídico disponible 24/7.",
        icon: Shield,
        accent: "#8b5cf6",
        bg: "from-violet-900/30 via-indigo-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop", // Justice/Legal
        script: "Protegemos tu empresa desde adentro. Kyron Legal redacta contratos y te alerta sobre riesgos laborales antes de que se conviertan en demandas o multas.",
        stats: [
            { label: "Contratos IA", value: "Ilimitados" },
            { label: "Protección LOTTT", value: "Total" },
            { label: "Disponibilidad", value: "24/7" },
        ],
    },
    {
        id: "module_sustainability",
        tag: "MÓDULO: VERDE",
        title: "AMERU.AI\nSOSTENIBLE",
        subtitle: "Monetización de huella ecológica y créditos de carbono.",
        body: "Certificación de impacto ambiental integrada. Convierte tus procesos sostenibles en activos financieros y cumple con normativas globales.",
        icon: Globe,
        accent: "#22c55e",
        bg: "from-green-900/30 via-emerald-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop", // Green tech/Energy
        script: "Con Ameru.AI, la sostenibilidad no es un gasto, es un ingreso. Ayudamos a las empresas venezolanas a certificar su huella verde y a participar en el mercado de eco-créditos.",
        stats: [
            { label: "Certificación", value: "ISO-14001" },
            { label: "Impacto", value: "Eco-Sync" },
            { label: "Tokenización", value: "Activa" },
        ],
    },
    {
        id: "traction",
        tag: "VALIDACIÓN",
        title: "HITOS\nLOGRADOS",
        subtitle: "Crecimiento real con infraestructura probada.",
        body: "50 empresas piloto operando con éxito. Cero multas fiscales y una retención del 100% de los usuarios desde el lanzamiento Alfa.",
        icon: TrendingUp,
        accent: "#3b82f6",
        bg: "from-blue-900/30 via-slate-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", // Growth/Success
        script: "Nuestros números no mienten. Las empresas que usan Kyron han eliminado sus multas fiscales y han recuperado 12 horas semanales de gestión administrativa.",
        stats: [
            { label: "Empresas Piloto", value: "50" },
            { label: "Satisfacción NPS", value: "92" },
            { label: "Retención", value: "100%" },
        ],
    },
    {
        id: "cta",
        tag: "INVERSIÓN",
        title: "RONDA\nSEED $2.5M",
        subtitle: "Escalando la revolución digital de Venezuela.",
        body: "Inversión destinada a: 40% Infraestructura 5G, 30% I+D IA, 30% Expansión Comercial. Meta: 10,000 empresas en 18 meses.",
        icon: DollarSign,
        accent: "#f59e0b",
        bg: "from-amber-900/30 via-blue-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop", // Investment/Money
        script: "Estamos listos para el siguiente nivel. Buscamos socios estratégicos que crean en el potencial tecnológico de Venezuela y quieran ser parte del próximo unicornio regional.",
        stats: [
            { label: "Meta Inversión", value: "$2.5M" },
            { label: "Runway", value: "24 meses" },
            { label: "Objetivo 2026", value: "10K" },
        ],
    },
    {
        id: "closing",
        tag: "EL SIGUIENTE PASO",
        title: "ÚNETE A LA\nEVOLUCIÓN",
        subtitle: "System Kyron: El nuevo estándar empresarial.",
        body: "No dejes que el caos administrativo frene el potencial de tu empresa. Con System Kyron, adquieres orden, rapidez y transparencia desde el primer día.",
        promise: {
            title: "NUESTRA PROMESA",
            items: [
                "Soporte técnico humano, local y siempre disponible.",
                "Capacitación total para ti y todo tu equipo.",
                "Migración de datos sin perder tu información actual."
            ]
        },
        contact: {
            phone: "0424-1846016",
            instagram: "@systemkyron"
        },
        icon: CircleCheck,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-blue-900/20 to-transparent",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
        isQRSlide: true,
        script: "Muchas gracias por su atención. System Kyron es más que tecnología, es el nuevo estándar para hacer negocios en Venezuela. Estamos listos para sus preguntas.",
        stats: null,
    },
];

function KyronMockup() {
    return (
        <div className="w-full aspect-video rounded-3xl bg-black/40 border border-white/10 overflow-hidden relative shadow-2xl backdrop-blur-sm group">
            {/* Top Bar */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                </div>
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Lock className="h-3 w-3" /> system-kyron.secure
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-1 bg-white/10 rounded-full" />
                </div>
            </div>

            {/* Content area */}
            <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-16 md:w-20 border-r border-white/5 flex flex-col items-center py-6 gap-6">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/40" />
                    {[Shield, BrainCircuit, Network, Globe, Activity].map((Icon, i) => (
                        <Icon key={i} className={cn("h-4 w-4", i === 0 ? "text-blue-400" : "text-white/20")} />
                    ))}
                </div>

                {/* Main Dashboard */}
                <div className="flex-1 p-4 md:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Global Dashboard</h4>
                            <h3 className="text-xl md:text-2xl font-black italic uppercase">Resumen de Operación</h3>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
                                Live
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "Sincronización BCV", value: "Sincronizado", color: "text-blue-400", icon: Activity },
                            { label: "Carga Impositiva Q3", value: "12.4%", color: "text-emerald-400", icon: Banknote },
                            { label: "Flota 5G Activa", value: "98.2%", color: "text-purple-400", icon: Zap },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <item.icon className={cn("h-4 w-4 mb-3", item.color)} />
                                <p className="text-[9px] font-bold text-white/30 uppercase mb-1">{item.label}</p>
                                <p className="text-sm md:text-lg font-black tracking-tight">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Chart Mockup */}
                    <div className="h-32 md:h-48 rounded-2xl bg-white/[0.01] border border-white/5 p-4 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="h-full w-full" style={{
                                backgroundImage: "linear-gradient(90deg, #3b82f6 2px, transparent 2px), linear-gradient(#3b82f6 2px, transparent 2px)",
                                backgroundSize: "20px 20px"
                            }} />
                        </div>
                        <div className="flex items-end justify-between h-full gap-2 relative z-10">
                            {[40, 70, 45, 90, 65, 80, 50, 100, 60, 85].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 1 + i * 0.05, duration: 0.8 }}
                                    className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-400/10 rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Glowing effect */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />
        </div>
    );
}

function SmartphoneMockup() {
    return (
        <div className="w-[280px] h-[580px] bg-[#0c0c0c] rounded-[3rem] border-[8px] border-[#1a1a1a] relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-auto group">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-30 flex items-center justify-center gap-2">
                <div className="w-10 h-1 bg-white/5 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-blue-500/20" />
            </div>

            {/* Screen Content */}
            <div className="h-full w-full bg-[#04060f] relative p-6 flex flex-col pt-12">
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-8 px-2">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                        <Network className="h-3 w-3 text-emerald-500" />
                        <Zap className="h-3 w-3 text-blue-500" />
                        <div className="w-5 h-2.5 border border-white/20 rounded-[2px] relative">
                            <div className="absolute inset-[1px] bg-white rounded-[1px]" style={{ width: '80%' }} />
                        </div>
                    </div>
                </div>

                {/* App Content */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Kyron Mobile</h4>
                            <p className="text-[9px] text-white/30 font-bold uppercase">Alfa Protocol</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-white/40 uppercase">eSIM Status</span>
                            <span className="text-[9px] font-black text-emerald-400 uppercase">Activo 5G</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[75%]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Facturas', icon: Banknote, color: 'text-blue-400' },
                            { label: 'Seguridad', icon: Shield, color: 'text-rose-400' },
                            { label: 'Red', icon: Globe, color: 'text-cyan-400' },
                            { label: 'AI Sync', icon: BrainCircuit, color: 'text-purple-400' },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2">
                                <item.icon className={cn("h-4 w-4", item.color)} />
                                <span className="text-[8px] font-black uppercase text-white/30">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20">
                        <p className="text-[8px] font-black text-blue-400 uppercase mb-2">Notificación Crítica</p>
                        <p className="text-[10px] font-medium text-white/60 leading-tight">Cambio detectado en tasa BCV. Ajustando proyecciones...</p>
                    </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Reflection */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
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
        setDirection(1);
        setCurrent((p) => (p + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((p) => (p - 1 + slides.length) % slides.length);
    }, []);

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
                                    <div style="font-size: 18px; color: #0f172a; font-weight: 900;">${st.value}</div>
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
                                <p style="font-size: 10px; color: #3b82f6; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; margin-top: 5px;">Soberanía Digital para Empresas Elite</p>
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
        <div className={cn(
            "fixed inset-0 bg-[#04060f] text-white flex flex-col overflow-hidden transition-all duration-700",
            isPrinting ? "print-mode" : ""
        )}>
            <style jsx global>{`
                @media print {
                    body { background: #04060f !important; color: white !important; -webkit-print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    main { 
                        display: block !important; 
                        overflow: visible !important;
                    }
                    .fixed { position: relative !important; }
                    section { page-break-after: always; height: 100vh; display: flex; align-items: center; justify-content: center; }
                    .grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
                    .bg-gradient-to-br { display: block !important; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                
                @keyframes pulse-ring {
                    0% { transform: scale(0.33); opacity: 0; }
                    80%, 100% { opacity: 0; }
                }

                .neural-grid {
                    background-image: 
                        radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
                    background-size: 40px 40px;
                }

                .grain {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.05;
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
                        transition={{ duration: 1.2 }}
                        className={cn("absolute inset-0 bg-gradient-to-br", slide.bg)}
                    />
                </AnimatePresence>

                {/* Visual Layers */}
                <div className="absolute inset-0 grain" />
                <div className="absolute inset-0 neural-grid opacity-20" />

                {/* Dynamic Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[120px]"
                    style={{ backgroundColor: slide.accent + "15" }}
                />
            </div>

            {/* Header */}
            <header className="relative z-30 flex items-center justify-between px-10 py-6 border-b border-white/[0.05] backdrop-blur-xl bg-black/20 no-print">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, ${slide.accent}44, ${slide.accent}11)`,
                            border: `1px solid ${slide.accent}44`
                        }}
                    >
                        <Rocket className="h-5 w-5" style={{ color: slide.accent }} />
                    </motion.div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Kyron 2026</p>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase">Listo para despegar</span>
                        </div>
                        <p className="text-[12px] font-bold tracking-widest text-white/80 uppercase">Nuestra visión para el futuro</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Export Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExportWord}
                            className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 hover:border-white/30"
                        >
                            <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Guion de Pitch (.doc)</span>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="group flex items-center gap-3 px-8 py-2.5 rounded-full bg-blue-600 border border-blue-500 hover:bg-blue-500 transition-all active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                        >
                            <Download className="h-4 w-4 text-white animate-bounce-subtle" />
                            <span className="text-xs font-black uppercase tracking-widest text-white">Presentación 4K (.pdf)</span>
                        </button>
                    </div>

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

            {/* Main Content */}
            <main className={cn(
                "flex-1 relative flex items-center",
                !isPrinting && "overflow-hidden"
            )}>
                {isPrinting ? (
                    <div className="w-full">
                        {slides.map((s, i) => (
                            <section key={s.id} className="print-slide w-full min-h-screen flex items-center px-16 border-b border-white/5">
                                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">
                                    {/* Aquí va una versión simplificada del slide para impresión */}
                                    <div className="space-y-8">
                                        <span className="text-sm font-black tracking-[0.3em] text-blue-500 uppercase">{s.tag}</span>
                                        <h2 className="text-6xl font-black leading-tight uppercase whitespace-pre-line">{s.title}</h2>
                                        <p className="text-2xl text-white/60 font-medium">{s.subtitle}</p>
                                        <p className="text-lg text-white/30 leading-relaxed border-l-2 border-white/10 pl-6">{s.body}</p>
                                    </div>
                                    <div className="relative">
                                        {/* Mockups o Stats simplificados para PDF */}
                                        <div className="aspect-video rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                            {s.image ? <img src={s.image} className="w-full h-full object-cover opacity-40" /> : <Rocket className="h-20 w-20 text-white/10" />}
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
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
                    >
                        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                            {/* Left */}
                            <div className="space-y-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="h-px w-12" style={{ backgroundColor: slide.accent }} />
                                    <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: slide.accent }}>
                                        {slide.tag}
                                    </span>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter"
                                >
                                    {slide.title.split("\n").map((line, i) => (
                                        <span key={i} className="block relative">
                                            <span className={cn("relative z-10", i === 0 ? "text-white" : "text-white/10")}>
                                                {line}
                                            </span>
                                            {i === 0 && (
                                                <span
                                                    className="absolute -inset-x-4 inset-y-2 blur-3xl opacity-10 -z-10"
                                                    style={{ backgroundColor: slide.accent }}
                                                />
                                            )}
                                        </span>
                                    ))}
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-6"
                                >
                                    {slide.id === 'cover' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="mb-8"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                                                    <Rocket className="h-10 w-10 text-blue-500" />
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-black tracking-tighter">SYSTEM KYRON</h1>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Soberanía Digital para Empresas Elite</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <p className="text-2xl md:text-3xl text-white/60 font-medium leading-tight max-w-xl">
                                        {slide.subtitle}
                                    </p>

                                    {slide.body && (
                                        <p className="text-lg text-white/30 leading-relaxed max-w-lg border-l-2 border-white/5 pl-6">
                                            {slide.body}
                                        </p>
                                    )}

                                    {slide.promise && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="p-8 rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.02] backdrop-blur-md max-w-lg space-y-6"
                                        >
                                            <h4 className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">{slide.promise.title}</h4>
                                            <div className="space-y-4">
                                                {slide.promise.items.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-4">
                                                        <div className="h-5 w-5 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                            <CircleCheck className="h-3 w-3 text-emerald-400" />
                                                        </div>
                                                        <p className="text-sm font-bold text-white/80 leading-snug">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {slide.contact && (
                                        <div className="pt-8 space-y-4 border-t border-white/5 max-w-lg">
                                            <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">Contacto Directo</p>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-4xl font-black italic tracking-tighter">{slide.contact.phone}</p>
                                                <div className="flex items-center gap-2 text-cyan-400">
                                                    <Instagram className="h-4 w-4" />
                                                    <span className="text-sm font-bold tracking-widest">{slide.contact.instagram}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right — Stats or Icon or Mockup */}
                            <div className="hidden lg:block relative">
                                {slide.isQRSlide ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="grid grid-cols-2 gap-8"
                                    >
                                        {[
                                            { label: "Ver Plataforma", sub: baseUrl.replace('https://', ''), data: baseUrl, color: "text-cyan-400" },
                                            { label: "Instagram", sub: "@systemkyron", data: "https://instagram.com/systemkyron", color: "text-pink-500" },
                                            { label: "Tu Feedback", sub: "Encuesta de Calidad", data: `${baseUrl}/feedback`, color: "text-amber-400" },
                                        ].map((qr, i) => (
                                            <div key={i} className={cn(
                                                "p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center text-center group hover:bg-white/[0.06] transition-all",
                                                i === 2 ? "col-span-2 mt-8 max-w-xs mx-auto" : ""
                                            )}>
                                                <div className="w-40 h-40 bg-white rounded-3xl mb-4 flex items-center justify-center relative overflow-hidden p-3 shadow-2xl">
                                                    <img 
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qr.data)}&bgcolor=ffffff&color=000000`} 
                                                        alt={qr.label}
                                                        className="w-full h-full relative z-10"
                                                    />
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{qr.label}</span>
                                                <p className={cn("text-[11px] font-bold", qr.color)}>{qr.sub}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : slide.isMockup ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ perspective: "2000px" }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
                                        <div className="relative z-10">
                                            <KyronMockup />
                                        </div>
                                    </motion.div>
                                ) : slide.isMobileMockup ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ perspective: "2000px" }}
                                    >
                                        <SmartphoneMockup />
                                    </motion.div>
                                ) : slide.image && !slide.isMockup && !slide.isMobileMockup && !slide.stats ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative group"
                                    >
                                        <div
                                            className="absolute -inset-4 rounded-[4rem] blur-2xl opacity-20 animate-pulse"
                                            style={{ backgroundColor: slide.accent }}
                                        />
                                        <div className="relative h-[450px] w-[550px] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-8 left-8">
                                                <slide.icon className="h-12 w-12 mb-4" style={{ color: slide.accent }} />
                                                <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Contexto Visual</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : slide.stats ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="grid gap-6"
                                    >
                                        {slide.stats.map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ x: 10, backgroundColor: slide.accent + "15" }}
                                                className="group p-8 rounded-3xl border backdrop-blur-md transition-all flex items-center justify-between"
                                                style={{
                                                    backgroundColor: slide.accent + "05",
                                                    borderColor: slide.accent + "15"
                                                }}
                                            >
                                                <div className="space-y-1">
                                                    <span className="text-xs text-white/30 font-black uppercase tracking-[0.2em]">{stat.label}</span>
                                                    <div className="h-1 w-8 rounded-full bg-white/5 group-hover:w-full transition-all duration-500" style={{ backgroundColor: slide.accent + "44" }} />
                                                </div>
                                                <span className="text-5xl font-black tabular-nums tracking-tighter" style={{ color: slide.accent }}>
                                                    {stat.value}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.3, duration: 1, type: "spring", bounce: 0.4 }}
                                        className="flex items-center justify-center"
                                    >
                                        {(() => {
                                            const Icon = slide.icon;
                                            return (
                                                <div
                                                    className="h-80 w-80 rounded-[4rem] flex items-center justify-center relative group"
                                                    style={{ backgroundColor: slide.accent + "08", border: `2px solid ${slide.accent}15` }}
                                                >
                                                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
                                                    <Icon className="h-40 w-40 relative z-10" style={{ color: slide.accent }} />
                                                </div>
                                            );
                                        })()}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </main>

            {/* Footer / Teleprompter + Controls */}
            <footer className="relative z-30 border-t border-white/[0.05] px-10 py-8 backdrop-blur-2xl bg-black/40 no-print">
                <div className="max-w-7xl mx-auto flex items-center gap-12">
                    {/* Script / Teleprompter */}
                    <div className="flex-1 relative group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="w-1 h-1 rounded-full bg-emerald-500/50 animate-pulse delay-75" />
                                <div className="w-1 h-1 rounded-full bg-emerald-500/20 animate-pulse delay-150" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: slide.accent }}>Teleprompter Ejecutivo</span>
                            <span className="h-px flex-1 bg-white/5 group-hover:bg-white/10 transition-all" />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current + "-script"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="relative"
                            >
                                <p className="text-lg md:text-xl text-white/50 font-medium italic leading-relaxed line-clamp-2 pr-12">
                                    "{slide.script}"
                                </p>
                                <div className="absolute right-0 top-0 text-white/5">
                                    <BrainCircuit className="h-12 w-12" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-110 active:scale-90 group"
                        >
                            <ChevronLeft className="h-6 w-6 text-white/40 group-hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={next}
                            disabled={current === slides.length - 1}
                            className="h-16 px-10 rounded-2xl flex items-center gap-4 font-black text-sm text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl overflow-hidden relative group"
                            style={{ backgroundColor: slide.accent }}
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative z-10 uppercase tracking-[0.2em]">
                                {current === slides.length - 1 ? "Protocolo Finalizado" : "Siguiente Módulo"}
                            </span>
                            <ArrowRight className="h-5 w-5 relative z-10 animate-bounce-x" />
                        </button>
                    </div>
                </div>

                {/* Mobile progress */}
                <div className="md:hidden mt-6 flex items-center gap-4">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: slide.accent }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-[10px] font-black text-white/20 tabular-nums tracking-widest">{current + 1} / {slides.length}</span>
                </div>
            </footer>
        </div>
    );
}
