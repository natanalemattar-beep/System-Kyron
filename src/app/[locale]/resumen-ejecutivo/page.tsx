"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    FileText,
    Download,
    ArrowLeft,
    Info,
    Presentation,
    Layout,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    Maximize2,
    Monitor,
    BrainCircuit,
    Cpu,
    FilePieChart,
    Share2,
    FileDown,
    Plus,
    Minus
} from 'lucide-react';
import { ResourceHeader } from '@/components/brand/ResourceHeader';
import { Link } from '@/navigation';
import { PasswordGate } from '@/components/auth/password-gate';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// --- Contenido del Resumen Ejecutivo ---
const SECTIONS = [
    {
        id: "intro",
        icon: Info,
        title: "Información General",
        subtitle: "Identidad y Liderazgo",
        content: "System Kyron es el primer ecosistema operativo integral diseñado para la soberanía digital en Venezuela. Liderado por Carlos Mattar, el proyecto unifica telecomunicaciones, contabilidad y cumplimiento legal en una sola interfaz HUD Titanium.",
        points: [
            "Proyecto: System Kyron",
            "Fundador: Carlos Mattar",
            "Sede: Caracas, Venezuela",
            "Visión: Reto InspiraVe 2026"
        ],
        color: "cyan"
    },
    {
        id: "problem",
        icon: Shield,
        title: "Definición del Problema",
        subtitle: "El Caos Administrativo",
        content: "El 85% de los emprendedores en Venezuela opera en una 'fragmentación digital': dependen de múltiples proveedores ineficientes, carecen de infraestructura fiscal profesional y enfrentan riesgos legales por falta de automatización.",
        points: [
            "Burocracia digitalizada ineficiente",
            "Falta de conectividad corporativa real",
            "Riesgo fiscal por error humano",
            "Desconexión entre legal y operativo"
        ],
        color: "rose"
    },
    {
        id: "solution",
        icon: Zap,
        title: "Propuesta de Valor",
        subtitle: "Ecosistema Kyron Core",
        content: "Kyron no es una app, es una infraestructura. Unificamos la conectividad 5G (eSIM), el cumplimiento fiscal (VEN-NIF) y la gestión legal en un motor algorítmico determinista que elimina el error humano.",
        points: [
            "Conectividad Corporativa Inmediata",
            "Automatización Fiscal Inteligente",
            "Bóveda Legal Encriptada",
            "Cero Riesgo: Auditoría 100%"
        ],
        color: "blue"
    },
    {
        id: "market",
        icon: Target,
        title: "Mercado Objetivo",
        subtitle: "Segmento de Crecimiento",
        content: "Enfoque en Emprendedores y PYMES (25-50 años) que necesitan profesionalizar su estructura operativa. Mercado potencial estimado en +500,000 unidades de negocio en proceso de formalización ante SENIAT/SAREN.",
        points: [
            "Emprendedores Digitales",
            "PYMES en expansión",
            "Profesionales Independientes",
            "Sector Privado Premium"
        ],
        color: "emerald"
    },
    {
        id: "model",
        icon: TrendingUp,
        title: "Modelo de Negocio",
        subtitle: "Escalabilidad SaaS",
        content: "Ingresos recurrentes basados en suscripciones mensuales de telecomunicaciones, licencias de módulos operativos (ERP) y consultoría de seguridad patrimonial de alto nivel.",
        points: [
            "Suscripción Mensual (Kyron Mobile)",
            "Licenciamiento SaaS (Módulos Fiscales)",
            "Fees por Transacción Segura",
            "Consultoría Premium"
        ],
        color: "amber"
    },
    {
        id: "marketing",
        icon: Globe,
        title: "Estrategia de Ventas",
        subtitle: "Penetración y Alianzas",
        content: "Estrategia de marketing educativo y alianzas con cámaras de comercio. Sistema de referidos corporativo donde cada socio Kyron se convierte en un nodo de crecimiento del ecosistema.",
        points: [
            "Marketing de Autoridad",
            "Alianzas con Gremios",
            "Canal de Socios Directos",
            "Growth Hacking Local"
        ],
        color: "purple"
    },
    {
        id: "impact",
        icon: Leaf,
        title: "Impacto Social/Ambiental",
        subtitle: "Cero Papel, Máxima Inclusión",
        content: "Democratizamos el acceso a tecnología de punta para el pequeño comerciante. Nuestro modelo 'Zero Paper' reduce la huella de carbono administrativa en un 95% mediante digitalización absoluta.",
        points: [
            "Digitalización de la Microempresa",
            "Reducción de residuos (Cero Papel)",
            "Inclusión Financiera y Fiscal",
            "Eficiencia Energética Operativa"
        ],
        color: "green"
    },
    {
        id: "roadmap",
        icon: Rocket,
        title: "Roadmap 2026",
        subtitle: "Hacia el Reto Inspira",
        content: "Desde el prototipo actual hacia el despliegue nacional. Fases críticas de integración de IA Fiscal Predictiva y expansión de la red de fibra óptica Kyron Nexus.",
        points: [
            "Fase 1: Validación Core (Actual)",
            "Fase 2: Onboarding Corporativo",
            "Fase 3: Expansión Nacional 5G",
            "Defensa: Reto InspiraVe 2026"
        ],
        color: "indigo"
    }
];

