"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Gauge, Timer, Shield, TrendingUp, ChartColumn, ArrowRight, Headphones, MessageSquare, Brain, FileSearch } from 'lucide-react';
import { Link } from '@/navigation';
import { ScrollReveal } from './scroll-reveal';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from '@/components/animations/animated-number';

export function FeaturesSection() {
    const t = useTranslations('FeaturesSection');
    const metrics = t.raw('metrics') as { value: number; suffix: string; label: string }[];
    const features = t.raw('features') as { title: string; description: string }[];

    return (
        <section id="caracteristicas" className="py-32 md:py-48 relative overflow-hidden bg-transparent">
            {/* Neural Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[30%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/[0.05] blur-[150px] animate-mesh-drift" />
                <div className="absolute bottom-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.03] blur-[120px] animate-mesh-drift" style={{ animationDelay: '-10s' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <ScrollReveal className="text-center mb-24 md:mb-32 space-y-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-3xl mx-auto shadow-2xl">
                        <Zap className="h-4 w-4 text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-200/60">{t('badge')}</span>
                    </div>
                    <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter uppercase italic">
                        {t('title_highlight')}<br/>
                        <span className="text-glow-cyan not-italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-white/30 max-w-3xl mx-auto font-medium leading-relaxed font-outfit">
                        {t('subtitle')}
                    </p>
                </ScrollReveal>

                {/* BENTO NEURAL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                    {/* Main Node (Large) */}
                    <ScrollReveal delay={0.1} className="md:col-span-8 group relative overflow-hidden rounded-[3.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-12 hover:border-cyan-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/10">
                        <div className="relative z-10 space-y-6 max-w-xl">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Gauge className="h-8 w-8" />
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">{features[0].title}</h3>
                            <p className="text-lg text-gray-500 dark:text-white/40 leading-relaxed font-medium">{features[0].description}</p>
                            
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200 dark:border-white/5">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-widest">Sincronización</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic">0.2ms</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">Cumplimiento</p>
                                    <p className="text-4xl font-black text-emerald-400 tracking-tighter italic">100%</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-[-10%] bottom-[-10%] w-[60%] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                            <Image src="/images/landing/features-analytics.webp" alt="Viz" width={1200} height={800} className="w-full h-full object-contain" />
                        </div>
                    </ScrollReveal>

                    {/* Secondary Node (Tall) */}
                    <ScrollReveal delay={0.2} className="md:col-span-4 group relative overflow-hidden rounded-[3.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-10 hover:border-blue-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                                <Timer className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">{features[1].title}</h3>
                            <p className="text-base text-gray-500 dark:text-white/40 font-medium leading-relaxed">{features[1].description}</p>
                        </div>
                        <div className="pt-10">
                            <div className="h-2 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '90%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-3">Disponibilidad de Red 99.9%</p>
                        </div>
                    </ScrollReveal>

                    {/* Compact Nodes */}
                    {features.slice(2, 5).map((feat, i) => (
                        <ScrollReveal key={i} delay={0.3 + (i * 0.1)} className="md:col-span-4 group relative overflow-hidden rounded-[3.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/40 group-hover:text-gray-900 dark:group-hover:text-white group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all duration-500">
                                    {i === 0 ? <Shield className="h-6 w-6" /> : i === 1 ? <TrendingUp className="h-6 w-6" /> : <ChartColumn className="h-6 w-6" />}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{feat.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-white/30 font-medium leading-relaxed">{feat.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* AI Features - Agentes Inteligentes */}
                <ScrollReveal className="md:col-span-12 mt-8">
                    <div className="rounded-[3.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-10 md:p-14">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                <Brain className="h-7 w-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
                                    Agentes AI <span className="text-glow-cyan not-italic">Inteligentes</span>
                                </h3>
                                <p className="text-base text-gray-500 dark:text-white/30 mt-1">6 agentes especializados que trabajan para tu empresa</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { icon: Headphones, title: "Atención al Cliente", desc: "Agente proactivo que detecta situaciones y genera acciones automáticas", color: "cyan" },
                                { icon: ChartColumn, title: "Dashboard AI", desc: "Insights automáticos, detección de anomalías y pronósticos", color: "blue" },
                                { icon: FileSearch, title: "Análisis Documental", desc: "Extracción, validación y análisis de cumplimiento normativo", color: "emerald" },
                                { icon: MessageSquare, title: "Marketing AI", desc: "Generación de contenido, campañas, SEO y copy para anuncios", color: "violet" },
                                { icon: TrendingUp, title: "Análisis Financiero", desc: "FODA, riesgos, análisis de mercado y recomendaciones", color: "amber" },
                                { icon: Shield, title: "Generador de Documentos", desc: "Facturas, contratos y documentos profesionales automáticos", color: "rose" },
                            ].map((agent, i) => (
                                <Link key={i} href="/soporte" className="group relative overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-6 hover:border-gray-300 dark:hover:border-white/15 transition-all duration-500 hover:-translate-y-1 block">
                                    <div className={cn(
                                        "h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-500",
                                        agent.color === "cyan" && "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20",
                                        agent.color === "blue" && "bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20",
                                        agent.color === "emerald" && "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20",
                                        agent.color === "violet" && "bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20",
                                        agent.color === "amber" && "bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20",
                                        agent.color === "rose" && "bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20",
                                    )}>
                                        <agent.icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1">{agent.title}</h4>
                                    <p className="text-xs text-gray-400 dark:text-white/25 font-medium leading-relaxed">{agent.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* METRICS STRIP OVERHAUL */}
                <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 border-y border-gray-200 dark:border-white/5 py-16">
                    {metrics.map((metric, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                            <span className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter italic group-hover:text-glow-cyan transition-all duration-500">
                                <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/20">{metric.label}</span>
                        </div>
                    ))}
                </div>

                {/* Final Ecosystem CTA */}
                <ScrollReveal className="flex justify-center mt-32">
                    <Link href="/register" className="group relative px-12 py-7 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 block shadow-2xl">
                        <div className="absolute inset-0 bg-white" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-black/5 flex items-center justify-center text-black group-hover:rotate-45 transition-transform">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.5em] text-black">
                                ACTIVAR ECOSISTEMA
                            </span>
                        </div>
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
}

