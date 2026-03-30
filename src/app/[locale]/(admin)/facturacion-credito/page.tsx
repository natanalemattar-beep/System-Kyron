"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Smartphone, Lock, Clock as Unlock, Mail, Loader as Loader2, Activity } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const facturas = [
    { id: "FACC-001", cliente: "Tech Solutions LLC", fecha: "25/07/2024", vencimiento: "24/08/2024", monto: 5500, estado: "Pendiente", metodo: "Crédito Directo" },
    { id: "FACC-002", cliente: "Innovate Corp", fecha: "15/06/2024", vencimiento: "15/07/2024", monto: 3200, estado: "Vencida", metodo: "Crédito Directo" },
    { id: "FACC-003", cliente: "Marketing Pro", fecha: "20/07/2024", vencimiento: "20/08/2024", monto: 800, estado: "Pendiente", metodo: "Cashea" },
];

export default function FacturacionCreditoPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <CreditCard className="h-3 w-3" /> NODO DE FINANCIAMIENTO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ventas <span className="text-primary italic">a Crédito</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión BNPL • Cuentas por Cobrar 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> NUEVO CRÉDITO
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Ledger de Facturación a Plazos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Factura / ID</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vencimiento</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {facturas.map((f) => (
                                        <TableRow key={f.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{f.id}</TableCell>
                                            <TableCell className="py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic">{f.cliente}</p>
                                                <p className="text-[8px] font-bold text-muted-foreground uppercase">{f.metodo}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-6 text-[10px] font-bold text-muted-foreground uppercase">{f.vencimiento}</TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(f.monto, 'Bs.')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Badge variant={f.estado === 'Vencida' ? 'destructive' : 'secondary'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{f.estado}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-32 w-32" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight text-primary mb-6">Integración BNPL</h3>
                        <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                            System Kyron soporta la integración nativa con Cashea, Krece y Rapikom para automatizar la liquidación de créditos al consumo.
                        </p>
                        <Button variant="outline" className="w-full h-12 rounded-xl border-primary/20 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest">Sincronizar APIs</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
