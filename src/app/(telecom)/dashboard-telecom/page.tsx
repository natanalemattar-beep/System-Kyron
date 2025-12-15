
"use client";

import {
  Signal,
  BarChart,
  HardHat,
  Network,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const kpiData = [
  { title: "Disponibilidad de Red (Uptime)", value: "99.98%", icon: Signal, color: "text-green-400" },
  { title: "Proyectos de Despliegue Activos", value: "4", icon: HardHat, color: "text-blue-400" },
  { title: "Cumplimiento CONATEL", value: "100%", icon: ShieldCheck, color: "text-green-400" },
  { title: "Nivel de Saturación de Red", value: "65%", icon: BarChart, color: "text-yellow-400" },
];

const networkStatus = [
    { service: "Red de Fibra Óptica (Caracas)", status: "Operacional", latency: "12ms" },
    { service: "Red Inalámbrica (Valencia)", status: "Mantenimiento Parcial", latency: "45ms" },
    { service: "Enlace Satelital (Zonas Remotas)", status: "Operacional", latency: "600ms" },
];

const complianceStatus = [
    { id: "CON-001", name: "Concesión de Espectro Radioeléctrico", expires: "20/03/2028", status: "Vigente" },
    { id: "CON-002", name: "Licencia de Proveedor de Servicios de Internet (ISP)", expires: "01/04/2028", status: "Vigente" },
    { id: "CON-003", name: "Habilitación Postal", expires: "01/06/2024", status: "Vencida" },
];

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" } = {
  Vigente: "default",
  Vencida: "destructive",
  "Por Vencer": "secondary",
};


export default function DashboardTelecomPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Signal className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Telecomunicaciones
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Gestión de infraestructura de red, proyectos y cumplimiento regulatorio.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  </CardContent>
              </Card>
            </div>
          ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Status */}
          <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle>Estado de la Red en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Servicio</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">Latencia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {networkStatus.map(item => (
                          <TableRow key={item.service}>
                              <TableCell className="font-medium">{item.service}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={item.status === "Operacional" ? "default" : "secondary"}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-mono">{item.latency}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
          </Card>
        
        {/* Compliance Status */}
          <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                  <CardTitle>Estado de Cumplimiento (CONATEL)</CardTitle>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Licencia / Permiso</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">Vencimiento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {complianceStatus.map(item => (
                          <TableRow key={item.id} className={item.status === 'Vencida' ? 'bg-destructive/10' : ''}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">{item.expires}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
          </Card>
      </div>

    </div>
  );
}
