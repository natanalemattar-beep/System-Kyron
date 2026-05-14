"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, 
    User, 
    Mic2, 
    Sparkles, 
    ArrowLeft, 
    Printer,
    Timer,
    AlertCircle
} from 'lucide-react';
import { Link } from '@/navigation';
import { ResourceHeader } from '@/components/brand/ResourceHeader';

const SCRIPT_SECTIONS = [
    {
        time: '0:00 - 0:40',
        title: 'El Gancho y La Misión',
        speaker: 'Carlos',
        content: [
            "Buenos días. Somos System Kyron. En Venezuela, el empresario no solo compite contra el mercado, compite contra el tiempo y la burocracia. Pierde el 40% de su productividad en tareas manuales.",
            "System Kyron no es solo un software; es un Ecosistema de Inteligencia Corporativa que automatiza la complejidad para que el empresario pueda enfocarse en lo que importa: crecer."
        ]
    },
    {
        time: '0:40 - 2:00',
        title: 'El Blitz de Módulos',
        speaker: 'Carlos',
        content: [
            "Nuestro ecosistema está blindado por Kyron Shield y se divide en 5 pilares de automatización absoluta:",
            "1. Finanzas Periciales: Automatizamos contabilidad bajo VEN-NIF, gestionando IVA, ISLR e IGTF al 100% sin errores humanos.",
            "2. Legal & Compliance: Blindaje total con Kyron Voice para contratos automáticos y gestión de permisología ante SAPI y SENIAT.",
            "3. Operaciones TPV: Facturación multimoneda e inventarios inteligentes que se sincronizan en milisegundos.",
            "4. Talento Humano: Nómina automatizada y reclutamiento con IA que analiza el clima organizacional.",
            "5. Conectividad 5G: Somos el primer ERP que integra gestión de líneas móviles para flotas empresariales."
        ]
    },
    {
        time: '2:00 - 2:45',
        title: 'El Núcleo: IA y Blockchain',
        speaker: 'Sebastian',
        content: [
            "¿Cómo garantizamos la confianza? Mediante una capa de Blockchain que hace que cada documento y transacción sea inmutable.",
            "Nuestra IA Core no solo reporta; predice. Analiza la rentabilidad y sugiere estrategias de marketing basadas en datos reales, convirtiendo la información en dinero."
        ]
    },
    {
        time: '2:45 - 3:30',
        title: 'Sostenibilidad: Alianza Ameru',
        speaker: 'Marcos',
        content: [
            "System Kyron es el estándar de 'Zero Paper'. Eliminamos el archivo físico, pero vamos más allá.",
            "Gracias a nuestra alianza con Ameru, integramos los Smart Bins. Reciclar residuos ahora genera Eco-Créditos canjeables en el sistema. Estamos creando la primera red de economía circular corporativa verificada en Venezuela."
        ]
    },
    {
        time: '3:30 - 4:15',
        title: 'Viabilidad y Escalabilidad',
        speaker: 'Sebastian',
        content: [
            "Nuestro modelo SaaS es flexible y recurrente. Con costos Cloud-Native y una infraestructura escalable, somos una plataforma de alta rentabilidad lista para la expansión regional.",
            "No somos una promesa; somos una herramienta en producción diseñada para reconstruir el tejido empresarial."
        ]
    },
    {
        time: '4:15 - 4:30',
        title: 'Cierre Rotundo',
        speaker: 'Carlos',
        content: [
            "Carlos, Sebastian y Marcos. Tenemos la tecnología, las alianzas y el blindaje legal.",
            "System Kyron: El control total de tu empresa ha llegado. Muchas gracias."
        ]
    }
];

export default function DefenseSpeechPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#030712] text-white font-[family-name:var(--font-outfit)] print:bg-white print:text-black">
            <ResourceHeader />

            {/* Print Header (Only visible when printing) */}
            <div className="hidden print:block mb-8 border-b-2 border-black pb-4 text-center">
                <h1 className="text-3xl font-black uppercase">System Kyron | Guion de Defensa</h1>
                <p className="text-sm font-bold uppercase tracking-widest mt-2">Reto Inspira 2026 • Versión de Impacto Total</p>
            </div>

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-32">
                {/* Back Link */}
                <div className="mb-12 print:hidden">
                    <Link href="/kit-defensa" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                        <ArrowLeft className="h-3 w-3" /> Volver al Kit de Defensa
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 print:mb-8">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-6"
                        >
                            <Mic2 className="h-3 w-3" /> Discurso Oficial
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
                        >
                            Guion de <br/> <span className="text-cyan-500">Defensa 2026</span>
                        </motion.h1>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl w-full md:w-64 print:border-black print:text-black"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duración</span>
                                <div className="flex items-center gap-2 text-cyan-400 font-black">
                                    <Timer className="h-4 w-4" /> 4:30
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Ritmo</span>
                                <span className="text-white font-bold text-xs print:text-black">125 PPM</span>
                            </div>
                            <button 
                                onClick={() => window.print()}
                                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all print:hidden"
                            >
                                <Printer className="h-4 w-4" /> Imprimir Guion
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Impact Notes Alert */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4 print:border-black"
                >
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Notas de Impacto</p>
                        <p className="text-zinc-400 text-xs leading-relaxed font-medium print:text-black">
                            Mantengan contacto visual con el jurado. Enfaticen las palabras clave: <strong className="text-white print:text-black">VEN-NIF, Blockchain, Smart Bins</strong>. No corran, respiren entre oradores.
                        </p>
                    </div>
                </motion.div>

                {/* Script Body */}
                <div className="space-y-12">
                    {SCRIPT_SECTIONS.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="relative group print:break-inside-avoid"
                        >
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors rounded-full" />
                            
                            <div className="pl-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-xs font-black text-cyan-500 font-mono tracking-tighter">{section.time}</span>
                                    <div className="h-px flex-1 bg-white/5 print:bg-black/10" />
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-400 print:text-black print:border-black">
                                        <User className="h-3 w-3" /> {section.speaker}
                                    </div>
                                </div>

                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-cyan-400 transition-colors print:text-black">
                                    {section.title}
                                </h3>

                                <div className="space-y-4">
                                    {section.content.map((text, pIdx) => (
                                        <p key={pIdx} className="text-zinc-400 text-lg leading-relaxed font-medium print:text-black">
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 p-12 text-center border border-white/5 bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] print:hidden"
                >
                    <Sparkles className="h-8 w-8 text-cyan-500 mx-auto mb-6" />
                    <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4">¡Éxito en la Defensa!</h4>
                    <p className="text-zinc-500 text-sm font-medium mb-8">Repasa el Pitch Deck para sincronizar el tiempo.</p>
                    <Link href="/presentacion-final" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                        Ver Presentación Final <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}
