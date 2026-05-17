'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
    FileText, ShieldCheck, FileDown, Leaf, Recycle, Globe, 
    Brain, Banknote, Target, Megaphone, Milestone, Users, 
    Zap, Cpu, Smartphone, Wifi, Printer, Loader2, 
    Signal, BarChart3, Building2, TreePine, Sparkles, Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/landing-header';
import Image from 'next/image';

export default function ResumenEjecutivoPage() {
    const [isExporting, setIsExporting] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const handleExportWord = () => {
        const styles = `
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 48px; color: #0f172a; background: #fff; }
            .kyron-header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0A2472; padding-bottom: 24px; }
            h1 { color: #0A2472; font-size: 28pt; font-weight: 900; text-transform: uppercase; }
            h2 { color: #0A2472; font-size: 16pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-top: 40px; }
            h3 { color: #00A86B; font-size: 12pt; font-weight: 800; text-transform: uppercase; }
            p { font-size: 11pt; line-height: 1.7; color: #334155; margin-bottom: 12px; }
            ul { margin-bottom: 20px; padding-left: 24px; }
            li { font-size: 11pt; color: #334155; margin-bottom: 8px; }
            .footer { text-align: center; font-size: 9pt; color: #94a3b8; margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        `;
        const el = document.getElementById('reporte-contenido');
        if (!el) return;
        let content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/gi, '');
        const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Resumen Ejecutivo Kyron</title><style>${styles}</style></head>
<body>
    <div class="kyron-header">
        <h1>SYSTEM KYRON</h1>
        <p style="font-size: 12pt; color: #64748b; text-transform: uppercase; letter-spacing: 3px;">Resumen Ejecutivo — Reto Inspira 2026</p>
        <p style="font-size: 10pt; color: #94a3b8;">Equipo: Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
    </div>
    ${content}
    <div class="footer">
        <p>System Kyron — El ecosistema que protege tu linea, tu negocio y el ambiente</p>
        <p>&copy; 2026 Emprendimiento Carlos Mattar &bull; infosystemkyron@gmail.com</p>
    </div>
</body></html>`;
        const blob = new Blob(["\ufeff", html], { type: 'application/vnd.ms-word' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = 'RESUMEN_EJECUTIVO_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    const handleExportPDF = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const element = pdfRef.current;
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                imageTimeout: 15000,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 0.5;
            const imgWidth = pageWidth - margin * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = margin;

            pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - margin * 2;

            while (heightLeft > 0) {
                position = margin - (pageHeight - margin * 2 - heightLeft);
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight - margin * 2;
            }

            pdf.save('System_Kyron_Resumen_Ejecutivo.pdf');
        } catch (error) {
            console.error('PDF Error:', error);
            alert('Error al generar el PDF. Intenta de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030711]">
            <LandingHeader />
            
            <div className="container mx-auto px-6 py-32 max-w-4xl print:p-0">
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
                        <Button 
                            variant="outline" 
                            onClick={handleExportPDF} 
                            disabled={isExporting}
                            className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[11px] tracking-widest text-white"
                        >
                            {isExporting ? (
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            ) : (
                                <Printer className="h-5 w-5 mr-2" />
                            )}
                            {isExporting ? 'Generando...' : 'Descargar PDF'}
                        </Button>
                        <Button onClick={handleExportWord} className="flex-1 md:flex-none rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/30">
                            <FileDown className="h-5 w-5 mr-2" /> Exportar Word
                        </Button>
                    </div>
                </motion.div>

                {/* Versión web - dark */}
                <Card id="reporte-contenido" className="p-8 md:p-12 rounded-[3rem] border-white/10 bg-zinc-950 shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
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

                    {/* Header con logo */}
                    <div className="flex items-center gap-5 mb-10 pb-6 border-b border-white/10">
                        <div className="relative h-14 w-14 shrink-0">
                            <Image
                                src="/images/logo-kyron-hq.png"
                                alt="System Kyron"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <div className="space-y-2">
                            <span className="text-xl font-black tracking-tighter uppercase text-white">SYSTEM KYRON</span>
                            <div className="h-0.5 w-full bg-gradient-to-r from-primary to-transparent" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                ESLOGAN: <span className="font-bold italic text-white">&ldquo;EL ECOSISTEMA QUE PROTEGE TU LÍNEA, TU NEGOCIO Y EL AMBIENTE&rdquo;</span>
                            </p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                EQUIPO: <span className="font-bold text-white">CARLOS MATTAR · SEBASTIÁN GARRIDO · MARCOS SOUSA</span>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* 1. Información General */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <FileText className="h-4 w-4" /> 1. INFORMACIÓN GENERAL
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase mb-1 text-muted-foreground">Nombre del Proyecto</p>
                                    <p className="text-sm font-bold text-white">System Kyron</p>
                                    <p className="text-xs italic text-white/60">El ecosistema que protege tu línea, tu negocio y el ambiente.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase mb-1 text-muted-foreground">Equipo</p>
                                    <p className="text-sm font-bold text-white">Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
                                    <p className="text-xs text-white/60">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Definición del Problema */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Globe className="h-4 w-4" /> 2. DEFINICIÓN DEL PROBLEMA
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 space-y-4">
                                <p className="text-sm leading-relaxed text-white/70">
                                    El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong>&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Signal className="h-4 w-4 text-rose-500" />
                                            <p className="text-[9px] font-black text-rose-500 uppercase">Telecomunicaciones</p>
                                        </div>
                                        <p className="text-xs font-bold text-white">21M+ líneas vulnerables</p>
                                        <p className="text-[10px] mt-1 text-white/40">Bloqueos y fraudes constantes.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Recycle className="h-4 w-4 text-amber-500" />
                                            <p className="text-[9px] font-black text-amber-500 uppercase">Sostenibilidad</p>
                                        </div>
                                        <p className="text-xs font-bold text-white">+50% residuos sin reciclar</p>
                                        <p className="text-[10px] mt-1 text-white/40">Falta de incentivos y trazabilidad.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BarChart3 className="h-4 w-4 text-orange-500" />
                                            <p className="text-[9px] font-black text-orange-500 uppercase">Carga Administrativa</p>
                                        </div>
                                        <p className="text-xs font-bold text-white">134 hrs/año perdidas</p>
                                        <p className="text-[10px] mt-1 text-white/40">Burocracia y riesgo de multas.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Propuesta de Valor */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Zap className="h-4 w-4" /> 3. PROPUESTA DE VALOR (LA SOLUCIÓN)
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 space-y-4">
                                <p className="text-sm text-white/70">
                                    System Kyron es un <strong>ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong>cuatro pilares</strong>:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ShieldCheck className="h-4 w-4 text-indigo-400" />
                                            <p className="text-[10px] font-black text-indigo-400 uppercase">Seguridad (Kyron Shield)</p>
                                        </div>
                                        <p className="text-[11px] text-white/60">Reposición de equipos, defensa legal y <strong>&ldquo;Modo Reserva&rdquo;</strong> —accede a la App sin saldo ni megas.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Cpu className="h-4 w-4 text-cyan-400" />
                                            <p className="text-[10px] font-black text-cyan-400 uppercase">Software (SaaS)</p>
                                        </div>
                                        <p className="text-[11px] text-white/60">Plataforma modular de operación empresarial sin contratos anuales.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Printer className="h-4 w-4 text-amber-400" />
                                            <p className="text-[10px] font-black text-amber-400 uppercase">Hardware (Fintech Fiscal)</p>
                                        </div>
                                        <p className="text-[11px] text-white/60">Infraestructura de facturación de lujo, 100% homologada por el SENIAT.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Leaf className="h-4 w-4 text-emerald-400" />
                                            <p className="text-[10px] font-black text-emerald-400 uppercase">Impacto</p>
                                        </div>
                                        <p className="text-[11px] text-white/60">Reciclaje conectado que genera rentabilidad.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Mercado Objetivo */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Target className="h-4 w-4" /> 4. MERCADO OBJETIVO
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 space-y-4">
                                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-sm leading-relaxed text-white/70">
                                        Nuestro cliente ideal está representado por el perfil de <strong>&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <Building2 className="h-5 w-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Tamaño de Mercado</p>
                                        <p className="text-xs text-white/60"><strong>500,000 PyMEs</strong> existentes en Venezuela.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Modelo de Negocio */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Banknote className="h-4 w-4" /> 5. MODELO DE NEGOCIO
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 space-y-5">
                                <p className="text-sm text-white/70">Generamos ingresos a través de <strong>tres vías escalables</strong>:</p>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase flex items-center gap-2 text-cyan-400">
                                        <Layers className="h-3 w-3" /> Suscripciones SaaS
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-3 rounded-xl text-center border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Microempresa</p>
                                            <p className="text-sm font-black text-primary">$19.99/mes</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Comercio</p>
                                            <p className="text-sm font-black text-white">$49.99/mes</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Corporativo</p>
                                            <p className="text-sm font-black text-white">$99.99/mes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase flex items-center gap-2 text-emerald-400">
                                        <Wifi className="h-3 w-3" /> Conectividad 5G Global
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Personal</p>
                                            <p className="text-sm font-black text-white">Desde $6.99</p>
                                            <p className="text-[9px] text-white/30">Prepago · Pospago · eSIM</p>
                                        </div>
                                        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Empresarial</p>
                                            <p className="text-sm font-black text-white">Desde $9.99</p>
                                            <p className="text-[9px] text-white/30">Prepago · Pospago · eSIM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase flex items-center gap-2 text-amber-400">
                                        <Printer className="h-3 w-3" /> Hardware Fiscal Premium
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-3 rounded-xl text-center border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Impresora Fiscal</p>
                                            <p className="text-sm font-black text-white">$849</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Caja Auto-Pago</p>
                                            <p className="text-sm font-black text-white">$1,394</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-white/5 bg-white/[0.02]">
                                            <p className="text-[9px] font-black uppercase mb-1 text-white/40">Kit TPV Completo</p>
                                            <p className="text-sm font-black text-white">$2,499</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                        <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                                        <p className="text-[10px] text-white/60"><strong>Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Estrategia de Marketing */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Megaphone className="h-4 w-4" /> 6. ESTRATEGIA DE MARKETING Y VENTAS
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 space-y-4">
                                <p className="text-sm text-white/70">
                                    Nuestra captación (B2B) se fundamenta en demostrar el <strong>retorno de inversión</strong> y operar a través de alianzas de clase mundial:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black uppercase mb-1 text-cyan-400">Coca-Cola FEMSA</p>
                                        <p className="text-[10px] text-white/40">Canal comercial de reciclaje.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black uppercase mb-1 text-cyan-400">The Factory HKA</p>
                                        <p className="text-[10px] text-white/40">Manufactura de hardware.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black uppercase mb-1 text-cyan-400">Ameru.AI</p>
                                        <p className="text-[10px] text-white/40">Tecnología IoT.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                        <p className="text-[9px] font-black uppercase text-emerald-400">Ahorro Fiscal</p>
                                        <p className="text-lg font-black text-white">$8,500</p>
                                        <p className="text-[10px] text-white/40">anuales por cliente</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                        <p className="text-[9px] font-black uppercase text-emerald-400">Tiempo Recuperado</p>
                                        <p className="text-lg font-black text-white">15 hrs</p>
                                        <p className="text-[10px] text-white/40">mensuales en gestión</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                        <p className="text-[9px] font-black uppercase text-emerald-400">ROI Proyectado</p>
                                        <p className="text-lg font-black text-white">187%</p>
                                        <p className="text-[10px] text-white/40">retorno de inversión</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 7. Impacto Social o Ambiental */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                                <TreePine className="h-4 w-4" /> 7. IMPACTO SOCIAL O AMBIENTAL
                            </h2>
                            <div className="pl-4 border-l-2 border-emerald-500/30 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                                <p className="text-sm leading-relaxed text-white/70">
                                    En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong>Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                        <Recycle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-emerald-400">Eco-créditos</p>
                                            <p className="text-[11px] text-white/50">Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                        <Leaf className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-emerald-400">Huella de Carbono</p>
                                            <p className="text-[11px] text-white/50"><strong>1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 8. Estado Actual y Hoja de Ruta */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <Milestone className="h-4 w-4" /> 8. ESTADO ACTUAL Y HOJA DE RUTA
                            </h2>
                            <div className="pl-4 border-l-2 border-white/10 space-y-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <Zap className="h-5 w-5 text-amber-400 shrink-0" />
                                    <p className="text-sm text-white/70">Fase <strong>pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black uppercase mb-2 text-primary">2026</p>
                                        <p className="text-[11px] font-bold text-white">Despliegue nacional</p>
                                        <p className="text-[10px] text-white/40">Venezuela</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black uppercase mb-2 text-primary">2027</p>
                                        <p className="text-[11px] font-bold text-white">Expansión regional</p>
                                        <p className="text-[10px] text-white/40">Colombia y Panamá</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[9px] font-black uppercase mb-2 text-primary">2028</p>
                                        <p className="text-[11px] font-bold text-white">Consolidación</p>
                                        <p className="text-[10px] text-white/40">México y EE. UU.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Footer */}
                        <div className="pt-8 flex flex-col items-center justify-center text-center space-y-3 border-t border-white/5">
                            <div className="h-px w-48 bg-white/10" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                                Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
                            </p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 print:hidden">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-black text-[10px] py-1 px-3">
                            RIF: J-50832149-9
                        </Badge>
                    </div>
                </Card>

                {/* Versión PDF - white (oculta, solo para captura) */}
                <div ref={pdfRef} style={{ position: 'absolute', left: '0', top: '0', width: '8.5in', padding: '0.75in', zIndex: -1, opacity: 0.99, pointerEvents: 'none', background: '#ffffff', color: '#000000' }}>
                    {/* Header con logo */}
                    <div className="flex items-center gap-5 mb-10 pb-6 border-b border-gray-300">
                        <div className="relative h-16 w-16 shrink-0">
                            <Image
                                src="/images/logo-kyron-hq.png"
                                alt="System Kyron"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <div className="space-y-2">
                            <span className="text-xl font-black tracking-tighter uppercase text-[#0A2472]">SYSTEM KYRON</span>
                            <div className="h-0.5 w-full bg-[#0A2472]" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                                ESLOGAN: <span className="font-bold italic text-black">&ldquo;EL ECOSISTEMA QUE PROTEGE TU LÍNEA, TU NEGOCIO Y EL AMBIENTE&rdquo;</span>
                            </p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                                EQUIPO: <span className="font-bold text-black">CARLOS MATTAR · SEBASTIÁN GARRIDO · MARCOS SOUSA</span>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* 1. Información General */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <FileText className="h-4 w-4" /> 1. INFORMACIÓN GENERAL
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase mb-1 text-gray-500">Nombre del Proyecto</p>
                                    <p className="text-sm font-bold text-black">System Kyron</p>
                                    <p className="text-xs italic text-gray-500">El ecosistema que protege tu línea, tu negocio y el ambiente.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase mb-1 text-gray-500">Equipo</p>
                                    <p className="text-sm font-bold text-black">Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
                                    <p className="text-xs text-gray-500">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Definición del Problema */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <Globe className="h-4 w-4" /> 2. DEFINICIÓN DEL PROBLEMA
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 space-y-4">
                                <p className="text-sm leading-relaxed text-gray-700">
                                    El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong>&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Signal className="h-4 w-4 text-rose-600" />
                                            <p className="text-[9px] font-black text-rose-600 uppercase">Telecomunicaciones</p>
                                        </div>
                                        <p className="text-xs font-bold text-black">21M+ líneas vulnerables</p>
                                        <p className="text-[10px] mt-1 text-gray-400">Bloqueos y fraudes constantes.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Recycle className="h-4 w-4 text-amber-600" />
                                            <p className="text-[9px] font-black text-amber-600 uppercase">Sostenibilidad</p>
                                        </div>
                                        <p className="text-xs font-bold text-black">+50% residuos sin reciclar</p>
                                        <p className="text-[10px] mt-1 text-gray-400">Falta de incentivos y trazabilidad.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BarChart3 className="h-4 w-4 text-orange-600" />
                                            <p className="text-[9px] font-black text-orange-600 uppercase">Carga Administrativa</p>
                                        </div>
                                        <p className="text-xs font-bold text-black">134 hrs/año perdidas</p>
                                        <p className="text-[10px] mt-1 text-gray-400">Burocracia y riesgo de multas.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Propuesta de Valor */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <Zap className="h-4 w-4" /> 3. PROPUESTA DE VALOR (LA SOLUCIÓN)
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 space-y-4">
                                <p className="text-sm text-gray-700">
                                    System Kyron es un <strong>ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong>cuatro pilares</strong>:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ShieldCheck className="h-4 w-4 text-indigo-600" />
                                            <p className="text-[10px] font-black text-indigo-600 uppercase">Seguridad (Kyron Shield)</p>
                                        </div>
                                        <p className="text-[11px] text-gray-600">Reposición de equipos, defensa legal y <strong>&ldquo;Modo Reserva&rdquo;</strong> —accede a la App sin saldo ni megas.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Cpu className="h-4 w-4 text-cyan-600" />
                                            <p className="text-[10px] font-black text-cyan-600 uppercase">Software (SaaS)</p>
                                        </div>
                                        <p className="text-[11px] text-gray-600">Plataforma modular de operación empresarial sin contratos anuales.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Printer className="h-4 w-4 text-amber-600" />
                                            <p className="text-[10px] font-black text-amber-600 uppercase">Hardware (Fintech Fiscal)</p>
                                        </div>
                                        <p className="text-[11px] text-gray-600">Infraestructura de facturación de lujo, 100% homologada por el SENIAT.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Leaf className="h-4 w-4 text-emerald-600" />
                                            <p className="text-[10px] font-black text-emerald-600 uppercase">Impacto</p>
                                        </div>
                                        <p className="text-[11px] text-gray-600">Reciclaje conectado que genera rentabilidad.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Mercado Objetivo */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <Target className="h-4 w-4" /> 4. MERCADO OBJETIVO
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 space-y-4">
                                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                                    <p className="text-sm leading-relaxed text-gray-700">
                                        Nuestro cliente ideal está representado por el perfil de <strong>&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0A2472]/5 border border-[#0A2472]/20">
                                    <Building2 className="h-5 w-5 text-[#0A2472] shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-black">Tamaño de Mercado</p>
                                        <p className="text-xs text-gray-500"><strong>500,000 PyMEs</strong> existentes en Venezuela.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Modelo de Negocio */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <Banknote className="h-4 w-4" /> 5. MODELO DE NEGOCIO
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 space-y-5">
                                <p className="text-sm text-gray-700">Generamos ingresos a través de <strong>tres vías escalables</strong>:</p>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase flex items-center gap-2 text-cyan-700">
                                        <Layers className="h-3 w-3" /> Suscripciones SaaS
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-3 rounded-xl text-center border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Microempresa</p>
                                            <p className="text-sm font-black text-[#0A2472]">$19.99/mes</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Comercio</p>
                                            <p className="text-sm font-black text-black">$49.99/mes</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Corporativo</p>
                                            <p className="text-sm font-black text-black">$99.99/mes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase flex items-center gap-2 text-emerald-700">
                                        <Wifi className="h-3 w-3" /> Conectividad 5G Global
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-xl border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Personal</p>
                                            <p className="text-sm font-black text-black">Desde $6.99</p>
                                            <p className="text-[9px] text-gray-400">Prepago · Pospago · eSIM</p>
                                        </div>
                                        <div className="p-3 rounded-xl border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Empresarial</p>
                                            <p className="text-sm font-black text-black">Desde $9.99</p>
                                            <p className="text-[9px] text-gray-400">Prepago · Pospago · eSIM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase flex items-center gap-2 text-amber-700">
                                        <Printer className="h-3 w-3" /> Hardware Fiscal Premium
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-3 rounded-xl text-center border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Impresora Fiscal</p>
                                            <p className="text-sm font-black text-black">$849</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Caja Auto-Pago</p>
                                            <p className="text-sm font-black text-black">$1,394</p>
                                        </div>
                                        <div className="p-3 rounded-xl text-center border border-gray-200 bg-gray-50">
                                            <p className="text-[9px] font-black uppercase mb-1 text-gray-400">Kit TPV Completo</p>
                                            <p className="text-sm font-black text-black">$2,499</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                                        <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                                        <p className="text-[10px] text-gray-600"><strong>Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. Estrategia de Marketing */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <Megaphone className="h-4 w-4" /> 6. ESTRATEGIA DE MARKETING Y VENTAS
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 space-y-4">
                                <p className="text-sm text-gray-700">
                                    Nuestra captación (B2B) se fundamenta en demostrar el <strong>retorno de inversión</strong> y operar a través de alianzas de clase mundial:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-[9px] font-black uppercase mb-1 text-cyan-700">Coca-Cola FEMSA</p>
                                        <p className="text-[10px] text-gray-400">Canal comercial de reciclaje.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-[9px] font-black uppercase mb-1 text-cyan-700">The Factory HKA</p>
                                        <p className="text-[10px] text-gray-400">Manufactura de hardware.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-[9px] font-black uppercase mb-1 text-cyan-700">Ameru.AI</p>
                                        <p className="text-[10px] text-gray-400">Tecnología IoT.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <p className="text-[9px] font-black uppercase text-emerald-700">Ahorro Fiscal</p>
                                        <p className="text-lg font-black text-black">$8,500</p>
                                        <p className="text-[10px] text-gray-400">anuales por cliente</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <p className="text-[9px] font-black uppercase text-emerald-700">Tiempo Recuperado</p>
                                        <p className="text-lg font-black text-black">15 hrs</p>
                                        <p className="text-[10px] text-gray-400">mensuales en gestión</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <p className="text-[9px] font-black uppercase text-emerald-700">ROI Proyectado</p>
                                        <p className="text-lg font-black text-black">187%</p>
                                        <p className="text-[10px] text-gray-400">retorno de inversión</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 7. Impacto Social o Ambiental */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
                                <TreePine className="h-4 w-4" /> 7. IMPACTO SOCIAL O AMBIENTAL
                            </h2>
                            <div className="pl-4 border-l-2 border-emerald-300 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
                                <p className="text-sm leading-relaxed text-gray-700">
                                    En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong>Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-100/50 border border-emerald-200">
                                        <Recycle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-emerald-700">Eco-créditos</p>
                                            <p className="text-[11px] text-gray-500">Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-100/50 border border-emerald-200">
                                        <Leaf className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-emerald-700">Huella de Carbono</p>
                                            <p className="text-[11px] text-gray-500"><strong>1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 8. Estado Actual y Hoja de Ruta */}
                        <section className="space-y-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2472] flex items-center gap-2">
                                <Milestone className="h-4 w-4" /> 8. ESTADO ACTUAL Y HOJA DE RUTA
                            </h2>
                            <div className="pl-4 border-l-2 border-gray-300 space-y-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                                    <Zap className="h-5 w-5 text-amber-600 shrink-0" />
                                    <p className="text-sm text-gray-700">Fase <strong>pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-[9px] font-black uppercase mb-2 text-[#0A2472]">2026</p>
                                        <p className="text-[11px] font-bold text-black">Despliegue nacional</p>
                                        <p className="text-[10px] text-gray-400">Venezuela</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-[9px] font-black uppercase mb-2 text-[#0A2472]">2027</p>
                                        <p className="text-[11px] font-bold text-black">Expansión regional</p>
                                        <p className="text-[10px] text-gray-400">Colombia y Panamá</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-[9px] font-black uppercase mb-2 text-[#0A2472]">2028</p>
                                        <p className="text-[11px] font-bold text-black">Consolidación</p>
                                        <p className="text-[10px] text-gray-400">México y EE. UU.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Footer */}
                        <div className="pt-8 flex flex-col items-center justify-center text-center space-y-3 border-t border-gray-200">
                            <div className="h-px w-48 bg-gray-300" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
                            </p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
