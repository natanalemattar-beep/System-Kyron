
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Fingerprint,
    Radio,
    TabletSmartphone,
    ShieldCheck,
    TrendingUp,
    Briefcase,
    Gavel,
    Cpu,
    Recycle,
    HeartHandshake,
    Download,
    Activity,
    Home,
    Sparkles,
    Server,
    Database,
    Zap,
    CheckCircle,
    ChevronRight,
    Lock,
    Scale,
    FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

/**
 * @fileOverview Manual de Usuario Maestro de System Kyron v2.6.5.
 * Documentación técnica ultra-detallada de los 10 módulos operativos.
 * Optimizado para exportación compacta y densa a Microsoft Word (.doc).
 */

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Protocolos de Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales bajo estándares de seguridad militar AES-512.",
        content: [
            {
                sub: "Arquitectura de Validación Biométrica 3D y Prueba de Vida (Liveness Detection)",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía absoluta de la identidad digital. El proceso de enrolamiento despliega un motor de visión artificial de alta precisión que ejecuta un escaneo facial tridimensional exhaustivo, mapeando más de 128 puntos vectoriales únicos y analizando la profundidad geométrica de las facciones. El sistema exige una validación de 'Prueba de Vida' activa, que detecta micro-movimientos involuntarios, reflejos pupilares ante estímulos lumínicos y patrones de parpadeo síncrono para garantizar la imposibilidad técnica de suplantación mediante deepfakes, fotografías de alta resolución o máscaras realistas. Este protocolo cumple rigurosamente con los estándares internacionales de firmas electrónicas avanzadas y niveles de seguridad eIDAS. La base de datos biométrica utiliza un hash unidireccional, lo que significa que el rostro original nunca se almacena, solo su representación matemática cifrada, garantizando la privacidad total del usuario. Este motor es capaz de procesar validaciones en menos de 1.5 segundos incluso en condiciones de baja luminosidad, integrando un algoritmo de compensación espectral infrarroja."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles y Entropía de Cifrado AES-512",
                text: "Los documentos maestros, tales como Cédulas de Identidad, registros de RIF y Pasaportes, se someten a un proceso de fragmentación digital y cifrado distribuido bajo el estándar AES-512 (Advanced Encryption Standard). La arquitectura de 'Zero Knowledge' asegura que los datos permanezcan cifrados y sean inaccesibles para el nodo de red general hasta que el titular legítimo inicie una secuencia de autenticación exitosa mediante su clave privada biométrica. Cada activo depositado cuenta con un sellado de tiempo (Timestamping) basado en el protocolo RFC 3161, permitiendo la portabilidad legal completa y verificable mediante códigos QR dinámicos de un solo uso. Esto elimina radicalmente la vulnerabilidad intrínseca de los soportes físicos frente al deterioro, extravío o falsificación. Además, el sistema permite la delegación controlada de acceso para trámites específicos, donde el usuario puede otorgar permisos temporales de lectura a entes autorizados sin entregar copias físicas de su información sensible. El motor de búsqueda en la bóveda utiliza indexación por metadatos anonimizados, permitiendo una recuperación instantánea de documentos sin comprometer el contenido cifrado del archivo original."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y Aprovisionamiento eSIM",
        icon: Radio,
        description: "Administración de redes de ultra-baja latencia y aprovisionamiento digital remoto bajo estándares GSMA.",
        content: [
            {
                sub: "Protocolo de Aprovisionamiento Dinámico de eSIM (GSMA SM-DP+)",
                text: "Kyron integra un servidor de aprovisionamiento remoto certificado que permite la generación e instalación instantánea de perfiles eSIM en dispositivos compatibles. Tras la validación de la identidad biométrica, el sistema empaqueta las credenciales de red de forma segura y las inyecta en el chip embebido (eUICC) del terminal del usuario final. Este proceso elimina la necesidad de tarjetas SIM físicas, permitiendo la activación de líneas de voz y datos 5G en cuestión de milisegundos. El sistema facilita la gestión remota masiva de flotas corporativas (Bulk Provisioning), permitiendo el despliegue de políticas de conectividad personalizadas sin intervención física sobre el hardware. La seguridad del enlace se garantiza mediante el protocolo de autenticación mutua EAP-AKA, protegiendo las llaves de cifrado contra intentos de clonación o interceptación durante la descarga del perfil. El sistema soporta además el cambio de operador sin cambio de hardware, permitiendo una redundancia geográfica total para equipos de misión crítica desplegados en campo."
            },
            {
                sub: "Arquitectura de Red Core 5G y Conectividad de Misión Crítica",
                text: "La infraestructura de telecomunicaciones opera sobre una red core virtualizada de última generación con una latencia de extremo a extremo inferior a 10 milisegundos, parámetro esencial para la sincronización de bases de datos financieras y transaccionales en tiempo real. El sistema gestiona troncales SIP (Session Initiation Protocol) para servicios de voz sobre IP de alta definición, permitiendo el despliegue de centrales telefónicas virtuales con capacidades de enrutamiento inteligente basado en IA, respuesta de voz interactiva (IVR) y grabación encriptada de llamadas para auditoría legal. Toda la transmisión de datos se encuentra encapsulada en túneles VPN con cifrado IPsec de grado bancario, protegiendo la integridad de la comunicación corporativa contra ataques de interceptación (Man-in-the-Middle) y garantizando la continuidad operativa en escenarios de alta congestión de red urbana mediante técnicas de Network Slicing. El monitoreo NOC (Network Operations Center) está integrado directamente en la consola de mando, permitiendo visualizar la salud de cada enlace en tiempo real."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inteligencia de Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal adaptativa y validación síncrona de registros corporativos.",
        content: [
            {
                sub: "Motores de Validación Fiscal Síncrona y Cumplimiento de Providencias",
                text: "Al procesar una transacción, el motor de inteligencia fiscal de Kyron valida instantáneamente la Razón Social y la condición de contribuyente ante los registros oficiales del SENIAT al ingresar el RIF del cliente. Este protocolo de validación síncrona garantiza que el 100% de los documentos emitidos (Facturas, Notas de Débito/Crédito) cumplan estrictamente con la Providencia Administrativa SNAT/2011/0071. El sistema automatiza el cálculo y aplicación del IGTF (Impuesto a las Grandes Transacciones Financieras) detectando automáticamente la moneda del pago (VES, USD, EUR) y aplicando la alícuota correspondiente. Además, el TPV está integrado con impresoras fiscales homologadas, enviando los comandos de impresión bajo protocolos seguros para evitar la alteración de los registros de la memoria fiscal física del equipo, manteniendo una integridad inalterable en el libro de ventas digital. El sistema maneja múltiples alícuotas de IVA de forma simultánea, permitiendo facturar productos exentos, generales y de lujo en un mismo documento sin errores de redondeo decimal."
            },
            {
                sub: "Gestión de Inventario Multipunto y Kardex de Precisión Algorítmica",
                text: "El control de existencias opera bajo una arquitectura de Kardex perpetuo con actualizaciones en tiempo real tras cada factura emitida. Cada SKU (Stock Keeping Unit) cuenta con trazabilidad absoluta mediante números de serie o lotes, permitiendo la aplicación de métodos de valoración técnica tales como Promedio Ponderado o FIFO (First In, First Out), ajustados a las normativas contables VEN-NIF. La interfaz gestiona depósitos múltiples y sucursales distribuidas geográficamente, donde cada movimiento de mercancía (traslados, ajustes por merma, recepciones de proveedores) es validado mediante protocolos de escaneo QR y firmas digitales de responsables. El sistema genera alertas proactivas sobre niveles de stock crítico y sugiere cantidades de pedido óptimas basándose en el análisis predictivo de la demanda histórica y los tiempos de entrega de proveedores, optimizando drásticamente el capital de trabajo. La integración con lectores de código de barras industriales permite realizar tomas físicas de inventario en tiempos récord, comparando automáticamente el stock físico con el teórico y generando reportes de diferencias listos para el ajuste contable."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Protocolos de Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y vigilancia normativa continua basada en inteligencia artificial.",
        content: [
            {
                sub: "Motor de Auditoría Preventiva 24/7 y Conciliación Fiscal Automatizada",
                text: "System Kyron neutraliza cualquier vulnerabilidad administrativa mediante un motor de auditoría preventiva que cruza sistemáticamente los ingresos declarados con los movimientos bancarios efectivos y el libro de ventas digital. El sistema genera de forma autónoma los Libros de Compras y Ventas mensuales, exportando archivos en formatos XML y TXT con la estructura exacta requerida por el portal fiscal nacional. Nuestra IA ejecuta 'Pruebas de Coherencia' que detectan discrepancias en decimales, fechas de retención o números de control, permitiendo al departamento contable realizar ajustes antes de que ocurra cualquier fiscalización oficial. Este enfoque proactivo reduce el riesgo de sanciones pecuniarias o cierres temporales a niveles estadísticamente insignificantes, proporcionando una capa de protección jurídica inestimable para los directivos de la empresa. El sistema archiva digitalmente cada comprobante de retención, permitiendo su recuperación inmediata ante cualquier requerimiento de la administración tributaria."
            },
            {
                sub: "Automatización del Reajuste por Inflación Fiscal (RIPF) y Diferidos",
                text: "Dada la complejidad del entorno económico, el sistema carga diariamente los índices INPC (Índice Nacional de Precios al Consumidor) publicados por el Banco Central de Venezuela. El módulo identifica automáticamente las partidas no monetarias del Balance General (Inventarios, Propiedades, Planta y Equipo, Patrimonio) y aplica los factores de corrección actuariales correspondientes de acuerdo a la Ley de Impuesto Sobre la Renta (LISLR). El sistema genera los asientos contables de ajuste de forma impecable y calcula automáticamente el impuesto diferido. Este procedimiento protege el patrimonio real de la organización contra la erosión fiscal y proporciona un sustento técnico inatacable ante inspecciones del SENIAT, garantizando que el cálculo de las ganancias o pérdidas monetarias sea matemáticamente exacto y legalmente sólido. El motor RIPF está configurado para manejar cierres de ejercicio fiscal en cualquier mes del año, adaptándose a la planificación específica de la corporación."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y Análisis de Factibilidad",
        icon: TrendingUp,
        description: "Dashboard de mando ejecutivo para la toma de decisiones basada en analítica predictiva y modelado financiero avanzado.",
        content: [
            {
                sub: "Modelado de Inversiones y Análisis de Sensibilidad Financiera (VAN/TIR)",
                text: "El sistema dota a la alta gerencia de herramientas avanzadas para la evaluación de proyectos de capital, permitiendo calcular indicadores de rentabilidad como el Valor Actual Neto (VAN) y la Tasa Interna de Retorno (TIR) en tiempo real. El simulador financiero permite crear escenarios multivariables alterando parámetros críticos como costos de insumos, fluctuación de la tasa cambiaria y variaciones en el volumen de ventas. Este análisis de sensibilidad proporciona una base científica rigurosa para la aprobación de planes de expansión o adquisiciones, permitiendo visualizar el periodo de recuperación de la inversión (Payback) y el margen de seguridad operativa. Los informes generados cuentan con un diseño de grado ejecutivo, ideal para presentaciones ante juntas directivas o instituciones financieras para la solicitud de líneas de crédito. Cada escenario puede ser guardado y comparado, permitiendo una trazabilidad estratégica de la visión corporativa a largo plazo."
            },
            {
                sub: "Conciliación Bancaria Inteligente y Tesorería Multimoneda",
                text: "Gestiona la tesorería corporativa en múltiples divisas bajo las tasas oficiales del BCV. El protocolo de conciliación inteligente utiliza algoritmos de coincidencia de patrones para vincular automáticamente transferencias entrantes y pagos móviles con sus facturas correspondientes. Detecta duplicidades, pagos parciales y errores en referencias bancarias, asegurando que la disponibilidad de fondos reportada sea un espejo exacto de la realidad bancaria. Este módulo optimiza el flujo de caja operativo (Cash Flow) y reduce el tiempo administrativo de conciliación en un 85%. Además, integra un sistema de alertas para pagos programados a proveedores y obligaciones tributarias, evitando cargos por mora y manteniendo una relación saludable con la cadena de suministro. El motor de tesorería soporta la integración vía API con las principales entidades bancarias para la descarga automatizada de estados de cuenta."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento Humano y Nómina LOTTT",
        icon: Briefcase,
        description: "Administración integral del capital humano con cumplimiento estricto de la legislación laboral y parafiscal venezolana.",
        content: [
            {
                sub: "Motor de Cálculo de Nómina Automatizado y Liquidaciones Técnicas",
                text: "Kyron integra la lógica jurídica completa de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) para automatizar el cálculo de salarios integrales, bonificaciones nocturnas, horas extras y deducciones obligatorias (IVSS, SPF, FAOV). Genera recibos de pago digitales con validez probatoria y resguarda el historial remunerativo de cada colaborador en el Ledger inmutable. El sistema gestiona automáticamente el cálculo de las prestaciones sociales, manteniendo actualizado el fondo de garantía de antigüedad y generando proyecciones de pasivos laborales para el balance financiero. En caso de desvinculación, el módulo genera el finiquito de liquidación detallado, asegurando que todos los conceptos legales sean cancelados correctamente, mitigando riesgos de demandas laborales por errores de cálculo. El motor permite configurar turnos rotativos complejos y gestionar incidencias como ausencias justificadas o permisos médicos vinculados al IVSS."
            },
            {
                sub: "Gestión de Solvencias y Control de Registros Parafiscales (TIUNA/FAOV)",
                text: "El módulo laboral actualiza de forma autónoma los libros legales de vacaciones, horas extras y registros de personal retirado. Gestiona las retenciones y aportes patronales, generando archivos de carga masiva para los portales institucionales del IVSS y BANAVIH. Este nivel de automatización garantiza que la organización mantenga sus solvencias laborales al día, factor crítico para la participación en licitaciones y el mantenimiento de una imagen corporativa responsable. El sistema también permite la gestión de perfiles de cargos, evaluaciones de desempeño y planes de formación, vinculando el crecimiento del talento con los objetivos estratégicos de la organización, todo centralizado en un expediente digital único por empleado. La integración con el módulo jurídico permite que los contratos de trabajo sean firmados digitalmente por ambas partes, sellando la relación laboral con transparencia absoluta desde el primer día."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico y Control de Poderes",
        icon: Gavel,
        description: "Control centralizado de expedientes, contratos inteligentes y vigilancia de la representación legal corporativa.",
        content: [
            {
                sub: "Gestión de Ciclo de Vida de Contratos (CLM) y Firmas Digitales Biométricas",
                text: "Centraliza la redacción, revisión y firma de todos los instrumentos legales de la empresa (contratos de servicios, acuerdos de confidencialidad, alianzas) mediante un repositorio de plantillas visadas por el equipo jurídico. El sistema de control de versiones registra cada modificación en el Ledger, garantizando la trazabilidad histórica de los acuerdos. La integración con la Identidad Digital permite que solo los apoderados autorizados firmen biométricamente los documentos, otorgándoles una capa de seguridad técnica superior a la firma tradicional y eliminando el riesgo de manipulación. El módulo también gestiona el flujo de aprobaciones internas, asegurando que ningún contrato sea firmado sin la debida revisión de los departamentos involucrados (Legal, Finanzas, Operaciones). Cada documento firmado genera un certificado de integridad que puede ser verificado públicamente por terceros interesados sin revelar el contenido sensible del contrato."
            },
            {
                sub: "Vigilancia de Vencimientos de Activos Legales y Poderes Notariados",
                text: "Genera alertas inteligentes y escalables antes del vencimiento de poderes de representación, registros de marcas ante el SAPI, patentes de invención o habilitaciones de telecomunicaciones. Este sistema de alerta temprana permite al departamento legal coordinar renovaciones ante registros mercantiles y notarías públicas con antelación suficiente, evitando la paralización de gestiones comerciales por falta de vigencia en la representación. El sistema también permite la gestión de expedientes judiciales, centralizando las actuaciones, citaciones y sentencias asociadas a la empresa, facilitando la coordinación con abogados externos y manteniendo a la directiva informada sobre el estatus de cualquier litigio o proceso legal en curso. El repositorio legal admite el archivo de escrituras, títulos de propiedad y actas de asamblea con indexación avanzada por palabras clave y categorías de derecho."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería, Arquitectura y Planificación IA",
        icon: Cpu,
        description: "Herramientas de fotogrametría automatizada y cómputos métricos integrados con motores de visión artificial.",
        content: [
            {
                sub: "Fotogrametría Digital y Generación de Planos Vectoriales Automatizada",
                text: "Este módulo avanzado permite digitalizar espacios físicos de forma remota mediante el procesamiento de imágenes de alta resolución capturadas con dispositivos móviles u otros sensores. El motor de visión artificial identifica geometrías, muros y aberturas, escalando el espacio automáticamente al detectar un patrón de referencia conocido. El resultado es un plano arquitectónico vectorial que sirve como base técnica para proyectos de remodelación, expansión de sucursales o auditoría de activos fijos inmuebles. Esta tecnología reduce drásticamente los costos y tiempos asociados a levantamientos técnicos manuales, permitiendo a la empresa mantener un inventario digital exacto de su infraestructura física distribuida. Los planos generados son exportables en formatos industriales (DWG, PDF) para su integración en sistemas CAD tradicionales, manteniendo una precisión milimétrica validada algorítmicamente."
            },
            {
                sub: "Cómputos Métricos y Análisis de Precios Unitarios (APU) Dinámicos",
                text: "Vincula los planos generados con una base de datos de materiales y mano de obra para realizar cómputos métricos de alta precisión. Genera presupuestos de ingeniería dinámicos que validan los costos proyectados contra el mercado real de proveedores registrados en el ecosistema. Este nivel de integración asegura que las obras civiles o despliegues tecnológicos de la empresa se mantengan dentro de los márgenes financieros presupuestados, alertando sobre desviaciones en el consumo de materiales o rendimientos de ejecución mediante dashboards de control de obra en tiempo real. El sistema permite la exportación de presupuestos técnicos detallados listos para licitaciones o solicitudes de financiamiento bancario. El motor APU gestiona automáticamente el cálculo de desperdicios, rendimientos por jornada y leyes sociales asociadas a la construcción, garantizando un presupuesto 100% auditable y financieramente viable."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Economía Circular Magnética",
        icon: Recycle,
        description: "Operatividad de infraestructura verde y monetización de residuos mediante tecnología de inducción síncrona.",
        content: [
            {
                sub: "Sensores de Inducción Magnética en Smart Bins y Clasificación IA",
                text: "Kyron implementa estaciones de reciclaje inteligentes dotadas de sensores de inducción magnética que detectan la firma electromagnética única de los materiales depositados. El sistema clasifica de forma autónoma metales ferrosos de polímeros plásticos PET, garantizando una pureza del residuo recolectado superior al 99%. Esta tecnología de hardware propietario asegura que la cadena de suministro de economía circular se inicie con datos de alta fidelidad, permitiendo a la empresa certificar sus procesos de sostenibilidad ante organismos internacionales mediante reportes auditables. Los contenedores están conectados al nodo central, informando sobre niveles de llenado y optimizando las rutas de recolección logística mediante el análisis de telemetría constante. El sistema de compactación interna se activa automáticamente al alcanzar umbrales de densidad preestablecidos, maximizando la capacidad de almacenamiento por estación."
            },
            {
                sub: "Tokenización de Impacto: Eco-Créditos y Reportes ESG Corporativos",
                text: "Cada acción de reciclaje verificada por el hardware se traduce en activos digitales denominados 'Eco-Créditos', los cuales son transferidos instantáneamente a la billetera digital del colaborador o cliente. Para las organizaciones, el sistema consolida estos datos para generar Reportes ESG (Environmental, Social, and Governance) de alta fidelidad. Estos documentos certifican la reducción real de la huella de carbono de la empresa mediante una traza de datos inalterable respaldada por el Blockchain institucional. Esto no solo mejora el scoring crediticio y la reputación de marca ante inversores, sino que permite a la empresa participar en mercados de bonos de carbono y cumplir con normativas ambientales internacionales emergentes. El dashboard de sostenibilidad permite visualizar en tiempo real el ahorro en emisiones de CO2, agua y energía eléctrica derivado de la recuperación de materiales procesados por el ecosistema."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y Protección LOPNNA",
        icon: HeartHandshake,
        description: "Servicios civiles integrales y cumplimiento de obligaciones familiares bajo el marco legal de protección al menor.",
        content: [
            {
                sub: "Bóveda Civil y Portabilidad de Salud Inteligente para Colaboradores",
                text: "El portal ciudadano centraliza copias certificadas de documentos vitales (Partidas de Nacimiento, Actas de Matrimonio) bajo el control exclusivo del titular mediante su identidad biométrica. Adicionalmente, integra un módulo de salud inteligente donde el historial médico básico, alergias y tipos de sangre son portátiles y accesibles en emergencias mediante un código QR seguro. Este enfoque pone la soberanía de la información en manos del individuo, simplificando trámites personales ante organismos públicos y asegurando una respuesta médica informada en cualquier nodo de la red de salud afiliada. Las empresas pueden ofrecer este módulo como un beneficio adicional para sus empleados, promoviendo el bienestar y la organización familiar mediante una gestión digital eficiente de sus activos personales y de salud. El historial clínico reside encriptado y solo se desencripta ante la lectura de personal médico autorizado o el titular."
            },
            {
                sub: "Calculadora de Manutención Técnica y Asistente RIF para Menores",
                text: "Simplifica el cumplimiento de las responsabilidades familiares establecidas en la LOPNNA mediante una calculadora técnica basada en unidades tributarias, ingresos documentados y necesidades específicas del menor. El asistente de RIF para menores automatiza el llenado de los formularios oficiales del SENIAT, facilitando la inscripción de los hijos como carga familiar para la obtención de rebajas fiscales en el ISLR. Este módulo promueve la formalidad legal desde el núcleo familiar, asegurando el resguardo de los derechos patrimoniales y sucesorios de los menores de edad, facilitando gestiones bancarias y notariales necesarias para su futuro económico bajo la supervisión de sus representantes legales autorizados. El sistema emite constancias de cumplimiento que pueden ser presentadas ante tribunales de protección, garantizando una traza de pagos y acuerdos inalterable."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("identidad");

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            setActiveTab(id);
        }
    };

    const handleDownload = () => {
        let docContent = "";
        
        docContent += `
            <div style="border-bottom: 2pt solid #2d5a8e; margin-bottom: 20pt; padding-bottom: 10pt;">
                <table style="width: 100%; border: none;">
                    <tr>
                        <td style="width: 50pt; border: none;">
                            <div style="background-color: #2d5a8e; color: white; width: 45pt; height: 45pt; text-align: center; line-height: 45pt; font-weight: bold; font-size: 20pt; border-radius: 5pt;">K</div>
                        </td>
                        <td style="border: none; vertical-align: middle;">
                            <h1 style="color: #2d5a8e; margin: 0; font-size: 22pt; font-family: 'Arial', sans-serif; font-weight: bold; text-transform: uppercase;">SYSTEM KYRON</h1>
                            <p style="color: #64748b; margin: 0; font-size: 8pt; font-weight: bold; text-transform: uppercase;">Manual de Usuario Maestro v2.6.5</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-bottom: 20pt; border-left: 8pt solid #2d5a8e; padding-left: 15pt; background-color: #f8fafc; padding-top: 10pt; padding-bottom: 10pt;">
                <h2 style="color: #1e293b; font-size: 16pt; margin: 0; font-family: 'Arial', sans-serif; text-transform: uppercase;">DOCUMENTACIÓN TÉCNICA INTEGRAL</h2>
                <p style="font-style: italic; color: #475569; margin-top: 3pt; font-size: 10pt;">Consolidado de protocolos operativos de misión crítica.</p>
            </div>
        `;

        manualModules.forEach(mod => {
            docContent += `
                <div style="margin-top: 15pt; margin-bottom: 15pt;">
                    <h2 style="color: #2d5a8e; text-transform: uppercase; border-bottom: 1.5pt solid #e2e8f0; padding-bottom: 5pt; margin-bottom: 10pt; font-size: 14pt; font-family: 'Arial', sans-serif; font-weight: bold;">${mod.title}</h2>
                    <p style="font-weight: bold; color: #334155; margin-bottom: 10pt; font-size: 9pt; text-transform: uppercase; font-family: 'Arial', sans-serif; background-color: #f1f5f9; padding: 6pt;">${mod.description}</p>
            `;
            
            mod.content.forEach(item => {
                docContent += `
                    <div style="margin-bottom: 12pt; padding: 10pt; border: 0.5pt solid #f1f5f9;">
                        <h3 style="color: #1e293b; font-size: 11pt; margin-bottom: 6pt; border-left: 3pt solid #2d5a8e; padding-left: 10pt; font-family: 'Arial', sans-serif; text-transform: uppercase; font-weight: bold;">${item.sub}</h3>
                        <p style="text-align: justify; line-height: 1.5; font-size: 10.5pt; color: #334155; font-family: 'Times New Roman', serif;">${item.text}</p>
                    </div>
                `;
            });
            
            docContent += `</div>`;
        });

        const footer = `
            <div style="margin-top: 30pt; border-top: 1.5pt solid #2d5a8e; padding-top: 15pt; text-align: center; font-size: 7.5pt; color: #94a3b8; font-family: 'Arial', sans-serif;">
                <p style="text-transform: uppercase;">SYSTEM KYRON, C.A. • RIF: J-12345678-9 • DOCUMENTO DE GRADO CORPORATIVO</p>
                <p style="margin-top: 3pt;">PROPIEDAD INTELECTUAL RESERVADA • © 2026 • ID EXPEDIENTE: SK-MASTER-MANUAL-2.6.5</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual System Kyron</title></head><body style='padding: 20pt; background-color: #ffffff;'>";
        const finalSource = headerHtml + docContent + footer + "</body></html>";

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(finalSource);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = source;
        link.download = "Manual_Usuario_System_Kyron_v2.6.5.doc";
        link.click();
        document.body.removeChild(link);

        toast({
            title: "DESCARGA MAESTRA INICIADA",
            description: "El manual técnico exhaustivo se está exportando a Word.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid selection:bg-primary/20">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-full h-[1200px] bg-primary/5 rounded-full blur-[200px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-[180px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            {/* Header Fijo */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-16 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-12 justify-between no-print">
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:scale-105 transition-transform">
                        <Logo className="h-8 w-8 shadow-glow" />
                    </Link>
                    <div className="flex flex-col border-l border-white/10 pl-4 ml-1">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual Maestro v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" asChild className="rounded-xl h-9 px-4 text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
                        <Link href="/"><Home className="mr-2 h-3 w-3" /> INICIO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-9 px-6 rounded-xl text-[8px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" /> EXPORTAR WORD (.DOC)
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-24 pb-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Navegación Lateral (HUD Table of Contents) */}
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-24 space-y-6">
                            <Card className="glass-card p-6 rounded-[2rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                                <CardHeader className="p-0 mb-6 border-b border-white/5 pb-4">
                                    <CardTitle className="text-[9px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                                        <Activity className="h-3.5 w-3.5" /> Protocolos Maestros
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-0.5">
                                    {manualModules.map((mod) => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => scrollToSection(mod.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all text-left group",
                                                activeTab === mod.id ? "bg-primary/10 text-primary border border-primary/20 shadow-glow" : "text-white/30 hover:text-white/60 hover:bg-white/5 border border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-1 w-1 rounded-full transition-all shadow-glow",
                                                activeTab === mod.id ? "bg-primary" : "bg-white/10 group-hover:bg-white/30"
                                            )} />
                                            <span>{mod.title.split('. ')[1]}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-primary/5 border-primary/20 p-5 rounded-[1.5rem]">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/80 leading-none">Inteligencia de Soporte</p>
                                        <p className="text-[8px] font-bold text-white/30 leading-relaxed uppercase italic">Asistencia técnica sobre protocolos de red o cifrado activa.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.section 
                            className="space-y-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
                                <ShieldCheck className="h-3 w-3" /> MASTER USER GUIDE v2.6.5
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
                                Manual de Usuario de System Kyron
                            </h1>
                            <p className="text-base text-white/40 max-w-xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-8 leading-relaxed">
                                Documentación técnica exhaustiva para la operatividad del ecosistema integral de gestión administrativa, fiscal y telecomunicaciones.
                            </p>
                        </motion.section>

                        {manualModules.map((mod, index) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id} 
                                className="scroll-mt-24"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-700 hover:border-primary/20">
                                    <CardHeader className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row items-center gap-8 bg-white/[0.01]">
                                        <div className="relative">
                                            <div className="p-6 bg-primary/10 rounded-[2rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform relative z-10">
                                                <mod.icon className="h-10 w-10 text-primary" />
                                            </div>
                                            <div className="absolute -top-3 -right-3 z-20">
                                                <Logo className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-center md:text-left">
                                            <CardTitle className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 md:p-10 space-y-12">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-6 group/item">
                                                <div className="flex items-center gap-6">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic whitespace-nowrap">{item.sub}</h4>
                                                    <div className="h-[1px] flex-1 bg-white/5 group-hover/item:bg-primary/20 transition-colors" />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-6 top-0 bottom-0 w-[1.5px] bg-primary/10 group-hover/item:bg-primary/40 transition-colors rounded-full" />
                                                    <p className="text-base font-medium text-white/60 leading-relaxed text-justify italic">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-6 border-t border-white/5 flex justify-center bg-white/[0.01] gap-6">
                                        <div className="flex items-center gap-2">
                                            <Server className="h-3 w-3 text-white/20" />
                                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/20">Operational Status: Optimal</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Database className="h-3 w-3 text-white/20" />
                                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/20">Data Integrity: Verified</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </main>
            
            <footer className="py-16 border-t border-white/5 bg-black/80 text-center relative z-20">
                <div className="mb-6 opacity-20 hover:opacity-50 transition-opacity">
                    <Logo className="h-10 w-10 mx-auto" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic">
                    SYSTEM KYRON • MASTER USER MANUAL • MK-2.6.5 • 2026
                </p>
            </footer>
        </div>
    );
}
