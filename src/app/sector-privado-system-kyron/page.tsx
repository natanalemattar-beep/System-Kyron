
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
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Expediente Maestro ZEDU - Ingeniería de Alta Fidelidad.
 * Estructura de 4 partes basada en el modelo oficial con colores azul/verde Kyron.
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
                    <title>Expediente ZEDU - System Kyron</title>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.4; color: #000; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        td, th { border: 1.5pt solid #000; padding: 10px; vertical-align: top; }
                        .section-title { background-color: #f0f7ff; font-weight: bold; text-transform: uppercase; font-size: 14pt; padding: 12px; border: 1.5pt solid #000; }
                        .label { font-weight: bold; font-size: 9pt; text-transform: uppercase; color: #444; }
                        .value { font-size: 11pt; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="font-size: 22pt; text-transform: uppercase; margin: 0;">Expediente Maestro ZEDU</h1>
                        <p style="font-size: 10pt; color: #666;">SYSTEM KYRON CORPORATE INTELLIGENCE</p>
                    </div>
                    ${documentContent}
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + header], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_ZEDU_KYRON_PRO.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({
                title: "EXPEDIENTE DESCARGADO",
                description: "Documento institucional generado exitosamente.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1200);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020408] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid">
            
            {/* PANEL DE CONTROL HUD */}
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
                    
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all">
                            <Link href="/" className="flex items-center"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                        </Button>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Protocol: Secure</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">Dossier Auth v2.6.5</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all">
                            <Printer className="mr-3 h-4 w-4 text-primary" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} className="h-12 px-10 rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest shadow-glow">
                            {isExporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
                            DESCARGAR (.DOC)
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* EXPEDIENTE - DISEÑO DE ALTA FIDELIDAD */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[900px] mx-auto relative group"
            >
                {/* Glows de Identidad */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
                
                <div id="printable-document" className="relative bg-white text-black p-8 md:p-20 shadow-2xl rounded-[3rem] border border-slate-300 print:shadow-none print:border-none print:p-0 overflow-hidden">
                    
                    {/* Marca de Agua Técnica */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-12">
                        <Logo className="w-[600px] h-[600px] grayscale" />
                    </div>

                    {/* Encabezado Institucional */}
                    <div className="flex justify-between items-start mb-12 border-b-2 border-primary/20 pb-8">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <Logo className="h-12 w-12" />
                                <span className="font-black text-2xl tracking-tighter uppercase italic text-primary">System Kyron</span>
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-1">Corporate Intelligence Node</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                            <div className="px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Verified by Master Node</span>
                            </div>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">EXP: KY-ZEDU-2026-X1</p>
                        </div>
                    </div>

                    {/* PARTE 1: INFORMACIÓN DEL EQUIPO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">1. Información del Equipo Técnico</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Proyecto</p>
                                    </div>
                                    <div className="p-5"><p className="text-sm font-black uppercase italic text-primary">System Kyron</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Integrantes</p>
                                    </div>
                                    <div className="p-5 font-mono">
                                        <p className="text-xs font-bold uppercase">Carlos Mattar, Sebastian Garrido, Marcos Sousa</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 border-t-[1.5px] border-black">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Institución</p></div>
                                    <div className="p-5"><p className="text-sm font-black uppercase text-slate-800">U.E.P. Gabriela Mistral</p></div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Lugar</p></div>
                                    <div className="p-5"><p className="text-xs font-bold uppercase italic text-slate-600">La Guaira, Catia La Mar, Venezuela</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 2: POBLACIÓN A TRABAJAR */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <Activity className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">2. Población a Trabajar</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm">
                            <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Localidad y Comunidad</p></div>
                            <div className="p-5 border-b-[1.5px] border-black bg-white"><p className="text-sm font-bold uppercase text-slate-800">Santa Rosa de Lima, Baruta, Caracas</p></div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Habitantes</p></div>
                                    <div className="p-5 text-center"><p className="text-2xl font-black text-secondary italic">12.450</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Perfil</p></div>
                                    <div className="p-5 font-mono"><p className="text-[10px] font-bold uppercase text-slate-600">Sector Comercial y Residencial de alto impacto tecnológico.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 3: ANÁLISIS DEL PROBLEMA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">3. Análisis del Problema (Diagnóstico)</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm font-mono text-xs">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Causas</p></div>
                                    <div className="p-5 space-y-2 font-bold text-slate-700 uppercase"><p>• Falta de organización estructural</p><p>• Poca disposición operativa</p><p>• Desactualización tecnológica</p></div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Consecuencias</p></div>
                                    <div className="p-5 italic font-bold uppercase text-slate-600">Pérdida crítica de tiempo y parálisis administrativa por burocracia física.</div>
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 border-t-[1.5px] border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Definición del Problema</p></div>
                            <div className="p-6 bg-white border-b-[1.5px] border-black">
                                <p className="text-[13px] font-medium italic leading-relaxed text-justify border-l-4 border-primary/20 pl-6 text-slate-800">
                                    "En la Institución el sistema de archivado es muy pobre, ya que el método de archivado es netamente físico. Esto no permite agilidad a la hora de buscar información respecto a un estudiante."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 4: SOLUCIÓN PROPUESTA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <Zap className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">4. Solución Propuesta</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm">
                            <div className="p-3 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Desarrolla tu Proyecto</p></div>
                            <div className="p-8 bg-white font-mono text-sm leading-relaxed text-justify space-y-6">
                                <p className="font-bold uppercase text-slate-800">Implementación de un Ecosistema Digital de Grado Corporativo bajo el protocolo <span className="text-primary">System Kyron</span>.</p>
                                <p className="text-slate-600 font-medium italic">
                                    Se propone la sustitución del archivado físico mediante una Bóveda de Datos Inmutable. Se integrará conectividad 5G de baja latencia y sellado digital por cada registro, asegurando la integridad legal de los documentos y reduciendo el tiempo de gestión administrativa en un 95%.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN ADICIONAL: FACTIBILIDAD ECONÓMICA (AZUL/VERDE) */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Análisis de Factibilidad Económica</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "VAN", val: "$450.000", desc: "Rentabilidad Neta", color: "text-primary" },
                                { label: "TIR", val: "28.5%", desc: "Retorno Anual", color: "text-secondary" },
                                { label: "PAYBACK", val: "2.4 Años", desc: "Recuperación", color: "text-primary" }
                            ].map(item => (
                                <div key={item.label} className="p-6 rounded-2xl border-[1.5px] border-black bg-white flex flex-col items-center text-center">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">{item.label}</p>
                                    <p className={cn("text-2xl font-black italic", item.color)}>{item.val}</p>
                                    <p className="text-[8px] font-bold uppercase text-slate-300 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Técnico */}
                    <div className="mt-20 pt-12 border-t-2 border-slate-100 flex justify-between items-end no-print">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 rotate-3 shadow-inner">
                                <ShieldCheck className="h-8 w-8 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400">Certificación</p>
                                <p className="text-xs font-black uppercase italic text-primary">ZEDU MASTER APPROVED</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 mb-2">Signature Required</p>
                            <div className="w-48 h-12 border-b-2 border-slate-300 italic text-slate-300 text-xs flex items-end justify-center pb-2">Auth: Kyron Admin Node</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
