
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, FileText, Stethoscope, Scale, History, ChevronRight, Search, Lock, LifeBuoy, Bell, CircleCheck as CheckCircle, Fingerprint, Shield, Sparkles } from 'lucide-react';
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
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/5",
            border: "border-blue-500/10",
            hoverShadow: "hover:shadow-blue-500/5",
            desc: loading ? 'Cargando...' : data ? (data.documentos > 0 ? `${data.documentos} documentos registrados` : 'Sin documentos aún') : 'Sin documentos aún',
        },
        {
            title: "ID Digital 3D",
            value: "Nivel 1",
            icon: Fingerprint,
            color: "text-indigo-500",
            bg: "bg-gradient-to-br from-indigo-500/10 to-purple-500/5",
            border: "border-indigo-500/10",
            hoverShadow: "hover:shadow-indigo-500/5",
            desc: "Cuenta activa y verificada",
        },
        {
            title: "Gestiones",
            value: loading ? '...' : data ? (data.solicitudes.pendientes > 0 ? `${data.solicitudes.pendientes} Activas` : '0 Activas') : '0 Activas',
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-gradient-to-br from-amber-500/10 to-orange-500/5",
            border: "border-amber-500/10",
            hoverShadow: "hover:shadow-amber-500/5",
            desc: loading ? 'Cargando...' : data ? (data.solicitudes.total > 0 ? `${data.solicitudes.total} trámites totales` : 'Sin trámites iniciados') : 'Sin trámites iniciados',
        },
        {
            title: "Notificaciones",
            value: loading ? '...' : data ? (data.notificaciones > 0 ? `${data.notificaciones} Nuevas` : 'Sin nuevas') : 'Sin datos',
            icon: Bell,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-500/10 to-green-500/5",
            border: "border-emerald-500/10",
            hoverShadow: "hover:shadow-emerald-500/5",
            desc: loading ? 'Cargando...' : 'Alertas del sistema',
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-primary to-indigo-700 p-8 md:p-10 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-[60px] animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-cyan-400/10 blur-[50px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                    <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white/15 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="dGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#dGrid)"/>
                    </svg>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                            <Shield className="h-3 w-3" /> Portal Ciudadano
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight drop-shadow-md">
                            Mi Terminal <span className="text-cyan-300 italic">Ciudadana</span>
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
                            Historial Unificado · {displayName}
                            {!loading && <span className="ml-3 inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En vivo</span>}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/50" />
                            <Input placeholder="Buscar trámite..." className="h-9 w-64 rounded-xl pl-9 text-[9px] font-bold uppercase bg-white/10 border-white/15 text-white placeholder:text-white/30 focus-visible:ring-white/30" />
                        </div>
                        <Button asChild size="sm" className="h-9 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-lg">
                            <Link href="/tarjeta-digital">ID DIGITAL</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi, index) => (
                    <motion.div
                        key={kpi.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className={cn("border rounded-2xl group hover:shadow-lg transition-all duration-300", kpi.bg, kpi.border, kpi.hoverShadow)}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.title}</p>
                                    <div className={cn("p-2.5 rounded-xl bg-background/50 border border-border/50 group-hover:scale-110 transition-transform", kpi.color)}>
                                        <kpi.icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <p className={cn("text-lg font-black tracking-tighter text-foreground leading-none", loading && "animate-pulse opacity-50")}>
                                    {kpi.value}
                                </p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase mt-2 tracking-widest">{kpi.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                <Card className="lg:col-span-8 border border-border/30 shadow-xl bg-card rounded-[2rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-border/50 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary">Estado de Solicitudes</CardTitle>
                            <CardDescription className="text-[10px] font-bold text-muted-foreground mt-1">
                                Trámites ante registros y notarías
                                {data && data.solicitudes.total > 0 && (
                                    <span className="ml-2 text-emerald-500/80">· {data.solicitudes.total} registradas</span>
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

                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-600 via-primary to-indigo-700 text-white rounded-[2rem] overflow-hidden relative group">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-[40px]" />
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <LifeBuoy className="h-20 w-20" />
                            </div>
                        </div>
                        <CardHeader className="p-8 pb-4 relative z-10">
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[8px] font-black uppercase tracking-[0.3em] w-fit mb-2">
                                <Sparkles className="h-2.5 w-2.5" /> IA Jurídica
                            </div>
                            <CardTitle className="text-sm font-black uppercase tracking-tight">Asistencia Legal</CardTitle>
                            <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Consultoría Personal</p>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 space-y-4 relative z-10">
                            <p className="text-[10px] leading-relaxed font-medium uppercase tracking-wide opacity-80">
                                ¿Tienes dudas sobre tu declaración de ISLR o un trámite sucesoral? Solicita orientación a nuestro nodo jurídico.
                            </p>
                            <Button variant="secondary" asChild className="w-full h-10 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-tighter shadow-lg">
                                <Link href="/manual-usuario">Pedir ayuda IA</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/30 shadow-sm bg-card rounded-[2rem] p-2">
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

            <section>
                <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 ml-4 mb-6">Accesos Rápidos</h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {[
                        { title: "Carnet Personal", icon: User, href: "/carnet-personal", desc: "Identificación digital", color: "text-blue-500", bg: "bg-blue-500/10", hoverBorder: "hover:border-blue-500/20" },
                        { title: "Tarjeta Reciclaje", icon: History, href: "/tarjeta-reciclaje", desc: "Eco-créditos activos", color: "text-green-500", bg: "bg-green-500/10", hoverBorder: "hover:border-green-500/20" },
                        { title: "Registro RIF", icon: FileText, href: "/registro-rif", desc: "Actualización RIF", color: "text-amber-500", bg: "bg-amber-500/10", hoverBorder: "hover:border-amber-500/20" },
                        { title: "Seguridad", icon: Lock, href: "/seguridad", desc: "Contraseña y 2FA", color: "text-purple-500", bg: "bg-purple-500/10", hoverBorder: "hover:border-purple-500/20" },
                    ].map((item, i) => (
                        <Link key={i} href={item.href as any} className="group">
                            <Card className={cn("border border-border/30 shadow-sm bg-card hover:shadow-md transition-all rounded-2xl p-5 text-center h-full", item.hoverBorder)}>
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

            <section className="pt-2">
                <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 ml-4 mb-6">Módulos Especializados</h3>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {[
                        { title: "Directorio Médico", icon: Stethoscope, href: "/directorio-medico", desc: "Red de salud afiliada.", gradient: "from-cyan-500/5 to-blue-500/5", border: "border-cyan-500/10" },
                        { title: "LOPNNA Sync", icon: Scale, href: "/manutencion", desc: "Obligación de manutención.", gradient: "from-purple-500/5 to-indigo-500/5", border: "border-purple-500/10" },
                        { title: "Bóveda Civil", icon: Lock, href: "/documentos", desc: "Resguardo de documentos.", gradient: "from-amber-500/5 to-orange-500/5", border: "border-amber-500/10" },
                    ].map((serv, i) => (
                        <Link key={i} href={serv.href as any} className="group">
                            <Card className={cn("border shadow-md hover:shadow-lg transition-all rounded-[2rem] p-8 flex flex-col justify-between min-h-[140px] bg-gradient-to-br", serv.gradient, serv.border)}>
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-background/50 rounded-xl group-hover:bg-primary/10 transition-colors border border-border/50 group-hover:border-primary/20">
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

            <div className="rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-xl"><CheckCircle className="h-4 w-4 text-blue-500" /></div>
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
