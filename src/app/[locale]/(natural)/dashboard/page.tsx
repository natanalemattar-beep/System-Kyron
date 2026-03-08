
"use client";

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, Fingerprint, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones", value: "2", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "ID Digital", value: "VALIDADA", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/5" },
  { title: "Alertas", value: "1 CRÍTICA", icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-400/5" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-12 w-full animate-in fade-in duration-700 px-8 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/10">
                <Sparkles className="h-3 w-3 text-yellow-400/80" /> Secure Node 2.6.5
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white italic-shadow">Mi Identidad</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Activos Legales y Civiles Consolidados</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild variant="outline" className="h-10 px-6 rounded-xl font-bold text-[9px] uppercase tracking-widest border-white/5 hover:bg-white/5 transition-all shadow-xl">
                <Link href="/tarjeta-reciclaje">ECO-CRÉDITOS</Link>
            </Button>
            <Button asChild className="h-10 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest btn-3d-primary">
                <Link href="/tarjeta-digital" className="flex items-center gap-2.5">
                    <Fingerprint className="h-4 w-4" /> ID DIGITAL
                </Link>
            </Button>
        </div>
      </header>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/[0.02] border-white/5 rounded-[1.5rem] overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-xl">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">{kpi.title}</p>
                        <div className={cn("p-3 rounded-xl border border-white/5 transition-transform group-hover:-rotate-6", kpi.bg)}>
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
        <Card className="lg:col-span-8 bg-white/[0.01] border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Operaciones Inmutables</h3>
                <Activity className="h-4 w-4 text-primary/20" />
            </div>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Referencia</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Servicio</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-white/[0.02] border-white/5 transition-all">
                            <TableCell className="font-mono text-[10px] font-black text-primary pl-10 py-6 italic">ID-2026-X1-KYR</TableCell>
                            <TableCell className="py-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black uppercase tracking-tight text-white/80">Verificación Biométrica 3D</span>
                                    <span className="text-[9px] text-muted-foreground font-bold uppercase opacity-30 tracking-widest">04 Mar, 2026</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-10 py-6">
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-7 px-3 rounded-lg">VALIDADO</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group p-1 shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <Activity className="h-32 w-32" />
                </div>
                <div className="p-8 space-y-6 relative z-10 bg-primary rounded-[1.9rem]">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Línea Kyron</CardTitle>
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40">Hyper-Connect 5G</p>
                    </div>
                    <p className="text-xs leading-relaxed font-bold opacity-80 italic">
                        Activa tu línea vinculada a tu ID digital oficial para acceso preferente.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-11 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest">
                        <Link href="/venta-linea">ACTIVAR <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </div>
           </Card>

           <Card className="bg-white/[0.02] border-white/5 rounded-[1.5rem] p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 shadow-inner">
                        <ShieldAlert className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-black text-rose-500 uppercase tracking-[0.3em] text-[9px]">Alerta</p>
                        <p className="text-white/90 font-black text-base uppercase tracking-tight italic">Renovación RIF</p>
                        <p className="text-muted-foreground text-[10px] leading-relaxed font-medium">Su registro requiere actualización inmediata para el ciclo 2026.</p>
                    </div>
                </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
