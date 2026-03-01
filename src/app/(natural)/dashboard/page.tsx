"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, ArrowRight, User, Sparkles, Activity } from 'lucide-react';
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
    { id: "AP-2026-C5", type: "Sello de Antecedentes", date: "2024-07-22", status: "Solicitado" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Portal Ciudadano</h1>
            <p className="text-muted-foreground font-medium">Gestión unificada de identidad y trámites civiles.</p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <Button asChild size="lg" className="rounded-xl h-11 px-8 shadow-sm btn-3d-primary text-xs uppercase tracking-widest font-bold">
                <Link href="/tarjeta-digital" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    Mi Identidad Digital
                </Link>
            </Button>
        </motion.div>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border border-border/40 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className={cn("p-3 rounded-xl", kpi.bg)}>
                            <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.title}</p>
                      </div>
                      <p className="text-4xl font-bold tracking-tight">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
           <Card className="border border-border/40 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/40 p-8">
              <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-bold">Historial de Operaciones</CardTitle>
                    <CardDescription className="text-sm font-medium">Seguimiento en tiempo real de sus solicitudes.</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-muted-foreground/20" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent bg-muted/20">
                            <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Referencia</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest">Trámite</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivities.map((activity) => (
                            <TableRow key={activity.id} className="group hover:bg-muted/10">
                                <TableCell className="font-mono text-xs text-primary pl-8">{activity.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">{activity.type}</span>
                                        <span className="text-[10px] text-muted-foreground">{formatDate(activity.date)}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-bold h-6 rounded-lg",
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
        </motion.div>

        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
           <Card className="border-none shadow-lg rounded-2xl bg-primary text-primary-foreground overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles className="h-32 w-32" /></div>
                <CardHeader className="p-8 pb-4 relative z-10">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        Seguridad Premium
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-medium">Protección de datos certificada.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 relative z-10 space-y-6">
                    <p className="text-sm leading-relaxed opacity-90 font-medium">
                        Su perfil utiliza sellado Blockchain para garantizar la inmutabilidad de sus documentos civiles.
                    </p>
                    <Button variant="secondary" asChild className="w-full rounded-xl font-bold text-xs uppercase tracking-widest h-11 bg-white text-primary hover:bg-white/90">
                        <Link href="/seguridad">Configurar Seguridad</Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="border border-border/40 shadow-sm rounded-2xl">
                <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Alertas de Sistema</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2 space-y-3">
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-4">
                        <ShieldAlert className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div className="text-xs">
                            <p className="font-bold text-orange-800">Actualización de RIF</p>
                            <p className="text-orange-700/70 font-medium mt-1">Su registro fiscal requiere actualización antes del próximo periodo.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </motion.div>
      </div>
    </div>
  );
}