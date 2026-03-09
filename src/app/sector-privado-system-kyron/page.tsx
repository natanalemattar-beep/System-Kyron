
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
  BarChart3
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
            logoHtml = `<div style="text-align: center; margin-bottom: 20pt;"><img src="${base64}" width="${svgSize}" height="${svgSize}" /></div>`;
        }

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 20pt; }" +
            ".cover { text-align: center; padding-top: 100pt; }" +
            ".cover-title { color: #0A2472; font-size: 32pt; font-weight: bold; margin-bottom: 5pt; text-transform: uppercase; }" +
            ".cover-subtitle { color: #1e293b; font-size: 22pt; font-weight: bold; text-transform: uppercase; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; border: 1pt solid #000000; }" +
            "td, th { border: 1pt solid #000000; padding: 8pt; font-size: 10pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; font-size: 9pt; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8pt; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 4pt; margin-top: 20pt; font-size: 14pt; }" +
            "p { margin-bottom: 8pt; line-height: 1.5; text-align: justify; }" +
            ".page-break { page-break-after: always; }" +
            "</style></head><body>";
        
        const footer = "</body></html>";

        const wordHtml = `
            <div class="cover">
                ${logoHtml}
                <div class="cover-title">MODELO ZEDU</div>
                <div class="cover-subtitle">SYSTEM KYRON</div>
            </div>
            <div class="page-break" style="page-break-after: always;"></div>
            ${contentElement.innerHTML}
        `;
        
        const sourceHTML = header + wordHtml + footer;
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/vnd.ms-word' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'EXPEDIENTE_ZEDU_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPEDIENTE DESCARGADO",
            description: "El documento ha sido generado con éxito.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const tableHeaderClass = "bg-[#0A2472] text-white font-black uppercase p-3 text-[10px] border border-black tracking-widest text-center";
    const tableCellClass = "p-3 text-[11px] border border-black text-slate-900 bg-white leading-relaxed font-medium";
    const tableLabelClass = "bg-slate-50 p-3 text-[9px] font-black uppercase border border-black text-slate-500 w-1/3";

    return (
        <div className="min-h-screen bg-slate-100 py-8 px-4 selection:bg-blue-100">
            {/* Toolbar Superior */}
            <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL PORTAL</Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white border-slate-300 rounded-xl font-bold text-xs uppercase h-10 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-[#0A2472] text-white hover:bg-blue-900 rounded-xl font-black text-xs uppercase h-10 px-8 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD (.DOC)
                    </Button>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-10 md:p-16 text-slate-950 border border-slate-200"
            >
                {/* Portada Compacta */}
                <div className="flex items-start justify-start border-b-2 border-slate-100 mb-12 pb-8 gap-8">
                    <Logo id="main-logo-zedu" className="h-24 w-24 border border-[#0A2472] p-2 bg-white shadow-sm" />
                    <div className="space-y-0 mt-[-2px]">
                        <h1 className="text-4xl font-black text-[#0A2472] uppercase tracking-tighter italic leading-none">MODELO ZEDU</h1>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">SYSTEM KYRON</h2>
                    </div>
                </div>

                <div id="zedu-document-content">
                    {/* 1. IDENTIFICACIÓN */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-6 w-6" /> 1. IDENTIFICACIÓN Y SEDE
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Integrantes del Proyecto</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase")}>Sebastián Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase")}>Marcos Sousa</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Institución de Desarrollo</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Colegio</td>
                                    <td className={tableCellClass} colSpan={2}>Unidad Educativa Privada Colegio Gabriela Mistral</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Ubicación</td>
                                    <td className={tableCellClass} colSpan={2}>Catia la Mar, Estado La Guaira, Venezuela</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>E-mail Oficial</td>
                                    <td className={tableCellClass} colSpan={2}>systemkyronofficial@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. DIAGNÓSTICO ESTRATÉGICO */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Target className="h-6 w-6" /> 2. DIAGNÓSTICO ESTRATÉGICO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis Situacional: Catia la Mar</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Problemática Detectada</td>
                                    <td className={tableCellClass}>La Parroquia Catia la Mar enfrenta un desafío dual: una alta actividad comercial portuaria y una agresiva degradación ambiental causada por la salinidad. Los sistemas tradicionales de gestión basados en papel fallan sistemáticamente, provocando pérdidas de expedientes fiscales y legales críticos. Existe una brecha tecnológica en la formalización de más de 3.000 comercios que operan sin respaldos inmutables, lo que genera vulnerabilidad ante auditorías y desastres físicos.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Objetivo General</td>
                                    <td className={tableCellClass}>Implementar el Ecosistema System Kyron como la solución definitiva de gestión inmutable. Se busca erradicar el riesgo fiscal mediante automatización IA y asegurar la soberanía documental del sector privado de La Guaira. El proyecto integra la formación académica del Colegio Gabriela Mistral con la operatividad empresarial, creando un polo de desarrollo tecnológico sostenible que sirva de modelo para la modernización del estado.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 3. DESCRIPCIÓN TÉCNICA DE UNIDADES */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Cpu className="h-6 w-6" /> 3. UNIDADES OPERATIVAS (MÓDULOS)
                        </h2>
                        
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 01: Blindaje Fiscal IA (Anti-Multas)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Sistema de auditoría predictiva entrenado en la Providencia Administrativa 0071 del SENIAT. La IA valida cada factura en milisegundos, verificando RIF, base imponible y alícuotas. Este módulo garantiza un cumplimiento del 100%, eliminando el factor de error humano que históricamente causa el 95% de las multas tributarias en Venezuela. Incluye un monitor de cambios en la Gaceta Oficial para actualizaciones síncronas de la normativa.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 02: Bóveda de Identidad y Resguardo Digital</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Resguardo de activos documentales bajo protocolo Zero-Knowledge. Los documentos sensibles (Actas, Títulos, Identificaciones) se digitalizan con sellado de tiempo RFC 3161. Esta unidad es inmune a la corrosión salina de Catia la Mar, permitiendo el acceso instantáneo y seguro mediante biometría 3D. El sistema actúa como un fideicomiso de datos, asegurando que la información legal sea inalterable y esté disponible para auditorías inmediatas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 03: Centro de Contabilidad VEN-NIF Pro</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Motor contable ajustado a las Normas de Información Financiera nacionales. Automatiza el Reajuste por Inflación Fiscal (RIF) conectándose directamente a los índices del BCV. Genera Estados de Resultados y Balances Generales en tiempo real, permitiendo a la gerencia tomar decisiones basadas en datos financieros actualizados al segundo, eliminando el retraso típico de los cierres manuales de fin de mes.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 04: Sostenibilidad Magnética e IA Ambiental</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Despliegue de Smart Bins equipados con sensores de inducción magnética. Estos dispositivos clasifican automáticamente polímeros y metales mediante el análisis de conductividad síncrona. Cada residuo procesado se transforma en Eco-Créditos digitales verificados en Blockchain, inyectando una nueva forma de liquidez a la economía local. Este módulo posiciona a los comercios de Catia la Mar como agentes de cambio ecológico activo.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 05: Consultoría Jurídica Automatizada</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Generador inteligente de instrumentos legales técnicos. Basado en el Código de Comercio y la LOTTT, permite la redacción inmediata de contratos de arrendamiento, acuerdos de confidencialidad y actas de asamblea. Cada borrador es supervisado por una base de datos jurisprudencial actualizada, reduciendo costos operativos legales y agilizando la formalización de nuevos negocios y alianzas estratégicas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 06: Gestión de Nómina y Talento Humano</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Administración completa del ciclo laboral bajo la LOTTT. El sistema gestiona desde la contratación hasta el cálculo de prestaciones sociales y utilidades. Automatiza las retenciones de ley (IVSS, FAOV, INCES) y emite recibos de pago digitales sellados con hash de seguridad. Protege a la empresa de pasivos laborales ocultos mediante una auditoría permanente de la antigüedad y beneficios de cada trabajador.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 07: Control de Existencias y Kardex Digital</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Gestión de inventario con valoración multimoneda dinámica. Incluye alertas de stock crítico y reportes de rotación de productos. La integración con el Punto de Venta permite una visibilidad total de los activos físicos, minimizando pérdidas por obsolescencia o falta de control. Es el núcleo de la eficiencia logística para el holding de empresas, optimizando la cadena de suministros en el litoral.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 08: Ledger Blockchain Corporativo</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Protocolo de integridad absoluta para transacciones críticas. Cada factura, cada firma y cada movimiento contable es sellado en una cadena de bloques privada. Esto crea un historial de auditoría innegable que fortalece la confianza de inversionistas y socios internacionales. Es la base de la transparencia operativa, eliminando cualquier posibilidad de alteración de registros históricos.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 09: Ingeniería IA y Cómputos Métricos</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Uso de visión por computadora para la planificación de espacios comerciales. El módulo procesa imágenes de locales y genera planos técnicos a escala con cálculos automáticos de materiales. Optimiza los presupuestos de remodelación y construcción, reduciendo el desperdicio de insumos en un 30% mediante simulaciones espaciales inteligentes. Facilita la expansión rápida del holding hacia nuevas sedes físicas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 10: Centro Académico Gabriela Mistral</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Nodo de transferencia de conocimiento para el manejo del ecosistema. Los estudiantes y personal administrativo reciben formación técnica certificada en gestión fiscal y contable moderna. Esta unidad asegura la sostenibilidad del proyecto a largo plazo, formando la generación de relevo que operará las herramientas de la economía digital en el Municipio Vargas, vinculando la educación con el éxito productivo real.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 4. PRESUPUESTO CAPEX */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-6 w-6" /> 4. INVERSIÓN ESTRATÉGICA (CAPEX)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '75%' }}>Componente del Proyecto</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Monto (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={tableCellClass}>Arquitectura Core de Software y Bóveda Digital Inmutable (Cloud & Blockchain)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Desarrollo y Entrenamiento de Motores de IA: Fiscal, Jurídica e Ingeniería</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                                <tr><td className={tableCellClass}>Unidades de Sostenibilidad (5 Smart Bins Pro con Sensores Magnéticos)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                                <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Centro de Operaciones y Control</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                                <tr><td className={tableCellClass}>Terminales de Captura Biométrica y Protocolos de Seguridad Física</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                                <tr><td className={tableCellClass}>Logística, Despliegue y Capacitación Profesional en la Sede Mistral</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500")}>INVERSIÓN TOTAL PROYECTADA</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-xl text-[#0A2472] italic")}>$ 32.883,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. FACTIBILIDAD FINANCIERA */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-6 w-6" /> 5. FACTIBILIDAD Y RETORNO (ROI)
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis de Viabilidad del Modelo ZEDU</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Rentabilidad Estimada</td>
                                    <td className={tableCellClass}><span className="text-[#00A86B] font-black text-xl">28.5% Anual (TIR)</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>VAN Proyectado</td>
                                    <td className={tableCellClass}><span className="text-[#0A2472] font-black text-xl">$ 450.000,00</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Modelo de Negocio</td>
                                    <td className={tableCellClass}>Esquema de ingresos recurrentes bajo suscripción modular SaaS. Monetización de activos verdes mediante el mercado de Eco-Créditos y servicios de consultoría técnica para la modernización del sector privado regional.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Seguro Operativo</td>
                                    <td className={tableCellClass}>Reducción del riesgo fiscal en un 95%. El sistema actúa como un seguro contra la pérdida de documentos físicos y fallas humanas, garantizando la continuidad operativa bajo cualquier circunstancia externa.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 6. CRONOGRAMA DE DESPLIEGUE */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Terminal className="h-6 w-6" /> 6. CRONOGRAMA OPERATIVO
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Semana</th>
                                    <th className={tableHeaderClass} style={{ width: '75%' }}>Acción de Despliegue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>01 - 04</td><td className={tableCellClass}>Censo comercial y levantamiento técnico en Catia la Mar. Instalación del núcleo de software.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>05 - 12</td><td className={tableCellClass}>Entrenamiento de IA Fiscal y Jurídica. Activación de la Bóveda de Identidad. Pruebas de seguridad.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>13 - 16</td><td className={tableCellClass}>Instalación de Smart Bins y Terminales Biométricos. Activación del Ledger Blockchain.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>17 - 20</td><td className={tableCellClass}>Lanzamiento de la Red de Beneficios. Onboarding de empresas y validación de protocolos finales.</td></tr>
                            </tbody>
                        </table>

                        <div className="mt-12 p-8 bg-slate-50 border-2 border-[#0A2472] rounded-[3rem] text-center shadow-lg">
                            <h3 className="text-xl font-black uppercase text-[#0A2472] mb-4 italic tracking-tight">Conclusión de Dictamen Técnico</h3>
                            <p className="text-[13px] font-bold italic leading-relaxed text-slate-700 text-justify">
                                "El Modelo ZEDU System Kyron representa la vanguardia en gestión inmutable para el sector privado de La Guaira. La integración de tecnologías predictivas y sostenibilidad magnética asegura una ventaja competitiva definitiva para cualquier empresa, protegiendo su patrimonio y garantizando el cumplimiento fiscal absoluto. Este expediente certifica la viabilidad técnica y financiera del proyecto, consolidando al Colegio Gabriela Mistral como el nodo central de innovación para el desarrollo económico del Municipio Vargas."
                            </p>
                            <div className="flex justify-between pt-16 gap-12">
                                <div className="flex-1 border-t-2 border-black pt-3">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Firmas de Integrantes</p>
                                </div>
                                <div className="flex-1 border-t-2 border-black pt-3">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Sello Colegio Gabriela Mistral</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4 text-center opacity-40">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[1.2em] italic">EXPEDIENTE MAESTRO • 2026</p>
                        <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">© SYSTEM KYRON • CÓDIGO DE INTEGRIDAD VERIFICADO • 8 PÁGINAS DE DOCUMENTACIÓN TÉCNICA</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
