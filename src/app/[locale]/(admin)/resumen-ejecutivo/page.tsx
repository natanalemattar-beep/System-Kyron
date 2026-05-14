'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Printer, ShieldCheck, FileText, CheckCircle2, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
        <div className="container mx-auto px-6 py-12 max-w-4xl print:p-0">
            {/* Header del Panel - Se oculta al imprimir */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 print:hidden"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Generador de Documentación</span>
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                        Reporte <span className="text-primary italic">Oficial</span>
                    </h1>
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <Button variant="outline" onClick={handlePrint} className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[10px] tracking-widest">
                        <Printer className="h-4 w-4 mr-2" /> Exportar PDF
                    </Button>
                    <Button onClick={handleExportWord} variant="outline" className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[10px] tracking-widest">
                        <FileDown className="h-4 w-4 mr-2" /> Exportar Word
                    </Button>
                </div>
            </motion.div>

            {/* Documento Estilizado */}
            <Card id="reporte-contenido" className="p-12 md:p-16 rounded-[3rem] border-white/10 bg-card shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
                {/* Estilos para Impresión */}
                <style jsx global>{`
                    @media print {
                        body { background: white !important; color: black !important; }
                        .print\\:hidden { display: none !important; }
                        * { border-color: #eee !important; }
                        .text-primary { color: #000 !important; font-weight: bold !important; }
                        .bg-primary { background: #000 !important; }
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
                                <span className="text-2xl font-black tracking-tighter text-foreground print:text-black">SYSTEM KYRON</span>
                                <div className="h-1 w-full bg-gradient-to-r from-primary to-transparent mt-1 print:bg-black" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest print:text-black/60">
                                PROYECTO: <span className="text-foreground print:text-black font-bold">RETO INSPIRA 2026</span>
                            </p>
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest print:text-black/60">
                                EMISIÓN: <span className="text-foreground print:text-black font-bold">{new Date().toLocaleDateString('es-VE')}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 print:hidden">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-black text-[10px] py-1 px-3">
                            Verificado por Kyron Shield
                        </Badge>
                    </div>
                </div>

                {/* Secciones del Resumen Ejecutivo */}
                <div className="space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">1. Información General</h2>
                        <div className="grid md:grid-cols-2 gap-6 pl-4 border-l-2 border-primary/10 print:border-black/10">
                            <div>
                                <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">Nombre del Proyecto</label>
                                <p className="text-sm font-bold">System Kyron</p>
                            </div>
                            <div>
                                <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">Equipo</label>
                                <p className="text-sm font-bold">Carlos Mattar, Sebastian Garrido y Marcos Sousa</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1 block">Eslogan</label>
                                <p className="text-sm font-medium italic">"El Ecosistema de Inteligencia Corporativa para el Futuro de Venezuela"</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">2. Definición del Problema</h2>
                        <p className="text-sm leading-relaxed text-foreground/80 pl-4 border-l-2 border-primary/10 print:text-black print:border-black/10">
                            Las PYMES en Venezuela enfrentan un caos administrativo por procesos manuales y falta de blindaje legal. Más del 70% operan en informalidad técnica, perdiendo un 40% de productividad.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">3. Propuesta de Valor</h2>
                        <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10">
                            <p className="text-sm text-foreground/80 print:text-black font-bold">System Kyron centraliza la operación en tres pilares:</p>
                            <ul className="list-disc pl-5 text-sm space-y-1 print:text-black">
                                <li>Contabilidad automatizada VEN-NIF.</li>
                                <li>Blindaje legal automático vía Kyron Shield.</li>
                                <li>Integración de líneas corporativas.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black">4. Modelo de Negocio</h2>
                        <p className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/10 print:text-black print:border-black/10">
                            Modelo SaaS por suscripción mensual (Starter, Growth, Enterprise) y comisiones por trámites legales automatizados.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 print:text-black">5. Sostenibilidad e Impacto Social</h2>
                        <div className="pl-4 border-l-2 border-emerald-500/30 space-y-3 print:border-black/10">
                            <p className="text-sm text-foreground/80 print:text-black leading-relaxed">
                                <strong className="text-emerald-500">Modelo "Cero Papel":</strong> Somos pioneros en la eliminación de la huella de carbono administrativa en Venezuela. Digitalizamos el 100% de la gestión documental, eliminando el uso de archivos físicos y optimizando recursos naturales.
                            </p>
                            <p className="text-sm text-foreground/80 print:text-black leading-relaxed">
                                <strong className="text-primary">Impacto Social:</strong> Democratizamos el acceso a herramientas de gestión y blindaje legal de élite para el emprendedor, fortaleciendo el tejido económico nacional de forma ética y transparente.
                            </p>
                        </div>
                    </section>

                    {/* Firma Final */}
                    <div className="mt-20 pt-10 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-[1px] w-48 bg-border print:bg-black" />
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] print:text-black">
                            Kyron Nexus AI • Certificación Oficial
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
