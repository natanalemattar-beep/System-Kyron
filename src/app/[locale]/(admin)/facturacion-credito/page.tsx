"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Activity, DollarSign, TrendingUp, AlertTriangle, Clock, Users, ArrowUpRight, Zap, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { motion } from "framer-motion";
import { useCurrency } from "@/lib/currency-context";
import { CurrencySelector } from "@/components/currency-selector";

const facturas = [
    { id: "FACC-001", cliente: "Tech Solutions LLC", fecha: "25/03/2026", vencimiento: "24/04/2026", monto: 5500, estado: "Pendiente", metodo: "Crédito Directo", diasRestantes: 22 },
    { id: "FACC-002", cliente: "Innovate Corp C.A.", fecha: "15/02/2026", vencimiento: "15/03/2026", monto: 3200, estado: "Vencida", metodo: "Crédito Directo", diasRestantes: -18 },
    { id: "FACC-003", cliente: "Marketing Pro S.R.L.", fecha: "20/03/2026", vencimiento: "20/04/2026", monto: 800, estado: "Pendiente", metodo: "Cashea", diasRestantes: 18 },
    { id: "FACC-004", cliente: "Logística Express VE", fecha: "01/03/2026", vencimiento: "01/04/2026", monto: 12300, estado: "Pagada", metodo: "Crédito Directo", diasRestantes: 0 },
    { id: "FACC-005", cliente: "Constructora Norte C.A.", fecha: "10/03/2026", vencimiento: "10/04/2026", monto: 7800, estado: "Pendiente", metodo: "Krece", diasRestantes: 8 },
];

