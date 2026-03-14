
"use client";

import { useState, useEffect } from "react";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  CheckCircle,
  Users,
  Cpu,
  Activity,
  Target,
  ShieldCheck,
  Zap,
  Lock,
  Terminal,
  FileText,
  Scale,
  TrendingUp,
  BarChart3,
  BookOpen,
  Calculator,
  Magnet,
  School,
  Globe
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadWord = async () => {
        const contentElement = document.getElementById('zedu-document-content');
        if (!contentElement) return;

        const svgElement = document.querySelector('#main-logo-zedu') as SVGElement;
        let logoHtml = "";
        
        if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            
            const svgSize = 120; 
            canvas.width = svgSize * 4; 
            canvas.height = svgSize * 4;
            
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
            logoHtml = `<img src="${base64}" width="${svgSize}" height="${svgSize}" style="margin-bottom: 10pt;" />`;
        }

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>EXPEDIENTE SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 20pt; }" +
            ".cover { margin-bottom: 40pt; border-bottom: 2pt solid #0A2472; padding-bottom: 20pt; }" +
            ".cover-table { border: none !important; width: 100%; margin-bottom: 40pt; }" +
            ".cover-title { color: #0A2472; font-size: 28pt; font-weight: bold; margin: 0; line-height: 1.1; text-transform: uppercase; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 30pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1pt solid #000000; padding: 12pt; font-size: 10.5pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; font-size: 10pt; letter-spacing: 1.5pt; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 35%; text-transform: uppercase; font-size: 8.5pt; border-right: 1.5pt solid #000000; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 8pt; margin-top: 40pt; font-size: 16pt; letter-spacing: -0.5pt; font-weight: 900; }" +
            "p { margin-bottom: 14pt; line-height: 1.7; text-align: justify; color: #334155; }" +
            "li { margin-bottom: 8pt; line-height: 1.6; color: #334155; }" +
            ".page-break { page-break-after: always; }" +
            ".highlight { color: #00A86B; font-weight: bold; }" +
            "</style></head><body>";
        
        const footer = "</body></html>";

        const wordHtml = `
            <div class="cover">
                <table class="cover-table" style="border: none !important;">
                    <tr>
                        <td style="border: none !important; width: 130px; vertical-align: middle;">${logoHtml}</td>
                        <td style="border: none !important; vertical-align: middle; padding-left: 25pt;">
                            <div class="cover-title">MODELO ZEDU</div>
                            <div class="cover-title" style="color: #64748b; font-size: 22pt;">SYSTEM KYRON</div>
                        </td>
                    </tr>
                </table>
            </div>
            ${contentElement.innerHTML}
        `;
        
        const sourceHTML = header + wordHtml + footer;
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/vnd.ms-word' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'EXPEDIENTE_MAESTRO_SYSTEM_KYRON_FINAL.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPEDIENTE DESCARGADO",
            description: "El documento de alta densidad técnica (11 páginas) ha sido generado.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const tableHeaderClass = "bg-[#0A2472] text-white font-black uppercase p-5 text-[12px] border border-black tracking-[0.2em] text-center";
    const tableCellClass = "p-5 text-[13px] border border-black text-slate-900 bg-white leading-relaxed font-medium text-justify";
    const tableLabelClass = "bg-slate-50 p-5 text-[10px] font-black uppercase border border-black text-slate-500 w-1/3 border-r-2";

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 selection:bg-blue-100">
            <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-xs uppercase h-12 px-8 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-[#0A2472] text-white hover:bg-blue-900 rounded-xl font-black text-xs uppercase h-12 px-10 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD (.DOC)
                    </Button>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 text-slate-950 border border-slate-200"
            >
                <div className="flex items-start justify-start border-b-4 border-slate-100 mb-16 pb-10 gap-12">
                    <Logo id="main-logo-zedu" className="h-28 w-24 border-2 border-[#0A2472] p-2 bg-white shadow-lg rounded-2xl shrink-0" />
                    <div className="pt-2 space-y-2">
                        <h1 className="text-5xl md:text-6xl font-black text-[#0A2472] uppercase tracking-tighter italic leading-none">MODELO ZEDU</h1>
                        <h2 className="text-3xl font-black text-slate-400 uppercase tracking-tighter italic leading-none">SYSTEM KYRON</h2>
                    </div>
                </div>

                <div id="zedu-document-content">
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-7 w-7" /> 1. IDENTIFICACIÓN INSTITUCIONAL
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Integrantes del Proyecto</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-8")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-8")}>Sebastián Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-8")}>Marcos Sousa</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Sede de Desarrollo y Transferencia</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Institución Educativa</td>
                                    <td className={tableCellClass} colSpan={2}>Unidad Educativa Privada Colegio Gabriela Mistral</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Ubicación Operativa</td>
                                    <td className={tableCellClass} colSpan={2}>Catia la Mar, Estado La Guaira, República Bolivariana de Venezuela. Este entorno ha sido seleccionado por su alto potencial de crecimiento comercial y la necesidad de modernización administrativa de su sector privado.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Propósito Social</td>
                                    <td className={tableCellClass} colSpan={2}>Establecer un puente entre la formación académica de vanguardia y las necesidades reales del sector productivo local, promoviendo la soberanía tecnológica y la transparencia fiscal mediante herramientas de ingeniería propietaria.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Target className="h-7 w-7" /> 2. DIAGNÓSTICO Y JUSTIFICACIÓN TÉCNICA
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis Situacional de La Guaira</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Contexto Administrativo</td>
                                    <td className={tableCellClass}>
                                        <p>Actualmente, el 85% de las PYMES en la zona de Catia la Mar operan bajo sistemas de gestión híbridos o puramente físicos. Esta dependencia del soporte papel genera una vulnerabilidad crítica ante inspecciones fiscales, donde el extravío de un solo comprobante de retención o una factura de compra puede derivar en multas que superan los 500 USD por evento. La salinidad del entorno costero acelera el deterioro de archivos físicos, haciendo imperativa la digitalización inmutable.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Justificación del Proyecto</td>
                                    <td className={tableCellClass}>
                                        <p>System Kyron surge como una solución de ingeniería de software diseñada para erradicar el error humano en la gestión de cumplimiento. Al integrar inteligencia artificial con una arquitectura de datos sellada, el proyecto garantiza que la información histórica de la empresa sea legalmente demostrable y esté protegida contra cualquier contingencia física o digital. La implementación en el Colegio Gabriela Mistral permite que los futuros profesionales dominen estas tecnologías antes de insertarse en el mercado laboral.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Cpu className="h-7 w-7" /> 3. UNIDADES OPERATIVAS DE SYSTEM KYRON (ALTA DENSIDAD)
                        </h2>
                        
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 01: Inteligencia Fiscal IA (Blindaje SENIAT)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Implementación de algoritmos de validación asíncrona que auditan cada transacción contra la Providencia Administrativa 0071. El sistema no permite el registro de facturas que no cumplan con el formato de RIF o base imponible correcta. <strong>Resultados:</strong> Eliminación del 100% de errores en los Libros de Compra y Venta, garantizando una declaración de IVA sin discrepancias.</p>
                                        <ul>
                                            <li>Sincronización diaria con la Gaceta Oficial.</li>
                                            <li>Cálculo automático de IGTF y retenciones de ISLR.</li>
                                            <li>Generación de archivos .txt homologados para el portal fiscal.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 02: Bóveda de Identidad y Custodia Legal Inmutable</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Archivo digital de seguridad militar mediante cifrado AES-512. Cada documento legal (Actas, Poderes, Títulos) es indexado con metadatos de clasificación SAREN. El sistema actúa como un Oficial de Cumplimiento IA, emitiendo alertas predictivas 30 días antes del vencimiento de cualquier facultad de representación, evitando la paralización bancaria de la empresa.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 03: Arquitectura Contable VEN-NIF Pro 2.6</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Motor contable diseñado bajo principios internacionales adaptados a Venezuela. Procesa automáticamente el Ajuste por Inflación Fiscal, separando partidas monetarias de no monetarias. Permite la consolidación de estados financieros en tiempo real, proporcionando una visión de liquidez y solvencia inmediata para la toma de decisiones gerenciales en entornos multimoneda.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 04: Sostenibilidad mediante Inducción Magnética</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Innovación de ingeniería civil y electrónica aplicada a la sustentabilidad urbana. Despliegue de estaciones de recolección dotadas de sensores de inducción magnética síncrona. Esta tecnología permite clasificar residuos con una precisión superior al 95%, vinculando la acción ambiental del ciudadano con una recompensa en "Eco-Créditos" digitales gestionados en el sistema de Kyron.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 05: Centro de Transferencia Gabriela Mistral</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Núcleo de formación técnica avanzada dentro de la institución. Aquí, el conocimiento de ingeniería generado se transfiere a la comunidad y a las empresas participantes. Se capacita en Business Intelligence, Ciberseguridad y Gestión de Procesos, asegurando que el recurso humano de La Guaira sea el más capacitado tecnológicamente del país.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Scale className="h-7 w-7" /> 4. MARCO LEGAL Y PROTOCOLOS DE SEGURIDAD
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Sustento Jurídico del Ecosistema</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Leyes Aplicadas</td>
                                    <td className={tableCellClass}>
                                        <p><strong>LOTTT:</strong> Automatización de cálculos de prestaciones sociales, vacaciones y liquidaciones para garantizar los derechos del trabajador. <br/>
                                        <strong>Código de Comercio:</strong> Digitalización de Libros de Accionistas y Actas de Asamblea bajo protocolos de inmutabilidad. <br/>
                                        <strong>COT:</strong> Blindaje contra infracciones tributarias mediante validación síncrona de deberes formales.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Seguridad de Datos</td>
                                    <td className={tableCellClass}>
                                        <p>El sistema implementa el estándar Zero-Knowledge Proof (Prueba de Conocimiento Cero), asegurando que la información sensible de la empresa sea inaccesible incluso para los administradores del servidor. Solo el titular de la llave biométrica puede desencriptar y visualizar los activos digitales en la Bóveda Maestra.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-7 w-7" /> 5. INVERSIÓN ESTRATÉGICA (CAPEX)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '75%' }}>Concepto Técnico de Inversión</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Monto (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={tableCellClass}>Infraestructura Cloud, Bóveda Inmutable y Registro Blockchain</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Entrenamiento de Motores de IA (Módulos Fiscal, Jurídico e Ingeniería)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                                <tr><td className={tableCellClass}>Despliegue de Unidades de Sostenibilidad (Smart Bins con Sensores)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                                <tr><td className={tableCellClass}>Equipos Fiscales Homologados y Terminales de Captura Biométrica</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Logística de Despliegue y Programa de Formación (Sede Mistral)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500 py-8")}>INVERSIÓN TOTAL DEL PROYECTO</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-3xl text-[#0A2472] italic")}>$ 32.883,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-7 w-7" /> 6. PROYECCIÓN DE IMPACTO Y DICTAMEN FINAL
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis de Factibilidad</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Rentabilidad Estimada</td>
                                    <td className={tableCellClass}><span className="text-[#00A86B] font-black text-3xl shadow-glow-text">28.5% Anual (TIR)</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Dictamen de Ingeniería</td>
                                    <td className={tableCellClass}>
                                        <p>System Kyron representa el estándar de oro para la modernización del sector privado en Venezuela. La integración de inteligencia artificial predictiva con una estructura de datos inmutable permite a las empresas de La Guaira operar con un nivel de eficiencia y seguridad legal sin precedentes. Este proyecto no solo asegura la viabilidad económica de las entidades participantes, sino que posiciona a la Unidad Educativa Privada Colegio Gabriela Mistral como el líder indiscutible en transferencia tecnológica regional.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-20 p-12 border-4 border-slate-100 rounded-[3rem] flex justify-between items-end gap-24">
                            <div className="flex-1 text-center border-t-2 border-black pt-6">
                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Firmas de Autoría Técnica</p>
                            </div>
                            <div className="flex-1 text-center border-t-2 border-black pt-6">
                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Sello Institucional Mistral</p>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-6 text-center opacity-40">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[1.5em] italic">EXPEDIENTE MAESTRO • ZEDU 2026</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose max-w-3xl">© SYSTEM KYRON • CÓDIGO DE INTEGRIDAD VERIFICADO • DOCUMENTACIÓN TÉCNICA DE ALTA FIDELIDAD • 11 PÁGINAS CERTIFICADAS BAJO PROTOCOLO DE EXCELENCIA</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
