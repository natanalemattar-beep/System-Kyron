"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, 
    Image as ImageIcon, 
    Presentation, 
    ArrowRight, 
    Sparkles, 
    Globe, 
    Instagram, 
    Building2,
    Search,
    ShieldCheck,
    Cpu,
    Zap,
    Eye,
    Lock,
    Fingerprint,
    Layers,
    ExternalLink,
} from 'lucide-react';
import { PasswordGate } from '@/components/password-gate';
import Image from 'next/image';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ResourceHeader } from '@/components/brand/ResourceHeader';
import { OfficialSeal } from '@/components/brand/OfficialSeal';

interface Resource {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
    tag: string;
    type: 'internal' | 'external';
    size: 'normal' | 'large';
    gradient: string;
    image: string;
}

const RESOURCES: Resource[] = [
    {
        id: 'presentation',
        title: 'Arquitectura de Valor',
        description: 'Pitch Deck interactivo de alta fidelidad con visión estratégica 2026 y escalabilidad técnica.',
        icon: Presentation,
        href: '/presentacion-final',
        color: 'from-blue-500 to-indigo-600',
        tag: 'VALUACIÓN',
        type: 'internal',
        size: 'large',
        gradient: 'from-blue-900/40 via-indigo-900/20 to-transparent',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format'
    },
    {
        id: 'resumen',
        title: 'Tesis de Inversión',
        description: 'Síntesis ejecutiva con proyecciones de rentabilidad y blindaje normativo Kyron Shield.',
        icon: FileText,
        href: '/resumen-ejecutivo',
        color: 'from-cyan-500 to-blue-600',
        tag: 'EXEC SUMMARY',
        type: 'internal',
        size: 'normal',
        gradient: 'from-cyan-900/40 via-blue-900/20 to-transparent',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format'
    },
    {
        id: 'identidad',
        title: 'Identidad Corporativa',
        description: 'Recursos visuales y activos de marca para despliegue en entornos físicos y digitales.',
        icon: ImageIcon,
        href: '/stickers',
        color: 'from-rose-500 to-pink-600',
        tag: 'BRAND ASSETS',
        type: 'internal',
        size: 'large',
        gradient: 'from-rose-900/40 via-pink-900/20 to-transparent',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format'
    },
    {
        id: 'alianza-ameru',
        title: 'Carta de Alianza Ameru',
        description: 'Propuesta formal de alianza estratégica con Ameru AI para integración de sostenibilidad y smart bins.',
        icon: Building2,
        href: '/alianza-ameru',
        color: 'from-emerald-500 to-teal-600',
        tag: 'ALLIANCE',
        type: 'internal',
        size: 'normal',
        gradient: 'from-emerald-900/40 via-teal-900/20 to-transparent',
        image: 'https://images.unsplash.com/photo-1450101215322-bf5cd276cfc9?q=80&w=600&auto=format'
    },
    {
        id: 'instagram',
        title: 'Portafolio Digital',
        description: 'Ecosistema visual y presencia institucional en redes de alto impacto corporativo.',
        icon: Instagram,
        href: 'https://instagram.com/systemkyron',
        color: 'from-purple-500 to-fuchsia-600',
        tag: '@SYSTEMKYRON',
        type: 'external',
        size: 'normal',
        gradient: 'from-purple-900/40 via-fuchsia-900/20 to-transparent',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format'
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
        size: 'normal',
        gradient: 'from-cyan-900/40 via-blue-900/20 to-transparent',
        image: 'https://images.unsplash.com/photo-1626014303757-646c2d399b4d?q=80&w=600&auto=format'
    }
];

const METRICS = [
    { label: 'Recursos', value: '6', icon: Layers },
    { label: 'Estado', value: 'Verificado', icon: ShieldCheck },
    { label: 'Core', value: 'v2.8', icon: Cpu },
    { label: 'Latencia', value: '<1ms', icon: Zap },
];

