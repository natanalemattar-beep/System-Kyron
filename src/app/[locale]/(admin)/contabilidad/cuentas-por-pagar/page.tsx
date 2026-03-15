
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { HandCoins, AlertTriangle, ShieldCheck, Activity, ArrowLeft, PlusCircle, Terminal, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

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

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <HandCoins className="h-3 w-3" /> NODO DE PASIVOS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Cuentas <span className="text-primary italic">por Pagar</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Proveedores • Compromisos de Pago 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                        <Link href="/contabilidad/cuentas"><ArrowLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR FACTURA
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><HandCoins className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-4">Total Deuda Acumulada</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter leading-none">{formatCurrency(2928, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-rose-500/5 p-8 rounded-[2rem] shadow-xl border-l-4 border-rose-500">
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-4">Monto en Mora</p>
                    <p className="text-4xl font-black italic text-rose-500 tracking-tighter leading-none">{formatCurrency(986, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-4">Días Promedio Pago</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter leading-none">32 DÍAS</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Ledger de Obligaciones Pendientes</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase border border-border">
                        <History className="mr-2 h-3.5 w-3.5" /> VER HISTORIAL
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Proveedor / Cuenta</TableHead>
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
                                        <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{factura.proveedor}</p>
                                        <p className="text-[8px] font-mono text-muted-foreground font-bold uppercase">{factura.id}</p>
                                    </TableCell>
                                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{factura.fechaVencimiento}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(factura.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-center py-6">
                                        <Badge variant={statusVariant[factura.estado]} className={cn(
                                            "text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg",
                                            factura.estado === 'Vencida' && "bg-rose-100 text-rose-600 border-none"
                                        )}>{factura.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Liquidar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <Terminal className="h-4 w-4" /> Auditado por System Kyron v2.6
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-white/5">EXCEL</Button>
                        <Button variant="outline" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-white/5">PDF</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
