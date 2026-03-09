
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
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
    { name: "Ministerio de Petróleo", support: "Certificación de Transporte y Logística Terrestre" },
];

const actionPlanData = [
    { task: "Visitas técnicas y levantamiento de requerimientos en Santa Rosa de Lima.", owner: "Carlos Mattar", date: "Semana 1-2" },
    { task: "Reunión de alineación con aliados institucionales (SENIAT/CONATEL).", owner: "Sebastian Garrido", date: "Semana 3" },
    { task: "Adquisición de hardware magnético y equipos fiscales homologados.", owner: "Marcos Sousa", date: "Semana 4" },
    { task: "Despliegue operativo de nodos 5G y activación de Bóveda Digital.", owner: "Carlos Mattar", date: "Semana 5-6" },
    { task: "Lanzamiento de campaña de promoción y publicidad del proyecto.", owner: "Marcos Sousa", date: "Semana 7" },
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
            const azulKyron = "#2563eb";
            const verdeKyron = "#22c55e";
            
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Expediente Maestro ZEDU - System Kyron</title>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #334155; padding: 40px; background-color: #fff; }
                        h1 { color: ${azulKyron}; font-size: 28pt; text-transform: uppercase; margin-bottom: 0; text-align: center; font-weight: 900; }
                        .subtitle { color: #94a3b8; font-size: 10pt; text-align: center; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 40px; font-weight: bold; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 2pt solid #000; }
                        th, td { border: 1pt solid #000; padding: 12px; text-align: left; font-size: 10pt; }
                        .section-title { background-color: #f8fafc; color: ${azulKyron}; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; font-size: 11pt; border-bottom: 2pt solid ${azulKyron}; }
                        .label { background-color: #f1f5f9; font-weight: bold; width: 30%; color: #64748b; font-size: 9pt; text-transform: uppercase; }
                        .value { font-weight: bold; color: #1e293b; }
                        .highlight { color: ${azulKyron}; font-weight: 900; font-style: italic; }
                        .success { color: ${verdeKyron}; font-weight: 900; }
                        .footer { margin-top: 60px; text-align: center; border-top: 1pt solid #e2e8f0; pt: 20px; font-size: 8pt; color: #cbd5e1; text-transform: uppercase; letter-spacing: 2px; }
                        .box { border: 1.5pt solid ${azulKyron}; padding: 20px; background-color: #f0f9ff; margin-bottom: 30px; border-radius: 10px; }
                        .signature-line { border-top: 1pt solid #000; width: 200px; margin: 40px auto 10px; }
                    </style>
                </head>
                <body>
                    <h1>SYSTEM KYRON</h1>
                    <div class="subtitle">Expediente Maestro ZEDU v2.6.5 • 2026</div>

                    <!-- PARTE 1 -->
                    <table>
                        <tr><th colspan="2" class="section-title">1. INFORMACIÓN DEL EQUIPO TÉCNICO</th></tr>
                        <tr><td class="label">Proyecto</td><td class="value highlight">SYSTEM KYRON</td></tr>
                        <tr><td class="label">Integrantes</td><td class="value">Carlos Mattar, Sebastian Garrido, Marcos Sousa</td></tr>
                        <tr><td class="label">Institución</td><td class="value">Gabriela Mistral</td></tr>
                        <tr><td class="label">Localidad</td><td class="value">Catia La Mar, Venezuela</td></tr>
                    </table>

                    <!-- PARTE 2 -->
                    <table>
                        <tr><th colspan="2" class="section-title">2. POBLACIÓN A TRABAJAR</th></tr>
                        <tr><td class="label">Comunidad</td><td class="value">Santa Rosa de Lima, Caracas</td></tr>
                        <tr><td class="label">Alcance</td><td class="value success">1.500+ Usuarios Activos</td></tr>
                        <tr><td class="label">Perfil</td><td class="value">Personal Administrativo y Directivo con Necesidad de Digitalización Inmutable</td></tr>
                    </table>

                    <!-- PARTE 3 -->
                    <table>
                        <tr><th colspan="2" class="section-title">3. ANÁLISIS DEL PROBLEMA</th></tr>
                        <tr><td class="label">Causas</td><td class="value">Archivamiento 100% físico, Inexistencia de Nodo Central, Vulnerabilidad de Activos.</td></tr>
                        <tr><td class="label">Dictamen</td><td class="value">"El sistema de archivado es muy pobre debido a que la gran mayoría de la información personal está archivada en papel y no en digital."</td></tr>
                    </table>

                    <!-- PARTE 4 -->
                    <div class="box">
                        <h3 style="color:${azulKyron}; margin-top:0;">4. FACTIBILIDAD ECONÓMICA</h3>
                        <p><b>VAN:</b> <span class="success">$450.000</span> | <b>TIR:</b> <span class="success">28.5%</span> | <b>Recuperación:</b> 2.4 Años</p>
                        <p style="font-size:9pt; font-style:italic;">Dictamen: Viabilidad sobresaliente bajo modelo SaaS con escalabilidad del 300%.</p>
                    </div>

                    <!-- PARTE 5 -->
                    <div style="margin-bottom:30px;">
                        <h3 style="color:${azulKyron}; text-transform:uppercase;">5. DESARROLLA TU PROYECTO (AUTOMIND AI)</h3>
                        <p style="text-align:justify;">System Kyron implementa <b>AutoMind AI</b>, una arquitectura de red síncrona que fusiona el protocolo Hyper-Connect 5G con una Bóveda de Datos Inmutable. La solución blinda la operación institucional mediante inteligencia predictiva que monitorea la Gaceta Oficial 24/7.</p>
                    </div>

                    <!-- PARTE 6 -->
                    <table>
                        <tr><th colspan="4" class="section-title">6. PRESUPUESTO OPERATIVO (CAPEX)</th></tr>
                        <tr style="background-color:#f1f5f9;">
                            <th>Item de Inversión</th>
                            <th>Cant.</th>
                            <th>Costo (USD)</th>
                            <th>Localización</th>
                        </tr>
                        ${budgetData.map(d => `
                            <tr>
                                <td>${d.item}</td>
                                <td style="text-align:center;">${d.qty}</td>
                                <td style="text-align:right; font-weight:bold;">$${d.cost.toLocaleString()}</td>
                                <td>${d.location}</td>
                            </tr>
                        `).join('')}
                        <tr style="background-color:#eff6ff;">
                            <td colspan="2"><b>TOTAL INVERSIÓN NODO MAESTRO</b></td>
                            <td style="text-align:right; color:${azulKyron}; font-weight:900;">$${budgetData.reduce((a,b) => a+b.cost, 0).toLocaleString()}</td>
                            <td></td>
                        </tr>
                    </table>

                    <!-- PARTE 7 -->
                    <table>
                        <tr><th colspan="2" class="section-title">7. ALIADOS ESTRATÉGICOS</th></tr>
                        ${alliesData.map(a => `
                            <tr><td class="label">${a.name}</td><td class="value">${a.support}</td></tr>
                        `).join('')}
                    </table>

                    <!-- PARTE 8 -->
                    <table>
                        <tr><th colspan="3" class="section-title">8. PLAN DE ACCIÓN Y CRONOGRAMA</th></tr>
                        <tr style="background-color:#f1f5f9;">
                            <th>Tarea Estratégica</th>
                            <th>Responsable</th>
                            <th>Cronograma</th>
                        </tr>
                        ${actionPlanData.map(p => `
                            <tr>
                                <td style="font-size:9pt;">${p.task}</td>
                                <td style="text-align:center; font-weight:bold; color:${azulKyron}; font-size:8pt;">${p.owner}</td>
                                <td style="text-align:center; font-weight:bold; font-size:8pt;">${p.date}</td>
                            </tr>
                        `).join('')}
                    </table>

                    <div style="page-break-before: always;"></div>

                    <div style="text-align:center; margin-top:100px;">
                        <div class="signature-line"></div>
                        <p style="font-weight:900; text-transform:uppercase; font-size:10pt;">Dirección General de Ingeniería</p>
                        <p style="color:#94a3b8; font-size:8pt;">VALIDADO POR NODO MAESTRO KYRON</p>
                    </div>

                    <div class="footer">
                        Final del documento • Dossier de Inteligencia Corporativa • 2026
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + header], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_ZEDU_KYRON_MASTER_UHD.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({
                title: "PROTOCOLO DE EXPORTACIÓN FINALIZADO",
                description: "El dossier ha sido generado con diseño de alta fidelidad.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1500);
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
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Status: Maestro Consolidado</span>
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

            {/* DOCUMENTO DINÁMICO */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[1000px] mx-auto relative pb-32"
            >
                <div id="printable-document" className="relative bg-white text-black p-8 md:p-20 shadow-2xl rounded-[3rem] border border-slate-300 print:shadow-none print:border-none print:p-0 overflow-hidden">
                    
                    {/* Header Institucional */}
                    <div className="flex justify-between items-start mb-16 border-b-4 border-primary/10 pb-10">
                        <div className="flex items-center gap-6">
                            <Logo className="h-16 w-16" />
                            <div className="space-y-1">
                                <span className="font-black text-3xl tracking-tighter uppercase italic text-primary">System Kyron</span>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-black px-4 h-8 rounded-xl mb-3">Dossier de Ingeniería</Badge>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest italic">REF: KYRON-ZEDU-MASTER-PRO-2026</p>
                        </div>
                    </div>

                    {/* PARTE 1: EQUIPO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">1. Información del Equipo Técnico</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Nombre del Proyecto</p></div>
                                    <div className="p-6"><p className="text-base font-black uppercase italic text-primary">System Kyron</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Integrantes del Equipo</p></div>
                                    <div className="p-6 font-mono text-sm font-bold uppercase text-slate-800">
                                        Carlos Mattar • Sebastian Garrido • Marcos Sousa
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 border-t-[1.5px] border-black">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Institución Educativa</p></div>
                                    <div className="p-6 font-bold uppercase text-xs text-slate-700">Institución Educativa Gabriela Mistral</div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Localidad</p></div>
                                    <div className="p-6 font-bold uppercase text-xs text-slate-700">La Guaira, Catia La Mar, Venezuela</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 2: POBLACIÓN */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <Activity className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">2. Población a Trabajar</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Comunidad Beneficiaria</p></div>
                            <div className="p-6 border-b-[1.5px] border-black"><p className="text-sm font-bold uppercase text-slate-800">Comunidad de Santa Rosa de Lima, Caracas. Nodo de Alta Demanda Corporativa.</p></div>
                            <div className="grid grid-cols-3">
                                <div className="border-r-[1.5px] border-black p-6 text-center">
                                    <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Alcance Proyectado</p>
                                    <p className="text-3xl font-black italic text-secondary">1.500+</p>
                                </div>
                                <div className="col-span-2 p-6 font-mono text-[11px] font-bold uppercase leading-relaxed text-slate-600 text-justify">
                                    Personal administrativo, directivo y representantes con necesidad crítica de digitalización inmutable de expedientes, blindaje fiscal ante el SENIAT y conectividad 5G de baja latencia.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 3: ANÁLISIS DEL PROBLEMA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">3. Análisis del Problema</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white font-mono text-[11px]">
                            <div className="grid grid-cols-2">
                                <div className="border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Causas Detectadas</p></div>
                                    <div className="p-6 space-y-3 font-bold uppercase text-slate-700">
                                        <p>• Archivamiento 100% físico y manual.</p>
                                        <p>• Inexistencia de un nodo de datos centralizado.</p>
                                        <p>• Desconexión operativa entre departamentos.</p>
                                        <p>• Vulnerabilidad de activos ante siniestros físicos.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Consecuencias</p></div>
                                    <div className="p-6 italic font-bold uppercase text-slate-600 leading-relaxed text-justify">
                                        Retraso crítico en localización de datos, vulnerabilidad ante pérdida de expedientes históricos y alto riesgo de incumplimiento legal ante entes públicos.
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 bg-slate-50/30 border-t-[1.5px] border-black">
                                <p className="text-[13px] font-medium italic leading-relaxed text-justify border-l-8 border-primary/20 pl-8 text-slate-800">
                                    "En la Institución el sistema de archivado es muy pobre debido a que la gran mayoría de la información personal está archivada en papel y no en digital. Esta falta de digitalización inmutable compromete la integridad histórica y la eficiencia operativa."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 4: FACTIBILIDAD ECONÓMICA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <TrendingUp className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">4. Factibilidad Económica</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="p-8">
                                <div className="grid grid-cols-3 gap-6 mb-8 text-center">
                                    <div className="p-6 bg-primary/5 rounded-2xl border-2 border-primary/20">
                                        <p className="text-[9px] font-black uppercase text-primary/60 mb-2">VAN (Valor Actual)</p>
                                        <p className="text-xl font-black text-primary">$450.000</p>
                                    </div>
                                    <div className="p-6 bg-secondary/5 rounded-2xl border-2 border-secondary/20">
                                        <p className="text-[9px] font-black uppercase text-secondary/60 mb-2">TIR (Retorno)</p>
                                        <p className="text-xl font-black text-secondary">28.5%</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Recuperación</p>
                                        <p className="text-xl font-black text-slate-600">2.4 AÑOS</p>
                                    </div>
                                </div>
                                <p className="text-[11px] font-mono font-bold text-slate-500 text-center uppercase tracking-widest leading-relaxed">
                                    DICTAMEN TÉCNICO: El modelo SaaS permite una escalabilidad total con costos reducidos en un 40% anual gracias a la automatización mediante IA predictiva.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 5: DESARROLLA TU PROYECTO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Zap className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">5. Desarrolla tu Proyecto</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white font-mono text-[11px] leading-relaxed">
                            <div className="p-10 text-justify text-slate-800 space-y-6 bg-slate-50/30 border-b-[1.5px] border-black">
                                <p className="font-black text-primary text-base italic uppercase">Propuesta Maestra: AutoMind AI</p>
                                <p>System Kyron implementa **AutoMind AI**, una arquitectura de red síncrona que fusiona el protocolo Hyper-Connect 5G con una Bóveda de Datos Inmutable. Nuestra solución no solo digitaliza; blinda la operación institucional mediante inteligencia predictiva que monitorea la Gaceta Oficial 24/7.</p>
                                <p>A través de **Kyron Connect**, se asignan líneas de datos de alta velocidad para la transmisión de expedientes cifrados, mientras que las **Smart Bins** monetizan la sostenibilidad institucional mediante tecnología magnética de clasificación automática.</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Otras Propuestas (MOBIAN)</p></div>
                                    <div className="p-6 italic font-bold text-slate-600 uppercase leading-relaxed text-justify">
                                        Enfoques tradicionales basados únicamente en gestión administrativa convencional, sin integración de hardware inteligente ni sellado inmutable Blockchain.
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Diferenciadores Kyron</p></div>
                                    <div className="p-6 font-black text-primary uppercase space-y-2 italic">
                                        <p>• Especialización en Sector Escolar/Privado.</p>
                                        <p>• Chatbot Avanzado para Representantes.</p>
                                        <p>• Tecnología Magnética de Reciclaje Pro.</p>
                                        <p>• Provisión de Red 5G Corporativa SM-DP+.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 6: PRESUPUESTO OPERATIVO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <ShoppingCart className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">6. Presupuesto Operativo</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-100 border-b-[1.5px] border-black">
                                        <TableHead className="font-black text-[9px] uppercase text-slate-600 pl-6">Item de Inversión</TableHead>
                                        <TableHead className="text-center font-black text-[9px] uppercase text-slate-600">Cant.</TableHead>
                                        <TableHead className="text-right font-black text-[9px] uppercase text-slate-600">Costo (USD)</TableHead>
                                        <TableHead className="text-right font-black text-[9px] uppercase text-slate-600 pr-6">Lugar de Compra</TableHead>
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
                                        <TableCell colSpan={2} className="text-sm uppercase italic pl-6 py-6">Inversión Nodo Maestro Consolidada</TableCell>
                                        <TableCell className="text-right text-2xl text-primary font-black italic">{formatCurrency(budgetData.reduce((a,b) => a + b.cost, 0), 'USD')}</TableCell>
                                        <TableCell className="pr-6" />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* PARTE 7: ALIADOS Y RECURSOS */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Handshake className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">7. Aliados y Recursos</h2>
                        </div>
                        <div className="border-[1.5px] border-black rounded-[2rem] overflow-hidden bg-white shadow-md">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-100 border-b-[1.5px] border-black">
                                        <TableHead className="font-black text-[10px] uppercase text-primary tracking-widest pl-8 py-5">Institución / Aliado</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase text-primary tracking-widest pr-8 py-5">Tipo de Apoyo Estratégico</TableHead>
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
                    </div>

                    {/* PARTE 8: PLAN DE ACCIÓN */}
                    <div className="space-y-10 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <ClipboardCheck className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">8. Plan de Acción</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-[2rem] bg-white">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-100 border-b-[1.5px] border-black">
                                        <TableHead className="font-black text-[10px] uppercase text-slate-600 pl-8 py-5">Tareas a Realizar</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase text-slate-600 text-center">Responsable</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase text-slate-600 text-right pr-8">Cronograma (Fechas)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {actionPlanData.map((item, i) => (
                                        <TableRow key={i} className="border-b border-slate-100 last:border-0">
                                            <TableCell className="pl-8 py-5 text-[11px] font-bold text-slate-700 uppercase leading-relaxed text-justify">{item.task}</TableCell>
                                            <TableCell className="text-center text-[10px] font-black text-primary uppercase italic">{item.owner}</TableCell>
                                            <TableCell className="text-right pr-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Footer del Documento */}
                    <div className="mt-20 pt-16 border-t-4 border-slate-100 flex justify-between items-end">
                        <div className="flex items-center gap-6 group">
                            <div className="p-6 bg-primary text-white rounded-[2rem] shadow-glow rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <ShieldCheck className="h-10 w-10" />
                            </div>
                            <div className="space-y-1">
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
