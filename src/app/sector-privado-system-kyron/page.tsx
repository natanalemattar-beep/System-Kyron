
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Users, 
  Zap, 
  Mail, 
  Globe, 
  QrCode,
  Lock,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Target,
  Search,
  FileCode,
  Shield,
  Recycle,
  Radio,
  Box,
  Monitor,
  CheckCircle2,
  Loader2,
  Fingerprint,
  Database,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview MODELO ZEDU COMPLETO: SYSTEM KYRON v2.6.5
 * Diseño: Expediente de Inteligencia Confidencial UHD.
 * Formulación técnica de 8 partes.
 */

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = () => {
        toast({
            title: "INICIANDO PROTOCOLO DE EXPORTACIÓN",
            description: "Generando Dossier Maestro en formato inmutable...",
        });
        // Simulación de descarga de documento Word con diseño avanzado
        window.print();
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 md:px-8 selection:bg-blue-200 transition-colors duration-500 hud-grid-subtle">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700;900&display=swap');
                
                .paper-texture {
                    background-color: #fcfaf2;
                    background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
                    box-shadow: 0 0 2px rgba(0,0,0,0.1), 15px 15px 50px rgba(0,0,0,0.15);
                }

                .stamp {
                    user-select: none;
                    pointer-events: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 900;
                    text-transform: uppercase;
                    border: 4px solid currentColor;
                    padding: 8px 16px;
                    opacity: 0.8;
                    mix-blend-mode: multiply;
                    letter-spacing: 2px;
                }

                .stamp-red { color: #B22222; transform: rotate(-12deg); }
                .stamp-blue { color: #0A2472; transform: rotate(5deg); }

                .font-serif { font-family: 'Cormorant Garamond', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }

                .hud-grid-subtle {
                    background-image: linear-gradient(to right, rgba(10, 36, 114, 0.03) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(10, 36, 114, 0.03) 1px, transparent 1px);
                    background-size: 40px 40px;
                }

                @media print {
                    .no-print { display: none !important; }
                    body { background: white; }
                    .paper-texture { box-shadow: none; border: none; }
                }
            `}</style>

            {/* BARRA DE NAVEGACIÓN UI */}
            <div className="max-w-5xl mx-auto mb-10 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="text-slate-600 dark:text-slate-400 hover:text-[#0A2472] dark:hover:text-primary font-black uppercase text-[10px] tracking-widest transition-all">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL NODO</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-slate-300 dark:border-white/10 rounded-xl h-12 px-6 font-black text-[10px] uppercase tracking-widest">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button 
                        onClick={handleDownload}
                        className="h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472] text-white hover:bg-[#0A2472]/90"
                    >
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR EXPEDIENTE
                    </Button>
                </div>
            </div>

            {/* DOCUMENTO PRINCIPAL */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto paper-texture p-12 md:p-24 relative overflow-hidden border border-slate-200 rounded-sm text-slate-950 shadow-2xl"
            >
                {/* CABECERA DE CLASIFICACIÓN */}
                <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900 flex items-center justify-between px-12 text-[10px] font-black tracking-[0.6em] text-white/40 uppercase">
                    <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> CONFIDENCIAL</span>
                    <span>MODELO ZEDU: SYSTEM KYRON</span>
                    <span className="flex items-center gap-2">VERSIÓN 2.6.5 <Activity className="h-3 w-3" /></span>
                </div>

                {/* MARCA DE AGUA */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
                    <Logo className="w-[600px] h-[600px] rotate-12" />
                </div>

                {/* ENCABEZADO OFICIAL */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-12 mt-12 mb-20 border-b-4 border-slate-900 pb-12 relative z-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-[#0A2472] flex items-center justify-center rounded-sm shadow-xl">
                                <Logo className="text-white h-16 w-16" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-5xl font-black tracking-tight font-sans leading-none uppercase italic text-[#0A2472]">System Kyron</h1>
                                <p className="text-[14px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="space-y-1.5 text-xs font-black uppercase tracking-widest text-slate-400 font-sans">
                            <p className="flex items-center gap-2"><FileText className="h-3 w-3" /> REF: KYRON-ZEDU-2026-MASTER</p>
                            <p className="flex items-center gap-2"><Building className="h-3 w-3" /> ORIGEN: COLEGIO GABRIELA MISTRAL</p>
                        </div>
                    </div>

                    <div className="text-right space-y-4">
                        <div className="stamp stamp-blue text-xs">GRADO CORPORATIVO</div>
                        <div className="font-mono text-[11px] leading-relaxed text-slate-500 font-bold uppercase tracking-tighter">
                            <p>FECHA: 15-MAR-2026</p>
                            <p>UBICACIÓN: CATIA LA MAR, VEN</p>
                            <p>STATUS: VALIDADO</p>
                        </div>
                    </div>
                </header>

                {/* INDICADORES CUANTITATIVOS (KPIs) */}
                <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                    {[
                        { label: "Empresas", val: "127", icon: Users },
                        { label: "Declaraciones", val: "15.340", icon: FileText },
                        { label: "Riesgo Fiscal", val: "0%", icon: ShieldCheck, color: "text-[#00A86B]" },
                        { label: "Nodos Activos", val: "2.500", icon: Zap },
                    ].map((stat, i) => (
                        <div key={i} className="p-6 border-2 border-slate-200 bg-white/40 backdrop-blur-md rounded-xl flex flex-col items-center text-center space-y-3 shadow-sm hover:border-[#0A2472] transition-all group">
                            <stat.icon className={cn("h-6 w-6 opacity-30 group-hover:opacity-100 transition-opacity", stat.color || "text-[#0A2472]")} />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                                <p className={cn("text-2xl font-black font-sans tracking-tighter italic", stat.color || "text-slate-900")}>{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CONTENIDO DEL PROYECTO (8 PARTES) */}
                <div className="space-y-20 font-serif text-xl text-slate-800 leading-relaxed relative z-10">
                    
                    {/* PARTE 1: INFORMACIÓN DEL EQUIPO */}
                    <section className="relative">
                        <div className="absolute -left-12 top-0 h-full w-1.5 bg-[#0A2472]/10" />
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">01</span>
                            Información del Equipo Técnico
                        </h2>
                        <div className="grid gap-8 pl-4 font-sans uppercase">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 border-b border-slate-200 pb-6">
                                <span className="text-[11px] font-black text-slate-400 w-56 tracking-widest">Dirección Maestra</span>
                                <span className="font-bold text-slate-900 italic">Ing. Carlos Mattar</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 border-b border-slate-200 pb-6">
                                <span className="text-[11px] font-black text-slate-400 w-56 tracking-widest">Ingeniería de Sistemas</span>
                                <span className="font-bold text-slate-900 italic">Sebastian Garrido</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 border-b border-slate-200 pb-6">
                                <span className="text-[11px] font-black text-slate-400 w-56 tracking-widest">Logística y Despliegue</span>
                                <span className="font-bold text-slate-900 italic">Marcos Sousa</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6">
                                <span className="text-[11px] font-black text-slate-400 w-56 tracking-widest">Sede de Operaciones</span>
                                <span className="font-bold text-slate-900 italic">Catia la Mar • Colegio 'Gabriela Mistral'</span>
                            </div>
                        </div>
                    </section>

                    {/* PARTE 2: POBLACIÓN A TRABAJAR */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">02</span>
                            Población a Trabajar
                        </h2>
                        <div className="bg-slate-50 p-8 rounded-sm border-l-4 border-slate-900 space-y-6">
                            <p className="font-bold italic">Núcleo Estratégico: Eje Comercial e Institucional de Catia la Mar, Edo. La Guaira.</p>
                            <div className="grid md:grid-cols-2 gap-8 text-sm">
                                <div>
                                    <h4 className="font-black uppercase text-[#0A2472] mb-2">Alcance Directo</h4>
                                    <p>2.500 Nodos (Empresas y Contribuyentes). Caracterizados por una alta densidad transaccional y necesidad de digitalización urgente.</p>
                                </div>
                                <div>
                                    <h4 className="font-black uppercase text-[#0A2472] mb-2">Contexto Ambiental</h4>
                                    <p>Población costera con exposición extrema a la salinidad y humedad relativa (85%+), factor crítico que causa el deterioro acelerado de archivos físicos.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PARTE 3: ANÁLISIS DEL PROBLEMA */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">03</span>
                            Análisis del Problema
                        </h2>
                        <div className="space-y-10">
                            <div className="p-10 border-2 border-rose-900/20 bg-rose-50 rounded-sm">
                                <h4 className="text-sm font-black uppercase text-rose-900 mb-4 flex items-center gap-2">
                                    <Target className="h-4 w-4" /> Definición del Problema
                                </h4>
                                <p className="text-lg font-bold italic leading-relaxed text-rose-950">
                                    "La inexistencia de un ecosistema tecnológico integrado que unifique las telecomunicaciones, el cumplimiento fiscal y la gestión de activos, forzando la dependencia de procesos manuales vulnerables."
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12 text-sm font-sans uppercase">
                                <div>
                                    <h4 className="font-black text-slate-400 mb-4 tracking-widest">Causas Raíz</h4>
                                    <ul className="space-y-3 list-disc pl-5 font-bold text-slate-700">
                                        <li>Fragmentación de data operativa.</li>
                                        <li>Falta de un Ledger centralizado inmutable.</li>
                                        <li>Dependencia de infraestructura obsoleta.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-400 mb-4 tracking-widest">Consecuencias</h4>
                                    <ul className="space-y-3 list-disc pl-5 font-bold text-slate-700">
                                        <li>Multas fiscales por errores humanos.</li>
                                        <li>Deterioro de documentos por humedad.</li>
                                        <li>Pérdida de competitividad regional.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PARTE 4: SOLUCIÓN PROPUESTA */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">04</span>
                            Solución Propuesta: System Kyron
                        </h2>
                        <div className="space-y-10">
                            <p className="text-lg italic leading-relaxed">
                                Implementación de un **Nodo de Inteligencia Centralizada** basado en una Bóveda Digital Inmutable (Zero-Knowledge), soportada por conectividad 5G y hardware de inducción magnética.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 relative">
                                {[
                                    { t: "Telecom 5G & eSIM", d: "Operador Móvil Virtual integrado." },
                                    { t: "IA Fiscal Predictiva", d: "Cumplimiento síncrono SENIAT." },
                                    { t: "Biometría 3D", d: "Bóveda de identidad digital." },
                                    { t: "Eco-Tokenización", d: "Reciclaje con Smart Bins." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-white border-2 border-slate-900 rounded-sm shadow-sm flex flex-col justify-center items-center text-center">
                                        <h4 className="text-xs font-black uppercase text-[#0A2472] mb-1 italic">{item.t}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* PARTE 5: FACTIBILIDAD Y PRESUPUESTO */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">05</span>
                            Presupuesto y Viabilidad
                        </h2>
                        <div className="space-y-8">
                            <div className="bg-[#0A2472] text-white p-10 text-center rounded-sm shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-blue-300">Inversión Inicial Estimada</p>
                                <p className="text-5xl font-black tracking-tighter italic leading-none">$ 32.883,00 USD</p>
                                <p className="text-[8px] font-bold mt-4 opacity-40 uppercase tracking-widest">Validado por Holding Kyron</p>
                            </div>
                            <div className="overflow-hidden border-2 border-slate-900 rounded-sm">
                                <table className="w-full text-left border-collapse font-sans text-[10px]">
                                    <thead className="bg-slate-900 text-white uppercase tracking-widest font-black">
                                        <tr><th className="p-4">Ítem de Inversión</th><th className="p-4 text-right">Costo (USD)</th></tr>
                                    </thead>
                                    <tbody className="font-bold uppercase tracking-tighter text-slate-600 italic">
                                        <tr className="border-b border-slate-200"><td className="p-4">Infraestructura Telecom 5G (Contrato Mayorista)</td><td className="p-4 text-right">$ 5.000,00</td></tr>
                                        <tr className="border-b border-slate-200 bg-slate-50"><td className="p-4">Desarrollo de Ecosistema Web & Cloud Ledger</td><td className="p-4 text-right">$ 12.000,00</td></tr>
                                        <tr className="border-b border-slate-200"><td className="p-4">Smart Bins IA (Sujeción Magnética)</td><td className="p-4 text-right">$ 1.200,00</td></tr>
                                        <tr className="border-b border-slate-200 bg-slate-50"><td className="p-4">Terminales de Gestión Pro (10 Unidades)</td><td className="p-4 text-right">$ 2.500,00</td></tr>
                                        <tr><td className="p-4 font-black text-[#0A2472]">TOTAL PROYECTADO</td><td className="p-4 text-right font-black text-[#0A2472]">$ 32.883,00</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* PARTE 6: INNOVACIONES TIER 2 (NEW) */}
                    <section className="bg-slate-100 p-12 rounded-sm border-2 border-slate-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5"><Sparkles className="h-40 w-40" /></div>
                        <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#0A2472] mb-10 font-sans flex items-center gap-3">
                            <Box className="h-4 w-4" /> 06. Innovaciones Tier 2 (Despliegue 2026)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            {[
                                { title: "Voice Hub", desc: "Asistente de voz corporativo neuronal.", icon: Radio },
                                { title: "Legal Gen", desc: "Generador de contratos con IA certificada.", icon: FileCode },
                                { title: "Eco-Token", desc: "Mercado de compensación ambiental.", icon: Recycle },
                                { title: "5G Slice", desc: "Priorización de red para procesos críticos.", icon: Globe }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start text-[#0f172a]">
                                    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <item.icon className="h-5 w-5 text-[#0A2472]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-slate-900 mb-1">{item.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* PARTE 7: ALIADOS ESTRATÉGICOS */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-10 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">07</span>
                            Aliados y Recursos
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-sans">
                            {[
                                { n: "DIGITEL", d: "Conectividad 5G" },
                                { n: "SAMSUNG", d: "Hardware Pro" },
                                { n: "FACTORY HKA", d: "Sistemas Fiscales" },
                                { n: "CONATEL", d: "Espectro Radio" },
                                { n: "SENIAT", d: "Validación Fiscal" },
                                { n: "SAPI", d: "Patentes e IP" }
                            ].map((item, i) => (
                                <div key={i} className="p-4 border border-slate-200 bg-white text-center rounded-lg group hover:border-[#0A2472] transition-all">
                                    <p className="text-xs font-black text-slate-900 group-hover:text-[#0A2472]">{item.n}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* PARTE 8: PLAN DE ACCIÓN OPERATIVO */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-10 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">08</span>
                            Plan de Acción Operativo
                        </h2>
                        <div className="overflow-hidden border-2 border-slate-900 rounded-sm shadow-xl">
                            <table className="w-full text-left border-collapse font-sans">
                                <thead className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="p-5">Fase Operativa</th>
                                        <th className="p-5">Responsable</th>
                                        <th className="p-5 text-right">Cronograma</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-bold uppercase tracking-tighter text-slate-600">
                                    <tr className="border-b border-slate-200">
                                        <td className="p-5 italic">Auditoría Técnica y Censo</td>
                                        <td className="p-5">Equipo de Campo</td>
                                        <td className="p-5 text-right text-[#0A2472]">Semana 1</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <td className="p-5 italic">Despliegue de Bóveda Digital</td>
                                        <td className="p-5">Ing. C. Mattar</td>
                                        <td className="p-5 text-right text-[#0A2472]">Semana 2</td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="p-5 italic">Activación Nodos 5G & eSIM</td>
                                        <td className="p-5">Ing. S. Garrido</td>
                                        <td className="p-5 text-right text-[#0A2472]">Semana 3</td>
                                    </tr>
                                    <tr>
                                        <td className="p-5 italic">Certificación y Lanzamiento</td>
                                        <td className="p-5">Auditores Kyron</td>
                                        <td className="p-5 text-right text-[#0A2472]">Semana 4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* PIE DE PÁGINA FINAL */}
                <footer className="mt-24 pt-16 border-t-4 border-slate-900 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10 text-slate-950">
                    <div className="space-y-8 w-full md:w-auto">
                        <div className="flex items-center gap-12">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Contacto Maestro</p>
                                <p className="text-sm font-bold text-[#0A2472] italic underline decoration-blue-200">expedientes@systemkyron.com</p>
                                <p className="text-sm font-bold text-[#0A2472] italic underline decoration-blue-200">www.systemkyron.com</p>
                            </div>
                            <div className="p-3 border-2 border-slate-300 rounded-sm bg-white grayscale contrast-125 shadow-sm">
                                <QrCode className="h-20 w-20 opacity-80" />
                            </div>
                        </div>
                        <div className="stamp stamp-red text-[10px] inline-block font-sans">EXPEDIENTE MAESTRO VALIDADO</div>
                    </div>

                    <div className="text-right space-y-6">
                        <div className="stamp stamp-red text-2xl px-10 py-4 inline-block font-sans shadow-sm">CONFIDENCIAL</div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 leading-relaxed font-sans">
                            © 2026 SYSTEM KYRON <br/> 
                            NODO ESTRATÉGICO CARACAS
                        </p>
                    </div>
                </footer>
            </motion.div>

            {/* STATUS BAR FINAL */}
            <div className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-10 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] opacity-60">
                <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> AES-512 SECURE</span>
                <span className="flex items-center gap-2"><Activity className="h-3.5 w-3.5" /> GLOBAL NODES: ONLINE</span>
                <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5" /> CERT: SK-2026-X</span>
            </div>
        </div>
    );
}
