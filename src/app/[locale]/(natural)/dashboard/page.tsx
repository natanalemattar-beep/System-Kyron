
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, Smartphone, Recycle, Sparkles, ArrowRight, Activity, Fingerprint, Radio } from 'lucide-react';
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
    <div className="space-y-8 w-full">
      {/* Header con Identidad Refinada - Sin límites de ancho para aprovechar la laptop */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-2 border border-primary/10">
                <Sparkles className="h-3 w-3" /> System Verified
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic leading-none text-foreground">Mi Identidad</h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] opacity-50">Portal Ciudadano • Gestión de Activos Legales y Civiles</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild variant="outline" className="h-12 px-6 rounded-2xl font-bold text-[10px] uppercase tracking-widest border-primary/10 hover:bg-primary/5 shadow-inner">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-2">
                    <Recycle className="h-5 w-5 text-emerald-500" /> Canjear Puntos
                </Link>
            </Button>
            <Button asChild className="btn-3d-primary h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                <Link href="/tarjeta-digital" className="flex items-center gap-2">
                    <Fingerprint className="h-5 w-5" /> Mi ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      {/* Grid de KPIs - Se expande a todo lo ancho */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg bg-card/40 backdrop-blur-md rounded-[2rem] hover:bg-card/60 transition-all group border border-white/5">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{kpi.title}</p>
                        <div className={cn("p-3 rounded-2xl transition-all group-hover:scale-110 shadow-inner", kpi.bg)}>
                            <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-4xl font-black tracking-tighter italic leading-none">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12 items-start">
        {/* Historial Extendido - Ocupa la mayor parte del ancho */}
        <Card className="lg:col-span-8 border-none shadow-xl bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5">
            <CardHeader className="p-8 border-b border-white/5 bg-muted/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-primary">Historial de Operaciones en el Ledger</CardTitle>
                <Activity className="h-4 w-4 text-primary/40" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/20 border-none">
                            <TableHead className="pl-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-50">Referencia ID</TableHead>
                            <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest opacity-50">Servicio Ejecutado</TableHead>
                            <TableHead className="text-right pr-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-50">Estado Final</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-primary/5 border-b border-white/5 transition-all group">
                            <TableCell className="font-mono text-xs font-bold text-primary pl-8 py-6">ID-2026-X1-KYR</TableCell>
                            <TableCell className="py-6">
                                <div className="flex flex-col">
                                    <span className="text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors">Verificación Biométrica 3D</span>
                                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8 py-6">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-emerald-500/30 text-emerald-500 bg-emerald-500/5 h-6 px-3 rounded-lg shadow-sm">Completado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <div className="p-4 bg-muted/5 text-center border-t border-white/5">
                <Button variant="link" className="text-[9px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-all">Acceder a registros inmutables de cadena completa</Button>
            </div>
        </Card>

        {/* Columna Lateral - Conectividad */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-2xl bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group min-h-[300px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                    <Radio className="h-32 w-32" />
                </div>
                <CardHeader className="p-8 relative z-10">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-white">Línea Kyron</CardTitle>
                    <CardDescription className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Conectividad 5G Oficial</CardDescription>
                </CardHeader>
                <CardContent className="px-8 relative z-10">
                    <p className="text-sm leading-relaxed font-medium opacity-90">
                        Activa tu propia línea telefónica vinculada a tu ID digital. Obtén tu eSIM oficial y navega con seguridad cuántica integrada.
                    </p>
                </CardContent>
                <CardFooter className="p-8 relative z-10">
                    <Button variant="secondary" asChild className="w-full h-14 text-xs font-black bg-white text-primary hover:bg-white/90 rounded-2xl uppercase tracking-widest shadow-xl">
                        <Link href="/venta-linea">ACTIVAR MI LÍNEA <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardFooter>
           </Card>

           <Card className="border border-rose-500/20 shadow-lg bg-rose-500/[0.03] rounded-[2rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                    <ShieldAlert className="h-20 w-20" />
                </div>
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500/70">Notificaciones Críticas</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="p-5 rounded-[1.5rem] bg-rose-500/5 border border-rose-500/10 flex items-start gap-4 shadow-inner">
                        <ShieldAlert className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
                        <div className="space-y-1.5">
                            <p className="font-black text-rose-600 uppercase tracking-tighter text-xs">Actualización de RIF</p>
                            <p className="text-rose-700/70 font-bold leading-tight text-[10px]">Su firma digital única requiere renovación obligatoria antes del cierre del ciclo fiscal 2025.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
