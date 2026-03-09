
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
  Gavel,
  BookOpen,
  Calculator,
  Shield,
  Handshake,
  MessageSquare,
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
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DOCUMENTO GENERADO",
            description: "El Modelo ZEDU (11 páginas) se ha descargado con éxito.",
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
                <div className="min-h-[900px] flex flex-col justify-between border-b-2 border-slate-100 pb-20 mb-20 page-break">
                    <div className="flex justify-between items-start border-b-8 border-[#0A2472] pb-10">
                        <div className="flex items-center gap-8">
                            <div ref={logoContainerRef}>
                                <Logo className="h-32 w-32 border-4 border-[#0A2472] p-2 bg-white" />
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
                            <p className="text-[10px] font-black uppercase mt-4 text-slate-400 tracking-widest italic">Documento Oficial de Formulación</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-tight">Modelo Zedu <br/> System Kyron</h2>
                            <p className="text-xl font-medium text-slate-500 uppercase tracking-[0.3em]">Sector Privado • Educación • Gestión Civil</p>
                        </div>
                        
                        <div className="w-24 h-1 bg-[#0A2472] mx-auto"></div>

                        <div className="grid grid-cols-2 gap-20 w-full max-w-2xl">
                            <div className="text-left space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede Operativa</p>
                                <p className="font-bold text-sm">Catia la Mar, Edo. La Guaira</p>
                                <p className="text-xs text-slate-600 italic">Unidad Educativa Privada Colegio Gabriela Mistral</p>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto Oficial</p>
                                <p className="font-bold text-sm">systemkyronofficial@gmail.com</p>
                                <p className="text-xs text-slate-600 italic">Expediente ID: V-32855496-4</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-t-2 border-slate-100 pt-10">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Certificación Institucional</p>
                            <p className="text-[9px] font-bold text-slate-900 uppercase">Validación: MARZO 2026</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-[#00A86B]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#00A86B]">Protocolo de Alta Fidelidad</span>
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
                        <p className="text-sm leading-relaxed text-justify">El equipo promotor de System Kyron se constituye como una fuerza multidisciplinaria dedicada a la resolución de conflictos estructurales mediante la tecnología. Con base en la Unidad Educativa Privada Colegio Gabriela Mistral, hemos desarrollado una arquitectura de software que unifica la fiscalidad, la identidad y la sostenibilidad, posicionando a La Guaira como un centro de innovación tecnológica de referencia nacional. Nuestra visión integra la rigurosidad académica con la agilidad operativa del sector privado.</p>
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
                                <td className={tableCellClass}>Emprendedores, comerciantes y microempresarios del sector servicios y logística portuaria. Se estima un 60% de participación masculina y 40% femenina en la toma de decisiones corporativas en la zona de intervención primaria.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Características del Entorno</td>
                                <td className={tableCellClass}>Zona costera con alta salinidad y humedad relativa (superior al 85% anual). Esta condición climática genera un deterioro crítico en los archivos físicos de papel, haciendo de la digitalización inmutable una necesidad de preservación legal y operativa para el comercio local.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Segmentación por Edad</td>
                                <td className={tableCellClass}>Predominancia del rango 25-50 años (Generación Digital Nativa y Adaptativa), lo que garantiza una baja curva de aprendizaje para la implementación del ecosistema System Kyron y una alta receptividad a las soluciones basadas en Inteligencia Artificial.</td>
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
                                <td className={tableLabelClass}>Causas Raíz Detectadas</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li><strong>Fragmentación Documental:</strong> Los registros contables, legales y de identidad residen en silos desconectados, dificultando la auditoría y la toma de decisiones basada en datos reales.</li>
                                        <li><strong>Procesos Analógicos:</strong> Persistencia del papel en un clima hostil (costa), derivando en la pérdida física de activos informativos críticos para el cumplimiento regulatorio.</li>
                                        <li><strong>Falta de Registro Central (Ledger):</strong> Inexistencia de un historial inmutable de transacciones que proteja al comerciante de fraudes y asegure la integridad ante fiscalizaciones del SENIAT.</li>
                                        <li><strong>Desconexión Ambiental:</strong> Los residuos plásticos y metálicos son vistos como basura y no como activos financieros potenciales, desperdiciando una oportunidad de economía circular.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Consecuencias Directas</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li><strong>Sanciones Fiscales:</strong> Por errores humanos en cálculos de IVA, ISLR e IGTF, afectando la liquidez de las empresas.</li>
                                        <li><strong>Inseguridad Jurídica:</strong> Dificultad para verificar la vigencia de poderes y representaciones legales en tiempo real.</li>
                                        <li><strong>Ineficiencia en Costos:</strong> Gasto excesivo en almacenamiento físico, gestiones manuales y logística de documentos sensibles.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA - PÁGINA 5-8 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA SYSTEM KYRON
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Arquitectura Modular de Gestión Integral</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 01: Blindaje Fiscal IA</td>
                                <td className={tableCellClass}>Automatización total de declaraciones de IVA, ISLR e IGTF mediante un motor de auditoría predictiva. El sistema analiza cada factura en milisegundos, detectando inconsistencias antes de que se conviertan en multas reales. Utiliza algoritmos de inferencia para asegurar que la base imponible y el crédito fiscal coincidan con los registros bancarios.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 02: Bóveda de Identidad 3D</td>
                                <td className={tableCellClass}>Uso de biometría facial y fotogrametría para crear una ID digital inalterable vinculada a la llave privada del usuario. Vincula documentos civiles (Cédula, RIF, Pasaporte) con un sello de tiempo inmutable, eliminando la suplantación de identidad en actos administrativos y mercantiles.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 03: Gestión Financiera VEN-NIF</td>
                                <td className={tableCellClass}>Contabilidad profesional automatizada que aplica ajustes por inflación basados en índices oficiales del BCV de forma síncrona. El sistema permite el control de flujo de caja multimoneda (VES/USD/EUR) con conciliación automática de extractos bancarios digitales.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 04: Sostenibilidad Magnética</td>
                                <td className={tableCellClass}>Despliegue de unidades de recolección inteligentes (Smart Bins) que utilizan tecnología de inducción magnética síncrona para la clasificación precisa de materiales PET y metálicos. El sistema recompensa el hábito responsable con Eco-Créditos tokenizados en el perfil del ciudadano.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 05: Asesoría Legal Digital</td>
                                <td className={tableCellClass}>Generador inteligente de borradores de contratos, acuerdos de confidencialidad y actas de asamblea. Redacta documentos con lenguaje jurídico formal ajustado estrictamente a la legislación mercantil y civil venezolana, garantizando que el documento esté listo para la revisión final del abogado.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 06: Administración de Talento</td>
                                <td className={tableCellClass}>Control exhaustivo de nómina, cálculo de prestaciones sociales (antigüedad, intereses), vacaciones y horas extras bajo la normativa de la LOTTT. Gestión de expedientes digitales de personal con alertas predictivas de vencimiento de contratos y obligaciones parafiscales.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 07: Control de Existencias</td>
                                <td className={tableCellClass}>Inventario inteligente con alertas de stock crítico y valorización de activos en tiempo real mediante el método de promedio ponderado. Integrado directamente con el Punto de Venta para una trazabilidad total desde la recepción de mercancía hasta la venta final al consumidor.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 08: Auditoría Blockchain</td>
                                <td className={tableCellClass}>Cada acción administrativa, contable o legal genera un hash inmutable en un Ledger privado del ecosistema. Esto garantiza que ningún registro pueda ser alterado retroactivamente, proporcionando una transparencia absoluta para los socios, auditores y entes reguladores.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 09: Ingeniería IA</td>
                                <td className={tableCellClass}>Herramienta avanzada para la generación de planos arquitectónicos y presupuestos de obra mediante visión artificial. Permite a los comerciantes proyectar remodelaciones de sus locales, calculando materiales y mano de obra a partir de una captura visual del entorno.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 10: Academia Pro</td>
                                <td className={tableCellClass}>Centro de formación técnica integrado que ofrece capacitación continua al personal de las empresas afiliadas. Incluye cursos sobre gestión fiscal, seguridad digital y sostenibilidad, emitiendo certificaciones verificables que validan el conocimiento en el uso del ecosistema.</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="p-10 bg-[#00A86B]/10 border-2 border-[#00A86B] rounded-[3rem] mt-10">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#00A86B] mb-4 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" /> Ventaja Competitiva Directa
                        </h4>
                        <p className="text-base font-bold italic leading-relaxed text-slate-800 text-justify">"System Kyron no es una aplicación aislada; es una unidad de inteligencia centralizada. Nuestra capacidad de unificar la identidad civil con la fiscalidad empresarial y la sostenibilidad ambiental crea una barrera de eficiencia que reduce los costos operativos en un 45% durante el primer ejercicio fiscal, posicionando al comerciante en un entorno de Cero Riesgo."</p>
                    </div>
                </div>

                {/* 5. FACTIBILIDAD ECONÓMICA - PÁGINA 9 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <TrendingUp className="h-6 w-6" /> 5. ESTUDIO DE FACTIBILIDAD ECONÓMICA
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Indicadores de Viabilidad Financiera</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Tasa Interna de Retorno (TIR)</td>
                                <td className={tableCellClass}><span className="text-[#00A86B] font-black text-xl">28.5% Anual Proyectada</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Valor Actual Neto (VAN)</td>
                                <td className={tableCellClass}><span className="text-[#0A2472] font-black text-xl">$ 450.000,00 (Horizonte 5 años)</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Punto de Equilibrio</td>
                                <td className={tableCellClass}>El modelo financiero indica que el punto de equilibrio operativo se alcanza en el mes 14 tras el despliegue inicial en el casco comercial de Catia la Mar, basado en una tasa de adopción del 15% del mercado potencial identificado.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Estructura de Ingresos</td>
                                <td className={tableCellClass}>SaaS (Suscripción mensual por módulos activos) + Venta de Hardware (Smart Bins y Terminales Fiscales) + Comisiones por el mercado secundario de Eco-Créditos tokenizados.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO - PÁGINA 10 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO Y ASIGNACIÓN DE CAPITAL
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '70%' }}>RUBRO TÉCNICO / ACTIVOS ESTRATÉGICOS</th>
                                <th className={tableHeaderClass} style={{ width: '30%' }}>INVERSIÓN (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}>Arquitectura de Software: Bóveda Digital, Cloud Ledger y Core Backend</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                            <tr><td className={tableCellClass}>Desarrollo de Motores de IA: Fiscal, Legal e Ingeniería Fotogramétrica</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                            <tr><td className={tableCellClass}>Hardware de Sostenibilidad: 5 Prototipos de Smart Bins con Sensores de Inducción</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                            <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Integración con el Módulo TPV</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                            <tr><td className={tableCellClass}>Terminales de Captura Biométrica de Alta Fidelidad para Certificación de ID</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                            <tr><td className={tableCellClass}>Logística de Despliegue, Censo Comercial y Capacitación (Edo. La Guaira)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                            <tr className="bg-slate-100">
                                <td className={cn(tableCellClass, "text-right font-black text-sm uppercase italic text-slate-500")}>TOTAL INVERSIÓN PROYECTADA</td>
                                <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472] shadow-sm")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. ALIADOS Y PLAN DE ACCIÓN - PÁGINA 11 */}
                <div className="mb-20">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Scale className="h-6 w-6" /> 7. ALIADOS Y CRONOGRAMA DE EJECUCIÓN
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '45%' }}>ENTIDAD ALIADA</th>
                                <th className={tableHeaderClass} style={{ width: '55%' }}>FUNCIÓN ESTRATÉGICA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}><span className="font-black">THE FACTORY HKA</span></td><td className={tableCellClass}>Provisión de hardware fiscal homologado por el SENIAT e integración de protocolos de comunicación.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">SAPI / REGISTRO DE PROPIEDAD</span></td><td className={tableCellClass}>Protección de patentes industriales de la tecnología magnética y derechos de autor del código fuente.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">U.E.P. COLEGIO GABRIELA MISTRAL</span></td><td className={tableCellClass}>Centro de investigación, desarrollo y laboratorios de pruebas para la validación de prototipos.</td></tr>
                        </tbody>
                    </table>

                    <h3 className="text-sm font-black uppercase mb-6 tracking-widest text-[#0A2472] mt-12 italic">Plan de Acción: Despliegue Operativo (Fase Beta)</h3>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '15%' }}>SEMANA</th>
                                <th className={tableHeaderClass} style={{ width: '55%' }}>HITO TÉCNICO / OPERATIVO</th>
                                <th className={tableHeaderClass} style={{ width: '30%' }}>RESPONSABLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>01-04</td><td className={tableCellClass}>Levantamiento de requerimientos técnicos y censo comercial en la Parroquia Catia la Mar.</td><td className={tableCellClass}>Marcos Sousa</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>05-12</td><td className={tableCellClass}>Desarrollo intensivo del Core Contable, motor IA y arquitectura del Ledger Blockchain.</td><td className={tableCellClass}>Carlos Mattar</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>13-16</td><td className={tableCellClass}>Ensamble de unidades Smart Bins y pruebas controladas de inducción magnética y sensores.</td><td className={tableCellClass}>Sebastián Garrido</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center font-bold")}>17-20</td><td className={tableCellClass}>Lanzamiento oficial de la Red de Beneficios y Módulo de Canje de Eco-Créditos.</td><td className={tableCellClass}>Equipo Maestro</td></tr>
                        </tbody>
                    </table>

                    <div className="mt-20 p-12 bg-slate-50 border-4 border-[#0A2472] rounded-[3rem] space-y-8">
                        <h3 className="text-2xl font-black uppercase text-[#0A2472] border-b-2 border-[#0A2472] pb-4 italic">Conclusión y Dictamen Final</h3>
                        <p className="text-base font-bold italic text-slate-700 leading-relaxed text-justify">
                            "El Modelo ZEDU para System Kyron ha sido evaluado bajo parámetros de ingeniería y finanzas corporativas rigurosos. Se concluye que el proyecto posee una viabilidad técnica superior, sustentada en la inmutabilidad de los datos y la escalabilidad masiva del modelo de negocio. La integración de sostenibilidad, fiscalidad e identidad representa la evolución lógica de la gestión comercial moderna en la República Bolivariana de Venezuela, garantizando el éxito operativo de las empresas participantes."
                        </p>
                        <div className="flex flex-col md:flex-row justify-between items-end pt-12 gap-12">
                            <div className="text-center w-full md:w-64">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase tracking-widest">Firma de los Integrantes</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">System Kyron Official</p>
                                </div>
                            </div>
                            <div className="text-center w-full md:w-64">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase tracking-widest">Sello Institucional</p>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">MARZO 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-20 pt-10 border-t-2 border-slate-100 flex flex-col items-center gap-4 text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[1em] italic">DOCUMENTO OFICIAL • MODELO ZEDU SYSTEM KYRON</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SYSTEM KYRON • TODOS LOS DERECHOS RESERVADOS</p>
                </footer>
            </motion.div>

            <div className="max-w-5xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.6em] opacity-60 italic">
                <span className="flex items-center gap-3"><Lock className="h-4 w-4 text-[#0A2472]" /> INTEGRIDAD GARANTIZADA</span>
                <span className="flex items-center gap-3"><Activity className="h-4 w-4 text-[#00A86B]" /> MODELO ZEDU ACTIVO</span>
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[#0A2472]" /> CERTIFICADO KYRON-PRO</span>
            </div>
        </div>
    );
}
