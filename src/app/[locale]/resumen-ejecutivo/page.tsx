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
                                <Globe className="h-3 w-3" /> 1. Visión Estratégica
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 pl-4 border-l-2 border-primary/10 print:border-black/10">
                                <div>
                                    <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">Misión Crítica</label>
                                    <p className="text-sm font-bold">Digitalizar el 100% de la operación empresarial venezolana en una sola infraestructura blindada.</p>
                                </div>
                                <div>
                                    <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">Impacto Directo</label>
                                    <p className="text-sm font-bold">Reducción del 40% en costos operativos y 90% en tiempos de procesamiento fiscal.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">2. El Ecosistema Kyron</h2>
                            <p className="text-sm leading-relaxed text-foreground/80 pl-4 border-l-2 border-primary/10 print:text-black print:border-black/10">
                                System Kyron no es solo un software; es un <strong>Ecosistema de Inteligencia Corporativa</strong> que unifica Contabilidad VEN-NIF, Gestión Legal Automatizada (SAPI/SENIAT), Recursos Humanos (LOTTT) y Conectividad 5G en una única interfaz de comando.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 print:text-black flex items-center gap-2">
                                <Leaf className="h-4 w-4" /> 3. Compromiso Sostenible (Zero Paper)
                            </h2>
                            <div className="pl-4 border-l-2 border-emerald-500/30 space-y-4 print:border-black/10">
                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                    <p className="text-sm text-foreground/80 print:text-black leading-relaxed">
                                        <strong className="text-emerald-500 uppercase tracking-tighter">Iniciativa Cero Papel:</strong> A través de la alianza estratégica con <strong>Ameru</strong>, hemos implementado el modelo de gestión documental 100% digital. Eliminamos la necesidad de archivos físicos, facturas impresas y reportes manuales, ahorrando más de 12,000 hojas anuales por cada empresa mediana.
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-4">
                                    <Recycle className="h-6 w-6 text-emerald-400 shrink-0" />
                                    <div>
                                        <p className="text-sm text-foreground/80 print:text-black leading-relaxed font-bold">Reciclaje Inteligente (Smart Bins):</p>
                                        <p className="text-[12px] text-white/60 print:text-black/60 leading-tight">
                                            Integración con contenedores inteligentes Ameru que utilizan inducción magnética para clasificar residuos. Cada acción de reciclaje genera <strong>Eco-Créditos Kyron</strong>, canjeables por servicios dentro del ecosistema.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" /> 4. Blindaje Legal y Seguridad
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10">
                                <p className="text-sm text-foreground/80 print:text-black">
                                    Protegemos la propiedad intelectual y la integridad operativa mediante <strong>Kyron Shield</strong>, un protocolo de cifrado AES-256 y sellado Blockchain que garantiza la inmutabilidad de cada documento y transacción fiscal.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">5. Roadmap 2026</h2>
                            <p className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/10 print:text-black print:border-black/10">
                                Expansión del ecosistema hacia la tokenización de activos inmobiliarios y la integración nativa con la Red de Pagos Interbancarios de Venezuela, consolidando a System Kyron como la columna vertebral digital del sector privado.
                            </p>
                        </section>

                        {/* Firma Final */}
                        <div className="mt-20 pt-10 flex flex-col items-center justify-center text-center space-y-4 border-t border-white/5">
                            <div className="h-[1px] w-48 bg-border print:bg-black" />
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] print:text-black">
                                Kyron Nexus AI • Certificación de Validez • 2026
                            </p>
                            <p className="text-[8px] text-white/20 font-black">EMPRENDIMIENTO CARLOS MATTAR · RIF: J-50832149-9</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
