
"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
  TableHeader, 
  TableHead 
} from "@/components/ui/table";
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
  Activity,
  History,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

export default function ModeloZEDUPage() {
    const { toast } = useToast();

    // BLOQUE 1: IDENTIFICACIÓN
    const teamData = [
      { label: "1. NOMBRE DEL PROYECTO", value: "System Kyron", important: true },
      { label: "LÍDER ESTRATÉGICO (IA & ARQUITECTURA)", value: "Carlos Mattar", important: true },
      { label: "PERSONAL DE APOYO OPERATIVO", value: "Sebastian Garrido, Marcos Sousa", important: false },
      { label: "INSTITUCIÓN BENEFICIARIA", value: "U.E.P. Gabriela Mistral", important: true },
      { label: "UBICACIÓN GEOGRÁFICA", value: "La Guaira, Venezuela", important: true },
    ];

    // BLOQUE 2: ESTUDIO DE POBLACIÓN
    const zeduData = [
      { label: "LOCALIZACIÓN ESPECÍFICA", value: "La Atlántida, entre calle 7 a calle 3, Catia La Mar. Referencias: Pinta Catia, Supermercado Bensica." },
      { label: "NOMBRE DE LA COMUNIDAD", value: "Comunidad Comercial y Residencial La Atlántida" },
      { label: "POBLACIÓN ESTIMADA", value: "500 empresas activas / 5.000 empleados administrativos y civiles." },
      { label: "DESGLOSE DE GÉNERO", value: "52% Femenino / 48% Masculino." },
      { label: "RANGO ETARIO DOMINANTE", value: "25-40 años (60%) / 41-55 años (30%) / Otros (10%)." },
      { label: "CARACTERÍSTICAS SOCIALES", value: "Entorno con alta necesidad de digitalización y blindaje ante normativas 2025." },
      { label: "CONDICIONES CLIMÁTICAS", value: "Tropical costero. Alta salinidad (Riesgo crítico para archivos físicos)." }
    ];

    // BLOQUE 7: PRESUPUESTO MAESTRO
    const budgetData = [
      { item: "Moto Bera Carguera DT-200 (Logística Litoral)", cost: 2800, responsable: "Marcos Sousa" },
      { item: "Workstation de Gestión Maestra Pro (Dirección)", cost: 2400, responsable: "Carlos Mattar" },
      { item: "Servidor de Nodo Local Ledger Blockchain", cost: 1500, responsable: "Carlos Mattar" },
      { item: "Infraestructura de Red Mesh Colegio", cost: 1000, responsable: "Sebastian Garrido" },
      { item: "Licencia Anual IA Predictiva Kyron Enterprise", cost: 750, responsable: "Carlos Mattar" },
    ];

    const totalBudget = budgetData.reduce((sum, item) => sum + item.cost, 0);

    const handleDownloadWord = () => {
        const content = `
            <h1 style="text-align: center;">MODELO DE ZEDU - INFORME TÉCNICO INTEGRAL</h1>
            <h2 style="color: #2563eb;">1. IDENTIFICACIÓN DEL EQUIPO</h2>
            <p><b>Proyecto:</b> System Kyron</p>
            <p><b>Líder Estratégico:</b> Carlos Mattar</p>
            <p><b>Apoyo Operativo:</b> Sebastian Garrido, Marcos Sousa</p>
            <p><b>Institución:</b> U.E.P. Gabriela Mistral</p>
            
            <h2 style="color: #2563eb;">2. ESTUDIO DE POBLACIÓN</h2>
            <p><b>Localización:</b> La Atlántida, Catia La Mar (Ref: Supermercado Bensica)</p>
            <p><b>Población:</b> 500 empresas / 5.000 personas</p>
            <p><b>Condiciones:</b> Alta salinidad costera, riesgo para archivos físicos.</p>

            <h2 style="color: #2563eb;">3. ANÁLISIS DEL PROBLEMA</h2>
            <p>Riesgo crítico de pérdida de información académica y fiscal por deterioro físico y falta de automatización.</p>

            <h2 style="color: #2563eb;">4. SOLUCIÓN PROPUESTA</h2>
            <p>Ecosistema digital inmutable con Chatbot de atención y IA para ideas estratégicas.</p>

            <h2 style="color: #2563eb;">7. PRESUPUESTO DE MISIÓN CRÍTICA</h2>
            <p><b>Total Inversión:</b> ${formatCurrency(totalBudget, 'USD')}</p>
            <p>Incluye Moto Bera Carguera DT-200 para logística.</p>
        `;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob([sourceHTML], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Modelo_de_ZEDU_Kyron.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "Informe Generado", description: "El Modelo de ZEDU ha sido descargado en formato Word." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> Misión Crítica v2.6.5
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">MODELO <span className="text-primary">DE ZEDU</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40 italic">U.E.P. GABRIELA MISTRAL • LA GUAIRA • 2026</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownloadWord}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR EN WORD
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 w-full">
                {/* COLUMNA IZQUIERDA */}
                <div className="xl:col-span-5 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Crown className="h-4 w-4"/> 1. Identificación del Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
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
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Users className="h-4 w-4"/> 2. Estudio de Población</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
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
                </div>

                {/* COLUMNA DERECHA */}
                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><AlertTriangle className="h-4 w-4" /> 3. Análisis del Problema</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl rounded-[2.5rem]">
                            <p className="text-lg font-bold text-white/90 italic text-justify leading-relaxed">
                                La U.E.P. Gabriela Mistral enfrenta un riesgo crítico de pérdida de información académica. El archivado físico tradicional se deteriora rápidamente debido a la **alta salinidad** de Catia La Mar. Además, la fragmentación de la comunicación con los representantes genera cuellos de botella administrativos.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Zap className="h-4 w-4" /> 4. Solución Propuesta</h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><BrainCircuit className="h-32 w-32" /></div>
                            <p className="text-lg font-bold text-white/90 italic text-justify leading-relaxed">
                                System Kyron transforma el archivado escolar en un **entorno digital inmutable**. Implementamos un **Chatbot Inteligente** para atención 24/7 a representantes. La plataforma integra una **IA Maestra** dirigida por Carlos Mattar para apoyar a la directiva en la formulación de ideas estratégicas.
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3"><Calculator className="h-4 w-4" /> 7. Presupuesto Maestro</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase text-primary pl-10 py-6">Ítem del Proyecto</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase text-primary py-6">Responsable</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase text-primary py-6 pr-10">Inversión</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 group">
                                            <TableCell className="font-bold pl-10 py-6 flex items-center gap-4">
                                                {row.item.includes("Bera") ? <Truck className="h-5 w-5 text-secondary" /> : <Cpu className="h-5 w-5 text-primary" />}
                                                {row.item}
                                            </TableCell>
                                            <TableCell className="text-center"><Badge variant={row.responsable === "Carlos Mattar" ? "default" : "outline"} className="text-[8px] uppercase">{row.responsable}</Badge></TableCell>
                                            <TableCell className="text-right pr-10 font-black italic text-primary">{formatCurrency(row.cost, "USD")}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="font-black text-xl pl-10 py-10 italic uppercase" colSpan={2}>Inversión Total</TableCell>
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
