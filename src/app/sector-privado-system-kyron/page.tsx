
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

// --- CONSTANTES TÉCNICAS UNIFICADAS ---
const EQUIPO = [
    { label: "Proyecto", val: "SYSTEM KYRON • AUTOMIND AI" },
    { label: "Integrantes", val: "Carlos Mattar, Sebastian Garrido, Marcos Sousa" },
    { label: "Institución / Ubicación", val: "U.E. Colegio 'Gabriela Mistral' • Catia la Mar, La Guaira" },
];

const PRESUPUESTO = [
    { item: "Infraestructura Kyron Connect 5G", qty: 1, cost: 5500, location: "Nodo Central" },
    { item: "Terminales Inteligentes de Gestión", qty: 10, cost: 2500, location: "Hardware Lab" },
    { item: "Módulo de Bóveda Digital Inmutable", qty: 1, cost: 1800, location: "Cloud Ledger" },
    { item: "Smart Bins (Magnetismo Síncrono)", qty: 4, cost: 1200, location: "Engineering" },
    { item: "Equipos Fiscales Homologados", qty: 2, cost: 900, location: "Fiscal Compliance" },
];

const PLAN_ACCION = [
    { task: "Auditoría de campo en Catia la Mar", owner: "Equipo Técnico", date: "Semana 1" },
    { task: "Despliegue de Bóveda y Migración", owner: "C. Mattar", date: "Semana 2" },
    { task: "Activación de Nodos 5G y eSIM", owner: "S. Garrido", date: "Semana 3" },
    { task: "Certificación y Lanzamiento", owner: "Auditores Kyron", date: "Semana 4" },
];

