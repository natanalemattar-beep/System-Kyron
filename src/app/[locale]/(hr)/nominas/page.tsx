
"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, PlusCircle, Calculator, Eye, Send, Mail, MessageCircle, Cloud, Download, HelpCircle, Activity, Wallet, CheckCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const empleados = [
    { id: 1, nombre: "Ana Pérez", cedula: "V-12.345.678", cargo: "Gerente de Proyectos", salarioBase: 12000, estado: "Activo", email: "ana.perez@email.com", tlf: "0412-1112233" },
    { id: 2, nombre: "Luis Gómez", cedula: "V-18.765.432", cargo: "Dev Senior", salarioBase: 10500, estado: "Activo", email: "luis.g@email.com", tlf: "0414-4445566" },
    { id: 3, nombre: "Carlos Mattar", cedula: "V-32.855.496", cargo: "Ingeniero Maestro", salarioBase: 15000, estado: "Activo", email: "carlos.m@kyron.com", tlf: "0414-9377068" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Activo: "default",
  "De Vacaciones": "secondary",
  Inactivo: "outline",
};

export default function NominasPage() {
  const { toast } = useToast();
  const [isPayingAll, setIsPayingAll] = useState(false);

  const handlePayToWallet = () => {
    setIsPayingAll(true);
    toast({
        title: "PAGO DE NÓMINA INICIADO",
        description: "Sincronizando con Caja Digital de la empresa...",
    });

    setTimeout(() => {
        setIsPayingAll(false);
        toast({
            title: "NÓMINA DISPERSADA",
            description: "Fondos acreditados a 3 empleados. Registros sellados en Ledger.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    }, 2500);
  };

  return (
    <div className="space-y-12 pb-20">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-l-4 border-secondary pl-8 py-2">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-white italic-shadow flex items-center gap-6">
                    <Users className="h-10 w-10 text-secondary" />
                    Gestión de Nóminas
                </h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Control de Personal • Protocolo LOTTT 2026</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                    <Download className="mr-2 h-4 w-4" /> Exportar Ledger
                </Button>
                <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary" onClick={handlePayToWallet} disabled={isPayingAll}>
                    {isPayingAll ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-4 w-4" />}
                    Pagar a Billetera
                </Button>
                <Button className="btn-3d-secondary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <Calculator className="mr-2 h-4 w-4" /> CALCULAR Q1
                </Button>
            </div>
        </header>

        <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary">Archivo de Personal Activo</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.02] border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Empleado</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cargo</TableHead>
                            <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Sueldo Base</TableHead>
                            <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Gestión</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {empleados.map((emp) => (
                            <TableRow key={emp.id} className="border-white/5 hover:bg-white/[0.02] transition-all group">
                                <TableCell className="pl-10 py-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-black uppercase tracking-tight text-white/80 group-hover:text-white">{emp.nombre}</span>
                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{emp.cedula}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 text-[10px] font-black uppercase italic text-white/40">{emp.cargo}</TableCell>
                                <TableCell className="text-right py-6 font-mono text-sm font-black text-secondary italic">{formatCurrency(emp.salarioBase, 'Bs.')}</TableCell>
                                <TableCell className="text-center py-6">
                                    <Badge variant={statusVariant[emp.estado]} className="text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg">{emp.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right pr-10 py-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                                            <Eye className="h-4 w-4 text-white/20" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary/10">
                                            <Send className="h-4 w-4 text-secondary" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
