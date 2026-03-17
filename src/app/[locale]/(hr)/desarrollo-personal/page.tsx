
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, Target, Award, TrendingUp, BookOpen, Zap, Terminal, Activity, ShieldCheck, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Search, Wand as Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";

const careerPaths = [
    { id: "P-01", name: "Ingeniería Maestra", progress: 85, level: "Senior", next: "Principal", icon: Zap },
    { id: "P-02", name: "Gestión Administrativa", progress: 40, level: "Junior", next: "Especialista", icon: Target },
    { id: "P-03", name: "Consultoría Legal IA", progress: 10, level: "Iniciación", next: "Junior", icon: ShieldCheck },
];

export default function DesarrolloPersonalPage() {
    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <School className="h-3 w-3" /> NODO EDUCATIVO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Desarrollo y <span className="text-primary italic">Carrera Personal</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Plan de Vida Profesional • Academia Kyron 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> ASIGNAR CURSO
                </Button>
            </header>

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Pipeline de Crecimiento Profesional</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10">
                            {careerPaths.map((path) => (
                                <div key={path.id} className="space-y-4 p-6 rounded-[2.5rem] bg-white/5 border border-border group hover:border-primary/30 transition-all">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-center gap-6">
                                            <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                                                <path.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">{path.name}</h3>
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Nivel Actual: {path.level} • Siguiente: {path.next}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary px-4 h-6 rounded-lg">{path.progress}% COMPLETADO</Badge>
                                    </div>
                                    <Progress value={path.progress} className="h-2 bg-muted rounded-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5"><BookOpen className="h-48 w-48 text-primary" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8">Protocolo de Inducción Técnica</h3>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                {[
                                    "Introducción al Ecosistema Kyron",
                                    "Seguridad de Datos y Cifrado AES-512",
                                    "Uso del TPV Multimoneda",
                                    "Gestión de Bóveda Jurídica"
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">0{i+1}</div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-all">{step}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 flex flex-col justify-center items-center text-center">
                                <Award className="h-12 w-12 text-primary mb-4" />
                                <p className="text-xs font-black uppercase italic text-foreground leading-tight">Certificación Operador Maestro v2.6</p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase mt-2">Sello Inmutable Blockchain</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group h-[300px]">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none">Inyectar <br/> Conocimiento</h3>
                        <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Acceda a la biblioteca de cursos certificados por el Colegio Gabriela Mistral.</p>
                        <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">ACADEMIA KYRON</Button>
                    </Card>

                    <Card className="glass-card border-none rounded-[2.5rem] bg-card/40 p-8 shadow-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <Activity className="h-6 w-6 text-primary" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Score de Competencia</h4>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "Habilidades Técnicas", val: 92, color: "bg-primary" },
                                { label: "Inteligencia Emocional", val: 85, color: "bg-emerald-500" },
                                { label: "Cumplimiento Normativo", val: 100, color: "bg-secondary" },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
                                        <span>{stat.label}</span>
                                        <span>{stat.val}%</span>
                                    </div>
                                    <Progress value={stat.val} className={cn("h-1.5 rounded-full", stat.color)} />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
