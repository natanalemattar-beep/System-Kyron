
"use client";

import {
  Activity,
  ArrowRight,
  CalendarClock,
  DollarSign,
  FilePlus,
  Landmark,
  ShieldAlert,
  Users,
  FileText,
  TrendingUp,
  Wallet,
  ShieldCheck,
  Percent,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { historicalFinancialData } from "@/lib/historical-financial-data";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { ActivityCard } from "@/components/dashboard/activity-card";


const kpiData = [
  { title: "Ingresos del Mes", value: formatCurrency(62000, 'Bs.'), icon: DollarSign, trend: "+12.7% vs mes anterior", trendColor: "text-green-500" },
  { title: "Margen Neto", value: "18.5%", icon: Percent, trend: "+2.1% vs mes anterior", trendColor: "text-green-500" },
  { title: "Salud de Cartera (CxC)", value: "92%", icon: Wallet, trend: "3 facturas vencidas", trendColor: "text-orange-400" },
  { title: "Estado de Cumplimiento", value: "99%", icon: ShieldCheck, trend: "1 permiso por vencer", trendColor: "text-green-500" },
];

const recentActivities = [
  { description: "Nueva factura a crédito creada para 'Tech Solutions'", time: "Hace 5 minutos", icon: FilePlus, iconColor: "text-blue-500" },
  { description: "Pago de nómina de la 1ra quincena de Julio procesado", time: "Hace 1 hora", icon: Users, iconColor: "text-green-500" },
  { description: "Declaración de IVA de Junio presentada", time: "Hace 3 horas", icon: Landmark, iconColor: "text-purple-500" },
  { description: "Alerta: Póliza de 'Flota de Vehículos' vencida", time: "Hace 1 día", icon: ShieldAlert, iconColor: "text-red-500" },
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

export default function DashboardEmpresaPage() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Building className="h-10 w-10 text-primary" />
            Dashboard de Administración y Finanzas
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Visión general de las operaciones, finanzas y cumplimiento de la empresa.</p>
      </div>

      <div className="space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
                      <p className={`text-xs ${kpi.trendColor}`}>{kpi.trend}</p>
                  </CardContent>
              </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Financial Pulse */}
            <div className="space-y-2 xl:col-span-3">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Pulso Financiero (Últimos 12 meses)</CardTitle>
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

            {/* Quick Access Modules */}
            <div className="space-y-2 xl:col-span-3">
              <h2 className="text-2xl font-semibold tracking-tight">Módulos de Acceso Rápido</h2>
              <QuickAccess />
            </div>

            {/* Operational Streams */}
            <div className="space-y-2 xl:col-span-3">
                <h2 className="text-2xl font-semibold tracking-tight">Flujos de Trabajo Operativos</h2>
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
                    <ActivityCard recentActivities={recentActivities} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
