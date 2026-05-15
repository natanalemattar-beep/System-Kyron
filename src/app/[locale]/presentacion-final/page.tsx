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
        subtitle: 'La Evolución del Mando Único',
        content: 'Sincronizando el Futuro de tu Negocio: Conectividad, Automatización y Sostenibilidad.',
        team: 'Carlos Mattar • Sebastian Garrido • Marcos Sousa',
        icon: <Rocket className="w-12 h-12 text-primary" />,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-primary/10'
    },
    {
        id: 'problema',
        title: 'Ineficiencia Sistémica',
        subtitle: 'Fragmentación Operativa y Desperdicio de Capital',
        points: [
            '40% de pérdida de productividad por ecosistemas desconectados.',
            'Impacto Ecológico: 12,000 hojas de papel anuales por cada PyME.',
            'Fuga de Capital: Costos ocultos en gestión multianimal de proveedores.',
            'Riesgo Fiscal: Incumplimiento crítico de normativas SENIAT/VEN-NIF.'
        ],
        badge: 'CRISIS ESTRUCTURAL',
        icon: <BarChart3 className="w-12 h-12 text-rose-500" />,
        image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-rose-500/10'
    },
    {
        id: 'mercado',
        title: 'Nuestro Mercado',
        subtitle: '¿A quién le vendemos?',
        points: [
            'B2B: 500,000+ PyMEs venezolanas sedientas de automatización legal/fiscal.',
            'B2C: Profesionales independientes que buscan identidad digital blindada.',
            'B2G: Gobiernos locales interesados en ciudades inteligentes y sostenibilidad.',
            'Sectores: Retail, Manufactura, Consultoría y Servicios Contables.'
        ],
        badge: 'TARGET',
        icon: <Users className="w-12 h-12 text-blue-400" />,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-blue-500/10'
    },
    {
        id: 'solucion',
        title: 'Integración Vertical',
        subtitle: 'Unificación Operativa de Alto Rendimiento',
        points: [
            'Kyron 5G: Convergencia nativa de telecomunicaciones y ERP.',
            'Cero Papel: Digitalización pericial de libros contables y jurídicos.',
            'Reserva Dinámica: Algoritmo SIM-App para continuidad de servicio.',
            'Kyron Shield: Protocolo de seguridad inmutable para transacciones.'
        ],
        badge: 'VENTAJA COMPETITIVA',
        icon: <Zap className="w-12 h-12 text-amber-500" />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-amber-500/10'
    },
    {
        id: 'finanzas',
        title: 'Inversión & Ganancia',
        subtitle: 'Proyección de Crecimiento 2026-2028',
        points: [
            'Modelo SaaS: Ingresos recurrentes con márgenes del 65%.',
            'Hardware Fiscal: Venta directa de equipos homologados SENIAT.',
            'Inversión: Infraestructura Cloud, Nodos 5G y Alianza Ameru.',
            'Retorno (ROI): Punto de equilibrio proyectado en el mes 14.'
        ],
        badge: 'VIABILIDAD',
        icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/10'
    },
    {
        id: 'equipo',
        title: 'Equipo Kyron',
        subtitle: 'RIF: J-50832149-9',
        teamMembers: [
            { name: 'Carlos Mattar', role: 'Founder & Tech Lead' },
            { name: 'Sebastian Garrido', role: 'Operations' },
            { name: 'Marcos Sousa', role: 'Legal' }
        ],
        badge: 'EL EQUIPO',
        icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/10'
    }
];

export default function PresentacionFinalPage() {
    const [current, setCurrent] = useState(0);
    const [isExporting, setIsExporting] = useState(false);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Preload de imágenes para evitar lag en transiciones
    useEffect(() => {
        const nextSlide = (current + 1) % slides.length;
        const img = new Image();
        img.src = slides[nextSlide].image;
    }, [current]);

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
                    { rect: { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: '00E5FF' } } },
                    { text: { text: 'SYSTEM KYRON | RETO INSPIRA 2026', options: { x: 0.5, y: 7, w: '90%', fontSize: 8, color: '333333', align: 'right' } } }
                ]
            });

            slides.forEach((slideData) => {
                const slide = pptx.addSlide({ masterName: 'KYRON_MASTER' });
                
                // Overlay sutil de imagen
                if (slideData.image) {
                    slide.addImage({ path: slideData.image, x: 0, y: 0, w: '100%', h: '100%', opacity: 15 });
                }

                // Titular Principal (Cyan)
                slide.addText(slideData.title.toUpperCase(), {
                    x: 0.5, y: 0.8, w: '90%', h: 1,
                    fontSize: 48, fontFace: 'Arial Black', color: '00E5FF',
                    bold: true, margin: 0
                });

                // Subtítulo (Blanco)
                slide.addText(slideData.subtitle, {
                    x: 0.5, y: 1.8, w: '90%', h: 0.5,
                    fontSize: 26, fontFace: 'Arial', color: 'FFFFFF',
                    bold: true
                });

                // Línea divisora
                slide.addShape(pptx.shapes.LINE, { x: 0.5, y: 2.5, w: 2, h: 0, line: { color: '00E5FF', width: 2 } });

                // Contenido
                if (slideData.content) {
                    slide.addText(slideData.content, {
                        x: 0.5, y: 3, w: '85%', h: 2.5,
                        fontSize: 22, fontFace: 'Arial', color: 'CCCCCC',
                        lineSpacing: 35
                    });
                }

                if (slideData.points) {
                    slide.addText(slideData.points.map(p => `• ${p}`).join('\n'), {
                        x: 0.5, y: 3, w: '85%', h: 3.5,
                        fontSize: 20, fontFace: 'Arial', color: 'E0E0E0',
                        lineSpacing: 40
                    });
                }

                if (slideData.teamMembers) {
                    slideData.teamMembers.forEach((m, idx) => {
                        slide.addText(`${m.name}\n${m.role}`, {
                            x: 0.5 + (idx * 3.5), y: 3.5, w: 3, h: 1,
                            fontSize: 18, fontFace: 'Arial Black', color: 'FFFFFF',
                            align: 'center', fill: { color: '111827' }
                        });
                    });
                }
            });

            await pptx.writeFile({ fileName: `Kyron_Pitch_2026_${new Date().getTime()}.pptx` });
        } catch (error) {
            console.error('Error exportando PPTX:', error);
            alert('Error al generar el PowerPoint.');
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
        <div className="fixed inset-0 bg-[#030711] overflow-hidden flex flex-col font-outfit print:static print:bg-white">
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    .print-page { 
                        position: static !important; 
                        height: 100vh !important; 
                        page-break-after: always !important; 
                        display: flex !important;
                        background: white !important;
                        color: black !important;
                    }
                    * { color: black !important; background: white !important; }
                }
            `}</style>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50 no-print">
                <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Header Toolbar */}
            <div className="absolute top-8 right-8 flex gap-4 z-50 no-print">
                <Button 
                    variant="outline" 
                    onClick={() => window.print()}
                    className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest px-6 h-12"
                >
                    <FileText className="w-4 h-4 mr-2" /> PDF Imprimible
                </Button>
                <Button 
                    variant="outline" 
                    onClick={handleExportPPTX}
                    disabled={isExporting}
                    className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest px-6 h-12"
                >
                    {isExporting ? <Zap className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                    {isExporting ? 'Generando...' : 'Descargar PPTX'}
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
                                loading="eager"
                                decoding="async"
                                className="w-full h-full object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#030711] via-[#030711]/80 to-transparent backdrop-blur-[2px]" />
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
