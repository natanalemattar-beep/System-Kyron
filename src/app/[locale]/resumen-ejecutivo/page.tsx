'use client';

import { 
    Download, Printer, ShieldCheck, FileText, CheckCircle2, 
    FileDown, Leaf, Recycle, Globe, BrainCircuit, Banknote, 
    Target, Megaphone, Milestone, Users
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
                            <div className="pl-4 border-l-2 border-primary/10 print:border-black/10">
                                <p className="text-sm font-bold text-white print:text-black">Nombre: <span className="font-normal text-white/70 print:text-black/70">System Kyron (Nexus AI Ecosystem)</span></p>
                                <p className="text-sm font-bold text-white print:text-black">Eslogan: <span className="font-normal text-white/70 print:text-black/70">Un solo ecosistema. Un solo mando. Cero fronteras operativas.</span></p>
                                <p className="text-sm font-bold text-white print:text-black">Equipo: <span className="font-normal text-white/70 print:text-black/70">Liderado por Carlos Mattar (Tecnología), Sebastian Garrido (Operaciones) y Marcos Sousa (Legal).</span></p>
                            </div>
                        </section>

                        {/* 2. Definición del Problema */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Globe className="h-4 w-4" /> 2. DEFINICIÓN DEL PROBLEMA
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10">
                                <p className="text-sm text-white/70 print:text-black/70 leading-relaxed">
                                    Las PyMEs venezolanas enfrentan una **crisis de fragmentación**. Un empresario promedio debe gestionar entre 5 y 8 proveedores distintos para telefonía, contabilidad, legalidad y sostenibilidad, lo que genera una **pérdida de productividad del 40%** en saltos operativos. 
                                </p>
                                <p className="text-sm text-white/70 print:text-black/70 leading-relaxed italic border-l border-white/10 pl-4">
                                    "La burocracia digital y la desconexión entre el RIF, la telefonía corporativa y el cumplimiento fiscal SENIAT asfixian el crecimiento de los emprendimientos locales."
                                </p>
                            </div>
                        </section>

                        {/* 3. Propuesta de Valor */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Zap className="h-4 w-4" /> 3. PROPUESTA DE VALOR (LA SOLUCIÓN)
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10 text-sm text-white/70 print:text-black/70">
                                <p>System Kyron es el primer **mando único operativo** de Venezuela. Integra:</p>
                                <ul className="grid md:grid-cols-2 gap-4">
                                    <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Automatización Fiscal VEN-NIF y SENIAT en tiempo real.</li>
                                    <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Gestión nativa de líneas 5G y flotas móviles.</li>
                                    <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Blindaje Legal Automático (Kyron Shield).</li>
                                    <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Gestión de sostenibilidad con tecnología de inducción.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 4. Mercado Objetivo */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Target className="h-4 w-4" /> 4. MERCADO OBJETIVO
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10 text-sm text-white/70 print:text-black/70">
                                <p>Apuntamos a un mercado de **500,000+ PyMEs** y 2 millones de profesionales independientes en Venezuela.</p>
                                <p className="bg-white/5 p-4 rounded-xl border border-white/10 print:bg-black/5">
                                    <strong>Perfil del Cliente:</strong> Empresarios de 25-55 años que buscan formalizar su negocio, optimizar costos de telefonía y asegurar su cumplimiento legal sin contratar un ejército de consultores.
                                </p>
                            </div>
                        </section>

                        {/* 5. Modelo de Negocio */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Banknote className="h-4 w-4" /> 5. MODELO DE NEGOCIO
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10 text-sm text-white/70 print:text-black/70">
                                <p>Generamos ingresos a través de:</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">SaaS Recurrente</p>
                                        <p className="font-bold">$45-$190/mes</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Hardware Fiscal</p>
                                        <p className="font-bold">Venta Directa</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Telefonía 5G</p>
                                        <p className="font-bold">Planes Mensuales</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Estrategia de Marketing */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Megaphone className="h-4 w-4" /> 6. ESTRATEGIA DE MARKETING Y VENTAS
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-3 print:border-black/10 text-sm text-white/70 print:text-black/70">
                                <p>Canales principales:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Marketing Educativo:</strong> TikTok e Instagram para enseñar a formalizar empresas (Contenido viral).</li>
                                    <li><strong>Alianzas Estratégicas:</strong> Con cámaras de comercio y gremios contables en Venezuela.</li>
                                    <li><strong>Embajadores:</strong> Profesionales del derecho y contaduría que recomiendan la plataforma.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 7. Impacto Social o Ambiental */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 print:text-black flex items-center gap-2">
                                <Leaf className="h-4 w-4" /> 7. IMPACTO SOCIAL O AMBIENTAL
                            </h2>
                            <div className="pl-4 border-l-2 border-emerald-500/30 space-y-3 print:border-black/10 text-sm text-white/70 print:text-black/70">
                                <p><strong>Cero Papel:</strong> Digitalizamos la oficina venezolana, ahorrando 12,000 hojas de papel por empresa al año.</p>
                                <p><strong>Iniciativa Ameru:</strong> Implementación de Smart Bins para reciclaje urbano inteligente, fomentando la economía circular mediante recompensas digitales.</p>
                            </div>
                        </section>

                        {/* 8. Estado Actual y Hoja de Ruta */}
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary print:text-black flex items-center gap-2">
                                <Milestone className="h-4 w-4" /> 8. ESTADO ACTUAL Y HOJA DE RUTA
                            </h2>
                            <div className="pl-4 border-l-2 border-primary/10 space-y-4 print:border-black/10 text-sm text-white/70 print:text-black/70">
                                <p><strong>Etapa:</strong> Prototipo Funcional (MVP) y estructura legal completa con RIF J-50832149-9.</p>
                                <div className="space-y-2">
                                    <p className="font-bold text-white print:text-black uppercase text-[10px]">Objetivos 6 Meses:</p>
                                    <ol className="list-decimal pl-5 space-y-1">
                                        <li>Cerrar alianza con el primer operador 5G para integración de líneas.</li>
                                        <li>Alcanzar los primeros 500 clientes pagos (Beta privada).</li>
                                        <li>Lanzar el primer piloto de Smart Bins en un municipio del país.</li>
                                    </ol>
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
