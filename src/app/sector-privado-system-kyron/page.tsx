
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  CheckCircle,
  ShieldCheck,
  FileText,
  Users,
  Zap,
  TrendingUp,
  Cpu,
  Scale,
  Database,
  Terminal,
  Activity,
  Target,
  BarChart3,
  Recycle,
  Gavel,
  Calculator,
  Shield,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

/**
 * @fileOverview Modelo ZEDU System Kyron - Expediente Maestro de Grado Corporativo.
 * Estructura de 11 páginas diseñada para la Unidad Educativa Privada Colegio Gabriela Mistral.
 */

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const logoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadWord = async () => {
        const contentElement = document.getElementById('zedu-document-content');
        if (!contentElement) return;

        const clone = contentElement.cloneNode(true) as HTMLElement;
        const svgElement = contentElement.querySelector('svg');
        let logoHtml = "";
        
        if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            
            const svgSize = 120;
            canvas.width = svgSize * 2;
            canvas.height = svgSize * 2;
            
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            
            await new Promise((resolve) => {
                img.onload = () => {
                    if (ctx) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    }
                    URL.revokeObjectURL(url);
                    resolve(true);
                };
                img.src = url;
            });
            
            const base64 = canvas.toDataURL("image/png");
            logoHtml = `<div style="text-align: center; margin-bottom: 20pt;"><img src="${base64}" width="${svgSize}" height="${svgSize}" style="border: 2pt solid #0A2472; padding: 5pt;" /></div>`;
        }

        const htmlContent = clone.innerHTML;
        const finalContent = htmlContent.replace(/<svg[\s\S]*?<\/svg>/, logoHtml);

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU - SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 20pt; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 25pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1.0pt solid #000000; padding: 12pt; font-size: 10pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8pt; }" +
            ".page-break { page-break-after: always; }" +
            "h1, h2, h3 { color: #0A2472; text-transform: uppercase; }" +
            "p { margin-bottom: 10pt; line-height: 1.6; text-align: justify; }" +
            "ul { margin-bottom: 10pt; }" +
            "li { margin-bottom: 5pt; }" +
            ".text-green { color: #00A86B; font-weight: bold; }" +
            "</style></head><body>";
        const footer = "</body></html>";
        
        const sourceHTML = header + finalContent + footer;
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/vnd.ms-word' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA INICIADA",
            description: "El Modelo ZEDU se ha exportado como documento de Word.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const tableHeaderClass = "bg-[#0A2472] text-white font-black uppercase p-5 text-[10px] border-2 border-black tracking-widest text-center";
    const tableCellClass = "p-5 text-[11px] border-2 border-black text-slate-900 bg-white leading-relaxed font-medium";
    const tableLabelClass = "bg-slate-50 p-5 text-[9px] font-black uppercase border-2 border-black text-slate-500 w-1/3";

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 selection:bg-blue-100">
            <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-xs uppercase h-11 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-[#0A2472] text-white hover:bg-blue-900 rounded-xl font-black text-xs uppercase h-11 px-8 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD (.DOC)
                    </Button>
                </div>
            </div>

            <motion.div 
                id="zedu-document-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 text-slate-950 border border-slate-200"
            >
                {/* PORTADA - PÁGINA 1 */}
                <div className="min-h-[950px] flex flex-col items-center justify-center border-b-2 border-slate-100 pb-20 mb-20 page-break text-center">
                    <div className="space-y-12 w-full flex flex-col items-center">
                        <div ref={logoContainerRef} className="mb-10">
                            <Logo className="h-48 w-48 border-8 border-[#0A2472] p-4 bg-white shadow-2xl" />
                        </div>
                        
                        <div className="space-y-6">
                            <h1 className="text-7xl font-black uppercase tracking-tighter text-[#0A2472] leading-none italic">
                                MODELO ZEDU
                            </h1>
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 italic">
                                SYSTEM KYRON
                            </h2>
                        </div>

                        <div className="w-32 h-2 bg-[#00A86B] my-10"></div>

                        <div className="space-y-4">
                            <p className="text-sm font-bold uppercase tracking-[0.5em] text-slate-400">Expediente Maestro de Gestión Corporativa</p>
                            <p className="text-xl font-black text-slate-800 uppercase italic tracking-widest">Unidad Educativa Privada Colegio Gabriela Mistral</p>
                        </div>

                        <div className="pt-24 grid grid-cols-2 gap-24 w-full max-w-2xl">
                            <div className="text-left space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede Operativa</p>
                                <p className="font-bold text-sm">Catia la Mar, Edo. La Guaira</p>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado Documental</p>
                                <p className="font-bold text-[#00A86B] text-sm flex items-center justify-end gap-2">
                                    <ShieldCheck className="h-4 w-4" /> VERIFICADO 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. INFORMACIÓN DEL EQUIPO - PÁGINA 2 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Users className="h-6 w-6" /> 1. INFORMACIÓN DEL EQUIPO PROMOTOR
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={3}>Integrantes del Proyecto</td>
                            </tr>
                            <tr>
                                <td className={cn(tableCellClass, "text-center font-black py-8")}>Carlos Mattar</td>
                                <td className={cn(tableCellClass, "text-center font-black py-8")}>Sebastián Garrido</td>
                                <td className={cn(tableCellClass, "text-center font-black py-8")}>Marcos Sousa</td>
                            </tr>
                            <tr>
                                <td className={tableHeaderClass} colSpan={3}>Sede Institucional</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Institución</td>
                                <td className={tableCellClass} colSpan={2}>Unidad Educativa Privada Colegio Gabriela Mistral</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Localización</td>
                                <td className={tableCellClass} colSpan={2}>Catia la Mar, Municipio Vargas, Estado La Guaira, Venezuela</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Correo Oficial</td>
                                <td className={tableCellClass} colSpan={2}>systemkyronofficial@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="mt-12 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Resumen de Trayectoria</h3>
                        <p className="text-sm leading-relaxed text-justify">El equipo promotor de System Kyron se constituye como una fuerza multidisciplinaria dedicada a la resolución de conflictos estructurales mediante la tecnología. Con base en la Unidad Educativa Privada Colegio Gabriela Mistral, hemos desarrollado una arquitectura de software que unifica la fiscalidad, la identidad y la sostenibilidad, posicionando a La Guaira como un centro de innovación tecnológica de referencia nacional.</p>
                    </div>
                </div>

                {/* 2. POBLACIÓN A TRABAJAR - PÁGINA 3 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Target className="h-6 w-6" /> 2. POBLACIÓN A TRABAJAR (CENTRO ESTRATÉGICO)
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Análisis Demográfico y Operativo: Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidades de Negocio</td>
                                <td className={tableCellClass}><span className="font-black text-lg text-[#0A2472]">2.500 Unidades Comerciales Identificadas</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Perfil Poblacional</td>
                                <td className={tableCellClass}>Emprendedores, comerciantes y microempresarios del sector servicios y logística portuaria en la Parroquia Catia la Mar.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Características del Entorno</td>
                                <td className={tableCellClass}>Zona costera con alta salinidad y humedad relativa (superior al 85% anual). Esta condición climática genera un deterioro crítico en los archivos físicos de papel, haciendo de la digitalización inmutable una necesidad de preservación legal y operativa.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3. DIAGNÓSTICO DEL PROBLEMA - PÁGINA 4 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Activity className="h-6 w-6" /> 3. DIAGNÓSTICO DE LA PROBLEMÁTICA
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass}>DEFINICIÓN CENTRAL DEL CONFLICTO</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <p className="text-lg font-black italic text-rose-600 leading-tight uppercase text-center py-6">
                                        "AUSENCIA DE UN ECOSISTEMA INTEGRADO QUE UNIFIQUE LA IDENTIDAD CIUDADANA, LA FISCALIDAD EMPRESARIAL Y LA SOSTENIBILIDAD AMBIENTAL."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Causas Detectadas</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <ul className="list-disc pl-5 space-y-3 text-sm">
                                        <li><strong>Fragmentación Documental:</strong> Registros contables, legales y de identidad residen en silos desconectados.</li>
                                        <li><strong>Procesos Analógicos:</strong> Persistencia del papel en un clima hostil (costa), derivando en la pérdida física de activos informativos.</li>
                                        <li><strong>Desconexión Ambiental:</strong> Residuos vistos como basura y no como activos financieros potenciales.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA - PÁGINA 5-8 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: MÓDULOS SYSTEM KYRON
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Arquitectura de Gestión Integral</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 01: Blindaje Fiscal IA</td>
                                <td className={tableCellClass}>Automatización de declaraciones de IVA, ISLR e IGTF mediante un motor de auditoría predictiva que detecta inconsistencias antes de la fiscalización.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 02: Bóveda de Identidad</td>
                                <td className={tableCellClass}>Biometría facial para crear una ID digital inalterable vinculada a documentos civiles con sello de tiempo inmutable.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 03: Gestión VEN-NIF</td>
                                <td className={tableCellClass}>Contabilidad profesional automatizada con ajustes por inflación basados en índices oficiales del BCV.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 04: Sostenibilidad Magnética</td>
                                <td className={tableCellClass}>Smart Bins con tecnología de inducción magnética síncrona para clasificación de residuos y recompensa en Eco-Créditos.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 05: Asesoría Legal IA</td>
                                <td className={tableCellClass}>Generador inteligente de borradores de contratos y actas de asamblea ajustados a la legislación venezolana.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 06: Administración de Talento</td>
                                <td className={tableCellClass}>Control de nómina y prestaciones sociales bajo la LOTTT con expedientes digitales de personal.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 07: Control de Existencias</td>
                                <td className={tableCellClass}>Inventario inteligente con alertas de stock crítico y valorización de activos en tiempo real.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 08: Auditoría Blockchain</td>
                                <td className={tableCellClass}>Sellado inmutable de cada transacción administrativa para garantizar transparencia total.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 09: Ingeniería IA</td>
                                <td className={tableCellClass}>Generación de planos y presupuestos de obra mediante visión artificial para locales comerciales.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 10: Academia Pro</td>
                                <td className={tableCellClass}>Centro de formación técnica para el personal de las empresas afiliadas al ecosistema.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. FACTIBILIDAD ECONÓMICA - PÁGINA 9 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <TrendingUp className="h-6 w-6" /> 5. FACTIBILIDAD ECONÓMICA
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Indicadores Financieros</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Rentabilidad Proyectada</td>
                                <td className={tableCellClass}><span className="text-[#00A86B] font-black text-xl">28.5% Anual (TIR)</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Valor Actual Neto</td>
                                <td className={tableCellClass}><span className="text-[#0A2472] font-black text-xl">$ 450.000,00</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Modelo de Negocio</td>
                                <td className={tableCellClass}>SaaS (Suscripción por módulos) + Venta de Hardware + Comisiones por el mercado de Eco-Créditos.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO - PÁGINA 10 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO DE ACTIVOS
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '70%' }}>RUBRO ESTRATÉGICO</th>
                                <th className={tableHeaderClass} style={{ width: '30%' }}>INVERSIÓN (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}>Arquitectura de Software y Bóveda Digital</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                            <tr><td className={tableCellClass}>Motores de IA: Fiscal, Legal e Ingeniería</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                            <tr><td className={tableCellClass}>Hardware de Sostenibilidad (5 Smart Bins)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                            <tr><td className={tableCellClass}>Equipos Fiscales Homologados SENIAT</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                            <tr><td className={tableCellClass}>Terminales de Captura Biométrica</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                            <tr><td className={tableCellClass}>Logística y Capacitación (Edo. La Guaira)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                            <tr className="bg-slate-100">
                                <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500")}>TOTAL INVERSIÓN</td>
                                <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. PLAN DE ACCIÓN - PÁGINA 11 */}
                <div className="mb-20">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Terminal className="h-6 w-6" /> 7. PLAN DE ACCIÓN
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '20%' }}>SEMANA</th>
                                <th className={tableHeaderClass} style={{ width: '80%' }}>HITO OPERATIVO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>01-04</td><td className={tableCellClass}>Requerimientos técnicos y censo comercial en Catia la Mar.</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>05-12</td><td className={tableCellClass}>Desarrollo del Core Contable y motor de IA Fiscal.</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>13-16</td><td className={tableCellClass}>Ensamble de Smart Bins y pruebas de inducción magnética.</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>17-20</td><td className={tableCellClass}>Lanzamiento de la Red de Beneficios y Canje de Eco-Créditos.</td></tr>
                        </tbody>
                    </table>

                    <div className="mt-20 p-12 bg-slate-50 border-4 border-[#0A2472] rounded-[3rem] text-center">
                        <h3 className="text-2xl font-black uppercase text-[#0A2472] mb-6 italic">Dictamen Final</h3>
                        <p className="text-base font-bold italic leading-relaxed text-slate-700 text-justify">
                            "El Modelo ZEDU para System Kyron ha sido evaluado bajo parámetros de ingeniería y finanzas rigurosos. Se concluye que el proyecto posee una viabilidad técnica superior, sustentada en la inmutabilidad de los datos y la escalabilidad del modelo de negocio en la República Bolivariana de Venezuela."
                        </p>
                        <div className="flex justify-between pt-16 gap-12">
                            <div className="flex-1 border-t-2 border-black pt-2"><p className="text-[10px] font-black uppercase">Firma de Integrantes</p></div>
                            <div className="flex-1 border-t-2 border-black pt-2"><p className="text-[10px] font-black uppercase">Sello Institucional</p></div>
                        </div>
                    </div>
                </div>

                <footer className="mt-20 pt-10 border-t-2 border-slate-100 flex flex-col items-center gap-4 text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[1em] italic">DOCUMENTO OFICIAL • MODELO ZEDU SYSTEM KYRON</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SYSTEM KYRON • TODOS LOS DERECHOS RESERVADOS</p>
                </footer>
            </motion.div>
        </div>
    );
}
