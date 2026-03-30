
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { HandCoins, TriangleAlert as AlertTriangle, Clock, Lightbulb, ChartBar as BarChart, ShieldCheck, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const facturasPendientes = [
    { id: "FAC-001", proveedor: "OficinaTech C.A.", fechaVencimiento: "2024-07-31", monto: 1392, estado: "Pendiente" },
    { id: "FAC-002", proveedor: "Suministros Globales", fechaVencimiento: "2024-07-15", monto: 986, estado: "Vencida" },
    { id: "FAC-003", proveedor: "Papelería Mundial", fechaVencimiento: "2024-08-10", monto: 550, estado: "Pendiente" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  Pagada: "default",
  Pendiente: "secondary",
  Vencida: "destructive",
};

export default function CuentasPorPagarPage() {
    const { toast } = useToast();

    const handleRegisterPayment = (id: string) => {
        toast({
            title: "PAGO PROCESADO",
            description: `Se ha debitado el monto de la factura ${id} del saldo de tesorería.`,
            action: <ShieldCheck className="h-4 w-4 text-primary" />
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <HandCoins className="h-3 w-3" /> NODO DE EGRESOS
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Cuentas <span className="text-primary italic">por Pagar</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Proveedores • Compromisos de Pago 2026</p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-4">Total Deuda</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tight">Bs. 2.928,00</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-4">En Mora</p>
                    <p className="text-4xl font-black italic text-rose-500 tracking-tight">1 Factura</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-4">Días Promedio</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tight">32 Días</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Facturas Pendientes</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Proveedor</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vencimiento</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facturasPendientes.map((factura) => (
                                <TableRow key={factura.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <p className="font-black text-xs text-foreground/80 uppercase italic">{factura.proveedor}</p>
                                        <p className="text-[8px] font-mono text-muted-foreground font-bold uppercase">{factura.id}</p>
                                    </TableCell>
                                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{factura.fechaVencimiento}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(factura.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-center py-6">
                                        <Badge variant={statusVariant[factura.estado]} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{factura.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest">Liquidar</Button>
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
