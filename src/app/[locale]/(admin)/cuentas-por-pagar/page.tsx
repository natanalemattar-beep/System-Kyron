
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { HandCoins, AlertTriangle, Clock, Lightbulb, BarChart, Mail, ShieldCheck, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const facturasPendientes = [
    { id: "FAC-001", proveedor: "OficinaTech C.A.", email: "cobranza@oficinatech.com", fechaEmision: "2024-07-01", fechaVencimiento: "2024-07-31", monto: 1392, estado: "Pendiente" },
    { id: "FAC-002", proveedor: "Suministros Globales", email: "pagos@suministrosglobales.com", fechaEmision: "2024-06-15", fechaVencimiento: "2024-07-15", monto: 986, estado: "Vencida" },
    { id: "FAC-003", proveedor: "Papelería Mundial", email: "admin@papeleriamundial.net", fechaEmision: "2024-07-10", fechaVencimiento: "2024-08-10", monto: 550, estado: "Pendiente" },
];

const cuentasBancarias = [
    { id: 1, banco: "Banco de Venezuela", numero: "**** 1234", saldo: 150000 },
    { id: 2, banco: "Banesco", numero: "**** 5678", saldo: 25000 },
];

const topProveedoresData = [
    { name: "OficinaTech", volume: 3492 },
    { name: "Suministros", volume: 1800 },
    { name: "Papelería", volume: 1200 },
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
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <HandCoins className="h-3 w-3" /> NODO DE EGRESOS
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Cuentas <span className="text-primary italic">por Pagar</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Proveedores • Compromisos de Pago 2026</p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem]">
                    <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Deuda</p>
                        <HandCoins className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-3xl font-black italic text-foreground tracking-tighter">Bs. 2.928,00</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem]">
                    <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-rose-500">En Mora</p>
                        <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-3xl font-black italic text-rose-500 tracking-tighter">1 Factura</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem]">
                    <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Días Promedio</p>
                        <Clock className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-3xl font-black italic text-foreground tracking-tighter">32 Días</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
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
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest">Liquidación</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="rounded-[2.5rem] p-10 bg-card/95 backdrop-blur-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-xl font-black uppercase italic italic-shadow">Liquidar Factura</DialogTitle>
                                                            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Confirmación de dispersión de fondos</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-8 space-y-6">
                                                            <div className="p-6 bg-white/[0.03] border border-border rounded-2xl space-y-2">
                                                                <p className="text-[9px] font-black uppercase text-primary tracking-widest">Monto Final</p>
                                                                <p className="text-3xl font-black italic text-foreground tracking-tighter">{formatCurrency(factura.monto, 'Bs.')}</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Cuenta de Origen</Label>
                                                                <Select>
                                                                    <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border">
                                                                        <SelectValue placeholder="Seleccione cuenta..." />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {cuentasBancarias.map(c => (
                                                                            <SelectItem key={c.id} value={String(c.id)} className="text-xs font-bold uppercase">{c.banco} ({c.numero})</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs shadow-glow" onClick={() => handleRegisterPayment(factura.id)}>AUTORIZAR PAGO</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><BarChart className="h-32 w-32" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6">Volumen por Proveedor</h3>
                        <div className="space-y-6">
                            {topProveedoresData.map(p => (
                                <div key={p.name} className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        <span>{p.name}</span>
                                        <span className="text-foreground">{formatCurrency(p.volume, 'Bs.')}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary shadow-glow" style={{ width: `${(p.volume / 3500) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-emerald-500/5 rounded-[2.5rem] p-8 border border-emerald-500/10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6 flex items-center gap-3 italic">
                            <Lightbulb className="h-4 w-4" /> Optimización IA
                        </h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed text-justify">
                            El sistema sugiere renegociar plazos con "OficinaTech C.A." para extenderlos a 45 días, mejorando el flujo de caja operativo del próximo trimestre.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
