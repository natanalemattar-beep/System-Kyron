
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, DollarSign, ArrowRight, UserPlus, FileSignature, BookOpen, CalendarClock, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const kpiData = [
    { title: "Total Empleados Activos", value: "85", icon: Users },
    { title: "Nuevas Contrataciones (Mes)", value: "5", icon: UserPlus },
    { title: "Costo Total de Nómina (Quincena)", value: formatCurrency(75890.50, 'Bs.'), icon: DollarSign },
];

const quickAccessModules = [
    { href: "/nominas", label: "Calcular Nómina", icon: Briefcase },
    { href: "/contratos", label: "Gestionar Contratos", icon: FileSignature },
    { href: "/libro-nomina", label: "Ver Libros de Registro", icon: BookOpen },
];

const upcomingDeadlines = [
    { days: 10, description: "Fin de período de prueba de 'Jorge Vivas'" },
    { days: 25, description: "Vencimiento de contrato de 'María Rodriguez'" },
];

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Briefcase className="h-8 w-8" />
            Centro de Mando de RR.HH.
        </h1>
        <p className="text-muted-foreground mt-2">
          Visión general para la gestión estratégica del talento humano.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map(kpi => (
            <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Próximos Vencimientos */}
        <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Vencimientos y Fechas Clave</CardTitle>
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
        
        {/* Acceso Rápido */}
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Acceso Rápido</CardTitle>
            </CardHeader>
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
  );
}
