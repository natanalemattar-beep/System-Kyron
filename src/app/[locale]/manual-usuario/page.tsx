"use client";

import { useState, useEffect } from "react";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Fingerprint,
    Radio,
    TabletSmartphone,
    ShieldCheck,
    TrendingUp,
    Gavel,
    Cpu,
    Recycle,
    Sparkles,
    Database,
    Zap,
    Lock,
    Download,
    ChevronLeft,
    Terminal,
    Activity,
    Info,
    Smartphone,
    Globe,
    Scale,
    FileText,
    BookOpen,
    ChevronRight,
    AlertTriangle,
    Volume2,
    Coins,
    Wand2,
    Printer,
    BarChart3,
    Users,
    Target,
    Clock,
    CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro System Kyron v2.6.5.
 * ENCICLOPEDIA TÉCNICA DE ACCESO PÚBLICO UNIVERSAL - MÁXIMA DENSIDAD.
 * Diseño impecable sin desorden visual.
 */

const introSection = {
    title: "1.0 Visión Estratégica del Ecosistema",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 es una plataforma de telecomunicaciones de misión crítica que ofrece líneas 5G, gestión eSIM y equipos homologados como servicio base. Sobre esta infraestructura de red, desplegamos un ecosistema de cumplimiento normativo total que garantiza la operación legal de su empresa ante todas las instituciones rectoras del Estado venezolano: tributario (SENIAT), telecomunicaciones (CONATEL), registral (SAREN), propiedad intelectual (SAPI), laboral (LOTTT, IVSS, FAOV, INCES) y protección del menor (LOPNNA). Cada transacción y registro es blindado por inteligencia artificial predictiva y un ledger blockchain que asegura su inmutabilidad. Este manual proporciona los protocolos para operar los nodos del sistema con absoluta solvencia legal."
};

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        concept: "La identidad digital en Kyron no es una simple credencial; es un activo criptográfico basado en el estándar eIDAS. Utilizamos biometría 3D para mapear 512 puntos vectoriales del rostro, eliminando cualquier posibilidad de fraude por suplantación o 'deepfakes'. Este nodo es la llave maestra que desbloquea la firma electrónica de documentos legales y el acceso a la bóveda de activos.",
        procedure: "1. Inicio de Enrolamiento: Colóquese frente a la cámara con iluminación neutra. 2. Captura Multiaxal: Siga las instrucciones de giro de cabeza para el mapeo de profundidad. 3. Prueba de Vida: Realice el parpadeo o seguimiento ocular solicitado por la IA. 4. Generación de Hash: El sistema crea una identidad inmutable vinculada a su Ledger personal.",
        technical: "Cifrado asimétrico de curva elíptica (ECC) con almacenamiento en Enclave Seguro (TEE). La validación se realiza mediante protocolos Zero-Knowledge Proof (ZKP), donde el servidor nunca conoce su rostro real, solo el hash verificado."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        concept: "Kyron opera como un habilitador de red móvil virtual (MVNE) de nueva generación. El módulo de telecomunicaciones gestiona el aprovisionamiento remoto de perfiles eSIM (eUICC) bajo especificaciones GSMA SGP.22. Esto permite la asignación instantánea de líneas 5G y flotas de datos corporativos sin necesidad de hardware físico tradicional.",
        procedure: "1. Selección de Terminal: Ingrese el código EID del dispositivo homologado. 2. Activación OTA (Over-the-Air): El sistema transmite el perfil de red de forma cifrada. 3. Configuración de Nodo: El terminal se conecta automáticamente al APN privado de Kyron. 4. Monitoreo de Consumo: Visualización en tiempo real de la telemetría de datos y voz.",
        technical: "Arquitectura NFV (Network Functions Virtualization) con Slicing de red para garantizar un QoS (Quality of Service) prioritario en transacciones fiscales y de seguridad sobre el tráfico comercial estándar."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inteligencia Fiscal",
        icon: TabletSmartphone,
        concept: "El nodo TPV es un motor de cumplimiento tributario que automatiza la Providencia SNAT/2011/0071. A diferencia de un sistema de ventas convencional, Kyron integra una capa de IA que audita cada ítem, calcula el IGTF, IVA y retenciones en el momento de la captura, emitiendo documentos electrónicos con sellado de tiempo inmutable.",
        procedure: "1. Identificación de Cliente: Ingrese RIF/Cédula para carga automática de datos desde el padrón nacional. 2. Registro de Items: Escaneo de productos con validación de inventario. 3. Cálculo Multimoneda: El sistema aplica la tasa BCV del segundo exacto de la transacción. 4. Emisión y Sellado: Generación de factura fiscal con firma digital y registro en el Ledger.",
        technical: "Sincronización síncrona con máquinas fiscales vía protocolo IP. El sistema mantiene un respaldo paralelo en la nube bajo cifrado AES-256 para prevenir la pérdida de datos por fallas de hardware local."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y Reajuste RIPF",
        icon: BarChart3,
        concept: "Este módulo transforma la contabilidad tradicional en ingeniería financiera. Automatiza la generación de estados financieros bajo VEN-NIF y ejecuta el Reajuste por Inflación Fiscal (RIPF) de forma actuarial. Es la herramienta definitiva para proteger el patrimonio neto de la empresa frente a la dinámica inflacionaria, asegurando balances reales ante socios y entes bancarios.",
        procedure: "1. Ingesta de Datos: Sincronización automática de todas las facturas y nóminas. 2. Clasificación de Partidas: Identificación de cuentas monetarias y no monetarias. 3. Ejecución RIPF: Aplicación de factores INPC sobre activos fijos y patrimonio. 4. Cierre de Periodo: Generación de Balance General y Estado de Resultados ajustados.",
        technical: "Motor de inferencia contable que detecta anomalías y sugiere ajustes de reclasificación. Exportación compatible con formatos XML para declaraciones masivas ante el SENIAT."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento (LOTTT/LOPNNA)",
        icon: Users,
        concept: "Gestión integral del capital humano centrada en el blindaje legal. El sistema garantiza el cumplimiento exacto de la LOTTT y la LOPNNA, gestionando no solo la nómina, sino también el expediente digital del trabajador, sus cargas familiares y la nueva contribución de Protección de Pensiones de forma transparente y auditable.",
        procedure: "1. Registro Maestro: Alta de trabajador con validación biométrica. 2. Parametrización: Configuración de sueldos, bonos y retenciones de ley (IVSS, FAOV). 3. Cálculo de Quincena: Procesamiento masivo de pagos con un solo clic. 4. Despacho Digital: Envío de recibos sellados vía WhatsApp/Email y generación de TXT bancario.",
        technical: "Cálculo de prestaciones sociales mediante algoritmo de antigüedad acumulada. Módulo de LOPNNA para el registro de permisos de viaje y autorizaciones de menores vinculadas al titular."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y Gestión SAREN",
        icon: Gavel,
        concept: "El núcleo de seguridad legal de la empresa. Este módulo actúa como una caja fuerte digital para actas constitutivas, poderes de representación y registros de marca (SAPI). La arquitectura de 'Bóveda Zero-Knowledge' asegura que ni siquiera Kyron pueda acceder a sus documentos sin su autorización biométrica expresa.",
        procedure: "1. Digitalización: Carga de instrumentos legales en alta resolución. 2. Metadatación: Clasificación por ente emisor (Registro, Notaría). 3. Monitoreo de Vencimientos: El sistema avisa 30 días antes del cese de facultades de un apoderado. 4. Consulta Segura: Acceso instantáneo a copias certificadas digitales con validez probatoria.",
        technical: "Implementación de sellado de tiempo RFC 3161 (Digital Timestamping) para garantizar que el documento no ha sido modificado desde su carga inicial en la plataforma."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        concept: "Aplicación de visión artificial para la gestión de activos físicos. El nodo de ingeniería procesa imágenes de locales, oficinas o galpones para generar planos a escala, cómputos métricos y presupuestos de materiales con una precisión del 98%, facilitando la planificación de expansiones o remodelaciones sin visitas técnicas costosas.",
        procedure: "1. Captura de Campo: Fotografías del espacio desde múltiples ángulos. 2. Procesamiento IA: El sistema identifica aristas, volúmenes y áreas útiles. 3. Generación de Plano: Creación automática de archivo CAD/BIM preliminar. 4. Presupuesto: Estimación de materiales (pintura, piso, cableado) basada en catálogos de proveedores aliados.",
        technical: "Uso de Redes Neuronales Convolucionales (CNN) para el reconocimiento de objetos estructurales y algoritmos de triangulación fotogramétrica para la obtención de medidas reales."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Eco-Créditos y Sostenibilidad",
        icon: Recycle,
        concept: "Transformamos la responsabilidad ambiental en un activo financiero. A través de la tecnología de inducción magnética en nuestras papeleras inteligentes, el sistema valida el reciclaje de materiales y emite 'Eco-Créditos' tokenizados en la billetera del usuario o empresa, fomentando una economía circular real.",
        procedure: "1. Identificación: Autenticación en el Smart Bin mediante QR. 2. Depósito: Inserción del residuo (PET, Aluminio). 3. Validación Magnética: El hardware confirma la pureza del material. 4. Acreditación: Los puntos se inyectan en el Ledger y pueden ser canjeados por servicios o vendidos en el mercado.",
        technical: "Protocolo de consenso Proof-of-Recycle. Cada unidad de material reciclado genera un hash único en el Blockchain de Sostenibilidad de Kyron para evitar el doble conteo de activos verdes."
    },
    {
        id: "bi",
        title: "Módulo 9: Business Intelligence (BI) Corporativo",
        icon: TrendingUp,
        concept: "El panel de control ejecutivo de la empresa. Consolida los datos de todos los módulos anteriores para ofrecer una visión 360° de la operación. Permite identificar cuellos de botella, fugas de capital y oportunidades de crecimiento mediante análisis predictivo y visualización de datos de alta fidelidad.",
        procedure: "1. Selección de Métrica: Elija entre Rentabilidad, Cumplimiento o Crecimiento. 2. Filtrado Dinámico: Ajuste por periodos, departamentos o sucursales. 3. Análisis de Tendencia: La IA proyecta el comportamiento del próximo trimestre. 4. Exportación de Informe: Generación de reportes para juntas directivas.",
        technical: "Motor de procesamiento OLAP (Online Analytical Processing) integrado con herramientas de Data Warehouse para consultas instantáneas sobre millones de registros transaccionales."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Soberanía",
        icon: ShieldCheck,
        concept: "La protección perimetral del ecosistema. Kyron implementa protocolos de seguridad de grado militar para asegurar que la información de la empresa sea privada y soberana. Incluye defensa contra ataques DDoS, firewalls de aplicación (WAF) y auditorías de acceso en tiempo real.",
        procedure: "1. Configuración de Accesos: Defina roles y permisos granulares. 2. Auditoría: Revise el historial de IP y dispositivos conectados. 3. Bloqueo de Nodo: En caso de sospecha, puede aislar un departamento completo con un comando maestro. 4. Recuperación: Protocolos de Disaster Recovery con backups georedundantes.",
        technical: "Cifrado AES-XTS-512 en reposo y TLS 1.3 en tránsito. Implementación de hardware security modules (HSM) para la gestión de llaves maestras del sistema."
    },
    {
        id: "voice",
        title: "Módulo 11: Kyron Voice (Interacción por Voz)",
        icon: Volume2,
        concept: "La interfaz humano-máquina más natural. Kyron Voice permite realizar consultas complejas y ejecutar comandos administrativos mediante lenguaje natural. El motor de procesamiento de voz está optimizado para el léxico técnico y legal venezolano, permitiendo operar el sistema con las manos libres.",
        procedure: "1. Activación: Pulse el botón de voz o use el comando de activación. 2. Consulta: Pregunte por saldos, fechas de vencimiento o estados de trámites. 3. Inferencia: El sistema procesa la intención y responde mediante audio y visualización. 4. Ejecución: Puede autorizar pagos o enviar recibos mediante confirmación vocal.",
        technical: "Modelos de NLP (Natural Language Processing) entrenados con el corpus legal nacional. Integración con motores de síntesis de voz de baja latencia para respuestas en milisegundos."
    },
    {
        id: "market",
        title: "Módulo 12: Mercado de Eco-Créditos (Exchange)",
        icon: Coins,
        concept: "Plataforma de intercambio para la monetización de activos verdes. Las empresas que superan sus metas de sostenibilidad pueden vender sus Eco-Créditos a otras entidades que necesitan compensar su huella de carbono, creando un mercado secundario de bonos ambientales único en la región.",
        procedure: "1. Valuación: El sistema tasa sus créditos acumulados según la oferta y demanda. 2. Publicación: Coloque su oferta en el Ledger público del Mercado. 3. Negociación: Acuerdo de transferencia entre nodos corporativos. 4. Liquidación: Transferencia atómica de créditos y recepción de saldo en servicios o divisas.",
        technical: "Smart Contracts sobre el Ledger de Kyron que aseguran que el intercambio de activos sea irreversible y transparente, con liquidación inmediata una vez cumplidas las condiciones."
    },
    {
        id: "generator",
        title: "Módulo 13: Generador Jurídico IA",
        icon: Wand2,
        concept: "Motor de redacción automatizada de instrumentos legales. Utiliza modelos de lenguaje avanzados para ensamblar borradores de contratos, actas y comunicaciones oficiales basados estrictamente en las leyes venezolanas vigentes, reduciendo el costo y tiempo de la gestión jurídica externa.",
        procedure: "1. Selección de Plantilla: Elija el tipo de contrato o acta requerida. 2. Inyección de Datos: El sistema precarga los datos de las partes de la Bóveda Jurídica. 3. Personalización: Ajuste cláusulas específicas mediante preguntas guiadas por la IA. 4. Generación: Obtenga el borrador maestro listo para la revisión final del abogado.",
        technical: "Uso de RAG (Retrieval-Augmented Generation) para alimentar la IA con la última jurisprudencia del TSJ y gacetas oficiales, evitando alucinaciones legales y garantizando precisión técnica."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        let modulesContent = "";
        manualModules.forEach(mod => {
            modulesContent += `
                <div style="margin-bottom: 25pt; border-bottom: 1px solid #e2e8f0; padding-bottom: 20pt; page-break-inside: avoid;">
                    <h2 style="color: #0ea5e9; font-size: 18pt; margin-bottom: 12pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">${mod.title}</h2>
                    <p style="text-align: justify; font-size: 11pt; color: #1e293b; margin-bottom: 15pt; line-height: 1.6;"><strong>CONCEPTO MAESTRO:</strong> ${mod.concept}</p>
                    <div style="background-color: #f1f5f9; padding: 15pt; border-left: 5pt solid #0ea5e9; margin: 15pt 0; border-radius: 8pt;">
                        <p style="color: #0369a1; font-weight: bold; margin-bottom: 8pt; font-size: 10pt; text-transform: uppercase;">PROCEDIMIENTO OPERATIVO:</p>
                        <p style="font-size: 10pt; line-height: 1.6; color: #334155;">${mod.procedure}</p>
                    </div>
                    <p style="font-size: 10pt; color: #64748b; font-style: italic; background-color: #f8fafc; padding: 10pt; border-radius: 5pt;"><strong>ARQUITECTURA DE INGENIERÍA:</strong> ${mod.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Times New Roman', serif; color: #0f172a; max-width: 800px; margin: auto;">
                <div style="text-align: center; border: 5pt double #0ea5e9; padding: 80pt 40pt; margin-bottom: 50pt; background-color: #050505; border-radius: 20pt;">
                    <div style="margin-bottom: 40pt; background-color: #000; border: 3pt solid #0ea5e9; padding: 30pt; display: inline-block; border-radius: 25pt; box-shadow: 0 0 30px rgba(14,165,233,0.4);">
                        <div style="width: 80px; height: 80px; background-color: #0ea5e9; color: white; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 40pt; font-weight: 900; margin: auto;">K</div>
                    </div>
                    <h1 style="color: #ffffff; font-size: 42pt; margin-bottom: 10pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif; letter-spacing: 5pt;">SYSTEM KYRON</h1>
                    <p style="font-size: 22pt; font-weight: bold; color: #0ea5e9; margin-bottom: 15pt; letter-spacing: 2pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                    <p style="font-size: 14pt; color: #94a3b8; font-weight: 500;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                    <div style="margin-top: 50pt;">
                        <p style="font-size: 11pt; color: #22c55e; font-weight: bold; border: 2pt solid #22c55e; padding: 10pt 25pt; display: inline-block; border-radius: 50pt; text-transform: uppercase; letter-spacing: 3pt;">ACCESO PÚBLICO UNIVERSAL</p>
                    </div>
                </div>

                <div style="page-break-before: always;"></div>

                <h2 style="color: #0ea5e9; border-bottom: 3pt solid #0ea5e9; padding-bottom: 8pt; margin-top: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">1.0 VISIÓN ESTRATÉGICA</h2>
                <p style="text-align: justify; line-height: 1.8; font-size: 12pt; margin-bottom: 30pt;">${introSection.text}</p>
                
                <h2 style="color: #0ea5e9; border-bottom: 3pt solid #0ea5e9; padding-bottom: 8pt; margin-top: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">2.0 ÍNDICE INTERACTIVO DE NODOS</h2>
                <div style="line-height: 2.2; font-size: 11pt; margin-bottom: 40pt; background-color: #f8fafc; padding: 20pt; border-radius: 10pt;">
                    ${manualModules.map((m, i) => `<p style="display: flex; justify-content: space-between;"><span>${i+1}.0 ${m.title}</span> <span style="color: #94a3b8;">................................................... Pág. 0${i+3}</span></p>`).join('')}
                </div>

                <div style="page-break-before: always;"></div>

                <h2 style="color: #0ea5e9; border-bottom: 3pt solid #0ea5e9; padding-bottom: 8pt; margin-bottom: 30pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">3.0 PROTOCOLOS POR NODO OPERATIVO</h2>
                ${modulesContent}

                <div style="page-break-before: always;"></div>

                <h2 style="color: #0ea5e9; border-bottom: 3pt solid #0ea5e9; padding-bottom: 8pt; margin-top: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">4.0 ESPECIFICACIONES DE INFRAESTRUCTURA</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20pt; border-radius: 10pt; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <tr style="background-color: #0ea5e9; color: white;">
                        <th style="padding: 12pt; text-align: left; font-size: 11pt; text-transform: uppercase;">ESPECIFICACIÓN TÉCNICA</th>
                        <th style="padding: 12pt; text-align: left; font-size: 11pt; text-transform: uppercase;">REQUISITO MÍNIMO CERTIFICADO</th>
                    </tr>
                    <tr style="background-color: white;">
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt; font-weight: bold;">Motor de Inferencia IA</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt;">Gemini 1.5 Pro / Ultra (Baja Latencia)</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt; font-weight: bold;">Protocolo de Cifrado</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt;">AES-XTS-512 (Grado Militar)</td>
                    </tr>
                    <tr style="background-color: white;">
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt; font-weight: bold;">Conectividad Base</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt;">Kyron 5G Slicing (Latencia < 20ms)</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt; font-weight: bold;">Almacenamiento Ledger</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 12pt;">Blockchain Híbrido Inmutable (SHA-256)</td>
                    </tr>
                </table>

                <div style="margin-top: 80pt; text-align: center; font-size: 10pt; color: #94a3b8; border-top: 2pt solid #e2e8f0; padding-top: 20pt; font-style: italic;">
                    SYSTEM KYRON v2.6.5 • ÚLTIMA REVISIÓN: MARZO 2026 • © TODOS LOS DERECHOS RESERVADOS
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "KYRON_MAESTRO_V2.6.5_ENCICLOPEDIA.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "EXPEDIENTE TÉCNICO GENERADO", 
            description: "Enciclopedia v2.6.5 exportada con éxito bajo protocolo seguro.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* BACKGROUND TEXTURE */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-black border-2 border-primary/20 rounded-2xl shadow-glow">
                        <Logo className="h-10 w-10" />
                    </div>
                    <div className="flex flex-col border-l-2 border-white/10 pl-6">
                        <span className="text-sm font-black tracking-[0.6em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] mt-1">Manual de Ingeniería v2.6.5</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-11 px-6 rounded-xl text-[10px] font-black uppercase text-white/40 hover:text-white border border-white/5 hover:bg-white/5 transition-all">
                        <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-11 px-8 rounded-xl text-[10px] font-black uppercase shadow-glow" onClick={handleDownloadDoc}>
                        <Download className="mr-3 h-4 w-4" /> DESCARGAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-32 pb-32 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* SIDEBAR NAVIGATION */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            <Card className="glass-card p-10 rounded-[3rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardHeader className="p-0 mb-8 text-center border-b border-white/5 pb-8">
                                    <div className="p-8 bg-black border-4 border-primary/20 rounded-[2.5rem] w-fit mx-auto mb-6 shadow-glow relative z-10">
                                        <Logo className="h-20 w-20" />
                                    </div>
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.5em] text-primary relative z-10">MATRIZ DE CONOCIMIENTO</CardTitle>
                                    <p className="text-[8px] font-bold text-white/20 uppercase mt-2">Última revisión: Marzo 2026</p>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1 max-h-[50vh] overflow-y-auto custom-scrollbar pr-4 relative z-10">
                                    <NavButton label="1.0 Visión Estratégica" onClick={() => scrollToSection("intro")} icon={Info} />
                                    <div className="py-6 px-4 text-[8px] font-black uppercase tracking-[0.6em] text-white/20 italic">Arquitectura Modular</div>
                                    {manualModules.map(mod => (
                                        <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                    ))}
                                    <NavButton label="4.0 Troubleshooting" onClick={() => scrollToSection("trouble")} icon={AlertTriangle} />
                                </CardContent>
                            </Card>
                            
                            <div className="p-8 rounded-[2rem] bg-secondary/5 border border-secondary/10 flex flex-col items-center text-center gap-4">
                                <ShieldCheck className="h-8 w-8 text-secondary" />
                                <p className="text-[9px] font-black uppercase tracking-widest text-secondary/60 leading-relaxed">
                                    Acceso Público Universal • Sello de Integridad Digital Activo
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* CONTENT AREA */}
                    <div className="lg:col-span-8 space-y-32">
                        <section id="intro" className="space-y-10 scroll-mt-32">
                            <div className="flex items-center gap-6">
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow">Visión <br/><span className="text-primary">Estratégica</span></h2>
                                <Logo className="h-24 w-24 opacity-10 hidden md:block" />
                            </div>
                            <p className="text-2xl font-bold italic text-white/60 leading-relaxed text-justify border-l-8 border-primary/20 pl-10">{introSection.text}</p>
                            <Card className="bg-primary/5 border border-primary/10 p-12 rounded-[3.5rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000"><Target className="h-32 w-32" /></div>
                                <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-primary mb-6">Misión Institucional</h4>
                                <p className="text-3xl font-black italic text-white tracking-tight leading-tight relative z-10">"{introSection.mission}"</p>
                            </Card>
                        </section>

                        <div className="space-y-32">
                            {manualModules.map(mod => (
                                <section id={mod.id} key={mod.id} className="scroll-mt-32 group">
                                    <Card className="glass-card rounded-[4rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-1000 hover:border-primary/40 hover:bg-black/80">
                                        <CardHeader className="p-16 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01]">
                                            <div className="p-8 rounded-[2.5rem] border-2 border-white/10 shadow-inner bg-primary/5 group-hover:scale-105 transition-transform duration-700">
                                                <mod.icon className="h-14 w-14 text-primary" />
                                            </div>
                                            <div className="space-y-2 text-center md:text-left">
                                                <div className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 mb-2 italic">NODO DE OPERACIÓN {mod.id.toUpperCase()}</div>
                                                <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-16 space-y-16">
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/60 italic flex items-center gap-4">
                                                    <div className="h-px w-12 bg-primary/20" /> CONCEPTO MAESTRO
                                                </h4>
                                                <p className="text-2xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept}</p>
                                            </div>
                                            <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 shadow-inner relative overflow-hidden">
                                                <div className="absolute -top-4 -right-4 opacity-5"><Terminal className="h-32 w-32" /></div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] mb-10 text-primary">Protocolo de Ejecución</h4>
                                                <div className="text-lg font-bold italic text-white/70 space-y-8">
                                                    {mod.procedure.split('. ').map((step, idx) => (
                                                        <div key={idx} className="flex gap-10 items-start">
                                                            <span className="font-black text-xl text-primary opacity-40">0{idx + 1}</span>
                                                            <span className="leading-snug">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 italic flex items-center gap-4">
                                                    <div className="h-px w-12 bg-white/10" /> ARQUITECTURA DE INGENIERÍA
                                                </h4>
                                                <p className="text-xl font-medium text-white/40 leading-relaxed italic text-justify bg-white/[0.01] p-10 rounded-[2rem] border border-white/5">{mod.technical}</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-16 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20">
                                                <ShieldCheck className="h-5 w-5 text-primary" /> CRYPTO-SECURITY CERTIFIED 2026
                                            </div>
                                            <Badge variant="outline" className="border-primary/20 text-primary text-[10px] font-black px-6 h-10 rounded-xl shadow-glow uppercase">V2.6.5 NODO ACTIVO</Badge>
                                        </CardFooter>
                                    </Card>
                                </section>
                            ))}
                        </div>

                        {/* TROUBLESHOOTING SECTION */}
                        <section id="trouble" className="space-y-16 scroll-mt-32">
                            <div className="flex items-center gap-8">
                                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-red-500 italic-shadow">4.0 <span className="text-white/20">Troubleshooting</span></h3>
                                <AlertTriangle className="h-16 w-16 text-red-500 animate-pulse" />
                            </div>
                            <div className="grid gap-8">
                                {[
                                    { q: "Falla en el reconocimiento biométrico multiaxal", a: "Asegure iluminación frontal uniforme y limpie el sensor óptico. El protocolo requiere visibilidad del 100% de los puntos vectoriales faciales." },
                                    { q: "Retardo en la provisión remota de perfil eSIM", a: "Verifique que su terminal soporte el estándar eUICC. El tiempo de transmisión OTA puede variar entre 30s y 3min según la saturación del nodo de red local." },
                                    { q: "Error de sellado síncrono con el Ledger BCV", a: "El sistema reintenta la conexión cada 15 min de forma autónoma. Puede forzar el sellado manual desde el panel de control contable si la latencia persiste." }
                                ].map((item, i) => (
                                    <Card key={i} className="bg-red-500/5 border border-red-500/10 p-12 rounded-[3rem] transition-all hover:bg-red-500/10">
                                        <p className="font-black text-2xl mb-6 italic text-white/90 uppercase tracking-tighter leading-none">{item.q}</p>
                                        <p className="text-lg text-white/50 font-bold leading-relaxed border-l-4 border-red-500/20 pl-10 italic">{item.a}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        <footer className="pt-32 border-t border-white/5 text-center space-y-12 pb-20">
                            <div className="p-10 bg-black border-2 border-white/10 rounded-[3.5rem] w-fit mx-auto shadow-glow opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <Logo className="h-24 w-24" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-[12px] font-black uppercase tracking-[1.5em] text-white/10 italic leading-none">
                                    SYSTEM KYRON MASTER PROTOCOL
                                </p>
                                <p className="text-[9px] font-bold text-white/5 uppercase tracking-[0.8em]">EDICIÓN TÉCNICA FINAL • MARZO 2026</p>
                            </div>
                            <div className="flex items-center justify-center gap-12 text-[10px] font-black text-white/5 uppercase tracking-[0.6em]">
                                <span className="flex items-center gap-3"><Globe className="h-4 w-4" /> GLOBAL OPS</span>
                                <span>•</span>
                                <span className="flex items-center gap-3"><Database className="h-4 w-4" /> DATA SOVEREIGNTY</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavButton({ label, onClick, icon: Icon }: { label: string, onClick: () => void, icon?: any }) {
    return (
        <button 
            onClick={onClick} 
            className="group w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-between border border-transparent hover:border-primary/20"
        >
            <div className="flex items-center gap-4">
                {Icon && <Icon className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-transform group-hover:scale-110" />}
                <span className="truncate">{label}</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </button>
    );
}
