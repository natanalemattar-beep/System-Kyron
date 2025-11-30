
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
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { historicalFinancialData } from "@/lib/historical-financial-data";

const kpiData = [
  { title: "Ingresos Totales (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign, trend: "+15.2% vs mes anterior" },
  { title: "Rentabilidad Neta", value: "22.5%", icon: TrendingUp, trend: "+1.8% vs mes anterior" },
  { title: "Total de Clientes Activos", value: "1,250", icon: Users, trend: "+50 nuevos este mes" },
  { title: "Tasa de Cumplimiento Fiscal", value: "100%", icon: CheckCircle, trend: "Sin alertas críticas" },
];

const quickAccessModules = [
    { title: "Cuentas por Cobrar", value: formatCurrency(75000, 'Bs.'), icon: Wallet, href:"/cuentas-por-cobrar" },
    { title: "Cuentas por Pagar", value: formatCurrency(42000, 'Bs.'), icon: HandCoins, href: "/cuentas-por-pagar" },
    { title: "Alertas de Cumplimiento", value: "1 Crítica", icon: FileWarning, href: "/cumplimiento" },
    { title: "Permisos por Vencer", value: "3", icon: Clock, href: "/permisos" },
];

const chartConfig = {
  ingresos: { label: "Ingresos", color: "hsl(var(--primary))" },
  gastos: { label: "Gastos", color: "hsl(var(--destructive))" },
} satisfies ChartConfig;


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
              <CardDescription>Evolución de ingresos vs. gastos para medir la rentabilidad.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <AreaChart data={historicalFinancialData.slice(-12)} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(value) => `${(value as number) / 1000}k`} />
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
      
        {/* Quick Access */}
        <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-semibold tracking-tight">Módulos Clave</h3>
            {quickAccessModules.map(module => (
                <Card key={module.title} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                            <module.icon className="h-5 w-5 text-muted-foreground"/>
                            {module.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{module.value}</p>
                    </CardContent>
                    <CardFooter>
                         <Button asChild className="w-full" variant="outline">
                            <Link href={module.href}>Gestionar <ArrowRight className="ml-2 h-4 w-4"/></Link>
                         </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
      
    </div>
  );
}
