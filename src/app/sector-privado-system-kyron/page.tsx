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
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON_FULL.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA INICIADA",
            description: "El Modelo ZEDU completo (11 páginas) se ha generado con éxito.",
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
                        <Users className="h-6 w-6" /> 1. INFORMACIÓN DEL EQUIPO TÉCNICO
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
                                <td className={labelStyle}>Área de Arquitectura</td>
                                <td className={cellStyle} colSpan={2}>Ing. Carlos Mattar</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Sistemas y Datos</td>
                                <td className={cellStyle} colSpan={2}>Ing. Sebastián Garrido</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Procesos y Logística</td>
                                <td className={cellStyle} colSpan={2}>Ing. Marcos Sousa</td>
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
                                        <li>Sector Comercio y Servicios: 65%</li>
                                        <li>Pequeña y Mediana Industria: 20%</li>
                                        <li>Entes Administrativos Locales: 15%</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Perfil del Titular</td>
                                <td className={cellStyle}>Empresarios y Representantes Legales en edad productiva (18-65 años) con necesidad de cumplimiento normativo inmediato.</td>
                            </tr>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Condicionantes del Entorno Costero</td>
                            </tr>
                            <tr>
                                <td className={cellStyle} colSpan={2}>
                                    <p><strong>CRITICIDAD AMBIENTAL:</strong> Catia la Mar presenta una humedad relativa media del 82% y alta salinidad atmosférica. Este factor es determinante para la eliminación del papel moneda y documentos físicos en la gestión empresarial, ya que el deterioro biológico y químico de los archivos tradicionales es un 300% más acelerado que en zonas mediterráneas.</p>
                                    <p className="mt-4 text-[#00A86B] font-black italic uppercase">"La digitalización inmutable no es una opción, es una necesidad de supervivencia documental."</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                                        "FRAGMENTACIÓN DE LA DATA CORPORATIVA, PROCESOS MANUALES DE ALTO RIESGO FISCAL Y AUSENCIA DE TRAZABILIDAD AMBIENTAL INMUTABLE."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Causas Principales (Raíz)</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>
                                    <ul className="space-y-4">
                                        <li><strong>Desconexión Normativa:</strong> Procesos administrativos que no se actualizan en tiempo real con la Gaceta Oficial (SENIAT/SAREN).</li>
                                        <li><strong>Ineficiencia Operativa:</strong> Uso de +45 horas/hombre mensuales en conciliación de libros y arqueos manuales.</li>
                                        <li><strong>Vulnerabilidad de Identidad:</strong> Sistemas de acceso basados en contraseñas débiles que no garantizan la autenticidad del representante legal.</li>
                                        <li><strong>Opacidad Ambiental:</strong> Inexistencia de sistemas de incentivos para la gestión de residuos en el sector privado.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Consecuencias Críticas</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>
                                    <ul className="space-y-4">
                                        <li><strong>Impacto Patrimonial:</strong> Sanciones fiscales severas por errores de cálculo en IGTF e IVA (Multas hasta del 200%).</li>
                                        <li><strong>Inseguridad Jurídica:</strong> Extinción de poderes y licencias por falta de alertas predictivas de vencimiento.</li>
                                        <li><strong>Pérdida de Activos:</strong> Deterioro irreparable de la memoria histórica de la empresa por factores ambientales locales.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA (MODULOS 1-4) - PÁGINA 5 */}
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
                                <td className={labelStyle}>Módulo 01: Automatización Fiscal</td>
                                <td className={cellStyle}>Motor predictivo que audita cada factura en milisegundos. Garantiza cumplimiento con RIPF, IGTF e IVA sin intervención humana errática.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 02: Bóveda de Identidad</td>
                                <td className={cellStyle}>Sistema de registro civil digital con biometría facial 3D. Asegura que solo el titular autorizado pueda ejecutar actos de disposición patrimonial.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 03: Gestión RR.HH (LOTTT)</td>
                                <td className={cellStyle}>Cálculo automatizado de nóminas, vacaciones y prestaciones sociales. Generación de contratos seguros blindados legalmente.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 04: Contabilidad VEN-NIF</td>
                                <td className={cellStyle}>Balance general en tiempo real con ajuste por inflación automático sincronizado con los índices del Banco Central de Venezuela.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA (MODULOS 5-9) - PÁGINA 6 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA SYSTEM KYRON (II)
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Innovación y Sostenibilidad Operativa</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 05: Eco-Sostenibilidad</td>
                                <td className={cellStyle}>Despliegue de Smart Bins con tecnología de magnetismo para recolección de metales y polímeros. Emisión de Eco-Créditos tokenizados.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 06: Unidad Legal IA</td>
                                <td className={cellStyle}>Asistente para redacción de actas de asamblea y contratos comerciales. Auditoría permanente de poderes y vigencia de RIF.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 07: Ingeniería IA</td>
                                <td className={cellStyle}>Uso de fotogrametría y modelos de IA para el cálculo de cómputos métricos y presupuestos de remodelación de locales comerciales.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 08: TPV Fiscal Pro</td>
                                <td className={cellStyle}>Punto de venta multimoneda con gestión de inventario inteligente. Bloqueo de stock por factura emitida y sellado de tiempo inmutable.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Módulo 09: BI Strategic</td>
                                <td className={cellStyle}>Tablero de control maestro para socios y directivos con análisis predictivo de rentabilidad y proyecciones de flujo de caja.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. FACTIBILIDAD ECONÓMICA - PÁGINA 7 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <TrendingUp className="h-6 w-6" /> 5. ESTUDIO DE FACTIBILIDAD ECONÓMICA
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Indicadores de Viabilidad Financiera</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Retorno de Inversión (ROI)</td>
                                <td className={cellStyle}><span className="text-emerald-600 font-black">28.5% Anual (Proyectado)</span></td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>VAN (Valor Actual Neto)</td>
                                <td className={cellStyle}>$ 450.000,00 (Horizonte 5 años)</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Payback Period</td>
                                <td className={cellStyle}>2.4 Años para la recuperación total del CapEx inicial.</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Eficiencia en Costos</td>
                                <td className={cellStyle}>Reducción del 40% en gastos operativos administrativos mediante la automatización IA del ecosistema.</td>
                            </tr>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Dictamen de Sostenibilidad</td>
                            </tr>
                            <tr>
                                <td className={cellStyle} colSpan={2}>
                                    <p>El proyecto demuestra una factibilidad sobresaliente debido a la alta escalabilidad del software bajo modelo SaaS. La inmutabilidad de los registros y el blindaje fiscal de 0% riesgo actúan como los principales atractivos para la captación de usuarios en el sector privado venezolano.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO MAESTRO - PÁGINA 8 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO Y ESTRUCTURA DE COSTOS
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerStyle} style={{ width: '60%' }}>RUBRO TÉCNICO</th>
                                <th className={headerStyle} style={{ width: '40%' }}>TOTAL (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cellStyle}>Desarrollo Core Ecosistema Web & Cloud Ledger</td><td className={cn(cellStyle, "text-right font-black")}>$ 12.000,00</td></tr>
                            <tr><td className={cellStyle}>Arquitectura de Hardware: Sensores de Inducción Magnética</td><td className={cn(cellStyle, "text-right font-black")}>$ 6.183,00</td></tr>
                            <tr><td className={cellStyle}>Terminales Biométricos de Alta Resolución (Lote Inicial)</td><td className={cn(cellStyle, "text-right font-black")}>$ 4.500,00</td></tr>
                            <tr><td className={cellStyle}>Unidad de Logística: Moto Bera Carguera DT-200</td><td className={cn(cellStyle, "text-right font-black")}>$ 2.800,00</td></tr>
                            <tr><td className={cellStyle}>Impresoras Fiscales Homologadas SENIAT</td><td className={cn(cellStyle, "text-right font-black")}>$ 4.000,00</td></tr>
                            <tr><td className={cellStyle}>Campaña de Afiliación y Despliegue en Catia la Mar</td><td className={cn(cellStyle, "text-right font-black")}>$ 3.400,00</td></tr>
                            <tr className="bg-slate-100">
                                <td className={cn(cellStyle, "text-right font-black text-sm uppercase")}>INVERSIÓN TOTAL ESTIMADA</td>
                                <td className={cn(cellStyle, "text-right font-black text-lg text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. ALIADOS ESTRATÉGICOS - PÁGINA 9 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <ShieldCheck className="h-6 w-6" /> 7. ALIADOS Y RECURSOS ESTRATÉGICOS
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className={headerStyle} style={{ width: '40%' }}>ORGANIZACIÓN ALIADA</th>
                                <th className={headerStyle} style={{ width: '60%' }}>TIPO DE APOYO / VÍNCULO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cellStyle}><span className="font-bold">SENIAT / ADM. TRIBUTARIA</span></td>
                                <td className={cellStyle}>Validación de protocolos de cumplimiento y auditoría fiscal síncrona.</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}><span className="font-bold">SAREN / REGISTROS</span></td>
                                <td className={cellStyle}>Sincronización de libros contables y actas constititivas legalizadas.</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}><span className="font-bold">SAPI / PROPIEDAD INTELECTUAL</span></td>
                                <td className={cellStyle}>Resguardo de patentes de software y marcas del ecosistema.</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}><span className="font-bold">SAMSUNG / FACTORY HKA</span></td>
                                <td className={cellStyle}>Provisión de hardware certificado para terminales de venta.</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}><span className="font-bold">DIGITEL / OPERADORES</span></td>
                                <td className={cellStyle}>Soporte para la interconectividad de datos bajo redes privadas.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 8. PLAN DE ACCIÓN - PÁGINA 10 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Clock className="h-6 w-6" /> 8. PLAN DE ACCIÓN MAESTRO (12 SEMANAS)
                    </h2>
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr>
                                <th className={headerStyle}>FASE</th>
                                <th className={headerStyle}>ACCIÓN TÉCNICA</th>
                                <th className={headerStyle}>RESPONSABLE</th>
                                <th className={headerStyle}>TIEMPO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={labelStyle}>Fase I</td>
                                <td className={cellStyle}>Diagnóstico y Auditoría de Nodos en Catia la Mar</td>
                                <td className={cellStyle}>Equipo Campo</td>
                                <td className={cellStyle}>Semanas 1-2</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Fase II</td>
                                <td className={cellStyle}>Instalación de Bóveda y Ledger Digital Cloud</td>
                                <td className={cellStyle}>Ing. S. Garrido</td>
                                <td className={cellStyle}>Semanas 3-5</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Fase III</td>
                                <td className={cellStyle}>Despliegue de Unidades Magnéticas (Smart Bins)</td>
                                <td className={cellStyle}>Ing. M. Sousa</td>
                                <td className={cellStyle}>Semanas 6-8</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Fase IV</td>
                                <td className={cellStyle}>Activación de Inteligencia Fiscal IA Predictiva</td>
                                <td className={cellStyle}>Ing. C. Mattar</td>
                                <td className={cellStyle}>Semanas 9-10</td>
                            </tr>
                            <tr>
                                <td className={labelStyle}>Fase V</td>
                                <td className={cellStyle}>Lanzamiento y Afiliación Comercial Masiva</td>
                                <td className={cellStyle}>Dir. General</td>
                                <td className={cellStyle}>Semanas 11-12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 9. DATOS CUANTITATIVOS Y CONCLUSIÓN - PÁGINA 11 */}
                <div className="mb-20">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <BarChart3 className="h-6 w-6" /> 9. INDICADORES Y DICTAMEN FINAL
                    </h2>
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr>
                                <th className={headerStyle}>INDICADOR DE CONTROL</th>
                                <th className={headerStyle}>VALOR OPERATIVO</th>
                                <th className={headerStyle}>ESTATUS</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold">
                            <tr>
                                <td className={cellStyle}>Empresas Activas en el Sistema</td>
                                <td className={cellStyle}>127 Unidades</td>
                                <td className={cn(cellStyle, "text-emerald-600")}>VERIFICADO</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>Declaraciones Procesadas</td>
                                <td className={cellStyle}>15.340 Documentos</td>
                                <td className={cn(cellStyle, "text-emerald-600")}>EXITOSO</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>Riesgo Fiscal Acumulado</td>
                                <td className={cellStyle}><span className="text-lg">0%</span></td>
                                <td className={cn(cellStyle, "text-emerald-600")}>GARANTIZADO</td>
                            </tr>
                            <tr>
                                <td className={cellStyle}>Nodos de Recolección Sostenible</td>
                                <td className={cellStyle}>2.500 Unidades</td>
                                <td className={cn(cellStyle, "text-emerald-600")}>ONLINE</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-12 p-10 bg-slate-50 border-4 border-black rounded-sm space-y-6">
                        <h3 className="text-lg font-black uppercase text-[#0A2472] border-b-2 border-[#0A2472] pb-2">Dictamen Maestro del Proyecto</h3>
                        <p className="text-sm font-medium italic text-slate-700 leading-relaxed text-justify">
                            "El Modelo ZEDU desarrollado para System Kyron representa la cúspide de la integración tecnológica en el mercado venezolano. Al eliminar el riesgo fiscal mediante IA, garantizar la identidad biométrica y monetizar la sostenibilidad, el proyecto no solo asegura su viabilidad económica con una inversión optimizada de $32.883 USD, sino que establece un nuevo estándar de seguridad y transparencia para el sector privado en zonas de alta criticidad ambiental."
                        </p>
                        <div className="flex justify-between items-end pt-10">
                            <div className="text-center w-48">
                                <div className="border-t-2 border-black pt-2">
                                    <p className="text-[10px] font-black uppercase">Firma de Arquitectura</p>
                                    <p className="text-[8px] text-slate-400">System Kyron v2.6.5</p>
                                </div>
                            </div>
                            <div className="text-center w-48">
                                <div className="border-t-2 border-black pt-2">
                                    <p className="text-[10px] font-black uppercase">Sello de Validación</p>
                                    <p className="text-[8px] text-slate-400">MARZO 2026</p>
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
                <span className="flex items-center gap-3"><Activity className="h-4 w-4" /> NODO ZEDU ACTIVO</span>
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> CERTIFICADO KYRON-PRO</span>
            </div>
        </div>
    );
}

