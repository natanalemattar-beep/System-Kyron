
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Megaphone, Search, Newspaper, Share2, Target, CheckCircle, ArrowRight, Bot, Star, Rocket } from "lucide-react";
import Link from "next/link";

const salesFunnel = [
    {
        stage: "Atracción (Awareness)",
        description: "El objetivo es atraer a desconocidos y convertirlos en visitantes. Es la parte más ancha del embudo.",
        tactics: ["Optimización SEO para aparecer en Google.", "Crear contenido de valor en un blog.", "Publicar en redes sociales (LinkedIn, Instagram)."]
    },
    {
        stage: "Interés (Interest)",
        description: "Una vez que te conocen, debes despertar su interés. El visitante investiga y compara.",
        tactics: ["Ofrecer guías, eBooks o webinars gratuitos a cambio de su email.", "Casos de estudio y testimonios de clientes.", "Demostraciones de producto."]
    },
    {
        stage: "Decisión (Decision)",
        description: "El prospecto está listo para comprar, pero evalúa sus opciones. Aquí debes diferenciarte.",
        tactics: ["Ofertas personalizadas o descuentos por tiempo limitado.", "Consultas gratuitas para resolver sus dudas finales.", "Comparativas detalladas con la competencia."]
    },
    {
        stage: "Acción (Action)",
        description: "El objetivo final: convertir al prospecto en cliente. El proceso de compra debe ser fácil y sin fricciones.",
        tactics: ["Llamadas a la acción (CTA) claras como 'Comprar Ahora' o 'Registrarse'.", "Proceso de checkout simplificado.", "Garantías de satisfacción o períodos de prueba."]
    },
];

const marketingChannels = [
    { title: "SEO (Search Engine Optimization)", description: "Optimizar tu sitio web para que aparezca en los primeros resultados de Google cuando alguien busca 'software contable en Venezuela'." },
    { title: "Marketing de Contenidos", description: "Crear artículos de blog, guías y videos que resuelvan los problemas de tu público objetivo (Ej: 'Cómo declarar IVA como contribuyente especial')." },
    { title: "Redes Sociales", description: "Utilizar LinkedIn para conectar con gerentes y dueños de empresas, e Instagram para mostrar el lado humano de tu marca y casos de éxito." },
];

const launchPlan = [
    { stage: "1. Pre-Lanzamiento (Expectativa)", description: "Crear anticipación. Publicar 'teasers' en redes, enviar correos a una lista VIP anunciando una 'nueva solución' sin dar todos los detalles." },
    { stage: "2. Lanzamiento (Anuncio)", description: "El día del lanzamiento, publicar en todos los canales: nota de prensa, post de blog detallado, campaña de email y publicaciones coordinadas en redes sociales." },
    { stage: "3. Post-Lanzamiento (Sostenimiento)", description: "Recopilar testimonios de los primeros clientes, publicar casos de estudio, crear tutoriales en video y mantener la conversación activa." }
];

export default function MarketingVentasPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Megaphone className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Diseño de Marketing y Avisos de Productos</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Una guía estratégica para atraer clientes, estructurar tu proceso de ventas y lanzar nuevos productos de manera exitosa.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Target className="h-6 w-6"/> El Embudo de Ventas y Marketing</CardTitle>
          <CardDescription>Desde que un cliente te descubre hasta que te compra, pasa por un viaje. Entenderlo es clave para vender más.</CardDescription>
        </CardHeader>
        <CardContent>
             <Accordion type="single" collapsible className="w-full">
                {salesFunnel.map((item) => (
                     <AccordionItem value={item.stage} key={item.stage}>
                        <AccordionTrigger>{item.stage}</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-muted-foreground mb-4">{item.description}</p>
                           <h4 className="font-semibold mb-2">Tácticas recomendadas:</h4>
                           <ul className="list-disc pl-5 space-y-2 text-sm">
                                {item.tactics.map(tactic => <li key={tactic}>{tactic}</li>)}
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Canales Clave de Marketing</CardTitle>
                <CardDescription>Dónde encontrar a tus clientes potenciales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {marketingChannels.map(channel => (
                    <div key={channel.title}>
                        <h4 className="font-semibold">{channel.title}</h4>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Plan de Lanzamiento de Productos</CardTitle>
                <CardDescription>Cómo anunciar una nueva característica o producto.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ol className="list-decimal list-inside space-y-4">
                    {launchPlan.map(step => (
                        <li key={step.stage}>
                            <span className="font-semibold">{step.stage}:</span>
                            <p className="text-sm text-muted-foreground pl-4">{step.description}</p>
                        </li>
                    ))}
                 </ol>
            </CardContent>
        </Card>
      </div>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Bot className="h-6 w-6"/> Marketing Potenciado por IA</CardTitle>
            <CardDescription>Usa la Inteligencia Artificial para llevar tu marketing al siguiente nivel.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/50 rounded-lg">
                <Star className="h-6 w-6 text-yellow-400 mb-2"/>
                <h4 className="font-semibold">Personalización a Escala</h4>
                <p className="text-sm text-muted-foreground">La IA puede analizar el comportamiento del cliente para enviar correos y ofertas personalizadas, aumentando la probabilidad de conversión.</p>
            </div>
             <div className="p-4 bg-secondary/50 rounded-lg">
                <BarChart className="h-6 w-6 text-blue-400 mb-2"/>
                <h4 className="font-semibold">Análisis Predictivo</h4>
                <p className="text-sm text-muted-foreground">Anticípate a las necesidades de tus clientes. La IA puede predecir qué clientes tienen más probabilidad de comprar o de abandonar el servicio.</p>
            </div>
             <div className="p-4 bg-secondary/50 rounded-lg">
                <Newspaper className="h-6 w-6 text-green-400 mb-2"/>
                <h4 className="font-semibold">Generación de Contenido</h4>
                <p className="text-sm text-muted-foreground">Usa la IA para generar borradores de artículos de blog, publicaciones para redes sociales y copys para anuncios, acelerando tu producción de contenido.</p>
            </div>
        </CardContent>
         <CardFooter>
            <Button asChild>
                <Link href="/soluciones-ia">
                    Explorar Soluciones de IA <ArrowRight className="ml-2"/>
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
