"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, User, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones en Proceso", value: "2", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Validaciones Listas", value: "5", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { title: "Alertas Activas", value: "1", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
];

const recentActivities = [
    { id: "ID-2026-X1", type: "Identidad Biométrica", date: "2024-07-10", status: "Aprobado" },
    { id: "DC-2026-A2", type: "Expediente Digital", date: "2024-07-18", status: "En Proceso" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Portal Ciudadano</h1>
            <p className="text-muted-foreground text-sm font-medium">Gestión unificada de identidad y trámites civiles.</p>
        </div>
        
        <Button asChild size="sm" className="btn-3d-primary h-10 px-6 rounded-xl">
            <Link href="/tarjeta-digital" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Mi Identidad Digital
            </Link>
        </Button>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</p>
                        <div className={cn("p-2 rounded-lg", kpi.bg)}>
                            <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-4xl font-black tracking-tighter">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 border shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="p-6 border-b">
              <CardTitle className="text-lg font-bold">Historial de Operaciones</CardTitle>
              <CardDescription>Seguimiento en tiempo real de sus solicitudes.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="pl-6 text-[10px] font-bold uppercase tracking-widest">Ref.</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest">Trámite</TableHead>
                            <TableHead className="text-right pr-6 text-[10px] font-bold uppercase tracking-widest">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivities.map((activity) => (
                            <TableRow key={activity.id} className="hover:bg-muted/5">
                                <TableCell className="font-mono text-xs text-primary pl-6">{activity.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{activity.type}</span>
                                        <span className="text-[10px] text-muted-foreground">{formatDate(activity.date)}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-bold",
                                        activity.status === 'Aprobado' ? "border-green-200 text-green-700 bg-green-50" : "text-muted-foreground"
                                    )}>
                                        {activity.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="border shadow-lg bg-primary text-primary-foreground">
                <CardHeader className="p-6">
                    <CardTitle className="text-lg font-bold">Seguridad Premium</CardTitle>
                    <CardDescription className="text-primary-foreground/70 text-xs">Protección de datos certificada.</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                    <p className="text-xs leading-relaxed font-medium">
                        Su perfil utiliza sellado Blockchain para garantizar la inmutabilidad de sus documentos civiles.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-10 text-xs font-bold bg-white text-primary hover:bg-white/90 rounded-xl">
                        <Link href="/seguridad">CONFIGURAR SEGURIDAD</Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="border shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-6">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Alertas de Sistema</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
                        <ShieldAlert className="h-4 w-4 text-orange-600 mt-0.5" />
                        <div className="text-xs">
                            <p className="font-bold text-orange-800">Actualización de RIF</p>
                            <p className="text-orange-700/70 mt-1">Su registro requiere renovación obligatoria antes del 30/08.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
