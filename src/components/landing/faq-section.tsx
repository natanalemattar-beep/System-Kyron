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
        <section id="faq" className="py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-10 max-w-4xl">
                <motion.div
                    className="text-center mb-8 md:mb-12 space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground uppercase leading-[1.2]">
                        Preguntas <span className="text-primary italic">Frecuentes</span>
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
                                className="border border-border/50 rounded-2xl px-6 overflow-hidden bg-card/40 hover:bg-card/70 transition-all hover:border-primary/20 data-[state=open]:border-primary/20"
                            >
                                <AccordionTrigger className="text-left hover:no-underline py-5">
                                    <div className="flex items-start gap-4">
                                        <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <span className="text-xs md:text-sm font-black uppercase tracking-tight text-foreground/90 leading-snug">
                                            {item.question}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed pl-8 border-t border-border/20 pt-4">
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
