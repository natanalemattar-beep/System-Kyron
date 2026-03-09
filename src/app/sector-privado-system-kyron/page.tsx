
"use client";

import { useState, useEffect, useRef } from "react";
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
  Scale,
  Database,
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

        // Clonar para no afectar la vista del usuario
        const clone = contentElement.cloneNode(true) as HTMLElement;
        
        // Convertir el logo SVG a una imagen base64 para que Word lo reconozca
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
            logoHtml = `<img src="${base64}" width="${svgSize}" height="${svgSize}" style="border: 2pt solid black; padding: 5pt;" />`;
        }

        const htmlContent = clone.innerHTML;
        // Reemplazar el contenedor del logo original por la imagen generada
        const finalContent = htmlContent.replace(/<svg[\s\S]*?<\/svg>/, logoHtml);

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU - SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 25pt; border: 1.5pt solid black; }" +
            "td, th { border: 1.0pt solid #000000; padding: 12pt; font-size: 10pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; -webkit-print-color-adjust: exact; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8pt; }" +
            ".title-text { color: #0A2472; font-weight: 900; text-transform: uppercase; }" +
            ".page-break { page-break-after: always; }" +
            "p { margin-bottom: 10pt; line-height: 1.5; text-align: justify; }" +
            "ul { margin-bottom: 10pt; }" +
            "li { margin-bottom: 5pt; }" +
            "</style></head><body>";
        const footer = "</body></html>";
        
        const sourceHTML = header + finalContent + footer;
        
        const blob = new Blob(['\ufeff', sourceHTML], {
            type: 'application/msword'
        });
        
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DOCUMENTO GENERADO",
            description: "El Modelo ZEDU con logo integrado se ha descargado.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const tableHeaderClass = "bg-[#0A2472] text-white font-black uppercase p-5 text-[10px] border-2 border-black tracking-widest text-center";
    const tableCellClass = "p-5 text-[11px] border-2 border-black text-slate-900 bg-white leading-relaxed font-medium";
    const tableLabelClass = "bg-slate-50 p-5 text-[9px] font-black uppercase border-2 border-black text-slate-500 w-1/3";

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 selection:bg-blue-100">
            {/* UI NAVEGACIÓN */}
            <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs uppercase h-11 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
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
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 document-font text-slate-950 relative border border-slate-200 rounded-sm"
            >
                {/* PORTADA - PÁGINA 1 */}
                <div className="min-h-[900px] flex flex-col justify-between border-b-2 border-slate-100 pb-20 mb-20 page-break">
                    <div className="flex justify-between items-start border-b-8 border-[#0A2472] pb-10">
                        <div className="flex items-center gap-8">
                            <div ref={logoContainerRef}>
                                <Logo className="h-32 w-32 border-4 border-black p-2 bg-white" />
                            </div>
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
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={3}>Identificación del Proyecto</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass} colSpan={3}>
                                    <span className="text-2xl font-black text-[#0A2472]">SYSTEM KYRON • CORPORATE INTELLIGENCE</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={tableHeaderClass}>INTEGRANTE</td>
                                <td className={tableHeaderClass}>INTEGRANTE</td>
                                <td className={tableHeaderClass}>INTEGRANTE</td>
                            </tr>
                            <tr>
                                <td className={cn(tableCellClass, "text-center font-black")}>Carlos Mattar</td>
                                <td className={cn(tableCellClass, "text-center font-black")}>Sebastián Garrido</td>
                                <td className={cn(tableCellClass, "text-center font-black")}>Marcos Sousa</td>
                            </tr>
                            <tr>
                                <td className={tableHeaderClass} colSpan={3}>Entidad Educativa y Localización</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Institución</td>
                                <td className={tableCellClass} colSpan={2}>Unidad Educativa Colegio Gabriela Mistral</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Ubicación Operativa</td>
                                <td className={tableCellClass} colSpan={2}>Catia la Mar, Municipio Vargas, Estado La Guaira, Venezuela</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="mt-12 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Introducción Técnica</h3>
                        <p className="text-sm leading-relaxed text-justify">System Kyron es una arquitectura modular de inteligencia de negocios diseñada para neutralizar la complejidad administrativa del sector privado venezolano. Mediante la integración de protocolos de visión artificial, blockchain y contabilidad predictiva, el sistema ofrece una garantía de cumplimiento normativo del 100%, eliminando el riesgo de sanciones y optimizando la cadena de valor de las organizaciones modernas.</p>
                    </div>
                </div>

                {/* 2. POBLACIÓN A TRABAJAR - PÁGINA 3 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Target className="h-6 w-6" /> 2. ANÁLISIS DE POBLACIÓN (NÚCLEO ESTRATÉGICO)
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Segmentación Demográfica Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidades de Gestión</td>
                                <td className={tableCellClass}><span className="font-black text-base">2.500 Nodos de Comercio Afiliado</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Distribución por Actividad</td>
                                <td className={tableCellClass}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Sector Comercial Minorista: 55%</li>
                                        <li>Servicios Profesionales y Consultoría: 25%</li>
                                        <li>Industria Ligera y Almacenaje: 20%</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Condicionantes Geográficos</td>
                                <td className={tableCellClass}>La zona costera de Catia la Mar presenta una corrosión galvánica y deterioro fúngico acelerado en documentos de papel debido al 85% de humedad. La digitalización es una necesidad de supervivencia documental.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3. DIAGNÓSTICO DEL PROBLEMA - PÁGINA 4-5 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Activity className="h-6 w-6" /> 3. DIAGNÓSTICO Y ANÁLISIS DE CRITICIDAD
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass}>DEFINICIÓN DEL CONFLICTO OPERATIVO</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <p className="text-lg font-black italic text-rose-600 leading-tight uppercase text-center py-4">
                                        "FRAGMENTACIÓN DE LA DATA CORPORATIVA Y AUSENCIA DE UN ECOSISTEMA INTEGRADO QUE UNIFIQUE IDENTIDAD, FISCALIDAD Y SOSTENIBILIDAD."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Análisis de Causa Raíz</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <p>Las organizaciones en el Estado La Guaira operan con sistemas aislados que no se comunican entre sí. La información contable no está vinculada a los poderes de representación legal, y la gestión de personal carece de un sellado de tiempo inmutable, lo que facilita errores en declaraciones ante el SENIAT y pérdida de vigencia en documentos ante el SAREN.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="space-y-8 mt-12">
                        <div className="p-10 border-2 border-black rounded-3xl bg-slate-50">
                            <h4 className="font-black text-sm uppercase mb-4 text-[#0A2472]">Consecuencias del Status Quo</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                <li className="flex gap-4">
                                    <span className="text-rose-500 font-black">[!]</span>
                                    <span>Pérdida de patrimonio por multas extemporáneas debidas a la falta de monitoreo de la Gaceta Oficial.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-500 font-black">[!]</span>
                                    <span>Vulnerabilidad jurídica por caducidad de poderes de administración no detectados a tiempo.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-rose-500 font-black">[!]</span>
                                    <span>Impacto ambiental negativo por la gestión ineficiente de residuos plásticos y metálicos comerciales.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA - PÁGINA 6-7 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA MODULAR SYSTEM KYRON
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Unidades de Inteligencia Integrada</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 01: Blindaje Fiscal</td>
                                <td className={tableCellClass}>Motor IA que audita transacciones contra la ley del IVA, ISLR e IGTF en tiempo real, garantizando riesgo cero de multas.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 02: Bóveda de Identidad</td>
                                <td className={tableCellClass}>Registro biométrico 3D de socios y representantes, asegurando que solo personal autorizado ejecute actos de disposición.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 03: Gestión de Capital Humano</td>
                                <td className={tableCellClass}>Automatización de nóminas y beneficios sociales bajo estricto cumplimiento de la LOTTT.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidad 04: Economía Circular</td>
                                <td className={tableCellClass}>Sistema de reciclaje magnético que transforma residuos en Eco-Créditos tokenizados para la empresa.</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="mt-8 p-8 bg-[#00A86B]/10 border-2 border-[#00A86B] rounded-[2rem]">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#00A86B] mb-2">Propuesta de Valor Única</h4>
                        <p className="text-sm font-bold italic leading-relaxed">"System Kyron elimina la necesidad de múltiples proveedores, consolidando la seguridad legal, la eficiencia financiera y la responsabilidad ambiental en un único nodo de mando corporativo."</p>
                    </div>
                </div>

                {/* 5. FACTIBILIDAD ECONÓMICA - PÁGINA 8 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <TrendingUp className="h-6 w-6" /> 5. ESTUDIO DE FACTIBILIDAD ECONÓMICA
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Análisis de Retorno y Viabilidad</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>TIR Proyectada</td>
                                <td className={tableCellClass}><span className="text-[#00A86B] font-black text-base">28.5% Anual</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Margen Operativo</td>
                                <td className={tableCellClass}>32% neto por cada unidad de servicio activada en el ecosistema.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Punto de Equilibrio</td>
                                <td className={tableCellClass}>Estimado en el mes 14 tras el despliegue del Lote 01 en Catia la Mar.</td>
                            </tr>
                            <tr>
                                <td className={headerStyle} colSpan={2}>Estrategia de Mitigación de Riesgos</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass} colSpan={2}>
                                    <p>El sistema utiliza tecnología Cloud-Native con redundancia local para operar sin conexión a internet en caso de fallas de enlace, sincronizando los registros fiscales una vez restablecida la red para no detener la facturación del comercio.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO - PÁGINA 9 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO Y ASIGNACIÓN DE RECURSOS
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '65%' }}>COMPONENTE TÉCNICO</th>
                                <th className={tableHeaderClass} style={{ width: '35%' }}>INVERSIÓN (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}>Arquitectura Core: Bóveda Digital & Contabilidad IA</td><td className={cn(tableCellClass, "text-right font-black")}>$ 12.000,00</td></tr>
                            <tr><td className={tableCellClass}>Hardware de Inducción: Smart Bins Magnéticos (Lote 01)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                            <tr><td className={tableCellClass}>Unidades Biométricas de Grado Legal (Alta Resolución)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                            <tr><td className={tableCellClass}>Terminales Fiscales Homologados para TPV (Integración)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                            <tr><td className={tableCellClass}>Unidad Logística de Despliegue: Moto Bera DT-200</td><td className={cn(tableCellClass, "text-right font-black")}>$ 2.800,00</td></tr>
                            <tr><td className={tableCellClass}>Operación y Campaña de Afiliación (12 Semanas)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.400,00</td></tr>
                            <tr className="bg-slate-100">
                                <td className={cn(tableCellClass, "text-right font-black text-sm uppercase")}>TOTAL INVERSIÓN MAESTRA</td>
                                <td className={cn(tableCellClass, "text-right font-black text-xl text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. ALIADOS - PÁGINA 10 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Scale className="h-6 w-6" /> 7. ALIADOS Y RECURSOS ESTRATÉGICOS
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '45%' }}>ORGANIZACIÓN ALIADA</th>
                                <th className={tableHeaderClass} style={{ width: '55%' }}>MODALIDAD DE APOYO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}><span className="font-black">THE FACTORY HKA</span></td><td className={tableCellClass}>Soporte técnico y provisión de equipos fiscales.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">SAPI / PROPIEDAD INTEL.</span></td><td className={tableCellClass}>Resguardo legal del software y marcas del sistema.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">SAMSUNG / UHD DISPLAY</span></td><td className={tableCellClass}>Terminales de visualización y captura biométrica.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">COLEGIO GABRIELA MISTRAL</span></td><td className={tableCellClass}>Laboratorio de desarrollo y centro de control operativo.</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* 8. PLAN DE ACCIÓN - PÁGINA 11 */}
                <div className="mb-20">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Clock className="h-6 w-6" /> 8. PLAN DE ACCIÓN Y DESPLIEGUE (12 SEMANAS)
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '20%' }}>SEMANA</th>
                                <th className={tableHeaderClass} style={{ width: '50%' }}>ACCIÓN TÉCNICA</th>
                                <th className={tableHeaderClass} style={{ width: '30%' }}>RESPONSABLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cn(tableCellClass, "text-center")}>1 - 2</td><td className={tableCellClass}>Auditoría de Procesos y Levantamiento en Catia la Mar.</td><td className={tableCellClass}>Marcos Sousa</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>3 - 5</td><td className={tableCellClass}>Instalación de Ledger y Configuración de Bóveda ID.</td><td className={tableCellClass}>Carlos Mattar</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>6 - 8</td><td className={tableCellClass}>Despliegue de Smart Bins y Registro de Afiliados.</td><td className={tableCellClass}>Sebastián Garrido</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>9 - 10</td><td className={tableCellClass}>Activación de IA Fiscal y Pruebas de Estrés.</td><td className={tableCellClass}>Carlos Mattar</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>11 - 12</td><td className={tableCellClass}>Lanzamiento Oficial y Certificación de Usuarios.</td><td className={tableCellClass}>Equipo Maestro</td></tr>
                        </tbody>
                    </table>

                    <div className="mt-20 p-12 bg-slate-50 border-4 border-black rounded-sm space-y-8">
                        <h3 className="text-xl font-black uppercase text-[#0A2472] border-b-2 border-[#0A2472] pb-4">Dictamen Maestro de Viabilidad</h3>
                        <p className="text-base font-medium italic text-slate-700 leading-relaxed text-justify">
                            "El Modelo ZEDU para System Kyron representa la culminación de un proceso de ingeniería estratégica destinado a elevar el estándar operativo de las empresas. La inmutabilidad de sus registros, combinada con la inteligencia fiscal predictiva, crea un entorno de seguridad jurídica y eficiencia financiera sin precedentes, validando el proyecto como una inversión de alta rentabilidad y bajo riesgo para el ecosistema productivo."
                        </p>
                        <div className="flex flex-col md:flex-row justify-between items-end pt-12 gap-12">
                            <div className="text-center w-full md:w-64">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase">Firma del Equipo</p>
                                    <p className="text-[10px] text-slate-400">System Kyron Official</p>
                                </div>
                            </div>
                            <div className="text-center w-full md:w-64">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase">Sello Institucional</p>
                                    <p className="text-[10px] text-slate-400">MARZO 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PIE DE PÁGINA FINAL */}
                <footer className="mt-20 pt-10 border-t-2 border-slate-100 flex flex-col items-center gap-4 text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.8em]">DOCUMENTO CONTROLADO • COPIA MAESTRA</p>
                    <p className="text-[8px] font-bold text-slate-400">© 2026 SYSTEM KYRON OFFICIAL • TODOS LOS DERECHOS RESERVADOS</p>
                </footer>
            </motion.div>

            {/* STATUS BAR UI */}
            <div className="max-w-5xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.6em] opacity-60">
                <span className="flex items-center gap-3"><Lock className="h-4 w-4" /> REGISTRO SEGURO</span>
                <span className="flex items-center gap-3"><Activity className="h-4 w-4" /> MODELO ZEDU ACTIVO</span>
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> CERTIFICADO KYRON-PRO</span>
            </div>
        </div>
    );
}
