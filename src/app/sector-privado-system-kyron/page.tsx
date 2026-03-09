
"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/navigation";
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
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview EXPEDIENTE MAESTRO SYSTEM KYRON v2.6.5
 * Diseño UHD: Documento de Inteligencia Corporativa.
 * Optimizado para lectura en cualquier tema y exportación profesional.
 */

export default function ExpedienteMaestroPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Expediente Maestro System Kyron</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #0f172a; background-color: #ffffff; }
                    .header-table { width: 100%; border-bottom: 3px solid #0A2472; margin-bottom: 30px; padding-bottom: 20px; }
                    .section-header { background-color: #0f172a; color: #ffffff; padding: 12px 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; font-size: 14px; border-left: 6px solid #2563eb; margin-top: 30px; }
                    .data-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    .data-table td { padding: 12px; border: 1px solid #e2e8f0; font-size: 13px; }
                    .label { color: #2563eb; font-weight: 900; text-transform: uppercase; font-size: 10px; width: 30%; background-color: #f8fafc; }
                    .value { font-weight: 700; color: #0f172a; }
                    .metric-box { background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 15px; text-align: center; }
                    .metric-label { font-size: 10px; font-weight: 900; color: #0369a1; text-transform: uppercase; margin-bottom: 5px; }
                    .metric-value { font-size: 20px; font-weight: 900; color: #0A2472; }
                    .stamp { color: #B22222; border: 3px solid #B22222; padding: 5px 10px; font-weight: 900; text-transform: uppercase; display: inline-block; }
                </style>
            </head>
            <body>
                <table class="header-table">
                    <tr>
                        <td style="width: 70%;">
                            <h1 style="color: #0A2472; margin: 0; font-size: 28px; font-weight: 900;">SYSTEM KYRON</h1>
                            <p style="color: #64748b; margin: 5px 0; font-size: 12px; letter-spacing: 4px; font-weight: 700;">CORPORATE INTELLIGENCE HUB</p>
                            <p style="color: #94a3b8; margin: 0; font-size: 10px;">REF: KYRON-ZEDU-2026-MASTER | v2.6.5</p>
                        </td>
                        <td style="width: 30%; text-align: right; vertical-align: top;">
                            <div class="stamp">CONFIDENCIAL</div>
                        </td>
                    </tr>
                </table>

                <div class="section-header">1. Información del Equipo Técnico</div>
                <table class="data-table">
                    <tr><td class="label">Proyecto</td><td class="value">SYSTEM KYRON • CORPORATE INTELLIGENCE</td></tr>
                    <tr><td class="label">Dirección Maestra</td><td class="value">Ing. Carlos Mattar (Lead Architecture)</td></tr>
                    <tr><td class="label">Ingeniería de Red</td><td class="value">Sebastian Garrido (Network Slicing)</td></tr>
                    <tr><td class="label">Logística Operativa</td><td class="value">Marcos Sousa (Strategic Flow)</td></tr>
                    <tr><td class="label">Sede de Operaciones</td><td class="value">Catia la Mar • Colegio 'Gabriela Mistral'</td></tr>
                </table>

                <div class="section-header">2. Análisis de Factibilidad</div>
                <table style="width: 100%; border-spacing: 10px;">
                    <tr>
                        <td class="metric-box"><div class="metric-label">VAN</div><div class="metric-value">$ 485.000,00</div></td>
                        <td class="metric-box"><div class="metric-label">TIR</div><div class="metric-value">31.2%</div></td>
                        <td class="metric-box"><div class="metric-label">ROI</div><div class="metric-value">340%</div></td>
                    </tr>
                </table>

                <div class="section-header">3. Visión del Ecosistema</div>
                <p style="font-weight: 700; color: #334155; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0A2472;">
                    Implementación de una Bóveda Digital Inmutable bajo protocolo Zero-Knowledge, soportada por conectividad 5G dedicada y hardware de inducción magnética para la trazabilidad de activos estratégicos.
                </p>

                <div class="section-header">4. Presupuesto Operativo (CAPEX)</div>
                <table class="data-table">
                    <tr style="background-color: #0f172a; color: #ffffff; font-size: 10px; font-weight: 900;">
                        <td>CONCEPTO</td><td>CANT</td><td>COSTO (USD)</td><td>NODO</td>
                    </tr>
                    <tr><td>Infraestructura Cloud Ledger</td><td>1</td><td>$ 5.500,00</td><td>Core</td></tr>
                    <tr><td>Terminales de Gestión Pro</td><td>10</td><td>$ 2.500,00</td><td>Hardware</td></tr>
                    <tr><td>Smart Bins (Magnetismo)</td><td>4</td><td>$ 1.200,00</td><td>Eco</td></tr>
                    <tr><td>Sistemas Fiscales Homologados</td><td>2</td><td>$ 1.350,00</td><td>Compliance</td></tr>
                    <tr style="background-color: #f1f5f9; font-weight: 900;">
                        <td colspan="2">TOTAL INVERSIÓN ESTIMADA</td><td colspan="2" style="color: #2563eb;">$ 32.883,00</td>
                    </tr>
                </table>

                <div class="section-header">5. Plan de Acción 2026</div>
                <table class="data-table">
                    <tr><td class="label">Fase 1</td><td class="value">Auditoría Técnica y Censo en Catia la Mar</td></tr>
                    <tr><td class="label">Fase 2</td><td class="value">Despliegue de Bóveda Digital y Migración de Data</td></tr>
                    <tr><td class="label">Fase 3</td><td class="value">Activación de Nodos 5G y Provisión de eSIM</td></tr>
                    <tr><td class="label">Fase 4</td><td class="value">Certificación Maestra y Lanzamiento de Mercado</td></tr>
                </table>

                <p style="text-align: center; margin-top: 50px; font-size: 10px; font-weight: 900; color: #94a3b8; letter-spacing: 5px;">
                    EXPEDIENTE MAESTRO VALIDADO • SYSTEM KYRON 2026
                </p>
            </body>
            </html>
        `;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Expediente_Maestro_Kyron_2026.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPORTACIÓN EXITOSA",
            description: "Dossier corporativo generado con protocolo UHD.",
        });
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 md:px-8 selection:bg-blue-200 transition-colors duration-500">
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
            `}</style>

            <div className="max-w-5xl mx-auto mb-10 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="text-slate-600 dark:text-slate-400 hover:text-[#0A2472] dark:hover:text-primary font-black uppercase text-[10px] tracking-widest transition-all">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-slate-300 dark:border-white/10 rounded-xl h-12 px-6 font-black text-[10px] uppercase tracking-widest">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button 
                        onClick={handleDownload}
                        className="modern h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl"
                    >
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR EXPEDIENTE
                    </Button>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto paper-texture p-12 md:p-24 relative overflow-hidden border border-slate-200 rounded-sm text-slate-950"
            >
                {/* CLASSIFICATION BAR */}
                <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900 flex items-center justify-between px-12 text-[10px] font-black tracking-[0.6em] text-white/40 uppercase">
                    <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> EYES ONLY</span>
                    <span>KYRON MASTER DOSSIER 2026</span>
                    <span className="flex items-center gap-2">SK-ALPHA <Activity className="h-3 w-3" /></span>
                </div>

                {/* WATERMARK */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
                    <Logo className="w-[600px] h-[600px] rotate-12" />
                </div>

                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-12 mt-12 mb-20 border-b-4 border-slate-900 pb-12 relative z-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-[#0A2472] flex items-center justify-center rounded-sm shadow-xl">
                                <Logo className="text-white h-14 w-14" />
                            </div>
                            <div className="space-y-1 text-slate-950">
                                <h1 className="text-5xl font-black tracking-tight font-sans leading-none uppercase italic">System Kyron</h1>
                                <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Corporate Intelligence</p>
                            </div>
                        </div>
                        <div className="space-y-1.5 text-xs font-black uppercase tracking-widest text-slate-400 font-sans">
                            <p className="flex items-center gap-2"><FileText className="h-3 w-3" /> REF: KYRON-ZEDU-2026-MASTER</p>
                            <p className="flex items-center gap-2"><Activity className="h-3 w-3" /> VERSION: 2.6.5 – MARZO 2026</p>
                        </div>
                    </div>

                    <div className="text-right space-y-4">
                        <div className="stamp stamp-blue text-xs">VALIDADO POR NODO MAESTRO</div>
                        <div className="font-mono text-[11px] leading-relaxed text-slate-500 font-bold uppercase tracking-tighter">
                            <p>FECHA: 15-MAR-2026</p>
                            <p>ORIGEN: CATIA LA MAR, VEN</p>
                            <p>NIVEL: GRADO CORPORATIVO</p>
                        </div>
                    </div>
                </header>

                {/* KPI DASHBOARD */}
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

                {/* CONTENT AREA */}
                <div className="space-y-20 font-serif text-xl text-slate-800 leading-relaxed relative z-10">
                    
                    {/* SECTION 1 */}
                    <section className="relative">
                        <div className="absolute -left-12 top-0 h-full w-1.5 bg-[#0A2472]/10" />
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">01</span>
                            Información del Equipo Técnico
                        </h2>
                        <div className="grid gap-8 pl-4">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 border-b border-slate-200 pb-6">
                                <span className="text-[11px] font-black uppercase text-slate-400 w-56 font-sans shrink-0 tracking-widest">Dirección Maestra</span>
                                <span className="font-bold text-slate-900 italic">Ing. Carlos Mattar (Lead Architecture)</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 border-b border-slate-200 pb-6">
                                <span className="text-[11px] font-black uppercase text-slate-400 w-56 font-sans shrink-0 tracking-widest">Ingeniería de Red</span>
                                <span className="font-bold text-slate-900 italic">Sebastian Garrido (Network Slicing)</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6">
                                <span className="text-[11px] font-black uppercase text-slate-400 w-56 font-sans shrink-0 tracking-widest">Sede de Operaciones</span>
                                <span className="font-bold text-slate-900 italic">Catia la Mar • Colegio 'Gabriela Mistral'</span>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-8 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">02</span>
                            Viabilidad y Presupuesto
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="flex justify-between border-b border-slate-200 py-3">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">VAN</span>
                                    <span className="font-black text-[#0A2472]">$ 485.000,00</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 py-3">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">TIR</span>
                                    <span className="font-black text-[#0A2472]">31.2%</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Payback</span>
                                    <span className="font-black text-[#0A2472]">2.1 Años</span>
                                </div>
                            </div>
                            <div className="bg-[#0A2472] text-white p-10 text-center rounded-xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-blue-300">Inversión Inicial Estimada</p>
                                <p className="text-4xl font-black tracking-tighter italic leading-none">$ 32.883 USD</p>
                                <p className="text-[8px] font-bold mt-4 opacity-40 uppercase tracking-widest">Auditado por Holding Kyron</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3 */}
                    <section className="bg-slate-100 p-12 rounded-sm border-2 border-slate-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5"><Zap className="h-40 w-40" /></div>
                        <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#0A2472] mb-10 font-sans">03. Innovaciones Tier 2 (Despliegue 2026)</h2>
                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            {[
                                { title: "Voice Hub", desc: "Asistente de voz corporativo neuronal.", icon: Sparkles },
                                { title: "Legal Gen", desc: "Generador de contratos con IA certificada.", icon: FileText },
                                { title: "Eco-Token", desc: "Mercado de compensación ambiental.", icon: Recycle },
                                { title: "5G Slice", desc: "Priorización de red para procesos críticos.", icon: Radio }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <item.icon className="h-5 w-5 text-[#0A2472]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-slate-900 mb-1">{item.title}</h4>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 4 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#0A2472] mb-10 font-sans flex items-center gap-4">
                            <span className="w-8 h-8 bg-[#0A2472] text-white flex items-center justify-center rounded-full text-[10px]">04</span>
                            Plan de Acción Operativo
                        </h2>
                        <div className="overflow-hidden border-2 border-slate-900 rounded-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900 text-white font-sans text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="p-5">Fase Operativa</th>
                                        <th className="p-5">Responsable</th>
                                        <th className="p-5 text-right">Cronograma</th>
                                    </tr>
                                </thead>
                                <tbody className="font-sans text-[11px] font-bold uppercase tracking-tighter text-slate-600">
                                    <tr className="border-b border-slate-200">
                                        <td className="p-5 italic">Censo y Auditoría Técnica</td>
                                        <td className="p-5">Equipo de Campo</td>
                                        <td className="p-5 text-right text-[#0A2472]">Semana 1</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <td className="p-5 italic">Despliegue de Bóveda Central</td>
                                        <td className="p-5">Ing. C. Mattar</td>
                                        <td className="p-5 text-right text-[#0A2472]">Semana 2</td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="p-5 italic">Activación de Nodos 5G</td>
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

                {/* FOOTER */}
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
                        <div className="stamp stamp-red text-[10px] inline-block">EXPEDIENTE MAESTRO VALIDADO</div>
                    </div>

                    <div className="text-right space-y-6">
                        <div className="stamp stamp-red text-2xl px-10 py-4 inline-block font-sans">CONFIDENCIAL</div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 leading-relaxed font-sans">
                            © 2026 SYSTEM KYRON <br/> 
                            NODO ESTRATÉGICO CARACAS
                        </p>
                    </div>
                </footer>
            </motion.div>

            {/* STATUS BAR */}
            <div className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-10 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] opacity-60">
                <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> AES-512 SECURE</span>
                <span className="flex items-center gap-2"><Activity className="h-3.5 w-3.5" /> GLOBAL NODES: ONLINE</span>
                <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5" /> CERT: SK-2026-X</span>
            </div>
        </div>
    );
}
