
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardCheck, CircleCheck as CheckCircle, Printer, ShieldCheck, FileWarning, BookOpen, Activity } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const denominacionesBs = [
    { tipo: 'billete', valor: 100 },
    { tipo: 'billete', valor: 50 },
    { tipo: 'billete', valor: 20 },
    { tipo: 'billete', valor: 10 },
    { tipo: 'billete', valor: 5 },
    { tipo: 'billete', valor: 1 },
];

const resumenSistema = {
    ventasTotales: 1850.75,
    pagosTarjetaDebito: 450.25,
    pagosTarjetaCredito: 300.00,
    pagosPorTransferencia: 200.50,
    pagosPagoMovil: 300.00,
    fondoDeCaja: 5000.00,
};

const efectivoEsperadoPorVentas = resumenSistema.ventasTotales - (resumenSistema.pagosTarjetaDebito + resumenSistema.pagosTarjetaCredito + resumenSistema.pagosPorTransferencia + resumenSistema.pagosPagoMovil);
const totalEsperadoEnCaja = efectivoEsperadoPorVentas + resumenSistema.fondoDeCaja;

export default function CierreCajaPage() {
    const [conteoBs, setConteoBs] = useState<Record<string, number>>({});
    const [observaciones, setObservaciones] = useState("");
    const { toast } = useToast();

    const totalContadoBs = useMemo(() => {
        return Object.entries(conteoBs).reduce((acc, [valor, cantidad]) => acc + (Number(valor) * (cantidad || 0)), 0);
    }, [conteoBs]);
    
    const diferenciaBs = totalContadoBs - totalEsperadoEnCaja;

    const handleConteoChange = (valor: number, cantidad: string) => {
        setConteoBs(prev => ({ ...prev, [valor]: Number(cantidad) }));
    };
    
    const handleCerrarCaja = () => {
        toast({
            title: "Cierre de Caja Guardado",
            description: `Diferencia de ${formatCurrency(diferenciaBs, 'Bs.')} registrada en el sistema.`,
            action: <CheckCircle className="text-primary" />
        });
    }

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Activity className="h-3 w-3" /> CONTROL DIARIO
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-white italic-shadow flex items-center gap-6">
                    <ClipboardCheck className="h-10 w-10 text-primary" />
                    Cierre de Caja
                </h1>
                <p className="text-muted-foreground mt-2 font-bold text-[10px] uppercase tracking-[0.6em] opacity-40">Registro de Efectivo y Cuadre de Ventas</p>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary">Estado de Ventas en Sistema</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="flex justify-between items-center p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] shadow-inner">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Ventas Registradas:</span>
                                <span className="text-3xl font-black italic text-primary">{formatCurrency(resumenSistema.ventasTotales, 'Bs.')}</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { label: "Tarjeta Débito", val: resumenSistema.pagosTarjetaDebito },
                                    { label: "Tarjeta Crédito", val: resumenSistema.pagosTarjetaCredito },
                                    { label: "Transferencia", val: resumenSistema.pagosPorTransferencia },
                                    { label: "Pago Móvil", val: resumenSistema.pagosPagoMovil }
                                ].map(p => (
                                    <div key={p.label} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1">{p.label}</p>
                                        <p className="text-xs font-bold text-white/70">{formatCurrency(p.val, 'Bs.')}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] flex justify-between items-center group hover:bg-emerald-500/20 transition-all">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Total Esperado en Caja:</span>
                                <span className="text-3xl font-black italic text-emerald-400 shadow-glow-secondary">{formatCurrency(totalEsperadoEnCaja, 'Bs.')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] p-10">
                        <CardHeader className="p-0 mb-10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-white/40 italic">Registro de Conteo Físico</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 grid grid-cols-2 md:grid-cols-3 gap-8">
                            {denominacionesBs.map(({ valor, tipo }) => (
                                <div key={valor} className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">{tipo} de {valor} Bs.</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="0" 
                                        className="h-12 bg-white/5 border-white/10 rounded-xl text-center font-mono font-black italic text-primary"
                                        onChange={e => handleConteoChange(valor, e.target.value)}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="glass-card border-none bg-white/[0.02] rounded-[3rem] p-10 sticky top-24 shadow-2xl">
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">Balance Final</p>
                                <div className={cn(
                                    "p-8 rounded-[2.5rem] border-2 flex flex-col items-center justify-center transition-all duration-500",
                                    diferenciaBs === 0 ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30"
                                )}>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Diferencia</p>
                                    <p className={cn(
                                        "text-4xl font-black italic tracking-tighter leading-none",
                                        diferenciaBs === 0 ? "text-emerald-400" : "text-rose-400"
                                    )}>{formatCurrency(diferenciaBs, 'Bs.')}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Observaciones</Label>
                                <Textarea 
                                    className="bg-white/5 border-white/10 rounded-2xl text-xs font-bold p-6 min-h-[120px] uppercase placeholder:opacity-30" 
                                    placeholder="Justifique faltantes o sobrantes..."
                                    value={observaciones}
                                    onChange={e => setObservaciones(e.target.value)}
                                />
                            </div>

                            <Button className="w-full h-16 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" onClick={handleCerrarCaja}>
                                REGISTRAR CIERRE
                            </Button>
                            
                            <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black text-[9px] uppercase tracking-widest text-white/40">
                                <Printer className="mr-3 h-4 w-4" /> IMPRIMIR ACTA
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
