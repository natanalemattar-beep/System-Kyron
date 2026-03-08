
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
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Expediente Maestro ZEDU - Sistema Kyron v2.6.5
 * Consolidación total de las 5 partes del modelo ZEDU con respuestas técnicas expandidas.
 * Estética UHD en Azul y Verde.
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
                    <title>Expediente ZEDU - System Kyron Master</title>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.5; color: #000; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 25px; border: 2pt solid #000; }
                        td, th { border: 1pt solid #000; padding: 12px; vertical-align: top; }
                        .header-cell { background-color: #f8fafc; font-weight: bold; text-transform: uppercase; font-size: 10pt; color: #1e293b; }
                        .section-title { background-color: #eff6ff; font-weight: 900; text-transform: uppercase; font-size: 14pt; padding: 15px; border: 2pt solid #000; color: #1d4ed8; text-align: center; }
                        .content-text { font-size: 11pt; text-align: justify; }
                        .label { font-weight: bold; font-size: 9pt; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
                        .value { font-size: 11pt; font-weight: bold; color: #0f172a; }
                        .text-primary { color: #2563eb; }
                        .text-secondary { color: #16a34a; }
                        .footer-signature { margin-top: 50px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="font-size: 26pt; text-transform: uppercase; margin: 0; color: #1e3a8a;">Expediente Maestro ZEDU</h1>
                        <p style="font-size: 11pt; color: #64748b; letter-spacing: 2px;">SYSTEM KYRON • CORPORATE INTELLIGENCE NODE v2.6.5</p>
                    </div>
                    ${documentContent}
                    <div class="footer-signature">
                        <p>_________________________________</p>
                        <p style="font-size: 10pt; font-weight: bold;">Firma del Responsable del Nodo</p>
                        <p style="font-size: 8pt; color: #94a3b8;">Auth ID: KYRON-SECURE-2026</p>
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + header], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "EXPEDIENTE_ZEDU_KYRON_V2.6.5.doc";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            toast({
                title: "DOSSIER GENERADO",
                description: "Expediente Maestro exportado bajo protocolo de alta fidelidad.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 1500);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020408] text-white p-4 md:p-12 font-sans selection:bg-primary/20 hud-grid relative">
            
            {/* PANEL DE CONTROL HUD */}
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
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Status: Final Audit</span>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">Authorized: Mattar/Garrido/Sousa</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-12 px-8 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all">
                            <Printer className="mr-3 h-4 w-4 text-primary" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} className="h-12 px-10 rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest shadow-glow">
                            {isExporting ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <Download className="mr-3 h-4 w-4" />}
                            DESCARGAR EXPEDIENTE (.DOC)
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* EXPEDIENTE MAESTRO - CONTENIDO UHD */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[1000px] mx-auto relative pb-32"
            >
                {/* Glows de Identidad */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
                
                <div id="printable-document" className="relative bg-white text-black p-8 md:p-20 shadow-2xl rounded-[3rem] border border-slate-300 print:shadow-none print:border-none print:p-0 overflow-hidden">
                    
                    {/* Marca de Agua Kyron */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                        <Logo className="w-[800px] h-[800px] grayscale" />
                    </div>

                    {/* Encabezado Institucional UHD */}
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
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Dossier Certificado 2026</span>
                            </div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md">PROTOCOLO: ZEDU-MASTER-ULTIMATE</p>
                        </div>
                    </div>

                    {/* PARTE 1: EQUIPO TÉCNICO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">1. Información del Equipo Técnico</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Nombre del Proyecto</p>
                                    </div>
                                    <div className="p-6"><p className="text-base font-black uppercase italic text-primary">System Kyron</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Integrantes del Equipo Maestro</p>
                                    </div>
                                    <div className="p-6 font-mono text-sm font-bold uppercase leading-relaxed text-slate-800">
                                        <p>Carlos Mattar • Sebastian Garrido • Marcos Sousa</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 border-t-[1.5px] border-black">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Institución Educativa Aliada</p></div>
                                    <div className="p-6"><p className="text-base font-black uppercase text-slate-800">Institución Educativa Gabriela Mistral</p></div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Localidad Geográfica</p></div>
                                    <div className="p-6"><p className="text-sm font-black uppercase italic text-slate-600">La Guaira, Catia La Mar, Venezuela</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 2: POBLACIÓN */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <Activity className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">2. Población a Trabajar</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Localidad Específica y Comunidad Beneficiaria</p></div>
                            <div className="p-6 border-b-[1.5px] border-black bg-white"><p className="text-base font-bold uppercase text-slate-800">Santa Rosa de Lima, Caracas. Eje Estratégico de Desarrollo Económico.</p></div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Estimación de Usuarios</p></div>
                                    <div className="p-6 text-center"><p className="text-3xl font-black text-secondary italic tracking-tighter">1.500+</p></div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Perfil Demográfico del Nodo</p></div>
                                    <div className="p-6 font-mono"><p className="text-[11px] font-bold uppercase text-slate-600 leading-relaxed">Estudiantes, personal administrativo y directivo con necesidad crítica de modernización en la gestión de expedientes y servicios 5G.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 3: DIAGNÓSTICO */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Terminal className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">3. Análisis del Problema (Diagnóstico)</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white font-mono text-[11px]">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Causas del Colapso Operativo</p></div>
                                    <div className="p-6 space-y-3 font-bold text-slate-700 uppercase">
                                        <p>• Inexistencia de un nodo central de datos digital.</p>
                                        <p>• Dependencia absoluta de procesos manuales físicos.</p>
                                        <p>• Vulnerabilidad crítica ante pérdida de activos.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Consecuencias Ejecutivas</p></div>
                                    <div className="p-6 italic font-bold uppercase text-slate-600 leading-relaxed">
                                        Retraso en la toma de decisiones, duplicidad de tareas administrativas y riesgo de incumplimiento legal ante auditorías externas.
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 border-t-[1.5px] border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Definición Técnica del Problema</p></div>
                            <div className="p-8 bg-white">
                                <p className="text-[14px] font-medium italic leading-relaxed text-justify border-l-8 border-primary/20 pl-8 text-slate-800">
                                    "La institución presenta un colapso en la gestión de expedientes debido a un sistema de archivado 100% físico. Esta condición impide la agilidad en la búsqueda de documentos y expone la información a un deterioro irreversible."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 4: FACTIBILIDAD */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
                            <TrendingUp className="h-5 w-5 text-secondary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">4. Factibilidad Económica</h2>
                        </div>
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white">
                            <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Análisis Financiero del Proyecto</p></div>
                            <div className="p-8">
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <div className="p-6 bg-primary/5 rounded-2xl border-2 border-primary/20 text-center">
                                        <p className="text-[9px] font-black uppercase text-primary/60 mb-2">VAN Proyectado</p>
                                        <p className="text-xl font-black text-primary">$450.000</p>
                                    </div>
                                    <div className="p-6 bg-secondary/5 rounded-2xl border-2 border-secondary/20 text-center">
                                        <p className="text-[9px] font-black uppercase text-secondary/60 mb-2">TIR Estándar</p>
                                        <p className="text-xl font-black text-secondary">28.5%</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 text-center">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-2">PAYBACK</p>
                                        <p className="text-xl font-black text-slate-600">2.4 AÑOS</p>
                                    </div>
                                </div>
                                <p className="text-[11px] font-mono font-bold text-slate-500 text-center uppercase tracking-widest">Dictamen: El modelo SaaS permite una escalabilidad inmediata con costos operativos reducidos en un 40%.</p>
                            </div>
                        </div>
                    </div>

                    {/* PARTE 5: SOLUCIÓN MAESTRA */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <Zap className="h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em]">5. Desarrolla tu Proyecto</h2>
                        </div>
                        
                        <div className="border-[1.5px] border-black overflow-hidden rounded-3xl shadow-sm bg-white font-mono text-[11px] leading-relaxed">
                            <div className="p-8 text-justify text-slate-800 space-y-6 border-b-[1.5px] border-black bg-slate-50/30">
                                <p className="font-bold text-[13px] text-primary uppercase italic mb-4">Ecosistema Intelligence: Protocolo AutoMind AI</p>
                                <p>
                                    System Kyron es el nodo maestro de un ecosistema de inteligencia corporativa diseñado para la transición hacia la economía digital 2026. El núcleo de nuestra solución transforma el archivado tradicional en un entorno digital de alta fidelidad mediante la implementación de una **Bóveda de Datos Inmutable**. Esta arquitectura utiliza cifrado de grado militar para garantizar que cada expediente sea legalmente inatacable y accesible instantáneamente desde cualquier nodo de la red.
                                </p>
                                <p>
                                    La plataforma integra el protocolo **Hyper-Connect 5G**, permitiendo una conectividad de baja latencia necesaria para la sincronización síncrona de datos financieros y académicos. Además, el ecosistema incorpora tecnología de **Inducción Magnética** en puntos de recolección inteligentes, transformando la gestión de residuos en activos digitales verificables en el Ledger central, incentivando así la sostenibilidad institucional.
                                </p>
                                <p>
                                    A diferencia de las soluciones convencionales, Kyron actúa como un **Oficial de Cumplimiento IA**, auditando cada transacción y documento contra la Gaceta Oficial en tiempo real, eliminando el riesgo fiscal y optimizando la toma de decisiones gerenciales mediante tableros de control predictivos.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black">
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Otras Propuestas Existentes</p></div>
                                    <div className="p-6 italic font-bold text-slate-600">
                                        Las alternativas actuales, como el modelo MOBIAN, se limitan a la gestión administrativa general sin integración de infraestructura física. Kyron supera estas propuestas al fusionar servicios de telecomunicaciones propios con blindaje legal automatizado y hardware inteligente.
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-slate-50 border-b-[1.5px] border-black"><p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Diferenciadores Clave Kyron</p></div>
                                    <div className="p-6 space-y-3 font-black text-primary uppercase italic">
                                        <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /><span>Conectividad 5G Slicing Dedicada.</span></div>
                                        <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /><span>Tecnología de Inducción Magnética.</span></div>
                                        <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /><span>Blindaje Fiscal con IA Predictiva.</span></div>
                                        <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /><span>Bóveda de Datos Inmutable (Ledger).</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dictamen Técnico y Firmas */}
                    <div className="mt-20 pt-16 border-t-4 border-slate-100 flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
                        <div className="flex items-center gap-6 group">
                            <div className="p-6 bg-primary text-white rounded-[2rem] shadow-glow-sm rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <ShieldCheck className="h-10 w-10" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Dictamen Final</p>
                                <p className="text-sm font-black uppercase italic text-primary leading-none tracking-tighter">PROJECT CERTIFIED: KYRON MASTER</p>
                                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">Integridad del Expediente: 100%</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right space-y-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">Auth Required for Processing</p>
                            <div className="w-64 h-16 border-b-2 border-slate-300 italic text-slate-400 text-xs flex items-end justify-center pb-3 font-serif">
                                Signature: System Kyron Admin Node
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Rejilla HUD Estética */}
            <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
            <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 pointer-events-none no-print" />
        </div>
    );
}
