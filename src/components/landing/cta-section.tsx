'use client';

import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl animate-pulse min-h-[500px] bg-card/50 border border-border/20" />
    ),
});

export function CtaSection() {
    return (
        <section id="contacto" className="relative overflow-hidden">
            <div className="relative py-20 md:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-[#030B1A] to-[#030B1A]" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]"
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            className="space-y-7 text-center lg:text-left"
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.35em] text-white/80 mx-auto lg:ml-0">
                               <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> Acceso Prioritario
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-white uppercase">
                                ¿Listo para{' '}
                                <span className="bg-gradient-to-r from-cyan-400 via-primary to-emerald-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
                                    empezar
                                </span>?
                            </h2>
                            <p className="text-base text-white/50 max-w-md mx-auto lg:ml-0 leading-relaxed font-medium">
                                Complete el formulario para solicitar su auditoría técnica personalizada.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {["Registro 2 min", "Sin compromisos", "Soporte 24/7"].map((t, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">{t}</span>
                                    </div>
                                ))}
                            </div>
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
            </div>
        </section>
    );
}
