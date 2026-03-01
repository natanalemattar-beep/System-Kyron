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
  { title: "Gestiones Activas", value: "2", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
  { title: "Identidad Digital", value: "Validada", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { title: "Notificaciones", value: "1 Alerta", icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-400/10" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Compacto y Potente */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-1 border border-primary/20">
                <Sparkles className="h-3 w-3 text-yellow-400" /> System Verified
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none italic-shadow">Mi Identidad</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Gestión de Activos Legales y Civiles</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild variant="outline" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest border-primary/10 hover:bg-primary/5 transition-all bg-white/5 backdrop-blur-sm">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-emerald-500" /> Puntos Eco
                </Link>
            </Button>
            <Button asChild className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest">
                <Link href="/tarjeta-digital" className="flex items-center gap-2">
                    <Fingerprint className="h-5 w-5" /> ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      {/* KPIs: Rejilla que rellena el espacio horizontal */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Card className="border-none shadow-xl bg-card/20 backdrop-blur-xl rounded-[2rem] hover:bg-card/40 transition-all duration-500 group border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                    <kpi.icon className="w-20 h-24 rotate-12" />
                  </div>
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">{kpi.title}</p>
                        <div className={cn("p-3 rounded-xl transition-all group-hover:scale-110 shadow-inner", kpi.bg)}>
                            <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-4xl font-black tracking-tighter italic leading-none group-hover:text-primary transition-colors">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12 items-start">
        {/* Historial Central */}
        <Card className="lg:col-span-8 border-none shadow-2xl bg-card/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/5">
            <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Libro de Operaciones Ciudadanas</CardTitle>
                <Activity className="h-4 w-4 text-primary/30" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none">
                            <TableHead className="pl-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Nodo Ref.</TableHead>
                            <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Actividad</TableHead>
                            <TableHead className="text-right pr-8 py-4 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-primary/5 border-b border-white/5 transition-all group">
                            <TableCell className="font-mono text-[10px] font-bold text-primary/70 pl-8 py-6">ID-2026-KYR-X1</TableCell>
                            <TableCell className="py-6">
                                <div className="flex flex-col">
                                    <span className="text-sm font-black uppercase tracking-tight group-hover:text-primary transition-all">Validación Biométrica</span>
                                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-50">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8 py-6">
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-4 rounded-lg shadow-lg">Verificado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="p-4 bg-white/[0.01] text-center border-t border-white/5">
                <Button variant="link" className="w-full text-[9px] font-black uppercase tracking-[0.2em] opacity-20 hover:opacity-100 transition-all hover:text-primary">Ver todos los registros del ledger</Button>
            </CardFooter>
        </Card>

        {/* Módulo eSIM Lateral */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-2xl bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group min-h-[300px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000">
                    <Radio className="h-32 w-32" />
                </div>
                <CardHeader className="p-8 relative z-10">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-white">Línea Kyron</CardTitle>
                    <CardDescription className="text-white/50 text-[9px] font-black uppercase tracking-[0.3em] mt-1">Operadora 5G</CardDescription>
                </CardHeader>
                <CardContent className="px-8 relative z-10">
                    <p className="text-sm leading-relaxed font-bold opacity-80 italic">
                        Activa tu eSIM oficial vinculada a tu identidad digital. Conectividad 5G con blindaje cuántico.
                    </p>
                </CardContent>
                <CardFooter className="p-8 relative z-10">
                    <Button variant="secondary" asChild className="w-full h-14 text-[10px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest shadow-2xl">
                        <Link href="/venta-linea">ACTIVAR eSIM <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardFooter>
           </Card>

           <Card className="border border-rose-500/10 shadow-xl bg-rose-500/[0.02] rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-rose-500/10">
                            <ShieldAlert className="h-5 w-5 text-rose-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-rose-600 uppercase tracking-tighter text-xs">Aviso de Seguridad</p>
                            <p className="text-rose-700/60 font-bold leading-tight text-[10px]">Actualice su firma digital antes del cierre del ciclo fiscal 2025.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}