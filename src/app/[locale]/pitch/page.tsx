"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Rocket,
    Shield, BrainCircuit, TrendingUp,
    Users, Globe, Zap, CircleCheck,
    TriangleAlert, Banknote, X, ArrowRight,
    Network, DollarSign, Download, Monitor, Smartphone,
    Activity, Lock, Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const slides = [
    {
        id: "cover",
        tag: "INTRODUCCIÓN",
        title: "SYSTEM\nKYRON",
        subtitle: "El Primer Sistema Operativo Empresarial de Venezuela.",
        body: null,
        icon: Rocket,
        accent: "#3b82f6",
        bg: "from-blue-600/30 via-indigo-900/20 to-transparent",
        script: "Buenos días. Estamos aquí para presentar System Kyron: No es solo un software de gestión, es la infraestructura digital que Venezuela necesita para volver a competir a nivel global.",
        stats: null,
    },
    {
        id: "problem",
        tag: "EL PROBLEMA",
        title: "CAOS\nOPERATIVO",
        subtitle: "La fragmentación está matando la productividad.",
        body: "Las empresas venezolanas operan en un entorno de alta complejidad: cambios diarios en tasa BCV, múltiples capas impositivas (IGTF, IVA, ISLR) y una conectividad inestable que detiene la facturación.",
        icon: TriangleAlert,
        accent: "#f43f5e",
        bg: "from-rose-900/30 via-slate-900/20 to-transparent",
        script: "Llevar una empresa en Venezuela hoy es una labor heroica. Los empresarios pierden hasta un 60% de su tiempo en tareas administrativas manuales, intentando que sus sistemas se hablen entre sí en medio de apagones e inestabilidad.",
        stats: [
            { label: "Carga Administrativa Manual", value: "68%" },
            { label: "Sistemas Desconectados", value: "Prom. 4" },
            { label: "Riesgo Fiscal SENIAT", value: "Crítico" },
        ],
    },
    {
        id: "solution",
        tag: "LA SOLUCIÓN",
        title: "ECOSISTEMA\nUNIFICADO",
        subtitle: "Conectividad, Contabilidad y Legalidad en un solo lugar.",
        body: "Kyron integra en una sola plataforma: Conectividad 5G eSIM, Contabilidad VEN-NIF automatizada y Asesoría Legal con IA entrenada en leyes venezolanas.",
        icon: Shield,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-blue-900/20 to-transparent",
        script: "Nuestra solución es única. Unificamos la conectividad que el negocio necesita con el cumplimiento legal y fiscal que el estado exige. Todo automatizado, todo en la nube, todo seguro.",
        stats: [
            { label: "Conectividad Garantizada", value: "5G" },
            { label: "Cumplimiento Fiscal", value: "100%" },
            { label: "Ahorro Operativo", value: "45%" },
        ],
    },
    {
        id: "market",
        tag: "EL MERCADO",
        title: "MERCADO\nACTIVO",
        subtitle: "320,000 empresas buscando digitalización real.",
        body: "Venezuela cuenta con un sector privado resiliente que demanda herramientas de clase mundial adaptadas a la realidad local (IGTF, BCV, Multas COT).",
        icon: Globe,
        accent: "#06b6d4",
        bg: "from-cyan-900/30 via-blue-900/20 to-transparent",
        script: "Hablamos de más de 300 mil entidades jurídicas que hoy dependen de sistemas obsoletos. Kyron no solo entra a este mercado, lo moderniza.",
        stats: [
            { label: "Entidades Jurídicas VZ", value: "320K" },
            { label: "TAM (Mercado Total)", value: "$480M" },
            { label: "Proyección Crecimiento", value: "15x" },
        ],
    },
    {
        id: "product_ui",
        tag: "PLATAFORMA",
        title: "CONTROL\nTOTAL",
        subtitle: "Un Centro de Mando diseñado para la ejecución.",
        body: "Desde el monitoreo de flotas 5G hasta la conciliación automática de pagos multimoneda. Todo bajo estándares de seguridad bancaria.",
        icon: Monitor,
        accent: "#3b82f6",
        bg: "from-blue-600/20 via-slate-900/20 to-transparent",
        script: "Este es el Admin Portal. Aquí el gerente ve su empresa en tiempo real: ventas por sucursal, alertas del SENIAT y estado de su red. Es el fin de esperar al cierre de mes para saber qué pasó.",
        stats: null,
        isMockup: true
    },
    {
        id: "mobile_ui",
        tag: "MOVILIDAD",
        title: "GESTIÓN\nMÓVIL",
        subtitle: "Tu empresa no se detiene, tú tampoco.",
        body: "App nativa para gestionar eSIMs corporativas, revisar flujo de caja y recibir alertas críticas de seguridad y cumplimiento en tiempo real.",
        icon: Smartphone,
        accent: "#10b981",
        bg: "from-emerald-900/30 via-slate-900/20 to-transparent",
        script: "Con Kyron Mobile, el dueño de negocio tiene el mando en su bolsillo. Si hay una fluctuación del BCV o una alerta de CONATEL, Kyron te avisa y te da la solución al instante.",
        stats: null,
        isMobileMockup: true
    },
    {
        id: "product",
        tag: "TECNOLOGÍA",
        title: "PILARES\nKYRON",
        subtitle: "Inteligencia que trabaja para tu negocio.",
        body: "IA entrenada en VEN-NIF para contabilidad sin errores, conectividad de baja latencia y blindaje legal preventivo ante inspecciones.",
        icon: Zap,
        accent: "#a855f7",
        bg: "from-purple-900/30 via-indigo-900/20 to-transparent",
        script: "Nuestra IA no solo genera texto; entiende el Código Orgánico Tributario y la LOTTT. Te protege de multas antes de que ocurran.",
        stats: [
            { label: "Precisión Contable", value: "99.8%" },
            { label: "Latencia Red 5G", value: "20ms" },
            { label: "Asistente Legal", value: "24/7" },
        ],
    },
    {
        id: "traction",
        tag: "TRACCIÓN",
        title: "HITOS\nLOGRADOS",
        subtitle: "Crecimiento sostenido con usuarios reales.",
        body: "Hemos validado el modelo con empresas de diversos sectores: desde retail hasta servicios logísticos, logrando retención total.",
        icon: TrendingUp,
        accent: "#10b981",
        bg: "from-emerald-600/20 via-slate-900/20 to-transparent",
        script: "Ya estamos en la calle. Nuestras empresas piloto reportan un ahorro de 12 horas semanales en conciliaciones bancarias y cero multas fiscales desde su implementación.",
        stats: [
            { label: "Empresas en Piloto", value: "50" },
            { label: "NPS (Satisfacción)", value: "92" },
            { label: "Retención Mensual", value: "100%" },
        ],
    },
    {
        id: "business_model",
        tag: "MODELO NEGOCIO",
        title: "ESCALA\nY VALOR",
        subtitle: "Suscripciones diseñadas para cada etapa.",
        body: "Modelos SaaS desde $29/mes (Profesional) hasta soluciones Enterprise con IA ilimitada y soporte prioritario 24/7.",
        icon: Banknote,
        accent: "#f59e0b",
        bg: "from-amber-900/20 via-slate-900/20 to-transparent",
        script: "Nuestro modelo es recurrente y escalable. Ofrecemos valor inmediato que paga la suscripción en la primera semana de uso mediante el ahorro de tiempo y multas.",
        stats: [
            { label: "ARPU Proyectado", value: "$45" },
            { label: "Margen Bruto", value: "85%" },
            { label: "LTV / CAC", value: "4.2x" },
        ],
    },
    {
        id: "team",
        tag: "EQUIPO",
        title: "EXPERIENCIA\nPROBADA",
        subtitle: "Especialistas en Tecnología y Regulación.",
        body: "Un equipo multidisciplinario con trayectoria en telecomunicaciones, finanzas corporativas y desarrollo de software de alta escala.",
        icon: Users,
        accent: "#8b5cf6",
        bg: "from-violet-900/20 via-slate-900/20 to-transparent",
        script: "Sabemos cómo construir en Venezuela. Combinamos décadas de experiencia en el sector tech con un conocimiento profundo del marco legal y financiero local.",
        stats: [
            { label: "Años Exp. Tech", value: "25+" },
            { label: "Expertos Legales", value: "3" },
            { label: "Devs Senior", value: "8" },
        ],
    },
    {
        id: "cta",
        tag: "INVERSIÓN",
        title: "EL\nFUTURO",
        subtitle: "Buscamos socios para escalar la revolución digital.",
        body: "Estamos abriendo nuestra ronda Seed para expandir infraestructura 5G, potenciar nuestra IA y llegar a 10,000 empresas en los próximos 18 meses.",
        icon: DollarSign,
        accent: "#3b82f6",
        bg: "from-blue-600/30 via-indigo-600/20 to-transparent",
        script: "Estamos listos para el siguiente nivel. Queremos que Kyron sea el estándar de la industria en Venezuela y el punto de partida para la región.",
        stats: [
            { label: "Meta Inversión", value: "$2.5M" },
            { label: "Runway (Meses)", value: "24" },
            { label: "Objetivo 2026", value: "10K" },
        ],
    },
    {
        id: "closing",
        tag: "CONCLUSIÓN",
        title: "ÚNETE A\nKYRON",
        subtitle: "Estamos construyendo la Venezuela que viene.",
        body: "Gracias por su tiempo. El futuro de la gestión empresarial comienza hoy, y se llama System Kyron.",
        icon: CircleCheck,
        accent: "#10b981",
        bg: "from-emerald-600/20 via-blue-900/20 to-transparent",
        script: "Muchas gracias. Ahora abrimos el espacio para sus preguntas. Estamos listos para demostrar por qué somos la mejor inversión en el sector tech del país.",
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
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-bottom: 50px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white;">
                <div style="background: #3b82f6; color: white; padding: 15px 25px; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                    DIAPOSITIVA: ${s.title.replace(/\n/g, ' ')}
                </div>
                <div style="padding: 25px;">
                    <div style="color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px;">
                        CONTEXTO: ${s.tag}
                    </div>
                    <div style="background: #f8fafc; border-left: 6px solid #3b82f6; padding: 30px; margin-bottom: 20px;">
                        <div style="color: #1e293b; font-size: 18px; font-weight: 600; line-height: 1.6; font-style: italic;">
                            "${s.script}"
                        </div>
                    </div>
                    ${s.stats ? `
                        <div style="display: table; width: 100%; border-top: 1px solid #f1f5f9; pt: 20px;">
                            ${s.stats.map(st => `
                                <div style="display: table-cell; width: 33%;">
                                    <div style="font-size: 10px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">${st.label}</div>
                                    <div style="font-size: 20px; color: #3b82f6; font-weight: 800;">${st.value}</div>
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
                <title>Guion Kyron Pitch — Real Data</title>
                <style>
                    @page { size: 8.5in 11in; margin: 1in; }
                    body { font-family: 'Segoe UI', sans-serif; background: #fff; }
                </style>
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 60px;">
                    <h1 style="font-size: 36px; font-weight: 900; color: #0f172a; margin-bottom: 10px;">GUION DE PITCH KYRON</h1>
                    <p style="font-size: 14px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 3px;">Documento de Competencia 2026</p>
                </div>
        `;
        const footer = "</body></html>";
        const sourceHTML = header + scriptContent + footer;
        
        const blob = new Blob(['\ufeff', sourceHTML], {
            type: 'application/msword'
        });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Guion_Profesional_Kyron_2026.doc";
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
                    body { background: white !important; }
                    .no-print { display: none !important; }
                    .print-slide { 
                        display: block !important; 
                        width: 100vw !important; 
                        height: 100vh !important; 
                        page-break-after: always;
                        position: relative !important;
                        overflow: hidden;
                    }
                    .fixed { position: absolute !important; }
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
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleExportWord}
                            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Guion (.doc)</span>
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 border border-blue-500 hover:bg-blue-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                        >
                            <Download className="h-3 w-3 text-white" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Presentación (.pdf)</span>
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

            {/* Main */}
            <main className="flex-1 relative overflow-hidden flex items-center no-print">
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
                                    <p className="text-2xl md:text-3xl text-white/60 font-medium leading-tight max-w-xl">
                                        {slide.subtitle}
                                    </p>

                                    {slide.body && (
                                        <p className="text-lg text-white/30 leading-relaxed max-w-lg border-l-2 border-white/5 pl-6">
                                            {slide.body}
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right — Stats or Icon or Mockup */}
                            <div className="hidden lg:block relative">
                                {slide.isMockup ? (
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
                                        <div
                                            className="h-80 w-80 rounded-[4rem] flex items-center justify-center relative group"
                                            style={{ backgroundColor: slide.accent + "08", border: `2px solid ${slide.accent}15` }}
                                        >
                                            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
                                            <slide.icon className="h-40 w-40 relative z-10" style={{ color: slide.accent }} />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
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
