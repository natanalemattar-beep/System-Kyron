
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
    ListTree,
    Terminal,
    RefreshCw,
    Activity,
    Info,
    Smartphone,
    Globe,
    Scale,
    FileText,
    BookOpen,
    Search,
    ChevronRight,
    AlertTriangle,
    Shield,
    Volume2,
    Coins,
    Wand2,
    Printer,
    Monitor,
    BarChart3,
    Users,
    Target,
    Briefcase,
    School,
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
 * DOCUMENTO DE GRADO CORPORATIVO - MÁXIMA DENSIDAD TÉCNICA Y LEGAL.
 */

const introSection = {
    title: "1.0 Introducción al Ecosistema de Misión Crítica",
    mission: "Blindar la gestión institucional mediante tecnología inmutable y conectividad soberana, garantizando el cumplimiento con el 100% de los entes regulatorios nacionales.",
    text: "System Kyron v2.6.5 representa la infraestructura de ingeniería convergente más avanzada de la región, diseñada específicamente para operar en el complejo entorno legislativo y fiscal de la República Bolivariana de Venezuela. No se trata simplemente de una plataforma de software; es un nodo de inteligencia empresarial que fusiona telecomunicaciones 5G, ciberseguridad cuántica, fiscalidad predictiva y un ledger blockchain inmutable. El sistema ha sido concebido bajo protocolos de alta disponibilidad para garantizar la operación legal absoluta ante instituciones rectoras como el SENIAT, CONATEL, SAREN, SAPI, el Ministerio del Trabajo (LOTTT), el IVSS, FAOV e INCES, así como los tribunales de protección (LOPNNA)."
};

const quickStartSteps = [
    { step: "01", title: "Configuración de Nodo Maestro", desc: "Inicialización de la infraestructura cloud, configuración de certificados de cifrado raíz y enrolamiento biométrico 3D del administrador principal para el sellado de llaves de seguridad.", icon: Terminal },
    { step: "02", title: "Sincronización Fiscal y Bancaria", desc: "Carga automática de índices INPC del Banco Central de Venezuela, configuración del calendario de contribuyentes especiales y vinculación de cuentas para conciliación síncrona.", icon: RefreshCw },
    { step: "03", title: "Habilitación de Red Soberana", desc: "Aprovisionamiento de perfiles eSIM en dispositivos móviles homologados mediante el servidor SM-DP+, asegurando túneles de comunicación cifrados para el tráfico administrativo.", icon: Radio },
    { step: "04", title: "Sellado del Ledger Blockchain", desc: "Activación del protocolo de inmutabilidad para el registro de cada transacción contable, fiscal y de reciclaje, garantizando que los datos sean legalmente inatacables ante auditorías.", icon: ShieldCheck }
];

