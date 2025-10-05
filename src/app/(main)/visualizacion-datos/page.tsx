
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AreaChart, Eye, Share2, Database, HelpCircle, BarChart, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
    {
        title: "Flexible",
        description: "Visualice datos instantáneamente eligiendo entre una variedad de gráficos y tablas que se adapten a sus necesidades, incluidos gráficos circulares, de barras, de líneas, de burbujas, indicadores y más.",
        icon: BarChart
    },
    {
        title: "Compartible",
        description: "La información de tus datos es aún más impactante cuando se comparte. Integra visualizaciones en un panel, compártelas con equipos o envíalas por correo electrónico.",
        icon: Share2
    },
    {
        title: "Todos tus datos juntos",
        description: "Conecta todas tus fuentes de datos (ERP, CRM, RR.HH.) para crear una visión integral y actualizada que beneficie a todos al instante.",
        icon: Database
    },
];

const faqItems = [
    {
        question: "¿Qué es la visualización de datos?",
        answer: "Es la representación de datos en formato visual (gráficos, mapas) para ayudar a los usuarios a comprender, interpretar y extraer información de forma más eficaz."
    },
    {
        question: "¿Qué es una visualización interactiva?",
        answer: "Es un elemento de un tablero (un gráfico, un filtro) que permite a las personas hacer clic, interactuar y explorar la información para obtener información adicional."
    },
    {
        question: "¿Es Excel una herramienta de visualización de datos?",
        answer: "Sí, hasta cierto punto. Excel ofrece funciones básicas para crear gráficos y tablas, pero tiene limitaciones con grandes conjuntos de datos y la interactividad en comparación con software especializado."
    },
    {
        question: "¿Cuáles son las mejores herramientas de visualización de datos?",
        answer: "Herramientas líderes como Tableau, Microsoft Power BI y Phocas Analytics ofrecen potentes capacidades de visualización, análisis en tiempo real y paneles interactivos que se adaptan a diversas necesidades empresariales."
    }
];

export default function VisualizacionDatosPage() {

    return (
        <div className="space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <AreaChart className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Muestra en Lugar de Contar: La Historia Detrás de Tus Datos</h1>
                <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Las potentes herramientas de visualización de datos, con gráficos y mapas de calor, ayudan a contar una historia clara sobre tu negocio de forma personalizable e interactiva.
                </p>
            </header>

             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Eye className="h-6 w-6 text-primary"/>
                        Visualizaciones de Datos Interactivas: Construye una Imagen Real
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-muted-foreground mb-4">
                            Al conectar manualmente datos empresariales de múltiples fuentes, encontrar la clave puede ser un desafío. Crear paneles compartibles y gráficos interactivos con la función de arrastrar y soltar permite a todos acceder y ver los datos que necesitan.
                        </p>
                        <Image 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop"
                            alt="Dashboard con gráficos interactivos"
                            data-ai-hint="interactive dashboard"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                     <div className="p-6 bg-secondary/30 rounded-lg">
                        <h4 className="font-semibold text-lg mb-4">¡Momentos Ajá! Obtén Información que Cambie tu Negocio</h4>
                        <p className="text-muted-foreground mb-4">
                           El verdadero beneficio de poder visualizar e interactuar con la información crítica de su empresa es obtener información que mejorará su toma de decisiones basada en datos. Esto le ayudará a responder preguntas clave como:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                <span>¿Por qué las ventas tienden a la baja?</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                <span>¿Cuál es mi inventario de alta rotación?</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Analiza los Datos Subyacentes: Explora, Pivota y Profundiza</CardTitle>
                    <CardDescription>
                        Pase rápidamente de las visualizaciones al análisis de datos: segmente las métricas como desee, formulando y respondiendo preguntas sobre la marcha. Con todos sus datos reunidos en una única herramienta de análisis, crear gráficos de barras y gráficos fáciles de entender es esencial.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    {features.map(feature => (
                        <div key={feature.title} className="p-6 bg-secondary/40 rounded-lg">
                            <feature.icon className="h-8 w-8 text-primary mb-3"/>
                            <h4 className="font-semibold text-lg">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <section>
                 <h2 className="text-2xl font-semibold mb-8 text-center">Preguntas Frecuentes</h2>
                 <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    {faqItems.map((item, index) => (
                         <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border rounded-lg mb-2 px-4">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <HelpCircle className="h-5 w-5 text-primary" />
                                    <span>{item.question}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <Card className="bg-gradient-to-r from-primary/80 to-cyan-500/80 text-primary-foreground">
                <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-bold">Comprende el Pasado, Opera Mejor Hoy y Planifica para el Futuro</h2>
                        <p className="mt-2 opacity-80 max-w-2xl">
                           Ya sea que desee organizar sus datos, combinar inteligencia de negocio con informes financieros o planificar pronósticos... podemos ayudarlo.
                        </p>
                    </div>
                    <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80 shrink-0">
                        Obtener una Demostración <ArrowRight className="ml-2"/>
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
}
