
"use client";

import { Cpu, Shield, BrainCircuit, Puzzle, Server, Database, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { informaticaNavGroups } from "@/components/app-sidebar-nav-items";
import Link from "next/link";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const servicesStatus = [
  { name: "API Principal", status: "Operacional", icon: Server },
  { name: "Base de Datos", status: "Operacional", icon: Database },
  { name: "Motor de IA", status: "Operacional", icon: BrainCircuit },
  { name: "Servidor de Facturación", status: "Operacional", icon: Puzzle },
];

const securityEvents = [
  { time: "Hace 5 min", event: "Intento de acceso bloqueado desde IP anónima", level: "Alto" },
  { time: "Hace 2 horas", event: "Análisis de vulnerabilidad completado. 0 críticas.", level: "Informativo" },
];

export default function DashboardInformaticaPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Cpu className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Ingeniería e Informática
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Centro de control para la gestión de la infraestructura tecnológica, seguridad y desarrollo.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Estado del Sistema en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {servicesStatus.map(service => (
                        <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <div className="flex items-center gap-3">
                                <service.icon className="h-5 w-5 text-muted-foreground"/>
                                <span className="font-medium text-sm">{service.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-500">
                                <CheckCircle className="h-4 w-4"/>
                                <span>{service.status}</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Registro de Eventos de Seguridad</CardTitle>
                </CardHeader>
                 <CardContent>
                    <ul className="space-y-3">
                        {securityEvents.map((event, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <AlertTriangle className={`h-5 w-5 mt-0.5 ${event.level === 'Alto' ? 'text-red-500' : 'text-blue-500'}`}/>
                                <div>
                                    <p className="text-sm font-medium">{event.event}</p>
                                    <p className="text-xs text-muted-foreground">{event.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

        {/* Quick Access Modules */}
        <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Módulos de Gestión</h2>
            <div className="space-y-4">
                {informaticaNavGroups.map((group) => (
                    group.items.length > 0 && group.title !== "Dashboard" && group.title !== "Seguridad" && (
                        <Card key={group.title} className="bg-card/50 backdrop-blur-sm">
                            <CardHeader className="p-4">
                                <CardTitle className="text-base flex items-center gap-3">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <group.icon className="h-5 w-5 text-primary"/>
                                  </div>
                                    {group.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="flex flex-col gap-2">
                                    {group.items.map((item) => (
                                    <Button
                                        key={`${item.href}-${item.label}`}
                                        asChild
                                        variant="secondary"
                                        className="justify-start h-9 w-full"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
