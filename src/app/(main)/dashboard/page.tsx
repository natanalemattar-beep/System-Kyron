
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileWarning, ArrowRight, FileText, Heart, Gavel } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const kpiData = [
  { title: "Trámites en Proceso", value: "2", icon: Clock, color: "text-yellow-500", href: "/#tramites" },
  { title: "Documentos Listos", value: "5", icon: CheckCircle, color: "text-green-500", href: "/documentos" },
  { title: "Alertas o Vencimientos", value: "1", icon: FileWarning, color: "text-red-500", href: "/notificaciones" },
];

const recentActivities = [
    { id: "PN-2024-001", type: "Partida de Nacimiento", date: "2024-07-10", status: "Aprobado", href: "/partidas-nacimiento" },
    { id: "AM-2024-001", type: "Acta de Matrimonio", date: "2024-07-18", status: "En Proceso", href: "/actas-matrimonio" },
    { id: "AP-2024-005", type: "Antecedentes Penales", date: "2024-07-22", status: "Solicitado", href: "/antecedentes-penales" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Solicitado: "outline",
};

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bienvenido, Usuario
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Tu centro de mando para gestionar documentos y solicitudes de forma fácil y segura.</p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-3">
         {kpiData.map(kpi => (
            <Link href={kpi.href} key={kpi.title}>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{kpi.value}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>

      <Card id="tramites">
        <CardHeader>
          <CardTitle>Actividad Reciente de Trámites</CardTitle>
          <CardDescription>Un resumen de tus últimas solicitudes y su estado actual.</CardDescription>
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
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={activity.href}>Ver Detalles <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                </Button>
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
