'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleHelp as HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqItems = [
    {
        question: "¿Cómo garantizan el cumplimiento fiscal?",
        answer: "Monitoreamos la Gaceta Oficial con IA. IVA 16%, IGTF 3% e ISLR se calculan automáticamente según la normativa VEN-NIF vigente."
    },
    {
        question: "¿Puedo gestionar varias empresas?",
        answer: "Sí. El portal de Socios permite consolidar la contabilidad de múltiples entidades en un Centro de Mando unificado."
    },
    {
        question: "¿Cómo funciona la tasa BCV?",
        answer: "Se actualiza automáticamente. Cada factura genera su equivalente en USD con la tasa BCV del momento."
    },
    {
        question: "¿Es difícil migrar mis datos?",
        answer: "No. Para sistemas estándar (Excel, Profit, Mónica), la migración se completa en menos de 48 horas sin costo adicional."
    },
    {
        question: "¿Qué nivel de seguridad tienen?",
        answer: "Cifrado AES-256, autenticación JWT con cookies HTTP-only, y registro de auditoría inmutable para cada acción."
    },
];

export function FaqSection() {
    return (
        <section id="faq" className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-4xl relative z-10">
                <motion.div
                    className="text-center mb-10 md:mb-14 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.35em] text-primary mx-auto">
                        <HelpCircle className="h-3 w-3" />
                        Soporte
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-[1.1]">
                        Preguntas <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>Frecuentes</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-border/40 dark:border-white/[0.06] rounded-3xl px-6 overflow-hidden bg-card/40 dark:bg-white/[0.015] hover:bg-card/70 dark:hover:bg-white/[0.03] transition-all duration-500 hover:border-primary/25 hover:shadow-[0_4px_20px_-8px_rgba(var(--primary-rgb,30,64,175),0.12)] data-[state=open]:border-primary/30 data-[state=open]:shadow-[0_4px_20px_-8px_rgba(var(--primary-rgb,30,64,175),0.15)] data-[state=open]:bg-card/60"
                            >
                                <AccordionTrigger className="text-left hover:no-underline py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-black text-primary">{String(index + 1).padStart(2, '0')}</span>
                                        </div>
                                        <span className="text-xs md:text-sm font-black uppercase tracking-tight text-foreground/90 leading-snug">
                                            {item.question}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed pl-12 border-t border-border/20 dark:border-white/[0.04] pt-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
