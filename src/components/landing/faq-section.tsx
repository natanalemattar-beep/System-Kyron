
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

const faqItems = [
    {
        question: "¿Cómo garantizan el 'Cero Riesgo Fiscal'?",
        answer: "Nuestra confianza se basa en un sistema de triple validación: reglas de negocio actualizadas, auditoría continua por IA y sellado de transacciones en Blockchain para crear un registro inmutable."
    },
    {
        question: "¿La plataforma puede gestionar un holding?",
        answer: "Sí. System Kyron permite consolidar la contabilidad y generar reportes financieros a nivel de grupo desde un único Centro de Mando, manteniendo la independencia de datos de cada empresa."
    },
    {
        question: "¿Es difícil migrar mi información actual?",
        answer: "No. Nuestro equipo te guiará para importar tus datos históricos de forma masiva. Para la mayoría de los sistemas estándar, la migración se completa en menos de 48 horas."
    },
    {
        question: "¿Cómo se adapta a los cambios de leyes?",
        answer: "Nuestro equipo legal y nuestra IA monitorean la Gaceta Oficial diariamente. Cualquier cambio normativo se traduce en actualizaciones automáticas en la plataforma."
    }
];


export function FaqSection() {
    const { isHolidayActive } = useHoliday();
    return (
        <section id="faq" className={cn("py-16 md:py-28", !isHolidayActive && "bg-muted/10 rounded-[2.5rem] md:rounded-[4rem]")}>
            <div className="container mx-auto px-4 md:px-10">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase italic">Preguntas <span className="text-primary not-italic">Frecuentes</span></h2>
                    <p className="text-sm md:text-lg text-muted-foreground font-medium">Resolvemos tus dudas técnicas para facilitar tu toma de decisiones.</p>
                </motion.div>
                <motion.div 
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className={cn(
                                "border-none rounded-2xl mb-4 px-6 overflow-hidden transition-all hover:bg-white/5",
                                isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card/40 shadow-sm"
                            )}>
                                <AccordionTrigger className="text-left hover:no-underline py-6">
                                    <div className="flex items-start gap-4">
                                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-xs md:text-sm font-black uppercase tracking-tight italic">{item.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed pl-9 border-t border-white/5 pt-4">
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
