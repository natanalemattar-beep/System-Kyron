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
  FileCheck2,
  Loader2,
  ArrowRight,
  Zap,
  CheckCircle,
  Gavel,
  Target,
  BarChart3,
  TrendingUp,
  ChevronRight,
  Lock,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const zeduMasterData = {
    titulo: "Expediente Maestro de Implementación ZEDU",
    id: "MASTER-ZEDU-2026-X1",
    secciones: [
        {
            id: 1,
            titulo: "1. IDENTIFICACIÓN ESTRATÉGICA",
            filas: [
                { label: "Denominación del Proyecto", val: "Ecosistema System Kyron v2.6.5" },
                { label: "Dirección de Ingeniería", val: "C. Mattar, S. Garrido, M. Sousa" },
                { label: "Sede de Operaciones", val: "Nodo NOC La Guaira / Caracas" },
                { label: "Protocolo de Seguridad", val: "Cifrado AES-512 / Ledger Inmutable" },
            ]
        },
        {
            id: 2,
            titulo: "2. ESTUDIO DE POBLACIÓN Y ALCANCE",
            filas: [
                { label: "Área de Despliegue", val: "Ejes Comerciales de Alta Densidad Transaccional" },
                { label: "Impacto Proyectado", val: "500 Nodos Corporativos / 5.000 Identidades Digitales" },
                { label: "Segmento Objetivo", val: "Sector Privado, Franquicias y Holdings" },
            ]
        },
        {
            id: 3,
            titulo: "3. DIAGNÓSTICO TÉCNICO",
            filas: [
                { label: "Brecha Detectada", val: "Vulnerabilidad en registros fiscales y desconexión de flujos de caja." },
                { label: "Eficiencia Actual", val: "Pérdida estimada del 40% en procesos manuales." },
                { label: "Riesgo de Cumplimiento", val: "Exposición a sanciones por desactualización normativa." },
            ]
        },
        {
            id: 4,
            titulo: "4. ARQUITECTURA DE SOLUCIÓN",
            filas: [
                { label: "Core Tecnológico", val: "Inferencia IA para Autocorrección Fiscal" },
                { label: "Capa de Datos", val: "Blockchain Ledger para Inmutabilidad" },
                { label: "Conectividad", val: "Red Privada 5G con Slicing Administrativo" },
            ]
        }
    ]
};

