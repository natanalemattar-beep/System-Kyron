"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Printer,
  Download,
  Loader2,
  CheckCircle,
  ChevronLeft,
  ShieldCheck,
  FileText,
  Lock,
  Sparkles,
  Activity,
  Zap,
  Terminal,
  Database,
  Users,
  Target,
  BarChart3,
  Globe,
  Radio,
  Magnet,
  Cpu,
  Scale,
  TrendingUp,
  ShoppingCart,
  Handshake,
  ClipboardCheck
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";

// --- DATOS TÉCNICOS EXPANDIDOS (SYSTEM KYRON 2026) ---
const EQUIPO = [
    { label: "Proyecto", val: "SYSTEM KYRON • CORPORATE INTELLIGENCE" },
    { label: "Dirección General", val: "Ing. Carlos Mattar (Lead Architecture)" },
    { label: "Ingeniería de Sistemas", val: "Sebastian Garrido (Network Slicing)" },
    { label: "Logística y Despliegue", val: "Marcos Sousa (Operational Flow)" },
    { label: "Sede de Operaciones", val: "Catia la Mar, Estado La Guaira • Colegio 'Gabriela Mistral'" },
];

const POBLACION_DATA = {
    nucleo: "Eje Comercial e Institucional de Catia la Mar, La Guaira.",
    alcance: "2.500 Nodos de Interacción Activa (Empresas, Comercios y Sector Educativo).",
    perfil: "Población con alta densidad transaccional que requiere protocolos de seguridad de datos y simplificación de procesos fiscales mediante inteligencia artificial."
};

const DIAGNOSTICO = {
    problema: "Fragmentación de la data operativa y vulnerabilidad legal por el uso de registros físicos obsoletos.",
    causas: "Inexistencia de un Ledger centralizado, dependencia de procesos manuales y falta de infraestructura 5G para la sincronización de libros fiscales.",
    impacto: "La ausencia de una Bóveda Digital inmutable pone en riesgo la soberanía administrativa del sector privado en la región de La Guaira."
};

const FACTIBILIDAD = [
    { label: "VAN (Valor Presente)", val: "$ 485.000,00", col: "text-blue-600" },
    { label: "TIR (Rendimiento)", val: "31.2%", col: "text-emerald-600" },
    { label: "Payback Period", val: "2.1 Años", col: "text-slate-600" },
    { label: "ROI Proyectado", val: "340%", col: "text-blue-600" }
];

const SOLUCION = {
    vision: "SYSTEM KYRON: Nodo de Inteligencia Centralizada.",
    detalles: "Implementación de una Bóveda Digital Inmutable bajo protocolo Zero-Knowledge, soportada por conectividad 5G dedicada y hardware de inducción magnética para la trazabilidad de activos físicos.",
    diferencia: "A diferencia de sistemas heredados, Kyron integra auditoría predictiva 24/7 y sellado Blockchain de cada operación, eliminando el error humano.",
    claves: [
        "Chatbot Estratégico Neuronal para atención al cliente.",
        "Automatización síncrona de Libros de Compra y Venta.",
        "Acceso Biométrico 3D para resguardo de documentos legales."
    ]
};

const PRESUPUESTO = [
    { item: "Infraestructura Cloud Ledger & Nodo 5G", qty: 1, cost: 5500, location: "Core System" },
    { item: "Terminales Inteligentes de Gestión Pro", qty: 10, cost: 2500, location: "Hardware Node" },
    { item: "Módulo de Bóveda Digital Inmutable", qty: 1, cost: 1800, location: "Security Layer" },
    { item: "Smart Bins (Magnetismo Síncrono)", qty: 4, cost: 1200, location: "Eco-Module" },
    { item: "Sistemas Fiscales Homologados SENIAT", qty: 2, cost: 900, location: "Compliance" },
];

const ALIADOS = [
    { name: "SAPI", support: "Certificación de Patentes y Registro de Marca." },
    { name: "SENIAT", support: "Validación de procesos de riesgo fiscal cero." },
    { name: "CONATEL", support: "Habilitación de espectro para servicios 5G." },
    { name: "Holding Kyron", support: "Soporte técnico y financiero de grado maestro." },
];

