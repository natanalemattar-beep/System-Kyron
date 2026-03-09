
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";

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
            
            const htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Arial', sans-serif; color: #334155; line-height: 1.5; }
                        .header-table { width: 100%; border-bottom: 3pt solid ${azul}; margin-bottom: 30px; }
                        .title { color: ${azul}; font-size: 24pt; font-weight: bold; text-transform: uppercase; margin: 0; }
                        .section-header { background-color: ${azul}; color: #ffffff; padding: 10px 15px; font-size: 12pt; font-weight: bold; margin-top: 25px; text-transform: uppercase; border-radius: 4px; }
                        .content-card { border: 1pt solid #e2e8f0; padding: 15px; background-color: #f8fafc; margin-top: 5px; border-radius: 8px; }
                        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                        th { background-color: #f1f5f9; color: ${azul}; padding: 10px; font-size: 9pt; text-align: left; border: 1pt solid #cbd5e1; font-weight: bold; }
                        td { padding: 10px; border: 1pt solid #e2e8f0; font-size: 9pt; background-color: #ffffff; }
                        .total-row { background-color: #f8fafc; font-weight: bold; }
                        .highlight-green { color: ${verde}; font-weight: bold; }
                        .footer { text-align: center; font-size: 8pt; color: #94a3b8; margin-top: 40px; border-top: 1pt solid #e2e8f0; padding-top: 15px; }
                        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 8pt; font-weight: bold; border: 1px solid #cbd5e1; margin-bottom: 10px; }
                    </style>
                </head>
                <body>
                    <table class="header-table">
                        <tr>
                            <td style="border:none; width: 70%;">
                                <h1 class="title">SYSTEM KYRON</h1>
                                <p style="font-size: 10pt; color: #64748b; font-weight: bold; margin-top: 5px;">Corporate Intelligence Hub • Expediente de Ingeniería</p>
                            </td>
                            <td style="border:none; text-align: right; width: 30%;">
                                <p style="font-size: 9pt; color: #2563eb; font-weight: bold; margin: 0;">REF: KYRON-ZEDU-2026</p>
                            </td>
                        </tr>
                    </table>

                    <div class="section-header">1. Información del Equipo Técnico</div>
                    <div class="content-card">
                        <p><b>PROYECTO:</b> SYSTEM KYRON • AUTOMIND AI</p>
                        <p><b>INTEGRANTES:</b> Carlos Mattar, Sebastian Garrido, Marcos Sousa</p>
                        <p><b>INSTITUCIÓN / UBICACIÓN:</b> U.E. Colegio 'Gabriela Mistral' • Catia la Mar, La Guaira</p>
                    </div>

                    <div class="section-header">2. Población a Trabajar</div>
                    <div class="content-card">
                        <p><b>COMUNIDAD:</b> Núcleo Institucional y Comercial de Catia la Mar</p>
                        <p><b>ALCANCE:</b> <span class="highlight-green">2.500 Nodos de Interacción (Comunidad Educativa y Pymes)</span></p>
                        <p><b>PERFIL:</b> Población con alta demanda de simplificación de trámites y seguridad de datos.</p>
                    </div>

                    <div class="section-header">3. Análisis del Problema</div>
                    <div class="content-card">
                        <p style="font-style: italic; color: #1e293b;">"Colapso del sistema de archivado físico y fragmentación de la data histórica, imposibilitando una gestión fiscal y legal eficiente."</p>
                        <p><b>CAUSAS:</b> Dependencia de registros manuales, falta de infraestructura 5G dedicada y ausencia de un ledger inmutable.</p>
                        <p><b>IMPORTANCIA:</b> La transición a una Bóveda Digital es vital para la soberanía administrativa del sector privado en La Guaira.</p>
                    </div>

                    <div class="section-header">4. Factibilidad Económica</div>
                    <table>
                        <tr><th style="width: 50%;">Indicador Clave</th><th style="text-align: right;">Métrica de Proyecto</th></tr>
                        <tr><td>VAN (Valor Actual Neto)</td><td style="text-align: right;" class="highlight-green">$ 485.000,00</td></tr>
                        <tr><td>TIR (Tasa Interna de Retorno)</td><td style="text-align: right;" class="highlight-green">31.2%</td></tr>
                        <tr><td>Payback (Retorno de Inversión)</td><td style="text-align: right;">2.1 Años</td></tr>
                        <tr><td>ROI (Retorno sobre Inversión)</td><td style="text-align: right;" class="highlight-green">340%</td></tr>
                    </table>
                    <div style="background-color: #ecfdf5; border: 1px solid #10b981; padding: 10px; border-radius: 5px;">
                        <p style="margin: 0; font-size: 9pt; color: #065f46;"><b>DICTAMEN:</b> Viabilidad Sobresaliente. El modelo SaaS permite escalabilidad total con costos operativos mínimos tras el despliegue del nodo.</p>
                    </div>

                    <div class="section-header">5. Desarrolla tu Proyecto (Solución)</div>
                    <div class="content-card">
                        <p><b>VISIÓN ESTRATÉGICA:</b> AutoMind AI: Inteligencia dirigida para el control total del ecosistema empresarial. Implementación de una infraestructura que integra conectividad 5G, hardware magnético y un motor de auditoría fiscal inmutable.</p>
                        <p><b>OTRAS PROPUESTAS:</b> A diferencia de MOBIAN, Kyron ofrece blindaje legal predictivo y trazabilidad de activos físicos mediante sensores de inducción.</p>
                        <p><b>DIFERENCIADORES CLAVE:</b><br/>
                        • Chatbot estratégico para atención al representante/cliente.<br/>
                        • Automatización de libros de compra/venta síncrona.<br/>
                        • Acceso biométrico 3D para bóveda de documentos.</p>
                    </div>

                    <div class="section-header">6. Presupuesto Operativo (CAPEX)</div>
                    <table>
                        <thead>
                            <tr>
                                <th>ITEM DE INVERSIÓN</th>
                                <th style="text-align: center;">CANT.</th>
                                <th style="text-align: right;">COSTO (USD)</th>
                                <th>ORIGEN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Infraestructura Kyron Connect 5G</td><td style="text-align: center;">1</td><td style="text-align: right;">$ 5.500,00</td><td>Nodo Central</td></tr>
                            <tr><td>Terminales Inteligentes de Gestión</td><td style="text-align: center;">10</td><td style="text-align: right;">$ 2.500,00</td><td>Hardware Lab</td></tr>
                            <tr><td>Módulo de Bóveda Digital Inmutable</td><td style="text-align: center;">1</td><td style="text-align: right;">$ 1.800,00</td><td>Cloud Ledger</td></tr>
                            <tr><td>Smart Bins (Magnetismo Síncrono)</td><td style="text-align: center;">4</td><td style="text-align: right;">$ 1.200,00</td><td>Engineering</td></tr>
                            <tr><td>Equipos Fiscales Homologados</td><td style="text-align: center;">2</td><td style="text-align: right;">$ 900,00</td><td>Fiscal Compliance</td></tr>
                            <tr class="total-row">
                                <td colspan="2">TOTAL INVERSIÓN PROYECTADA</td>
                                <td style="text-align: right; color: ${azul};">$ 11.900,00</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="section-header">7. Aliados y Recursos Estratégicos</div>
                    <div class="content-card">
                        <p><b>SAPI:</b> Certificación de Patentes y Propiedad Intelectual.</p>
                        <p><b>SENIAT:</b> Homologación de procesos de riesgo cero.</p>
                        <p><b>CONATEL:</b> Habilitación de Red 5G y servicios de datos.</p>
                        <p><b>Holding Kyron:</b> Respaldo de capital y soporte técnico master.</p>
                    </div>

                    <div class="section-header">8. Plan de Acción</div>
                    <table>
                        <thead>
                            <tr>
                                <th>FASE DE TAREA</th>
                                <th>RESPONSABLE</th>
                                <th style="text-align: right;">TIEMPO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Auditoría de campo en Catia la Mar</td><td>Equipo Técnico</td><td style="text-align: right;" class="highlight-green">Semana 1</td></tr>
                            <tr><td>Despliegue de Bóveda y Migración</td><td>C. Mattar</td><td style="text-align: right;" class="highlight-green">Semana 2</td></tr>
                            <tr><td>Activación de Nodos 5G y eSIM</td><td>S. Garrido</td><td style="text-align: right;" class="highlight-green">Semana 3</td></tr>
                            <tr><td>Certificación y Lanzamiento</td><td>Auditores Kyron</td><td style="text-align: right;" class="highlight-green">Semana 4</td></tr>
                        </tbody>
                    </table>

                    <div style="margin-top: 30px; border-top: 2pt solid #eee; padding-top: 20px;">
                        <p style="font-size: 10pt; font-weight: bold; color: ${azul};">CERTIFICACIÓN TÉCNICA: SYSTEM KYRON MASTER VALIDATED</p>
                    </div>

                    <div class="footer">
                        <p>Final del documento • 2026 • © System Kyron Corporate</p>
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_MAESTRO_ZEDU_KYRON.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({ 
                title: "EXPEDIENTE DESCARGADO", 
                description: "El dossier institucional ha sido generado con éxito.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 800);
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
                            <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
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
                        <Button onClick={handleDownload} disabled={isExporting} className="h-12 px-10 rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest">
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
                                <div><p className="text-[9px] font-black uppercase text-slate-400 mb-1">Proyecto</p><p className="text-sm font-black text-primary uppercase italic">SYSTEM KYRON • AUTOMIND AI</p></div>
                                <div><p className="text-[9px] font-black uppercase text-slate-400 mb-1">Integrantes</p><p className="text-sm font-bold text-slate-700">Carlos Mattar, Sebastian Garrido, Marcos Sousa</p></div>
                                <div className="md:col-span-2"><p className="text-[9px] font-black uppercase text-slate-400 mb-1">Institución / Ubicación</p><p className="text-sm font-bold text-slate-700">U.E. Colegio 'Gabriela Mistral' • Catia la Mar, La Guaira</p></div>
                            </div>
                        </section>

                        {/* 2. Población */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10 mb-6">
                                <Activity className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">2. Población a Trabajar</h2>
                            </div>
                            <div className="px-4 space-y-4">
                                <p className="text-sm font-bold text-slate-800">Núcleo Institucional y Comercial de Catia la Mar</p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                                        <p className="text-[9px] font-black uppercase text-secondary mb-1">Alcance</p>
                                        <p className="text-xl font-black text-secondary italic">2.500 Nodos de Interacción (Comunidad Educativa y Pymes)</p>
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 italic leading-relaxed">Población con alta demanda de simplificación de trámites y seguridad de datos.</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Diagnóstico */}
                        <section>
                            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-6">
                                <Terminal className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em]">3. Análisis del Problema</h2>
                            </div>
                            <div className="px-4 space-y-6">
                                <p className="text-sm font-bold italic text-slate-800 leading-relaxed">"Colapso del sistema de archivado físico y fragmentación de la data histórica, imposibilitando una gestión fiscal y legal eficiente."</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div><p className="text-[9px] font-black uppercase text-slate-400 mb-1">Causas</p><p className="text-xs font-medium text-slate-600">Dependencia de registros manuales, falta de infraestructura 5G dedicada y ausencia de un ledger inmutable.</p></div>
                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-[9px] font-black uppercase text-primary mb-2 italic">Importancia del Cambio</p>
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
                                    <div key={stat.label} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center shadow-sm">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{stat.label}</p>
                                        <p className={cn("text-lg font-black italic", stat.col)}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200 ml-4">
                                <b>Dictamen:</b> Viabilidad Sobresaliente. El modelo SaaS permite escalabilidad total con costos operativos mínimos tras el despliegue del nodo.
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
                                    <p className="text-sm font-black uppercase italic text-primary">Visión Estratégica</p>
                                    <p className="text-xs font-medium text-slate-600 leading-relaxed text-justify">AutoMind AI: Inteligencia dirigida para el control total del ecosistema empresarial. Implementación de una infraestructura que integra conectividad 5G, hardware magnético y un motor de auditoría fiscal inmutable.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-3 underline">Otras Propuestas</p>
                                        <p className="text-[10px] font-bold text-slate-500 italic">A diferencia de MOBIAN, Kyron ofrece blindaje legal predictivo y trazabilidad de activos físicos mediante sensores de inducción.</p>
                                    </div>
                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                                        <p className="text-[9px] font-black uppercase text-primary mb-3 underline">Diferenciadores Clave</p>
                                        <ul className="text-[10px] font-black uppercase text-slate-700 space-y-2">
                                            <li>• Chatbot estratégico para atención al representante/cliente.</li>
                                            <li>• Automatización de libros de compra/venta síncrona.</li>
                                            <li>• Acceso biométrico 3D para bóveda de documentos.</li>
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
                            <div className="border-[1.5px] border-black rounded-3xl overflow-hidden mx-4 shadow-sm">
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
                                        {[
                                            { item: "Infraestructura Kyron Connect 5G", qty: 1, cost: 5500, location: "Nodo Central" },
                                            { item: "Terminales Inteligentes de Gestión", qty: 10, cost: 2500, location: "Hardware Lab" },
                                            { item: "Módulo de Bóveda Digital Inmutable", qty: 1, cost: 1800, location: "Cloud Ledger" },
                                            { item: "Smart Bins (Magnetismo Síncrono)", qty: 4, cost: 1200, location: "Engineering" },
                                            { item: "Equipos Fiscales Homologados", qty: 2, cost: 900, location: "Fiscal Compliance" },
                                        ].map((row, i) => (
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
                            <div className="px-4 space-y-4">
                                {[
                                    { name: "SAPI", support: "Certificación de Patentes y Propiedad Intelectual." },
                                    { name: "SENIAT", support: "Homologación de procesos de riesgo cero." },
                                    { name: "CONATEL", support: "Habilitación de Red 5G y servicios de datos." },
                                    { name: "Holding Kyron", support: "Respaldo de capital y soporte técnico master." },
                                ].map((ally, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                                        <span className="text-xs font-black uppercase italic text-primary">{ally.name}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase">{ally.support}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 8. Plan de Acción */}
                        <section>
                            <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10 mb-6">
                                <ClipboardCheck className="h-5 w-5 text-secondary" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">8. Plan de Acción</h2>
                            </div>
                            <div className="border border-slate-200 rounded-3xl overflow-hidden mx-4 shadow-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="font-black text-[9px] uppercase pl-8 py-5">Fase de Tarea</TableHead>
                                            <TableHead className="font-black text-[9px] uppercase text-center">Responsable</TableHead>
                                            <TableHead className="font-black text-[9px] uppercase text-right pr-8">Tiempo</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { task: "Auditoría de campo en Catia la Mar", owner: "Equipo Técnico", date: "Semana 1" },
                                            { task: "Despliegue de Bóveda y Migración", owner: "C. Mattar", date: "Semana 2" },
                                            { task: "Activación de Nodos 5G y eSIM", owner: "S. Garrido", date: "Semana 3" },
                                            { task: "Certificación y Lanzamiento", owner: "Auditores Kyron", date: "Semana 4" },
                                        ].map((item, i) => (
                                            <TableRow key={i}>
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

                    <div className="mt-24 pt-16 border-t-4 border-slate-100 flex justify-between items-end">
                        <div className="flex items-center gap-6">
                            <ShieldCheck className="h-12 w-12 text-primary" />
                            <div className="text-left">
                                <p className="text-[9px] font-black uppercase text-slate-400">Certificación Técnica</p>
                                <p className="text-sm font-black uppercase italic text-primary leading-none">SYSTEM KYRON MASTER VALIDATED</p>
                            </div>
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-300 italic">Final del documento • 2026</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
