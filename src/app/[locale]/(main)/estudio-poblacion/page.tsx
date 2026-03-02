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
  Rocket,
  ShieldCheck,
  FileText,
  CalendarRange,
  Target,
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
  { label: "LÍDER ESTRATÉGICO", value: "Carlos Mattar", important: true },
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
  { label: "CARACTERÍSTICAS SOCIALES", value: "Empresas en transición digital obligatoria con alta necesidad de blindaje fiscal y gestión de residuos." },
  { label: "CONDICIONES CLIMÁTICAS", value: "Tropical costero. Promedio 28°C. Brisa marina constante con alta salinidad." }
];

const problemAnalysis = {
  causas: ["Archivado físico vulnerable a la humedad y salinidad", "Fragmentación de datos contables", "Presupuesto tecnológico desactualizado"],
  definicion: "Inexistencia de un ecosistema digital inmutable que centralice la gestión académica, administrativa y fiscal de la institución.",
  consecuencias: "Riesgo crítico de pérdida de expedientes, multas por incumplimiento fiscal y lentitud en la atención al representante.",
  importancia: "La automatización con IA y Blockchain es la única garantía de supervivencia operativa en el marco legal 2025."
};

const solutionParagraph = "System Kyron consiste en el desarrollo de una aplicación que transforma el sistema de archivado tradicional de una institución educativa en un entorno digital eficiente y organizado, permitiendo la digitalización, almacenamiento y búsqueda rápida de documentos que antes se gestionaban de forma física. La plataforma integrará un chatbot con atención automatizada dirigida a los representantes de los estudiantes, facilitando respuestas inmediatas y mejorando la comunicación colegio-familia. Además, incorporará herramientas de inteligencia artificial que apoyarán al personal administrativo en la generación de ideas estratégicas, contribuyendo a una gestión más moderna, ágil y orientada a la mejora continua institucional.";

const comparativaData = [
  { 
    aspecto: "Propósito y Enfoque", 
    mobian: "Optimización de datos para cualquier negocio, enfocado en eficiencia operativa y escalabilidad técnica.", 
    kyron: "Transformación profunda del sistema de archivado educativo en un entorno digital inteligente y seguro." 
  },
  { 
    aspecto: "Público Objetivo", 
    mobian: "Equipos técnicos y directivos corporativos generales.", 
    kyron: "Instituciones educativas, personal administrativo y representantes de estudiantes." 
  },
  { 
    aspecto: "Diferenciadores Clave", 
    mobian: "Integración de sistemas y aumento de equipo técnico.", 
    kyron: "Chatbot de atención automatizada, IA para generación de ideas estratégicas y sellado Blockchain." 
  },
];

const budgetData = [
  { item: "Moto Bera Carguera DT-200 (Logística Litoral)", cost: 2800, responsable: "Marcos Sousa" },
  { item: "Workstation de Gestión Maestra Pro", cost: 1200, responsable: "Carlos Mattar" },
  { item: "Servidor de Nodo Local Ledger Blockchain", cost: 1500, responsable: "Carlos Mattar" },
  { item: "Infraestructura de Red Mesh Gabriela Mistral", cost: 1800, responsable: "Sebastian Garrido" },
  { item: "Licencia Anual IA Predictiva Kyron Enterprise", cost: 650, responsable: "Carlos Mattar" },
  { item: "Suministros de Ingeniería y Hardware Fiscal", cost: 500, responsable: "Marcos Sousa" },
];

const totalBudget = budgetData.reduce((sum, item) => sum + item.cost, 0);

const alliesData = [
  { aliado: "SAPI", apoyo: "Registro de Propiedad Intelectual y Patente de Software" },
  { aliado: "SENIAT", apoyo: "Homologación de Facturación y Cumplimiento Fiscal" },
  { aliado: "Fundación Kyron", apoyo: "Donación de Licencias y Soporte a la Comunidad" },
  { aliado: "Proveedores Tech La Guaira", apoyo: "Suministro de Hardware y Mantenimiento de Redes" },
];

const actionPlan = [
  { tarea: "DIAGNÓSTICO TÉCNICO DE MISIÓN CRÍTICA", responsable: "Carlos Mattar", crono: ["X", "", "", ""] },
  { tarea: "ADQUISICIÓN DE LOGÍSTICA (MOTO BERA)", responsable: "Marcos Sousa", crono: ["X", "X", "", ""] },
  { tarea: "INSTALACIÓN DE INFRAESTRUCTURA DE RED", responsable: "Sebastian Garrido", crono: ["", "X", "X", ""] },
  { tarea: "CONFIGURACIÓN DE NODO IA Y SEGURIDAD", responsable: "Carlos Mattar", crono: ["", "X", "X", ""] },
  { tarea: "DIGITALIZACIÓN MASIVA DE ARCHIVOS", responsable: "Sebastian Garrido", crono: ["", "", "X", "X"] },
  { tarea: "LANZAMIENTO Y CAPACITACIÓN ESTRATÉGICA", responsable: "Carlos Mattar", crono: ["", "", "", "X"] },
];

