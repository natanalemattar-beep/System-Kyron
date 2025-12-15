
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Database, BarChart, TrendingUp, Cpu, Users, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

const biFeatures = [
    {
        title: "Recopilación de Datos",
        description: "Reúne datos de todas las fuentes de tu empresa (ventas, finanzas, marketing, RR.HH.) en un solo lugar.",
        icon: Database
    },
    {
        title: "Procesamiento y Análisis",
        description: "Limpia, estructura y analiza los datos para encontrar tendencias, patrones y anomalías.",
        icon: Cpu
    },
    {
        title: "Visualización e Informes",
        description: "Presenta los hallazgos en dashboards interactivos, gráficos y reportes fáciles de entender.",
        icon: BarChart
    },
    {
        title: "Toma de Decisiones",
        description: "Permite a los líderes tomar decisiones estratégicas basadas en evidencia y no en intuición.",
        icon: Target
    }
];

const kyronBiBenefits = [
    {
        title: "Visión 360° en Tiempo Real",
        description: "Kyron integra datos de facturación, inventario, nómina y contabilidad, ofreciendo un panorama completo y actualizado de la salud de tu negocio al instante."
    },
    {
        title: "Inteligencia Predictiva",
        description: "Más allá de mostrar qué pasó, nuestra IA analiza tendencias para predecir el flujo de caja, anticipar quiebres de stock y alertar sobre riesgos fiscales antes de que ocurran."
    },
    {
        title: "Accesibilidad para Todos",
        description: "Traducimos datos complejos en dashboards sencillos y accionables, permitiendo que cualquier gerente, no solo los analistas, pueda tomar decisiones informadas."
    },
    {
        title: "Eficiencia Operativa",
        description: "Al automatizar la recopilación y el análisis de datos, liberamos a tu equipo para que se enfoque en la estrategia y no en la creación manual de reportes."
    },
];

export default function InteligenciaNegocioPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Lightbulb className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Inteligencia de Negocio (Business Intelligence)</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Transforma los datos crudos de tu empresa en conocimiento accionable para tomar decisiones más inteligentes y rápidas.
        </p>
      </header>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>¿Qué es la Inteligencia de Negocio (BI)?</CardTitle>
            <CardDescription>
                La Inteligencia de Negocio es el conjunto de procesos, tecnologías y herramientas que permiten a una empresa recopilar, analizar y presentar información relevante de su operación para mejorar y optimizar su toma de decisiones. En esencia, convierte los datos en conocimiento.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {biFeatures.map(feature => (
                <div key={feature.title} className="p-4 bg-secondary/50 rounded-lg text-center">
                    <feature.icon className="h-10 w-10 text-primary mx-auto mb-4"/>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
            ))}
        </CardContent>
      </Card>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Kyron como tu Plataforma de Inteligencia de Negocio</CardTitle>
            <CardDescription>
                Kyron no es solo un sistema administrativo; es una potente herramienta de BI diseñada para el empresario venezolano.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            {kyronBiBenefits.map(benefit => (
                <div key={benefit.title} className="p-6 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
            ))}
        </CardContent>
       </Card>

        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle>De la Contabilidad Reactiva a la Gestión Predictiva</CardTitle>
                <CardDescription>
                    Deja de mirar solo el pasado. Con Kyron, puedes anticipar el futuro y tomar el control de tu negocio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Nuestra visión es que cada decisión, desde la compra de inventario hasta la planificación de una expansión, esté respaldada por datos y análisis inteligentes.
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href="/ventas/analisis-ventas">
                        Explorar Dashboards de Análisis <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </CardFooter>
       </Card>

    </div>
  );
}
