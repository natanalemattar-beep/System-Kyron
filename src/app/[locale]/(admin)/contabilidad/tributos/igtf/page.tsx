
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Download, Activity, ShieldCheck, Terminal, Search, Banknote, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockIgtf = [
    { id: "TX-001", date: "15/03/2026", desc: "Pago a proveedor extranjero", usd: 5000, bs: 450000, igtf: 13500 },
    { id: "TX-002", date: "10/03/2026", desc: "Compra de insumos importados", usd: 2500, bs: 225000, igtf: 6750 },
];

export default function IgtfPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <CreditCard className="h-3 w-3" /> NODO DE DIVISAS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Monitor <span className="text-primary italic">de IGTF</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Impuesto a Grandes Transacciones Financieras • 3% Alícuota 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => toast({ title: "REPORTE IGTF EXPORTADO" })}>
                    <Download className="mr-3 h-4 w-4" /> DESCARGAR LIBRO
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="glass-card border-none bg-primary/5 p-8 rounded-[2.5rem] shadow-2xl border-l-4 border-primary group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">Tarifa General</p>
                    <p className="text-5xl font-black italic text-primary tracking-tighter">3%</p>
                    <p className="text-[8px] font-bold uppercase text-muted-foreground mt-4 italic">Aplicable a pagos en divisas / cripto</p>
                </Card>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-border flex flex-col justify-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground/40 mb-2">Acumulado Mes (USD)</p>
                        <p className="text-3xl font-black italic text-foreground tracking-tighter">$ 7.500,00</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-border flex flex-col justify-center">
                        <p className="text-[10px] font-black uppercase text-primary/60 mb-2">IGTF por Liquidar (Bs.)</p>
                        <p className="text-3xl font-black italic text-primary tracking-tighter">Bs. 20.250,00</p>
                    </div>
                </div>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Transacciones Gravadas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Concepto</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-right">Monto USD</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-right">Monto Bs. (BCV)</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IGTF 3%</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockIgtf.map(row => (
                                <TableRow key={row.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                    <TableCell className="pl-10 py-6">
                                        <p className="font-black text-xs text-foreground/80 uppercase italic">{row.date}</p>
                                        <p className="text-[8px] font-bold text-muted-foreground uppercase">{row.desc}</p>
                                    </TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(row.usd, 'USD')}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/40">{formatCurrency(row.bs, 'Bs.')}</TableCell>
                                    <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(row.igtf, 'Bs.')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                        <Terminal className="h-4 w-4 text-primary" /> Auditoría de tasas BCV en tiempo real.
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black h-6 px-4">CONCILIADO</Badge>
                </CardFooter>
            </Card>
        </div>
    );
}
