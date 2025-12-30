
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqItems = [
    {
        question: "¿Cómo garantizan el 'Cero Riesgo Fiscal'?",
        answer: "Nuestra confianza se basa en un sistema de triple validación: 1) Reglas de negocio actualizadas en tiempo real por nuestro equipo legal. 2) Auditoría continua por IA que verifica cada transacción contra la Gaceta Oficial. 3) Sellado de transacciones en Blockchain para crear un registro inmutable. Este enfoque proactivo nos permite garantizar el cumplimiento antes de que ocurra cualquier fiscalización."
    },
    {
        question: "¿La plataforma puede gestionar un holding de varias empresas?",
        answer: "Sí. System Kyron está diseñado desde su núcleo para la gestión de holdings. Puedes consolidar la contabilidad, generar reportes financieros a nivel de grupo, y tener una visión 360° de todas tus empresas desde un único Centro de Mando, manteniendo la operatividad y los datos de cada una de forma segura e independiente."
    },
    {
        question: "¿Qué tan difícil es migrar mi información contable actual a Kyron?",
        answer: "Hemos simplificado este proceso al máximo. Nuestro equipo de implementación te guiará para importar tus datos históricos (clientes, productos, balances) de forma masiva. Para la mayoría de los sistemas contables estándar, la migración se completa en menos de 48 horas."
    },
    {
        question: "Mi empresa no es de tecnología. ¿Es difícil de usar?",
        answer: "Para nada. La plataforma está diseñada para ser increíblemente intuitiva. Si sabes usar tu correo electrónico o redes sociales, sabrás usar Kyron. Además, ofrecemos un proceso de implementación guiado y soporte constante para resolver cualquier duda que pueda surgir."
    },
    {
        question: "¿Cómo se adapta la plataforma a los constantes cambios de leyes en Venezuela?",
        answer: "Esta es nuestra mayor fortaleza. Nuestro equipo legal y nuestra IA monitorean la Gaceta Oficial diariamente. Cualquier cambio en leyes (IVA, ISLR) o nuevas contribuciones (Protección de Pensiones) se traduce en actualizaciones automáticas en la plataforma, asegurando que tu empresa siempre esté al día sin que tengas que preocuparte."
    },
    {
        question: "¿Qué nivel de soporte técnico ofrecen?",
        answer: "Ofrecemos soporte escalonado. Todos nuestros planes incluyen soporte por correo. El Plan Profesional añade soporte prioritario vía WhatsApp, y el Plan Corporativo ofrece un Oficial de Cumplimiento dedicado y soporte 24/7 con acuerdos de nivel de servicio (SLA) garantizados."
    }
];


export function FaqSection() {
    return (
        <section id="faq" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Preguntas Frecuentes</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Resolvemos tus dudas más comunes para que tomes la mejor decisión.</p>
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
