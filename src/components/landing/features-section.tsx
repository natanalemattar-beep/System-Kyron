"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Gauge, Timer, Shield, TrendingUp, ChartColumn, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { ScrollReveal } from './scroll-reveal';
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
                    <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                        {t('title_highlight')}<br/>
                        <span className="text-glow-cyan not-italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/30 max-w-3xl mx-auto font-medium leading-relaxed font-outfit">
                        {t('subtitle')}
                    </p>
                </ScrollReveal>

                {/* BENTO NEURAL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                    {/* Main Node (Large) */}
                    <ScrollReveal delay={0.1} className="md:col-span-8 group relative overflow-hidden rounded-[3.5rem] bg-white/[0.02] border border-white/5 p-12 hover:border-cyan-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/10">
                        <div className="relative z-10 space-y-6 max-w-xl">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Gauge className="h-8 w-8" />
                            </div>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">{features[0].title}</h3>
                            <p className="text-lg text-white/40 leading-relaxed font-medium">{features[0].description}</p>
                            
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Sincronización</p>
                                    <p className="text-4xl font-black text-white tracking-tighter italic">0.2ms</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">Cumplimiento</p>
                                    <p className="text-4xl font-black text-emerald-400 tracking-tighter italic">100%</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-[-10%] bottom-[-10%] w-[60%] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                            <img src="/images/landing/features-analytics.webp" alt="Viz" className="w-full h-full object-contain" />
                        </div>
                    </ScrollReveal>

                    {/* Secondary Node (Tall) */}
                    <ScrollReveal delay={0.2} className="md:col-span-4 group relative overflow-hidden rounded-[3.5rem] bg-white/[0.02] border border-white/5 p-10 hover:border-blue-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                                <Timer className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">{features[1].title}</h3>
                            <p className="text-base text-white/40 font-medium leading-relaxed">{features[1].description}</p>
                        </div>
                        <div className="pt-10">
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
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
                        <ScrollReveal key={i} delay={0.3 + (i * 0.1)} className="md:col-span-4 group relative overflow-hidden rounded-[3.5rem] bg-white/[0.02] border border-white/5 p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                                    {i === 0 ? <Shield className="h-6 w-6" /> : i === 1 ? <TrendingUp className="h-6 w-6" /> : <ChartColumn className="h-6 w-6" />}
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{feat.title}</h3>
                                <p className="text-sm text-white/30 font-medium leading-relaxed">{feat.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* METRICS STRIP OVERHAUL */}
                <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 border-y border-white/5 py-16">
                    {metrics.map((metric, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                            <span className="text-5xl md:text-6xl font-black text-white tracking-tighter italic group-hover:text-glow-cyan transition-all duration-500">
                                <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{metric.label}</span>
                        </div>
                    ))}
                </div>

                {/* Final Ecosystem CTA */}
                <ScrollReveal className="flex justify-center mt-32">
                    <Link href="/register" className="group relative px-12 py-7 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 block shadow-2xl">
                        <div className="absolute inset-0 bg-white" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center text-black group-hover:rotate-45 transition-transform">
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

