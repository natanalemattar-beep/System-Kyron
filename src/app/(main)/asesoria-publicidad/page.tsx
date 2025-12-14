
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, BarChart, Users, DollarSign, Lightbulb } from "lucide-react";
import Link from "next/link";

const kpiData = [
    { title: "Campañas Activas", value: "5", icon: Megaphone },
    { title: "Leads Generados (Mes)", value: "280", icon: Users },
    { title: "Costo por Adquisición (CPA)", value: "$12.50", icon: DollarSign },
    { title: "Tasa de Conversión", value: "4.2%", icon: BarChart },
];

const quickActions = [
    { title: "Crear Nueva Campaña", description: "Lanza una nueva iniciativa de marketing para productos o servicios.", href: "#" },
    { title: "Analizar Rendimiento", description: "Revisa las métricas y el ROI de tus campañas activas.", href: "#" },
    { title: "Gestionar Contenido", description: "Planifica y publica contenido en blogs y redes sociales.", href: "#" },
];

export default function AsesoriaPublicidadPage() {

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Megaphone className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Marketing y Publicidad
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Centro de mando para la gestión de campañas, análisis de rendimiento y estrategia de marketing.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(kpi => (
             <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Rendimiento de Campañas</CardTitle>
                    <CardDescription>Visualización del rendimiento de las campañas activas este mes.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for a chart */}
                    <div className="h-80 w-full bg-secondary rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Gráfico de rendimiento de campañas</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
             <h3 className="text-xl font-semibold tracking-tight">Acciones Rápidas</h3>
             {quickActions.map(action => (
                 <Card key={action.title} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-base">{action.title}</CardTitle>
                        <CardDescription className="text-xs">{action.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button asChild className="w-full">
                            <Link href={action.href}>
                                Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
             ))}
        </div>
      </div>
       <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb/> Recomendación Estratégica con IA</CardTitle>
        </CardHeader>
        <CardContent>
            <p>
                Basado en el bajo rendimiento de la campaña "Lanzamiento Verano", se recomienda reasignar el 30% de su presupuesto a la campaña "Clientes Corporativos", que actualmente tiene un ROI 2.5x superior.
            </p>
        </CardContent>
        <CardFooter>
            <Button>Aplicar Recomendación</Button>
        </CardFooter>
       </Card>

    </div>
  );
}
