
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
    {
        question: "¿Cómo garantizan el cumplimiento con las normativas del SENIAT?",
        answer: "Nuestra plataforma está diseñada específicamente para el entorno fiscal venezolano. Mantenemos una comunicación constante con el SENIAT para asegurar que cada factura, retención y libro contable cumpla con las últimas providencias administrativas. Nuestro sistema valida los datos en tiempo real y está homologado, dándote la tranquilidad de que tu empresa opera 100% en regla."
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos una amplia variedad de métodos de pago para tu comodidad. Para pagos en Bolívares (VES), puedes usar transferencias bancarias y Pago Móvil. Para pagos en Dólares (USD) o otras divisas, aceptamos Zelle, transferencias internacionales y tarjetas de crédito a través de nuestra pasarela de pago segura."
    },
    {
        question: "¿Ofrecen soporte técnico y de implementación?",
        answer: "¡Sí! El éxito de nuestros clientes es nuestro éxito. Ofrecemos un proceso de 'onboarding' guiado para asegurar una implementación fluida. Además, todos nuestros planes incluyen soporte. El Plan Profesional y Corporativo cuentan con soporte prioritario vía WhatsApp y teléfono para resolver cualquier duda al instante."
    },
    {
        question: "¿Puedo probar la plataforma antes de comprometerme?",
        answer: "Por supuesto. Creemos en el valor de nuestra plataforma y queremos que lo compruebes por ti mismo. Ofrecemos una demostración gratuita y personalizada donde uno de nuestros especialistas te guiará a través de las funcionalidades clave y responderá todas tus preguntas. Solicita tu demo en la sección de contacto."
    },
    {
        question: "¿Es seguro subir mis datos fiscales y contables a la plataforma?",
        answer: "La seguridad es nuestra máxima prioridad. Utilizamos cifrado de nivel bancario para toda la información, tanto en tránsito como en reposo. Además, implementamos autenticación de dos factores (2FA) y auditorías de seguridad constantes para garantizar que tus datos estén siempre protegidos contra accesos no autorizados."
    },
    {
        question: "¿Qué sucede si cambia la legislación fiscal en Venezuela?",
        answer: "Esa es una de nuestras mayores fortalezas. Nuestro equipo legal y de desarrollo monitorea constantemente cualquier cambio en la legislación. Actualizamos la plataforma de forma proactiva para adaptarnos a nuevas leyes, gacetas o providencias, asegurando que tu empresa siempre esté al día sin que tú tengas que preocuparte."
    }
];


export function FaqSection() {
    return (
        <section id="faq" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h2>
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
