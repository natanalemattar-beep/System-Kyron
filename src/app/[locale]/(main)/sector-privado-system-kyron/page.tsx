
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

const zeduMasterData = {
    titulo: "Modelo Zedu - System Kyron",
    secciones: [
        {
            id: 1,
            titulo: "1. IDENTIFICACIÓN DEL PROYECTO",
            filas: [
                { label: "Nombre", val: "System Kyron" },
                { label: "Líder", val: "Carlos Mattar, Sebastián Garrido, Marcos Sousa" },
                { label: "Apoyo", val: "Wilmer López, Mireya Corro, María Hernández" },
                { label: "Institución", val: "U.E.P. Gabriela Mistral" },
                { label: "Ubicación", val: "La Guaira, Venezuela" },
            ]
        },
        {
            id: 2,
            titulo: "2. ESTUDIO DE POBLACIÓN (ZEDU)",
            filas: [
                { label: "Localización", val: "La Atlántida, entre calle 7 a calle 3, Catia La Mar. Referencias: Pinta Catia, Supermercado Bensica." },
                { label: "Comunidad", val: "Comunidad Comercial y Residencial La Atlántida" },
                { label: "Estimada", val: "500 empresas activas / 5.000 empleados administrativos y civiles." },
            ]
        },
        {
            id: 3,
            titulo: "3. ANÁLISIS DEL PROBLEMA",
            filas: [
                { label: "Definición", val: "Fragmentación de procesos (administrativos, de comunicación) que no se comunican entre sí. Esto crea silos de datos e ineficiencia operativa." },
                { label: "Importancia", val: "La desintegración de sistemas genera sobrecarga de trabajo manual y dificulta la toma de decisiones estratégicas." },
                { label: "Causas", val: "Sistemas obsoletos no adaptados a la economía multimoneda y complejidad de la legislación fiscal venezolana." },
                { label: "Consecuencias", val: "Pérdida de tiempo y dinero, errores en declaraciones de impuestos y multas del SENIAT." },
                { label: "Origen", val: "Adopción reactiva de tecnología que ha creado una infraestructura frágil e ineficiente." },
            ]
        },
        {
            id: 4,
            titulo: "4. SOLUCIÓN PROPUESTA",
            filas: [
                { label: "Proyecto", val: "Implementar 'System Kyron', un ecosistema empresarial 'Todo en Uno' que unifica la gestión, las telecomunicaciones 5G y las finanzas Blockchain en un único Centro de Mando." },
            ]
        },
        {
            id: 5,
            titulo: "5. ANÁLISIS COMPETITIVO",
            filas: [
                { label: "Competidores", val: "Sistemas ERP internacionales (SAP, Oracle) y software local de escritorio obsoleto." },
                { label: "Diferenciadores", val: "Única plataforma que integra ERP + Telecom + Finanzas con hiperlocalización fiscal venezolana e IA predictiva." },
            ]
        }
    ]
};

const budgetTableData = [
    { item: "Infraestructura Telecom 5G", cant: "1 Nodo", costo: "$5,000", lugar: "Kyron Corp" },
    { item: "SIM Cards Físicas", cant: "1000 Unid.", costo: "$1,000", lugar: "Manufactura" },
    { item: "Smartphones Homologados", cant: "12 Unid.", costo: "$9,600", lugar: "Importación Directa" },
    { item: "Hardware Smart Bins", cant: "5 Unid.", costo: "$683", lugar: "Ensamblaje Local" },
    { item: "Ecosistema Web & Cloud", cant: "1 Licencia", costo: "$4,500", lugar: "SaaS Kyron" },
];

const alliesTableData = [
    { aliado: "U.E.P. Gabriela Mistral", apoyo: "Institución Sede / Formación Académica" },
    { aliado: "Comercio Local La Atlántida", apoyo: "Red de Pruebas Beta / Operaciones Reales" },
    { aliado: "Consultores Fiscales Externos", apoyo: "Validación de Normativa VEN-NIF" },
    { aliado: "Proveedores 5G Globales", apoyo: "Infraestructura de Red y Datos" },
];

const planAccionData = [
    { tarea: "Análisis de Mercado Detallado y Validación de Requerimientos con Empresas Piloto.", responsable: "Carlos Mattar, Líder de Estrategia", cronograma: "Fase Inicial" },
    { tarea: "Desarrollo del Core ERP: Módulos Contable (VEN-NIF) y Administrativo (Inventario, CXC/P).", responsable: "Sebastián Garrido, Líder de Desarrollo", cronograma: "Fase Beta" },
    { tarea: "Despliegue de nodos de VoIP en AWS y configuración de troncales SIP para la OMV.", responsable: "Marcos Sousa, Líder de Telecom", cronograma: "Fase de Red" },
    { tarea: "Desarrollo de la Billetera Blockchain y Pruebas de Seguridad de Contratos Inteligentes.", responsable: "Sebastián Garrido, Líder de Desarrollo", cronograma: "Fase de Seguridad" },
    { tarea: "Fase de Pruebas de Aceptación de Usuario (UAT) con Clientes Piloto en entorno real.", responsable: "Equipo de QA", cronograma: "Validación" },
    { tarea: "Lanzamiento oficial del MVP y campaña de marketing digital inicial.", responsable: "Equipo de Marketing", cronograma: "Despliegue" },
];

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Flujo de caja descontado proyectado.", icon: TrendingUp },
    { label: "Tasa Interna de Retorno (TIR)", value: 0.285, desc: "Rendimiento anual del capital.", icon: Target },
    { label: "Período de Recuperación", value: "2.4 años", desc: "Retorno total de inversión inicial.", icon: Activity },
    { label: "Margen de Contribución", value: 0.32, desc: "Eficiencia neta por transacción.", icon: BarChart3 },
];

