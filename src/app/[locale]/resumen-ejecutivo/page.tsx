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
    Lock,
    Cpu,
    Smartphone,
    ArrowLeft,
    CheckCircle2,
    FileText as FileIcon,
    Download as DownloadIcon
} from 'lucide-react';
import { Link } from '@/navigation';
import { PasswordGate } from '@/components/auth/password-gate';

const sections = [
    {
        id: "problem",
        icon: Shield,
        title: "2. Definición del Problema",
        content: "En Venezuela, los emprendedores y PYMES enfrentan un 'caos operativo' al digitalizarse. Deben contratar por separado líneas comerciales, web, facturación y legal, perdiendo hasta 60 horas mensuales en burocracia técnica. El 85% opera sin estructura formal, quedando vulnerables ante estafas y fallos.",
        color: "rose"
    },
    {
        id: "solution",
        icon: Zap,
        title: "3. Propuesta de Valor (La Solución)",
        content: "Ecosistema Digital Unificado: Telecomunicaciones (5G/eSIM), Web y Gestión Fiscal en un solo panel. El cliente obtiene autonomía operativa total, reduciendo costos en 40% con cumplimiento nativo de leyes venezolanas (IVA, IGTF, BCV).",
        color: "cyan"
    },
    {
        id: "market",
        icon: Target,
        title: "4. Mercado Objetivo",
        content: "Emprendedores de servicios, retail y profesionales independientes (25-50 años) en centros urbanos. Potencial de +500,000 negocios registrados que requieren formalización tecnológica inmediata para escalar.",
        color: "emerald"
    },
    {
        id: "model",
        icon: TrendingUp,
        title: "5. Modelo de Negocio",
        content: "Híbrido SaaS + Infraestructura. Suscripciones desde $15/mes, provisión de flotas corporativas y consultoría técnica premium de seguridad.",
        color: "blue"
    },
    {
        id: "marketing",
        icon: Globe,
        title: "6. Estrategia de Marketing y Ventas",
        content: "Marketing educativo en TikTok/Instagram, alianzas con cámaras de comercio y un potente sistema de referidos para el sector empresarial.",
        color: "purple"
    },
    {
        id: "impact",
        icon: Leaf,
        title: "7. Impacto Social o Ambiental",
        content: "Democratización tecnológica para la supervivencia de PYMES y política 'Cero Papel' al automatizar toda la gestión administrativa en la nube.",
        color: "green"
    }
];

