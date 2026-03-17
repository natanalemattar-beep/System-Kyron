
"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
    Calculator, 
    PlusCircle, 
    CheckCircle, 
    Download, 
    Eye, 
    Users, 
    Wallet, 
    Loader2, 
    Activity, 
    Terminal, 
    History,
    Calendar,
    Zap,
    TrendingUp,
    ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const empleados = [
    { id: 1, nombre: "Ana Pérez", ci: "V-12.345.678", cargo: "Gerente Finanzas", salario: 12000, vacaciones: "Agosto", utilidades: 36000, status: "Al Día" },
    { id: 2, nombre: "Luis Gómez", ci: "V-18.765.432", cargo: "Dev Senior", salario: 10500, vacaciones: "Junio", utilidades: 31500, status: "Al Día" },
    { id: 3, nombre: "Carlos Mattar", ci: "V-32.855.496", cargo: "Ingeniero Maestro", salario: 15000, vacaciones: "Diciembre", utilidades: 45000, status: "Auditado" },
];

export default function NominasPage() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessPayroll = () => {
    setIsProcessing(true);
    toast({ title: "CALCULANDO NÓMINA Q1 MARZO", description: "Auditando asignaciones y deducciones LOTTT..." });
    setTimeout(() => {
        setIsProcessing(false);
        toast({
            title: "NÓMINA CERTIFICADA",
            description: "Cálculo de salarios, bono vacacional y utilidades finalizado.",
            action: <CheckCircle className="text-emerald-500 h-4 w-4" />
        });
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                    <Calculator className="h-3 w-3" /> NODO DE COMPENSACIÓN
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Libro de <span className="text-secondary italic">Nómina y Beneficios</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control Salarial • Vacaciones • Utilidades 2026</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                    <Download className="mr-2 h-4 w-4" /> ARCHIVO BANCO
                </Button>
                <Button 
                    className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl"
                    onClick={handleProcessPayroll}
                    disabled={isProcessing}
                >
                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                    CALCULAR QUINCENA
                </Button>
            </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Wallet className="h-24 w-24" /></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Total Erogación (Mes)</p>
                <p className="text-4xl font-black italic text-foreground tracking-tighter shadow-glow-text">{formatCurrency(37500, 'Bs.')}</p>
            </Card>
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000"><TrendingUp className="h-24 w-24" /></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Provisión de Utilidades</p>
                <p className="text-4xl font-black italic text-secondary tracking-tighter shadow-glow-secondary">{formatCurrency(112500, 'Bs.')}</p>
            </Card>
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck className="h-24 w-24" /></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Estatus Parafiscal</p>
                <p className="text-4xl font-black italic text-emerald-500 tracking-tighter uppercase">AL DÍA</p>
            </Card>
        </div>

        <Tabs defaultValue="nomina" className="w-full">
            <TabsList className="flex h-16 bg-card/40 border border-border rounded-[2rem] p-2 mb-10 shadow-inner max-w-2xl">
                <TabsTrigger value="nomina" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-black transition-all">Relación Salarial</TabsTrigger>
                <TabsTrigger value="vacaciones" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-black transition-all">Plan Vacacional</TabsTrigger>
                <TabsTrigger value="utilidades" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-black transition-all">Utilidades</TabsTrigger>
            </TabsList>

            <TabsContent value="nomina" className="animate-in fade-in duration-500">
                <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Trabajador / Cargo</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Cédula</TableHead>
                                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Sueldo Base</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus Pago</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {empleados.map(e => (
                                    <TableRow key={e.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-secondary transition-colors">{e.nombre}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase">{e.cargo}</p>
                                        </TableCell>
                                        <TableCell className="py-6 text-center font-mono text-xs font-bold text-foreground/40">{e.ci}</TableCell>
                                        <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(e.salario, 'Bs.')}</TableCell>
                                        <TableCell className="text-right pr-10 py-6">
                                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 px-3 h-6 rounded-lg">{e.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="p-10 bg-secondary/5 border-t border-border flex justify-between items-center">
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                            <Terminal className="h-4 w-4 text-secondary" /> Validado bajo norma LOTTT v2.6.5
                        </div>
                        <Button variant="ghost" className="text-secondary text-[9px] font-black uppercase tracking-widest">Ver Ledger Histórico</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="vacaciones" className="animate-in fade-in duration-500">
                <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 p-10 shadow-2xl">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8">Cronograma Vacacional Certificado</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {empleados.map(e => (
                            <div key={e.id} className="p-6 rounded-[2.5rem] bg-white/5 border border-border space-y-4 group hover:border-secondary/30 transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-secondary/10 rounded-2xl group-hover:scale-110 transition-transform"><Calendar className="h-5 w-5 text-secondary" /></div>
                                    <Badge variant="outline" className="text-[7px] font-black uppercase">{e.vacaciones}</Badge>
                                </div>
                                <p className="font-black text-xs uppercase italic text-foreground/80">{e.nombre}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed">Bono Vacacional Proyectado: <span className="text-secondary">{formatCurrency(e.salario * 0.5, 'Bs.')}</span></p>
                            </div>
                        ))}
                    </div>
                </Card>
            </TabsContent>

            <TabsContent value="utilidades" className="animate-in fade-in duration-500">
                <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 p-10 shadow-2xl border-l-4 border-emerald-500">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"><TrendingUp className="h-8 w-8 text-emerald-500" /></div>
                        <div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Provisión Legal de Utilidades</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Cálculo Proyectado a 90 días de salario</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {empleados.map(e => (
                            <div key={e.id} className="flex justify-between items-center border-b border-border pb-4 last:border-none last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase text-foreground/80">{e.nombre}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Base: 3 meses devengados</p>
                                </div>
                                <p className="text-xl font-black italic text-emerald-500 tracking-tighter">{formatCurrency(e.utilidades, 'Bs.')}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
