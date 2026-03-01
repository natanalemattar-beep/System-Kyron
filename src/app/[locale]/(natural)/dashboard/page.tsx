
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
    <div className="space-y-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Refinado y Acoplado */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-8 border-primary pl-10 py-4">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2 border border-primary/20 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> System Verified
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none italic-shadow">Mi Identidad</h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.4em] opacity-40">Gestión de Activos Legales y Civiles Digitales</p>
        </div>
        
        <div className="flex gap-4">
            <Button asChild variant="outline" className="h-16 px-8 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-primary/10 hover:bg-primary/5 transition-all bg-white/5 backdrop-blur-sm">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-3">
                    <Recycle className="h-5 w-5 text-emerald-500" /> Canjear Puntos
                </Link>
            </Button>
            <Button asChild className="btn-3d-primary h-16 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em]">
                <Link href="/tarjeta-digital" className="flex items-center gap-3">
                    <Fingerprint className="h-6 w-6" /> Mi ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      {/* Grid de KPIs - Máximo Relleno */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Card className="border-none shadow-2xl bg-card/30 backdrop-blur-xl rounded-[2.5rem] hover:bg-card/50 transition-all duration-500 group border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
                    <kpi.icon className="w-24 h-24 rotate-12" />
                  </div>
                  <CardContent className="p-10">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">{kpi.title}</p>
                        <div className={cn("p-4 rounded-2xl transition-all group-hover:scale-110 shadow-inner", kpi.bg)}>
                            <kpi.icon className={cn("h-6 w-6", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-5xl font-black tracking-tighter italic leading-none group-hover:text-primary transition-colors">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-10 grid-cols-1 lg:grid-cols-12 items-start">
        {/* Historial Extendido */}
        <Card className="lg:col-span-8 border-none shadow-2xl bg-card/20 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/5">
            <CardHeader className="p-10 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Historial del Ledger Ciudadano</CardTitle>
                <Activity className="h-5 w-5 text-primary/30" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none">
                            <TableHead className="pl-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Referencia del Nodo</TableHead>
                            <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Operación Civil</TableHead>
                            <TableHead className="text-right pr-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-primary/5 border-b border-white/5 transition-all group">
                            <TableCell className="font-mono text-xs font-bold text-primary/80 pl-10 py-8">ID-KYR-2026-X1</TableCell>
                            <TableCell className="py-8">
                                <div className="flex flex-col">
                                    <span className="text-base font-black uppercase tracking-tight group-hover:text-primary transition-all">Verificación Biométrica 3D</span>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1.5 opacity-60">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-10 py-8">
                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-emerald-500/30 text-emerald-400 bg-emerald-500/5 h-8 px-5 rounded-xl shadow-lg">Certificado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <div className="p-6 bg-white/[0.01] text-center border-t border-white/5">
                <Button variant="link" className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-all hover:text-primary">Acceso a Registros de Cadena Inmutable</Button>
            </div>
        </Card>

        {/* Columna de Conectividad Pura */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)] bg-primary text-primary-foreground rounded-[3rem] overflow-hidden relative group min-h-[350px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 group-hover:scale-125 transition-all duration-1000">
                    <Radio className="h-40 w-40" />
                </div>
                <CardHeader className="p-10 relative z-10">
                    <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white">Línea Kyron</CardTitle>
                    <CardDescription className="text-white/60 text-[11px] font-black uppercase tracking-[0.4em] mt-2">Operadora 5G Digital</CardDescription>
                </CardHeader>
                <CardContent className="px-10 relative z-10">
                    <p className="text-base leading-relaxed font-bold opacity-90 italic">
                        Activa tu propia línea oficial vinculada a tu ID. Obtén tu eSIM digital y navega bajo el blindaje del ecosistema.
                    </p>
                </CardContent>
                <CardFooter className="p-10 relative z-10">
                    <Button variant="secondary" asChild className="w-full h-16 text-xs font-black bg-white text-primary hover:bg-white/90 rounded-2xl uppercase tracking-widest shadow-2xl transition-transform active:scale-95">
                        <Link href="/venta-linea">ACTIVAR eSIM OFICIAL <ArrowRight className="ml-3 h-5 w-5"/></Link>
                    </Button>
                </CardFooter>
           </Card>

           <Card className="border border-rose-500/20 shadow-2xl bg-rose-500/[0.03] rounded-[2.5rem] overflow-hidden relative">
                <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500/60">Alertas de Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="px-10 pb-10">
                    <div className="p-6 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 flex items-start gap-5 shadow-inner">
                        <ShieldAlert className="h-8 w-8 text-rose-500 shrink-0 mt-1" />
                        <div className="space-y-2">
                            <p className="font-black text-rose-600 uppercase tracking-tighter text-sm italic">Actualización de Firma</p>
                            <p className="text-rose-700/70 font-bold leading-snug text-xs">Su identificador único de contribuyente requiere re-validación biométrica antes del ciclo fiscal 2025.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
