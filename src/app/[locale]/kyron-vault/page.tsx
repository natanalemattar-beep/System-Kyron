"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Crown, Zap, ShieldCheck, 
  Globe, Lock, Printer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

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

    const handleExport = (docName: string) => {
        toast({ title: "BÓVEDA ABIERTA", description: `Despachando expediente ${docName}.` });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-10">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l border-white/10 pl-10 py-2">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/60">
                        <Lock className="h-3 w-3" /> Nodo Cifrado
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">Bóveda <span className="text-white/20">Kyron</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-40">Acceso restringido • Misión Crítica</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-6 text-[10px] font-bold uppercase tracking-widest" onClick={() => window.print()}>
                        <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
                    </Button>
                    <Button className="btn-premium h-10 px-8 text-[10px] font-bold uppercase tracking-widest" onClick={() => handleExport('Expediente_Maestro')}>
                        <Download className="mr-2 h-3.5 w-3.5" /> Exportar Expediente
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full">
                <TabsList className="flex h-12 bg-white/[0.02] border border-white/5 rounded-lg p-1 mb-12">
                    <TabsTrigger value="zedu" className="flex-1 rounded-md font-bold uppercase text-[9px] tracking-widest">Modelo ZEDU Maestro</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="flex-1 rounded-md font-bold uppercase text-[9px] tracking-widest">Factibilidad Técnica</TabsTrigger>
                    <TabsTrigger value="propuesta" className="flex-1 rounded-md font-bold uppercase text-[9px] tracking-widest">Propuesta Corporativa</TabsTrigger>
                </TabsList>

                {/* CONTENIDO ZEDU */}
                <TabsContent value="zedu" className="space-y-12">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                        <div className="xl:col-span-4 space-y-8">
                            <Card className="bg-[#050505] border border-white/5 p-10 rounded-2xl">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8 flex items-center gap-3"><Crown className="h-4 w-4"/> Jerarquía</h3>
                                <div className="space-y-6">
                                    <div className="border-l border-white/20 pl-6">
                                        <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Director de Estrategia</p>
                                        <p className="text-lg font-bold text-white tracking-tight">Carlos Mattar</p>
                                    </div>
                                    <div className="border-l border-white/5 pl-6">
                                        <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Soporte Técnico</p>
                                        <p className="text-sm font-medium text-white/60">Sebastián Garrido</p>
                                        <p className="text-sm font-medium text-white/60">Marcos Sousa</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="bg-[#050505] border border-white/5 p-8 rounded-2xl">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-3"><Globe className="h-4 w-4"/> Nodo Piloto</h3>
                                <p className="text-base font-bold text-white mb-1">La Guaira, Catia La Mar</p>
                                <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest">U.E.P. Gabriela Mistral</p>
                            </Card>
                        </div>
                        <div className="xl:col-span-8 space-y-10">
                            <Card className="bg-[#050505] border border-white/5 p-12 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Análisis Operativo Holístico</h3>
                                <p className="text-base leading-relaxed text-white/60 text-justify font-medium">
                                    System Kyron resuelve la fragmentación crítica del sector comercial mediante una arquitectura unificada. Al integrar <b>Conectividad 5G</b>, <b>Blindaje IA</b> y <b>Sellado Blockchain</b>, eliminamos el riesgo fiscal y la ineficiencia operativa en un único flujo de datos inmutable.
                                </p>
                            </Card>
                            <Card className="bg-[#050505] border border-white/5 overflow-hidden rounded-2xl">
                                <Table>
                                    <TableHeader><TableRow className="bg-white/[0.02] border-none"><TableHead className="pl-10 py-4 font-bold uppercase text-white/40 text-[9px] tracking-widest">Componente</TableHead><TableHead className="text-right pr-10 py-4 font-bold uppercase text-white/40 text-[9px] tracking-widest">Monto (USD)</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {budgetData.map((d, i) => (
                                            <TableRow key={i} className="border-white/5 hover:bg-white/[0.01]"><TableCell className="pl-10 py-3 text-xs font-medium text-white/70">{d.item}</TableCell><TableCell className="text-right pr-10 font-mono font-bold text-white text-sm">{formatCurrency(d.cost, 'USD')}</TableCell></TableRow>
                                        ))}
                                        <TableRow className="bg-white/5 border-none"><TableCell className="pl-10 py-6 text-base font-bold text-white">INVERSIÓN TOTAL (CAPEX)</TableCell><TableCell className="text-right pr-10 text-xl font-mono font-black text-white">{formatCurrency(31683, 'USD')}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* CONTENIDO FACTIBILIDAD */}
                <TabsContent value="factibilidad">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "VAN", val: "$450,000" },
                            { label: "TIR", val: "28.5%" },
                            { label: "Recuperación", val: "2.4 Años" },
                            { label: "Margen", val: "32%" }
                        ].map((stat, i) => (
                            <Card key={i} className="bg-[#050505] border border-white/5 p-8 rounded-xl text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">{stat.label}</p>
                                <p className="text-2xl font-bold text-white tracking-tighter">{stat.val}</p>
                            </Card>
                        ))}
                    </div>
                    <Card className="bg-white text-black p-12 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck className="h-40 w-40" /></div>
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Dictamen de Viabilidad</h3>
                        <p className="text-lg leading-relaxed font-medium text-justify italic">
                            "El análisis de flujos proyectados y la escalabilidad del modelo SaaS confirman una viabilidad económica del 100%. La barrera tecnológica de Kyron protege el capital invertido."
                        </p>
                    </Card>
                </TabsContent>

                {/* CONTENIDO PROPUESTA */}
                <TabsContent value="propuesta">
                    <Card className="bg-[#050505] border border-white/5 p-16 rounded-2xl max-w-4xl mx-auto">
                        <div className="flex justify-between items-start mb-16">
                            <Logo className="h-12 w-12" />
                            <div className="text-right">
                                <p className="text-lg font-bold text-white uppercase tracking-tight">Propuesta Maestra</p>
                                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Confidencial • 2025</p>
                            </div>
                        </div>
                        <div className="space-y-8 text-white/70 leading-relaxed text-justify text-sm">
                            <p className="text-base font-bold text-white">Estimados Aliados,</p>
                            <p>System Kyron despliega una infraestructura de <b>Misión Crítica</b> combinando conectividad redundante y auditoría IA. Este nodo asegura la transparencia total y el cumplimiento automático de cada proceso comercial.</p>
                            <div className="pt-16 text-center">
                                <div className="w-32 h-[1px] bg-white/10 mx-auto mb-4"></div>
                                <p className="font-bold text-xs uppercase tracking-widest">Carlos Mattar</p>
                                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Líder de Nodo Estratégico</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
