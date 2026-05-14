'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, ChevronRight, ShieldCheck, Zap, BarChart3, 
    Globe, Users, Leaf, Cpu, Rocket, FileText, Globe2,
    FileDown, ExternalLink, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dinámicamente cargamos pptxgenjs desde CDN para evitar problemas de instalación
const loadPptxGen = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
        script.onload = () => resolve((window as any).PptxGenJS);
        document.head.appendChild(script);
    });
};

const slides = [
    {
        id: 'portada',
        title: 'System Kyron',
        subtitle: 'El Futuro de la Inteligencia Corporativa en Venezuela',
        content: 'Ecosistema SaaS/ERP Pericial para el Reto Inspira 2026',
        team: 'Carlos Mattar • Sebastian Garrido • Marcos Sousa',
        icon: <Rocket className="w-12 h-12 text-primary" />,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-primary/10'
    },
    {
        id: 'problema',
        title: 'El Dolor del Mercado',
        subtitle: 'Caos Administrativo y Vulnerabilidad Legal',
        points: [
            '40% de pérdida de productividad en procesos manuales.',
            '70% de informalidad técnica en PYMES venezolanas.',
            'Altos riesgos legales por desconocimiento normativo.'
        ],
        badge: '20% de Puntuación',
        icon: <BarChart3 className="w-12 h-12 text-rose-500" />,
        image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-rose-500/10'
    },
    {
        id: 'solucion',
        title: 'La Solución Kyron',
        subtitle: 'Un Ecosistema, Infinitas Posibilidades',
        content: 'Un SaaS/ERP que une contabilidad automatizada VEN-NIF, comunicaciones corporativas y blindaje legal en una sola interfaz.',
        icon: <Zap className="w-12 h-12 text-amber-500" />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-amber-500/10'
    },
    {
        id: 'tecnologia',
        title: 'Innovación Tecnológica',
        subtitle: 'IA Pericial y Blockchain Layer',
        points: [
            'Kyron Shield: Motor de auditoría legal con IA.',
            'Capa de Inmutabilidad en Blockchain para estados financieros.',
            'Arquitectura de Cero Latencia optimizada para Venezuela.'
        ],
        badge: '15% de Puntuación',
        icon: <Cpu className="w-12 h-12 text-cyan-500" />,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-cyan-500/10'
    },
    {
        id: 'viabilidad',
        title: 'Viabilidad Económica',
        subtitle: 'Modelo SaaS Recurrente',
        points: [
            'Suscripciones escalables: Starter, Growth, Enterprise.',
            'Estructura de costos optimizada (Cloud-Native).',
            'Punto de equilibrio proyectado a 12 meses.'
        ],
        badge: '25% de Puntuación',
        icon: <ShieldCheck className="w-12 h-12 text-emerald-500" />,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/10'
    },
    {
        id: 'escalabilidad',
        title: 'Escalabilidad Masiva',
        subtitle: 'Expansión de Red y Servicios',
        content: 'Capacidad de integrar miles de empresas con costos marginales decrecientes. Expansión regional mediante alianzas contables y legales.',
        icon: <Globe2 className="w-12 h-12 text-indigo-500" />,
        image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-indigo-500/10'
    },
    {
        id: 'impacto',
        title: 'Impacto Ambiental',
        subtitle: 'Modelo Revolucionario "Cero Papel"',
        points: [
            'Digitalización total: Eliminación de archivos físicos en PYMES.',
            'Ahorro masivo de recursos y protección de bosques.',
            'Reducción drástica de la huella de carbono administrativa.'
        ],
        badge: '20% de Puntuación - CRÍTICO',
        icon: <Leaf className="w-12 h-12 text-emerald-400 animate-pulse" />,
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/20'
    },
    {
        id: 'equipo',
        title: 'El Equipo Kyron',
        subtitle: 'Pasión por la Transformación Digital',
        teamMembers: [
            { name: 'Carlos Mattar', role: 'CEO & Tech Lead' },
            { name: 'Sebastian Garrido', role: 'Operations Lead' },
            { name: 'Marcos Sousa', role: 'Legal Compliance' }
        ],
        icon: <Users className="w-12 h-12 text-primary" />,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600',
        bg: 'bg-gradient-to-br from-[#030711] to-primary/10'
    }
];

