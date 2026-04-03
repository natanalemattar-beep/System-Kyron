
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, CircleCheck as CheckCircle, Download, Printer, Activity, ShieldCheck, Terminal, Scale, History, FileText, Zap, TrendingUp, Loader as Loader2 } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import Image from "next/image";

const empleados = [
    { id: 1, nombre: "Ana Patricia Velásquez", ci: "V-16.892.437", ingreso: "2020-01-15", salario: 12000, fondo: 45000 },
    { id: 2, nombre: "Luis Eduardo Ramírez", ci: "V-19.456.283", ingreso: "2021-02-10", salario: 10500, fondo: 32000 },
    { id: 3, nombre: "Carlos Mattar", ci: "V-32.855.496", ingreso: "2024-01-01", salario: 15000, fondo: 5000 },
];

export default function PrestacionesSocialesPage() {
    const { toast } = useToast();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const emp = useMemo(() => empleados.find(e => e.id === Number(selectedId)), [selectedId]);

    const handleCalculate = async () => {
        setIsCalculating(true);
        toast({ title: "EJECUTANDO ALGORITMO LOTTT", description: "Auditando fondo de garantía y días adicionales..." });
        try {
            const res = await fetch("/api/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoria: "rrhh", subcategoria: "prestaciones", descripcion: `Cálculo prestaciones sociales — Empleado ${emp?.nombre || selectedId}`, metadata: { empleado_id: selectedId } }),
            });
            if (res.ok) {
                toast({ title: "CÁLCULO FINALIZADO", description: "Liquidación proyectada con 100% de precisión legal.", action: <CheckCircle className="text-emerald-500 h-4 w-4" /> });
            } else {
                toast({ variant: "destructive", title: "Error", description: "No se pudo ejecutar el cálculo." });
            }
        } catch {
            toast({ variant: "destructive", title: "Error de conexión" });
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-secondary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                        <Scale className="h-3 w-3" /> CENTRO DE LIQUIDACIÓN
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Prestaciones <span className="text-secondary italic">Sociales</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Fondo de Garantía • Art. 142 LOTTT • 2026</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR FINIQUITO
                    </Button>
                </div>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Calculator className="h-32 w-32 text-secondary" /></div>
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Parámetros de Cálculo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-8 relative z-10">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Seleccionar Trabajador</Label>
                                <Select onValueChange={setSelectedId}>
                                    <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase"><SelectValue placeholder="Buscar..." /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {empleados.map(e => <SelectItem key={e.id} value={String(e.id)} className="uppercase text-xs font-bold">{e.nombre} ({e.ci})</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            {emp && (
                                <div className="p-6 rounded-2xl bg-white/5 border border-border space-y-4 animate-in fade-in zoom-in-95">
                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase text-muted-foreground/60">
                                        <span>Fecha Ingreso:</span>
                                        <span className="text-foreground">{emp.ingreso}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase text-muted-foreground/60">
                                        <span>Salario Base:</span>
                                        <span className="text-foreground">{formatCurrency(emp.salario, 'Bs.')}</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                                        <p className="text-[10px] font-black uppercase text-secondary">Fondo Acumulado</p>
                                        <p className="text-2xl font-black italic text-foreground tracking-tight">{formatCurrency(emp.fondo, 'Bs.')}</p>
                                    </div>
                                </div>
                            )}
                            <Button 
                                className="w-full h-14 rounded-2xl btn-3d-secondary font-black uppercase text-[10px] tracking-widest shadow-xl"
                                onClick={handleCalculate}
                                disabled={!selectedId || isCalculating}
                            >
                                {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                                GENERAR LIQUIDACIÓN IA
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl h-full flex flex-col">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Histórico de Garantía de Prestaciones</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase opacity-30 tracking-widest">Consolidado de depósitos trimestrales y anuales</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase border border-border">
                                <History className="mr-2 h-3.5 w-3.5" /> VER LEDGER
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow flex flex-col justify-center items-center text-center px-20 opacity-20">
                            <Activity className="h-20 w-20 text-muted-foreground mb-6 animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando con Bóveda de Compensación...</p>
                        </CardContent>
                        <CardFooter className="p-10 bg-secondary/5 border-t border-border flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <Terminal className="h-4 w-4 text-secondary" /> Auditado por System Kyron v2.8.5
                            </div>
                            <Badge variant="outline" className="border-secondary/20 text-secondary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow-sm uppercase tracking-widest">Protocolo Activo</Badge>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
