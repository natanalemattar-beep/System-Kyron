"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Crown, Zap, ShieldCheck, 
  Globe, Activity, Lock, Printer
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
        toast({ title: "Bóveda Abierta", description: `Exportando ${docName} en formato oficial .doc` });
        const link = document.createElement("a");
        link.href = "#";
        link.download = `${docName}_Kyron_Official.doc`;
        link.click();
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-10">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-2 shadow-glow">
                        <Lock className="h-3.5 w-3.5" /> Kyron Private Vault
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">Bóveda <span className="text-primary">Estratégica</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Información Confidencial de Misión Crítica</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 px-6 rounded-xl border-white/5 text-[9px] font-black uppercase tracking-widest" onClick={() => window.print()}>
                        <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl" onClick={() => handleExport('Master_Vault')}>
                        <Download className="mr-2 h-3.5 w-3.5" /> DESCARGAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-12 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-12">
                    <TabsTrigger value="zedu" className="rounded-xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary">Modelo ZEDU Maestro</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="rounded-xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary">Factibilidad Técnica</TabsTrigger>
                    <TabsTrigger value="propuesta" className="rounded-xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary">Propuesta Corporativa</TabsTrigger>
                </TabsList>

                {/* ZEDU CONTENT */}
                <TabsContent value="zedu" className="space-y-12">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                        <div className="xl:col-span-4 space-y-8">
                            <Card className="glass-card border-none p-10 rounded-[2rem]">
                                <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-primary mb-8 flex items-center gap-3"><Crown className="h-4 w-4"/> Jerarquía</h3>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-primary pl-6">
                                        <p className="text-[8px] font-black uppercase text-primary/60 mb-1">Director</p>
                                        <p className="text-xl font-black text-white italic">Carlos Mattar</p>
                                    </div>
                                    <div className="border-l-2 border-white/10 pl-6">
                                        <p className="text-[8px] font-black uppercase text-white/40 mb-1">Soporte</p>
                                        <p className="text-base font-bold text-white/60">Sebastián Garrido</p>
                                        <p className="text-base font-bold text-white/60">Marcos Sousa</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="glass-card border-none p-8 rounded-[2rem] bg-primary/5">
                                <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-primary mb-4 flex items-center gap-3"><Globe className="h-4 w-4"/> Nodo Piloto</h3>
                                <p className="text-lg font-black italic text-white mb-1">La Guaira, Catia La Mar</p>
                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-tight">U.E.P. Gabriela Mistral & Supermercado Bensica</p>
                            </Card>
                        </div>
                        <div className="xl:col-span-8 space-y-10">
                            <Card className="glass-card border-none p-12 rounded-[2.5rem]">
                                <h3 className="text-xl font-black italic uppercase text-primary mb-6">Análisis del Problema Holístico</h3>
                                <p className="text-base leading-relaxed text-white/80 text-justify italic font-medium">
                                    El mercado actual sufre una <b>fragmentación operativa crítica</b>. La carencia de conectividad 5G impide la automatización fiscal real, dejando a las empresas expuestas a sanciones masivas. System Kyron unifica el blindaje IA, el sellado Blockchain y la logística de reciclaje magnético sobre una red de datos ininterrumpida, eliminando el error humano y la ineficiencia regional.
                                </p>
                            </Card>
                            <Card className="glass-card border-none overflow-hidden rounded-[2.5rem]">
                                <Table>
                                    <TableHeader><TableRow className="bg-white/5 border-none"><TableHead className="pl-10 py-5 font-black uppercase text-primary text-[9px]">Componente del Ecosistema</TableHead><TableHead className="text-right pr-10 py-5 font-black uppercase text-primary text-[9px]">Inversión (USD)</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {budgetData.map((d, i) => (
                                            <TableRow key={i} className="border-white/5 hover:bg-primary/5"><TableCell className="pl-10 py-3 text-xs font-bold text-white/70">{d.item}</TableCell><TableCell className="text-right pr-10 font-black italic text-primary text-sm">{formatCurrency(d.cost, 'USD')}</TableCell></TableRow>
                                        ))}
                                        <TableRow className="bg-primary/10 border-none"><TableCell className="pl-10 py-6 text-lg font-black italic text-white">CAPEX TOTAL</TableCell><TableCell className="text-right pr-10 text-2xl font-black italic text-primary">{formatCurrency(31683, 'USD')}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* FACTIBILIDAD CONTENT */}
                <TabsContent value="factibilidad">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "VAN", val: "$450,000", desc: "Rentabilidad neta" },
                            { label: "TIR", val: "28.5%", desc: "Rendimiento anual" },
                            { label: "Payback", val: "2.4 Años", desc: "Retorno inicial" },
                            { label: "Margen", val: "32%", desc: "Eficiencia" }
                        ].map((stat, i) => (
                            <Card key={i} className="glass-card border-none p-8 rounded-[1.5rem] text-center">
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">{stat.label}</p>
                                <p className="text-2xl font-black italic text-white mb-1">{stat.val}</p>
                                <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{stat.desc}</p>
                            </Card>
                        ))}
                    </div>
                    <Card className="bg-primary p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-10"><ShieldCheck className="h-40 w-40 rotate-12" /></div>
                        <h3 className="text-2xl font-black italic uppercase text-white mb-4">Dictamen de Viabilidad Kyron</h3>
                        <p className="text-lg leading-relaxed text-white/90 italic font-medium text-justify">
                            "Basado en el análisis de flujo de caja descontado y la capacidad de escalabilidad técnica del Ecosistema Kyron, se dictamina una VIABILIDAD ECONÓMICA SOBRESALIENTE. La integración de IA, Blockchain y Telecomunicaciones crea una barrera de entrada competitiva insuperable."
                        </p>
                    </Card>
                </TabsContent>

                {/* PROPUESTA CONTENT */}
                <TabsContent value="propuesta">
                    <Card className="glass-card border-none p-16 rounded-[3rem] max-w-5xl mx-auto shadow-2xl">
                        <div className="flex justify-between items-start mb-16">
                            <Logo className="h-16 w-16" />
                            <div className="text-right">
                                <p className="text-xl font-black italic uppercase text-primary">Propuesta Maestra</p>
                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Confidencial • 2025</p>
                            </div>
                        </div>
                        <div className="space-y-8 text-white/80 leading-relaxed text-justify text-sm">
                            <p className="text-base font-bold italic text-white">Estimados Aliados Estratégicos,</p>
                            <p>System Kyron presenta una solución integral disruptiva que combina <b>Conectividad 5G</b>, <b>IA Fiscal Predictiva</b> y <b>Reciclaje Magnético</b>. Nuestro proyecto en La Guaira no solo es una implementación técnica, es la creación de un nuevo estándar de operatividad inmutable para el sector comercial venezolano.</p>
                            <div className="grid md:grid-cols-2 gap-6 py-8">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-primary font-black uppercase text-[10px] mb-3 tracking-widest">Pilar 1: Infraestructura</h4>
                                    <p className="text-xs font-medium opacity-70">Despliegue de red mayorista y asignación masiva de eSIMs para garantizar el flujo de datos.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-primary font-black uppercase text-[10px] mb-3 tracking-widest">Pilar 2: Inteligencia</h4>
                                    <p className="text-xs font-medium opacity-70">Blindaje total ante entes reguladores mediante el motor de auditoría continua IA y sellado Blockchain.</p>
                                </div>
                            </div>
                            <div className="pt-16 text-center">
                                <div className="w-48 h-px bg-white/20 mx-auto mb-4"></div>
                                <p className="font-black text-xs uppercase tracking-[0.4em]">Carlos Mattar</p>
                                <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Intelligence & Strategy Lead</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
