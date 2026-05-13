"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Zap, 
    Users, 
    Target, 
    TrendingUp, 
    Leaf, 
    Map, 
    Rocket,
    Globe,
    CheckCircle2,
    FileText as FileIcon,
    Download as DownloadIcon,
    ArrowLeft,
    Info
} from 'lucide-react';
import { ResourceHeader } from '@/components/brand/ResourceHeader';
import { Link } from '@/navigation';
import { PasswordGate } from '@/components/auth/password-gate';
import { cn } from '@/lib/utils';

const sections = [
    {
        id: "general",
        icon: Info,
        title: "1. Información General",
        content: "Nombre del Proyecto: System Kyron. Eslogan: Tu ecosistema operativo: tus líneas, tu contabilidad y cero complicaciones. Equipo: Carlos Mattar (Líder / Fundador).",
        color: "blue"
    },
    {
        id: "problem",
        icon: Shield,
        title: "2. Definición del Problema",
        content: "Los emprendedores venezolanos enfrentan un caos operativo al digitalizarse, perdiendo tiempo y dinero con proveedores fragmentados. El 85% de los negocios no tiene presencia digital profesional, lo que frena su crecimiento y competitividad.",
        color: "rose"
    },
    {
        id: "solution",
        icon: Zap,
        title: "3. Propuesta de Valor (La Solución)",
        content: "Ecosistema integral que unifica Telecomunicaciones (eSIM/Líneas), Automatización Fiscal y Gestión Legal. Resolvemos la complejidad tecnológica para que el cliente se enfoque solo en vender.",
        color: "cyan"
    },
    {
        id: "market",
        icon: Target,
        title: "4. Mercado Objetivo",
        content: "Emprendedores y PYMES (25-50 años) en Venezuela que buscan profesionalizar su imagen. Mercado potencial de +500,000 unidades de negocio en necesidad de transformación digital.",
        color: "emerald"
    },
    {
        id: "model",
        icon: TrendingUp,
        title: "5. Modelo de Negocio",
        content: "Generación de ingresos por suscripción mensual de líneas corporativas, licencias de módulos SaaS para gestión fiscal y consultoría de seguridad premium.",
        color: "blue"
    },
    {
        id: "marketing",
        icon: Globe,
        title: "6. Estrategia de Marketing y Ventas",
        content: "Marketing educativo en redes sociales (TikTok/Instagram), alianzas con cámaras empresariales y un sistema de referidos corporativo.",
        color: "purple"
    },
    {
        id: "impact",
        icon: Leaf,
        title: "7. Impacto Social o Ambiental",
        content: "Inclusión digital para microempresas y política 'Cero Papel' mediante la digitalización total de procesos administrativos.",
        color: "green"
    }
];

