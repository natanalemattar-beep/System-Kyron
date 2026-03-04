"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, Radio, Zap, Fingerprint, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones Activas", value: "2", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "ID Digital", value: "Validada", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/5" },
  { title: "Notificaciones", value: "1 Alerta", icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-400/5" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-12 w-full animate-in fade-in duration-700 max-w-screen-2xl mx-auto px-4">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-2 border-primary/30 pl-6 py-1">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.3em] border border-primary/10">
                <Sparkles className="h-3 w-3 text-yellow-400/80" /> Identity Secured
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white">Mi Identidad</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Gestión de Activos Legales y Civiles</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild variant="outline" className="h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest border-white/5 hover:bg-white/5 transition-all">
                <Link href="/tarjeta-reciclaje">Canjear Puntos</Link>
            </Button>
            <Button asChild className="h-10 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest shadow-lg hover:brightness-110 transition-all">
                <Link href="/tarjeta-digital" className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" /> Mi ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/[0.02] border-white/5 rounded-2xl overflow-hidden group hover:bg-white/[0.04] transition-all">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">{kpi.title}</p>
                        <div className={cn("p-3 rounded-xl border border-white/5", kpi.bg)}>
                            <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-3xl font-black tracking-tighter italic text-white/90 leading-none">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        <Card className="lg:col-span-8 bg-white/[0.01] border-white/5 rounded-[1.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-white/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Historial de Operaciones</CardTitle>
                <Activity className="h-4 w-4 text-primary/20" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none">
                            <TableHead className="pl-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Referencia</TableHead>
                            <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Servicio</TableHead>
                            <TableHead className="text-right pr-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-white/[0.02] border-white/5 transition-all">
                            <TableCell className="font-mono text-[10px] font-bold text-primary pl-8 py-6 italic">ID-2026-X1-KYR</TableCell>
                            <TableCell className="py-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black uppercase tracking-tight text-white/80">Verificación Biométrica</span>
                                    <span className="text-[9px] text-muted-foreground font-bold uppercase opacity-30">01/03/2026</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8 py-6">
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-3 rounded-lg">Completado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group p-1">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-700">
                    <Radio className="h-32 w-32" />
                </div>
                <div className="p-8 space-y-6 relative z-10">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Línea Kyron</CardTitle>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Conectividad 5G Oficial</p>
                    </div>
                    <p className="text-sm leading-relaxed font-bold opacity-80 italic">
                        Activa tu propia línea telefónica vinculada a tu ID digital oficial.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-12 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest shadow-xl">
                        <Link href="/venta-linea">ACTIVAR AHORA <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </div>
           </Card>

           <Card className="bg-white/[0.02] border-white/5 rounded-[1.5rem] p-6 shadow-xl">
                <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <ShieldAlert className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-black text-rose-500 uppercase tracking-[0.2em] text-[9px]">Notificación</p>
                        <p className="text-white/90 font-black text-sm uppercase tracking-tight">Renovación de RIF</p>
                        <p className="text-muted-foreground text-[10px] leading-relaxed font-medium">Su registro requiere renovación antes del ciclo 2025.</p>
                    </div>
                </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
