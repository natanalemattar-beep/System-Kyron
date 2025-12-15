
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Repeat, ArrowRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const initialBalances = {
    "VES": 50000,
    "USD": 1250,
    "EUR": 800,
};

const exchangeRates = {
    "USD_VES": 40.50,
    "EUR_VES": 43.80,
    "USD_EUR": 0.92,
    "VES_USD": 1 / 40.50,
    "VES_EUR": 1 / 43.80,
    "EUR_USD": 1 / 0.92,
};

type Currency = keyof typeof initialBalances;

type Transaction = {
    id: string;
    fecha: string;
    de: Currency;
    a: Currency;
    montoEntrada: number;
    montoSalida: number;
    tasa: number;
};

const initialTransactions: Transaction[] = [
    { id: "TXN001", fecha: "2024-07-25", de: "USD", a: "VES", montoEntrada: 100, montoSalida: 4050, tasa: 40.50 },
    { id: "TXN002", fecha: "2024-07-24", de: "EUR", a: "USD", montoEntrada: 50, montoSalida: 54.35, tasa: 1.087 },
];

export default function BilleteraCambioPage() {
    const { toast } = useToast();
    const [balances, setBalances] = useState(initialBalances);
    const [transactions, setTransactions] = useState(initialTransactions);
    
    const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
    const [toCurrency, setToCurrency] = useState<Currency>("VES");
    const [amountToExchange, setAmountToExchange] = useState<number | "">("");

    const exchangeRate = useMemo(() => {
        if (fromCurrency === toCurrency) return 1;
        const rateKey = `${fromCurrency}_${toCurrency}` as keyof typeof exchangeRates;
        return exchangeRates[rateKey] || (1 / exchangeRates[`${toCurrency}_${fromCurrency}` as keyof typeof exchangeRates]);
    }, [fromCurrency, toCurrency]);

    const convertedAmount = useMemo(() => {
        if (amountToExchange === "" || !exchangeRate) return 0;
        return Number(amountToExchange) * exchangeRate;
    }, [amountToExchange, exchangeRate]);

    const handleExchange = () => {
        if (amountToExchange === "" || Number(amountToExchange) <= 0) {
            toast({ variant: "destructive", title: "Monto Inválido", description: "Introduce un monto válido para cambiar." });
            return;
        }
        if (balances[fromCurrency] < Number(amountToExchange)) {
            toast({ variant: "destructive", title: "Fondos Insuficientes", description: `No tienes suficientes ${fromCurrency} para realizar este cambio.` });
            return;
        }
        
        // Update balances
        const newBalances = { ...balances };
        newBalances[fromCurrency] -= Number(amountToExchange);
        newBalances[toCurrency] += convertedAmount;
        setBalances(newBalances);

        // Add to transaction history
        const newTransaction: Transaction = {
            id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
            fecha: new Date().toISOString(),
            de: fromCurrency,
            a: toCurrency,
            montoEntrada: Number(amountToExchange),
            montoSalida: convertedAmount,
            tasa: exchangeRate,
        };
        setTransactions([newTransaction, ...transactions]);

        toast({ title: "Cambio Exitoso", description: `Has cambiado ${formatCurrency(Number(amountToExchange), fromCurrency)} a ${formatCurrency(convertedAmount, toCurrency)}.` });
        setAmountToExchange("");
    };

    return (
        <div className="p-4 md:p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Wallet className="h-8 w-8"/>
                    Billetera de Cambio de Moneda
                </h1>
                <p className="text-muted-foreground mt-2">
                    Consulta tus saldos, realiza cambios de divisa y revisa tu historial de transacciones.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                {Object.entries(balances).map(([currency, balance]) => (
                     <Card key={currency} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Saldo en {currency}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{formatCurrency(balance, currency as Currency)}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Realizar Cambio de Divisa</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-5 gap-6 items-end">
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="from-amount">Monto a Cambiar</Label>
                        <Input 
                            id="from-amount" 
                            type="number" 
                            placeholder="0.00" 
                            value={amountToExchange}
                            onChange={(e) => setAmountToExchange(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="from-currency">De</Label>
                        <Select value={fromCurrency} onValueChange={(v) => setFromCurrency(v as Currency)}>
                            <SelectTrigger id="from-currency"><SelectValue /></SelectTrigger>
                            <SelectContent>{Object.keys(balances).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-center pt-8">
                        <ArrowRight className="h-6 w-6 text-muted-foreground"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="to-currency">A</Label>
                        <Select value={toCurrency} onValueChange={(v) => setToCurrency(v as Currency)}>
                            <SelectTrigger id="to-currency"><SelectValue /></SelectTrigger>
                            <SelectContent>{Object.keys(balances).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 border-t pt-6">
                    <div className="w-full max-w-sm p-4 bg-secondary/50 rounded-lg space-y-2">
                         <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tasa de Cambio:</span> <span>1 {fromCurrency} ≈ {exchangeRate.toFixed(4)} {toCurrency}</span></div>
                         <div className="flex justify-between font-bold text-lg"><span className="text-primary">Recibirás (Aprox.):</span> <span className="text-primary">{formatCurrency(convertedAmount, toCurrency)}</span></div>
                    </div>
                    <Button onClick={handleExchange} disabled={!amountToExchange}>
                        <Repeat className="mr-2 h-4 w-4"/>
                        Realizar Cambio
                    </Button>
                </CardFooter>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Transacciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Monto Enviado</TableHead>
                                <TableHead className="text-right">Monto Recibido</TableHead>
                                <TableHead className="text-right">Tasa Aplicada</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell>{formatDate(tx.fecha)}</TableCell>
                                    <TableCell className="text-right font-medium">{formatCurrency(tx.montoEntrada, tx.de)}</TableCell>
                                    <TableCell className="text-right font-medium text-green-500">{formatCurrency(tx.montoSalida, tx.a)}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">1 {tx.de} = {tx.tasa.toFixed(4)} {tx.a}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
