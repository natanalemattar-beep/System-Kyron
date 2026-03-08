
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
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import React from "react";

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
                { label: "Institución Sede Administrativa", val: "Nodo de Operaciones Central" },
                { label: "Localización de Nodo Maestro", val: "Estado La Guaira, República Bolivariana de Venezuela" },
            ]
        },
        {
            id: 2,
            titulo: "2. ESTUDIO DE POBLACIÓN Y ALCANCE (ZEDU)",
            filas: [
                { label: "Coordenadas Operativas", val: "Zona Comercial La Atlántida, Parroquia Catia La Mar." },
                { label: "Segmento de Impacto", val: "Comunidad Comercial, Residencial e Institucional de Alta Densidad" },
                { label: "Alcance Operativo Est.", val: "500 Nodos Empresariales / 5.000 Terminales de Usuario Activos." },
            ]
        },
        {
            id: 3,
            titulo: "3. ANÁLISIS TÉCNICO DEL PROBLEMA",
            filas: [
                { label: "Definición de Brecha", val: "Fragmentación de procesos críticos y silos de información que impiden la interoperabilidad sistémica." },
                { label: "Impacto en Rendimiento", val: "Pérdida de eficiencia del 40% debido a la carga manual de datos y falta de sincronización fiscal." },
                { label: "Factores de Riesgo", val: "Obsolescencia tecnológica y falta de adaptación a la dinámica legislativa y multimoneda." },
                { label: "Riesgo de Cumplimiento", val: "Exposición a sanciones administrativas por desactualización normativa en tiempo real." },
            ]
        },
        {
            id: 4,
            titulo: "4. ARQUITECTURA DE SOLUCIÓN",
            filas: [
                { label: "Despliegue Maestro", val: "Implementación del Ecosistema 'All-in-One' Kyron: Gestión ERP + Telecom 5G + Ledger Inmutable." },
            ]
        }
    ]
};

const budgetTableData = [
    { item: "Infraestructura de Red 5G / Core", cant: "1 Nodo", costo: "$5,000", lugar: "Kyron Corp" },
    { item: "Lote SIM Cards Físicas Kyron (1.000 uds)", cant: "1000 Unid.", costo: "$1,000", lugar: "Manufactura" },
    { item: "Módulos de Inducción Smart Bins", cant: "5 Unid.", costo: "$683", lugar: "Ensamblaje" },
    { item: "Licenciamiento Cloud Enterprise", cant: "1 Nodo", costo: "$4,500", lugar: "SaaS Kyron" },
];

const alliesTableData = [
    { aliado: "Centro de Operaciones Kyron", apoyo: "Sede de Operaciones / Nodo Educativo" },
    { aliado: "Federación de Comercios La Atlántida", apoyo: "Red de Validación Operativa Beta" },
    { aliado: "Consorcio Legal & Fiscal Nacional", apoyo: "Certificación de Normativa VEN-NIF" },
];

