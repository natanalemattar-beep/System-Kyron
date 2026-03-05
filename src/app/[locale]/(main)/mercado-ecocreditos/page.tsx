
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, ArrowUpRight, ArrowDownRight, RefreshCw, ShieldCheck, Zap, Coins, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const activeOffers = [
    { id: "OFF-001", company: "Distribuidora El Valle", credits: 5000, price: 250, type: "Sell" },
    { id: "OFF-002", company: "Logística Nacional", credits: 12000, price: 580, type: "Sell" },
    { id: "OFF-003", company: "Tech solutions", credits: 2500, price: 120, type: "Buy" },
];

export default function MercadoEcocreditosPage() {
    const { toast } = useToast();
    const [balance, setBalance] = useState(12450);

    const handleTransaction = (offer: typeof activeOffers[0]) => {
        toast({
            title: "Protocolo Blockchain Activo",
            description: `Se ha iniciado la transferencia de ${offer.credits} Eco-Créditos. Sellando transacción en el Ledger.`,
            action: <ShieldCheck className="text-primary h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20">
            <header className="border-l-4 border-secondary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                    <Recycle className="h-3 w-3" /> NODO SUSTENTABLE
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Mercado de <span className="text-secondary">Eco-Créditos</span></h1>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Exchange de Activos Verdes • System Kyron 2026</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-secondary/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all"><Coins className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-secondary/60">Mi Saldo Inmutable</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-5xl font-black italic text-white tracking-tighter">{balance.toLocaleString()} <span className="text-lg uppercase font-bold text-secondary tracking-normal">E-CR</span></p>
                        <p className="text-[9px] font-bold text-white/20 uppercase mt-4 tracking-widest flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3" /> Certificado Carbono Neutral v2.6
                        </p>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 glass-card border-none p-8 rounded-[2.5rem] bg-white/[0.02]">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                            <TrendingUp className="text-primary h-4 w-4" /> Rendimiento del Mercado
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-[8px] font-black uppercase text-white/20 mb-1">Precio Promedio</p>
                            <p className="text-xl font-black text-white">$0.05 <span className="text-[8px] opacity-40">/ECR</span></p>
                        </div>
                        <div>
                            <p className="text-[8px] font-black uppercase text-white/20 mb-1">Volumen 24h</p>
                            <p className="text-xl font-black text-white">450k</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-black uppercase text-white/20 mb-1">Variación</p>
                            <p className="text-xl font-black text-secondary">+12.4%</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-black uppercase text-white/20 mb-1">Status</p>
                            <p className="text-xl font-black text-primary">Bullish</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/40">
                <CardHeader className="p-10 border-b border-white/5">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Ofertas en el Ledger</CardTitle>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-white/5">
                            <RefreshCw className="h-3 w-3 mr-2" /> Actualizar Nodo
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-white/[0.02] border-none">
                                <TableHead className="pl-10 font-black uppercase text-[10px] tracking-widest text-white/40">Empresa / Nodo</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-widest text-white/40">Activo</TableHead>
                                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest text-white/40">Monto (USD)</TableHead>
                                <TableHead className="text-center font-black uppercase text-[10px] tracking-widest text-white/40">Tipo</TableHead>
                                <TableHead className="text-right pr-10 font-black uppercase text-[10px] tracking-widest text-white/40">Protocolo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeOffers.map(offer => (
                                <TableRow key={offer.id} className="border-white/5 hover:bg-white/[0.01] transition-colors">
                                    <TableCell className="pl-10">
                                        <p className="text-xs font-black text-white/80 uppercase">{offer.company}</p>
                                        <p className="text-[8px] font-mono text-white/20 uppercase">{offer.id}</p>
                                    </TableCell>
                                    <TableCell className="font-black text-white italic">{offer.credits.toLocaleString()} ECR</TableCell>
                                    <TableCell className="text-right font-mono font-bold text-secondary">{formatCurrency(offer.price, 'USD')}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={offer.type === 'Sell' ? 'destructive' : 'default'} className="text-[8px] font-black uppercase tracking-widest rounded-lg">
                                            {offer.type === 'Sell' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                            {offer.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <Button size="sm" className="rounded-xl h-9 px-6 text-[9px] font-black uppercase tracking-widest btn-3d-primary" onClick={() => handleTransaction(offer)}>EJECUTAR</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-12">
                <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow border-none group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter mb-4">Inyectar Liquidez Verde</CardTitle>
                    <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 max-w-xs">Publica tus Eco-Créditos excedentes para monetizar la sostenibilidad de tu empresa.</p>
                    <Button variant="secondary" className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest bg-white text-primary">CREAR OFERTA</Button>
                </Card>
                <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center">
                    <ShieldCheck className="h-12 w-12 text-secondary mb-6 animate-pulse" />
                    <CardTitle className="text-xl font-black uppercase italic text-white mb-2">Certificación Neutral</CardTitle>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-8">Obtén el sello Kyron de Carbono Neutralidad</p>
                    <Button variant="outline" className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest border-white/10 text-white">SOLICITAR AUDITORÍA</Button>
                </Card>
            </div>
        </div>
    );
}
