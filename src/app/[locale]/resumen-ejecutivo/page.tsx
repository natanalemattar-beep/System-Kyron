"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Zap, 
    Users, 
    Target, 
    TrendingUp, 
    Leaf, 
    Map, 
    Rocket,
    Globe,
    Lock,
    Cpu,
    Smartphone,
    ArrowLeft,
    Download,
    CheckCircle2
} from 'lucide-react';

                <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-10">
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                            <Rocket className="h-3 w-3" /> Reto InspiraVe 2026
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Resumen<br/>Ejecutivo
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto mb-12">
                            Soberanía digital para empresas: tus líneas, tu web y cero complicaciones.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Proyecto</p>
                                <p className="text-xl font-black text-white">System Kyron</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Líder</p>
                                <p className="text-xl font-black text-white">Carlos Mattar</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Estado</p>
                                <p className="text-xl font-black text-emerald-400 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5" /> Validado
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                            >
                                <div className={`h-12 w-12 rounded-2xl bg-${section.color}-500/10 border border-${section.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <section.icon className={`h-6 w-6 text-${section.color}-400`} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{section.title}</h3>
                                <p className="text-zinc-400 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Roadmap Section */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Map className="h-64 w-64 text-white" />
                        </div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-12">8. Estado Actual y Hoja de Ruta</h2>
                            
                            <div className="space-y-12">
                                <div className="flex gap-6 items-start">
                                    <div className="h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-white uppercase mb-2">Etapa Actual: MVP Validado</h4>
                                        <p className="text-zinc-400 max-w-2xl font-medium">Infraestructura técnica operativa, RIF legal (J-50832149-9) y prototipo desplegado con encriptación AES-256.</p>
                                    </div>
                                </div>

                                <div className="pl-5 border-l-2 border-dashed border-white/10 space-y-12">
                                    <div className="flex gap-6 items-start relative">
                                        <div className="absolute left-[-31px] top-0 h-10 w-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                                            <span className="text-[10px] font-black">01</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase mb-1">IA Fiscal Predictiva</h4>
                                            <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Próximos 2 meses</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start relative">
                                        <div className="absolute left-[-31px] top-0 h-10 w-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                                            <span className="text-[10px] font-black">02</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase mb-1">Escalamiento a 50 Clientes</h4>
                                            <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Próximos 4 meses</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start relative">
                                        <div className="absolute left-[-31px] top-0 h-10 w-10 rounded-full bg-white flex items-center justify-center">
                                            <Rocket className="h-4 w-4 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase mb-1">Expansión Kyron Mobile (5G)</h4>
                                            <p className="text-zinc-500 text-sm font-bold tracking-widest uppercase">Próximos 6 meses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <footer className="mt-24 text-center border-t border-white/5 pt-12">
                        <p className="text-zinc-600 text-xs font-black uppercase tracking-[0.4em]">System Kyron · Emprendimiento Carlos Mattar · 2026</p>
                    </footer>
                </main>
            </div>
        </PasswordGate>
    );
}
