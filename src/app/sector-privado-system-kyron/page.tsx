
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @fileOverview EXPEDIENTE MAESTRO SYSTEM KYRON v2.6.5
 * Diseño de alta fidelidad: Documento Confidencial / Agencia de Inteligencia.
 */

export default function ExpedienteMaestroPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#E5E2D9] py-12 px-4 md:px-8 selection:bg-blue-200">
            {/* ESTILOS DE DOCUMENTO (CSS INLINE) */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700;900&display=swap');
                
                .paper-texture {
                    background-color: #fcfaf2;
                    background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
                    box-shadow: 
                        0 0 2px rgba(0,0,0,0.1),
                        10px 10px 40px rgba(0,0,0,0.15);
                }

                .stamp {
                    user-select: none;
                    pointer-events: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 900;
                    text-transform: uppercase;
                    border-width: 4px;
                    padding: 8px 12px;
                    opacity: 0.7;
                    mix-blend-mode: multiply;
                }

                .stamp-red {
                    color: #B22222;
                    border-color: #B22222;
                    transform: rotate(-12deg);
                }

                .stamp-blue {
                    color: #0A2472;
                    border-color: #0A2472;
                    transform: rotate(5deg);
                }

                .font-serif { font-family: 'Cormorant Garamond', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
            `}</style>

            {/* BARRA DE ACCIÓN SUPERIOR (NO PRINT) */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="text-slate-600 hover:text-blue-900 transition-all font-bold">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL NODO CENTRAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white/50 backdrop-blur-sm border-slate-300">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button className="bg-[#0A2472] hover:bg-[#061645] text-white shadow-lg">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </div>

            {/* CONTENEDOR DEL DOCUMENTO */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto paper-texture p-10 md:p-20 relative overflow-hidden border border-slate-200"
            >
                {/* MARCAS DE CLASIFICACIÓN */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-black flex items-center justify-between px-10 text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                    <span>EYES ONLY // LEVEL 5 SECURITY</span>
                    <span>SYSTEM KYRON • MASTER ACCESS</span>
                    <span>SERIAL: SK-2026-001-ZEDU</span>
                </div>

                {/* ENCABEZADO */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-10 mt-12 mb-16 border-b-2 border-slate-900 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#0A2472] flex items-center justify-center rounded-sm">
                                <ShieldCheck className="text-white h-10 w-10" />
                            </div>
                            <div className="space-y-0.5">
                                <h1 className="text-4xl font-black tracking-tight text-[#0A2472] font-sans leading-none">SYSTEM KYRON</h1>
                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="space-y-1 text-xs font-black uppercase tracking-widest text-slate-400">
                            <p>REF: KYRON-ZEDU-2026-MASTER</p>
                            <p>VERSION: 2.6.5 – MARZO 2026</p>
                        </div>
                    </div>

                    <div className="text-right space-y-2">
                        <div className="stamp stamp-blue text-sm mb-4 inline-block">VALIDADO</div>
                        <div className="font-mono text-[10px] leading-tight text-slate-500">
                            <p>FECHA: 12-MAR-2026</p>
                            <p>ORIGEN: CATIA LA MAR, VEN</p>
                            <p>STATUS: UNRESTRICTED</p>
                        </div>
                    </div>
                </header>

                {/* SECCIÓN 1: KPI QUANTUM DATA */}
                <section className="mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Empresas Activas", val: "127", icon: Activity },
                            { label: "Filings Procesados", val: "15.340", icon: FileText },
                            { label: "Riesgo Fiscal", val: "0%", icon: ShieldCheck, color: "text-[#00A86B]" },
                            { label: "Nodos Activos", val: "2.500", icon: Users },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 border border-slate-200 bg-white/50 backdrop-blur-sm rounded-lg flex flex-col items-center text-center space-y-2 group hover:border-[#0A2472] transition-all">
                                <stat.icon className={cn("h-5 w-5 opacity-40", stat.color || "text-slate-600")} />
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{stat.label}</p>
                                    <p className={cn("text-xl font-black font-sans tracking-tight", stat.color || "text-slate-900")}>{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="space-y-16 font-serif text-lg text-slate-800 leading-relaxed">
                    
                    {/* 1. INFORMACIÓN DEL EQUIPO */}
                    <section className="relative">
                        <div className="absolute -left-10 top-0 h-full w-1 bg-[#0A2472]/20" />
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-6 font-sans">1. Información del Equipo Técnico</h2>
                        <div className="grid gap-6">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 border-b border-slate-200 pb-4">
                                <span className="text-[10px] font-black uppercase text-slate-400 w-48 font-sans">Dirección Maestra</span>
                                <span className="font-bold text-slate-900 italic">Carlos Mattar (Lead Architecture)</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 border-b border-slate-200 pb-4">
                                <span className="text-[10px] font-black uppercase text-slate-400 w-48 font-sans">Ingeniería de Red</span>
                                <span className="font-bold text-slate-900 italic">Sebastián Garrido (Network Slicing)</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 border-b border-slate-200 pb-4">
                                <span className="text-[10px] font-black uppercase text-slate-400 w-48 font-sans">Despliegue Operativo</span>
                                <span className="font-bold text-slate-900 italic">Marcos Sousa (Operations Flow)</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                                <span className="text-[10px] font-black uppercase text-slate-400 w-48 font-sans">Sede de Control</span>
                                <span className="font-bold text-slate-900 italic">U.E. Colegio 'Gabriela Mistral' • Catia la Mar, La Guaira</span>
                            </div>
                        </div>
                    </section>

                    {/* 2. POBLACIÓN Y ALCANCE */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-6 font-sans">2. Población y Alcance Directo</h2>
                        <div className="p-8 bg-slate-100 rounded-sm italic border-l-4 border-slate-900 text-xl">
                            "Protocolo de despliegue focalizado en el Núcleo Comercial de Catia la Mar, integrando una red de 2.500 nodos de interacción comercial y educativa."
                        </div>
                    </section>

                    {/* 3. DIAGNÓSTICO */}
                    <section className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-6 font-sans">3. Diagnóstico de Nodo</h2>
                            <p className="mb-4">Se ha detectado una <strong className="text-slate-900 italic underline decoration-slate-300">fragmentación severa</strong> de la data operativa en el sector privado de la región.</p>
                            <p className="text-sm uppercase font-bold text-slate-500 tracking-tighter">Impacto: Vulnerabilidad legal y fiscal crítica.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 font-sans">Causas Identificadas</h4>
                            <ul className="text-sm font-bold uppercase space-y-2 list-disc pl-4 text-slate-600">
                                <li>Dependencia de registros manuales.</li>
                                <li>Ausencia de sincronización 5G dedicada.</li>
                                <li>Carencia de un Ledger inmutable regional.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. CAPACIDADES MAESTRO + TIER 2 */}
                    <section className="bg-slate-900 text-white p-10 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="h-32 w-32" /></div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-8 font-sans">4. Capacidades del Ecosistema</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <h4 className="text-xs font-black uppercase mb-4 text-white/60">Core Master</h4>
                                <ul className="space-y-3 text-sm font-bold italic list-none">
                                    <li className="flex gap-2"><ArrowRight className="h-4 w-4 text-blue-400" /> Chatbot Neuronal de Respuesta Inmediata</li>
                                    <li className="flex gap-2"><ArrowRight className="h-4 w-4 text-blue-400" /> Automatización Síncrona de Libros Fiscales</li>
                                    <li className="flex gap-2"><ArrowRight className="h-4 w-4 text-blue-400" /> Protocolo de Biometría 3D Zero-Knowledge</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase mb-4 text-[#00A86B]">Innovaciones Tier 2 (New)</h4>
                                <ul className="space-y-3 text-sm font-bold italic list-none">
                                    <li className="flex gap-2"><Sparkles className="h-4 w-4 text-[#00A86B]" /> Asistente de Voz Corporativo Kyron</li>
                                    <li className="flex gap-2"><Sparkles className="h-4 w-4 text-[#00A86B]" /> Generador Jurídico IA (Smart Contracts)</li>
                                    <li className="flex gap-2"><Sparkles className="h-4 w-4 text-[#00A86B]" /> Mercado de Eco-Créditos (Compensación)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 5. VIABILIDAD Y PRESUPUESTO */}
                    <section className="border-2 border-slate-900 p-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-8 font-sans text-center">5. Análisis de Factibilidad y Presupuesto</h2>
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-slate-200 py-2">
                                    <span className="text-[10px] font-black uppercase">VAN (Valor Presente)</span>
                                    <span className="font-black text-blue-900">$485.000,00</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 py-2">
                                    <span className="text-[10px] font-black uppercase">TIR (Rendimiento)</span>
                                    <span className="font-black text-blue-900">31.2%</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-[10px] font-black uppercase">Payback</span>
                                    <span className="font-black text-blue-900">2.1 Años</span>
                                </div>
                            </div>
                            <div className="bg-[#0A2472] text-white p-6 text-center rounded-sm shadow-xl">
                                <p className="text-[9px] font-black uppercase tracking-widest mb-2">Inversión Inicial Estimada</p>
                                <p className="text-3xl font-black tracking-tighter italic">$32.883 USD</p>
                                <p className="text-[8px] font-bold mt-2 opacity-60">AUDITADO POR HOLDING KYRON</p>
                            </div>
                        </div>
                    </section>

                    {/* 6. ALIADOS ESTRATÉGICOS */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-8 font-sans">6. Aliados y Recursos Certificados</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {["SAPI", "SENIAT", "CONATEL", "HOLDING KYRON"].map((ally, i) => (
                                <div key={i} className="text-center p-4 border border-slate-200 rounded-lg bg-white">
                                    <p className="text-lg font-black italic text-slate-900 mb-1">{ally}</p>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-blue-600">Protocolo Validado</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* SELLO DE PIE DE PÁGINA */}
                <footer className="mt-24 pt-12 border-t-4 border-slate-900 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-10">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Contacto Maestro</p>
                                <p className="text-sm font-bold text-[#0A2472] italic underline">expedientes@systemkyron.com</p>
                                <p className="text-sm font-bold text-[#0A2472] italic underline">www.systemkyron.com</p>
                            </div>
                            <div className="p-2 border border-slate-300 rounded-sm bg-white grayscale contrast-125">
                                <QrCode className="h-16 w-16 opacity-80" />
                            </div>
                        </div>
                        <div className="stamp-blue stamp text-xs inline-block">GRADO CORPORATIVO</div>
                    </div>

                    <div className="text-right space-y-4">
                        <div className="stamp-red stamp text-xl inline-block mb-4">CONFIDENCIAL</div>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                            EXPEDIENTE MAESTRO VALIDADO <br/> 
                            © 2026 SYSTEM KYRON • NODO CARACAS
                        </p>
                    </div>
                </footer>

                {/* MARCA DE AGUA SUTIL */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] rotate-12">
                    <ShieldCheck className="h-[600px] w-[600px] text-[#0A2472]" />
                </div>
            </motion.div>

            {/* BARRA DE ESTADO INFERIOR */}
            <div className="max-w-4xl mx-auto mt-8 flex justify-center items-center gap-8 no-print text-[9px] font-black uppercase text-slate-500 tracking-[0.3em]">
                <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> ENCRYPT: AES-512</span>
                <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> NODES: ONLINE</span>
                <span className="flex items-center gap-2"><Award className="h-3 w-3" /> CERTIFICATE: SK-2026-X</span>
            </div>
        </div>
    );
}
