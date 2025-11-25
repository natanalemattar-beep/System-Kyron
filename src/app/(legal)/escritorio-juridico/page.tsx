
"use client";

import {
  Gavel,
  ShieldCheck,
  FileSignature,
  FileWarning
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { allJuridicoGroups } from "@/components/app-sidebar-nav-items";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


const kpiData = [
  { title: "Contratos Activos", value: "28", icon: FileSignature },
  { title: "Permisos por Vencer", value: "3", icon: FileWarning, color: "text-orange-400" },
  { title: "Nivel de Cumplimiento", value: "99.8%", icon: ShieldCheck, color: "text-green-500" },
];

const upcomingRenewals = [
    { name: "Licencia de Actividades Económicas", daysLeft: 15 },
    { name: "Conformidad de Uso de Bomberos", daysLeft: 28 },
    { name: "Póliza de Responsabilidad Civil", daysLeft: 45 },
];


export default function EscritorioJuridicoPage() {
    const pathname = usePathname();
    const { state } = useSidebar();
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Gavel className="h-10 w-10 text-primary" />
            Dashboard del Escritorio Jurídico
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Centro de control para la gestión del cumplimiento, contratos y riesgos legales.</p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiData.map(kpi => (
                <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                            {kpi.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-3xl font-bold ${kpi.color ? kpi.color : ''}`}>{kpi.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Próximas Renovaciones y Vencimientos</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {upcomingRenewals.map(item => (
                        <li key={item.name} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                            <p className="font-medium">{item.name}</p>
                            <div className="flex items-center gap-4">
                                <Badge variant="secondary">Vence en {item.daysLeft} días</Badge>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/permisos">Gestionar</Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        {/* Quick Access Modules */}
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Módulos Jurídicos y Corporativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {allJuridicoGroups.map((group) => (
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
