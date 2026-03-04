
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Zap, ShieldCheck, 
  Lock, Printer, BrainCircuit, Network, Cpu, Database, 
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const budgetData = [
  { item: "Infraestructura Telecom (5G/Contrato Mayorista)", cost: 5000 },
  { item: "Lote SIM Cards Físicas Kyron (1.000 uds)", cost: 1000 },
  { item: "Gestión eSIM y Nodo de Datos", cost: 2500 },
  { item: "Equipos Homologados (Smartphones/Tablets)", cost: 9600 },
  { item: "Ecosistema Web & Cloud Ledger", cost: 4500 },
  { item: "Módulo Inteligencia Artificial Fiscal", cost: 1000 },
  { item: "Hardware Papeleras Magnéticas (Sensores)", cost: 683 },
  { item: "Moto Bera Carguera DT-200 (Logística)", cost: 2800 },
  { item: "Equipos Fiscales Homologados SENIAT", cost: 1350 },
  { item: "Despliegue Operativo La Guaira", cost: 3250 },
];

const zeduModules = [
    { id: "M1", title: "IA FISCAL", desc: "Inferencia predictiva para cumplimiento 100%.", icon: BrainCircuit, color: "text-primary", border: "border-primary/40", glow: "shadow-glow", status: "Óptimo" },
    { id: "M2", title: "BLOCKCHAIN", desc: "Sellado inmutable de registros transaccionales.", icon: Lock, color: "text-secondary", border: "border-secondary/40", glow: "shadow-glow-secondary", status: "Sincronizado" },
    { id: "M3", title: "CONECTIVIDAD 5G", desc: "Nodo redundante de baja latencia.", icon: Network, color: "text-primary", border: "border-primary/40", glow: "shadow-glow", status: "Activo" },
    { id: "M4", title: "MAG-SENSOR", desc: "Reciclaje con inducción magnética.", icon: Zap, color: "text-secondary", border: "border-secondary/40", glow: "shadow-glow-secondary", status: "Operacional" },
    { id: "M5", title: "CONTROL ZEDU", desc: "Matriz Maestra de desarrollo económico.", icon: Cpu, color: "text-primary", border: "border-primary/40", glow: "shadow-glow", status: "Maestro" },
    { id: "M6", title: "EXPEDIENTE ID", desc: "Identidad digital biométrica 3D unificada.", icon: Database, color: "text-secondary", border: "border-secondary/40", glow: "shadow-glow-secondary", status: "Verificado" }
];

export default function TerminalVaultPage() {
    const { toast } = useToast();

    const handleDownloadExpediente = () => {
        const text = `
EXPEDIENTE TÉCNICO MAESTRO: MODELO ZEDU KYRON
==================================================
ID NODO: MASTER-VAULT-PRO-001
FECHA: ${new Date().toLocaleDateString()}
ESTADO: VERIFICADO POR NODO MAESTRO
--------------------------------------------------

1. ARQUITECTURA DE INGENIERÍA
${zeduModules.map(m => `[${m.id}] ${m.title}: ${m.desc} (Status: ${m.status})`).join('\n')}

2. INVERSIÓN ESTRATÉGICA (CAPEX)
${budgetData.map(d => `- ${d.item}: ${formatCurrency(d.cost, 'USD')}`).join('\n')}

TOTAL INVERSIÓN: ${formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}

==================================================
      SYSTEM KYRON • CORPORATE INTELLIGENCE
==================================================
        `;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "EXPEDIENTE_ZEDU_KYRON.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({ title: "EXPEDIENTE DESCARGADO", description: "El protocolo de exportación ha finalizado." });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 min-h-screen bg-black">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-2 mt-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> NODO ESTRATÉGICO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Bóveda <span className="text-primary italic">Kyron</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">EXPEDIENTE MAESTRO • ZEDU 2.6.5</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-6 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-3.5 w-3.5" /> IMPRIMIR
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 text-[10px] font-black uppercase tracking-widest" onClick={handleDownloadExpediente}>
                        <Download className="mr-2 h-3.5 w-3.5" /> EXPORTAR
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full">
                <TabsList className="flex h-12 bg-white/[0.02] border border-white/5 rounded-xl p-1 mb-12">
                    <TabsTrigger value="zedu" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary transition-all">Matriz ZEDU</TabsTrigger>
                    <TabsTrigger value="budget" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary transition-all">Presupuesto CapEx</TabsTrigger>
                </TabsList>

                <TabsContent value="zedu">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {zeduModules.map((m, i) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className={cn("glass-card p-10 rounded-[2.5rem] h-full flex flex-col items-center text-center border-2 bg-black", m.border)}>
                                    <div className={cn("p-5 rounded-2xl mb-8 shadow-inner border border-white/5", m.color, m.glow)}>
                                        <m.icon className="h-10 w-10" />
                                    </div>
                                    <h4 className="font-black uppercase text-sm tracking-widest mb-4 text-white italic">{m.title}</h4>
                                    <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase">{m.desc}</p>
                                    <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-between items-center">
                                        <span className="text-[8px] font-black text-primary uppercase tracking-widest">NODO {m.id}</span>
                                        <span className="text-[8px] font-black text-secondary uppercase tracking-widest">{m.status}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="budget">
                    <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/5 shadow-2xl bg-black">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-white/[0.03] border-none">
                                    <TableHead className="pl-10 py-6 font-black uppercase text-primary text-[10px] tracking-[0.3em]">Componente de Inversión</TableHead>
                                    <TableHead className="text-right pr-10 py-6 font-black uppercase text-primary text-[10px] tracking-[0.3em]">Monto (USD)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {budgetData.map((d, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-primary/[0.03] transition-colors">
                                        <TableCell className="pl-10 py-5 text-xs font-bold text-white/70 uppercase">{d.item}</TableCell>
                                        <TableCell className="text-right pr-10 font-mono font-black text-white italic">{formatCurrency(d.cost, 'USD')}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="bg-primary/10 border-none">
                                    <TableCell className="pl-10 py-10 text-xl font-black text-white italic uppercase">TOTAL GENERAL</TableCell>
                                    <TableCell className="text-right pr-10 text-4xl font-mono font-black text-primary italic shadow-glow-text">{formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
