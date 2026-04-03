
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Activity, Terminal, ShieldCheck, Download, Search, LayoutDashboard, Hammer, Target, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const proyectos = [
    { id: "PRO-2026-X1", name: "Modernización de Flota DT-200", progress: 65, budget: 125000, deadline: "30/06/2026", status: "Ejecución" },
    { id: "PRO-2026-M4", name: "Sincronización Red Gabriela Mistral", progress: 100, budget: 8500, deadline: "Finalizado", status: "Completado" },
];

export default function ProyectoMaestroPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Hammer className="h-3 w-3" /> CENTRO DE EJECUCIÓN
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión de <span className="text-primary italic">Proyectos</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Dossier de Ejecución • Control de Hitos 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> ACTIVAR PROYECTO
                </Button>
            </header>

            <div className="grid gap-8">
                {proyectos.map((pro) => (
                    <Card key={pro.id} className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl hover:border-primary/20 transition-all group">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-20 bg-muted/30 flex items-center justify-center border-r border-border/50">
                                <span className="text-xl font-black text-white/5 uppercase lg:vertical-text tracking-tight group-hover:text-primary/10 transition-colors">ESTADO</span>
                            </div>
                            <div className="flex-1 p-10 space-y-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="space-y-2">
                                        <Badge variant="outline" className="text-[8px] font-black border-primary/30 text-primary uppercase tracking-widest px-3 h-6">{pro.status}</Badge>
                                        <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">{pro.name}</h3>
                                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase">{pro.id} • VENCE: {pro.deadline}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground/40 mb-1">Presupuesto Ejecutado</p>
                                        <p className="text-3xl font-black italic text-primary">{formatCurrency(pro.budget, 'USD')}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-widest">
                                        <span className="text-white/40 italic">Progreso de Ingeniería</span>
                                        <span className="text-primary">{pro.progress}%</span>
                                    </div>
                                    <Progress value={pro.progress} className="h-2 bg-white/5" />
                                </div>

                                <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                                    <div className="flex items-center gap-6">
                                        <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
                                            <Activity className="mr-2 h-3.5 w-3.5" /> Bitácora
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
                                            <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Auditoría
                                        </Button>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">DETALLES TÉCNICOS</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="glass-card border-none bg-[#050505] p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-48 w-48 text-primary" /></div>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <Target className="h-8 w-8 text-[#00A86B] animate-pulse" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tight text-white">Monitor de Hitos</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                            El sistema de proyectos de System Kyron permite una supervisión milimétrica de la ejecución presupuestaria. Cada dólar invertido se rastrea mediante el módulo de CONTABILIDAD para garantizar una desviación cero sobre el presupuesto original.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-inner relative z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Telemetría de Obra v2.8.5
                        </h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Eficiencia de Costos</span>
                                <span className="text-emerald-400">94.2%</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Cumplimiento de Plazos</span>
                                <span className="text-emerald-400">AL DÍA</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                <span>Integridad de Dossier</span>
                                <span className="text-primary font-black">VERIFIED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
