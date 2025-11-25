
"use client";

import {
  Briefcase,
  Users,
  DollarSign,
  UserPlus
} from "lucide-react";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";

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

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Briefcase className="h-10 w-10 text-primary" />
            Dashboard de Recursos Humanos
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Visión general para la gestión estratégica del talento humano.</p>
      </div>

      <div className="space-y-8">
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

        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Distribución de Empleados por Departamento</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeeDistribution}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}/>
                        <Bar dataKey="count" name="Empleados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Quick Access Modules */}
        <div className="space-y-2 xl:col-span-3">
            <h2 className="text-2xl font-semibold tracking-tight">Módulos de Gestión de RR.HH.</h2>
            <QuickAccess />
        </div>
      </div>
    </div>
  );
}
