
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  ShoppingCart
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
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Expediente Maestro ZEDU Final - Sistema Kyron v2.6.5
 * Consolidación total de las 6 partes del modelo ZEDU con respuestas técnicas expandidas.
 * Estética UHD en Azul y Verde.
 */

const budgetData = [
    { item: "Infraestructura de Red 5G (Nodo Kyron Connect)", qty: 1, cost: 5000, location: "División Telecom" },
    { item: "Lote SIM Cards Físicas / Provisión eSIM", qty: 1000, cost: 1000, location: "Kyron Secure Hub" },
    { item: "Papeleras Inteligentes (Inducción Magnética)", qty: 5, cost: 1250, location: "Taller de Ingeniería" },
    { item: "Equipos Fiscales Homologados (Prov. 0071)", qty: 2, cost: 950, location: "Fiscal Solutions" },
    { item: "Licencia Anual Ecosistema AutoMind AI Pro", qty: 1, cost: 1500, location: "Cloud Vault" },
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
            const documentContent = document.getElementById('printable-document')?.innerHTML || '';
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Expediente Maestro ZEDU - System Kyron</title>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.5; color: #000; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 25px; border: 2pt solid #000; }
                        td, th { border: 1pt solid #000; padding: 12px; vertical-align: top; font-size: 10pt; }
                        .section-header { background-color: #f1f5f9; font-weight: 900; text-transform: uppercase; text-align: center; padding: 10px; border: 2pt solid #000; color: #1e40af; }
                        .label { font-weight: bold; text-transform: uppercase; color: #475569; font-size: 8pt; }
                        .value { font-weight: bold; color: #000; }
                    </style>
                </head>
                <body>
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="font-size: 24pt; text-transform: uppercase; margin: 0;">Expediente Maestro ZEDU</h1>
                        <p style="font-size: 10pt; color: #64748b;">NODO DE INTELIGENCIA CORPORATIVA v2.6.5</p>
                    </div>
                    ${documentContent}
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + header], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_ZEDU_FINAL_KYRON.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({
                title: "DOSSIER EXPORTADO",
                description: "Expediente Maestro descargado bajo protocolo de alta fidelidad.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1500);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020408] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative">
            
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
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Dossier: ZEDU-ULTIMATE</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Audit Ready • 2026</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all">
                            <Printer className="mr-3 h-4 w-4 text-primary" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} className="h-12 px-10 rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest shadow-glow">
                            {isExporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
                            DESCARGAR EXPEDIENTE
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* EXPEDIENTE MAESTRO */}
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
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-black px-4 h-8 rounded-xl mb-3">Expediente Verificado</Badge>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest italic">REF: KYRON-ZEDU-FINAL-2026</p>
                        </div>
                    </div>

                    {/* PARTE 1: EQUIPO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">1. Información del Equipo Técnico</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white">
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
                                    <div className="p-6 font-bold uppercase">Institución Educativa Gabriela Mistral</div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Localidad</p></div>
                                    <div className="p-6 font-bold uppercase">La Guaira, Catia La Mar, Venezuela</div>
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
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white">
                            <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Comunidad Beneficiaria</p></div>
                            <div className="p-6 border-b-[1.5px] border-black"><p className="text-sm font-bold uppercase text-slate-800">Santa Rosa de Lima, Caracas. Eje de Modernización Tecnológica.</p></div>
                            <div className="grid grid-cols-3">
                                <div className="border-r-[1.5px] border-black p-6 text-center">
                                    <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Usuarios Est.</p>
                                    <p className="text-3xl font-black italic text-secondary">1.500+</p>
                                </div>
                                <div className="col-span-2 p-6 font-mono text-[11px] font-bold uppercase leading-relaxed text-slate-600">
                                    Personal administrativo, directivo y representantes con necesidad de digitalización inmutable de expedientes y conectividad 5G.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 3: DIAGNÓSTICO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">3. Análisis del Problema</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white font-mono text-[11px]">
                            <div className="grid grid-cols-2">
                                <div className="border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Causas</p></div>
                                    <div className="p-6 space-y-3 font-bold uppercase text-slate-700">
                                        <p>• Archivamiento 100% físico y manual.</p>
                                        <p>• Inexistencia de un nodo de datos centralizado.</p>
                                        <p>• Desconexión entre departamentos administrativos.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Consecuencias</p></div>
                                    <div className="p-6 italic font-bold uppercase text-slate-600 leading-relaxed">
                                        Retraso crítico en la localización de documentos, vulnerabilidad ante pérdida de datos y alto riesgo de incumplimiento legal.
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-white border-t-[1.5px] border-black">
                                <p className="text-[13px] font-medium italic leading-relaxed text-justify border-l-8 border-primary/20 pl-8 text-slate-800">
                                    "La institución presenta un colapso operativo en la gestión de expedientes debido a un sistema de archivado pobre y obsoleto. Esta condición impide la agilidad administrativa y expone la información sensible a un deterioro irreversible."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 4: FACTIBILIDAD */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <TrendingUp className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">4. Factibilidad Económica</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white">
                            <div className="p-8">
                                <div className="grid grid-cols-3 gap-6 mb-8 text-center">
                                    <div className="p-6 bg-primary/5 rounded-2xl border-2 border-primary/20">
                                        <p className="text-[9px] font-black uppercase text-primary/60 mb-2">VAN</p>
                                        <p className="text-xl font-black text-primary">$450.000</p>
                                    </div>
                                    <div className="p-6 bg-secondary/5 rounded-2xl border-2 border-secondary/20">
                                        <p className="text-[9px] font-black uppercase text-secondary/60 mb-2">TIR</p>
                                        <p className="text-xl font-black text-secondary">28.5%</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2">ROI</p>
                                        <p className="text-xl font-black text-slate-600">2.4 AÑOS</p>
                                    </div>
                                </div>
                                <p className="text-[11px] font-mono font-bold text-slate-500 text-center uppercase tracking-widest">Dictamen: El modelo SaaS permite escalabilidad total con costos reducidos en un 40% anual.</p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 5: SOLUCIÓN MAESTRA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Zap className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">5. Desarrolla tu Proyecto (AutoMind AI)</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white font-mono text-[11px] leading-relaxed">
                            <div className="p-10 text-justify text-slate-800 space-y-6 bg-slate-50/30 border-b-[1.5px] border-black">
                                <p className="font-black text-primary text-base italic uppercase">Protocolo de Inteligencia Corporativa Kyron</p>
                                <p>System Kyron es el nodo maestro de un ecosistema diseñado para la transición hacia la economía digital 2026. Nuestra solución transforma el archivado físico en un entorno digital de alta fidelidad mediante una **Bóveda de Datos Inmutable**.</p>
                                <p>La arquitectura fusiona el protocolo **Hyper-Connect 5G** para baja latencia con tecnología de **Inducción Magnética** en puntos de recolección, monetizando la sostenibilidad y garantizando el blindaje fiscal automático mediante IA predictiva.</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Otras Propuestas (Mobian)</p></div>
                                    <div className="p-6 italic font-bold text-slate-600 uppercase">Se limitan a la gestión administrativa general sin integración de infraestructura física ni conectividad de datos propia.</div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500">Diferenciadores Kyron</p></div>
                                    <div className="p-6 font-black text-primary uppercase space-y-2 italic">
                                        <p>• Blindaje Fiscal IA 24/7.</p>
                                        <p>• Conectividad 5G Slicing.</p>
                                        <p>• Tecnología Magnética Pro.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 6: PRESUPUESTO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <ShoppingCart className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">6. Presupuesto Operativo</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl bg-white">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50 border-b-[1.5px] border-black">
                                        <TableHead className="font-black text-[9px] uppercase text-slate-600">Item de Inversión</TableHead>
                                        <TableHead className="text-center font-black text-[9px] uppercase text-slate-600">Cant.</TableHead>
                                        <TableHead className="text-right font-black text-[9px] uppercase text-slate-600">Costo (USD)</TableHead>
                                        <TableHead className="text-right font-black text-[9px] uppercase text-slate-600">Lugar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-slate-100 last:border-0">
                                            <TableCell className="text-[10px] font-bold uppercase">{row.item}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{row.qty}</TableCell>
                                            <TableCell className="text-right font-mono font-black text-primary">{formatCurrency(row.cost, 'USD')}</TableCell>
                                            <TableCell className="text-right text-[9px] italic text-slate-500 uppercase">{row.location}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/5 font-black border-t-[1.5px] border-black">
                                        <TableCell colSpan={2} className="text-sm uppercase italic">Inversión Maestro Total</TableCell>
                                        <TableCell className="text-right text-xl text-primary">{formatCurrency(budgetData.reduce((a,b) => a + b.cost, 0), 'USD')}</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Footer de Firmas */}
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
                </div>
            </motion.div>

            {/* HUD BORDERS */}
            <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
            <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
        </div>
    );
}
