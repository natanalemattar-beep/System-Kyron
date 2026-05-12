"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, 
    FileText, 
    Image as ImageIcon, 
    Mic, 
    Presentation, 
    QrCode, 
    Bookmark, 
    Contact, 
    Circle,
    ArrowRight,
    Download,
    ExternalLink,
    Sparkles,
    Smartphone,
    Globe,
    Instagram,
    ChevronLeft,
    Layers,
    Layout
} from 'lucide-react';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ResourceHeader } from '@/components/brand/ResourceHeader';

export default function BrandKitPage() {
    const [mounted, setMounted] = useState(false);
    const [baseUrl, setBaseUrl] = useState('https://system-kyron.vercel.app');

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
        }
    }, []);

    if (!mounted) return null;

    const resources = [
        {
            id: 'pitch',
            title: 'Pitch Ejecutivo',
            description: 'Presentación cinematográfica 4K para inversionistas y jurado.',
            icon: Presentation,
            href: '/pitch',
            color: 'from-blue-600 to-indigo-600',
            tag: 'LIVE PITCH',
            type: 'internal'
        },
        {
            id: 'resumen',
            title: 'Resumen Ejecutivo',
            description: 'Documento síntesis de 2 páginas con la propuesta de valor.',
            icon: FileText,
            href: '/resumen-ejecutivo',
            color: 'from-cyan-600 to-blue-600',
            tag: 'DOCUMENTO',
            type: 'internal'
        },
        {
            id: 'guion',
            title: 'Guion de Locución',
            description: 'Script oficial palabra por palabra para la defensa del pitch.',
            icon: Mic,
            href: '/pitch', // Script is exported from pitch page
            color: 'from-emerald-600 to-teal-600',
            tag: 'VOICE OVER',
            type: 'internal'
        },
        {
            id: 'identidad',
            title: 'Activos de Marca',
            description: 'Stickers, Marca Libros y Tarjetas de Presentación en alta fidelidad.',
            icon: ImageIcon,
            href: '/stickers',
            color: 'from-rose-600 to-pink-600',
            tag: 'PRINT ASSETS',
            type: 'internal'
        },
        {
            id: 'triptico',
            title: 'Tríptico Corporativo',
            description: 'Folleto de 11" x 8.5" con el ecosistema completo y QRs dinámicos.',
            icon: Layout,
            href: '/sector-privado-system-kyron',
            color: 'from-amber-600 to-orange-600',
            tag: 'PRINT BROCHURE',
            type: 'internal'
        },
        {
            id: 'instagram',
            title: 'Instagram Oficial',
            description: 'Presencia en redes sociales y catálogo visual de servicios.',
            icon: Instagram,
            href: 'https://instagram.com/systemkyron',
            color: 'from-purple-600 to-fuchsia-600',
            tag: '@SYSTEMKYRON',
            type: 'external'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30">
            <ResourceHeader />
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="space-y-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20"
                        >
                            <Sparkles className="h-3 w-3 text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Reto InspiraVe 2026</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]"
                        >
                            Vault de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Recursos Elite.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg max-w-2xl font-medium"
                        >
                            Acceso centralizado a toda la documentación, activos de marca y herramientas estratégicas de System Kyron para la competencia.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] flex items-center gap-6"
                    >
                        <div className="p-3 bg-white rounded-2xl shadow-2xl">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(baseUrl)}&color=000000&bgcolor=ffffff&margin=1`} 
                                alt="Master QR" 
                                className="w-20 h-20"
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Enlace Maestro</p>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">Ecosistema Global</p>
                            <p className="text-[11px] text-cyan-500 font-bold mt-1">system-kyron.app</p>
                        </div>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((res, i) => (
                        <motion.div
                            key={res.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                        >
                            <ResourceCard resource={res} />
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
                >
                    <div className="flex items-center gap-4">
                        <img src="/images/logo-black.png" alt="Kyron" className="h-10 w-10 object-contain invert opacity-50" />
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest text-white/40">System Kyron</p>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Identidad Digital · v2.8.0</p>
                        </div>
                    </div>
                    
                    <Link 
                        href="/sector-privado-system-kyron"
                        className="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all"
                    >
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">¿Dudas Técnicas?</p>
                            <p className="text-sm font-bold text-white">Consultar Manual de Usuario</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}

function ResourceCard({ resource: res }: { resource: any }) {
    const Icon = res.icon;
    
    return (
        <div className="group relative h-full">
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-[20px] transition-opacity duration-500 rounded-[2.5rem] -z-10",
                res.color
            )} />
            
            <div className="h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-white/20 transition-all hover:translate-y-[-4px]">
                <div>
                    <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl",
                        "bg-zinc-900 border border-white/10 group-hover:scale-110 transition-transform"
                    )}>
                        <Icon className="h-7 w-7 text-white" />
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">{res.tag}</span>
                            {res.type === 'external' ? <ExternalLink className="h-3 w-3 text-zinc-600" /> : <Layers className="h-3 w-3 text-zinc-600" />}
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight italic text-white group-hover:text-cyan-400 transition-colors">
                            {res.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                            {res.description}
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    {res.type === 'internal' ? (
                        <Link 
                            href={res.href}
                            className="flex items-center justify-between group/link"
                        >
                            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover/link:text-white transition-colors">Acceder Recurso</span>
                            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all">
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </Link>
                    ) : (
                        <a 
                            href={res.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between group/link"
                        >
                            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover/link:text-white transition-colors">Seguir a Instagram</span>
                            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all">
                                <ExternalLink className="h-4 w-4" />
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