const PLAN_ACCION = [
    { task: "Auditoría Técnica y Censo en Catia la Mar", owner: "Equipo de Campo", date: "Semana 1" },
    { task: "Despliegue de Bóveda Digital y Migración", owner: "Ing. Carlos Mattar", date: "Semana 2" },
    { task: "Activación de Nodos 5G y Provisión eSIM", owner: "Ing. S. Garrido", date: "Semana 3" },
    { task: "Certificación Maestra y Lanzamiento Oficial", owner: "Auditores Kyron", date: "Semana 4" },
];

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = () => {
        setIsExporting(true);
        setTimeout(() => {
            const BLUE = "#2563eb";
            const DARK = "#0f172a";
            const LIGHT_BG = "#f8fafc";
            
            const html = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; color: ${DARK}; line-height: 1.4; }
                        .header { border-bottom: 8pt solid ${BLUE}; padding-bottom: 20px; margin-bottom: 30px; text-align: left; }
                        .title { font-size: 36pt; font-weight: 900; color: ${BLUE}; text-transform: uppercase; font-style: italic; margin: 0; }
                        .subtitle { font-size: 12pt; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 5pt; margin-top: 5px; }
                        
                        .section-title { 
                            background-color: ${DARK}; 
                            color: #ffffff; 
                            padding: 12pt 20pt; 
                            font-size: 14pt; 
                            font-weight: 900; 
                            text-transform: uppercase; 
                            margin-top: 30pt; 
                            border-left: 10pt solid ${BLUE};
                        }
                        .section-content { 
                            padding: 20pt; 
                            background-color: ${LIGHT_BG}; 
                            border: 1pt solid #e2e8f0;
                            margin-bottom: 10pt;
                        }

                        .field-label { color: ${BLUE}; font-size: 9pt; font-weight: 900; text-transform: uppercase; margin-bottom: 2pt; }
                        .field-value { font-size: 12pt; font-weight: bold; margin-bottom: 15pt; color: ${DARK}; }

                        .stats-table { width: 100%; border-collapse: separate; border-spacing: 10pt; margin: 20pt 0; }
                        .stat-card { border: 2pt solid ${BLUE}; padding: 15pt; text-align: center; border-radius: 10pt; background-color: #ffffff; }
                        .stat-val { font-size: 22pt; font-weight: 900; color: ${BLUE}; margin: 0; }
                        .stat-lab { font-size: 9pt; font-weight: 900; color: #64748b; text-transform: uppercase; margin-top: 5pt; }

                        .pro-table { width: 100%; border-collapse: collapse; margin-top: 15pt; }
                        .pro-table th { background-color: ${DARK}; color: #ffffff; padding: 10pt; text-align: left; font-size: 10pt; font-weight: 900; text-transform: uppercase; }
                        .pro-table td { padding: 10pt; border: 1pt solid #e2e8f0; font-size: 11pt; background-color: #ffffff; }
                        .total-row { background-color: ${BLUE}; color: #ffffff; font-weight: 900; font-size: 14pt; }

                        .footer { text-align: center; margin-top: 60pt; border-top: 2pt solid #e2e8f0; padding-top: 20pt; color: #94a3b8; font-size: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: 3pt; }
                        .seal { border: 3pt double ${BLUE}; padding: 15pt; margin: 30pt auto; width: 80%; text-align: center; color: ${BLUE}; font-weight: 900; font-size: 14pt; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <p class="title">SYSTEM KYRON</p>
                        <p class="subtitle">MASTER ENGINEERING DOSSIER 2026</p>
                    </div>

                    <div class="section-title">1. Información del Equipo Técnico</div>
                    <div class="section-content">
                        ${EQUIPO.map(e => `<div class="field-label">${e.label}</div><div class="field-value">${e.val}</div>`).join('')}
                    </div>

                    <div class="section-title">2. Población a Trabajar</div>
                    <div class="section-content">
                        <div class="field-label">Núcleo Estratégico</div><div class="field-value">${POBLACION_DATA.nucleo}</div>
                        <div class="field-label">Alcance del Nodo</div><div class="field-value">${POBLACION_DATA.alcance}</div>
                        <div class="field-label">Análisis Demográfico</div><div class="field-value">${POBLACION_DATA.perfil}</div>
                    </div>

                    <div class="section-title">3. Análisis del Problema</div>
                    <div class="section-content">
                        <div class="field-label">Diagnóstico de Situación</div><div class="field-value">${DIAGNOSTICO.problema}</div>
                        <div class="field-label">Causas Identificadas</div><div class="field-value">${DIAGNOSTICO.causas}</div>
                        <div class="field-label">Impacto de Cambio</div><div class="field-value">${DIAGNOSTICO.impacto}</div>
                    </div>

                    <div class="section-title">4. Factibilidad Económica 2026</div>
                    <table class="stats-table">
                        <tr>
                            <td width="25%"><div class="stat-card"><p class="stat-val">$485k</p><p class="stat-lab">VAN</p></div></td>
                            <td width="25%"><div class="stat-card"><p class="stat-val">31.2%</p><p class="stat-lab">TIR</p></div></td>
                            <td width="25%"><div class="stat-card"><p class="stat-val">2.1 A.</p><p class="stat-lab">Payback</p></div></td>
                            <td width="25%"><div class="stat-card"><p class="stat-val">340%</p><p class="stat-lab">ROI</p></div></td>
                        </tr>
                    </table>
                    <div style="background-color: #22c55e; color: #ffffff; padding: 10pt; text-align: center; font-weight: 900; border-radius: 5pt;">
                        DICTAMEN: VIABILIDAD SOBRESALIENTE BAJO MODELO ESCALABLE
                    </div>

                    <div class="section-title">5. Desarrollo del Proyecto (Solución)</div>
                    <div class="section-content">
                        <div class="field-label">Visión Maestra</div><div class="field-value">${SOLUCION.vision}</div>
                        <div class="field-label">Arquitectura del Nodo</div><div class="field-value">${SOLUCION.detalles}</div>
                        <div class="field-label">Ventaja Competitiva</div><div class="field-value">${SOLUCION.diferencia}</div>
                        <div class="field-label">Diferenciadores Clave</div>
                        <div class="field-value">
                            ${SOLUCION.claves.map(c => `• ${c}<br>`).join('')}
                        </div>
                    </div>

                    <div class="section-title">6. Presupuesto Operativo (CAPEX)</div>
                    <table class="pro-table">
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th style="text-align: center;">Cant.</th>
                                <th style="text-align: right;">Monto (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${PRESUPUESTO.map(p => `
                                <tr>
                                    <td>${p.item}</td>
                                    <td style="text-align: center;">${p.qty}</td>
                                    <td style="text-align: right;">$ ${p.cost.toLocaleString()}.00</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td colspan="2" style="padding: 15pt;">TOTAL INVERSIÓN PROYECTADA</td>
                                <td style="text-align: right; padding: 15pt;">$ 11.900,00</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="section-title">7. Aliados y Recursos Estratégicos</div>
                    <table class="pro-table">
                        <thead><tr><th>Institución</th><th>Apoyo Técnico</th></tr></thead>
                        <tbody>
                            ${ALIADOS.map(a => `<tr><td style="font-weight: 900; color: ${BLUE};">${a.name}</td><td>${a.support}</td></tr>`).join('')}
                        </tbody>
                    </table>

                    <div class="section-title">8. Plan de Acción Operativo</div>
                    <table class="pro-table">
                        <thead><tr><th>Tarea</th><th>Líder</th><th>Tiempo</th></tr></thead>
                        <tbody>
                            ${PLAN_ACCION.map(task => `<tr><td>${task.task}</td><td>${task.owner}</td><td style="text-align: right; font-weight: bold; color: ${BLUE};">${task.date}</td></tr>`).join('')}
                        </tbody>
                    </table>

                    <div class="seal">DOCUMENTO CERTIFICADO POR NODO MAESTRO KYRON</div>
                    <div class="footer">CONFIDENCIAL • © 2026 SYSTEM KYRON • CATIA LA MAR, VENEZUELA</div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "EXPEDIENTE_MAESTRO_SYSTEM_KYRON_2026.doc";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setIsExporting(false);
            toast({ title: "EXPEDIENTE GENERADO", description: "El archivo ha sido procesado con diseño UHD.", action: <CheckCircle className="text-primary h-4 w-4" /> });
        }, 800);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative">
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                >
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                            <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                        </Button>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Consola Maestro</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase mt-1">Audit Mode: Enabled • 2026</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all">
                            <Printer className="mr-3 h-4 w-4 text-primary" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} variant="modern" className="h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                            {isExporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
                            EXPORTAR EXPEDIENTE
                        </Button>
                    </div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[950px] mx-auto pb-32">
                <div className="bg-white text-black p-10 md:p-24 shadow-2xl rounded-[4rem] border border-slate-300 print:p-0 print:shadow-none overflow-hidden relative">
                    
                    {/* ENCABEZADO */}
                    <div className="flex justify-between items-start mb-20 border-b-8 border-primary/10 pb-12">
                        <div className="flex items-center gap-8">
                            <Logo className="h-20 w-20" />
                            <div className="text-left">
                                <span className="font-black text-4xl tracking-tighter uppercase italic text-primary">System Kyron</span>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mt-2">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-primary text-white border-none text-[10px] font-black px-6 h-10 rounded-xl mb-4 shadow-lg uppercase tracking-widest">Expediente de Ingeniería</Badge>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest italic">REF: KYRON-ZEDU-2026</p>
                        </div>
                    </div>

                    <div className="space-y-20">
                        {/* 1. Equipo */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary">
                                <Users className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">1. Información del Equipo Técnico</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                                {EQUIPO.map((item, i) => (
                                    <div key={i} className={i === 0 || i === 4 ? "md:col-span-2" : ""}>
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{item.label}</p>
                                        <p className={cn("text-lg font-bold text-slate-800", i === 0 && "text-primary font-black italic text-2xl tracking-tighter")}>{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 2. Población */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary">
                                <Activity className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">2. Población a Trabajar</h2>
                            </div>
                            <div className="px-6 space-y-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Núcleo Estratégico</p>
                                    <p className="text-xl font-bold text-slate-800 italic">{POBLACION_DATA.nucleo}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-secondary/10 rounded-[2rem] border-2 border-secondary/20 text-center">
                                        <p className="text-[10px] font-black uppercase text-secondary mb-2 tracking-widest">Alcance Directo</p>
                                        <p className="text-3xl font-black text-secondary italic tracking-tighter leading-none">2.500 Nodos</p>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 italic leading-relaxed text-justify">{POBLACION_DATA.perfil}</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Diagnóstico */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary">
                                <Terminal className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">3. Análisis del Problema</h2>
                            </div>
                            <div className="px-6 space-y-8 text-justify">
                                <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] relative">
                                    <p className="text-xl font-bold italic text-slate-800 leading-relaxed">"{DIAGNOSTICO.problema}"</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-2">Causas Raíz</p>
                                        <p className="text-xs font-bold text-slate-600 uppercase leading-relaxed">{DIAGNOSTICO.causas}</p>
                                    </div>
                                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-primary/10">
                                        <p className="text-[10px] font-black uppercase text-primary mb-3 italic tracking-widest">Impacto Estratégico</p>
                                        <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">{DIAGNOSTICO.impacto}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Factibilidad */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary">
                                <TrendingUp className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">4. Factibilidad Económica</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mb-10">
                                {FACTIBILIDAD.map(stat => (
                                    <div key={stat.label} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-center shadow-inner hover:scale-105 transition-transform">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">{stat.label}</p>
                                        <p className={cn("text-xl font-black italic", stat.col)}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mx-6 p-8 bg-emerald-500/10 rounded-[2.5rem] border-2 border-emerald-500/20 text-center">
                                <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Dictamen de Ingeniería</p>
                                <p className="text-sm font-bold text-slate-700 italic">Viabilidad Sobresaliente. El modelo SaaS permite una escalabilidad total con costos operativos mínimos tras el despliegue del nodo inicial.</p>
                            </div>
                        </section>

                        {/* 5. Desarrollo / Solución */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary">
                                <Zap className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">5. Desarrollo del Proyecto (Solución)</h2>
                            </div>
                            <div className="px-6 space-y-12">
                                <div className="space-y-4">
                                    <p className="text-base font-black uppercase italic text-primary underline decoration-primary/20 underline-offset-8 tracking-tight">{SOLUCION.vision}</p>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed text-justify">{SOLUCION.detalles}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 shadow-inner">
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-4 italic tracking-widest">Diferenciador Institucional</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed">{SOLUCION.diferencia}</p>
                                    </div>
                                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-primary/20">
                                        <p className="text-[10px] font-black uppercase text-primary mb-4 italic tracking-widest">Capacidades del Sistema</p>
                                        <ul className="text-[11px] font-black uppercase text-slate-700 space-y-3">
                                            {SOLUCION.claves.map((c, i) => (
                                                <li key={i} className="flex gap-3 items-center"><span className="text-primary text-lg">›</span> <span>{c}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Presupuesto */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary">
                                <ShoppingCart className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">6. Presupuesto Operativo (CAPEX)</h2>
                            </div>
                            <div className="border-2 border-slate-200 rounded-[2.5rem] overflow-hidden mx-6 shadow-2xl bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-900 hover:bg-slate-900 border-none">
                                            <TableHead className="font-black text-[10px] uppercase text-white/60 pl-10 py-6 tracking-widest">Item de Inversión</TableHead>
                                            <TableHead className="text-center font-black text-[10px] uppercase text-white/60 tracking-widest">Cant.</TableHead>
                                            <TableHead className="text-right font-black text-[10px] uppercase text-white/60 tracking-widest">Costo (USD)</TableHead>
                                            <TableHead className="text-right pr-10 font-black text-[10px] uppercase text-white/60 tracking-widest">Origen</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PRESUPUESTO.map((row, i) => (
                                            <TableRow key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                <TableCell className="text-xs font-black uppercase pl-10 py-6 text-slate-700 italic">{row.item}</TableCell>
                                                <TableCell className="text-center font-mono font-black text-slate-500">{row.qty}</TableCell>
                                                <TableCell className="text-right font-mono font-black text-primary italic text-base">$ {row.cost.toLocaleString()}.00</TableCell>
                                                <TableCell className="text-right text-[10px] italic text-slate-400 uppercase font-black pr-10">{row.location}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/10 font-black border-t-4 border-primary/20">
                                            <TableCell colSpan={2} className="text-lg uppercase italic pl-10 py-10 text-primary">Total Inversión Proyectada</TableCell>
                                            <TableCell className="text-right text-4xl text-primary font-black italic tracking-tighter">$ 11.900,00</TableCell>
                                            <TableCell className="pr-10" />
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* 7. Aliados */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary">
                                <Handshake className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">7. Aliados y Recursos Estratégicos</h2>
                            </div>
                            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {ALIADOS.map((ally, i) => (
                                    <div key={i} className="flex flex-col justify-between p-8 bg-slate-50 rounded-[2rem] border-2 border-slate-100 hover:border-primary/30 transition-all shadow-sm">
                                        <span className="text-base font-black uppercase italic text-primary mb-3 underline decoration-primary/10 underline-offset-4">{ally.name}</span>
                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed">{ally.support}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 8. Plan de Acción */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary">
                                <ClipboardCheck className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">8. Plan de Acción Operativo</h2>
                            </div>
                            <div className="border-2 border-slate-200 rounded-[2.5rem] overflow-hidden mx-6 shadow-2xl bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-900 hover:bg-slate-900 border-none">
                                            <TableHead className="font-black text-[10px] uppercase text-white/60 pl-10 py-6 tracking-widest">Fase Operativa</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase text-center text-white/60 tracking-widest">Responsable</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase text-right pr-10 text-white/60 tracking-widest">Cronograma</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PLAN_ACCION.map((item, i) => (
                                            <TableRow key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                                <TableCell className="pl-10 py-6 text-xs font-bold text-slate-700 uppercase tracking-tight italic">{item.task}</TableCell>
                                                <TableCell className="text-center text-[10px] font-black text-primary uppercase italic">{item.owner}</TableCell>
                                                <TableCell className="text-right pr-10 text-[11px] font-black text-secondary uppercase tracking-widest">{item.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>
                    </div>

                    <div className="mt-32 pt-20 border-t-8 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-8">
                            <div className="p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/10 shadow-inner">
                                <ShieldCheck className="h-12 w-12 text-primary" />
                            </div>
                            <div className="text-left space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Sello Institucional</p>
                                <p className="text-xl font-black uppercase italic text-primary tracking-tighter">SYSTEM KYRON MASTER VALIDATED</p>
                            </div>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[1em] text-slate-300 italic animate-pulse">Final del documento • 2026</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
