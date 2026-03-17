
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck as CheckCircle, Clock, ShieldAlert, User, Smartphone, Recycle } from 'lucide-react';
import Link from 'next/link';
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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight uppercase italic">Portal Ciudadano</h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">Gestión de Identidad System Kyron</p>
        </div>
        
        <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="h-10 px-6 rounded-xl font-bold text-[10px] uppercase">
                <Link href="/tarjeta-reciclaje" className="flex items-center gap-2">
                    <Recycle className="h-4 w-4" /> Eco-Créditos
                </Link>
            </Button>
            <Button asChild size="sm" className="btn-3d-primary h-10 px-6 rounded-xl font-black text-[10px] uppercase">
                <Link href="/tarjeta-digital" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Mi ID Digital
                </Link>
            </Button>
        </div>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border shadow-sm bg-card/50 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</p>
                        <div className={cn("p-2 rounded-lg", kpi.bg)}>
                            <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-3xl font-black tracking-tighter italic">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 border shadow-sm bg-card/50 backdrop-blur-sm rounded-[2rem]">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-sm font-black uppercase tracking-tight">Historial de Operaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Referencia</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Servicio</TableHead>
                            <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-muted/5 border-b">
                            <TableCell className="font-mono text-xs font-bold text-primary pl-8">ID-2026-X1</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">Identidad Biométrica</span>
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase">{formatDate(new Date())}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-green-200 text-green-700 bg-green-50 h-5">Aprobado</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="border shadow-lg bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                    <Smartphone className="h-20 w-20" />
                </div>
                <CardHeader className="p-8">
                    <CardTitle className="text-lg font-black uppercase italic tracking-tighter">Telefonía & Datos</CardTitle>
                    <CardDescription className="text-primary-foreground/70 text-[10px] font-bold uppercase tracking-widest">Servicios Integrados</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-4">
                    <p className="text-xs leading-relaxed font-medium">
                        Activa tu línea 5G con asignación inmediata de número y disfruta de la red más rápida del ecosistema.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-12 text-xs font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-tighter">
                        <Link href="/venta-linea">GESTIONAR LÍNEA</Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="border shadow-sm bg-card/50 backdrop-blur-sm rounded-[2rem]">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Alertas Críticas</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                        <ShieldAlert className="h-4 w-4 text-red-600 mt-0.5" />
                        <div className="text-[10px]">
                            <p className="font-black text-red-800 uppercase">Actualización de RIF</p>
                            <p className="text-red-700/70 mt-1 font-medium leading-tight">Su registro requiere renovación obligatoria antes del cierre del periodo fiscal.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
