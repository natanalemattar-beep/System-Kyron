"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, CirclePlus as PlusCircle, Eye, FileDown, CircleCheck as CheckCircle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const proformas = [
    { id: "PRO-2024-001", fecha: "19/07/2024", cliente: "Constructora XYZ", total: 15000, estado: "Enviada" },
    { id: "PRO-2024-002", fecha: "20/07/2024", cliente: "Eventos Festivos", total: 8500, estado: "Aprobada" },
    { id: "PRO-2024-003", fecha: "21/07/2024", cliente: "Inversiones ABC", total: 22000, estado: "Borrador" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Enviada: "secondary",
  Aprobada: "default",
  Borrador: "outline",
};

export default function ProformasPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Receipt className="h-3 w-3" /> NODO COMERCIAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión de <span className="text-primary italic">Proformas</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Cotizaciones y Presupuestos • Ciclo de Venta 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> NUEVA PROFORMA
                </Button>
            </header>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Archivo de Cotizaciones Recientes</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Nro. Proforma</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Total Estimado</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {proformas.map((p) => (
                                <TableRow key={p.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                    <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{p.id}</TableCell>
                                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{p.fecha}</TableCell>
                                    <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase">{p.cliente}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(p.total, 'Bs.')}</TableCell>
                                    <TableCell className="text-center py-6">
                                        <Badge variant={statusVariant[p.estado]} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{p.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button variant="ghost" size="icon" className="h-9 rounded-xl hover:bg-white/5">
                                            <Eye className="h-4 w-4 text-white/20" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