export default function EstudioTecnicoZEDU() {
    const { toast } = useToast();

    const handleDownload = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Informe Técnico System Kyron</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 9pt; }
                th { background-color: #f2f2f2; text-transform: uppercase; font-weight: bold; }
                .title { text-align: center; font-size: 18pt; font-weight: bold; margin-bottom: 20px; color: #2563eb; }
                .section-header { background-color: #2563eb; color: #ffffff; font-weight: bold; padding: 10px; margin-top: 20px; text-transform: uppercase; }
            </style>
            </head>
            <body>
                <div class="title">INFORME TÉCNICO DE INGENIERÍA - SYSTEM KYRON 2025</div>
                <div class="section-header">1. IDENTIFICACIÓN DEL PROYECTO</div>
                <table>${teamData.map(d => `<tr><th>${d.label}</th><td>${d.value}</td></tr>`).join('')}</table>
                <div class="section-header">2. ESTUDIO DE POBLACIÓN (ZEDU)</div>
                <table>${zeduData.map(d => `<tr><th>${d.label}</th><td>${d.value}</td></tr>`).join('')}</table>
                <div class="section-header">3. SOLUCIÓN PROPUESTA</div>
                <p>${solutionParagraph}</p>
                <div class="section-header">4. COMPARATIVA ESTRATÉGICA (VS. MOBIAN)</div>
                <table>
                    <tr><th>ASPECTO</th><th>MOBIAN</th><th>SYSTEM KYRON</th></tr>
                    ${comparativaData.map(d => `<tr><td>${d.aspecto}</td><td>${d.mobian}</td><td>${d.kyron}</td></tr>`).join('')}
                </table>
                <div class="section-header">5. PRESUPUESTO TÉCNICO</div>
                <table>
                    <tr><th>ÍTEM</th><th>RESPONSABLE</th><th>COSTO</th></tr>
                    ${budgetData.map(d => `<tr><td>${d.item}</td><td>${d.responsable}</td><td>$${d.cost}</td></tr>`).join('')}
                    <tr style="font-weight:bold"><td>TOTAL</td><td></td><td>$${totalBudget}</td></tr>
                </table>
            </body>
            </html>
        `;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const link = document.createElement("a");
        link.href = source;
        link.download = 'Informe_Zedu_SystemKyron_Final.doc';
        link.click();
        toast({ title: "Informe Maestro Generado", description: "El informe de 9 bloques ha sido exportado exitosamente." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> Master Node v2.6.5
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">ESTUDIO <span className="text-primary">TÉCNICO</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">U.E.P. Gabriela Mistral • La Guaira • Dirección de Proyecto</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownload}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME FINAL
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

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <Network className="h-4 w-4" /> 3. Alianzas Estratégicas
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-white/[0.03] border-none">
                                            <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Aliado</TableHead>
                                            <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-primary py-6 pr-10">Gestión</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {alliesData.map((row, i) => (
                                            <TableRow key={i} className="border-b border-white/5 hover:bg-primary/[0.02] transition-all">
                                                <TableCell className="font-bold pl-10 py-6">{row.aliado}</TableCell>
                                                <TableCell className="text-right pr-10 text-xs text-white/60 italic">{row.apoyo}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Lado Derecho: Solución, Presupuesto y Planificación */}
                <div className="xl:col-span-7 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <Zap className="h-4 w-4" /> 4. Solución Propuesta (System Kyron)
                        </h3>
                        <Card className="glass-card border-none p-10 leading-relaxed shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                                <BrainCircuit className="h-32 w-32" />
                            </div>
                            <p className="text-lg font-bold text-white/90 italic text-justify">
                                {solutionParagraph}
                            </p>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <Calculator className="h-4 w-4" /> 5. Presupuesto Expandido
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-white/[0.03] border-none">
                                            <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Ítem de Inversión</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary py-6 text-center">Responsable</TableHead>
                                            <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-primary py-6 pr-10">Inversión</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetData.map((row, i) => (
                                            <TableRow key={i} className="border-b border-white/5 hover:bg-primary/[0.02] transition-all group">
                                                <TableCell className="font-bold pl-10 py-6 flex items-center gap-4">
                                                    {row.item.includes("Bera") ? <Truck className="h-4 w-4 text-secondary" /> : <Cpu className="h-4 w-4 text-primary" />}
                                                    {row.item}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant={row.responsable === "Carlos Mattar" ? "default" : "outline"} className="text-[8px] font-black uppercase">
                                                        {row.responsable}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-10 font-black text-white italic group-hover:text-primary transition-colors">
                                                    {formatCurrency(row.cost, "USD")}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/10 border-none">
                                            <TableCell className="font-black text-xl pl-10 py-8 italic uppercase" colSpan={2}>Inversión Total Estimada</TableCell>
                                            <TableCell className="text-right pr-10 font-black text-2xl text-primary italic">
                                                {formatCurrency(totalBudget, "USD")}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <CalendarRange className="h-4 w-4" /> 6. Plan de Acción Jerárquico
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Tarea Estratégica</TableHead>
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
                                                <Badge variant={row.responsable === "Carlos Mattar" ? "default" : "secondary"} className="text-[8px] font-black uppercase">
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