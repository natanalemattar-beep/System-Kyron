
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, ShieldCheck, BrainCircuit, Puzzle, HardHat, ArrowRight, Activity, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const modules = [
    {
        title: "Seguridad del Sistema",
        description: "Gestiona roles, permisos de usuario y monitorea los registros de acceso para garantizar la integridad de la plataforma.",
        icon: ShieldCheck,
        href: "/seguridad"
    },
    {
        title: "Soluciones con IA",
        description: "Supervisa y desarrolla los modelos de IA para análisis de sentimiento, extracción de datos y categorización automática.",
        icon: BrainCircuit,
        href: "/soluciones-ia"
    },
    {
        title: "Arquitectura de Software",
        description: "Define y documenta la arquitectura del sistema, desde la infraestructura en la nube hasta los microservicios.",
        icon: Puzzle,
        href: "/arquitectura-software-contable"
    },
    {
        title: "Ingeniería y Proyectos",
        description: "Accede a las herramientas de planificación, generación de planos con IA y gestión de presupuestos de construcción.",
        icon: HardHat,
        href: "/ingenieria-ia"
    }
];

const systemStatus = [
    { name: "API Principal", status: "Operacional", color: "bg-green-500" },
    { name: "Base de Datos", status: "Operacional", color: "bg-green-500" },
    { name: "Servicio de IA", status: "Operacional", color: "bg-green-500" },
    { name: "Sistema de Alertas", status: "Degradado", color: "bg-yellow-500" },
];

const recentActivity = [
    { user: "dev.user", action: "Desplegó nueva versión del API de facturación", time: "Hace 15 min" },
    { user: "admin.supervisor", action: "Autorizó acceso fuera de horario al TPV 2", time: "Hace 1 hora" },
    { user: "security.bot", action: "Bloqueó intento de acceso no autorizado desde IP 200.1.2.3", time: "Hace 3 horas" },
]

export default function DashboardInformaticaPage() {

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Cpu className="h-8 w-8" />
                    Dashboard de Ingeniería e Informática
                </h1>
                <p className="text-muted-foreground mt-2">
                    Centro de control para la gestión de la infraestructura tecnológica, seguridad y desarrollo.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Estado del Sistema en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {systemStatus.map(service => (
                        <div key={service.name} className="p-4 bg-secondary/50 rounded-lg flex items-center justify-between">
                            <span className="font-medium">{service.name}</span>
                            <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${service.color}`} />
                                <span className="text-sm">{service.status}</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Módulos de Gestión Tecnológica</CardTitle>
                        <CardDescription>Accede a las principales áreas de administración y desarrollo del sistema.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-6">
                        {modules.map((mod) => (
                            <Card key={mod.title} className="bg-secondary/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <mod.icon className="h-6 w-6 text-primary"/>
                                        {mod.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{mod.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={mod.href}>
                                            Gestionar Módulo <ArrowRight className="ml-2"/>
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Actividad Reciente del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm">
                                    <div className="pt-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p><span className="font-semibold">{activity.user}</span> {activity.action}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
