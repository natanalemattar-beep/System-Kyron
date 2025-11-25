
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FileText, Gavel, Heart, Shield, ArrowRight, LayoutDashboard, CheckCircle, Clock, FileWarning } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const kpiData = [
  { title: "Trámites en Proceso", value: "2", icon: Clock, color: "text-yellow-500" },
  { title: "Documentos Listos", value: "5", icon: CheckCircle, color: "text-green-500" },
  { title: "Alertas o Vencimientos", value: "1", icon: FileWarning, color: "text-red-500" },
];

const recentActivities = [
    { id: "PN-2024-001", type: "Partida de Nacimiento", date: "2024-07-10", status: "Aprobado" },
    { id: "AM-2024-001", type: "Acta de Matrimonio", date: "2024-07-18", status: "En Proceso" },
    { id: "AP-2024-005", type: "Antecedentes Penales", date: "2024-07-22", status: "Solicitado" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Solicitado: "outline",
};

const quickActions = [
  { href: "/partidas-nacimiento", label: "Partida de Nacimiento", icon: Heart },
  { href: "/actas-matrimonio", label: "Acta de Matrimonio", icon: FileText },
  { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
  { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
]

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <LayoutDashboard className="h-10 w-10 text-primary" />
            Dashboard de Trámites Personales
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Tu centro de mando para gestionar documentos y solicitudes de forma fácil y segura.</p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-3">
         {kpiData.map(kpi => (
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

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map(action => (
                <Button key={action.href} asChild variant="outline" className="h-24 flex-col gap-2">
                    <Link href={action.href}>
                        <action.icon className="h-6 w-6"/>
                        <span>{action.label}</span>
                    </Link>
                </Button>
            ))}
        </CardContent>
       </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Un resumen de tus últimas solicitudes y trámites.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Tipo de Trámite</TableHead>
                        <TableHead>Fecha de Solicitud</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentActivities.map((activity) => (
                        <TableRow key={activity.id}>
                            <TableCell className="font-mono">{activity.id}</TableCell>
                            <TableCell className="font-medium">{activity.type}</TableCell>
                            <TableCell>{formatDate(activity.date)}</TableCell>
                            <TableCell className="text-center">
                                <Badge variant={statusVariant[activity.status]}>{activity.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">Ver Detalles</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
