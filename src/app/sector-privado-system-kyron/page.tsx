"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  CheckCircle,
  ShieldCheck,
  Lock,
  Activity,
  QrCode,
  FileText,
  Table as TableIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview MODELO ZEDU - SYSTEM KYRON
 * Recreación exacta del formato de tablas institucionales con datos técnicos reales.
 */

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = () => {
        toast({
            title: "GENERANDO DOCUMENTO",
            description: "Exportando Modelo ZEDU en formato de alta fidelidad...",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
        window.print();
    };

    if (!isMounted) return null;

    const tableBorderStyle = "border border-black";
    const headerCellStyle = "bg-slate-50 text-black font-black uppercase p-3 text-xs border border-black";
    const contentCellStyle = "p-3 text-xs border border-black text-slate-900 bg-white";

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 selection:bg-blue-100">
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0 !important; }
                    .page-container { box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; }
                    table { width: 100% !important; border-collapse: collapse !important; margin-bottom: 20px !important; page-break-inside: avoid !important; }
                    td, th { border: 1pt solid black !important; padding: 8pt !important; font-size: 10pt !important; }
                    .header-cell { background-color: #f8fafc !important; font-weight: bold !important; text-transform: uppercase !important; }
                }
            `}</style>

            {/* BARRA DE NAVEGACIÓN UI */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <NextLink href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</NextLink>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white dark:bg-slate-900 border-slate-300 rounded-xl font-bold text-xs uppercase h-11 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR EXPEDIENTE
                    </Button>
                    <Button onClick={handleDownload} className="bg-black dark:bg-primary text-white hover:bg-slate-800 rounded-xl font-black text-xs uppercase h-11 px-8 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR MODELO ZEDU
                    </Button>
                </div>
            </div>

            {/* CONTENEDOR DEL DOCUMENTO (PAPEL FÍSICO) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="page-container max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 document-font text-black relative border border-slate-200 rounded-sm"
            >
                {/* ENCABEZADO INSTITUCIONAL */}
                <div className="flex justify-between items-start mb-16 border-b-4 border-black pb-8">
                    <div className="flex items-center gap-6">
                        <div className="p-3 border-2 border-black rounded-xl">
                            <Logo className="h-16 w-16" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none italic">System Kyron</h1>
                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mt-2">Corporate Intelligence Hub</p>
                            <p className="text-[10px] font-black text-primary mt-1 uppercase">Validación de Nodo Maestro • 2026</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="inline-block border-4 border-black p-4 bg-slate-50">
                            <h2 className="text-2xl font-black uppercase tracking-widest leading-none">MODELO ZEDU</h2>
                            <p className="text-[10px] font-bold uppercase mt-2 text-slate-500 tracking-tighter">EXPEDIENTE DE INGENIERÍA ESTRATÉGICA</p>
                        </div>
                        <p className="text-[9px] font-black uppercase mt-4 text-slate-400">REF: KYRON-ZEDU-2026-V2.6.5</p>
                    </div>
                </div>

                {/* 1. INFORMACIÓN DEL EQUIPO */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Activity className="h-4 w-4" /> 1. INFORMACIÓN DEL EQUIPO TÉCNICO
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>NOMBRE DEL PROYECTO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}><span className="text-lg font-black uppercase">SYSTEM KYRON • CORPORATE INTELLIGENCE</span></td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} className="w-1/2 bg-slate-50 border border-black font-black p-3 text-xs">INTEGRANTES (NODO MAESTRO)</td>
                                <td className={headerCellStyle} className="w-1/2 bg-slate-50 border border-black font-black p-3 text-xs">INSTITUCIÓN / SEDE</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="space-y-1 font-bold uppercase">
                                        <li>• Carlos Mattar (Lead Architecture)</li>
                                        <li>• Sebastian Garrido (Network Slicing)</li>
                                        <li>• Marcos Sousa (Operational Flow)</li>
                                    </ul>
                                </td>
                                <td className={contentCellStyle}>
                                    <p className="font-bold uppercase leading-relaxed">
                                        Colegio 'Gabriela Mistral'<br/>
                                        Catia la Mar, Estado La Guaira<br/>
                                        Venezuela
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 2. POBLACIÓN A TRABAJAR */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Users className="h-4 w-4" /> 2. POBLACIÓN A TRABAJAR (NÚCLEO ESTRATÉGICO)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>UBICACIÓN GEOGRÁFICA ESPECÍFICA</td>
                                <td className={headerCellStyle}>NOMBRE DE LA COMUNIDAD / EJE</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Catia la Mar, Municipio Vargas, La Guaira</td>
                                <td className={contentCellStyle}>Eje Comercial e Institucional de Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CANTIDAD TOTAL DE NODOS (HABITANTES)</td>
                                <td className={headerCellStyle}>DISTRIBUCIÓN POR GÉNERO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="text-base font-black">2.500 Nodos Activos</span></td>
                                <td className={contentCellStyle}>52% Femenino / 48% Masculino (Perfil Empresarial)</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>RANGO DE EDAD DOMINANTE</td>
                                <td className={headerCellStyle}>FACTOR CLIMÁTICO / IMPACTO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>18 - 65 Años (Población Económicamente Activa)</td>
                                <td className={contentCellStyle}>Tropical Costero (Alta Humedad/Salinidad: 85%+)</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>CARACTERÍSTICAS DEL GRUPO OBJETIVO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>
                                    Alta densidad transaccional, dependencia de procesos manuales vulnerables ante fiscalización y deterioro acelerado de archivos físicos debido al ambiente costero.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3. ANÁLISIS DEL PROBLEMA */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Lock className="h-4 w-4" /> 3. ANÁLISIS DEL PROBLEMA Y DIAGNÓSTICO
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DEFINICIÓN DEL PROBLEMA CENTRAL</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <p className="font-black italic text-sm leading-relaxed uppercase underline decoration-primary/20 decoration-4">
                                        "FRAGMENTACIÓN DE DATA OPERATIVA Y VULNERABILIDAD LEGAL POR EL USO DE REGISTROS FÍSICOS OBSOLETOS E INEXISTENCIA DE UN ECOSISTEMA INTEGRADO."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CAUSAS RAÍZ</td>
                                <td className={headerCellStyle}>CONSECUENCIAS CRÍTICAS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="list-disc pl-4 space-y-1 font-bold">
                                        <li>Ausencia de un Ledger centralizado.</li>
                                        <li>Procesos fiscales manuales.</li>
                                        <li>Falta de conectividad 5G dedicada.</li>
                                    </ul>
                                </td>
                                <td className={contentCellStyle}>
                                    <ul className="list-disc pl-4 space-y-1 font-bold">
                                        <li>Multas por errores de cálculo (SENIAT).</li>
                                        <li>Pérdida de integridad documental.</li>
                                        <li>Inestabilidad operativa en telecom.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> 4. SOLUCIÓN PROPUESTA: SYSTEM KYRON
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DESCRIPCIÓN TÉCNICA DE LA SOLUCIÓN</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Implementación de un Nodo de Inteligencia Centralizada bajo protocolo Zero-Knowledge, que unifica telecomunicaciones 5G, automatización fiscal predictiva y trazabilidad de activos mediante inducción magnética.
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>DIFERENCIADORES ESTRATÉGICOS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Integración 360° (Fiscal + Telecom + Sostenibilidad), Auditoría IA 24/7, Sellado Blockchain Inmutable y Hardware de Ingeniería propia (Smart Bins).
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. PRESUPUESTO */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <formatCurrency amount={0} /> 5. PRESUPUESTO OPERATIVO (CAPEX)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black text-center">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={headerCellStyle} className="p-3 text-[10px] font-black border border-black">ÍTEM DE INVERSIÓN</th>
                                <th className={headerCellStyle} className="p-3 text-[10px] font-black border border-black">CANT.</th>
                                <th className={headerCellStyle} className="p-3 text-[10px] font-black border border-black">COSTO UNIT (USD)</th>
                                <th className={headerCellStyle} className="p-3 text-[10px] font-black border border-black">TOTAL (USD)</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold uppercase">
                            <tr>
                                <td className={contentCellStyle} className="text-left p-3 border border-black">Infraestructura Cloud Ledger & Nodo 5G</td>
                                <td className={contentCellStyle} className="p-3 border border-black">01</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 15.000,00</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 15.000,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} className="text-left p-3 border border-black">Terminales Inteligentes de Gestión Pro</td>
                                <td className={contentCellStyle} className="p-3 border border-black">10</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 850,00</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 8.500,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} className="text-left p-3 border border-black">Módulo de Bóveda Digital Inmutable</td>
                                <td className={contentCellStyle} className="p-3 border border-black">01</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 4.200,00</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 4.200,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} className="text-left p-3 border border-black">Smart Bins (Inducción Magnética Síncrona)</td>
                                <td className={contentCellStyle} className="p-3 border border-black">04</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 1.295,75</td>
                                <td className={contentCellStyle} className="p-3 border border-black">$ 5.183,00</td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td className={contentCellStyle} className="text-right p-4 border border-black font-black text-sm" colSpan={3}>TOTAL INVERSIÓN PROYECTADA</td>
                                <td className={contentCellStyle} className="p-4 border border-black font-black text-sm text-primary">$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. ALIADOS */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> 6. ALIADOS Y RECURSOS ESTRATÉGICOS
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>ENTE / ORGANIZACIÓN</th>
                                <th className={headerCellStyle}>TIPO DE APOYO / VÍNCULO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">DIGITEL / CONATEL</span></td>
                                <td className={contentCellStyle}>Provisión de Espectro Radioeléctrico y Enlaces 5G</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">SENIAT</span></td>
                                <td className={contentCellStyle}>Validación de Procesos para Riesgo Fiscal Cero</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">SAMSUNG / THE FACTORY HKA</span></td>
                                <td className={contentCellStyle}>Terminales Pro y Hardware Fiscal Homologado</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">HOLDING KYRON</span></td>
                                <td className={contentCellStyle}>Capital de Riesgo y Soporte Técnico Nivel 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. PLAN DE ACCIÓN */}
                <div className="mb-12">
                    <h2 className="text-sm font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Activity className="h-4 w-4" /> 7. PLAN DE ACCIÓN (CRONOGRAMA DE DESPLIEGUE)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={headerCellStyle}>FASE OPERATIVA</th>
                                <th className={headerCellStyle}>RESPONSABLE</th>
                                <th className={headerCellStyle}>CRONOGRAMA</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold uppercase">
                            <tr>
                                <td className={contentCellStyle}>Auditoría Técnica y Censo en Catia la Mar</td>
                                <td className={contentCellStyle}>Equipo de Campo</td>
                                <td className={cn(contentCellStyle, "text-center")}>Semana 1</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Instalación de Nodo 5G y Configuración eSIM</td>
                                <td className={contentCellStyle}>Ing. S. Garrido</td>
                                <td className={cn(contentCellStyle, "text-center")}>Semana 2</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Despliegue de Bóveda y Migración de Datos</td>
                                <td className={contentCellStyle}>Ing. Carlos Mattar</td>
                                <td className={cn(contentCellStyle, "text-center")}>Semana 3</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Certificación Maestra y Lanzamiento Oficial</td>
                                <td className={contentCellStyle}>Auditores Kyron</td>
                                <td className={cn(contentCellStyle, "text-center")}>Semana 4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PIE DE DOCUMENTO / SELLOS */}
                <footer className="mt-24 pt-12 border-t-2 border-black flex justify-between items-end">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <QrCode className="h-20 w-20 opacity-80" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase">Contacto Maestro</p>
                                <p className="text-sm font-black italic">expedientes@systemkyron.com</p>
                                <p className="text-xs font-bold">www.systemkyron.com</p>
                            </div>
                        </div>
                        <div className="border-4 border-black p-3 bg-slate-50 inline-block font-black text-xs uppercase tracking-widest italic">
                            EXPEDIENTE MAESTRO VALIDADO • 2026
                        </div>
                    </div>
                    <div className="text-right space-y-4">
                        <div className="flex items-center justify-end gap-3 mb-6">
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Nodo Central: Activo</span>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-400">© 2026 SYSTEM KYRON • ALL RIGHTS RESERVED</p>
                    </div>
                </footer>

                {/* MARCA DE AGUA CONFIDENCIAL */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <div className="border-[20px] border-black rounded-full p-24">
                        <span className="text-[140px] font-black uppercase tracking-[0.5em] italic">CONFIDENCIAL</span>
                    </div>
                </div>
            </motion.div>

            {/* STATUS BAR BOTTOM */}
            <div className="max-w-5xl mx-auto mt-10 flex justify-center items-center gap-12 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.5em] opacity-60">
                <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> SECURE LEDGER</span>
                <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> 2.500 GLOBAL NODES</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> VERIFIED BY KYRON-ID</span>
            </div>
        </div>
    );
}
