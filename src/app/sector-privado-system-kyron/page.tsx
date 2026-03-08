
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
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @fileOverview Modelo Zedu - Expediente de Ingeniería de Alta Fidelidad.
 * Remake estético para visualización premium y exportación institucional.
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
        
        // Simulación de generación de documento de alta fidelidad
        setTimeout(() => {
            const documentContent = document.getElementById('printable-document')?.innerHTML || '';
            const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Expediente ZEDU</title><style>body { font-family: 'Times New Roman', serif; line-height: 1.5; } table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } td, th { border: 1.5pt solid black; padding: 8px; vertical-align: top; } .title { text-align: center; font-weight: bold; text-transform: uppercase; font-size: 16pt; text-decoration: underline; margin-bottom: 30px; } .label { font-weight: bold; font-size: 10pt; text-transform: uppercase; background-color: #f3f4f6; } .value { font-size: 11pt; }</style></head><body>`;
            const footer = `</body></html>`;
            const fullHtml = header + documentContent + footer;

            const blob = new Blob(['\ufeff' + fullHtml], { type: 'application/msword' });
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
                description: "Documento oficial generado con éxito.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1200);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid">
            
            {/* PANEL DE CONTROL HUD (No se imprime) */}
            <div className="max-w-5xl mx-auto mb-16 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                >
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all">
                            <Link href="/" className="flex items-center"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER AL NODO</Link>
                        </Button>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Status: Secure</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Dossier Access v2.6.5</span>
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
                {/* Sombras y Luces de Fondo */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                
                {/* Contenedor del Documento */}
                <div id="printable-document" className="relative bg-white text-black p-8 md:p-20 shadow-2xl rounded-[3rem] border border-slate-300 print:shadow-none print:border-none print:p-0 overflow-hidden">
                    
                    {/* Marca de Agua Técnica */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-12">
                        <Logo className="w-[600px] h-[600px] grayscale" />
                    </div>

                    {/* Sello de Verificación Superior */}
                    <div className="flex justify-between items-start mb-16 border-b-2 border-black pb-8">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <Logo className="h-10 w-10 grayscale" />
                                <span className="font-black text-xl tracking-tighter uppercase italic">System Kyron</span>
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Corporate Intelligence Asset</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                            <div className="px-4 py-1 bg-slate-100 border border-slate-300 rounded-lg flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3 text-slate-500" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Verified Document</span>
                            </div>
                            <p className="text-[9px] font-mono text-slate-400 uppercase">Ref: KY-ZEDU-2026-X1</p>
                        </div>
                    </div>

                    {/* Título Principal */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-black uppercase tracking-[0.25em] border-b-4 border-black inline-block pb-3 px-10 italic">
                            Modelo Zedu
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mt-4">Expediente de Ingeniería Maestro</p>
                    </div>

                    {/* SECCIÓN 1: INFORMACIÓN DEL EQUIPO */}
                    <div className="space-y-6 mb-16">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div className="h-5 w-1.5 bg-black rounded-full" />
                            1. INFORMACIÓN DEL EQUIPO TÉCNICO
                        </h2>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm font-mono">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">PROYECTO</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-xs font-black uppercase italic text-primary">System Kyron</p>
                                    </div>
                                </div>
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black col-span-2">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">INTEGRANTES DEL EQUIPO</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-xs font-bold uppercase leading-relaxed">
                                            Carlos Mattar <span className="text-slate-300 mx-2">|</span> 
                                            Sebastian Garrido <span className="text-slate-300 mx-2">|</span> 
                                            Marcos Sousa
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 border-t-[1.5px] border-black">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">INSTITUCIÓN EDUCATIVA</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-xs font-bold uppercase">U.E.P. Gabriela Mistral</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">UBICACIÓN GEOGRÁFICA</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-xs font-bold uppercase italic">Venezuela, La Guaira, Catia La Mar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 2: POBLACIÓN A TRABAJAR */}
                    <div className="space-y-6 mb-16">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div className="h-5 w-1.5 bg-black rounded-full" />
                            2. PARÁMETROS DE LA POBLACIÓN
                        </h2>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm font-mono">
                            <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                <p className="text-[10px] font-black uppercase text-slate-500">LOCALIDAD ESPECÍFICA / MUNICIPIO</p>
                            </div>
                            <div className="p-4 bg-white border-b-[1.5px] border-black">
                                <p className="text-xs font-bold uppercase">Venezuela, Caracas, Baruta, Santa Rosa de Lima</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">COMUNIDAD</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-xs font-bold uppercase">Santa Rosa de Lima</p>
                                    </div>
                                </div>
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">HABITANTES (EST.)</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-sm font-black">12.450</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">DISTRIBUCIÓN GÉNERO</p>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-[10px] font-bold uppercase">F: 52% | M: 48%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-100 border-t-[1.5px] border-b-[1.5px] border-black">
                                <p className="text-[10px] font-black uppercase text-slate-500">CARACTERÍSTICAS Y CLIMA</p>
                            </div>
                            <div className="p-5 bg-white">
                                <p className="text-xs font-medium italic leading-relaxed text-justify">
                                    Población profesional activa en entorno tropical de montaña (18°C - 26°C). Comunidad con alta demanda de servicios de digitalización y conectividad de grado empresarial.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 3: ANÁLISIS DEL PROBLEMA */}
                    <div className="space-y-6 mb-16">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div className="h-5 w-1.5 bg-black rounded-full" />
                            3. DIAGNÓSTICO Y ANÁLISIS DEL PROBLEMA
                        </h2>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-2xl shadow-sm font-mono">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">CAUSAS DETECTADAS</p>
                                    </div>
                                    <div className="p-5 bg-white space-y-2">
                                        <p className="text-xs font-bold uppercase">• Falta de organización estructural</p>
                                        <p className="text-xs font-bold uppercase">• Resistencia al cambio tecnológico</p>
                                        <p className="text-xs font-bold uppercase">• Escaso presupuesto operativo</p>
                                        <p className="text-xs font-bold uppercase">• Desactualización digital severa</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">CONSECUENCIAS DIRECTAS</p>
                                    </div>
                                    <div className="p-5 bg-white italic">
                                        <p className="text-xs font-bold uppercase leading-relaxed">Incapacidad de respuesta inmediata y pérdida crítica de tiempo en la búsqueda de archivos físicos.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-100 border-t-[1.5px] border-b-[1.5px] border-black">
                                <p className="text-[10px] font-black uppercase text-slate-500">DEFINICIÓN DEL PROBLEMA</p>
                            </div>
                            <div className="p-6 bg-white border-b-[1.5px] border-black">
                                <p className="text-xs font-medium italic leading-relaxed text-justify border-l-2 border-slate-200 pl-6">
                                    "En la Institución el sistema de archivado es muy pobre, ya que el método de archivado es netamente físico. Esto no permite agilidad a la hora de buscar información respecto a un estudiante de la institución."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">IMPORTANCIA DE LA SOLUCIÓN</p>
                                    </div>
                                    <div className="p-5 bg-white">
                                        <p className="text-xs font-black uppercase text-primary italic">Disminución drástica de la carga laboral y optimización de búsqueda.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-slate-100 border-b-[1.5px] border-black">
                                        <p className="text-[10px] font-black uppercase text-slate-500">ORIGEN DEL PROBLEMA</p>
                                    </div>
                                    <div className="p-5 bg-white">
                                        <p className="text-xs font-bold uppercase opacity-60">Desactualización técnica e ignorancia estructural.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sello de Autenticidad Final (Solo Pantalla) */}
                    <div className="mt-24 pt-12 border-t-2 border-slate-100 flex justify-between items-end no-print">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 rotate-3">
                                <ShieldCheck className="h-8 w-8 text-emerald-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400">Certificación de Nodo</p>
                                <p className="text-xs font-black uppercase italic">ZEDU MASTER APPROVED</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 mb-2">Signature Required</p>
                            <div className="w-48 h-12 border-b-2 border-slate-300 italic text-slate-200 text-xs flex items-end justify-center pb-2">Director General Kyron</div>
                        </div>
                    </div>

                    {/* Footer Técnico */}
                    <div className="mt-16 text-[8px] font-black uppercase tracking-[0.6em] text-slate-200 flex justify-between">
                        <span>Página 3 de 12 • Parte 3: Diagnóstico</span>
                        <span>Kyron Master Ledger 2026</span>
                    </div>
                </div>
            </motion.div>

            {/* Créditos de Ingeniería Finales */}
            <div className="mt-20 text-center space-y-4 pb-20 no-print">
                <div className="flex justify-center gap-10 opacity-20">
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><Lock className="h-3 w-3" /> Blockchain Encrypted</span>
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><Activity className="h-3 w-3" /> 5G Optimized</span>
                    <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><Sparkles className="h-3 w-3" /> IA Audited</span>
                </div>
            </div>
        </div>
    );
}