const projections = [
    { year: 1, revenue: 125000, profit: 40000, margin: 0.32 },
    { year: 2, revenue: 210000, profit: 100000, margin: 0.47 },
    { year: 3, revenue: 380000, profit: 240000, margin: 0.63 },
    { year: 4, revenue: 550000, profit: 370000, margin: 0.67 },
    { year: 5, revenue: 820000, profit: 600000, margin: 0.73 },
];

const proposalSections = [
    {
        icon: Radio,
        title: "Kyron Hyper-Connect 5G",
        desc: "Asignación inmediata de números telefónicos y eSIMs digitales con protocolo de baja latencia.",
        color: "text-blue-400"
    },
    {
        icon: Magnet,
        title: "Ecosistema Magnético IA",
        desc: "Smart Bins con tecnología de inducción para trazabilidad inmutable de activos verdes.",
        color: "text-emerald-400"
    },
    {
        icon: ShieldCheck,
        title: "Blindaje Fiscal 360°",
        desc: "Automatización total de libros y declaraciones con auditoría predictiva sincronizada.",
        color: "text-amber-400"
    },
    {
        icon: Cpu,
        title: "Ledger Blockchain",
        desc: "Sellado digital de cada transacción para garantizar integridad absoluta.",
        color: "text-purple-400"
    }
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
                    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; }
                    .header { text-align: center; border-bottom: 2px solid #2d5a8e; padding-bottom: 20px; margin-bottom: 30px; }
                    .logo-text { font-size: 24pt; font-weight: 900; color: #2d5a8e; letter-spacing: 5px; }
                    .subtitle { font-size: 10pt; color: #666; text-transform: uppercase; letter-spacing: 2px; }
                    h1 { color: #2d5a8e; font-size: 18pt; text-transform: uppercase; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    .section-header { background-color: #2d5a8e; color: white; font-weight: bold; }
                    .label-cell { background-color: #f3f4f6; font-weight: bold; width: 30%; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo-text">SYSTEM KYRON</div>
                    <div class="subtitle">Ecosistema de Inteligencia Corporativa</div>
                </div>
        `;
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${title.replace(/\s+/g, '_')}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
        
        toast({
            title: "PROTOCOLO DE DESCARGA ACTIVO",
            description: `Documento "${title}" exportado con sello de identidad.`,
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

        const budgetRows = budgetTableData.map(d => `<tr><td>${d.item}</td><td>${d.cant}</td><td>${d.costo}</td><td>${d.lugar}</td></tr>`).join('');
        const alliesRows = alliesTableData.map(d => `<tr><td>${d.aliado}</td><td>${d.apoyo}</td></tr>`).join('');
        const planRows = planAccionData.map(d => `<tr><td>${d.tarea}</td><td>${d.responsable}</td><td>${d.cronograma}</td></tr>`).join('');

        const content = `
            <h1>Modelo Zedu - Dossier Técnico</h1>
            <table>
                ${tableRows}
                <tr class="section-header"><td colspan="2">6. PRESUPUESTO</td></tr>
                <tr><td colspan="2">
                    <table>
                        <tr style="background-color: #4b5563; color: white;"><th>ITEM</th><th>CANTIDAD</th><th>COSTO</th><th>LUGAR</th></tr>
                        ${budgetRows}
                    </table>
                </td></tr>
                <tr class="section-header"><td colspan="2">7. ALIADOS</td></tr>
                <tr><td colspan="2">
                    <table>
                        <tr style="background-color: #4b5563; color: white;"><th>ALIADO</th><th>APOYO</th></tr>
                        ${alliesRows}
                    </table>
                </td></tr>
                <tr class="section-header"><td colspan="2">8. PLAN DE ACCIÓN</td></tr>
                <tr><td colspan="2">
                    <table>
                        <tr style="background-color: #4b5563; color: white;"><th>TAREA</th><th>RESPONSABLE</th><th>CRONOGRAMA</th></tr>
                        ${planRows}
                    </table>
                </td></tr>
            </table>
        `;
        downloadAsWord("Modelo_Zedu_System_Kyron", content);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 min-h-screen bg-black relative">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> SECTOR PRIVADO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Dossier <span className="text-primary italic">Modelo Zedu</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">System Kyron v2.6.5 • Inteligencia Institucional</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR VISTA
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full relative z-10 no-print">
                <TabsList className="flex h-14 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-16 shadow-inner overflow-x-auto">
                    <TabsTrigger value="zedu" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4 italic">1. Matriz Modelo Zedu</TabsTrigger>
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
                                        MODELO ZEDU
                                    </h2>
                                </div>
                                <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={handleDownloadZEDU}>
                                    <FileWord className="mr-2 h-4 w-4" /> DESCARGAR MODELO (.DOC)
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
                                                        <TableCell className="w-[30%] py-6 px-8 text-[10px] font-black uppercase tracking-widest text-primary/80 border-r border-white/5 bg-white/[0.01]">
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
                                                6. PRESUPUESTO
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell colSpan={2} className="p-0">
                                                <div className="px-8 py-4 bg-white/[0.02] italic text-[10px] text-white/40 border-b border-white/5">
                                                    Nota: Se recomienda el uso de hojas de cálculo para la gestión dinámica.
                                                </div>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-[#4b5563] border-none">
                                                            <TableHead className="text-white text-[9px] font-black uppercase px-8">ITEM</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">CANTIDAD</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">COSTO</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">LUGAR</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {budgetTableData.map((d, i) => (
                                                            <TableRow key={i} className="border-white/5">
                                                                <TableCell className="px-8 py-4 text-[10px] font-bold text-white/70 uppercase">{d.item}</TableCell>
                                                                <TableCell className="text-[10px] font-bold text-white/70">{d.cant}</TableCell>
                                                                <TableCell className="text-[10px] font-black text-secondary">{d.costo}</TableCell>
                                                                <TableCell className="text-[10px] font-bold text-white/70">{d.lugar}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className="bg-[#2d5a8e] border-none">
                                            <TableCell colSpan={2} className="py-5 px-8 font-black uppercase text-white text-[11px] tracking-[0.4em]">
                                                7. ALIADOS
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell colSpan={2} className="p-0">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-[#4b5563] border-none">
                                                            <TableHead className="text-white text-[9px] font-black uppercase px-8">ALIADO</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">APOYO</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {alliesTableData.map((d, i) => (
                                                            <TableRow key={i} className="border-white/5">
                                                                <TableCell className="px-8 py-4 text-[10px] font-bold text-white/70 uppercase">{d.aliado}</TableCell>
                                                                <TableCell className="py-4 text-[10px] font-bold text-white/70 italic">{d.apoyo}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className="bg-[#2d5a8e] border-none">
                                            <TableCell colSpan={2} className="py-5 px-8 font-black uppercase text-white text-[11px] tracking-[0.4em]">
                                                8. PLAN DE ACCIÓN
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-none">
                                            <TableCell colSpan={2} className="p-0">
                                                <div className="px-8 py-4 bg-white/[0.02] italic text-[10px] text-white/40 border-b border-white/5 leading-relaxed">
                                                    El plan de acción debe incluir todas las tareas a realizar, indicando el responsable, las fechas, el presupuesto y los recursos necesarios.
                                                </div>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-[#4b5563] border-none">
                                                            <TableHead className="text-white text-[9px] font-black uppercase px-8">TAREAS</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">RESPONSABLE</TableHead>
                                                            <TableHead className="text-white text-[9px] font-black uppercase">CRONOGRAMA</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {planAccionData.map((d, i) => (
                                                            <TableRow key={i} className="border-white/5">
                                                                <TableCell className="px-8 py-4 text-[10px] font-bold text-white/70 uppercase leading-snug">{d.tarea}</TableCell>
                                                                <TableCell className="py-4 text-[10px] font-bold text-white/70 uppercase">{d.responsable}</TableCell>
                                                                <TableCell className="py-4 text-[10px] font-black text-secondary italic">{d.cronograma}</TableCell>
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
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Dictamen de Rentabilidad</h3>
                                <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-secondary/30 text-secondary hover:bg-secondary/10" onClick={() => downloadAsWord("Factibilidad_Economica_System_Kyron", "<h1>Dictamen de Factibilidad</h1><p>Indicadores VAN/TIR positivos...</p>")}>
                                    <FileWord className="mr-2 h-4 w-4" /> DESCARGAR FACTIBILIDAD (.DOC)
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
                                    <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary hover:bg-primary/10" onClick={() => downloadAsWord("Propuesta_Estrategica_System_Kyron", "<h1>Propuesta Maestra</h1><p>Pilares de innovación...</p>")}>
                                        <FileWord className="mr-2 h-4 w-4" /> DESCARGAR PROPUESTA (.DOC)
                                    </Button>
                                </div>
                                <div className="mx-auto w-fit bg-black p-6 rounded-[2.5rem] shadow-glow border border-primary/20"><Logo className="h-16 w-16" /></div>
                                <CardTitle className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white italic-shadow leading-tight">Ecosistema Kyron <br/> Eficiencia Sin Fronteras</CardTitle>
                                <CardDescription className="text-primary font-black uppercase tracking-[0.6em] text-xs">Propuesta Maestra de Gestión</CardDescription>
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
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/5 italic">FIN DE DOSSIER • SYSTEM KYRON</p>
            </footer >
        </div>
    );
}
