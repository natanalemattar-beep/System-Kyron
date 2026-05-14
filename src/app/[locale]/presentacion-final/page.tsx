'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, ChevronRight, ShieldCheck, Zap, BarChart3, 
    Globe, Users, Leaf, Cpu, Rocket, FileText, Globe2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const slides = [
    {
        id: 'portada',
        title: 'System Kyron',
        subtitle: 'El Futuro de la Inteligencia Corporativa en Venezuela',
        content: 'Ecosistema SaaS/ERP Pericial para el Reto Inspira 2026',
        team: 'Carlos Mattar • Sebastian Garrido • Marcos Sousa',
        icon: <Rocket className="w-12 h-12 text-primary" />,
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
        bg: 'bg-gradient-to-br from-[#030711] to-rose-500/10'
    },
    {
        id: 'solucion',
        title: 'La Solución Kyron',
        subtitle: 'Un Ecosistema, Infinitas Posibilidades',
        content: 'Un SaaS/ERP que une contabilidad automatizada VEN-NIF, comunicaciones corporativas y blindaje legal en una sola interfaz.',
        icon: <Zap className="w-12 h-12 text-amber-500" />,
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
        bg: 'bg-gradient-to-br from-[#030711] to-emerald-500/10'
    },
    {
        id: 'escalabilidad',
        title: 'Escalabilidad Masiva',
        subtitle: 'Expansión de Red y Servicios',
        content: 'Capacidad de integrar miles de empresas con costos marginales decrecientes. Expansión regional mediante alianzas contables y legales.',
        icon: <Globe2 className="w-12 h-12 text-indigo-500" />,
        bg: 'bg-gradient-to-br from-[#030711] to-indigo-500/10'
    },
    {
        id: 'impacto',
        title: 'Impacto Triple Bottom Line',
        subtitle: 'Compromiso Cero Papel y Democratización',
        points: [
            'Ambiental: Eliminación de la huella de carbono administrativa.',
            'Social: Formalización de la economía venezolana.',
            'Ético: Transparencia auditada por algoritmos.'
        ],
        badge: '20% de Puntuación',
        icon: <Leaf className="w-12 h-12 text-green-500" />,
        bg: 'bg-gradient-to-br from-[#030711] to-green-500/10'
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
        bg: 'bg-gradient-to-br from-[#030711] to-primary/10'
    }
];

export default function PresentacionFinalPage() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

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
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -mr-64 -mt-64" />
                        
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
