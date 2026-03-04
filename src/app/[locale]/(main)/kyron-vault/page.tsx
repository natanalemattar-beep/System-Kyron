"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Crown, Zap, ShieldCheck, 
  Globe, Lock, Printer, BrainCircuit, Activity, Network
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";

export default function KyronVaultPage() {
    const { toast } = useToast();

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

    const zeduMatrix = [
        { id: "M1", title: "IA Fiscal", status: "VERIFICADO", icon: BrainCircuit, color: "text-blue-400" },
        { id: "M2", title: "Blockchain", status: "ACTIVO", icon: Lock, color: "text-green-400" },
        { id: "M3", title: "Telemetría", status: "ÓPTIMO", icon: Activity, color: "text-cyan-400" },
        { id: "M4", title: "Red 5G", status: "ESTABLE", icon: Network, color: "text-purple-400" }
    ];

    const handleExport = (docName: string) => {
        toast({ title: "BÓVEDA ABIERTA", description: `Despachando expediente ${docName}.` });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 hud-grid min-h-screen">
            <div className="gradient-blur top-0 right-0 w-[800px] h-[800px] bg-primary/5" />
            
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-2 mt-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-bold uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> Nodo Cifrado Maestro
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Bóveda <span className="text-primary italic">Kyron</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Acceso Nivel 5 • Misión Crítica • © 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-6 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 text-[10px] font-black uppercase tracking-widest" onClick={() => handleExport('Master_Expediente')}>
                        <Download className="mr-2 h-3.5 w-3.5" /> Exportar Ledger
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full">
                <TabsList className="flex h-12 bg-white/[0.02] border border-white/5 rounded-xl p-1 mb-12">
                    <TabsTrigger value="zedu" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Matriz ZEDU Real</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Factibilidad Técnica</TabsTrigger>
                    <TabsTrigger value="propuesta" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Propuesta Reservada</TabsTrigger>
                </TabsList>

                <TabsContent value="zedu" className="space-y-12">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                        <div className="xl:col-span-4 space-y-8">
                            <Card className="glass-card p-10 rounded-[2.5rem] border-white/5">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10 flex items-center gap-3"><Crown className="h-4 w-4"/> Jerarquía de Mando</h3>
                                <div className="space-y-8">
                                    <div className="border-l-2 border-primary pl-6">
                                        <p className="text-[8px] font-black uppercase text-white/30 mb-1 tracking-widest">Director de Estrategia</p>
                                        <p className="text-xl font-black text-white tracking-tighter italic">Carlos Mattar</p>
                                    </div>
                                    <div className="border-l-2 border-white/10 pl-6">
                                        <p className="text-[8px] font-black uppercase text-white/30 mb-1 tracking-widest">Ingeniería de Sistemas</p>
                                        <p className="text-sm font-bold text-white/70">Sebastián Garrido</p>
                                        <p className="text-sm font-bold text-white/70">Marcos Sousa</p>
                                    </div>
                                </div>
                            </Card>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {zeduMatrix.map((m) => (
                                    <Card key={m.id} className="glass-card p-6 rounded-2xl text-center group border-white/5 hover:border-primary/20">
                                        <m.icon className={cn("h-6 w-6 mx-auto mb-4 transition-transform group-hover:scale-110", m.color)} />
                                        <p className="text-[9px] font-black text-white/90 uppercase tracking-tighter">{m.title}</p>
                                        <p className="text-[7px] font-black text-white/20 mt-1 uppercase tracking-widest">{m.status}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="xl:col-span-8 space-y-10">
                            <Card className="glass-card p-12 rounded-[3rem] border-primary/10">
                                <h3 className="text-2xl font-black text-white mb-6 tracking-tighter italic uppercase">Ecosistema Kyron: Informe de Interoperabilidad</h3>
                                <p className="text-lg leading-relaxed text-white/60 text-justify font-medium italic">
                                    System Kyron resuelve la fragmentación crítica del sector comercial mediante una arquitectura unificada. Al integrar <b>Conectividad 5G</b>, <b>Blindaje IA</b> y <b>Sellado Blockchain</b>, eliminamos el riesgo fiscal y la ineficiencia operativa en un único flujo de datos inmutable.
                                </p>
                            </Card>
                            <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/5">
                                <Table>
                                    <TableHeader><TableRow className="bg-white/[0.03] border-none"><TableHead className="pl-10 py-5 font-black uppercase text-primary text-[10px] tracking-[0.3em]">Componente Estratégico</TableHead><TableHead className="text-right pr-10 py-5 font-black uppercase text-primary text-[10px] tracking-[0.3em]">Inversión (USD)</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {budgetData.map((d, i) => (
                                            <TableRow key={i} className="border-white/5 hover:bg-primary/[0.02] transition-colors"><TableCell className="pl-10 py-4 text-xs font-bold text-white/70 uppercase tracking-tight">{d.item}</TableCell><TableCell className="text-right pr-10 font-mono font-black text-white text-base italic">{formatCurrency(d.cost, 'USD')}</TableCell></TableRow>
                                        ))}
                                        <TableRow className="bg-primary/10 border-none"><TableCell className="pl-10 py-8 text-lg font-black text-white italic uppercase tracking-tighter">Total CapEx Desplegado</TableCell><TableCell className="text-right pr-10 text-3xl font-mono font-black text-primary italic shadow-glow-text">{formatCurrency(31683, 'USD')}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="factibilidad">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        {[
                            { label: "VAN", val: "$450,000", color: "text-blue-400" },
                            { label: "TIR", val: "28.5%", color: "text-green-400" },
                            { label: "Recuperación", val: "2.4 Años", color: "text-yellow-400" },
                            { label: "Margen Neto", val: "32%", color: "text-purple-400" }
                        ].map((stat, i) => (
                            <Card key={i} className="glass-card p-10 rounded-[2rem] text-center relative overflow-hidden group border-white/5">
                                <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-primary/5 transition-all" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4">{stat.label}</p>
                                <p className={cn("text-3xl font-black tracking-tighter italic", stat.color)}>{stat.val}</p>
                            </Card>
                        ))}
                    </div>
                    <Card className="bg-primary text-white p-16 rounded-[4rem] relative overflow-hidden shadow-[0_0_80px_-20px_rgba(37,99,235,0.4)] border-none">
                        <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:rotate-12 transition-all duration-1000"><ShieldCheck className="h-64 w-64" /></div>
                        <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic text-white">Dictamen de Misión Crítica</h3>
                        <p className="text-2xl leading-relaxed font-bold text-justify italic opacity-90 text-white/90">
                            "El análisis de flujos proyectados y la escalabilidad del modelo SaaS confirman una viabilidad económica del 100%. La barrera tecnológica de Kyron protege el capital invertido contra cualquier fluctuación del mercado local."
                        </p>
                    </Card>
                </TabsContent>

                <TabsContent value="propuesta">
                    <Card className="glass-card p-20 rounded-[4rem] max-w-5xl mx-auto relative overflow-hidden border-white/5">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
                        <div className="flex justify-between items-start mb-20">
                            <Logo className="h-20 w-20 shadow-glow" />
                            <div className="text-right">
                                <p className="text-2xl font-black text-white uppercase tracking-tighter italic">Propuesta Maestra</p>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mt-2">Nivel de Seguridad: Black</p>
                            </div>
                        </div>
                        <div className="space-y-10 text-white/70 leading-relaxed text-justify text-lg font-medium italic">
                            <p className="text-xl font-black text-white not-italic uppercase tracking-widest border-l-4 border-primary pl-6">Resumen Ejecutivo</p>
                            <p>System Kyron despliega una infraestructura de <b>Misión Crítica</b> combinando conectividad redundante y auditoría IA. Este nodo asegura la transparencia total y el cumplimiento automático de cada proceso comercial, garantizando 0% de riesgo fiscal.</p>
                            <div className="pt-24 text-center">
                                <div className="w-48 h-[2px] bg-primary/20 mx-auto mb-6 shadow-glow"></div>
                                <p className="font-black text-base uppercase tracking-[0.4em] text-white">Carlos Mattar</p>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.6em] mt-2">Líder de Nodo Estratégico • System Kyron</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}