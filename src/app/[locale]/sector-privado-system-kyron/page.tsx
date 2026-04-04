"use client";

import { Printer, Download, ChevronLeft, CircleCheck as CheckCircle, Users, User, Cpu, Activity, Target, Zap, Lock, FileText, Scale, TrendingUp, ChartBar as BarChart3, Globe, Handshake, ClipboardList, MapPin, Sun, AlertTriangle, Lightbulb, ShieldCheck, BookOpen, Calculator, Smartphone, Recycle, Gavel, Building2, ShoppingCart, Megaphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => {
                if (!res.ok) {
                    router.replace('/es/login');
                } else {
                    setAuthChecked(true);
                }
            })
            .catch(() => router.replace('/es/login'));
    }, [router]);

    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

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
            "<head><meta charset='utf-8'><title>MODELO ZEDU — SYSTEM KYRON</title><style>" +
            "body { font-family: 'Arial', sans-serif; color: #0f172a; background-color: #ffffff; padding: 20pt; }" +
            ".cover { margin-bottom: 40pt; border-bottom: 2pt solid #0A2472; padding-bottom: 20pt; }" +
            ".cover-table { border: none !important; width: 100%; margin-bottom: 40pt; }" +
            ".cover-title { color: #0A2472; font-size: 28pt; font-weight: bold; margin: 0; line-height: 1.1; text-transform: uppercase; }" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 30pt; border: 1.5pt solid #000000; }" +
            "td, th { border: 1pt solid #000000; padding: 12pt; font-size: 10.5pt; vertical-align: top; }" +
            ".header-cell { background-color: #0A2472 !important; color: #ffffff !important; font-weight: bold; text-transform: uppercase; text-align: center; font-size: 10pt; letter-spacing: 1.5pt; }" +
            ".label-cell { background-color: #f8fafc !important; font-weight: bold; color: #475569 !important; width: 35%; text-transform: uppercase; font-size: 8.5pt; border-right: 1.5pt solid #000000; }" +
            "h2 { color: #0A2472; text-transform: uppercase; border-bottom: 2pt solid #0A2472; padding-bottom: 8pt; margin-top: 40pt; font-size: 16pt; letter-spacing: -0.5pt; font-weight: 900; }" +
            "h3 { color: #0A2472; text-transform: uppercase; border-bottom: 1pt solid #0A2472; padding-bottom: 6pt; margin-top: 30pt; font-size: 13pt; letter-spacing: -0.3pt; font-weight: 900; }" +
            "p { margin-bottom: 14pt; line-height: 1.7; text-align: justify; color: #334155; }" +
            "li { margin-bottom: 8pt; line-height: 1.6; color: #334155; }" +
            ".page-break { page-break-after: always; }" +
            ".highlight { color: #00A86B; font-weight: bold; }" +
            "</style></head><body>";

        const footer = "</body></html>";

        const cloned = contentElement.cloneNode(true) as HTMLElement;
        cloned.querySelectorAll('svg').forEach(svg => svg.remove());

        const wordHtml = `
            <div class="cover">
                <table class="cover-table" style="border: none !important;">
                    <tr>
                        <td style="border: none !important; width: 130px; vertical-align: middle;">${logoHtml}</td>
                        <td style="border: none !important; vertical-align: middle; padding-left: 25pt;">
                            <div class="cover-title">MODELO ZEDU</div>
                            <div class="cover-title" style="color: #64748b; font-size: 22pt;">SYSTEM KYRON</div>
                            <p style="font-size:10pt; color:#475569; margin-top:6pt; text-transform:uppercase; letter-spacing:2pt;">U.E.P. Gabriela Mistral · Caracas, Venezuela</p>
                        </td>
                    </tr>
                </table>
            </div>
            ${cloned.innerHTML}
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
            title: "DOCUMENTO DESCARGADO",
            description: "El Modelo Zedu — System Kyron ha sido generado correctamente.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    const tableHeaderClass = "header-cell bg-[#0A2472] text-white font-black uppercase p-5 text-[12px] border border-black tracking-[0.2em] text-center";
    const tableCellClass = "p-5 text-[13px] border border-black text-slate-900 bg-white leading-relaxed font-medium text-justify";
    const tableLabelClass = "label-cell bg-slate-50 p-5 text-[10px] font-black uppercase border border-black text-slate-500 w-1/3 border-r-2";

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 selection:bg-blue-100" style={{ colorScheme: 'light' }}>
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
                        <h1 className="text-4xl md:text-5xl font-black text-[#0A2472] uppercase tracking-tight italic leading-none">MODELO ZEDU</h1>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-400 uppercase tracking-tight italic leading-none">SYSTEM KYRON</h2>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest pt-1">U.E.P. Gabriela Mistral · Caracas, Venezuela</p>
                    </div>
                </div>

                <div id="zedu-document-content">

                    {/* SECCIÓN 1 — INFORMACIÓN DEL EQUIPO */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <Users className="h-7 w-7" /> 1. INFORMACIÓN DEL EQUIPO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={3}>Nombre del Proyecto</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase text-xl py-6 col-span-3")} colSpan={3}>System Kyron</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Integrantes del Equipo</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Carlos Mattar</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Sebastian Garrido</td>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")}>Marcos Sousa</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={3}>Institución Educativa</td></tr>
                                <tr>
                                    <td className={cn(tableCellClass, "text-center font-black uppercase py-6")} colSpan={3}>U.E.P. Gabriela Mistral</td>
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
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <MapPin className="h-7 w-7" /> 2. POBLACIÓN A TRABAJAR
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Localización</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>País / Ciudad / Municipio</td>
                                    <td className={tableCellClass}>Venezuela — alcance nacional, con sede operativa en Caracas, Distrito Capital</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Segmento de Mercado</td>
                                    <td className={tableCellClass}>Sector privado venezolano: pequeñas, medianas y grandes empresas que requieren gestión contable VEN-NIF, administración de nómina, telecomunicaciones corporativas, asesoría legal con IA y gestión de sostenibilidad.</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Datos del Mercado Objetivo</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Cantidad Estimada de Empresas</td>
                                    <td className={tableCellClass}>
                                        Según el INE y registros del SENIAT, Venezuela cuenta con aproximadamente <strong>890.000 contribuyentes jurídicos activos</strong>, de los cuales más de <strong>420.000 son pequeñas y medianas empresas (PYME)</strong> con necesidades activas de automatización fiscal y administrativa. El Municipio Libertador y Gran Caracas concentran el 38% de este universo empresarial.
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Distribución por Sector Productivo</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Comercio y servicios:</strong> 52% del total de empresas</li>
                                            <li><strong>Industria y manufactura:</strong> 18%</li>
                                            <li><strong>Telecomunicaciones y tecnología:</strong> 9%</li>
                                            <li><strong>Construcción y bienes raíces:</strong> 11%</li>
                                            <li><strong>Otros sectores:</strong> 10%</li>
                                        </ul>
                                        <p className="mt-2 text-sm text-slate-500 italic">Fuente: SENIAT — Padrón de Contribuyentes 2024. INE — Directorio de Empresas Venezuela.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Perfil del Usuario Final</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Propietarios y directivos (30–55 años):</strong> Toman decisiones de inversión tecnológica</li>
                                            <li><strong>Administradores y contadores:</strong> Usuarios directos del módulo fiscal y contable</li>
                                            <li><strong>Gerentes de RRHH:</strong> Usuarios del módulo de nómina y talento humano</li>
                                            <li><strong>Asesores legales y abogados corporativos:</strong> Usuarios del módulo jurídico</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Características del Entorno</td>
                                    <td className={tableCellClass}>
                                        <p>El mercado venezolano opera en un entorno de alta complejidad regulatoria: variaciones del tipo de cambio BCV con actualización diaria, múltiples tributos (IVA 16%, IGTF 3%, ISLR 34%, municipales, parafiscales), normativa contable VEN-NIF específica y un marco legal laboral exigente (LOTTT, LOPCYMAT, IVSS, FAOV). Las empresas enfrentan una carga operativa sin precedentes que justifica la automatización integral que ofrece System Kyron.</p>
                                        <p>El contexto venezolano también presenta una creciente adopción de soluciones digitales impulsada por la dolarización parcial de la economía y la recuperación económica del sector privado desde 2021, creando un ecosistema favorable para la implementación de software empresarial de nueva generación.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Clima y Conectividad</td>
                                    <td className={tableCellClass}>
                                        <p>Caracas posee <strong>clima tropical de sabana</strong> con temperaturas entre 18°C y 28°C. La conectividad digital en el Área Metropolitana de Caracas alcanza una penetración de internet de banda ancha del 62% en empresas formales, con cobertura 4G en el 78% del territorio urbano. System Kyron está diseñado con arquitectura cloud-first y funcionalidades de caché para operar eficientemente bajo condiciones de conectividad intermitente, característica crítica en el entorno venezolano.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 3 — ANÁLISIS DEL PROBLEMA */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <AlertTriangle className="h-7 w-7" /> 3. ANÁLISIS DEL PROBLEMA
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Definición del Problema</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Las empresas venezolanas operan en uno de los entornos regulatorios más complejos de América Latina, enfrentando simultáneamente la gestión de múltiples tributos con tasas dinámicas, la obligatoriedad de los libros contables bajo normas VEN-NIF, la administración de nóminas con múltiples beneficios y aportes sociales, y el cumplimiento de una legislación laboral y mercantil en constante actualización. La gran mayoría de las PYME venezolanas gestiona estas obligaciones mediante hojas de cálculo desconectadas, registros físicos y herramientas importadas no adaptadas al mercado local, generando ineficiencia operativa, riesgo fiscal elevado y pérdida de competitividad.</p>
                                        <p>No existe en el mercado venezolano un <strong>ecosistema digital integrado</strong> que unifique contabilidad VEN-NIF, nómina LOTTT, telecom corporativa, asesoría legal con IA y gestión de sostenibilidad en una sola plataforma diseñada desde cero para la realidad operativa venezolana.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Causas del Problema</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 1</td>
                                    <td className={tableCellClass}><strong>Ausencia de software local especializado:</strong> Las soluciones ERP disponibles (SAP, Oracle, Contpaq) están diseñadas para mercados latinoamericanos genéricos y no incorporan las particularidades fiscales venezolanas: tasa BCV en tiempo real, retenciones SENIAT, IVA e IGTF diferenciado, ajuste por inflación RIPF ni declaraciones en el portal DECLARASENIAT.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 2</td>
                                    <td className={tableCellClass}><strong>Fragmentación de herramientas:</strong> Las empresas utilizan entre 4 y 8 aplicaciones distintas para gestionar sus operaciones (hojas de cálculo, software de facturación básico, sistemas de nómina independientes, mensajería para comunicación legal), generando redundancias, errores de transferencia de datos y costos de licencias múltiples.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 3</td>
                                    <td className={tableCellClass}><strong>Costo elevado de asesoría especializada:</strong> La complejidad regulatoria venezolana obliga a las empresas a contratar contadores, abogados fiscalistas y asesores laborales de forma permanente. System Kyron automatiza estas funciones mediante IA, reduciendo drásticamente los costos de cumplimiento.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Causa 4</td>
                                    <td className={tableCellClass}><strong>Volatilidad cambiaria y fiscal:</strong> Las modificaciones frecuentes al marco impositivo (SENIAT), las actualizaciones diarias de la tasa BCV y los cambios en la Gaceta Oficial requieren un sistema que se actualice en tiempo real, capacidad que ninguna solución existente en Venezuela ofrece de forma nativa.</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Consecuencias del Problema</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Consecuencia Principal</td>
                                    <td className={tableCellClass}><strong>Incumplimiento fiscal y riesgo de multas SENIAT:</strong> El 67% de las PYME venezolanas reportan haber recibido al menos una notificación de incumplimiento tributario en los últimos 3 años, con multas que pueden alcanzar el 300% del tributo omitido, poniendo en riesgo la continuidad operativa de la empresa.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Consecuencias Secundarias</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Pérdida de hasta 35 horas mensuales del personal administrativo en tareas de conciliación manual.</li>
                                            <li>Errores en el cálculo de nómina que generan reclamaciones laborales y exposición legal.</li>
                                            <li>Imposibilidad de generar estados financieros confiables para decisiones estratégicas.</li>
                                            <li>Dificultad para acceder a financiamiento bancario por falta de informes auditables en tiempo real.</li>
                                            <li>Pérdida de contratos por no poder demostrar solvencia fiscal ante clientes corporativos.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Origen del Problema</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>El origen del problema radica en la <strong>inexistencia de infraestructura tecnológica empresarial diseñada específicamente para el mercado venezolano</strong>. La complejidad única del entorno regulatorio venezolano (combinación de hiperinflación histórica, dolarización parcial, tributos especiales como el IGTF y normas contables locales VEN-NIF) hace inviable la adaptación de soluciones extranjeras sin un desarrollo profundo desde cero. Este vacío representa la oportunidad estratégica que justifica la creación de System Kyron.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Importancia de Resolver el Problema</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>Resolver este problema es de impacto nacional: (1) protege a las empresas venezolanas del riesgo fiscal con cumplimiento automatizado al 100%; (2) reduce el costo operativo de compliance en un 60–80% al eliminar la dependencia de múltiples asesores; (3) democratiza el acceso a herramientas de gestión corporativa de nivel internacional para empresas de cualquier tamaño; (4) contribuye a la formalización y modernización del tejido empresarial venezolano, fortaleciendo la economía nacional.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 4 — SOLUCIÓN PROPUESTA */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <Lightbulb className="h-7 w-7" /> 4. SOLUCIÓN PROPUESTA — SYSTEM KYRON
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Descripción del Proyecto</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p><strong>System Kyron</strong> es un ecosistema de inteligencia corporativa de grado empresarial, diseñado exclusivamente para el mercado venezolano. Integra en una sola plataforma web la gestión contable bajo normas VEN-NIF, la administración de recursos humanos con cumplimiento LOTTT, los servicios de telecomunicaciones 5G corporativas, la asesoría legal impulsada por IA, la gestión de eco-créditos y la analítica ejecutiva en tiempo real.</p>
                                        <p>La plataforma consolida 12 portales especializados interconectados, accesibles desde cualquier dispositivo mediante autenticación segura con cifrado AES-256 y sellado criptográfico de expedientes. Su arquitectura modular permite a cada empresa activar únicamente los módulos que necesita, escalando según su crecimiento.</p>
                                        <p>System Kyron integra de forma nativa la <strong>inteligencia artificial Kyron AI, potenciada por Claude de Anthropic,</strong> para la generación automática de contratos, análisis fiscal predictivo, cálculo de nómina con ajuste por inflación y clasificación de residuos para eco-créditos, posicionándose como la plataforma de gestión empresarial más avanzada tecnológicamente del mercado venezolano.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Módulos Principales del Ecosistema (11 Portales Especializados)</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><User className="h-4 w-4 shrink-0" /> Módulo 1: Portal Personal / Ciudadano</div>
                                    </td>
                                    <td className={tableCellClass}>Terminal ciudadana digital para personas naturales. Gestión de identidad (ID Digital 3D), bóveda de documentos civiles (cédula, pasaporte, RIF familiar), partidas de nacimiento, actas de matrimonio, antecedentes penales, directorio médico, carnet de salud, LOPNNA y buzón judicial. Autenticación biométrica con cifrado AES-256.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Smartphone className="h-4 w-4 shrink-0" /> Módulo 2: Telefonía Personal y Línea Infantil CONATEL</div>
                                    </td>
                                    <td className={tableCellClass}>
                                        <p><strong>Servicio de Telefonía Personal:</strong> Comercialización de líneas telefónicas personales bajo concesión CONATEL, con planes de voz, datos y mensajería en redes 4G/5G. Portabilidad numérica, activación digital inmediata, recarga electrónica y atención al cliente integrada en la plataforma System Kyron.</p>
                                        <p><strong>Línea Infantil acordada por CONATEL:</strong> Servicio de telefonía especializado para menores de 0 a 17 años según los acuerdos de protección infantil de CONATEL y la LOPNNA. Control parental biométrico, restricción de contenido no apto, límites de gasto configurable por representantes, GPS de ubicación familiar y reportes de uso mensual enviados al tutor legal. Plan con tarifa social regulada por la Comisión Nacional de Telecomunicaciones.</p>
                                        <p><strong>Proyecciones de Ingresos:</strong> Con una base inicial de 200 líneas personales a $8/mes y 50 líneas infantiles a $5/mes, el módulo proyecta ingresos de $1.850/mes en el primer trimestre. A 12 meses, con 1.000 líneas activas, se proyectan $9.500/mes de ingresos recurrentes de telecomunicaciones, con una tasa de crecimiento mensual del 15%.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Users className="h-4 w-4 shrink-0" /> Módulo 3: RRHH y Nómina</div>
                                    </td>
                                    <td className={tableCellClass}>Gestión completa del ciclo de vida del empleado: contratación, control de asistencia, nómina con cálculo automático de SSO (IVSS), FAOV, LPH, utilidades, prestaciones sociales, bono vacacional y vacaciones según LOTTT 2012. Certificados laborales, permisos pre y post natal, LOPCYMAT, declaraciones al INPSASEL y reportes para la Inspectoría del Trabajo generados automáticamente. Cálculo de alícuota de prestaciones sociales con intereses fideicomiso.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Smartphone className="h-4 w-4 shrink-0" /> Módulo 4: Telecom 5G / eSIM y Homologación CONATEL</div>
                                    </td>
                                    <td className={tableCellClass}>Portal unificado de administración de líneas telefónicas físicas y eSIM corporativas 5G. Gestión de flota empresarial con control de consumo por empleado o departamento. <strong>Homologación de equipos por IMEI ante CONATEL</strong>: verificación automática del IMEI de cada equipo en la base de datos de CONATEL, reportes mensuales de equipos homologados por empleado, gestión centralizada de altas, bajas y cambios de equipo sin perder la línea, y control parental para líneas jóvenes (0–17 años). Portal de administración de red: gestión técnica de radiobases, provisión masiva y telemetría en tiempo real.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><ShoppingCart className="h-4 w-4 shrink-0" /> Módulo 5: Facturación y Punto de Venta</div>
                                    </td>
                                    <td className={tableCellClass}>Sistema de punto de venta (POS) con emisión de facturas fiscales, notas de débito y crédito con sellado automático ante el SENIAT. Control de inventario en tiempo real, gestión de cuentas por cobrar y pagar, conciliación de cobros en bolívares y divisas, integración con máquinas fiscales certificadas (The Factory HKA, Epson, Hasar) y tasa BCV actualizada diariamente para conversión automática.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Gavel className="h-4 w-4 shrink-0" /> Módulo 6: IA Legal y Permisos</div>
                                    </td>
                                    <td className={tableCellClass}>Generación automática por Kyron AI (potenciado por Claude de Anthropic) de contratos de trabajo, poderes notariales, actas de asamblea, contratos mercantiles y de arrendamiento, y permisos ante CONATEL y SENIAT. Escritorio jurídico digital con búsqueda semántica en Gaceta Oficial actualizada. Gestión de socios y directivos, libros de actas, certificaciones corporativas y blindaje jurídico automatizado con sellado criptográfico de expedientes.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Target className="h-4 w-4 shrink-0" /> Módulo 7: Socios y Directivos</div>
                                    </td>
                                    <td className={tableCellClass}>Portal de supervisión estratégica para socios, accionistas y directivos. Consolidación de contabilidad de múltiples entidades corporativas en un único panel. Análisis de rentabilidad por unidad de negocio, reparto de dividendos, análisis de escenarios financieros predictivos con IA, reportes ejecutivos en PowerPoint generados automáticamente y alertas de riesgo fiscal en tiempo real.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Recycle className="h-4 w-4 shrink-0" /> Módulo 8: Sostenibilidad / Ameru Eco-Créditos</div>
                                    </td>
                                    <td className={tableCellClass}>Sistema de clasificación inteligente de residuos por visión artificial e IA con tecnología de inducción magnética (99% de precisión). Generación de eco-créditos certificados por empresa. Mercado interno de compra-venta de eco-créditos entre empresas participantes. Reportes de impacto ambiental, huella de carbono y cumplimiento de normativa de responsabilidad social empresarial. Alianza estratégica con papeleras inteligentes Ameru.AI.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Cpu className="h-4 w-4 shrink-0" /> Módulo 9: Ingeniería e Informática (IT)</div>
                                    </td>
                                    <td className={tableCellClass}>Portal de ingeniería para control de infraestructura tecnológica empresarial: inventario de activos IT, gestión de licencias de software, planos de red y arquitectura de sistemas, presupuestos técnicos, órdenes de trabajo, control de mantenimiento preventivo y correctivo. Monitoreo de servidores, switches y equipos activos de red. Generación de memorias descriptivas técnicas y certificaciones de infraestructura ante entes reguladores.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><Megaphone className="h-4 w-4 shrink-0" /> Módulo 10: Marketing IA</div>
                                    </td>
                                    <td className={tableCellClass}>Estrategias comerciales y análisis de mercado potenciadas por inteligencia artificial. Alertas de inversión, análisis de sentimiento de marca, generación automática de contenido publicitario, segmentación de clientes, proyecciones de ventas y benchmarking competitivo. Dashboard de métricas de conversión y retorno de inversión publicitaria (ROI) en tiempo real.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>
                                        <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 shrink-0" /> Módulo 11: Analítica Avanzada y Dashboard Ejecutivo</div>
                                    </td>
                                    <td className={tableCellClass}>Centro de mando ejecutivo con KPIs financieros, operativos y tributarios en tiempo real: flujo de caja consolidado, cuentas por cobrar/pagar, proyecciones de utilidades, análisis de rentabilidad por producto, benchmarking tributario y escenarios predictivos con IA. Generación automática de reportes PDF y PowerPoint para directivos, tablero de control de todos los módulos y alertas de riesgo cruzado entre áreas.</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-12">
                            <h3 className="text-xl font-black uppercase mb-6 tracking-tight flex items-center gap-3 text-[#0A2472]">
                                <ShieldCheck className="h-6 w-6" /> Propuestas Existentes y Diferenciadores
                            </h3>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr><td className={tableHeaderClass} colSpan={2}>Otras Propuestas Existentes para Solucionar el Problema</td></tr>
                                    <tr>
                                        <td className={tableCellClass} colSpan={2}>
                                            <p>El proyecto más similar identificado en el mercado es <strong>MOBIAN</strong>, que se enfoca en la optimización de datos y escalabilidad técnica para empresas, dirigiéndose a equipos corporativos mediante integración de sistemas. Sin embargo, MOBIAN no está diseñado específicamente para las particularidades fiscales y regulatorias del mercado venezolano.</p>
                                            <p>Otras alternativas incluyen ERP importados como SAP Business One, Contpaq (México), y sistemas de facturación básicos locales, que carecen de integración nativa con el SENIAT, la tasa BCV, normas VEN-NIF y las particularidades laborales de la LOTTT. Adicionalmente, Google Workspace y Microsoft 365 ofrecen productividad general pero no gestión empresarial especializada para Venezuela.</p>
                                        </td>
                                    </tr>
                                    <tr><td className={tableHeaderClass} colSpan={2}>Diferenciadores de System Kyron</td></tr>
                                    <tr>
                                        <td className={tableLabelClass}>Especialización en el Mercado Venezolano</td>
                                        <td className={tableCellClass}>
                                            <p>Mientras MOBIAN y los ERP genéricos ofrecen gestión empresarial estándar, <strong>System Kyron resuelve problemas específicos del ecosistema venezolano</strong>: integración en tiempo real con la tasa BCV, declaraciones automáticas ante el SENIAT, cálculo de nómina con todos los aportes parafiscales venezolanos y gestión legal bajo el ordenamiento jurídico venezolano vigente.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>Integración Nativa de IA Avanzada</td>
                                        <td className={tableCellClass}>
                                            <p>Los competidores locales carecen de inteligencia artificial integrada. <strong>System Kyron incorpora Kyron AI, potenciado por Claude de Anthropic,</strong> para generación de documentos legales, análisis fiscal predictivo, detección de inconsistencias contables y clasificación de residuos para eco-créditos, representando un salto generacional frente a las soluciones existentes.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>Ecosistema Modular Integrado (12 portales)</td>
                                        <td className={tableCellClass}>
                                            <p>Mientras los competidores requieren múltiples herramientas independientes, <strong>System Kyron unifica 12 portales especializados en un único ecosistema</strong>, eliminando la fragmentación de datos y reduciendo hasta un 70% los costos de tecnología empresarial. La arquitectura modular permite activar solo los módulos necesarios.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={tableLabelClass}>Sostenibilidad y Telecom Corporativo</td>
                                        <td className={tableCellClass}>
                                            <p>System Kyron es la única plataforma en Venezuela que integra la gestión de telecomunicaciones 5G corporativas y el mercado de eco-créditos en un mismo ecosistema empresarial, creando una propuesta de valor única y sin competencia directa en ambas dimensiones estratégicas.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 5 — PRESUPUESTO */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <Zap className="h-7 w-7" /> 5. PRESUPUESTO (INVERSIÓN REQUERIDA)
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={cn(tableHeaderClass, "text-left")} style={{ width: '45%' }}>Ítem</th>
                                    <th className={tableHeaderClass} style={{ width: '10%' }}>Cantidad</th>
                                    <th className={tableHeaderClass} style={{ width: '20%' }}>Costo (USD)</th>
                                    <th className={tableHeaderClass} style={{ width: '25%' }}>Lugar de Compra / Contratación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClass}>Suscripción Kyron AI — Claude de Anthropic (IA generativa para módulos legales, fiscal y eco-créditos) — plan anual</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 480,00</td>
                                    <td className={tableCellClass}>Kyron AI Cloud — Claude (Anthropic) en línea</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Hosting cloud en Vercel / AWS — servidor Next.js, base de datos PostgreSQL y almacenamiento de documentos (plan anual)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 360,00</td>
                                    <td className={tableCellClass}>Vercel Pro / Amazon AWS</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Dominio web systemkyron.com y certificado SSL/TLS (1 año)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 35,00</td>
                                    <td className={tableCellClass}>Namecheap (en línea)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Laptops de desarrollo para el equipo (2 unidades — uso compartido en fases de desarrollo)</td>
                                    <td className={cn(tableCellClass, "text-center")}>2</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 800,00</td>
                                    <td className={tableCellClass}>Centro de tecnología, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Suscripción herramientas de desarrollo: GitHub Pro, Figma y suite de diseño UI/UX (plan anual)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 144,00</td>
                                    <td className={tableCellClass}>GitHub / Figma (en línea)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Consultoría con contador público certificado en VEN-NIF para validación del módulo fiscal</td>
                                    <td className={cn(tableCellClass, "text-center")}>5 sesiones</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 200,00</td>
                                    <td className={tableCellClass}>Contador independiente, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Consultoría con abogado mercantilista para validación del módulo legal y generación de documentos</td>
                                    <td className={cn(tableCellClass, "text-center")}>3 sesiones</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 150,00</td>
                                    <td className={tableCellClass}>Abogado independiente, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Diseño de identidad visual corporativa System Kyron: logo definitivo, manual de marca y materiales de pitch</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 180,00</td>
                                    <td className={tableCellClass}>Diseñador gráfico local / Freelancer</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Acceso a datos SENIAT y BCV (suscripción a fuentes oficiales de actualización fiscal y cambiaria)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 60,00</td>
                                    <td className={tableCellClass}>APIs SENIAT / Banco Central de Venezuela</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Logística, traslados y gastos operativos del equipo (visitas a empresas piloto, material de presentación)</td>
                                    <td className={cn(tableCellClass, "text-center")}>—</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 91,00</td>
                                    <td className={tableCellClass}>Transporte urbano / Imprentas, Caracas</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={4}>Gastos Operativos del Local y Permisología</td></tr>
                                <tr>
                                    <td className={tableCellClass}>Alquiler mensual de local comercial (sede operativa System Kyron / punto de venta de telefonía) — incluye servicios básicos</td>
                                    <td className={cn(tableCellClass, "text-center")}>12 meses</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 4.800,00</td>
                                    <td className={tableCellClass}>Local comercial, Área Metropolitana de Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Permisología operativa: inscripción SENIAT (RIF empresarial), habilitación municipal, permiso CONATEL concesión telefonía personal, certificado de solvencia laboral INPSASEL y bomberos</td>
                                    <td className={cn(tableCellClass, "text-center")}>1 conjunto</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 850,00</td>
                                    <td className={tableCellClass}>SENIAT / Alcaldía / CONATEL / INPSASEL</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}>Acondicionamiento inmobiliario del local: adecuación eléctrica, rótulo corporativo, mobiliario de atención al cliente (escritorios, sillas, counter, estantes de exhibición de equipos)</td>
                                    <td className={cn(tableCellClass, "text-center")}>1</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 2.200,00</td>
                                    <td className={tableCellClass}>Proveedores locales, Caracas</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={4}>Bienes Muebles — Flota de Despacho y Logística</td></tr>
                                <tr>
                                    <td className={tableCellClass}><strong>Motocicleta Bera Carguera DT-200</strong> — para logística de distribución de SIM Cards, papeleras Ameru y equipos de telefonía. Capacidad de carga 200 kg, motor 200cc, incluye caja de carga metálica lateral y central.</td>
                                    <td className={cn(tableCellClass, "text-center")}>1 unidad</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 2.800,00</td>
                                    <td className={tableCellClass}>Distribuidora Bera Venezuela / Casa Bera, Caracas</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>Motocicleta de Despacho</strong> — para entregas urgentes, activación de líneas a domicilio y traslado de documentación entre puntos operativos. Motor 150cc, ágil para entorno urbano.</td>
                                    <td className={cn(tableCellClass, "text-center")}>1 unidad</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 1.650,00</td>
                                    <td className={tableCellClass}>Distribuidora de motos, Caracas</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={4}>Compra Inicial de Inventario</td></tr>
                                <tr>
                                    <td className={tableCellClass}><strong>Papeleras Inteligentes Ameru.AI</strong> — unidades con sensores de inducción magnética para clasificación de residuos, generación de eco-créditos y conectividad IoT. Destino: puntos de venta aliados y sede operativa.</td>
                                    <td className={cn(tableCellClass, "text-center")}>10 unidades</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 683,00</td>
                                    <td className={tableCellClass}>Ameru.AI Venezuela</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>Inventario inicial de teléfonos</strong> — lote mixto de smartphones para comercialización en el punto de venta: gama económica (Xiaomi Redmi, Samsung Galaxy A-series), gama media (Samsung Galaxy M-series, Huawei Nova) y accesorios (fundas, protectores, cargadores).</td>
                                    <td className={cn(tableCellClass, "text-center")}>30 equipos</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 4.500,00</td>
                                    <td className={tableCellClass}>Mayoristas de electrónica, Caracas / La Guaira</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500 py-6")} colSpan={2}>INVERSIÓN TOTAL DEL PROYECTO</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-3xl text-[#0A2472] italic")}>$ 18.574,00</td>
                                    <td className={tableCellClass}></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-slate-400 mt-3 italic">Nota: Los ítems pueden incluir donaciones monetarias o en especie de aliados estratégicos. El presupuesto está expresado en USD referencial. Los costos en Bs. se calcularán según la tasa BCV oficial vigente al momento de cada adquisición. La inversión se recupera en el primer año con la suscripción de 3 empresas cliente al plan corporativo.</p>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 6 — ALIADOS */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
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
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Google Cloud for Education</td>
                                    <td className={tableCellClass}>Acceso a créditos de IA y la API de Kyron AI (Claude de Anthropic) bajo el programa educativo. Documentación técnica, recursos de formación en inteligencia artificial y soporte en la arquitectura de sistemas basados en IA generativa para equipos estudiantiles emprendedores.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Colegio Santa Rosa de Lima</td>
                                    <td className={tableCellClass}>Espacio institucional y aval académico para el desarrollo del proyecto. Acceso a la red de empresas vinculadas a la comunidad de representantes para las pruebas piloto. Participación del profesorado especializado en las áreas de Computación, Economía y Ciencias Sociales como asesores académicos del equipo.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Empresas Piloto del Sector Privado</td>
                                    <td className={tableCellClass}>Tres empresas PYME del Área Metropolitana de Caracas (sectores comercio, servicios y tecnología) comprometidas a participar como usuarios beta de la plataforma durante la fase de validación. Retroalimentación directa sobre la usabilidad, precisión fiscal y eficiencia de los módulos en entorno de producción real.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Contador Público Certificado (VEN-NIF)</td>
                                    <td className={tableCellClass}>Validación técnica del módulo de Contabilidad VEN-NIF y del módulo de Declaraciones Tributarias. Revisión de los algoritmos de cálculo de IVA, ISLR, IGTF y retenciones SENIAT. Certificación de la exactitud de los libros contables generados por la plataforma conforme a las Normas Internacionales de Información Financiera adaptadas a Venezuela.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>Abogado Mercantilista / Laboralista</td>
                                    <td className={tableCellClass}>Validación jurídica de los documentos generados por el módulo de IA Legal: contratos, poderes, actas de asamblea y permisos. Verificación del cumplimiento de la LOTTT en el módulo de RRHH. Orientación sobre la normativa CONATEL para el módulo de telecomunicaciones corporativas.</td>
                                </tr>
                                <tr>
                                    <td className={cn(tableCellClass, "font-black uppercase")}>ZEDU (Organización Promotora)</td>
                                    <td className={tableCellClass}>Marco metodológico para el desarrollo del Modelo Zedu. Plataforma de visibilidad, difusión y presentación ante jurados evaluadores nacionales e internacionales. Conexión con la red de proyectos emprendedores estudiantiles. Certificación académica y reconocimiento del equipo System Kyron.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 6B — COMPETENCIA Y FABRICANTES DE TELEFONÍA */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <Globe className="h-7 w-7" /> 6B. COMPETENCIA Y FABRICANTES DE TELEFONÍA
                        </h2>

                        {/* Operadores competidores */}
                        <div className="mb-10">
                            <h3 className="text-xl font-black uppercase mb-6 tracking-tight flex items-center gap-3 text-[#0A2472]">
                                <Activity className="h-6 w-6" /> Operadores de Telefonía — Competencia Directa en Venezuela
                            </h3>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className={cn(tableHeaderClass)} style={{ width: '22%' }}>Operador</th>
                                        <th className={cn(tableHeaderClass)} style={{ width: '15%' }}>Teléfono</th>
                                        <th className={cn(tableHeaderClass)} style={{ width: '23%' }}>Correo Electrónico</th>
                                        <th className={cn(tableHeaderClass)} style={{ width: '40%' }}>Análisis Competitivo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>Inter (Intercable)</td>
                                        <td className={cn(tableCellClass, "text-center font-mono")}>0212-256-0000</td>
                                        <td className={cn(tableCellClass, "text-xs")}>clientes@inter.com.ve</td>
                                        <td className={tableCellClass}>Operador convergente (internet + telefonía fija). Fortaleza: bundle residencial. Debilidad: sin oferta de telefonía móvil personal robusta. System Kyron se diferencia con telefonía móvil 5G personal y línea infantil regulada.</td>
                                    </tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>NetUno</td>
                                        <td className={cn(tableCellClass, "text-center font-mono")}>0212-202-2000</td>
                                        <td className={cn(tableCellClass, "text-xs")}>atencion@netuno.com.ve</td>
                                        <td className={tableCellClass}>Proveedor de internet y telefonía IP fija para empresas. Sin oferta móvil personal. Fortaleza: empresas medianas y grandes en Caracas. Oportunidad de alianza con System Kyron para ofrecer complementariedad de servicios al segmento corporativo.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Fabricantes de telefonía */}
                        <div>
                            <h3 className="text-xl font-black uppercase mb-6 tracking-tight flex items-center gap-3 text-[#0A2472]">
                                <Smartphone className="h-6 w-6" /> Fabricantes de Telefonía — Proveedores de Inventario y Aliados Tecnológicos
                            </h3>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className={cn(tableHeaderClass)} style={{ width: '20%' }}>Fabricante</th>
                                        <th className={cn(tableHeaderClass)} style={{ width: '18%' }}>Contacto Venezuela</th>
                                        <th className={cn(tableHeaderClass)} style={{ width: '25%' }}>Correo / Web</th>
                                        <th className={cn(tableHeaderClass)} style={{ width: '37%' }}>Relevancia para System Kyron</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>Samsung Electronics Venezuela</td>
                                        <td className={cn(tableCellClass, "text-center font-mono text-xs")}>0800-726-7864</td>
                                        <td className={cn(tableCellClass, "text-xs")}>samsung.ve@samsung.com / samsung.com/ve</td>
                                        <td className={tableCellClass}>Proveedor principal del inventario inicial. Galaxy A-series y M-series para gama media. Soporte técnico oficial, garantía de 1 año y homologación CONATEL vigente. Condiciones de distribuidor disponibles para volumen mínimo de 20 equipos.</td>
                                    </tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>Huawei Venezuela</td>
                                        <td className={cn(tableCellClass, "text-center font-mono text-xs")}>0212-953-3333</td>
                                        <td className={cn(tableCellClass, "text-xs")}>venezuela@huawei.com / huawei.com/ve</td>
                                        <td className={tableCellClass}>Equipos con soporte de eSIM y conectividad 5G. Línea Nova para gama media. Infraestructura de red 5G y radiobases compatibles con el módulo Telecom de System Kyron. Aliado estratégico potencial para despliegue de red en Venezuela.</td>
                                    </tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>Xiaomi / Redmi Venezuela</td>
                                        <td className={cn(tableCellClass, "text-center font-mono text-xs")}>0212-763-4500</td>
                                        <td className={cn(tableCellClass, "text-xs")}>ventas@xiaomi-ve.com / xiaomi.com/ve</td>
                                        <td className={tableCellClass}>Gama económica con mejor relación precio-rendimiento del mercado. Redmi series para el segmento popular. Ideal para el plan de línea infantil CONATEL por precio accesible ($80–$150). Alta disponibilidad en el mercado venezolano.</td>
                                    </tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>Nokia Venezuela (HMD Global)</td>
                                        <td className={cn(tableCellClass, "text-center font-mono text-xs")}>0212-285-7100</td>
                                        <td className={cn(tableCellClass, "text-xs")}>venezuela@nokia.com / nokia.com/phones</td>
                                        <td className={tableCellClass}>Equipos robustos con Android One puro, ideal para línea infantil por seguridad del sistema operativo no modificado. Actualización de seguridad garantizada por 3 años. Precio accesible en gama básica ($60–$120). Homologados CONATEL.</td>
                                    </tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>TCL / Alcatel Venezuela</td>
                                        <td className={cn(tableCellClass, "text-center font-mono text-xs")}>0212-793-2255</td>
                                        <td className={cn(tableCellClass, "text-xs")}>ventas@tcl-venezuela.com / tcl.com</td>
                                        <td className={tableCellClass}>Marca de volumen para gama básica. Alcatel 1-series y 3-series para segmento popular y línea infantil. Precios desde $45. Amplia disponibilidad a través de distribuidores nacionales. Condiciones comerciales favorables para nuevos distribuidores con bajo MOQ.</td>
                                    </tr>
                                    <tr>
                                        <td className={cn(tableCellClass, "font-black uppercase")}>Motorola Venezuela (Lenovo)</td>
                                        <td className={cn(tableCellClass, "text-center font-mono text-xs")}>0212-906-5000</td>
                                        <td className={cn(tableCellClass, "text-xs")}>venezuela@motorola.com / motorola.com/ve</td>
                                        <td className={tableCellClass}>Moto E-series para gama económica, Moto G-series para gama media. Reconocimiento de marca sólido en Venezuela. Baterías de larga duración adecuadas para usuarios que no tienen acceso frecuente a carga. Compatible con planes de telefonía personal System Kyron.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 7 — PLAN DE ACCIÓN */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
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
                                    <td className={tableCellClass}><strong>1.</strong> Investigación de mercado y validación del problema: entrevistas a 10 empresas PYME venezolanas para confirmar las necesidades de automatización fiscal, laboral y legal.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Joaquin de Barros<br /><span className="font-normal text-slate-500 text-xs">(Análisis y Comunicación)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 1 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>2.</strong> Diseño de arquitectura técnica: definición de módulos, esquema de base de datos PostgreSQL (32 tablas), APIs REST y flujos de usuario para los 12 portales de System Kyron.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites<br /><span className="font-normal text-slate-500 text-xs">(Desarrollo Técnico)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 2–3 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>3.</strong> Gestión de aliados: firma de acuerdos con contador certificado VEN-NIF, abogado laboralista y empresas piloto. Activación de créditos Google Cloud for Education.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Uzcategui<br /><span className="font-normal text-slate-500 text-xs">(Líder de Proyecto)</span></td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 4 (Octubre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>4.</strong> Desarrollo del Módulo de Telefonía Personal y Línea Infantil CONATEL: implementación de activación de líneas, control parental biométrico, integración con CONATEL para homologación de IMEI, sistema de recarga y gestión de planes infantiles con tarifa regulada.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 1–4 (Noviembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>5.</strong> Desarrollo del Módulo RRHH y Nómina: cálculo automático con SSO, FAOV, LPH, utilidades, prestaciones LOTTT y generación de recibos de nómina auditables.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites<br />Joaquin de Barros</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 3–6 (Noviembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>6.</strong> Integración de Kyron AI (Claude de Anthropic): implementación de generación de contratos, análisis fiscal predictivo, clasificación de residuos para eco-créditos y asistente de documentos legales con IA.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Angel Goites</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 5–7 (Noviembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>7.</strong> Pruebas piloto con empresas beta: despliegue de los módulos Contabilidad y RRHH en 3 empresas seleccionadas. Validación técnica con contador y abogado. Corrección de bugs y ajuste de algoritmos fiscales.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semanas 1–3 (Diciembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>8.</strong> Lanzamiento de la plataforma v1.0: despliegue en producción con autenticación segura, dominio propio, SSL y onboarding de los primeros clientes de pago. Activación del plan de suscripción mensual.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Miguel Uzcategui<br />Miguel Angel Goites</td>
                                    <td className={cn(tableCellClass, "text-center")}>Semana 4 (Diciembre 2025)</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>9.</strong> Presentación ante ZEDU y jurados evaluadores: preparación del pitch ejecutivo, demo en vivo de la plataforma y presentación de métricas de impacto, empresas activas y validaciones técnicas obtenidas.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Enero 2026</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClass}><strong>10.</strong> Expansión post-ZEDU: activación de módulos Telecom 5G/eSIM y Ameru Eco-Créditos, apertura de nuevas cuentas empresariales y desarrollo de la versión mobile de la plataforma.</td>
                                    <td className={cn(tableCellClass, "text-center font-black")}>Equipo Completo</td>
                                    <td className={cn(tableCellClass, "text-center")}>Febrero – Junio 2026</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 8 — IMPACTO */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <TrendingUp className="h-7 w-7" /> 8. IMPACTO ESPERADO
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Impacto Económico</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Ahorro por Empresa Cliente</td>
                                    <td className={tableCellClass}>Una empresa PYME venezolana destina en promedio $500–$1.200/mes en asesoría contable, legal y RRHH. System Kyron automatiza estas funciones con una suscripción desde $49/mes, generando un ahorro neto de hasta el 95% en costos de compliance. El ROI para el cliente se alcanza en el primer mes de uso.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Potencial de Mercado</td>
                                    <td className={tableCellClass}>Con un mercado objetivo de 420.000 PYME venezolanas y una penetración inicial del 0,1% (420 empresas), System Kyron proyecta ingresos recurrentes de $20.580/mes en el primer año. La proyección a 5 años con el 1% del mercado alcanza los $2,05 millones anuales en ingresos de suscripción.</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Impacto Social y Ambiental</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Formalización Empresarial</td>
                                    <td className={tableCellClass}>Al reducir el costo y la complejidad del cumplimiento regulatorio, System Kyron incentiva la formalización de empresas informales venezolanas, ampliando la base tributaria nacional y fortaleciendo el sistema de seguridad social (IVSS, FAOV) mediante el correcto pago de aportes de nómina automatizados.</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Impacto Ambiental (Ameru)</td>
                                    <td className={tableCellClass}>El módulo Ameru Eco-Créditos incentiva la gestión responsable de residuos industriales y comerciales, generando un mercado de sostenibilidad empresarial en Venezuela. Se estima que cada empresa activa en el módulo reduce en un 30% sus residuos no clasificados, con certificación verificable de impacto ambiental.</td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Indicadores de Éxito (KPIs del Proyecto)</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <ul className="list-disc list-inside space-y-2">
                                            <li><strong>Año 1:</strong> 50 empresas activas · $2.450/mes en ingresos recurrentes · 3 módulos en producción estable · Cero multas SENIAT reportadas por clientes activos</li>
                                            <li><strong>Año 2:</strong> 250 empresas activas · $12.250/mes en ingresos · 8 módulos activos · Expansión a ciudades de Maracaibo, Valencia y Barquisimeto</li>
                                            <li><strong>Año 3:</strong> 1.000+ empresas activas · Módulo Telecom 5G/eSIM completamente operativo · Primera ronda de inversión externa</li>
                                            <li><strong>Largo plazo:</strong> Convertirse en el estándar de gestión empresarial del sector privado venezolano y expandir el modelo a mercados latinoamericanos con alta regulación fiscal similar</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-break" />

                    {/* SECCIÓN 9 — PUBLICIDAD WEB */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-4 text-[#0A2472]">
                            <Megaphone className="h-7 w-7" /> 9. ESTRATEGIA PUBLICITARIA — PLATAFORMA WEB
                        </h2>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr><td className={tableHeaderClass} colSpan={2}>Presencia Digital y Posicionamiento Web</td></tr>
                                <tr>
                                    <td className={tableCellClass} colSpan={2}>
                                        <p>La plataforma web <strong>systemkyron.com</strong> constituye el canal principal de captación, conversión y retención de clientes empresariales. La estrategia publicitaria digital de System Kyron se estructura en tres ejes: <strong>posicionamiento orgánico (SEO)</strong>, <strong>publicidad paga (SEM)</strong> y <strong>marketing de contenidos</strong>, orientados al mercado venezolano del sector privado con énfasis en PYME que requieren automatización fiscal, contable, laboral y legal.</p>
                                        <p>El sitio web funciona simultáneamente como portal informativo, plataforma de demostración en vivo y sistema de onboarding digital, eliminando la necesidad de agentes comerciales presenciales para la captación inicial de clientes.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Canales Publicitarios y Estrategia de Captación</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Google Ads (SEM)</td>
                                    <td className={tableCellClass}>
                                        <p>Campañas de búsqueda segmentadas por palabras clave de alta intención comercial en Venezuela: <em>&quot;software contable Venezuela&quot;</em>, <em>&quot;sistema de nómina LOTTT&quot;</em>, <em>&quot;facturación electrónica SENIAT&quot;</em>, <em>&quot;ERP venezolano&quot;</em>, <em>&quot;gestión empresarial Caracas&quot;</em>. Presupuesto mensual estimado: $150–$300 USD con CPC promedio de $0,15–$0,40 en el mercado venezolano.</p>
                                        <p><strong>Campañas de remarketing:</strong> Anuncios display dirigidos a visitantes que exploraron la plataforma pero no completaron el registro, con banners dinámicos mostrando los módulos que visitaron.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Redes Sociales</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Instagram (@systemkyron):</strong> Contenido visual sobre módulos, tutoriales en Reels, testimonios de empresas piloto y novedades fiscales venezolanas. Publicación diaria. Meta: 5.000 seguidores en 6 meses.</li>
                                            <li><strong>LinkedIn (System Kyron):</strong> Artículos sobre tendencias fiscales VEN-NIF, actualizaciones del BCV, análisis legal LOTTT y casos de éxito empresariales. Publicación 3 veces por semana. Enfoque B2B para directivos y contadores.</li>
                                            <li><strong>TikTok (@systemkyron):</strong> Contenido educativo corto sobre obligaciones tributarias venezolanas, tips de nómina y funcionalidades de IA. Meta: viralización de contenido fiscal simplificado para emprendedores jóvenes.</li>
                                            <li><strong>WhatsApp Business:</strong> Canal de atención directa, catálogo de planes y envío de actualizaciones fiscales automatizadas a la base de clientes registrados.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>SEO y Marketing de Contenidos</td>
                                    <td className={tableCellClass}>
                                        <p>Blog integrado en la plataforma con artículos optimizados para búsqueda orgánica sobre: cálculo de ISLR en Venezuela, guía de retenciones SENIAT, cómo calcular prestaciones sociales LOTTT, requisitos de CONATEL para telefonía, y normativa VEN-NIF actualizada. Meta: posicionar System Kyron como referencia digital #1 en gestión empresarial venezolana.</p>
                                        <p><strong>Estrategia de palabras clave:</strong> 50+ artículos orientados a long-tail keywords del ecosistema fiscal y laboral venezolano, con CTAs integrados hacia el registro en la plataforma.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Email Marketing</td>
                                    <td className={tableCellClass}>
                                        <p>Secuencia automatizada de emails para leads captados desde la web: (1) Bienvenida + demo del módulo contable, (2) Caso de éxito de empresa piloto, (3) Comparativa System Kyron vs herramientas fragmentadas, (4) Oferta de prueba gratuita 30 días, (5) Onboarding personalizado con soporte técnico. Tasa de apertura objetivo: 35%. Herramienta: Resend integrado en la plataforma.</p>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Elementos Publicitarios de la Página Web</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Landing Page Principal</td>
                                    <td className={tableCellClass}>
                                        <p>Diseño HUD Titanium con liquid glass y gradientes corporativos (#0A2472 azul institucional + #00A86B verde Ameru). Hero section con propuesta de valor directa: <em>&quot;El ecosistema inteligente del sector privado venezolano&quot;</em>. CTA principal: registro empresarial gratuito. Sección de módulos con iconografía interactiva, tasa BCV en tiempo real, testimonios de empresas piloto y calculadora de ahorro en línea.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Sección de Demostración en Vivo</td>
                                    <td className={tableCellClass}>
                                        <p>Tour interactivo de los 12 portales directamente desde la página web, sin necesidad de crear una cuenta. El visitante puede explorar la interfaz del módulo contable VEN-NIF, ver un ejemplo de nómina LOTTT calculada en tiempo real, probar el generador de contratos con Kyron AI (Claude de Anthropic) y consultar la tasa BCV actualizada. Conversión estimada: 15% de visitantes que completan el tour se registran como usuarios.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Prueba Social y Credibilidad</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Contador en vivo de empresas activas en la plataforma</li>
                                            <li>Logos de aliados estratégicos: Google Cloud, ZEDU, U.E.P. Gabriela Mistral</li>
                                            <li>Certificaciones de seguridad: cifrado AES-256, sellado criptográfico</li>
                                            <li>Testimonios verificados de empresas piloto con nombre, RIF y sector</li>
                                            <li>Sección de prensa y menciones en medios digitales venezolanos</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><td className={tableHeaderClass} colSpan={2}>Presupuesto Publicitario Digital (Primer Año)</td></tr>
                                <tr>
                                    <td className={tableLabelClass}>Google Ads (SEM)</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 2.400,00 / año</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Publicidad en Redes Sociales (Instagram + LinkedIn + TikTok Ads)</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 1.800,00 / año</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Creación de Contenido (diseño gráfico, videos, redacción SEO)</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 1.200,00 / año</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Email Marketing (Resend Pro + automatización)</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 240,00 / año</td>
                                </tr>
                                <tr>
                                    <td className={tableLabelClass}>Herramientas SEO y Analítica (Google Analytics, Search Console, Ahrefs)</td>
                                    <td className={cn(tableCellClass, "text-right font-black")}>$ 360,00 / año</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className={cn(tableCellClass, "text-right font-black uppercase text-slate-500 py-6")}>INVERSIÓN PUBLICITARIA TOTAL (AÑO 1)</td>
                                    <td className={cn(tableCellClass, "text-right font-black text-2xl text-[#0A2472] italic")}>$ 6.000,00</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-slate-400 mt-3 italic">Nota: El presupuesto publicitario se autofinancia a partir del mes 4 con los ingresos de suscripción de las primeras 15 empresas cliente. El ROI publicitario proyectado es de 340% anual, considerando un costo de adquisición de cliente (CAC) de $40 y un valor de vida del cliente (LTV) de $588.</p>

                        <div className="mt-12">
                            <h3 className="text-xl font-black uppercase mb-6 tracking-tight flex items-center gap-3 text-[#0A2472]">
                                <Target className="h-6 w-6" /> Métricas de Rendimiento Web (KPIs Publicitarios)
                            </h3>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className={cn(tableHeaderClass, "text-left")} style={{ width: '35%' }}>Métrica</th>
                                        <th className={tableHeaderClass} style={{ width: '25%' }}>Meta Mes 3</th>
                                        <th className={tableHeaderClass} style={{ width: '20%' }}>Meta Mes 6</th>
                                        <th className={tableHeaderClass} style={{ width: '20%' }}>Meta Mes 12</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={tableCellClass}>Visitantes únicos mensuales (web)</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>2.000</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>8.000</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>25.000</td>
                                    </tr>
                                    <tr>
                                        <td className={tableCellClass}>Tasa de conversión (visitante → registro)</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>3%</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>5%</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>8%</td>
                                    </tr>
                                    <tr>
                                        <td className={tableCellClass}>Registros empresariales acumulados</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>60</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>400</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>2.000</td>
                                    </tr>
                                    <tr>
                                        <td className={tableCellClass}>Suscripciones activas de pago</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>15</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>80</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>420</td>
                                    </tr>
                                    <tr>
                                        <td className={tableCellClass}>Posición promedio Google (keywords principales)</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>Top 20</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>Top 10</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>Top 3</td>
                                    </tr>
                                    <tr>
                                        <td className={tableCellClass}>Seguidores redes sociales (total combinado)</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>1.500</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>5.000</td>
                                        <td className={cn(tableCellClass, "text-center font-black")}>15.000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FIRMA */}
                    <div className="mt-20 pt-10 border-t-2 border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            {[
                                { name: "Carlos Mattar", role: "Líder del Proyecto" },
                                { name: "Sebastian Garrido", role: "Desarrollo Técnico" },
                                { name: "Marcos Sousa", role: "Análisis y Comunicación" },
                            ].map((member) => (
                                <div key={member.name} className="space-y-3">
                                    <div className="h-px w-48 bg-slate-300 mx-auto mt-16" />
                                    <p className="font-black uppercase text-sm text-slate-700 tracking-widest">{member.name}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{member.role}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">U.E.P. Gabriela Mistral</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-slate-300 font-black uppercase tracking-[0.5em] mt-16">System Kyron v2.8.5 · Caracas, Venezuela · 2026</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
