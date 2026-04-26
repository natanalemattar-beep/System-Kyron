'use client';

import { motion } from 'framer-motion';
import { 
    Calculator, ShieldCheck, LineChart, FileSpreadsheet, 
    Zap, Lock, Eye, ArrowRight, CheckCircle2, TrendingUp,
    Landmark, BadgePercent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

const COMPLIANCE_ITEMS = [
    { name: 'VEN-NIF / BA VEN-NIF', status: 'Activo', color: 'text-emerald-400' },
    { name: 'SENIAT (IVA / ISLR)', status: 'Sincronizado', color: 'text-cyan-400' },
    { name: 'IGTF (Automatizado)', status: 'Protegido', color: 'text-blue-400' },
    { name: 'Retenciones 75%/100%', status: 'Misión Crítica', color: 'text-violet-400' }
];

export function AccountingSpecialSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#030711]">
            {/* Background Effects */}
            <div className="absolute inset-0 hud-grid opacity-5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Visual Side: Holographic Accounting Interface */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Glass Card */}
                        <div className="relative glass-elite p-8 rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                        <Landmark className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Terminal de Asesoría</h4>
                                        <p className="text-sm font-bold text-white uppercase tracking-wider">Nexo Contable Alpha-1</p>
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                </div>
                            </div>

                            {/* Mock Data Flow */}
                            <div className="space-y-4 relative">
                                {[1, 2, 3].map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group-hover:border-blue-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                                                <FileSpreadsheet className="h-4 w-4 text-white/20" />
                                            </div>
                                            <div>
                                                <div className="h-2 w-24 bg-white/10 rounded-full mb-2" />
                                                <div className="h-1.5 w-16 bg-white/5 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="h-2 w-12 bg-emerald-500/20 rounded-full ml-auto" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Stats */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -right-4 p-6 glass-elite border-emerald-500/30 rounded-3xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-8 w-8 text-emerald-400" />
                                    <div>
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Optimización</p>
                                        <p className="text-2xl font-black text-white tracking-tighter">+42%</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                                className="absolute top-1/4 -left-8 p-4 glass-elite border-blue-500/30 rounded-2xl shadow-xl z-20"
                            >
                                <BadgePercent className="h-6 w-6 text-blue-400" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] font-tech">
                                <Calculator className="h-3.5 w-3.5" /> Ecosistema Contable 360
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] italic">
                                Blindaje Fiscal <br />
                                <span className="text-blue-500 not-italic">de Misión Crítica</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                                No es solo contabilidad; es la fusión de inteligencia fiscal y tecnología de vanguardia. Nuestra asesoría transforma el cumplimiento tributario en una ventaja estratégica para tu empresa.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {COMPLIANCE_ITEMS.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 group hover:bg-white/[0.04] transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Protocolo 0{i+1}</span>
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-black text-white uppercase tracking-tight">{item.name}</p>
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest", item.color)}>
                                        {item.status}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 group">
                                <Link href="/register">
                                    Iniciar Blindaje Fiscal <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest border-white/10 hover:bg-white/5 text-white/60 hover:text-white">
                                Consultar Planos VEN-NIF
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 pt-4 opacity-30 grayscale group-hover:grayscale-0 transition-all">
                            <Zap className="h-6 w-6 text-blue-400" />
                            <Lock className="h-6 w-6 text-emerald-400" />
                            <ShieldCheck className="h-6 w-6 text-violet-400" />
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
