
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CirclePlus as PlusCircle, Search, Eye, Signature as FileSignature, GraduationCap, ShieldCheck, Activity, Terminal, CircleCheck as CheckCircle, Users, Briefcase, Zap, Scale, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const funnelStats = [
    { label: "En Selección", val: "12", icon: Users, color: "text-blue-500" },
    { label: "En Contratación", val: "3", icon: FileSignature, color: "text-primary" },
    { label: "En Inducción", val: "2", icon: GraduationCap, color: "text-secondary" },
    { label: "Vacantes Abiertas", val: "5", icon: Briefcase, color: "text-amber-500" },
];

export default function ReclutamientoPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-secondary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                        <UserPlus className="h-3 w-3" /> NODO DE ATRACCIÓN
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Embudo de <span className="text-secondary italic">Atracción IA</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Selección • Contratación • Inducción 2026</p>
                </div>
                <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> PUBLICAR VACANTE
                </Button>
            </header>

            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
                {funnelStats.map((stat, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl group hover:border-secondary/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </div>
                        <p className="text-3xl font-black italic text-foreground tracking-tight">{stat.val}</p>
                    </Card>
                ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Pipeline de Candidatos Activos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Candidato / Perfil</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vacante</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Fase</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Gestión</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "Elena Torres", role: "Dev Full-Stack", phase: "Selección", score: 92, id: "C-001" },
                                        { name: "Ricardo Mendoza", role: "Analista Contable", phase: "Contratación", score: 88, id: "C-042" },
                                        { name: "Sofía Castro", role: "Diseñadora Senior", phase: "Inducción", score: 95, id: "C-015" },
                                    ].map(c => (
                                        <TableRow key={c.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-secondary transition-colors">{c.name}</p>
                                                <p className="text-[8px] font-mono text-muted-foreground font-bold">{c.id} • MATCH: {c.score}%</p>
                                            </TableCell>
                                            <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{c.role}</TableCell>
                                            <TableCell className="py-6 text-center">
                                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg border-secondary/20 text-secondary bg-secondary/5">{c.phase}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary/10 text-secondary">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-secondary/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32 text-secondary" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground mb-6">Contratación 5G</h3>
                        <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                            Protocolo de firma digital inmutable y asignación inmediata de perfil eSIM Kyron para el nuevo colaborador. Inducción técnica asistida por IA.
                        </p>
                        <Button className="w-full h-12 rounded-xl btn-3d-secondary font-black uppercase text-[10px] tracking-widest shadow-xl">INICIAR ONBOARDING</Button>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] p-8 rounded-[2.5rem] shadow-xl">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary mb-6 flex items-center gap-3 italic">
                            <Activity className="h-4 w-4" /> Telemetría Selección
                        </h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Tiempo de Cierre</span>
                                <span className="text-xl font-black text-foreground italic">12 DÍAS</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Eficiencia Match</span>
                                <span className="text-xl font-black text-emerald-500 italic">94.2%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
