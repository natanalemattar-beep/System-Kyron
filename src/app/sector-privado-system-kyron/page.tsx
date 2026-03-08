
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
  BarChart3,
  BookOpen,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";

const zeduMasterData = {
    header: "Modelo Zedu",
    sections: [
        {
            titulo: "INFORMACIÓN DEL EQUIPO",
            fields: [
                { label: "NOMBRE DEL PROYECTO", val: "System Kyron v2.6.5 - Ecosistema de Inteligencia Corporativa" },
                { label: "INTEGRANTES DEL EQUIPO", val: "Ing. Carlos Mattar, Lic. Beatriz Martínez, Abog. María Hernández" },
                { label: "INSTITUCIÓN EDUCATIVA", val: "Centro de Innovación Tecnológica Kyron" },
                { label: "PAÍS/CIUDAD", val: "Venezuela, Caracas / La Guaira" },
            ]
        },
        {
            titulo: "POBLACIÓN A TRABAJAR",
            fields: [
                { label: "PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA", val: "Venezuela, Caracas, Municipio Chacao / Estado La Guaira (ZEDU)" },
                { label: "NOMBRE DE LA COMUNIDAD", val: "Sector Comercial, Industrial y de Servicios de Misión Crítica" },
            ]
        },
        {
            titulo: "DIAGNÓSTICO PARTICIPATIVO",
            fields: [
                { label: "PROBLEMA CENTRAL", val: "Desconexión entre la gestión administrativa, el cumplimiento fiscal y la infraestructura de telecomunicaciones." },
                { label: "CAUSAS", val: "Dependencia de procesos manuales, volatilidad normativa y falta de conectividad de alta velocidad segura." },
                { label: "CONSECUENCIAS", val: "Riesgo de sanciones tributarias, ineficiencia operativa y pérdida de trazabilidad de activos." },
            ]
        },
        {
            titulo: "ANÁLISIS DE FACTIBILIDAD",
            fields: [
                { label: "FACTIBILIDAD TÉCNICA", val: "Disponibilidad de Red 5G, Tecnología de Inducción Magnética y Nodos de Cifrado AES-512." },
                { label: "FACTIBILIDAD ECONÓMICA", val: "VAN de $450k, TIR de 28.5% y ROI proyectado a 2.4 años." },
                { label: "FACTIBILIDAD LEGAL", val: "Cumplimiento total con Providencia SENIAT 0071, LOTEL y Ley de Protección de Pensiones." },
            ]
        }
    ]
};

const indicators = [
    { label: "Valor Actual Neto", value: 450000, icon: TrendingUp, desc: "VAN Proyectado" },
    { label: "Tasa Interna Retorno", value: 0.285, icon: Target, desc: "TIR 5 Años" },
    { label: "Retorno Inversión", value: "2.4 años", icon: Activity, desc: "Recuperación CapEx" },
];

