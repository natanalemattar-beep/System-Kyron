"use client";

import { motion } from 'framer-motion';
import { 
    Calculator, Users, ShoppingCart, Smartphone, 
    Gavel, Recycle, Building2, BarChart3, 
    ShieldCheck, Zap, Globe, Cpu, CheckCircle, TrendingUp
} from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

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
                            Infraestructura de Clase Mundial
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
                            ¿Qué es <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">System Kyron?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Es el primer ecosistema de inteligencia corporativa unificado para Venezuela. 
                            Fusionamos contabilidad de élite, telecomunicaciones 5G e inteligencia artificial 
                            en una sola plataforma de misión crítica.
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

                                <div className={`h-14 w-14 rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <feature.icon className={`h-7 w-7 text-${feature.color}-400`} />
                                </div>

                                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                    {feature.desc}
                                </p>

                                {/* Hover Glow */}
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${feature.color}-500/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* 3 Major Pillars of Innovation */}
                <div className="mt-20 lg:mt-32 space-y-12">
                    {/* Pillar 1: Fiscal */}
                    <div className="p-1 bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-amber-500/20 rounded-[3rem]">
                        <div className="bg-[#050816]/90 backdrop-blur-3xl rounded-[2.9rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-white/5">
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                    Blindaje Total contra la <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 font-black">Incertidumbre Fiscal.</span>
                                </h3>
                                <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
                                    Nuestra IA detecta inconsistencias en tu contabilidad VEN-NIF antes de que el SENIAT lo haga, garantizando tranquilidad operativa 24/7.
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-6 w-6 text-emerald-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">100% Legalidad</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Zap className="h-6 w-6 text-amber-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Tasa BCV Automática</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-full lg:w-1/3 aspect-square relative flex items-center justify-center order-first lg:order-last">
                                <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full animate-pulse" />
                                <div className="relative z-10 p-12 bg-white/5 rounded-full border border-white/10 backdrop-blur-3xl animate-float-slow shadow-2xl">
                                    <Calculator className="h-32 w-32 text-orange-400 drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2: Telecom 5G */}
                    <div className="p-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-[3rem]">
                        <div className="bg-[#050816]/90 backdrop-blur-3xl rounded-[2.9rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-white/5">
                            <div className="flex-shrink-0 w-full lg:w-1/3 aspect-square relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
                                <div className="relative z-10 p-12 bg-white/5 rounded-full border border-white/10 backdrop-blur-3xl animate-float-slow shadow-2xl">
                                    <Smartphone className="h-32 w-32 text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                    Revolución en Conectividad: <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-black">Mi Línea 5G & eSIM.</span>
                                </h3>
                                <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
                                    Somos el único ecosistema en Venezuela que integra telefonía móvil 5G. Gestiona tus líneas corporativas, datos y eSIMs directamente desde tu ERP.
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-6 w-6 text-cyan-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Cobertura Nacional</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Zap className="h-6 w-6 text-blue-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Activación eSIM 1min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3: Sustainability */}
                    <div className="p-1 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-lime-500/20 rounded-[3rem]">
                        <div className="bg-[#050816]/90 backdrop-blur-3xl rounded-[2.9rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-white/5">
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                    Impacto Verde con <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-black">Ameru: Sostenibilidad AI.</span>
                                </h3>
                                <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
                                    Convierte la huella verde de tu empresa en una ventaja competitiva. Gestión automatizada de Eco-créditos y reportes de sostenibilidad integrados.
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                                    <div className="flex items-center gap-3">
                                        <Recycle className="h-6 w-6 text-emerald-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Eco-Créditos Ameru</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="h-6 w-6 text-green-400" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Huella Cero</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-full lg:w-1/3 aspect-square relative flex items-center justify-center order-first lg:order-last">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse" />
                                <div className="relative z-10 p-12 bg-white/5 rounded-full border border-white/10 backdrop-blur-3xl animate-float-slow shadow-2xl">
                                    <Recycle className="h-32 w-32 text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
