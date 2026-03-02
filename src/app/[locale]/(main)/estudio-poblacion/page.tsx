
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, 
  Users, 
  Rocket, 
  ShieldCheck, 
  FileText, 
  CalendarRange, 
  CheckCircle, 
  Crown, 
  Truck, 
  Cpu, 
  BrainCircuit, 
  Network, 
  Zap, 
  Calculator,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

const teamData = [
  { label: "NOMBRE DEL PROYECTO", value: "System Kyron", important: true },
  { label: "LÍDER ESTRATÉGICO (IA & ARQUITECTURA)", value: "Carlos Mattar", important: true },
  { label: "PERSONAL DE APOYO OPERATIVO", value: "Sebastian Garrido, Marcos Sousa", important: false },
  { label: "INSTITUCIÓN BENEFICIARIA", value: "U.E.P. Gabriela Mistral", important: true },
  { label: "UBICACIÓN GEOGRÁFICA", value: "La Guaira, Venezuela", important: true },
];

const zeduData = [
  { label: "LOCALIZACIÓN ESPECÍFICA", value: "La Atlántida, entre calle 7 a calle 3, Catia La Mar. Referencias: Pinta Catia, Supermercado Bensica." },
  { label: "NOMBRE DE LA COMUNIDAD", value: "Comunidad Comercial y Residencial La Atlántida" },
  { label: "POBLACIÓN ESTIMADA", value: "500 empresas activas / 5.000 empleados administrativos y civiles." },
  { label: "DESGLOSE DE GÉNERO", value: "52% Femenino / 48% Masculino." },
  { label: "RANGO ETARIO DOMINANTE", value: "25-40 años (60%) / 41-55 años (30%) / Otros (10%)." },
  { label: "CARACTERÍSTICAS SOCIALES", value: "Entorno con alta necesidad de digitalización y blindaje fiscal ante normativas 2025." },
  { label: "CONDICIONES CLIMÁTICAS", value: "Tropical costero. Promedio 28°C. Alta salinidad (Riesgo para archivos físicos)." }
];

const budgetData = [
  { item: "Moto Bera Carguera DT-200 (Logística Litoral)", cost: 2800, responsable: "Marcos Sousa" },
  { item: "Workstation de Gestión Maestra Pro (Dirección)", cost: 1200, responsable: "Carlos Mattar" },
  { item: "Servidor de Nodo Local Ledger Blockchain", cost: 1500, responsable: "Carlos Mattar" },
  { item: "Infraestructura de Red Mesh Colegio", cost: 1800, responsable: "Sebastian Garrido" },
  { item: "Licencia Anual IA Predictiva Kyron Enterprise", cost: 650, responsable: "Carlos Mattar" },
  { item: "Suministros de Ingeniería y Hardware Fiscal", cost: 500, responsable: "Marcos Sousa" },
];

const totalBudget = budgetData.reduce((sum, item) => sum + item.cost, 0);

const actionPlan = [
  { tarea: "DIAGNÓSTICO TÉCNICO DE MISIÓN CRÍTICA", responsable: "Carlos Mattar", crono: ["X", "", "", ""] },
  { tarea: "ADQUISICIÓN DE LOGÍSTICA (MOTO BERA)", responsable: "Marcos Sousa", crono: ["X", "X", "", ""] },
  { tarea: "INSTALACIÓN DE INFRAESTRUCTURA DE RED", responsable: "Sebastian Garrido", crono: ["", "X", "X", ""] },
  { tarea: "CONFIGURACIÓN DE NODO IA Y SEGURIDAD", responsable: "Carlos Mattar", crono: ["", "X", "X", ""] },
  { tarea: "DIGITALIZACIÓN MASIVA DE ARCHIVOS", responsable: "Sebastian Garrido", crono: ["", "", "X", "X"] },
  { tarea: "LANZAMIENTO Y CAPACITACIÓN ESTRATÉGICA", responsable: "Carlos Mattar", crono: ["", "", "", "X"] },
];

const comparisonData = [
  { aspect: "Enfoque", other: "Gestión genérica de datos", kyron: "Ecosistema especializado en educación" },
  { aspect: "Seguridad", other: "Base de datos estándar", kyron: "Ledger Blockchain Inmutable" },
  { aspect: "IA", other: "No integrada", kyron: "IA Estratégica para toma de decisiones" },
];

const alliesData = [
  { aliado: "SAPI", apoyo: "Patente de Software y Marca" },
  { aliado: "SENIAT", apoyo: "Homologación Fiscal" },
  { aliado: "Fundación Kyron", apoyo: "Equipos y Formación" },
  { aliado: "Alcaldía de Vargas", apoyo: "Permisología Logística" },
];

