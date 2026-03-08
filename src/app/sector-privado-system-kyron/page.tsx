
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  FileText as FileWord,
  Printer,
  Download,
  Activity,
  Terminal,
  Loader2,
  Zap,
  CheckCircle,
  Gavel,
  Target,
  TrendingUp,
  Lock,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  Radio,
  Magnet,
  Cpu,
  Globe,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";

const zeduMasterData = {
    titulo: "Expediente de Implementación Estratégica",
    id: "EXP-ZEDU-2026-X1",
    secciones: [
        {
            id: 1,
            titulo: "1. IDENTIFICACIÓN ESTRATÉGICA",
            filas: [
                { label: "Nombre del Proyecto", val: "Ecosistema System Kyron v2.6.5" },
                { label: "Dirección Técnica", val: "Ingeniería Maestra Kyron" },
                { label: "Centro de Operaciones", val: "Centro de Mando Digital" },
                { label: "Seguridad de Datos", val: "Cifrado AES-512 / Registro Inmutable" },
            ]
        },
        {
            id: 2,
            titulo: "2. ESTUDIO DE ALCANCE",
            filas: [
                { label: "Área de Despliegue", val: "Zonas Comerciales de Alta Densidad" },
                { label: "Impacto Proyectado", val: "500 Empresas / 5.000 Perfiles Digitales" },
                { label: "Público Objetivo", val: "Sector Privado, Franquicias y Holdings" },
            ]
        }
    ]
};

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Proyección flujo caja.", icon: TrendingUp },
    { label: "Tasa Interna Retorno (TIR)", value: 0.285, desc: "Rendimiento del capital.", icon: Target },
    { label: "Retorno Inversión (ROI)", value: "2.4 años", desc: "Recuperación de CapEx.", icon: Activity },
];

const projections = [
    { year: 1, revenue: 125000, profit: 40000, margin: 0.32 },
    { year: 2, revenue: 210000, profit: 100000, margin: 0.47 },
    { year: 3, revenue: 380000, profit: 240000, margin: 0.63 },
];