export default function ResumenEjecutivoPage() {
    const [isDownloading, setIsDownloading] = React.useState(false);

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            const jsPDF = (await import("jspdf")).default;
            const doc = new jsPDF('p', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Background
            doc.setFillColor(2, 6, 23);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');

            // Header
            doc.setTextColor(59, 130, 246);
            doc.setFontSize(22);
            doc.text('SYSTEM KYRON', 20, 25);
            doc.setFontSize(10);
            doc.text('RESUMEN EJECUTIVO // RETO INSPIRA 2026', 20, 32);

            let cursorY = 50;
            sections.forEach(s => {
                doc.setTextColor(59, 130, 246);
                doc.setFontSize(14);
                doc.text(s.title, 20, cursorY);
                cursorY += 10;
                
                doc.setTextColor(203, 213, 225);
                doc.setFontSize(10);
                const splitContent = doc.splitTextToSize(s.content, 170);
                doc.text(splitContent, 20, cursorY);
                cursorY += (splitContent.length * 5) + 15;
                
                if (cursorY > pageHeight - 40) {
                    doc.addPage();
                    doc.setFillColor(2, 6, 23);
                    doc.rect(0, 0, pageWidth, pageHeight, 'F');
                    cursorY = 25;
                }
            });

            // Footer
            doc.setTextColor(51, 65, 85);
            doc.setFontSize(8);
            doc.text('© 2026 EMPRENDIMIENTO CARLOS MATTAR // J-50832149-9', pageWidth / 2, pageHeight - 10, { align: 'center' });

            doc.save('Resumen_Ejecutivo_System_Kyron_Reto_Inspira.pdf');
        } catch (err) {
            console.error("PDF Error:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleDownloadDoc = () => {
        setIsDownloading(true);
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Resumen Ejecutivo - Reto Inspira</title>
            <style>
                @page { size: 8.5in 11in; margin: 1in; }
                body { font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; }
                h1 { color: #0891b2; font-size: 24pt; text-align: center; margin-bottom: 5pt; }
                h2 { color: #0891b2; font-size: 14pt; border-bottom: 1pt solid #0891b2; margin-top: 20pt; padding-bottom: 3pt; text-transform: uppercase; }
                .slogan { text-align: center; font-style: italic; color: #666; margin-bottom: 20pt; font-size: 12pt; }
                .footer { font-size: 9pt; color: #999; text-align: center; margin-top: 50pt; }
            </style>
            </head>
            <body>
                <h1>SYSTEM KYRON</h1>
                <div class="slogan">"Tu ecosistema operativo: tus líneas, tu contabilidad y cero complicaciones."</div>
                
                <h2>1. Información General</h2>
                <p><b>Nombre del Proyecto:</b> System Kyron</p>
                <p><b>Eslogan:</b> Tu ecosistema operativo: tus líneas, tu contabilidad y cero complicaciones.</p>
                <p><b>Equipo:</b> Carlos Mattar</p>

                <h2>2. Definición del Problema</h2>
                <p>Los emprendedores venezolanos enfrentan un caos operativo al digitalizarse, perdiendo tiempo y dinero con proveedores fragmentados. El 85% de los negocios no tiene una infraestructura administrativa profesional, lo que frena su crecimiento y competitividad en un mercado globalizado.</p>

                <h2>3. Propuesta de Valor (La Solución)</h2>
                <p>Ecosistema integral que unifica Telecomunicaciones (eSIM/Líneas), Automatización Fiscal y Gestión Legal. Resolvemos la complejidad tecnológica para que el cliente se enfoque solo en vender, garantizando cumplimiento legal y ahorro operativo.</p>

                <h2>4. Mercado Objetivo</h2>
                <p>Emprendedores y PYMES (25-50 años) en Venezuela que buscan profesionalizar su imagen. Mercado potencial de +500,000 unidades de negocio que necesitan migrar del papel a la nube de forma segura.</p>

                <h2>5. Modelo de Negocio</h2>
                <p>Generación de ingresos por suscripción mensual de líneas corporativas, licencias de módulos SaaS contables/legales y consultoría de seguridad premium para sector privado.</p>

                <h2>6. Estrategia de Marketing y Ventas</h2>
                <p>Marketing educativo en redes sociales, alianzas estratégicas con cámaras de comercio e incubadoras, y un sólido programa de referidos empresariales.</p>

                <h2>7. Impacto Social o Ambiental</h2>
                <p>Social: Democratización de herramientas tecnológicas para pequeños negocios. Ambiental: Fomento del modelo Cero Papel mediante la automatización digital completa de la gestión administrativa.</p>

                <h2>8. Estado Actual y Hoja de Ruta</h2>
                <p><b>Etapa Actual:</b> Prototipo Funcional / Idea Validada.</p>
                <p><b>Objetivos próximos 6 meses:</b></p>
                <ol>
                    <li>Lanzamiento del módulo de IA Fiscal Predictiva.</li>
                    <li>Captación de los primeros 10 clientes corporativos para iteración.</li>
                    <li>Expansión de la red Kyron Mobile 5G.</li>
                </ol>

                <div class="footer">© 2026 System Kyron · Documento para Reto Inspira · Confidencial</div>
            </body>
            </html>
        `;
        const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Resumen_Ejecutivo_Reto_Inspira_Kyron.doc';
        link.click();
        setIsDownloading(false);
    };

    return (
        <PasswordGate 
            title="Resumen Ejecutivo System Kyron" 
            description="Información estratégica para el Reto InspiraVe 2026. Contenido confidencial."
        >
            <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30 overflow-x-hidden">
                <ResourceHeader />
                {/* Background Decor */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full" />
                </div>

                {/* Navbar */}
                <nav className="sticky top-0 z-50 bg-[#030711]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
                            <ArrowLeft className="h-4 w-4" /> Volver
                        </Link>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-cyan-500 transition-all active:scale-95 shadow-[0_0_30px_rgba(8,145,178,0.2)] disabled:opacity-50"
                            >
                                <Rocket className={cn("h-3 w-3", isDownloading && "animate-spin")} />
                                {isDownloading ? 'Generando...' : 'Descargar PDF'}
                            </button>
                            <button 
                                onClick={handleDownloadDoc}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <DownloadIcon className="h-3 w-3 text-zinc-400" />
                                Descargar DOC
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-5xl mx-auto px-6 py-16 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24"
                    >
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Guía y Estructura<br/>Reto Inspira
                        </h1>
                        <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
                            Este documento es una síntesis clara y profesional de nuestra idea de negocio, diseñada para que el jurado entienda el valor en menos de 5 minutos.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
                            >
                                <div className={`h-12 w-12 rounded-2xl bg-${section.color}-500/10 border border-${section.color}-500/20 flex items-center justify-center mb-6`}>
                                    <section.icon className={`h-6 w-6 text-${section.color}-400`} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{section.title}</h3>
                                <p className="text-zinc-400 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-10 md:p-16 rounded-[3rem] bg-zinc-900 border border-white/10"
                    >
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-12">8. Estado Actual y Hoja de Ruta</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="h-1 bg-cyan-500 w-12" />
                                <h4 className="text-lg font-black text-white uppercase">Objetivo 1</h4>
                                <p className="text-zinc-400 text-sm font-medium">IA Fiscal Predictiva integrada para automatización total.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-1 bg-blue-500 w-12" />
                                <h4 className="text-lg font-black text-white uppercase">Objetivo 2</h4>
                                <p className="text-zinc-400 text-sm font-medium">Onboarding de los primeros 10 clientes para validación de mercado.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-1 bg-purple-500 w-12" />
                                <h4 className="text-lg font-black text-white uppercase">Objetivo 3</h4>
                                <p className="text-zinc-400 text-sm font-medium">Lanzamiento oficial de Kyron Mobile con cobertura nacional.</p>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </PasswordGate>
    );
}
