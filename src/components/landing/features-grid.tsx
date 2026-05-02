"use client";

import { motion } from 'framer-motion';
import { 
    Calculator, Users, ShoppingCart, Smartphone, 
    Gavel, Recycle, Building2, ChartColumn, 
    ShieldCheck, Zap, Globe, Cpu, CheckCircle, TrendingUp
} from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const features = [
    {
        icon: Calculator,
        title: "Fiscalidad VEN-NIF",
        desc: "Automatización total de libros de compra/venta, IGTF y declaraciones SENIAT con tasa BCV en tiempo real.",
        color: "amber"
    },
    {
        icon: Smartphone,
        title: "Telecom 5G Nativo",
        desc: "Única plataforma que gestiona tu flota de eSIMs y líneas corporativas directamente desde el panel administrativo.",
        color: "blue"
    },
    {
        icon: Gavel,
        title: "IA Legal Elite",
        desc: "Asistente jurídico basado en Claude 3.5 para redacción de contratos y blindaje ante auditorías laborales LOTTT.",
        color: "indigo"
    },
    {
        icon: Users,
        title: "RRHH & Nómina",
        desc: "Cálculos exactos de prestaciones, utilidades y bono de alimentación bajo la normativa venezolana vigente.",
        color: "cyan"
    },
    {
        icon: ShieldCheck,
        title: "Kyron Shield",
        desc: "Protocolo de contingencia extrema: reposición de hardware en 1h y defensa pericial ante fiscalizaciones.",
        color: "emerald"
    },
    {
        icon: Recycle,
        title: "Sostenibilidad",
        desc: "Certificación de huella verde y gestión de eco-créditos corporativos integrados con Ameru.AI.",
        color: "green"
    }
];

export function FeaturesGrid() {
    const t = useTranslations('FeaturesSection');
    const featuresData = t.raw('features') as { title: string; description: string }[];
    
    const iconMap = [
        Calculator, 
        Smartphone, 
        Gavel, 
        Users, 
        ShieldCheck, 
        Recycle
    ];

    const colorMap = [
        "amber",
        "blue",
        "indigo",
        "cyan",
        "emerald",
        "green"
    ];

    const features = featuresData.slice(0, 6).map((f, i) => ({
        ...f,
        icon: iconMap[i],
        color: colorMap[i]
    }));

    return (
        <section id="caracteristicas" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <ScrollReveal>
                        <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">
                            {t('badge')}
                        </span>
                        <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tighter mb-8 leading-[0.95] text-balance">
                            {t('title_highlight')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-flow bg-[length:200%_auto]">
                                {t('title_rest')}
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} y={30}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 h-full"
                            >
                                {/* HUD corner accent */}
                                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Cpu className="h-4 w-4 text-white/40" />
                                </div>

                                <div className={cn(
                                    "h-16 w-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg",
                                    feature.color === "amber" && "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-amber-500/5",
                                    feature.color === "blue" && "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-blue-500/5",
                                    feature.color === "indigo" && "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-indigo-500/5",
                                    feature.color === "cyan" && "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-cyan-500/5",
                                    feature.color === "emerald" && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/5",
                                    feature.color === "green" && "bg-green-500/10 border-green-500/20 text-green-400 shadow-green-500/5"
                                )}>
                                    <feature.icon className="h-8 w-8" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-100/60 text-sm leading-relaxed font-medium text-pretty">
                                    {feature.description}
                                </p>

                                {/* Hud Grid Overlay inside card */}
                                <div className="absolute inset-0 hud-grid opacity-[0.03] rounded-[2.5rem] pointer-events-none" />
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
