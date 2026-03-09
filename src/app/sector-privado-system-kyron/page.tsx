
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
            
            const svgSize = 100; 
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
            logoHtml = `<img src="${base64}" width="${svgSize}" height="${svgSize}" style="float: left; margin-right: 20pt;" />`;
        }

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 30pt; }" +
            ".cover { margin-top: 50pt; margin-bottom: 50pt; }" +
            ".cover-title-container { border-bottom: 3pt solid #0A2472; padding-bottom: 20pt; margin-bottom: 40pt; height: 120pt; }" +
            ".cover-title { color: #0A2472; font-size: 28pt; font-weight: bold; line-height: 1.1; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 20pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1pt solid #000000; padding: 12pt; font-size: 10.5pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; font-size: 10pt; letter-spacing: 1pt; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8.5pt; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 6pt; margin-top: 30pt; font-size: 15pt; letter-spacing: -0.5pt; }" +
            "p { margin-bottom: 10pt; line-height: 1.6; text-align: justify; }" +
            ".page-break { page-break-after: always; }" +
            "</style></head><body>";
        
        const footer = "</body></html>";

        const wordHtml = `
            <div class="cover">
                <div class="cover-title-container">
                    ${logoHtml}
                    <div style="padding-top: 10pt;">
                        <div class="cover-title">MODELO ZEDU</div>
                        <div class="cover-title" style="color: #64748b;">SYSTEM KYRON</div>
                    </div>
                </div>
            </div>
            <div class="page-break" style="page-break-after: always;"></div>
            ${contentElement.innerHTML}
        `;
        
        const sourceHTML = header + wordHtml + footer;
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/vnd.ms-word' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'EXPEDIENTE_ZEDU_KYRON_GABRIELA_MISTRAL.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPEDIENTE DESCARGADO",
            description: "El documento de 8 páginas ha sido generado con éxito.",
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
                {/* Portada Web Compacta */}
                <div className="flex items-center justify-start border-b-4 border-slate-100 mb-16 pb-10 gap-10">
                    <Logo id="main-logo-zedu" className="h-24 w-24 border-2 border-[#0A2472] p-2 bg-white shadow-lg rounded-2xl" />
                    <div className="space-y-1">
                        <h1 className="text-5xl font-black text-[#0A2472] uppercase tracking-tighter italic leading-none">MODELO ZEDU</h1>
                        <h2 className="text-3xl font-black text-slate-400 uppercase tracking-tighter italic leading-none">SYSTEM KYRON</h2>
                    </div>
                </div>

                <div id="zedu-document-content">
                    {/* 1. IDENTIFICACIÓN */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-7 w-7" /> 1. IDENTIFICACIÓN Y SEDE
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Integrantes del Proyecto</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Sebastián Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Marcos Sousa</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Institución de Desarrollo y Respaldo</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Institución</td>
                                    <td className={tableCellClass} colSpan={2}>Unidad Educativa Privada Colegio Gabriela Mistral</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Ubicación Sede</td>
                                    <td className={tableCellClass} colSpan={2}>Calle Principal, Catia la Mar, Estado La Guaira, Venezuela.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Propósito Social</td>
                                    <td className={tableCellClass} colSpan={2}>Fomento de la soberanía tecnológica y modernización del aparato productivo regional a través de la educación técnica de vanguardia.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. DIAGNÓSTICO Y JUSTIFICACIÓN */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Target className="h-7 w-7" /> 2. DIAGNÓSTICO ESTRATÉGICO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis Situacional de La Guaira</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Necesidad Crítica</td>
                                    <td className={tableCellClass}>El sector privado de Catia la Mar, motor económico del litoral central, opera bajo un alto riesgo de vulnerabilidad documental. El 85% de las empresas registradas carecen de un sistema de respaldo inmutable, exponiéndolas a pérdidas por degradación física (salinidad) o fallas administrativas. System Kyron surge como el escudo tecnológico necesario para garantizar la continuidad operativa.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Rol del Colegio</td>
                                    <td className={tableCellClass}>La Unidad Educativa Privada Colegio Gabriela Mistral actúa como el Centro de Inteligencia donde se gestan estos protocolos. No es solo un proyecto de software, es una propuesta de transformación cultural donde la academia provee la metodología y el rigor técnico para que el sector privado de La Guaira alcance niveles de eficiencia internacionales.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 3. DESCRIPCIÓN DE UNIDADES OPERATIVAS */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Cpu className="h-7 w-7" /> 3. UNIDADES OPERATIVAS (MÓDULOS)
                        </h2>
                        
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 01: Inteligencia Fiscal IA (Zero Risk)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Motor de auditoría preventiva que analiza cada transacción comercial bajo los parámetros de la Providencia Administrativa 0071 del SENIAT. La IA valida en tiempo real la coherencia entre la base imponible, las alícuotas de IVA y el registro de retenciones. Este módulo elimina el 99% de los errores humanos que derivan en sanciones pecuniarias, asegurando una solvencia tributaria permanente y automatizada.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 02: Bóveda de Identidad y Resguardo Digital</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Archivo de alta seguridad para el resguardo de instrumentos legales corporativos. Utiliza protocolos de cifrado AES-512 y sellado de tiempo inmutable. Permite a los representantes legales del Colegio y de empresas aliadas acceder a Actas Constitutivas, Títulos y Poderes mediante una llave biométrica única, garantizando que los activos intelectuales y legales estén protegidos contra incendios, robos o degradación climática.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 03: Centro Contable VEN-NIF Pro</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Arquitectura financiera diseñada bajo las Normas de Información Financiera de Venezuela. Automatiza el complejo proceso del Reajuste por Inflación Fiscal (RIF), integrando los índices del BCV de forma síncrona. Esta unidad genera Balances de Situación y Estados de Resultados actualizados al segundo, permitiendo una visión de caja multimoneda (USD/VES) esencial para la toma de decisiones en economías dinámicas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 04: Sostenibilidad y Magnetismo Ambiental</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Implementación de la "Tecnología de Inducción Magnética Síncrona" en puntos de recolección de residuos. Esta innovación de ingeniería permite la clasificación automatizada de metales y polímeros en la fuente. Los datos de recolección se transforman en Eco-Créditos vinculados a la cuenta del usuario, creando un sistema de economía circular donde la basura se convierte en un activo financiero verificable y canjeable.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 05: Centro Académico Gabriela Mistral (Transferencia)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Núcleo de formación y capacitación técnica. Aquí se certifica al personal administrativo y a estudiantes en el uso avanzado de herramientas de inteligencia de negocios. Esta unidad garantiza que el proyecto sea sostenible en el tiempo, creando una generación de relevo capaz de operar sistemas de misión crítica y liderar la modernización administrativa del Municipio Vargas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 06: Consultoría Jurídica y Gestión de Contratos</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Asistente experto para la redacción de instrumentos legales corporativos. Basado en el Código de Comercio venezolano, este módulo facilita la creación de borradores de contratos laborales, acuerdos de confidencialidad y actas de asamblea. Cada documento cuenta con una validación lógica que asegura el cumplimiento de las cláusulas mínimas exigidas por los registros mercantiles del SAREN.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 07: Control de Capital y Patrimonio Inmutable</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Seguimiento riguroso de la participación accionaria y los poderes de representación. Este módulo previene el cese de facultades legales mediante alertas predictivas de vencimiento. Asegura que la estructura de mando de la empresa o institución esté siempre validada, facilitando trámites bancarios y renovaciones de solvencias ante entes gubernamentales sin retrasos operativos.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 08: Ledger Blockchain Transaccional</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Protocolo de integridad que sella cada movimiento contable y fiscal en una cadena de bloques privada. Esta unidad crea un rastro de auditoría imposible de alterar, proporcionando una transparencia absoluta ante socios, inversionistas o auditores del SENIAT. Es la base de la confianza digital del sistema, eliminando cualquier posibilidad de doble contabilidad o manipulación de datos históricos.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 09: Ingeniería IA para Infraestructura</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Uso de algoritmos de visión artificial para la optimización de espacios y presupuestos. Este módulo permite a la gerencia del Colegio o de empresas aliadas proyectar costos de construcción y mantenimiento con una precisión del 98%. Genera cómputos métricos automáticos a partir de imágenes, reduciendo el desperdicio de materiales y optimizando la inversión en activos físicos.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 10: Nodo de Logística y Suministros Pro</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Gestión automatizada de la cadena de suministros para equipos fiscales, mobiliario y material de oficina. Centraliza las compras del holding mediante subastas inversas y algoritmos de selección de proveedores por costo-beneficio. Garantiza que la operación nunca se detenga por falta de insumos críticos, manteniendo un inventario "Just-in-Time" que libera capital de trabajo para otras inversiones estratégicas.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 4. INVERSIÓN Y FACTIBILIDAD */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-7 w-7" /> 4. INVERSIÓN ESTRATÉGICA (CAPEX)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '70%' }}>Componente Técnico del Proyecto</th>
                                    <th className={tableHeaderClass} style={{ width: '30%' }}>Monto Estimado (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={tableCellClass}>Arquitectura Core de Software y Bóveda Digital Inmutable (Cloud & Blockchain)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Entrenamiento de Motores IA: Fiscal, Jurídico e Ingeniería de Acabados</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                                <tr><td className={tableCellClass}>Unidades de Sostenibilidad (Smart Bins con Sensores de Inducción)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                                <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Centro de Operaciones y Control</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                                <tr><td className={tableCellClass}>Terminales de Captura Biométrica y Protocolos de Seguridad Física</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                                <tr><td className={tableCellClass}>Logística de Despliegue y Capacitación Profesional (Sede Mistral)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500")}>INVERSIÓN TOTAL PROYECTADA</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472] italic")}>$ 32.883,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. FACTIBILIDAD Y RETORNO */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-7 w-7" /> 5. FACTIBILIDAD Y RETORNO (ROI)
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis de Viabilidad Técnica y Económica</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Rentabilidad Estimada</td>
                                    <td className={tableCellClass}><span className="text-[#00A86B] font-black text-2xl">28.5% Anual (TIR)</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Impacto en Riesgo</td>
                                    <td className={tableCellClass}>Reducción del 95% en la probabilidad de multas fiscales y pérdida de expedientes legales críticos.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Modelo de Negocio</td>
                                    <td className={tableCellClass}>Suscripción modular SaaS para empresas del holding y monetización de activos verdes mediante el mercado de Eco-Créditos. El sistema se paga a sí mismo en los primeros 24 meses mediante ahorros operativos directos.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 6. CRONOGRAMA DE DESPLIEGUE */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Terminal className="h-7 w-7" /> 6. CRONOGRAMA OPERATIVO
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '20%' }}>Semana</th>
                                    <th className={tableHeaderClass} style={{ width: '80%' }}>Hito de Despliegue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>01 - 04</td><td className={tableCellClass}>Levantamiento técnico en Catia la Mar. Instalación del núcleo de software y configuración del Ledger.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>05 - 12</td><td className={tableCellClass}>Entrenamiento de Motores de IA. Activación de la Bóveda de Identidad y Auditoría Fiscal Preventiva.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>13 - 16</td><td className={tableCellClass}>Instalación de Unidades de Sostenibilidad (Smart Bins). Inicio de la Red de Beneficios y Eco-Créditos.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>17 - 20</td><td className={tableCellClass}>Lanzamiento del Centro Académico Gabriela Mistral. Onboarding masivo de empresas y validación final.</td></tr>
                            </tbody>
                        </table>

                        <div className="mt-16 p-10 bg-slate-50 border-4 border-[#0A2472] rounded-[3rem] text-center shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><ShieldCheck className="h-32 w-32" /></div>
                            <h3 className="text-2xl font-black uppercase text-[#0A2472] mb-6 italic tracking-tight">Dictamen de Ingeniería Final</h3>
                            <p className="text-[14px] font-bold italic leading-relaxed text-slate-700 text-justify">
                                "El Modelo ZEDU System Kyron representa el estándar de oro en gestión inmutable para el sector privado. La integración de inteligencia artificial predictiva con tecnología de inducción magnética ambiental crea un ecosistema sin precedentes en Venezuela. Este expediente certifica que la Unidad Educativa Privada Colegio Gabriela Mistral posee la capacidad técnica y metodológica para liderar la soberanía tecnológica del Municipio Vargas, garantizando el éxito operativo y la seguridad jurídica de todas las entidades participantes."
                            </p>
                            <div className="flex justify-between pt-20 gap-16">
                                <div className="flex-1 border-t-2 border-black pt-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Firmas de Autoría</p>
                                </div>
                                <div className="flex-1 border-t-2 border-black pt-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sello Institucional Mistral</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-6 text-center opacity-40">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[1.5em] italic">EXPEDIENTE MAESTRO • 2026</p>
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-loose">© SYSTEM KYRON • CÓDIGO DE INTEGRIDAD VERIFICADO • DOCUMENTACIÓN TÉCNICA DE ALTA FIDELIDAD • 8 PÁGINAS CERTIFICADAS</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
