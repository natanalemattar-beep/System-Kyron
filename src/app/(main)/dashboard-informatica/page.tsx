
"use client";

import {
  Cpu,
  Shield,
  BrainCircuit,
  Puzzle,
  Server,
  Database,
  CheckCircle,
  AlertTriangle,
  LayoutDashboard
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Cpu className="h-10 w-10 text-primary" />
            Dashboard de Ingeniería e Informática
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Centro de control para la gestión de la infraestructura tecnológica, seguridad y desarrollo.</p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card className="col-span-1 md:col-span-2 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Estado del Sistema en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
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
            <Card className="col-span-1 md:col-span-2 bg-card/80 backdrop-blur-sm">
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
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Módulos de Gestión de IT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {informaticaNavGroups.map((group) => (
                    <Card key={group.title} className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <group.icon className="h-6 w-6 text-primary"/>
                                {group.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <SidebarMenu>
                                {group.items.map((item) => (
                                <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                    <SidebarMenuButton
                                    asChild
                                    className="justify-start h-10 w-full mb-2 bg-secondary/50"
                                    >
                                    <Link href={item.href}>
                                        <item.icon className="h-4 w-4 mr-2" />
                                        <span>{item.label}</span>
                                    </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