const pillars = [
    { icon: Radio, title: "Conectividad 5G", desc: "Activación remota de eSIMs con latencia cero para flotas.", color: "text-blue-400" },
    { icon: Magnet, title: "Trazabilidad Magnética", desc: "Sensores de inducción para control inmutable de activos.", color: "text-emerald-400" },
    { icon: ShieldCheck, title: "Blindaje Fiscal IA", desc: "Auditoría en tiempo real contra cambios en Gaceta.", color: "text-amber-400" },
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
                            body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; line-height: 1.5; }
                            .doc-header { text-align: center; font-size: 18pt; font-weight: bold; text-decoration: underline; margin-bottom: 30px; }
                            .section-title { font-weight: bold; font-size: 12pt; margin-top: 25px; margin-bottom: 10px; }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                            th { border: 1px solid #000; padding: 10px; text-align: left; font-size: 10pt; font-weight: bold; background-color: #f2f2f2; }
                            td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 10pt; }
                            .footer { margin-top: 50px; text-align: center; font-size: 8pt; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
                        </style>
                    </head>
                    <body>
                        <div class="doc-header">${zeduMasterData.header}</div>
                `;

                let body = "";
                zeduMasterData.sections.forEach(sec => {
                    body += `<div class="section-title">${sec.titulo}</div>`;
                    body += `<table>`;
                    sec.fields.forEach(f => {
                        body += `<tr><th style="width: 35%;">${f.label}</th></tr>`;
                        body += `<tr><td>${f.val}</td></tr>`;
                    });
                    body += `</table>`;
                });

                body += `
                    <div class="section-title">PROPUESTA ESTRATÉGICA</div>
                    <p>Implementación del Ecosistema Kyron fundamentado en Conectividad 5G, Inducción Magnética y Blindaje Fiscal mediante Inteligencia Artificial.</p>
                    <div style="border: 2px solid #000; padding: 15px; margin-top: 20px;">
                        <strong>DICTAMEN MAESTRO:</strong> Viabilidad técnica y financiera absoluta. El modelo garantiza un cumplimiento normativo del 100% y una escalabilidad operativa superior para el sector privado.
                    </div>
                `;

                const footer = `<div class="footer">DOCUMENTO GENERADO POR SYSTEM KYRON • PROPIEDAD INTELECTUAL PROTEGIDA</div></body></html>`;
                
                const sourceHTML = header + body + footer;
                const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
                const fileDownload = document.createElement("a");
                document.body.appendChild(fileDownload);
                fileDownload.href = source;
                fileDownload.download = `MODELO_ZEDU_KYRON_COMPLETO.doc`;
                fileDownload.click();
                document.body.removeChild(fileDownload);
                
                setIsVerifying(false);
                setShowSeal(false);
                toast({
                    title: "EXPEDIENTE DESCARGADO",
                    description: "Dossier Maestro ZEDU generado bajo protocolo seguro.",
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
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Expediente <span className="text-primary italic">Maestro</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">ZEDU • Modelo de Implementación v2.6.5</p>
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
                    {/* DOCUMENTO MAESTRO ZEDU */}
                    <Card className="border-none rounded-[3rem] bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden relative p-8 md:p-20 text-black">
                        <AnimatePresence>
                            {showSeal && (
                                <motion.div 
                                    initial={{ scale: 3, opacity: 0, rotate: -45 }}
                                    animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]"
                                >
                                    <div className="p-12 border-[12px] border-primary/20 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center">
                                        <ShieldCheck className="h-32 w-32 text-primary/40" />
                                        <p className="text-2xl font-black text-primary/40 mt-4 uppercase tracking-[0.4em]">VERIFICADO</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-16 relative z-10">
                            <header className="text-center space-y-2 mb-20">
                                <Logo className="h-16 w-16 mx-auto mb-6 grayscale opacity-20" />
                                <h2 className="text-3xl font-bold uppercase tracking-tighter underline decoration-primary/20 underline-offset-8">{zeduMasterData.header}</h2>
                            </header>

                            {zeduMasterData.sections.map((sec, idx) => (
                                <section key={idx} className="space-y-8">
                                    <h3 className="text-lg font-black uppercase tracking-tight border-b-2 border-black/5 pb-2">{sec.titulo}</h3>
                                    <div className="grid gap-0 border border-black/10 rounded-xl overflow-hidden">
                                        {sec.fields.map((f, i) => (
                                            <div key={i} className="group border-b border-black/10 last:border-none">
                                                <div className="bg-slate-50 p-4 border-b border-black/5">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{f.label}</span>
                                                </div>
                                                <div className="p-6 bg-white">
                                                    <span className="text-sm font-bold text-slate-800 font-mono italic">{f.val}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}

                            <div className="p-12 rounded-[2rem] bg-primary/5 border-2 border-primary/10 shadow-inner relative overflow-hidden mt-20">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4" /> Dictamen Maestro de Viabilidad
                                </h4>
                                <p className="text-xl font-bold italic text-slate-700 leading-relaxed text-justify">
                                    "El análisis técnico y financiero realizado bajo los parámetros del Modelo ZEDU confirma una viabilidad del 100%. La arquitectura de Kyron neutraliza los riesgos operativos y asegura un crecimiento sostenible mediante la integración de activos digitales inmutables."
                                </p>
                            </div>
                        </div>

                        <footer className="mt-32 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                                <Activity className="h-4 w-4 animate-pulse" /> Sincronización Completa
                            </div>
                            <div className="flex gap-20">
                                <div className="text-center">
                                    <div className="w-40 h-[1px] bg-black mb-2" />
                                    <p className="text-[8px] font-bold uppercase">Firma del Director</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-40 h-[1px] bg-black mb-2" />
                                    <p className="text-[8px] font-bold uppercase">Sello de Nodo</p>
                                </div>
                            </div>
                        </footer>
                    </Card>
                </div>

                {/* BARRA LATERAL TÉCNICA */}
                <div className="lg:col-span-4 space-y-8 relative z-10 no-print">
                    <Card className="glass-card border-none p-10 rounded-[2.5rem] bg-primary text-white relative overflow-hidden shadow-glow group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Zap className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Estado Operativo</h3>
                        <p className="text-sm font-bold opacity-90 leading-relaxed italic text-justify relative z-10 mb-8 uppercase">
                            Dossier validado para implementación en el ejercicio fiscal 2026. Prioridad Nivel 5.
                        </p>
                        <Button variant="secondary" className="w-full h-14 rounded-2xl bg-white text-primary font-black uppercase text-[10px] tracking-widest shadow-2xl relative z-10">
                            SINCRONIZAR NODO <RefreshCw className="ml-3 h-4 w-4" />
                        </Button>
                    </Card>

                    <div className="grid grid-cols-1 gap-6">
                        {indicators.map((ind, i) => (
                            <Card key={i} className="glass-card border-none p-8 rounded-[2rem] bg-white/[0.02] flex items-center justify-between group hover:border-primary/20 transition-all shadow-xl">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20">{ind.label}</p>
                                    <p className="text-2xl font-black italic text-white group-hover:text-primary transition-colors">
                                        {typeof ind.value === 'number' ? (ind.value < 1 ? formatPercentage(ind.value) : formatCurrency(ind.value, 'USD')) : ind.value}
                                    </p>
                                </div>
                                <ind.icon className="h-8 w-8 text-primary/20 group-hover:scale-110 transition-transform" />
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic pl-4">Pilares de Ingeniería</h3>
                        <div className="grid gap-4">
                            {pillars.map((p, i) => (
                                <Card key={i} className="glass-card border-none p-6 rounded-2xl bg-white/[0.01] flex items-start gap-4">
                                    <p.icon className={cn("h-5 w-5 mt-1 shrink-0", p.color)} />
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-black uppercase text-white/80">{p.title}</h4>
                                        <p className="text-[9px] font-medium text-white/30 uppercase leading-snug">{p.desc}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

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
                </div>
            </div>
        </div>
    );
}