export default function ResumenEjecutivoPage() {
    const { toast } = useToast();
    const [viewMode, setViewMode] = useState<'reading' | 'presentation'>('reading');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);

    // --- Animación de fondo ---
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // --- Exportación a PDF (Modo Paisaje) ---
    const handleExportPDF = async () => {
        setIsExporting(true);
        toast({ title: "Preparando exportación", description: "Generando documento ejecutivo premium..." });
        
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const element = viewMode === 'presentation' ? slideRef.current : containerRef.current;
            
            const opt = {
                margin: 0,
                filename: `System_Kyron_Executive_Summary_${new Date().getFullYear()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true, 
                    letterRendering: true,
                    backgroundColor: '#020617'
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: viewMode === 'presentation' ? 'landscape' : 'portrait' 
                }
            };

            await html2pdf().set(opt).from(element).save();
            toast({ title: "¡Exportación exitosa!", description: "El resumen ejecutivo ha sido descargado." });
        } catch (err) {
            console.error("Export error:", err);
            toast({ variant: "destructive", title: "Error en exportación", description: "No se pudo generar el archivo." });
        } finally {
            setIsExporting(false);
        }
    };

    // --- Exportación a PPTX (Presentación) ---
    const handleExportPPTX = async () => {
        setIsExporting(true);
        toast({ title: "Generando Presentación", description: "Creando slides profesionales..." });

        try {
            const PptxGenJS = (await import('pptxgenjs')).default;
            const pptx = new PptxGenJS();

            // Slide de Portada
            const titleSlide = pptx.addSlide();
            titleSlide.background = { color: '020617' };
            titleSlide.addText('SYSTEM KYRON', { x: 0.5, y: 1.5, w: '90%', fontSize: 44, color: '06B6D4', bold: true, align: 'center' });
            titleSlide.addText('RESUMEN EJECUTIVO 2026', { x: 0.5, y: 2.2, w: '90%', fontSize: 18, color: 'FFFFFF', align: 'center' });
            titleSlide.addText('RETO INSPIRAVE', { x: 0.5, y: 3.5, w: '90%', fontSize: 12, color: '3B82F6', align: 'center', bold: true });

            // Slides de Contenido
            SECTIONS.forEach(s => {
                const slide = pptx.addSlide();
                slide.background = { color: '020617' };
                slide.addText(s.title.toUpperCase(), { x: 0.5, y: 0.5, fontSize: 24, color: '06B6D4', bold: true });
                slide.addText(s.subtitle, { x: 0.5, y: 1.0, fontSize: 14, color: '3B82F6', italic: true });
                slide.addText(s.content, { x: 0.5, y: 2.0, w: '90%', fontSize: 14, color: 'CBD5E1' });
                
                s.points.forEach((p, i) => {
                    slide.addText(`• ${p}`, { x: 0.8, y: 3.5 + (i * 0.4), w: '80%', fontSize: 12, color: 'FFFFFF' });
                });
            });

            await pptx.writeFile({ fileName: `Kyron_Pitch_Deck_${new Date().getFullYear()}.pptx` });
            toast({ title: "Deck Generado", description: "Archivo PowerPoint listo para presentar." });
        } catch (err) {
            console.error("PPTX Error:", err);
            toast({ variant: "destructive", title: "Error", description: "No se pudo generar el PowerPoint." });
        } finally {
            setIsExporting(false);
        }
    };

    // --- Exportación a Imagen (PNG) ---
    const handleExportImage = async () => {
        if (!slideRef.current) return;
        setIsExporting(true);
        toast({ title: "Capturando diapositiva", description: "Generando imagen de alta resolución..." });

        try {
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(slideRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#020617',
            });
            
            const link = document.createElement('a');
            link.download = `System_Kyron_Slide_${currentSlide + 1}.png`;
            link.href = dataUrl;
            link.click();
            toast({ title: "Imagen descargada", description: "La diapositiva se guardó como PNG." });
        } catch (err) {
            console.error("Image export error:", err);
            toast({ variant: "destructive", title: "Error", description: "No se pudo generar la imagen." });
        } finally {
            setIsExporting(false);
        }
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SECTIONS.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SECTIONS.length) % SECTIONS.length);

    return (
        <PasswordGate 
            title="Bóveda Estratégica System Kyron" 
            description="Información clasificada para el Reto InspiraVe 2026. Acceso restringido a jurado y socios."
        >
            <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30 overflow-x-hidden relative">
                <ResourceHeader />

                {/* --- Ambient Background --- */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div 
                        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-[120px] bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600"
                        style={{
                            left: mousePos.x - 400,
                            top: mousePos.y - 400,
                            transition: 'all 0.3s cubic-bezier(0.1, 0, 0, 1)'
                        }}
                    />
                    <div className="absolute inset-0 hud-grid opacity-[0.03]" />
                </div>

                {/* --- Sticky Toolbar --- */}
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl scale-90 md:scale-100">
                    <button 
                        onClick={() => setViewMode('reading')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            viewMode === 'reading' ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20" : "text-white/40 hover:text-white"
                        )}
                    >
                        <Layout className="h-3.5 w-3.5" /> Lectura
                    </button>
                    <button 
                        onClick={() => setViewMode('presentation')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            viewMode === 'presentation' ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20" : "text-white/40 hover:text-white"
                        )}
                    >
                        <Presentation className="h-3.5 w-3.5" /> Paisaje
                    </button>
                    <div className="w-[1px] h-4 bg-white/10 mx-1" />
                    <button 
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all disabled:opacity-50"
                    >
                        <FileDown className={cn("h-3.5 w-3.5", isExporting && "animate-spin")} /> PDF
                    </button>
                    <button 
                        onClick={handleExportImage}
                        disabled={isExporting || viewMode !== 'presentation'}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            viewMode === 'presentation' ? "text-white/40 hover:text-white" : "opacity-20 cursor-not-allowed"
                        )}
                        title="Solo disponible en modo Paisaje"
                    >
                        <Maximize2 className="h-3.5 w-3.5" /> PNG
                    </button>
                    <button 
                        onClick={handleExportPPTX}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all disabled:opacity-50"
                    >
                        <Share2 className="h-3.5 w-3.5" /> PPTX
                    </button>
                </div>

                <main className="relative z-10 pt-44 pb-32 max-w-7xl mx-auto px-6">
                    
                    <AnimatePresence mode="wait">
                        {viewMode === 'reading' ? (
                            // --- VISTA DE LECTURA (VERTICAL PREMIUM) ---
                            <motion.div 
                                key="reading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                ref={containerRef}
                                className="space-y-32"
                            >
                                <div className="max-w-4xl mx-auto text-center space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20"
                                    >
                                        <Sparkles className="h-4 w-4 text-cyan-400" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Executive Summary v3.0</span>
                                    </motion.div>
                                    
                                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                                        System <br/>
                                        <span className="text-cyan-500 italic">Kyron</span>
                                    </h1>
                                    
                                    <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
                                        Arquitectura algorítmica para la formalización y escalabilidad del emprendimiento venezolano.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {SECTIONS.map((section, idx) => (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all h-full flex flex-col">
                                                <div className={cn(
                                                    "h-14 w-14 rounded-2xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 transition-transform group-hover:scale-110",
                                                    `text-${section.color}-400`
                                                )}>
                                                    <section.icon className="h-7 w-7" />
                                                </div>
                                                <div className="space-y-4 mb-8">
                                                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">{section.subtitle}</h3>
                                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white">{section.title}</h2>
                                                </div>
                                                <p className="text-zinc-400 font-medium leading-relaxed mb-10 text-lg flex-1">
                                                    {section.content}
                                                </p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {section.points.map((p, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-white/40">
                                                            <div className={cn("h-1.5 w-1.5 rounded-full", `bg-${section.color}-500 shadow-[0_0_8px_rgba(0,0,0,0.5)]`)} />
                                                            {p}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer Executive Signature */}
                                <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                                    <div className="flex items-center gap-6">
                                        <img src="/images/logo-kyron-hq.png" alt="Kyron Logo" className="h-12 opacity-50 grayscale hover:grayscale-0 transition-all" />
                                        <div className="h-10 w-[1px] bg-white/10" />
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-white">Carlos Mattar</p>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Founder & CEO</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 SYSTEM KYRON INFRASTRUCTURE</p>
                                        <p className="text-[9px] font-bold text-cyan-500/40 uppercase tracking-widest mt-2 italic">Caracas · Venezuela · 10°30'0\"N 66°55'0\"W</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            // --- VISTA DE PRESENTACIÓN (PAISAJE / SLIDES) ---
                            <motion.div 
                                key="presentation"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="w-full aspect-[16/9] max-w-6xl mx-auto relative group/slide"
                                ref={slideRef}
                            >
                                <div className="absolute inset-0 bg-[#020617] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)]">
                                    {/* Slide Content */}
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={currentSlide}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="h-full w-full p-20 flex flex-col justify-between relative z-10"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-4">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: 100 }}
                                                        className={cn("h-1 rounded-full", `bg-${SECTIONS[currentSlide].color}-500`)} 
                                                    />
                                                    <h3 className="text-xl font-black uppercase tracking-[0.3em] text-zinc-500">{SECTIONS[currentSlide].subtitle}</h3>
                                                    <h2 className="text-7xl font-black uppercase tracking-tighter text-white">{SECTIONS[currentSlide].title}</h2>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <img src="/images/logo-kyron-hq.png" alt="Kyron Logo" className="h-16 opacity-80" />
                                                    <div className="text-right">
                                                        <p className="text-xs font-black uppercase tracking-widest text-white/40">Slide</p>
                                                        <p className="text-2xl font-black text-cyan-500">0{currentSlide + 1} <span className="text-zinc-700">/ 0{SECTIONS.length}</span></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-12 gap-12 items-center">
                                                <div className="col-span-7">
                                                    <p className="text-3xl font-medium leading-relaxed text-zinc-300">
                                                        "{SECTIONS[currentSlide].content}"
                                                    </p>
                                                </div>
                                                <div className="col-span-5 space-y-6 bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
                                                    {SECTIONS[currentSlide].points.map((p, i) => (
                                                        <motion.div 
                                                            key={i}
                                                            initial={{ opacity: 0, x: 10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.2 + i * 0.1 }}
                                                            className="flex items-center gap-4"
                                                        >
                                                            <div className={cn("h-2.5 w-2.5 rounded-full", `bg-${SECTIONS[currentSlide].color}-500 shadow-lg shadow-${SECTIONS[currentSlide].color}-500/50`)} />
                                                            <span className="text-sm font-black uppercase tracking-widest text-white">{p}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-end border-t border-white/5 pt-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                        <Cpu className="h-5 w-5 text-cyan-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Kyron Core v3.0</p>
                                                        <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Algorithmic Infrastructure</p>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                                                    RETO INSPIRAVE 2026 // CARACAS
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Scanner Effect */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/30 blur-md animate-scanner-y opacity-50" />
                                        <div className="absolute inset-0 bg-scanline opacity-[0.02]" />
                                    </div>

                                    {/* Navigation Controls */}
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 opacity-0 group-hover/slide:opacity-100 transition-opacity">
                                        <button onClick={prevSlide} className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90">
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <div className="flex gap-2">
                                            {SECTIONS.map((_, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setCurrentSlide(i)}
                                                    className={cn(
                                                        "h-1.5 rounded-full transition-all duration-500",
                                                        currentSlide === i ? "w-8 bg-cyan-500" : "w-1.5 bg-white/20"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <button onClick={nextSlide} className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90">
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- Floating Action: AI Analysis --- */}
                    <div className="fixed bottom-10 right-10 z-[100]">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-2xl shadow-cyan-600/40 border border-cyan-500/50 group"
                            onClick={() => toast({ title: "Kyron Nexus Core", description: "Analizando consistencia del pitch... 100% Determinista." })}
                        >
                            <BrainCircuit className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse" />
                        </motion.button>
                    </div>

                </main>

                <style jsx global>{`
                    @keyframes scanner-y {
                        0% { top: 0%; opacity: 0; }
                        5% { opacity: 1; }
                        95% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .animate-scanner-y {
                        animation: scanner-y 4s linear infinite;
                    }
                    .hud-grid {
                        background-image: 
                            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
                        background-size: 40px 40px;
                    }
                    .bg-scanline {
                        background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.05), transparent);
                        height: 100px;
                        width: 100%;
                    }
                    @media print {
                        .print\\:hidden { display: none !important; }
                        body { background: white !important; color: black !important; }
                    }
                `}</style>
            </div>
        </PasswordGate>
    );
}
