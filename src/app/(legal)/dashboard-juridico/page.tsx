
"use client";

import {
  Gavel,
  ShieldCheck,
  FileSignature,
  FileWarning,
  ArrowRight,
  Calculator,
  Bell,
  CheckCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const kpiData = [
  { title: "Contratos Activos", value: "28", icon: FileSignature, color: "text-blue-400" },
  { title: "Permisos por Vencer", value: "3", icon: FileWarning, color: "text-orange-400" },
  { title: "Nivel de Cumplimiento", value: "99.8%", icon: ShieldCheck, color: "text-green-400" },
];

const upcomingRenewals = [
    { name: "Licencia de Actividades Económicas", daysLeft: 15, priority: "Alta" },
    { name: "Conformidad de Uso de Bomberos", daysLeft: 28, priority: "Media" },
    { name: "Póliza de Responsabilidad Civil", daysLeft: 45, priority: "Baja" },
];

const juridicoModules = [
    { title: "Gestión de Contratos", href: "/legal/contratos", description: "Crea, revisa y gestiona el ciclo de vida de tus contratos." },
    { title: "Cumplimiento Normativo", href: "/legal/cumplimiento", description: "Monitorea el cumplimiento de normativas y leyes clave." },
    { title: "Gestión de Poderes", href: "/legal/poderes-representacion", description: "Administra los poderes notariales y representaciones." },
    { title: "Trámites y Permisos", href: "/legal/permisos", description: "Centraliza y renueva todas tus licencias operativas." },
];

const priorityVariant: { [key: string]: "destructive" | "secondary" | "outline" } = {
  Alta: "destructive",
  Media: "secondary",
  Baja: "outline",
};

export default function DashboardJuridicoPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando Legal
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard estratégico para la gestión del cumplimiento, contratos y riesgos legales.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
              <div
                key={kpi.title}
              >
                <Card className="bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                            {kpi.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    </CardContent>
                </Card>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Renewals */}
        <div className="lg:col-span-2">
          <Card className="bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                  <CardTitle>Matriz de Riesgo: Próximas Renovaciones</CardTitle>
                  <CardDescription>Identifica y gestiona los documentos que requieren atención inmediata.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Documento / Permiso</TableHead>
                        <TableHead className="text-center">Prioridad</TableHead>
                        <TableHead className="text-center">Días Restantes</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {upcomingRenewals.map(item => (
                          <TableRow key={item.name} className={item.priority === "Alta" ? "bg-destructive/10" : ""}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
                              </TableCell>
                              <TableCell className={`text-center font-semibold ${item.daysLeft < 30 ? 'text-destructive' : 'text-muted-foreground'}`}>{item.daysLeft}</TableCell>
                              <TableCell className="text-right">
                                  <Button asChild variant="ghost" size="sm">
                                      <Link href="/legal/permisos">Gestionar <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Simulator */}
        <div className="space-y-8">
          <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calculator/> Simulador de Costos Legales</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Estima los aranceles y timbres fiscales para un trámite específico.</p>
                   <Button className="w-full" variant="outline">
                      Calcular Costos de Trámite
                   </Button>
              </CardContent>
          </Card>
           <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell/> Alertas de Cumplimiento</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-3 text-sm p-3 bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg">
                    <CheckCircle className="h-5 w-5 shrink-0"/>
                    <p>No hay alertas críticas. Todos los documentos están al día.</p>
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>

      {/* Módulos de Gestión */}
      <div className="pt-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Módulos de Gestión Jurídica</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {juridicoModules.map((module) => (
                  <Card key={module.title} className="bg-card/80 backdrop-blur-sm flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader>
                          <CardTitle>{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="mt-auto">
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
    </div>
  );
}
