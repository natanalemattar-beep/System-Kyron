'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Zap, Smartphone, FileText, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CURRENT_VERSION = '1.2.0';

const updates = [
    {
        title: 'Reserva de Emergencia',
        description: '500MB + 30 min activables bajo demanda desde la App para recargas sin saldo.',
        icon: Zap,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10'
    },
    {
        title: 'Línea Personal $3',
        description: 'Nuevo plan ultra-económico para emprendedores individuales.',
        icon: Smartphone,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10'
    },
    {
        title: 'Sinergia SIM-App',
        description: 'Detección nativa a nivel de chip para autorizar puentes de datos automáticos.',
        icon: Cpu,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10'
    },
];

export function WhatIsNewModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const lastSeen = localStorage.getItem('kyron_last_version');
        if (lastSeen !== CURRENT_VERSION) {
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('kyron_last_version', CURRENT_VERSION);
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0c1120] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header Glow */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />

                        <div className="p-8 relative">
                            <button 
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                    <Sparkles className="h-5 w-5 text-cyan-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-cyan-400 border-cyan-500/30">
                                        Update v{CURRENT_VERSION}
                                    </Badge>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight mt-1">¿Qué hay de nuevo?</h2>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {updates.map((update, i) => (
                                    <motion.div 
                                        key={update.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                        className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all"
                                    >
                                        <div className={`h-10 w-10 rounded-xl ${update.bg} flex items-center justify-center shrink-0`}>
                                            <update.icon className={`h-5 w-5 ${update.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white leading-tight mb-1">{update.title}</p>
                                            <p className="text-xs text-white/40 leading-relaxed">{update.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Button 
                                onClick={handleClose}
                                className="w-full h-14 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase text-[11px] tracking-widest group shadow-xl shadow-cyan-500/10"
                            >
                                Entendido, ¡increíble!
                                <CheckCircle2 className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
