
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
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const kpiData = [
  { title: "Disponibilidad de Red (Uptime)", value: "99.98%", icon: Signal, color: "text-green-400", status: "Óptimo" },
  { title: "Latencia Promedio", value: "25ms", icon: Clock, color: "text-green-400", status: "Excelente" },
  { title: "Incidentes Activos", value: "1", icon: AlertTriangle, color: "text-yellow-400", status: "Advertencia" },
  { title: "Proyectos de Despliegue", value: "4", icon: HardHat, color: "text-blue-400", status: "En progreso" },
];

const networkStatus = [
    { service: "Red de Fibra Óptica (Caracas)", status: "Operacional", latency: 12, packetLoss: "0.01%" },
    { service: "Red Inalámbrica (Valencia)", status: "Mantenimiento Parcial", latency: 45, packetLoss: "0.5%" },
    { service: "Enlace Satelital (Zonas Remotas)", status: "Operacional", latency: 600, packetLoss: "1.2%" },
    { service: "Red 5G (Maracay)", status: "Degradado", latency: 80, packetLoss: "2.5%" },
];

const complianceStatus = [
    { id: "CON-001", name: "Concesión de Espectro Radioeléctrico", expires: "20/03/2028", status: "Vigente" },
    { id: "CON-002", name: "Licencia de Proveedor de Servicios (ISP)", expires: "01/04/2028", status: "Vigente" },
    { id: "CON-003", name: "Habilitación Postal", expires: "01/06/2024", status: "Vencida" },
];

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" } = {
  Vigente: "default",
  Vencida: "destructive",
  "Mantenimiento Parcial": "secondary",
  Degradado: "secondary",
  Operacional: "default",
};

const chartConfig = {
    latency: {
        label: "Latencia (ms)",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;


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
                      <p className="text-xs text-muted-foreground">{kpi.status}</p>
                  </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Network Status */}
          <Card className="lg:col-span-3 bg-card/80 backdrop-blur-sm">
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
                        <TableHead className="text-right">Pérdida Paquetes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {networkStatus.map(item => (
                          <TableRow key={item.service}>
                              <TableCell className="font-medium">{item.service}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={statusVariant[item.status as keyof typeof statusVariant] || 'default'}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-mono">{item.latency}ms</TableCell>
                               <TableCell className="text-right font-mono">{item.packetLoss}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
          </Card>
        
        {/* Latency Chart */}
        <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Rendimiento de Red</CardTitle>
                <CardDescription>Latencia promedio por servicio.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[200px]">
                    <RechartsBarChart data={networkStatus} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="service" type="category" fontSize={10} tickLine={false} axisLine={false} width={120}/>
                        <Tooltip content={<ChartTooltipContent formatter={(value) => `${value}ms`}/>} cursor={{fill: 'hsl(var(--secondary))'}} />
                        <Bar dataKey="latency" name="Latencia" fill="var(--color-latency)" radius={[0, 4, 4, 0]} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Estado de Cumplimiento (CONATEL)</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Referencia</TableHead>
                    <TableHead>Licencia / Permiso</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Vencimiento</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {complianceStatus.map(item => (
                        <TableRow key={item.id} className={item.status === 'Vencida' ? 'bg-destructive/10' : ''}>
                            <TableCell className="font-mono">{item.id}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-center">
                            <Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{item.expires}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>

    </div>
  );
}
