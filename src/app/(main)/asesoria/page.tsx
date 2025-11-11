
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Ship, CandlestickChart, Gavel, FileText, Briefcase } from "lucide-react";
import Link from "next/link";

const advisoryModules = [
    {
        title: "Asesoría de Inversión en Bolsa",
        description: "Análisis de mercado, oportunidades de inversión y alertas generadas por IA para la gestión de capital.",
        icon: CandlestickChart,
        href: "/asesoria-bolsa-valores"
    },
    {
        title: "Asesoría en Importaciones y Logística",
        description: "Guía integral sobre el proceso de importación, consolidación de carga y optimización de costos.",
        icon: Ship,
        href: "/asesoria-importaciones"
    },
    {
        title: "Asesoría y Ventas con Agente IA",
        description: "Implementa un asistente virtual para agendar citas, cerrar ventas e informar sobre tus servicios.",
        icon: Megaphone,
        href: "/asesoria-publicidad"
    },
     {
        title: "Asesoría Legal y Corporativa",
        description: "Accede a guías y herramientas para la gestión legal, cumplimiento normativo y estrategia corporativa.",
        icon: Gavel,
        href: "/departamento-juridico"
    },
    {
        title: "Propuesta de Proyecto y Consultoría",
        description: "Modelos para la elaboración de propuestas de proyectos, estudios de mercado y planes de negocio.",
        icon: FileText,
        href: "/propuesta-proyecto"
    },
    {
        title: "Análisis Estratégico",
        description: "Diagnóstico FODA, CAME y PESTLE para la toma de decisiones y planificación estratégica.",
        icon: Briefcase,
        href: "/analisis-estrategico"
    },
];

export default function AsesoriaPage() {
  return (
    <div>
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Megaphone className="h-8 w-8" />
            Centro de Asesoría Estratégica
        </h1>
        <p className="text-muted-foreground mt-2">
          Potencia tu toma de decisiones con nuestras herramientas de análisis y consultoría.
        </p>
      </header>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {advisoryModules.map((module) => (
            <Card key={module.title} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <module.icon className="h-6 w-6 text-primary" />
                        {module.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{module.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={module.href}>
                            Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
