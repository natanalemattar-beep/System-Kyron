
"use client";

import {
  Building,
  DollarSign,
  TrendingUp,
  Users,
  Wallet,
  HandCoins,
  FileWarning,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingDown,
  Mail,
  UserCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { historicalFinancialData } from "@/lib/historical-financial-data";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { ActivityCard } from "@/components/dashboard/activity-card";

const kpiData = [
  { title: "Ingresos Totales (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign, trend: "+15.2% vs mes anterior" },
  { title: "Rentabilidad Neta", value: "22.5%", icon: TrendingUp, trend: "+1.8% vs mes anterior" },
  { title: "Cuentas por Pagar", value: formatCurrency(42000, 'Bs.'), icon: HandCoins, trend: "3 facturas vencidas" },
  { title: "Cuentas por Cobrar", value: formatCurrency(75000, 'Bs.'), icon: Wallet, trend: "1 factura en mora" },
];

const recentActivities = [
    { description: "Cálculo de nómina de la 1ra quincena completado.", time: "Hace 30 minutos", icon: Users, iconColor: "text-blue-400" },
    { description: "Nueva solicitud de crédito recibida de 'Innovate Corp'.", time: "Hace 1 hora", icon: UserCheck, iconColor: "text-green-400" },
    { description: "Alerta: Licencia de Actividades Económicas vence en 15 días.", time: "Hace 3 horas", icon: FileWarning, iconColor: "text-orange-400" },
    { description: "Factura FAC-0892 enviada a 'Tech Solutions LLC'.", time: "Hace 5 horas", icon: Mail, iconColor: "text-gray-400" },
];

const chartConfig = {
  ingresos: { label: "Ingresos", color: "hsl(var(--primary))" },
  gastos: { label: "Gastos", color: "hsl(var(--destructive))" },
  rentabilidad: { label: "Rentabilidad", color: "hsl(var(--accent-foreground))" },
} satisfies ChartConfig;

const rentabilidadData = historicalFinancialData.slice(-12).map(d => ({ ...d, rentabilidad: (d.ingresos - d.gastos) / d.ingresos * 100 }));


export default function DashboardEmpresaPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Building className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Administración y Finanzas
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Visión general de las operaciones, finanzas y cumplimiento de la empresa.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(kpi => (
             <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">{kpi.trend}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Financial Chart */}
         <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm h-[400px] flex flex-col">
          <CardHeader>
              <CardTitle>Pulso Financiero (Últimos 12 meses)</CardTitle>
              <CardDescription>Evolución de ingresos, gastos y rentabilidad.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <AreaChart data={rentabilidadData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(value) => `${(value as number) / 1000}k`} />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip 
                          cursor={false}
                          content={<ChartTooltipContent 
                              indicator="dot" 
                              formatter={(value, name) => name === 'rentabilidad' ? `${(value as number).toFixed(1)}%` : formatCurrency(value as number, 'Bs.')} 
                          />} 
                      />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="ingresos" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorIngresos)" />
                       <Area yAxisId="left" type="monotone" dataKey="gastos" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorGastos)" />
                       <Area yAxisId="right" type="monotone" dataKey="rentabilidad" stroke="hsl(var(--accent-foreground))" fill="transparent" />
                  </AreaChart>
              </ChartContainer>
          </CardContent>
        </Card>
      
         <ActivityCard recentActivities={recentActivities} />
      </div>

       <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Acceso Rápido a Módulos</h2>
          <QuickAccess />
      </div>
      
    </div>
  );
}
