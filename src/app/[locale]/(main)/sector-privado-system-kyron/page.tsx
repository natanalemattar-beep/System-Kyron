
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
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";

/**
 * @fileOverview PORTAL SECTOR PRIVADO - EXPEDIENTE MAESTRO ZEDU 2025
 * Integración de alta fidelidad del modelo ZEDU, Factibilidad y Propuesta.
 */

const zeduMasterData = {
    titulo: "MODELO DE ZEDU - System Kyron 2025",
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
                { label: "Definición", val: "Las empresas en Venezuela operan con un 'Frankenstein' de sistemas aislados (contables, fiscales y administrativos), generando brechas de seguridad, pérdida de datos por factores ambientales y un alto riesgo de sanciones ante el SENIAT por falta de sincronización en tiempo real." },
            ]
        }
    ]
};

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
    { icon: Radio, title: "Kyron Hyper-Connect 5G", desc: "Asignación inmediata de números telefónicos y eSIMs digitales con protocolo de baja latencia.", color: "text-blue-400" },
    { icon: Magnet, title: "Ecosistema Magnético IA", desc: "Smart Bins con tecnología de inducción para la trazabilidad inmutable de residuos.", color: "text-emerald-400" },
    { icon: ShieldCheck, title: "Blindaje Fiscal 360°", desc: "Automatización total de libros y declaraciones con auditoría predictiva sincronizada 24/7.", color: "text-amber-400" },
    { icon: Cpu, title: "Ledger Blockchain", desc: "Sellado digital de cada transacción para garantizar integridad absoluta ante auditorías.", color: "text-purple-400" }
];

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const downloadAsWord = (title: string, content: string) => {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>"+title+"</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<div style="font-family: Arial, sans-serif; padding: 20px;">${content}</div>` + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${title.replace(/\s+/g, '_')}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
        
        toast({
            title: "DESCARGA INICIADA",
            description: `Documento exportado exitosamente.`,
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const handleDownloadZEDU = () => {
        let tableRows = "";
        zeduMasterData.secciones.forEach(sec => {
            tableRows += `<tr style="background-color: #2d5a8e; color: white;"><td colspan="2" style="padding: 10px; font-weight: bold;">${sec.titulo}</td></tr>`;
            sec.filas.forEach(f => {
                tableRows += `<tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 30%;">${f.label}</td><td style="padding: 10px; border: 1px solid #ddd;">${f.val}</td></tr>`;
            });
        });

        const content = `
            <h1 style="text-align: center; color: #2d5a8e;">${zeduMasterData.titulo}</h1>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                ${tableRows}
            </table>
        `;
        downloadAsWord("Modelo_ZEDU_System_Kyron_2025", content);
    };

    const handleDownloadFactibilidad = () => {
        const content = `
            <h1 style="text-align: center; color: #22c55e;">FACTIBILIDAD ECONÓMICA KYRON 2025</h1>
            <h2>Indicadores de Rentabilidad</h2>
            <ul>
                <li>VAN: $450,000.00</li>
                <li>TIR: 28.5%</li>
                <li>Período de Recuperación: 2.4 años</li>
            </ul>
            <hr/>
            <p>El análisis financiero demuestra una viabilidad sobresaliente basada en el modelo de ingresos SaaS y la reducción de costos operativos mediante IA.</p>
        `;
        downloadAsWord("Factibilidad_Economica_Kyron", content);
    };

    const handleDownloadPropuesta = () => {
        const content = `
            <h1 style="text-align: center; color: #2563eb;">PROPUESTA ESTRATÉGICA SYSTEM KYRON</h1>
            <h2>Pilares de Innovación</h2>
            <ol>
                <li>Kyron Hyper-Connect 5G</li>
                <li>Ecosistema Magnético IA</li>
                <li>Blindaje Fiscal 360</li>
                <li>Ledger Blockchain</li>
            </ol>
            <hr/>
            <p>Propuesta técnica para la modernización de la infraestructura corporativa venezolana.</p>
        `;
        downloadAsWord("Propuesta_Estrategica_Kyron", content);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 min-h-screen bg-black relative">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> DOSSIER TÉCNICO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Sector <span className="text-primary italic">Privado Kyron</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Expediente de Inteligencia Corporativa • Nodo 2.6.5</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR VISTA
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="zedu" className="w-full relative z-10 no-print">
                <TabsList className="flex h-14 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-16 shadow-inner overflow-x-auto custom-scrollbar">
                    <TabsTrigger value="zedu" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4">1. Modelo ZEDU</TabsTrigger>
                    <TabsTrigger value="presupuesto" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4">2. Inversión CapEx</TabsTrigger>
                    <TabsTrigger value="factibilidad" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4">3. Factibilidad</TabsTrigger>
                    <TabsTrigger value="propuesta" className="flex-1 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary transition-all px-4">4. Propuesta</TabsTrigger>
                </TabsList>

                <div className="space-y-16">
                    {/* MODULO ZEDU CALCADO */}
                    <TabsContent value="zedu" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none bg-transparent shadow-none max-w-5xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                                <div className="flex items-center gap-6">
                                    <Logo className="h-16 w-16 drop-shadow-glow" />
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter border-l-4 border-primary pl-6">
                                        {zeduMasterData.titulo}
                                    </h2>
                                </div>
                                <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={handleDownloadZEDU}>
                                    <FileWord className="mr-2 h-4 w-4" /> DESCARGAR ZEDU (.DOC)
                                </Button>
                            </div>

                            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                                <Table className="w-full border-collapse">
                                    <TableBody>
                                        {zeduMasterData.secciones.map((sec) => (
                                            <React.Fragment key={sec.id}>
                                                <TableRow className="bg-[#2d5a8e] hover:bg-[#2d5a8e]/90 border-none transition-none">
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
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* CAPEX */}
                    <TabsContent value="presupuesto" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="glass-card overflow-hidden rounded-[3rem] border-white/5 shadow-2xl bg-black/40 max-w-5xl mx-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.03] border-none">
                                        <TableHead className="pl-10 py-6 font-black uppercase text-primary text-[10px] tracking-[0.4em]">Componente de Inversión Estratégica (CapEx)</TableHead>
                                        <TableHead className="text-right pr-10 py-6 font-black uppercase text-primary text-[10px] tracking-[0.4em]">Monto (USD)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetData.map((d, i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <TableCell className="pl-10 py-4 text-xs font-bold text-white/60 uppercase">{d.item}</TableCell>
                                            <TableCell className="text-right pr-10 font-mono font-black text-white italic">{formatCurrency(d.cost, 'USD')}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="bg-primary/10 border-none">
                                        <TableCell className="pl-10 py-8 text-xl font-black text-white italic uppercase tracking-tighter">Total Inversión Inicial</TableCell>
                                        <TableCell className="text-right pr-10 text-4xl font-mono font-black text-primary italic shadow-glow-text">
                                            {formatCurrency(budgetData.reduce((a, b) => a + b.cost, 0), 'USD')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    {/* FACTIBILIDAD */}
                    <TabsContent value="factibilidad" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-10 max-w-5xl mx-auto">
                            <div className="flex justify-end">
                                <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-secondary/30 text-secondary hover:bg-secondary/10" onClick={handleDownloadFactibilidad}>
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
                            <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/40">
                                <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3 text-white/90">
                                        <TrendingUp className="text-primary h-5 w-5" /> Proyección Operativa Quinquenal
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-white/[0.02] border-none">
                                                <TableHead className="pl-10 py-5 font-black uppercase text-[10px] tracking-widest text-white/40">Periodo</TableHead>
                                                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest text-white/40">Ingresos Brutos</TableHead>
                                                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest text-white/40">Utilidad Neta</TableHead>
                                                <TableHead className="text-right pr-10 font-black uppercase text-[10px] tracking-widest text-white/40">Margen</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {projections.map(row => (
                                                <TableRow key={row.year} className="border-white/5 hover:bg-primary/5 transition-colors">
                                                    <TableCell className="pl-10 font-black text-primary italic">AÑO 0{row.year}</TableCell>
                                                    <TableCell className="text-right font-mono text-sm font-bold text-white/70">{formatCurrency(row.revenue, 'USD')}</TableCell>
                                                    <TableCell className="text-right font-mono text-sm font-black text-white">{formatCurrency(row.profit, 'USD')}</TableCell>
                                                    <TableCell className="text-right pr-10">
                                                        <Badge variant="outline" className="text-[8px] font-black border-primary/20 text-primary bg-primary/5">
                                                            {formatPercentage(row.margin)}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* PROPUESTA */}
                    <TabsContent value="propuesta" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-black/40 max-w-5xl mx-auto">
                            <CardHeader className="p-12 text-center border-b border-white/5 bg-white/[0.01] space-y-6">
                                <div className="flex justify-end no-print">
                                    <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary hover:bg-primary/10" onClick={handleDownloadPropuesta}>
                                        <FileWord className="mr-2 h-4 w-4" /> DESCARGAR PROPUESTA (.DOC)
                                    </Button>
                                </div>
                                <div className="mx-auto w-fit bg-black p-6 rounded-[2.5rem] shadow-glow border border-primary/20"><Logo className="h-16 w-16" /></div>
                                <CardTitle className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white italic-shadow leading-tight">Ecosistema Kyron <br/> Eficiencia Sin Fronteras</CardTitle>
                                <CardDescription className="text-primary font-black uppercase tracking-[0.6em] text-xs">Propuesta Maestra de Gestión 2025</CardDescription>
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
                                <section className="bg-primary text-primary-foreground p-10 rounded-[3rem] shadow-glow relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="h-40 w-40" /></div>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-4 relative z-10"><Globe className="h-6 w-6" /> Ventaja Competitiva</h3>
                                    <ul className="space-y-4 relative z-10">
                                        {["Cumplimiento Predictivo: IA auditando cada factura en tiempo real.", "Inmutabilidad Blockchain: Registros a prueba de fiscalizaciones.", "Integración Total: Un único nodo para telecom, finanzas y leyes."].map((b, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm font-bold italic"><ChevronRight className="h-4 w-4 opacity-40" /> {b}</li>
                                        ))}
                                    </ul>
                                </section>
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
            </footer>
        </div>
    );
}
import React from "react";
