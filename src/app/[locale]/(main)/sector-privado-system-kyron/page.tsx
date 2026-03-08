
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, ShieldCheck, 
  Lock, BrainCircuit, Network, Cpu, Database, 
  Sparkles, Activity, TrendingUp, Target, BarChart3, FileText, ChevronRight, Globe, Radio, Magnet,
  CheckCircle,
  FileText as FileWord,
  Printer,
  Download,
  AlertTriangle,
  Users,
  Smartphone,
  ChevronDown,
  Terminal,
  FileCheck2,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const proposalSections = [
    {
        icon: Radio,
        title: "Kyron Hyper-Connect 5G",
        desc: "Asignación de números y eSIMs digitales con protocolo de baja latencia para flotas de grado corporativo.",
        color: "text-blue-400"
    },
    {
        icon: Magnet,
        title: "Ecosistema Magnético IA",
        desc: "Smart Bins con inducción magnética síncrona para la trazabilidad inmutable de activos en el Ledger.",
        color: "text-emerald-400"
    },
    {
        icon: ShieldCheck,
        title: "Blindaje Fiscal 360°",
        desc: "Automatización absoluta de libros y declaraciones sincronizada en tiempo real con la Gaceta Oficial.",
        color: "text-amber-400"
    },
    {
        icon: Cpu,
        title: "Ledger Blockchain",
        desc: "Sellado digital de cada transacción garantizando integridad absoluta ante fiscalizaciones externas.",
        color: "text-purple-400"
    }
];

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Rendimiento neto proyectado en valor presente.", icon: TrendingUp },
    { label: "Tasa Interna de Retorno (TIR)", value: 0.285, desc: "Eficiencia anual esperada del capital investido.", icon: Target },
    { label: "Periodo de Recuperación", value: "2.4 años", desc: "Tiempo estimado de retorno de inversión inicial.", icon: Activity },
    { label: "Margen de Contribución", value: 0.32, desc: "Eficiencia neta por cada flujo transaccional.", icon: BarChart3 },
];

const projections = [
    { year: 1, revenue: 125000, profit: 40000, margin: 0.32 },
    { year: 2, revenue: 210000, profit: 100000, margin: 0.47 },
    { year: 3, revenue: 380000, profit: 240000, margin: 0.63 },
    { year: 4, revenue: 550000, profit: 370000, margin: 0.67 },
    { year: 5, revenue: 820000, profit: 600000, margin: 0.73 },
];

const zeduMasterData = {
    titulo: "Expediente Maestro ZEDU",
    secciones: [
        {
            id: 1,
            titulo: "1. IDENTIFICACIÓN ESTRATÉGICA DEL PROYECTO",
            filas: [
                { label: "Denominación del Nodo", val: "System Kyron v2.6.5" },
                { label: "Dirección de Liderazgo", val: "C. Mattar, S. Garrido, M. Sousa" },
                { label: "Consejo Consultivo", val: "W. López, M. Corro, M. Hernández" },
                { label: "Sede Administrativa", val: "Nodo de Operaciones Central (NOC)" },
                { label: "Localización Maestra", val: "Estado La Guaira, República Bolivariana de Venezuela" },
            ]
        },
        {
            id: 2,
            titulo: "2. ESTUDIO DE POBLACIÓN Y ALCANCE (ZEDU)",
            filas: [
                { label: "Coordenadas Operativas", val: "Zona Comercial La Atlántida, Parroquia Catia La Mar." },
                { label: "Segmento de Impacto", val: "Ecosistema Comercial de Alta Densidad Transaccional" },
                { label: "Alcance Est. (Terminales)", val: "500 Nodos Corporativos / 5.000 Identidades Digitales." },
            ]
        },
        {
            id: 3,
            titulo: "3. DIAGNÓSTICO TÉCNICO",
            filas: [
                { label: "Definición de Brecha", val: "Desconexión entre flujos de caja reales y registros fiscales, generando vulnerabilidad ante auditorías." },
                { label: "Pérdida de Eficiencia", val: "Estimada en 40% debido a procesos manuales y duplicidad de registros." },
                { label: "Riesgo de Cumplimiento", val: "Exposición a sanciones por desactualización normativa en tiempo real." },
            ]
        },
        {
            id: 4,
            titulo: "4. ARQUITECTURA DE SOLUCIÓN",
            filas: [
                { label: "Despliegue Maestro", val: "Implementación del Ecosistema Kyron: Gestión ERP + Telecom 5G + Ledger Inmutable." },
            ]
        }
    ]
};

