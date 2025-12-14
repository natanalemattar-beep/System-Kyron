
"use client";

import {
  Briefcase,
  Users,
  DollarSign,
  UserPlus,
  ArrowRight,
  FileWarning,
  CalendarCheck2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const kpiData = [
    { title: "Total de Empleados", value: "58", icon: Users },
    { title: "Nuevas Contrataciones (Mes)", value: "4", icon: UserPlus },
    { title: "Costo de Nómina (Mes)", value: formatCurrency(28500, 'Bs.'), icon: DollarSign },
];

const employeeDistribution = [
  { name: 'Ventas', count: 15 },
  { name: 'Tecnología', count: 12 },
  { name: 'Administración', count: 8 },
  { name: 'Soporte', count: 10 },
  { name: 'Diseño', count: 7 },
  { name: 'Gerencia', count: 6 },
];

const complianceAlerts = [
    { text: "3 Contratos de trabajo próximos a vencer.", icon: FileWarning, color: "text-orange-400" },
    { text: "Actualización de política de vacaciones pendiente de revisión.", icon: CalendarCheck2, color: "text-blue-400" },
];

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Talento y Cultura
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Gestión estratégica del talento humano y cumplimiento laboral.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <p className="text-3xl font-bold">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary"/>
                    </div>
                    <CardTitle>Distribución de Empleados</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={employeeDistribution}>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}/>
                             <Legend />
                            <Bar dataKey="count" name="Empleados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
         </div>
          <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Alertas de Cumplimiento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {complianceAlerts.map(alert => (
                         <div key={alert.text} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                            <alert.icon className={`h-5 w-5 mt-0.5 shrink-0 ${alert.color}`} />
                            <p className="text-sm">{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
              </Card>
               <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Button asChild className="w-full">
                        <Link href="/nominas">Gestionar Nóminas <ArrowRight className="ml-auto h-4 w-4"/></Link>
                    </Button>
                     <Button asChild variant="outline" className="w-full">
                        <Link href="/reclutamiento">Portal de Reclutamiento <ArrowRight className="ml-auto h-4 w-4"/></Link>
                    </Button>
                </CardContent>
              </Card>
          </div>
       </div>

    </div>
  );
}
