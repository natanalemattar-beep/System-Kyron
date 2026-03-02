
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { 
  Download, 
  Users, 
  MapPin,
  Building,
  ThermometerSun,
  Recycle,
  AlertTriangle,
  Zap,
  Rocket,
  ShieldCheck,
  FileText,
  CalendarRange,
  BrainCircuit,
  Target,
  CheckCircle,
  LayoutGrid,
  Crown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";

const teamData = [
  { label: "NOMBRE DEL PROYECTO", value: "System Kyron", important: true },
  { label: "LÍDER DE PROYECTO", value: "Carlos Mattar", important: true },
  { label: "PERSONAL DE APOYO", value: "Marcos Sousa, Sebastian Garrido", important: false },
  { label: "INSTITUCIÓN EDUCATIVA", value: "U.E.P. Gabriela Mistral", important: true },
  { label: "UBICACIÓN GEOGRÁFICA", value: "La Guaira, Venezuela", important: true },
];

const zeduData = [
  { label: "LOCALIZACIÓN ESPECÍFICA", value: "La Atlántida, entre calle 7 a calle 3, Catia La Mar. Pinta Catia, Supermercado Bensica." },
  { label: "NOMBRE DE LA COMUNIDAD", value: "Comunidad Comercial La Atlántida" },
  { label: "POBLACIÓN ESTIMADA", value: "500 empresas / 5.000 empleados administrativos." },
  { label: "GÉNERO", value: "52% Femenino / 48% Masculino." },
  { label: "RANGO ETARIO", value: "25-40 años (60%) / 41-55 años (30%) / Otros (10%)." },
  { label: "CARACTERÍSTICAS", value: "Empresas en transición digital con alta generación de residuos de oficina y necesidad de blindaje fiscal." },
  { label: "CONDICIONES CLIMÁTICAS", value: "Tropical costero. Promedio 28°C. Brisa marina constante." }
];

const problemAnalysis = {
  causas: ["Archivado físico vulnerable", "Falta de inteligencia en datos", "Presupuesto tecnológico desactualizado"],
  definicion: "Inexistencia de un ecosistema digital que centralice la gestión académica y fiscal del Colegio Gabriela Mistral.",
  consecuencias: "Riesgo de pérdida de expedientes y lentitud extrema en trámites de representantes.",
  importancia: "La automatización es el único camino para la supervivencia operativa en el nuevo marco legal 2025."
};

const budgetData = [
  { item: "Suscripción Kyron Cloud IA (Nodo Maestro)", cost: 450, responsable: "Carlos Mattar" },
  { item: "Workstation de Gestión Administrativa", cost: 800, responsable: "Marcos Sousa" },
  { item: "Infraestructura de Red y Servidores", cost: 2400, responsable: "Sebastian Garrido" },
  { item: "Licencia de Seguridad Ledger Blockchain", cost: 450, responsable: "Carlos Mattar" },
];

const actionPlan = [
  { tarea: "DIAGNÓSTICO TÉCNICO Y DISEÑO DE RED", responsable: "Carlos Mattar", crono: ["X", "", "", ""] },
  { tarea: "Adquisición de Hardware y Periféricos", responsable: "Marcos Sousa", crono: ["X", "X", "", ""] },
  { tarea: "CONFIGURACIÓN DE NODO IA Y LEDGER", responsable: "Carlos Mattar", crono: ["", "X", "X", ""] },
  { tarea: "Digitalización Masiva de Expedientes", responsable: "Sebastian Garrido", crono: ["", "", "X", "X"] },
  { tarea: "CAPACITACIÓN Y DESPLIEGUE FINAL", responsable: "Carlos Mattar", crono: ["", "", "", "X"] },
];

export default function EstudioTecnicoFullPage() {
    const { toast } = useToast();

    const handleDownload = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Informe Final System Kyron</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 10pt; }
                th { background-color: #f2f2f2; text-transform: uppercase; font-weight: bold; }
                .title { text-align: center; font-size: 18pt; font-weight: bold; margin-bottom: 30px; color: #0A2472; }
                .section-header { background-color: #0A2472; color: #ffffff; font-weight: bold; padding: 10px; margin-top: 20px; }
            </style>
            </head>
            <body>
                <div class="title">INFORME DE INGENIERÍA - SYSTEM KYRON 2025</div>
                <div class="section-header">BLOQUE 1: IDENTIFICACIÓN ESTRATÉGICA</div>
                <table>${teamData.map(d => `<tr><th>${d.label}</th><td>${d.value}</td></tr>`).join('')}</table>
                <div class="section-header">BLOQUE 2: ESTUDIO DE POBLACIÓN (ZEDU)</div>
                <table>${zeduData.map(d => `<tr><th>${d.label}</th><td>${d.value}</td></tr>`).join('')}</table>
                <div class="section-header">BLOQUE 3: ANÁLISIS DEL PROBLEMA</div>
                <table>
                    <tr><th>DEFINICIÓN</th><td>${problemAnalysis.definicion}</td></tr>
                    <tr><th>CAUSAS</th><td>${problemAnalysis.causas.join(', ')}</td></tr>
                    <tr><th>IMPACTO</th><td>${problemAnalysis.consecuencias}</td></tr>
                </table>
                <div class="section-header">BLOQUE 4: PLAN DE ACCIÓN OPERATIVO</div>
                <table>
                    <tr><th>TAREA</th><th>LÍDER RESPONSABLE</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr>
                    ${actionPlan.map(d => `<tr><td>${d.tarea}</td><td>${d.responsable}</td><td>${d.crono[0]}</td><td>${d.crono[1]}</td><td>${d.crono[2]}</td><td>${d.crono[3]}</td></tr>`).join('')}
                </table>
            </body>
            </html>
        `;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const link = document.createElement("a");
        link.href = source;
        link.download = 'Informe_Maestro_SystemKyron.doc';
        link.click();
        toast({ title: "Informe Maestro Generado", description: "Todos los bloques técnicos han sido exportados." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> System v2.6.4 Full Project
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">INFORME <span className="text-primary">TÉCNICO</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">U.E.P. Gabriela Mistral • La Guaira • Dirección: Carlos Mattar</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownload}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME MAESTRO
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Lado Izquierdo: Fichas Técnicas */}
                <div className="xl:col-span-5 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">1. Identificación del Equipo</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                {teamData.map((item, index) => (
                                    <div key={index} className={cn(
                                        "p-8 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-all",
                                        item.important ? "bg-primary/[0.02]" : "opacity-50"
                                    )}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-black text-[9px] uppercase tracking-widest text-primary opacity-60">{item.label}</h3>
                                            {item.important && <Crown className="h-3 w-3 text-yellow-500" />}
                                        </div>
                                        <p className={cn(
                                            "text-xl font-black italic tracking-tight",
                                            item.important ? "text-white" : "text-white/40"
                                        )}>{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">2. Población a Trabajar (ZEDU)</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                {zeduData.map((item, index) => (
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-all">
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60">{item.label}</h3>
                                        <p className="text-sm font-bold text-white/80 italic leading-relaxed">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Lado Derecho: Análisis y Planificación */}
                <div className="xl:col-span-7 space-y-12">
                    <section className="grid grid-cols-1 gap-10">
                        <Card className="glass-card border-none p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] scale-150 rotate-12"><AlertTriangle className="h-48 w-48 text-primary" /></div>
                            <h3 className="text-2xl font-black uppercase italic flex items-center gap-4 mb-8 text-white">3. ANÁLISIS DEL PROBLEMA</h3>
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <h4 className="font-black text-[9px] uppercase text-primary mb-3 text-shadow-glow">Definición de Misión Crítica</h4>
                                    <p className="text-sm font-bold italic text-white/80 leading-relaxed">{problemAnalysis.definicion}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10"><p className="text-[8px] font-black text-red-500 uppercase mb-2">Consecuencia Crítica</p><p className="text-xs font-bold text-white/70 italic">{problemAnalysis.consecuencias}</p></div>
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10"><p className="text-[8px] font-black text-primary uppercase mb-2">Importancia del Cambio</p><p className="text-xs font-bold text-white/70 italic">{problemAnalysis.importancia}</p></div>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-none bg-primary p-12 text-primary-foreground relative overflow-hidden shadow-glow rounded-[3rem]">
                            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Zap className="h-64 w-64 text-white" /></div>
                            <div className="relative z-10 space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-[0.4em]">4. SOLUCIÓN PROPUESTA</div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">DIGITALIZACIÓN <br/> MAESTRA CON IA</h3>
                                <p className="text-base font-black italic leading-relaxed text-white/90 border-l-4 border-white/30 pl-8 text-justify">
                                    System Kyron desplegará un nodo de inteligencia artificial bajo la dirección de Carlos Mattar para la digitalización y clasificación de expedientes históricos en la U.E.P. Gabriela Mistral. Eliminamos el papel, blindamos la integridad mediante Ledger y automatizamos la atención al representante.
                                </p>
                            </div>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <CalendarRange className="h-4 w-4" /> 5. Plan de Acción Operativo
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Tarea Operativa</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary py-6 text-center">Líder</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q1</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q2</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q3</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q4</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {actionPlan.map((row, i) => (
                                        <TableRow key={i} className={cn(
                                            "border-b border-white/5 hover:bg-white/[0.02] transition-all",
                                            row.responsable === "Carlos Mattar" ? "bg-primary/[0.01]" : "opacity-60"
                                        )}>
                                            <TableCell className={cn(
                                                "font-bold pl-10 py-6",
                                                row.responsable === "Carlos Mattar" ? "text-white" : "text-white/60"
                                            )}>{row.tarea}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={row.responsable === "Carlos Mattar" ? "default" : "outline"} className="text-[8px] font-black uppercase">
                                                    {row.responsable}
                                                </Badge>
                                            </TableCell>
                                            {row.crono.map((mark, idx) => (
                                                <TableCell key={idx} className="text-center">
                                                    {mark === "X" && <CheckCircle className={cn(
                                                        "h-4 w-4 mx-auto",
                                                        row.responsable === "Carlos Mattar" ? "text-primary shadow-glow" : "text-white/20"
                                                    )} />}
                                                </TableCell>
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
