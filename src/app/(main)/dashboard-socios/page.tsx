
"use client";

import {
  Users,
  Building,
  DollarSign,
  TrendingUp,
  BarChart,
  LayoutDashboard
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { QuickAccess } from "@/components/dashboard/quick-access";


const kpiData = [
  { title: "Empresas en el Holding", value: "5", icon: Building },
  { title: "Ingresos Consolidados (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign },
  { title: "Rentabilidad Neta (Grupo)", value: "22.5%", icon: TrendingUp },
];

const holdingStructure = [
    { id: 1, empresa: "TRAMITEX C.A.", participacion: "100%", rol: "Casa Matriz", rendimiento: "Positivo" },
    { id: 2, empresa: "Logística Express", participacion: "60%", rol: "Subsidiaria", rendimiento: "Estable" },
    { id: 3, empresa: "Inversiones Futuro", participacion: "30%", rol: "Aliada Estratégica", rendimiento: "Positivo" },
];

const rendimientoVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Positivo: "default",
  Estable: "secondary",
  Negativo: "outline",
};

export default function DashboardSociosPage() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Users className="h-10 w-10 text-primary" />
            Dashboard de Socios y Holding
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Visión general de la estructura de propiedad, empresas del grupo y acceso a todos los módulos del sistema.</p>
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
                        <p className="text-3xl font-bold">{kpi.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Estructura del Holding Empresarial</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead className="text-center">Participación</TableHead>
                            <TableHead className="text-center">Rendimiento</TableHead>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Quick Access Modules */}
        <div className="space-y-2 xl:col-span-3">
            <h2 className="text-2xl font-semibold tracking-tight">Acceso a Módulos del Ecosistema</h2>
            <QuickAccess />
        </div>
      </div>
    </div>
  );
}
