
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
    CheckCircle,
    RefreshCw,
    School,
    Monitor,
    LayoutGrid
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro System Kyron v2.6.5.
 * ENCICLOPEDIA TÉCNICA DE ACCESO PÚBLICO UNIVERSAL - MÁXIMA DENSIDAD.
 * Sincronización cromática absoluta con el logo (Azul Ciber / Verde Neón).
 */

const introSection = {
    title: "1.0 Visión Estratégica del Ecosistema",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 es una plataforma de telecomunicaciones de misión crítica que opera como un nodo de inteligencia convergente. Nuestra infraestructura gestiona líneas 5G, perfiles eSIM y terminales homologados, integrando sobre esta capa de red un ecosistema de cumplimiento normativo total. Garantizamos la operatividad legal de su empresa ante instituciones como el SENIAT, CONATEL, SAREN, SAPI, y entes laborales como el IVSS, FAOV e INCES. Cada transacción y registro es sellado en un Ledger Blockchain inmutable, auditado en tiempo real por motores de IA predictiva que monitorizan la Gaceta Oficial 24/7. Este manual es la enciclopedia definitiva para la operación de los nodos de ingeniería que componen el sistema."
};

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "La identidad digital en Kyron se rige por estándares eIDAS de alta seguridad. Implementamos un protocolo de biometría 3D que mapea 512 vectores de profundidad facial, eliminando el riesgo de suplantación mediante 'deepfakes' o fotografías. Esta identidad es el nodo raíz para la firma electrónica de instrumentos legales y el acceso a la bóveda de activos inmutables de la empresa.",
        procedure: "1. Inicialización de Sensor: El sistema activa la cámara UHD y calibra la luz ambiental. 2. Escaneo Multiaxial: El usuario debe realizar movimientos rotacionales suaves para el mapeo 3D. 3. Prueba de Inyectividad: Validación de 'liveness' mediante parpadeo aleatorio. 4. Sellado de Hash: El vector biométrico se convierte en un hash irreversible almacenado en el Enclave Seguro del dispositivo.",
        technical: "Uso de protocolos Zero-Knowledge Proof (ZKP) para validación de identidad sin exposición de datos biométricos crudos. Cifrado asimétrico basado en Curva Elíptica (ECC) SECP256K1 para el sellado de sesiones."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        color: "text-[#22c55e]",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        concept: "Kyron actúa como un habilitador de red móvil virtual (MVNE) de grado corporativo. El sistema gestiona el ciclo de vida completo de perfiles eSIM (eUICC) bajo estándares GSMA SGP.22. Esto permite el aprovisionamiento remoto de líneas 5G y flotas de datos sin necesidad de intervención física, ideal para la movilidad empresarial y la seguridad de las comunicaciones.",
        procedure: "1. Registro de EID: Vinculación del identificador único del chip eUICC al nodo corporativo. 2. Descarga OTA: Transmisión segura del perfil de red mediante canales cifrados. 3. Activación de Slicing: Configuración de la red para priorizar el tráfico de datos fiscales y críticos. 4. Auditoría de Red: Monitoreo de latencia y consumo de paquetes mediante telemetría en tiempo real.",
        technical: "Arquitectura SDN (Software Defined Networking) que permite el aislamiento de tráfico por departamento. Soporte para VoLTE y Vo5G con cifrado de voz extremo a extremo (E2EE)."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inteligencia Fiscal",
        icon: TabletSmartphone,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "El nodo TPV automatiza la Providencia SNAT/2011/0071 del SENIAT. Integra un motor de inferencia que calcula instantáneamente el IVA (General, Reducido o Lujo), el IGTF y las retenciones correspondientes. El sistema se sincroniza en milisegundos con el Banco Central de Venezuela (BCV) para garantizar que toda transacción multimoneda se registre bajo la tasa oficial exacta.",
        procedure: "1. Autenticación de Cajero: Acceso mediante ID Biométrica. 2. Captura de RIF: Carga instantánea de datos desde la base de datos nacional validada. 3. Registro de Operación: Escaneo de ítems con aplicación automática de exenciones o alícuotas. 4. Emisión Fiscal: Generación de factura con número de control, QR de validación y registro en el Ledger contable.",
        technical: "Interfaz de comunicación IP con máquinas fiscales homologadas. Respaldo redundante de documentos electrónicos en la nube con sellado de tiempo inalterable."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y Reajuste RIPF",
        icon: BarChart3,
        color: "text-[#22c55e]",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        concept: "Transformación de datos financieros en inteligencia estratégica bajo normas VEN-NIF. El motor contable ejecuta de forma autónoma el Reajuste por Inflación Fiscal (RIPF) aplicando los índices INPC del BCV. Este proceso protege el patrimonio neto de la empresa frente a la devaluación, asegurando que los balances reflejen la realidad económica para fines bancarios y de auditoría interna.",
        procedure: "1. Sincronización de Nodos: Importación de datos desde TPV, Nómina y Cuentas por Pagar. 2. Identificación de Partidas: Clasificación sistemática de activos monetarios y no monetarios. 3. Cálculo de Ajuste: Aplicación de fórmulas actuariales de inflación sobre el costo histórico. 4. Generación de Estados: Producción de Balances y Flujos de Efectivo con notas explicativas automatizadas.",
        technical: "Motor de procesamiento OLAP que permite consultas multidimensionales sobre el historial de transacciones. Exportación de Libros Diario, Mayor e Inventario en formatos XML para fiscalización."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento (LOTTT/LOPNNA)",
        icon: Users,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "Administración estratégica del capital humano con blindaje legal total. El sistema garantiza el cumplimiento de la LOTTT y la LOPNNA, automatizando el cálculo de salarios, beneficios, utilidades y prestaciones. Integra la nueva contribución de Protección de Pensiones y gestiona el expediente digital del trabajador con validez probatoria ante inspecciones del Ministerio del Trabajo.",
        procedure: "1. Enrolamiento de Personal: Captura de datos, cargas familiares y biometría. 2. Configuración de Nómina: Definición de conceptos prestacionales y deducciones de ley (IVSS, FAOV). 3. Ejecución de Pago: Procesamiento masivo de transferencias y generación de recibos digitales sellados. 4. Gestión de Egresos: Cálculo automático de liquidaciones y finiquitos basados en la antigüedad acumulada.",
        technical: "Algoritmos de cálculo parametrizables según convenciones colectivas. Generación de archivos TXT para la carga masiva en portales gubernamentales."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y Gestión SAREN",
        icon: Gavel,
        color: "text-[#22c55e]",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        concept: "El centro de seguridad legal para la protección de los activos intangibles de la empresa. Actúa como un archivo digital inmutable para Actas Constitutivas, Poderes de Representación y Registros de Marca ante el SAPI. La arquitectura de 'Bóveda Zero-Knowledge' asegura que la información sensible sea accesible únicamente por los titulares autenticados biométricamente.",
        procedure: "1. Carga Protegida: Digitalización de instrumentos legales con metadatos de clasificación. 2. Protocolo de Vencimiento: Configuración de alertas tempranas para renovaciones de poderes y licencias. 3. Auditoría de Acceso: Registro inmutable de quién y cuándo consultó un documento. 4. Firma Electrónica: Autorización de comunicaciones oficiales mediante certificados digitales vinculados a la ID Kyron.",
        technical: "Uso de hashing SHA-512 y sellado de tiempo RFC 3161 para garantizar la preexistencia e integridad de los documentos ante disputas legales."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería y Fotogrametría IA",
        icon: Cpu,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "Nodo de inteligencia física que utiliza visión artificial para la planificación de infraestructura. El sistema procesa registros fotográficos de espacios comerciales o industriales para generar modelos a escala, cómputos métricos y presupuestos de materiales con una desviación menor al 2%, optimizando los costos de expansión y mantenimiento.",
        procedure: "1. Captura de Datos: Toma de fotografías siguiendo el protocolo de ángulos de Kyron. 2. Inferencia Espacial: La IA identifica superficies, vanos y elementos estructurales. 3. Renderizado Técnico: Generación de planos 2D/3D con medidas reales. 4. Estimación de Inversión: Cálculo de materiales basado en el catálogo actualizado de la red de suministros Kyron.",
        technical: "Redes Neuronales Convolucionales (CNN) para reconocimiento de objetos y algoritmos de Structure-from-Motion (SfM) para la reconstrucción tridimensional."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Eco-Créditos y Sostenibilidad",
        icon: Recycle,
        color: "text-[#22c55e]",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        concept: "Transformamos la gestión de residuos en un activo digital transaccionable. Mediante tecnología de inducción magnética síncrona en nuestras papeleras inteligentes, el sistema valida la pureza del material reciclado y emite 'Eco-Créditos' en el Ledger Blockchain. Esto crea una economía circular donde la sostenibilidad genera liquidez directa para la empresa o el ciudadano.",
        procedure: "1. Identificación de Nodo: Sincronización del usuario con el Smart Bin vía QR. 2. Clasificación Magnética: El hardware detecta y separa materiales ferrosos y polímeros. 3. Validación de Peso: Sensores de precisión registran la carga inyectada. 4. Emisión de Token: El sistema acredita los Eco-Créditos en la billetera digital tras la confirmación del nodo central.",
        technical: "Protocolo de consenso Proof-of-Sustainability. Trazabilidad total desde el depósito hasta el centro de procesamiento de la Fundación Kyron."
    },
    {
        id: "bi",
        title: "Módulo 9: Business Intelligence (BI) Corporativo",
        icon: TrendingUp,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "La consola maestra para la toma de decisiones basada en datos. Consolida la información de todos los nodos operativos (Ventas, Nómina, Telecom, Legal) en un dashboard de alta fidelidad. Permite la visualización de KPIs críticos, análisis de rentabilidad y proyecciones de crecimiento mediante modelos predictivos de inteligencia de negocios.",
        procedure: "1. Configuración de Tableros: Selección de métricas clave por departamento. 2. Análisis de Tendencias: Aplicación de filtros temporales y comparativos. 3. Detección de Fugas: Identificación automática de ineficiencias en la estructura de costos. 4. Reporte Ejecutivo: Generación de expedientes de desempeño para juntas directivas y socios.",
        technical: "Arquitectura de Data Warehouse con procesamiento paralelo. Integración de herramientas de visualización vectorial para gráficos de alta densidad de datos."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Soberanía",
        icon: ShieldCheck,
        color: "text-[#22c55e]",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        concept: "El blindaje perimetral y lógico del ecosistema. Implementamos protocolos de seguridad de grado militar para asegurar que la soberanía de los datos de la empresa sea absoluta. Incluye defensa activa contra ataques dirigidos, firewalls de aplicación avanzada y una política de gestión de accesos basada en la confianza cero (Zero Trust Architecture).",
        procedure: "1. Auditoría de Nodos: Revisión continua de la integridad de las conexiones. 2. Gestión de Llaves: Administración de certificados de cifrado en hardware dedicado (HSM). 3. Aislamiento de Amenazas: Protocolo de bloqueo instantáneo de departamentos en caso de anomalía. 4. Recuperación Maestra: Sistema de backups georedundantes con RTO menor a 5 minutos.",
        technical: "Cifrado de datos en reposo mediante AES-XTS-512. Implementación de Web Application Firewall (WAF) con inteligencia de amenazas global."
    },
    {
        id: "voice",
        title: "Módulo 11: Kyron Voice (Interacción por Voz)",
        icon: Volume2,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "Interfaz de lenguaje natural diseñada para la operación 'manos libres'. Kyron Voice utiliza modelos de procesamiento de lenguaje natural (NLP) optimizados para el léxico técnico y legal venezolano, permitiendo realizar consultas complejas sobre leyes, saldos o estados de trámites mediante comandos de voz cifrados.",
        procedure: "1. Activación de Nodo: Pulsación del trigger vocal o botón HUD. 2. Consulta Natural: El usuario solicita información (ej: '¿Cuál es el saldo en Eco-Créditos?'). 3. Inferencia IA: El sistema procesa la intención y consulta la base de conocimiento. 4. Respuesta de Audio: El asistente responde con síntesis de voz de alta fidelidad.",
        technical: "Modelos de Transformer para el reconocimiento de voz. Integración con motores de TTS (Text-to-Speech) de baja latencia para respuestas en tiempo real."
    },
    {
        id: "market",
        title: "Módulo 12: Mercado de Eco-Créditos (Exchange)",
        icon: Coins,
        color: "text-[#22c55e]",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        concept: "Plataforma de intercambio para la monetización de la responsabilidad ambiental empresarial. Las compañías pueden comprar o vender Eco-Créditos excedentes en un mercado secundario transparente, permitiendo a empresas con alta huella de carbono compensar su impacto mediante la adquisición de activos verdes generados por otros nodos del ecosistema.",
        procedure: "1. Valuación de Cartera: El sistema tasa los créditos acumulados según oferta/demanda. 2. Publicación de Oferta: Colocación de activos en el Ledger público de intercambio. 3. Negociación Cifrada: Acuerdo de transferencia entre nodos corporativos. 4. Liquidación Atómica: Transferencia irreversible de créditos y recepción de saldo en servicios o moneda.",
        technical: "Smart Contracts sobre el Ledger de Kyron que garantizan que el intercambio de activos sea irreversible, transparente y libre de intermediarios bancarios."
    },
    {
        id: "generator",
        title: "Módulo 13: Generador Jurídico IA",
        icon: Wand2,
        color: "text-[#0ea5e9]",
        glow: "shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        concept: "Motor de redacción automatizada de instrumentos legales de alta precisión. Utiliza modelos LLM avanzados para ensamblar borradores de contratos, actas de asamblea y comunicaciones oficiales, basados estrictamente en la legislación venezolana vigente y la jurisprudencia del TSJ, reduciendo drásticamente los tiempos de gestión legal externa.",
        procedure: "1. Selección de Protocolo: El usuario elige el tipo de documento requerido. 2. Inyección de Parámetros: Carga automática de datos de las partes desde la Bóveda Jurídica. 3. Ajuste de Cláusulas: Configuración de condiciones específicas mediante cuestionario IA. 4. Generación Maestra: Obtención del borrador listo para la validación final del consultor jurídico.",
        technical: "Implementación de RAG (Retrieval-Augmented Generation) que alimenta la IA con gacetas oficiales y leyes actualizadas en tiempo real para evitar alucinaciones legales."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        let modulesContent = "";
        manualModules.forEach(mod => {
            modulesContent += `
                <div style="margin-bottom: 30pt; border-bottom: 2px solid #e2e8f0; padding-bottom: 20pt; page-break-inside: avoid;">
                    <h2 style="color: #0ea5e9; font-size: 20pt; margin-bottom: 15pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">${mod.title}</h2>
                    <p style="text-align: justify; font-size: 11pt; color: #1e293b; margin-bottom: 15pt; line-height: 1.6;"><strong>CONCEPTO MAESTRO:</strong> ${mod.concept}</p>
                    <div style="background-color: #f1f5f9; padding: 15pt; border-left: 6pt solid #0ea5e9; margin: 15pt 0; border-radius: 10pt;">
                        <p style="color: #0369a1; font-weight: bold; margin-bottom: 8pt; font-size: 10pt; text-transform: uppercase;">PROCEDIMIENTO DE EJECUCIÓN:</p>
                        <p style="font-size: 10pt; line-height: 1.6; color: #334155;">${mod.procedure}</p>
                    </div>
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15pt; border-radius: 10pt;">
                        <p style="color: #22c55e; font-weight: bold; margin-bottom: 8pt; font-size: 10pt; text-transform: uppercase;">ARQUITECTURA DE INGENIERÍA:</p>
                        <p style="font-size: 10pt; color: #64748b; font-style: italic;">${mod.technical}</p>
                    </div>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Times New Roman', serif; color: #0f172a; max-width: 800px; margin: auto;">
                <!-- PORTADA MAESTRA -->
                <div style="text-align: center; background-color: #0ea5e9; padding: 80pt 40pt; margin-bottom: 50pt; border-radius: 30pt;">
                    <div style="background-color: #000; padding: 30pt; display: inline-block; border-radius: 25pt; border: 4pt solid #fff; margin-bottom: 30pt;">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=KYRON-AUTH-V2&color=0ea5e9" width="100" height="100" />
                    </div>
                    <h1 style="color: #ffffff; font-size: 52pt; margin-bottom: 10pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif; letter-spacing: 6pt;">SYSTEM KYRON</h1>
                    <p style="font-size: 22pt; color: #ffffff; font-weight: bold; margin-bottom: 5pt; letter-spacing: 2pt;">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                    <p style="font-size: 14pt; color: #ffffff; opacity: 0.8;">VERSIÓN 2.6.5 • PROTOCOLO MAESTRO 2026</p>
                </div>

                <div style="page-break-before: always;"></div>

                <h2 style="color: #0ea5e9; border-bottom: 4pt solid #0ea5e9; padding-bottom: 10pt; margin-top: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">1.0 VISIÓN ESTRATÉGICA</h2>
                <p style="text-align: justify; line-height: 1.8; font-size: 12pt; margin-bottom: 30pt;">${introSection.text}</p>
                
                <h2 style="color: #0ea5e9; border-bottom: 4pt solid #0ea5e9; padding-bottom: 10pt; margin-top: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">2.0 ÍNDICE INTERACTIVO DE NODOS</h2>
                <div style="line-height: 2.5; font-size: 11pt; margin-bottom: 40pt; background-color: #f8fafc; padding: 30pt; border-radius: 15pt; border: 1px solid #e2e8f0;">
                    ${manualModules.map((m, i) => `<p style="display: flex; justify-content: space-between; border-bottom: 1px dotted #cbd5e1;"><span>${i+1}.0 ${m.title}</span> <span style="color: #94a3b8;">........................ Pág. 0${i+3}</span></p>`).join('')}
                </div>

                <div style="page-break-before: always;"></div>

                <h2 style="color: #0ea5e9; border-bottom: 4pt solid #0ea5e9; padding-bottom: 10pt; margin-bottom: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">3.0 PROTOCOLOS DE INGENIERÍA</h2>
                ${modulesContent}

                <div style="page-break-before: always;"></div>

                <h2 style="color: #0ea5e9; border-bottom: 4pt solid #0ea5e9; padding-bottom: 10pt; margin-top: 40pt; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">4.0 ESPECIFICACIONES DE INFRAESTRUCTURA</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 30pt; border-radius: 15pt; overflow: hidden; border: 1px solid #e2e8f0;">
                    <tr style="background-color: #0ea5e9; color: white;">
                        <th style="padding: 15pt; text-align: left; font-size: 11pt; text-transform: uppercase;">PARÁMETRO TÉCNICO</th>
                        <th style="padding: 15pt; text-align: left; font-size: 11pt; text-transform: uppercase;">ESTÁNDAR KYRON V2.6</th>
                    </tr>
                    <tr style="background-color: white;">
                        <td style="border: 1pt solid #e2e8f0; padding: 15pt; font-weight: bold; color: #0ea5e9;">Cifrado de Datos</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 15pt;">AES-XTS-512 (Protocolo Militar)</td>
                    </tr>
                    <tr style="background-color: #f8fafc;">
                        <td style="border: 1pt solid #e2e8f0; padding: 15pt; font-weight: bold; color: #0ea5e9;">Base de Identidad</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 15pt;">Biometría 3D / eIDAS Compliant</td>
                    </tr>
                    <tr style="background-color: white;">
                        <td style="border: 1pt solid #e2e8f0; padding: 15pt; font-weight: bold; color: #0ea5e9;">Conectividad</td>
                        <td style="border: 1pt solid #e2e8f0; padding: 15pt;">Kyron 5G / Provisión eSIM remota</td>
                    </tr>
                </table>

                <div style="margin-top: 100pt; text-align: center; font-size: 9pt; color: #94a3b8; border-top: 2pt solid #e2e8f0; padding-top: 30pt;">
                    DOCUMENTO DE ACCESO PÚBLICO • SYSTEM KYRON v2.6.5 • © 2026 CORPORATE INTELLIGENCE
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "KYRON_ENCICLOPEDIA_MASTER_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "PROTOCOLO DE EXPORTACIÓN FINALIZADO", 
            description: "Enciclopedia v2.6.5 generada con éxito.",
            action: <CheckCircle className="text-[#0ea5e9] h-4 w-4" />
        });
    };

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 120, behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* HUD OVERLAY */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            {/* HEADER MAESTRO */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-24 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between">
                <div className="flex items-center gap-10">
                    <div className="p-3 bg-black border-2 border-[#0ea5e9]/40 rounded-2xl shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all hover:scale-110">
                        <Logo className="h-10 w-10" />
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-10">
                        <span className="text-sm font-black tracking-[0.6em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="h-1.5 w-1.5 bg-[#0ea5e9] rounded-full animate-pulse" />
                            <span className="text-[9px] font-bold text-[#0ea5e9] uppercase tracking-[0.5em] italic">Protocolo Maestro v2.6.5</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-6">
                    <Button variant="ghost" asChild className="h-12 px-8 rounded-xl text-[10px] font-black uppercase text-white/40 hover:text-white border border-white/5 hover:bg-white/5 transition-all">
                        <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER AL NODO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase shadow-[0_0_30px_rgba(14,165,233,0.5)]" onClick={handleDownloadDoc}>
                        <Download className="mr-3 h-4 w-4" /> EXPORTAR ENCICLOPEDIA
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-[1400px] pt-40 pb-40 relative z-10">
                <div className="grid lg:grid-cols-12 gap-20">
                    
                    {/* NAVEGACIÓN LATERAL HUD */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-40 space-y-10">
                            <Card className="glass-card p-10 rounded-[3rem] border-white/5 bg-black/60 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><BookOpen className="h-24 w-24" /></div>
                                <CardHeader className="p-0 mb-10 text-center border-b border-white/5 pb-10">
                                    <div className="p-8 bg-black border-2 border-[#0ea5e9]/20 rounded-[2.5rem] w-fit mx-auto mb-6 shadow-glow transition-transform duration-700 group-hover:rotate-12">
                                        <Logo className="h-14 w-14" />
                                    </div>
                                    <CardTitle className="text-[11px] font-black uppercase tracking-[0.6em] text-[#0ea5e9]">ÍNDICE MAESTRO</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1.5 max-h-[55vh] overflow-y-auto custom-scrollbar pr-6">
                                    <NavButton 
                                        label="1.0 Visión Estratégica" 
                                        isActive={activeTab === "intro"}
                                        onClick={() => scrollToSection("intro")} 
                                        icon={Info} 
                                        activeColor="text-[#0ea5e9]"
                                    />
                                    <div className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic flex items-center gap-4">
                                        <div className="h-px flex-1 bg-white/5" /> NODOS <div className="h-px flex-1 bg-white/5" />
                                    </div>
                                    {manualModules.map(mod => (
                                        <NavButton 
                                            key={mod.id} 
                                            label={mod.title} 
                                            isActive={activeTab === mod.id}
                                            onClick={() => scrollToSection(mod.id)} 
                                            icon={mod.icon} 
                                            activeColor={mod.color}
                                        />
                                    ))}
                                </CardContent>
                            </Card>
                            
                            <div className="p-8 rounded-[2.5rem] bg-[#22c55e]/5 border border-[#22c55e]/10 flex items-center gap-6 group hover:bg-[#22c55e]/10 transition-all">
                                <ShieldCheck className="h-8 w-8 text-[#22c55e] transition-transform group-hover:scale-110" />
                                <p className="text-[9px] font-black uppercase tracking-widest text-[#22c55e]/60 leading-relaxed">
                                    Documento Certificado <br/> Acceso Público Universal
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* ÁREA DE CONTENIDO DE ALTA DENSIDAD */}
                    <div className="lg:col-span-8 space-y-32">
                        
                        {/* SECCIÓN INTRODUCTORIA */}
                        <section id="intro" className="space-y-16 scroll-mt-40">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full bg-[#0ea5e9] h-64 rounded-[4rem] flex flex-col items-center justify-center relative overflow-hidden shadow-glow group"
                            >
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="p-8 bg-black border-4 border-white/20 rounded-[2.5rem] shadow-2xl relative z-10">
                                    <Logo className="h-24 w-24 drop-shadow-glow" />
                                </div>
                            </motion.div>
                            
                            <div className="bg-black p-16 rounded-[4rem] border border-white/10 text-center space-y-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow">SYSTEM KYRON</h1>
                                <div className="space-y-3">
                                    <p className="text-2xl md:text-3xl font-black text-[#0ea5e9] uppercase tracking-[0.3em] italic">ENCICLOPEDIA TÉCNICA DE OPERACIONES</p>
                                    <div className="flex items-center justify-center gap-6 mt-4">
                                        <Badge className="bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">VERSIÓN 2.6.5</Badge>
                                        <Badge variant="outline" className="text-white/20 border-white/10 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">PROTOCOLO MAESTRO 2026</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white flex items-center gap-6">
                                    <div className="h-10 w-2 bg-[#0ea5e9] rounded-full shadow-glow" />
                                    1.0 Visión Estratégica
                                </h2>
                                <p className="text-2xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-white/5 pl-12">
                                    {introSection.text}
                                </p>
                                <Card className="bg-[#0ea5e9]/5 border border-[#0ea5e9]/10 p-12 rounded-[3.5rem] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-all"><Target className="h-32 w-32" /></div>
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.8em] text-[#0ea5e9] mb-6 italic">Misión Institucional</h4>
                                    <p className="text-3xl font-black italic text-white tracking-tight leading-tight">"{introSection.mission}"</p>
                                </Card>
                            </div>
                        </section>

                        {/* DESPLIEGUE DE NODOS OPERATIVOS */}
                        <div className="space-y-48">
                            {manualModules.map(mod => (
                                <section id={mod.id} key={mod.id} className="scroll-mt-40 group">
                                    <Card className="glass-card rounded-[4.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-1000 hover:border-[#0ea5e9]/30">
                                        <CardHeader className="p-16 border-b border-white/5 flex flex-col md:flex-row items-center gap-12 bg-white/[0.01] relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#0ea5e9]/20" />
                                            <div className={cn("p-8 rounded-[2.5rem] border border-white/10 shadow-inner bg-black group-hover:scale-110 transition-all duration-700", mod.glow)}>
                                                <mod.icon className={cn("h-16 w-16 transition-all duration-700", mod.color)} />
                                            </div>
                                            <div className="space-y-3 text-center md:text-left">
                                                <div className="flex items-center justify-center md:justify-start gap-4">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 italic">NODO OPERATIVO</span>
                                                    <Badge variant="outline" className="border-white/10 text-white/20 text-[8px] font-black uppercase px-3 h-6">ACTIVE</Badge>
                                                </div>
                                                <CardTitle className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-16 space-y-16">
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-[#0ea5e9]/60 italic flex items-center gap-6">
                                                    <div className="h-px w-12 bg-[#0ea5e9]/20" /> CONCEPTO MAESTRO
                                                </h4>
                                                <p className="text-2xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept}</p>
                                            </div>
                                            
                                            <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 shadow-inner relative group/proc">
                                                <div className="absolute top-6 right-10 opacity-10"><Terminal className="h-10 w-10" /></div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] mb-12 text-[#0ea5e9] flex items-center gap-4">
                                                    <Smartphone className="h-4 w-4" /> Procedimiento de Ejecución
                                                </h4>
                                                <div className="text-lg font-bold italic text-white/70 space-y-8">
                                                    {mod.procedure.split('. ').map((step, idx) => (
                                                        <div key={idx} className="flex gap-10 items-start group/step">
                                                            <div className="flex flex-col items-center">
                                                                <span className="font-black text-2xl text-[#0ea5e9] opacity-30 group-hover/step:opacity-100 transition-opacity">0{idx + 1}</span>
                                                                {idx < mod.procedure.split('. ').length - 1 && <div className="w-px h-12 bg-white/5 mt-2" />}
                                                            </div>
                                                            <span className="leading-snug pt-1">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-[#22c55e]/60 italic flex items-center gap-6">
                                                    <div className="h-px w-12 bg-[#22c55e]/20" /> ARQUITECTURA DE INGENIERÍA
                                                </h4>
                                                <div className="p-8 rounded-3xl bg-[#22c55e]/5 border border-[#22c55e]/10">
                                                    <p className="text-xl font-medium text-[#22c55e]/80 leading-relaxed italic text-justify">{mod.technical}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-10 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                                            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
                                                <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#22c55e]" /> VALIDACIÓN KYRON V2.6</div>
                                                <div className="flex items-center gap-3"><Activity className="h-5 w-5 text-[#0ea5e9] animate-pulse" /> NODO SINCRO</div>
                                            </div>
                                            <Badge variant="outline" className="border-[#0ea5e9]/20 text-[#0ea5e9] text-[10px] font-black px-6 h-10 rounded-2xl shadow-glow uppercase tracking-widest">Protocolo Activo</Badge>
                                        </CardFooter>
                                    </Card>
                                </section>
                            ))}
                        </div>

                        {/* FOOTER DOCUMENTAL */}
                        <footer className="pt-40 border-t border-white/5 text-center space-y-12">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="p-12 bg-black border-2 border-white/10 rounded-[3.5rem] w-fit mx-auto shadow-glow opacity-60"
                            >
                                <Logo className="h-20 w-20" />
                            </motion.div>
                            <div className="space-y-4">
                                <p className="text-[12px] font-black uppercase tracking-[1.5em] text-white/10 italic">
                                    SYSTEM KYRON MASTER ENCYCLOPEDIA
                                </p>
                                <div className="flex items-center justify-center gap-10 text-[9px] font-bold text-white/5 uppercase tracking-[0.8em]">
                                    <span>REVISIÓN: MARZO 2026</span>
                                    <span className="h-1.5 w-1.5 bg-white/5 rounded-full" />
                                    <span>ACCESO PÚBLICO UNIVERSAL</span>
                                    <span className="h-1.5 w-1.5 bg-white/5 rounded-full" />
                                    <span>ID: MASTER-LEGER-V2.6.5</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavButton({ label, onClick, icon: Icon, isActive, activeColor }: { label: string, onClick: () => void, icon?: any, isActive?: boolean, activeColor?: string }) {
    return (
        <button 
            onClick={onClick} 
            className={cn(
                "group w-full text-left px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between border border-transparent",
                isActive 
                    ? `bg-white/5 border-white/10 ${activeColor} shadow-glow` 
                    : "text-white/20 hover:text-white hover:bg-white/[0.03] hover:border-white/5"
            )}
        >
            <div className="flex items-center gap-5">
                {Icon && <Icon className={cn("h-4 w-4 transition-all duration-500", isActive ? "scale-125 rotate-3" : "opacity-30 group-hover:opacity-100 group-hover:scale-110")} />}
                <span className="truncate">{label}</span>
            </div>
            <ChevronRight className={cn("h-4 w-4 transition-all duration-500", isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0")} />
        </button>
    );
}
