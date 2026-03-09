
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  CheckCircle,
  ShieldCheck,
  Lock,
  Activity,
  QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview MODELO ZEDU SYSTEM KYRON - ESTRUCTURA EXACTA DE TABLAS
 * Recreación fiel de las imágenes proporcionadas por el usuario.
 */

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = () => {
        toast({
            title: "DESCARGA INICIADA",
            description: "Generando documento con formato oficial de tablas...",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
        window.print();
    };

    if (!isMounted) return null;

    const tableBorderStyle = "border border-black";
    const headerCellStyle = "bg-white text-black font-black uppercase p-3 text-sm border border-black";
    const contentCellStyle = "p-3 text-sm border border-black text-slate-800";

    return (
        <div className="min-h-screen bg-slate-200 py-12 px-4 selection:bg-blue-100">
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .page-container { box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; }
                    table { page-break-inside: auto; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                }
                .document-font { font-family: 'Inter', sans-serif; }
            `}</style>

            {/* UI NAVIGATION */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-black">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-xs uppercase h-10 px-6">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownload} className="bg-black text-white hover:bg-slate-800 rounded-xl font-bold text-xs uppercase h-10 px-8 shadow-lg">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR .DOC
                    </Button>
                </div>
            </div>

            {/* DOCUMENT BODY */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="page-container max-w-4xl mx-auto bg-white shadow-2xl p-12 md:p-20 document-font text-black relative"
            >
                {/* TOP CLASSIFICATION */}
                <div className="flex justify-between items-center mb-12 border-b-2 border-black pb-4">
                    <div className="flex items-center gap-4">
                        <Logo className="h-12 w-12" />
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none italic">System Kyron</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Corporate Intelligence Hub</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="inline-block border-2 border-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                            EXPEDIENTE MAESTRO
                        </div>
                        <p className="text-[9px] font-bold uppercase mt-2 text-slate-400">REF: KYRON-ZEDU-2026-V2.6.5</p>
                    </div>
                </div>

                {/* 1. INFORMACIÓN DEL EQUIPO */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">1. INFORMACIÓN DEL EQUIPO</h2>
                    <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>NOMBRE DEL PROYECTO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>SYSTEM KYRON</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>INTEGRANTES</td>
                                <td className={headerCellStyle}>INSTITUCIÓN</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="list-none p-0 m-0">
                                        <li>• Carlos Mattar (Lead Architecture)</li>
                                        <li>• Sebastian Garrido (Network Slicing)</li>
                                        <li>• Marcos Sousa (Operational Flow)</li>
                                    </ul>
                                </td>
                                <td className={contentCellStyle}>Colegio 'Gabriela Mistral'</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>Venezuela, La Guaira, Catia la Mar</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 2. POBLACIÓN A TRABAJAR */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">2. POBLACIÓN A TRABAJAR</h2>
                    <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Venezuela, La Guaira, Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>NOMBRE DE LA COMUNIDAD</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Eje Comercial e Institucional de Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CANTIDAD TOTAL DE HABITANTES</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>2.500 Nodos (Empresas y Contribuyentes Activos)</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CANTIDAD DE HABITANTES POR GÉNERO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Distribución corporativa: 52% Femenino / 48% Masculino (Estimado)</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CANTIDAD DE HABITANTES POR EDAD</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>18 - 65 años (Población Económicamente Activa)</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CARACTERISTICAS DE LA POBLACIÓN</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Alta densidad transaccional, dependencia de procesos manuales vulnerables, sector comercial pujante con necesidad de digitalización.</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CLIMA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Tropical Costero. Alta humedad (85%+) y salinidad, lo que acelera el deterioro de archivos físicos.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3. ANÁLISIS DEL PROBLEMA */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">3. ANÁLISIS DEL PROBLEMA</h2>
                    <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DEFINICIÓN DEL PROBLEMA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <p className="font-bold italic">"Inexistencia de un ecosistema tecnológico integrado que unifique las telecomunicaciones, el cumplimiento fiscal y la gestión de activos, forzando la dependencia de procesos manuales vulnerables."</p>
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CAUSAS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Fragmentación de data operativa, falta de un Ledger centralizado inmutable y dependencia de infraestructura de comunicaciones obsoleta.
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CONSECUENCIAS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Multas fiscales por errores humanos, deterioro de documentos por clima, pérdida de competitividad regional y vulnerabilidad ante auditorías.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">4. SOLUCIÓN PROPUESTA</h2>
                    <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DESCRIPCIÓN DE LA SOLUCIÓN: SYSTEM KYRON</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Implementación de un Nodo de Inteligencia Centralizada basado en una Bóveda Digital Inmutable (Zero-Knowledge), soportada por conectividad 5G y hardware de inducción magnética.
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>DIFERENCIADORES CLAVE</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Integración total (Telecom + Fiscal + Legal), IA predictiva de cumplimiento SENIAT, sellado Blockchain de transacciones y hardware propio (Smart Bins).
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. PRESUPUESTO */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">5. PRESUPUESTO OPERATIVO (CAPEX)</h2>
                    <table className="w-full border-collapse border border-black">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className={headerCellStyle}>ÍTEM DE INVERSIÓN</th>
                                <th className={headerCellStyle}>COSTO (USD)</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold">
                            <tr>
                                <td className={contentCellStyle}>Infraestructura Telecom 5G (Contrato Mayorista)</td>
                                <td className={cn(contentCellStyle, "text-right")}>$ 5.000,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Desarrollo de Ecosistema Web & Cloud Ledger</td>
                                <td className={cn(contentCellStyle, "text-right")}>$ 12.000,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Gestión eSIM y Nodo de Datos Transaccionales</td>
                                <td className={cn(contentCellStyle, "text-right")}>$ 2.500,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Módulo Inteligencia Artificial Fiscal (RIPF/IGTF)</td>
                                <td className={cn(contentCellStyle, "text-right")}>$ 1.000,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Hardware Smart Bins IA (Sujeción Magnética)</td>
                                <td className={cn(contentCellStyle, "text-right")}>$ 1.200,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Equipos Fiscales Homologados SENIAT (10 Uds)</td>
                                <td className={cn(contentCellStyle, "text-right")}>$ 1.350,00</td>
                            </tr>
                            <tr className="bg-slate-50">
                                <td className={cn(contentCellStyle, "font-black")}>TOTAL INVERSIÓN PROYECTADA</td>
                                <td className={cn(contentCellStyle, "text-right font-black text-blue-700")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. ALIADOS */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">6. ALIADOS Y RECURSOS ESTRATÉGICOS</h2>
                    <table className="w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>ENTE / ORGANIZACIÓN</td>
                                <td className={headerCellStyle}>TIPO DE APOYO / VÍNCULO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>DIGITEL / CONATEL</td>
                                <td className={contentCellStyle}>Espectro Radioeléctrico y Conectividad 5G</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>SENIAT</td>
                                <td className={contentCellStyle}>Validación de Procesos y Riesgo Fiscal Cero</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>THE FACTORY HKA / SAMSUNG</td>
                                <td className={contentCellStyle}>Hardware Fiscal y Terminales Móviles Pro</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>SAPI</td>
                                <td className={contentCellStyle}>Registro de Patentes y Propiedad Intelectual</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. PLAN DE ACCIÓN */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tight">7. PLAN DE ACCIÓN OPERATIVO</h2>
                    <table className="w-full border-collapse border border-black">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className={headerCellStyle}>FASE OPERATIVA</th>
                                <th className={headerCellStyle}>RESPONSABLE</th>
                                <th className={headerCellStyle}>CRONOGRAMA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={contentCellStyle}>Auditoría Técnica y Censo de Nodos</td>
                                <td className={contentCellStyle}>Equipo de Campo</td>
                                <td className={cn(contentCellStyle, "text-right")}>Semana 1</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Despliegue de Bóveda Digital y Migración</td>
                                <td className={contentCellStyle}>Ing. Carlos Mattar</td>
                                <td className={cn(contentCellStyle, "text-right")}>Semana 2</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Activación de Nodos 5G y Provisión eSIM</td>
                                <td className={contentCellStyle}>Ing. Sebastian Garrido</td>
                                <td className={cn(contentCellStyle, "text-right")}>Semana 3</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Certificación Maestra y Lanzamiento</td>
                                <td className={contentCellStyle}>Auditores Kyron</td>
                                <td className={cn(contentCellStyle, "text-right")}>Semana 4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* FOOTER / CONTACTO */}
                <footer className="mt-20 pt-10 border-t border-black flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <QrCode className="h-16 w-16 opacity-80" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase">Contacto Maestro</p>
                                <p className="text-sm font-bold">expedientes@systemkyron.com</p>
                                <p className="text-sm font-bold">www.systemkyron.com</p>
                            </div>
                        </div>
                        <div className="border-4 border-black p-2 inline-block font-black text-xs uppercase tracking-widest italic">
                            EXPEDIENTE VALIDADO 2026
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <div className="flex items-center justify-end gap-3 mb-4">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Nodo Central: Activo</span>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-400">© 2026 SYSTEM KYRON • CORPORATE INTELLIGENCE</p>
                    </div>
                </footer>

                {/* CONFIDENTIAL STAMP */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <div className="border-[20px] border-black rounded-full p-20">
                        <span className="text-[120px] font-black uppercase tracking-[0.5em] italic">CONFIDENCIAL</span>
                    </div>
                </div>
            </motion.div>

            {/* STATUS BAR BOTTOM */}
            <div className="max-w-4xl mx-auto mt-8 flex justify-center items-center gap-8 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] opacity-60">
                <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> AES-512 SECURE</span>
                <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> GLOBAL NODES: 2.500</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> VERIFIED BY KYRON-ID</span>
            </div>
        </div>
    );
}