const manualModules = [
    {
        id: "identidad",
        title: "Módulo 1: Identidad Digital Biométrica 3D",
        icon: Fingerprint,
        concept: "La identidad es la piedra angular de la soberanía digital. Implementamos protocolos de captura de 512 puntos vectoriales faciales bajo el estándar europeo eIDAS (Electronic Identification, Authentication and Trust Services). El sistema no almacena fotografías convencionales, sino que extrae una firma matemática única procesada en un enclave seguro de hardware (TEE), garantizando que cada acceso, firma de contrato o emisión de pago sea atribuible de forma inequívoca al titular, eliminando el riesgo de suplantación de identidad.",
        procedure: "1. Acceda al Nodo de Identidad desde su terminal móvil homologado. 2. Realice el escaneo facial 3D asegurando una iluminación de 300 lux. 3. El sistema ejecutará una prueba de vida (Liveness Detection) para prevenir ataques de inyección de video. 4. Una vez validado, se genera un Hash de Identidad que se sincroniza con el Ledger Blockchain de Kyron para autorizar todas sus operaciones de nivel superior.",
        technical: "Cifrado de grado militar AES-512 con arquitectura de Conocimiento Cero (Zero-Knowledge). El reconocimiento vectorial facial tiene una tasa de falsa aceptación inferior a 1:1.000.000, cumpliendo con los estándares de seguridad de la banca internacional."
    },
    {
        id: "telecom",
        title: "Módulo 2: Telecomunicaciones y Gestión eSIM",
        icon: Radio,
        concept: "Provisión de infraestructura de red de baja latencia basada en estándares GSMA. El sistema actúa como un nodo de gestión inteligente para flotas corporativas, permitiendo la activación, suspensión y monitoreo de líneas 5G sin necesidad de hardware físico. Utilizamos servidores SM-DP+ (Subscription Manager Data Preparation) para descargar perfiles eUICC de forma segura, garantizando que el personal clave esté conectado 24/7 mediante túneles IPsec privados que protegen los datos estratégicos de la empresa.",
        procedure: "1. Ingrese al Centro de Control Telecom. 2. Seleccione el dispositivo receptor del inventario homologado. 3. Elija el plan de datos y voz (Plan Conecta, Global o Infinite). 4. Escanee el código QR generado para la instalación del perfil eSIM. 5. Valide la conectividad mediante la prueba de latencia integrada en el dashboard.",
        technical: "Soporte para Network Slicing (priorización de tráfico para aplicaciones contables críticas) y protocolos EAP-AKA para autenticación de red. Gestión de APN privados para aislamiento de red corporativa."
    },
    {
        id: "tpv",
        title: "Módulo 3: Punto de Venta (TPV) e Inteligencia Fiscal",
        icon: TabletSmartphone,
        concept: "Terminal de facturación de alta fidelidad diseñado para el cumplimiento estricto de la Providencia Administrativa SNAT/2011/0071 del SENIAT. El TPV de Kyron integra un motor de OCR para la carga instantánea de datos del cliente mediante Cédula o RIF, eliminando errores de transcripción que derivan en multas. Calcula automáticamente el IVA, IGTF y contribuciones para-fiscales, vinculando cada venta con el inventario físico y el libro de ventas digital de forma síncrona.",
        procedure: "1. Inicie sesión con su credencial biométrica de cajero. 2. Escanee los códigos de barras EAN-13 de los productos. 3. Valide el RIF del cliente contra la base de datos interna o el portal del SENIAT. 4. Seleccione el método de pago (Bolívares, Divisas, Cashea o Cripto). 5. Emita la factura fiscal electrónica con código QR dinámico verificado por el nodo maestro.",
        technical: "Integración con impresoras fiscales homologadas y máquinas fiscales de nueva generación. Registro automático de cada evento de facturación en el Blockchain Ledger para prevenir la manipulación de correlativos de control."
    },
    {
        id: "contabilidad",
        title: "Módulo 4: Contabilidad Avanzada y Reajuste RIPF",
        icon: BarChart3,
        concept: "Automatización total del ciclo contable bajo normativas VEN-NIF. El sistema realiza el Reajuste por Inflación Fiscal (RIPF) de forma actuarial, integrando los índices INPC publicados por el Banco Central de Venezuela. Genera de forma automatizada el Estado de Situación Financiera, Estado de Resultados y Flujo de Efectivo, permitiendo a los directores tener un balance 'tiempo-real' de la salud económica de la organización sin esperar por cierres mensuales manuales.",
        procedure: "1. El sistema importa automáticamente todas las transacciones del TPV y Cuentas por Pagar. 2. Ejecute el 'Asistente de Cierre de Periodo'. 3. Verifique los asientos de ajuste por inflación sugeridos por la IA. 4. Apruebe el balance general para su sellado digital. 5. Exporte los libros contables (Diario, Mayor e Inventario) listos para su impresión oficial o presentación ante registros.",
        technical: "Algoritmos de cuadre por partida doble con validación de integridad referencial. Sincronización API con las tasas de cambio oficiales para la valoración de activos y pasivos en moneda extranjera."
    },
    {
        id: "rrhh",
        title: "Módulo 5: Gestión de Talento y Cumplimiento LOTTT",
        icon: Users,
        concept: "Administración estratégica del capital humano centrada en el cumplimiento riguroso de la LOTTT y LOPNNA. El motor de nómina de Kyron gestiona salarios, beneficios, retenciones de ley (IVSS, FAOV, INCES) y aportes de Protección de Pensiones de forma automática. Además, centraliza el expediente digital de cada trabajador, incluyendo contratos visados por abogados, registros de vacaciones, amonestaciones y liquidaciones pre-calculadas para evitar litigios laborales.",
        procedure: "1. Complete la ficha del trabajador con validación de carga familiar. 2. Configure los conceptos de pago (Sueldo Base, Cesta Ticket, Bonos). 3. El sistema generará el archivo TXT para el pago de nómina masivo. 4. Despache los recibos de pago vía WhatsApp/Email con sello digital de la empresa. 5. Genere las planillas de solvencia trimestrales con un solo clic.",
        technical: "Cálculo preciso de prestaciones sociales basado en el último salario y tiempo de servicio. Generación de archivos de interfaz para los portales de TIUNA (IVSS) y SISAT (INCES)."
    },
    {
        id: "juridico",
        title: "Módulo 6: Bóveda Jurídica y Gestión SAREN/SAPI",
        icon: Gavel,
        concept: "Archivo digital de grado legal para el resguardo inmutable de los activos jurídicos de la empresa. Centraliza Actas Constitutivas, Modificaciones de Estatutos, Poderes de Representación y Registros de Marca ante el SAPI. El sistema actúa como un Oficial de Cumplimiento IA, alertando sobre el vencimiento de facultades legales o la necesidad de asambleas ordinarias anuales, protegiendo a los accionistas de la inacción administrativa.",
        procedure: "1. Digitalice sus documentos legales mediante el escáner de alta resolución integrado. 2. Clasifique el expediente según su naturaleza (Mercantil, Laboral, Civil). 3. Configure los recordatorios de renovación de poderes. 4. Utilice el asistente de actas para redactar minutas de asamblea alineadas con el Código de Comercio.",
        technical: "Sellado de tiempo RFC 3161 que garantiza que el documento no ha sido modificado desde su carga. Encriptación Zero-Knowledge: ni Kyron ni terceros pueden ver los documentos; solo la llave biométrica del administrador puede desencriptar la bóveda.",
        details: "Módulo especializado para la gestión de patentes y marcas, con seguimiento de gacetas de propiedad industrial."
    },
    {
        id: "ingenieria",
        title: "Módulo 7: Ingeniería, Proyectos y Fotogrametría IA",
        icon: Cpu,
        concept: "Planificación técnica avanzada de activos físicos. Nuestra IA de visión computacional procesa registros fotográficos para generar nubes de puntos y planos a escala (Fotogrametría). Esta herramienta es vital para la remodelación de locales comerciales, instalación de infraestructuras de red o mantenimiento preventivo de plantas industriales, permitiendo obtener mediciones precisas y cómputos métricos sin necesidad de equipos láser costosos.",
        procedure: "1. Capture 12 fotos desde diferentes ángulos del espacio físico. 2. Cargue el set de imágenes al Nodo de Ingeniería. 3. La IA procesará el plano 2D/3D en minutos. 4. Defina los materiales a utilizar del catálogo APU (Análisis de Precios Unitarios). 5. Genere el presupuesto de obra civil con margen de error inferior al 2%.",
        technical: "Motor de inferencia basado en redes neuronales convolucionales para la detección de vanos (puertas/ventanas) y elementos estructurales. Exportación compatible con AutoCAD (DWG) y Revit.",
        details: "Ideal para la expansión de sucursales y franquicias, estandarizando la infraestructura física del holding."
    },
    {
        id: "sostenibilidad",
        title: "Módulo 8: Economía Circular y Activos Verdes",
        icon: Recycle,
        concept: "Iniciativa bandera impulsada por la Fundación Kyron para la monetización de la responsabilidad ambiental. Implementamos Papeleras Inteligentes (Smart Bins) equipadas con sensores de inducción magnética síncrona que clasifican residuos en tiempo real. Cada envase reciclado genera Eco-Créditos tokenizados que el ciudadano o la empresa pueden canjear en la red de comercios aliados, transformando la basura en un activo digital con valor real de mercado.",
        procedure: "1. Identifíquese en la Papelera Inteligente con su Tarjeta de Reciclaje o QR. 2. Deposite el residuo (Plástico PET, Aluminio, Vidrio). 3. El sistema valida el material mediante magnetismo y peso. 4. Se acreditan los E-CR inmediatamente en su Billetera Digital. 5. Consulte el impacto de su huella de carbono en el Dashboard Verde.",
        technical: "Protocolo de validación de hardware mediante sensores de proximidad y campo electromagnético. Los Eco-Créditos se registran como activos fungibles en el Ledger Kyron para auditorías de sostenibilidad ESG.",
        details: "Las empresas pueden vender sus excedentes de Eco-Créditos a otras corporaciones para compensar su impacto ambiental."
    },
    {
        id: "bi",
        title: "Módulo 9: Inteligencia de Negocio (BI) y Estrategia",
        icon: TrendingUp,
        concept: "Capa de analítica predictiva que transforma la 'data cruda' en 'decisiones maestras'. System Kyron procesa millones de puntos de datos de todos los módulos para identificar patrones de consumo, cuellos de botella operativos y oportunidades de mercado. El sistema utiliza modelos de regresión lineal para proyectar el flujo de caja a 12 meses y sugerir ajustes en la estructura de costos fijos y variables, asegurando la supervivencia y crecimiento del negocio.",
        procedure: "1. Acceda al Centro de Mando Ejecutivo. 2. Visualice los KPI críticos (Margen Neto, CAC, LTV). 3. Utilice la herramienta de 'Escenarios What-If' para simular cambios de precios. 4. Consulte el radar de competencia para ver su posición en el mercado. 5. Ejecute el reporte de factibilidad económica para nuevas líneas de inversión.",
        technical: "Algoritmos de aprendizaje automático para detección de anomalías y prevención de fraudes. Integración de Big Data poblacional para análisis demográfico de precisión.",
        details: "Permite la consolidación de estados financieros de múltiples empresas del holding en una sola vista."
    },
    {
        id: "seguridad",
        title: "Módulo 10: Ciberseguridad y Cifrado Cuántico",
        icon: ShieldCheck,
        concept: "Blindaje proactivo de la infraestructura digital contra amenazas persistentes avanzadas (APT). Aplicamos una arquitectura de Confianza Cero (Zero Trust), donde cada transacción requiere una doble validación (Biométrica + Token de Hardware). El sistema monitorea el tráfico de red para detectar intrusiones y realiza respaldos automáticos en nodos distribuidos geográficamente, garantizando que el ecosistema sea resistente a desastres naturales o ataques cibernéticos a gran escala.",
        procedure: "1. Configure el Firewall Maestro y las listas blancas de IP autorizadas. 2. Realice la auditoría semanal de accesos biométricos. 3. Verifique la integridad del sellado Blockchain de sus libros contables. 4. En caso de pérdida de terminal, ejecute el protocolo de 'Bloqueo de Nodo Remoto' desde la consola central.",
        technical: "Protocolos de intercambio de llaves resistentes a la computación cuántica. Registro de logs inmutable (Write-Once-Read-Many) para forense digital y auditorías de seguridad Nivel 5.",
        details: "Cumple con los estándares ISO 27001 de seguridad de la información y GDPR para protección de datos personales."
    }
];