const pillars = [
    { icon: Radio, title: "Kyron 5G Connect", desc: "Activación remota de eSIMs con latencia cero.", color: "text-blue-400" },
    { icon: Magnet, title: "Inducción Magnética", desc: "Trazabilidad inmutable de activos y residuos.", color: "text-emerald-400" },
    { icon: ShieldCheck, title: "Blindaje Fiscal IA", desc: "Auditoría predictiva contra Gaceta Oficial.", color: "text-amber-400" },
];

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSeal, setShowSeal] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadExpediente = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setShowSeal(true);
            setTimeout(() => {
                const header = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head>
                        <meta charset='utf-8'>
                        <style>
                            body { font-family: 'Times New Roman', serif; padding: 40px; color: #0f172a; line-height: 1.4; }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #cbd5e1; }
                            th { background-color: #f1f5f9; border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 10pt; font-weight: bold; color: #334155; text-transform: uppercase; }
                            td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 11pt; }
                            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0ea5e9; padding-bottom: 15px; }
                            .title { color: #0ea5e9; font-size: 22pt; font-weight: bold; text-transform: uppercase; margin: 0; }
                            .section-title { color: #0369a1; font-weight: bold; text-transform: uppercase; font-size: 12pt; margin-top: 30px; margin-bottom: 10px; border-left: 4px solid #0ea5e9; padding-left: 10px; }
                            .dictamen { border: 2px solid #0ea5e9; padding: 20px; border-radius: 10px; margin-top: 30px; background-color: #f0f9ff; }
                            .footer { margin-top: 50px; text-align: center; font-size: 8pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-transform: uppercase; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <div class="title">SYSTEM KYRON</div>
                            <div style="font-size: 9pt; color: #64748b;">EXPEDIENTE ESTRATÉGICO • REF: MASTER-2026-PRO</div>
                        </div>
                        
                        <div class="section-title">I. Matriz de Implementación ZEDU</div>
                `;

                let body = "";
                zeduMasterData.secciones.forEach(sec => {
                    body += `<table><thead><tr><th colspan="2">${sec.titulo}</th></tr></thead><tbody>`;
                    sec.filas.forEach(f => {
                        body += `<tr><td style="width: 40%; font-weight: bold; background-color: #f8fafc;">${f.label}</td><td>${f.val}</td></tr>`;
                    });
                    body += `</tbody></table>`;
                });

                body += `
                    <div class="section-title">II. Análisis de Factibilidad Económica</div>
                    <table>
                        <thead><tr><th>Indicador</th><th>Valor Proyectado</th></tr></thead>
                        <tbody>
                            <tr><td>Valor Actual Neto (VAN)</td><td>${formatCurrency(450000, 'USD')}</td></tr>
                            <tr><td>Tasa Interna de Retorno (TIR)</td><td>${formatPercentage(0.285)}</td></tr>
                            <tr><td>Periodo de Recuperación</td><td>2.4 Años</td></tr>
                        </tbody>
                    </table>

                    <div class="section-title">III. Propuesta Técnica y Pilares</div>
                    <p>El proyecto se sustenta en tres ejes fundamentales de ingeniería:</p>
                    <ul>
                        <li><strong>Kyron 5G:</strong> Infraestructura de datos de alta fidelidad.</li>
                        <li><strong>Inducción Magnética:</strong> Trazabilidad digital de activos físicos.</li>
                        <li><strong>Blindaje IA:</strong> Auditoría fiscal automatizada 24/7.</li>
                    </ul>

                    <div class="dictamen">
                        <p style="font-style: italic; color: #0c4a6e; font-weight: bold; text-align: center;">DICTAMEN DE VIABILIDAD ABSOLUTA</p>
                        <p style="font-style: italic; color: #0c4a6e;">"Se certifica que la arquitectura técnica y financiera del Ecosistema Kyron cumple con los más altos estándares de eficiencia para el sector privado. La inmutabilidad de los registros y la escalabilidad del modelo garantizan un riesgo operativo tendiente a cero."</p>
                    </div>
                `;

                const footer = `<div class="footer">Documento Generado por Nodo Maestro System Kyron • 2026 • Confidencial</div></body></html>`;
                
                const sourceHTML = header + body + footer;
                const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
                const fileDownload = document.createElement("a");
                document.body.appendChild(fileDownload);
                fileDownload.href = source;
                fileDownload.download = `DOSSIER_MAESTRO_KYRON_PRO.doc`;
                fileDownload.click();
                document.body.removeChild(fileDownload);
                
                setIsVerifying(false);
                setShowSeal(false);
                toast({
                    title: "EXPEDIENTE DESCARGADO",
                    description: "Dossier completo generado con éxito.",
                    action: <CheckCircle className="text-primary h-4 w-4" />
                });
            }, 1000);
        }, 1500);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-16 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-16 min-h-screen relative bg-[#020202]">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] hud-grid" />

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-6 md:pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <Button variant="ghost" asChild className="mb-4 -ml-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">
                        <Link href="/"><ChevronLeft className="mr-2 h-3.5 w-3.5" /> VOLVER</Link>
                    </Button>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Terminal className="h-3 w-3" /> NODO ESTRATÉGICO
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Expediente <span className="text-primary italic">Corporativo</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">ZEDU • Factibilidad • Propuesta Técnica v2.6</p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> VISTA PREVIA
                    </Button>
                    <Button 
                        className="flex-1 md:flex-none btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl group" 
                        onClick={handleDownloadExpediente}
                        disabled={isVerifying}
                    >
                        {isVerifying ? (
                            <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                        ) : (
                            <FileWord className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                        )}
                        {isVerifying ? "VERIFICANDO..." : "DESCARGAR EXPEDIENTE"}
                    </Button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                <div className="lg:col-span-8 space-y-12">
                    {/* 1. SECCIÓN MATRIZ ZEDU */}
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl relative p-8 md:p-12">
                        <div className="space-y-12">
                            <header className="flex items-center justify-between border-b border-white/5 pb-8">
                                <div className="flex items-center gap-4">
                                    <Logo className="h-10 w-10 drop-shadow-glow" />
                                    <h2 className="text-xl font-black uppercase italic text-white tracking-tighter">Matriz de Implementación</h2>
                                </div>
                                <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg uppercase bg-primary/5 shadow-glow-sm">Fase 01</Badge>
                            </header>

                            {zeduMasterData.secciones.map((sec) => (
                                <section key={sec.id} className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-6">
                                        <div className="h-[1px] w-8 bg-primary/40" />
                                        {sec.titulo}
                                    </h3>
                                    <div className="grid gap-4">
                                        {sec.filas.map((f, i) => (
                                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4 group hover:bg-white/[0.02] transition-all rounded-lg p-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-primary/60 transition-colors">{f.label}</span>
                                                <span className="text-xs font-bold text-white/80 italic uppercase tracking-tight">{f.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </Card>

                    {/* 2. SECCIÓN FACTIBILIDAD ECONÓMICA */}
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl p-8 md:p-12">
                        <div className="space-y-12">
                            <header className="flex items-center gap-4 border-b border-white/5 pb-8">
                                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                    <BarChart3 className="h-6 w-6 text-emerald-400" />
                                </div>
                                <h2 className="text-xl font-black uppercase italic text-white tracking-tighter">Factibilidad Económica</h2>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {indicators.map((ind, i) => (
                                    <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-emerald-500/30 transition-all">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-3 group-hover:text-emerald-400/60 transition-colors">{ind.label}</p>
                                        <p className="text-2xl font-black italic text-white">
                                            {typeof ind.value === 'number' ? (ind.value < 1 ? formatPercentage(ind.value) : formatCurrency(ind.value, 'USD')) : ind.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border border-white/5 rounded-[2rem] overflow-hidden bg-black/40">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-white/[0.02] border-none">
                                            <TableHead className="pl-10 py-5 font-black uppercase text-[9px] tracking-widest text-white/30">Periodo</TableHead>
                                            <TableHead className="text-right font-black uppercase text-[9px] tracking-widest text-white/30">Ingresos</TableHead>
                                            <TableHead className="text-right pr-10 font-black uppercase text-[9px] tracking-widest text-white/30">Margen</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projections.map(row => (
                                            <TableRow key={row.year} className="border-white/5 hover:bg-emerald-500/5 transition-colors group">
                                                <TableCell className="pl-10 font-black text-emerald-400 italic">AÑO 0{row.year}</TableCell>
                                                <TableCell className="text-right font-mono text-sm font-bold text-white/70">{formatCurrency(row.revenue, 'USD')}</TableCell>
                                                <TableCell className="text-right pr-10">
                                                    <Badge variant="outline" className="text-[8px] font-black border-emerald-500/20 text-emerald-400 bg-emerald-500/5">{formatPercentage(row.margin)}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </Card>

                    {/* 3. SECCIÓN PROPUESTA DE PROYECTO */}
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl p-8 md:p-12">
                        <div className="space-y-12">
                            <header className="flex items-center gap-4 border-b border-white/5 pb-8">
                                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-xl font-black uppercase italic text-white tracking-tighter">Propuesta Estratégica</h2>
                            </header>

                            <div className="grid md:grid-cols-3 gap-6">
                                {pillars.map((p, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                            <p.icon className="h-16 w-16" />
                                        </div>
                                        <p.icon className={cn("h-8 w-8 mb-6", p.color)} />
                                        <h4 className="font-black uppercase text-xs tracking-widest text-white mb-3 italic">{p.title}</h4>
                                        <p className="text-[9px] font-bold text-white/30 uppercase leading-relaxed">{p.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/20 shadow-inner relative overflow-hidden group">
                                <AnimatePresence>
                                    {showSeal && (
                                        <motion.div 
                                            initial={{ scale: 2, opacity: 0, rotate: -45 }}
                                            animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]"
                                        >
                                            <div className="p-8 border-4 border-primary/40 rounded-full bg-black/40 backdrop-blur-sm flex flex-col items-center">
                                                <ShieldCheck className="h-16 w-16 text-primary" />
                                                <p className="text-[10px] font-black text-primary mt-2">CERTIFICADO</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4" /> Dictamen de Viabilidad Maestro
                                </h4>
                                <p className="text-lg font-bold italic text-white/70 leading-relaxed text-justify relative z-10">
                                    "El ecosistema System Kyron representa la culminación de la ingeniería fiscal y tecnológica aplicada. La integración de los nodos de conectividad y el registro inmutable garantizan una escalabilidad sin precedentes para la gran empresa."
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* BARRA LATERAL ESTRATÉGICA */}
                <div className="lg:col-span-4 space-y-8 relative z-10">
                    <Card className="glass-card border-none p-10 rounded-[2.5rem] bg-primary text-white relative overflow-hidden shadow-glow group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Zap className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Estado Maestro</h3>
                        <p className="text-sm font-bold opacity-90 leading-relaxed italic text-justify relative z-10 mb-8 uppercase">
                            Dossier de gestión validado para el ejercicio fiscal 2026. Prioridad Nivel 5 activada.
                        </p>
                        <Button variant="secondary" className="w-full h-14 rounded-2xl bg-white text-primary font-black uppercase text-[10px] tracking-widest shadow-2xl relative z-10">
                            SINCRONIZAR NODO <RefreshCw className="ml-3 h-4 w-4" />
                        </Button>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.01] rounded-[2.5rem] p-8 border border-white/5">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3 italic">
                                <Lock className="h-4 w-4" /> Bóveda de Protección
                            </CardTitle>
                        </CardHeader>
                        <div className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-white/20">
                            <div className="flex justify-between border-b border-white/5 pb-2"><span>Encriptación:</span> <span className="text-white/60">AES-512</span></div>
                            <div className="flex justify-between border-b border-white/5 pb-2"><span>Certificación:</span> <span className="text-white/60">Ledger Kyron</span></div>
                            <div className="flex justify-between"><span>Acceso:</span> <span className="text-primary font-black">Nivel Maestro</span></div>
                        </div>
                    </Card>

                    <div className="p-6 text-center opacity-20 italic">
                        <Logo className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-[8px] font-black uppercase tracking-[0.5em]">System Kyron v2.6.5 • Engineering Node</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
