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
import { motion } from "framer-motion";

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
    { title: "Gestión de Contratos", href: "/contratos", description: "Crea, revisa y gestiona el ciclo de vida de tus contratos." },
    { title: "Cumplimiento Normativo", href: "/cumplimiento", description: "Monitorea el cumplimiento de normativas y leyes clave." },
    { title: "Gestión de Poderes", href: "/poderes-representacion", description: "Administra los poderes notariales y representaciones." },
    { title: "Trámites y Permisos", href: "/permisos", description: "Centraliza y renueva todas tus licencias operativas." },
];

const priorityVariant: { [key: string]: "destructive" | "secondary" | "outline" } = {
  Alta: "destructive",
  Media: "secondary",
  Baja: "outline",
};

export default function EscritorioJuridicoPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Escritorio Jurídico
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Centro de control para la gestión del cumplimiento, contratos y riesgos legales.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm h-full">
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
              </motion.div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Renewals */}
        <div className="lg:col-span-2">
          <Card className="bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                  <CardTitle>Próximas Renovaciones y Vencimientos</CardTitle>
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
                          <TableRow key={item.name}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
                              </TableCell>
                              <TableCell className="text-center font-semibold">{item.daysLeft}</TableCell>
                              <TableCell className="text-right">
                                  <Button asChild variant="ghost" size="sm">
                                      <Link href="/permisos">Gestionar <ArrowRight className="ml-2 h-4 w-4"/></Link>
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
                  <CardTitle className="flex items-center gap-2"><Calculator/> Simulador de Costos</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Estima los costos de aranceles y timbres fiscales para un trámite.</p>
                   <Button className="w-full" variant="outline">
                      Calcular Trámite
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
      <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Módulos de Gestión Jurídica</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {juridicoModules.map((module) => (
                  <Card key={module.title} className="bg-card/80 backdrop-blur-sm flex flex-col">
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
