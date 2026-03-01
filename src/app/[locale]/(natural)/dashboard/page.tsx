
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, Smartphone, Recycle, Sparkles, ArrowRight, Activity, Fingerprint, Radio, Zap } from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones Activas", value: "2", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "Identidad Digital", value: "Validada", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/5" },
  { title: "Notificaciones", value: "1 Alerta", icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-400/5" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header: Más aireado y elegante */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-2 border-primary/30 pl-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2 border border-primary/10">
                <Sparkles className="h-3 w-3 text-yellow-400" /> Kyron Secured Node
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none text-white italic-shadow">Mi Identidad</h1>
            <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.5em] opacity-30">Panel de Control de Activos Civiles</p>
        </div>
        
        <div className="flex gap-4">
            <Button asChild variant="outline" className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest border-white/5 hover:bg-white/5 transition-all bg-white/2 backdrop-blur-md">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-3">
                    <Recycle className="h-5 w-5 text-emerald-500" /> Eco-Créditos
                </Link>
            </Button>
            <Button asChild className="btn-3d-primary h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <Link href="/tarjeta-digital" className="flex items-center gap-3">
                    <Fingerprint className="h-6 w-6" /> ID Digital 3D
                </Link>
            </Button>
        </div>
      </header>
      
      {/* KPIs: Más ligeros y menos 'caja' */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1 }}
            >
              <Card className="border-none shadow-2xl bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] hover:bg-white/[0.04] transition-all duration-700 group border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.01] group-hover:opacity-[0.03] transition-all duration-1000">
                    <kpi.icon className="w-32 h-32 rotate-6" />
                  </div>
                  <CardContent className="p-10">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">{kpi.title}</p>
                        <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110 shadow-inner border border-white/5", kpi.bg)}>
                            <kpi.icon className={cn("h-6 w-6", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-5xl font-black tracking-tighter italic leading-none text-white/90 group-hover:text-primary transition-colors">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-12 grid-cols-1 lg:grid-cols-12 items-start">
        {/* Historial: Sin fondos pesados */}
        <Card className="lg:col-span-8 border-none shadow-2xl bg-white/[0.01] backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/5">
            <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Historial del Ledger Ciudadano</CardTitle>
                <Activity className="h-5 w-5 text-primary/20" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none hover:bg-transparent">
                            <TableHead className="pl-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-20">Hash / Nodo</TableHead>
                            <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest opacity-20">Operación</TableHead>
                            <TableHead className="text-right pr-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-20">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-primary/[0.03] border-b border-white/5 transition-all group">
                            <TableCell className="font-mono text-[11px] font-bold text-primary/50 pl-10 py-8 italic tracking-tighter">ID-2026-X1-KYR</TableCell>
                            <TableCell className="py-8">
                                <div className="flex flex-col">
                                    <span className="text-base font-black uppercase tracking-tight text-white/80 group-hover:text-primary transition-all">Verificación Biométrica 3D</span>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-40">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-10 py-8">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-emerald-500/10 text-emerald-400 bg-emerald-500/5 h-7 px-5 rounded-xl shadow-lg">Completado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="p-6 bg-white/[0.01] text-center border-t border-white/5">
                <Button variant="link" className="w-full text-[10px] font-black uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition-all hover:text-primary">Acceder a registros inmutables de cadena completa</Button>
            </CardFooter>
        </Card>

        {/* Módulo eSIM: Destacado pero ligero */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none shadow-2xl bg-primary text-primary-foreground rounded-[3rem] overflow-hidden relative group min-h-[350px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000">
                    <Radio className="h-40 w-40" />
                </div>
                <CardHeader className="p-10 relative z-10">
                    <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white">Línea Kyron</CardTitle>
                    <CardDescription className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Conectividad 5G Oficial</CardDescription>
                </CardHeader>
                <CardContent className="px-10 relative z-10">
                    <p className="text-base leading-relaxed font-bold opacity-70 italic">
                        Activa tu propia línea telefónica vinculada a tu ID digital. Obtén tu eSIM oficial y navega con seguridad cuántica integrada.
                    </p>
                </CardContent>
                <CardFooter className="p-10 relative z-10">
                    <Button variant="secondary" asChild className="w-full h-16 text-[11px] font-black bg-white text-primary hover:bg-white/90 rounded-2xl uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95">
                        <Link href="/venta-linea">ACTIVAR MI LÍNEA <ArrowRight className="ml-2 h-5 w-5"/></Link>
                    </Button>
                </CardFooter>
           </Card>

           <Card className="border border-white/5 shadow-2xl bg-white/[0.02] rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-10">
                    <div className="flex items-start gap-6">
                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 shadow-inner">
                            <ShieldAlert className="h-6 w-6 text-rose-500" />
                        </div>
                        <div className="space-y-2">
                            <p className="font-black text-rose-500 uppercase tracking-widest text-[10px]">Notificaciones Críticas</p>
                            <p className="text-white/60 font-bold leading-tight text-xs">Actualización de RIF</p>
                            <p className="text-muted-foreground text-[10px] leading-relaxed">Su firma digital única requiere renovación obligatoria antes del cierre del ciclo fiscal 2025.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
