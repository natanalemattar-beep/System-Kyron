'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Wind, ShieldCheck } from 'lucide-react';

export function SustainabilitySection() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#03050a]">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Leaf className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Impacto Ambiental - Reto Inspira 2026</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase italic">
                            Compromiso <span className="text-emerald-500">Cero Papel</span>
                        </h2>
                        
                        <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                            En System Kyron no solo optimizamos negocios, protegemos el planeta. Nuestro ecosistema digital elimina la necesidad de archivos físicos, reduciendo la huella de carbono administrativa en un 100%.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-emerald-500/30 transition-colors">
                                <Recycle className="w-8 h-8 text-emerald-500 mb-4" />
                                <h4 className="text-white font-bold mb-2">Smart Bins (Ameru)</h4>
                                <p className="text-sm text-zinc-500 font-medium">Alianza estratégica para el reciclaje inteligente mediante inducción magnética.</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-emerald-500/30 transition-colors">
                                <Wind className="w-8 h-8 text-emerald-500 mb-4" />
                                <h4 className="text-white font-bold mb-2">Eco-Créditos</h4>
                                <p className="text-sm text-zinc-500 font-medium">Recompensas digitales por cada kilogramo de residuo procesado correctamente.</p>
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
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1000&auto=format&fit=crop" 
                                alt="Sustainability Impact" 
                                className="w-full aspect-square object-cover rounded-[2.5rem] transition-transform duration-1000 group-hover:scale-105"
                            />
                            
                            {/* Overlay Stats */}
                            <div className="absolute top-10 left-10 p-6 rounded-3xl glass-liquid-hud border border-white/20 shadow-2xl animate-float">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Impacto Real</p>
                                <h3 className="text-2xl font-black text-white">-12,000</h3>
                                <p className="text-[9px] text-white/40 font-bold uppercase">Hojas/Año por PyME</p>
                            </div>

                            <div className="absolute bottom-10 right-10 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                    </div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Certificación Kyron</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
