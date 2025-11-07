
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Target, TrendingUp, Zap, AlertTriangle, Lightbulb, Users, BarChart, ShoppingCart, DollarSign, CheckCircle, Award, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const swot = {
    fortalezas: ["Producto necesario", "Ahorro de tiempo", "Reduce errores", "Cumplimiento legal garantizado"],
    oportunidades: ["Obligatoriedad de facturación electrónica", "Altas sanciones del SENIAT", "Digitalización de PYMES"],
    debilidades: ["Competencia establecida", "Necesidad de constante actualización", "Curva de aprendizaje para usuarios"],
    amenazas: ["Cambios en la normativa", "Competencia con precios bajos", "Desconfianza en sistemas nuevos"],
};

const publicoObjetivo = [
    { title: "Pymes y Pequeños Negocios", description: "Dueños que no son expertos en impuestos y ven la facturación como un dolor de cabeza." },
    { title: "Emprendedores y Nuevos Contribuyentes", description: "Personas que necesitan empezar con el pie derecho y buscan una solución todo-en-uno." },
    { title: "Contadores Independientes", description: "Que buscan una herramienta confiable para recomendar y gestionar a sus clientes." },
];

const marketingPhases = [
    {
        title: "Fase 1: Lanzamiento y Construcción de Autoridad",
        content: [
            "Contenido Educativo: Crear guías y blogs sobre cómo cumplir con el SENIAT.",
            "Webinars: Realizar seminarios gratuitos para capturar emails de potenciales clientes.",
            "Landing Page: Página de lanzamiento para generar una lista de espera.",
            "Redes Sociales: Compartir tips fiscales y mostrar el proceso de homologación para generar confianza."
        ]
    },
    {
        title: "Fase 2: Captación y Conversión",
        content: [
            "Website Profesional: Página de ventas clara, testimonios y una prueba gratuita o demo.",
            "Chat en Vivo: Para resolver dudas de ventas y soporte en tiempo real.",
            "Casos de Éxito: Publicar historias de clientes que han tenido éxito con el sistema.",
            "Publicidad Pagada: Campañas en Google y redes sociales segmentadas a dueños de PYMES y contadores.",
            "Alianzas con Contadores: Ofrecer comisiones y precios especiales para que recomienden el sistema."
        ]
    },
    {
        title: "Fase 3: Fidelización y Expansión",
        content: [
            "Onboarding Impecable: Un proceso de bienvenida guiado para asegurar el uso correcto del sistema.",
            "Soporte y Asesoría de Primera: Resolver dudas no solo del software, sino fiscales básicas.",
            "Email Marketing Nutritivo: Enviar recordatorios de obligaciones fiscales y novedades.",
            "Programas de Referidos: Incentivar a clientes satisfechos a que recomienden el sistema."
        ]
    }
];

const marketingMix = [
    { p: "Producto", description: "Paquetes claros (Básico, Profesional) con la asesoría fiscal como diferenciador clave." },
    { p: "Precio", description: "Modelo de suscripción transparente con descuento anual y un plan de prueba gratuito (trial)." },
    { p: "Plaza", description: "Venta directa online a través del sitio web y venta indirecta a través de una red de contadores aliados." },
    { p: "Promoción", description: "Marketing de contenidos, publicidad online, marketing de afiliados y programas de referidos." },
];

const kpis = ["Tasa de Conversión de la Web", "Costo de Adquisición de Cliente (CAC)", "Tasa de Abandono (Churn)", "Valor de Vida del Cliente (LTV)", "Satisfacción del Cliente (CSAT/NPS)"];

export default function CumplimientoFiscalPage() {
  return (
    <div className="p-4 md:p-8 space-y-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <ShieldCheck className="h-10 w-10 text-primary" />
            Estrategia de Marketing: "Más que Facturas, Tranquilidad Fiscal"
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Un plan integral para posicionar un sistema de facturación homologado en Venezuela, enfocado en generar confianza y vender seguridad jurídica.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Análisis Situacional (FODA)</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-green-500/10 rounded-lg">
                <h4 className="font-semibold text-green-600 flex items-center gap-2 mb-2"><Zap/>Fortalezas</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {swot.fortalezas.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
             <div className="p-4 bg-blue-500/10 rounded-lg">
                <h4 className="font-semibold text-blue-600 flex items-center gap-2 mb-2"><Lightbulb/>Oportunidades</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {swot.oportunidades.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
             <div className="p-4 bg-yellow-500/10 rounded-lg">
                <h4 className="font-semibold text-yellow-600 flex items-center gap-2 mb-2"><TrendingUp/>Debilidades</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {swot.debilidades.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
             <div className="p-4 bg-red-500/10 rounded-lg">
                <h4 className="font-semibold text-red-600 flex items-center gap-2 mb-2"><AlertTriangle/>Amenazas</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {swot.amenazas.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target/>Público Objetivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {publicoObjetivo.map(item => (
                    <div key={item.title} className="p-3 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Fases de la Estrategia de Marketing</CardTitle>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    {marketingPhases.map((phase) => (
                        <AccordionItem value={phase.title} key={phase.title}>
                            <AccordionTrigger>{phase.title}</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {phase.content.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Mix de Marketing (Las 4 P's)</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingMix.map(item => (
                <div key={item.p} className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold text-primary text-lg mb-2">{item.p}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            ))}
        </CardContent>
       </Card>

      <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Métricas Clave de Éxito (KPIs)</CardTitle>
                    <CardDescription>Indicadores para medir la efectividad de la estrategia.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {kpis.map(item => (
                            <li key={item} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-md">
                                <BarChart className="h-5 w-5 text-primary"/>
                                <span className="font-medium text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary">Conclusión Estratégica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        La estrategia debe girar en torno a construir confianza. En un tema tan sensible como los impuestos, las empresas no compran un software, compran la seguridad de no tener problemas con el fisco.
                    </p>
                     <p className="font-semibold">
                       Al combinar un producto técnicamente sólido (homologado) con una capa humana (asesoría) y una comunicación educativa, tu estrategia no solo venderá, sino que construirá una marca líder y respetada.
                    </p>
                     <Button asChild>
                        <a href="#">Solicitar Demo <ArrowRight className="ml-2"/></a>
                     </Button>
                </CardContent>
            </Card>
      </div>

    </div>
  );
}
