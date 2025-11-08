
"use client";

import {
  Activity,
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarClock,
  DollarSign,
  FilePlus,
  FileText,
  Landmark,
  Percent,
  ShieldAlert,
  Users,
  FileSignature,
  BookUser,
  Cpu,
  Ship,
  Briefcase,
  Network,
  BarChart,
  HardHat,
  Search,
  Gavel
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { historicalFinancialData } from "@/lib/historical-financial-data";


const kpiData = [
  { title: "Ingresos Totales (Mes)", value: formatCurrency(62000, 'Bs.'), icon: DollarSign, trend: "+12.7% vs mes anterior", trendColor: "text-green-500" },
  { title: "Ticket Promedio", value: formatCurrency(185.30, 'Bs.'), icon: FileText, trend: "-1.5% vs mes anterior", trendColor: "text-red-500" },
  { title: "Rotación de Inventario", value: "4.2", icon: Activity, trend: "ciclos este mes", trendColor: "text-green-500" },
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

const upcomingDeadlines = [
  { days: 3, description: "Declaración y pago de IVA (Julio)" },
  { days: 8, description: "Renovación de 'Licencia de Actividades Económicas'" },
  { days: 12, description: "Vencimiento de la Factura #FAC-C-001 de 'Tech Solutions'" },
];

const quickAccessModules = [
  { href: "/libro-compra-venta", label: "Libro Compra/Venta", icon: Landmark },
  { href: "/nominas", label: "Gestión de Nómina", icon: Users },
  { href: "/permisos", label: "Control de Permisos", icon: ShieldAlert },
  { href: "/modelo-contrato", label: "Modelo de Contrato", icon: FileSignature },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
  { href: "/importaciones", label: "Proveedores", icon: Ship },
];

export function JuridicoDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido al Centro de Mando</h1>
        <p className="text-muted-foreground">Tu resumen ejecutivo para una gestión inteligente.</p>
      </div>

      <div className="space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kpiData.map(kpi => (
              <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
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

        {/* Financial Pulse */}
        <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Pulso Financiero</h2>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Ingresos vs. Gastos (Últimos 12 meses)</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                      <ChartContainer config={chartConfig} className="w-full h-full">
                        <AreaChart data={historicalFinancialData.slice(-12)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        </div>

        {/* Operational Streams */}
         <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Flujos de Trabajo</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Vencimientos Próximos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {upcomingDeadlines.map((deadline, index) => (
                                <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                                    <CalendarClock className="h-6 w-6 text-orange-400 shrink-0" />
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
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Acciones Rápidas</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-2 gap-4">
                        <Button asChild variant="outline" className="h-20 flex-col gap-1">
                          <Link href="/libros-contables">
                            <BookOpen className="h-6 w-6"/>
                            <span className="text-xs">Registrar Asiento</span>
                          </Link>
                        </Button>
                         <Button asChild variant="outline" className="h-20 flex-col gap-1">
                          <Link href="/facturacion">
                            <FilePlus className="h-6 w-6"/>
                            <span className="text-xs">Nueva Factura</span>
                           </Link>
                        </Button>
                         <Button asChild variant="outline" className="h-20 flex-col gap-1">
                          <Link href="/nominas">
                            <Calculator className="h-6 w-6"/>
                            <span className="text-xs">Calcular Nómina</span>
                           </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-20 flex-col gap-1">
                           <Link href="/declaracion-iva">
                            <Percent className="h-6 w-6"/>
                            <span className="text-xs">Declarar IVA</span>
                           </Link>
                        </Button>
                    </CardContent>
                </Card>
             </div>
        </div>
      </div>
    </div>
  );
}
