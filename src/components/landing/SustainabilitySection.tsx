'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Wind, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SustainabilitySection() {
    const t = useTranslations('SustainabilitySection');

    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-[#03050a] transition-colors duration-700">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/[0.05] dark:bg-emerald-500/[0.03] blur-[120px] animate-mesh-drift" />
                <div className="absolute bottom-0 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.02] blur-[100px] animate-mesh-drift" style={{ animationDelay: '-10s' }} />
            </div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 transition-colors">
                            <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">{t('badge')}</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.95] uppercase italic transition-colors">
                            {t('title_main')} <span className="text-emerald-500 drop-shadow-sm">{t('title_highlight')}</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
                            {t('description')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8 pt-6">
                            <div className="p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl hover:border-emerald-500/30 transition-all hover:-translate-y-2 group/card">
                                <Recycle className="w-10 h-10 text-emerald-500 mb-6 group-hover/card:scale-110 transition-transform" />
                                <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-tight text-lg mb-3 transition-colors">{t('smart_bins_title')}</h4>
                                <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium leading-relaxed transition-colors">{t('smart_bins_desc')}</p>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl hover:border-emerald-500/30 transition-all hover:-translate-y-2 group/card">
                                <Wind className="w-10 h-10 text-emerald-500 mb-6 group-hover/card:scale-110 transition-transform" />
                                <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-tight text-lg mb-3 transition-colors">{t('eco_credits_title')}</h4>
                                <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium leading-relaxed transition-colors">{t('eco_credits_desc')}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl glass-system-kyron-interactive p-3">
                            <img 
                                src="/images/salto-angel.jpg" 
                                alt="Sustainability Impact" 
                                className="w-full aspect-square object-cover rounded-[2.5rem] transition-transform duration-1000 group-hover:scale-105"
                            />
                            
                            {/* Overlay Stats */}
                            <div className="absolute top-10 left-10 p-6 rounded-[2rem] bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-black/5 dark:border-white/20 shadow-2xl animate-float transition-colors">
                                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 transition-colors">{t('overlay_label')}</p>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{t('overlay_value')}</h3>
                                <p className="text-[9px] text-slate-400 dark:text-white/40 font-black uppercase tracking-widest transition-colors">{t('overlay_sublabel')}</p>
                            </div>

                            <div className="absolute bottom-10 right-10 p-6 rounded-[1.5rem] bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] transition-colors">{t('certification_label')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
