"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
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
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview MODELO ZEDU - SYSTEM KYRON v2.6.5
 * Documento de formulación técnica de alta fidelidad (6 páginas estimadas).
 */

export default function ModeloZeduPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadWord = () => {
        const content = document.getElementById('zedu-document-content')?.innerHTML;
        if (!content) return;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>MODELO ZEDU - SYSTEM KYRON</title><style>" +
            "table { border-collapse: collapse; width: 100%; margin-bottom: 20px; font-family: Arial, sans-serif; }" +
            "td, th { border: 1pt solid black; padding: 10pt; font-size: 10pt; }" +
            ".header-cell { background-color: #f8fafc; font-weight: bold; text-transform: uppercase; }" +
            "h1, h2, h3 { font-family: Arial, sans-serif; text-transform: uppercase; }" +
            "</style></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const blob = new Blob(['\ufeff', sourceHTML], {
            type: 'application/msword'
        });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'MODELO_ZEDU_SYSTEM_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "EXPORTACIÓN COMPLETADA",
            description: "El MODELO ZEDU ha sido generado en formato Word.",
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
    };

    if (!isMounted) return null;

    const headerCellStyle = "bg-slate-50 text-black font-black uppercase p-4 text-xs border border-black header-cell";
    const contentCellStyle = "p-4 text-xs border border-black text-slate-900 bg-white leading-relaxed";

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 selection:bg-blue-100">
            {/* BARRA DE NAVEGACIÓN UI */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center no-print">
                <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-black">
                    <NextLink href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER</NextLink>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()} className="bg-white dark:bg-slate-900 border-slate-300 rounded-xl font-bold text-xs uppercase h-11 px-6 shadow-sm">
                        <Printer className="mr-2 h-4 w-4" /> VISTA DE IMPRESIÓN
                    </Button>
                    <Button onClick={handleDownloadWord} className="bg-black dark:bg-primary text-white hover:bg-slate-800 rounded-xl font-black text-xs uppercase h-11 px-8 shadow-xl">
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD (.DOC)
                    </Button>
                </div>
            </div>

            {/* CONTENEDOR DEL DOCUMENTO */}
            <motion.div 
                id="zedu-document-content"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-5xl mx-auto bg-white shadow-2xl p-12 md:p-20 document-font text-black relative border border-slate-200 rounded-sm"
            >
                {/* PÁGINA 1: CARÁTULA E IDENTIFICACIÓN */}
                <div className="flex justify-between items-start mb-16 border-b-4 border-black pb-8">
                    <div className="flex items-center gap-6">
                        <div className="p-3 border-2 border-black rounded-xl">
                            <Logo className="h-16 w-16" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none italic">System Kyron</h1>
                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mt-2">Corporate Intelligence Hub</p>
                            <p className="text-[10px] font-black text-primary mt-1 uppercase">Validación de Módulo Maestro • 2026</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="inline-block border-4 border-black p-4 bg-slate-50">
                            <h2 className="text-2xl font-black uppercase tracking-widest leading-none">MODELO ZEDU</h2>
                        </div>
                        <p className="text-[9px] font-black uppercase mt-4 text-slate-400">VERSION: 2.6.5 – MARZO 2026</p>
                    </div>
                </div>

                {/* 1. INFORMACIÓN DEL EQUIPO TÉCNICO */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Activity className="h-5 w-5" /> 1. INFORMACIÓN DEL EQUIPO TÉCNICO
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle} colSpan={3}>NOMBRE DEL PROYECTO ESTRATÉGICO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={3}><span className="text-lg font-black uppercase">SYSTEM KYRON • CORPORATE INTELLIGENCE</span></td>
                            </tr>
                            <tr>
                                <td className={cn(headerCellStyle, "w-1/3")}>LÍDER DE ARQUITECTURA</td>
                                <td className={cn(headerCellStyle, "w-1/3")}>REDES Y TELECOM</td>
                                <td className={cn(headerCellStyle, "w-1/3")}>FLUJO OPERATIVO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Ing. Carlos Mattar</td>
                                <td className={contentCellStyle}>Ing. Sebastián Garrido</td>
                                <td className={contentCellStyle}>Ing. Marcos Sousa</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>INSTITUCIÓN EDUCATIVA / SEDE</td>
                                <td className={headerCellStyle}>UBICACIÓN DEL CENTRO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>Colegio Gabriela Mistral</td>
                                <td className={contentCellStyle}>Catia la Mar, Edo. La Guaira</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 2. POBLACIÓN Y ESTUDIO DEMOGRÁFICO */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Users className="h-5 w-5" /> 2. POBLACIÓN A TRABAJAR (UNIDAD ESTRATÉGICA)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>ALCANCE INICIAL (MODULOS ACTIVOS)</td>
                                <td className={headerCellStyle}>UBICACIÓN GEOGRÁFICA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="text-base font-black">2.500 Unidades Activas</span></td>
                                <td className={contentCellStyle}>Eje Comercial Catia la Mar, Municipio Vargas</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>DISTRIBUCIÓN DEMOGRÁFICA</td>
                                <td className={headerCellStyle}>PERFIL SOCIO-ECONÓMICO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>52% Femenino / 48% Masculino. Rango: 18-65 años.</td>
                                <td className={contentCellStyle}>Empresarial, Comercial y Emprendedores Autónomos.</td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>CARACTERÍSTICAS DEL GRUPO OBJETIVO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>
                                    Población con alta dependencia de procesos manuales, vulnerable ante fiscalización tributaria y con deterioro documental por factores climáticos costeros (salinidad y humedad relativa del 85%+).
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PÁGINA 2: DIAGNÓSTICO Y FACTIBILIDAD */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Lock className="h-5 w-5" /> 3. ANÁLISIS DEL PROBLEMA Y DIAGNÓSTICO
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DEFINICIÓN DEL PROBLEMA CENTRAL</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <p className="font-black italic text-sm leading-relaxed uppercase underline decoration-primary/20 decoration-4">
                                        "FRAGMENTACIÓN DE DATA OPERATIVA Y VULNERABILIDAD LEGAL POR EL USO DE REGISTROS FÍSICOS OBSOLETOS E INEXISTENCIA DE UN ECOSISTEMA INTEGRADO QUE UNIFIQUE TELECOMUNICACIONES, FISCALIDAD Y SOSTENIBILIDAD."
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle} colSpan={2}>CAUSAS IDENTIFICADAS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle} colSpan={2}>
                                    1. Procesos fiscales manuales dependientes de humanos. <br/>
                                    2. Falta de un Ledger (libro mayor) centralizado e inmutable. <br/>
                                    3. Conectividad inestable para procesos de facturación electrónica. <br/>
                                    4. Gestión de residuos sin trazabilidad ni incentivo económico.
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>CONSECUENCIAS OPERATIVAS</td>
                                <td className={headerCellStyle}>IMPACTO LEGAL/FISCAL</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Pérdida masiva de horas hombre en conciliación manual y errores en inventario.</td>
                                <td className={contentCellStyle}>Sanciones por el SENIAT, multas por IGTF mal calculado y extinción de permisos CONATEL.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. SOLUCIÓN PROPUESTA (DETALLADA) */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" /> 4. SOLUCIÓN PROPUESTA: ECOSISTEMA SYSTEM KYRON
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>DESCRIPCIÓN DE LA ARQUITECTURA</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Implementación de un Centro de Inteligencia Centralizada bajo protocolo Zero-Knowledge, que unifica 10 módulos estratégicos:
                                </td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    <ul className="grid grid-cols-2 gap-2 list-none p-0 font-bold uppercase text-[10px]">
                                        <li>[01] Telecomunicaciones 5G / eSIM</li>
                                        <li>[02] Automatización Fiscal SENIAT</li>
                                        <li>[03] Bóveda de Identidad 3D</li>
                                        <li>[04] Gestión de RR.HH. y Nómina</li>
                                        <li>[05] Contabilidad y Balances IA</li>
                                        <li>[06] Sostenibilidad (Eco-Créditos)</li>
                                        <li>[07] Módulo Legal y Contratos</li>
                                        <li>[08] Ingeniería y Fotogrametría</li>
                                        <li>[09] Facturación y TPV Pro</li>
                                        <li>[10] Inteligencia de Negocio (BI)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className={headerCellStyle}>DIFERENCIADORES ESTRATÉGICOS</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>
                                    Integración vertical completa (Hardware + Software), IA Predictiva para Riesgo Fiscal 0%, Inmutabilidad por Blockchain y Hardware propio de ingeniería ambiental.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PÁGINA 3: DATOS CUANTITATIVOS Y KPI */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" /> 5. INDICADORES DE IMPACTO CUANTITATIVO
                    </h2>
                    <table className="w-full border-collapse border-2 border-black text-center">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>MÉTRICA DE CONTROL</th>
                                <th className={headerCellStyle}>VALOR ACTUAL / META</th>
                                <th className={headerCellStyle}>ESTATUS DE SEGURIDAD</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold uppercase">
                            <tr>
                                <td className={contentCellStyle}>Empresas Activas en el Sistema</td>
                                <td className={contentCellStyle}>127 Unidades</td>
                                <td className={contentCellStyle}>OPTIMO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Declaraciones Fiscales Procesadas</td>
                                <td className={contentCellStyle}>15.340 Documentos</td>
                                <td className={contentCellStyle}>SIN ERRORES</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Índice de Riesgo Fiscal</td>
                                <td className={cn(contentCellStyle, "text-[#00A86B] font-black")}>0.00%</td>
                                <td className={contentCellStyle}>CERTIFICADO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Nodos de Usuario en Red</td>
                                <td className={contentCellStyle}>2.500 Usuarios</td>
                                <td className={contentCellStyle}>ACTIVO</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 6. PRESUPUESTO RESUMIDO (CAPEX) */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Zap className="h-5 w-5" /> 6. PRESUPUESTO DE INVERSIÓN (CAPEX)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black text-center">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={cn(headerCellStyle, "text-[10px]")}>COMPONENTE DE INVERSIÓN</th>
                                <th className={cn(headerCellStyle, "text-[10px]")}>ESPECIFICACIÓN TÉCNICA</th>
                                <th className={cn(headerCellStyle, "text-[10px]")}>TOTAL (USD)</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold uppercase">
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Infraestructura Cloud Ledger & 5G</td>
                                <td className={contentCellStyle}>Servidores de alta fidelidad</td>
                                <td className={contentCellStyle}>$ 12.500,00</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Desarrollo Ecosistema Modular</td>
                                <td className={contentCellStyle}>Full-Stack 10 Módulos</td>
                                <td className={contentCellStyle}>$ 10.200,00</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Hardware Fiscal & Smart Bins</td>
                                <td className={contentCellStyle}>Sensores de Inducción</td>
                                <td className={contentCellStyle}>$ 6.183,00</td>
                            </tr>
                            <tr>
                                <td className={cn(contentCellStyle, "text-left")}>Despliegue y Logística</td>
                                <td className={contentCellStyle}>Unidades de Campo (Bera)</td>
                                <td className={contentCellStyle}>$ 4.000,00</td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td className={cn(contentCellStyle, "text-right p-4 font-black text-sm")} colSpan={2}>INVERSIÓN INICIAL ESTIMADA</td>
                                <td className={cn(contentCellStyle, "p-4 font-black text-sm text-[#0A2472]")}>$ 32.883,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PÁGINA 4: ALIADOS Y RECURSOS */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" /> 7. ALIADOS Y RECURSOS ESTRATÉGICOS
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <thead>
                            <tr>
                                <th className={headerCellStyle}>ORGANIZACIÓN ALIADA</th>
                                <th className={headerCellStyle}>MODALIDAD DE APOYO / VÍNCULO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">DIGITEL / CONATEL</span></td>
                                <td className={contentCellStyle}>Espectro Radioeléctrico y Enlaces 5G Master</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">SENIAT / FISCALÍA</span></td>
                                <td className={contentCellStyle}>Validación de Protocolos de Riesgo 0</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">SAMSUNG / FACTORY HKA</span></td>
                                <td className={contentCellStyle}>Hardware de Gestión y Unidades Fiscales</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}><span className="font-black">HOLDING KYRON</span></td>
                                <td className={contentCellStyle}>Respaldo Financiero y Soporte Técnico Nivel 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 8. PLAN DE ACCIÓN Y CRONOGRAMA */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <Activity className="h-5 w-5" /> 8. PLAN DE ACCIÓN (DESPLIEGUE SEMANAL)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={headerCellStyle}>FASE OPERATIVA</th>
                                <th className={headerCellStyle}>RESPONSABLE</th>
                                <th className={headerCellStyle}>TIEMPO</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold uppercase">
                            <tr>
                                <td className={contentCellStyle}>Auditoría de Procesos en Catia la Mar</td>
                                <td className={contentCellStyle}>Equipo de Campo</td>
                                <td className={cn(contentCellStyle, "text-center")}>SEMANA 1</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Instalación de Módulos 5G y eSIM</td>
                                <td className={contentCellStyle}>Ing. S. Garrido</td>
                                <td className={cn(contentCellStyle, "text-center")}>SEMANA 2</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Despliegue de Bóveda y Ledger Fiscal</td>
                                <td className={contentCellStyle}>Ing. Carlos Mattar</td>
                                <td className={cn(contentCellStyle, "text-center")}>SEMANA 3</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Lanzamiento del Mercado Ambiental</td>
                                <td className={contentCellStyle}>Ing. Marcos Sousa</td>
                                <td className={cn(contentCellStyle, "text-center")}>SEMANA 4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PÁGINA 5: INNOVACIONES TIER 2 Y CIERRE */}
                <div className="mb-12">
                    <h2 className="text-base font-black uppercase mb-4 tracking-tighter flex items-center gap-2">
                        <LayoutGrid className="h-5 w-5" /> 9. INNOVACIONES TIER 2 (AVANZADO)
                    </h2>
                    <table className="w-full border-collapse border-2 border-black">
                        <tbody>
                            <tr>
                                <td className={headerCellStyle}>COMPONENTE ADICIONAL</td>
                                <td className={headerCellStyle}>VALOR AGREGADO CORPORATIVO</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Asistente de Voz Corporativo</td>
                                <td className={contentCellStyle}>Control de inventario y balances mediante comandos neuronales.</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Generador Jurídico IA</td>
                                <td className={contentCellStyle}>Creación de Smart Contracts automatizados con validez legal.</td>
                            </tr>
                            <tr>
                                <td className={contentCellStyle}>Mercado de Eco-Créditos</td>
                                <td className={contentCellStyle}>Monetización de la huella de carbono positiva en el ecosistema.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* PIE DE DOCUMENTO / SELLOS */}
                <footer className="mt-24 pt-12 border-t-2 border-black flex justify-between items-end">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="p-2 border border-slate-300 rounded">
                                <FileText className="h-12 w-12 text-slate-300" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase">Contacto Oficial</p>
                                <p className="text-sm font-black italic">systemkyronofficial@gmail.com</p>
                                <p className="text-xs font-bold">www.systemkyron.com</p>
                            </div>
                        </div>
                        <div className="border-4 border-[#0A2472] p-3 bg-slate-50 inline-block font-black text-xs uppercase tracking-widest italic text-[#0A2472]">
                            MODELO ZEDU VALIDADO • 2026
                        </div>
                    </div>
                    <div className="text-right space-y-4">
                        <div className="flex items-center justify-end gap-3 mb-6">
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">CENTRO DE MANDO: ACTIVO</span>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-400">© 2026 SYSTEM KYRON OFFICIAL • ALL RIGHTS RESERVED</p>
                    </div>
                </footer>

                {/* MARCA DE AGUA CONFIDENCIAL */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <div className="border-[20px] border-black rounded-full p-24">
                        <span className="text-[140px] font-black uppercase tracking-[0.5em] italic">MODELO ZEDU</span>
                    </div>
                </div>

                {/* SELLOS GRÁFICOS DINÁMICOS */}
                <div className="absolute top-40 right-12 flex flex-col gap-8 no-print opacity-80 pointer-events-none">
                    <div className="border-4 border-rose-600 p-2 rounded transform rotate-12 text-rose-600 font-black text-xl uppercase tracking-tighter shadow-sm bg-white/50 backdrop-blur-sm">
                        CONFIDENCIAL
                    </div>
                    <div className="border-4 border-emerald-600 p-2 rounded-full transform -rotate-6 text-emerald-600 font-black text-lg uppercase tracking-tighter shadow-sm bg-white/50 backdrop-blur-sm flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" /> VALIDADO
                    </div>
                    <div className="border-4 border-[#0A2472] p-2 rounded transform rotate-3 text-[#0A2472] font-black text-sm uppercase tracking-tighter shadow-sm bg-white/50 backdrop-blur-sm">
                        GRADO CORPORATIVO
                    </div>
                </div>
            </motion.div>

            {/* STATUS BAR BOTTOM */}
            <div className="max-w-5xl mx-auto mt-10 flex justify-center items-center gap-12 no-print text-[10px] font-black uppercase text-slate-500 tracking-[0.5em] opacity-60">
                <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> SECURE LEDGER</span>
                <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> 2.500 ACTIVE UNITS</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> VERIFIED BY KYRON-HUB</span>
            </div>
        </div>
    );
}
