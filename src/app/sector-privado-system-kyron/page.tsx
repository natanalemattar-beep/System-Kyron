
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

        // Capturar logo específicamente
        const svgElement = document.querySelector('#main-logo-zedu') as SVGElement;
        let logoHtml = "";
        
        if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            
            const svgSize = 250; 
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
            logoHtml = `<div style="text-align: center; margin-top: 100pt; margin-bottom: 50pt;"><img src="${base64}" width="${svgSize}" height="${svgSize}" /></div>`;
        }

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU - SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 40pt; }" +
            ".cover { text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center; }" +
            ".cover-title { color: #0A2472; font-size: 48pt; font-weight: bold; margin-bottom: 10pt; text-transform: uppercase; }" +
            ".cover-subtitle { color: #1e293b; font-size: 32pt; font-weight: bold; text-transform: uppercase; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 25pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1.0pt solid #000000; padding: 12pt; font-size: 10pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 30%; text-transform: uppercase; font-size: 8pt; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 5pt; margin-top: 30pt; }" +
            "p { margin-bottom: 10pt; line-height: 1.6; text-align: justify; }" +
            ".page-break { page-break-after: always; }" +
            "</style></head><body>";
        
        const footer = "</body></html>";

        const wordHtml = `
            <div class="cover">
                ${logoHtml}
                <div class="cover-title">MODELO ZEDU</div>
                <div class="cover-subtitle">SYSTEM KYRON</div>
            </div>
            <div class="page-break"></div>
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
            title: "DESCARGA INICIADA",
            description: "El expediente ha sido exportado correctamente.",
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 text-slate-950 border border-slate-200"
            >
                {/* PORTADA VISUAL EN WEB */}
                <div className="min-h-[900px] flex flex-col items-center justify-center border-b-4 border-slate-100 mb-20 pb-20 text-center">
                    <Logo id="main-logo-zedu" className="h-64 w-64 mb-12 drop-shadow-2xl border-8 border-[#0A2472] p-6 bg-white" />
                    <h1 className="text-7xl font-black text-[#0A2472] uppercase tracking-tighter italic leading-none mb-4">MODELO ZEDU</h1>
                    <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic mb-12">SYSTEM KYRON</h2>
                </div>

                <div id="zedu-document-content">
                    {/* 1. INFORMACIÓN DEL EQUIPO */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-7 w-7" /> 1. INTEGRANTES DEL PROYECTO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Identificación de Participantes</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black py-10")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black py-10")}>Sebastián Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black py-10")}>Marcos Sousa</td>
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
                                    <td className={tableLabelClass}>Correo Oficial</td>
                                    <td className={tableCellClass} colSpan={2}>systemkyronofficial@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 2. POBLACIÓN A TRABAJAR */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Target className="h-7 w-7" /> 2. ANÁLISIS DEL CENTRO ESTRATÉGICO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Universo Operativo: Catia la Mar</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Densidad Comercial</td>
                                    <td className={tableCellClass}><span className="font-black text-2xl text-[#0A2472]">2.500 Unidades Económicas</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Segmentación</td>
                                    <td className={tableCellClass}>Microempresarios y comerciantes del sector logístico y servicios. La población requiere una transición urgente hacia la digitalización para optimizar la recaudación y reducir la carga administrativa manual.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Condición Ambiental</td>
                                    <td className={tableCellClass}>La zona de Catia la Mar presenta niveles de salinidad superiores a los 50 mg/m² día y humedad constante. Esto anula la efectividad del almacenamiento en papel, destruyendo la legibilidad de facturas y actas en periodos cortos, justificando el uso de la Bóveda Digital inmutable.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 3. DIAGNÓSTICO DEL PROBLEMA */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Activity className="h-7 w-7" /> 3. DIAGNÓSTICO OPERATIVO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass}>NÚCLEO DEL CONFLICTO IDENTIFICADO</td></tr>
                                <tr>
                                    <td className={tableCellClass}>
                                        <p className="text-2xl font-black italic text-rose-600 leading-tight uppercase text-center py-12 px-6">
                                            "INEXISTENCIA DE UN SISTEMA INTEGRAL QUE GARANTICE LA INTEGRIDAD FISCAL, EL RESGUARDO DOCUMENTAL Y LA SOSTENIBILIDAD URBANA."
                                        </p>
                                    </td>
                                </tr>
                                <tr><td className={tableLabelClass}>Efectos de la Problemática</td></tr>
                                <tr>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc pl-8 space-y-4 text-sm font-medium">
                                            <li><strong>Vulnerabilidad ante Auditorías:</strong> El 70% de las empresas de la zona pierden soportes físicos por factores climáticos, arriesgando multas severas del SENIAT.</li>
                                            <li><strong>Ineficiencia Administrativa:</strong> La gestión de nómina y contabilidad manual consume hasta el 40% del tiempo operativo del comerciante.</li>
                                            <li><strong>Desconexión Ambiental:</strong> Los residuos reciclables no se cuantifican ni se monetizan, resultando en pérdidas de activos potenciales para la comunidad.</li>
                                            <li><strong>Falta de Soporte Jurídico:</strong> Dificultad para acceder a borradores legales técnicos y actualizados según la ley venezolana.</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 4. SOLUCIÓN PROPUESTA (MÓDULOS) */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Cpu className="h-7 w-7" /> 4. ARQUITECTURA TÉCNICA: MÓDULOS KYRON
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Capacidades de Gestión Corporativa</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 01: Blindaje Fiscal IA</td>
                                    <td className={tableCellClass}>Automatización de libros de compra/venta y declaraciones de IVA. El motor IA audita preventivamente cada asiento contra la normativa del SENIAT para garantizar riesgo cero.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 02: Bóveda de Identidad</td>
                                    <td className={tableCellClass}>Resguardo inmutable de documentos de identidad y actas civiles. Utiliza biometría y encriptación de grado militar para proteger la data contra la degradación física.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 03: Centro VEN-NIF</td>
                                    <td className={tableCellClass}>Contabilidad profesional que aplica automáticamente los ajustes por inflación del BCV, permitiendo visualizar balances reales en tiempo real.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 04: Sostenibilidad Magnética</td>
                                    <td className={tableCellClass}>Implementación de Smart Bins con tecnología de inducción para la clasificación de residuos y generación de Eco-Créditos financieros.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 05: Asesoría Jurídica IA</td>
                                    <td className={tableCellClass}>Generador de borradores legales técnicos para contratos y actas de asamblea, garantizando el cumplimiento con el Código de Comercio.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 06: Gestión de Talento</td>
                                    <td className={tableCellClass}>Cálculo automatizado de nómina, vacaciones y liquidaciones bajo los parámetros de la LOTTT y leyes de seguridad social.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 07: Control de Existencias</td>
                                    <td className={tableCellClass}>Kardex de inventario con valoración multimoneda y alertas de stock crítico para evitar quiebres de inventario.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 08: Ledger Blockchain</td>
                                    <td className={tableCellClass}>Sellado digital de transacciones financieras y legales, creando un historial auditable que previene la alteración de registros.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 09: Ingeniería IA</td>
                                    <td className={tableCellClass}>Visión artificial para procesar capturas de locales y generar planos técnicos con cómputos métricos de materiales de construcción.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Unidad 10: Academia Master</td>
                                    <td className={tableLabelClass}>Módulo de capacitación técnica para la formación continua del personal en normativas de cumplimiento y uso de herramientas digitales.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. FACTIBILIDAD ECONÓMICA */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-7 w-7" /> 5. FACTIBILIDAD Y RETORNO (ROI)
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Proyección Financiera del Ecosistema</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Rentabilidad Estimada</td>
                                    <td className={tableCellClass}><span className="text-[#00A86B] font-black text-2xl">28.5% Anual (TIR)</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>VAN Proyectado</td>
                                    <td className={tableCellClass}><span className="text-[#0A2472] font-black text-2xl">$ 450.000,00</span></td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Modelo de Negocio</td>
                                    <td className={tableCellClass}>SaaS (Software as a Service) modular con escalabilidad de bajo costo. Generación de ingresos recurrentes mediante suscripciones y servicios de valor agregado.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Ahorro Operativo</td>
                                    <td className={tableCellClass}>Reducción del 95% en multas fiscales y ahorro del 60% en horas-hombre dedicadas a procesos administrativos manuales.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 6. PRESUPUESTO DE ACTIVOS */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-7 w-7" /> 6. INVERSIÓN ESTRATÉGICA (CAPEX)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '70%' }}>MÓDULO DE INVERSIÓN</th>
                                    <th className={tableHeaderClass} style={{ width: '30%' }}>TOTAL (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={tableCellClass}>Arquitectura de Software y Bóveda Digital (Core)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                                <tr><td className={tableCellClass}>Motores de IA: Fiscal, Legal e Ingeniería</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                                <tr><td className={tableCellClass}>Unidades de Sostenibilidad (5 Smart Bins Pro)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                                <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Centro de Mando</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                                <tr><td className={tableCellClass}>Terminales de Captura Biométrica 3D</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                                <tr><td className={tableCellClass}>Logística, Despliegue y Capacitación en La Guaira</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500")}>TOTAL INVERSIÓN PROYECTADA</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-3xl text-[#0A2472] italic")}>$ 32.883,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 7. PLAN DE ACCIÓN */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Terminal className="h-7 w-7" /> 7. CRONOGRAMA OPERATIVO
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClass} style={{ width: '20%' }}>FASE</th>
                                    <th className={tableHeaderClass} style={{ width: '80%' }}>HITO DE DESPLIEGUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>01-04</td><td className={tableCellClass}>Censo comercial y relevamiento técnico en Catia la Mar. Selección de socios estratégicos.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>05-12</td><td className={tableCellClass}>Desarrollo y entrenamiento del Core Contable y motores de IA Jurídica. Pruebas de Bóveda Digital.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>13-16</td><td className={tableCellClass}>Instalación física de Smart Bins y Terminales Biométricos. Configuración de Ledger Blockchain.</td></tr>
                                <tr><td className={cn(tableCellClass, "text-center font-bold")}>17-20</td><td className={tableCellClass}>Lanzamiento de la Red de Beneficios y Billetera Eco-Créditos. Onboarding masivo de empresas.</td></tr>
                            </tbody>
                        </table>

                        <div className="mt-20 p-16 bg-slate-50 border-4 border-[#0A2472] rounded-[3rem] text-center shadow-xl">
                            <h3 className="text-3xl font-black uppercase text-[#0A2472] mb-8 italic">Conclusión de Auditoría</h3>
                            <p className="text-lg font-bold italic leading-relaxed text-slate-700 text-justify">
                                "El Modelo ZEDU para System Kyron representa la solución definitiva para la modernización económica de Catia la Mar. La integración de tecnologías inmutables y automatización fiscal garantiza una ventaja competitiva sostenible para el Colegio Gabriela Mistral y el sector privado circundante."
                            </p>
                            <div className="flex justify-between pt-24 gap-12">
                                <div className="flex-1 border-t-2 border-black pt-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest">Validación de Integrantes</p>
                                </div>
                                <div className="flex-1 border-t-2 border-black pt-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest">Sello Institucional Colegio Gabriela Mistral</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-24 pt-12 border-t-2 border-slate-100 flex flex-col items-center gap-6 text-center opacity-40">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[1em] italic">MODELO ZEDU SYSTEM KYRON • 2026</p>
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">© SYSTEM KYRON • TODOS LOS DERECHOS RESERVADOS</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
