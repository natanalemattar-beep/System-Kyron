
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

// --- DATOS TÉCNICOS CONSOLIDADOS (SYSTEM KYRON 2026) ---
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
    { label: "VAN (Valor Presente)", val: "$ 485.000,00", col: "#0ea5e9" },
    { label: "TIR (Rendimiento)", val: "31.2%", col: "#22c55e" },
    { label: "Payback Period", val: "2.1 Años", col: "#64748b" },
    { label: "ROI Proyectado", val: "340%", col: "#0ea5e9" }
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
            const PRIMARY_BLUE = "#0ea5e9";
            const DARK_NAVY = "#050505";
            const ACCENT_GREEN = "#22c55e";
            const BORDER_COLOR = "#1e293b";
            const CONTENT_BG = "#ffffff";
            
            // Layout de tabla para máxima compatibilidad con Word
            const html = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; color: #000000; line-height: 1.5; background-color: #ffffff; margin: 0; padding: 0; }
                        .section-table { width: 100%; border-collapse: collapse; margin-bottom: 25pt; page-break-inside: avoid; }
                        .header-row { background-color: ${DARK_NAVY}; }
                        .accent-cell { width: 6pt; background-color: ${PRIMARY_BLUE}; }
                        .title-cell { padding: 12pt 20pt; vertical-align: middle; }
                        .title-text { color: #ffffff; font-size: 13pt; font-weight: 900; text-transform: uppercase; letter-spacing: 2pt; font-style: italic; }
                        
                        .content-table { width: 100%; border-collapse: collapse; margin-top: -1px; }
                        .content-cell { padding: 25pt; border: 1.5pt solid ${BORDER_COLOR}; border-top: none; background-color: #fafafa; }
                        
                        .label { color: ${PRIMARY_BLUE}; font-size: 9pt; font-weight: 900; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 4pt; }
                        .value { font-size: 11pt; font-weight: 700; color: #111111; margin-bottom: 15pt; }
                        
                        .grid-table { width: 100%; border-collapse: separate; border-spacing: 10pt; }
                        .grid-card { background-color: #ffffff; border: 2pt solid ${PRIMARY_BLUE}; padding: 15pt; text-align: center; border-radius: 10pt; }
                        .grid-val { font-size: 22pt; font-weight: 900; color: ${PRIMARY_BLUE}; margin: 0; font-style: italic; }
                        .grid-lbl { font-size: 8pt; font-weight: 800; color: #64748b; text-transform: uppercase; margin-top: 5pt; }

                        .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; border: 1.5pt solid ${DARK_NAVY}; }
                        .data-table th { background-color: ${DARK_NAVY}; color: #ffffff; padding: 10pt; text-align: left; font-size: 9pt; font-weight: 900; text-transform: uppercase; }
                        .data-table td { padding: 10pt; border: 1pt solid #cbd5e1; font-size: 10pt; font-weight: 600; }
                        .total-row { background-color: ${PRIMARY_BLUE}; color: #ffffff; font-weight: 900; font-size: 14pt; }

                        .footer { text-align: center; margin-top: 50pt; border-top: 1pt solid #e2e8f0; padding-top: 20pt; color: #94a3b8; font-size: 8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 4pt; }
                    </style>
                </head>
                <body>
                    <!-- Cabecera Institucional -->
                    <table width="100%" style="margin-bottom: 40pt; border-bottom: 4pt solid ${PRIMARY_BLUE};">
                        <tr>
                            <td width="80" style="padding-bottom: 20pt;">
                                <div style="width: 60pt; height: 60pt; background-color: ${DARK_NAVY}; border-radius: 15pt; text-align: center; vertical-align: middle;">
                                    <span style="color: ${PRIMARY_BLUE}; font-size: 30pt; font-weight: 900; line-height: 60pt;">K</span>
                                </div>
                            </td>
                            <td style="padding-left: 20pt; padding-bottom: 20pt;">
                                <p style="font-size: 36pt; font-weight: 900; color: ${DARK_NAVY}; margin: 0; text-transform: uppercase; font-style: italic; letter-spacing: -1pt;">SYSTEM <span style="color: ${PRIMARY_BLUE};">KYRON</span></p>
                                <p style="font-size: 10pt; color: #64748b; letter-spacing: 6pt; margin: 5pt 0 0 0; font-weight: 800; text-transform: uppercase;">Corporate Intelligence Ledger</p>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 1 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">1. FICHA TÉCNICA DEL EQUIPO</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <div class="label">Proyecto de Ingeniería</div><div class="value">SYSTEM KYRON • CORPORATE INTELLIGENCE</div>
                                <div class="label">Lead Architecture</div><div class="value">Ing. Carlos Mattar</div>
                                <div class="label">Network & Infrastructure</div><div class="value">Sebastian Garrido</div>
                                <div class="label">Logistics Node</div><div class="value">Marcos Sousa</div>
                                <div class="label">Centro de Operaciones</div><div class="value">Catia la Mar, La Guaira (Colegio Gabriela Mistral)</div>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 2 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">2. NODO POBLACIONAL</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <div class="label">Ubicación Geoestratégica</div><div class="value">${POBLACION_DATA.nucleo}</div>
                                <div class="label">Alcance del Nodo</div><div class="value">${POBLACION_DATA.alcance}</div>
                                <div class="label">Perfil Demográfico</div><div class="value">${POBLACION_DATA.perfil}</div>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 3 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell" style="background-color: ${ACCENT_GREEN};"></td>
                            <td class="title-cell"><span class="title-text">3. DIAGNÓSTICO DE SITUACIÓN</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <div class="label">Problema Central</div><div class="value" style="font-style: italic; border-left: 3pt solid #e2e8f0; padding-left: 10pt;">"${DIAGNOSTICO.problema}"</div>
                                <div class="label">Causas Identificadas</div><div class="value">${DIAGNOSTICO.causas}</div>
                                <div class="label">Impacto Estimado</div><div class="value">${DIAGNOSTICO.impacto}</div>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 4 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">4. FACTIBILIDAD ECONÓMICA</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <table class="grid-table">
                                    <tr>
                                        <td><div class="grid-card"><p class="grid-val">$485k</p><p class="grid-lbl">VAN</p></div></td>
                                        <td><div class="grid-card"><p class="grid-val">31.2%</p><p class="grid-lbl">TIR</p></div></td>
                                        <td><div class="grid-card"><p class="grid-val">2.1 A.</p><p class="grid-lbl">Recuperación</p></div></td>
                                    </tr>
                                </table>
                                <div style="margin-top: 20pt; padding: 15pt; background-color: #ecfdf5; border: 1pt solid ${ACCENT_GREEN}; color: #065f46; font-size: 10pt; font-weight: 700; text-align: center; border-radius: 8pt;">
                                    DICTAMEN: PROYECTO DE ALTA RENTABILIDAD Y ESCALABILIDAD 5G.
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 5 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">5. SOLUCIÓN TECNOLÓGICA</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <div class="label">Visión Estratégica</div><div class="value">${SOLUCION.vision}</div>
                                <div class="label">Arquitectura de Nodo</div><div class="value">${SOLUCION.detalles}</div>
                                <div class="label">Capacidades del Sistema</div>
                                <div class="value">
                                    • Chatbot Neuronal de Atención.<br>
                                    • Automatización Fiscal Inmutable.<br>
                                    • Bóveda con Seguridad Biométrica.
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 6 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">6. PRESUPUESTO MAESTRO (CAPEX)</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Componente</th>
                                            <th style="text-align: right;">USD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${PRESUPUESTO.map(p => `<tr><td>${p.item}</td><td style="text-align: right;">$ ${p.cost.toLocaleString()}</td></tr>`).join('')}
                                        <tr class="total-row">
                                            <td style="padding: 15pt;">INVERSIÓN TOTAL</td>
                                            <td style="text-align: right; padding: 15pt;">$ 11.900,00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 7 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">7. ALIADOS DEL ECOSISTEMA</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <table width="100%">
                                    ${ALIADOS.map(a => `<tr><td style="padding-bottom: 10pt;"><div class="label">${a.name}</div><div class="value">${a.support}</div></td></tr>`).join('')}
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 8 -->
                    <table class="section-table">
                        <tr class="header-row">
                            <td class="accent-cell"></td>
                            <td class="title-cell"><span class="title-text">8. CRONOGRAMA DE ACCIÓN</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="content-cell">
                                <table class="data-table">
                                    <thead><tr><th>Fase</th><th>Tiempo</th></tr></thead>
                                    <tbody>
                                        ${PLAN_ACCION.map(task => `<tr><td>${task.task}</td><td style="color: ${PRIMARY_BLUE};">${task.date}</td></tr>`).join('')}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <div class="footer">
                        SYSTEM KYRON • MASTER ASSET ARCHIVE • 2026
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "EXPEDIENTE_MAESTRO_KYRON_2026.doc";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setIsExporting(false);
            
            toast({ 
                title: "TRANSMISIÓN EXITOSA", 
                description: "Expediente exportado en alta fidelidad.", 
                action: <CheckCircle className="text-primary h-4 w-4" /> 
            });
        }, 1000);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative">
            
            {/* HUD CONTROL BAR */}
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                >
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                            <Link href="/">
                                <div className="flex items-center"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</div>
                            </Link>
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

            {/* EXPEDIENTE WEB UHD */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[950px] mx-auto pb-32">
                <div className="bg-white text-black p-10 md:p-24 shadow-2xl rounded-[4rem] border border-slate-300 print:p-0 print:shadow-none overflow-hidden relative">
                    
                    {/* CABECERA UHD */}
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

                    <div className="space-y-24">
                        {/* 1. Información del Equipo */}
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
                            <div className="px-6 space-y-8">
                                <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem]">
                                    <p className="text-xl font-bold italic text-slate-800 leading-relaxed">"{DIAGNOSTICO.problema}"</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Causas Raíz</p>
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
                                {FACTIBILIDAD.map(stat => (
                                    <div key={stat.label} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-center shadow-inner">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">{stat.label}</p>
                                        <p className="text-xl font-black italic" style={{ color: stat.col }}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 5. Solución */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary">
                                <Zap className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">5. Desarrollo del Proyecto</h2>
                            </div>
                            <div className="px-6 space-y-12 text-justify">
                                <div>
                                    <p className="text-base font-black uppercase italic text-primary mb-4">{SOLUCION.vision}</p>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{SOLUCION.detalles}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Diferenciador</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed">{SOLUCION.diferencia}</p>
                                    </div>
                                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-primary/20">
                                        <p className="text-[10px] font-black uppercase text-primary mb-4 italic tracking-widest">Capacidades</p>
                                        <ul className="text-[11px] font-black uppercase text-slate-700 space-y-3">
                                            {SOLUCION.claves.map((c, i) => (
                                                <li key={i} className="flex gap-3 items-center"><span className="text-primary">•</span> <span>{c}</span></li>
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
                            <div className="border-2 border-slate-200 rounded-[2.5rem] overflow-hidden mx-6 shadow-2xl">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-900 hover:bg-slate-900 border-none">
                                            <TableHead className="font-black text-[10px] uppercase text-white/60 pl-10 py-6 tracking-widest">Inversión</TableHead>
                                            <TableHead className="text-right pr-10 font-black text-[10px] uppercase text-white/60 tracking-widest">Monto (USD)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PRESUPUESTO.map((row, i) => (
                                            <TableRow key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                <TableCell className="text-xs font-black uppercase pl-10 py-6 text-slate-700 italic">{row.item}</TableCell>
                                                <TableCell className="text-right font-mono font-black text-primary italic text-base pr-10">$ {row.cost.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/10 font-black">
                                            <TableCell className="text-lg uppercase italic pl-10 py-10 text-primary">TOTAL INVERSIÓN</TableCell>
                                            <TableCell className="text-right text-4xl text-primary font-black italic tracking-tighter pr-10">$ 11.900,00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* 7. Aliados */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary">
                                <Handshake className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">7. Aliados Estratégicos</h2>
                            </div>
                            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {ALIADOS.map((ally, i) => (
                                    <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border-2 border-slate-100 shadow-sm">
                                        <span className="text-base font-black uppercase italic text-primary mb-3 block">{ally.name}</span>
                                        <span className="text-[11px] font-bold text-slate-500 uppercase leading-relaxed">{ally.support}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 8. Plan Acción */}
                        <section>
                            <div className="flex items-center gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary">
                                <ClipboardCheck className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">8. Plan de Acción</h2>
                            </div>
                            <div className="border-2 border-slate-200 rounded-[2.5rem] overflow-hidden mx-6 shadow-2xl">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-900 hover:bg-slate-900 border-none">
                                            <TableHead className="font-black text-[10px] uppercase text-white/60 pl-10 py-6 tracking-widest">Fase</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase text-right pr-10 text-white/60 tracking-widest">Cronograma</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PLAN_ACCION.map((item, i) => (
                                            <TableRow key={i} className="border-b border-slate-100">
                                                <TableCell className="pl-10 py-6 text-xs font-bold text-slate-700 uppercase italic">{item.task}</TableCell>
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
                        <div className="text-[10px] font-black uppercase tracking-[1em] text-slate-300 italic animate-pulse">Final del Expediente • 2026</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
