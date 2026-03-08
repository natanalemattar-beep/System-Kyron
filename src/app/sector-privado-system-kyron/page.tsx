
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
  Cpu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Expediente Maestro ZEDU - Sistema Kyron v2.6.5
 * Consolidación total de Ingeniería, Factibilidad y Propuesta Técnica.
 */

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
                    <title>Expediente ZEDU - System Kyron Pro</title>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.4; color: #000; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        td, th { border: 1.5pt solid #000; padding: 10px; vertical-align: top; }
                        .section-title { background-color: #f0f7ff; font-weight: bold; text-transform: uppercase; font-size: 14pt; padding: 12px; border: 1.5pt solid #000; }
                        .label { font-weight: bold; font-size: 9pt; text-transform: uppercase; color: #444; }
                        .value { font-size: 11pt; font-weight: bold; }
                        .text-primary { color: #2563eb; }
                        .text-secondary { color: #22c55e; }
                    </style>
                </head>
                <body>
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="font-size: 22pt; text-transform: uppercase; margin: 0;">Expediente Maestro ZEDU</h1>
                        <p style="font-size: 10pt; color: #666;">SYSTEM KYRON • CORPORATE INTELLIGENCE NODE</p>
                    </div>
                    ${documentContent}
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + header], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_ZEDU_KYRON_FINAL.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({
                title: "EXPEDIENTE DESCARGADO",
                description: "Dossier corporativo generado con éxito.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1200);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020408] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative">
            
            {/* PANEL DE CONTROL HUD SUPERIOR */}
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 shadow-glow" />
                    
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all">
                            <Link href="/" className="flex items-center"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                        </Button>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Protocol: Master Node</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">Authorized: Mattar/Garrido/Sousa</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all">
                            <Printer className="mr-3 h-4 w-4 text-primary" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} className="h-12 px-10 rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest shadow-glow">
                            {isExporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
                            DESCARGAR EXPEDIENTE
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* EXPEDIENTE MAESTRO - CONTENIDO UHD */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[1000px] mx-auto relative"
            >
                {/* Glows de Identidad */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
                
                <div id="printable-document" className="relative bg-white text-black p-8 md:p-20 shadow-2xl rounded-[3rem] border border-slate-300 print:shadow-none print:border-none print:p-0 overflow-hidden">
                    
                    {/* Marca de Agua Técnica Kyron */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                        <Logo className="w-[800px] h-[800px] grayscale" />
                    </div>

                    {/* Encabezado Institucional Pro */}
                    <div className="flex justify-between items-start mb-16 border-b-4 border-primary/10 pb-10">
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <Logo className="h-16 w-16" />
                                <div className="space-y-1">
                                    <span className="font-black text-3xl tracking-tighter uppercase italic text-primary">System Kyron</span>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] leading-none">Intelligence Ecosystem</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-3">
                            <div className="px-5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Dossier Validado 2026</span>
                            </div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md">REF: ZEDU-MASTER-PRO-X1</p>
                        </div>
                    </div>

                    {/* PARTE 1: INFORMACIÓN DEL EQUIPO TÉCNICO */}
                    <div className="space-y-8 mb-20">
                        <div className="flex items-center gap-4 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                            <div className="p-2.5 bg-primary/10 rounded-lg"><Users className="h-6 w-6 text-primary" /></div>
                            <h2 className="text-lg font-black uppercase tracking-[0.3em] text-primary">1. Información del Equipo Técnico</h2>
                        </div>
                        
                        <div className="border-[2px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[2px] md:border-b-0 md:border-r-[2px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nombre del Proyecto</p>
                                    </div>
                                    <div className="p-6"><p className="text-base font-black uppercase italic text-primary">System Kyron</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Integrantes Principales</p>
                                    </div>
                                    <div className="p-6 font-mono text-sm font-bold uppercase leading-relaxed">
                                        <p>Carlos Mattar • Sebastian Garrido • Marcos Sousa</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 border-t-[2px] border-black">
                                <div className="border-b-[2px] md:border-b-0 md:border-r-[2px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Institución Educativa</p></div>
                                    <div className="p-6"><p className="text-base font-black uppercase text-slate-800">U.E.P. Gabriela Mistral</p></div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Ubicación Geoespacial</p></div>
                                    <div className="p-6"><p className="text-sm font-black uppercase italic text-slate-600">Catia La Mar, La Guaira, Venezuela</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 2: POBLACIÓN A TRABAJAR */}
                    <div className="space-y-8 mb-20">
                        <div className="flex items-center gap-4 bg-secondary/5 p-5 rounded-2xl border border-secondary/10">
                            <div className="p-2.5 bg-secondary/10 rounded-lg"><Activity className="h-6 w-6 text-secondary" /></div>
                            <h2 className="text-lg font-black uppercase tracking-[0.3em] text-secondary">2. Población a Trabajar</h2>
                        </div>
                        <div className="border-[2px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Localidad Específica y Comunidad</p></div>
                            <div className="p-6 border-b-[2px] border-black bg-white"><p className="text-base font-bold uppercase text-slate-800">Parroquia Catia La Mar, Comunidad Educativa Gabriela Mistral</p></div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[2px] md:border-b-0 md:border-r-[2px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Habitantes / Usuarios</p></div>
                                    <div className="p-6 text-center"><p className="text-3xl font-black text-secondary italic tracking-tighter">1.500+</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Descripción del Target</p></div>
                                    <div className="p-6 font-mono"><p className="text-[11px] font-bold uppercase text-slate-600 leading-relaxed">Estudiantes, personal administrativo y directivo con necesidad de modernización en la gestión de expedientes y servicios digitales 5G.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 3: ANÁLISIS DEL PROBLEMA */}
                    <div className="space-y-8 mb-20">
                        <div className="flex items-center gap-4 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                            <div className="p-2.5 bg-primary/10 rounded-lg"><Terminal className="h-6 w-6 text-primary" /></div>
                            <h2 className="text-lg font-black uppercase tracking-[0.3em] text-primary">3. Análisis del Problema (Diagnóstico)</h2>
                        </div>
                        <div className="border-[2px] border-black overflow-hidden rounded-3xl shadow-sm bg-white font-mono text-xs">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[2px] md:border-b-0 md:border-r-[2px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Causas Identificadas</p></div>
                                    <div className="p-6 space-y-3 font-bold text-slate-700 uppercase">
                                        <p>• Inexistencia de un nodo central de datos digital.</p>
                                        <p>• Dependencia crítica de procesos manuales y físicos.</p>
                                        <p>• Desconexión entre sistemas de facturación y almacén.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Consecuencias</p></div>
                                    <div className="p-6 italic font-bold uppercase text-slate-600 leading-relaxed">
                                        Vulnerabilidad ante pérdida de información, lentitud en la atención al cliente y riesgo de incumplimiento fiscal severo.
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 border-t-[2px] border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Definición Técnica del Problema</p></div>
                            <div className="p-8 bg-white">
                                <p className="text-[14px] font-medium italic leading-relaxed text-justify border-l-8 border-primary/20 pl-8 text-slate-800">
                                    "La institución presenta un colapso en la gestión administrativa debido a un sistema de archivado 100% físico y analógico. Esta condición impide la agilidad en la búsqueda de expedientes, genera duplicidad de tareas y expone los activos informativos a un deterioro irreversible."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 4: SOLUCIÓN PROPUESTA Y FACTIBILIDAD */}
                    <div className="space-y-8 mb-20">
                        <div className="flex items-center gap-4 bg-secondary/5 p-5 rounded-2xl border border-secondary/10">
                            <div className="p-2.5 bg-secondary/10 rounded-lg"><Zap className="h-6 w-6 text-secondary" /></div>
                            <h2 className="text-lg font-black uppercase tracking-[0.3em] text-secondary">4. Solución Propuesta y Factibilidad</h2>
                        </div>
                        <div className="border-[2px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="p-4 bg-slate-50 border-b-[2px] border-black"><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Desarrolla tu Proyecto (Ecosistema Kyron)</p></div>
                            <div className="p-10 bg-white font-mono text-sm leading-relaxed text-justify space-y-10">
                                <div className="space-y-4">
                                    <p className="font-black text-lg uppercase text-primary italic underline decoration-primary/20 underline-offset-8">Misión Crítica: Integración Digital 360°</p>
                                    <p className="text-slate-600 font-bold">
                                        Implementación de una Bóveda de Datos Inmutable con sellado Blockchain. El proyecto sustituye la burocracia física por una arquitectura SaaS escalable, integrando:
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 rounded-[2rem] bg-slate-50 border-[1.5px] border-black space-y-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Radio className="h-5 w-5 text-primary" />
                                            <span className="font-black text-xs uppercase tracking-tighter">Nodo 5G Slicing</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase leading-snug">Conectividad de baja latencia para la transmisión síncrona de datos administrativos.</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-slate-50 border-[1.5px] border-black space-y-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <ShieldCheck className="h-5 w-5 text-secondary" />
                                            <span className="font-black text-xs uppercase tracking-tighter">Fiscal AI Shield</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase leading-snug">Auditoría predictiva que garantiza el cumplimiento total ante normativas del SENIAT.</p>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Análisis de Factibilidad Económica</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-6 bg-primary/5 rounded-2xl border-2 border-primary/20 text-center">
                                            <p className="text-[9px] font-black uppercase text-primary/60 mb-2">VAN</p>
                                            <p className="text-xl font-black text-primary">$450.000</p>
                                        </div>
                                        <div className="p-6 bg-secondary/5 rounded-2xl border-2 border-secondary/20 text-center">
                                            <p className="text-[9px] font-black uppercase text-secondary/60 mb-2">TIR</p>
                                            <p className="text-xl font-black text-secondary">28.5%</p>
                                        </div>
                                        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 text-center">
                                            <p className="text-[9px] font-black uppercase text-slate-400 mb-2">PAYBACK</p>
                                            <p className="text-xl font-black text-slate-600">2.4 AÑOS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dictamen y Firma Técnica */}
                    <div className="mt-24 pt-16 border-t-4 border-slate-100 flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
                        <div className="flex items-center gap-6 group">
                            <div className="p-6 bg-primary text-white rounded-[2rem] shadow-glow-sm rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <ShieldCheck className="h-10 w-10" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Dictamen Técnico</p>
                                <p className="text-sm font-black uppercase italic text-primary leading-none">KYRON MASTER APPROVED</p>
                                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">Integridad de Datos: 100%</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">Signature Required for Execution</p>
                            <div className="w-64 h-16 border-b-2 border-slate-200 italic text-slate-300 text-xs flex items-end justify-center pb-3 font-serif">
                                Auth: System Kyron Admin Node
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Rejilla HUD Estética Lateral */}
            <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
            <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
        </div>
    );
}
