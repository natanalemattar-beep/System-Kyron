
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
  CheckCircle,
  Gavel,
  Target,
  TrendingUp,
  Lock,
  ChevronLeft,
  Radio,
  Magnet,
  Cpu,
  Globe,
  BarChart3,
  BookOpen,
  Users,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Usar next/link estándar para evitar error de contexto intl en ruta raíz

const zeduMasterData = {
    header: "MODELO DE EXPEDIENTE TÉCNICO ZEDU (ZONA ECONÓMICA DIGITAL UNIFICADA)",
    sections: [
        {
            titulo: "1. INFORMACIÓN DEL EQUIPO",
            fields: [
                { label: "NOMBRE DEL PROYECTO", val: "System Kyron v2.6.5: Ecosistema de Inteligencia Corporativa y Convergencia Digital" },
                { label: "INTEGRANTES DEL EQUIPO", val: "Ing. Carlos Mattar, Lic. Beatriz Martínez, Abog. María Hernández" },
                { label: "INSTITUCIÓN EDUCATIVA", val: "Centro de Innovación Tecnológica Kyron / Sector Privado" },
                { label: "PAÍS / CIUDAD", val: "Venezuela, Caracas / Distrito Capital" },
            ]
        },
        {
            titulo: "2. POBLACIÓN A TRABAJAR",
            fields: [
                { label: "PAÍS / CIUDAD / MUNICIPIO / LOCALIDAD ESPECÍFICA", val: "Venezuela, Municipio Chacao y Estado La Guaira (Zona Económica Especial)" },
                { label: "NOMBRE DE LA COMUNIDAD", val: "Sector Comercial, Industrial y PYMES de Misión Crítica" },
            ]
        },
        {
            titulo: "3. DIAGNÓSTICO PARTICIPATIVO",
            fields: [
                { label: "PROBLEMA CENTRAL", val: "Desconexión estructural entre la gestión administrativa, el cumplimiento fiscal obligatorio y la infraestructura de telecomunicaciones segura." },
                { label: "CAUSAS", val: "Dependencia de sistemas manuales obsoletos, falta de conectividad 5G dedicada y alta volatilidad en la normativa tributaria nacional." },
                { label: "CONSECUENCIAS", val: "Riesgo inminente de sanciones fiscales (SENIAT), ineficiencia en el flujo de caja y pérdida de trazabilidad de activos operativos." },
            ]
        },
        {
            titulo: "4. ANÁLISIS DE FACTIBILIDAD",
            fields: [
                { label: "FACTIBILIDAD TÉCNICA", val: "Disponibilidad de infraestructura Cloud Ledger, Red 5G Slicing y tecnología de sensores magnéticos para reciclaje." },
                { label: "FACTIBILIDAD ECONÓMICA", val: "Proyección financiera con VAN positivo de $450,000 y recuperación de inversión inicial en 2.4 años." },
                { label: "FACTIBILIDAD SOCIAL", val: "Generación de empleo técnico calificado y democratización del acceso a tecnologías financieras para pequeños comercios." },
                { label: "FACTIBILIDAD LEGAL", val: "Cumplimiento garantizado con la Providencia SENIAT 0071, LOTEL y la Ley de Protección de Pensiones 2024." },
                { label: "FACTIBILIDAD AMBIENTAL", val: "Reducción masiva de huella de carbono mediante el sistema de incentivos por reciclaje magnético 'Puntos Verdes'." },
            ]
        },
        {
            titulo: "5. PROPUESTA TÉCNICA",
            fields: [
                { label: "TÍTULO DE LA PROPUESTA", val: "Implementación del Ecosistema Integral de Gestión Kyron" },
                { label: "DESCRIPCIÓN DE LA PROPUESTA", val: "Fusión de software SaaS para contabilidad, hardware fiscal homologado, telecomunicaciones 5G y billetera digital basada en Blockchain." },
                { label: "OBJETIVO GENERAL", val: "Transformar la operatividad del sector privado venezolano mediante una plataforma de inteligencia corporativa con riesgo fiscal cero." },
                { label: "OBJETIVOS ESPECÍFICOS", val: "1. Automatizar el 100% de los libros fiscales. 2. Desplegar nodos de conectividad 5G. 3. Monetizar la gestión de residuos sólidos." },
            ]
        }
    ]
};

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
                            body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; line-height: 1.2; }
                            .doc-header { text-align: center; font-size: 14pt; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                            th { border: 1px solid #000; padding: 8px; text-align: left; font-size: 10pt; background-color: #e5e7eb; font-weight: bold; color: #000; }
                            td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 10pt; font-family: 'Courier New', monospace; }
                            .section-break { height: 10px; }
                            .footer { margin-top: 40px; text-align: center; font-size: 8pt; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
                        </style>
                    </head>
                    <body>
                        <div class="doc-header">${zeduMasterData.header}</div>
                `;

                let body = "";
                zeduMasterData.sections.forEach(sec => {
                    body += `<table><tr><th style="background-color: #000; color: #fff; font-size: 11pt;">${sec.titulo}</th></tr></table>`;
                    sec.fields.forEach(f => {
                        body += `<table>
                            <tr><th style="width: 100%;">${f.label}</th></tr>
                            <tr><td>${f.val}</td></tr>
                        </table><div class="section-break"></div>`;
                    });
                });

                body += `
                    <div style="margin-top: 30px; border: 3px double #000; padding: 20px; text-align: center; background-color: #f9fafb;">
                        <h3 style="margin: 0; font-size: 14pt;">DICTAMEN TÉCNICO MAESTRO</h3>
                        <p style="font-size: 11pt; margin-top: 10px;">PROYECTO VALIDADO PARA EJECUCIÓN INMEDIATA - RIESGO FISCAL NEUTRALIZADO</p>
                    </div>
                `;

                const footer = `<div class="footer">KYRON CORPORATE INTELLIGENCE • PROPIEDAD INTELECTUAL N° 2026-SR-998</div></body></html>`;
                
                const sourceHTML = header + body + footer;
                const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
                const fileDownload = document.createElement("a");
                document.body.appendChild(fileDownload);
                fileDownload.href = source;
                fileDownload.download = `MODELO_ZEDU_KYRON_FINAL.doc`;
                fileDownload.click();
                document.body.removeChild(fileDownload);
                
                setIsVerifying(false);
                setShowSeal(false);
                toast({
                    title: "EXPEDIENTE DESCARGADO",
                    description: "Dossier Maestro ZEDU generado bajo protocolo seguro.",
                    action: <CheckCircle className="text-primary h-4 w-4" />
                });
            }, 800);
        }, 1200);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-16 min-h-screen relative bg-[#020202]">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] hud-grid" />

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-6 md:pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <Button variant="ghost" asChild className="mb-4 -ml-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">
                        <Link href="/"><ChevronLeft className="mr-2 h-3.5 w-3.5" /> VOLVER AL NODO</Link>
                    </Button>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Terminal className="h-3 w-3" /> NODO ESTRATÉGICO
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Expediente <span className="text-primary italic">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Zona Económica Digital Unificada v2.6.5</p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
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
                        {isVerifying ? "PROCESANDO..." : "DESCARGAR MODELO"}
                    </Button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* DOCUMENTO FÍSICO SIMULADO */}
                <Card className="border-none rounded-[3rem] bg-white shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative p-8 md:p-20 text-black font-sans">
                    <AnimatePresence>
                        {showSeal && (
                            <motion.div 
                                initial={{ scale: 3, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]"
                            >
                                <div className="p-16 border-[16px] border-primary/20 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center">
                                    <ShieldCheck className="h-40 w-40 text-primary/30" />
                                    <p className="text-3xl font-black text-primary/30 mt-4 uppercase tracking-[0.5em]">CERTIFICADO</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-12 relative z-10">
                        <header className="text-center space-y-4 mb-16 border-b-4 border-black pb-8">
                            <Logo className="h-16 w-16 mx-auto mb-4 grayscale" />
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">{zeduMasterData.header}</h2>
                        </header>

                        {zeduMasterData.sections.map((sec, idx) => (
                            <section key={idx} className="space-y-4">
                                <h3 className="text-lg font-black uppercase tracking-widest bg-black text-white px-6 py-2 rounded-sm">{sec.titulo}</h3>
                                <div className="grid gap-4">
                                    {sec.fields.map((f, i) => (
                                        <div key={i} className="border-2 border-black/10 rounded-lg overflow-hidden">
                                            <div className="bg-slate-100 px-4 py-2 border-b-2 border-black/5">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{f.label}</span>
                                            </div>
                                            <div className="p-5 bg-white">
                                                <span className="text-sm font-bold text-slate-900 font-mono italic leading-relaxed">{f.val}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}

                        <div className="mt-20 p-10 border-4 border-black border-double bg-slate-50 text-center space-y-4">
                            <h4 className="text-xl font-black uppercase tracking-tighter italic">DICTAMEN TÉCNICO DE MISIÓN CRÍTICA</h4>
                            <p className="text-sm font-bold italic text-slate-700 leading-relaxed uppercase tracking-tight">
                                Este expediente ha sido analizado por el motor de inteligencia kyron v2.6. se dictamina viabilidad absoluta para el sector privado nacional.
                            </p>
                        </div>

                        <footer className="mt-32 pt-10 border-t-2 border-black/10 flex flex-col md:flex-row justify-between items-center gap-10 opacity-60">
                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-black">
                                <Activity className="h-4 w-4" /> INTEGRIDAD DE DATOS 100%
                            </div>
                            <div className="flex gap-20">
                                <div className="text-center space-y-2">
                                    <div className="w-40 h-[1px] bg-black mx-auto" />
                                    <p className="text-[8px] font-black uppercase">DIRECCIÓN TÉCNICA</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-40 h-[1px] bg-black mx-auto" />
                                    <p className="text-[8px] font-black uppercase">SELLO DE NODO</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </Card>
            </div>

            {/* MARCADORES HUD LATERALES (Solo Pantalla) */}
            <div className="fixed right-10 top-1/2 -translate-y-1/2 space-y-6 hidden xl:block no-print opacity-20">
                {[TrendingUp, Target, ShieldCheck].map((Icon, i) => (
                    <div key={i} className="p-4 border border-primary/20 rounded-full bg-primary/5">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                ))}
            </div>
        </div>
    );
}
