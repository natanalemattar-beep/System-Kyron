'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleHelp as HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqItems = [
    {
        question: "¿Cómo garantizan el cumplimiento fiscal venezolano?",
        answer: "System Kyron monitorea la Gaceta Oficial diariamente con IA. Todas las declaraciones de IVA 16%, IGTF 3% e ISLR 34% se calculan automáticamente según la normativa VEN-NIF vigente. Las actualizaciones legales se despliegan sin intervención del usuario."
    },
    {
        question: "¿Puedo gestionar múltiples empresas o un holding?",
        answer: "Sí. El portal de Socios y Directivos permite consolidar la contabilidad de varias entidades en un único Centro de Mando. Cada empresa mantiene su propia independencia de datos con reportes a nivel de grupo disponibles en tiempo real."
    },
    {
        question: "¿Cómo funciona la tasa BCV en facturas y pagos?",
        answer: "La tasa del Banco Central de Venezuela se actualiza automáticamente en la plataforma. Cada factura y transacción en bolívares genera automáticamente su equivalente en USD aplicando la tasa BCV del momento, facilitando el cumplimiento del IGTF 3%."
    },
    {
        question: "¿Es difícil migrar mis datos desde otro sistema?",
        answer: "No. Nuestro equipo guía la importación masiva de datos históricos. Para la mayoría de sistemas estándar (Excel, Profit, Mónica), la migración se completa en menos de 48 horas sin costo adicional."
    },
    {
        question: "¿El módulo Mi Línea funciona con operadoras venezolanas?",
        answer: "Sí. El portal Mi Línea gestiona líneas de Movilnet, Digitel y Movistar, incluyendo activación de eSIM, provisión 5G y gestión de flota corporativa por departamento con límites de consumo configurables."
    },
    {
        question: "¿Qué son los Eco-Créditos de Ameru IA?",
        answer: "Ameru es nuestro módulo de sostenibilidad. Permite clasificar residuos mediante inteligencia artificial, generar eco-créditos certificados por cada kilogramo reciclado y participar en el mercado de eco-créditos Kyron para monetizar el impacto ambiental."
    },
    {
        question: "¿Cuál es el nivel de seguridad de la plataforma?",
        answer: "Toda la información se cifra con AES-256. La autenticación usa JWT con cookies HTTP-only y sesiones de 7 días. El registro de auditoría es inmutable y cada acción queda registrada con timestamp, IP y usuario responsable."
    },
];

export function FaqSection() {
    return (
        <section id="faq" className="py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-10 max-w-5xl">
                <motion.div
                    className="text-center mb-8 md:mb-12 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground uppercase italic italic-shadow leading-[1.2] break-words overflow-hidden">
                        Preguntas <span className="text-primary not-italic">Frecuentes</span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                        Resolvemos las dudas más comunes sobre la plataforma para que puedas tomar decisiones con confianza.
                    </p>
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
