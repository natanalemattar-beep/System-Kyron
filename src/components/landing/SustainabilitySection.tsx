'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Wind, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SustainabilitySection() {
    const t = useTranslations('SustainabilitySection');

    return (
        <section className="py-32 relative overflow-hidden bg-transparent">
            {/* Emerald Aurora Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/[0.08] blur-[160px] animate-mesh-drift" />
                <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-green-600/[0.04] blur-[140px] animate-mesh-drift" style={{ animationDelay: '-10s' }} />
            </div>
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* Content Side */}
                    <div className="space-y-12">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-fade-in-up">
                            <Leaf className="h-4 w-4 text-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-200/80">
                                {t('badge')}
                            </span>
                        </div>
                        
                        <div className="space-y-8">
                            <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                                {t('title_main')}<br/>
                                <span className="text-glow-emerald not-italic">{t('title_highlight')}</span>
                            </h2>
                            
                            <p className="text-xl md:text-2xl text-white/30 max-w-2xl font-medium leading-relaxed font-outfit">
                                {t('description')}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8 pt-6">
                            <div className="group/card p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-700 hover:-translate-y-2">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all">
                                    <Recycle className="h-7 w-7" />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">{t('smart_bins_title')}</h4>
                                <p className="text-base text-white/30 font-medium leading-relaxed">{t('smart_bins_desc')}</p>
                            </div>
                            
                            <div className="group/card p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-700 hover:-translate-y-2">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all">
                                    <Wind className="h-7 w-7" />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">{t('eco_credits_title')}</h4>
                                <p className="text-base text-white/30 font-medium leading-relaxed">{t('eco_credits_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative group">
                        {/* Aurora Glow */}
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
                        
                        <div className="relative rounded-[4rem] overflow-hidden border border-white/10 p-4 bg-white/[0.01] backdrop-blur-3xl shadow-2xl">
                            <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden group/img">
                                <img 
                                    src="/images/salto-angel.jpg" 
                                    alt="Kyron Sostenibilidad" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                                />
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(16,185,129,0.06),rgba(0,255,0,0.02),rgba(16,185,129,0.06))] bg-[length:100%_2px,3px_100%]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60" />
                            </div>
                            
                            {/* Floating Metadata Card */}
                            <div className="absolute top-12 left-12 p-8 rounded-[2.5rem] bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl animate-float transition-all hover:scale-105">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-2">{t('overlay_label')}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl font-black text-white tracking-tighter italic">{t('overlay_value')}</h3>
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                                </div>
                                <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] mt-3">{t('overlay_sublabel')}</p>
                            </div>

                            {/* Certification Link */}
                            <div className="absolute bottom-12 right-12 p-6 rounded-[1.5rem] bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 shadow-2xl transition-all hover:bg-emerald-500/20">
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] leading-tight">
                                        {t('certification_label')}<br/>
                                        <span className="text-emerald-400/60">Verified Active</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