const innovationTier2 = [
    {
        id: "voice",
        title: "Kyron Voice: Asistente por Lenguaje Natural",
        icon: Volume2,
        concept: "Interacción humano-máquina mediante voz optimizada para el léxico administrativo venezolano. Kyron Voice permite a directivos y operadores realizar consultas complejas sobre leyes, plazos fiscales o saldos contables sin necesidad de navegar manualmente por la interfaz, utilizando algoritmos de Procesamiento de Lenguaje Natural (NLP) de última generación.",
        procedure: "Pulse el icono de micrófono y consulte: '¿Cuándo vence mi próxima declaración de IVA?' o 'Lee el resumen de ventas de ayer'. El sistema procesará la solicitud y responderá con síntesis de voz de alta fidelidad.",
        technical: "Motor de inferencia IA basado en modelos de lenguaje de gran escala (LLM) entrenados con la base legal de la República. Procesamiento local en el borde (Edge AI) para mayor velocidad y privacidad.",
        details: "Capacidad de traducción instantánea para inversionistas extranjeros en tiempo real."
    },
    {
        id: "generador-ia",
        title: "Generador Jurídico IA: Redacción de Contratos",
        icon: Wand2,
        concept: "Automatización de la redacción de instrumentos legales de alta complejidad. El motor IA de Kyron utiliza plantillas certificadas por abogados senior para generar borradores de contratos de arrendamiento, compraventa, actas de asamblea y acuerdos de confidencialidad, asegurando que cada documento incluya las cláusulas de jurisdicción, domicilio y base legal adecuadas según la ley venezolana vigente.",
        procedure: "1. Seleccione el tipo de instrumento a redactar. 2. Inyecte los datos de las partes (Nombres, RIF, C.I.). 3. Defina el objeto comercial y montos. 4. La IA generará el borrador listo para revisión y firma biométrica.",
        technical: "Validación cruzada con el módulo de Poderes para asegurar que los firmantes tienen la capacidad legal suficiente antes de autorizar la redacción.",
        details: "Reduce el tiempo de redacción legal de 4 horas a 45 segundos con 0% de errores de forma."
    },
    {
        id: "market-ecr",
        title: "Mercado de Eco-Créditos: Exchange de Activos Verdes",
        icon: Coins,
        concept: "Plataforma de negociación de activos ambientales tokenizados. Las empresas que generan excedentes de Eco-Créditos mediante sus Smart Bins pueden venderlos a otras corporaciones que necesiten compensar su huella de carbono para certificaciones internacionales o beneficios fiscales, creando el primer mercado secundario de bonos verdes real en Venezuela respaldado por Blockchain.",
        procedure: "1. Consulte su balance de E-CR acumulados. 2. Publique una oferta de venta en el Ledger Central. 3. El comprador ejecuta la transacción mediante pago en Bolívares o Divisas. 4. Los créditos se transfieren instantáneamente y el sistema emite el Certificado de Compensación Carbono Neutral.",
        technical: "Implementación de Smart Contracts para garantizar la integridad de las transferencias y prevenir el doble gasto de activos ambientales.",
        details: "Integrado con el dashboard de sostenibilidad para reportes de impacto ESG (Environmental, Social and Governance)."
    }
];

