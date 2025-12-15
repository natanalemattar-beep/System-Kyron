
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, PlusCircle, ArrowRight, Landmark, Scale, Wallet, HandCoins, BarChart, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { historicalFinancialData } from "@/lib/historical-financial-data";


const managementModules = [
    {
        category: "Finanzas y Ventas",
        icon: Landmark,
        items: [
            { title: "Análisis de Ventas", href: "/ventas/analisis-ventas", description: "Métricas y KPIs de rendimiento.", icon: TrendingUp },
            { title: "Cuentas por Cobrar", href: "/contabilidad/cuentas-por-cobrar", description: "Gestión inteligente y automatizada.", icon: Wallet },
            { title: "Cuentas por Pagar", href: "/contabilidad/cuentas-por-pagar", description: "Control de deudas con proveedores.", icon: HandCoins },
        ]
    }
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

const latestData = historicalFinancialData.slice(-1)[0] || { ingresos: 0, gastos: 0 };
const margin = latestData.ingresos > 0 ? ((latestData.ingresos - latestData.gastos) / latestData.ingresos) * 100 : 0;

const kpiData = [
    { title: "Ingresos (Últ. Mes)", value: formatCurrency(latestData.ingresos, 'Bs.'), icon: TrendingUp, color: "text-green-500" },
    { title: "Gastos (Últ. Mes)", value: formatCurrency(latestData.gastos, 'Bs.'), icon: TrendingUp, color: "text-red-500" },
    { title: "Margen Neto", value: `${margin.toFixed(1)}%`, icon: DollarSign, color: margin > 0 ? "text-green-500" : "text-red-500" },
];


export default function ContabilidadPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Contabilidad
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard contable para la gestión integral de la empresa.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
            <Card key={kpi.title} className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                </CardContent>
            </Card>
        ))}
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
              <CardTitle>Rendimiento Financiero (Últimos 12 meses)</CardTitle>
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


      <div className="space-y-12">
        {managementModules.map((module, index) => (
            <motion.div
                key={module.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
            >
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                           <div className="p-3 bg-primary/10 rounded-xl">
                             <module.icon className="h-6 w-6 text-primary" />
                           </div>
                           {module.category}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {module.items.map(item => (
                            <Card key={item.title} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader className="flex-row gap-4 items-center">
                                     <div className="p-2 bg-secondary rounded-lg">
                                        <item.icon className="h-5 w-5 text-secondary-foreground" />
                                     </div>
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{item.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={item.href}>
                                            Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </div>
    </div>
  );
}
