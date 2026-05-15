'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
    Download, Printer, ShieldCheck, FileText, CheckCircle2, 
    FileDown, Leaf, Recycle, Globe, Brain, Banknote, 
    Target, Megaphone, Milestone, Users, Zap, Cpu
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/landing-header';

export default function ResumenEjecutivoPage() {
    const handlePrint = () => {
        window.print();
    };

    const handleExportWord = () => {
        const content = document.getElementById('reporte-contenido')?.innerHTML;
        if (!content) return;
        
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                "xmlns='http://www.w3.org/TR/REC-html40'>" +
                "<head><meta charset='utf-8'><title>Resumen Ejecutivo Kyron</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileLink = document.createElement("a");
        fileLink.href = source;
        fileLink.download = 'RESUMEN_EJECUTIVO_KYRON.doc';
        fileLink.click();
    };

    return (
        <div className="min-h-screen bg-[#030711]">
            <LandingHeader />
            
            <div className="container mx-auto px-6 py-32 max-w-4xl print:p-0">
                {/* Header del Panel - Se oculta al imprimir */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 print:hidden"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Documentación Oficial Reto Inspira 2026</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                            Resumen <span className="text-primary italic">Ejecutivo</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <Button variant="outline" onClick={handlePrint} className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[10px] tracking-widest text-white">
                            <Printer className="h-4 w-4 mr-2" /> Descargar PDF
                        </Button>
                        <Button onClick={handleExportWord} variant="outline" className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[10px] tracking-widest text-white">
                            <FileDown className="h-4 w-4 mr-2" /> Exportar Word
                        </Button>
                    </div>
                </motion.div>

                {/* Documento Estilizado */}
                <Card id="reporte-contenido" className="p-12 md:p-16 rounded-[3rem] border-white/10 bg-zinc-950 shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
                    {/* Estilos para Impresión */}
                    <style jsx global>{`
                        @media print {
                            body { background: white !important; color: black !important; }
                            .print\\:hidden { display: none !important; }
                            * { border-color: #eee !important; }
                            .text-primary { color: #000 !important; font-weight: bold !important; }
                            .bg-primary { background: #000 !important; }
                            .container { padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
                            section { break-inside: avoid; }
                        }
                    `}</style>

                    {/* Header del Documento */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-border pb-10 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 print:bg-black">
                                    <ShieldCheck className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-2xl font-black tracking-tighter text-white print:text-black uppercase">SYSTEM KYRON</span>
                                    <div className="h-1 w-full bg-gradient-to-r from-primary to-transparent mt-1 print:bg-black" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest print:text-black/60">
                                    ESLOGAN: <span className="text-white print:text-black font-bold italic">"EL FUTURO DE LA INTELIGENCIA CORPORATIVA"</span>
                                </p>
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest print:text-black/60">
                                    EQUIPO: <span className="text-white print:text-black font-bold">CARLOS MATTAR · SEBASTIAN GARRIDO · MARCOS SOUSA</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 print:hidden">
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-black text-[10px] py-1 px-3">
                                RIF: J-50832149-9
                            </Badge>
                        </div>
                    </div>

                    {/* Secciones del Resumen Ejecutivo */}
                    <div className="space-y-12">
                        {/* 1. Información General */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <FileText className="h-4 w-4" /> 1. INFORMACIÓN GENERAL
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 grid md:grid-cols-2 gap-4 print:border-black/10">
                                <div>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Nombre y Eslogan</p>
                                    <p className="text-sm font-bold text-white print:text-black">System Kyron: Intelligence Hub 4.0</p>
                                    <p className="text-xs text-white/60 print:text-black/60 italic">"El Futuro de la Inteligencia Corporativa en Venezuela"</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Equipo Directivo</p>
                                    <p className="text-sm font-bold text-white print:text-black">C. Mattar (Tech) · S. Garrido (Ops) · M. Sousa (Legal)</p>
                                    <p className="text-xs text-white/60 print:text-black/60">RIF Jurídico: J-50832149-9</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Definición del Problema */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Globe className="h-4 w-4" /> 2. DEFINICIÓN DEL PROBLEMA
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-4 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70 leading-relaxed">
                                    La fragmentación operativa en Venezuela genera una **parálisis de productividad**. El empresario PyME promedio desperdicia el **40% de su jornada** saltando entre sistemas aislados:
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black text-rose-500 uppercase">Tiempo</p>
                                        <p className="text-xs font-bold text-white">-4h diarias</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black text-rose-500 uppercase">Papel</p>
                                        <p className="text-xs font-bold text-white">12k hojas/año</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black text-rose-500 uppercase">Legal</p>
                                        <p className="text-xs font-bold text-white">Riesgo SENIAT</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black text-rose-500 uppercase">Costos</p>
                                        <p className="text-xs font-bold text-white">+30% Ineficiencia</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Propuesta de Valor */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Zap className="h-4 w-4" /> 3. PROPUESTA DE VALOR
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-4 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70">Kyron es un **mando único** que fusiona tres pilares críticos en una interfaz de alto rendimiento:</p>
                                <ul className="grid md:grid-cols-3 gap-6">
                                    <li className="space-y-2">
                                        <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20"><Cpu className="h-4 w-4" /></div>
                                        <p className="text-[11px] font-bold text-white">Conectividad 5G</p>
                                        <p className="text-[10px] text-white/40">**Reserva bajo demanda** (500MB + 30 min) para recargas sin saldo o continuidad opcional.</p>
                                    </li>
                                    <li className="space-y-2">
                                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><ShieldCheck className="h-4 w-4" /></div>
                                        <p className="text-[11px] font-bold text-white">SaaS Fiscal/Legal</p>
                                        <p className="text-[10px] text-white/40">Automatización VEN-NIF y blindaje jurídico en tiempo real.</p>
                                    </li>
                                    <li className="space-y-2">
                                        <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20"><Leaf className="h-4 w-4" /></div>
                                        <p className="text-[11px] font-bold text-white">Economía Circular</p>
                                        <p className="text-[10px] text-white/40">Smart Bins por inducción magnética y sistema de Eco-Créditos.</p>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 4. Mercado Objetivo */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Target className="h-4 w-4" /> 4. MERCADO OBJETIVO
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 grid md:grid-cols-2 gap-8 print:border-black/10">
                                <div className="space-y-2 text-sm text-white/70 print:text-black/70">
                                    <p className="font-bold text-white">Segmento B2B:</p>
                                    <p>500,000+ PyMEs activas en Venezuela (Retail, Servicios, Manufactura).</p>
                                </div>
                                <div className="space-y-2 text-sm text-white/70 print:text-black/70">
                                    <p className="font-bold text-white">Segmento B2G/B2C:</p>
                                    <p>Alcaldías (Gestión urbana) y 2M+ Profesionales Independientes.</p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Modelo de Negocio */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Banknote className="h-4 w-4" /> 5. MODELO DE NEGOCIO
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-4 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70">Estructura de ingresos diversificada basada en recurrencia y venta de activos:</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="border border-white/5 p-3 rounded-xl bg-white/[0.02] text-center">
                                        <p className="text-[10px] text-white/40 font-black mb-1">MANT. LÍNEA</p>
                                        <p className="text-sm font-black text-primary">$3 - $10/mes</p>
                                    </div>
                                    <div className="border border-white/5 p-3 rounded-xl bg-white/[0.02] text-center">
                                        <p className="text-[10px] text-white/40 font-black mb-1">SaaS SAAS</p>
                                        <p className="text-sm font-black text-white">$45 - $190</p>
                                    </div>
                                    <div className="border border-white/5 p-3 rounded-xl bg-white/[0.02] text-center">
                                        <p className="text-[10px] text-white/40 font-black mb-1">MÁRGEN NETO</p>
                                        <p className="text-sm font-black text-emerald-500">65% Proy.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Estrategia de Marketing */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Megaphone className="h-4 w-4" /> 6. ESTRATEGIA DE MARKETING
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 grid md:grid-cols-2 gap-6 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70">
                                    **TikTok & Instagram (Marketing Educativo)**: Campañas virales sobre "Cómo formalizar tu empresa en 5 minutos" para captar leads orgánicos.
                                </p>
                                <p className="text-sm text-white/70 print:text-black/70">
                                    **Cámaras de Comercio & Gremios**: Alianzas para ofrecer la plataforma como beneficio a agremiados (Canal Indirecto).
                                </p>
                            </div>
                        </section>

                        {/* 7. Impacto Social o Ambiental */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 print:text-black flex items-center gap-2">
                                <Leaf className="h-4 w-4" /> 7. IMPACTO AMBIENTAL (AMERU)
                            </h2>
                            <div className="pl-4 border-l-2 border-emerald-500/30 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70 leading-relaxed italic">
                                    "System Kyron no solo digitaliza el papel, sino que gestiona físicamente los residuos a través de la alianza con Ameru. La inducción magnética permite un procesamiento 4x más rápido en Smart Bins urbanos."
                                </p>
                            </div>
                        </section>

                        {/* 8. Estado Actual y Hoja de Ruta */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Milestone className="h-4 w-4" /> 8. ESTADO ACTUAL Y HOJA DE RUTA
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-4 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70">**Estado Actual**: MVP validado en entorno local. RIF Jurídico J-50832149-9 activo.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black text-primary mb-2 uppercase">Mes 2</p>
                                        <p className="text-[11px] font-bold text-white">Primeras 100 PyMEs Pago</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black text-primary mb-2 uppercase">Mes 4</p>
                                        <p className="text-[11px] font-bold text-white">Alianza Operador 5G</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black text-primary mb-2 uppercase">Mes 6</p>
                                        <p className="text-[11px] font-bold text-white">Lanzamiento Smart Bins</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Firma Final */}
                        <div className="mt-20 pt-10 flex flex-col items-center justify-center text-center space-y-4 border-t border-white/5">
                            <div className="h-[1px] w-48 bg-border print:bg-black" />
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] print:text-black">
                                Kyron Nexus AI • Certificación de Validez • Reto Inspira 2026
                            </p>
                            <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