export default function ModeloZEDUPage() {
    const { toast } = useToast();

    const handleDownload = () => {
        const content = `MODELO DE ZEDU - SYSTEM KYRON 2025\n\nPROYECTO: U.E.P. Gabriela Mistral\nTOTAL INVERSIÓN: $${totalBudget}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = 'Modelo_de_ZEDU_SystemKyron.txt';
        link.click();
        toast({ title: "Informe Maestro Generado", description: "El informe de 9 bloques ha sido exportado exitosamente." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> Proyecto Gabriela Mistral
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">DE ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">Estudio Técnico de Población y Factibilidad Global</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownload}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME FINAL
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* LADO IZQUIERDO */}
                <div className="xl:col-span-5 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">1. Identificación del Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                {teamData.map((item, index) => (
                                    <div key={index} className={cn("p-8 border-b border-white/5 last:border-none", item.important ? "bg-primary/[0.02]" : "opacity-50")}>
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60 mb-2">{item.label}</h3>
                                        <p className={cn("text-xl font-black italic tracking-tight", item.important ? "text-white" : "text-white/40")}>{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">2. Estudio de Población</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                {zeduData.map((item, index) => (
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none">
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60">{item.label}</h3>
                                        <p className="text-sm font-bold text-white/80 italic leading-relaxed">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <Network className="h-4 w-4" /> 8. Alianzas Estratégicas
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <Table>
                                <TableHeader><TableRow className="bg-white/[0.03] border-none"><TableHead className="pl-10 py-6 text-[10px] font-black uppercase text-primary">Aliado</TableHead><TableHead className="pr-10 py-6 text-right text-[10px] font-black uppercase text-primary">Apoyo</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {alliesData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5"><TableCell className="font-bold pl-10">{row.aliado}</TableCell><TableCell className="text-right pr-10 text-xs italic text-white/60">{row.apoyo}</TableCell></TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </div>

                {/* LADO DERECHO */}
                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución Propuesta (System Kyron)</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><BrainCircuit className="h-32 w-32" /></div>
                            <p className="text-lg font-bold text-white/90 italic text-justify">
                                System Kyron transforma el sistema de archivado tradicional de la U.E.P. Gabriela Mistral en un entorno digital eficiente y blindado. Permite la digitalización, almacenamiento y búsqueda ultra-rápida de documentos académicos. La plataforma integra un chatbot inteligente para atención inmediata a representantes, facilitando la comunicación colegio-familia. Además, incorpora IA dirigida por Carlos Mattar para apoyar al personal directivo en la generación de ideas estratégicas y toma de decisiones basadas en datos reales.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 7. Presupuesto Maestro</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <Table>
                                <TableHeader><TableRow className="bg-white/[0.03] border-none"><TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem</TableHead><TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Líder</TableHead><TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Inversión</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 group">
                                            <TableCell className="font-bold pl-10 py-6 flex items-center gap-4">{row.item.includes("Bera") ? <Truck className="h-4 w-4 text-secondary" /> : <Cpu className="h-4 w-4 text-primary" />}{row.item}</TableCell>
                                            <TableCell className="text-center"><Badge variant={row.responsable === "Carlos Mattar" ? "default" : "outline"} className="text-[8px]">{row.responsable}</Badge></TableCell>
                                            <TableCell className="text-right pr-10 font-black italic">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none"><TableCell className="font-black text-xl pl-10 py-8 italic uppercase" colSpan={2}>Inversión Total</TableCell><TableCell className="text-right pr-10 font-black text-2xl text-primary italic">{formatCurrency(totalBudget, "USD")}</TableCell></TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><CalendarRange className="h-4 w-4" /> 9. Plan de Acción Jerárquico</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <Table>
                                <TableHeader><TableRow className="bg-white/[0.03] border-none"><TableHead className="pl-10 py-6 text-[10px] font-black text-primary uppercase">Tarea</TableHead><TableHead className="text-center text-[10px] font-black text-primary uppercase">Líder</TableHead><TableHead className="text-center text-[10px] font-black text-primary uppercase">Q1</TableHead><TableHead className="text-center text-[10px] font-black text-primary uppercase">Q2</TableHead><TableHead className="text-center text-[10px] font-black text-primary uppercase">Q3</TableHead><TableHead className="text-center text-[10px] font-black text-primary uppercase">Q4</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {actionPlan.map((row, i) => (
                                        <TableRow key={i} className={cn("border-b border-white/5", row.responsable === "Carlos Mattar" ? "bg-primary/[0.01]" : "opacity-60")}>
                                            <TableCell className="font-bold pl-10 py-6">{row.tarea}</TableCell>
                                            <TableCell className="text-center"><Badge variant={row.responsable === "Carlos Mattar" ? "default" : "secondary"}>{row.responsable}</Badge></TableCell>
                                            {row.crono.map((mark, idx) => (
                                                <TableCell key={idx} className="text-center">{mark === "X" && <CheckCircle className={cn("h-4 w-4 mx-auto", row.responsable === "Carlos Mattar" ? "text-primary shadow-glow" : "text-white/20")} />}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
