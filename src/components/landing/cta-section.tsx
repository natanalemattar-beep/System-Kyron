'use client';

import dynamic from 'next/dynamic';
import { Ticket } from "lucide-react";
import { motion } from "framer-motion";

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="glass-liquid space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl relative animate-pulse min-h-[500px]" />
    ),
});

export function CtaSection() {
    return (
        <section id="contacto" className="py-12 md:py-20 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div 
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em] border border-primary/20 mx-auto lg:ml-0">
                           <Ticket className="h-3 w-3"/> Acceso Prioritario
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.2] text-foreground uppercase italic overflow-hidden break-words">
                            Inyecta Inteligencia <br className="hidden sm:block"/> <span className="text-primary not-italic">a tu Operación</span>
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 leading-relaxed font-bold uppercase tracking-tight italic border-l-0 lg:border-l-4 border-primary/30 lg:pl-8">
                            Despliegue de ecosistema personalizado. Complete el expediente técnico para priorizar su auditoría técnica.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="w-full"
                    >
                        <CtaForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
