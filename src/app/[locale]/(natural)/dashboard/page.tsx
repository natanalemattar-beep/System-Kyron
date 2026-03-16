
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    CheckCircle, 
    Clock, 
    ShieldAlert, 
    User, 
    FileText, 
    Stethoscope, 
    Scale, 
    History,
    ChevronRight,
    Search,
    Lock,
    LifeBuoy
} from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const kpiData = [
  { title: "Expediente Civil", value: "Completo", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", desc: "4 documentos verificados" },
  { title: "ID Digital 3D", value: "Nivel 5", icon: Lock, color: "text-primary", bg: "bg-primary/5", desc: "Acceso Seguro Activado" },
  { title: "Gestiones", value: "2 Activas", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", desc: "1 respuesta pendiente" },
  { title: "Salud Cobertura", value: "Vigente", icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Red El Ávila activa" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-foreground/90">Mi Terminal <span className="text-primary">Ciudadana</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Historial Unificado • Carlos Mattar</p>
        </div>
        
        <div className="flex gap-2">
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Buscar trámite..." className="h-9 w-64 rounded-xl pl-9 text-[9px] font-bold uppercase bg-white/5 border-border" />
            </div>
            <Button asChild size="sm" className="btn-3d-primary h-9 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest">
                <Link href="/tarjeta-digital">ID DIGITAL</Link>
            </Button>
        </div>
      </header>
      
      {/* KPIs Compactos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-sm bg-card/40 backdrop-blur-sm rounded-2xl group hover:bg-white/[0.05] transition-all">
                  <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[8px] font-black uppercase tracking-0.2em text-muted-foreground/60">{kpi.title}</p>
                        <div className={cn("p-2 rounded-lg", kpi.bg, kpi.color)}>
                            <kpi.icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <p className="text-lg font-black italic tracking-tighter text-foreground/90 leading-none">{kpi.value}</p>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mt-2 tracking-widest">{kpi.desc}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Historial Principal */}
        <Card className="lg:col-span-8 border-none shadow-xl bg-card/40 backdrop-blur-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-border/50 bg-muted/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary">Estado de Solicitudes</CardTitle>
                <CardDescription className="text-[10px] font-bold text-muted-foreground mt-1">Trámites ante registros y notarías</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest text-primary">HISTÓRICO</Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 border-none">
                            <TableHead className="pl-8 text-[9px] font-black uppercase tracking-widest">Referencia</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Servicio Institucional</TableHead>
                            <TableHead className="text-right pr-8 text-[9px] font-black uppercase tracking-widest">Estatus</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { ref: "CIV-2026-X1", label: "Cédula Digital", date: "15/03/2026", status: "Aprobado", color: "text-emerald-500", bg: "bg-emerald-50" },
                            { ref: "REG-2026-M4", label: "Partida de Nacimiento", date: "12/03/2026", status: "En Proceso", color: "text-blue-500", bg: "bg-blue-50" },
                            { ref: "FIS-2026-R9", label: "Actualización RIF", date: "Hoy", status: "Acción Requerida", color: "text-rose-500", bg: "bg-rose-50" },
                        ].map((row, i) => (
                            <TableRow key={i} className="hover:bg-muted/5 border-b border-border/50 group">
                                <TableCell className="font-mono text-[10px] font-black text-primary pl-8">{row.ref}</TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black uppercase italic group-hover:text-primary transition-colors">{row.label}</span>
                                        <span className="text-[8px] text-muted-foreground font-medium uppercase mt-0.5">{row.date}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest h-5 px-2 border-none", row.bg, row.color)}>{row.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Accesos y Alertas */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-xl bg-primary text-primary-foreground rounded-[2rem] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <LifeBuoy className="h-20 w-20" />
                </div>
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-sm font-black uppercase italic tracking-tighter">Asistencia Legal</CardTitle>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Consultoría Personal</p>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-4">
                    <p className="text-[10px] leading-relaxed font-medium uppercase tracking-wide opacity-80">
                        ¿Tienes dudas sobre tu declaración de ISLR o un trámite sucesoral? Solicita orientación a nuestro nodo jurídico.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-10 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-tighter">
                        <Link href="/manual-usuario">Pedir ayuda IA</Link>
                    </Button>
                </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-card/40 backdrop-blur-sm rounded-[2rem] p-2">
                <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Notificaciones Críticas</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-4 space-y-4">
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-4">
                        <ShieldAlert className="h-4 w-4 text-rose-500 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-rose-600 uppercase">Actualización Registro</p>
                            <p className="text-[8px] text-rose-500/70 font-bold leading-tight uppercase">Su registro fiscal vence el 15/04/2026.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>

      {/* Servicios Ciudadanos Secundarios */}
      <section className="pt-4">
        <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 ml-4 mb-6">Módulos Especializados</h3>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {[
                { title: "Directorio Médico", icon: Stethoscope, href: "/directorio-medico", desc: "Red de salud afiliada." },
                { title: "LOPNNA Sync", icon: Scale, href: "/manutencion", desc: "Obligación de manutención." },
                { title: "Bóveda Civil", icon: Lock, href: "/documentos", desc: "Resguardo de documentos." },
            ].map((serv, i) => (
                <Link key={i} href={serv.href as any} className="group">
                    <Card className="border-none shadow-md bg-card/40 hover:bg-primary/5 transition-all rounded-[2rem] p-8 flex flex-col justify-between min-h-[140px]">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20">
                                <serv.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-black uppercase italic tracking-tight text-foreground group-hover:text-primary transition-colors">{serv.title}</h4>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{serv.desc}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