export default function PresentacionFinalPage() {
    const [current, setCurrent] = useState(0);
    const [isExporting, setIsExporting] = useState(false);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    const handleExportPPTX = async () => {
        setIsExporting(true);
        try {
            const PptxGenJS: any = await loadPptxGen();
            const pptx = new PptxGenJS();
            
            pptx.layout = 'LAYOUT_WIDE';
            pptx.defineSlideMaster({
                title: 'KYRON_MASTER',
                background: { color: '030711' },
                objects: [
                    { rect: { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: '00E5FF' } } }
                ]
            });

            slides.forEach((slideData) => {
                const slide = pptx.addSlide({ masterName: 'KYRON_MASTER' });
                
                // Fondo (Imagen si existe)
                if (slideData.image) {
                    slide.addImage({ path: slideData.image, x: 0, y: 0, w: '100%', h: '100%', opacity: 20 });
                }

                // Título
                slide.addText(slideData.title.toUpperCase(), {
                    x: 0.5, y: 0.5, w: '90%', h: 1,
                    fontSize: 44, fontFace: 'Arial Black', color: 'FFFFFF',
                    bold: true, margin: 0
                });

                // Subtítulo
                slide.addText(slideData.subtitle, {
                    x: 0.5, y: 1.5, w: '90%', h: 0.5,
                    fontSize: 24, fontFace: 'Arial', color: '00E5FF',
                    bold: true
                });

                // Contenido o Puntos
                if (slideData.content) {
                    slide.addText(slideData.content, {
                        x: 0.5, y: 2.5, w: '80%', h: 2,
                        fontSize: 20, fontFace: 'Arial', color: 'CCCCCC',
                        lineSpacing: 28
                    });
                }

                if (slideData.points) {
                    slide.addText(slideData.points.map(p => `• ${p}`).join('\n'), {
                        x: 0.5, y: 2.5, w: '80%', h: 3,
                        fontSize: 18, fontFace: 'Arial', color: 'E0E0E0',
                        lineSpacing: 32
                    });
                }

                // Branding inferior
                slide.addText('SYSTEM KYRON • RETO INSPIRA 2026', {
                    x: 0.5, y: 6.8, w: '90%', h: 0.3,
                    fontSize: 10, fontFace: 'Arial', color: '666666',
                    bold: true, align: 'right'
                });
            });

            await pptx.writeFile({ fileName: `Presentacion_Final_Kyron_${new Date().getTime()}.pptx` });
        } catch (error) {
            console.error('Error exportando PPTX:', error);
            alert('Error al generar el PowerPoint. Intenta de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fixed inset-0 bg-[#030711] overflow-hidden flex flex-col font-outfit">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
                <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
                />
            </div>

            {/* Header Toolbar */}
            <div className="absolute top-8 right-8 flex gap-4 z-50">
                <Button 
                    variant="outline" 
                    onClick={handleExportPPTX}
                    disabled={isExporting}
                    className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest px-6 h-12"
                >
                    {isExporting ? <Zap className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                    {isExporting ? 'Generando...' : 'Descargar PPTX Editable'}
                </Button>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-50">
                <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-primary text-white border-none shadow-lg shadow-primary/20">
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>

            {/* Slide Content */}
            <div className="flex-1 relative flex items-center justify-center p-8 sm:p-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className={`w-full max-w-6xl aspect-[16/9] rounded-[4rem] p-16 sm:p-24 relative overflow-hidden border border-white/5 shadow-2xl flex flex-col justify-center ${slides[current].bg}`}
                    >
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={slides[current].image} 
                                alt="Slide Background" 
                                className="w-full h-full object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#030711] via-[#030711]/80 to-transparent" />
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -mr-64 -mt-64 z-1" />
                        
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-6">
                                <motion.div 
                                    initial={{ rotate: -20, scale: 0.8 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl"
                                >
                                    {slides[current].icon}
                                </motion.div>
                                {slides[current].badge && (
                                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.3em] py-1 px-4 border-primary/30 text-primary">
                                        {slides[current].badge}
                                    </Badge>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none">
                                    {slides[current].title.split(' ').map((word, i) => (
                                        <span key={i} className={i === slides[current].title.split(' ').length - 1 ? "text-primary italic" : "text-white"}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                                <p className="text-2xl sm:text-3xl font-medium text-white/50 tracking-tight">
                                    {slides[current].subtitle}
                                </p>
                            </div>

                            <div className="h-1 w-24 bg-primary" />

                            {slides[current].content && (
                                <p className="text-xl sm:text-2xl text-white/70 max-w-3xl leading-relaxed">
                                    {slides[current].content}
                                </p>
                            )}

                            {slides[current].points && (
                                <ul className="space-y-6">
                                    {slides[current].points.map((point, i) => (
                                        <motion.li 
                                            key={i} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-4 text-xl sm:text-2xl text-white/80"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                            {point}
                                        </motion.li>
                                    ))}
                                </ul>
                            )}

                            {slides[current].team && (
                                <p className="text-sm font-black uppercase tracking-[0.5em] text-primary/50 mt-12">
                                    {slides[current].team}
                                </p>
                            )}

                            {slides[current].teamMembers && (
                                <div className="grid grid-cols-3 gap-8 mt-12">
                                    {slides[current].teamMembers.map((m, i) => (
                                        <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                                            <p className="text-lg font-black text-white uppercase">{m.name}</p>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest">{m.role}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Index */}
            <div className="absolute bottom-8 left-8 text-white/20 font-black text-sm uppercase tracking-widest">
                Slide {current + 1} / {slides.length}
            </div>
        </div>
    );
}
