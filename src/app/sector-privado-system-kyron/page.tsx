
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
            logoHtml = `<div style="text-align: center; margin-top: 50pt; margin-bottom: 20pt;"><img src="${base64}" width="${svgSize}" height="${svgSize}" /></div>`;
        }

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 30pt; }" +
            ".cover { text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; }" +
            ".cover-title { color: #0A2472; font-size: 28pt; font-weight: bold; margin-bottom: 5pt; text-transform: uppercase; text-align: center; }" +
            ".cover-subtitle { color: #1e293b; font-size: 18pt; font-weight: bold; text-transform: uppercase; text-align: center; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 15pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1.0pt solid #000000; padding: 8pt; font-size: 10pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8pt; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 3pt; margin-top: 20pt; }" +
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
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA COMPLETADA",
            description: "El expediente ha sido ordenado y exportado.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const tableHeaderClass = "bg-[#0A2472] text-white font-black uppercase p-3 text-[10px] border-2 border-black tracking-widest text-center";
    const tableCellClass = "p-3 text-[11px] border-2 border-black text-slate-900 bg-white leading-relaxed font-medium";
    const tableLabelClass = "bg-slate-50 p-3 text-[9px] font-black uppercase border-2 border-black text-slate-500 w-1/3";

    return (
        <div className="min-h-screen bg-slate-100 py-8 px-4 selection:bg-blue-100">
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
                className="max-w-5xl mx-auto bg-white shadow-2xl p-8 md:p-12 text-slate-950 border border-slate-200"
            >
                {/* PORTADA COMPACTA */}
                <div className="min-h-[300px] flex flex-col items-center justify-center border-b-4 border-slate-100 mb-12 pb-12 text-center space-y-8">
                    <Logo id="main-logo-zedu" className="h-24 w-24 border-2 border-[#0A2472] p-2 bg-white shadow-lg" />
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-[#0A2472] uppercase tracking-tighter italic leading-none">MODELO ZEDU</h1>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic">SYSTEM KYRON</h2>
                    </div>
                </div>

                <div id="zedu-document-content">
                    {/* 1. INTEGRANTES */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-6 w-6" /> 1. INTEGRANTES
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Identificación de Participantes</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black py-6 uppercase")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black py-6 uppercase")}>Sebastián Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black py-6 uppercase")}>Marcos Sousa</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Sede Institucional</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Institución</td>
                                    <td className={tableCellClass} colSpan={2}>Unidad Educativa Privada Colegio Gabriela Mistral</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Localización</td>
                                    <td className={tableCellClass} colSpan={2}>Catia la Mar, Municipio Vargas, Estado La Guaira, Venezuela</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Contacto Directo</td>
                                    <td className={tableCellClass} colSpan={2}>systemkyronofficial@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. ANÁLISIS DEL CENTRO ESTRATÉGICO */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Target className="h-6 w-6" /> 2. ANÁLISIS DEL CENTRO ESTRATÉGICO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Contexto Operativo: Catia la Mar</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Diagnóstico Geográfico</td>
                                    <td className={tableCellClass}>La Parroquia Catia la Mar se posiciona como el epicentro logístico del Estado La Guaira. El Modelo ZEDU aprovecha esta ubicación estratégica para desplegar el ecosistema System Kyron, enfocado en resolver la degradación documental causada por la salinidad marina del litoral. Se ha identificado una necesidad crítica de sistemas de gestión que no dependan exclusivamente de soportes físicos vulnerables a la oxidación y humedad extrema característica de la zona portuaria.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Población de Impacto</td>
                                    <td className={tableCellClass}>Se estima una base de 2.500 comerciantes y microempresarios que operan sin sistemas de respaldo inmutable. El proyecto busca formalizar y blindar sus activos financieros y legales mediante tecnología de vanguardia. La transición hacia una economía digital segura permitirá a estos actores económicos integrarse de manera competitiva en los mercados nacionales e internacionales, reduciendo los tiempos de respuesta administrativa en un 70%.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Marco Institucional</td>
                                    <td className={tableCellClass}>La Unidad Educativa Privada Colegio Gabriela Mistral actúa como el centro de desarrollo técnico, integrando la formación profesional con la implementación de soluciones de ingeniería para el sector privado local. Esta sinergia entre academia y empresa garantiza que la mano de obra calificada se forme directamente sobre las herramientas que liderarán la economía venezolana en el próximo decenio.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 3. ARQUITECTURA TÉCNICA (MÓDULOS) */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Cpu className="h-6 w-6" /> 3. ARQUITECTURA TÉCNICA (MÓDULOS)
                        </h2>
                        
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 01: Blindaje Fiscal con IA</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Implementación de un motor de inferencia entrenado en la normativa del SENIAT (Providencia 0071). El sistema audita en tiempo real los libros de compra y venta, identificando inconsistencias antes de la emisión de declaraciones de IVA e ISLR. El objetivo es alcanzar una tasa de error del 0%, eliminando multas por errores de forma o fondo. La IA procesa patrones históricos para predecir flujos tributarios y optimizar el cumplimiento preventivo.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 02: Bóveda de Identidad y Resguardo</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Almacenamiento de grado legal bajo protocolo Zero-Knowledge. Los documentos de identidad, actas constitutivas y títulos de propiedad son digitalizados y cifrados. Esta unidad protege la data contra la corrosión física del ambiente costero, garantizando que los expedientes sean legibles y legalmente válidos de forma permanente. El acceso es exclusivamente biométrico, asegurando la soberanía del titular sobre sus activos digitales.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 03: Centro de Contabilidad VEN-NIF</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Gestión contable profesional ajustada a las Normas de Información Financiera de Venezuela. Incluye la automatización del Reajuste por Inflación Fiscal mediante conexión directa con los indicadores del Banco Central de Venezuela (BCV), permitiendo la emisión de Balances Generales y Estados de Resultados reales en segundos. El sistema permite la gestión multimoneda con conversión automática a tasa oficial para fines de reporte legal.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 04: Sostenibilidad Magnética e IA</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Despliegue de estaciones de recolección inteligentes (Smart Bins) equipadas con sensores de inducción magnética. Estos sensores clasifican automáticamente materiales metálicos y polímeros mediante análisis de densidad y conductividad. Cada depósito es validado y transformado en Eco-Créditos digitales que los ciudadanos pueden canjear en la red de comercios asociados, inyectando liquidez a la economía local mientras se reduce la huella de carbono.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 05: Asesoría Jurídica Digital</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Generador de instrumentos legales técnicos basado en el Código de Comercio y el Código Civil. Permite la redacción inmediata de borradores de contratos de arrendamiento, compraventa, acuerdos de confidencialidad y actas de asamblea extraordinarias, listos para visado profesional. El motor legal incluye una base de datos actualizada de gacetas oficiales para garantizar la vigencia de todas las cláusulas generadas.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 06: Gestión de Talento y Cultura</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Administración automatizada de la nómina bajo los parámetros de la LOTTT. El sistema calcula salarios, vacaciones, utilidades y prestaciones sociales de forma precisa, generando recibos de pago digitales que son enviados automáticamente a los trabajadores. La plataforma gestiona el archivo histórico de expedientes laborales, previniendo litigios mediante el cumplimiento estricto de los plazos y obligaciones patronales.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 07: Control de Existencias Multimoneda</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Kardex de inventario con capacidad de valoración en tiempo real (Bs./USD). Incluye alertas de stock crítico y reportes de rotación de productos estrella, optimizando las compras y evitando el estancamiento de capital en mercancía de baja demanda. La integración con el punto de venta asegura una actualización síncrona de los activos disponibles en todas las sucursales del holding.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 08: Ledger Blockchain Corporativo</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Sellado digital de todas las transacciones críticas de la empresa. Cada factura emitida y cada documento guardado recibe una firma digital inmutable que certifica su integridad ante cualquier fiscalización, creando un historial auditable que previene la alteración de registros. Esta unidad es la base de la transparencia operativa, permitiendo auditorías externas remotas con total confianza en la veracidad de la data.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 09: Ingeniería IA y Cómputos</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Uso de visión artificial para procesar capturas de locales comerciales y convertirlas en planos técnicos a escala. El módulo calcula automáticamente los cómputos métricos de materiales (pisos, pintura, iluminación) necesarios para remodelaciones, optimizando los presupuestos de construcción y reduciendo el desperdicio de materiales en un 25% mediante simulaciones de distribución espacial inteligente.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Unidad 10: Academia Master Gabriela Mistral</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Centro de formación técnica para la capacitación del personal administrativo en el uso del ecosistema System Kyron. Los usuarios obtienen certificaciones verificables que validan su competencia en gestión fiscal, contable y operativa moderna. Esta unidad garantiza la transferencia de conocimiento y la sostenibilidad del proyecto a través de la formación de una nueva generación de operadores digitales.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 4. PRESUPUESTO DETALLADO */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-6 w-6" /> 4. INVERSIÓN ESTRATÉGICA (CAPEX)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '75%' }}>DESCRIPCIÓN DE LA INVERSIÓN</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>TOTAL (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={tableCellClass}>Arquitectura Core de Software y Bóveda Digital Inmutable</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Desarrollo de Motores de IA: Fiscal, Jurídico e Ingeniería</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                                <tr><td className={tableCellClass}>Unidades de Sostenibilidad (5 Smart Bins Pro con Magnetismo)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                                <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Centro de Operaciones</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                                <tr><td className={tableCellClass}>Terminales de Captura Biométrica y Control de Acceso</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                                <tr><td className={tableCellClass}>Logística, Despliegue y Capacitación en Catia la Mar</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500")}>TOTAL PROYECTADO</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472] italic")}>$ 32.883,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. FACTIBILIDAD Y RETORNO */}
                    <div className="mb-12">
                        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-6 w-6" /> 5. FACTIBILIDAD Y RETORNO (ROI)
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Análisis Financiero del Ecosistema</td></tr>
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
                                    <td className={tableCellClass}>SaaS (Software as a Service) modular. Generación de ingresos recurrentes mediante licencias empresariales, servicios de auditoría fiscal IA y monetización de activos ambientales a través del mercado de Eco-Créditos.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Mitigación de Riesgos</td>
                                    <td className={tableCellClass}>Reducción del 95% en multas fiscales y ahorro del 60% en horas-hombre administrativas. La plataforma es inmune a las fallas de almacenamiento físico costero gracias a su redundancia en la nube y cifrado de alta fidelidad.</td>
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
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>SEMANA</th>
                                    <th className={tableHeaderClass} style={{ width: '75%' }}>HITO DE DESPLIEGUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>01 - 04</td><td className={tableCellClass}>Censo comercial en Catia la Mar y levantamiento de requerimientos técnicos en el Colegio Gabriela Mistral. Configuración del nodo maestro.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>05 - 12</td><td className={tableCellClass}>Desarrollo y entrenamiento de los motores de IA Fiscal y Jurídica. Configuración de la Bóveda de Identidad. Pruebas de estrés de seguridad.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>13 - 16</td><td className={tableCellClass}>Instalación física de los Smart Bins y Terminales Biométricos. Activación del Ledger Blockchain. Integración con sistemas de pago nacionales.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>17 - 20</td><td className={tableCellClass}>Lanzamiento oficial de la Red de Beneficios y Billetera de Eco-Créditos. Onboarding masivo de empresas y validación de protocolos operativos.</td></tr>
                            </tbody>
                        </table>

                        <div className="mt-12 p-8 bg-slate-50 border-2 border-[#0A2472] rounded-[2rem] text-center shadow-lg">
                            <h3 className="text-2xl font-black uppercase text-[#0A2472] mb-4 italic">Conclusión de Dictamen</h3>
                            <p className="text-md font-bold italic leading-relaxed text-slate-700 text-justify">
                                "El Modelo ZEDU System Kyron es la solución definitiva para la modernización comercial de Catia la Mar. La integración de tecnologías inmutables y automatización fiscal garantiza una ventaja competitiva sostenible, protegiendo el patrimonio de las empresas contra los desafíos ambientales y regulatorios del país. Este expediente certifica la viabilidad técnica y financiera para el despliegue inmediato de las unidades operativas aquí descritas."
                            </p>
                            <div className="flex justify-between pt-16 gap-8">
                                <div className="flex-1 border-t border-black pt-2">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Firma de Integrantes</p>
                                </div>
                                <div className="flex-1 border-t border-black pt-2">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Sello Institucional Colegio Gabriela Mistral</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-12 pt-8 border-t-2 border-slate-100 flex flex-col items-center gap-4 text-center opacity-40">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[1em] italic">MODELO ZEDU SYSTEM KYRON • 2026</p>
                        <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">© SYSTEM KYRON • TODOS LOS DERECHOS RESERVADOS</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
