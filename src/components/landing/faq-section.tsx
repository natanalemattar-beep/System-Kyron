'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

const topFaqItems = [
    {
        question: "¿Cómo garantizan el cumplimiento fiscal?",
        answer: "Monitoreamos la Gaceta Oficial con Kyron AI (potenciado por Claude de Anthropic). IVA 16%, IGTF 3% e ISLR se calculan automáticamente según la normativa VEN-NIF vigente. El sistema genera los libros de compra/venta y archivos .txt listos para el portal del SENIAT."
    },
    {
        question: "¿Qué nivel de seguridad tienen?",
        answer: "Cifrado AES-256 de grado bancario, autenticación JWT con cookies HTTP-only, verificación de dos factores (2FA) y registro de auditoría inmutable para cada acción realizada en la plataforma."
    },
    {
        question: "¿Qué inteligencia artificial utiliza System Kyron?",
        answer: "System Kyron utiliza Kyron AI, potenciado por Claude de Anthropic — uno de los modelos de IA más avanzados del mundo. Claude se encarga de la generación de documentos legales, análisis fiscal predictivo, asistente contable, clasificación de residuos para eco-créditos y el chat inteligente disponible en toda la plataforma."
    },
    {
        question: "¿Es difícil migrar mis datos?",
        answer: "No. Para sistemas estándar (Excel, Profit, Mónica, Galac), la migración se completa en menos de 48 horas sin costo adicional. Nuestro equipo de ingeniería le asiste durante todo el proceso para garantizar continuidad operativa."
    },
    {
        question: "¿Puedo gestionar varias empresas?",
        answer: "Sí. El portal de Socios y Directivos permite consolidar la contabilidad de múltiples entidades en un Centro de Mando unificado. Cada empresa mantiene su independencia administrativa mientras usted tiene visibilidad total desde un solo dashboard."
    },
    {
        question: "¿Funciona en dispositivos móviles?",
        answer: "Sí. La plataforma es 100% responsive y accesible desde cualquier dispositivo — computadora, tablet o smartphone. Además, el asistente Kyron AI está disponible por chat y voz desde el navegador móvil."
    },
];

export function FaqSection() {
    return (
        <section id="faq" className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-10 max-w-4xl relative z-10">
                <motion.div
                    className="text-center mb-12 md:mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[0.35em] text-primary mx-auto">
                        <MessageCircle className="h-3.5 w-3.5" />
                        Soporte
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-[1.1]">
                        Preguntas{' '}
                        <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic">
                            Frecuentes
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto">
                        Las dudas más comunes sobre el ecosistema System Kyron.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {topFaqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border border-border/30 dark:border-white/[0.06] rounded-3xl px-6 overflow-hidden bg-card/50 dark:bg-white/[0.02] hover:bg-card/80 dark:hover:bg-white/[0.035] transition-all duration-500 hover:border-primary/20 hover:shadow-lg data-[state=open]:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:bg-card/70"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center shrink-0">
                                                <span className="text-[10px] font-black text-primary">{String(index + 1).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-black uppercase tracking-tight text-foreground/90 leading-snug">
                                                {item.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed pl-[3.25rem] border-t border-border/15 dark:border-white/[0.04] pt-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>

                    <motion.div
                        className="flex justify-center mt-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/faq">
                            <Button
                                variant="outline"
                                className="group h-12 px-8 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <span>Ver más preguntas frecuentes</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
