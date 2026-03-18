"use client";

import { useState, useEffect } from "react";
import { Printer, Download, ChevronLeft, CircleCheck as CheckCircle, Users, Cpu, Activity, Target, Zap, Lock, FileText, Scale, TrendingUp, ChartBar as BarChart3, School, Globe, Handshake, ClipboardList, MapPin, Sun, AlertTriangle, Lightbulb, ShieldCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>MODELO ZEDU — AUTOMIND AI</title><style>" +
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
                            <div class="cover-title" style="color: #64748b; font-size: 22pt;">AUTOMIND AI</div>
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
        link.download = 'MODELO_ZEDU_AUTOMIND_AI.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DOCUMENTO DESCARGADO",
            description: "El Modelo Zedu — AutoMind AI ha sido generado correctamente.",
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
                        <h2 className="text-3xl font-black text-slate-400 uppercase tracking-tighter italic leading-none">AUTOMIND AI</h2>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest pt-1">Colegio Santa Rosa de Lima · Caracas, Venezuela</p>
                    </div>
                </div>

                <div id="zedu-document-content">

                    {/* SECCIÓN 1 — INFORMACIÓN DEL EQUIPO */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-7 w-7" /> 1. INFORMACIÓN DEL EQUIPO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Nombre del Proyecto</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase text-xl py-6 col-span-3")} colSpan={3}>AutoMind AI</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Integrantes del Equipo</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Miguel Uzcategui</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Miguel Angel Goites</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Joaquin de Barros</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Institución Educativa</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")} colSpan={3}>Colegio Santa Rosa de Lima</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>País / Ciudad</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")} colSpan={3}>Venezuela, Caracas</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 2 — POBLACIÓN A TRABAJAR */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <MapPin className="h-7 w-7" /> 2. POBLACIÓN A TRABAJAR
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Localización</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>País / Ciudad / Municipio</td>
                                    <td className={tableCellClass}>Venezuela, Caracas, Municipio Baruta</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Nombre de la Comunidad</td>
                                    <td className={tableCellClass}>Santa Rosa de Lima</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Datos Demográficos</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Cantidad Total de Habitantes</td>
                                    <td className={tableCellClass}>
                                        Aproximadamente <strong>38.000 habitantes</strong> en la comunidad de Santa Rosa de Lima y urbanizaciones adyacentes del Municipio Baruta. La institución educativa atiende directamente a una comunidad de más de <strong>1.200 familias</strong> registradas como representantes activos.
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Cantidad de Habitantes por Género</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Femenino:</strong> aproximadamente 52% (19.760 personas)</li>
                                            <li><strong>Masculino:</strong> aproximadamente 48% (18.240 personas)</li>
                                        </ul>
                                        <p className="mt-2 text-sm text-slate-500 italic">Fuente: Proyecciones demográficas INE 2023, Municipio Baruta.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Cantidad de Habitantes por Edad</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>0 – 14 años:</strong> 22% (8.360 personas)</li>
                                            <li><strong>15 – 29 años:</strong> 24% (9.120 personas)</li>
                                            <li><strong>30 – 59 años:</strong> 40% (15.200 personas) — principal segmento de representantes</li>
                                            <li><strong>60 años o más:</strong> 14% (5.320 personas)</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Características de la Población</td>
                                    <td className={tableCellClass}>
                                        <p>La comunidad de Santa Rosa de Lima, en el Municipio Baruta, está compuesta mayoritariamente por familias de clase media y media-alta. El nivel educativo predominante es universitario o técnico superior. Un alto porcentaje de los representantes estudiantiles son profesionales activos en sectores como finanzas, servicios, comercio y tecnología. El Colegio Santa Rosa de Lima es una institución privada de referencia en la zona, con más de 30 años de trayectoria y aproximadamente 900 estudiantes activos distribuidos en los niveles de Primaria y Bachillerato.</p>
                                        <p>La comunidad cuenta con acceso a servicios básicos (agua, electricidad, internet) aunque con las intermitencias propias del contexto venezolano. Existe una fuerte cultura de participación de los representantes en las actividades institucionales, lo que representa una oportunidad directa de adopción para la solución AutoMind AI.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Clima</td>
                                    <td className={tableCellClass}>
                                        <p>Caracas posee un <strong>clima tropical de sabana</strong> con temperaturas anuales que oscilan entre los 18°C y 28°C. Se distinguen dos estaciones: la temporada de lluvias (mayo–octubre) y la temporada seca (noviembre–abril). La altitud media de 900 msnm le confiere un clima agradable y fresco en comparación con el resto del territorio venezolano. Estas condiciones no representan una restricción para la implementación de soluciones digitales, aunque la estacionalidad de lluvias puede afectar la conectividad en zonas sin infraestructura de fibra óptica.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 3 — ANÁLISIS DEL PROBLEMA */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <AlertTriangle className="h-7 w-7" /> 3. ANÁLISIS DEL PROBLEMA
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Definición del Problema</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>En el Colegio Santa Rosa de Lima, el sistema de archivado institucional es enteramente físico. La gestión de expedientes estudiantiles, registros de notas, constancias, permisos y comunicaciones con representantes se realiza mediante carpetas en papel, archivadores físicos y registros manuales en hojas de cálculo desconectadas. Esto no permite agilidad en la búsqueda de información relativa a un estudiante, genera pérdida de tiempo considerable para el personal administrativo y compromete la privacidad de los datos ante pérdidas, daños o accesos no autorizados.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Causas del Problema</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 1</td>
                                    <td className={tableCellClass}><strong>Falta de organización sistemática:</strong> No existe un protocolo unificado para la clasificación, nomenclatura y almacenamiento de documentos estudiantiles. Cada departamento (secretaría, coordinación, administración) maneja sus archivos de forma independiente y sin estándar compartido.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 2</td>
                                    <td className={tableCellClass}><strong>Poca disposición hacia la tecnología:</strong> El personal administrativo con más años de experiencia muestra resistencia al cambio tecnológico por falta de formación específica y por el apego a métodos tradicionales que consideran seguros y conocidos.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 3</td>
                                    <td className={tableCellClass}><strong>Escaso presupuesto para modernización:</strong> La asignación de recursos hacia infraestructura tecnológica ha sido históricamente baja, priorizando gastos operativos inmediatos (nómina, mantenimiento físico) sobre inversiones en digitalización.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 4</td>
                                    <td className={tableCellClass}><strong>Desactualización tecnológica:</strong> El equipamiento informático disponible es obsoleto y el personal desconoce las herramientas digitales modernas de gestión documental, inteligencia artificial y comunicación institucional automatizada.</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Consecuencias del Problema</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Consecuencia Principal</td>
                                    <td className={tableCellClass}><strong>Pérdida de tiempo en búsqueda de archivos:</strong> El personal invierte en promedio entre 15 y 45 minutos por solicitud de expediente estudiantil, lo que equivale a una pérdida de productividad de hasta 3 horas diarias en el departamento de secretaría.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Consecuencias Secundarias</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Demoras en la atención a representantes y estudiantes.</li>
                                            <li>Riesgo de extravío de documentos únicos e irreemplazables.</li>
                                            <li>Comunicación lenta e ineficiente entre institución y representantes.</li>
                                            <li>Imposibilidad de generar reportes estadísticos rápidos para la dirección.</li>
                                            <li>Vulnerabilidad ante auditorías del Ministerio de Educación.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Origen del Problema</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>El origen fundamental del problema radica en la <strong>desactualización e ignorancia en la gestión de nuevas tecnologías e implementaciones digitales</strong>. La institución no ha incorporado sistemas de información modernos y carece de una estrategia de transformación digital. Este fenómeno es común en el sector educativo privado venezolano, donde la crisis económica ha frenado la adopción tecnológica y la capacitación del personal administrativo.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Importancia de Resolver el Problema</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Resolver este problema es estratégico por múltiples razones: (1) reduce drásticamente la carga de trabajo del personal administrativo, liberando tiempo para actividades de mayor valor pedagógico; (2) mejora la experiencia de los representantes al recibir respuestas inmediatas; (3) protege la integridad de información sensible de los estudiantes; (4) posiciona al Colegio Santa Rosa de Lima como una institución de vanguardia tecnológica, fortaleciendo su prestigio y competitividad en el sector educativo privado de Caracas.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 4 — SOLUCIÓN PROPUESTA */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Lightbulb className="h-7 w-7" /> 4. SOLUCIÓN PROPUESTA — AUTOMIND AI
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Descripción del Proyecto</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p><strong>AutoMind AI</strong> consiste en el desarrollo de una aplicación que transforma el sistema de archivado tradicional de la institución educativa en un entorno digital eficiente y organizado, permitiendo la digitalización, almacenamiento y búsqueda rápida de documentos que antes se gestionaban de forma física.</p>
                                        <p>La plataforma integrará un <strong>chatbot con atención automatizada</strong> dirigida a los representantes de los estudiantes, facilitando respuestas inmediatas y mejorando la comunicación colegio-familia las 24 horas del día, los 7 días de la semana.</p>
                                        <p>Además, incorporará <strong>herramientas de inteligencia artificial</strong> que apoyarán al personal administrativo en la generación de ideas estratégicas, redacción de comunicados, análisis de datos estudiantiles y automatización de tareas repetitivas, contribuyendo a una gestión más moderna, ágil y orientada a la mejora continua institucional.</p>
                                        <p>El sistema es escalable: una vez demostrada su eficacia en el sector educativo, podrá expandirse a otros sectores como empresas, almacenes, clínicas y comercios.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Componentes Principales</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Módulo 1: Archivo Digital</td>
                                    <td className={tableCellClass}>Sistema de gestión documental con OCR (reconocimiento óptico de caracteres) para digitalizar documentos físicos existentes. Permite búsqueda instantánea por nombre de estudiante, cédula, año escolar o tipo de documento. Almacenamiento seguro en la nube con acceso por roles (secretaria, coordinador, director, representante).</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Módulo 2: Chatbot IA</td>
                                    <td className={tableCellClass}>Asistente virtual inteligente disponible vía WhatsApp y portal web para atención a representantes. Responde consultas frecuentes (notas, inasistencias, cronograma de pagos, actividades), genera constancias automáticas y escala casos complejos al personal humano.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Módulo 3: Asistente IA Administrativo</td>
                                    <td className={tableCellClass}>Herramienta de apoyo estratégico para la dirección: redacción de circulares, análisis de tendencias de rendimiento estudiantil, generación de reportes estadísticos, sugerencias de mejora organizacional y asistencia en planificación académica.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Módulo 4: Panel de Control</td>
                                    <td className={tableCellClass}>Dashboard centralizado que muestra KPIs institucionales en tiempo real: número de documentos gestionados, tiempo promedio de respuesta, satisfacción de representantes y alertas de tareas pendientes.</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-12">
                            <h3 className="text-xl font-black uppercase mb-6 tracking-tighter flex items-center gap-3 text-[#0A2472]">
                                <ShieldCheck className="h-6 w-6" /> Propuestas Existentes y Diferenciadores
                            </h3>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr><td className={tableHeaderClass} colSpan={2}>Otras Propuestas Existentes para Solucionar el Problema</td></tr>
                                    <tr>
                                        <td className={tableCellClass} colSpan={2}>
                                            <p>El proyecto más similar identificado en el mercado es <strong>MOBIAN</strong>, que se enfoca en la optimización de datos para cualquier tipo de negocio. Su propósito principal es la eficiencia operativa y escalabilidad técnica, dirigiéndose a equipos técnicos y directivos corporativos mediante integración de sistemas y aumento de equipo (Staff Augmentation). Sin embargo, MOBIAN no está diseñada específicamente para el sector educativo.</p>
                                            <p>Otras alternativas genéricas incluyen Google Workspace, Microsoft 365 y sistemas ERP educativos importados, que ofrecen gestión de archivos pero carecen de adaptación al contexto venezolano, integración con canales de comunicación como WhatsApp y herramientas de IA orientadas a la gestión escolar.</p>
                                        </td>
                                    </tr>
                                    <tr><td className={tableHeaderClass} colSpan={2}>Diferenciadores de AutoMind AI</td></tr>
                                    <tr>
                                        <td className={tableLabelClass}>Especialización Educativa</td>
                                        <td className={tableCellClass}>
                                            <p>Mientras MOBIAN ofrece servicios genéricos de IT para cualquier empresa, <strong>AutoMind AI resuelve problemas específicos del sector educativo</strong>: archivo de expedientes estudiantiles y comunicación escolar. Nuestra solución es escalable y podrá expandirse a otros sectores (empresas, almacenes, clínicas), pero parte de una especialización que garantiza una propuesta de valor clara e inmediata.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>Alcance del Usuario Final</td>
                                        <td className={tableCellClass}>
                                            <p>MOBIAN optimiza procesos internos para perfiles técnicos. <strong>AutoMind AI impacta directamente en la experiencia del cliente final</strong> (los padres y representantes) mediante su chatbot de atención inmediata, mejorando tangiblemente su relación con la institución.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>De Datos a Estrategia</td>
                                        <td className={tableCellClass}>
                                            <p>MOBIAN se enfoca en la gestión eficiente de datos. <strong>AutoMind AI utiliza la IA para la generación de ideas estratégicas</strong>, apoyando activamente la toma de decisiones directivas y no solo el almacenamiento de información.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>Contexto Venezolano</td>
                                        <td className={tableCellClass}>
                                            <p>AutoMind AI está diseñada considerando las limitaciones de conectividad y presupuesto propias del entorno venezolano: funcionamiento offline parcial, integración con WhatsApp (ampliamente adoptado en Venezuela) y modelo de precios accesible para instituciones educativas privadas del país.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 5 — PRESUPUESTO */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-7 w-7" /> 5. PRESUPUESTO (INVERSIÓN REQUERIDA)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={cn(tableHeaderClass, "text-left")} style={{ width: '45%' }}>Ítem</th>
                                    <th className={tableHeaderClass} style={{ width: '10%' }}>Cantidad</th>
                                    <th className={tableHeaderClass} style={{ width: '20%' }}>Costo (USD)</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Lugar de Compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClass}>Suscripción anual plataforma de IA (Google Gemini API / OpenAI)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 360,00</td>
                                    <td className={tableCellClass}>Google Cloud / OpenAI (en línea)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Hosting en la nube — servidor y almacenamiento (plan anual)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 240,00</td>
                                    <td className={tableCellClass}>Amazon AWS / Digital Ocean</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Dominio web y certificado SSL (1 año)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 30,00</td>
                                    <td className={tableCellClass}>GoDaddy / Namecheap (en línea)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Escáner de documentos de alta velocidad (para digitalización del archivo físico)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 220,00</td>
                                    <td className={tableCellClass}>Tiendas de tecnología, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Laptop de trabajo para el equipo de desarrollo (uso compartido)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 400,00</td>
                                    <td className={tableCellClass}>Centro de tecnología, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Capacitación del personal administrativo (talleres presenciales, 3 sesiones)</td>
                                    <td className={cn(tableCellClass, "text-center")}>3</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 150,00</td>
                                    <td className={tableCellClass}>Facilitador local / Colegio</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Materiales de oficina y logística (libretas, impresión de manuales, papelería)</td>
                                    <td className={cn(tableCellClass, "text-center")}>—</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 80,00</td>
                                    <td className={tableCellClass}>Librería / Papelería, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Diseño de identidad visual (logo, branding, materiales de presentación)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 120,00</td>
                                    <td className={tableCellClass}>Freelancer / Diseñador local</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Traslados y transporte (visitas a la institución, reuniones con aliados)</td>
                                    <td className={cn(tableCellClass, "text-center")}>—</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 60,00</td>
                                    <td className={tableCellClass}>Transporte urbano / Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Suscripción herramienta de gestión de proyectos (Notion / Trello — plan anual)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 40,00</td>
                                    <td className={tableCellClass}>Notion / Trello (en línea)</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500 py-6")} colSpan={2}>INVERSIÓN TOTAL DEL PROYECTO</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-3xl text-[#0A2472] italic")}>$ 1.700,00</td>
                                    <td className={tableCellClass}></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-slate-400 mt-3 italic">Nota: Los ítems pueden incluir donaciones monetarias o en especie. El presupuesto está expresado en USD referencial para facilitar la planificación. Los costos en Bs. se calcularán según la tasa BCV oficial vigente al momento de cada adquisición.</p>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 6 — ALIADOS */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <Handshake className="h-7 w-7" /> 6. ALIADOS ESTRATÉGICOS
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={cn(tableHeaderClass)} style={{ width: '35%' }}>Aliado</th>
                                    <th className={cn(tableHeaderClass)} style={{ width: '65%' }}>Apoyo Proporcionado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Colegio Santa Rosa de Lima — Dirección y Administración</td>
                                    <td className={tableCellClass}>Espacio físico para el desarrollo y piloto del proyecto. Acceso al archivo documental existente para el proceso de digitalización. Participación del personal administrativo en las sesiones de capacitación. Aval institucional para presentación ante entes externos.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Departamento de Informática del Colegio</td>
                                    <td className={tableCellClass}>Soporte técnico para la instalación de equipos y configuración de redes. Orientación en las especificaciones técnicas de la infraestructura existente. Facilitación del acceso a equipos disponibles en el laboratorio de computación.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Profesores Asesores del Colegio Santa Rosa de Lima</td>
                                    <td className={tableCellClass}>Mentoría académica en las áreas de Matemáticas, Computación y Ciencias Sociales. Evaluación del modelo de negocio y retroalimentación pedagógica. Validación del plan de acción y acompañamiento durante el proceso de desarrollo del proyecto ZEDU.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Representantes Estudiantiles (Asociación de Padres)</td>
                                    <td className={tableCellClass}>Participación como usuarios piloto del chatbot y del sistema de atención automatizada. Retroalimentación sobre las necesidades reales de comunicación colegio-familia. Difusión del proyecto entre la comunidad de representantes para su adopción.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Google for Education (Programa Educativo)</td>
                                    <td className={tableCellClass}>Acceso a créditos de Google Cloud para el uso de la API de Gemini (IA) bajo el programa educativo de Google. Soporte en documentación técnica y recursos de formación en inteligencia artificial para equipos estudiantiles.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>ZEDU (Organización Promotora)</td>
                                    <td className={tableCellClass}>Marco metodológico para el desarrollo del proyecto. Plataforma de difusión, visibilidad y presentación ante jurados evaluadores. Conexión con red de proyectos similares a nivel nacional e internacional. Certificación y reconocimiento del equipo participante.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 7 — PLAN DE ACCIÓN */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <ClipboardList className="h-7 w-7" /> 7. PLAN DE ACCIÓN
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={cn(tableHeaderClass, "text-left")} style={{ width: '40%' }}>Tarea</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Responsable</th>
                                    <th className={tableHeaderClass} style={{ width: '35%' }}>Cronograma</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClass}><strong>1.</strong> Visita inicial a la institución y reunión con la dirección del colegio para presentación del proyecto y firma de carta de intención.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Uzcategui<br /><span className="font-normal text-slate-500 text-xs">(Líder de Proyecto)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 1 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>2.</strong> Diagnóstico y levantamiento de información: entrevistas al personal administrativo, inventario del archivo físico actual y mapeo de procesos existentes.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Joaquin de Barros<br /><span className="font-normal text-slate-500 text-xs">(Análisis y Datos)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 2–3 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>3.</strong> Diseño de la arquitectura de la plataforma: definición de módulos, flujos de usuario, base de datos y estructura de la IA.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites<br /><span className="font-normal text-slate-500 text-xs">(Desarrollo Técnico)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 3–4 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>4.</strong> Reunión con aliados estratégicos: presentación a la Asociación de Padres, Departamento de Informática y gestión de acceso a Google Cloud para Education.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 4 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>5.</strong> Compra de materiales y equipos: escáner, dominio, contratación de hosting y suscripciones necesarias.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Uzcategui</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 1 (Noviembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>6.</strong> Desarrollo del Módulo de Archivo Digital: implementación del sistema de gestión documental con OCR y carga de documentos existentes.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites<br /><span className="font-normal text-slate-500 text-xs">(Desarrollo)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 2–5 (Noviembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>7.</strong> Desarrollo del Chatbot IA: entrenamiento del asistente virtual con preguntas frecuentes de la institución e integración con WhatsApp.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites<br />Joaquin de Barros</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 3–6 (Noviembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>8.</strong> Pruebas piloto con grupo seleccionado: 5 miembros del personal administrativo y 20 representantes voluntarios. Recolección de retroalimentación.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 1 (Diciembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>9.</strong> Ajustes y mejoras basadas en retroalimentación del piloto. Corrección de errores, optimización de velocidad y mejora de la interfaz de usuario.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 2–3 (Diciembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>10.</strong> Capacitación formal del personal administrativo: 3 talleres presenciales en el colegio sobre uso de la plataforma, chatbot y panel de control.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Uzcategui<br />Joaquin de Barros</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 3 (Diciembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>11.</strong> Lanzamiento oficial de la plataforma en la institución: presentación ante la comunidad escolar, activación del chatbot para todos los representantes y puesta en marcha del archivo digital.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 4 (Diciembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>12.</strong> Presentación del proyecto ante ZEDU: preparación de materiales, informe final de impacto y defensa pública del Modelo Zedu.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Enero 2026</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>13.</strong> Evaluación de resultados, medición de impacto y publicidad del proyecto: redes sociales, medios locales y presentación a otras instituciones interesadas.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Joaquin de Barros<br /><span className="font-normal text-slate-500 text-xs">(Comunicación)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Febrero – Marzo 2026</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 8 — IMPACTO ESPERADO */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-7 w-7" /> 8. IMPACTO ESPERADO Y PROYECCIÓN
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Indicadores de Éxito</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Impacto Operativo</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Reducción del tiempo de búsqueda de expedientes de 30 min a menos de 30 segundos.</li>
                                            <li>100% de expedientes estudiantiles digitalizados en los primeros 3 meses.</li>
                                            <li>Tasa de respuesta del chatbot a consultas frecuentes superior al 85%.</li>
                                            <li>Reducción del 70% en el tiempo dedicado a atención telefónica de representantes.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Impacto Social</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Más de 1.200 familias beneficiadas con atención automatizada y acceso digital a la información de sus hijos.</li>
                                            <li>Personal administrativo capacitado en herramientas de inteligencia artificial.</li>
                                            <li>Posicionamiento del Colegio Santa Rosa de Lima como referente de innovación educativa en Caracas.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Escalabilidad</td>
                                    <td className={tableCellClass}>
                                        <p>Una vez consolidado en el Colegio Santa Rosa de Lima, AutoMind AI tiene potencial de expansión a otras instituciones educativas privadas de Caracas (más de 400 colegios privados en el área metropolitana), y posteriormente a empresas, almacenes y organizaciones de cualquier sector que requieran digitalización de archivos y atención automatizada. El modelo de negocio proyectado es SaaS (Software como Servicio) con suscripción mensual.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-20 p-12 border-4 border-slate-100 rounded-[3rem] flex justify-between items-end gap-24">
                        <div className="flex-1 text-center border-t-2 border-black pt-6">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Miguel Uzcategui</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Líder de Proyecto</p>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-black pt-6">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Miguel Angel Goites</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Desarrollo Técnico</p>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-black pt-6">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Joaquin de Barros</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Análisis y Comunicación</p>
                        </div>
                        <div className="flex-1 text-center border-t-2 border-black pt-6">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Sello Institucional</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Colegio Santa Rosa de Lima</p>
                        </div>
                    </div>

                    <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-6 text-center opacity-40">
                        <Logo className="h-10 w-10" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            AutoMind AI · Modelo Zedu · Colegio Santa Rosa de Lima · Caracas, Venezuela · 2025–2026
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                            Presentado ante la organización ZEDU · Proyecto de Innovación Educativa y Tecnológica
                        </p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
