'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const faqItems = [
    {
        question: "¿Cómo garantizan el cumplimiento fiscal?",
        answer: "Monitoreamos la Gaceta Oficial con Kyron AI (potenciado por Claude de Anthropic). IVA 16%, IGTF 3% e ISLR se calculan automáticamente según la normativa VEN-NIF vigente. El sistema genera los libros de compra/venta y archivos .txt listos para el portal del SENIAT."
    },
    {
        question: "¿Puedo gestionar varias empresas?",
        answer: "Sí. El portal de Socios y Directivos permite consolidar la contabilidad de múltiples entidades en un Centro de Mando unificado. Cada empresa mantiene su independencia administrativa mientras usted tiene visibilidad total desde un solo dashboard."
    },
    {
        question: "¿Cómo funciona la tasa BCV?",
        answer: "Se actualiza automáticamente cada día desde el Banco Central de Venezuela. Cada factura genera su equivalente en USD y EUR con la tasa BCV del momento, y el sistema calcula el IGTF (3%) en operaciones con divisas de forma instantánea."
    },
    {
        question: "¿Es difícil migrar mis datos?",
        answer: "No. Para sistemas estándar (Excel, Profit, Mónica, Galac), la migración se completa en menos de 48 horas sin costo adicional. Nuestro equipo de ingeniería le asiste durante todo el proceso para garantizar continuidad operativa."
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
        question: "¿Cómo funciona el módulo de nómina y RRHH?",
        answer: "El módulo calcula automáticamente nóminas con todos los aportes parafiscales (IVSS, FAOV, LPH, INCES) según la LOTTT. Incluye vacaciones, utilidades, prestaciones sociales, liquidaciones y envío de recibos de pago por WhatsApp con validez legal."
    },
    {
        question: "¿Qué es el sistema de Eco-Créditos?",
        answer: "Es nuestro módulo de sostenibilidad Ameru. Mediante puntos de reciclaje con tecnología de inducción magnética, los residuos se clasifican por IA y se convierten en Eco-Créditos digitales. Estos créditos pueden canjearse por servicios Kyron o intercambiarse en nuestro mercado interno de bonos verdes."
    },
    {
        question: "¿Puedo activar la línea 5G / eSIM desde la plataforma?",
        answer: "Sí. El módulo Mi Línea 5G permite activar eSIM (chips digitales) en minutos mediante código QR, sin necesidad de ir a una tienda física. Las empresas pueden gestionar flotas de datos corporativas con control centralizado de consumo y priorización de red."
    },
    {
        question: "¿Cómo funciona la asesoría legal con IA?",
        answer: "Kyron AI genera borradores de contratos de trabajo, arrendamiento, poderes notariales, actas de asamblea y permisos ante CONATEL y SENIAT. También monitorea el vencimiento de poderes, marcas comerciales (SAPI) y documentos notariales (SAREN), alertándole con anticipación."
    },
    {
        question: "¿Qué reportes puedo generar?",
        answer: "Reportes ejecutivos, de ventas por hora, rentabilidad por producto, estado de situación financiera, ganancias y pérdidas, análisis de tendencias y proyecciones con IA. Todos exportables en PDF y Excel, listos para presentar ante juntas directivas o el SENIAT."
    },
    {
        question: "¿Funciona en dispositivos móviles?",
        answer: "Sí. La plataforma es 100% responsive y accesible desde cualquier dispositivo — computadora, tablet o smartphone. Además, el asistente Kyron AI está disponible por chat y voz desde el navegador móvil."
    },
    {
        question: "¿Ofrecen capacitación para mi equipo?",
        answer: "Sí, a través de la Academia Kyron. Ofrecemos cursos certificados, tutoriales en video paso a paso, webinars sobre actualizaciones legales y una biblioteca técnica completa. Todo incluido en su plan sin costo adicional."
    },
    {
        question: "¿Qué pasa si necesito soporte técnico?",
        answer: "Contamos con soporte multicanal: Kyron AI 24/7 (chat inteligente), tickets de servicio con seguimiento transparente y conexión directa con nuestro equipo de ingeniería. Nuestro compromiso es respuesta técnica inmediata."
    },
    {
        question: "¿Tienen una Billetera Digital?",
        answer: "Sí. La Billetera Digital Kyron permite pagos instantáneos entre usuarios de la plataforma (P2P y B2B) sin comisiones. Los fondos pueden provenir de ventas, transferencias bancarias o del canje de Eco-Créditos. Cada transacción queda registrada de forma inmutable."
    },
    {
        question: "¿Puedo conectar mis cuentas bancarias?",
        answer: "Sí. El módulo de Conexión Bancaria permite la conciliación automática, comparando sus registros contables con los movimientos bancarios. Se actualiza diariamente con la tasa BCV y reduce el tiempo de cuadre en un 80%."
    },
];

const INITIAL_COUNT = 5;

export function FaqSection() {
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? faqItems : faqItems.slice(0, INITIAL_COUNT);

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
                        Resolvemos tus dudas sobre el ecosistema System Kyron, seguridad, módulos y más.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        <AnimatePresence initial={false}>
                            {visibleItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={index >= INITIAL_COUNT ? { opacity: 0, y: 15 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index >= INITIAL_COUNT ? (index - INITIAL_COUNT) * 0.05 : 0 }}
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
                        </AnimatePresence>
                    </Accordion>

                    {!showAll && (
                        <motion.div
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                variant="outline"
                                onClick={() => setShowAll(true)}
                                className="group h-12 px-8 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <span>Ver más preguntas frecuentes</span>
                                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                            </Button>
                        </motion.div>
                    )}

                    {showAll && (
                        <motion.div
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                variant="outline"
                                onClick={() => setShowAll(false)}
                                className="group h-12 px-8 rounded-2xl border-border/30 bg-card/50 hover:bg-card/80 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:border-border/50"
                            >
                                <span>Ver menos</span>
                                <ChevronDown className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-y-0.5" />
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
