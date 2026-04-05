'use client';

import { useState } from 'react';
import { Link } from "@/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    MessageCircle,
    Shield,
    Brain,
    Building2,
    Smartphone,
    Receipt,
    Users,
    Leaf,
    Headphones,
    Wallet,
    Search
} from "lucide-react";
import { PageTransition } from "@/components/ui/motion";

const faqCategories = [
    {
        id: 'general',
        title: 'General',
        icon: Building2,
        color: 'from-blue-500/15 to-blue-500/5',
        borderColor: 'border-blue-500/15',
        textColor: 'text-blue-400',
        questions: [
            {
                question: "¿Qué es System Kyron?",
                answer: "System Kyron es un ecosistema tecnológico integral para la gestión corporativa en Venezuela. Cubre contabilidad, RRHH, legal, ventas, telecomunicaciones, sostenibilidad e informática, todo en una sola plataforma con cumplimiento automático de la normativa venezolana (VEN-NIF, SENIAT, LOTTT)."
            },
            {
                question: "¿Puedo gestionar varias empresas?",
                answer: "Sí. El portal de Socios y Directivos permite consolidar la contabilidad de múltiples entidades en un Centro de Mando unificado. Cada empresa mantiene su independencia administrativa mientras usted tiene visibilidad total desde un solo dashboard."
            },
            {
                question: "¿Funciona en dispositivos móviles?",
                answer: "Sí. La plataforma es 100% responsive y accesible desde cualquier dispositivo — computadora, tablet o smartphone. Además, el asistente Kyron AI está disponible por chat y voz desde el navegador móvil."
            },
            {
                question: "¿Es difícil migrar mis datos?",
                answer: "No. Para sistemas estándar (Excel, Profit, Mónica, Galac), la migración se completa en menos de 48 horas sin costo adicional. Nuestro equipo de ingeniería le asiste durante todo el proceso para garantizar continuidad operativa."
            },
            {
                question: "¿Qué reportes puedo generar?",
                answer: "Reportes ejecutivos, de ventas por hora, rentabilidad por producto, estado de situación financiera, ganancias y pérdidas, análisis de tendencias y proyecciones con IA. Todos exportables en PDF y Excel, listos para presentar ante juntas directivas o el SENIAT."
            },
        ]
    },
    {
        id: 'seguridad',
        title: 'Seguridad y Privacidad',
        icon: Shield,
        color: 'from-emerald-500/15 to-emerald-500/5',
        borderColor: 'border-emerald-500/15',
        textColor: 'text-emerald-400',
        questions: [
            {
                question: "¿Qué nivel de seguridad tienen?",
                answer: "Cifrado AES-256 de grado bancario, autenticación JWT con cookies HTTP-only, verificación de dos factores (2FA) y registro de auditoría inmutable para cada acción realizada en la plataforma."
            },
            {
                question: "¿Mis datos están protegidos?",
                answer: "Absolutamente. Toda la información se almacena en servidores con cifrado de extremo a extremo. Cada acción queda registrada en un log de auditoría inmutable, y los accesos se controlan con roles granulares. Cumplimos con las mejores prácticas internacionales de seguridad de datos."
            },
            {
                question: "¿Cómo funciona la autenticación de dos factores?",
                answer: "Al iniciar sesión, el sistema envía un código de verificación de 6 dígitos a su correo electrónico o teléfono registrado. Este código tiene una vigencia limitada y solo puede usarse una vez. Los códigos de verificación y recuperación de contraseña están aislados para prevenir uso cruzado."
            },
        ]
    },
    {
        id: 'ia',
        title: 'Inteligencia Artificial',
        icon: Brain,
        color: 'from-violet-500/15 to-violet-500/5',
        borderColor: 'border-violet-500/15',
        textColor: 'text-violet-400',
        questions: [
            {
                question: "¿Qué inteligencia artificial utiliza System Kyron?",
                answer: "System Kyron utiliza Kyron AI, potenciado por Claude de Anthropic — uno de los modelos de IA más avanzados del mundo. Claude se encarga de la generación de documentos legales, análisis fiscal predictivo, asistente contable, clasificación de residuos para eco-créditos y el chat inteligente disponible en toda la plataforma."
            },
            {
                question: "¿Cómo funciona la asesoría legal con IA?",
                answer: "Kyron AI genera borradores de contratos de trabajo, arrendamiento, poderes notariales, actas de asamblea y permisos ante CONATEL y SENIAT. También monitorea el vencimiento de poderes, marcas comerciales (SAPI) y documentos notariales (SAREN), alertándole con anticipación."
            },
            {
                question: "¿La IA puede analizar mis datos financieros?",
                answer: "Sí. Kyron AI analiza tendencias de ventas, categoriza transacciones automáticamente, genera proyecciones de flujo de caja, identifica oportunidades de ahorro fiscal y sugiere estrategias de negocio basadas en sus datos históricos. Todo desde el dashboard con un solo clic."
            },
        ]
    },
    {
        id: 'fiscal',
        title: 'Contabilidad y Fiscal',
        icon: Receipt,
        color: 'from-amber-500/15 to-amber-500/5',
        borderColor: 'border-amber-500/15',
        textColor: 'text-amber-400',
        questions: [
            {
                question: "¿Cómo garantizan el cumplimiento fiscal?",
                answer: "Monitoreamos la Gaceta Oficial con Kyron AI (potenciado por Claude de Anthropic). IVA 16%, IGTF 3% e ISLR se calculan automáticamente según la normativa VEN-NIF vigente. El sistema genera los libros de compra/venta y archivos .txt listos para el portal del SENIAT."
            },
            {
                question: "¿Cómo funciona la tasa BCV?",
                answer: "Se actualiza automáticamente cada día desde el Banco Central de Venezuela. Cada factura genera su equivalente en USD y EUR con la tasa BCV del momento, y el sistema calcula el IGTF (3%) en operaciones con divisas de forma instantánea."
            },
            {
                question: "¿Puedo conectar mis cuentas bancarias?",
                answer: "Sí. El módulo de Conexión Bancaria permite la conciliación automática, comparando sus registros contables con los movimientos bancarios. Se actualiza diariamente con la tasa BCV y reduce el tiempo de cuadre en un 80%."
            },
            {
                question: "¿Generan los libros de compra y venta del SENIAT?",
                answer: "Sí. El sistema genera automáticamente los libros de compra y venta en el formato requerido por el SENIAT, incluyendo los archivos .txt para carga directa en el portal fiscal. También calcula retenciones de IVA e ISLR según la normativa vigente."
            },
        ]
    },
    {
        id: 'rrhh',
        title: 'RRHH y Nómina',
        icon: Users,
        color: 'from-pink-500/15 to-pink-500/5',
        borderColor: 'border-pink-500/15',
        textColor: 'text-pink-400',
        questions: [
            {
                question: "¿Cómo funciona el módulo de nómina y RRHH?",
                answer: "El módulo calcula automáticamente nóminas con todos los aportes parafiscales (IVSS, FAOV, LPH, INCES) según la LOTTT. Incluye vacaciones, utilidades, prestaciones sociales, liquidaciones y envío de recibos de pago por WhatsApp con validez legal."
            },
            {
                question: "¿Calcula las prestaciones sociales automáticamente?",
                answer: "Sí. El sistema calcula prestaciones sociales según el artículo 142 de la LOTTT, incluyendo la garantía trimestral, los intereses sobre prestaciones al tipo BCV, y la liquidación final con ambos métodos de cálculo (retroactivo y trimestral) para aplicar el más favorable al trabajador."
            },
        ]
    },
    {
        id: 'telecom',
        title: 'Telecomunicaciones',
        icon: Smartphone,
        color: 'from-cyan-500/15 to-cyan-500/5',
        borderColor: 'border-cyan-500/15',
        textColor: 'text-cyan-400',
        questions: [
            {
                question: "¿Puedo activar la línea 5G / eSIM desde la plataforma?",
                answer: "Sí. El módulo Mi Línea 5G permite activar eSIM (chips digitales) en minutos mediante código QR, sin necesidad de ir a una tienda física. Las empresas pueden gestionar flotas de datos corporativas con control centralizado de consumo y priorización de red."
            },
            {
                question: "¿Cómo gestiono la flota empresarial de líneas?",
                answer: "Desde el módulo Mi Línea Empresa puede asignar, suspender y administrar todas las líneas corporativas en un panel centralizado. Controle el consumo de datos por empleado, establezca límites, priorice la red y reciba alertas de uso excesivo — todo en tiempo real."
            },
        ]
    },
    {
        id: 'sostenibilidad',
        title: 'Sostenibilidad y Eco-Créditos',
        icon: Leaf,
        color: 'from-green-500/15 to-green-500/5',
        borderColor: 'border-green-500/15',
        textColor: 'text-green-400',
        questions: [
            {
                question: "¿Qué es el sistema de Eco-Créditos?",
                answer: "Es nuestro módulo de sostenibilidad Ameru. Mediante puntos de reciclaje con tecnología de inducción magnética, los residuos se clasifican por IA y se convierten en Eco-Créditos digitales. Estos créditos pueden canjearse por servicios Kyron o intercambiarse en nuestro mercado interno de bonos verdes."
            },
            {
                question: "¿Cómo contribuye System Kyron al medio ambiente?",
                answer: "A través del módulo Ameru, las empresas pueden medir su huella de carbono, gestionar programas de reciclaje corporativo y obtener certificaciones ambientales. Los Eco-Créditos generados tienen valor económico real y fomentan una cultura de sostenibilidad dentro de la organización."
            },
        ]
    },
    {
        id: 'pagos',
        title: 'Pagos y Billetera Digital',
        icon: Wallet,
        color: 'from-orange-500/15 to-orange-500/5',
        borderColor: 'border-orange-500/15',
        textColor: 'text-orange-400',
        questions: [
            {
                question: "¿Tienen una Billetera Digital?",
                answer: "Sí. La Billetera Digital Kyron permite pagos instantáneos entre usuarios de la plataforma (P2P y B2B) sin comisiones. Los fondos pueden provenir de ventas, transferencias bancarias o del canje de Eco-Créditos. Cada transacción queda registrada de forma inmutable."
            },
            {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos transferencias bancarias de los 29 bancos venezolanos, pagos móviles, Zelle, PayPal, Binance Pay, criptomonedas, punto de venta, efectivo (USD/Bs) y la Billetera Digital Kyron. Cada transacción incluye el cálculo automático del IGTF cuando aplica."
            },
        ]
    },
    {
        id: 'soporte',
        title: 'Soporte y Capacitación',
        icon: Headphones,
        color: 'from-indigo-500/15 to-indigo-500/5',
        borderColor: 'border-indigo-500/15',
        textColor: 'text-indigo-400',
        questions: [
            {
                question: "¿Qué pasa si necesito soporte técnico?",
                answer: "Contamos con soporte multicanal: Kyron AI 24/7 (chat inteligente), tickets de servicio con seguimiento transparente y conexión directa con nuestro equipo de ingeniería. Nuestro compromiso es respuesta técnica inmediata."
            },
            {
                question: "¿Ofrecen capacitación para mi equipo?",
                answer: "Sí, a través de la Academia Kyron. Ofrecemos cursos certificados, tutoriales en video paso a paso, webinars sobre actualizaciones legales y una biblioteca técnica completa. Todo incluido en su plan sin costo adicional."
            },
            {
                question: "¿Tienen garantía de disponibilidad?",
                answer: "Nuestra infraestructura está diseñada para alta disponibilidad, con redundancia, backups automáticos diarios y monitoreo 24/7. En caso de incidentes, nuestro equipo de ingeniería interviene de forma inmediata para restaurar el servicio."
            },
        ]
    },
];