const ALIADOS = [
    { name: "SAPI", support: "Certificación de Patentes y Propiedad Intelectual." },
    { name: "SENIAT", support: "Homologación de procesos de riesgo cero." },
    { name: "CONATEL", support: "Habilitación de Red 5G y servicios de datos." },
    { name: "Holding Kyron", support: "Respaldo de capital y soporte técnico master." },
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
            const gris = "#64748b";
            const negro = "#0f172a";
            
            const htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Calibri', 'Arial', sans-serif; color: ${negro}; line-height: 1.4; background-color: #ffffff; }
                        .main-container { width: 100%; max-width: 800px; margin: 0 auto; }
                        
                        /* Header Styles */
                        .header-table { width: 100%; border-bottom: 3pt solid ${azul}; margin-bottom: 25px; }
                        .header-left { padding: 10px 0; }
                        .brand-name { color: ${azul}; font-size: 26pt; font-weight: bold; text-transform: uppercase; margin: 0; }
                        .brand-tagline { color: ${gris}; font-size: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt; margin-top: 2pt; }
                        .header-right { text-align: right; vertical-align: bottom; padding-bottom: 10px; }
                        .ref-id { color: ${azul}; font-size: 9pt; font-weight: bold; margin: 0; }
                        .audit-date { color: ${gris}; font-size: 8pt; margin: 0; }

                        /* Section Styles */
                        .section-title { 
                            background-color: ${azul}; 
                            color: #ffffff; 
                            padding: 8pt 15pt; 
                            font-size: 12pt; 
                            font-weight: bold; 
                            text-transform: uppercase; 
                            margin-top: 25pt; 
                            border-radius: 4pt;
                        }
                        
                        .content-card { 
                            border: 1pt solid #e2e8f0; 
                            padding: 15pt; 
                            background-color: #fcfdfe; 
                            margin-top: 5pt; 
                            border-radius: 8pt; 
                        }

                        .label-text { color: ${gris}; font-size: 8pt; font-weight: bold; text-transform: uppercase; margin-bottom: 2pt; }
                        .value-text { font-size: 10pt; font-weight: bold; color: ${negro}; margin-bottom: 10pt; }
                        
                        /* Metrics Dashboard */
                        .metrics-table { width: 100%; margin: 15pt 0; }
                        .metric-card { 
                            background-color: #f0fdf4; 
                            border: 1.5pt solid ${verde}; 
                            padding: 15pt; 
                            text-align: center; 
                            border-radius: 8pt;
                        }
                        .metric-val { font-size: 18pt; font-weight: bold; color: #166534; margin: 0; }
                        .metric-lab { font-size: 8pt; font-weight: bold; color: ${verde}; text-transform: uppercase; margin: 0; }

                        /* Tables */
                        .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; }
                        .data-table th { 
                            background-color: #f1f5f9; 
                            border: 1pt solid #cbd5e1; 
                            padding: 8pt; 
                            font-size: 9pt; 
                            text-align: left; 
                            color: ${azul}; 
                            text-transform: uppercase;
                        }
                        .data-table td { 
                            border: 1pt solid #e2e8f0; 
                            padding: 8pt; 
                            font-size: 9pt; 
                        }
                        .data-table tr.total-row { background-color: #f8fafc; font-weight: bold; }

                        /* Quote Box */
                        .quote-box { 
                            border-left: 4pt solid #e2e8f0; 
                            padding-left: 15pt; 
                            margin: 15pt 0; 
                            font-style: italic; 
                            color: #475569; 
                            font-size: 11pt;
                        }

                        /* Footer */
                        .doc-footer { 
                            text-align: center; 
                            font-size: 8pt; 
                            color: ${gris}; 
                            margin-top: 50pt; 
                            border-top: 0.5pt solid #e2e8f0; 
                            padding-top: 15pt;
                        }
                        
                        .cert-stamp {
                            border: 2pt dashed ${azul};
                            padding: 10pt;
                            text-align: center;
                            margin-top: 20pt;
                            color: ${azul};
                            font-weight: bold;
                            font-size: 10pt;
                        }
                    </style>
                </head>
                <body>
                    <div class="main-container">
                        <!-- HEADER -->
                        <table class="header-table" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="header-left">
                                    <p class="brand-name">SYSTEM KYRON</p>
                                    <p class="brand-tagline">Corporate Intelligence Hub • ZEDU 2.6</p>
                                </td>
                                <td class="header-right">
                                    <p class="ref-id">REF: KYRON-ZEDU-2026-X1</p>
                                    <p class="audit-date">FECHA: ${new Date().toLocaleDateString()}</p>
                                </td>
                            </tr>
                        </table>

                        <!-- PART 1 -->
                        <div class="section-title">1. Información del Equipo Técnico</div>
                        <div class="content-card">
                            ${EQUIPO.map(e => `
                                <p class="label-text">${e.label}</p>
                                <p class="value-text">${e.val}</p>
                            `).join('')}
                        </div>

                        <!-- PART 2 -->
                        <div class="section-title">2. Población a Trabajar</div>
                        <div class="content-card">
                            <p class="label-text">Ubicación Estratégica</p>
                            <p class="value-text">Catia la Mar, Estado La Guaira.</p>
                            <p class="label-text">Alcance Directo</p>
                            <p class="value-text">2.500 Nodos de Interacción Directa.</p>
                            <div class="quote-box">
                                "La zona presenta una densidad comercial crítica que requiere una infraestructura de seguridad digital inmediata."
                            </div>
                        </div>

                        <!-- PART 3 -->
                        <div class="section-title">3. Análisis del Problema</div>
                        <div class="content-card">
                            <div class="quote-box">
                                "El colapso del sistema de archivado físico y la fragmentación de la data han generado un cuello de botella legal en la región."
                            </div>
                            <p class="label-text">Causas Identificadas</p>
                            <p class="value-text">Dependencia del papel, vulnerabilidad ante auditorías y falta de un ledger inmutable.</p>
                        </div>

                        <!-- PART 4 -->
                        <div class="section-title">4. Factibilidad Económica</div>
                        <table class="metrics-table" cellpadding="10" cellspacing="10">
                            <tr>
                                <td width="33%">
                                    <div class="metric-card">
                                        <p class="metric-lab">VAN</p>
                                        <p class="metric-val">$ 485.000</p>
                                    </div>
                                </td>
                                <td width="33%">
                                    <div class="metric-card">
                                        <p class="metric-lab">TIR</p>
                                        <p class="metric-val">31.2%</p>
                                    </div>
                                </td>
                                <td width="33%">
                                    <div class="metric-card">
                                        <p class="metric-lab">ROI</p>
                                        <p class="metric-val">340%</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div class="content-card" style="border-color: ${verde}; background-color: #f0fdf4;">
                            <p style="color: #166534; font-size: 10pt; margin: 0;"><b>DICTAMEN:</b> Viabilidad Sobresaliente. El modelo SaaS permite escalabilidad masiva con costos operativos marginales.</p>
                        </div>

                        <!-- PART 5 -->
                        <div class="section-title">5. Desarrollo del Proyecto (Solución)</div>
                        <div class="content-card">
                            <p class="label-text">Visión AutoMind AI</p>
                            <p class="value-text">Implementación de un ecosistema 5G con hardware magnético y auditoría blockchain síncrona.</p>
                            <p class="label-text">Ventaja Competitiva</p>
                            <p class="value-text">A diferencia de Mobian, Kyron ofrece blindaje legal predictivo y atención neuronal 24/7.</p>
                        </div>

                        <!-- PART 6 -->
                        <div class="section-title">6. Presupuesto Operativo (CAPEX)</div>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Item de Inversión</th>
                                    <th style="text-align: center;">Cant.</th>
                                    <th style="text-align: right;">Costo (USD)</th>
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
                                    <td colspan="2">TOTAL INVERSIÓN</td>
                                    <td style="text-align: right; color: ${azul};">$ 11.900,00</td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- PART 7 -->
                        <div class="section-title">7. Aliados Estratégicos</div>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Institución</th>
                                    <th>Apoyo Operativo</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ALIADOS.map(a => `
                                    <tr>
                                        <td style="font-weight: bold; color: ${azul};">${a.name}</td>
                                        <td>${a.support}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <!-- PART 8 -->
                        <div class="section-title">8. Plan de Acción</div>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Fase</th>
                                    <th>Responsable</th>
                                    <th style="text-align: right;">Tiempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${PLAN_ACCION.map(task => `
                                    <tr>
                                        <td>${task.task}</td>
                                        <td>${task.owner}</td>
                                        <td style="text-align: right; color: ${verde};"><b>${task.date}</b></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="cert-stamp">
                            CERTIFICACIÓN MAESTRA: SYSTEM KYRON VALIDATED [KYRON-AUTH-2026]
                        </div>

                        <div class="doc-footer">
                            <p>EXPEDIENTE CONFIDENCIAL • DOCUMENTO OFICIAL DE INGENIERÍA • © 2026 SYSTEM KYRON</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_MAESTRO_KYRON_ZEDU.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({ 
                title: "TRANSMISIÓN COMPLETADA", 
                description: "El expediente de alta fidelidad ha sido generado con éxito.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1000);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative">
            
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                >
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                            <Link href="/" className="flex items-center"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                        </Button>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Expediente Maestro</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase mt-1">Audit Ready • 2026</span>
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

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[900px] mx-auto pb-32">
                <div className="bg-white text-black p-10 md:p-20 shadow-2xl rounded-[3rem] border border-slate-300 print:p-0 print:shadow-none overflow-hidden">
                    
                    {/* ENCABEZADO */}
                    <div className="flex justify-between items-start mb-16 border-b-4 border-primary/10 pb-10">
                        <div className="flex items-center gap-6">
                            <Logo className="h-16 w-16" />
                            <div className="text-left">
                                <span className="font-black text-3xl tracking-tighter uppercase italic text-primary">System Kyron</span>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mt-1">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black px-4 h-8 rounded-xl mb-3">Expediente de Ingeniería</Badge>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest italic">REF: KYRON-ZEDU-2026</p>
                        </div>
                    </div>

                    <div className="space-y-16">
                        {/* 1. Equipo */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-6">
                                <Users className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em]">1. Información del Equipo Técnico</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                                {EQUIPO.map((item, i) => (
                                    <div key={i} className={i === 2 ? "md:col-span-2" : ""}>
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{item.label}</p>
                                        <p className={cn("text-sm font-bold text-slate-700", i === 0 && "text-primary font-black italic")}>{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 2. Población */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10 mb-6">
                                <Activity className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">2. Población a Trabajar</h2>
                            </div>
                            <div className="px-4 space-y-4">
                                <p className="text-sm font-bold text-slate-800 italic">Núcleo Institucional y Comercial de Catia la Mar, Estado La Guaira.</p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20 shadow-inner">
                                        <p className="text-[9px] font-black uppercase text-secondary mb-1">Alcance Directo</p>
                                        <p className="text-xl font-black text-secondary italic">2.500 Nodos de Interacción</p>
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 italic leading-relaxed text-justify">La zona de Catia la Mar presenta una alta densidad de transacciones comerciales que requieren urgentemente una infraestructura de seguridad digital y simplificación tributaria.</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Diagnóstico */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-6">
                                <Terminal className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em]">3. Análisis del Problema</h2>
                            </div>
                            <div className="px-4 space-y-6 text-justify">
                                <p className="text-sm font-bold italic text-slate-800 leading-relaxed border-l-4 border-slate-200 pl-6">"El colapso del sistema de archivado físico y la fragmentación de la data histórica han imposibilitado una gestión fiscal y legal eficiente en el sector privado de la región."</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div><p className="text-[9px] font-black uppercase text-slate-400 mb-1">Causas Identificadas</p><p className="text-xs font-medium text-slate-600">Dependencia absoluta de registros en papel, vulnerabilidad ante fiscalizaciones por falta de trazabilidad y ausencia de un ledger inmutable.</p></div>
                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-[9px] font-black uppercase text-primary mb-2 italic">Importancia Estratégica</p>
                                        <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">La transición a una Bóveda Digital es vital para la soberanía administrativa del sector privado en La Guaira.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Factibilidad */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10 mb-6">
                                <TrendingUp className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">4. Factibilidad Económica</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {[
                                    { label: "VAN", val: "$ 485.000,00", col: "text-primary" },
                                    { label: "TIR", val: "31.2%", col: "text-secondary" },
                                    { label: "Payback", val: "2.1 Años", col: "text-slate-600" },
                                    { label: "ROI", val: "340%", col: "text-primary" }
                                ].map(stat => (
                                    <div key={stat.label} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center shadow-sm hover:shadow-md transition-all">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{stat.label}</p>
                                        <p className={cn("text-lg font-black italic", stat.col)}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-500 italic p-6 bg-secondary/5 rounded-2xl border border-secondary/20 ml-4 leading-relaxed">
                                <b className="text-secondary">Dictamen Final:</b> Viabilidad Sobresaliente. El modelo SaaS permite una escalabilidad total con costos operativos mínimos tras el despliegue del nodo inicial.
                            </p>
                        </section>

                        {/* 5. Desarrollo / Solución */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-6">
                                <Zap className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em]">5. Desarrolla tu Proyecto (Solución)</h2>
                            </div>
                            <div className="px-4 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-sm font-black uppercase italic text-primary underline decoration-primary/20 underline-offset-8">Visión Estratégica: AutoMind AI</p>
                                    <p className="text-xs font-medium text-slate-600 leading-relaxed text-justify">Implementación de una infraestructura que integra conectividad 5G, hardware magnético y un motor de auditoría fiscal inmutable. Nuestra solución no solo digitaliza, sino que predice riesgos legales antes de que ocurran.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-3 italic">Comparativa de Mercado</p>
                                        <p className="text-[10px] font-bold text-slate-500">A diferencia de propuestas como MOBIAN, Kyron ofrece blindaje legal predictivo y trazabilidad de activos físicos mediante sensores de inducción magnética síncrona.</p>
                                    </div>
                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                                        <p className="text-[9px] font-black uppercase text-primary mb-3 italic">Diferenciadores Clave</p>
                                        <ul className="text-[10px] font-black uppercase text-slate-700 space-y-2">
                                            <li className="flex gap-2"><span>[•]</span> <span>Chatbot estratégico para atención neuronal.</span></li>
                                            <li className="flex gap-2"><span>[•]</span> <span>Automatización de libros fiscales síncrona.</span></li>
                                            <li className="flex gap-2"><span>[•]</span> <span>Acceso biométrico 3D para Bóveda Digital.</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Presupuesto */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10 mb-6">
                                <ShoppingCart className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">6. Presupuesto Operativo (CAPEX)</h2>
                            </div>
                            <div className="border-[1.5px] border-black rounded-3xl overflow-hidden mx-4 shadow-sm bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50 border-b-[1.5px] border-black">
                                            <TableHead className="font-black text-[9px] uppercase text-slate-600 pl-6 py-4">Item de Inversión</TableHead>
                                            <TableHead className="text-center font-black text-[9px] uppercase text-slate-600">Cant.</TableHead>
                                            <TableHead className="text-right font-black text-[9px] uppercase text-slate-600">Costo (USD)</TableHead>
                                            <TableHead className="text-right pr-6 font-black text-[9px] uppercase text-slate-600">Origen</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PRESUPUESTO.map((row, i) => (
                                            <TableRow key={i} className="border-b border-slate-200 last:border-0">
                                                <TableCell className="text-[10px] font-bold uppercase pl-6 py-4">{row.item}</TableCell>
                                                <TableCell className="text-center font-mono font-bold">{row.qty}</TableCell>
                                                <TableCell className="text-right font-mono font-black text-primary italic">$ {row.cost.toLocaleString()}.00</TableCell>
                                                <TableCell className="text-right text-[9px] italic text-slate-500 uppercase font-bold pr-6">{row.location}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/5 font-black border-t-[1.5px] border-black">
                                            <TableCell colSpan={2} className="text-sm uppercase italic pl-6 py-6">Total Inversión Proyectada</TableCell>
                                            <TableCell className="text-right text-2xl text-primary font-black italic">$ 11.900,00</TableCell>
                                            <TableCell className="pr-6" />
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* 7. Aliados */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-6">
                                <Handshake className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em]">7. Aliados y Recursos Estratégicos</h2>
                            </div>
                            <div className="px-4">
                                <div className="grid grid-cols-1 gap-4">
                                    {ALIADOS.map((ally, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-primary/20 transition-all">
                                            <span className="text-xs font-black uppercase italic text-primary mb-1 sm:mb-0">{ally.name}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{ally.support}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 8. Plan de Acción */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10 mb-6">
                                <ClipboardCheck className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">8. Plan de Acción</h2>
                            </div>
                            <div className="border border-slate-200 rounded-3xl overflow-hidden mx-4 shadow-sm bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50 border-b">
                                            <TableHead className="font-black text-[9px] uppercase pl-8 py-5">Fase Operativa</TableHead>
                                            <TableHead className="font-black text-[9px] uppercase text-center">Responsable</TableHead>
                                            <TableHead className="font-black text-[9px] uppercase text-right pr-8">Cronograma</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {PLAN_ACCION.map((item, i) => (
                                            <TableRow key={i} className="border-b last:border-0">
                                                <TableCell className="pl-8 py-5 text-[11px] font-bold text-slate-700 uppercase">{item.task}</TableCell>
                                                <TableCell className="text-center text-[10px] font-black text-primary uppercase italic">{item.owner}</TableCell>
                                                <TableCell className="text-right pr-8 text-[10px] font-black text-secondary uppercase tracking-widest">{item.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>
                    </div>

                    <div className="mt-24 pt-16 border-t-4 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-primary/5 rounded-[1.5rem] border border-primary/10">
                                <ShieldCheck className="h-10 w-10 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Certificación Institucional</p>
                                <p className="text-sm font-black uppercase italic text-primary leading-none tracking-tight">SYSTEM KYRON MASTER VALIDATED</p>
                            </div>
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-300 italic">Final del documento • 2026</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
