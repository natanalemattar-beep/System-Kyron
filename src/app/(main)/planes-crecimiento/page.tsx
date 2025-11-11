
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Rocket, Scaling, Handshake, CheckCircle, ArrowRight, Lightbulb, Target } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const strategicPillars = [
    {
        icon: Zap,
        title: "Pilar 1: Expansión de Mercado",
        initiatives: [
            {
                name: "Expansión Nacional",
                details: "Abrir oficinas comerciales en Valencia y Maracaibo para cubrir el centro y occidente del país. Crear una red de 'Partners Certificados' (contadores y consultores) que revendan e implementen el software.",
                kpi: "Aumentar la base de clientes en un 40% en 18 meses."
            },
            {
                name: "Exploración Internacional (Colombia y Panamá)",
                details: "Realizar un estudio de mercado para adaptar el software contable a la normativa fiscal de Colombia y Panamá, iniciando con un 'soft-launch' para clientes seleccionados.",
                kpi: "Adquirir 5 clientes piloto internacionales en 24 meses."
            }
        ]
    },
    {
        icon: Rocket,
        title: "Pilar 2: Innovación de Productos",
        initiatives: [
            {
                name: "Evolución de la Papelera Inteligente (Hardware)",
                details: "Desarrollar una versión 'Mini' para hogares y oficinas pequeñas. Integrar un módulo de recompensas por reciclaje para los usuarios (gamificación).",
                kpi: "Lanzar el prototipo de la 'Papelera Mini' en 9 meses."
            },
            {
                name: "Fortalecimiento del Ecosistema (Software)",
                details: "Lanzar un 'Marketplace' de aplicaciones de terceros que se integren con System C.M.S. Desarrollar un módulo de 'Planificación Financiera Predictiva' con IA para PYMES.",
                kpi: "Incrementar el Ingreso Recurrente Mensual (MRR) en un 25%."
            }
        ]
    },
     {
        icon: Scaling,
        title: "Pilar 3: Excelencia Operativa",
        initiatives: [
            {
                name: "Automatización del Soporte",
                details: "Implementar un 'Chatbot de Soporte Nivel 1' con IA para resolver las dudas más comunes de los usuarios 24/7, liberando al equipo humano para casos complejos.",
                kpi: "Reducir el tiempo de primera respuesta en un 50%."
            },
        ]
    },
      {
        icon: Handshake,
        title: "Pilar 4: Alianzas Estratégicas",
        initiatives: [
            {
                name: "Alianza con Cámaras de Comercio",
                details: "Establecer convenios con las principales cámaras de comercio (Fedecámaras, Conindustria) para ofrecer el sistema a sus agremiados con condiciones preferenciales.",
                kpi: "Generar un 15% de los nuevos leads a través de este canal."
            },
        ]
    }
];

export default function PlanesCrecimientoPage() {
    return (
        <div className="space-y-12">
            <header className="mb-8 text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <Rocket className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Planes de Crecimiento y Estrategia Corporativa</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                   Una hoja de ruta para consolidar nuestro liderazgo, expandir nuestra presencia y maximizar la rentabilidad del ecosistema "System C.M.S.".
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Lightbulb className="h-6 w-6 text-primary"/>Nuestra Visión Estratégica</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl text-muted-foreground">
                        Posicionarnos como el proveedor líder de <strong className="text-foreground">"Tranquility as a Service" (TaaS)</strong> en Venezuela y la región, ofreciendo a las empresas un ecosistema integrado que garantiza su cumplimiento fiscal, optimiza su sostenibilidad y automatiza su gestión administrativa a través de la tecnología.
                    </p>
                </CardContent>
            </Card>

            <div className="space-y-8">
                {strategicPillars.map(pillar => (
                    <Card key={pillar.title} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4 text-2xl">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <pillar.icon className="h-8 w-8 text-primary"/>
                                </div>
                                {pillar.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {pillar.initiatives.map(initiative => (
                                    <div key={initiative.name} className="p-4 border rounded-lg bg-secondary/30">
                                        <h4 className="font-semibold">{initiative.name}</h4>
                                        <p className="text-sm text-muted-foreground mt-1 mb-3">{initiative.details}</p>
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                            <Target className="h-4 w-4"/>
                                            <span>KPI Clave: {initiative.kpi}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>Próximos Pasos</CardTitle>
                    <CardDescription>
                        Para ejecutar esta hoja de ruta, es fundamental asignar recursos y responsables a cada iniciativa.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Se propone una reunión de la junta directiva para definir el presupuesto de inversión para estas iniciativas y establecer un comité de seguimiento que reporte los avances trimestralmente.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>Agendar Reunión Estratégica <ArrowRight className="ml-2"/></Button>
                </CardFooter>
            </Card>
        </div>
    );
}
