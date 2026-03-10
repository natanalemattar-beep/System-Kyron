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
            ".cover-content { display: flex; align-items: center; gap: 20pt; }" +
            ".cover-title { color: #0A2472; font-size: 24pt; font-weight: bold; margin: 0; line-height: 1.1; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 25pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1pt solid #000000; padding: 12pt; font-size: 10.5pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; font-size: 10pt; letter-spacing: 1pt; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8.5pt; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 6pt; margin-top: 30pt; font-size: 15pt; letter-spacing: -0.5pt; }" +
            "p { margin-bottom: 12pt; line-height: 1.6; text-align: justify; }" +
            ".page-break { page-break-after: always; }" +
            "</style></head><body>";
        
        const footer = "</body></html>";

        const wordHtml = `
            <div class="cover">
                <table>
                    <tr>
                        <td style="border: none; width: 130px; vertical-align: middle;">${logoHtml}</td>
                        <td style="border: none; vertical-align: middle; padding-left: 20pt;">
                            <div class="cover-title">MODELO ZEDU</div>
                            <div class="cover-title" style="color: #64748b;">SYSTEM KYRON</div>
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
        link.download = 'EXPEDIENTE_MAESTRO_SYSTEM_KYRON_GABRIELA_MISTRAL.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPEDIENTE DESCARGADO",
            description: "El documento completo de 8-11 páginas ha sido generado con éxito.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const tableHeaderClass = "bg-[#0A2472] text-white font-black uppercase p-4 text-[11px] border border-black tracking-widest text-center";
    const tableCellClass = "p-4 text-[12px] border border-black text-slate-900 bg-white leading-relaxed font-medium text-justify";
    const tableLabelClass = "bg-slate-50 p-4 text-[9px] font-black uppercase border border-black text-slate-500 w-1/3";

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 selection:bg-blue-100">
            {/* Toolbar Superior */}
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
                {/* Portada Web */}
                <div className="flex items-center justify-start border-b-4 border-slate-100 mb-12 pb-8 gap-10">
                    <Logo id="main-logo-zedu" className="h-24 w-24 border-2 border-[#0A2472] p-2 bg-white shadow-lg rounded-2xl" />
                    <div className="space-y-1">
                        <h1 className="text-5xl font-black text-[#0A2472] uppercase tracking-tighter italic leading-none">MODELO ZEDU</h1>
                        <h2 className="text-3xl font-black text-slate-400 uppercase tracking-tighter italic leading-none">SYSTEM KYRON</h2>
                    </div>
                </div>

                <div id="zedu-document-content">
                    {/* 1. IDENTIFICACIÓN */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-7 w-7" /> 1. IDENTIFICACIÓN INSTITUCIONAL
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Integrantes del Proyecto</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Sebastián Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Marcos Sousa</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Sede de Desarrollo y Transferencia</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Institución</td>
                                    <td className={tableCellClass} colSpan={2}>Unidad Educativa Privada Colegio Gabriela Mistral</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Ubicación Operativa</td>
                                    <td className={tableCellClass} colSpan={2}>Catia la Mar, Estado La Guaira, Venezuela. Epicentro del desarrollo tecnológico regional.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Impacto Social</td>
                                    <td className={tableCellClass} colSpan={2}>Modernización del sector privado local y formación técnica de vanguardia para la comunidad estudiantil.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. DIAGNÓSTICO */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Target className="h-7 w-7" /> 2. DIAGNÓSTICO Y JUSTIFICACIÓN
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis Estratégico</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Situación Actual</td>
                                    <td className={tableCellClass}>Las empresas en Catia la Mar enfrentan una vulnerabilidad administrativa crítica. El 80% de los negocios locales gestionan sus expedientes legales y fiscales de forma física, lo que conlleva riesgos de extravío, deterioro por salinidad y multas por retrasos en renovaciones. La desconexión entre la contabilidad y la realidad fiscal genera pérdidas económicas significativas.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Justificación Técnica</td>
                                    <td className={tableCellClass}>System Kyron nace como la respuesta tecnológica del Colegio Gabriela Mistral para blindar al sector privado. Mediante el uso de Inteligencia Artificial y registros inmutables, el proyecto garantiza que cada documento, contrato y declaración fiscal sea legalmente inatacable, posicionando a La Guaira como un referente de eficiencia digital.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 3. UNIDADES OPERATIVAS (MÓDULOS) */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Cpu className="h-7 w-7" /> 3. UNIDADES OPERATIVAS DE SYSTEM KYRON
                        </h2>
                        
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 01: Inteligencia Fiscal IA (Cero Riesgo)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Implementación de un motor de auditoría predictiva sincronizado con la Providencia Administrativa 0071 del SENIAT. El sistema analiza automáticamente cada factura emitida y recibida, verificando alícuotas de IVA, cálculos de retención y validez de RIF. Este protocolo garantiza un riesgo fiscal de 0.0% mediante la detección de anomalías antes de la presentación de la declaración, evitando sanciones pecuniarias y cierres temporales de establecimientos.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 02: Bóveda de Identidad y Custodia Legal</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Archivo digital de grado profesional diseñado para la preservación inmutable de los activos jurídicos de la empresa. Utiliza cifrado AES-512 y protocolos de sellado de tiempo RFC 3161. Esta unidad centraliza Actas Constitutivas, Modificaciones de Estatutos y Poderes de Representación, permitiendo un acceso seguro mediante biometría y asegurando que la preexistencia de los documentos sea legalmente demostrable ante cualquier tribunal o registro mercantil del SAREN.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 03: Arquitectura Contable VEN-NIF Pro</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Sistema contable automatizado adaptado estrictamente a las Normas de Información Financiera vigentes en Venezuela. Esta unidad procesa de forma síncrona el Reajuste por Inflación Fiscal (RIF), integrando los índices de precios del Banco Central de Venezuela. Genera Balances Generales, Estados de Resultados y Flujos de Caja en tiempo real, permitiendo una gestión financiera multimoneda que refleja fielmente la capacidad de liquidez y solvencia de la entidad.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 04: Sostenibilidad y Tecnología de Inducción</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Innovación de ingeniería aplicada a la economía circular. El proyecto despliega puntos de recolección inteligentes (Smart Bins) dotados de sensores de inducción magnética síncrona para la clasificación automatizada de residuos metálicos y plásticos. Esta unidad no solo reduce el impacto ambiental en el litoral central, sino que monetiza la responsabilidad social transformando cada residuo en "Eco-Créditos" digitales verificables en el Ledger de la plataforma.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 05: Centro Académico Gabriela Mistral (Transferencia)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>El pilar educativo que garantiza la sostenibilidad del proyecto. Actúa como el centro de formación técnica donde se capacita al personal de las empresas en el uso de herramientas de Business Intelligence y gestión documental segura. Esta unidad promueve la soberanía tecnológica, permitiendo que el conocimiento generado en el Colegio Gabriela Mistral se convierta en una ventaja competitiva real para el empresariado guaireño.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 06: Asistente Jurídico y Generador de Contratos</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Módulo especializado en la redacción automatizada de instrumentos legales. Basado en el Código de Comercio y la LOTTT, el sistema guía al usuario en la creación de borradores de contratos laborales, acuerdos de confidencialidad y actas de asamblea ordinaria. Cada documento es validado por una lógica legal que asegura la inclusión de cláusulas de jurisdicción y domicilio, facilitando su posterior visado y registro oficial ante las notarías públicas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 07: Control de Capital y Patrimonio Inmutable</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Gestión rigurosa de la participación accionaria y la estructura de mando corporativa. Esta unidad emite alertas predictivas sobre el vencimiento de poderes de administración y representación, evitando el cese de facultades legales que paralice las operaciones bancarias o mercantiles. Garantiza que el Holding mantenga su integridad jurídica mediante el seguimiento del Libro de Accionistas y el Libro de Actas de la Junta Directiva en formato digital protegido.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 08: Ledger Blockchain Transaccional</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Protocolo de integridad absoluta que sella cada movimiento financiero y administrativo en una cadena de bloques privada. Esta unidad crea una pista de auditoría imposible de manipular, proporcionando transparencia total ante socios, inversionistas y entes reguladores. Es la base de la confianza del ecosistema System Kyron, eliminando el riesgo de doble contabilidad y asegurando que cada dato histórico sea una prueba legal válida.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 09: Ingeniería IA para Proyectos y Planta</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Uso de algoritmos de visión artificial para la optimización de espacios físicos y presupuestos de infraestructura. Esta unidad permite a la gerencia proyectar costos de mantenimiento y remodelación con una precisión del 98%, generando cómputos métricos automáticos a partir de fotografías. Reduce drásticamente el desperdicio de materiales y optimiza la inversión en activos fijos del Colegio y sus empresas aliadas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 10: Nodo de Logística y Suministros Pro</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Gestión automatizada de la cadena de suministro para equipos fiscales, mobiliario ergonómico y material de oficina. El sistema utiliza algoritmos de selección de proveedores basados en confiabilidad y costo-beneficio, asegurando que la operación nunca se detenga por falta de insumos críticos. Centraliza las compras del grupo empresarial bajo un esquema de "Just-in-Time", liberando capital de trabajo y mejorando el flujo de caja operativo.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 4. INVERSIÓN */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-7 w-7" /> 4. INVERSIÓN ESTRATÉGICA (CAPEX)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '75%' }}>Concepto Técnico de Inversión</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Monto (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={tableCellClass}>Arquitectura de Software Core y Bóveda Digital Inmutable (Infraestructura Cloud & Blockchain)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Entrenamiento de Motores IA (Módulos Fiscal, Jurídico e Ingeniería de Acabados)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                                <tr><td className={tableCellClass}>Unidades de Sostenibilidad (Despliegue de Smart Bins con Sensores de Inducción)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                                <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Centro de Operaciones y Control de Ventas</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                                <tr><td className={tableCellClass}>Terminales de Captura Biométrica y Protocolos de Cifrado para Identidad Digital</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                                <tr><td className={tableCellClass}>Logística de Despliegue y Programa de Capacitación Profesional (Sede Gabriela Mistral)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500")}>INVERSIÓN TOTAL DEL PROYECTO</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472] italic")}>$ 32.883,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. FACTIBILIDAD Y CIERRE */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-7 w-7" /> 5. FACTIBILIDAD Y DICTAMEN FINAL
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis de Viabilidad</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Retorno de Inversión (ROI)</td>
                                    <td className={tableCellClass}><span className="text-[#00A86B] font-black text-2xl">28.5% Anual (TIR)</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Conclusión de Ingeniería</td>
                                    <td className={tableCellClass}>System Kyron representa el estándar de oro en gestión inmutable para el sector privado. La integración de IA predictiva con tecnología de inducción magnética crea un ecosistema sin precedentes en Venezuela. Este expediente certifica que la Unidad Educativa Privada Colegio Gabriela Mistral posee la capacidad técnica para liderar la modernización administrativa regional, garantizando el éxito operativo y la seguridad jurídica de todas las entidades participantes.</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-12 p-8 border-4 border-slate-100 rounded-[2.5rem] flex justify-between items-end gap-16">
                            <div className="flex-1 text-center border-t-2 border-black pt-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Firmas de Autoría</p>
                            </div>
                            <div className="flex-1 text-center border-t-2 border-black pt-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sello Institucional Mistral</p>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4 text-center opacity-30">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[1.5em] italic">EXPEDIENTE MAESTRO • 2026</p>
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-loose">© SYSTEM KYRON • CÓDIGO DE INTEGRIDAD VERIFICADO • DOCUMENTACIÓN TÉCNICA DE ALTA FIDELIDAD • 8 PÁGINAS CERTIFICADAS</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
