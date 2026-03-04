
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, Crown, Zap, Calculator, ShieldAlert, Cpu, 
  BrainCircuit, Globe, Activity, ShieldCheck, FileText, 
  BarChart3, ArrowRight, Lock, LayoutGrid 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function KyronVaultPage() {
    const { toast } = useToast();

    const budgetData = [
      { item: "Infraestructura Telecom (5G/Contrato Mayorista)", cost: 5000, cat: "Factor Principal" },
      { item: "Lote SIM Cards Físicas Kyron (1.000 uds)", cost: 1000, cat: "Hardware" },
      { item: "Gestión eSIM y Nodo de Datos", cost: 2500, cat: "Software" },
      { item: "Equipos Homologados (Smartphones/Tablets)", cost: 9600, cat: "Hardware" },
      { item: "Ecosistema Web & Cloud Ledger", cost: 4500, cat: "Core" },
      { item: "Módulo Inteligencia Artificial Fiscal", cost: 1000, cat: "IA" },
      { item: "Hardware Papeleras Magnéticas (Sensores)", cost: 683, cat: "Reciclaje" },
      { item: "Moto Bera Carguera DT-200 (Logística)", cost: 2800, cat: "Logística" },
      { item: "Equipos Fiscales Homologados SENIAT", cost: 1350, cat: "Cumplimiento" },
      { item: "Despliegue Operativo La Guaira", cost: 3250, cat: "Operaciones" },
    ];

    const totalBudget = 31683;

    const handleExportVault = () => {
        const content = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h1 style="text-align: center; color: #2563eb;">EXPEDIENTE TÉCNICO: SYSTEM KYRON</h1>
                <hr/>
                <h2>1. JERARQUÍA DE MANDO</h2>
                <p><b>Líder de Inteligencia:</b> Carlos Mattar (IA, Blockchain, Estrategia)</p>
                <p><b>Apoyo Operativo:</b> Sebastián Garrido, Marcos Sousa (Logística y Carga)</p>
                <h2>2. MODELO ZEDU (ANALISIS HOLÍSTICO)</h2>
                <p>System Kyron resuelve la fragmentación operativa en La Guaira mediante un Ecosistema Integral. Telecomunicaciones como Factor Principal, IA para el Blindaje Fiscal, Blockchain para la Inmutabilidad Escolar y Tecnología Magnética para el Reciclaje.</p>
                <h2>3. INVERSIÓN TOTAL</h2>
                <p><b>TOTAL: $31.683,00 USD</b></p>
            </div>
        `;
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const blob = new Blob([header + content + footer], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Kyron_Master_Vault_2025.doc";
        link.click();
        toast({ title: "Bóveda Abierta", description: "Expediente técnico exportado con éxito." });
    };

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-10">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
                        <Lock className="h-3.5 w-3.5" /> Kyron Private Vault • Level 5 Clearance
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">Bóveda <span className="text-primary">Estratégica</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Información Confidencial de Misión Crítica</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleExportVault}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR MASTER DOC (.DOC)
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 w-full">
                {/* Panel Lateral: Jerarquía y Contexto */}
                <div className="xl:col-span-4 space-y-10">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Crown className="h-4 w-4"/> 1. Jerarquía de Mando</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2rem]">
                            <CardContent className="p-0">
                                <div className="p-8 border-b border-white/5 bg-primary/[0.03]">
                                    <h3 className="font-black text-[8px] uppercase tracking-widest text-primary opacity-60 mb-2">INTELIGENCIA Y ARQUITECTURA</h3>
                                    <p className="text-3xl font-black italic text-white leading-none">Carlos Mattar</p>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-black text-[8px] uppercase tracking-widest text-primary opacity-60 mb-2">SOPORTE Y LOGÍSTICA</h3>
                                    <p className="text-lg font-black text-white/50 italic">Sebastián Garrido, Marcos Sousa</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Globe className="h-4 w-4"/> 2. Nodo Piloto: La Guaira</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2rem] p-8 space-y-6">
                            <div className="flex justify-between items-center"><span className="opacity-40 uppercase tracking-widest text-[9px] font-black">Localidad</span> <span className="text-sm font-bold text-white italic">Catia La Mar</span></div>
                            <div className="flex justify-between items-center"><span className="opacity-40 uppercase tracking-widest text-[9px] font-black">Institución</span> <span className="text-sm font-bold text-white italic">Gabriela Mistral</span></div>
                            <div className="flex justify-between items-center"><span className="opacity-40 uppercase tracking-widest text-[9px] font-black">Punto de Venta</span> <span className="text-sm font-bold text-white italic">Bensica</span></div>
                        </Card>
                    </section>
                </div>

                {/* Panel Principal: ZEDU & Finanzas */}
                <div className="xl:col-span-8 space-y-12">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><BrainCircuit className="h-4 w-4" /> 3. Modelo ZEDU (9 Bloques Técnicos)</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem] bg-primary/[0.02]">
                            <p className="text-xl font-bold text-white/90 italic text-justify leading-relaxed">
                                El Modelo ZEDU de **System Kyron** rompe la fragmentación operativa. Implementamos las **Telecomunicaciones** como el factor principal (Red 5G y eSIM), garantizando la conectividad absoluta necesaria para el motor de **IA Fiscal**, la inmutabilidad de registros en **Blockchain** y la monetización del **Reciclaje Magnético**. Este ecosistema unificado elimina el riesgo de sanciones del SENIAT y optimiza el 100% de la gestión regional.
                            </p>
                        </section>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 4. Presupuesto de Inversión Consolidado</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Componente del Sistema</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Categoría</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Inversión (USD)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 hover:bg-primary/[0.02] transition-colors">
                                            <TableCell className="font-bold pl-10 py-5 text-white/80">{row.item}</TableCell>
                                            <TableCell className="text-center"><Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest">{row.cat}</Badge></TableCell>
                                            <TableCell className="text-right pr-10 font-black italic text-primary">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase text-white" colSpan={2}>CapEx Total del Ecosistema</TableCell>
                                        <TableCell className="text-right pr-10 font-black text-3xl text-primary italic">{formatCurrency(totalBudget, "USD")}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
