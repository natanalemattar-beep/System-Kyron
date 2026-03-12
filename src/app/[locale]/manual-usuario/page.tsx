
"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Gavel, 
  Users, 
  Cpu, 
  Terminal,
  ChevronRight,
  Lock,
  Search,
  FileText,
  Activity,
  Network,
  Database,
  BrainCircuit,
  Fingerprint,
  Smartphone,
  Recycle,
  Coins,
  Scale,
  Calculator,
  Target,
  BarChart3,
  Globe,
  Briefcase,
  Award,
  AlertTriangle,
  Landmark,
  School,
  Download,
  Printer,
  ChevronLeft,
  Loader2,
  CheckCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Manual de Usuario Maestro v2.6.5 - Versión de Alta Densidad.
 * Documento técnico expandido para cubrir 20 capítulos con detalle profundo.
 */

const chapters = [
  {
    id: "vision",
    title: "01. Visión y Propósito del Ecosistema Kyron",
    icon: Target,
    content: `System Kyron no es simplemente un software de gestión; es un nodo de inteligencia operativa diseñado para la soberanía tecnológica y financiera en entornos de alta volatilidad. Su arquitectura nace de la necesidad de fusionar la gestión administrativa tradicional con tecnologías de tercera generación (Web3, AI, 5G) para erradicar el riesgo operativo y fiscal en el sector privado. 

La filosofía del ecosistema se basa en la "Integridad Total", donde cada dato inyectado al sistema es verificado, sellado y protegido. A largo plazo, Kyron busca estandarizar la economía digital regional, proporcionando a las empresas las herramientas necesarias para competir a escala global manteniendo un cumplimiento normativo impecable.`,
    details: [
      "Misión Crítica: Garantizar la integridad de los activos digitales y registros contables al 100% mediante auditoría continua por IA.",
      "Visión 2030: Liderar la transformación hacia un modelo de economía circular y finanzas inmutables en América Latina.",
      "Hoja de Ruta: Expansión de nodos de conectividad 5G y despliegue masivo de terminales inteligentes para recolección sostenible.",
      "Impacto Regional: Fomento de la transparencia fiscal y reducción de la burocracia mediante la automatización de procesos notariales y mercantiles."
    ]
  },
  {
    id: "security",
    title: "02. Protocolos de Acceso y Seguridad de Nodo",
    icon: Lock,
    content: `La seguridad en System Kyron es un compromiso innegociable. El sistema emplea un esquema de seguridad Zero-Knowledge (Conocimiento Cero), lo que significa que ni siquiera los administradores de la infraestructura tienen acceso a la información sensible de las empresas sin la autorización biométrica del titular. 

Cada sesión es protegida por un túnel IPsec dinámico y la autenticación se realiza mediante una combinación de llaves criptográficas asimétricas y patrones biométricos 3D. El acceso está rígidamente segmentado por 'Tiers' de autorización, donde cada usuario solo puede interactuar con los nodos que corresponden a su rol certificado en el organigrama del holding.`,
    details: [
      "Cifrado AES-XTS-512: Los datos en reposo y en tránsito son procesados con el estándar de cifrado más robusto disponible actualmente.",
      "Autenticación Multifactor (MFA): Implementación obligatoria de TOTP y validación de hardware para transacciones de nivel 4 y 5.",
      "Monitoreo de Anomalías: Algoritmos de IA detectan patrones de acceso inusuales y bloquean el nodo preventivamente ante sospechas de brecha.",
      "Registro de Auditoría: Todas las interacciones quedan grabadas en un ledger inmutable, proporcionando una cadena de custodia forense."
    ]
  },
  {
    id: "accounting",
    title: "03. Automatización Contable VEN-NIF Pro",
    icon: Calculator,
    content: `El motor contable de Kyron ha sido desarrollado bajo los lineamientos más estrictos de las Normas de Información Financiera de Venezuela (VEN-NIF). El sistema automatiza el 90% de los asientos diarios mediante la integración con el punto de venta y la facturación de servicios. 

La funcionalidad maestra es el Ajuste por Inflación Fiscal (RIPF) y Financiero. Kyron se conecta diariamente con el Banco Central de Venezuela para obtener los índices de precios y las tasas de cambio oficiales, ejecutando el cierre mensual de forma autónoma. Esto permite que el balance refleje la situación económica real de la entidad, separando con precisión las partidas monetarias de las no monetarias para una toma de decisiones informada.`,
    details: [
      "Consolidación Multimoneda: Gestión simultánea de libros en VES y USD, con conversión automática bajo normativa cambiaria vigente.",
      "Emisión de Estados Financieros: Generación instantánea de Estado de Resultados, Balance General y Flujo de Efectivo Consolidado.",
      "Automatización de Conciliación: Sincronización con extractos bancarios para el emparejamiento automático de transacciones.",
      "Control de Centros de Costos: Segmentación analítica por departamento, sucursal o proyecto para un control detallado de la rentabilidad."
    ]
  },
  {
    id: "taxes",
    title: "04. Blindaje Fiscal y Cumplimiento SENIAT",
    icon: ShieldCheck,
    content: `El módulo Zero Risk es el escudo definitivo ante fiscalizaciones. La inteligencia artificial de Kyron actúa como un pre-auditor que revisa cada documento antes de su emisión o registro. El sistema valida el estatus del RIF de clientes y proveedores, verifica la correlación de números de control y asegura que la base imponible y el cálculo de IVA sean exactos según la Providencia 0071.

Este blindaje previene el 100% de las multas por errores formales. Al final de cada periodo, el sistema genera automáticamente el archivo .txt para el portal del SENIAT, listo para ser cargado, eliminando el estrés del cierre fiscal y garantizando una paz jurídica total para la empresa.`,
    details: [
      "Libros de Compra y Venta: Registros digitales sellados y foliados automáticamente según requerimientos de ley.",
      "Declaración de ISLR: Cálculo de la declaración estimada y definitiva basado en los ingresos reales certificados por el sistema.",
      "Control de IGTF: Cálculo y discriminación automática del Impuesto a las Grandes Transacciones Financieras en pagos multimoneda.",
      "Retenciones: Emisión inmediata de comprobantes de retención de IVA e ISLR al momento del pago a proveedores."
    ]
  },
  {
    id: "hr",
    title: "05. Gestión de Talento y Cultura (LOTTT)",
    icon: Users,
    content: `La gestión del capital humano en Kyron está diseñada para cumplir con la Ley Orgánica del Trabajo (LOTTT) sin fricciones. El sistema gestiona el ciclo de vida completo del trabajador: desde la publicación de vacantes filtradas por IA hasta el cálculo del finiquito. 

La nómina se procesa en segundos, integrando de forma nativa los beneficios sociales como Cestaticket, utilidades y bono vacacional. Además, el sistema lleva un registro histórico de las prestaciones sociales, permitiendo al trabajador consultar su acumulado en tiempo real a través del portal de autoservicio, fomentando una cultura de transparencia y confianza.`,
    details: [
      "Cálculo de Prestaciones: Algoritmo de liquidación que procesa años de servicio y últimos salarios en menos de 3 milisegundos.",
      "Control de Asistencia: Integración con telemetría móvil y reconocimiento facial para el registro de jornadas diurnas y nocturnas.",
      "Gestión de Vacaciones: Calendario inteligente que notifica los periodos vencidos y pendientes para evitar acumulaciones excesivas.",
      "Archivo de Personal: Expediente digital con resguardo de contratos, notificaciones de riesgo y solvencias laborales."
    ]
  },
  {
    id: "legal",
    title: "06. Bóveda Jurídica y Gestión de Contratos",
    icon: Gavel,
    content: `Kyron transforma el departamento legal en un centro de eficiencia. Nuestra IA legal ha sido entrenada con miles de modelos de contratos y jurisprudencia venezolana para generar borradores profesionales en segundos. 

Los documentos no solo se generan, sino que se custodian en una bóveda digital protegida por blockchain. Cada contrato firmado recibe un sellado de tiempo RFC 3161, lo que constituye una prueba de existencia inatacable ante cualquier tribunal o registro. El sistema también monitorea los vencimientos de poderes de representación y juntas directivas, emitiendo alertas para evitar el cese de facultades legales en momentos críticos.`,
    details: [
      "Generador de Instrumentos: Redacción de NDAs, contratos de servicios, compraventas y actas de asamblea con lenguaje jurídico formal.",
      "Control de Poderes: Seguimiento detallado de facultades de administración y disposición otorgadas ante registros y notarías.",
      "Indexación por Expediente: Clasificación de documentos según números de expediente judicial o administrativo (SAREN/SAPI).",
      "Auditoría Legal: Evaluación periódica del estatus de marcas y patentes registradas por la entidad."
    ]
  },
  {
    id: "telecom",
    title: "07. Infraestructura 5G y eSIM Digital",
    icon: Radio,
    content: `La conectividad es el sistema nervioso del ecosistema. Kyron opera como un orquestador de servicios de telecomunicaciones convergentes, permitiendo a las empresas gestionar su propia flota de comunicaciones móviles. 

Mediante el aprovisionamiento remoto de eSIM (eUICC), un administrador puede asignar números y planes de datos a su personal sin necesidad de tarjetas físicas. El sistema utiliza tecnología de Network Slicing para garantizar que el tráfico de datos de las aplicaciones administrativas críticas (como el TPV o la contabilidad) tenga prioridad absoluta en la red, asegurando la continuidad del negocio incluso en zonas de alta congestión de red.`,
    details: [
      "Aprovisionamiento SM-DP+: Gestión de suscripciones digitales siguiendo estándares internacionales de la GSMA.",
      "Control de Consumo: Visualización en tiempo real del uso de datos y minutos por cada línea vinculada al nodo corporativo.",
      "Redes Privadas (VPN): Configuración automática de túneles seguros para el acceso a la intranet empresarial desde dispositivos móviles.",
      "Recarga Masiva: Proceso centralizado de pago de servicios para todas las líneas de la organización."
    ]
  },
  {
    id: "pos",
    title: "08. Punto de Venta (TPV) Inteligente",
    icon: Smartphone,
    content: `El TPV de Kyron ha sido diseñado para la velocidad y la precisión en el cobro. La interfaz es intuitiva y táctil, permitiendo a los cajeros procesar ventas complejas en segundos. 

El sistema está plenamente integrado con el inventario y el motor fiscal. Al realizar una venta, el sistema valida automáticamente el RIF del cliente contra la base de datos centralizada, calcula el IVA correspondiente y, si es el caso, el IGTF. El cobro puede realizarse en múltiples métodos de pago de forma simultánea, desde efectivo y tarjetas hasta Pago Móvil y criptoactivos, con una conciliación inmediata en el arqueo de caja.`,
    details: [
      "Facturación Fiscal Homologada: Conexión directa con impresoras fiscales certificadas por el SENIAT.",
      "Modo Offline: Capacidad de registrar ventas sin conexión a internet y sincronizarlas automáticamente al restaurar el enlace.",
      "Gestión de Vueltos: Sistema de crédito interno o pago móvil de vuelto para optimizar la falta de efectivo en divisas.",
      "Seguimiento de Ventas: Dashboard en vivo para supervisores con métricas de ticket promedio y productos más vendidos."
    ]
  },
  {
    id: "sustainability",
    title: "09. Economía Circular y Eco-Créditos",
    icon: Recycle,
    content: `Impulsado por la Fundación Kyron, este módulo introduce la sostenibilidad como un activo financiero. El corazón de la iniciativa son las Papeleras Inteligentes dotadas de tecnología de inducción magnética. 

Estas unidades son capaces de clasificar y pesar residuos de forma autónoma. Cuando un usuario (ciudadano o empleado) deposita un residuo, el sistema lo valida mediante visión artificial y magnetismo, registrando la acción en el ledger de Kyron. El usuario recibe inmediatamente "Eco-Créditos" en su billetera digital, los cuales pueden ser canjeados por descuentos en comercios aliados o utilizados por la empresa para certificar su huella de carbono neutral.`,
    details: [
      "Trazabilidad Blockchain: Cada gramo de residuo recolectado tiene un registro inmutable de origen y destino final.",
      "Sensores Magnéticos: Tecnología de precisión para la detección de metales y clasificación de polímeros.",
      "Marketplace Verde: Catálogo de recompensas y beneficios para fomentar hábitos de reciclaje en la comunidad.",
      "Reportes ESG: Generación de informes de impacto ambiental para el cumplimiento de estándares internacionales de sostenibilidad."
    ]
  },
  {
    id: "engineering",
    title: "10. Ingeniería IA: Planos y Presupuestos",
    icon: Cpu,
    content: `Esta es una herramienta de asistencia técnica avanzada para la expansión física de negocios. La IA de ingeniería de Kyron puede procesar fotografías de un local en obra gris y, mediante algoritmos de visión por computadora, inferir las dimensiones reales del espacio.

Basándose en esta inferencia, el sistema genera planos arquitectónicos a escala y elabora una lista de cómputos métricos. Esto permite generar presupuestos de construcción detallados, incluyendo materiales (porcelanato, pintura, iluminación) y mano de obra, reduciendo en un 70% el tiempo necesario para la planificación técnica de nuevas sucursales o remodelaciones.`,
    details: [
      "Inferencia de Medidas: Precisión del 98% en la detección de áreas y perímetros a partir de data visual.",
      "Base de Datos de Materiales: Catálogo actualizado de costos de construcción en el mercado nacional e internacional.",
      "Exportación de Expedientes: Generación de documentos técnicos maestros para presentación ante juntas de condominio o alcaldías.",
      "Simulación de Acabados: Visualización digital de cómo se verá el espacio con diferentes materiales aplicados."
    ]
  },
  {
    id: "api",
    title: "11. Integración y Nodo de Datos",
    icon: Network,
    content: `System Kyron está diseñado para vivir en un ecosistema interconectado. Nuestra API RESTful de alta disponibilidad permite que sistemas externos se comuniquen con el núcleo de inteligencia de forma segura.

Si su empresa ya utiliza un ERP antiguo o un CRM específico, Kyron puede actuar como el nodo de cumplimiento que recibe los datos, los valida fiscalmente y los sella en el ledger. Esto permite modernizar la infraestructura tecnológica sin necesidad de reemplazar sistemas que ya funcionan, creando una capa de inteligencia superior que garantiza la integridad de la información en toda la organización.`,
    details: [
      "Webhooks Dinámicos: Notificaciones en tiempo real a sistemas externos sobre eventos financieros o de inventario.",
      "Documentación Swagger: Guía técnica completa para desarrolladores con ejemplos de implementación en múltiples lenguajes.",
      "Seguridad de Endpoint: Validación mediante JWT y control de acceso basado en roles para cada llamada a la API.",
      "Sincronización Síncrona: Actualización de existencias y precios entre la tienda física y el e-commerce en milisegundos."
    ]
  },
  {
    id: "blockchain",
    title: "12. Inmutabilidad en el Ledger Digital",
    icon: Database,
    content: `La confianza en System Kyron reside en su Ledger (libro contable) distribuido. Cada transacción crítica realizada en la plataforma genera un hash criptográfico único que se encadena con el anterior. 

Este sellado digital garantiza que la información no pueda ser borrada o modificada retroactivamente. En caso de una auditoría interna o externa, el sistema puede demostrar la integridad de sus registros desde el primer día de operación. Esta tecnología es especialmente valiosa para el registro de accionistas, actas de asamblea y grandes movimientos financieros, proporcionando una transparencia radical a los socios y directivos del holding.`,
    details: [
      "Sellado de Tiempo (Timestamping): Certificación de la fecha y hora exacta de creación de cada registro.",
      "Prueba de Existencia: Validación matemática de que un documento no ha sido alterado desde su carga inicial.",
      "Transparencia para Socios: Visualización en tiempo real de la cadena de bloques operativa para máxima confianza corporativa.",
      "Resiliencia de Datos: Distribución redundante de los registros en múltiples zonas geográficas para evitar pérdidas catastróficas."
    ]
  },
  {
    id: "market",
    title: "13. Business Intelligence y Análisis de Mercado",
    icon: BarChart3,
    content: `Kyron convierte sus datos brutos en ventajas competitivas. El módulo de BI procesa millones de puntos de datos de sus ventas, inventarios y costos para ofrecer una visualización clara del pulso de su negocio.

El sistema analiza no solo su rendimiento interno, sino que también utiliza IA para monitorear tendencias de mercado y comportamiento de la competencia (Benchmarking). Con esta información, el simulador de escenarios puede proyectar cómo afectaría un cambio de precio o la apertura de una nueva sucursal a su rentabilidad neta, permitiendo una planificación estratégica basada en evidencia y no en suposiciones.`,
    details: [
      "Dashboards Ejecutivos: Visualización de KPIs críticos (CAC, LTV, ROI) con filtros dinámicos por tiempo y ubicación.",
      "Análisis de Demografía: Integración con datos poblacionales para identificar zonas de alta oportunidad comercial.",
      "Predicción de Ventas: Algoritmos que proyectan la demanda futura basándose en el historial estacional y factores externos.",
      "Mapa de Calor de Ventas: Identificación geográfica de dónde provienen sus mejores clientes para optimizar la logística."
    ]
  },
  {
    id: "support",
    title: "14. Soporte Técnico Neuronal",
    icon: BrainCircuit,
    content: `El soporte en Kyron no es un centro de llamadas; es una extensión de la inteligencia del sistema. Nuestro asistente IA (Asistente Neuronal) ha sido entrenado con todo el manual técnico, la legislación vigente y las mejores prácticas de la industria.

El usuario puede interactuar con el sistema mediante lenguaje natural para resolver dudas operativas, solicitar la generación de un reporte complejo o pedir una explicación sobre un cambio en la ley fiscal. Si el problema requiere intervención humana, el sistema escala automáticamente el caso al Nivel 3 de soporte, proporcionando al técnico humano todo el contexto de la conversación previa para una resolución rápida y precisa.`,
    details: [
      "Atención 24/7: Resolución de dudas operativas en cualquier momento del día o la noche.",
      "Base de Conocimiento Dinámica: El sistema aprende de cada interacción para mejorar sus respuestas futuras.",
      "Guías Paso a Paso: Instrucciones interactivas que guían al usuario a través de procesos complejos dentro de la interfaz.",
      "Monitoreo de Salud de Nodo: Notificaciones proactivas al usuario sobre posibles problemas técnicos antes de que afecten la operación."
    ]
  },
  {
    id: "compliance",
    title: "15. Auditoría Preventiva Continua",
    icon: Activity,
    content: `Tradicionalmente, la auditoría ocurre después del problema. En Kyron, la auditoría es el proceso base. El motor de cumplimiento monitorea cada nodo operativo en tiempo real buscando inconsistencias o patrones de riesgo.

Si el sistema detecta que una factura de proveedor tiene un RIF inválido, o que un cálculo de retención no coincide con la base imponible, emite una alerta inmediata al administrador. Esta vigilancia constante asegura que la empresa esté siempre preparada para una inspección, manteniendo un "Estado de Auditoría Permanente" que reduce drásticamente la posibilidad de sanciones y optimiza el uso de los recursos financieros.`,
    details: [
      "Detección de Fraude Interno: Algoritmos que identifican discrepancias en el arqueo de caja o movimientos de inventario inusuales.",
      "Verificación de Proveedores: Validación periódica del estatus legal y solvencia de los aliados comerciales.",
      "Reportes de Cumplimiento: Consolidado mensual que certifica que todos los procesos se han realizado bajo norma.",
      "Alertas de Riesgo Legal: Notificaciones sobre cambios en leyes laborales o mercantiles que afecten la estructura de la empresa."
    ]
  },
  {
    id: "personal",
    title: "16. Identidad Personal Ciudadana",
    icon: Fingerprint,
    content: `Kyron también ofrece un espacio seguro para el ciudadano. En el portal personal, el usuario natural puede gestionar su identidad digital y sus trámites civiles bajo protocolos de máxima privacidad. 

Desde la obtención de copias certificadas de partidas de nacimiento hasta la gestión de antecedentes penales, el sistema actúa como el archivero digital del ciudadano. Toda la información es cifrada y solo el usuario tiene la llave para compartir sus documentos con terceros (bancos, empleadores o entes públicos), facilitando la vida civil y reduciendo los tiempos de espera en gestiones burocráticas.`,
    details: [
      "Bóveda de Documentos: Almacenamiento seguro de cédulas, pasaportes, títulos y registros médicos.",
      "Seguimiento de Trámites: Visualización del estatus de solicitudes ante registros civiles y notarías en tiempo real.",
      "Carnet Digital Interactivo: Identificación verificable mediante código QR para acceso a servicios y beneficios del ecosistema.",
      "Gestión Familiar: Posibilidad de vincular y gestionar los documentos de menores de edad bajo la tutela del usuario."
    ]
  },
  {
    id: "banking",
    title: "17. Conciliación Bancaria Inteligente",
    icon: Landmark,
    content: `La conciliación ya no es una tarea tediosa de fin de mes. Kyron se integra con las principales instituciones financieras para procesar sus estados de cuenta de forma automática.

Mediante el uso de OCR y algoritmos de emparejamiento, el sistema vincula cada depósito o transferencia con su factura correspondiente en el módulo de ventas. Los pagos realizados por Pago Móvil son validados mediante el número de referencia en milisegundos, permitiendo que el cajero entregue la mercancía con la certeza absoluta de que el fondo está disponible en la cuenta de la empresa, eliminando el riesgo de estafas con capturas de pantalla falsas.`,
    details: [
      "Lectura Automática de Estados de Cuenta: Procesamiento de archivos PDF o CSV bancarios sin intervención manual.",
      "Validación de Pago Móvil: Verificación directa contra el nodo bancario para confirmar la efectividad del fondo.",
      "Gestión de Diferencias: Identificación y reporte inmediato de discrepancias entre el saldo en banco y el saldo en libros.",
      "Control de Flujo de Caja: Proyección de liquidez basada en los cobros pendientes y los compromisos de pago programados."
    ]
  },
  {
    id: "academy",
    title: "18. Formación y Academia Kyron",
    icon: School,
    content: `El conocimiento es el pilar de la transformación. La Academia Kyron es el centro de transferencia tecnológica donde formamos a los profesionales del futuro. 

Ofrecemos programas de certificación en gestión fiscal avanzada, ciberseguridad corporativa y arquitectura de procesos. Las empresas que utilizan el ecosistema pueden inscribir a su personal en cursos específicos para maximizar el uso de la herramienta. Al completar cada programa, el alumno recibe una credencial digital verificable en blockchain, garantizando que su competencia técnica es real y reconocida por el ecosistema.`,
    details: [
      "Cursos Técnicos Online: Acceso a módulos de aprendizaje interactivos con casos prácticos del entorno venezolano.",
      "Certificación Profesional: Títulos digitales inmutables que validan el dominio de las herramientas de Kyron.",
      "Actualizaciones de Ley: Webinars y seminarios flash cada vez que ocurre un cambio importante en la normativa nacional.",
      "Programa de Jóvenes Talentos: Convenios con instituciones educativas para la formación temprana en tecnologías 5G y AI."
    ]
  },
  {
    id: "holding",
    title: "19. Gestión Estratégica de Holdings",
    icon: Globe,
    content: `Para grupos empresariales complejos, Kyron ofrece el módulo de Consolidación Maestra. Este permite gestionar múltiples razones sociales, sucursales y franquicias desde una sola interfaz centralizada.

El sistema permite visualizar la salud financiera de cada empresa individualmente o de forma consolidada para el grupo. Facilita el reparto de dividendos, la gestión de préstamos inter-empresariales y la estructura de socios, asegurando que la estrategia global del holding se ejecute con total transparencia y cumplimiento legal en todas sus ramificaciones.`,
    details: [
      "Estructura Accionaria: Registro digital de socios y porcentaje de participación con historial de movimientos de capital.",
      "Consolidación de Balances: Eliminación automática de transacciones inter-compañía para reportes de grupo reales.",
      "Gestión de Poderes Cruzados: Control de representantes legales que actúan en múltiples empresas del grupo.",
      "Auditoría de Sucursales: Comparativa de rendimiento y cumplimiento entre diferentes ubicaciones físicas o unidades de negocio."
    ]
  },
  {
    id: "maintenance",
    title: "20. Mantenimiento y Ciclo de Vida del Sistema",
    icon: Terminal,
    content: `System Kyron es un organismo vivo que evoluciona para proteger su negocio. Nuestro protocolo de mantenimiento garantiza que el sistema esté siempre actualizado con las últimas leyes y parches de seguridad sin interrumpir su operación.

Las actualizaciones se despliegan de forma transparente mediante una arquitectura de microservicios y despliegue continuo (CI/CD). Además, toda la información de su empresa cuenta con respaldos redundantes en tres regiones geográficas distintas y bajo tres proveedores de nube diferentes, garantizando una disponibilidad del 99.99% y una recuperación ante desastres en tiempo récord.`,
    details: [
      "Actualizaciones en Caliente: El sistema se actualiza mientras usted trabaja, sin necesidad de cierres por mantenimiento.",
      "Backup Geo-Redundante: Copias de seguridad cifradas distribuidas globalmente para máxima protección física.",
      "Mejora Continua: Implementación de nuevas funcionalidades basadas en el feedback directo de los nodos operativos.",
      "Soporte de Infraestructura: Monitoreo constante de los servidores para garantizar latencia mínima en todos los módulos."
    ]
  }
];

