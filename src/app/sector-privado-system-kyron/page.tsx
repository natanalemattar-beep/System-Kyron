
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
  Zap,
  Activity,
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
  ClipboardCheck,
  QrCode,
  AlertTriangle
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";

/**
 * @fileOverview EXPEDIENTE MAESTRO SYSTEM KYRON v2.6.5
 * Diseño: Documento Confidencial de Grado Inteligencia Corporativa.
 * Desarrollado por: Master Design Node.
 */

// --- DATOS TÉCNICOS ---
const TEAM = [
    { label: "Proyecto", val: "SYSTEM KYRON • CORPORATE INTELLIGENCE" },
    { label: "Dirección General", val: "Ing. Carlos Mattar (Lead Architecture)" },
    { label: "Ingeniería de Sistemas", val: "Sebastian Garrido (Network Slicing)" },
    { label: "Logística y Despliegue", val: "Marcos Sousa (Operational Flow)" },
    { label: "Sede de Operaciones", val: "Catia la Mar, La Guaira • Colegio 'Gabriela Mistral'" },
];

const STATS = [
    { label: "Empresas Activas", val: "127", icon: Users },
    { label: "Declaraciones", val: "15.340", icon: FileText },
    { label: "Riesgo Fiscal", val: "0%", icon: ShieldCheck, color: "text-[#00A86B]" },
    { label: "Nodos Activos", val: "2.500", icon: Activity },
];

const SECTIONS = {
    diagnostico: {
        problema: "Fragmentación de la data operativa y vulnerabilidad legal por el uso de registros físicos obsoletos.",
        causas: "Inexistencia de un Ledger centralizado, dependencia de procesos manuales y falta de infraestructura 5G.",
        impacto: "La ausencia de una Bóveda Digital inmutable pone en riesgo la soberanía administrativa en La Guaira."
    },
    factibilidad: [
        { label: "VAN", val: "$485.000,00", desc: "Valor Actual Neto" },
        { label: "TIR", val: "31.2%", desc: "Tasa Interna de Retorno" },
        { label: "Payback", val: "2.1 Años", desc: "Tiempo de Recuperación" },
        { label: "ROI", val: "340%", desc: "Retorno de Inversión" }
    ],
    solucion: {
        vision: "SYSTEM KYRON: Nodo de Inteligencia Centralizada.",
        arquitectura: "Implementación de una Bóveda Digital Inmutable bajo protocolo Zero-Knowledge, soportada por conectividad 5G dedicada y hardware de inducción magnética.",
        capacidades: [
            "Chatbot Estratégico Neuronal Activo.",
            "Automatización síncrona de Libros Fiscales.",
            "Acceso Biométrico 3D para Resguardo Legal."
        ]
    }
};

