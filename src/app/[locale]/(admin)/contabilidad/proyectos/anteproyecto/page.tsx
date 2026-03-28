
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Activity, Terminal, ShieldCheck, Download, Search, Layers, Hammer, Target, Wand as Wand2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const anteproyectos = [
    { id: "ANT-2026-01", title: "Expansión Sede La Guaira", budget: 45000, status: "En Revisión", date: "15/03/2026" },
    { id: "ANT-2026-02", title: "Actualización Nodo 5G", budget: 12000, status: "Aprobado", date: "10/03/2026" },
];

export default function AnteproyectoPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <FileText className="h-3 w-3" /> NODO DE PLANIFICACIÓN
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión de <span className="text-primary italic">Anteproyectos</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Borradores y Diseños Técnicos • Control de Inversión 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> NUEVO BORRADOR
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Legajo de Anteproyectos Activos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Título / Referencia</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Presupuesto Est.</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {anteproyectos.map(ant => (
                                        <TableRow key={ant.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{ant.title}</p>
                                                <p className="text-[8px] font-mono text-muted-foreground font-bold">{ant.id}</p>
                                            </TableCell>
                                            <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{ant.date}</TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black text-foreground/70 italic">{formatCurrency(ant.budget, 'USD')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Badge variant={ant.status === 'Aprobado' ? 'default' : 'secondary'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{ant.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Wand2 className="h-32 w-32" /></div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Arquitecto IA</h3>
                        <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Utilice el motor de inteligencia artificial para generar automáticamente la memoria descriptiva de su anteproyecto basándose en parámetros técnicos.</p>
                        <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">ASISTENTE DE DISEÑO</Button>
                    </Card>

                    <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-white/[0.02] shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-3 italic">
                            <Layers className="h-4 w-4" /> Capas de Revisión
                        </h4>
                        <ul className="space-y-4 text-[9px] font-bold text-muted-foreground/60 uppercase leading-relaxed">
                            <li className="flex gap-4"><span>[1]</span> Viabilidad Técnica</li>
                            <li className="flex gap-4"><span>[2]</span> Disponibilidad de CapEx</li>
                            <li className="flex gap-4"><span>[3]</span> Aprobación de Junta</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}