export default function FaqPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredCategories = faqCategories.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            searchQuery === '' ||
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat =>
        cat.questions.length > 0 &&
        (activeCategory === null || cat.id === activeCategory)
    );

    const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                <div className="bg-gradient-to-b from-background via-muted/50 to-transparent">
                    <div className="container mx-auto px-4 md:px-10 max-w-6xl pt-8 pb-16">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-8 group">
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            Volver al inicio
                        </Link>

                        <div className="text-center space-y-4 mb-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary mx-auto">
                                <MessageCircle className="h-3.5 w-3.5" />
                                Centro de Ayuda
                            </div>
                            <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight text-foreground uppercase leading-[1.1]">
                                Preguntas{' '}
                                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic">
                                    Frecuentes
                                </span>
                            </h1>
                            <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto">
                                Encuentra respuestas detalladas sobre cada módulo de System Kyron. {totalQuestions} preguntas organizadas en {faqCategories.length} categorías.
                            </p>
                        </div>

                        <div className="max-w-xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                <input
                                    type="text"
                                    placeholder="Buscar en las preguntas frecuentes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/30 bg-card/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border ${
                                    activeCategory === null
                                        ? 'bg-primary/10 border-primary/30 text-primary'
                                        : 'bg-card/30 border-border/20 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                                }`}
                            >
                                Todas ({totalQuestions})
                            </button>
                            {faqCategories.map(cat => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border ${
                                            activeCategory === cat.id
                                                ? 'bg-primary/10 border-primary/30 text-primary'
                                                : 'bg-card/30 border-border/20 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                                        }`}
                                    >
                                        <Icon className="h-3 w-3" />
                                        {cat.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-10 max-w-4xl pb-20 -mt-2">
                    {filteredCategories.length === 0 ? (
                        <div className="text-center py-16">
                            <Search className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                            <p className="text-muted-foreground text-sm">No se encontraron resultados para &ldquo;{searchQuery}&rdquo;</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                                className="mt-3 text-primary text-xs font-semibold hover:underline"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {filteredCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <section key={category.id} id={category.id}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${category.color} border ${category.borderColor} flex items-center justify-center shrink-0`}>
                                                <Icon className={`h-4.5 w-4.5 ${category.textColor}`} />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-semibold uppercase tracking-tight text-foreground">
                                                    {category.title}
                                                </h2>
                                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                                    {category.questions.length} {category.questions.length === 1 ? 'pregunta' : 'preguntas'}
                                                </p>
                                            </div>
                                        </div>

                                        <Accordion type="single" collapsible className="w-full space-y-3">
                                            {category.questions.map((item, index) => (
                                                <AccordionItem
                                                    key={index}
                                                    value={`${category.id}-${index}`}
                                                    className="border border-border/30 rounded-2xl px-6 overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-500 hover:border-primary/20 hover:shadow-lg data-[state=open]:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:bg-card/70"
                                                >
                                                    <AccordionTrigger className="text-left hover:no-underline py-4">
                                                        <span className="text-xs md:text-sm font-bold text-foreground/90 leading-snug">
                                                            {item.question}
                                                        </span>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed border-t border-border/15 pt-4">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </section>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <div className="inline-block p-8 rounded-3xl border border-border/20 bg-card/30">
                            <Headphones className="h-8 w-8 text-primary/60 mx-auto mb-3" />
                            <h3 className="text-sm font-semibold uppercase tracking-tight text-foreground mb-1">
                                ¿No encontraste tu respuesta?
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">
                                Nuestro equipo de soporte y Kyron AI están disponibles 24/7 para ayudarte.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/login">
                                    <Button className="h-10 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-wider">
                                        Contactar Soporte
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" className="h-10 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-wider border-border/30">
                                        Volver al inicio
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
