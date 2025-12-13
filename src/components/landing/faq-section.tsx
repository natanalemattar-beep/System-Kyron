
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { faqItems } from "@/lib/page-data";

export function FaqSection() {
    return (
        <section id="faq" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Resolvemos tus dudas más comunes para que tomes la mejor decisión.</p>
                </motion.div>
                <motion.div 
                    className="max-w-3xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border rounded-lg mb-2 px-4">
                                <AccordionTrigger className="text-left">
                                    <div className="flex items-start gap-3">
                                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                                        <span>{item.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-10 text-muted-foreground">
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
