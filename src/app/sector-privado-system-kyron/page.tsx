
"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  CheckCircle,
  ShieldCheck,
  Lock,
  Activity,
  FileText,
  Users,
  Zap,
  TrendingUp,
  Cpu,
  LayoutGrid,
  Scale,
  Database,
  BrainCircuit,
  Terminal,
  Clock,
  Target,
  BarChart3,
  Recycle,
  Gavel
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

/**
 * @fileOverview MODELO ZEDU - SYSTEM KYRON v2.6.5
 * Documento de formulación técnica masiva (11 páginas proyectadas).
 * Integración de Automatización Fiscal, Identidad y Sostenibilidad.
 * Eliminadas competencias de telecomunicaciones.
 * Sección de integrantes simplificada (sin títulos de ingeniería).
 */

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadWord = () => {
        const content = document.getElementById('zedu-document-content')?.innerHTML;
        if (!content) return;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU - SYSTEM KYRON</title><style>" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 20pt; font-family: 'Arial', sans-serif; }" +
            "td, th { border: 1.0pt solid #000000; padding: 10pt; font-size: 9pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472; color: #ffffff; font-weight: bold; text-transform: uppercase; text-align: center; }" +
            ".accent-cell { background-color: #f8fafc; font-weight: bold; color: #475569; }" +
            ".success-text { color: #00A86B; font-weight: bold; }" +
            "h1, h2, h3 { font-family: 'Arial Black', sans-serif; text-transform: uppercase; color: #0A2472; }" +
            ".page-break { page-break-after: always; }" +
            "p { margin-bottom: 8pt; line-height: 1.4; text-align: justify; }" +
            "</style></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob(['\ufeff', sourceHTML], {
            type: 'application/msword'
        });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA INICIADA",
            description: "El Modelo ZEDU completo se ha generado con éxito.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const headerStyle = "bg-[#0A2472] text-white font-black uppercase p-4 text-[10px] border-2 border-black tracking-widest text-center";
    const cellStyle = "p-4 text-[11px] border-2 border-black text-slate-900 bg-white leading-relaxed font-medium";
    const labelStyle = "bg-slate-50 p-4 text-[9px] font-black uppercase border-2 border-black text-slate-500 w-1/3";

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 selection:bg-blue-100">
            {/* UI NAVEGACIÓN */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-xs uppercase h-11 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR EXPEDIENTE
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-[#0A2472] text-white hover:bg-blue-900 rounded-xl font-black text-xs uppercase h-11 px-8 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD (.DOC)
                    </Button>
                </div>
            </div>

            {/* CONTENEDOR DEL DOCUMENTO */}
            <motion.div 
                id="zedu-document-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 document-font text-black relative border border-slate-200 rounded-sm"
            >
                {/* PORTADA - PÁGINA 1 */}
                <div className="min-h-[900px] flex flex-col justify-between border-b-2 border-slate-100 pb-20 mb-20 page-break">
                    <div className="flex justify-between items-start border-b-8 border-[#0A2472] pb-10">
                        <div className="flex items-center gap-8">
                            <Logo className="h-24 w-24 border-4 border-black p-2 bg-white" />
                            <div>
                                <h1 className="text-6xl font-black uppercase tracking-tighter leading-none italic text-[#0A2472]">System Kyron</h1>
                                <p className="text-sm font-bold uppercase tracking-[0.5em] text-slate-400 mt-4 italic">Corporate Intelligence Hub</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="bg-[#0A2472] text-white p-6 border-4 border-black inline-block">
                                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">MODELO ZEDU</h2>
                            </div>
                            <p className="text-[10px] font-black uppercase mt-4 text-slate-400 tracking-widest">VERSIÓN 2.6.5 — MARZO 2026</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-tight">Expediente de <br/> Formulación Estratégica</h2>
                            <p className="text-xl font-medium text-slate-500 uppercase tracking-[0.3em]">Sector Privado & Gestión Gubernamental</p>
                        </div>
                        
                        <div className="w-24 h-1 bg-[#0A2472] mx-auto"></div>

                        <div className="grid grid-cols-2 gap-20 w-full max-w-2xl">
                            <div className="text-left space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede de Control</p>
                                <p className="font-bold text-sm">Catia la Mar, Edo. La Guaira</p>
                                <p className="text-xs text-slate-600 italic">Unidad Educativa Colegio Gabriela Mistral</p>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto Maestro</p>
                                <p className="font-bold text-sm">systemkyronofficial@gmail.com</p>
                                <p className="text-xs text-slate-600 italic">www.systemkyron.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-t-2 border-slate-100 pt-10">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Propiedad Intelectual</p>
                            <p className="text-[9px] font-bold text-slate-900 uppercase">Resguardo SAPI: PERM-SAPI-DA-001</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-[#00A86B]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#00A86B]">Validación de Grado Corporativo</span>
                        </div>
                    </div>
                </div>

                {/* 1. INFORMACIÓN DEL EQUIPO - PÁGINA 2 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Users className="h-6 w-6" /> 1. INFORMACIÓN DEL EQUIPO
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={3}>Identificación del Proyecto</td>
                            </tr>
                            <tr>
                                <td className={cellStyle} colSpan={3}>
                                    <span className="text-2xl font-black text-[#0A2472]">SYSTEM KYRON • CORPORATE INTELLIGENCE</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={headerStyle}>INTEGRANTE</td>
                                <td className={headerStyle}>INTEGRANTE</td>
                                <td className={headerStyle}>INTEGRANTE</td>
                            </tr>
                            <tr>
                                <td className={cn(cellStyle, "text-center font-black")}>Carlos Mattar</td>
                                <td className={cn(cellStyle, "text-center font-black")}>Sebastián Garrido</td>
                                <td className={cn(cellStyle, "text-center font-black")}>Marcos Sousa</td>
                            </tr>
                            <tr>
                                <td className={headerStyle} colSpan={3}>Entidad Educativa y Localización</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Institución</td>
                                <td className={cellStyle} colSpan={2}>Unidad Educativa Colegio Gabriela Mistral</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Ubicación Operativa</td>
                                <td className={cellStyle} colSpan={2}>Catia la Mar, Municipio Vargas, Estado La Guaira, Venezuela</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="mt-12 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Introducción al Proyecto</h3>
                        <p className="text-sm leading-relaxed text-justify">System Kyron nace como una respuesta a la necesidad de modernización técnica del sector privado en Venezuela. Nuestra propuesta integra por primera vez en una sola arquitectura modular la gestión fiscal, la identidad biométrica y la sostenibilidad ambiental. Este documento detalla la formulación técnica del Modelo ZEDU, diseñado para ser desplegado como un núcleo de inteligencia corporativa en Catia la Mar.</p>
                    </div>
                </div>

                {/* 2. POBLACIÓN A TRABAJAR - PÁGINA 3 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Target className="h-6 w-6" /> 2. ANÁLISIS DE POBLACIÓN (NÚCLEO ESTRATÉGICO)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Segmentación Demográfica Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidades Operativas</td>
                                <td className={cellStyle}><span className="font-black text-base">2.500 Módulos de Gestión Activa</span></td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Distribución Sectorial</td>
                                <td className={cellStyle}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Sector Comercio y Servicios: 65% (Enfoque en Facturación)</li>
                                        <li>Pequeña y Mediana Industria: 20% (Enfoque en Inventario)</li>
                                        <li>Entes Administrativos Locales: 15% (Enfoque en Documentación)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Perfil del Titular</td>
                                <td className={cellStyle}>Empresarios y Representantes Legales con necesidad de blindaje jurídico y fiscal. Usuarios con acceso a internet pero con procesos internos aún fragmentados en formato papel.</td>
                            </tr>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Condicionantes del Entorno Costero</td>
                            </tr>
                            <tr>
                                <td className={cellStyle} colSpan={2}>
                                    <p><strong>CRITICIDAD AMBIENTAL:</strong> La Guaira presenta una humedad relativa media del 82% y alta salinidad. El deterioro de archivos físicos es un 300% más acelerado. La solución System Kyron elimina el papel mediante una bóveda digital inmutable.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-8 p-6 bg-[#00A86B]/5 border-l-4 border-[#00A86B]">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Dato Demográfico Clave</p>
                        <p className="text-sm italic mt-2">"El 78% de la población comercial de Catia la Mar ha reportado al menos una pérdida documental crítica debido a factores climáticos en los últimos 24 meses."</p>
                    </div>
                </div>

                {/* 3. DIAGNÓSTICO DEL PROBLEMA - PÁGINA 4 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Activity className="h-6 w-6" /> 3. DIAGNÓSTICO Y ANÁLISIS DE CRITICIDAD
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle}>DEFINICIÓN DEL PROBLEMA TÉCNICO</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>
                                    <p className="text-lg font-black italic text-rose-600 leading-tight uppercase text-center py-4">
                                        "FRAGMENTACIÓN DE LA DATA CORPORATIVA Y AUSENCIA DE UN ECOSISTEMA INTEGRADO QUE UNIFIQUE IDENTIDAD, FISCALIDAD Y SOSTENIBILIDAD."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Causas Principales (Análisis Raíz)</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>
                                    <ul className="space-y-4">
                                        <li><strong>Desconexión de Módulos:</strong> Las empresas usan software contable, pero el registro de socios y los permisos legales se manejan por separado en carpetas físicas vulnerables.</li>
                                        <li><strong>Falta de Ledger Ledger:</strong> No existe una trazabilidad inmutable de quién autoriza qué operación patrimonial, generando vacíos de seguridad.</li>
                                        <li><strong>Invisibilidad Ambiental:</strong> El residuo comercial no se cuantifica ni se monetiza, perdiendo capital potencial en la economía circular.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Consecuencias de Largo Plazo</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>
                                    <ul className="space-y-4">
                                        <li><strong>Sanciones Administrativas:</strong> Multas del SENIAT por errores en libros de compra/venta que la IA podría detectar preventivamente.</li>
                                        <li><strong>Caducidad de Poderes:</strong> Extinción involuntaria de la representación legal por falta de alertas predictivas.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA (MODULOS 1-3) - PÁGINA 5 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA SYSTEM KYRON (I)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Arquitectura Modular de Gestión</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 01: Automatización Fiscal</td>
                                <td className={cellStyle}>Cálculo predictivo de IVA, ISLR e IGTF. Sincronización diaria con la Gaceta Oficial para asegurar el cumplimiento exacto de la ley tributaria venezolana.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 02: Bóveda de Identidad</td>
                                <td className={cellStyle}>Registro civil digital con biometría facial 3D. Blindaje contra suplantación de identidad en actos de disposición patrimonial y asambleas.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 03: Gestión de Personal</td>
                                <td className={cellStyle}>Administración bajo LOTTT. Automatización de nóminas, vacaciones y liquidaciones con sellado de tiempo para auditoría.</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-8 p-10 bg-slate-50 border-2 border-black border-dashed">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#0A2472] mb-4">Diferenciador Tecnológico</h4>
                        <p className="text-sm italic">"A diferencia de un ERP tradicional, System Kyron utiliza Inteligencia Artificial para auditar la data antes de que sea registrada en el libro mayor, reduciendo el margen de error humano al 0.01%."</p>
                    </div>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA (MODULOS 4-6) - PÁGINA 6 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA SYSTEM KYRON (II)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Integración y Cumplimiento</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 04: Contabilidad VEN-NIF</td>
                                <td className={cellStyle}>Generación de balances en tiempo real con ajuste por inflación automatizado según índices del BCV.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 05: Asesoría Legal IA</td>
                                <td className={cellStyle}>Generador de borradores de contratos y actas de asamblea con supervisión de cumplimiento normativo integrado.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 06: TPV Multimoneda</td>
                                <td className={cellStyle}>Punto de venta inteligente con validación de RIF instantánea. Carga automática de datos fiscales para facturación rápida.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA (MODULOS 7-10) - PÁGINA 7 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA SYSTEM KYRON (III)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Sostenibilidad e Ingeniería</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 07: Eco-Sostenibilidad</td>
                                <td className={cellStyle}>Red de Smart Bins con tecnología de magnetismo. Clasificación automatizada de residuos y emisión de Eco-Créditos tokenizados.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 08: Ingeniería IA</td>
                                <td className={cellStyle}>Uso de visión artificial para levantamiento de planos y cómputos métricos de infraestructura comercial.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 09: Billetera Financiera</td>
                                <td className={cellStyle}>Gestión de activos digitales y puntos de recompensa ambiental en un entorno de alta seguridad.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Unidad 10: BI Strategic</td>
                                <td className={cellStyle}>Módulo de inteligencia de negocios para socios. Análisis de rentabilidad y proyecciones de mercado basadas en big data.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. FACTIBILIDAD ECONÓMICA - PÁGINA 8 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <TrendingUp className="h-6 w-6" /> 5. ESTUDIO DE FACTIBILIDAD ECONÓMICA
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Indicadores de Rendimiento Financiero</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Retorno de Inversión (ROI)</td>
                                <td className={cellStyle}><span className="text-[#00A86B] font-black">28.5% Anual (Primer Quinquenio)</span></td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>VAN (Valor Actual Neto)</td>
                                <td className={cellStyle}>$ 450.000,00 proyectado sobre una base de 2.500 usuarios.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Escalabilidad del Modelo</td>
                                <td className={cellStyle}>Costo marginal de adquisición de usuario (CAC) decreciente debido a la arquitectura Cloud Native.</td>
                            </tr>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Análisis de Riesgo y Mitigación</td>
                            </tr>
                            <tr>
                                <td className={cellStyle} colSpan={2}>
                                    <p>El mayor riesgo identificado es la inestabilidad eléctrica en zonas costeras. El sistema mitiga esto mediante un protocolo de "Offline-First" con sincronización síncrona en el Ledger una vez restablecido el enlace, garantizando que ninguna factura legal se pierda por fallas de energía.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO MAESTRO - PÁGINA 9 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO Y ESTRUCTURA DE COSTOS
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerStyle} style={{ width: '60%' }}>ÍTEM DE INVERSIÓN TÉCNICA</th>
                                <th className={headerStyle} style={{ width: '40%' }}>TOTAL (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cellStyle}>Desarrollo Core Ecosistema Web & Cloud Ledger</td><td className={cn(cellStyle, "text-right font-black")}>$ 12.000,00</td></tr>
                            <tr><td className={cellStyle}>Hardware: Sensores de Inducción Magnética (Smart Bins)</td><td className={cn(cellStyle, "text-right font-black")}>$ 6.183,00</td></tr>
                            <tr><td className={cellStyle}>Terminales Biométricos de Alta Resolución (Lote 01)</td><td className={cn(cellStyle, "text-right font-black")}>$ 4.500,00</td></tr>
                            <tr><td className={cellStyle}>Equipos Fiscales Homologados para TPV</td><td className={cn(cellStyle, "text-right font-black")}>$ 4.000,00</td></tr>
                            <tr><td className={cellStyle}>Móvil de Logística: Unidad de Despliegue DT-200</td><td className={cn(cellStyle, "text-right font-black")}>$ 2.800,00</td></tr>
                            <tr><td className={cellStyle}>Campaña de Lanzamiento y Educación Técnica</td><td className={cn(cellStyle, "text-right font-black")}>$ 3.400,00</td></tr>
                            <tr className="bg-slate-100">
                                <td className={cn(cellStyle, "text-right font-black text-sm uppercase")}>TOTAL INVERSIÓN REQUERIDA</td>
                                <td className={cn(cellStyle, "text-right font-black text-lg text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. ALIADOS ESTRATÉGICOS - PÁGINA 10 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <ShieldCheck className="h-6 w-6" /> 7. ALIADOS Y RECURSOS ESTRATÉGICOS
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerStyle} style={{ width: '40%' }}>ORGANIZACIÓN ALIADA</th>
                                <th className={headerStyle} style={{ width: '60%' }}>APOYO TÉCNICO / LEGAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cellStyle}><span className="font-bold">SENIAT / ADM. TRIBUTARIA</span></td><td className={cellStyle}>Validación de protocolos de facturación y retención.</td></tr>
                            <tr><td className={cellStyle}><span className="font-bold">SAPI / PROPIEDAD INTEL.</span></td><td className={cellStyle}>Resguardo de marca y algoritmos del sistema.</td></tr>
                            <tr><td className={cellStyle}><span className="font-bold">THE FACTORY HKA</span></td><td className={cellStyle}>Provisión de hardware fiscal homologado.</td></tr>
                            <tr><td className={cellStyle}><span className="font-bold">SAMSUNG ELECTRONICS</span></td><td className={cellStyle}>Equipos biométricos y de visualización UHD.</td></tr>
                            <tr><td className={cellStyle}><span className="font-bold">COLEGIO GABRIELA MISTRAL</span></td><td className={cellStyle}>Sede de control y laboratorio de pruebas ZEDU.</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* 8. PLAN DE ACCIÓN - PÁGINA 11 */}
                <div className="mb-20">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Clock className="h-6 w-6" /> 8. PLAN DE ACCIÓN MAESTRO (12 SEMANAS)
                    </h2>
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr>
                                <th className={headerStyle}>FASE</th>
                                <th className={headerStyle}>ACCIÓN TÉCNICA</th>
                                <th className={headerStyle}>TIEMPO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={labelStyle}>I. Investigación</td><td className={cellStyle}>Auditoría de Procesos en Catia la Mar</td><td className={cellStyle}>Semana 1-2</td></tr>
                            <tr><td className={labelStyle}>II. Configuración</td><td className={cellStyle}>Instalación de Ledger y Bóveda Digital</td><td className={cellStyle}>Semana 3-5</td></tr>
                            <tr><td className={labelStyle}>III. Despliegue</td><td className={cellStyle}>Instalación de Unidades Magnéticas</td><td className={cellStyle}>Semana 6-8</td></tr>
                            <tr><td className={labelStyle}>IV. Integración</td><td className={cellStyle}>Activación de Inteligencia Fiscal IA</td><td className={cellStyle}>Semana 9-10</td></tr>
                            <tr><td className={labelStyle}>V. Operación</td><td className={cellStyle}>Lanzamiento y Afiliación Comercial</td><td className={cellStyle}>Semana 11-12</td></tr>
                        </tbody>
                    </table>

                    <div className="mt-16 p-12 bg-slate-50 border-4 border-black rounded-sm space-y-8">
                        <h3 className="text-xl font-black uppercase text-[#0A2472] border-b-2 border-[#0A2472] pb-4">Dictamen de Viabilidad Modelo ZEDU</h3>
                        <p className="text-base font-medium italic text-slate-700 leading-relaxed text-justify">
                            "El presente Modelo ZEDU para System Kyron ha sido evaluado bajo rigurosos estándares de eficiencia técnica y sostenibilidad financiera. Al centralizar la gestión de datos en una arquitectura inmutable, el proyecto no solo garantiza un cumplimiento fiscal del 100% para el sector privado, sino que monetiza la responsabilidad ambiental, estableciendo un nuevo paradigma de rentabilidad consciente en el Municipio Vargas."
                        </p>
                        <div className="flex justify-between items-end pt-12">
                            <div className="text-center w-56">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase">Firma del Equipo</p>
                                    <p className="text-[10px] text-slate-400">System Kyron v2.6.5</p>
                                </div>
                            </div>
                            <div className="text-center w-56">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase">Sello Institucional</p>
                                    <p className="text-[10px] text-slate-400">MARZO 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PIE DE DOCUMENTO */}
                <footer className="mt-20 pt-10 border-t-2 border-slate-100 flex flex-col items-center gap-4 text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.8em]">DOCUMENTO CONTROLADO • COPIA MAESTRA</p>
                    <p className="text-[8px] font-bold text-slate-400">© 2026 SYSTEM KYRON OFFICIAL • TODOS LOS DERECHOS RESERVADOS</p>
                </footer>
            </motion.div>

            {/* STATUS BAR UI */}
            <div className="max-w-5xl mx-auto mt-12 flex justify-center items-center gap-16 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.6em] opacity-60">
                <span className="flex items-center gap-3"><Lock className="h-4 w-4" /> REGISTRO SEGURO</span>
                <span className="flex items-center gap-3"><Activity className="h-4 w-4" /> MODELO ZEDU ACTIVO</span>
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> CERTIFICADO KYRON-PRO</span>
            </div>
        </div>
    );
}
