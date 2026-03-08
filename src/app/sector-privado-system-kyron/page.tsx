
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
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @fileOverview Expediente Maestro ZEDU - Ingeniería de Alta Fidelidad.
 * Remake estético total con identidad Kyron (Azul/Verde) y exportación institucional.
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
                        .header-table { border: none; margin-bottom: 40px; }
                        .header-table td { border: none; }
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

                    {/* Sello de Verificación Superior */}
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

                    {/* Título Principal */}
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-5xl font-black uppercase tracking-[0.2em] italic-shadow leading-none">
                            Modelo ZEDU
                        </h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] mt-4">Expediente de Ingeniería Maestro</p>
                    </div>

                    {/* SECCIÓN 1: INFORMACIÓN DEL EQUIPO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">1. Información del Equipo Técnico</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Proyecto</p>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-sm font-black uppercase italic text-primary">System Kyron</p>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Integrantes del Equipo</p>
                                    </div>
                                    <div className="p-5 font-mono">
                                        <p className="text-xs font-bold uppercase leading-relaxed">
                                            Carlos Mattar <span className="text-slate-300 mx-3">|</span> 
                                            Sebastian Garrido <span className="text-slate-300 mx-3">|</span> 
                                            Marcos Sousa
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 border-t-[1.5px] border-black">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Institución Educativa</p>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-sm font-black uppercase text-slate-800">U.E.P. Gabriela Mistral</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Ubicación Geográfica</p>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-bold uppercase italic text-slate-600">La Guaira, Catia La Mar, Venezuela</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 2: POBLACIÓN A TRABAJAR */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <Activity className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">2. Población a Trabajar</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm">
                            <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Localidad Específica / Comunidad</p>
                            </div>
                            <div className="p-5 border-b-[1.5px] border-black bg-white">
                                <p className="text-sm font-bold uppercase text-slate-800">Santa Rosa de Lima, Baruta, Caracas</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Habitantes (Est.)</p>
                                    </div>
                                    <div className="p-5 text-center">
                                        <p className="text-2xl font-black text-secondary italic">12.450</p>
                                    </div>
                                </div>
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black col-span-2">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Perfil Demográfico</p>
                                    </div>
                                    <div className="p-5 font-mono">
                                        <p className="text-[10px] font-bold uppercase leading-relaxed text-slate-600">Profesionales, Comerciantes y Sector Estudiantil de alto impacto tecnológico.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 3: ANÁLISIS DEL PROBLEMA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">3. Análisis del Problema</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm font-mono text-xs">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Causas del Problema</p>
                                    </div>
                                    <div className="p-5 space-y-2 uppercase font-bold text-slate-700">
                                        <p>• Falta de organización estructural</p>
                                        <p>• Poca disposición operativa</p>
                                        <p>• Escaso presupuesto asignado</p>
                                        <p>• Desactualización tecnológica severa</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Consecuencias</p>
                                    </div>
                                    <div className="p-5 italic font-bold uppercase text-slate-600 leading-relaxed">
                                        Pérdida crítica de tiempo en la búsqueda de archivos y parálisis administrativa por burocracia física.
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-50 border-t-[1.5px] border-b-[1.5px] border-black">
                                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Definición del Problema</p>
                            </div>
                            <div className="p-6 border-b-[1.5px] border-black bg-white">
                                <p className="text-[13px] font-medium italic leading-relaxed text-justify border-l-4 border-primary/20 pl-6 text-slate-800">
                                    "En la Institución el sistema de archivado es muy pobre, ya que el método de archivado es netamente físico. Esto no permite agilidad a la hora de buscar información respecto a un estudiante de la institución."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Importancia de Resolver</p>
                                    </div>
                                    <div className="p-5 uppercase font-bold text-primary italic">
                                        Disminuir drásticamente la carga de trabajo y optimizar el acceso a la información institucional.
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Origen del Problema</p>
                                    </div>
                                    <div className="p-5 uppercase font-bold text-slate-400">
                                        Desactualización e ignorancia en la gestión de nuevas tecnologías e implementaciones digitales masivas.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 4: SOLUCIÓN PROPUESTA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <Zap className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">4. Solución Propuesta</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm">
                            <div className="p-3 bg-slate-50 border-b-[1.5px] border-black">
                                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Desarrolla tu Proyecto</p>
                            </div>
                            <div className="p-8 bg-white font-mono text-sm leading-relaxed text-justify space-y-6">
                                <p className="font-bold uppercase text-slate-800">
                                    Implementación de un Ecosistema Digital de Grado Corporativo bajo el protocolo <span className="text-primary">System Kyron</span>.
                                </p>
                                <p className="text-slate-600 font-medium">
                                    La solución propuesta sustituye el archivado físico mediante la creación de una <span className="font-bold">Bóveda de Datos Inmutable</span>. Este sistema utiliza inteligencia artificial para la digitalización y clasificación automática de expedientes estudiantiles, permitiendo búsquedas instantáneas mediante terminales seguras. Se integrará conectividad 5G de baja latencia para garantizar la operatividad del nodo y se implementará un sellado digital por cada registro para asegurar la integridad legal de los documentos ante fiscalizaciones y auditorías.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                        <p className="text-[8px] font-black uppercase text-primary mb-2">Pilar Técnico</p>
                                        <p className="text-[10px] font-bold uppercase text-slate-500 leading-tight">Digitalización con Visión Artificial y Ledger Blockchain.</p>
                                    </div>
                                    <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                                        <p className="text-[8px] font-black uppercase text-secondary mb-2">Impacto Directo</p>
                                        <p className="text-[10px] font-bold uppercase text-slate-500 leading-tight">Reducción del 95% en tiempos de gestión administrativa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Técnico */}
                    <div className="mt-20 pt-12 border-t-2 border-slate-100 flex justify-between items-end no-print">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 rotate-3 shadow-inner">
                                <ShieldCheck className="h-8 w-8 text-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400">Certificación de Nodo</p>
                                <p className="text-xs font-black uppercase italic text-primary">ZEDU MASTER APPROVED</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 mb-2">Signature Required</p>
                            <div className="w-48 h-12 border-b-2 border-slate-300 italic text-slate-300 text-xs flex items-end justify-center pb-2">Auth: Kyron Admin Node</div>
                        </div>
                    </div>

                    <div className="mt-12 text-[8px] font-black uppercase tracking-[0.6em] text-slate-300 flex justify-between items-center">
                        <span className="flex items-center gap-2"><Database className="h-3 w-3 opacity-40" /> Página 4 de 12 • Propuesta Técnica</span>
                        <span className="text-slate-200 font-mono">Kyron Master Ledger © 2026</span>
                    </div>
                </div>
            </motion.div>

            {/* Créditos Finales HUD */}
            <div className="mt-24 text-center space-y-6 pb-20 no-print">
                <div className="flex justify-center gap-12 opacity-30">
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.5em] text-primary"><Lock className="h-3.5 w-3.5" /> Encrypted</span>
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.5em] text-secondary"><Activity className="h-3.5 w-3.5" /> 5G Slicing</span>
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.5em] text-white"><Sparkles className="h-3.5 w-3.5" /> AI Engine</span>
                </div>
                <div className="text-[8px] font-bold text-white/5 uppercase tracking-[1em]">SYSTEM KYRON CORPORATE DOSSIER</div>
            </div>
        </div>
    );
}
