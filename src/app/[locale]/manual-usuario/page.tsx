
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
    Shield,
    ChevronRight,
    Server,
    Database,
    Zap,
    Scale,
    FileText,
    Target,
    ShieldAlert,
    Network
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales bajo estándares militares.",
        content: [
            {
                sub: "Protocolo de Validación Biométrica 3D y Prueba de Vida",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía absoluta de la identidad digital. El proceso de enrolamiento no se limita a una simple captura fotográfica; el sistema despliega un motor de visión artificial de alta fidelidad que ejecuta un escaneo facial tridimensional, identificando y mapeando 128 puntos vectoriales únicos que definen la morfología ósea y muscular del usuario. Esta 'Firma Biométrica' es procesada mediante un algoritmo de hashing unidireccional y almacenada como un registro inmutable en el Ledger del ecosistema. Cada vez que un ciudadano o empleado autoriza una transacción financiera, firma un contrato o accede a datos sensibles, el sistema exige una validación de 'Prueba de Vida' activa. Este protocolo detecta micro-movimientos, reflejos pupilares y texturas dérmicas en tiempo real, garantizando la imposibilidad de suplantación mediante fotografías, pantallas de alta resolución o sofisticados ataques de deepfakes. Es el estándar de seguridad más riguroso disponible para la protección de la identidad ciudadana."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles y Cifrado Cold-Storage",
                text: "La Bóveda Civil de Kyron representa un entorno de almacenamiento digital de ultra-seguridad, diseñado para la preservación a largo plazo de la historia legal del individuo. Los documentos maestros, tales como Cédulas de Identidad, Registros de Información Fiscal (RIF), Pasaportes y Títulos Universitarios, no se almacenan como archivos convencionales. Al ser cargados, cada documento es sometido a un proceso de fragmentación y cifrado distribuido utilizando algoritmos AES-512 con rotación dinámica de llaves. La arquitectura de 'Almacenamiento Frío' asegura que los datos permanezcan inaccesibles para el nodo de red general, activándose únicamente tras una secuencia de autenticación exitosa iniciada por el titular. Además, nuestra IA realiza una limpieza forense de metadatos y un sellado de tiempo (Timestamping) basado en protocolo RFC 3161, lo que permite que el usuario porte su historial legal completo en su dispositivo móvil con una validez técnica verificable ante cualquier organismo, eliminando la necesidad de portar documentos físicos vulnerables a pérdida o deterioro."
            },
            {
                sub: "Soberanía de Datos y Gestión de Consentimiento",
                text: "System Kyron opera bajo el paradigma de la Identidad Soberana (SSI). Esto significa que el sistema no 'es dueño' de los datos; el usuario es el único administrador de su información. El manual operativo detalla cómo el ciudadano puede otorgar o revocar accesos temporales a terceros (ej. bancos, empleadores o instituciones de salud) mediante la generación de tokens de acceso efímeros. Cada interacción de datos queda registrada en un log de auditoría inalterable, permitiendo al usuario saber exactamente quién, cuándo y para qué se consultó su expediente. Este nivel de transparencia y control devuelve la propiedad de la vida digital al individuo, cumpliendo con los estándares internacionales más exigentes de protección de datos personales."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes convergentes, aprovisionamiento digital y telemetría de misión crítica.",
        content: [
            {
                sub: "Aprovisionamiento Dinámico de eSIM y Protocolo GSMA",
                text: "Kyron redefine la conectividad móvil eliminando las barreras del hardware físico tradicional. El módulo de Telecomunicaciones integra un servidor de aprovisionamiento remoto (SM-DP+) certificado bajo estándares GSMA, permitiendo la generación instantánea de perfiles eSIM (Embedded SIM). Una vez que la identidad del usuario ha sido validada biométricamente, el sistema asigna un MSISDN único y empaqueta las credenciales de red, planes de datos y claves de autenticación en un paquete de datos encriptado accesible vía código QR. El usuario simplemente inyecta este perfil en su smartphone, activando una línea telefónica plenamente funcional en segundos. Esta tecnología no solo agiliza la logística empresarial al eliminar el manejo de tarjetas plásticas, sino que también permite la gestión de flotas internacionales con perfiles multiregión, garantizando conectividad ininterrumpida sin cambios de hardware físico."
            },
            {
                sub: "Arquitectura de Red 5G de Baja Latencia y Troncales SIP",
                text: "La infraestructura sobre la que opera Kyron está diseñada para el tráfico de misión crítica. Utilizamos tecnología de red 5G que ofrece latencias inferiores a 10ms, esencial para la sincronización de bases de datos financieras y operaciones de TPV en tiempo real. El manual explica cómo el sistema gestiona troncales SIP (Session Initiation Protocol) para voz sobre IP (VoIP), permitiendo que las empresas tengan centrales telefónicas virtuales de alta definición integradas directamente en el ecosistema. Cada llamada y transmisión de datos es encapsulada en túneles VPN dinámicos, protegiendo las comunicaciones corporativas contra la interceptación y garantizando que la voz del cliente y los datos de la empresa viajen por un carril prioritario y seguro."
            },
            {
                sub: "Consola NOC Maestro y Gestión de Telemetría",
                text: "Para la administración de grandes flotas corporativas, el sistema provee acceso al Network Operations Center (NOC). Desde esta terminal, los oficiales de IT pueden monitorear patrones de consumo, detectar anomalías en el uso de datos y aplicar políticas de 'Quality of Service' (QoS) para priorizar aplicaciones críticas de negocio sobre el tráfico general. El sistema incluye un protocolo de 'Kill Switch' remoto que permite inhabilitar cualquier línea o dispositivo en milisegundos en caso de brecha de seguridad o pérdida de hardware. La telemetría integrada proporciona reportes analíticos sobre la ubicación de activos, intensidad de señal y salud del dispositivo, convirtiendo la conectividad en un activo estratégico gestionable y predecible."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal adaptativa y control de activos físicos en tiempo real.",
        content: [
            {
                sub: "Sincronización Fiscal Síncrona y Validación de RIF",
                text: "El Punto de Venta (TPV) de Kyron trasciende la simple caja registradora; es un nodo de inteligencia fiscal síncrono. Al momento de iniciar una venta, el ingreso del RIF o Cédula dispara una consulta API inmediata a la base de datos de cumplimiento de Kyron, la cual extrae y valida la Razón Social y el Domicilio Fiscal oficial del contribuyente. Este protocolo asegura que el 100% de las facturas emitidas cumplan con la Providencia Administrativa SNAT/2011/0071 del SENIAT, eliminando errores de transcripción que derivan en multas. Asimismo, el motor de cálculo está pre-configurado para gestionar el Impuesto a las Grandes Transacciones Financieras (IGTF), detectando automáticamente el método de pago (divisas o moneda nacional) y aplicando la alícuota correspondiente de forma transparente para el cajero y el cliente."
            },
            {
                sub: "Gestión de Inventario mediante Kardex de Alta Precisión",
                text: "El control de existencias opera bajo una arquitectura de Kardex perpetuo. Cada entrada de mercancía, venta, devolución o ajuste queda registrada con un identificador de transacción único y un sellado de tiempo inmutable. El manual detalla cómo configurar el sistema de 'Costo Promedio Ponderado' o 'FIFO' según la política contable de la empresa. La interfaz del inventario permite la gestión de múltiples depósitos y sucursales, con transferencia de mercancía entre nodos validada mediante códigos QR. El sistema garantiza la integridad del stock mediante conciliaciones ciegas periódicas, donde el operario debe confirmar cantidades sin conocer el saldo teórico del sistema, forzando una precisión absoluta en el conteo físico."
            },
            {
                sub: "IA Predictiva para el Reabastecimiento Estratégico",
                text: "Más allá del registro, Kyron utiliza modelos de aprendizaje automático para analizar la velocidad de rotación de cada SKU. El manual explica cómo activar el 'Asistente de Compras Inteligente', el cual analiza tendencias históricas de venta, estacionalidad y plazos de entrega de proveedores para generar sugerencias de órdenes de compra automáticas. Cuando un ítem alcanza su 'Punto de Pedido' calculado, el sistema notifica a compras con una terna de cotizaciones sugeridas basada en el historial de proveedores. Este enfoque proactivo minimiza el capital inmovilizado en inventario de baja rotación y elimina las ventas perdidas por ruptura de stock, optimizando el ciclo de conversión de efectivo de la compañía."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y vigilancia normativa 24/7.",
        content: [
            {
                sub: "Motor de Auditoría Preventiva y Generación de TXT",
                text: "System Kyron elimina la vulnerabilidad ante fiscalizaciones mediante un motor de auditoría preventiva que opera en segundo plano sobre cada transacción. El sistema compila automáticamente los Libros de Compras y Ventas, formateándolos estrictamente según las exigencias del SENIAT. Antes de cada cierre mensual, nuestra IA ejecuta una 'Prueba de Coherencia Fiscal' que cruza los ingresos declarados con los estados de cuenta bancarios y los movimientos de inventario, detectando posibles brechas o errores de forma. El manual instruye sobre la generación del archivo TXT para la Declaración de IVA y las Retenciones de ISLR, asegurando que los archivos exportados sean 100% compatibles con el portal fiscal, garantizando declaraciones impecables y a tiempo."
            },
            {
                sub: "RIPF: Reajuste por Inflación Fiscal Automatizado",
                text: "Dada la volatilidad económica, el Reajuste por Inflación Fiscal (RIPF) es uno de los procesos más complejos y críticos para el contribuyente venezolano. Kyron automatiza este procedimiento técnico cargando diariamente los índices de precios (INPC) oficiales. El sistema identifica automáticamente las partidas no monetarias (activos fijos, inventarios, patrimonio), aplica los factores de corrección correspondientes y genera el asiento contable de ajuste. Este módulo no solo ahorra semanas de trabajo manual contable, sino que proporciona un sustento técnico matemático inatacable ante una inspección, sincerando la utilidad neta gravable y protegiendo el patrimonio de la empresa contra el efecto inflacionario."
            },
            {
                sub: "Vigilancia de Gaceta Oficial y Actualización Normativa",
                text: "El sistema integra un nodo de vigilancia legal que monitorea la Gaceta Oficial de la República de forma ininterrumpida. Cualquier cambio en alícuotas, nuevas contribuciones especiales (como la Ley de Protección de Pensiones) o exoneraciones temporales, se traduce en una actualización automática de las reglas de negocio de la plataforma. El manual describe cómo el sistema notifica a los usuarios sobre cambios relevantes en su sector y adapta los cálculos de nómina y facturación de forma transparente. Este blindaje normativo asegura que la empresa nunca opere bajo leyes derogadas, manteniendo un estatus de 'Cero Riesgo Fiscal' permanente."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y BI",
        icon: TrendingUp,
        description: "Dashboard ejecutivo para la toma de decisiones estratégicas basadas en analítica predictiva.",
        content: [
            {
                sub: "Modelado de Factibilidad: VAN, TIR y Escenarios",
                text: "El módulo de Business Intelligence (BI) de Kyron dota a la directiva de herramientas de modelado financiero de alto nivel. El manual explica el uso del simulador de inversiones, donde el usuario puede proyectar flujos de caja libre para nuevos proyectos. El sistema calcula automáticamente indicadores de rentabilidad como el Valor Actual Neto (VAN), la Tasa Interna de Retorno (TIR) y el Período de Recuperación del Capital (Payback). Además, permite realizar análisis de sensibilidad mediante la creación de escenarios (Optimista, Pesimista, Base), alterando variables como tasas de cambio, costos de materia prima o demanda del mercado, proporcionando una base científica para la expansión del holding y la mitigación de riesgos financieros."
            },
            {
                sub: "Billetera Multimoneda y Protocolo de Conciliación Bancaria",
                text: "En una economía multimoneda, la gestión de tesorería es vital. La Billetera Kyron centraliza saldos en VES, USD y EUR, aplicando las tasas de cambio oficiales del BCV en tiempo real. El manual detalla el protocolo de conciliación bancaria automatizada: el sistema procesa extractos digitales y utiliza algoritmos de coincidencia de patrones para vincular cada transferencia o Pago Móvil con su factura correspondiente. Este proceso detecta duplicidades, omisiones o discrepancias en centavos, asegurando que el flujo de caja reflejado en el sistema sea un espejo exacto de la realidad bancaria. Este blindaje previene fraudes internos y asegura que la disponibilidad de fondos sea siempre real y verificada."
            },
            {
                sub: "Análisis de Margen de Contribución y Punto de Equilibrio",
                text: "La inteligencia financiera de Kyron desglosa la rentabilidad hasta el nivel de producto o cliente individual. El sistema calcula automáticamente el Margen de Contribución por unidad, restando todos los costos variables asociados a la venta. El manual enseña a interpretar el reporte de 'Punto de Equilibrio Dinámico', el cual indica exactamente cuánto debe vender la empresa diariamente para cubrir sus costos fijos. Esta visibilidad permite realizar ajustes de precios estratégicos y enfocar los esfuerzos de marketing en los segmentos más rentables de la operación, maximizando la utilidad neta sin aumentar innecesariamente el riesgo operativo."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento y RR.HH.",
        icon: Briefcase,
        description: "Administración integral del capital humano y cumplimiento estricto de la LOTTT y leyes parafiscales.",
        content: [
            {
                sub: "Motor de Nómina Automatizado bajo la LOTTT",
                text: "El sistema de nómina de Kyron ha sido programado con la totalidad de la lógica jurídica de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT). Automatiza el cálculo de salarios integrales, bonos nocturnos, horas extras diurnas y nocturnas, días feriados y descansos trabajados. El manual describe cómo configurar conceptos salariales y no salariales (como el Cestaticket Socialista) y cómo el sistema gestiona la garantía de prestaciones sociales de forma quincenal o mensual. Al finalizar cada ciclo, el motor genera recibos de pago digitales con validez legal, que son despachados automáticamente a través de canales seguros, manteniendo un registro histórico inmutable de cada centavo pagado a la fuerza laboral."
            },
            {
                sub: "Control de Libros Laborales y Solvencias Parafiscales",
                text: "El cumplimiento laboral en Venezuela exige el mantenimiento de registros rigurosos. Kyron automatiza la actualización del Libro de Vacaciones, el Libro de Horas Extras y el Libro de Personal Retirado. Además, el sistema gestiona las retenciones y aportes patronales de ley (IVSS, FAOV, INCES), generando los archivos de carga masiva para los portales institucionales (TIUNA, etc.). El manual instruye sobre cómo mantener las solvencias al día, evitando bloqueos administrativos y garantizando que la empresa pueda licitar o realizar trámites ante el estado sin impedimentos por deuda laboral o parafiscal."
            },
            {
                sub: "Protocolo de Finiquito y Liquidación Técnica",
                text: "El cese de la relación laboral es un momento de alto riesgo legal. El módulo de prestaciones sociales realiza cálculos técnicos precisos de liquidación, incluyendo la retroactividad de prestaciones, utilidades fraccionadas, vacaciones vencidas y no disfrutadas, y bonos vacacionales proporcionales. El manual detalla el proceso para generar el 'Documento de Finiquito', el cual incluye un desglose detallado de cada concepto y un código QR de validación que vincula el pago con la transacción bancaria. Este rigor técnico protege a la empresa contra demandas por cálculos erróneos y garantiza al trabajador el cobro exacto de sus haberes acumulados durante su tiempo de servicio."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico",
        icon: Gavel,
        description: "Control de expedientes, contratos inteligentes y asesoría legal IA predictiva.",
        content: [
            {
                sub: "Gestión de Ciclo de Vida de Contratos (CLM)",
                text: "Este módulo centraliza y automatiza toda la documentación legal de la organización. El manual explica cómo utilizar la biblioteca de plantillas pre-aprobadas y visadas para contratos de servicios, acuerdos de confidencialidad (NDA), contratos de arrendamiento y poderes de representación. El sistema incluye un motor de flujo de trabajo donde un documento puede pasar por revisiones de diferentes niveles antes de su firma digital. El Ledger de Kyron registra cada versión del documento, permitiendo una trazabilidad total de los cambios y asegurando que la última versión firmada sea la única legalmente válida y accesible para las partes interesadas."
            },
            {
                sub: "Sistema de Alertas de Vencimiento y Caducidad",
                text: "La negligencia en la renovación de poderes o contratos puede paralizar una empresa. Kyron integra un sistema de alertas proactivas que notifica al departamento jurídico 90, 60 y 30 días antes del vencimiento de cualquier instrumento legal. El manual detalla cómo configurar estas notificaciones para poderes de administración, habilitaciones de CONATEL, registros de marcas ante el SAPI o licencias de software. Esta vigilancia automática permite gestionar renovaciones ante registros y notarías con la debida antelación, garantizando que la representación legal de la empresa y sus derechos de propiedad intelectual nunca queden desprotegidos."
            },
            {
                sub: "Consultor Legal IA y Análisis de Gacetas",
                text: "System Kyron integra un modelo de lenguaje avanzado entrenado específicamente en el ordenamiento jurídico venezolano. El manual instruye al usuario sobre cómo realizar consultas técnicas sobre Gacetas Oficiales complejas, como la N° 6.952. La IA es capaz de interpretar decretos de exoneración de impuestos, nuevas normativas aduaneras o reformas arancelarias, citando artículos específicos y proporcionando un resumen ejecutivo de las obligaciones para la empresa. Aunque no sustituye el juicio de un abogado, este asistente de IA acelera drásticamente el tiempo de respuesta legal y reduce la dependencia de costosas horas de consultoría externa para dudas operativas del día a día."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería y Planificación IA",
        icon: Cpu,
        description: "Herramientas de planimetría, cómputos métricos y presupuestos de obra con visión artificial.",
        content: [
            {
                sub: "Generación Automática de Planos mediante Visión Artificial",
                text: "Este módulo revolucionario permite la digitalización de espacios físicos con un esfuerzo mínimo. El manual describe el proceso: al cargar fotografías de alta resolución de un local o infraestructura, la IA de Kyron utiliza algoritmos de fotogrametría y detección de bordes para identificar la geometría del espacio, la ubicación de muros, vanos de puertas y ventanas. El usuario solo debe introducir una cota de referencia (ej. el ancho de una puerta estándar) y el sistema escala automáticamente el resto de la planta, generando un plano esquemático en formato vectorial. Esta funcionalidad es vital para levantamientos rápidos de sucursales o la planificación de remodelaciones sin necesidad de equipos de topografía láser en fases iniciales."
            },
            {
                sub: "Cálculo de Cómputos Métricos y Análisis de Materiales",
                text: "Vinculado directamente al plano generado, el sistema permite asignar acabados y materiales a las diferentes superficies detectadas. El manual explica cómo la IA calcula automáticamente los cómputos métricos (m² de pintura, m² de piso, metros lineales de rodapié). El usuario puede seleccionar materiales de un catálogo pre-cargado con rendimientos técnicos específicos (ej. galones de pintura por m² según tipo de superficie). El software genera una lista de materiales exacta, minimizando el desperdicio y asegurando que la compra de suministros sea precisa para la ejecución de la obra o el mantenimiento preventivo."
            },
            {
                sub: "Elaboración de Presupuestos de Obra y Control de Costos",
                text: "El módulo culmina con la generación de un presupuesto de ingeniería detallado. El manual detalla cómo el sistema integra los costos de materiales con las estimaciones de mano de obra y gastos operativos de construcción (APU). Este presupuesto está conectado en tiempo real con el módulo de compras, permitiendo validar los precios proyectados contra facturas reales de proveedores. El sistema proporciona un análisis de varianza durante la ejecución del proyecto, alertando a la gerencia de ingeniería sobre desviaciones presupuestarias antes de que afecten la rentabilidad final de la obra, manteniendo un control financiero riguroso sobre la infraestructura física de la empresa."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Fundación Kyron",
        icon: Recycle,
        description: "Operación de infraestructura verde, economía circular y monetización de residuos en Blockchain.",
        content: [
            {
                sub: "Tecnología de Inducción Magnética en Smart Bins",
                text: "System Kyron implementa una solución de economía circular de vanguardia a través de sus papeleras inteligentes. El manual explica la base técnica: los Smart Bins están equipados con sensores de inducción magnética síncrona que detectan la firma electromagnética de los residuos. Esta tecnología permite clasificar automáticamente metales ferrosos y no ferrosos de plásticos PET y otros polímeros. Cuando un ciudadano deposita un envase, el sistema valida el material, el peso y la pureza en milisegundos. Esta clasificación en origen es la clave para un reciclaje industrial eficiente, eliminando los costos de separación manual y garantizando la calidad de la materia prima recuperada."
            },
            {
                sub: "Eco-Créditos: Tokenización de Hábitos Responsables",
                text: "Cada acción ambiental validada por un Smart Bin se traduce en un incentivo económico real. El manual describe el protocolo de emisión de 'Eco-Créditos' en el Blockchain de Kyron. Al ser reconocido por su Identidad Digital, el usuario recibe automáticamente una transferencia de puntos a su billetera, donde el valor está respaldado por la venta de los materiales reciclados por la Fundación Kyron. Estos créditos pueden ser canjeados en una red de comercios aliados por productos, servicios o descuentos, creando un ecosistema donde la responsabilidad ambiental tiene un rendimiento financiero tangible y auditable, fomentando una cultura de sostenibilidad masiva y participativa."
            },
            {
                sub: "Trazabilidad de Activos Verdes y Reportes ESG",
                text: "Para las empresas que buscan cumplir con criterios ESG (Environmental, Social, and Governance), Kyron ofrece una trazabilidad total. El manual detalla cómo el sistema genera certificados de 'Impacto Ambiental' inmutables. Se puede rastrear el recorrido de cada tonelada de plástico recolectada, desde el Smart Bin específico hasta su transformación en un nuevo producto. Estos datos permiten a las empresas certificar su reducción de huella de carbono con pruebas basadas en datos reales y no en estimaciones, mejorando su reputación corporativa y permitiéndoles acceder a incentivos fiscales verdes o financiamiento internacional condicionado a la sostenibilidad."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y LOPNNA",
        icon: HeartHandshake,
        description: "Servicios civiles para el individuo, gestión de salud y cumplimiento de obligaciones familiares.",
        content: [
            {
                sub: "Gestión de Documentación Civil y Red de Salud",
                text: "El Portal Ciudadano actúa como el asistente personal legal del usuario. El manual describe los procesos para solicitar copias certificadas de Partidas de Nacimiento y Actas de Matrimonio, integrando flujos de comunicación con registros civiles. Además, el portal incluye un módulo de salud inteligente: el usuario puede consultar el directorio médico afiliado a su póliza, agendar consultas telemáticas o presenciales, y recibir sus resultados de laboratorio directamente en su Bóveda Civil. La integración con la Identidad Digital asegura que el historial médico sea portátil, privado y esté siempre disponible bajo el control exclusivo del ciudadano, facilitando una atención médica continua y coordinada."
            },
            {
                sub: "Calculadora de Manutención y Protección LOPNNA",
                text: "System Kyron facilita el cumplimiento de las obligaciones establecidas en la Ley Orgánica para la Protección de Niños, Niñas y Adolescentes (LOPNNA). El manual explica el uso de la calculadora de manutención técnica, la cual estima los montos de aporte basándose en la unidad tributaria vigente, los ingresos mensuales del obligado y las necesidades documentadas del menor. El sistema genera registros de depósitos verificables que sirven como prueba de cumplimiento ante tribunales de protección, promoviendo la armonía familiar y asegurando que los derechos del niño sean respetados mediante una gestión financiera transparente y automatizada."
            },
            {
                sub: "Asistente de Registro RIF para Menores de Edad",
                text: "Inscribir a un menor en el Registro de Información Fiscal es un paso legal crítico para gestiones de herencia o declaración de cargas familiares ante el SENIAT. El manual proporciona una guía paso a paso y un asistente de llenado de planillas digital. El sistema utiliza los datos de la Partida de Nacimiento del menor y el RIF del representante legal (ya almacenados en la bóveda) para pre-poblar los formularios oficiales. Esto reduce drásticamente el tiempo de gestión y asegura que la documentación presentada ante la administración tributaria sea correcta desde el primer intento, facilitando el acceso del núcleo familiar a beneficios fiscales y derechos sucesorios."
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

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid selection:bg-primary/20">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-full h-[1400px] bg-primary/5 rounded-full blur-[250px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-secondary/5 rounded-full blur-[200px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            {/* Header Fijo Refinado */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print">
                <div className="flex items-center gap-6">
                    <Link href="/" className="hover:scale-105 transition-transform">
                        <Logo className="h-10 w-10 shadow-glow" />
                    </Link>
                    <div className="flex flex-col border-l border-white/10 pl-6 ml-2">
                        <span className="text-xs font-black tracking-[0.6em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Manual de Usuario v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
                        <Link href="/"><Home className="mr-2 h-3.5 w-3.5" /> INICIO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl text-[9px] font-black uppercase shadow-glow" onClick={() => window.print()}>
                        <Download className="mr-2 h-3.5 w-3.5" /> EXPORTAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-32 pb-40 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Navegación Lateral (HUD Table of Contents) */}
                    <aside className="lg:col-span-4 no-print">
                        <div className="sticky top-32 space-y-8">
                            <Card className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-black/60 shadow-2xl overflow-hidden">
                                <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-3">
                                        <Activity className="h-4 w-4" /> Protocolos Maestros
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1">
                                    {manualModules.map((mod) => (
                                        <button 
                                            key={mod.id}
                                            onClick={() => scrollToSection(mod.id)}
                                            className={cn(
                                                "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-left group",
                                                activeTab === mod.id ? "bg-primary/10 text-primary border border-primary/20 shadow-glow" : "text-white/30 hover:text-white/60 hover:bg-white/5 border border-transparent"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full transition-all shadow-glow",
                                                activeTab === mod.id ? "bg-primary" : "bg-white/10 group-hover:bg-white/30"
                                            )} />
                                            <span>{mod.title.split('. ')[1]}</span>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-primary/5 border-primary/20 p-6 rounded-[2rem]">
                                <div className="flex items-start gap-4">
                                    <Sparkles className="h-5 w-5 text-primary shrink-0" />
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Inteligencia de Soporte</p>
                                        <p className="text-[9px] font-bold text-white/40 leading-relaxed uppercase">Para asistencia técnica inmediata sobre protocolos de red o cifrado, inicie el chat con el nodo maestro.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* Contenido Principal (Detailed Documentation) */}
                    <div className="lg:col-span-8 space-y-32">
                        <motion.section 
                            className="space-y-10"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary">
                                <ShieldCheck className="h-3.5 w-3.5" /> MASTER USER GUIDE 2.6.5
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
                                Manual de Usuario <br/> 
                                <span className="text-primary text-4xl md:text-6xl">System Kyron</span>
                            </h1>
                            <p className="text-lg text-white/40 max-w-2xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-10 leading-relaxed">
                                Documentación técnica exhaustiva para la operatividad del ecosistema integral de gestión administrativa, telecomunicaciones avanzadas y activos digitales inmutables.
                            </p>
                        </motion.section>

                        {manualModules.map((mod, index) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id} 
                                className="scroll-mt-32"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-1000 hover:border-primary/20">
                                    <CardHeader className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row items-center gap-12 bg-white/[0.01]">
                                        <div className="relative">
                                            <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform relative z-10">
                                                <mod.icon className="h-12 w-12 text-primary" />
                                            </div>
                                            <div className="absolute -top-4 -right-4 z-20">
                                                <Logo className="h-10 w-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <div className="space-y-4 text-center md:text-left">
                                            <CardTitle className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-12 md:p-16 space-y-24">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-10 group/item">
                                                <div className="flex items-center gap-8">
                                                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic whitespace-nowrap">{item.sub}</h4>
                                                    <div className="h-[1px] flex-1 bg-white/5 group-hover/item:bg-primary/20 transition-colors" />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-10 top-0 bottom-0 w-[2px] bg-primary/10 group-hover/item:bg-primary/40 transition-colors rounded-full" />
                                                    <p className="text-lg font-medium text-white/60 leading-relaxed text-justify italic">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-10 border-t border-white/5 flex justify-center bg-white/[0.01] gap-8">
                                        <div className="flex items-center gap-3">
                                            <Server className="h-3.5 w-3.5 text-white/20" />
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Operational Status: Optimal</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Database className="h-3.5 w-3.5 text-white/20" />
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Data Integrity: Verified</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </main>
            
            <footer className="py-24 border-t border-white/5 bg-black/80 text-center relative z-20">
                <div className="mb-8 opacity-20 hover:opacity-50 transition-opacity">
                    <Logo className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">
                    SYSTEM KYRON • MASTER USER MANUAL • MK-2.6.5 • 2026
                </p>
            </footer>
        </div>
    );
}
