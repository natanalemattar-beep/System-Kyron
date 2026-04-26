'use client';

import { motion } from 'framer-motion';
import { 
    Leaf, Smartphone, Receipt, Zap, Globe, 
    QrCode, ShieldCheck, BarChart3, Radio,
    Cpu, RefreshCw, ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PILLARS = [
    {
        id: 'eco',
        title: 'Sostenibilidad',
        highlight: 'Impacto Ameru',
        icon: Leaf,
        color: 'text-emerald-400',
        bg: 'from-emerald-500/10 to-transparent',
        border: 'border-emerald-500/20',
        desc: 'Compensación de huella de carbono mediante eco-créditos integrados. Tecnología verde para un futuro corporativo responsable.',
        visual: 'Eco-Monitor v2.0'
    },
    {
        id: 'telecom',
        title: 'Mi Línea',
        highlight: '5G & eSIM Elite',
        icon: Smartphone,
        color: 'text-cyan-400',
        bg: 'from-cyan-500/10 to-transparent',
        border: 'border-cyan-500/20',
        desc: 'Infraestructura móvil de última generación. Activación instantánea de eSIM y gestión de datos 5G sin fronteras.',
        visual: 'Frecuencia Alpha'
    },
    {
        id: 'billing',
        title: 'Facturación',
        highlight: 'IGTF Smart-Sync',
        icon: Receipt,
        color: 'text-blue-400',
        bg: 'from-blue-500/10 to-transparent',
        border: 'border-blue-500/20',
        desc: 'Automatización total de facturación legal. Cálculo de IGTF en tiempo real y firma digital encriptada bajo estándares internacionales.',
        visual: 'Cripto-Factura'
    }
];

export function PillarShowcaseSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#02040a]">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none mb-6">
                        Triada de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Innovación</span>
                    </h2>
                    <p className="text-white/40 text-sm font-black uppercase tracking-[0.4em] max-w-2xl mx-auto">
                        Sostenibilidad · Conectividad · Legalidad
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {PILLARS.map((pillar, i) => (
                        <motion.div 
                            key={pillar.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative p-8 rounded-[2.5rem] glass-elite border transition-all duration-700 hover:-translate-y-2",
                                pillar.border
                            )}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem]", pillar.bg)} />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className={cn("p-4 rounded-2xl bg-white/[0.03] border border-white/5", pillar.color)}>
                                        <pillar.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                                        {pillar.visual}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">
                                        {pillar.title} <br />
                                        <span className={cn("text-lg italic opacity-80", pillar.color)}>{pillar.highlight}</span>
                                    </h3>
                                    <p className="text-zinc-500 text-xs font-medium leading-relaxed group-hover:text-zinc-400 transition-colors">
                                        {pillar.desc}
                                    </p>
                                </div>

                                {/* Unique Interactive Element for each pillar */}
                                <div className="relative h-24 w-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                                    {pillar.id === 'eco' && (
                                        <div className="flex items-center gap-4">
                                            <RefreshCw className="h-5 w-5 text-emerald-400 animate-spin-slow" />
                                            <div className="space-y-1">
                                                <div className="h-1.5 w-24 bg-emerald-500/20 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        animate={{ width: ['0%', '100%'] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                        className="h-full bg-emerald-500" 
                                                    />
                                                </div>
                                                <p className="text-[8px] font-black text-emerald-500/60 uppercase tracking-tighter">Compensando CO2...</p>
                                            </div>
                                        </div>
                                    )}
                                    {pillar.id === 'telecom' && (
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute h-12 w-12 rounded-full border border-cyan-500/20 animate-ping" />
                                            <Radio className="h-6 w-6 text-cyan-400" />
                                        </div>
                                    )}
                                    {pillar.id === 'billing' && (
                                        <div className="flex items-center gap-4">
                                            <QrCode className="h-8 w-8 text-blue-400 opacity-50" />
                                            <ShieldCheck className="h-5 w-5 text-blue-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(n => (
                                            <div key={n} className="h-6 w-6 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center">
                                                <Cpu className="h-3 w-3 text-white/40" />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                        <ArrowUpRight className="h-4 w-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
