
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Zap, ShieldCheck, 
  Lock, Printer, BrainCircuit, Network, Cpu, Database, 
  Sparkles, Activity, Terminal as TerminalIcon
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadExpediente = () => {
        const text = `
==================================================
      SYSTEM KYRON • CORPORATE INTELLIGENCE
==================================================
EXPEDIENTE TÉCNICO MAESTRO: MODELO ZEDU
ID NODO: MASTER-VAULT-PRO-001
FECHA: ${new Date().toLocaleDateString()}
ESTADO: VERIFICADO POR NODO MAESTRO
--------------------------------------------------

1. ARQUITECTURA DE INGENIERÍA (MÓDULOS)
${zeduModules.map(m => `[${m.id}] ${m.title}: ${m.desc}\n    Estado Operativo: ${m.status}`).join('\n')}

2. INVERSIÓN ESTRATÉGICA (CAPEX)
${budgetData.map(d => `- ${d.item.padEnd(45, '.')} ${formatCurrency(d.cost, 'USD')}`).join('\n')}

--------------------------------------------------
TOTAL INVERSIÓN PROYECTADA: ${formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}
--------------------------------------------------

DICTAMEN TÉCNICO:
Viabilidad Económica Sobresaliente. El modelo SaaS 
permite una escalabilidad del 300% en el primer 
ejercicio fiscal.

FIRMA DIGITAL: [KYRON-MASTER-AUTH-ID-2026]
==================================================
        `;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "EXPEDIENTE_ZEDU_KYRON_PRO.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({ 
            title: "PROTOCOLO FINALIZADO", 
            description: "Expediente Maestro exportado con éxito.",
            action: <ShieldCheck className="text-primary h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 min-h-screen bg-black relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:40px_40px]"></div>

            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-4 mt-10 relative z-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> NODO ESTRATÉGICO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Bóveda <span className="text-primary italic">Kyron</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">EXPEDIENTE MAESTRO • TERMINAL ZEDU 2.6.5</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl" onClick={handleDownloadExpediente}>
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full relative z-10">
                <TabsList className="flex h-14 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-16 shadow-inner">
                    <TabsTrigger value="zedu" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Matriz ZEDU</TabsTrigger>
                    <TabsTrigger value="budget" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Presupuesto CapEx</TabsTrigger>
                </TabsList>

                <TabsContent value="zedu" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {zeduModules.map((m, i) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className={cn("glass-card p-10 rounded-[3rem] h-full flex flex-col items-center text-center border-2 bg-black/40 group hover:scale-[1.02]", m.border)}>
                                    <div className={cn("p-6 rounded-[2rem] mb-10 shadow-inner border border-white/5 transition-all duration-500 group-hover:scale-110", m.color, m.glow)}>
                                        <m.icon className="h-12 w-12" />
                                    </div>
                                    <h4 className="font-black uppercase text-base tracking-widest mb-4 text-white italic underline decoration-primary/20 underline-offset-8">{m.title}</h4>
                                    <p className="text-[11px] font-bold text-white/40 leading-relaxed uppercase max-w-[200px]">{m.desc}</p>
                                    
                                    <div className="mt-auto pt-10 w-full flex justify-between items-center border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-3 w-3 text-primary animate-pulse" />
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">NODO {m.id}</span>
                                        </div>
                                        <div className={cn("text-[8px] font-black uppercase tracking-widest px-3 h-6 flex items-center bg-white/5 rounded-full", m.color)}>
                                            {m.status}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="budget" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="glass-card overflow-hidden rounded-[3rem] border-white/5 shadow-2xl bg-black/40 p-1 md:p-2">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none hover:bg-white/[0.03]">
                                        <TableHead className="pl-12 py-8 font-black uppercase text-primary text-[11px] tracking-[0.4em]">Componente de Inversión</TableHead>
                                        <TableHead className="text-right pr-12 py-8 font-black uppercase text-primary text-[11px] tracking-[0.4em]">Monto (USD)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((d, i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-primary/[0.03] transition-colors group">
                                            <TableCell className="pl-12 py-6 text-sm font-bold text-white/70 uppercase tracking-tight group-hover:text-white transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary" />
                                                    {d.item}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-12 font-mono font-black text-white text-lg italic">{formatCurrency(d.cost, 'USD')}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none hover:bg-primary/15 transition-all">
                                        <TableCell className="pl-12 py-12 text-2xl font-black text-white italic uppercase tracking-tighter">
                                            <div className="flex items-center gap-4">
                                                <TerminalIcon className="h-8 w-8 text-primary" />
                                                TOTAL INVERSIÓN ESTRATÉGICA
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-12 text-5xl font-mono font-black text-primary italic shadow-glow-text">
                                            {formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-20 flex justify-center pb-10">
                <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Encrypt: AES-512</span>
                    <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> AI Engine: Active</span>
                    <span className="flex items-center gap-2"><Database className="h-3 w-3" /> Ledger: Verified</span>
                </div>
            </div>
        </div>
    );
}