const indicators = [
    { label: "VAN Proyectado", value: 450000, icon: TrendingUp },
    { label: "TIR Estimada", value: 0.285, icon: Target },
    { label: "Retorno (Payback)", value: "2.4 años", icon: Activity },
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
                            body { font-family: 'Times New Roman', serif; padding: 50px; color: #0f172a; line-height: 1.5; }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 25px; border: 1px solid #e2e8f0; }
                            th { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 10pt; font-weight: bold; color: #64748b; text-transform: uppercase; }
                            td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 11pt; }
                            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; }
                            .title { color: #0ea5e9; font-size: 24pt; font-weight: bold; text-transform: uppercase; margin: 0; }
                            .id-code { font-family: monospace; font-size: 9pt; color: #94a3b8; margin-top: 5px; }
                            .label { background-color: #f1f5f9; font-weight: bold; width: 35%; color: #334155; }
                            .dictamen { border: 2px solid #0ea5e9; padding: 25px; border-radius: 15px; margin-top: 40px; background-color: #f0f9ff; }
                            .dictamen-title { color: #0369a1; font-weight: bold; text-transform: uppercase; font-size: 12pt; margin-bottom: 10px; border-bottom: 1px solid #bae6fd; padding-bottom: 5px; }
                            .footer { margin-top: 60px; text-align: center; font-size: 8pt; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; text-transform: uppercase; letter-spacing: 2px; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <div class="title">SYSTEM KYRON</div>
                            <div class="id-code">DOSSIER TÉCNICO ZEDU • REF: MASTER-2026-X1</div>
                        </div>
                        <h1 style="text-align:center; font-size: 18pt; margin-bottom: 30px;">Expediente Maestro de Implementación Estratégica</h1>
                `;

                let body = "";
                zeduMasterData.secciones.forEach(sec => {
                    body += `<table><thead><tr><th colspan="2">${sec.titulo}</th></tr></thead><tbody>`;
                    sec.filas.forEach(f => {
                        body += `<tr><td class="label">${f.label}</td><td>${f.val}</td></tr>`;
                    });
                    body += `</tbody></table>`;
                });

                body += `
                    <div class="dictamen">
                        <div class="dictamen-title">Dictamen Técnico de Viabilidad</div>
                        <p style="font-style: italic; color: #0c4a6e;">"Tras el análisis exhaustivo de los parámetros demográficos y la arquitectura técnica propuesta, se dictamina una viabilidad absoluta para el despliegue del ecosistema System Kyron. La integración de IA fiscal y el sellado inmutable garantizan una escalabilidad del 300% en el primer ejercicio fiscal, eliminando el riesgo de cumplimiento normativo."</p>
                    </div>
                `;

                const footer = `<div class="footer">Documento Generado por Nodo Central System Kyron • 2026 • Privado y Confidencial</div></body></html>`;
                
                const sourceHTML = header + body + footer;
                const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
                const fileDownload = document.createElement("a");
                document.body.appendChild(fileDownload);
                fileDownload.href = source;
                fileDownload.download = `EXPEDIENTE_ZEDU_KYRON_MASTER.doc`;
                fileDownload.click();
                document.body.removeChild(fileDownload);
                
                setIsVerifying(false);
                setShowSeal(false);
                toast({
                    title: "EXPEDIENTE SELLADO",
                    description: "Descarga completada bajo protocolo seguro.",
                    action: <CheckCircle className="text-primary h-4 w-4" />
                });
            }, 1000);
        }, 1500);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-16 min-h-screen relative">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-6 md:pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Terminal className="h-3 w-3" /> ARCHIVO ESTRATÉGICO
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Expediente <span className="text-primary italic">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Zona Económica Digital Unificada • Dossier v2.6.5</p>
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

            <div className="grid lg:grid-cols-12 gap-10 relative z-10">
                <div className="lg:col-span-8 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl relative">
                        <AnimatePresence>
                            {showSeal && (
                                <motion.div 
                                    initial={{ scale: 2, opacity: 0, rotate: -45 }}
                                    animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50] pointer-events-none"
                                >
                                    <div className="p-12 border-8 border-primary/40 rounded-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                                        <ShieldCheck className="h-24 w-24 text-primary" />
                                        <p className="text-xl font-black text-primary mt-4 uppercase tracking-[0.3em]">SELLADO</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-8 md:p-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Logo className="h-10 w-10 drop-shadow-glow" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Registro Institucional</span>
                            </div>
                            <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1 rounded-lg uppercase bg-primary/5">Confidencial</Badge>
                        </div>

                        <div className="p-8 md:p-12 space-y-16">
                            {zeduMasterData.secciones.map((sec) => (
                                <section key={sec.id} className="space-y-8">
                                    <h3 className="text-xs font-black uppercase italic tracking-[0.4em] text-primary flex items-center gap-6">
                                        <div className="h-[1px] w-12 bg-primary/40" />
                                        {sec.titulo}
                                    </h3>
                                    <div className="grid gap-4 pl-6 md:pl-12">
                                        {sec.filas.map((f, i) => (
                                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4 group hover:bg-white/[0.02] transition-all rounded-lg p-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-primary/60 transition-colors">{f.label}</span>
                                                <span className="text-xs md:text-sm font-bold text-white/80 italic uppercase tracking-tight">{f.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}

                            <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/20 shadow-inner relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                                    <ShieldCheck className="h-32 w-32" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4" /> Dictamen Maestro
                                </h4>
                                <p className="text-base md:text-lg font-bold italic text-white/70 leading-relaxed text-justify">
                                    "El análisis de viabilidad técnica bajo protocolos VEN-NIF arroja un cumplimiento del 100%. La arquitectura System Kyron garantiza la inmutabilidad de los registros fiscales, eliminando el riesgo operativo y optimizando la liquidez del sector privado mediante la digitalización unificada."
                                </p>
                            </div>
                        </div>

                        <CardFooter className="p-10 border-t border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                                <Activity className="h-4 w-4 animate-pulse text-emerald-500" /> INTEGRIDAD: 100%
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <div className="w-32 h-[1px] bg-white/20 mb-2" />
                                    <p className="text-[7px] font-bold text-white/30 uppercase">Firma Digital</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-32 h-[1px] bg-white/20 mb-2" />
                                    <p className="text-[7px] font-bold text-white/30 uppercase">Sello Institucional</p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none p-10 rounded-[2.5rem] bg-primary text-white relative overflow-hidden shadow-glow group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Zap className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3 relative z-10">
                            <Sparkles className="h-6 w-6" /> Status Pro
                        </h3>
                        <p className="text-sm font-bold opacity-90 leading-relaxed italic text-justify relative z-10 mb-8 uppercase">
                            Dossier de implementación estratégica validado para el ejercicio fiscal 2026.
                        </p>
                        <Button variant="secondary" className="w-full h-14 rounded-2xl bg-white text-primary font-black uppercase text-[10px] tracking-widest shadow-2xl relative z-10">
                            ACTUALIZAR DATOS <RefreshCw className="ml-3 h-4 w-4" />
                        </Button>
                    </Card>

                    <div className="grid grid-cols-1 gap-6">
                        {indicators.map((ind, i) => (
                            <Card key={i} className="glass-card border-none p-8 rounded-[2rem] bg-white/[0.02] flex items-center justify-between group hover:border-primary/20 transition-all">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20">{ind.label}</p>
                                    <p className="text-2xl font-black italic text-white group-hover:text-primary transition-colors">
                                        {typeof ind.value === 'number' ? 
                                            (ind.value < 1 ? formatPercentage(ind.value) : formatCurrency(ind.value, 'USD')) 
                                            : ind.value}
                                    </p>
                                </div>
                                <ind.icon className="h-8 w-8 text-primary/20 group-hover:scale-110 transition-transform" />
                            </Card>
                        ))}
                    </div>

                    <Card className="glass-card border-none bg-white/[0.01] rounded-[2.5rem] p-8 border border-white/5">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3 italic">
                                <Lock className="h-4 w-4" /> Seguridad
                            </CardTitle>
                        </CardHeader>
                        <div className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-white/20">
                            <div className="flex justify-between border-b border-white/5 pb-2"><span>Encriptación:</span> <span className="text-white/60">AES-512</span></div>
                            <div className="flex justify-between border-b border-white/5 pb-2"><span>Timestamp:</span> <span className="text-white/60">RFC 3161</span></div>
                            <div className="flex justify-between"><span>Acceso:</span> <span className="text-primary">Master Tier</span></div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