const budgetTableData = [
    { item: "Infraestructura de Red 5G / Core", cant: "1 Nodo", costo: "$5,000", lugar: "Kyron Corp" },
    { item: "SIM Cards Físicas / Perfiles eSIM", cant: "1000 Unid.", costo: "$1,000", lugar: "Manufactura" },
    { item: "Módulos de Inducción Smart Bins", cant: "5 Unid.", costo: "$683", lugar: "Ensamblaje" },
    { item: "Licenciamiento Cloud Enterprise", cant: "1 Nodo", costo: "$4,500", lugar: "SaaS Kyron" },
];

const alliesTableData = [
    { aliado: "NOC Kyron", apoyo: "Sede de Operaciones / Nodo Educativo" },
    { aliado: "Consorcio Legal & Fiscal", apoyo: "Certificación de Normativa VEN-NIF" },
];

const planAccionData = [
    { tarea: "Validación de Cifrado AES-512.", responsable: "Dirección Técnica", cronograma: "Fase 01" },
    { tarea: "Integración de IA Fiscal Predictiva.", responsable: "Ingeniería de Software", cronograma: "Fase 02" },
    { tarea: "Despliegue de Infraestructura 5G.", responsable: "Telecomunicaciones", cronograma: "Fase 03" },
    { tarea: "Sincronización de Ledger Blockchain.", responsable: "Seguridad de Datos", cronograma: "Fase 04" },
];

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const downloadAsWord = (title: string, content: string) => {
        const header = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>${title}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; padding: 50px; line-height: 1.5; color: #1a1a1a; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
                    .header-table { border: none; margin-bottom: 45px; border-bottom: 4px solid #0ea5e9; }
                    .logo-box { width: 70px; height: 70px; background-color: #0ea5e9; text-align: center; color: white; line-height: 70px; font-weight: bold; font-size: 28pt; border-radius: 12px; }
                    .brand-name { font-size: 24pt; font-weight: 900; color: #0ea5e9; letter-spacing: 2px; text-transform: uppercase; }
                    .brand-tagline { font-size: 10pt; color: #64748b; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; }
                    h1 { color: #0ea5e9; font-size: 22pt; text-transform: uppercase; margin-bottom: 30px; border-left: 12px solid #0ea5e9; padding-left: 20px; font-weight: 900; }
                    th, td { border: 1px solid #e2e8f0; padding: 14px; text-align: left; font-size: 11pt; }
                    .section-header { background-color: #0ea5e9; color: white; font-weight: bold; text-transform: uppercase; font-size: 10pt; letter-spacing: 1px; }
                    .label-cell { background-color: #f1f5f9; font-weight: bold; width: 35%; color: #1e293b; }
                    .accent-text { color: #059669; font-weight: 900; }
                    .footer { margin-top: 60px; text-align: center; font-size: 9pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 25px; font-style: italic; }
                    .dossier-id { font-size: 8pt; color: #cbd5e1; text-align: right; }
                </style>
            </head>
            <body>
                <table class="header-table">
                    <tr>
                        <td style="border:none; width: 85px;">
                            <div class="logo-box">K</div>
                        </td>
                        <td style="border:none;">
                            <div class="brand-name">SYSTEM KYRON</div>
                            <div class="brand-tagline">Master Corporate Intelligence</div>
                        </td>
                        <td style="border:none; text-align: right; vertical-align: bottom;">
                            <div class="dossier-id">ID: ZEDU-MASTER-PROTOCOL-2026</div>
                        </td>
                    </tr>
                </table>
        `;
        const footer = `<div class="footer">DOCUMENTO DE GRADO CORPORATIVO PROTEGIDO POR PROTOCOLO KYRON • © 2026</div></body></html>`;
        const sourceHTML = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${title.replace(/\s+/g, '_')}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
        
        toast({
            title: "EXPORTACIÓN COMPLETADA",
            description: `Dossier "${title}" generado con éxito.`,
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const handleDownloadZEDU = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            let tableRows = "";
            zeduMasterData.secciones.forEach(sec => {
                tableRows += `<tr class="section-header"><td colspan="2">${sec.titulo}</td></tr>`;
                sec.filas.forEach(f => {
                    tableRows += `<tr><td class="label-cell">${f.label}</td><td>${f.val}</td></tr>`;
                });
            });

            const budgetRows = budgetTableData.map(d => `<tr><td>${d.item}</td><td>${d.cant}</td><td class="accent-text">${d.costo}</td><td>${d.lugar}</td></tr>`).join('');
            const alliesRows = alliesTableData.map(d => `<tr><td class="label-cell">${d.aliado}</td><td>${d.apoyo}</td></tr>`).join('');
            const planRows = planAccionData.map(d => `<tr><td>${d.tarea}</td><td>${d.responsable}</td><td class="accent-text">${d.cronograma}</td></tr>`).join('');

            const content = `
                <h1>Expediente Maestro de Implementación (ZEDU)</h1>
                <p style="margin-bottom: 25pt; color: #475569;">Consolidado de parámetros estratégicos para el despliegue del ecosistema en entornos de alta densidad comercial.</p>
                <table>
                    ${tableRows}
                    <tr class="section-header"><td colspan="2">5. PROYECCIÓN DE INVERSIÓN OPERATIVA (CapEx)</td></tr>
                    <tr><td colspan="2" style="padding:0; border:none;">
                        <table>
                            <tr style="background-color: #334155; color: white;"><th>COMPONENTE MAESTRO</th><th>CANTIDAD</th><th>COSTO EST.</th><th>ORIGEN</th></tr>
                            ${budgetRows}
                        </table>
                    </td></tr>
                    <tr class="section-header"><td colspan="2">6. ALIANZAS Y SOPORTE DE NODO</td></tr>
                    <tr><td colspan="2" style="padding:0; border:none;">
                        <table>
                            <tr style="background-color: #334155; color: white;"><th>ENTIDAD ALIADA</th><th>RESPONSABILIDAD OPERATIVA</th></tr>
                            ${alliesRows}
                        </table>
                    </td></tr>
                    <tr class="section-header"><td colspan="2">7. PROTOCOLO DE DESPLIEGUE SEGURO</td></tr>
                    <tr><td colspan="2" style="padding:0; border:none;">
                        <table>
                            <tr style="background-color: #334155; color: white;"><th>OBJETIVO TÉCNICO</th><th>RESPONSABLE</th><th>ESTADO</th></tr>
                            ${planRows}
                        </table>
                    </td></tr>
                </table>
            `;
            downloadAsWord("Expediente_Maestro_ZEDU_Kyron", content);
        }, 1200);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-16 min-h-screen bg-black relative">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-6 md:pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Terminal className="h-3 w-3" /> NODO ESTRATÉGICO
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Expediente <span className="text-primary italic">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Zona Económica Digital Unificada • v2.6.5</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR VISTA
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full relative z-10 no-print">
                <TabsList className="flex h-auto md:h-14 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-16 shadow-inner flex-col md:flex-row gap-1">
                    <TabsTrigger value="zedu" className="w-full md:flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 py-3 md:py-0 italic">1. Matriz Operativa ZEDU</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="w-full md:flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 py-3 md:py-0 italic">2. Factibilidad Financiera</TabsTrigger>
                    <TabsTrigger value="propuesta" className="w-full md:flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 py-3 md:py-0 italic">3. Propuesta Corporativa</TabsTrigger>
                </TabsList>

                <div className="space-y-16">
                    <TabsContent value="zedu" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-5xl mx-auto space-y-10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-primary/10 rounded-[1.5rem] border border-primary/20 shadow-glow flex items-center justify-center">
                                        <FileCheck2 className="h-10 w-10 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
                                            Previsualización Dossier ZEDU
                                        </h2>
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mt-1 italic">Estado: Verificado por Nodo Maestro</p>
                                    </div>
                                </div>
                                <Button 
                                    className="w-full md:w-auto btn-3d-primary h-14 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl group" 
                                    onClick={handleDownloadZEDU}
                                    disabled={isVerifying}
                                >
                                    {isVerifying ? (
                                        <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                                    ) : (
                                        <FileWord className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isVerifying ? "SELLANDO DATOS..." : "DESCARGAR EXPEDIENTE (.DOC)"}
                                </Button>
                            </div>

                            <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-white/[0.01]">
                                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-3">
                                        <Activity className="h-3 w-3 animate-pulse" /> Registro Inmutable v2.6
                                    </span>
                                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1 rounded-lg uppercase tracking-widest bg-primary/5">Confidencial</Badge>
                                </div>
                                <div className="overflow-x-auto">
                                    <Table className="w-full">
                                        <TableBody>
                                            {zeduMasterData.secciones.map((sec) => (
                                                <React.Fragment key={sec.id}>
                                                    <TableRow className="bg-primary/10 border-none">
                                                        <TableCell colSpan={2} className="py-5 px-10 font-black uppercase text-white text-[11px] tracking-[0.4em] italic flex items-center gap-4">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            {sec.titulo}
                                                        </TableCell>
                                                    </TableRow>
                                                    {sec.filas.map((fila, idx) => (
                                                        <TableRow key={idx} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                                            <TableCell className="w-[40%] md:w-[35%] py-6 px-10 text-[10px] font-black uppercase tracking-widest text-primary/60 border-r border-white/5 bg-white/[0.01] group-hover:text-primary transition-colors">
                                                                {fila.label}
                                                            </TableCell>
                                                            <TableCell className="py-6 px-10 text-xs md:text-sm font-bold text-white/70 leading-relaxed italic uppercase tracking-tight">
                                                                {fila.val}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                            
                                            <TableRow className="bg-primary/10 border-none">
                                                <TableCell colSpan={2} className="py-5 px-10 font-black uppercase text-white text-[11px] tracking-[0.4em] italic flex items-center gap-4">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                    5. ESTIMACIÓN DE INVERSIÓN
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="border-none">
                                                <TableCell colSpan={2} className="p-0">
                                                    <div className="overflow-x-auto">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow className="bg-white/[0.03] border-none">
                                                                    <TableHead className="text-white text-[9px] font-black uppercase px-10">COMPONENTE</TableHead>
                                                                    <TableHead className="text-white text-[9px] font-black uppercase">CANTIDAD</TableHead>
                                                                    <TableHead className="text-white text-[9px] font-black uppercase">COSTO EST.</TableHead>
                                                                    <TableHead className="text-white text-[9px] font-black uppercase pr-10">ORIGEN</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {budgetTableData.map((d, i) => (
                                                                    <TableRow key={i} className="border-white/5 hover:bg-white/[0.02]">
                                                                        <TableCell className="px-10 py-5 text-[10px] font-bold text-white/60 uppercase">{d.item}</TableCell>
                                                                        <TableCell className="text-[10px] font-bold text-white/60">{d.cant}</TableCell>
                                                                        <TableCell className="text-[10px] font-black text-secondary italic tracking-tighter">{d.costo}</TableCell>
                                                                        <TableCell className="text-[10px] font-bold text-white/60 uppercase pr-10">{d.lugar}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="factibilidad" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-10 max-w-5xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Análisis de Viabilidad Técnica</h3>
                                <Button size="sm" variant="outline" className="w-full md:w-auto rounded-xl h-12 px-8 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary hover:bg-primary/10">
                                    <FileWord className="mr-3 h-4 w-4" /> EXPORTAR DICTAMEN (.DOC)
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {indicators.map((ind, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-[2.5rem] bg-white/[0.02] border-white/5 group hover:border-primary/30 transition-all shadow-xl">
                                        <div className="flex justify-between items-start mb-8">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">{ind.label}</p>
                                            <ind.icon className="h-5 w-5 text-primary animate-pulse" />
                                        </div>
                                        <p className="text-3xl font-black italic text-white mb-2 tracking-tighter">
                                            {typeof ind.value === 'number' ? (ind.value < 1 ? formatPercentage(ind.value) : formatCurrency(ind.value, 'USD')) : ind.value}
                                        </p>
                                        <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest leading-relaxed">{ind.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="propuesta" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/40 max-w-5xl mx-auto shadow-2xl">
                            <CardHeader className="p-10 md:p-16 text-center border-b border-white/5 bg-white/[0.01] space-y-8">
                                <div className="mx-auto w-fit bg-black p-6 rounded-[2.5rem] shadow-glow border border-primary/20">
                                    <Logo className="h-16 w-16" />
                                </div>
                                <div className="space-y-2">
                                    <CardTitle className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white italic-shadow leading-tight">Ecosistema Kyron <br/> Eficiencia Sin Fronteras</CardTitle>
                                    <CardDescription className="text-primary font-black uppercase tracking-[0.6em] text-[10px] md:text-xs italic">Propuesta Maestra de Implementación Corporativa 2026</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-10 md:p-16 space-y-16">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {proposalSections.map((sec, i) => (
                                        <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><sec.icon className="h-20 w-20" /></div>
                                            <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 border border-white/5 group-hover:scale-110 transition-transform shadow-inner relative z-10">
                                                <sec.icon className={cn("h-8 w-8", sec.color)} />
                                            </div>
                                            <h4 className="font-black uppercase text-base tracking-widest text-white mb-4 italic relative z-10 underline decoration-primary/20 underline-offset-8">{sec.title}</h4>
                                            <p className="text-[11px] font-bold text-white/30 uppercase leading-relaxed relative z-10">{sec.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>

            <footer className="mt-20 flex flex-col items-center gap-10 no-print pb-10">
                <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                    <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Encrypt: AES-512</span>
                    <span className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" /> AI Node: Active</span>
                    <span className="flex items-center gap-3"><Database className="h-4 w-4 text-primary" /> Ledger: Inmutable</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/5 italic">DOSSIER ESTRATÉGICO • SYSTEM KYRON • 2026</p>
            </footer >
        </div>
    );
}