export default function ManualUsuarioPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleDownloadWord = async () => {
    setIsExporting(true);
    
    let logoBase64 = "";
    if (logoRef.current) {
        const svgElement = logoRef.current.querySelector("svg");
        if (svgElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            
            canvas.width = 400;
            canvas.height = 400;
            
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            
            await new Promise((resolve) => {
                img.onload = () => {
                    if (ctx) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, 400, 400);
                        ctx.drawImage(img, 0, 0, 400, 400);
                    }
                    URL.revokeObjectURL(url);
                    resolve(true);
                };
                img.src = url;
            });
            logoBase64 = canvas.toDataURL("image/png");
        }
    }

    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Manual Maestro de Operaciones System Kyron</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; line-height: 1.8; padding: 40pt; }
          .header { text-align: center; margin-bottom: 60pt; border-bottom: 3pt solid #2563eb; padding-bottom: 30pt; }
          .logo { width: 120pt; margin-bottom: 20pt; }
          h1 { color: #2563eb; font-size: 32pt; margin-bottom: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: -1pt; }
          .version-tag { text-transform: uppercase; letter-spacing: 4pt; font-weight: 900; color: #64748b; font-size: 10pt; }
          h2 { color: #1e40af; border-bottom: 1.5pt solid #e2e8f0; margin-top: 50pt; padding-bottom: 10pt; font-size: 22pt; font-weight: 900; page-break-before: always; }
          h3 { color: #2563eb; font-size: 14pt; margin-top: 25pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1pt; }
          p { margin-bottom: 15pt; text-align: justify; font-size: 11pt; }
          .intro-text { font-size: 13pt; font-style: italic; color: #475569; border-left: 4pt solid #2563eb; padding-left: 20pt; margin-bottom: 30pt; }
          ul { margin-bottom: 20pt; padding-left: 20pt; }
          li { margin-bottom: 10pt; font-size: 10.5pt; }
          .footer { margin-top: 80pt; text-align: center; font-size: 9pt; color: #94a3b8; border-top: 1pt solid #f1f5f9; padding-top: 20pt; font-weight: bold; text-transform: uppercase; }
          .page-break { page-break-after: always; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoBase64}" class="logo" />
          <h1>SYSTEM KYRON</h1>
          <p class="version-tag">EXPEDIENTE MAESTRO DE OPERACIONES v2.6.5</p>
          <p style="margin-top: 20pt; font-weight: bold; color: #2563eb;">CONFIDENCIAL • ACCESO NIVEL 5</p>
        </div>

        <div class="intro-text">
          Este documento constituye la base de conocimiento oficial para la operación del Ecosistema Kyron. Contiene protocolos detallados, especificaciones técnicas y guías normativas diseñadas para garantizar la excelencia empresarial y el cumplimiento fiscal absoluto. Su contenido es propiedad intelectual de System Kyron, C.A.
        </div>

        ${chapters.map(ch => `
          <div class="section">
            <h2>${ch.title}</h2>
            <p>${ch.content}</p>
            <h3>Especificaciones de Nodo y Procedimientos:</h3>
            <ul>
              ${ch.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `).join('')}

        <div class="footer">
          <p>&copy; 2026 System Kyron • Corporate Intelligence Node • Caracas, Venezuela • Documento Certificado bajo Protocolo de Integridad</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manual_Maestro_System_Kyron_V2.6.5.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
        title: "EXPEDIENTE GENERADO",
        description: "El manual de alta densidad ha sido exportado exitosamente.",
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-16 relative overflow-hidden hud-grid">
      
      {/* Logo oculto para captura en la exportación */}
      <div className="hidden" ref={logoRef} aria-hidden="true">
        <Logo className="h-40 w-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/[0.03] rounded-full blur-[300px]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-secondary/[0.02] rounded-full blur-[300px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-20 border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> EXPEDIENTE TÉCNICO MAESTRO
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            Manual de <span className="text-primary not-italic">Operación</span>
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] opacity-40 mt-4 max-w-2xl leading-relaxed">
            Protocolo Integral de Gestión Corporativa • 20 Capítulos de Alta Densidad • Versión v2.6.5
            </p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" onClick={() => window.print()} className="h-12 px-6 rounded-xl border-white/10 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest">
                <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
            </Button>
            <Button 
                onClick={handleDownloadWord} 
                disabled={isExporting}
                className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl"
            >
                {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                DESCARGAR WORD
            </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto mb-24 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 no-print">
        {chapters.map((ch, idx) => (
            <a 
                key={ch.id} 
                href={`#${ch.id}`}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all text-center group"
            >
                <ch.icon className="h-5 w-5 mx-auto mb-3 text-white/20 group-hover:text-primary transition-colors" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Capítulo 0{idx + 1}</span>
            </a>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-24 pb-32">
        {chapters.map((chapter, idx) => (
          <motion.section 
            id={chapter.id}
            key={chapter.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="scroll-mt-32"
          >
            <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none">
                <chapter.icon className="h-64 w-64 rotate-12" />
              </div>
              
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-1 bg-white/[0.03] border-r border-white/5 flex items-center justify-center p-8 lg:p-0">
                    <span className="text-4xl font-black text-white/10 uppercase vertical-text tracking-tighter">
                        CH.{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                </div>

                <div className="lg:col-span-11 p-10 md:p-16 space-y-12">
                    <header className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary/10 rounded-[1.5rem] border border-primary/20 shadow-inner">
                                <chapter.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white">{chapter.title}</h2>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent"></div>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Detalle Operativo Expandido</h4>
                                <p className="text-lg font-medium italic text-white/70 leading-relaxed text-justify whitespace-pre-wrap">
                                    {chapter.content}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 shadow-inner">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30 mb-6 flex items-center gap-3">
                                    <Terminal className="h-4 w-4" /> Protocolos Técnicos
                                </h4>
                                <ul className="space-y-4 text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                                    {chapter.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="flex gap-4 items-start">
                                            <span className="text-primary font-black">[0{dIdx + 1}]</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-white/5 border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center gap-6 group hover:bg-primary/5 transition-all">
                                <ShieldCheck className="h-12 w-12 text-primary opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <div className="space-y-2">
                                    <h5 className="text-sm font-black uppercase tracking-widest text-white">Certificación de Nodo</h5>
                                    <p className="text-[10px] text-white/30 uppercase leading-relaxed font-medium">Este capítulo ha sido verificado bajo el estándar de integridad System Kyron v2.6.5. La aplicación de estos protocolos garantiza la inmutabilidad de la información operativa.</p>
                                </div>
                            </Card>
                            
                            <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                                <Activity className="h-6 w-6 text-white/10 mb-4 animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10 italic">Core Status: Optimized</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </Card>
          </motion.section>
        ))}
      </div>

      <footer className="max-w-6xl mx-auto border-t border-white/5 pt-20 pb-10 text-center space-y-10">
        <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase italic italic-shadow">¿Necesitas Asistencia Neuronal?</h3>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] max-w-lg mx-auto">Nuestro asistente de IA está entrenado en este manual para resolver cualquier duda técnica en tiempo real.</p>
        </div>
        <div className="flex justify-center gap-4">
            <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Soporte de Nivel 3
            </Button>
            <Button asChild className="btn-3d-primary h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                <Link href="/">Volver al Portal Central</Link>
            </Button>
        </div>
        <p className="text-[9px] font-black text-white/10 uppercase tracking-[1em] italic pt-10">
            SYSTEM KYRON • CORPORATE INTELLIGENCE • 2026
        </p>
      </footer>
    </div>
  );
}
