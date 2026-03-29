'use client';

import dynamic from 'next/dynamic';
import { Ticket, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="glass-liquid space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl relative animate-pulse min-h-[500px]" />
    ),
});

export function CtaSection() {
    return (
        <section id="contacto" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/6 blur-[100px]"
                />
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30 - i * 4, 0],
                            opacity: [0, 0.4, 0],
                            scale: [0.6, 1.2, 0.6],
                        }}
                        transition={{
                            duration: 5 + i * 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                        className="absolute rounded-full"
                        style={{
                            width: 2 + (i % 3),
                            height: 2 + (i % 3),
                            left: `${10 + i * 10}%`,
                            bottom: `${15 + (i % 4) * 15}%`,
                            background: i % 2 === 0 ? 'hsl(var(--primary) / 0.3)' : 'rgba(6, 182, 212, 0.25)',
                        }}
                    />
                ))}
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
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-[0.4em] border border-primary/20 mx-auto lg:ml-0 shadow-[0_0_15px_rgba(var(--primary-rgb,30,64,175),0.08)]">
                           <Sparkles className="h-3 w-3 animate-pulse" /> Acceso Prioritario
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-foreground uppercase">
                            ¿Listo para <br className="sm:hidden" /><span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>empezar</span>?
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto lg:ml-0 leading-relaxed font-medium lg:border-l-[3px] border-primary/30 lg:pl-5">
                            Complete el formulario para solicitar su auditoría técnica personalizada.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                            {["Registro 2 min", "Sin compromisos", "Soporte 24/7"].map((t, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-muted/20 dark:bg-white/[0.02] text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <ArrowRight className="h-2.5 w-2.5 text-primary" />
                                    {t}
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
        </section>
    );
}
