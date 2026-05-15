"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, 
    Image as ImageIcon, 
    Mic, 
    Presentation, 
    ArrowRight, 
    Download, 
    ExternalLink, 
    Sparkles, 
    Globe, 
    Instagram, 
    Layers, 
    Layout, 
    Building2,
    Search,
    ShieldCheck,
    Cpu,
    Zap
} from 'lucide-react';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ResourceHeader } from '@/components/brand/ResourceHeader';

const RESOURCES = [
    {
        id: 'presentation',
        title: 'Arquitectura de Valor',
        description: 'Pitch Deck interactivo de alta fidelidad con visión estratégica 2026 y escalabilidad técnica.',
        icon: Presentation,
        href: '/presentacion-final',
        color: 'from-blue-600 to-indigo-600',
        tag: 'VALUACIÓN ESTRATÉGICA',
        type: 'internal',
        size: 'large'
    },
    {
        id: 'resumen',
        title: 'Tesis de Inversión',
        description: 'Síntesis ejecutiva con proyecciones de rentabilidad y blindaje normativo Kyron Shield.',
        icon: FileText,
        href: '/resumen-ejecutivo',
        color: 'from-cyan-600 to-blue-600',
        tag: 'EXECUTIVE SUMMARY',
        type: 'internal',
        size: 'normal'
    },
    {
        id: 'identidad',
        title: 'Identidad Corporativa',
        description: 'Recursos visuales y activos de marca para despliegue en entornos físicos y digitales.',
        icon: ImageIcon,
        href: '/stickers',
        color: 'from-rose-600 to-pink-600',
        tag: 'BRAND ASSETS',
        type: 'internal',
        size: 'large'
    },
    {
        id: 'cartas',
        title: 'Protocolos de Integración',
        description: 'Documentación oficial para alianzas estratégicas y cumplimiento institucional.',
        icon: Building2,
        href: '/cartas',
        color: 'from-emerald-500 to-teal-600',
        tag: 'OFFICIAL PROTOCOLS',
        type: 'internal',
        size: 'normal'
    },
    {
        id: 'instagram',
        title: 'Portafolio Digital',
        description: 'Ecosistema visual y presencia institucional en redes de alto impacto corporativo.',
        icon: Instagram,
        href: 'https://instagram.com/systemkyron',
        color: 'from-purple-600 to-fuchsia-600',
        tag: '@SYSTEMKYRON',
        type: 'external',
        size: 'normal'
    },
    {
        id: 'paisaje',
        title: 'Visual Inmersivo',
        description: 'Patrimonio natural (Salto Ángel) como eje de la identidad sustentable de System Kyron.',
        icon: Globe,
        href: 'https://images.unsplash.com/photo-1626014303757-646c2d399b4d?q=80&w=2000&auto=format&fit=crop',
        color: 'from-cyan-400 to-blue-500',
        tag: '4K ASSET',
        type: 'external',
        size: 'normal'
    }
];

export default function BrandKitPage() {
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState('');
    const [baseUrl, setBaseUrl] = useState('https://system-kyron.app');

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') setBaseUrl(window.location.origin);
    }, []);

    const filteredResources = useMemo(() => {
        return RESOURCES.filter(res => 
            res.title.toLowerCase().includes(search.toLowerCase()) || 
            res.tag.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30 overflow-x-hidden">
            <ResourceHeader />
            
            {/* Ambient Background - High Performance Layer */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px]">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full" />
                </div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
                {/* Hero section */}
                <div className="flex flex-col lg:flex-row gap-16 items-start justify-between mb-24">
                    <div className="max-w-3xl space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Resource Vault v2.8</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]"
                        >
                            Ecosistema de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-500">Alta Fidelidad.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl"
                        >
                            Acceso centralizado a la infraestructura de marca y activos estratégicos de System Kyron para la defensa del Reto InspiraVe 2026.
                        </motion.p>

                        {/* Quick Search */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-md group"
                        >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar recurso o categoría..."
                                className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm font-bold transition-all placeholder:text-zinc-600"
                            />
                        </motion.div>
                    </div>

                    {/* Master QR Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative group shrink-0"
                    >
                        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center gap-8 shadow-2xl">
                            <div className="p-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative">
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(baseUrl)}&color=000000&bgcolor=ffffff&margin=1`} 
                                    alt="Master QR" 
                                    className="w-28 h-28 object-contain"
                                />
                                <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500/40 animate-scan pointer-events-none" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Master Link</p>
                                <h3 className="text-xl font-black uppercase italic tracking-tight">System Kyron App</h3>
                                <p className="text-[11px] text-cyan-400 font-bold tracking-widest uppercase">Verified Deployment</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Grid - Bento Box Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredResources.map((res, i) => (
                            <motion.div
                                key={res.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "relative h-full",
                                    res.size === 'large' ? "lg:col-span-2" : ""
                                )}
                            >
                                <ResourceCard resource={res} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Insight */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-32 pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12"
                >
                    <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <ShieldCheck className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-lg font-black uppercase tracking-tight text-white italic">Protocolo de Confidencialidad</p>
                            <p className="text-sm font-medium text-zinc-500">Activos optimizados para despliegue en entornos de alta demanda.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                            <Cpu className="h-4 w-4 text-zinc-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Core v2.8</span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                            <Zap className="h-4 w-4 text-zinc-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Zero Latency</span>
                        </div>
                        <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Manual de Usuario <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </motion.div>
            </main>

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </div>
    );
}

function ResourceCard({ resource: res }: { resource: any }) {
    const Icon = res.icon;
    
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="group relative h-full cursor-pointer"
        >
            {/* Dynamic Glow */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 blur-[50px] transition-all duration-700 rounded-[2.5rem] -z-10",
                res.color
            )} />
            
            <div className="h-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] flex flex-col justify-between hover:border-white/30 hover:bg-white/[0.05] transition-all duration-500 relative overflow-hidden">
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                
                <div>
                    <div className="flex justify-between items-start mb-12">
                        <div className={cn(
                            "h-16 w-16 rounded-2xl flex items-center justify-center relative shadow-2xl",
                            "bg-zinc-950 border border-white/10 group-hover:border-cyan-500/50 transition-colors"
                        )}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl" />
                            {res.id === 'paisaje' ? (
                                <img src={res.href} alt="BG" className="w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <Icon className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                             <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-cyan-400 transition-colors">
                                {res.tag}
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter italic text-white group-hover:text-cyan-400 transition-colors">
                            {res.title}
                        </h3>
                        <p className="text-zinc-500 text-sm lg:text-base font-medium leading-relaxed">
                            {res.description}
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                    {res.type === 'internal' ? (
                        <Link href={res.href as any} className="flex items-center justify-between w-full group/link">
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover/link:text-white transition-colors">Iniciando Protocolo</span>
                            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all shadow-xl">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </Link>
                    ) : (
                        <a href={res.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full group/link">
                             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover/link:text-white transition-colors">Recurso Externo</span>
                             <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-cyan-500 group-hover/link:text-white transition-all shadow-xl">
                                {res.id === 'instagram' ? <Instagram className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                             </div>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
