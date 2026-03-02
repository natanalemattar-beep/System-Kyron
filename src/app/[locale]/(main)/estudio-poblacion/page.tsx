
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
  LayoutGrid
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";

const teamData = [
  { label: "NOMBRE DEL PROYECTO", value: "System Kyron" },
  { label: "INTEGRANTES DEL EQUIPO", value: "Carlos Mattar, Sebastian Garrido, Marcos Sousa" },
  { label: "INSTITUCIÓN EDUCATIVA", value: "U.E.P. Gabriela Mistral" },
  { label: "PAÍS/CIUDAD", value: "Venezuela, La Guaira" },
];

const zeduData = [
  { label: "PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA", value: "Venezuela, La Atlántida entre calle 7 a calle 3, Catia La Mar_ Pinta Catia, Supermercado Bensica." },
  { label: "NOMBRE DE LA COMUNIDAD", value: "La Atlantida catia La Mar" },
  { label: "CANTIDAD TOTAL DE HABITANTES", value: "Aproximadamente 500 empresas (unos 5.000 empleados)" },
  { label: "CANTIDAD DE HABITANTES POR GÉNERO", value: "52% femenino, 48% masculino (en cargos administrativos)" },
  { label: "CANTIDAD DE HABITANTES POR EDAD", value: "25-40 años: 60% / 41-55 años: 30% / mayores de 55: 10%" },
  { label: "CARACTERISTICAS DE LA POBLACIÓN", value: "Empresas que buscan automatizar sus procesos fiscales y contables, y que además están interesadas en adoptar prácticas sostenibles. Generan grandes volúmenes de residuos de papel y otros materiales reciclables." },
  { label: "CLIMA", value: "Tropical costero. Promedio 28°C con brisa marina constante." }
];

const problemAnalysis = {
  causas: ["Falta de organización administrativa", "Obsolescencia tecnológica", "Bajo presupuesto infraestructura física"],
  definicion: "El sistema de archivado de la U.E.P. Gabriela Mistral es 100% físico y vulnerable, impidiendo la agilidad operativa.",
  consecuencias: "Pérdida de tiempo productivo y riesgo de extravío de documentos académicos críticos.",
  importancia: "Es vital automatizar la gestión para garantizar la continuidad del servicio educativo en la era digital."
};

const budgetData = [
  { item: "Suscripción Cloud Enterprise (IA Node)", cost: 450, lugar: "Kyron Digital Store" },
  { item: "Scanner de Alta Velocidad (OCR)", cost: 800, lugar: "City Market Caracas" },
  { item: "Workstations de Gestión (x3)", cost: 2400, lugar: "Sambil La Candelaria" },
  { item: "Certificado de Seguridad Blockchain", cost: 450, lugar: "Kyron Ledger" },
];

const alliesData = [
  { aliado: "SAPI", apoyo: "Registro de Propiedad Intelectual y Patentes." },
  { aliado: "SENIAT", apoyo: "Homologación fiscal de sistemas administrativos." },
  { aliado: "Fundación Kyron", apoyo: "Financiamiento de licencias y formación digital." },
];

const actionPlan = [
  { tarea: "Diagnóstico de archivo y red local", responsable: "Sebastian Garrido", crono: ["X", "", "", ""] },
  { tarea: "Reunión con aliados institucionales", responsable: "Carlos Mattar", crono: ["X", "X", "", ""] },
  { tarea: "Compra e instalación de hardware", responsable: "Marcos Sousa", crono: ["", "X", "", ""] },
  { tarea: "Configuración de Ecosistema IA", responsable: "Sebastian Garrido", crono: ["", "X", "X", ""] },
  { tarea: "Digitalización de expedientes", responsable: "Marcos Sousa", crono: ["", "", "X", "X"] },
  { tarea: "Lanzamiento oficial y capacitación", responsable: "Carlos Mattar", crono: ["", "", "", "X"] },
];