const PRESUPUESTO = [
    { item: "Infraestructura Cloud Ledger & Nodo 5G", cost: 5500 },
    { item: "Terminales Inteligentes de Gestión Pro", cost: 2500 },
    { item: "Módulo de Bóveda Digital Inmutable", cost: 1800 },
    { item: "Smart Bins (Magnetismo Síncrono)", cost: 1200 },
    { item: "Sistemas Fiscales Homologados SENIAT", cost: 900 },
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
            const PRIMARY_BLUE = "#0A2472";
            const STAMP_RED = "#B22222";
            const SUCCESS_GREEN = "#00A86B";
            
            const html = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #fdfaf0; color: #1a1a1a; padding: 40pt; }
                        .header { border-bottom: 2pt solid ${PRIMARY_BLUE}; padding-bottom: 20pt; margin-bottom: 30pt; }
                        .confidential { color: ${STAMP_RED}; font-family: 'Arial', sans-serif; font-weight: 900; border: 3pt solid ${STAMP_RED}; padding: 10pt; text-transform: uppercase; transform: rotate(-5deg); display: inline-block; margin-bottom: 20pt; }
                        .section-title { background-color: #eee; padding: 8pt; font-family: 'Arial', sans-serif; font-weight: 900; text-transform: uppercase; color: ${PRIMARY_BLUE}; border-left: 5pt solid ${PRIMARY_BLUE}; margin-top: 25pt; }
                        .data-row { margin-bottom: 10pt; border-bottom: 0.5pt solid #ddd; padding-bottom: 5pt; }
                        .label { font-weight: 900; color: #555; font-family: 'Arial', sans-serif; font-size: 9pt; text-transform: uppercase; }
                        .table { width: 100%; border-collapse: collapse; margin-top: 15pt; }
                        .table th { background-color: ${PRIMARY_BLUE}; color: #ffffff; padding: 10pt; text-align: left; font-family: 'Arial', sans-serif; }
                        .table td { padding: 10pt; border: 1pt solid #ccc; }
                        .footer { margin-top: 50pt; text-align: center; border-top: 1pt solid #ccc; padding-top: 20pt; font-size: 9pt; color: #777; font-family: 'Arial', sans-serif; }
                    </style>
                </head>
                <body>
                    <div class="confidential">CONFIDENCIAL - ACCESO NIVEL 5</div>
                    <div class="header">
                        <table width="100%">
                            <tr>
                                <td>
                                    <h1 style="margin:0; color:${PRIMARY_BLUE}; font-family:'Arial', sans-serif; font-weight:900;">SYSTEM KYRON</h1>
                                    <p style="margin:0; font-family:'Arial', sans-serif; letter-spacing:3pt; color:#666;">CORPORATE INTELLIGENCE</p>
                                </td>
                                <td align="right">
                                    <p style="font-family:'Courier New', monospace; font-weight:bold;">REF: ZEDU-2026-MASTER</p>
                                    <p style="font-family:'Courier New', monospace;">DATE: ${new Date().toLocaleDateString()}</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="section-title">1. EXPEDIENTE TÉCNICO</div>
                    <div style="padding: 15pt;">
                        ${TEAM.map(t => `<div class="data-row"><span class="label">${t.label}:</span> <br/> <strong>${t.val}</strong></div>`).join('')}
                    </div>

                    <div class="section-title">2. INDICADORES DE IMPACTO</div>
                    <table class="table">
                        <tr>
                            ${STATS.map(s => `<td align="center"><span class="label">${s.label}</span><br/><span style="font-size:18pt; font-weight:bold;">${s.val}</span></td>`).join('')}
                        </tr>
                    </table>

                    <div class="section-title">3. DIAGNÓSTICO E IMPACTO</div>
                    <div style="padding: 15pt;">
                        <p><strong>PROBLEMA:</strong> ${SECTIONS.diagnostico.problema}</p>
                        <p><strong>CAUSAS:</strong> ${SECTIONS.diagnostico.causas}</p>
                        <p><strong>IMPACTO:</strong> ${SECTIONS.diagnostico.impacto}</p>
                    </div>

                    <div class="section-title">4. VIABILIDAD ECONÓMICA</div>
                    <table class="table">
                        <tr>
                            ${SECTIONS.factibilidad.map(f => `<td align="center"><span class="label">${f.label}</span><br/><strong>${f.val}</strong><br/><small>${f.desc}</small></td>`).join('')}
                        </tr>
                    </table>

                    <div class="section-title">5. ARQUITECTURA DE SOLUCIÓN</div>
                    <div style="padding: 15pt;">
                        <p><strong>VISIÓN:</strong> ${SECTIONS.solucion.vision}</p>
                        <p><strong>ESTRUCTURA:</strong> ${SECTIONS.solucion.arquitectura}</p>
                        <ul>
                            ${SECTIONS.solucion.capacidades.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="section-title">6. PRESUPUESTO MAESTRO (CAPEX)</div>
                    <table class="table">
                        <thead><tr><th>Componente</th><th align="right">Monto (USD)</th></tr></thead>
                        <tbody>
                            ${PRESUPUESTO.map(p => `<tr><td>${p.item}</td><td align="right">$ ${p.cost.toLocaleString()}</td></tr>`).join('')}
                            <tr style="background-color:#eee; font-weight:bold;"><td>TOTAL INVERSIÓN</td><td align="right">$ 11.900,00</td></tr>
                        </tbody>
                    </table>

                    <div class="footer">
                        EXPEDIENTE MAESTRO VALIDADO • © 2026 SYSTEM KYRON • NODO DE INTELIGENCIA CARACAS
                    </div>
                </body>
                </html>
            `;

            const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "EXPEDIENTE_MAESTRO_KYRON_2026.doc";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setIsExporting(false);
            
            toast({ 
                title: "TRANSMISIÓN COMPLETADA", 
                description: "Expediente exportado en alta fidelidad.", 
                action: <ShieldCheck className="text-primary h-4 w-4" /> 
            });
        }, 800);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#FDFBF0] text-[#1A1A1A] font-serif relative overflow-x-hidden selection:bg-primary/20">
            {/* Textura de papel sutil */}
            <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] -z-10" />
            
            {/* HUD Control Layer */}
            <div className="max-w-5xl mx-auto py-8 px-6 no-print">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-black/5 shadow-xl"
                >
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black">
                            <Link href="/">
                                <div className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER</div>
                            </Link>
                        </Button>
                        <div className="h-8 w-px bg-black/10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A2472]">Modo Auditoría Maestra</span>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.print()} className="h-11 rounded-xl border-black/10 bg-white font-black text-[10px] uppercase tracking-widest hover:bg-black/5 transition-all px-6">
                            <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                        </Button>
                        <Button onClick={handleDownload} disabled={isExporting} className="h-11 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472] text-white hover:bg-[#0A2472]/90 px-8">
                            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                            DESCARGAR EXPEDIENTE
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* CUERPO DEL EXPEDIENTE */}
            <motion.main 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="max-w-[900px] mx-auto px-6 pb-32"
            >
                <div className="bg-white p-12 md:p-24 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 rounded-[1rem] relative overflow-hidden">
                    
                    {/* Sellos de Seguridad */}
                    <div className="absolute top-12 right-12 opacity-20 pointer-events-none select-none">
                        <div className="border-4 border-[#B22222] text-[#B22222] font-black text-xl px-6 py-3 uppercase tracking-[0.2em] -rotate-12 rounded-xl">
                            Confidencial
                        </div>
                    </div>
                    
                    <div className="absolute bottom-24 left-12 opacity-10 pointer-events-none select-none">
                        <div className="border-2 border-[#0A2472] text-[#0A2472] font-black text-sm px-4 py-2 uppercase tracking-[0.5em] rotate-90 rounded-md">
                            Expediente Maestro
                        </div>
                    </div>

                    {/* Cabecera */}
                    <header className="flex flex-col sm:flex-row justify-between items-start gap-12 mb-20">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Logo className="h-12 w-12 grayscale" />
                                <div className="space-y-0.5">
                                    <h1 className="text-3xl font-black tracking-tight text-[#0A2472] font-sans">SYSTEM KYRON</h1>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Corporate Intelligence</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right font-mono space-y-1">
                            <p className="text-xs font-bold uppercase text-slate-400">Ref: ZEDU-2026-MASTER</p>
                            <p className="text-xs">Estatus: <span className="text-[#00A86B] font-bold">VALIDADO</span></p>
                            <p className="text-xs">Origen: Catia la Mar, VEN</p>
                        </div>
                    </header>

                    {/* Ficha Técnica */}
                    <section className="mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-10 border-b border-black/5 pb-2 font-sans">1. Ficha Técnica Operativa</h2>
                        <div className="grid gap-8">
                            {TEAM.map((t, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-48 shrink-0 font-sans">{t.label}</span>
                                    <span className="text-lg font-bold text-slate-800 italic">{t.val}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Indicadores Maestro */}
                    <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {STATS.map((stat, i) => (
                            <div key={i} className="bg-[#fcfaf2]/50 border border-black/5 p-6 rounded-2xl backdrop-blur-sm shadow-inner text-center space-y-3">
                                <stat.icon className="h-5 w-5 mx-auto text-slate-300" />
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 font-sans">{stat.label}</p>
                                    <p className={cn("text-2xl font-black font-sans tracking-tighter italic", stat.color || "text-slate-800")}>{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Diagnóstico */}
                    <section className="mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-10 border-b border-black/5 pb-2 font-sans">2. Diagnóstico de Nodo</h2>
                        <div className="space-y-12">
                            <div className="p-8 bg-[#fdfaf0] border-l-4 border-[#0A2472] rounded-r-2xl italic leading-relaxed text-xl text-slate-700">
                                "{SECTIONS.diagnostico.problema}"
                            </div>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans flex items-center gap-2">
                                        <Target className="h-3 w-3" /> Causas Identificadas
                                    </h4>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed uppercase">{SECTIONS.diagnostico.causas}</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0A2472] font-sans flex items-center gap-2">
                                        <ShieldCheck className="h-3 w-3" /> Importancia Estratégica
                                    </h4>
                                    <p className="text-sm font-bold text-slate-800 leading-relaxed uppercase">{SECTIONS.diagnostico.impacto}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Factibilidad */}
                    <section className="mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-10 border-b border-black/5 pb-2 font-sans">3. Dictamen de Factibilidad</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {SECTIONS.factibilidad.map((f, i) => (
                                <div key={i} className="text-center p-4">
                                    <p className="text-[9px] font-black uppercase text-slate-400 font-sans mb-1">{f.label}</p>
                                    <p className="text-xl font-black text-[#0A2472] italic font-sans">{f.val}</p>
                                    <p className="text-[8px] font-bold text-slate-300 uppercase mt-1">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 p-6 bg-[#00A86B]/5 border border-[#00A86B]/20 rounded-2xl flex items-center gap-6">
                            <Zap className="h-8 w-8 text-[#00A86B] shrink-0" />
                            <p className="text-sm font-bold italic text-[#00A86B] leading-relaxed">
                                DICTAMEN: VIABILIDAD SOBRESALIENTE. El modelo SaaS de System Kyron permite una escalabilidad total con costos operativos mínimos tras el despliegue del nodo inicial.
                            </p>
                        </div>
                    </section>

                    {/* Arquitectura */}
                    <section className="mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-10 border-b border-black/5 pb-2 font-sans">4. Arquitectura de Solución</h2>
                        <div className="space-y-8">
                            <div>
                                <p className="text-lg font-black uppercase italic text-[#0A2472] font-sans mb-4">{SECTIONS.solucion.vision}</p>
                                <p className="text-base text-slate-600 leading-relaxed text-justify mb-8">{SECTIONS.solucion.arquitectura}</p>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {SECTIONS.solucion.capacidades.map((c, i) => (
                                    <div key={i} className="p-6 bg-slate-50 border border-black/5 rounded-2xl text-center flex flex-col items-center justify-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                                        <div className="p-3 bg-white rounded-full shadow-inner border border-black/5 group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="h-5 w-5 text-slate-300 group-hover:text-[#0A2472]" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-tight">{c}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Aliados */}
                    <section className="mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-10 border-b border-black/5 pb-2 font-sans">5. Aliados del Ecosistema</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {["SAPI", "SENIAT", "CONATEL", "Holding Kyron"].map((a, i) => (
                                <div key={i} className="text-center space-y-2">
                                    <div className="h-16 flex items-center justify-center border-2 border-slate-100 rounded-xl mb-4 bg-slate-50 shadow-inner">
                                        <span className="font-black text-lg text-slate-300 font-sans italic">{a}</span>
                                    </div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Validado</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Presupuesto */}
                    <section className="mb-24">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0A2472] mb-10 border-b border-black/5 pb-2 font-sans">6. Presupuesto Maestro (CAPEX)</h2>
                        <div className="border border-black/5 rounded-2xl overflow-hidden shadow-2xl">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-900 hover:bg-slate-900 border-none">
                                        <TableHead className="font-black text-[9px] uppercase text-white/60 pl-8 py-5 tracking-widest font-sans">Inversión Tecnológica</TableHead>
                                        <TableHead className="text-right pr-8 font-black text-[9px] uppercase text-white/60 tracking-widest font-sans">USD</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PRESUPUESTO.map((row, i) => (
                                        <TableRow key={i} className="border-b border-black/5 hover:bg-slate-50 transition-colors">
                                            <TableCell className="text-xs font-bold uppercase pl-8 py-5 text-slate-700 italic">{row.item}</TableCell>
                                            <TableCell className="text-right font-mono font-black text-[#0A2472] pr-8 text-base">$ {row.cost.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-[#0A2472]/5 font-black">
                                        <TableCell className="text-base uppercase italic pl-8 py-8 text-[#0A2472] font-sans">Inversión Total Nodo</TableCell>
                                        <TableCell className="text-right text-3xl text-[#0A2472] font-black italic tracking-tighter pr-8 font-sans">$ 11.900,00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </section>

                    {/* Footer / Contacto */}
                    <footer className="pt-20 border-t-2 border-black space-y-12">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-between group hover:border-[#0A2472] transition-all">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-slate-400 font-sans tracking-widest">Canal Maestro</p>
                                        <p className="text-sm font-bold text-[#0A2472] italic">expedientes@systemkyron.com</p>
                                    </div>
                                    <Handshake className="h-6 w-6 text-slate-300 group-hover:text-[#0A2472] transition-colors" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 italic text-center md:text-left">
                                    EXPEDIENTE MAESTRO VALIDADO • © 2026 SYSTEM KYRON
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-end gap-4">
                                <div className="p-4 bg-white border border-black/5 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 cursor-pointer">
                                    <Image 
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=system-kyron-master-edu&bgcolor=ffffff&color=0A2472" 
                                        alt="QR Protocol" 
                                        width={100} 
                                        height={100}
                                        className="opacity-80"
                                    />
                                </div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono italic">Audit ID: KYRON-ZEDU-2026</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </motion.main>
        </div>
    );
}
