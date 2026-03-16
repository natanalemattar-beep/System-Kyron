
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gavel, PlusCircle, CheckCircle, Edit, Users, Building, Eye, Info, Terminal, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const initialPoderes = [
    { id: "POD-001", tipo: "Poder General de Administración", apoderado: "Ana Pérez", registro: "Reg. Mercantil 1ro, Caracas", estado: "Activo" },
    { id: "POD-002", tipo: "Apoderado Judicial Especial", apoderado: "Luis Gómez", registro: "Tribunal 4to de Instancia", estado: "Activo" },
];

export default function PoderesRepresentacionPage() {
    const { toast } = useToast();

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
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR PODER
                </Button>
            </header>

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
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase px-3">{p.estado}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-center italic">
                    <p className="text-[9px] font-black uppercase text-muted-foreground/40">Registro sincronizado con la Bóveda Jurídica Kyron v2.6</p>
                </CardFooter>
            </Card>
        </div>
    );
}
