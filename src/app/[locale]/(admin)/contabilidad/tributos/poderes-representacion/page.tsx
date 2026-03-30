
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gavel, CirclePlus as PlusCircle, CircleCheck as CheckCircle, CreditCard as Edit, Users, Building, Eye, Info, Terminal, Activity, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

const initialPoderes = [
    { id: "POD-001", tipo: "Poder General de Administración", apoderado: "Ana Pérez", registro: "Reg. Mercantil 1ro, Caracas", estado: "Activo" },
    { id: "POD-002", tipo: "Apoderado Judicial Especial", apoderado: "Luis Gómez", registro: "Tribunal 4to de Instancia", estado: "Activo" },
];

export default function PoderesRepresentacionPage() {
    const { toast } = useToast();

    const letterTemplate = `
Caracas, [Fecha Actual]

Ciudadano
Registrador Mercantil / Notario Público
Su Despacho.-

Asunto: Solicitud de Copia Certificada / Inscripción de Poder

Yo, [Nombre del Otorgante], titular de la Cédula de Identidad N° [Cédula], actuando en nombre de System Kyron, C.A. (RIF J-50328471-6), me dirijo a usted para solicitar formalmente la copia certificada/inscripción del instrumento legal referente a la representación de nuestra entidad.

Dicho documento fue registrado originalmente bajo el Nro. [Número], Tomo [Tomo], de fecha [Fecha Original].

Atentamente,

_________________________
Firma Autorizada
System Kyron, C.A.
    `;

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Gavel className="h-3 w-3" /> NODO REGISTRAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Registro de <span className="text-primary italic">Comercio (SAREN)</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control de Poderes y Representación Legal • 2026</p>
                </div>
            </header>

            <Tabs defaultValue="poderes" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-white/5 rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="poderes" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Poderes</TabsTrigger>
                    <TabsTrigger value="comunicaciones" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Generar Carta</TabsTrigger>
                </TabsList>

                <TabsContent value="poderes" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Bóveda de Poderes Vigentes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Tipo de Poder</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Apoderado</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Datos de Registro</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {initialPoderes.map((p) => (
                                        <TableRow key={p.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 font-black text-xs uppercase italic text-foreground/80">{p.tipo}</TableCell>
                                            <TableCell className="py-6 text-xs font-bold text-foreground/60">{p.apoderado}</TableCell>
                                            <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{p.registro}</TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase px-3 h-6 rounded-lg">{p.estado}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="comunicaciones" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden font-serif text-slate-900">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                            <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                        </div>
                        <header className="flex justify-between items-start mb-16 border-b-2 border-slate-900 pb-8 relative z-10">
                            <Logo className="h-14 w-14" />
                            <div className="text-right">
                                <h4 className="text-lg font-black italic uppercase tracking-tight">System Kyron, C.A.</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">RIF: J-50328471-6</p>
                            </div>
                        </header>
                        <div className="whitespace-pre-wrap text-sm md:text-base text-justify leading-relaxed relative z-10 min-h-[400px]">
                            {letterTemplate}
                        </div>
                        <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-end gap-4 no-print relative z-10">
                            <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 text-slate-600 font-black uppercase text-[10px]" onClick={() => window.print()}>
                                <Printer className="mr-3 h-4 w-4" /> IMPRIMIR
                            </Button>
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px]" onClick={() => toast({ title: "CARTA SAREN LISTA" })}>
                                <Download className="mr-3 h-4 w-4" /> EXPORTAR .DOC
                            </Button>
                        </footer>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
