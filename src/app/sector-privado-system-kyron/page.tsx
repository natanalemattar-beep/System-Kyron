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

// --- CONSTANTES TÉCNICAS UNIFICADAS (EXCLUSIVAS SYSTEM KYRON) ---
const EQUIPO = [
    { label: "Proyecto", val: "SYSTEM KYRON • CORPORATE INTELLIGENCE" },
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
    { task: "Auditoría de campo y levantamiento técnico en Catia la Mar", owner: "Equipo Técnico", date: "Semana 1" },
    { task: "Despliegue de Bóveda Digital y Migración de Datos", owner: "C. Mattar", date: "Semana 2" },
    { task: "Activación de Nodos 5G y Aprovisionamiento eSIM", owner: "S. Garrido", date: "Semana 3" },
    { task: "Certificación Maestro y Lanzamiento de Ecosistema", owner: "Auditores Kyron", date: "Semana 4" },
];

const ALIADOS = [
    { name: "SAPI", support: "Protección de Propiedad Intelectual y Patentes." },
    { name: "SENIAT", support: "Aseguramiento de riesgo fiscal cero." },
    { name: "CONATEL", support: "Habilitación de Red 5G y Servicios de Datos." },
    { name: "Holding Kyron", support: "Soporte técnico y financiero de grado maestro." },
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
            const fondo = "#f8fafc";
            
            const htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Segoe UI', 'Arial', sans-serif; color: ${negro}; line-height: 1.5; background-color: #ffffff; margin: 0; padding: 0; }
                        .doc-wrapper { width: 100%; max-width: 800px; margin: 0 auto; padding: 40px; }
                        
                        /* Header Moderno */
                        .header-main { border-bottom: 6pt solid ${azul}; margin-bottom: 40px; padding-bottom: 20px; }
                        .brand-title { color: ${azul}; font-size: 32pt; font-weight: 900; text-transform: uppercase; margin: 0; font-style: italic; letter-spacing: -1pt; }
                        .brand-sub { color: ${gris}; font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 4pt; margin-top: 4pt; }
                        .ref-box { text-align: right; margin-top: -50pt; }
                        .ref-id { background-color: ${azul}; color: #ffffff; padding: 5pt 15pt; font-size: 10pt; font-weight: 900; border-radius: 4pt; }

                        /* Secciones con "Vida" */
                        .section-header { 
                            background-color: ${negro}; 
                            color: #ffffff; 
                            padding: 12pt 25pt; 
                            font-size: 14pt; 
                            font-weight: 900; 
                            text-transform: uppercase; 
                            margin-top: 40pt; 
                            border-radius: 8pt 8pt 0 0;
                            letter-spacing: 2pt;
                            border-left: 10pt solid ${azul};
                        }
                        
                        .section-body { 
                            border: 1.5pt solid #e2e8f0; 
                            border-top: none;
                            padding: 25pt; 
                            background-color: ${fondo}; 
                            border-radius: 0 0 8pt 8pt;
                            margin-bottom: 20pt;
                        }

                        .data-label { color: ${azul}; font-size: 9pt; font-weight: 900; text-transform: uppercase; margin-bottom: 4pt; letter-spacing: 1pt; }
                        .data-value { font-size: 12pt; font-weight: bold; color: ${negro}; margin-bottom: 15pt; }
                        
                        /* Dashboard de Factibilidad 2026 */
                        .dashboard-table { width: 100%; margin: 25pt 0; border-collapse: separate; border-spacing: 15pt; }
                        .stat-card { 
                            background-color: #ffffff; 
                            border: 2pt solid ${azul}; 
                            padding: 20pt; 
                            text-align: center; 
                            border-radius: 15pt;
                            box-shadow: 0 4pt 6pt rgba(0,0,0,0.05);
                        }
                        .stat-val { font-size: 24pt; font-weight: 900; color: ${azul}; margin: 0; font-style: italic; }
                        .stat-lab { font-size: 10pt; font-weight: 900; color: ${gris}; text-transform: uppercase; margin-top: 5pt; letter-spacing: 1pt; }

                        /* Tablas Pro */
                        .pro-table { width: 100%; border-collapse: collapse; margin-top: 20pt; border-radius: 10pt; overflow: hidden; border: 1pt solid ${negro}; }
                        .pro-table th { 
                            background-color: ${negro}; 
                            border: 1pt solid ${negro}; 
                            padding: 12pt; 
                            font-size: 10pt; 
                            text-align: left; 
                            color: #ffffff; 
                            text-transform: uppercase;
                            font-weight: 900;
                        }
                        .pro-table td { 
                            border: 1pt solid #e2e8f0; 
                            padding: 12pt; 
                            font-size: 11pt; 
                            font-weight: 500;
                            background-color: #ffffff;
                        }
                        .row-alt { background-color: #f1f5f9; }
                        .total-cell { background-color: ${azul}; color: #ffffff; font-weight: 900; font-size: 14pt; }

                        /* Footer Global */
                        .footer-stamp { 
                            text-align: center; 
                            font-size: 10pt; 
                            color: ${gris}; 
                            margin-top: 80pt; 
                            border-top: 2pt solid #e2e8f0; 
                            padding-top: 30pt;
                            font-weight: 900;
                            text-transform: uppercase;
                            letter-spacing: 5pt;
                        }
                        
                        .final-seal {
                            border: 4pt double ${azul};
                            padding: 20pt;
                            text-align: center;
                            margin: 40pt 0;
                            color: ${azul};
                            font-weight: 900;
                            font-size: 14pt;
                            text-transform: uppercase;
                            background-color: #eff6ff;
                            border-radius: 15pt;
                        }
                    </style>
                </head>
                <body>
                    <div class="doc-wrapper">
                        <!-- ENCABEZADO MAESTRO -->
                        <div class="header-main">
                            <p class="brand-title">SYSTEM KYRON</p>
                            <p class="brand-sub">ENGINEERING MASTER DOSSIER • 2026</p>
                            <div class="ref-box">
                                <span class="ref-id">REF: KYRON-ZEDU-MASTER-2026</span>
                            </div>
                        </div>

                        <!-- PARTE 1 -->
                        <div class="section-header">1. Equipo Técnico de Ingeniería</div>
                        <div class="section-body">
                            ${EQUIPO.map(e => `
                                <div class="data-label">${e.label}</div>
                                <div class="data-value">${e.val}</div>
                            `).join('')}
                        </div>

                        <!-- PARTE 2 -->
                        <div class="section-header">2. Análisis de Población</div>
                        <div class="section-body">
                            <div class="data-label">Localidad de Operación</div>
                            <div class="data-value">Catia la Mar, Estado La Guaira, Venezuela.</div>
                            <div class="data-label">Alcance del Nodo</div>
                            <div class="data-value">2.500 Nodos de Interacción Comercial Activa.</div>
                            <p style="font-style: italic; color: ${gris}; font-size: 11pt;">"La región estratégica de La Guaira demanda una infraestructura de datos soberana y protocolos de inmutabilidad para blindar el crecimiento del sector privado."</p>
                        </div>

                        <!-- PARTE 3 -->
                        <div class="section-header">3. Diagnóstico Técnico</div>
                        <div class="section-body">
                            <p style="font-weight: 900; font-size: 13pt; color: ${negro}; margin-bottom: 15pt;">FRAGMENTACIÓN DE LA DATA E INSEGURIDAD LEGAL</p>
                            <p style="font-size: 11pt; color: ${gris}; text-align: justify;">El sistema actual de archivado físico en la región es vulnerable y obsoleto. La falta de un Ledger digital ha generado un riesgo fiscal crítico y una pérdida de eficiencia operativa superior al 45% en las empresas locales.</p>
                        </div>

                        <!-- PARTE 4 -->
                        <div class="section-header">4. Factibilidad Económica 2026</div>
                        <table class="dashboard-table">
                            <tr>
                                <td width="33%">
                                    <div class="stat-card">
                                        <p class="stat-val">$485k</p>
                                        <p class="stat-lab">VAN Proyectado</p>
                                    </div>
                                </td>
                                <td width="33%">
                                    <div class="stat-card" style="border-color: ${verde};">
                                        <p class="stat-val" style="color: ${verde};">31.2%</p>
                                        <p class="stat-lab">TIR Real</p>
                                    </div>
                                </td>
                                <td width="33%">
                                    <div class="stat-card">
                                        <p class="stat-val">340%</p>
                                        <p class="stat-lab">ROI Estimado</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div style="background-color: ${verde}; color: #ffffff; padding: 15pt; border-radius: 10pt; text-align: center; font-weight: 900; font-size: 12pt; text-transform: uppercase;">
                            DICTAMEN TÉCNICO: VIABILIDAD SOBRESALIENTE BAJO MODELO SAAS ESCALABLE
                        </div>

                        <!-- PARTE 5 -->
                        <div class="section-header">5. Desarrollo del Proyecto (La Solución)</div>
                        <div class="section-body">
                            <p class="data-label">Arquitectura System Kyron</p>
                            <p class="data-value">Implementación de una Bóveda Digital Inmutable soportada por conectividad 5G y hardware de inducción magnética para la trazabilidad de activos.</p>
                            <p class="data-label">Ventaja Competitiva</p>
                            <p class="data-value">A diferencia de soluciones genéricas, Kyron ofrece un blindaje legal predictivo sincronizado en tiempo real con la Gaceta Oficial, eliminando el riesgo de sanciones.</p>
                        </div>

                        <!-- PARTE 6 -->
                        <div class="section-header">6. Presupuesto Maestro (CAPEX)</div>
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th>Concepto de Inversión</th>
                                    <th style="text-align: center;">Cant.</th>
                                    <th style="text-align: right;">Monto (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${PRESUPUESTO.map((p, i) => `
                                    <tr class="${i % 2 === 0 ? '' : 'row-alt'}">
                                        <td>${p.item}</td>
                                        <td style="text-align: center;">${p.qty}</td>
                                        <td style="text-align: right; font-weight: 900;">$ ${p.cost.toLocaleString()}.00</td>
                                    </tr>
                                `).join('')}
                                <tr>
                                    <td colspan="2" class="total-cell" style="padding: 15pt;">TOTAL INVERSIÓN ESTRATÉGICA</td>
                                    <td class="total-cell" style="text-align: right; padding: 15pt;">$ 11.900,00</td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- PARTE 7 -->
                        <div class="section-header">7. Aliados Estratégicos</div>
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th width="30%">Institución</th>
                                    <th>Recurso / Apoyo Crítico</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ALIADOS.map((a, i) => `
                                    <tr class="${i % 2 === 0 ? '' : 'row-alt'}">
                                        <td style="font-weight: 900; color: ${azul};">${a.name}</td>
                                        <td>${a.support}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <!-- PARTE 8 -->
                        <div class="section-header">8. Plan de Acción Operativo</div>
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th>Fase de Ejecución</th>
                                    <th width="25%">Responsable</th>
                                    <th style="text-align: right;" width="20%">Tiempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${PLAN_ACCION.map((task, i) => `
                                    <tr class="${i % 2 === 0 ? '' : 'row-alt'}">
                                        <td>${task.task}</td>
                                        <td style="font-weight: bold; color: ${azul};">${task.owner}</td>
                                        <td style="text-align: right; color: ${verde}; font-weight: 900;">${task.date}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="final-seal">
                            DOCUMENTO CERTIFICADO: KYRON MASTER AUTHENTICATION [VALID-2026-X1]
                        </div>

                        <div class="footer-stamp">
                            CONFIDENCIAL • © 2026 SYSTEM KYRON • NODO DE INTELIGENCIA ESTRATÉGICA
                        </div>
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_MAESTRO_KYRON_2026.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({ 
                title: "EXPEDIENTE 2026 GENERADO", 
                description: "Transmisión de datos completada con éxito.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
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
                            <Link href="/" className="flex items-center"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
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
                    
                    {/* ENCABEZADO DE ALTA FIDELIDAD */}
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
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest italic">REF: KYRON-ZEDU-2026-MASTER</p>
                        </div>
                    </div>

                    <div className="space-y-20">
                        {/* 1. Equipo */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary-foreground">
                                <Users className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">1. Información del Equipo Técnico</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                                {EQUIPO.map((item, i) => (
                                    <div key={i} className={i === 2 ? "md:col-span-2" : ""}>
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{item.label}</p>
                                        <p className={cn("text-lg font-bold text-slate-800", i === 0 && "text-primary font-black italic text-2xl tracking-tighter")}>{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 2. Población */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary-foreground">
                                <Activity className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">2. Población a Trabajar</h2>
                            </div>
                            <div className="px-6 space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Núcleo Estratégico</p>
                                    <p className="text-xl font-bold text-slate-800 italic">Sector Comercial e Institucional de Catia la Mar, Estado La Guaira.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-secondary/10 rounded-[2rem] border-2 border-secondary/20 shadow-inner group hover:bg-secondary/20 transition-all">
                                        <p className="text-[10px] font-black uppercase text-secondary mb-2 tracking-widest">Alcance Directo</p>
                                        <p className="text-3xl font-black text-secondary italic tracking-tighter leading-none">2.500 Nodos</p>
                                        <p className="text-[9px] font-bold text-secondary/60 uppercase mt-2">Comunidad y Pymes</p>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 italic leading-relaxed text-justify flex items-center">"La zona de Catia la Mar presenta una alta densidad de transacciones comerciales que requieren urgentemente una infraestructura de seguridad digital y simplificación tributaria bajo el estándar Kyron."</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Diagnóstico */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary-foreground">
                                <Terminal className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">3. Análisis del Problema</h2>
                            </div>
                            <div className="px-6 space-y-8 text-justify">
                                <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] relative">
                                    <span className="absolute -top-4 left-10 bg-white px-4 text-[10px] font-black text-primary uppercase tracking-[0.4em]">Diagnóstico de Campo</span>
                                    <p className="text-xl font-bold italic text-slate-800 leading-relaxed">"El colapso del sistema de archivado físico y la fragmentación de la data histórica han imposibilitado una gestión fiscal y legal eficiente en el sector privado de la región."</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-2">Causas Identificadas</p>
                                        <p className="text-xs font-bold text-slate-600 uppercase leading-relaxed">Dependencia absoluta de registros en papel, vulnerabilidad ante fiscalizaciones por falta de trazabilidad y ausencia de un ledger inmutable.</p>
                                    </div>
                                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-primary/10">
                                        <p className="text-[10px] font-black uppercase text-primary mb-3 italic tracking-widest">Importancia Estratégica</p>
                                        <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">La transición a una Bóveda Digital es vital para la soberanía administrativa del sector privado en La Guaira.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Factibilidad */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary-foreground">
                                <TrendingUp className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">4. Factibilidad Económica</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mb-10">
                                {[
                                    { label: "VAN", val: "$ 485.000,00", col: "text-primary" },
                                    { label: "TIR", val: "31.2%", col: "text-secondary" },
                                    { label: "Payback", val: "2.1 Años", col: "text-slate-600" },
                                    { label: "ROI", val: "340%", col: "text-primary" }
                                ].map(stat => (
                                    <div key={stat.label} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-center shadow-inner hover:scale-105 transition-transform">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">{stat.label}</p>
                                        <p className={cn("text-xl font-black italic", stat.col)}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mx-6 p-8 bg-secondary/10 rounded-[2.5rem] border-2 border-secondary/20 text-center">
                                <p className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-2">Dictamen Final de Ingeniería</p>
                                <p className="text-sm font-bold text-slate-700 italic">"Viabilidad Sobresaliente. El modelo SaaS permite una escalabilidad total con costos operativos mínimos tras el despliegue del nodo inicial."</p>
                            </div>
                        </section>

                        {/* 5. Desarrollo / Solución */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary-foreground">
                                <Zap className="h-6 w-6" />
                                <h2 className="text-base font-black uppercase tracking-[0.4em]">5. Desarrollo del Proyecto (Solución)</h2>
                            </div>
                            <div className="px-6 space-y-12">
                                <div className="space-y-4">
                                    <p className="text-base font-black uppercase italic text-primary underline decoration-primary/20 underline-offset-8 tracking-tight">Visión Estratégica System Kyron</p>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed text-justify">Implementación de una infraestructura que integra conectividad 5G, hardware magnético y un motor de auditoría fiscal inmutable. Nuestra solución no solo digitaliza, sino que predice riesgos legales antes de que ocurran.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 shadow-inner">
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-4 italic tracking-widest">Comparativa de Mercado</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed">A diferencia de propuestas genéricas, Kyron ofrece un blindaje legal predictivo y trazabilidad de activos físicos mediante sensores de inducción magnética síncrona.</p>
                                    </div>
                                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-primary/20">
                                        <p className="text-[10px] font-black uppercase text-primary mb-4 italic tracking-widest">Diferenciadores Clave</p>
                                        <ul className="text-[11px] font-black uppercase text-slate-700 space-y-3">
                                            <li className="flex gap-3 items-center"><span className="text-primary text-lg">›</span> <span>Chatbot estratégico para atención neuronal.</span></li>
                                            <li className="flex gap-3 items-center"><span className="text-primary text-lg">›</span> <span>Automatización de libros fiscales síncrona.</span></li>
                                            <li className="flex gap-3 items-center"><span className="text-primary text-lg">›</span> <span>Acceso biométrico 3D para Bóveda Digital.</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Presupuesto */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary-foreground">
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
                                            <TableCell className="text-right text-4xl text-primary font-black italic tracking-tighter shadow-glow-text">$ 11.900,00</TableCell>
                                            <TableCell className="pr-10" />
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* 7. Aliados */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-primary-foreground">
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
                            <div className="flex items-center gap-4 bg-secondary text-white p-5 rounded-2xl shadow-xl mb-10 border-l-8 border-secondary-foreground">
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
                                                <TableCell className="text-right pr-10 text-[11px] font-black text-secondary uppercase tracking-widest shadow-glow-text">{item.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>
                    </div>

                    {/* PIE DE PÁGINA INSTITUCIONAL */}
                    <div className="mt-32 pt-20 border-t-8 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-8">
                            <div className="p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/10 shadow-inner">
                                <ShieldCheck className="h-12 w-12 text-primary" />
                            </div>
                            <div className="text-left space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Certificación Maestra</p>
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
