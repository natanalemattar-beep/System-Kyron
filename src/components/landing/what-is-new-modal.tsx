'use client';

import { useState } from 'react';
import { Sparkles, X, ArrowRight, Zap, Smartphone, Cpu, CheckCircle2 } from 'lucide-react';
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

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div
                onClick={handleClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <div className="relative w-full max-w-lg bg-background border border-border dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-kyron-cyan/20 to-transparent pointer-events-none" />

                <div className="p-8 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground/40 hover:text-foreground transition-all"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-kyron-cyan/20 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-kyron-cyan" />
                        </div>
                        <div>
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-kyron-cyan border-kyron-cyan/30">
                                Update v{CURRENT_VERSION}
                            </Badge>
                            <h2 className="text-xl font-black text-foreground uppercase tracking-tight mt-1">¿Qué hay de nuevo?</h2>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        {updates.map((update) => (
                            <div
                                key={update.title}
                                className="flex gap-4 p-4 rounded-2xl bg-muted/30 dark:bg-white/[0.03] border border-border dark:border-white/5 hover:bg-muted/50 dark:hover:bg-white/[0.05] transition-all"
                            >
                                <div className={`h-10 w-10 rounded-xl ${update.bg} flex items-center justify-center shrink-0`}>
                                    <update.icon className={`h-5 w-5 ${update.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-tight mb-1">{update.title}</p>
                                    <p className="text-xs text-muted-foreground/40 leading-relaxed">{update.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={handleClose}
                        className="w-full h-14 rounded-2xl bg-foreground hover:bg-foreground/80 text-background dark:bg-white dark:hover:bg-kyron-cyan/90 dark:text-black font-black uppercase text-[11px] tracking-widest group shadow-xl shadow-foreground/10"
                    >
                        Entendido, ¡increíble!
                        <CheckCircle2 className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
