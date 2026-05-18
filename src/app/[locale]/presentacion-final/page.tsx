'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, ShieldCheck, Zap, BarChart3,
    Globe, Users, Leaf, Cpu, Rocket, FileText, Globe2,
    FileDown, Loader2, Printer, Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';

type SlideType = 'portada' | 'problema' | 'solucion' | 'mercado' | 'modelo_negocio' | 'marketing' | 'impacto' | 'hoja_ruta' | 'equipo';

interface SlideBase {
    id: SlideType;
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ReactNode;
    image: string;
    bg: string;
    accent: string;
}

interface SlidePortada extends SlideBase {
    id: 'portada';
    content: string;
    team: string;
}

interface SlidePoints extends SlideBase {
    id: 'problema' | 'solucion' | 'mercado' | 'modelo_negocio' | 'marketing' | 'impacto' | 'hoja_ruta';
    points: string[];
    metrics?: { label: string; value: string; }[];
}

interface SlideEquipo extends SlideBase {
    id: 'equipo';
    teamMembers: { name: string; role: string; color: string; }[];
}

type Slide = SlidePortada | SlidePoints | SlideEquipo;

const slides: Slide[] = [
    {
        id: 'portada',
        title: 'System Kyron',
        subtitle: 'Ecosistema de Inteligencia Corporativa',
        content: 'Sincronizando el Futuro de tu Negocio: Conectividad, Automatización y Sostenibilidad.',
        team: 'Carlos Mattar · Sebastian Garrido · Marcos Sousa',
        icon: <Rocket className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#050b1a] to-cyan-950/30',
        accent: 'from-cyan-400 via-sky-400 to-blue-500',
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
        metrics: [
            { label: 'Pérdida Productividad', value: '40%' },
            { label: 'Hojas Papel/año', value: '12,000' },
            { label: 'Proveedores promedio', value: '5+' }
        ],
        badge: 'EL PROBLEMA',
        icon: <BarChart3 className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#0f0505] to-rose-950/20',
        accent: 'from-rose-400 via-red-500 to-orange-500'
    },
    {
        id: 'solucion',
        title: 'Sincronización Total',
        subtitle: 'Propuesta de Valor Kyron',
        points: [
            'Conectividad 5G: Integración nativa de telecomunicaciones.',
            'Cero Papel: Automatización legal y fiscal en la nube.',
            'Blindaje Jurídico: Contratos inteligentes bajo norma nacional.',
            'Diferenciación: Único ecosistema con hardware fiscal y software unificado.'
        ],
        badge: 'LA SOLUCIÓN',
        icon: <Zap className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#0a0f05] to-amber-950/20',
        accent: 'from-amber-400 via-yellow-500 to-orange-500'
    },
    {
        id: 'mercado',
        title: 'Mercado Total',
        subtitle: 'Oportunidad en Venezuela',
        points: [
            'B2B: 500,000+ PyMEs en Retail, Servicios y Manufactura.',
            'B2C: 2M+ Profesionales Independientes sedientos de tecnología.',
            'B2G: Gobiernos locales buscando ciudades inteligentes.',
            'Potencial: Transformación digital del 80% de la economía informal.'
        ],
        metrics: [
            { label: 'PyMEs potenciales', value: '500K+' },
            { label: 'Profesionales B2C', value: '2M+' },
            { label: 'Economía informal', value: '80%' }
        ],
        badge: 'MERCADO OBJETIVO',
        icon: <Globe className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#050b1a] to-blue-950/20',
        accent: 'from-blue-400 via-indigo-500 to-violet-500'
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
        metrics: [
            { label: 'Margen rentabilidad', value: '65%' },
            { label: 'ARR potencial', value: '$14M+' },
            { label: 'MRR por usuario', value: '$45' }
        ],
        badge: 'MODELO DE NEGOCIO',
        icon: <ShieldCheck className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#050f0a] to-emerald-950/20',
        accent: 'from-emerald-400 via-green-500 to-teal-500'
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
        icon: <Globe2 className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#0a0510] to-violet-950/20',
        accent: 'from-violet-400 via-purple-500 to-pink-500'
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
        metrics: [
            { label: 'Reducción papel', value: '-95%' },
            { label: 'PyMEs formalizadas', value: '10K+' },
            { label: 'Impacto ODS', value: '4/17' }
        ],
        badge: 'IMPACTO SOCIAL',
        icon: <Leaf className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#050f0a] to-emerald-950/15',
        accent: 'from-emerald-400 via-teal-400 to-cyan-400'
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
        icon: <Cpu className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-[#050b1a] to-indigo-950/20',
        accent: 'from-indigo-400 via-blue-500 to-cyan-500'
    },
    {
        id: 'equipo',
        title: 'Mando Kyron',
        subtitle: 'Pasión por la Ingeniería Venezolana',
        teamMembers: [
            { name: 'Carlos Mattar', role: 'Founder & Tech Lead', color: 'from-cyan-400 to-blue-500' },
            { name: 'Sebastian Garrido', role: 'Operations', color: 'from-emerald-400 to-teal-500' },
            { name: 'Marcos Sousa', role: 'Legal', color: 'from-violet-400 to-purple-500' }
        ],
        badge: 'EL EQUIPO',
        icon: <Users className="w-12 h-12" />,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
        bg: 'bg-gradient-to-br from-[#030711] via-zinc-950 to-zinc-900',
        accent: 'from-white via-zinc-300 to-zinc-400'
    }
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 0.92,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 200 : -200,
        opacity: 0,
        scale: 0.92,
    }),
};

