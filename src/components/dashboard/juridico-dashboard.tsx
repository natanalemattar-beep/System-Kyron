
"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarClock,
  CircleDashed,
  DollarSign,
  FilePlus,
  FileText,
  Landmark,
  Percent,
  ShieldAlert,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { historicalFinancialData } from "@/lib/historical-financial-data";


const kpiData = [
  { title: "Flujo de Caja Neto (Mes)", value: formatCurrency(12850.75, 'Bs.'), icon: DollarSign, trend: "+10% vs mes anterior", trendColor: "text-green-500" },
  { title: "Margen de Utilidad Bruta", value: "45.2%", icon: Percent, trend: "+2% vs mes anterior", trendColor: "text-green-500" },
  { title: "Ticket Promedio de Venta", value: formatCurrency(185.30, 'Bs.'), icon: FileText, trend: "-1.5% vs mes anterior", trendColor: "text-red-500" },
];

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "hsl(var(--primary))",
  },
  gastos: {
    label: "Gastos",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

const recentActivities = [
  { time: "Hace 15 min", description: "Se generó la Factura #V-2024-0589 para 'Constructora XYZ'." },
  { time: "Hace 1 hora", description: "Se registró un asiento contable de 'Pago de Alquiler'." },
  { time: "Hace 5 horas", description: "Se calculó y cerró la nómina de la 1ra quincena de Julio." },
  { time: "Ayer", description: "El permiso 'Conformidad de Uso de Bomberos' fue marcado 'Por Vencer'." },
  { time: "Ayer", description: "Usuario 'admin' actualizó el estado del RIF." },
];

const upcomingDeadlines = [
  { days: 3, description: "Declaración y pago de IVA (Julio)" },
  { days: 8, description: "Renovación de 'Licencia de Actividades Económicas'" },
  { days: 12, description: "Vencimiento de la Factura #FAC-C-001 de 'Tech Solutions'" },
];

const quickAccessModules = [
  { href: "/libro-compra-venta", label: "Libro Compra/Venta", icon: Landmark },
  { href: "/nominas", label: "Gestión de Nómina", icon: Users },
  { href: "/permisos", label: "Control de Permisos", icon: ShieldAlert },
];

export function JuridicoDashboard() {
  return (
    <div className="space-y-8 p-4 md:p-0 bg-gradient-to-tr from-sky-100 via-blue-200 to-purple-100 dark:from-background dark:to-blue-900/40 bg-[length:200%_200%] animate-gradient-animation -m-4 md:-m-8 rounded-xl min-h-screen">
      
      {/* Header */}
      <div className="px-4 md:px-8 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido al Centro de Mando</h1>
        <p className="text-muted-foreground">Tu resumen ejecutivo para una gestión inteligente.</p>
      </div>

      <div className="px-4 md:px-8 space-y-8">
        {/* Critical Status & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Estado Crítico</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                        <h3 className="text-4xl font-bold text-warning">8</h3>
                        <p className="text-sm font-semibold text-warning/80">Por Vencer</p>
                    </div>
                     <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h3 className="text-4xl font-bold text-blue-500">12</h3>
                        <p className="text-sm font-semibold text-blue-500/80">Pendientes</p>
                    </div>
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <h3 className="text-4xl font-bold text-destructive">3</h3>
                        <p className="text-sm font-semibold text-destructive/80">Vencido</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                     <Button variant="outline" className="flex flex-col h-20 gap-1">
                        <BookOpen className="h-6 w-6"/>
                        <span className="text-xs">Registrar Asiento</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-20 gap-1">
                        <FilePlus className="h-6 w-6"/>
                        <span className="text-xs">Nueva Factura</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-20 gap-1">
                        <Calculator className="h-6 w-6"/>
                        <span className="text-xs">Calcular Nómina</span>
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Financial Pulse */}
        <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Pulso Financiero</h2>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <Card className="xl:col-span-3 bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Ingresos vs. Gastos (Histórico)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                         <ChartContainer config={chartConfig} className="w-full h-full">
                            <AreaChart data={historicalFinancialData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${(value as number) / 1000}k`} />
                                <ChartTooltip 
                                    cursor={false}
                                    content={<ChartTooltipContent 
                                        indicator="dot" 
                                        formatter={(value) => formatCurrency(value as number, 'Bs.')} 
                                    />} 
                                />
                                <Legend />
                                <Area type="monotone" dataKey="ingresos" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorIngresos)" />
                                <Area type="monotone" dataKey="gastos" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorGastos)" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <div className="space-y-4">
                    {kpiData.map(kpi => (
                        <Card key={kpi.title} className="bg-card/60 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                                  {kpi.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{kpi.value}</p>
                                <p className={`text-xs ${kpi.trendColor}`}>{kpi.trend}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </div>

        {/* Operational Streams */}
         <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Flujos de Trabajo</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader><CardTitle>Actividad Reciente</CardTitle></CardHeader>
                    <CardContent>
                        <div className="relative pl-6">
                            <div className="absolute left-3 top-0 h-full w-0.5 bg-border -z-10"></div>
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="relative flex items-start gap-4 pb-8">
                                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                                        <Activity className="h-3 w-3 text-primary" />
                                    </div>
                                    <div className="flex-1 -mt-1">
                                        <p className="text-sm font-medium truncate">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader><CardTitle>Vencimientos Próximos</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {upcomingDeadlines.map((deadline, index) => (
                                <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                                    <CalendarClock className="h-6 w-6 text-warning shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold truncate">{deadline.description}</p>
                                        <p className="text-xs">Vence en {deadline.days} días</p>
                                    </div>
                                    <Button size="sm" variant="ghost"><ArrowRight className="h-4 w-4"/></Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader><CardTitle>Acceso Rápido a Módulos</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {quickAccessModules.map((mod, index) => (
                            <Button key={index} asChild variant="outline" className="w-full justify-start h-14 text-base">
                                <Link href={mod.href}>
                                    <mod.icon className="mr-3 h-5 w-5"/>
                                    {mod.label}
                                </Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
             </div>
        </div>

      </div>
    </div>
  );
}