export default function EstudioTecnicoFinalPage() {
    const { toast } = useToast();

    const handleDownload = () => {
        const content = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Informe Final System Kyron</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 10pt; }
                th { background-color: #f2f2f2; text-transform: uppercase; }
                .title { text-align: center; font-size: 18pt; font-weight: bold; margin-bottom: 30px; color: #0A2472; }
                .section { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #ccc; }
            </style>
            </head>
            <body>
                <div class="title">INFORME TÉCNICO DE MISIÓN CRÍTICA - SYSTEM KYRON</div>
                <div class="section">1. EQUIPO</div>
                <table>${teamData.map(d => `<tr><th>${d.label}</th><td>${d.value}</td></tr>`).join('')}</table>
                <div class="section">2. POBLACIÓN A TRABAJAR</div>
                <table>${zeduData.map(d => `<tr><th>${d.label}</th><td>${d.value}</td></tr>`).join('')}</table>
                <div class="section">3. ANÁLISIS DEL PROBLEMA</div>
                <table>
                    <tr><th>DEFINICIÓN</th><td>${problemAnalysis.definicion}</td></tr>
                    <tr><th>CAUSAS</th><td>${problemAnalysis.causas.join(', ')}</td></tr>
                    <tr><th>CONSECUENCIAS</th><td>${problemAnalysis.consecuencias}</td></tr>
                </table>
                <div class="section">4. SOLUCIÓN PROPUESTA</div>
                <p>System Kyron implementará una digitalización total mediante IA y sellado Blockchain para el archivo escolar. Incluye un chatbot inteligente para representantes y una consola de BI para que la directiva tome decisiones basadas en datos reales.</p>
                <div class="section">5. PRESUPUESTO</div>
                <table>
                    <tr><th>ITEM</th><th>COSTO</th><th>LUGAR</th></tr>
                    ${budgetData.map(d => `<tr><td>${d.item}</td><td>$${d.cost}</td><td>${d.lugar}</td></tr>`).join('')}
                </table>
                <div class="section">6. PLAN DE ACCIÓN</div>
                <table>
                    <tr><th>TAREA</th><th>RESPONSABLE</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr>
                    ${actionPlan.map(d => `<tr><td>${d.tarea}</td><td>${d.responsable}</td><td>${d.crono[0]}</td><td>${d.crono[1]}</td><td>${d.crono[2]}</td><td>${d.crono[3]}</td></tr>`).join('')}
                </table>
            </body>
            </html>
        `;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content);
        const link = document.createElement("a");
        link.href = source;
        link.download = 'Informe_Final_SystemKyron_Full.doc';
        link.click();
        toast({ title: "Informe Final Generado", description: "Todos los bloques técnicos han sido exportados correctamente." });
    };

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-32">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-8 border-primary pl-10 py-2">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 shadow-glow">
                        <Rocket className="h-3 w-3" /> System v2.6.4 Full Project
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic-shadow text-white uppercase leading-none">ESTUDIO <span className="text-primary">TÉCNICO</span></h1>
                    <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.6em] opacity-40">U.E.P. Gabriela Mistral • La Guaira • 2025</p>
                </div>
                <Button size="lg" className="btn-3d-primary h-20 px-16 rounded-2xl shadow-glow text-base font-black" onClick={handleDownload}>
                    <Download className="mr-4 h-8 w-8" /> EXPORTAR INFORME TOTAL (9 BLOQUES)
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
                                    <div key={index} className="p-8 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-all">
                                        <h3 className="font-black text-[9px] uppercase tracking-widest text-primary mb-2 opacity-60">{item.label}</h3>
                                        <p className="text-xl font-black text-white/90 italic tracking-tight">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">2. Población a Trabajar</h3>
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
                                    <h4 className="font-black text-[9px] uppercase text-primary mb-3">Definición Estratégica</h4>
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
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter">TRANSFORMACIÓN <br/> DIGITAL CON IA</h3>
                                <p className="text-base font-black italic leading-relaxed text-white/90 border-l-4 border-white/30 pl-8 text-justify">
                                    System Kyron desplegará un nodo de inteligencia artificial para la digitalización y clasificación de expedientes históricos. Eliminamos el papel, blindamos la integridad de las notas mediante Blockchain y automatizamos la atención al representante con un asistente 24/7.
                                </p>
                            </div>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6">5. Presupuesto Técnico</h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Item de Inversión</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Costo (USD)</TableHead>
                                        <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-primary pr-10 py-6">Canal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <TableCell className="font-bold text-white pl-10 py-6">{row.item}</TableCell>
                                            <TableCell className="text-center font-black text-primary italic">${row.cost}</TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest opacity-60 border-primary/20">{row.lugar}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 flex items-center gap-3">
                            <CalendarRange className="h-4 w-4" /> 6. Plan de Acción 2025
                        </h3>
                        <Card className="glass-card border-none overflow-hidden shadow-2xl p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary pl-10 py-6">Tarea Operativa</TableHead>
                                        <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary py-6">Responsable</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q1</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q2</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary py-6">Q3</TableHead>
                                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest text-primary pr-10 py-6">Q4</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {actionPlan.map((row, i) => (
                                        <TableRow key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <TableCell className="font-bold text-white pl-10 py-6">{row.tarea}</TableCell>
                                            <TableCell className="text-xs font-black uppercase tracking-tighter text-primary/80 italic">{row.responsable}</TableCell>
                                            {row.crono.map((mark, idx) => (
                                                <TableCell key={idx} className="text-center font-black text-primary">{mark === "X" ? <CheckCircle className="h-4 w-4 mx-auto text-emerald-500 shadow-glow" /> : ""}</TableCell>
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
