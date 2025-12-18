
"use client";

import React from "react";
import {
  Gavel,
  ShieldCheck,
  FileSignature,
  FileWarning,
  ArrowRight,
  Calculator,
  Bell,
  CheckCircle,
  Lightbulb,
  Scale,
  BrainCircuit,
  Users,
  Search,
  BookOpen,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const riskAreas = [
    { title: "Contratos", risk: "medio", details: "Contrato con ProveedorAlpha vence en 15 días. Valor: $120,000", icon: FileSignature },
    { title: "Litigios Activos", risk: "alto", details: "Audiencia preliminar para caso LAB-2023-45 en 3 días.", icon: Scale },
    { title: "Cumplimiento Regulatorio", risk: "bajo", details: "Declaración de ISLR presentada correctamente. Próxima: IVA.", icon: ShieldCheck },
    { title: "Propiedad Intelectual", risk: "bajo", details: "Marca 'Kyron' registrada y vigente.", icon: Lightbulb },
    { title: "Relaciones Laborales", risk: "medio", details: "2 contratos de trabajo por vencer en 45 días.", icon: Users },
];

const priorityActions = [
    { type: Gavel, description: "Preparar recurso de apelación para caso LAB-2023-45.", deadline: "En 2 días", priority: "alto" },
    { type: FileSignature, description: "Firmar adenda de confidencialidad con Consultora Beta.", deadline: "Hoy", priority: "alto" },
    { type: Users, description: "Revisar vencimiento de contratos laborales.", deadline: "En 5 días", priority: "medio" },
];

const criticalCasesTimeline = [
    { case: "Demanda Laboral vs. Ex-empleado", milestone: "Audiencia Preliminar", date: "20/05/2024", status: "Completado" },
    { case: "Demanda Laboral vs. Ex-empleado", milestone: "Entrega de Pruebas", date: "01/06/2024", status: "Pendiente" },
    { case: "Caso Fiscal SENIAT", milestone: "Presentación de Escritos", date: "15/06/2024", status: "Pendiente" },
];

const budgetData = [{ name: "Utilizado", value: 45, fill: "hsl(var(--primary))" }, { name: "Disponible", value: 55, fill: "hsl(var(--muted))" }];
const feesData = [
  { name: 'Q1', Externos: 4000, Internos: 2400 },
  { name: 'Q2', Externos: 3000, Internos: 1398 },
  { name: 'Q3', Externos: 9800, Internos: 2000 },
];

const chartConfig = {
  Externos: { label: "Externos" },
  Internos: { label: "Internos" },
  value: { label: "Presupuesto" }
};

const riskColorMap = {
    alto: "bg-red-500/10 border-red-500 text-red-500",
    medio: "bg-yellow-500/10 border-yellow-500 text-yellow-500",
    bajo: "bg-green-500/10 border-green-500 text-green-500",
};

const deadlineColorMap = {
    alto: "text-red-500",
    medio: "text-yellow-500",
    bajo: "text-green-500",
}

export default function DashboardJuridicoPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando Legal
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Dashboard de gestión de riesgo, eficiencia y estrategia para el departamento legal.</p>
      </header>

      {/* Quick Access */}
      <div className="space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
                type="text"
                placeholder="Buscar caso, contrato, documento o ley..."
                className="w-full bg-background border rounded-md h-11 pl-12 pr-4"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline"><Link href="/contratos">Nuevo Contrato Estándar</Link></Button>
            <Button asChild variant="outline"><Link href="/poderes-representacion">Generar Poder Notarial</Link></Button>
            <Button variant="outline">Registrar Gasto Legal</Button>
            <Button variant="destructive">Reportar Incidente</Button>
          </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Semáforo de Riesgo Legal</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {riskAreas.map(area => (
                            <div key={area.title} className={`p-4 rounded-lg border ${riskColorMap[area.risk as keyof typeof riskColorMap]}`}>
                                <h4 className="font-semibold flex items-center gap-2">
                                    <area.icon className="h-5 w-5"/>
                                    {area.title}
                                </h4>
                                <p className="text-xs mt-2">{area.details}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Acciones Requeridas Esta Semana</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {priorityActions.map((action, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                                <action.type className={`h-5 w-5 shrink-0 ${deadlineColorMap[action.priority as keyof typeof deadlineColorMap]}`} />
                                <div className="flex-grow">
                                    <p className="text-sm font-medium">{action.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-semibold ${deadlineColorMap[action.priority as keyof typeof deadlineColorMap]}`}>{action.deadline}</p>
                                </div>
                                <Button size="sm" variant="ghost">Revisar</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar with financial indicators */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Indicadores Financieros Legales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                             <h4 className="text-sm font-semibold text-center mb-2">Presupuesto Legal Anual Utilizado</h4>
                             <div className="h-48">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                             <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={(value) => `${value}%`}/>} />
                                            <Pie data={budgetData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                                                {budgetData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                            </Pie>
                                             <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-foreground">
                                                {budgetData[0].value}%
                                            </text>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>
                        </div>
                        <div>
                             <h4 className="text-sm font-semibold text-center mb-4">Honorarios Externos vs. Internos (Q)</h4>
                             <div className="h-48">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                         <BarChart data={feesData}>
                                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`}/>
                                            <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number, "Bs.")}/>} />
                                            <Bar dataKey="Externos" fill="var(--color-Externos)" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="Internos" fill="var(--color-Internos)" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                             </div>
                        </div>
                        <div className="text-center pt-4 border-t">
                            <p className="text-sm text-muted-foreground">Costo Promedio por Caso Cerrado</p>
                            <p className="text-2xl font-bold">{formatCurrency(12500, "Bs.")}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
       </div>
       
       <Card>
            <CardHeader>
                <CardTitle>Seguimiento de Casos y Trámites Críticos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-x-auto">
                    <div className="flex items-center py-4 min-w-max">
                        {criticalCasesTimeline.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center text-center px-4">
                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status === 'Completado' ? 'bg-green-500' : 'bg-primary'}`}>
                                        <CheckCircle className="h-4 w-4 text-white"/>
                                    </div>
                                    <p className="font-bold text-sm mt-2">{item.milestone}</p>
                                    <p className="text-xs text-muted-foreground">{item.case}</p>
                                    <p className="text-xs font-mono">{item.date}</p>
                                </div>
                                {index < criticalCasesTimeline.length - 1 && (
                                    <div className="flex-grow h-1 bg-border"/>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}
