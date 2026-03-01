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
  { title: "Gestiones en Proceso", value: "2", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/5" },
  { title: "Validaciones Listas", value: "5", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/5" },
  { title: "Alertas Activas", value: "1", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/5" },
];

const recentActivities = [
    { id: "ID-2026-X1", type: "Identidad Biométrica", date: "2024-07-10", status: "Aprobado" },
    { id: "DC-2026-A2", type: "Expediente Digital", date: "2024-07-18", status: "En Proceso" },
    { id: "AP-2026-C5", type: "Sello de Antecedentes", date: "2024-07-22", status: "Solicitado" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
            <h1 className="text-3xl font-bold tracking-tight">Portal Ciudadano</h1>
            <p className="text-muted-foreground">Gestione su identidad digital y trámites civiles.</p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <Button asChild size="lg" className="rounded-2xl px-8 h-12 shadow-lg">
                <Link href="/tarjeta-digital" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Mi Identidad Digital
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </motion.div>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="minimal-card overflow-hidden">
                  <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className={cn("p-2 rounded-xl", kpi.bg)}>
                            <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                        </span>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{kpi.title}</p>
                      </div>
                      <p className="text-3xl font-bold">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
           <Card className="minimal-card overflow-hidden">
            <CardHeader className="border-b border-border/50 pb-6">
              <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-bold">Actividad Reciente</CardTitle>
                    <CardDescription>Seguimiento de sus solicitudes en curso.</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-muted-foreground/30" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="pl-6">Referencia</TableHead>
                            <TableHead>Trámite</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right pr-6">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivities.map((activity) => (
                            <TableRow key={activity.id} className="group hover:bg-muted/30">
                                <TableCell className="font-mono text-xs text-primary pl-6">{activity.id}</TableCell>
                                <TableCell className="text-sm font-medium">{activity.type}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{formatDate(activity.date)}</TableCell>
                                <TableCell className="text-right pr-6">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-bold h-6",
                                        activity.status === 'Aprobado' ? "border-green-500/20 text-green-600 bg-green-500/5" : "text-muted-foreground"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
           <Card className="minimal-card bg-primary text-primary-foreground border-none">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Acceso Premium
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/70">Seguridad avanzada y respaldo Blockchain.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed opacity-90">
                        Su perfil está protegido con cifrado de grado bancario. Todos sus trámites cuentan con sellado inmutable.
                    </p>
                    <Button variant="secondary" asChild className="w-full rounded-xl font-bold">
                        <Link href="/tarjeta-digital">Configurar ID Digital</Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="minimal-card">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold">Alertas de Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
                        <ShieldAlert className="h-4 w-4 text-orange-500 mt-0.5" />
                        <div className="text-xs">
                            <p className="font-bold text-orange-600">Renovación de RIF</p>
                            <p className="text-muted-foreground">Su registro fiscal vence en 15 días.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </motion.div>
      </div>
    </div>
  );
}