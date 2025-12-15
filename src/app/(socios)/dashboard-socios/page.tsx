
"use client";

import {
  Users,
  Building,
  DollarSign,
  TrendingUp,
  BarChart,
  LayoutDashboard,
  Network
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { QuickAccess } from "@/components/dashboard/quick-access";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const kpiData = [
  { title: "Empresas en el Holding", value: "5", icon: Building },
  { title: "Ingresos Consolidados (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign },
  { title: "Rentabilidad Neta (Grupo)", value: "22.5%", icon: TrendingUp },
];

const holdingStructure = [
    { id: 1, empresa: "TRAMITEX C.A.", participacion: "100%", rol: "Casa Matriz", rendimiento: "Positivo", dashboard: "/admin/dashboard-empresa" },
    { id: 2, empresa: "Logística Express", participacion: "60%", rol: "Subsidiaria", rendimiento: "Estable", dashboard: "#" },
    { id: 3, empresa: "Inversiones Futuro", participacion: "30%", rol: "Aliada Estratégica", rendimiento: "Positivo", dashboard: "#" },
];

const rendimientoVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Positivo: "default",
  Estable: "secondary",
  Negativo: "outline",
};

export default function DashboardSociosPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando del Holding
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Supervisión estratégica del grupo empresarial y acceso total al ecosistema.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <div
              key={kpi.title}
            >
              <Card className="bg-card/80 backdrop-blur-sm h-full">
                  <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <kpi.icon className="h-4 w-4 text-muted-foreground" />
                          {kpi.title}
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-3xl font-bold">{kpi.value}</p>
                  </CardContent>
              </Card>
            </div>
          ))}
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Network className="h-6 w-6 text-primary"/>
                </div>
                Organigrama del Holding
              </CardTitle>
              <CardDescription>Vista de la estructura de propiedad y rendimiento de cada entidad.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead className="text-center">Participación</TableHead>
                          <TableHead className="text-center">Rendimiento</TableHead>
                           <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {holdingStructure.map(emp => (
                          <TableRow key={emp.id}>
                              <TableCell className="font-medium">{emp.empresa}</TableCell>
                              <TableCell>{emp.rol}</TableCell>
                              <TableCell className="text-center font-semibold">{emp.participacion}</TableCell>
                              <TableCell className="text-center">
                                  <Badge variant={rendimientoVariant[emp.rendimiento]}>{emp.rendimiento}</Badge>
                              </TableCell>
                               <TableCell className="text-right">
                                  <Button asChild variant="outline" size="sm">
                                      <Link href={emp.dashboard}>Acceder a Dashboard</Link>
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>

      {/* Quick Access Modules */}
      <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Acceso a Módulos del Ecosistema</h2>
          <QuickAccess />
      </div>
    </div>
  );
}
