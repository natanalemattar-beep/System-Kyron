"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShieldAlert, User, Smartphone, Recycle, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Gestiones Activas", value: "2", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "ID Verificada", value: "OK", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { title: "Alertas", value: "1", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-6 py-2">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest mb-2 border border-primary/10">
                <Sparkles className="h-3 w-3" /> Ledger Validated
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Mi Identidad</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Centro de Gestión Ciudadana Kyron</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest border-primary/10 hover:bg-primary/5 shadow-inner">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-3">
                    <Recycle className="h-5 w-5 text-secondary" /> Eco-Créditos
                </Link>
            </Button>
            <Button asChild size="lg" className="btn-3d-primary h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                <Link href="/tarjeta-digital" className="flex items-center gap-3">
                    <User className="h-5 w-5" /> Mi ID Digital
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
              <Card className="border-2 border-transparent hover:border-primary/5 shadow-sm bg-card/50 backdrop-blur-sm rounded-[2rem] transition-all group">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.title}</p>
                        <div className={cn("p-3 rounded-2xl transition-transform group-hover:-rotate-6", kpi.bg)}>
                            <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-4xl font-black tracking-tighter italic leading-none">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 border shadow-sm bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b bg-muted/10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary">Historial de Operaciones Legales</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 border-none">
                            <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Referencia</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Servicio</TableHead>
                            <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-muted/5 border-b border-border/50">
                            <TableCell className="font-mono text-[10px] font-bold text-primary pl-8 uppercase">ID-2026-X1</TableCell>
                            <TableCell>
                                <div className="flex flex-col py-2">
                                    <span className="text-sm font-black uppercase tracking-tight">Identidad Biométrica</span>
                                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-green-200 text-green-700 bg-green-50/50 h-6 px-3">Validado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <div className="p-4 bg-muted/5 text-center">
                <Button variant="link" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Ver registro inmutable completo</Button>
            </div>
        </Card>

        <div className="space-y-6">
           <Card className="border-none shadow-2xl bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group h-full flex flex-col">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
                    <Smartphone className="h-32 w-32" />
                </div>
                <CardHeader className="p-8 pb-4 relative z-10">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter leading-none">Kyron Pro X</CardTitle>
                    <CardDescription className="text-primary-foreground/70 text-[9px] font-black uppercase tracking-[0.3em] mt-2">Hardware & Conectividad</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-6 relative z-10 flex-grow">
                    <p className="text-sm leading-relaxed font-medium opacity-90">
                        Tu identidad digital merece el mejor hardware. Activa tu Smartphone Kyron Pro X con línea 5G integrada hoy mismo.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-14 text-[10px] font-black bg-white text-primary hover:bg-white/90 rounded-2xl uppercase tracking-widest shadow-xl">
                        <Link href="/venta-linea">ACTIVAR DISPOSITIVO <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="border-2 border-red-500/10 shadow-sm bg-red-500/[0.02] rounded-[2.5rem]">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500/60">Notificaciones Críticas</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="p-5 rounded-[1.5rem] bg-red-500/5 border border-red-500/10 flex items-start gap-4">
                        <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="text-[11px]">
                            <p className="font-black text-red-600 uppercase tracking-tighter text-sm italic">Actualización de RIF</p>
                            <p className="text-red-700/70 mt-1.5 font-semibold leading-snug">Su firma digital requiere renovación obligatoria ante el SENIAT para mantener la validez legal de sus documentos.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}