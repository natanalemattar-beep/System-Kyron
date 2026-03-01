
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, Smartphone, Recycle, Sparkles, ArrowRight, Activity, Fingerprint } from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones Activas", value: "2", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Identidad Digital", value: "Validada", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Notificaciones", value: "1 Alerta", icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Sección con Identidad Refinada y Proporcional */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-2 border-primary pl-6 py-1">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-1 border border-primary/10">
                <Sparkles className="h-3 w-3" /> System Verified
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase italic leading-none text-foreground">Mi Identidad</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Portal Ciudadano • Gestión de Activos Legales</p>
        </div>
        
        <div className="flex gap-2">
            <Button asChild variant="outline" className="h-10 px-5 rounded-xl font-bold text-[9px] uppercase tracking-widest border-primary/10 hover:bg-primary/5">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-emerald-500" /> Canjear Puntos
                </Link>
            </Button>
            <Button asChild className="btn-3d-primary h-10 px-5 rounded-xl font-black text-[9px] uppercase tracking-widest">
                <Link href="/tarjeta-digital" className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" /> Mi ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      {/* Grid de KPIs - Optimizado para resolución de Laptop */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-sm bg-card/40 backdrop-blur-md rounded-[1.5rem] hover:bg-card/60 transition-colors group">
                  <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.title}</p>
                        <div className={cn("p-2 rounded-xl transition-all group-hover:scale-110", kpi.bg)}>
                            <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-2xl font-black tracking-tighter italic leading-none">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-start">
        {/* Historial - Ocupa más espacio central */}
        <Card className="lg:col-span-8 border-none shadow-sm bg-card/40 backdrop-blur-md rounded-[2rem] overflow-hidden">
            <CardHeader className="p-6 border-b border-white/5 bg-muted/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Historial de Operaciones</CardTitle>
                <Activity className="h-3 w-3 text-primary/40" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/20 border-none">
                            <TableHead className="pl-6 text-[8px] font-black uppercase tracking-widest opacity-50">Referencia</TableHead>
                            <TableHead className="text-[8px] font-black uppercase tracking-widest opacity-50">Servicio</TableHead>
                            <TableHead className="text-right pr-6 text-[8px] font-black uppercase tracking-widest opacity-50">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-primary/5 border-b border-white/5 transition-colors">
                            <TableCell className="font-mono text-[10px] font-bold text-primary pl-6">ID-2026-X1</TableCell>
                            <TableCell>
                                <div className="flex flex-col py-1.5">
                                    <span className="text-xs font-bold uppercase tracking-tight">Verificación Biométrica</span>
                                    <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-500 bg-emerald-500/5 h-5 px-2">Completado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <div className="p-3 bg-muted/5 text-center">
                <Button variant="link" className="text-[8px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Acceder a registros en cadena</Button>
            </div>
        </Card>

        {/* Columna Lateral de Acciones Compacta */}
        <div className="lg:col-span-4 space-y-4">
           <Card className="border-none shadow-xl bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                    <Smartphone className="h-20 w-20" />
                </div>
                <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Hardware Pro X</CardTitle>
                    <CardDescription className="text-white/70 text-[8px] font-bold uppercase tracking-widest">Activar Conectividad</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-4">
                    <p className="text-[11px] leading-relaxed font-medium opacity-80">
                        Integra tu identidad digital con el smartphone Kyron Pro X y recibe tu línea 5G al instante.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-10 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest">
                        <Link href="/venta-linea">EXPLORAR TIENDA <ArrowRight className="ml-1.5 h-3 w-3"/></Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="border border-rose-500/10 shadow-sm bg-rose-500/[0.02] rounded-[1.5rem]">
                <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-[8px] font-black uppercase tracking-[0.3em] text-rose-500/60">Notificaciones Críticas</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-3">
                        <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <div className="text-[10px]">
                            <p className="font-black text-rose-600 uppercase tracking-tighter">Actualización de RIF</p>
                            <p className="text-rose-700/60 mt-1 font-medium leading-tight text-[9px]">Su firma digital requiere renovación antes del cierre del periodo fiscal.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
