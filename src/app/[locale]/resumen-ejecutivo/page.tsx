'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Printer, ShieldCheck, FileText, CheckCircle2, FileDown, Leaf, Recycle, Globe } from 'lucide-react';
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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Generador de Documentación Oficial</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                            Resumen <span className="text-primary italic">Ejecutivo</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <Button variant="outline" onClick={handlePrint} className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[10px] tracking-widest text-white">
                            <Printer className="h-4 w-4 mr-2" /> Imprimir / PDF
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
                                    <span className="text-2xl font-black tracking-tighter text-foreground print:text-black uppercase">SYSTEM KYRON</span>
                                    <div className="h-1 w-full bg-gradient-to-r from-primary to-transparent mt-1 print:bg-black" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest print:text-black/60">
                                    PROYECTO: <span className="text-foreground print:text-black font-bold">RETO INSPIRA 2026</span>
                                </p>
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest print:text-black/60">
                                    ESTADO: <span className="text-emerald-500 font-bold">PRODUCCIÓN · CERTIFICADO</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 print:hidden">
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-black text-[10px] py-1 px-3">
                                Verificado por Kyron Shield v3
                            </Badge>
                        </div>
                    </div>

                    {/* Secciones del Resumen Ejecutivo */}
                    <div className="space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Globe className="h-3 w-3" /> 1. Visión Estratégica y El Problema
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 pl-4 border-l-2 border-primary/10 print:border-black/10">
                                <div>
                                    <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">El Caos Operativo</label>
                                    <p className="text-sm font-bold">Los empresarios pierden el 40% de su tiempo gestionando entre 5 y 8 proveedores distintos para telefonía, contabilidad y legalidad.</p>
                                </div>
                                <div>
                                    <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">La Solución Kyron</label>
                                    <p className="text-sm font-bold">Unificar la conectividad, fiscalidad y legalidad en una sola fibra operativa blindada para recuperar la productividad.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">2. Arquitectura de Portales Inteligentes</h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-4 print:text-black print:border-black/10">
                                <p className="text-sm leading-relaxed text-foreground/80">
                                    Kyron se despliega a través de dos interfaces críticas que centralizan la identidad y la operación:
                                </p>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Portal Ciudadano (Identidad Personal)</h4>
                                        <ul className="text-[11px] space-y-2 text-white/60">
                                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-cyan-500" /> Cuenta Personal: Documentación de identidad avanzada.</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-cyan-500" /> Mi Línea Personal: Gestión de consumo y recargas.</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-cyan-500" /> Mi Línea Empresa: Control total de flotas corporativas.</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Portales Corporativos (Infraestructura)</h4>
                                        <ul className="text-[11px] space-y-2 text-white/60">
                                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Asesoría Contable y Legal: Automatización total VEN-NIF.</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Facturación (TPV): Punto de venta inteligente multimoneda.</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Socios y Sostenibilidad: Supervisión estratégica y eco-gestión.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 print:text-black flex items-center gap-2">
                                <Leaf className="h-4 w-4" /> 3. Sostenibilidad y Alianza Ameru
                            </h2>
                            <div className="pl-4 border-l-2 border-emerald-500/30 space-y-4 print:border-black/10">
                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                    <p className="text-sm text-foreground/80 print:text-black leading-relaxed">
                                        <strong className="text-emerald-500 uppercase tracking-tighter">Iniciativa Smart Bins:</strong> En alianza con Ameru, implementamos contenedores de inducción magnética para reciclaje. El modelo <strong>Cero Papel</strong> de Kyron digitaliza el 100% de la oficina, ahorrando 12,000 hojas anuales por empresa y generando <strong>Eco-Créditos</strong> canjeables.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <BrainCircuit className="h-4 w-4" /> 4. Capa Tecnológica (AI & Blockchain)
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10">
                                <p className="text-sm text-foreground/80 print:text-black">
                                    Utilizamos <strong>Kyron Shield</strong> para cifrado bancario y <strong>Blockchain</strong> para garantizar la inmutabilidad de los registros fiscales. Nuestra <strong>IA Predictiva</strong> analiza tendencias de mercado y tasa BCV para sugerir ajustes de precios y flujo de caja en tiempo real.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 print:text-black flex items-center gap-2">
                                <Banknote className="h-4 w-4" /> 5. Modelo de Negocio y Mercado
                            </h2>
                            <div className="pl-4 border-l-2 border-amber-500/10 space-y-3 print:border-black/10">
                                <p className="text-sm text-foreground/80 print:text-black">
                                    Operamos bajo un modelo <strong>SaaS Recurrente</strong> con planes escalables. Apuntamos a un mercado de <strong>500,000 PyMEs</strong> en Venezuela, con una estrategia de marketing educativa en TikTok e Instagram enfocada en la formalización empresarial y el crecimiento digital.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">6. Roadmap y Formalización</h2>
                            <p className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/10 print:text-black print:border-black/10">
                                Actualmente en fase de <strong>Prototipo Funcional</strong>. Contamos con estructura legal completa (RIF J-50832149-9). Nuestra hoja de ruta 2026 contempla la captación de los primeros 1,000 clientes corporativos y la integración con la red de pagos interbancarios.
                            </p>
                        </section>

                        {/* Firma Final */}
                        <div className="mt-20 pt-10 flex flex-col items-center justify-center text-center space-y-4 border-t border-white/5">
                            <div className="h-[1px] w-48 bg-border print:bg-black" />
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] print:text-black">
                                Kyron Nexus AI • Certificación de Validez • Reto Inspira 2026
                            </p>
                            <p className="text-[8px] text-white/20 font-black">EMPRENDIMIENTO CARLOS MATTAR · RIF: J-50832149-9</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
