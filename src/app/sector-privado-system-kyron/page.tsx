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
  FileText,
  Users,
  Zap,
  TrendingUp,
  Cpu,
  LayoutGrid,
  Scale,
  Database,
  BrainCircuit,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview MODELO ZEDU - SYSTEM KYRON v2.6.5
 * Documento de formulación técnica detallada (5-6 páginas proyectadas).
 * Eliminadas competencias de telecomunicaciones.
 * Colores institucionales: Azul (#0A2472) y Verde (#00A86B).
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
            "table { border-collapse: collapse; width: 100%; margin-bottom: 30px; font-family: 'Segoe UI', Tahoma, sans-serif; }" +
            "td, th { border: 1.5pt solid #000000; padding: 12pt; font-size: 10pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472; color: #ffffff; font-weight: bold; text-transform: uppercase; }" +
            ".accent-cell { background-color: #f0f4f8; font-weight: bold; }" +
            ".success-text { color: #00A86B; font-weight: bold; }" +
            "h1, h2, h3 { font-family: sans-serif; text-transform: uppercase; margin-top: 20pt; }" +
            "p { margin-bottom: 10pt; line-height: 1.5; }" +
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
            title: "EXPORTACIÓN COMPLETADA",
            description: "El MODELO ZEDU ha sido generado en formato Word.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const headerCellStyle = "bg-[#0A2472] text-white font-black uppercase p-4 text-[10px] border-2 border-black header-cell tracking-widest";
    const contentCellStyle = "p-5 text-[11px] border-2 border-black text-slate-900 bg-white leading-relaxed font-medium";
    const accentCellStyle = "bg-slate-50 p-4 text-[10px] font-black uppercase border-2 border-black text-slate-600";

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 selection:bg-blue-100">
            {/* BARRA DE NAVEGACIÓN UI */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <NextLink href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</NextLink>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white dark:bg-slate-900 border-slate-300 rounded-xl font-bold text-xs uppercase h-11 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> VISTA PREVIA
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-[#0A2472] text-white hover:bg-blue-900 rounded-xl font-black text-xs uppercase h-11 px-8 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD
                    </Button>
                </div>
            </div>

            {/* CONTENEDOR DEL DOCUMENTO */}
            <motion.div 
                id="zedu-document-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-24 document-font text-black relative border border-slate-200 rounded-sm"
            >
                {/* ENCABEZADO INSTITUCIONAL */}
                <div className="flex justify-between items-start mb-20 border-b-8 border-[#0A2472] pb-10">
                    <div className="flex items-center gap-8">
                        <div className="p-4 border-4 border-black rounded-2xl bg-white shadow-xl">
                            <Logo className="h-20 w-20" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic text-[#0A2472]">System Kyron</h1>
                            <p className="text-sm font-bold uppercase tracking-[0.5em] text-slate-400 mt-3 italic">Corporate Intelligence Hub</p>
                            <p className="text-[11px] font-black text-[#00A86B] mt-2 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" /> VALIDACIÓN DE SISTEMA MAESTRO • 2026
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="inline-block border-4 border-black p-6 bg-[#0A2472]">
                            <h2 className="text-3xl font-black uppercase tracking-[0.2em] leading-none text-white">MODELO ZEDU</h2>
                        </div>
                        <p className="text-[10px] font-black uppercase mt-4 text-slate-400 tracking-widest">VERSION: 2.6.5 – MARZO 2026</p>
                    </div>
                </div>

                {/* 1. INFORMACIÓN DEL EQUIPO TÉCNICO */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <Activity className="h-6 w-6" /> 1. INFORMACIÓN DEL EQUIPO TÉCNICO
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle} colSpan={3}>NOMBRE DEL PROYECTO ESTRATÉGICO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={3}><span className="text-2xl font-black uppercase text-[#0A2472]">SYSTEM KYRON • CORPORATE INTELLIGENCE</span></td>
                            </tr>
                            <tr>
                                <td className={accentCellStyle} style={{ width: '33.33%' }}>LÍDER DE ARQUITECTURA</td>
                                <td className={accentCellStyle} style={{ width: '33.33%' }}>SISTEMAS Y DATOS</td>
                                <td className={accentCellStyle} style={{ width: '33.33%' }}>FLUJO OPERATIVO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Ing. Carlos Mattar</td>
                                <td className={contentCellStyle}>Ing. Sebastián Garrido</td>
                                <td className={contentCellStyle}>Ing. Marcos Sousa</td>
                            </tr>
                            <tr>
                                <td className={accentCellStyle} colSpan={2}>INSTITUCIÓN EDUCATIVA / SEDE DE OPERACIONES</td>
                                <td className={accentCellStyle}>UBICACIÓN DEL CENTRO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>Unidad Educativa Colegio Gabriela Mistral</td>
                                <td className={contentCellStyle}>Catia la Mar, Estado La Guaira, Venezuela</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 2. POBLACIÓN Y ESTUDIO DEMOGRÁFICO DETALLADO */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <Users className="h-6 w-6" /> 2. POBLACIÓN A TRABAJAR (ESTUDIO DEMOGRÁFICO)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle} style={{ width: '50%' }}>ALCANCE INICIAL DEL ECOSISTEMA</td>
                                <td className={headerCellStyle} style={{ width: '50%' }}>UBICACIÓN GEOGRÁFICA DE CONTROL</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <span className="text-xl font-black text-[#0A2472]">2.500 Unidades Operativas</span>
                                    <p className="mt-2 text-[10px] font-bold text-slate-500 uppercase">Capacidad de escalamiento mensual: +15%</p>
                                </td>
                                <td className={contentCellStyle}>
                                    <span className="font-bold">Parroquia Catia la Mar</span>
                                    <p className="mt-1 text-slate-600">Eje comercial central, Municipio Vargas, Estado La Guaira.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className={accentCellStyle}>SEGMENTACIÓN POR GÉNERO Y RANGO</td>
                                <td className={accentCellStyle}>PERFIL DEL USUARIO MAESTRO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="list-disc pl-5">
                                        <li>Femenino: 52% | Masculino: 48%</li>
                                        <li>Rango de edad productiva: 18 - 65 años</li>
                                        <li>Densidad poblacional: Alta (Sector Comercio)</li>
                                    </ul>
                                </td>
                                <td className={contentCellStyle}>
                                    Empresarios, emprendedores, contadores y gestores legales con necesidad de digitalización inmutable.
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>FACTORES AMBIENTALES Y CONTEXTO LOCAL</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>
                                    <p className="font-bold">ZONA COSTERA DE ALTA CRITICIDAD:</p>
                                    La población objetivo opera en un entorno con humedad relativa superior al 85% y altos niveles de salinidad atmosférica. Estas condiciones provocan el deterioro físico acelerado de documentos en papel (facturas, actas constititivas, libros contables), lo que justifica la necesidad inmediata de una <strong>Bóveda Digital Blindada</strong> y procesos de <strong>Cero Riesgo Fiscal</strong> que no dependan de soportes físicos degradables.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3. DIAGNÓSTICO Y ANÁLISIS DEL PROBLEMA TÉCNICO */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <Activity className="h-6 w-6" /> 3. DIAGNÓSTICO Y ANÁLISIS DEL PROBLEMA
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DEFINICIÓN TÉCNICA DEL PROBLEMA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <p className="text-base font-black italic uppercase leading-tight text-red-600">
                                        "AUSENCIA DE UN ECOSISTEMA INTEGRADO QUE UNIFIQUE LA AUTOMATIZACIÓN FISCAL, EL RESGUARDO LEGAL INMUTABLE Y LA SOSTENIBILIDAD OPERATIVA BAJO UN PROTOCOLO DE SEGURIDAD MAESTRO."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={accentCellStyle}>CAUSAS DEL PROBLEMA (RAÍZ)</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="space-y-3">
                                        <li><strong>Fragmentación de Data:</strong> La información fiscal, contable y legal reside en sistemas aislados que no se comunican entre sí.</li>
                                        <li><strong>Obsolescencia Analógica:</strong> Dependencia de libros contables físicos vulnerables a la humedad y el extravío.</li>
                                        <li><strong>Incertidumbre Normativa:</strong> Desconexión entre los procesos diarios y las actualizaciones constantes de la Gaceta Oficial (SENIAT/SAREN).</li>
                                        <li><strong>Inexistencia de Trazabilidad Ambiental:</strong> Desperdicio de materiales sin un sistema de incentivos o registro digital.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={accentCellStyle}>CONSECUENCIAS Y RIESGOS ASOCIADOS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="space-y-3">
                                        <li><strong>Impacto Económico:</strong> Multas severas por errores en declaraciones de IVA, ISLR e IGTF.</li>
                                        <li><strong>Vulnerabilidad Legal:</strong> Extinción de poderes y permisos por falta de control de vencimientos.</li>
                                        <li><strong>Pérdida de Eficiencia:</strong> +40 horas hombre al mes dedicadas a conciliación manual de facturas y arqueos de caja.</li>
                                        <li><strong>Inseguridad Documental:</strong> Imposibilidad de verificar la autenticidad de firmas y sellos en documentos históricos.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA: ECOSISTEMA SYSTEM KYRON */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN PROPUESTA (DETALLES DEL SISTEMA)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>ARQUITECTURA DEL ECOSISTEMA MODULAR</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>
                                    <p className="font-bold text-[#0A2472] uppercase mb-4">Integración Vertical de 9 Módulos Maestros:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <p><strong>[01] Automatización Fiscal:</strong> Motor IA que procesa RIPF, IGTF e IVA con validación síncrona ante el SENIAT.</p>
                                            <p><strong>[02] Bóveda de Identidad:</strong> Registro de ciudadanos y representantes mediante biometría 3D y sellado digital.</p>
                                            <p><strong>[03] Gestión de RR.HH:</strong> Control de nómina, prestaciones sociales y contratos LOTTT automatizados.</p>
                                            <p><strong>[04] Contabilidad IA:</strong> Generación de balances VEN-NIF con ajuste por inflación automático basado en el BCV.</p>
                                        </div>
                                        <div>
                                            <p><strong>[05] Sostenibilidad:</strong> Smart Bins con tecnología de magnetismo para recolección y emisión de Eco-Créditos.</p>
                                            <p><strong>[06] Unidad Legal:</strong> Asistente para redacción de contratos, actas de asamblea y registro ante el SAREN/SAPI.</p>
                                            <p><strong>[07] Ingeniería IA:</strong> Uso de fotogrametría para generación de planos y cómputos métricos de locales comerciales.</p>
                                            <p><strong>[08] TPV Pro:</strong> Punto de venta multimoneda con gestión de inventario bloqueado por factura fiscal.</p>
                                            <p><strong>[09] Business Intelligence:</strong> Tableros de control estratégico para socios y juntas directivas.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} style={{ width: '50%' }}>DIFERENCIADORES CLAVE</td>
                                <td className={headerCellStyle} style={{ width: '50%' }}>TECNOLOGÍAS APLICADAS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="list-disc pl-5">
                                        <li><strong>Riesgo Fiscal 0%:</strong> Auditoría preventiva antes del sellado.</li>
                                        <li><strong>Inmutabilidad:</strong> Blockchain Ledger para cada transacción.</li>
                                        <li><strong>Independencia Física:</strong> Cloud Computing de alta fidelidad.</li>
                                    </ul>
                                </td>
                                <td className={contentCellStyle}>
                                    <ul className="list-disc pl-5">
                                        <li>Generative AI (Modelos Propios)</li>
                                        <li>Distributed Ledger Technology (DLT)</li>
                                        <li>Biometría de Alta Resolución</li>
                                        <li>Sensores de Inducción Magnética</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. DATOS CUANTITATIVOS Y KPI DE RENDIMIENTO */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <TrendingUp className="h-6 w-6" /> 5. INDICADORES CUANTITATIVOS (DATOS MAESTROS)
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>INDICADOR DE CONTROL</th>
                                <th className={headerCellStyle}>VALOR OPERATIVO</th>
                                <th className={headerCellStyle}>ESTATUS DE SISTEMA</th>
                            </tr>
                        </thead>
                        <tbody className="text-center font-bold">
                            <tr>
                                <td className={contentCellStyle}>Empresas en el Ecosistema</td>
                                <td className={contentCellStyle}>127 Unidades</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B]")}>ACTIVO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Declaraciones Procesadas</td>
                                <td className={contentCellStyle}>15.340 Documentos</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B]")}>VERIFICADO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Riesgo de Sanción Fiscal</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B] text-base")}>0%</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B]")}>GARANTIZADO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Nodos Activos en Red</td>
                                <td className={contentCellStyle}>2.500 Unidades</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B]")}>SINCRO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Eco-Créditos Emitidos</td>
                                <td className={contentCellStyle}>45.800 Unidades</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B]")}>LIQUIDEZ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO DE INVERSIÓN (CAPEX) */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO DE INVERSIÓN (ESTRUCTURA DE COSTOS)
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>RUBRO DE INVERSIÓN</th>
                                <th className={headerCellStyle}>DETALLE TÉCNICO</th>
                                <th className={headerCellStyle}>TOTAL (USD)</th>
                            </tr>
                        </thead>
                        <tbody className="uppercase">
                            <tr>
                                <td className={contentCellStyle}>Arquitectura de Software</td>
                                <td className={contentCellStyle}>Ecosistema Web, Cloud Ledger y Nodo IA</td>
                                <td className={cn(contentCellStyle, "text-right font-black")}>$ 12.000,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Hardware de Sostenibilidad</td>
                                <td className={contentCellStyle}>Sensores de Inducción para Smart Bins</td>
                                <td className={cn(contentCellStyle, "text-right font-black")}>$ 6.183,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Equipos de Oficina Fiscal</td>
                                <td className={contentCellStyle}>Terminales Biométricos e Impresoras Fiscales</td>
                                <td className={cn(contentCellStyle, "text-right font-black")}>$ 8.500,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Logística y Operaciones</td>
                                <td className={contentCellStyle}>Unidad de Transporte (Moto Bera DT-200)</td>
                                <td className={cn(contentCellStyle, "text-right font-black")}>$ 2.800,00</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Marketing y Despliegue</td>
                                <td className={contentCellStyle}>Campaña de Afiliación Catia la Mar</td>
                                <td className={cn(contentCellStyle, "text-right font-black")}>$ 3.400,00</td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td className={cn(contentCellStyle, "text-right font-black text-sm")} colSpan={2}>INVERSIÓN TOTAL ESTIMADA DEL PROYECTO</td>
                                <td className={cn(contentCellStyle, "text-right font-black text-base text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. ALIADOS Y RECURSOS ESTRATÉGICOS */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <ShieldCheck className="h-6 w-6" /> 7. ALIADOS Y RECURSOS ESTRATÉGICOS
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>ORGANIZACIÓN ALIADA</th>
                                <th className={headerCellStyle}>VÍNCULO Y TIPO DE APOYO</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold">
                            <tr>
                                <td className={contentCellStyle}>SENIAT / ADMINISTRACIÓN TRIBUTARIA</td>
                                <td className={contentCellStyle}>Validación de protocolos de cumplimiento y auditoría fiscal.</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>SAREN / REGISTROS Y NOTARÍAS</td>
                                <td className={contentCellStyle}>Sincronización de libros digitales y actas de asamblea legalizadas.</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>SAPI / PROPIEDAD INTELECTUAL</td>
                                <td className={contentCellStyle}>Resguardo de patentes de software y marcas del ecosistema.</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>HOLDING SYSTEM KYRON</td>
                                <td className={contentCellStyle}>Soporte financiero central y unidad de investigación y desarrollo.</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>SAMSUNG / FACTORY HKA</td>
                                <td className={contentCellStyle}>Provisión de hardware certificado para terminales de venta.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 8. PLAN DE ACCIÓN Y CRONOGRAMA DE DESPLIEGUE */}
                <div className="mb-16">
                    <h2 className="text-lg font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                        <LayoutGrid className="h-6 w-6" /> 8. PLAN DE ACCIÓN (CRONOGRAMA DE EJECUCIÓN)
                    </h2>
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>FASE OPERATIVA</th>
                                <th className={headerCellStyle}>RESPONSABLE</th>
                                <th className={headerCellStyle}>TIEMPO ESTIMADO</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold uppercase text-[10px]">
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Fase 1: Diagnóstico y Auditoría de Nodos</td>
                                <td className={contentCellStyle}>Equipo de Campo</td>
                                <td className={contentCellStyle}>SEMANA 1-2</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Fase 2: Instalación de Bóveda y Ledger Digital</td>
                                <td className={contentCellStyle}>Ing. S. Garrido</td>
                                <td className={contentCellStyle}>SEMANA 3-5</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Fase 3: Despliegue de Unidades Magnéticas (Reciclaje)</td>
                                <td className={contentCellStyle}>Ing. M. Sousa</td>
                                <td className={contentCellStyle}>SEMANA 6-8</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Fase 4: Activación de Inteligencia Fiscal IA</td>
                                <td className={contentCellStyle}>Ing. C. Mattar</td>
                                <td className={contentCellStyle}>SEMANA 9-10</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Fase 5: Lanzamiento y Afiliación Comercial</td>
                                <td className={contentCellStyle}>Dirección General</td>
                                <td className={contentCellStyle}>SEMANA 11-12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PIE DE DOCUMENTO / SELLOS DE AUTENTICIDAD */}
                <footer className="mt-32 pt-16 border-t-4 border-black flex justify-between items-end relative overflow-hidden">
                    <div className="space-y-8">
                        <div className="flex items-center gap-8">
                            <div className="p-3 border-2 border-slate-300 rounded">
                                <FileText className="h-16 w-16 text-slate-300" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contacto Maestro</p>
                                <p className="text-lg font-black italic text-[#0A2472]">systemkyronofficial@gmail.com</p>
                                <p className="text-xs font-bold text-slate-600 tracking-widest">www.systemkyron.com</p>
                            </div>
                        </div>
                        <div className="border-4 border-[#0A2472] p-4 bg-slate-50 inline-block font-black text-xs uppercase tracking-[0.2em] italic text-[#0A2472]">
                            MODELO ZEDU VALIDADO • 2026
                        </div>
                    </div>
                    
                    <div className="text-right space-y-6">
                        <div className="flex flex-col items-end gap-2 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-[#00A86B] animate-pulse shadow-glow-secondary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">SISTEMA: OPERACIONAL</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SELLADO EN BLOCKCHAIN: 0x8F2...3A1</p>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">© 2026 SYSTEM KYRON OFFICIAL • ALL RIGHTS RESERVED</p>
                    </div>
                </footer>

                {/* MARCA DE AGUA DE SEGURIDAD (FONDO) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <div className="border-[30px] border-[#0A2472] rounded-full p-40">
                        <span className="text-[180px] font-black uppercase tracking-[0.5em] italic text-[#0A2472]">MODELO ZEDU</span>
                    </div>
                </div>
            </motion.div>

            {/* STATUS BAR BOTTOM UI */}
            <div className="max-w-5xl mx-auto mt-12 flex justify-center items-center gap-16 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.6em] opacity-60">
                <span className="flex items-center gap-3"><Lock className="h-4 w-4" /> REGISTRO SEGURO</span>
                <span className="flex items-center gap-3"><Activity className="h-4 w-4" /> 2.500 UNIDADES ACTIVAS</span>
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> CERTIFICADO KYRON-HUB</span>
            </div>
        </div>
    );
}