const planAccionData = [
    { tarea: "Validación de Protocolos de Seguridad y Cifrado.", responsable: "Dirección Técnica", cronograma: "Fase 01" },
    { tarea: "Integración de Motores de IA Fiscal Predictiva.", responsable: "Ingeniería de Software", cronograma: "Fase 02" },
    { tarea: "Despliegue de Infraestructura 5G y Nodos eSIM.", responsable: "Telecomunicaciones", cronograma: "Fase 03" },
    { tarea: "Sincronización de Ledger Blockchain Inmutable.", responsable: "Seguridad de Datos", cronograma: "Fase 04" },
];

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

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
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    .header-table { border: none; margin-bottom: 40px; border-bottom: 3px solid #2d5a8e; }
                    .logo-box { width: 60px; height: 60px; background-color: #2d5a8e; text-align: center; color: white; line-height: 60px; font-weight: bold; font-size: 24pt; border-radius: 8px; }
                    .brand-name { font-size: 22pt; font-weight: 900; color: #2d5a8e; letter-spacing: 3px; text-transform: uppercase; }
                    .brand-tagline { font-size: 9pt; color: #666; text-transform: uppercase; letter-spacing: 2px; }
                    h1 { color: #2d5a8e; font-size: 20pt; text-transform: uppercase; margin-bottom: 25px; border-left: 10px solid #2d5a8e; padding-left: 15px; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 10pt; }
                    .section-header { background-color: #2d5a8e; color: white; font-weight: bold; text-transform: uppercase; }
                    .label-cell { background-color: #f8f9fa; font-weight: bold; width: 30%; color: #2d5a8e; }
                    .accent-text { color: #15803d; font-weight: bold; }
                    .footer { margin-top: 50px; text-align: center; font-size: 8pt; color: #94a3b8; border-top: 1px solid #eee; padding-top: 20px; }
                </style>
            </head>
            <body>
                <table class="header-table">
                    <tr>
                        <td style="border:none; width: 75px;">
                            <div class="logo-box">K</div>
                        </td>
                        <td style="border:none;">
                            <div class="brand-name">SYSTEM KYRON</div>
                            <div class="brand-tagline">Corporate Intelligence Ecosystem</div>
                        </td>
                        <td style="border:none; text-align: right; vertical-align: bottom;">
                            <div style="font-size: 8pt; color: #999;">ID: SECTOR-PRV-PROTOCOL</div>
                        </td>
                    </tr>
                </table>
        `;
        const footer = `<div class="footer">DOCUMENTO DE GRADO CORPORATIVO • SYSTEM KYRON • PROPIEDAD INTELECTUAL RESERVADA • © 2026</div></body></html>`;
        const sourceHTML = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${title.replace(/\s+/g, '_')}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
        
        toast({
            title: "DESCARGA INSTITUCIONAL ACTIVA",
            description: `Dossier "${title}" exportado bajo protocolo seguro.`,
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const handleDownloadZEDU = () => {
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
            <h1>Dossier Institucional - Modelo ZEDU</h1>
            <p style="margin-bottom: 20pt; font-style: italic;">Consolidado de parámetros estratégicos para la implementación del ecosistema en el sector privado.</p>
            <table>
                ${tableRows}
                <tr class="section-header"><td colspan="2">5. ESTIMACIÓN DE INVERSIÓN (CapEx)</td></tr>
                <tr><td colspan="2" style="padding:0;">
                    <table>
                        <tr style="background-color: #4b5563; color: white;"><th>COMPONENTE</th><th>CANTIDAD</th><th>COSTO EST.</th><th>ORIGEN</th></tr>
                        ${budgetRows}
                    </table>
                </td></tr>
                <tr class="section-header"><td colspan="2">6. ALIANZAS ESTRATÉGICAS Y SOPORTE</td></tr>
                <tr><td colspan="2" style="padding:0;">
                    <table>
                        <tr style="background-color: #4b5563; color: white;"><th>ALIADO CLAVE</th><th>CONTRIBUCIÓN AL NODO</th></tr>
                        ${alliesRows}
                    </table>
                </td></tr>
                <tr class="section-header"><td colspan="2">7. CRONOGRAMA DE ACCIÓN MAESTRA</td></tr>
                <tr><td colspan="2" style="padding:0;">
                    <table>
                        <tr style="background-color: #4b5563; color: white;"><th>OBJETIVO TÉCNICO</th><th>RESPONSABLE</th><th>FASE OPERATIVA</th></tr>
                        ${planRows}
                    </table>
                </td></tr>
            </table>
        `;
        downloadAsWord("Modelo_ZEDU_System_Kyron_Corporate", content);
    };

    const handleDownloadFactibilidad = () => {
        const indicatorsContent = indicators.map(i => `<tr><td class="label-cell">${i.label}</td><td>${typeof i.value === 'number' ? (i.value < 1 ? formatPercentage(i.value) : formatCurrency(i.value, 'USD')) : i.value}</td><td>${i.desc}</td></tr>`).join('');
        const projectionRows = projections.map(p => `<tr><td class="label-cell">PERIODO 0${p.year}</td><td>${formatCurrency(p.revenue, 'USD')}</td><td class="accent-text">${formatCurrency(p.profit, 'USD')}</td><td>${formatPercentage(p.margin)}</td></tr>`).join('');

        const content = `
            <h1>Dictamen de Factibilidad Económica</h1>
            <p style="font-style: italic; margin-bottom: 20pt;">Análisis técnico de viabilidad financiera y proyección de retorno de inversión del Ecosistema Kyron.</p>
            <table>
                <tr class="section-header"><td>INDICADOR MÉTRICO</td><td>VALOR CALCULADO</td><td>ESPECIFICACIÓN TÉCNICA</td></tr>
                ${indicatorsContent}
            </table>
            <h1>Proyección Financiera Quinquenal</h1>
            <table>
                <tr class="section-header"><td>AÑO FISCAL</td><td>INGRESOS BRUTOS</td><td>UTILIDAD NETA</td><td>MARGEN OPERATIVO</td></tr>
                ${projectionRows}
            </table>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-top: 30px; border: 1px solid #e2e8f0;">
                <h3 style="color: #2d5a8e; margin-top: 0;">DICTAMEN TÉCNICO</h3>
                <p>Basado en los flujos de caja proyectados y la escalabilidad del modelo SaaS, se concluye una **VIABILIDAD EXCEPCIONAL** con una TIR del 28.5%, mitigando el riesgo operativo mediante la inmutabilidad de los registros fiscales.</p>
            </div>
        `;
        downloadAsWord("Factibilidad_Economica_Ecosistema_Kyron", content);
    };

    const handleDownloadPropuesta = () => {
        const sections = proposalSections.map(s => `<div style="margin-bottom: 20px;"><h3 style="color: #2d5a8e; margin-bottom: 5pt;">${s.title}</h3><p style="color: #475569;">${s.desc}</p></div>`).join('');
        const content = `
            <h1>Propuesta Estratégica de Gestión Integral</h1>
            <p style="margin-bottom: 25pt;"><strong>Fecha de Emisión:</strong> ${new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            <div style="margin-top: 30px;">
                ${sections}
            </div>
            <h1>Pilares de Valor del Ecosistema</h1>
            <ul style="list-style-type: square; color: #1e293b; padding-left: 20pt;">
                <li style="margin-bottom: 10pt;">Centralización Total: Un único nodo maestro para telecom, finanzas y cumplimiento legal.</li>
                <li style="margin-bottom: 10pt;">Auditoría IA Predictiva: Supervisión continua de transacciones contra la normativa fiscal vigente.</li>
                <li style="margin-bottom: 10pt;">Integridad Blockchain: Sellado inmutable de cada registro para transparencia absoluta.</li>
            </ul>
        `;
        downloadAsWord("Propuesta_Corporativa_Master_Kyron", content);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 min-h-screen bg-black relative">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> SECTOR PRIVADO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Dossier <span className="text-primary italic">Maestro</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">System Kyron v2.6.5 • Inteligencia Corporativa</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR VISTA
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full relative z-10 no-print">
                <TabsList className="flex h-14 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-16 shadow-inner overflow-x-auto">
                    <TabsTrigger value="zedu" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 italic">1. Matriz Modelo ZEDU</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 italic">2. Factibilidad Económica</TabsTrigger>
                    <TabsTrigger value="propuesta" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 italic">3. Propuesta Estratégica</TabsTrigger>
                </TabsList>

                <div className="space-y-16">
                    <TabsContent value="zedu" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none bg-transparent shadow-none max-w-5xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                                <div className="flex items-center gap-6">
                                    <Logo className="h-16 w-16 drop-shadow-glow" />
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter border-l-4 border-primary pl-6">
                                        EXPEDIENTE ZEDU
                                    </h2>
                                </div>
                                <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={handleDownloadZEDU}>
                                    <FileWord className="mr-2 h-4 w-4" /> EXPORTAR EXPEDIENTE (.DOC)
                                </Button>
                            </div>

                            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40 space-y-0.5">
                                <Table className="w-full">
                                    <TableBody>
                                        {zeduMasterData.secciones.map((sec) => (
                                            <React.Fragment key={sec.id}>
                                                <TableRow className="bg-[#2d5a8e] hover:bg-[#2d5a8e] border-none transition-none">
                                                    <TableCell colSpan={2} className="py-5 px-8 font-black uppercase text-white text-[11px] tracking-[0.4em]">
                                                        {sec.titulo}
                                                    </TableCell>
                                                </TableRow>
                                                {sec.filas.map((fila, idx) => (
                                                    <TableRow key={idx} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                                        <TableCell className="w-[35%] py-6 px-8 text-[10px] font-black uppercase tracking-widest text-primary/80 border-r border-white/5 bg-white/[0.01]">
                                                            {fila.label}
                                                        </TableCell>
                                                        <TableCell className="py-6 px-8 text-sm font-bold text-white/80 leading-relaxed italic">
                                                            {fila.val}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                        
                                        <TableRow className="bg-[#2d5a8e] border-none">
                                            <TableCell colSpan={2} className="py-5 px-8 font-black uppercase text-white text-[11px] tracking-[0.4em]">
                                                5. PRESUPUESTO OPERATIVO
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell colSpan={2} className="p-0">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-[#4b5563] border-none">
                                                            <TableHead className="text-white text-[9px] font-black uppercase px-8">COMPONENTE</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">CANTIDAD</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">COSTO EST.</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase pr-8">ORIGEN</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {budgetTableData.map((d, i) => (
                                                            <TableRow key={i} className="border-white/5">
                                                                <TableCell className="px-8 py-4 text-[10px] font-bold text-white/70 uppercase">{d.item}</TableCell>
                                                                <TableCell className="text-[10px] font-bold text-white/70">{d.cant}</TableCell>
                                                                <TableCell className="text-[10px] font-black text-secondary">{d.costo}</TableCell>
                                                                <TableCell className="text-[10px] font-bold text-white/70 uppercase pr-8">{d.lugar}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className="bg-[#2d5a8e] border-none">
                                            <TableCell colSpan={2} className="py-5 px-8 font-black uppercase text-white text-[11px] tracking-[0.4em]">
                                                6. ALIANZAS INSTITUCIONALES
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell colSpan={2} className="p-0">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-[#4b5563] border-none">
                                                            <TableHead className="text-white text-[9px] font-black uppercase px-8">ALIADO ESTRATÉGICO</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase pr-8">SOPORTE AL NODO</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {alliesTableData.map((d, i) => (
                                                            <TableRow key={i} className="border-white/5">
                                                                <TableCell className="px-8 py-4 text-[10px] font-bold text-white/70 uppercase">{d.aliado}</TableCell>
                                                                <TableCell className="py-4 text-[10px] font-bold text-white/70 italic pr-8">{d.apoyo}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className="bg-[#2d5a8e] border-none">
                                            <TableCell colSpan={2} className="py-5 px-8 font-black uppercase text-white text-[11px] tracking-[0.4em]">
                                                7. PROTOCOLO DE EJECUCIÓN
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell colSpan={2} className="p-0">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-[#4b5563] border-none">
                                                            <TableHead className="text-white text-[9px] font-black uppercase px-8">OBJETIVO TÉCNICO</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">RESPONSABLE</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase pr-8">ESTADO</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {planAccionData.map((d, i) => (
                                                            <TableRow key={i} className="border-white/5">
                                                                <TableCell className="px-8 py-4 text-[10px] font-bold text-white/70 uppercase leading-snug">{d.tarea}</TableCell>
                                                                <TableCell className="py-4 text-[10px] font-bold text-white/70 uppercase">{d.responsable}</TableCell>
                                                                <TableCell className="py-4 text-[10px] font-black text-secondary italic pr-8">{d.cronograma}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="factibilidad" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-10 max-w-5xl mx-auto">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Análisis de Viabilidad</h3>
                                <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-secondary/30 text-secondary hover:bg-secondary/10" onClick={handleDownloadFactibilidad}>
                                    <FileWord className="mr-2 h-4 w-4" /> EXPORTAR DICTAMEN (.DOC)
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {indicators.map((ind, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-[2.5rem] bg-white/[0.02] border-white/5 group hover:border-primary/30 transition-all">
                                        <div className="flex justify-between items-start mb-6">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">{ind.label}</p>
                                            <ind.icon className="h-4 w-4 text-primary animate-pulse" />
                                        </div>
                                        <p className="text-3xl font-black italic text-white mb-2">
                                            {typeof ind.value === 'number' ? (ind.value < 1 ? formatPercentage(ind.value) : formatCurrency(ind.value, 'USD')) : ind.value}
                                        </p>
                                        <p className="text-[9px] text-white/20 uppercase font-bold">{ind.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="propuesta" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/40 max-w-5xl mx-auto">
                            <CardHeader className="p-12 text-center border-b border-white/5 bg-white/[0.01] space-y-6">
                                <div className="flex justify-end">
                                    <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary hover:bg-primary/10" onClick={handleDownloadPropuesta}>
                                        <FileWord className="mr-2 h-4 w-4" /> EXPORTAR PROPUESTA (.DOC)
                                    </Button>
                                </div>
                                <div className="mx-auto w-fit bg-black p-6 rounded-[2.5rem] shadow-glow border border-primary/20"><Logo className="h-16 w-16" /></div>
                                <CardTitle className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white italic-shadow leading-tight">Ecosistema Kyron <br/> Eficiencia Sin Fronteras</CardTitle>
                                <CardDescription className="text-primary font-black uppercase tracking-[0.6em] text-xs">Propuesta Maestra de Implementación Corporativa</CardDescription>
                            </CardHeader>
                            <CardContent className="p-12 space-y-16">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {proposalSections.map((sec, i) => (
                                        <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
                                            <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                                                <sec.icon className={cn("h-6 w-6", sec.color)} />
                                            </div>
                                            <h4 className="font-black uppercase text-sm tracking-widest text-white mb-3 italic">{sec.title}</h4>
                                            <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">{sec.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>

            <footer className="mt-20 flex flex-col items-center gap-10 no-print pb-10">
                <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Encrypt: AES-512</span>
                    <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> AI Node: Active</span>
                    <span className="flex items-center gap-2"><Database className="h-3 w-3" /> Ledger: Inmutable</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/5 italic">DOSSIER CORPORATIVO • SYSTEM KYRON • 2026</p>
            </footer >
        </div>
    );
}
