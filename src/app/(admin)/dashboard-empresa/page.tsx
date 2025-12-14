
"use client";

import {
  Building,
  DollarSign,
  TrendingUp,
  Wallet,
  HandCoins,
  ArrowRight,
  UserCheck,
  FileWarning,
  Mail,
  Users
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { historicalFinancialData } from "@/lib/historical-financial-data";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { motion } from 'framer-motion';

const kpiData = [
  { title: "Ingresos Totales (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign, trend: "+15.2% vs mes anterior" },
  { title: "Rentabilidad Neta", value: "22.5%", icon: TrendingUp, trend: "+1.8% vs mes anterior" },
  { title: "Cuentas por Pagar", value: formatCurrency(42000, 'Bs.'), icon: HandCoins, trend: "3 facturas vencidas", href: "/cuentas-por-pagar" },
  { title: "Cuentas por Cobrar", value: formatCurrency(75000, 'Bs.'), icon: Wallet, trend: "1 factura en mora", href: "/cuentas-por-cobrar" },
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
            Sala de Situación Financiera
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Visión de 360° sobre las operaciones, finanzas y cumplimiento de la empresa.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={kpi.href || "#"} className="hover:shadow-lg transition-shadow">
                  <Card className="bg-card/50 backdrop-blur-sm h-full">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                          <kpi.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{kpi.value}</div>
                          <p className="text-xs text-muted-foreground">{kpi.trend}</p>
                      </CardContent>
                  </Card>
              </Link>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            {/* Financial Chart */}
            <Card className="bg-card/50 backdrop-blur-sm flex flex-col min-h-[400px]">
            <CardHeader>
                <CardTitle>Pulso Financiero (Últimos 12 meses)</CardTitle>
                <CardDescription>Evolución de ingresos, gastos y rentabilidad.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow min-h-[300px] md:min-h-0">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
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
                                cursor={{fill: 'hsl(var(--accent))', opacity: 0.3}}
                                content={<ChartTooltipContent 
                                    indicator="dot" 
                                    formatter={(value, name) => name === 'rentabilidad' ? `${(value as number).toFixed(1)}%` : formatCurrency(value as number, 'Bs.')} 
                                />} 
                            />
                            <Legend />
                            <Area yAxisId="left" type="monotone" dataKey="ingresos" name="Ingresos" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorIngresos)" />
                            <Area yAxisId="left" type="monotone" dataKey="gastos" name="Gastos" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorGastos)" />
                            <Area yAxisId="right" type="monotone" dataKey="rentabilidad" name="Rentabilidad" stroke="hsl(var(--accent-foreground))" fill="transparent" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            </Card>
         </div>
      
         <div className="space-y-8 lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Resumen de Flujo de Caja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                        <span className="font-medium text-green-400">Total por Cobrar</span>
                        <span className="font-bold text-lg text-green-300">{formatCurrency(75000, 'Bs.')}</span>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10">
                        <span className="font-medium text-red-400">Total por Pagar</span>
                        <span className="font-bold text-lg text-red-300">{formatCurrency(42000, 'Bs.')}</span>
                    </div>
                </CardContent>
            </Card>
            <ActivityCard recentActivities={recentActivities} />
         </div>
      </div>

       <div className="space-y-4 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Acceso Rápido a Módulos</h2>
          <QuickAccess />
      </div>
      
    </div>
  );
}

    