export default function BrandKitPage() {
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [activeHover, setActiveHover] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        setBaseUrl(window.location.origin);
    }, []);

    const filteredResources = useMemo(() => {
        return RESOURCES.filter(res => 
            res.title.toLowerCase().includes(search.toLowerCase()) || 
            res.tag.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    if (!mounted) return null;

    return (
        <PasswordGate title="Brand Kit">
        <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30 overflow-x-hidden">
            <ResourceHeader />
            
            {/* Background - Grid + Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <div className="absolute top-[-5%] left-[-5%] w-[700px] h-[700px] bg-blue-600/8 blur-[200px] rounded-full" />
                <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/3 blur-[250px] rounded-full" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
                {/* Hero */}
                <div className="flex flex-col lg:flex-row gap-16 items-start justify-between mb-20">
                    <div className="max-w-3xl space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md"
                        >
                            <Sparkles className="h-4 w-4 text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Resource Vault — Kyron Engine</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85]"
                        >
                            <span className="text-white">Ecosistema de</span><br />
                            <span className="bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">Alta Fidelidad.</span>
                        </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-zinc-400 text-base lg:text-lg font-medium leading-relaxed max-w-xl"
                            >
                                Infraestructura centralizada de activos estratégicos System Kyron para la defensa del Reto InspiraVe 2026.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="flex gap-3 pt-2"
                            >

                            </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-md group"
                        >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar recurso..."
                                className="w-full h-12 pl-11 pr-4 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 text-sm font-bold transition-all placeholder:text-zinc-700"
                            />
                        </motion.div>
                    </div>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative shrink-0 w-full lg:w-80"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 blur-3xl rounded-[3rem]" />
                        <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 space-y-6">
                            <div className="text-center space-y-2 pb-6 border-b border-white/5">
                                <div className="inline-flex p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                                    <ShieldCheck className="h-6 w-6 text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-black tracking-tight">System Kyron</h3>
                                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Verificado · Core Activo</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {METRICS.map((m) => (
                                    <div key={m.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <m.icon className="h-4 w-4 text-zinc-600 mx-auto mb-1.5" />
                                        <p className="text-lg font-black text-white">{m.value}</p>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{m.label}</p>
                                    </div>
                                ))}
                            </div>
                            {baseUrl && (
                                <div className="flex items-center justify-center gap-2 pt-1">
                                    <Lock className="h-3 w-3 text-emerald-500" />
                                    <span className="text-[9px] font-bold text-emerald-500/70 uppercase tracking-widest">Conexión Segura</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredResources.length > 0 ? filteredResources.map((res, i) => (
                            <motion.div
                                key={res.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "relative h-full",
                                    res.size === 'large' ? "lg:col-span-2" : ""
                                )}
                                onMouseEnter={() => setActiveHover(res.id)}
                                onMouseLeave={() => setActiveHover(null)}
                            >
                                <ResourceCard resource={res} isActive={activeHover === res.id} />
                            </motion.div>
                        )) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="col-span-full flex flex-col items-center justify-center py-24 text-center"
                            >
                                <Search className="h-12 w-12 text-zinc-700 mb-4" />
                                <h3 className="text-2xl font-black tracking-tight text-zinc-500 italic">
                                    Sin resultados
                                </h3>
                                <p className="text-zinc-600 text-sm font-medium mt-2">
                                    No hay recursos que coincidan con &ldquo;{search}&rdquo;
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Official Seal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center justify-center py-20 mt-16"
                >
                    <div className="max-w-2xl mx-auto text-center mb-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <Fingerprint className="h-3.5 w-3.5 text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Autenticación Oficial</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
                            Sello <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Oficial</span>
                        </h2>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-md mx-auto">
                            Certificación notarial digital para autenticación de documentos, contratos y comunicaciones institucionales.
                        </p>
                    </div>
                    <OfficialSeal />
                </motion.div>

                {/* Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8"
                >
                    <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Eye className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-base font-black tracking-tight">Confidencialidad</p>
                            <p className="text-sm font-medium text-zinc-500">Activos optimizados para entornos de alta demanda.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {METRICS.map((m) => (
                            <div key={m.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                                <m.icon className="h-3.5 w-3.5 text-zinc-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{m.value} {m.label}</span>
                            </div>
                        ))}
                        <Link href="/sector-privado-system-kyron" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-600/20">
                            Manual <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
        </PasswordGate>
    );
}

function ResourceCard({ resource: res, isActive }: { resource: Resource; isActive: boolean }) {
    const Icon = res.icon;
    
    return (
        <motion.div 
            whileHover={{ y: -6 }}
            className="group relative h-full"
        >
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-40 blur-[60px] transition-all duration-700 rounded-[2rem] -z-10",
                res.color
            )} />
            
            <div className="h-full relative rounded-[2rem] overflow-hidden border border-white/[0.06] group-hover:border-white/20 transition-all duration-500 bg-white/[0.02]">
                {/* Background Image */}
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700",
                    res.gradient
                )}>
                    <Image 
                        src={res.image} 
                        alt="" 
                        fill 
                        className="object-cover opacity-30"
                        unoptimized
                    />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex justify-between items-start mb-8">
                            <div className={cn(
                                "h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500",
                                isActive 
                                    ? "bg-cyan-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20" 
                                    : "bg-white/5 border-white/10"
                            )}>
                                <Icon className={cn(
                                    "h-7 w-7 transition-all duration-500",
                                    isActive ? "text-cyan-300 scale-110" : "text-white"
                                )} />
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all duration-500",
                                isActive 
                                    ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300" 
                                    : "bg-white/5 border-white/10 text-zinc-500"
                            )}>
                                {res.tag}
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className={cn(
                                "text-2xl lg:text-3xl font-black tracking-tight leading-tight transition-colors duration-500",
                                isActive ? "text-cyan-200" : "text-white"
                            )}>
                                {res.title}
                            </h3>
                            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                                {res.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5">
                        {res.type === 'internal' ? (
                            <Link href={res.href as unknown as Parameters<typeof Link>[0]['href']} className="flex items-center justify-between w-full group/link">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover/link:text-cyan-400 transition-colors">Abrir recurso</span>
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all shadow-xl",
                                    isActive 
                                        ? "bg-cyan-500 text-white" 
                                        : "bg-white/10 group-hover/link:bg-white group-hover/link:text-black"
                                )}>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                        ) : (
                            <a href={res.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full group/link">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover/link:text-cyan-400 transition-colors">Recurso externo</span>
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all shadow-xl",
                                    isActive 
                                        ? "bg-cyan-500 text-white" 
                                        : "bg-white/10 group-hover/link:bg-cyan-500 group-hover/link:text-white"
                                )}>
                                    {res.id === 'instagram' ? <Instagram className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
