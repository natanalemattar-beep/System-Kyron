"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Crown, Zap, ShieldCheck, 
  Globe, Lock, Printer, BrainCircuit, Activity, Network, Cpu, Database
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
    { id: "M1", title: "IA FISCAL", desc: "Motor de inferencia para automatización contable.", icon: BrainCircuit, color: "text-primary", border: "neon-border-blue", bg: "bg-primary/5" },
    { id: "M2", title: "LEDGER BLOCKCHAIN", desc: "Sellado inmutable de transacciones fiscales.", icon: Lock, color: "text-secondary", border: "neon-border-green", bg: "bg-secondary/5" },
    { id: "M3", title: "NODO TELECOM 5G", desc: "Conectividad redundante de grado militar.", icon: Network, color: "text-primary", border: "neon-border-blue", bg: "bg-primary/5" },
    { id: "M4", title: "SENSOR MAGNÉTICO", desc: "Tecnología de reciclaje para activos verdes.", icon: Zap, color: "text-secondary", border: "neon-border-green", bg: "bg-secondary/5" },
    { id: "M5", title: "CONTROL ZEDU", desc: "Matriz de desarrollo urbano y económico.", icon: Cpu, color: "text-primary", border: "neon-border-blue", bg: "bg-primary/5" },
    { id: "M6", title: "CENTRAL DE DATOS", desc: "Bóveda de expedientes digitales inmutables.", icon: Database, color: "text-secondary", border: "neon-border-green", bg: "bg-secondary/5" }
];