export default function FacturacionCreditoPage() {
    const { toast } = useToast();
    const { format: fmtCur } = useCurrency();
    const totalPendiente = facturas.filter(f => f.estado === 'Pendiente').reduce((a, b) => a + b.monto, 0);
    const totalVencido = facturas.filter(f => f.estado === 'Vencida').reduce((a, b) => a + b.monto, 0);
    const totalCobrado = facturas.filter(f => f.estado === 'Pagada').reduce((a, b) => a + b.monto, 0);

    return (
        <div className="space-y-8 pb-20 relative">
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
            </div>

            <BackButton href="/facturacion" label="Centro de Facturación" />

            <motion.header
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">
                        <CreditCard className="h-3 w-3" /> CENTRO DE FINANCIAMIENTO
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
                        Ventas{' '}
                        <span className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 bg-clip-text text-transparent italic">a Crédito</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Gestión BNPL • Cuentas por Cobrar 2026</p>
                </div>
                <div className="flex items-center gap-3">
                    <CurrencySelector />
                    <Button className="rounded-2xl h-12 px-8 font-black text-[10px] uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 shadow-[0_8px_30px_-5px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-0.5">
                        <PlusCircle className="mr-3 h-4 w-4" /> NUEVO CRÉDITO
                    </Button>
                </div>
            </motion.header>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Por Cobrar", val: fmtCur(totalPendiente), icon: Clock, color: "text-amber-500", change: `${facturas.filter(f => f.estado === 'Pendiente').length} facturas` },
                    { label: "Vencido", val: fmtCur(totalVencido), icon: AlertTriangle, color: "text-rose-500", change: `${facturas.filter(f => f.estado === 'Vencida').length} vencidas` },
                    { label: "Cobrado", val: fmtCur(totalCobrado), icon: CheckCircle, color: "text-emerald-500", change: "este mes" },
                    { label: "Clientes", val: `${new Set(facturas.map(f => f.cliente)).size}`, icon: Users, color: "text-blue-500", change: "con crédito activo" },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                    >
                        <Card className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.02] transition-all duration-300">
                            <div className="flex justify-between items-start mb-3">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/50">{kpi.label}</p>
                                <div className={cn("p-2 rounded-xl border transition-transform group-hover:scale-110",
                                    kpi.color === "text-amber-500" ? "bg-amber-500/10 border-amber-500/15" :
                                    kpi.color === "text-rose-500" ? "bg-rose-500/10 border-rose-500/15" :
                                    kpi.color === "text-emerald-500" ? "bg-emerald-500/10 border-emerald-500/15" :
                                    "bg-blue-500/10 border-blue-500/15"
                                )}>
                                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-foreground tracking-tight">{kpi.val}</p>
                            <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.change}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                <motion.div
                    className="lg:col-span-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                        <CardHeader className="p-6 border-b border-border/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                                    <CreditCard className="h-4 w-4 text-emerald-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Ledger de Facturación a Plazos</CardTitle>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">Control de créditos y vencimientos</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/10 border-none">
                                        <TableHead className="pl-6 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Factura</TableHead>
                                        <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Cliente</TableHead>
                                        <TableHead className="text-center py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Vencimiento</TableHead>
                                        <TableHead className="text-right py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Monto</TableHead>
                                        <TableHead className="text-right pr-6 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Estado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {facturas.map((f, idx) => (
                                        <motion.tr
                                            key={f.id}
                                            className="border-border/10 hover:bg-muted/10 transition-all group cursor-pointer"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * idx + 0.6 }}
                                        >
                                            <TableCell className="pl-6 py-5">
                                                <span className="font-mono text-[11px] font-black text-emerald-500">{f.id}</span>
                                            </TableCell>
                                            <TableCell className="py-5">
                                                <p className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">{f.cliente}</p>
                                                <p className="text-[9px] text-muted-foreground/50 font-bold uppercase">{f.metodo}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-5">
                                                <p className="text-[11px] font-bold text-muted-foreground">{f.vencimiento}</p>
                                                {f.estado !== 'Pagada' && (
                                                    <p className={cn("text-[9px] font-bold mt-0.5",
                                                        f.diasRestantes < 0 ? "text-rose-500" :
                                                        f.diasRestantes < 10 ? "text-amber-500" : "text-muted-foreground/40"
                                                    )}>
                                                        {f.diasRestantes < 0 ? `${Math.abs(f.diasRestantes)} días vencido` : `${f.diasRestantes} días restantes`}
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right py-5 font-mono text-sm font-black text-foreground">{fmtCur(f.monto)}</TableCell>
                                            <TableCell className="text-right pr-6 py-5">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border",
                                                    f.estado === 'Pagada' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                                                    f.estado === 'Vencida' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
                                                    "bg-amber-500/10 border-amber-500/20 text-amber-500"
                                                )}>
                                                    {f.estado === 'Pagada' && <CheckCircle className="h-3 w-3" />}
                                                    {f.estado === 'Vencida' && <AlertTriangle className="h-3 w-3" />}
                                                    {f.estado === 'Pendiente' && <Clock className="h-3 w-3" />}
                                                    {f.estado}
                                                </span>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="lg:col-span-4 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card className="glass-card border-none bg-gradient-to-br from-emerald-500/[0.05] to-cyan-500/[0.05] rounded-2xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                                <Activity className="h-24 w-24" />
                            </div>
                            <CardContent className="p-6 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-4">
                                    <Zap className="h-3 w-3" /> Integración BNPL
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-foreground mb-3">Plataformas Activas</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: "Cashea", status: "Conectado", icon: Smartphone },
                                        { name: "Krece", status: "Conectado", icon: CreditCard },
                                        { name: "Rapikom", status: "Pendiente", icon: DollarSign },
                                    ].map((platform, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-card/50 border border-border/20">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
                                                    <platform.icon className="h-3.5 w-3.5 text-emerald-500" />
                                                </div>
                                                <span className="text-xs font-bold text-foreground">{platform.name}</span>
                                            </div>
                                            <span className={cn("text-[9px] font-bold uppercase tracking-wider",
                                                platform.status === "Conectado" ? "text-emerald-500" : "text-muted-foreground/40"
                                            )}>{platform.status}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full h-11 rounded-xl border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 text-[10px] font-black uppercase tracking-widest mt-4 transition-all">
                                    Sincronizar APIs
                                    <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">Alerta de Mora</p>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Hay {facturas.filter(f => f.estado === 'Vencida').length} factura(s) vencida(s) por un monto total de {fmtCur(totalVencido)}. Se recomienda gestionar la cobranza inmediatamente.
                            </p>
                            <Button variant="outline" size="sm" className="mt-3 rounded-xl text-[10px] font-bold uppercase tracking-wider h-9 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 w-full transition-all">
                                Gestionar Cobranza
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
