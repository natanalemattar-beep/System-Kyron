
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
  ArrowRight,
  ChevronRight,
  Package,
  ShoppingCart,
  Handshake,
  Calendar,
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";

// --- DATA SOURCE (Unified for Web and Download) ---
const teamInfo = {
    project: "SYSTEM KYRON (AUTOMIND AI)",
    members: "Carlos Mattar, Sebastian Garrido, Marcos Sousa",
    institution: "U.E. Colegio 'Gabriela Mistral'",
    location: "Santa Rosa de Lima, Caracas"
};

const populationData = {
    community: "Comunidad Educativa y Administrativa Santa Rosa de Lima",
    reach: "1.500+ Usuarios Activos (Estudiantes, Representantes, Personal)",
    profile: "Nodo de alta demanda transaccional y digitalización crítica."
};

const problemAnalysis = {
    definition: "El sistema de archivado institucional es deficiente y obsoleto debido a que la gran mayoría de la información personal y fiscal está almacenada físicamente en papel, no en digital.",
    causes: "Dependencia de procesos manuales, falta de infraestructura de red dedicada y ausencia de un ledger inmutable.",
    consequences: "Riesgo de pérdida de datos históricos, lentitud en trámites ante el SENIAT/IVSS y vulnerabilidad en auditorías.",
    importance: "La digitalización inmutable es el único camino para garantizar la soberanía de los datos y la eficiencia operativa en el siglo XXI."
};

const feasibilityData = {
    van: 450000,
    tir: "28.5%",
    payback: "2.4 Años",
    roi: "315%",
    dictamen: "Viabilidad Económica Sobresaliente. El modelo SaaS de Kyron permite escalar la infraestructura sin incrementar proporcionalmente los costos fijos."
};

const projectDevelopment = {
    vision: "Implementación de AutoMind AI: Una arquitectura de red síncrona que fusiona el protocolo Hyper-Connect 5G con una Bóveda de Datos Inmutable.",
    solution: "Se desplegará un nodo central que blinda la operación mediante inteligencia predictiva, monitoreando la Gaceta Oficial 24/7 y automatizando el 100% de los libros fiscales.",
    alternatives: "Comparativa con Mobian: Mientras Mobian ofrece gestión básica, Kyron entrega un ecosistema de inteligencia de negocios con sellado Blockchain.",
    differentiators: [
        "Especialización exclusiva en sector educativo y corporativo.",
        "Chatbot IA personalizado para atención al representante.",
        "Tecnología de inducción magnética para trazabilidad de activos."
    ]
};

const budgetData = [
    { item: "Infraestructura de Red 5G (Nodo Kyron Connect)", qty: 1, cost: 5000, location: "División Telecom" },
    { item: "Lote SIM Cards Físicas / Provisión eSIM", qty: 1000, cost: 1000, location: "Kyron Secure Hub" },
    { item: "Papeleras Inteligentes (Inducción Magnética)", qty: 5, cost: 1250, location: "Taller de Ingeniería" },
    { item: "Equipos Fiscales Homologados (Prov. 0071)", qty: 2, cost: 950, location: "Fiscal Solutions" },
    { item: "Licencia Anual Ecosistema AutoMind AI Pro", qty: 1, cost: 1500, location: "Cloud Vault" },
];

const alliesData = [
    { name: "SAPI (Propiedad Intelectual)", support: "Registro de Patentes y Marcas de la Inmortalidad de Datos" },
    { name: "CONATEL", support: "Habilitación General de Telecomunicaciones y Espectro 5G" },
    { name: "SENIAT", support: "Validación de Equipos Fiscales y Control de Riesgo Cero" },
    { name: "Banco de Venezuela", support: "Integración de Pasarelas de Pago y Billetera Digital" },
];