export default function KyronVaultPage() {
    const { toast } = useToast();

    const handleDownloadExpediente = () => {
        const text = `
============================================================
      EXPEDIENTE TÉCNICO MAESTRO: MODELO ZEDU KYRON
============================================================
SISTEMA: SYSTEM KYRON V2.6.5
ID NODO: MASTER-VAULT-001
FECHA: ${new Date().toLocaleDateString('es-VE')}
SEGURIDAD: NIVEL 5 (BLACK)
------------------------------------------------------------

1. ARQUITECTURA DE INGENIERÍA (MATRIZ DE MÓDULOS)
------------------------------------------------------------
${zeduModules.map(m => `
[${m.id}] ${m.title}
   - FUNCIÓN: ${m.desc}
   - ESTADO: OPERATIVO / VERIFICADO
`).join('\n')}

2. ANÁLISIS DE FACTIBILIDAD Y COSTOS (USD)
------------------------------------------------------------
${budgetData.map(d => `- ${d.item.padEnd(45)} | ${formatCurrency(d.cost, 'USD')}`).join('\n')}

TOTAL CAPEX DESPLEGADO: ${formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}

3. DICTAMEN DE IMPACTO OPERATIVO
------------------------------------------------------------
El modelo ZEDU implementado garantiza una reducción del 100% 
en el riesgo fiscal residual mediante la inyección de IA 
en el flujo de caja y el sellado Blockchain de libros.

============================================================
      VALIDADO POR EL NODO ESTRATÉGICO SYSTEM KYRON
      SELLADO DIGITAL INMUTABLE - NO REQUIERE FIRMA
============================================================
        `;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "ZEDU_MASTER_EXPEDIENTE_KYRON.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({ title: "EXPEDIENTE DESPACHADO", description: "Descarga de alta fidelidad completada." });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 hud-grid min-h-screen gradient-mesh">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-2 mt-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> NODO CIFRADO MAESTRO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Bóveda <span className="text-primary italic">Kyron</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">ACCESO NIVEL 5 • MISIÓN CRÍTICA • © 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-6 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-3.5 w-3.5" /> IMPRIMIR
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 text-[10px] font-black uppercase tracking-widest" onClick={handleDownloadExpediente}>
                        <Download className="mr-2 h-3.5 w-3.5" /> EXPORTAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full">
                <TabsList className="flex h-12 bg-white/[0.02] border border-white/5 rounded-xl p-1 mb-12 backdrop-blur-xl">
                    <TabsTrigger value="zedu" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Matriz ZEDU (Módulos)</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Factibilidad Real</TabsTrigger>
                    <TabsTrigger value="budget" className="flex-1 rounded-lg font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Presupuesto de Inversión</TabsTrigger>
                </TabsList>

                <TabsContent value="zedu" className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {zeduModules.map((m, i) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className={cn("glass-card p-10 rounded-[2.5rem] h-full flex flex-col items-center text-center group hover:scale-[1.05] transition-all duration-500 border-2", m.border, m.bg)}>
                                    <div className={cn("p-5 rounded-2xl mb-8 shadow-inner border border-white/10 group-hover:shadow-glow transition-all", m.color)}>
                                        <m.icon className="h-10 w-10" />
                                    </div>
                                    <h4 className="font-black uppercase text-sm tracking-widest mb-4 text-white italic">{m.title}</h4>
                                    <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase">{m.desc}</p>
                                    <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-between items-center">
                                        <span className="text-[8px] font-black text-primary uppercase tracking-widest">{m.id}</span>
                                        <span className="text-[8px] font-black text-secondary uppercase tracking-widest flex items-center gap-1">
                                            <ShieldCheck className="h-3 w-3"/> VERIFICADO
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="factibilidad" className="space-y-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { label: "VAN", val: "$450,000", color: "text-primary", glow: "shadow-glow" },
                            { label: "TIR", val: "28.5%", color: "text-secondary", glow: "shadow-glow-secondary" },
                            { label: "Payback", val: "2.4 Años", color: "text-primary", glow: "shadow-glow" },
                            { label: "Margen", val: "32%", color: "text-secondary", glow: "shadow-glow-secondary" }
                        ].map((stat, i) => (
                            <Card key={i} className="glass-card p-10 rounded-[2rem] text-center border-white/5 group hover:border-primary/30 transition-all">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4">{stat.label}</p>
                                <p className={cn("text-3xl font-black tracking-tighter italic shadow-glow-text", stat.color)}>{stat.val}</p>
                            </Card>
                        ))}
                    </div>
                    <Card className="bg-primary text-white p-16 rounded-[4rem] relative overflow-hidden shadow-glow border-none">
                        <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:rotate-12 transition-all duration-1000"><ShieldCheck className="h-64 w-64" /></div>
                        <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic">Dictamen de Misión Crítica</h3>
                        <p className="text-2xl leading-relaxed font-bold text-justify italic opacity-90">
                            "El análisis de interoperabilidad confirma que la inyección de tecnología de tercera generación en los procesos de System Kyron anula el riesgo fiscal residual, permitiendo una escalabilidad exponencial del capital invertido."
                        </p>
                    </Card>
                </TabsContent>

                <TabsContent value="budget" className="space-y-10">
                    <Card className="glass-card overflow-hidden rounded-[2.5rem] border-white/5 shadow-2xl">
                        <Table>
                            <TableHeader><TableRow className="bg-white/[0.03] border-none"><TableHead className="pl-10 py-6 font-black uppercase text-primary text-[10px] tracking-[0.3em]">Concepto Estratégico</TableHead><TableHead className="text-right pr-10 py-6 font-black uppercase text-primary text-[10px] tracking-[0.3em]">Inversión (USD)</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {budgetData.map((d, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-primary/[0.03] transition-colors"><TableCell className="pl-10 py-5 text-xs font-bold text-white/70 uppercase tracking-tight">{d.item}</TableCell><TableCell className="text-right pr-10 font-mono font-black text-white text-base italic">{formatCurrency(d.cost, 'USD')}</TableCell></TableRow>
                                ))}
                                <TableRow className="bg-primary/10 border-none"><TableCell className="pl-10 py-10 text-xl font-black text-white italic uppercase tracking-tighter">Total Inversión Proyectada</TableCell><TableCell className="text-right pr-10 text-4xl font-mono font-black text-primary italic shadow-glow-text">{formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}</TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}