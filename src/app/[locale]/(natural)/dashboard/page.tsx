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
    <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20 shadow-glow">
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Identity Secured
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none italic-shadow text-white">Mi Identidad</h1>
            <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Portal Ciudadano • Gestión de Activos Legales y Civiles</p>
        </div>
        
        <div className="flex gap-4">
            <Button asChild variant="outline" className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest border-white/10 hover:bg-white/5 bg-white/[0.02] backdrop-blur-xl transition-all shadow-xl">
                <Link href="/tarjeta-reciclaje">Canjear Puntos</Link>
            </Button>
            <Button asChild className="btn-3d-primary h-14 px-10 rounded-2xl shadow-2xl">
                <Link href="/tarjeta-digital" className="flex items-center gap-3">
                    <Fingerprint className="h-6 w-6" /> Mi ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="glass-card border-none relative overflow-hidden group p-2">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-1000 scale-150">
                    <kpi.icon className="w-32 h-32" />
                  </div>
                  <CardContent className="p-10">
                      <div className="flex justify-between items-center mb-12">
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30">{kpi.title}</p>
                        <div className={cn("p-5 rounded-[1.5rem] shadow-inner border border-white/5", kpi.bg)}>
                            <kpi.icon className={cn("h-6 w-6", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-5xl font-black tracking-tighter italic text-white leading-none">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-12 grid-cols-1 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Historial de Operaciones en el Ledger</CardTitle>
                <Activity className="h-5 w-5 text-primary/30" />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none">
                            <TableHead className="pl-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-30">Referencia ID</TableHead>
                            <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest opacity-30">Servicio Ejecutado</TableHead>
                            <TableHead className="text-right pr-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-30">Estado Final</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-primary/[0.03] border-b border-white/5 transition-all">
                            <TableCell className="font-mono text-[11px] font-bold text-primary pl-10 py-10 italic">ID-2026-X1-KYR</TableCell>
                            <TableCell className="py-10">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-base font-black uppercase tracking-tight text-white/90 italic">Verificación Biométrica 3D</span>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">01/03/2026</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-10 py-10">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-8 px-5 rounded-xl">Completado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="p-8 justify-center bg-white/[0.01] border-t border-white/5">
                <Button variant="link" className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-all">Acceder a registros inmutables de cadena completa</Button>
            </CardFooter>
        </Card>

        <div className="lg:col-span-4 space-y-10">
           <Card className="border-none shadow-2xl bg-primary text-primary-foreground rounded-[3rem] overflow-hidden relative group min-h-[400px] flex flex-col justify-between p-2">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-all duration-1000 scale-125">
                    <Radio className="h-48 w-56" />
                </div>
                <CardHeader className="p-10 relative z-10">
                    <CardTitle className="text-4xl font-black uppercase italic tracking-tighter text-white">Línea Kyron</CardTitle>
                    <CardDescription className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-3">Conectividad 5G Oficial</CardDescription>
                </CardHeader>
                <CardContent className="px-10 relative z-10">
                    <p className="text-lg leading-relaxed font-bold opacity-80 italic">
                        Activa tu propia línea telefónica vinculada a tu ID digital. Obtén tu eSIM oficial y navega con seguridad cuántica integrada.
                    </p>
                </CardContent>
                <CardFooter className="p-10 relative z-10">
                    <Button variant="secondary" asChild className="w-full h-16 text-[11px] font-black bg-white text-primary hover:bg-white/90 rounded-[1.5rem] uppercase tracking-[0.3em] shadow-2xl transition-all">
                        <Link href="/venta-linea">ACTIVAR MI LÍNEA <ArrowRight className="ml-3 h-5 w-5"/></Link>
                    </Button>
                </CardFooter>
           </Card>

           <Card className="glass-card border-none overflow-hidden p-2 shadow-xl">
                <CardContent className="p-10">
                    <div className="flex items-start gap-8">
                        <div className="p-5 rounded-[1.5rem] bg-rose-500/10 border border-rose-500/20 shadow-inner">
                            <ShieldAlert className="h-8 w-8 text-rose-500" />
                        </div>
                        <div className="space-y-3">
                            <p className="font-black text-rose-500 uppercase tracking-[0.3em] text-[11px]">Notificaciones Críticas</p>
                            <p className="text-white/90 font-black text-lg uppercase tracking-tight">Renovación de RIF</p>
                            <p className="text-muted-foreground text-xs leading-relaxed font-medium">Su firma digital única requiere renovación obligatoria antes del cierre del ciclo fiscal 2025.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}