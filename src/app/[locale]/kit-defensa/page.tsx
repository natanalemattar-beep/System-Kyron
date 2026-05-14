"use client";

import React, { useEffect, useState } from 'react';
import { 
    FileText, 
    Presentation, 
    ShieldCheck, 
    ArrowRight, 
    Download, 
    Sparkles, 
    Layers, 
    Cpu, 
    Globe, 
    UserCheck,
    Sticker,
    ArrowLeft
} from 'lucide-react';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ResourceHeader } from '@/components/brand/ResourceHeader';

const DEFENSE_ASSETS = [
    {
        id: 'speech',
        title: 'Guion de Defensa',
        description: 'Discurso de 4:30 min optimizado para impacto total. Incluye breakdown de todos los módulos y alianza Ameru.',
        icon: FileText,
        color: 'from-blue-500 to-cyan-500',
        href: '/guion-defensa',
        badge: '4:30 MIN',
        action: 'Leer Discurso'
    },
    {
        id: 'presentation',
        title: 'Presentación Final',
        description: 'Pitch Deck interactivo con métricas, arquitectura tecnológica y visión de escalabilidad 2026.',
        icon: Presentation,
        color: 'from-purple-500 to-indigo-500',
        href: '/presentacion-final',
        badge: 'HD READY',
        action: 'Ver Slides'
    },
    {
        id: 'summary',
        title: 'Resumen Ejecutivo',
        description: 'Documento técnico para el jurado. Detalla el modelo de negocio SaaS y la infraestructura Kyron Shield.',
        icon: ShieldCheck,
        color: 'from-emerald-500 to-teal-500',
        href: '/resumen-ejecutivo',
        badge: 'PDF EXPORT',
        action: 'Abrir Resumen'
    },
    {
        id: 'branding',
        title: 'Kit de Identidad',
        description: 'Stickers, marca-libros y tarjetas de presentación con QR para el networking post-defensa.',
        icon: Sticker,
        color: 'from-amber-500 to-orange-500',
        href: '/stickers',
        badge: 'PRINT READY',
        action: 'Descargar Assets'
    }
];

export default function DefenseKitPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#030712] text-white font-[family-name:var(--font-outfit)]">
            <ResourceHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
                    >
                        <Sparkles className="h-3 w-3" /> Kit de Defensa v2.0
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85]"
                    >
                        Protocolo de<br/>
                        <span className="bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">Alta Fidelidad</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-12"
                    >
                        Todos los activos estratégicos para el Reto Inspira 2026 unificados en un solo ecosistema de alto rendimiento.
                    </motion.p>
                </div>
            </section>

            {/* Assets Grid */}
            <section className="max-w-6xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DEFENSE_ASSETS.map((asset, index) => (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group relative"
                        >
                            <Link href={asset.href as any}>
                                <div className="relative h-full bg-[#09090b] border border-white/5 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-white/20 hover:bg-[#0c0c0e] overflow-hidden">
                                    {/* Gradient Glow */}
                                    <div className={cn(
                                        "absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full bg-gradient-to-br",
                                        asset.color
                                    )} />

                                    <div className="flex flex-col h-full relative z-10">
                                        <div className="flex justify-between items-start mb-12">
                                            <div className={cn(
                                                "h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-110",
                                                "bg-gradient-to-br from-white/5 to-transparent"
                                            )}>
                                                <asset.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black tracking-widest text-zinc-400 uppercase">
                                                {asset.badge}
                                            </span>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                                {asset.title}
                                            </h3>
                                            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                                                {asset.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                                            {asset.action} <ArrowRight className="h-4 w-4 text-cyan-400" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-zinc-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Core Engine v2.2</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-zinc-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Global Deployment</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                        <UserCheck className="h-4 w-4 text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Preparado para Defensa</span>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