export default function ManualMaestroPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownloadDoc = () => {
        let sectionsHtml = "";
        
        manualModules.forEach(mod => {
            sectionsHtml += `
                <div style="margin-bottom: 30pt; page-break-inside: avoid;">
                    <table style="width: 100%; background-color: #2d5a8e; margin-bottom: 10pt;">
                        <tr><td style="padding: 15pt; color: white; font-size: 16pt; font-weight: bold;">${mod.title}</td></tr>
                    </table>
                    <p style="text-align: justify;"><strong>CONCEPTO FUNDAMENTAL:</strong> ${mod.concept}</p>
                    <div style="background-color: #f1f5f9; padding: 15pt; border: 1pt solid #cbd5e1; margin: 15pt 0;">
                        <p style="color: #2d5a8e; font-weight: bold; margin-bottom: 5pt;">PROCEDIMIENTO OPERATIVO:</p>
                        <p>${mod.procedure}</p>
                    </div>
                    <p style="font-size: 10pt; color: #64748b;"><strong>ARQUITECTURA DE INGENIERÍA:</strong> ${mod.technical}</p>
                </div>
            `;
        });

        innovationTier2.forEach(inn => {
            sectionsHtml += `
                <div style="margin-bottom: 30pt; border: 2pt solid #22c55e; padding: 20pt; page-break-inside: avoid;">
                    <h3 style="color: #15803d; margin-top: 0;">${inn.title}</h3>
                    <p><strong>INNOVACIÓN ESTRATÉGICA:</strong> ${inn.concept}</p>
                    <p><strong>MODO DE USO:</strong> ${inn.procedure}</p>
                    <p style="font-size: 9pt; color: #166534; font-style: italic;">Soporte: ${inn.technical}</p>
                </div>
            `;
        });

        const content = `
            <div style="font-family: 'Times New Roman', serif; color: #1a1a1a;">
                <!-- PORTADA -->
                <div style="text-align: center; border: 3pt solid #2d5a8e; padding: 80pt 40pt; margin-bottom: 100pt; border-radius: 20pt;">
                    <h1 style="color: #2d5a8e; font-size: 48pt; margin-bottom: 5pt; letter-spacing: 5pt;">SYSTEM KYRON</h1>
                    <p style="font-size: 20pt; font-weight: bold; color: #475569; margin-bottom: 40pt;">EXPEDIENTE MAESTRO DE OPERACIONES</p>
                    <p style="font-size: 14pt; color: #94a3b8;">VERSIÓN 2.6.5 • GRADO CORPORATIVO</p>
                    <div style="margin-top: 60pt;">
                        <p style="font-size: 11pt; color: #ef4444; font-weight: bold; text-transform: uppercase; letter-spacing: 3pt;">[ CONFIDENCIALIDAD NIVEL 5 - USO RESTRINGIDO ]</p>
                    </div>
                </div>

                <!-- ÍNDICE -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt; margin-top: 40pt;">ÍNDICE ESTRATÉGICO</h2>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 5pt 0;">1.0 Introducción al Ecosistema ..................................................... 02</li>
                    <li style="padding: 5pt 0;">2.0 Guía de Inicio Rápido (Quick Start) ............................................ 03</li>
                    <li style="padding: 5pt 0;">3.0 Protocolos Operativos de Ingeniería .......................................... 04</li>
                    <li style="padding: 5pt 0;">4.0 Innovaciones de Vanguardia Tier 2 ............................................ 15</li>
                    <li style="padding: 5pt 0;">5.0 Soporte, Requisitos y Glosario ................................................ 20</li>
                </ul>

                <div style="page-break-after: always;"></div>

                <!-- INTRODUCCIÓN -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt; margin-top: 40pt;">1.0 INTRODUCCIÓN ESTRATÉGICA</h2>
                <p style="text-align: justify; line-height: 1.6; font-size: 12pt;">${introSection.text}</p>
                <div style="background-color: #f0f9ff; padding: 20pt; border-left: 6pt solid #2d5a8e; margin: 30pt 0;">
                    <p style="font-weight: bold; color: #0c4a6e; margin: 0; font-size: 11pt;">MISIÓN DEL ECOSISTEMA:</p>
                    <p style="font-style: italic; margin: 8pt 0 0 0; font-size: 13pt;">"${introSection.mission}"</p>
                </div>

                <!-- MÓDULOS -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt; margin-top: 40pt;">2.0 PROTOCOLOS DE INGENIERÍA</h2>
                ${sectionsHtml}

                <!-- SOPORTE -->
                <h2 style="color: #2d5a8e; border-bottom: 2pt solid #2d5a8e; padding-bottom: 5pt; margin-top: 40pt;">3.0 SOPORTE Y REQUISITOS TÉCNICOS</h2>
                <div style="margin-bottom: 30pt;">
                    <h4 style="color: #2d5a8e;">3.1 Requisitos de Hardware y Red</h4>
                    <p>Para garantizar una latencia inferior a 50ms en transacciones Blockchain, el terminal debe cumplir:</p>
                    <ul>
                        <li>Android 11+ / iOS 15+ con soporte eUICC (eSIM).</li>
                        <li>Cámara HD 1080p para reconocimiento vectorial 3D.</li>
                        <li>Conectividad 5G o Fibra Óptica simétrica (mínimo 10Mbps).</li>
                    </ul>
                </div>

                <div style="margin-top: 100pt; text-align: center; border-top: 1pt solid #eee; padding-top: 20pt;">
                    <p style="font-size: 10pt; color: #94a3b8;">SYSTEM KYRON • CORPORATE INTELLIGENCE HUB • © 2026</p>
                    <p style="font-size: 8pt; color: #cbd5e1;">DOCUMENTO SELLADO DIGITALMENTE - ID: KYR-MSTR-V265-SEC5</p>
                </div>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Maestro Kyron</title></head><body style='padding: 50pt; font-family: Arial, sans-serif; color: #1a1a1a;'>";
        const footerHtml = "</body></html>";
        const blob = new Blob([headerHtml + content + footerHtml], { type: 'application/msword' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MANUAL_MAESTRO_SYSTEM_KYRON_V2.6.5.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ 
            title: "EXPEDIENTE EXPORTADO", 
            description: "Manual Maestro v2.6.5 generado bajo protocolo de alta fidelidad.",
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
            {/* Header HUD Permanente */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/90 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between shadow-glow">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8 drop-shadow-glow" />
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" asChild className="h-9 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white">
                        <Link href="/"><ChevronLeft className="mr-2 h-3 w-3" /> VOLVER</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownloadDoc}>
                        <Download className="mr-2 h-3 w-3" /> DESCARGAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Navegación Lateral HUD */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <Card className="glass-card p-6 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="h-20 w-20 text-primary" /></div>
                            <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                <CardTitle className="text-[9px] font-black uppercase tracking-0.4em text-primary flex items-center gap-2">
                                    <ListTree className="h-3.5 w-3.5" /> Nodo de Navegación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                                <NavButton label="1.0 Introducción" onClick={() => scrollToSection("intro")} icon={Info} />
                                <NavButton label="2.0 Inicio Rápido" onClick={() => scrollToSection("quick")} icon={Zap} />
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Módulos de Operación</div>
                                {manualModules.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                                <div className="py-4 px-3 text-[7px] font-black uppercase tracking-[0.5em] text-white/20 italic">Innovaciones Tier 2</div>
                                {innovationTier2.map(mod => (
                                    <NavButton key={mod.id} label={mod.title} onClick={() => scrollToSection(mod.id)} icon={mod.icon} />
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* 1.0 Introducción */}
                        <section id="intro" className="space-y-8 scroll-mt-24">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow mb-6"
                            >
                                <Sparkles className="h-3 w-3" /> NODO CENTRAL v2.6.5
                            </motion.div>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">{introSection.title}</h2>
                            <p className="text-xl font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-8">{introSection.text}</p>
                            <Card className="bg-primary/5 border-primary/20 p-8 rounded-[2rem]">
                                <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-2">Misión Institucional</p>
                                <p className="text-lg font-bold italic text-white/90">{introSection.mission}</p>
                            </Card>
                        </section>

                        {/* 2.0 Quick Start */}
                        <section id="quick" className="space-y-12 scroll-mt-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                                <Zap className="h-6 w-6 text-yellow-500" /> 2.0 Guía de Inicio Rápido
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {quickStartSteps.map((item, i) => (
                                    <Card key={i} className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-2xl font-black text-primary/40 italic">{item.step}</span>
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <item.icon className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                        <h4 className="font-black uppercase text-sm mb-2 text-white/90 tracking-widest">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Módulos de Operación */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-primary flex items-center gap-4">
                                <Cpu className="h-6 w-6" /> 3.0 Protocolos Operativos
                            </h3>
                            {manualModules.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-primary" />
                            ))}
                        </div>

                        {/* Innovaciones Tier 2 */}
                        <div className="space-y-24">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-secondary flex items-center gap-4">
                                <Sparkles className="h-6 w-6" /> 4.0 Innovaciones de Vanguardia
                            </h3>
                            {innovationTier2.map(mod => (
                                <ModuleSection key={mod.id} mod={mod} color="text-secondary" />
                            ))}
                        </div>

                        <footer className="pt-20 border-t border-white/5 text-center space-y-6">
                            <Logo className="h-12 w-12 mx-auto opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                                SYSTEM KYRON MASTER PROTOCOL • END OF FILE
                            </p>
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
            className="group w-full text-left px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-between border border-transparent hover:border-primary/20"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />}
                <span>{label}</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
    );
}

function ModuleSection({ mod, color }: { mod: any, color: string }) {
    return (
        <section id={mod.id} className="scroll-mt-24 group">
            <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl transition-all duration-700 hover:border-primary/30">
                <CardHeader className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01]">
                    <div className={cn("p-8 rounded-[3rem] border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700", color === 'text-secondary' ? 'bg-secondary/10' : 'bg-primary/10')}>
                        <mod.icon className={cn("h-12 w-12", color)} />
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                        <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">Protocolo Operativo Verificado</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 flex items-center gap-2">
                            <BookOpen className="h-3 w-3" /> Concepto Fundamental
                        </h4>
                        <p className="text-xl font-bold italic text-white/80 leading-relaxed text-justify">{mod.concept || mod.description}</p>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className={cn("text-[10px] font-black uppercase tracking-[0.6em] mb-8 flex items-center gap-3", color)}>
                            <Terminal className="h-4 w-4" /> Procedimiento de Ejecución
                        </h4>
                        <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-4">
                            {mod.procedure.split('. ').map((step: string, idx: number) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <span className={cn("font-black text-xs", color)}>[{idx + 1}]</span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic border-l-4 border-white/10 pl-6">Arquitectura de Ingeniería</h4>
                        <p className="text-lg font-medium text-white/40 leading-relaxed italic text-justify">{mod.technical || mod.details}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-12 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-3.5 w-3.5" /> SECURE-NODE AUTH
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow">VERIFIED BY MASTER NODE</Badge>
                </CardFooter>
            </Card>
        </section>
    );
}
