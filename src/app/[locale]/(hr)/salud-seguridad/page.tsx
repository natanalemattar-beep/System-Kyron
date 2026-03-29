
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, ShieldCheck, Activity, FileWarning, Terminal, Heart, Zap, CircleCheck as CheckCircle, CirclePlus as PlusCircle, Download, TriangleAlert as AlertTriangle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function SaludSeguridadPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 shadow-glow-secondary mb-4">
                        <Stethoscope className="h-3 w-3" /> NODO LOPCYMAT
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Salud y <span className="text-emerald-500 italic">Seguridad Laboral</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Prevención de Riesgos • Bienestar del Capital Humano</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                        <Download className="mr-2 h-4 w-4" /> PROGRAMA SSL
                    </Button>
                    <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-emerald-600 hover:bg-emerald-700 border-none">
                        <PlusCircle className="mr-2 h-4 w-4" /> REGISTRAR EVENTO
                    </Button>
                </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-12">
                <Card className="lg:col-span-4 glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-2xl flex flex-col justify-between overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-48 w-48 text-emerald-500" /></div>
                    <div className="relative z-10 space-y-10">
                        <div className="space-y-2">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase tracking-[0.4em] px-4">Cumplimiento Auditoría</Badge>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Programa SSL v2.8.5</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-emerald-600">
                                    <span>Efectividad Medidas</span>
                                    <span>100%</span>
                                </div>
                                <Progress value={100} className="h-1.5 bg-muted" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Delegados</p>
                                    <p className="text-xl font-black text-emerald-500 italic">08</p>
                                </div>
                                <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Incidentes</p>
                                    <p className="text-xl font-black text-rose-500 italic">00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600 italic">Comité de Seguridad y Salud Laboral</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Delegado / Área</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Certificación</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Última Inspección</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: "Carlos Pérez", area: "Operaciones", cert: "INPSASEL-001", last: "15/03/2026", status: "Al Día" },
                                    { name: "Beatriz Salas", area: "Administración", cert: "INPSASEL-002", last: "10/03/2026", status: "Al Día" },
                                    { name: "Jorge Vivas", area: "Logística", cert: "INPSASEL-003", last: "Hoy", status: "Auditado" },
                                ].map((row, i) => (
                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-emerald-500 transition-colors">{row.name}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase">{row.area}</p>
                                        </TableCell>
                                        <TableCell className="py-6 text-center text-[10px] font-mono font-bold text-muted-foreground">{row.cert}</TableCell>
                                        <TableCell className="py-6 text-center text-[10px] font-bold text-muted-foreground uppercase">{row.last}</TableCell>
                                        <TableCell className="text-right pr-10 py-6">
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-3 h-6 rounded-lg uppercase">{row.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32 text-emerald-500" /></div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-4">
                        <Activity className="h-6 w-6 text-emerald-500" /> Prevención Proactiva
                    </h3>
                    <p className="text-sm font-medium italic text-muted-foreground/60 leading-relaxed text-justify mb-8 uppercase">
                        El sistema monitorea síncronamente las horas de exposición y los periodos de descanso del personal de ingeniería, sugiriendo rotaciones automáticas para evitar la fatiga laboral y cumplir con la normativa de higiene y seguridad.
                    </p>
                    <div className="flex gap-10 items-center">
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Riesgo Ambiental</p>
                            <p className="text-lg font-black text-emerald-500 italic">BAJO</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Certificación</p>
                            <p className="text-lg font-black text-primary italic">NIVEL 5</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-[#050505] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden border-none group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Terminal className="h-32 w-32 text-emerald-500" /></div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Alertas LOPCYMAT</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Monitor de Contingencias</p>
                    </div>
                    <div className="space-y-4 py-8">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[9px] font-bold text-white/60 uppercase leading-snug">Actualización de Examen Médico Trimestral pendiente para 5 colaboradores.</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="w-full h-12 bg-white text-emerald-600 font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl hover:bg-white/90">INICIAR AUDITORÍA MÉDICA</Button>
                </Card>
            </div>
        </div>
    );
}
