
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Search, Newspaper, Share2, Bot, ArrowRight, CheckCircle, BarChart, Globe, Mail, Users, Video, Gift, Star, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

const strategies = [
    {
        title: "Marketing de Contenidos",
        description: "Crear y compartir contenido valioso (blogs, videos, podcasts) para atraer y retener a una audiencia.",
        icon: Newspaper
    },
    {
        title: "SEO (Search Engine Optimization)",
        description: "Optimizar el sitio web para que aparezca en los primeros resultados de búsqueda orgánica en motores como Google.",
        icon: Search
    },
    {
        title: "Publicidad en Redes Sociales y Online",
        description: "Utilizar plataformas como Facebook, Instagram y Google Ads para llegar a públicos específicos.",
        icon: Share2
    },
     {
        title: "Email Marketing",
        description: "Enviar correos electrónicos personalizados para nutrir leads y generar ventas, utilizando listas de suscripción.",
        icon: Mail
    },
     {
        title: "Marketing de Influencers",
        description: "Colaborar con personas influyentes para promocionar productos o servicios a su audiencia.",
        icon: Users
    },
     {
        title: "Marketing de Afiliados",
        description: "Asociarse con otras empresas o individuos que ganan una comisión por cada venta o lead que generan para tu negocio.",
        icon: LinkIcon
    },
    {
        title: "Contenido de Video Corto",
        description: "Crear y publicar videos de formato corto y dinámico (TikTok, Reels) para captar la atención con 'ganchos' visuales.",
        icon: Video
    },
    {
        title: "Marketing Conversacional",
        description: "Implementar chatbots para interactuar con los clientes en tiempo real, respondiendo preguntas y guiando a los usuarios.",
        icon: Bot
    },
    {
        title: "Relaciones Públicas",
        description: "Gestionar la comunicación de la marca con el público y los medios para construir una reputación positiva.",
        icon: Megaphone
    },
    {
        title: "Programas de Fidelización",
        description: "Incentivar la repetición de compras y la lealtad del cliente a través de recompensas y ofertas exclusivas.",
        icon: Gift
    }
];

const benefits = [
    {
        title: "Medición y Análisis",
        description: "Rastrea métricas clave como clics, conversiones y retorno de la inversión (ROI) en tiempo real para optimizar tus campañas."
    },
    {
        title: "Personalización y Segmentación",
        description: "Adapta el mensaje a audiencias específicas para mejorar la relevancia y el impacto de tus comunicaciones."
    },
    {
        title: "Flexibilidad y Coste Adaptativo",
        description: "Ajusta las campañas y el presupuesto sobre la marcha, haciendo que el marketing sea accesible para cualquier tamaño de empresa."
    }
];


export default function MarketingVentasPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Megaphone className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Guía Completa de Marketing Digital</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          El marketing digital es el conjunto de estrategias que utilizan herramientas digitales para promocionar productos y servicios, permitiendo una personalización y medición sin precedentes.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">10 Estrategias de Marketing Efectivas</CardTitle>
          <CardDescription>Desde la creación de contenido hasta la automatización con IA, estos son los pilares de una estrategia digital exitosa.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
                <div key={strategy.title} className="p-4 bg-secondary/50 rounded-lg">
                    <strategy.icon className="h-8 w-8 text-primary mb-3"/>
                    <h4 className="font-semibold">{strategy.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                </div>
            ))}
        </CardContent>
      </Card>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Beneficios Clave del Marketing Digital</CardTitle>
            <CardDescription>Descubre por qué el marketing digital es indispensable para el crecimiento de tu negocio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {benefits.map(benefit => (
                <div key={benefit.title} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 shrink-0"/>
                    <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                </div>
            ))}
        </CardContent>
      </Card>

       <Card className="bg-gradient-to-r from-primary/80 to-cyan-500/80 text-primary-foreground">
         <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h2 className="text-3xl font-bold">Potencia tu Estrategia con IA</h2>
                <p className="mt-2 opacity-80 max-w-2xl">
                    Utiliza nuestras herramientas de inteligencia artificial para analizar el sentimiento de tus clientes, automatizar la entrada de datos y mucho más.
                </p>
            </div>
             <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80 shrink-0" asChild>
                <Link href="/soluciones-ia">
                    Explorar Soluciones de IA <ArrowRight className="ml-2"/>
                </Link>
            </Button>
         </CardContent>
       </Card>
    </div>
  );
}