const actionPlanData = [
    { task: "Levantamiento de requerimientos técnicos en Santa Rosa de Lima.", owner: "Carlos Mattar", date: "Semana 1-2" },
    { task: "Alineación con aliados institucionales (SENIAT/CONATEL).", owner: "Sebastian Garrido", date: "Semana 3" },
    { task: "Instalación de hardware magnético y despliegue de red 5G.", owner: "Marcos Sousa", date: "Semana 4-5" },
    { task: "Activación de Bóveda Digital y capacitación de personal.", owner: "Carlos Mattar", date: "Semana 6" },
    { task: "Lanzamiento oficial y auditoría de primer cierre fiscal.", owner: "Equipo Maestro", date: "Semana 7" },
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
            const azul = "#2563eb";
            const verde = "#22c55e";
            const gris = "#f8fafc";
            const borde = "#cbd5e1";
            
            const htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.5; }
                        .header-table { width: 100%; border-bottom: 4pt solid ${azul}; margin-bottom: 30px; }
                        .title { color: ${azul}; font-size: 26pt; font-weight: 900; text-transform: uppercase; margin: 0; }
                        .section-box { border: 1pt solid ${borde}; border-radius: 10px; padding: 15px; margin-bottom: 20px; background-color: ${gris}; }
                        .section-title { background-color: ${azul}; color: #ffffff; font-size: 13pt; font-weight: 900; text-transform: uppercase; padding: 8px 15px; margin-bottom: 10px; border-radius: 5px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
                        th { background-color: ${azul}; color: #ffffff; padding: 10px; font-size: 9pt; text-transform: uppercase; border: 1pt solid #000; }
                        td { padding: 8px; border: 1pt solid ${borde}; font-size: 10pt; background-color: #ffffff; }
                        .fact-box { background-color: ${verde}; color: #ffffff; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center; }
                        .footer { text-align: center; font-size: 8pt; color: #94a3b8; margin-top: 40px; text-transform: uppercase; letter-spacing: 2px; border-top: 1pt solid ${borde}; padding-top: 20px; }
                        .highlight { color: ${azul}; font-weight: 900; }
                        .tag { display: inline-block; padding: 2px 8px; background: ${azul}20; color: ${azul}; border-radius: 4px; font-size: 8pt; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <!-- HEADER -->
                    <table class="header-table">
                        <tr>
                            <td>
                                <h1 class="title">System Kyron</h1>
                                <p style="color:#64748b; font-size:10pt; margin:0; font-weight:bold;">CORPORATE INTELLIGENCE NODE • 2026</p>
                            </td>
                            <td style="text-align:right;">
                                <p style="font-weight:900; color:${azul}; font-size:12pt; margin:0;">EXPEDIENTE MAESTRO ZEDU</p>
                                <p style="font-size:8pt; margin:0;">REF: KYRON-PRO-MASTER-2026</p>
                            </td>
                        </tr>
                    </table>

                    <!-- PARTE 1 -->
                    <div class="section-title">1. Información del Equipo Técnico</div>
                    <div class="section-box">
                        <p><b>PROYECTO:</b> <span class="highlight">${teamInfo.project}</span></p>
                        <p><b>INTEGRANTES:</b> ${teamInfo.members}</p>
                        <p><b>INSTITUCIÓN:</b> ${teamInfo.institution}</p>
                        <p><b>UBICACIÓN:</b> ${teamInfo.location}</p>
                    </div>

                    <!-- PARTE 2 -->
                    <div class="section-title">2. Población a Trabajar</div>
                    <div class="section-box">
                        <p><b>COMUNIDAD:</b> ${populationData.community}</p>
                        <p><b>ALCANCE:</b> <span style="color:${verde}; font-weight:bold;">${populationData.reach}</span></p>
                        <p><b>PERFIL:</b> ${populationData.profile}</p>
                    </div>

                    <!-- PARTE 3 -->
                    <div class="section-title">3. Análisis del Problema</div>
                    <div class="section-box">
                        <p><b>DEFINICIÓN:</b> ${problemAnalysis.definition}</p>
                        <p><b>CAUSAS:</b> ${problemAnalysis.causes}</p>
                        <p><b>CONSECUENCIAS:</b> ${problemAnalysis.consequences}</p>
                        <p><b>IMPORTANCIA:</b> <i>${problemAnalysis.importance}</i></p>
                    </div>

                    <!-- PARTE 4 -->
                    <div class="fact-box">
                        <h2 style="margin:0; font-size:18pt; text-transform:uppercase;">4. DICTAMEN DE FACTIBILIDAD</h2>
                        <p style="font-size:14pt; font-weight:bold; margin:10px 0;">VAN: $450.000 | TIR: 28.5% | ROI: 315%</p>
                        <p style="font-size:10pt; opacity:0.9;">${feasibilityData.dictamen}</p>
                    </div>

                    <!-- PARTE 5 -->
                    <div class="section-title">5. Desarrolla tu Proyecto (Solución IA)</div>
                    <div class="section-box">
                        <p><b>VISIÓN TÉCNICA:</b> ${projectDevelopment.vision}</p>
                        <p><b>SOLUCIÓN PROPUESTA:</b> ${projectDevelopment.solution}</p>
                        <p><b>DIFERENCIADORES:</b></p>
                        <ul style="font-size:10pt; color:#475569;">
                            ${projectDevelopment.differentiators.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- PARTE 6 -->
                    <div class="section-title">6. Presupuesto Operativo (CAPEX)</div>
                    <table>
                        <thead>
                            <tr>
                                <th style="width:50%;">ITEM DE INVERSIÓN</th>
                                <th>CANT.</th>
                                <th>COSTO (USD)</th>
                                <th>UBICACIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${budgetData.map(d => `
                                <tr>
                                    <td><b>${d.item}</b></td>
                                    <td style="text-align:center;">${d.qty}</td>
                                    <td style="text-align:right; font-weight:bold; color:${azul};">$${d.cost.toLocaleString()}</td>
                                    <td style="text-align:center; font-size:8pt;">${d.location}</td>
                                </tr>
                            `).join('')}
                            <tr style="background-color:${azul}10;">
                                <td colspan="2" style="font-weight:900; text-transform:uppercase; font-size:11pt; padding:15px;">Total Inversión Nodo Maestro</td>
                                <td style="text-align:right; font-weight:900; color:${azul}; font-size:14pt;">$${budgetData.reduce((a,b) => a + b.cost, 0).toLocaleString()}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- PARTE 7 -->
                    <div class="section-title">7. Aliados y Recursos</div>
                    <div class="section-box">
                        <p>Para la ejecución síncrona del Ecosistema Kyron, se han establecido alianzas estratégicas con los siguientes entes:</p>
                        <table style="border:none;">
                            ${alliesData.map(a => `
                                <tr>
                                    <td style="width:30%; border:none; font-weight:bold; color:${azul};">${a.name}</td>
                                    <td style="border:none; font-size:9pt;">${a.support}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>

                    <!-- PARTE 8 -->
                    <div class="section-title">8. Plan de Acción y Cronograma</div>
                    <table>
                        <thead>
                            <tr>
                                <th style="width:60%;">TAREA ESTRATÉGICA</th>
                                <th>RESPONSABLE</th>
                                <th>TIEMPO</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${actionPlanData.map(p => `
                                <tr>
                                    <td style="font-size:9pt;">${p.task}</td>
                                    <td style="text-align:center;"><b>${p.owner}</b></td>
                                    <td style="text-align:center; font-weight:bold; color:${verde};">${p.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="footer">
                        <p>Documento Certificado por System Kyron Master Auth • 2026</p>
                        <p style="letter-spacing:5px;">*** FINAL DEL EXPEDIENTE ***</p>
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_MAESTRO_KYRON_UHD.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({
                title: "TRANSMISIÓN COMPLETADA",
                description: "Expediente exportado con fidelidad UHD.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1200);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020408] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative overflow-x-hidden">
            
            {/* HUD CONTROL PANEL */}
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 shadow-glow" />
                    
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all">
                            <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                        </Button>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Dossier Consolidado</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Audit Ready • 2026</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all">
                            <Printer className="mr-3 h-4 w-4 text-primary" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} className="h-12 px-10 rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest shadow-glow">
                            {isExporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
                            EXPORTAR EXPEDIENTE
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* PREVIEW DEL DOCUMENTO (WEB VIEW) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[1000px] mx-auto relative pb-32"
            >
                <div id="web-document-view" className="relative bg-white text-black p-8 md:p-20 shadow-2xl rounded-[3.5rem] border border-slate-300 print:shadow-none print:border-none print:p-0 overflow-hidden">
                    
                    {/* Header Institucional */}
                    <div className="flex justify-between items-start mb-16 border-b-4 border-primary/10 pb-10">
                        <div className="flex items-center gap-6">
                            <Logo className="h-16 w-16" />
                            <div className="space-y-1 text-left">
                                <span className="font-black text-3xl tracking-tighter uppercase italic text-primary">System Kyron</span>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-black px-4 h-8 rounded-xl mb-3">Dossier de Ingeniería</Badge>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest italic">REF: KYRON-ZEDU-MASTER-PRO-2026</p>
                        </div>
                    </div>

                    {/* SECCIONES DINÁMICAS */}
                    <div className="space-y-16">
                        
                        {/* 1. Equipo */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <Users className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">1. Información del Equipo Técnico</h2>
                            </div>
                            <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-3">
                                    <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black p-6">
                                        <p className="text-[9px] font-black uppercase text-slate-500 mb-2">Proyecto</p>
                                        <p className="text-base font-black uppercase italic text-primary">{teamInfo.project}</p>
                                    </div>
                                    <div className="col-span-2 p-6">
                                        <p className="text-[9px] font-black uppercase text-slate-500 mb-2">Integrantes</p>
                                        <p className="font-mono text-sm font-bold uppercase text-slate-800">{teamInfo.members}</p>
                                    </div>
                                </div>
                                <div className="border-t-[1.5px] border-black p-6 bg-slate-50">
                                    <p className="text-[9px] font-black uppercase text-slate-500 mb-2">Institución y Ubicación</p>
                                    <p className="text-sm font-bold uppercase text-slate-700">{teamInfo.institution} • {teamInfo.location}</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Población */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                                <Activity className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">2. Población a Trabajar</h2>
                            </div>
                            <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white p-8">
                                <p className="text-sm font-bold uppercase text-slate-800 mb-4">{populationData.community}</p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Alcance</p>
                                        <p className="text-2xl font-black text-secondary">{populationData.reach}</p>
                                    </div>
                                    <p className="text-[11px] font-mono font-bold uppercase text-slate-500 leading-relaxed">
                                        {populationData.profile}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Diagnóstico */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <Terminal className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">3. Análisis del Problema</h2>
                            </div>
                            <div className="p-8 bg-slate-50 border-[1.5px] border-black rounded-3xl space-y-6">
                                <p className="text-sm italic font-medium leading-relaxed text-slate-800">
                                    "{problemAnalysis.definition}"
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-rose-500 mb-2">Causas Críticas</p>
                                        <p className="text-xs font-bold text-slate-600 uppercase">{problemAnalysis.causes}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-rose-500 mb-2">Consecuencias</p>
                                        <p className="text-xs font-bold text-slate-600 uppercase">{problemAnalysis.consequences}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Factibilidad */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                                <TrendingUp className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">4. Factibilidad Económica</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "VAN", val: formatCurrency(feasibilityData.van, 'USD'), col: "text-primary" },
                                    { label: "TIR", val: feasibilityData.tir, col: "text-secondary" },
                                    { label: "Payback", val: feasibilityData.payback, col: "text-slate-600" },
                                    { label: "ROI", val: feasibilityData.roi, col: "text-primary" }
                                ].map(stat => (
                                    <div key={stat.label} className="p-6 bg-white border-[1.5px] border-black rounded-3xl text-center">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{stat.label}</p>
                                        <p className={cn("text-lg font-black italic", stat.col)}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-2">Dictamen de Ingeniería</p>
                                <p className="text-xs font-bold text-slate-700 italic">{feasibilityData.dictamen}</p>
                            </div>
                        </section>

                        {/* 5. Desarrollo de Proyecto */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <Zap className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">5. Desarrolla tu Proyecto (AutoMind AI)</h2>
                            </div>
                            <div className="border-[1.5px] border-black rounded-3xl bg-white p-8 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-sm font-bold uppercase text-slate-800 leading-relaxed text-justify">
                                        {projectDevelopment.vision}
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 text-justify">
                                        {projectDevelopment.solution}
                                    </p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-3 underline">Otras Propuestas</p>
                                        <p className="text-[10px] font-bold uppercase text-slate-500 italic">{projectDevelopment.alternatives}</p>
                                    </div>
                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                                        <p className="text-[9px] font-black uppercase text-primary mb-3 underline">Diferenciadores Kyron</p>
                                        <ul className="text-[10px] font-black uppercase text-slate-700 space-y-2 italic">
                                            {projectDevelopment.differentiators.map((d, i) => <li key={i}>• {d}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Presupuesto */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                                <ShoppingCart className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">6. Presupuesto Operativo (CAPEX)</h2>
                            </div>
                            <div className="border-[1.5px] border-black rounded-3xl overflow-hidden shadow-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50 border-b-[1.5px] border-black">
                                            <TableHead className="font-black text-[9px] uppercase text-slate-600 pl-6 py-4">Item de Inversión</TableHead>
                                            <TableHead className="text-center font-black text-[9px] uppercase text-slate-600">Cant.</TableHead>
                                            <TableHead className="text-right font-black text-[9px] uppercase text-slate-600">Costo (USD)</TableHead>
                                            <TableHead className="text-right pr-6 font-black text-[9px] uppercase text-slate-600">Ubicación</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetData.map((row, i) => (
                                            <TableRow key={i} className="border-b border-slate-200 last:border-0">
                                                <TableCell className="text-[10px] font-bold uppercase pl-6 py-4">{row.item}</TableCell>
                                                <TableCell className="text-center font-mono font-bold">{row.qty}</TableCell>
                                                <TableCell className="text-right font-mono font-black text-primary italic">{formatCurrency(row.cost, 'USD')}</TableCell>
                                                <TableCell className="text-right text-[9px] italic text-slate-500 uppercase font-bold pr-6">{row.location}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/5 font-black border-t-[1.5px] border-black">
                                            <TableCell colSpan={2} className="text-sm uppercase italic pl-6 py-6">Total Inversión Nodo Maestro</TableCell>
                                            <TableCell className="text-right text-2xl text-primary font-black italic">{formatCurrency(budgetData.reduce((a,b) => a + b.cost, 0), 'USD')}</TableCell>
                                            <TableCell className="pr-6" />
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* 7. Aliados */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <Handshake className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">7. Aliados y Recursos</h2>
                            </div>
                            <div className="border-[1.5px] border-black rounded-[2rem] overflow-hidden bg-white shadow-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50 border-b-[1.5px] border-black">
                                            <TableHead className="font-black text-[10px] uppercase text-primary tracking-widest pl-8 py-5">Institución / Aliado</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase text-primary tracking-widest pr-8 py-5">Apoyo Estratégico</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {alliesData.map((ally, i) => (
                                            <TableRow key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                                <TableCell className="pl-8 py-5 text-xs font-black uppercase italic text-slate-800">{ally.name}</TableCell>
                                                <TableCell className="pr-8 py-5 text-xs font-bold text-slate-500 uppercase">{ally.support}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* 8. Plan de Acción */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                                <ClipboardCheck className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">8. Plan de Acción y Cronograma</h2>
                            </div>
                            <div className="border-[1.5px] border-black overflow-hidden rounded-[2rem] bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50 border-b-[1.5px] border-black">
                                            <TableHead className="font-black text-[10px] uppercase text-slate-600 pl-8 py-5">Tarea a Realizar</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase text-slate-600 text-center">Responsable</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase text-slate-600 text-right pr-8">Cronograma</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {actionPlanData.map((item, i) => (
                                            <TableRow key={i} className="border-b border-slate-100 last:border-0">
                                                <TableCell className="pl-8 py-5 text-[11px] font-bold text-slate-700 uppercase leading-relaxed">{item.task}</TableCell>
                                                <TableCell className="text-center text-[10px] font-black text-primary uppercase italic">{item.owner}</TableCell>
                                                <TableCell className="text-right pr-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>
                    </div>

                    {/* Footer del Documento */}
                    <div className="mt-24 pt-16 border-t-4 border-slate-100 flex justify-between items-end">
                        <div className="flex items-center gap-6">
                            <div className="p-6 bg-primary text-white rounded-[2rem] shadow-glow">
                                <ShieldCheck className="h-10 w-10" />
                            </div>
                            <div className="space-y-1 text-left">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Dictamen Final</p>
                                <p className="text-sm font-black uppercase italic text-primary leading-none">PROJECT CERTIFIED: KYRON MASTER</p>
                                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">Integridad del Expediente: 100%</p>
                            </div>
                        </div>
                        <div className="text-right space-y-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">Autenticación Requerida</p>
                            <div className="w-64 h-16 border-b-2 border-slate-300 italic text-slate-400 text-xs flex items-end justify-center pb-3 font-serif">
                                Signature: System Kyron Admin Node
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-300 italic">Final del documento • 2026</p>
                    </div>
                </div>
            </motion.div>

            {/* HUD BORDERS */}
            <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
            <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
        </div>
    );
}
