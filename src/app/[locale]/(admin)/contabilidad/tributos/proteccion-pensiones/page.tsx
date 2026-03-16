
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Calculator, Calendar, ShieldCheck, AlertTriangle, Terminal, 
    Zap, Activity, Landmark, Download, Smartphone,
    CheckCircle2, Copy, Wallet, Info, ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProteccionPensionesPage() {
    const { toast } = useToast();
    const [nomina, setNomina] = useState<number>(0);
    const [empleados, setEmpleados] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [isAutoPay, setIsAutoPay] = useState(false);

    const handleCalculate = () => {
        const calculated = nomina * 0.09;
        const minBase = empleados * 130;
        const finalTotal = Math.max(calculated, minBase);
        setTotal(finalTotal);
        toast({ title: "CÁLCULO COMPLETADO", description: `Aporte DPP: ${formatCurrency(finalTotal, 'Bs.')}. Base mínima validada.` });
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "COPIADO", description: `${label} al portapapeles.` });
    };

    const calendar = [
        { rif: "0", dec: "20", pay: "27" },
        { rif: "1", dec: "23", pay: "28" },
        { rif: "2", dec: "18", pay: "17" },
        { rif: "3", dec: "12", pay: "23" },
        { rif: "4", dec: "25", pay: "22" },
        { rif: "5", dec: "13", pay: "18" },
        { rif: "6", dec: "19", pay: "25" },
        { rif: "7", dec: "24", pay: "19" },
        { rif: "8", dec: "26", pay: "24" },
        { rif: "9", dec: "27", pay: "30" },
    ];

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 shadow-glow mb-4">
                        <ShieldCheck className="h-3 w-3" /> GACETA OFICIAL N° 6.806
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Protección <span className="text-emerald-500 italic">de Pensiones</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Aporte Especial del 9% • Sector Privado 2026</p>
                </div>
                <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
                    <Link href="/contabilidad/tributos"><ArrowLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-10">
                    {/* Calculadora y Resumen */}
                    <Card className="glass-card border-none rounded-[3rem] bg-white overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-slate-100 bg-emerald-50/30">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600 italic">Simulador de Contribución DPP</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-1">Total Nómina del Mes (Bs.)</Label>
                                    <Input type="number" placeholder="0.00" onChange={e => setNomina(Number(e.target.value))} className="h-14 rounded-2xl bg-slate-50 border-slate-200 font-black text-lg" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-1">Nro. de Empleados</Label>
                                    <Input type="number" placeholder="0" onChange={e => setEmpleados(Number(e.target.value))} className="h-14 rounded-2xl bg-slate-50 border-slate-200 font-black text-lg" />
                                </div>
                            </div>
                            
                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl btn-3d-secondary font-black uppercase text-xs tracking-widest shadow-xl">CALCULAR LIQUIDACIÓN</Button>
                            
                            <div className="p-10 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 group hover:border-emerald-500/40 transition-all">
                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Monto Neto a Pagar</p>
                                    <p className="text-5xl font-black italic text-emerald-500 tracking-tighter shadow-glow-secondary">{formatCurrency(total, 'Bs.')}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-2">Base mínima validada: 130 Bs/emp</p>
                                </div>
                                <div className="text-right space-y-4 w-full md:w-auto">
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-4 py-1.5 uppercase">100% DEDUCIBLE ISLR</Badge>
                                    <Button variant="outline" className="w-full h-10 border-emerald-500/20 text-emerald-600 text-[9px] font-black uppercase" onClick={() => alert("Generando archivo para portal SENIAT...")}>BAJAR REPORTE</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Calendario */}
                    <Card className="glass-card border-none rounded-[3rem] bg-white overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-slate-100 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Calendario de Declaración y Pago 2026</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Último Dígito RIF</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Día Declaración</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Día Máx. Pago</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {calendar.map((row) => (
                                        <TableRow key={row.rif} className="border-slate-100 hover:bg-slate-50 transition-all">
                                            <TableCell className="py-4 text-center font-black text-sm text-primary">{row.rif}</TableCell>
                                            <TableCell className="py-4 text-center text-xs font-bold text-slate-500 uppercase">Día {row.dec} del mes</TableCell>
                                            <TableCell className="py-4 text-center text-xs font-bold text-slate-500 uppercase">Día {row.pay} del mes</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    {/* Datos de Pago */}
                    <Card className="glass-card border-none rounded-[3rem] bg-[#0A2472] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Landmark className="h-32 w-32" /></div>
                        <div className="relative z-10 space-y-8">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#00A86B]">Datos de Liquidación SENIAT</h3>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Banco Receptor</p>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <span className="text-xs font-bold uppercase">Banco de Venezuela</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard("Banco de Venezuela", "Banco")}><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Nro. de Cuenta</p>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <span className="text-xs font-mono font-bold">0102-0001-22-0000123456</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard("0102-0001-22-0000123456", "Cuenta")}><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Planilla Única (PUB)</p>
                                    <Input placeholder="Ingrese número de planilla..." className="h-12 bg-white/5 border-white/10 rounded-xl text-xs font-mono text-white placeholder:opacity-20" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Pago Automático */}
                    <Card className="glass-card border-none rounded-[2.5rem] bg-white p-8 shadow-xl">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3 italic">
                                <Wallet className="h-4 w-4" /> Pago Automático (SIM)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer" onClick={() => setIsAutoPay(!isAutoPay)}>
                                <Checkbox checked={isAutoPay} className="rounded-md h-5 w-5 border-slate-200" />
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 cursor-pointer">Activar Débito Directo DPP</Label>
                            </div>
                            
                            <AnimatePresence>
                                {isAutoPay && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }} 
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 overflow-hidden"
                                    >
                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                            <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-2">Configuración</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed">System Kyron solicitará confirmación 48h antes de ejecutar el pago.</p>
                                        </div>
                                        <Button className="w-full h-12 rounded-xl btn-3d-secondary font-black uppercase text-[10px] tracking-widest" onClick={() => alert("Configuración de Pago Automático Guardada (Simulación)")}>GUARDAR AUTORIZACIÓN</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    <Card className="bg-rose-600/10 border-2 border-rose-600/20 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><AlertTriangle className="h-24 w-24 text-rose-500" /></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-rose-500 mb-4 flex items-center gap-3">
                                <Zap className="h-5 w-5" /> ALERTA SANCIONATORIA
                            </h3>
                            <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase mb-6 text-justify">
                                El retraso acarrea una sanción de <span className="text-rose-600 font-black">1.000 veces el tipo de cambio oficial</span> del BCV. El sistema bloquea el cierre de periodo si no se registra el pago.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
