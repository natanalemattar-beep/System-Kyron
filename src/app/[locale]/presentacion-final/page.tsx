'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, ChevronRight, ShieldCheck, Zap, BarChart3, 
    Globe, Users, Leaf, Cpu, Rocket, FileText, Globe2,
    FileDown, ExternalLink, Share2, Loader2, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dinámicamente cargamos pptxgenjs desde CDN para evitar problemas de instalación
const loadPptxGen = () => {
    return new Promise((resolve) => {
        if ((window as any).PptxGenJS) return resolve((window as any).PptxGenJS);
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
        bg: 'bg-gradient-to-br from-[#030711] to-primary/10',
        badge: 'RETO INSPIRA 2026'
    },
    {
        id: 'problema',
        title: 'El Caos Operativo',
        subtitle: 'Fragmentación y Riesgo en la PyME',
        points: [
            'Ineficiencia: 40% de pérdida de productividad por sistemas aislados.',
            'Costo Ecológico: 12,000 hojas de papel anuales por cada empresa.',
            'Riesgo Fiscal: Incumplimiento crítico de normativas SENIAT/IGTF.',
            'Fragmentación: El empresario promedio lidia con 5+ proveedores.'
        ],
        badge: 'EL PROBLEMA',
        icon: <BarChart3 className="w-12 h-12 text-rose-500" />,
        image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-rose-500/10'
    },
    {
        id: 'solucion',
        title: 'Mando Único',
        subtitle: 'Propuesta de Valor Kyron',
        points: [
            'Conectividad 5G: Integración nativa de telecomunicaciones.',
            'Cero Papel: Automatización legal y fiscal en la nube.',
            'Blindaje Jurídico: Contratos inteligentes bajo norma nacional.',
            'Diferenciación: Único ecosistema con hardware fiscal y software unificado.'
        ],
        badge: 'LA SOLUCIÓN',
        icon: <Zap className="w-12 h-12 text-amber-500" />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-amber-500/10'
    },
    {
        id: 'mercado',
        title: 'Mercado Total',
        subtitle: 'Oportunidad en Venezuela',
        points: [
            'B2B: 500,000+ PyMEs (Retail, Servicios, Manufactura).',
            'B2C: 2M+ Profesionales Independientes sedientos de tecnología.',
            'B2G: Gobiernos locales buscando ciudades inteligentes.',
            'Potencial: Transformación digital del 80% de la economía informal.'
        ],
        badge: 'MERCADO OBJETIVO',
        icon: <Users className="w-12 h-12 text-blue-400" />,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-blue-500/10'
    },
    {
        id: 'modelo_negocio',
        title: 'Suscripciones',
        subtitle: 'Economía de Recurrencia SaaS',
        points: [
            'Plan Basic ($15/mes): Mando único esencial para emprendedores.',
            'Plan Pro ($45/mes): Gestión fiscal automatizada y blindaje legal.',
            'Plan Enterprise ($190+/mes): Control total 5G y hardware fiscal.',
            'Márgenes: 65% de rentabilidad proyectada por usuario activo.'
        ],
        badge: 'MODELO DE NEGOCIO',
        icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/10'
    },
    {
        id: 'marketing',
        title: 'Crecimiento Exponencial',
        subtitle: 'Estrategia de Ventas y Canales',
        points: [
            'Marketing Educativo: Campañas en TikTok/Instagram sobre formalización.',
            'Alianzas Gremiales: Cámaras de Comercio como canales de distribución.',
            'Venta Directa: Fuerza de ventas B2B para el sector corporativo.',
            'Referidos: Sistema de beneficios para contadores y abogados.'
        ],
        badge: 'MARKETING Y VENTAS',
        icon: <Globe2 className="w-12 h-12 text-primary" />,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-primary/5'
    },
    {
        id: 'impacto',
        title: 'Impacto Inspira',
        subtitle: 'Sostenibilidad y Cambio Positivo',
        points: [
            'Cero Emisiones: Digitalización masiva para eliminar el papel físico.',
            'Alianza Ameru: Gestión de residuos mediante inducción magnética.',
            'Formalización: Inclusión de la economía informal al sistema bancario.',
            'Social: Empoderamiento tecnológico para la base de la pirámide.'
        ],
        badge: 'IMPACTO SOCIAL',
        icon: <Leaf className="w-12 h-12 text-emerald-500" />,
        image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/5'
    },
    {
        id: 'hoja_ruta',
        title: 'Hoja de Ruta',
        subtitle: 'Próximos 6 Meses de Evolución',
        points: [
            'Mes 1-2: Lanzamiento oficial y captación de 100 PyMEs piloto.',
            'Mes 3-4: Alianza con operadoras para integración nativa 5G.',
            'Mes 5-6: Despliegue de Smart Bins y hardware fiscal homologado.',
            'Estado: MVP Validado / RIF Jurídico J-50832149-9 Activo.'
        ],
        badge: 'ESTADO ACTUAL',
        icon: <Cpu className="w-12 h-12 text-blue-400" />,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-blue-500/5'
    },
    {
        id: 'equipo',
        title: 'Mando Kyron',
        subtitle: 'Pasión por la Ingeniería Venezolana',
        teamMembers: [
            { name: 'Carlos Mattar', role: 'Founder & Tech Lead' },
            { name: 'Sebastian Garrido', role: 'Operations' },
            { name: 'Marcos Sousa', role: 'Legal' }
        ],
        badge: 'EL EQUIPO',
        icon: <Users className="w-12 h-12 text-white" />,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',
        bg: 'bg-gradient-to-br from-[#030711] to-zinc-900'
    }
];


export default function PresentacionFinalPage() {
    const [current, setCurrent] = useState(0);
    const [isExporting, setIsExporting] = useState(false);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Ultra-Fast Parallel Asset Preloading
    useEffect(() => {
        const preloadAssets = async () => {
            const promises = slides.map(slide => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = slide.image;
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });
            });
            await Promise.all(promises);
            console.log("Kyron Core: Assets Cached for Turbo Download");
        };
        preloadAssets();
        loadPptxGen(); // Preload library immediately
    }, []);

    const handleExportPPTX = async () => {
        setIsExporting(true);
        try {
            const PptxGenJS: any = await loadPptxGen();
            const pptx = new PptxGenJS();
            
            // 1. Definición de Master y Layout
            pptx.layout = 'LAYOUT_WIDE';
            pptx.defineSlideMaster({
                title: 'KYRON_ELITE',
                background: { color: '030712' }, // Negro Kyron profundo
                objects: [
                    // Barra de acento superior
                    { rect: { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: '00E5FF' } } },
                    // Marca de agua sutil
                    { text: { 
                        text: 'SYSTEM KYRON | PROTOCOLO DE DEFENSA 2026', 
                        options: { x: 0.5, y: 7.1, w: '90%', fontSize: 7, color: '1A2B48', align: 'right', bold: true } 
                    } }
                ]
            });

            // 2. Procesamiento de Slides
            slides.forEach((data, index) => {
                const slide = pptx.addSlide({ masterName: 'KYRON_ELITE' });

                // Elementos Visuales de Fondo (Neural Glow)
                slide.addShape(pptx.shapes.OVAL, { 
                    x: 8, y: -2, w: 6, h: 6, 
                    fill: { color: '00E5FF', transparency: 92 } 
                });

                // Badge de Sección
                if (data.badge) {
                    slide.addText(data.badge, {
                        x: 0.5, y: 0.5, w: 4, h: 0.3,
                        fontSize: 9, fontFace: 'Arial Black', color: '00E5FF',
                        bold: true, characterSpacing: 3
                    });
                }

                // Título con Acento
                slide.addText(data.title.toUpperCase(), {
                    x: 0.5, y: 0.9, w: '90%', h: 0.8,
                    fontSize: 42, fontFace: 'Arial Black', color: 'FFFFFF',
                    bold: true, margin: 0
                });
                slide.addShape(pptx.shapes.LINE, { 
                    x: 0.5, y: 1.7, w: 2.5, h: 0, 
                    line: { color: '00E5FF', width: 4 } 
                });

                // Subtítulo Elegante
                slide.addText(data.subtitle, {
                    x: 0.5, y: 1.9, w: '90%', h: 0.5,
                    fontSize: 22, fontFace: 'Arial', color: '00E5FF',
                    bold: true
                });

                // Lógica de Contenido por Tipo
                if (data.id === 'portada') {
                    // Diseño Especial Portada
                    slide.addText(data.content || "", {
                        x: 0.5, y: 3.5, w: '70%', h: 1.5,
                        fontSize: 20, fontFace: 'Arial', color: 'CCCCCC', italic: true
                    });
                    if (data.team) {
                        slide.addText(data.team, {
                            x: 0.5, y: 6.2, w: '90%', h: 0.5,
                            fontSize: 16, fontFace: 'Arial Black', color: 'FFFFFF'
                        });
                    }
                } else if (data.teamMembers) {
                    // Diseño de Equipo
                    data.teamMembers.forEach((member, i) => {
                        const posX = 0.5 + (i * 3.1);
                        slide.addShape(pptx.shapes.RECTANGLE, {
                            x: posX, y: 3.2, w: 2.8, h: 2.5,
                            fill: { color: '0A1020' },
                            line: { color: '1A2B48', width: 1 }
                        });
                        slide.addText(member.name.toUpperCase(), {
                            x: posX, y: 3.8, w: 2.8, h: 0.5,
                            fontSize: 14, fontFace: 'Arial Black', color: 'FFFFFF', align: 'center'
                        });
                        slide.addText(member.role, {
                            x: posX, y: 4.3, w: 2.8, h: 0.5,
                            fontSize: 10, fontFace: 'Arial', color: '00E5FF', align: 'center', bold: true
                        });
                    });
                } else if (data.points) {
                    // Diseño de Puntos
                    slide.addText(data.points.map(p => `•  ${p}`).join('\n\n'), {
                        x: 0.5, y: 2.8, w: '90%', h: 4,
                        fontSize: 17, fontFace: 'Arial', color: 'E0E0E0',
                        lineSpacing: 32
                    });
                }
            });

            // 3. Generación Final
            const fileName = `Kyron_Elite_Pitch_2026_${new Date().getTime()}.pptx`;
            await pptx.writeFile({ fileName });
            
        } catch (error) {
            console.error('CRITICAL_EXPORT_ERROR:', error);
            alert('Falla en el motor de exportación neural. Reintentando...');
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
                    className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest px-6 h-12 min-w-[160px]"
                >
                    {isExporting ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            Generando...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <FileDown className="w-4 h-4" />
                            Descargar PPTX
                        </span>
                    )}
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
            <div className="flex-1 relative flex items-center justify-center p-4 sm:p-20 overflow-y-auto sm:overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className={`w-full max-w-6xl aspect-video max-sm:aspect-auto max-sm:min-h-[80vh] rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-24 relative overflow-hidden border border-white/5 shadow-2xl flex flex-col justify-center ${slides[current].bg}`}
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
                                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                                    {slides[current].title.split(' ').map((word, i) => (
                                        <span key={i} className={i === slides[current].title.split(' ').length - 1 ? "text-primary italic" : "text-white"}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                                <p className="text-lg sm:text-2xl md:text-3xl font-medium text-white/50 tracking-tight">
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
                                <ul className="space-y-3 sm:space-y-6">
                                    {slides[current].points.map((point, i) => (
                                        <motion.li 
                                            key={i} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 text-sm sm:text-xl md:text-2xl text-white/80"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
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
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:grid-cols-3 gap-8 mt-6 sm:mt-12">
                                    {slides[current].teamMembers.map((m, i) => (
                                        <div key={i} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                                            <p className="text-base sm:text-lg font-black text-white uppercase">{m.name}</p>
                                            <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest">{m.role}</p>
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
