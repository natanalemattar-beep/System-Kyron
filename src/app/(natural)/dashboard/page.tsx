"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileWarning, ArrowRight, User, Sparkles, Activity, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones en Proceso", value: "2", icon: Clock, color: "text-yellow-500" },
  { title: "Validaciones Listas", value: "5", icon: CheckCircle, color: "text-secondary" },
  { title: "Alertas Activas", value: "1", icon: ShieldAlert, color: "text-red-500" },
];

const recentActivities = [
    { id: "ID-2026-X1", type: "Identidad Biométrica", date: "2024-07-10", status: "Aprobado" },
    { id: "DC-2026-A2", type: "Expediente Digital", date: "2024-07-18", status: "En Proceso" },
    { id: "AP-2026-C5", type: "Sello de Antecedentes", date: "2024-07-22", status: "Solicitado" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 border-l-4 border-primary pl-6 py-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic italic-shadow">Terminal Usuario</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.4em] mt-2">Centro de Control de Identidad y Trámites Civiles</p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
        >
            <Button asChild size="lg" className="btn-3d-primary h-14 px-10 group">
                <Link href="/tarjeta-digital" className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    MI IDENTIDAD 3D
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
            </Button>
        </motion.div>
      </header>
      
      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="titanium-card rounded-2xl border-white/5 hover:border-primary/20 transition-all glow-border">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{kpi.title}</p>
                        <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                      </div>
                      <p className="text-4xl font-black italic">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
           <Card className="titanium-card rounded-3xl glow-border">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Actividad del Sistema</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/20">Registro de eventos de misión en tiempo real</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-secondary">
                <Activity className="h-3 w-3 animate-pulse" /> PROCESANDO
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-[9px] font-black uppercase tracking-widest pl-8">Protocolo</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Tipo</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Timestamp</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Estado</TableHead>
                            <TableHead className="text-right pr-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivities.map((activity) => (
                            <TableRow key={activity.id} className="border-white/5 group hover:bg-white/[0.02]">
                                <TableCell className="font-mono text-[11px] font-bold text-primary pl-8">{activity.id}</TableCell>
                                <TableCell className="font-black text-[10px] uppercase tracking-tighter">{activity.type}</TableCell>
                                <TableCell className="text-[10px] text-white/40">{formatDate(activity.date)}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="outline" className={cn(
                                        "text-[8px] font-black uppercase tracking-widest h-5 px-3 border-white/10",
                                        activity.status === 'Aprobado' ? "text-secondary border-secondary/20 bg-secondary/5" : "text-white/40"
                                    )}>
                                        {activity.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg text-white/20 group-hover:text-primary group-hover:bg-primary/10">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
           <Card className="bg-[#050505] text-white border border-white/5 shadow-2xl rounded-3xl overflow-hidden relative group glow-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
                        <Sparkles className="h-6 w-6 text-primary" />
                        Nivel de Acceso 5
                    </CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/30">Privilegios de Identidad Digital Avanzada</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    <p className="text-sm font-medium text-white/60 leading-relaxed">
                        Su perfil está blindado por el motor de IA de Kyron. El sellado Blockchain garantiza que sus documentos sean 100% inmutables y verificables globalmente.
                    </p>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-lg bg-primary/20"><Cpu className="h-5 w-5 text-primary" /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white">Estado de Red</p>
                                <p className="text-[9px] font-bold text-secondary">ENLACE SÍNCRONO</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">Latencia</p>
                            <p className="text-[9px] font-bold text-white/40">12MS</p>
                        </div>
                    </div>
                    <Button variant="default" asChild className="btn-3d-primary w-full h-12">
                        <Link href="/tarjeta-digital">INGRESAR A IDENTIDAD 3D</Link>
                    </Button>
                </CardContent>
           </Card>
        </motion.div>
      </div>
    </div>
  );
}