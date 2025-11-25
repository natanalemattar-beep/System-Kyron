
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Presentation, Lightbulb, CheckCircle, Trophy, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const pitchDeckSections = [
    {
        title: "1. El Problema: ¿Qué Dolor Resuelves?",
        content: "Define claramente el problema que tu startup está solucionando. ¿Es un problema real, urgente y relevante para un grupo específico de personas? Cuantifica el dolor si es posible (ej. 'Las empresas pierden X horas al mes en...')."
    },
    {
        title: "2. La Solución: Tu Propuesta de Valor",
        content: "Presenta tu producto o servicio como la solución directa y eficaz al problema planteado. Explica de forma sencilla cómo funciona y por qué es mejor que las alternativas existentes."
    },
    {
        title: "3. Modelo de Negocio: ¿Cómo Generas Ingresos?",
        content: "Describe cómo planeas ganar dinero. ¿Es a través de suscripciones (SaaS), ventas únicas, comisiones, publicidad? Sé claro y específico sobre tu estrategia de precios."
    },
    {
        title: "4. Mercado y Oportunidad",
        content: "Define el tamaño de tu mercado (TAM, SAM, SOM). Demuestra que hay una oportunidad de mercado lo suficientemente grande como para construir un negocio escalable y rentable."
    },
    {
        title: "5. Equipo Fundador",
        content: "Presenta a los miembros clave del equipo. Destaca la experiencia y las habilidades relevantes que los hacen las personas adecuadas para ejecutar esta visión. Los inversores apuestan por el equipo tanto como por la idea."
    },
    {
        title: "6. Tracción y Progreso (Tracción)",
        content: "Muestra lo que has logrado hasta ahora. Esto puede incluir usuarios activos, ingresos, clientes piloto, asociaciones estratégicas o hitos de desarrollo de producto. La tracción es la prueba de que tu idea tiene potencial."
    },
    {
        title: "7. Análisis Competitivo",
        content: "Identifica a tus competidores directos e indirectos. Explica por qué tu solución es diferente y tiene una ventaja competitiva sostenible (tu 'foso' o 'moat')."
    },
    {
        title: "8. Proyecciones Financieras",
        content: "Presenta proyecciones financieras realistas para los próximos 3-5 años. Incluye supuestos clave sobre ingresos, costos y crecimiento de usuarios. Demuestra que entiendes los números de tu negocio."
    },
    {
        title: "9. La Petición (The Ask)",
        content: "Sé muy claro sobre lo que estás pidiendo. ¿Cuánto dinero buscas levantar? ¿Para qué utilizarás los fondos? ¿Qué hitos clave alcanzarás con esta inversión?"
    },
    {
        title: "10. Visión a Largo Plazo",
        content: "Termina con una visión inspiradora. ¿A dónde quieres llevar la empresa en 5 o 10 años? Muestra ambición y un plan de cómo tu startup puede dominar su mercado."
    },
];

export default function PresentacionStartupPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Trophy className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Pitch Deck Ganador: Los 10 Recaudos Esenciales</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Una guía con la estructura probada que toda startup necesita para destacar y captar la atención de jurados e inversores en eventos como el Startup Venezuela Summit.
        </p>
      </header>

       <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle>Prepárate para el "Startup Venezuela Summit"</CardTitle>
                <CardDescription>Eventos como el Startup Venezuela Summit tienen un "Pitch Competition" donde las mejores startups compiten. Un pitch deck sólido, que siga los 10 recaudos de esta guía, es tu herramienta clave para destacar, comunicar tu valor y ganar.</CardDescription>
            </CardHeader>
            <CardFooter>
                 <Button asChild>
                    <Link href="/ferias-eventos">
                        Ver Detalles del Evento <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </CardFooter>
        </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Los 10 Recaudos de un Pitch Deck Exitoso</CardTitle>
            <CardDescription>
                Esta es la estructura probada que siguen las startups más exitosas para contar su historia de forma clara, concisa y convincente.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {pitchDeckSections.map((section, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg">{section.title}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {section.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>

      <Alert>
        <Lightbulb className="h-4 w-4"/>
        <AlertTitle>El Poder del Storytelling</AlertTitle>
        <AlertDescription>
            Recuerda que no solo estás presentando datos, estás contando una historia. Conecta el problema, la solución y tu visión en una narrativa coherente que inspire confianza y emoción.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Diseño y Visualización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/> <span>Mantén un diseño limpio, profesional y consistente con tu marca.</span></p>
                <p className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/> <span>Utiliza gráficos y visualizaciones para hacer los datos más digeribles.</span></p>
                <p className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/> <span>Una diapositiva, una idea. Evita sobrecargar tus slides con texto.</span></p>
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Consejos Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/> <span>Practica tu presentación hasta que puedas hacerla de forma natural y segura.</span></p>
                <p className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/> <span>Conoce tus números a la perfección. Prepárate para preguntas detalladas.</span></p>
                <p className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/> <span>Ten un anexo con información más detallada por si los inversores quieren profundizar.</span></p>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
