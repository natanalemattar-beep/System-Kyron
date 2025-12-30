
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
    {
        question: "¿Qué tan seguro están del 'Cero Riesgo Fiscal'?",
        answer: "Nuestra confianza se basa en un sistema de triple validación: 1) Reglas de negocio actualizadas constantemente por nuestro equipo legal. 2) Auditoría continua por IA que verifica cada transacción. 3) Una capa de verificación humana por contadores expertos. Este enfoque proactivo nos permite garantizar el 100% de cumplimiento."
    },
    {
        question: "¿Cómo se adapta la plataforma a los constantes cambios de leyes en Venezuela?",
        answer: "Esta es nuestra mayor fortaleza. Nuestro equipo legal monitorea la Gaceta Oficial diariamente. Cualquier cambio en leyes, providencias o tasas (ej. IGTF, Protección de Pensiones) se traduce en actualizaciones automáticas en la plataforma, asegurando que tu empresa siempre esté al día sin que tengas que preocuparte."
    },
    {
        question: "¿Puedo integrar System Kyron con otras herramientas que ya uso?",
        answer: "¡Sí! Para nuestros clientes del Plan Corporativo, ofrecemos una API robusta que permite integraciones a medida con tus sistemas de CRM, ERP o cualquier otra herramienta de gestión, creando un flujo de trabajo unificado y sin fisuras."
    },
    {
        question: "Mi empresa no es de tecnología. ¿Es difícil de usar?",
        answer: "Para nada. La plataforma está diseñada para ser increíblemente intuitiva. Si sabes usar tu correo electrónico o redes sociales, sabrás usar Kyron. Además, ofrecemos un proceso de implementación guiado y soporte constante para resolver cualquier duda que pueda surgir."
    },
    {
        question: "¿Qué nivel de soporte técnico ofrecen?",
        answer: "Ofrecemos soporte escalonado. Todos nuestros planes incluyen soporte por correo. El Plan Profesional añade soporte prioritario vía WhatsApp, y el Plan Corporativo ofrece un Oficial de Cumplimiento dedicado y soporte 24/7 con acuerdos de nivel de servicio (SLA) garantizados."
    },
    {
        question: "¿Qué pasa con mis datos si decido dejar de usar el servicio?",
        answer: "Tus datos son tuyos. En cualquier momento, puedes exportar toda tu información (libros contables, facturas, reportes) en formatos estándar como Excel o PDF. Garantizamos un proceso de salida transparente y sin trabas."
    }
];


export function FaqSection() {
    return (
        <section id="faq" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Preguntas Frecuentes</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Resolvemos tus dudas más comunes para que tomes la mejor decisión.</p>
                </div>
                <div 
                    className="max-w-3xl mx-auto"
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
                </div>
            </div>
        </section>
    );
}
