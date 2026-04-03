
"use client";
import { BackButton } from "@/components/back-button";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signature as FileSignature, Download, Printer, CircleCheck as CheckCircle, Activity, Search, Mail, MessageSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const empleados = [
    { id: "EMP-001", nombre: "Ana Pérez", cargo: "Gerente Finanzas", ingreso: "15/01/2020", salario: 15000, tlf: "0412-1112233" },
    { id: "EMP-002", nombre: "Luis Gómez", cargo: "Analista Senior", ingreso: "10/02/2021", salario: 8500, tlf: "0414-4445566" },
];

export default function ConstanciaTrabajoPage() {
    const { toast } = useToast();

    const handleSend = (nombre: string, via: string) => {
        toast({
            title: `CONSTANCIA ENVIADA`,
            description: `Documento de ${nombre} transmitido vía ${via}.`,
            action: <CheckCircle className="text-emerald-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <FileSignature className="h-3 w-3" /> CENTRO DE PERSONAL
                    </div>
                <BackButton href="/contabilidad" label="Contabilidad" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Constancias <span className="text-primary italic">de Trabajo</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Certificación Laboral • Firma Digital 2026</p>
                </div>
            </header>

            <div className="mb-10">
                <div className="relative max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input placeholder="Buscar empleado por nombre o ID..." className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest shadow-inner" />
                </div>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Generador Masivo de Constancias</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Trabajador / ID</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cargo</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha Ingreso</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Sueldo Base</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {empleados.map(emp => (
                                <TableRow key={emp.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{emp.nombre}</p>
                                        <p className="text-[8px] font-mono text-muted-foreground font-bold">{emp.id}</p>
                                    </TableCell>
                                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{emp.cargo}</TableCell>
                                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{emp.ingreso}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-black text-foreground/70 italic">{formatCurrency(emp.salario, 'Bs.')}</TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-emerald-500/10 text-emerald-500" onClick={() => handleSend(emp.nombre, 'WhatsApp')}>
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 text-primary" onClick={() => handleSend(emp.nombre, 'Correo')}>
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5 text-foreground/40">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-10 mt-10">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-all duration-1000"><FileSignature className="h-32 w-32" /></div>
                    <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground mb-6">Validez Jurídica</h3>
                    <p className="text-sm font-medium italic text-muted-foreground/60 leading-relaxed text-justify">
                        Cada constancia emitida por System Kyron incluye un código QR de validación y una firma electrónica basada en el ID Digital del representante legal, garantizando su autenticidad ante instituciones bancarias y consulares.
                    </p>
                </Card>
                <Card className="bg-primary text-primary-foreground rounded-[3rem] p-10 flex flex-col justify-between shadow-glow relative overflow-hidden border-none group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Activity className="h-32 w-32" /></div>
                    <div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4">Protocolo LOTTT</h3>
                        <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Automatización de certificaciones laborales según el Artículo 108 de la Ley Orgánica del Trabajo.</p>
                    </div>
                    <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">CONFIGURAR PLANTILLA MAESTRA</Button>
                </Card>
            </div>
        </div>
    );
}
