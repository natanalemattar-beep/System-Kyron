
"use client";

import {
  Briefcase,
  Users,
  DollarSign,
  UserPlus
} from "lucide-react";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const kpiData = [
    { title: "Total de Empleados", value: "58", icon: Users },
    { title: "Nuevas Contrataciones (Mes)", value: "4", icon: UserPlus },
    { title: "Costo de Nómina (Mes)", value: formatCurrency(28500), icon: DollarSign },
];

const employeeDistribution = [
  { name: 'Ventas', count: 15 },
  { name: 'Tecnología', count: 12 },
  { name: 'Administración', count: 8 },
  { name: 'Soporte', count: 10 },
  { name: 'Diseño', count: 7 },
  { name: 'Gerencia', count: 6 },
];

const quickActions = [
    { title: "Gestión de Nóminas", href: "/nominas", description: "Calcula y procesa la nómina quincenal y mensual." },
    { title: "Portal de Reclutamiento", href: "/reclutamiento", description: "Administra vacantes y el ciclo de contratación de nuevos talentos." },
    { title: "Gestión de Notificaciones", href: "/gestion-notificaciones", description: "Revisa, aprueba o rechaza los comunicados de los empleados." },
];

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Dashboard de Recursos Humanos
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Visión general para la gestión estratégica del talento humano.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                </CardContent>
            </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm h-full">
                <CardHeader>
                    <CardTitle>Distribución de Empleados por Departamento</CardTitle>
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
              <h3 className="text-xl font-semibold tracking-tight">Acciones Rápidas</h3>
              {quickActions.map(action => (
                <Card key={action.title} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-base">{action.title}</CardTitle>
                        <CardDescription className="text-xs">{action.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button asChild className="w-full">
                            <Link href={action.href}>
                                Acceder al Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
              ))}
          </div>
       </div>

    </div>
  );
}