const bgGradients: Record<SlideType, string> = {
    portada: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(6,182,212,0.15), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(59,130,246,0.08), transparent)',
    problema: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(244,63,94,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(239,68,68,0.06), transparent)',
    solucion: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(245,158,11,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(234,179,8,0.06), transparent)',
    mercado: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(99,102,241,0.06), transparent)',
    modelo_negocio: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(52,211,153,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(16,185,129,0.06), transparent)',
    marketing: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(168,85,247,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(236,72,153,0.06), transparent)',
    impacto: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(52,211,153,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(45,212,191,0.06), transparent)',
    hoja_ruta: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.06), transparent)',
    equipo: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(255,255,255,0.06), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,255,255,0.03), transparent)',
};

export default function PresentacionFinalPage() {
    const [[current, direction], setPage] = useState([0, 0]);
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const [isExportingPPTX, setIsExportingPPTX] = useState(false);
    const [enginesReady, setEnginesReady] = useState(false);

    const slide = slides[current] as Slide;

    const paginate = useCallback((dir: number) => {
        setPage(([prev]) => {
            const next = (prev + dir + slides.length) % slides.length;
            return [next, dir];
        });
    }, []);

    const next = () => paginate(1);
    const prev = () => paginate(-1);

    useEffect(() => {
        const preloadAssets = async () => {
            const promises = slides.map(slide =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = slide.image;
                    img.onload = resolve;
                    img.onerror = resolve;
                })
            );
            await Promise.all(promises);
        };
        preloadAssets();
    }, []);

    useEffect(() => {
        const checkEngines = setInterval(() => {
            if ((window as any).PptxGenJS && (window as any).html2pdf) {
                setEnginesReady(true);
                clearInterval(checkEngines);
            }
        }, 500);
        return () => clearInterval(checkEngines);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);


    const generatePDF = async () => {
        setIsExportingPDF(true);
        try {
            const html2pdfModule = await import('html2pdf.js');
            const html2pdf = html2pdfModule.default;
            const el = document.getElementById('presentation-container');
            if (!el) return;
            const slidesEls = el.querySelectorAll('.print-slide');
            const slidesData: { html: string; index: number }[] = [];
            slidesEls.forEach((s, i) => {
                slidesData.push({ html: (s as HTMLElement).outerHTML, index: i });
            });

            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = 'position:fixed;left:-9999px;top:0;width:11in;background:#030712;';
            document.body.appendChild(tempDiv);

            for (const sd of slidesData) {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'width:10in;height:7.5in;overflow:hidden;margin:0;padding:0;position:relative;background:#030712;';
                wrapper.innerHTML = sd.html;
                wrapper.className = 'print-slide-wrapper';
                tempDiv.appendChild(wrapper);
            }

            await html2pdf()
                .set({
                    margin: 0,
                    filename: `Kyron_Pitch_Deck_${new Date().getTime()}.pdf`,
                    image: { type: 'jpeg', quality: 0.95 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: '#030712',
                        width: 1056,
                        height: 792,
                        windowWidth: 1056,
                        windowHeight: 792,
                        logging: false,
                    },
                    jsPDF: {
                        unit: 'in',
                        format: [11, 8.5],
                        orientation: 'landscape'
                    },
                    pagebreak: { mode: 'avoid-all' }
                })
                .from(tempDiv)
                .save();

            document.body.removeChild(tempDiv);
        } catch (error) {
            console.error('PDF_ERROR:', error);
            alert('Error generando PDF. Intenta de nuevo.');
        } finally {
            setIsExportingPDF(false);
        }
    };

    const generatePPTX = async () => {
        setIsExportingPPTX(true);
        try {
            const PptxGenJS = (await import('pptxgenjs')).default;
            const pptx = new PptxGenJS();
            pptx.layout = 'LAYOUT_WIDE';
            pptx.defineSlideMaster({
                title: 'KYRON_ELITE',
                background: { color: '030712' },
                objects: [
                    { rect: { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: '00E5FF' } } },
                    { text: {
                        text: 'SYSTEM KYRON · RETO INSPIRA 2026',
                        options: { x: 0.6, y: 7.1, w: '90%', fontSize: 7, color: '1A2B48', align: 'right', bold: true }
                    }}
                ]
            });

            const accentColors: Record<SlideType, string> = {
                portada: '00E5FF', problema: 'F43F5E', solucion: 'F59E0B',
                mercado: '3B82F6', modelo_negocio: '10B981', marketing: 'A855F7',
                impacto: '34D399', hoja_ruta: '6366F1', equipo: 'FFFFFF'
            };

            slides.forEach((data, index) => {
                const s = pptx.addSlide({ masterName: 'KYRON_ELITE' });
                const accent = accentColors[data.id as SlideType] || '00E5FF';

                s.addShape(pptx.shapes.OVAL, { x: 8, y: -1.5, w: 5, h: 5, fill: { color: accent, transparency: 93 } });
                s.addShape(pptx.shapes.OVAL, { x: -1, y: 4, w: 4, h: 4, fill: { color: accent, transparency: 95 } });

                if (data.badge) {
                    s.addText(data.badge, {
                        x: 0.6, y: 0.4, w: 4, h: 0.3,
                        fontSize: 8, fontFace: 'Arial Black', color: accent,
                        bold: true, characterSpacing: 3
                    });
                }

                s.addText(data.title.toUpperCase(), {
                    x: 0.6, y: 0.8, w: '85%', h: 0.9,
                    fontSize: 40, fontFace: 'Arial Black', color: 'FFFFFF', bold: true, margin: 0
                });

                s.addShape(pptx.shapes.LINE, { x: 0.6, y: 1.7, w: 2.5, h: 0, line: { color: accent, width: 3.5 } });

                s.addText(data.subtitle, {
                    x: 0.6, y: 1.85, w: '85%', h: 0.4,
                    fontSize: 20, fontFace: 'Arial', color: accent, bold: true
                });

                if (data.id === 'portada') {
                    const pd = data as SlidePortada;
                    s.addText(pd.content || "", {
                        x: 0.6, y: 3.2, w: '70%', h: 1.5,
                        fontSize: 18, fontFace: 'Arial', color: 'CCCCCC', italic: true
                    });
                    if (pd.team) {
                        s.addText(pd.team, {
                            x: 0.6, y: 6.2, w: '90%', h: 0.5,
                            fontSize: 15, fontFace: 'Arial Black', color: 'FFFFFF'
                        });
                    }
                } else if (data.id === 'equipo') {
                    const ed = data as SlideEquipo;
                    ed.teamMembers.forEach((member, i) => {
                        const posX = 0.6 + (i * 3.1);
                        s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
                            x: posX, y: 3, w: 2.8, h: 2.8,
                            fill: { color: '0A1020' },
                            line: { color: '1A2B48', width: 1 },
                            rectRadius: 6
                        });
                        s.addText(member.name.toUpperCase(), {
                            x: posX, y: 3.6, w: 2.8, h: 0.5,
                            fontSize: 14, fontFace: 'Arial Black', color: 'FFFFFF', align: 'center'
                        });
                        s.addText(member.role, {
                            x: posX, y: 4.2, w: 2.8, h: 0.5,
                            fontSize: 11, fontFace: 'Arial', color: accent, align: 'center', bold: true
                        });
                    });
                } else {
                    const pd = data as SlidePoints;
                    if (pd.points) {
                        s.addText(pd.points.map(p => `▸  ${p}`).join('\n\n'), {
                            x: 0.6, y: 2.7, w: '75%', h: 4,
                            fontSize: 16, fontFace: 'Arial', color: 'E0E0E0', lineSpacing: 28
                        });
                    }
                    if (pd.metrics) {
                        pd.metrics.forEach((m, i) => {
                            const mx = 7.5;
                            const my = 2.5 + i * 1.4;
                            s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
                                x: mx, y: my, w: 2.2, h: 1.1,
                                fill: { color: '0A1020' },
                                line: { color: accent, width: 1 },
                                rectRadius: 4
                            });
                            s.addText(m.value, {
                                x: mx, y: my + 0.05, w: 2.2, h: 0.6,
                                fontSize: 24, fontFace: 'Arial Black', color: accent, align: 'center', bold: true
                            });
                            s.addText(m.label.toUpperCase(), {
                                x: mx, y: my + 0.6, w: 2.2, h: 0.4,
                                fontSize: 8, fontFace: 'Arial', color: '999999', align: 'center'
                            });
                        });
                    }
                }
            });

            await pptx.writeFile({ fileName: `Kyron_Pitch_Deck_${new Date().getTime()}.pptx` });
        } catch (error) {
            console.error('PPTX_ERROR:', error);
            alert('Error generando PPTX. Intenta de nuevo.');
        } finally {
            setIsExportingPPTX(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 bg-[#030711] dark overflow-hidden flex flex-col font-outfit print:static print:bg-[#030712] print:overflow-visible">
            <Script
                src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"
                strategy="afterInteractive"
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
                strategy="afterInteractive"
            />

            <style jsx global>{`
                @media print {
                    body { 
                        background: #030712 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .no-print { display: none !important; }
                    .print-slide {
                        page-break-after: always !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        width: 10in !important;
                        height: 7.5in !important;
                        overflow: hidden !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        margin: 0 auto !important;
                        background: #030712 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print-slide * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    @page {
                        size: landscape 11in 8.5in;
                        margin: 0;
                    }
                }
                @media screen {
                    .print-only { display: none !important; }
                }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
            `}</style>

            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] z-50 no-print">
                <motion.div
                    className="h-full"
                    style={{
                        background: `linear-gradient(90deg, ${slide.accent.replace('from-', '').split(' ')[0].replace('via-', '').split(' ')[0]}, ${'#00E5FF'})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            {/* Top Navbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 no-print">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                        System Kyron · Reto Inspira 2026
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {!enginesReady && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-cyan-400" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Iniciando...</span>
                        </div>
                    )}
                     <div className="flex gap-1.5">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generatePDF}
                            disabled={isExportingPDF || !enginesReady}
                            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[9px] tracking-widest px-4 h-8"
                        >
                            {isExportingPDF ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                                    PDF...
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <FileText className="w-3 h-3" />
                                    PDF
                                </span>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generatePPTX}
                            disabled={isExportingPPTX || !enginesReady}
                            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[9px] tracking-widest px-4 h-8"
                        >
                            {isExportingPPTX ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                                    PPTX...
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <FileDown className="w-3 h-3" />
                                    PPTX
                                </span>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrint}
                            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[9px] tracking-widest px-4 h-8"
                        >
                            <Printer className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-6 left-6 z-50 flex items-center gap-3 no-print">
                <div className="flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage([i, i > current ? 1 : -1])}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                i === current
                                    ? 'w-8 bg-cyan-400 shadow-lg shadow-cyan-400/30'
                                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>
                <span className="text-[10px] font-bold text-white/20 tracking-widest ml-2">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-50 no-print">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full bg-white/5 border-white/10 hover:bg-white/20 hover:border-cyan-400/30 transition-all text-white h-10 w-10"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full bg-cyan-500/10 border-cyan-400/30 hover:bg-cyan-500/20 text-white h-10 w-10 shadow-lg shadow-cyan-500/10"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>

            {/* Slides Container */}
            <div id="presentation-container" className="flex-1 relative flex items-center justify-center overflow-hidden print:overflow-visible print:block print:py-8">
                {/* Screen Slides */}
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 print:hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className={`
                                w-full max-w-[1200px] aspect-video max-sm:aspect-auto max-sm:min-h-[85vh]
                                rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden
                                border border-white/[0.06] shadow-2xl shadow-black/50
                                flex flex-col justify-center
                                ${slide.bg}
                                print:hidden
                            `}
                        >
                            {/* Decorative Grid Pattern */}
                            <div className="absolute inset-0 z-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                    backgroundSize: '60px 60px'
                                }}
                            />

                            {/* Neural Glow Orbs */}
                            <div
                                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-[120px]"
                                style={{ background: `radial-gradient(circle, ${slide.accent.replace('from-', '').split(' ')[0]}, transparent)` }}
                            />
                            <div
                                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-[100px]"
                                style={{ background: `radial-gradient(circle, ${slide.accent.replace('from-', '').split(' ')[0]}, transparent)` }}
                            />

                            {/* Custom Radial Background */}
                            <div className="absolute inset-0 z-0 opacity-40"
                                style={{ background: bgGradients[slide.id] }}
                            />

                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                 <Image
                                     src={slide.image}
                                     alt=""
                                     fill
                                     crossOrigin="anonymous"
                                     className="object-cover opacity-[0.08]"
                                 />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#030711] via-[#030711]/90 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 px-8 sm:px-16 lg:px-20 py-8 sm:py-12 max-w-[90%]">
                                {/* Badge + Icon Row */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-4 mb-6 sm:mb-8"
                                >
                                    <div className={`
                                        p-2.5 sm:p-3 rounded-2xl border backdrop-blur-xl
                                        bg-white/[0.03] border-white/[0.08]
                                    `}>
                                        <div className={`text-transparent bg-clip-text bg-gradient-to-br ${slide.accent}`}>
                                            {slide.icon}
                                        </div>
                                    </div>
                                    {slide.badge && (
                                        <Badge
                                            variant="outline"
                                            className={`
                                                text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em]
                                                py-1 px-3 sm:px-4 rounded-full border-white/10
                                                bg-white/[0.02] backdrop-blur-xl
                                            `}
                                            style={{
                                                color: slide.accent.includes('cyan') ? '#22d3ee' :
                                                    slide.accent.includes('rose') ? '#fb7185' :
                                                    slide.accent.includes('amber') ? '#fbbf24' :
                                                    slide.accent.includes('blue') ? '#60a5fa' :
                                                    slide.accent.includes('emerald') ? '#34d399' :
                                                    slide.accent.includes('violet') ? '#a78bfa' :
                                                    slide.accent.includes('indigo') ? '#818cf8' :
                                                    '#ffffff',
                                                borderColor: slide.accent.includes('cyan') ? 'rgba(34,211,238,0.2)' :
                                                    slide.accent.includes('rose') ? 'rgba(251,113,133,0.2)' :
                                                    slide.accent.includes('amber') ? 'rgba(251,191,36,0.2)' :
                                                    slide.accent.includes('blue') ? 'rgba(96,165,250,0.2)' :
                                                    slide.accent.includes('emerald') ? 'rgba(52,211,153,0.2)' :
                                                    slide.accent.includes('violet') ? 'rgba(167,139,250,0.2)' :
                                                    slide.accent.includes('indigo') ? 'rgba(129,140,248,0.2)' :
                                                    'rgba(255,255,255,0.2)',
                                            }}
                                        >
                                            {slide.badge}
                                        </Badge>
                                    )}
                                </motion.div>

                                {/* Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-3 sm:mb-4"
                                >
                                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                                        {slide.title.split(' ').map((word, i, arr) => (
                                            <span key={i} className={
                                                i === arr.length - 1
                                                    ? `text-transparent bg-clip-text bg-gradient-to-r ${slide.accent} italic`
                                                    : 'text-white'
                                            }>
                                                {word}{' '}
                                            </span>
                                        ))}
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-white/40 tracking-tight mb-4 sm:mb-6"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                {/* Accent Line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.35, duration: 0.6 }}
                                    className={`h-[2px] w-20 sm:w-28 rounded-full bg-gradient-to-r ${slide.accent} origin-left mb-6 sm:mb-8`}
                                />

                                {/* Portada content */}
                                {'content' in slide && slide.id === 'portada' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light"
                                    >
                                        {(slide as SlidePortada).content}
                                    </motion.p>
                                )}

                                {'team' in slide && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-white/25 mt-4 sm:mt-6"
                                    >
                                        {(slide as SlidePortada).team}
                                    </motion.p>
                                )}

                                {/* Points List */}
                                {'points' in slide && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-4xl"
                                    >
                                        {(slide as SlidePoints).points.map((point, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -15 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + i * 0.08 }}
                                                className="flex items-start gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm"
                                            >
                                                <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r ${slide.accent}`} />
                                                <span className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                                                    {point}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Metrics Cards */}
                                {'metrics' in slide && (slide as SlidePoints).metrics && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex gap-2 sm:gap-3 mt-4 sm:mt-6"
                                    >
                                        {(slide as SlidePoints).metrics!.map((m, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm text-center"
                                            >
                                                <p className={`text-xl sm:text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${slide.accent}`}>
                                                    {m.value}
                                                </p>
                                                <p className="text-[8px] sm:text-[10px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                                                    {m.label}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Team Members */}
                                {'teamMembers' in slide && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl"
                                    >
                                        {(slide as SlideEquipo).teamMembers.map((m, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                className="group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500"
                                            >
                                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${m.color} mb-3 sm:mb-4 opacity-80 group-hover:opacity-100 transition-opacity`} />
                                                <p className="text-sm sm:text-base font-black text-white uppercase tracking-tight">{m.name}</p>
                                                <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r ${m.color}`}>
                                                    {m.role}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            {/* Corner Decorations */}
                            <div className="absolute top-6 right-6 w-12 h-12 opacity-[0.04]"
                                style={{
                                    borderRight: '1px solid rgba(255,255,255,0.3)',
                                    borderTop: '1px solid rgba(255,255,255,0.3)',
                                }}
                            />
                            <div className="absolute bottom-6 left-6 w-12 h-12 opacity-[0.04]"
                                style={{
                                    borderLeft: '1px solid rgba(255,255,255,0.3)',
                                    borderBottom: '1px solid rgba(255,255,255,0.3)',
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Print Slides (hidden on screen) */}
                <div className="print-only w-full">
                    {slides.map((s, i) => {
                        const ps = s as Slide;
                        return (
                            <div key={i} className="print-slide">
                                <div className={`
                                    w-full h-full relative overflow-hidden flex flex-col justify-center
                                    ${ps.bg}
                                `}>
                                    <div className="absolute inset-0 z-0 opacity-[0.03]"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '60px 60px'
                                        }}
                                    />
                                    <div className="absolute inset-0 z-0 opacity-30"
                                        style={{ background: bgGradients[ps.id] }}
                                    />
                                     <Image
                                         src={ps.image}
                                         alt=""
                                         fill
                                         crossOrigin="anonymous"
                                         className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
                                     />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#030711] via-[#030711]/90 to-transparent" />

                                    <div className="relative z-10 px-16 py-12">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`text-transparent bg-clip-text bg-gradient-to-br ${ps.accent}`}>
                                                {ps.icon}
                                            </div>
                                            {ps.badge && (
                                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 border border-white/10 rounded-full px-4 py-1">
                                                    {ps.badge}
                                                </span>
                                            )}
                                        </div>

                                        <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-2">
                                            {ps.title.split(' ').map((word, j, arr) => (
                                                <span key={j} className={
                                                    j === arr.length - 1
                                                        ? `text-transparent bg-clip-text bg-gradient-to-r ${ps.accent} italic`
                                                        : 'text-white'
                                                }>
                                                    {word}{' '}
                                                </span>
                                            ))}
                                        </h1>
                                        <p className="text-xl font-medium text-white/40 tracking-tight mb-4">
                                            {ps.subtitle}
                                        </p>
                                        <div className={`h-[2px] w-28 rounded-full bg-gradient-to-r ${ps.accent} mb-6`} />

                                        {'content' in ps && ps.id === 'portada' && (
                                            <p className="text-lg text-white/60 max-w-2xl leading-relaxed font-light">{(ps as SlidePortada).content}</p>
                                        )}
                                        {'team' in ps && (
                                            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/25 mt-6">{(ps as SlidePortada).team}</p>
                                        )}

                                        {'points' in ps && (
                                            <div className="grid grid-cols-2 gap-3 max-w-4xl">
                                                {(ps as SlidePoints).points.map((point, j) => (
                                                    <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                                        <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r ${ps.accent}`} />
                                                        <span className="text-sm text-white/70 leading-relaxed">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {'metrics' in ps && (ps as SlidePoints).metrics && (
                                            <div className="flex gap-3 mt-4">
                                                {(ps as SlidePoints).metrics!.map((m, j) => (
                                                    <div key={j} className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                                                        <p className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${ps.accent}`}>{m.value}</p>
                                                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-0.5">{m.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {'teamMembers' in ps && (
                                            <div className="grid grid-cols-3 gap-4 max-w-3xl">
                                                {(ps as SlideEquipo).teamMembers.map((m, j) => (
                                                    <div key={j} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                                                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${m.color} mb-3 opacity-80`} />
                                                        <p className="text-sm font-black text-white uppercase">{m.name}</p>
                                                        <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r ${m.color}`}>{m.role}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 no-print">
                <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.5em]">
                    ←  →  para navegar · F para pantalla completa
                </p>
            </div>
        </div>
    );
}
