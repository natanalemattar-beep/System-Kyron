
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
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; }" +
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
                            <p className="text-[10px] font-black uppercase mt-4 text-slate-400 tracking-widest">EXPEDIENTE MAESTRO 2026</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-tight">Formulación Integral <br/> de Proyecto Tecnológico</h2>
                            <p className="text-xl font-medium text-slate-500 uppercase tracking-[0.3em]">Sector Privado • Educación • Gestión Civil</p>
                        </div>
                        
                        <div className="w-24 h-1 bg-[#0A2472] mx-auto"></div>

                        <div className="grid grid-cols-2 gap-20 w-full max-w-2xl">
                            <div className="text-left space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede Operativa</p>
                                <p className="font-bold text-sm">Catia la Mar, Edo. La Guaira</p>
                                <p className="text-xs text-slate-600 italic">U.E.C. Gabriela Mistral</p>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto Oficial</p>
                                <p className="font-bold text-sm">systemkyronofficial@gmail.com</p>
                                <p className="text-xs text-slate-600 italic">V-32855496-4</p>
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
                                <td className={tableCellClass} colSpan={2}>Unidad Educativa Colegio Gabriela Mistral</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Localización</td>
                                <td className={tableCellClass} colSpan={2}>Catia la Mar, Municipio Vargas, Estado La Guaira, Venezuela</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Correo Maestro</td>
                                <td className={tableCellClass} colSpan={2}>systemkyronofficial@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="mt-12 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Resumen del Perfil</h3>
                        <p className="text-sm leading-relaxed text-justify">El equipo promotor de System Kyron está compuesto por especialistas en desarrollo de software, análisis fiscal y gestión de infraestructura tecnológica. Nuestra visión es transformar la operatividad del sector privado mediante una arquitectura modular que garantice la transparencia financiera y la inmutabilidad de los registros legales, basando nuestra operación en el centro económico de Catia la Mar.</p>
                    </div>
                </div>

                {/* 2. POBLACIÓN A TRABAJAR - PÁGINA 3 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Target className="h-6 w-6" /> 2. POBLACIÓN Y ENTORNO OPERATIVO
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Análisis Demográfico: Catia la Mar</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Unidades de Negocio</td>
                                <td className={tableCellClass}><span className="font-black text-lg">2.500 Nodos Comerciales Identificados</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Perfil Poblacional</td>
                                <td className={tableCellClass}>Población económicamente activa en sectores de comercio minorista, servicios portuarios y logística. Alta densidad de pequeñas y medianas empresas (PYMES) que requieren modernización urgente.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Distribución Etaria</td>
                                <td className={tableCellClass}>Predominancia de emprendedores entre 25 y 55 años con alta disposición a la adopción de herramientas digitales para optimizar tiempos de gestión.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Condiciones del Entorno</td>
                                <td className={tableCellClass}>Ambiente costero con niveles críticos de salinidad y humedad (superior al 80%). El deterioro de archivos físicos es acelerado, lo que justifica la digitalización inmediata como método de preservación legal.</td>
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
                                <td className={tableHeaderClass}>DEFINICIÓN DEL CONFLICTO</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <p className="text-lg font-black italic text-rose-600 leading-tight uppercase text-center py-6">
                                        "AUSENCIA DE UN ECOSISTEMA INTEGRADO QUE UNIFIQUE LA IDENTIDAD CIUDADANA, LA FISCALIDAD EMPRESARIAL Y LA SOSTENIBILIDAD AMBIENTAL."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Causas Raíz</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass}>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li><strong>Fragmentación Documental:</strong> La información legal y contable reside en silos aislados, dificultando la auditoría.</li>
                                        <li><strong>Procesos Analógicos:</strong> Persistencia del uso de papel en un entorno climático hostil para materiales orgánicos.</li>
                                        <li><strong>Falta de Ledger:</strong> Inexistencia de un registro inmutable de transacciones que prevenga el fraude interno y externo.</li>
                                        <li><strong>Desconexión Ambiental:</strong> Los comercios no poseen incentivos directos para la gestión de residuos plásticos y metálicos.</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA - PÁGINA 5-7 (DETALLE EXTENSO) */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Cpu className="h-6 w-6" /> 4. SOLUCIÓN: ECOSISTEMA SYSTEM KYRON
                    </h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Arquitectura Modular de Gestión</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 01: Blindaje Fiscal</td>
                                <td className={tableCellClass}>Automatización de declaraciones de IVA, ISLR e IGTF mediante auditoría predictiva. El sistema detecta inconsistencias antes de que sean reportadas al SENIAT, garantizando cumplimiento total.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 02: Bóveda de Identidad</td>
                                <td className={tableCellClass}>Identidad biométrica 3D vinculada a documentos civiles (Cédula, RIF, Pasaporte). Permite el acceso seguro y autenticación de representantes legales en actos de disposición.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 03: Finanzas Pro</td>
                                <td className={tableCellClass}>Contabilidad bajo normas VEN-NIF con ajuste por inflación automatizado basado en índices oficiales del BCV. Control de flujo de caja multimoneda (Bs./USD/EUR).</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 04: Sostenibilidad</td>
                                <td className={tableCellClass}>Implementación de Smart Bins con tecnología de inducción magnética que recompensa el reciclaje con Eco-Créditos tokenizados en la billetera del usuario.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 05: Asesoría Legal IA</td>
                                <td className={tableCellClass}>Generador de borradores de contratos y actas de asamblea con lenguaje jurídico formal, adaptado a la legislación mercantil y civil venezolana vigente.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Módulo 06: Gestión de Talento</td>
                                <td className={tableCellClass}>Administración de nómina, cálculo de prestaciones sociales y control de expedientes de personal bajo normativa de la LOTTT.</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="p-10 bg-[#00A86B]/10 border-2 border-[#00A86B] rounded-[3rem] mt-10">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#00A86B] mb-4">Diferenciador Estratégico</h4>
                        <p className="text-base font-bold italic leading-relaxed text-slate-800 text-justify">"A diferencia de sistemas administrativos convencionales, System Kyron opera como un centro de mando unificado. No solo registra datos; protege el patrimonio mediante la prevención de multas fiscales y la inmutabilidad de los archivos digitales, convirtiendo la sostenibilidad en un activo financiero real."</p>
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
                                <td className={tableHeaderClass} colSpan={2}>Métricas de Viabilidad Financiera</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Tasa de Retorno (TIR)</td>
                                <td className={tableCellClass}><span className="text-[#00A86B] font-black text-xl">28.5% Anual Proyectada</span></td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Margen Operativo Neto</td>
                                <td className={tableCellClass}>32% tras la deducción de costos de infraestructura cloud y mantenimiento preventivo de hardware.</td>
                            </tr>
                            <tr>
                                <td className={tableLabelClass}>Punto de Equilibrio</td>
                                <td className={tableCellClass}>Mes 14 de operación continua en el primer lote de despliegue (Catia la Mar).</td>
                            </tr>
                            <tr>
                                <td className={tableHeaderClass} colSpan={2}>Estrategia de Mitigación de Riesgos</td>
                            </tr>
                            <tr>
                                <td className={tableCellClass} colSpan={2}>
                                    <p>El proyecto utiliza un modelo de negocio SaaS (Software as a Service) que minimiza los costos de adquisición para el cliente y asegura un flujo de caja recurrente. La tecnología Cloud-Native garantiza escalabilidad horizontal sin incremento lineal de gastos operativos.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO - PÁGINA 9 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Zap className="h-6 w-6" /> 6. PRESUPUESTO Y ASIGNACIÓN DE CAPITAL
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '70%' }}>RUBRO TÉCNICO / ACTIVOS</th>
                                <th className={tableHeaderClass} style={{ width: '30%' }}>INVERSIÓN (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}>Arquitectura Core: Bóveda Digital & Cloud Ledger</td><td className={cn(tableCellClass, "text-right font-black")}>$ 8.500,00</td></tr>
                            <tr><td className={tableCellClass}>Desarrollo Motor IA Fiscal & Legal</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.500,00</td></tr>
                            <tr><td className={tableCellClass}>Hardware de Reciclaje: Smart Bins Magnéticos (Prototipos)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 6.183,00</td></tr>
                            <tr><td className={tableCellClass}>Equipos Fiscales Homologados para Integración TPV</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.000,00</td></tr>
                            <tr><td className={tableCellClass}>Unidades Biométricas de Alta Definición (Grado Legal)</td><td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td></tr>
                            <tr><td className={tableCellClass}>Operación, Despliegue y Logística en Edo. La Guaira</td><td className={cn(tableCellClass, "text-right font-black")}>$ 3.200,00</td></tr>
                            <tr className="bg-slate-100">
                                <td className={cn(tableCellClass, "text-right font-black text-sm")}>TOTAL INVERSIÓN INICIAL</td>
                                <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 7. ALIADOS - PÁGINA 10 */}
                <div className="mb-20 page-break">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Scale className="h-6 w-6" /> 7. ALIADOS ESTRATÉGICOS Y RECURSOS
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '45%' }}>ENTIDAD ALIADA</th>
                                <th className={tableHeaderClass} style={{ width: '55%' }}>FUNCIÓN EN EL ECOSISTEMA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={tableCellClass}><span className="font-black">THE FACTORY HKA</span></td><td className={tableCellClass}>Provisión y homologación de hardware fiscal bajo estándares del SENIAT.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">SAPI / PROPIEDAD INTEL.</span></td><td className={tableCellClass}>Registro de patentes de hardware y protección de algoritmos propietarios.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">SAMSUNG / UHD DISPLAY</span></td><td className={tableCellClass}>Infraestructura de visualización para terminales biométricas 3D.</td></tr>
                            <tr><td className={tableCellClass}><span className="font-black">COLEGIO GABRIELA MISTRAL</span></td><td className={tableCellClass}>Sede de desarrollo, pruebas de concepto y laboratorio de ingeniería.</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* 8. PLAN DE ACCIÓN - PÁGINA 11 */}
                <div className="mb-20">
                    <h2 className="text-xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                        <Clock className="h-6 w-6" /> 8. PLAN DE ACCIÓN Y CRONOGRAMA DE DESPLIEGUE
                    </h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass} style={{ width: '15%' }}>FASE</th>
                                <th className={tableHeaderClass} style={{ width: '55%' }}>ACCIÓN TÉCNICA / OPERATIVA</th>
                                <th className={tableHeaderClass} style={{ width: '30%' }}>RESPONSABLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className={cn(tableCellClass, "text-center")}>01</td><td className={tableCellClass}>Levantamiento demográfico y censo de necesidades en comercios de Catia la Mar.</td><td className={tableCellClass}>Marcos Sousa</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>02</td><td className={tableCellClass}>Configuración de Bóveda Digital y sellado de registros en Ledger Blockchain.</td><td className={tableCellClass}>Carlos Mattar</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>03</td><td className={tableCellClass}>Instalación de prototipos Smart Bins y pruebas de inducción magnética.</td><td className={tableCellClass}>Sebastián Garrido</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>04</td><td className={tableCellClass}>Activación de IA Fiscal y capacitación de personal administrativo aliado.</td><td className={tableCellClass}>Carlos Mattar</td></tr>
                            <tr><td className={cn(tableCellClass, "text-center")}>05</td><td className={tableCellClass}>Lanzamiento de Red de Beneficios y validación de Eco-Créditos.</td><td className={tableCellClass}>Equipo Maestro</td></tr>
                        </tbody>
                    </table>

                    <div className="mt-20 p-12 bg-slate-50 border-4 border-[#0A2472] rounded-xl space-y-8">
                        <h3 className="text-2xl font-black uppercase text-[#0A2472] border-b-2 border-[#0A2472] pb-4 italic">Dictamen Final de Viabilidad</h3>
                        <p className="text-base font-bold italic text-slate-700 leading-relaxed text-justify">
                            "El Modelo ZEDU para System Kyron ha sido evaluado bajo parámetros de ingeniería estratégica y financiera rigorosos. Se dictamina que el proyecto posee una viabilidad técnica sobresaliente, apalancada por la inmutabilidad de los datos y el cumplimiento fiscal absoluto. La integración de sostenibilidad y gestión empresarial representa una oportunidad de inversión de bajo riesgo y alto impacto social para el Estado La Guaira."
                        </p>
                        <div className="flex flex-col md:flex-row justify-between items-end pt-12 gap-12">
                            <div className="text-center w-full md:w-64">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase tracking-widest">Firma del Equipo</p>
                                    <p className="text-[10px] text-slate-400">System Kyron Official</p>
                                </div>
                            </div>
                            <div className="text-center w-full md:w-64">
                                <div className="border-t-2 border-black pt-3">
                                    <p className="text-xs font-black uppercase tracking-widest">Sello Institucional</p>
                                    <p className="text-[10px] text-slate-400">MARZO 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-20 pt-10 border-t-2 border-slate-100 flex flex-col items-center gap-4 text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[1em] italic">DOCUMENTO OFICIAL • COPIA MAESTRA</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">© 2026 SYSTEM KYRON • TODOS LOS DERECHOS RESERVADOS</p>
                </footer>
            </motion.div>

            <div className="max-w-5xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.6em] opacity-60 italic">
                <span className="flex items-center gap-3"><Lock className="h-4 w-4" /> INTEGRIDAD GARANTIZADA</span>
                <span className="flex items-center gap-3"><Activity className="h-4 w-4" /> MODELO ZEDU ACTIVO</span>
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> CERTIFICADO KYRON-PRO</span>
            </div>
        </div>
    );
}
