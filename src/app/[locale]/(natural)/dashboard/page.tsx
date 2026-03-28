
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, FileText, Stethoscope, Scale, History, ChevronRight, Search, Lock, LifeBuoy, Bell, CircleCheck as CheckCircle } from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utils";

interface NaturalDashboardData {
    solicitudes: { total: number; pendientes: number; aprobadas: number };
    documentos: number;
    notificaciones: number;
}

export default function DashboardPersonalPage() {
    const { user } = useAuth();
    const displayName = user ? `${user.nombre}${user.apellido ? ' ' + user.apellido : ''}` : '—';
    const [data, setData] = useState<NaturalDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/natural/dashboard')
            .then(r => r.ok ? r.json() : null)
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const kpiData = [
        {
            title: "Expediente Civil",
            value: loading ? '...' : data ? (data.documentos > 0 ? `${data.documentos} Docs` : 'Pendiente') : 'Pendiente',
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-950/30",
            desc: loading ? 'Cargando...' : data ? (data.documentos > 0 ? `${data.documentos} documentos registrados` : 'Sin documentos aún') : 'Sin documentos aún',
        },
        {
            title: "ID Digital 3D",
            value: "Nivel 1",
            icon: Lock,
            color: "text-primary",
            bg: "bg-primary/5",
            desc: "Cuenta activa y verificada",
        },
        {
            title: "Gestiones",
            value: loading ? '...' : data ? (data.solicitudes.pendientes > 0 ? `${data.solicitudes.pendientes} Activas` : '0 Activas') : '0 Activas',
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50 dark:bg-amber-950/30",
            desc: loading ? 'Cargando...' : data ? (data.solicitudes.total > 0 ? `${data.solicitudes.total} trámites totales` : 'Sin trámites iniciados') : 'Sin trámites iniciados',
        },
        {
            title: "Notificaciones",
            value: loading ? '...' : data ? (data.notificaciones > 0 ? `${data.notificaciones} Nuevas` : 'Sin nuevas') : 'Sin datos',
            icon: Bell,
            color: "text-emerald-600",
            bg: "bg-emerald-50 dark:bg-emerald-950/30",
            desc: loading ? 'Cargando...' : 'Alertas del sistema',
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-foreground/90">
                        Mi Terminal <span className="text-primary">Ciudadana</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
                        Historial Unificado • {displayName}
                        {!loading && <span className="ml-3 text-emerald-500/60">● En vivo</span>}
                    </p>
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

            {/* KPIs en tiempo real */}
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
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.title}</p>
                                    <div className={cn("p-2 rounded-lg", kpi.bg, kpi.color)}>
                                        <kpi.icon className="h-3.5 w-3.5" />
                                    </div>
                                </div>
                                <p className={cn("text-lg font-black italic tracking-tighter text-foreground/90 leading-none", loading && "animate-pulse opacity-50")}>
                                    {kpi.value}
                                </p>
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
                            <CardDescription className="text-[10px] font-bold text-muted-foreground mt-1">
                                Trámites ante registros y notarías
                                {data && data.solicitudes.total > 0 && (
                                    <span className="ml-2 text-emerald-500/80">• {data.solicitudes.total} registradas</span>
                                )}
                            </CardDescription>
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
                                <TableRow>
                                    <TableCell colSpan={3} className="py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText className="h-8 w-8 text-muted-foreground/20" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                                                {loading ? 'Cargando solicitudes...' : 'Sin solicitudes registradas'}
                                            </p>
                                            <p className="text-[9px] text-muted-foreground/30 font-medium uppercase">Inicia un trámite para verlo aquí</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
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
                            <div className="flex flex-col items-center py-4 gap-2">
                                <CheckCircle className="h-6 w-6 text-muted-foreground/20" />
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">
                                    {loading ? 'Verificando...' : 'Sin notificaciones'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Accesos Rápidos */}
            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 ml-4 mb-6">Accesos Rápidos</h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {[
                        { title: "Carnet Personal", icon: User, href: "/carnet-personal", desc: "Identificación digital", color: "text-blue-500", bg: "bg-blue-500/10" },
                        { title: "Tarjeta Reciclaje", icon: History, href: "/tarjeta-reciclaje", desc: "Eco-créditos activos", color: "text-green-500", bg: "bg-green-500/10" },
                        { title: "Registro RIF", icon: FileText, href: "/registro-rif", desc: "Actualización RIF", color: "text-amber-500", bg: "bg-amber-500/10" },
                        { title: "Seguridad", icon: Lock, href: "/seguridad", desc: "Contraseña y 2FA", color: "text-purple-500", bg: "bg-purple-500/10" },
                    ].map((item, i) => (
                        <Link key={i} href={item.href as any} className="group">
                            <Card className="border-none shadow-sm bg-card/40 hover:bg-muted/10 transition-all rounded-2xl p-5 text-center h-full">
                                <div className={cn("p-3 rounded-xl mx-auto w-fit mb-3 group-hover:scale-110 transition-transform", item.bg)}>
                                    <item.icon className={cn("h-5 w-5", item.color)} />
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-primary transition-colors">{item.title}</p>
                                <p className="text-[8px] text-muted-foreground uppercase mt-1">{item.desc}</p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Módulos Especializados */}
            <section className="pt-2">
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

            {/* Info Footer */}
            <div className="rounded-2xl border border-border/30 bg-card/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl"><CheckCircle className="h-4 w-4 text-primary" /></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Cuenta Verificada</p>
                        <p className="text-[9px] text-muted-foreground">Acceso completo al ecosistema ciudadano</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground/40">
                    {["VEN-NIF", "SAIME", "SENIAT"].map((b, i) => (
                        <span key={i} className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-border/20">{b}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
