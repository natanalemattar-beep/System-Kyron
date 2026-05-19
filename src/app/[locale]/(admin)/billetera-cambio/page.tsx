
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Repeat, ArrowRight, Activity, ShieldCheck, Terminal, Zap } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const initialBalances = { "VES": 50000, "USD": 1250, "EUR": 800 };
const exchangeRates = { "USD_VES": 40.50, "EUR_VES": 43.80 };

export default function BilleteraCambioPage() {
    const { toast } = useToast();
    const [balances, setBalances] = useState(initialBalances);
    const [fromCurrency, setFromCurrency] = useState<keyof typeof initialBalances>("USD");
    const [toCurrency, setToCurrency] = useState<keyof typeof initialBalances>("VES");
    const [amount, setAmount] = useState<number | "">("");

    const rate = useMemo(() => {
        if (fromCurrency === toCurrency) return 1;
        if (fromCurrency === "USD" && toCurrency === "VES") return exchangeRates.USD_VES;
        if (fromCurrency === "EUR" && toCurrency === "VES") return exchangeRates.EUR_VES;
        if (fromCurrency === "VES" && toCurrency === "USD") return 1 / exchangeRates.USD_VES;
        return 1;
    }, [fromCurrency, toCurrency]);

    const result = Number(amount) * rate;

    const handleExchange = () => {
        toast({
            title: "CAMBIO PROCESADO",
            description: "Sincronizando con Ledger Multimoneda...",
            action: <ShieldCheck className="h-4 w-4 text-primary" />
        });
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
                    <Wallet className="h-3 w-3" /> CENTRO DE DIVISAS
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Exchange <span className="text-primary italic">Corporativo</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Billetera Multimoneda • Gestión de Liquidez 2026</p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                {Object.entries(balances).map(([cur, bal]) => (
                    <Card key={cur} className="glass-card border-none bg-card/40 p-8 rounded-xl shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="h-16 w-16" /></div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40 mb-4">Saldo en {cur}</p>
                        <p className="text-3xl font-bold text-foreground tracking-tight leading-none">{formatCurrency(bal as number, cur as any)}</p>
                    </Card>
                ))}
            </div>

            <Card className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Orden de Conversión</CardTitle>
                </CardHeader>
                <CardContent className="p-10 grid md:grid-cols-12 gap-10 items-end">
                    <div className="md:col-span-4 space-y-3">
                        <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40 ml-1">Monto a Cambiar</Label>
                        <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-bold text-lg" />
                    </div>
                    <div className="md:col-span-3 space-y-3">
                        <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40 ml-1">De</Label>
                        <Select value={fromCurrency} onValueChange={v => setFromCurrency(v as any)}>
                            <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-border font-bold uppercase"><SelectValue /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {Object.keys(balances).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-1 flex justify-center pb-4"><ArrowRight className="h-6 w-6 text-primary animate-pulse" /></div>
                    <div className="md:col-span-3 space-y-3">
                        <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40 ml-1">A</Label>
                        <Select value={toCurrency} onValueChange={v => setToCurrency(v as any)}>
                            <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-border font-bold uppercase"><SelectValue /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {Object.keys(balances).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-1">
                        <Button className="h-14 w-full rounded-2xl btn-3d-primary" onClick={handleExchange} disabled={!amount}><Repeat className="h-5 w-5" /></Button>
                    </div>
                </CardContent>
                <CardFooter className="p-10 bg-primary/5 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-[10px] font-semibold uppercase text-muted-foreground/40 mb-1">Tasa Aplicada (BCV)</p>
                            <p className="text-xs font-bold text-foreground/80">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</p>
                        </div>
                        <div className="h-8 w-px bg-border" />
                        <div className="text-center md:text-left">
                            <p className="text-[10px] font-semibold uppercase text-primary mb-1">Recibirás (Aprox.)</p>
                            <p className="text-2xl font-bold text-primary">{formatCurrency(result, toCurrency as any)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wide">
                        <Terminal className="h-4 w-4" /> Sincronización en T+0
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
