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
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                                <Recycle className="w-8 h-8 text-emerald-500 mb-4" />
                                <h4 className="text-white font-bold mb-2">Eliminación de Residuos</h4>
                                <p className="text-sm text-zinc-500 font-medium">Digitalización total de facturas, reportes y expedientes legales.</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                                <Wind className="w-8 h-8 text-emerald-500 mb-4" />
                                <h4 className="text-white font-bold mb-2">Huella de Carbono</h4>
                                <p className="text-sm text-zinc-500 font-medium">Reducción drástica del impacto logístico y de almacenamiento físico.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full" />
                        <div className="relative p-8 rounded-[3rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 backdrop-blur-3xl aspect-square flex flex-col items-center justify-center text-center">
                            <div className="h-32 w-32 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] mb-8">
                                <ShieldCheck className="h-16 w-16 text-white" />
                            </div>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Certificación <br/>Ecológica Kyron</h3>
                            <p className="text-emerald-400 font-black uppercase tracking-widest text-sm">Tu empresa, 100% Sostenible</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