export default function ResumenEjecutivoPage() {
    const [isDownloading, setIsDownloading] = React.useState(false);

    const handleDownloadDoc = () => {
        setIsDownloading(true);
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Resumen Ejecutivo - System Kyron</title>
            <style>
                @page { size: 8.5in 11in; margin: 1in; }
                body { font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; }
                h1 { color: #0891b2; font-size: 24pt; text-align: center; margin-bottom: 5pt; }
                h2 { color: #0891b2; font-size: 14pt; border-bottom: 1pt solid #0891b2; margin-top: 20pt; padding-bottom: 3pt; text-transform: uppercase; }
                .slogan { text-align: center; font-style: italic; color: #666; margin-bottom: 20pt; font-size: 12pt; }
                .section-title { font-weight: bold; color: #111; }
                .bullet { margin-left: 20pt; }
                .footer { font-size: 9pt; color: #999; text-align: center; margin-top: 50pt; }
            </style>
            </head>
            <body>
                <h1>SYSTEM KYRON</h1>
                <div class="slogan">"Tu ecosistema digital: tus líneas, tu web y cero complicaciones."</div>
                
                <h2>1. Información General</h2>
                <p><b>Nombre del Proyecto:</b> System Kyron</p>
                <p><b>Eslogan:</b> Tu ecosistema digital: tus líneas, tu web y cero complicaciones.</p>
                <p><b>Equipo:</b> Carlos Mattar (Líder / Fundador)</p>

                <h2>2. Definición del Problema</h2>
                <p>En Venezuela, los emprendedores y PYMES enfrentan un "caos operativo" al digitalizarse. Deben contratar por separado líneas comerciales, web, facturación y legal, perdiendo hasta 60 horas mensuales en burocracia técnica. El 85% opera sin estructura formal, quedando vulnerables ante estafas y fallos. Resolver esto ahora es vital para la supervivencia económica en un mercado que exige presencia 24/7 y cumplimiento fiscal automatizado.</p>

                <h2>3. Propuesta de Valor (La Solución)</h2>
                <p>System Kyron es un Ecosistema Digital Unificado que centraliza las 3 áreas críticas: Telecomunicaciones (5G/eSIM), Presencia Web y Gestión Fiscal/Legal automatizada con IA. Reducimos los costos operativos en un 40% entregando una infraestructura "Plug & Play" con cumplimiento nativo de leyes venezolanas (IVA, IGTF, BCV).</p>

                <h2>4. Mercado Objetivo</h2>
                <p>Emprendedores de servicios, retail y profesionales independientes (25-50 años) en centros urbanos como Caracas y Valencia. Potencial de +500,000 negocios registrados que requieren formalización tecnológica inmediata para escalar.</p>

                <h2>5. Modelo de Negocio</h2>
                <p>Modelo híbrido de Suscripción (SaaS) desde $15/mes que incluye hosting y mantenimiento, sumado a la provisión de infraestructura de telecomunicaciones corporativas y consultoría premium de seguridad.</p>

                <h2>6. Estrategia de Marketing y Ventas</h2>
                <p>Marketing educativo en TikTok/Instagram enfocado en formalización, alianzas con cámaras de comercio y un programa de referidos empresariales basado en incentivos de infraestructura.</p>

                <h2>7. Impacto Social o Ambiental</h2>
                <p>Socialmente democratizamos la tecnología empresarial aumentando la tasa de supervivencia de las PYMES. Ambientalmente impulsamos la política "Cero Papel", eliminando archivos físicos y facturas impresas mediante digitalización total en la nube.</p>

                <h2>8. Estado Actual y Hoja de Ruta</h2>
                <p><b>Etapa:</b> Prototipo Funcional (MVP) validado con RIF (J-50832149-9) y registro SAPI en proceso.</p>
                <p><b>Objetivos próximos 6 meses:</b></p>
                <ol>
                    <li>Integración de IA Fiscal Predictiva.</li>
                    <li>Onboarding de los primeros 50 clientes pagos.</li>
                    <li>Expansión de Kyron Mobile (5G) mediante alianzas locales.</li>
                </ol>

                <div class="footer">© 2026 System Kyron · Documento Confidencial · Reto InspiraVe</div>
            </body>
            </html>
        `;
        const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Resumen_Ejecutivo_Kyron_Reto_Inspira.doc';
        link.click();
        setIsDownloading(false);
    };

    return (
        <PasswordGate 
            title="Resumen Ejecutivo Elite" 
            description="Información estratégica para el Reto InspiraVe 2026. Contenido confidencial."
        >
            <div className="min-h-screen bg-[#030711] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30">
                {/* Background Decor */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                </div>

                {/* Navbar */}
                <nav className="sticky top-0 z-50 bg-[#030711]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
                            <ArrowLeft className="h-4 w-4" /> Volver
                        </Link>
                        <button 
                            onClick={handleDownloadDoc}
                            disabled={isDownloading}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95"
                        >
                            <DownloadIcon className={`h-3 w-3 ${isDownloading ? 'animate-pulse' : ''}`} />
                            {isDownloading ? 'Generando...' : 'Descargar Oficial (DOC)'}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Documento Verificado · InspiraVe 2026</span>
                        </div>
                    </div>
                </nav>

                <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-10">
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                            <Rocket className="h-3 w-3" /> Reto InspiraVe 2026
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Resumen<br/>Ejecutivo
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto mb-12">
                            Tu ecosistema digital: tus líneas, tu web y cero complicaciones.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Proyecto</p>
                                <p className="text-xl font-black text-white">System Kyron</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Líder</p>
                                <p className="text-xl font-black text-white">Carlos Mattar</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Estado</p>
                                <p className="text-xl font-black text-emerald-400 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5" /> Validado
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                            >
                                <div className={`h-12 w-12 rounded-2xl bg-${section.color}-500/10 border border-${section.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <section.icon className={`h-6 w-6 text-${section.color}-400`} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{section.title}</h3>
                                <p className="text-zinc-400 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Roadmap Section */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Map className="h-64 w-64 text-white" />
                        </div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-12">8. Estado Actual y Hoja de Ruta</h2>
                            
                            <div className="space-y-12">
                                <div className="flex gap-6 items-start">
                                    <div className="h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-white uppercase mb-2">Etapa Actual: MVP Validado</h4>
                                        <p className="text-zinc-400 max-w-2xl font-medium">Infraestructura técnica operativa, RIF legal (J-50832149-9) y prototipo desplegado con encriptación AES-256.</p>
                                    </div>
                                </div>

                                <div className="pl-5 border-l-2 border-dashed border-white/10 space-y-12">
                                    <div className="flex gap-6 items-start relative">
                                        <div className="absolute left-[-31px] top-0 h-10 w-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                                            <span className="text-[10px] font-black">01</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase mb-1">IA Fiscal Predictiva</h4>
                                            <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Próximos 2 meses</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start relative">
                                        <div className="absolute left-[-31px] top-0 h-10 w-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                                            <span className="text-[10px] font-black">02</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase mb-1">Escalamiento a 50 Clientes</h4>
                                            <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Próximos 4 meses</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start relative">
                                        <div className="absolute left-[-31px] top-0 h-10 w-10 rounded-full bg-white flex items-center justify-center">
                                            <Rocket className="h-4 w-4 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase mb-1">Expansión Kyron Mobile (5G)</h4>
                                            <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Próximos 6 meses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <footer className="mt-24 text-center border-t border-white/5 pt-12">
                        <p className="text-zinc-600 text-xs font-black uppercase tracking-[0.4em]">System Kyron · Emprendimiento Carlos Mattar · 2026</p>
                    </footer>
                </main>
            </div>
        </PasswordGate>
    );
}
