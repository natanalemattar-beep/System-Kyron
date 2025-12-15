
      
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Bell, Users, BarChart, FileText, BrainCircuit, Bot, Database, BarChart2, BookOpen, Lightbulb, PieChart, Repeat, Send, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const coreFeatures = [
    {
        icon: Bell,
        title: "Automatización de Recordatorios",
        description: "Sistema inteligente que envía alertas automáticas para renovaciones de cartera (evitando pérdida de comisiones), recordatorios de cuentas por cobrar a clientes y notificaciones de cuentas por pagar a contabilidad y gerencia."
    },
    {
        icon: Users,
        title: "Seguimiento de Clientes y Prospectos",
        description: "Un CRM integrado para gestionar todo el ciclo de vida del cliente, desde el prospecto hasta la renovación, mejorando la comunicación y la retención."
    },
    {
        icon: BarChart,
        title: "Monitoreo de Redes Sociales",
        description: "Escucha activa en tiempo real de tus redes sociales para identificar oportunidades de negocio, gestionar tu reputación y no perder nunca un lead."
    }
];

const aiAgents = [
    { icon: Database, name: "Analizador de Datos", description: "Procesa grandes volúmenes de información de tu cartera para identificar tendencias y patrones de comportamiento." },
    { icon: FileText, name: "Generador de Reportes", description: "Crea informes de gestión, rendimiento y comisiones de forma automática y personalizada." },
    { icon: BookOpen, name: "Redactor de Documentos", description: "Asistente para redactar pólizas, contratos y comunicaciones a clientes, basándose en plantillas inteligentes." },
    { icon: Lightbulb, name: "Investigador Estratégico", description: "Analiza el mercado y la competencia para ofrecerte insights y recomendaciones estratégicas." },
    { icon: PieChart, name: "Optimizador de Cartera", description: "Sugiere cómo balancear tu cartera de clientes para maximizar la rentabilidad y minimizar el riesgo." },
    { icon: Repeat, name: "Detector de Oportunidades de Cross-Selling", description: "Identifica qué clientes son candidatos ideales para otros productos de tu portafolio, aumentando el valor de vida del cliente." },
    { icon: Zap, name: "Simulador de Riesgos y Comisiones", description: "Modela diferentes escenarios de mercado para predecir el impacto en tus comisiones y la estabilidad de tu cartera." },
];

export default function SegurosIAPage() {
    return (
        <div className="space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <Shield className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Sistema de Gestión de Seguros con IA</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                    La plataforma definitiva para agentes y agencias de seguros. Automatiza tu operación, maximiza tus comisiones y obtén una ventaja competitiva con el poder de la inteligencia artificial.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Funcionalidades Clave para el Agente Moderno</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreFeatures.map((feature) => (
                        <div key={feature.title} className="p-6 bg-secondary/50 rounded-lg">
                            <feature.icon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3">
                        <BrainCircuit className="h-8 w-8 text-primary" />
                        Tu Equipo de Analistas Virtuales con IA
                    </CardTitle>
                    <CardDescription>
                        Nuestro sistema incluye un conjunto de agentes de IA especializados que trabajan para ti 24/7.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {aiAgents.map(agent => (
                        <div key={agent.name} className="flex items-start gap-4 p-4 border rounded-lg bg-secondary/30">
                            <div className="p-2 bg-primary/10 rounded-lg mt-1">
                                <agent.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">{agent.name}</h4>
                                <p className="text-sm text-muted-foreground">{agent.description}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><TrendingUp/> Medición de ROI y Control de Ventas</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Nuestra plataforma no solo automatiza, sino que también mide. Obtén dashboards en tiempo real que te muestran el Retorno de la Inversión (ROI) de tus campañas de marketing, la efectividad de tus agentes y el rendimiento general de tu cartera, permitiéndote tomar decisiones basadas en datos para un crecimiento sostenible.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>Solicitar una Demostración Personalizada <ArrowRight className="ml-2" /></Button>
                </CardFooter>
            </Card>

        </div>
    );
}


    