
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
    ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import React from "react";

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital y Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales bajo estándares de seguridad militar y cifrado AES-512.",
        content: [
            {
                sub: "Protocolo de Validación Biométrica 3D y Prueba de Vida Avanzada",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía absoluta de la identidad digital. El proceso de enrolamiento no se limita a una simple captura fotográfica; el sistema despliega un motor de visión artificial de alta fidelidad que ejecuta un escaneo facial tridimensional exhaustivo. Este proceso identifica y mapea más de 128 puntos vectoriales únicos que definen la morfología ósea y muscular del usuario, creando una 'Firma Biométrica' inalterable. Esta firma es procesada mediante un algoritmo de hashing unidireccional y almacenada como un registro inmutable en el Ledger del ecosistema. Cada vez que un ciudadano o empleado autoriza una transacción financiera, firma un contrato o accede a datos sensibles, el sistema exige una validación de 'Prueba de Vida' activa. Este protocolo avanzado detecta micro-movimientos, reflejos pupilares, cambios en la oxigenación sanguínea detectables por cámara y texturas dérmicas en tiempo real. Esta tecnología garantiza la imposibilidad técnica de suplantación mediante fotografías, pantallas de alta resolución o sofisticados ataques de deepfakes generados por IA. Es, hoy por hoy, el estándar de seguridad más riguroso disponible para la protección de la identidad ciudadana y corporativa, cumpliendo con los estándares de identidad digital de la Unión Europea y normativas locales de firmas electrónicas."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles y Arquitectura Cold-Storage",
                text: "La Bóveda Civil de Kyron representa un entorno de almacenamiento digital de ultra-seguridad, diseñado para la preservación a largo plazo de la integridad legal del individuo. Los documentos maestros, tales como Cédulas de Identidad, Registros de Información Fiscal (RIF), Pasaportes, Títulos Universitarios y Actas Civiles, no se almacenan como simples archivos en un servidor convencional. Al ser cargados, cada documento es sometido a un proceso de fragmentación y cifrado distribuido utilizando algoritmos AES-512 con rotación dinámica de llaves. La arquitectura de 'Almacenamiento Frío' asegura que los datos permanezcan inaccesibles para el nodo de red general, activándose únicamente tras una secuencia de autenticación exitosa iniciada por el titular biometrizado. Además, nuestra IA realiza una limpieza forense de metadatos y un sellado de tiempo (Timestamping) basado en el protocolo RFC 3161. Esto permite que el usuario porte su historial legal completo en su dispositivo móvil con una validez técnica verificable ante cualquier organismo nacional o internacional, eliminando la necesidad de portar documentos físicos vulnerables a pérdida, robo o deterioro ambiental. El sistema garantiza la durabilidad del dato por más de 100 años mediante redundancia en múltiples zonas de disponibilidad."
            },
            {
                sub: "Identidad Soberana (SSI) y Gestión de Consentimiento Granular",
                text: "System Kyron opera bajo el paradigma de la Identidad Soberana (Self-Sovereign Identity). Esto implica que el sistema no es 'dueño' de los datos; el usuario es el único administrador soberano de su información. El manual operativo detalla cómo el ciudadano puede otorgar o revocar accesos temporales a terceros (como entidades bancarias, empleadores o instituciones de salud) mediante la generación de tokens de acceso efímeros y granulares. El usuario decide exactamente qué datos comparte: puede autorizar la visualización de su título profesional sin necesidad de exponer su dirección de domicilio. Cada interacción de datos queda registrada en un log de auditoría inalterable basado en tecnología de cadena de bloques, permitiendo al usuario realizar una trazabilidad completa de quién, cuándo y para qué se consultó su expediente. Este nivel de transparencia y control total devuelve la propiedad de la vida digital al individuo, cumpliendo con los estándares internacionales (GDPR y similares) más exigentes de protección de datos personales. La interoperabilidad del nodo permite que esta identidad sea reconocida en diversos servicios del ecosistema sin fricciones adicionales."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes convergentes, aprovisionamiento digital remoto y telemetría de activos de misión crítica.",
        content: [
            {
                sub: "Aprovisionamiento Dinámico de eSIM y Estándares GSMA",
                text: "Kyron redefine la conectividad móvil eliminando por completo las barreras del hardware físico tradicional y la logística de distribución de chips. El módulo de Telecomunicaciones integra un servidor de aprovisionamiento remoto (SM-DP+) certificado bajo los estándares internacionales de la GSMA. Esta tecnología permite la generación instantánea de perfiles eSIM (Embedded SIM) altamente seguros. Una vez que la identidad del usuario ha sido validada mediante el protocolo biométrico 3D, el sistema asigna un MSISDN único y empaqueta las credenciales de red, los planes de datos y las claves de autenticación en un paquete de datos encriptado accesible a través de un código QR de un solo uso. El usuario simplemente inyecta este perfil en su smartphone compatible, activando una línea telefónica con capacidades de voz y datos 5G plenamente funcional en cuestión de segundos. Este enfoque no solo agiliza la operatividad empresarial al eliminar el manejo de tarjetas físicas, sino que también permite la gestión remota de flotas internacionales con perfiles multiregión, garantizando una conectividad ininterrumpida sin intervención física sobre el hardware. La seguridad está garantizada por el protocolo de enlace EAP-AKA que protege la identidad del abonado en la red core."
            },
            {
                sub: "Arquitectura de Red 5G de Ultra-Baja Latencia y Troncales SIP HD",
                text: "La infraestructura de telecomunicaciones sobre la que opera el ecosistema Kyron está diseñada específicamente para el tráfico de datos de misión crítica. Utilizamos tecnología de red 5G de última generación que ofrece latencias inferiores a 10ms, un requisito indispensable para la sincronización en milisegundos de bases de datos financieras y operaciones de Puntos de Venta (TPV) distribuidos. El manual técnico detalla cómo el sistema gestiona troncales SIP (Session Initiation Protocol) para voz sobre IP (VoIP) de alta definición, permitiendo que las organizaciones desplieguen centrales telefónicas virtuales con capacidades avanzadas de enrutamiento, IVR interactivo y grabación de llamadas integrada. Cada transmisión de voz y datos es encapsulada en túneles VPN dinámicos con cifrado de grado militar, protegiendo las comunicaciones corporativas contra ataques de interceptación (Man-in-the-Middle) y garantizando que el flujo de información viaje siempre por un carril prioritario, estable y seguro dentro de la red nacional. El aprovisionamiento de ancho de banda es dinámico, ajustándose a la demanda operativa de cada departamento."
            },
            {
                sub: "Consola NOC Maestro y Telemetría de Activos Digitales",
                text: "Para la administración macro de grandes flotas de comunicación corporativa, el sistema provee acceso exclusivo al Network Operations Center (NOC). Desde esta terminal de mando, los oficiales de tecnología pueden monitorear en tiempo real patrones de consumo de datos, detectar anomalías de red y aplicar políticas estrictas de 'Quality of Service' (QoS) para priorizar aplicaciones críticas de negocio (como el ERP o el TPV) sobre el tráfico de internet general. El sistema incorpora un protocolo de seguridad extrema denominado 'Kill Switch' remoto, que permite la invalidación y borrado de seguridad de cualquier línea o perfil eSIM en milisegundos en caso de detectarse una brecha de seguridad o pérdida del dispositivo físico. La telemetría integrada proporciona analíticas profundas sobre la ubicación geográfica de los activos, la intensidad de la señal recibida y el estado de salud del hardware, convirtiendo la conectividad en un activo estratégico totalmente gestionable, predecible y blindado. Se incluyen mapas de calor de cobertura y análisis de espectro para optimizar el despliegue de repetidores locales."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal adaptativa y control de activos físicos mediante Ledger transaccional.",
        content: [
            {
                sub: "Sincronización Fiscal Síncrona y Validación de Datos SENIAT",
                text: "El Punto de Venta (TPV) de System Kyron trasciende la funcionalidad de una caja registradora convencional; es un nodo de inteligencia fiscal síncrono conectado directamente a los protocolos de cumplimiento. En el momento exacto en que se inicia una venta, el ingreso del RIF o Cédula dispara una consulta API de alta velocidad a la base de datos de cumplimiento maestro de Kyron. Este motor extrae y valida instantáneamente la Razón Social y el Domicilio Fiscal oficial del contribuyente desde los registros institucionales. Este protocolo garantiza que el 100% de las facturas emitidas cumplan rigurosamente con la Providencia Administrativa SNAT/2011/0071 del SENIAT, eliminando por completo los errores de transcripción manual que suelen derivar en costosas sanciones. Adicionalmente, el motor de cálculo está pre-configurado para gestionar el Impuesto a las Grandes Transacciones Financieras (IGTF), detectando automáticamente el método de pago empleado (divisas, criptoactivos o moneda nacional) y aplicando la alícuota legal correspondiente de forma transparente tanto para el cajero como para el cliente final. El sistema genera de forma automática el número de control y la serie fiscal correlativa sin saltos ni duplicados."
            },
            {
                sub: "Gestión de Inventario mediante Kardex de Alta Precisión y Trazabilidad",
                text: "El control de existencias dentro del ecosistema opera bajo una arquitectura de Kardex perpetuo de alta fidelidad. Cada movimiento de mercancía —ya sea una entrada por compra, una venta por TPV, una devolución o un ajuste técnico— queda registrado con un identificador de transacción único y un sellado de tiempo inmutable en el Ledger. El manual operativo detalla la configuración de métodos de valoración como 'Costo Promedio Ponderado' o 'FIFO' (First-In, First-Out), adaptándose a la política contable específica de la empresa. La interfaz avanzada permite la gestión simultánea de múltiples depósitos, almacenes y sucursales geográficamente distribuidas, donde la transferencia de activos entre nodos es validada mediante protocolos de escaneo QR. El sistema asegura la integridad absoluta del stock mediante auditorías de 'Conciliación Ciega' periódicas, donde el operario debe confirmar físicamente las cantidades sin tener acceso al saldo teórico del sistema, forzando así una precisión matemática en el control físico de los activos. Se integran alertas por caducidad de lotes y gestión de números de serie para equipos de alto valor."
            },
            {
                sub: "IA Predictiva para el Reabastecimiento Estratégico y Optimización de Stock",
                text: "Más allá del simple registro de movimientos, Kyron emplea modelos avanzados de aprendizaje automático (Machine Learning) para analizar exhaustivamente la velocidad de rotación de cada SKU (Stock Keeping Unit). El manual técnico instruye sobre la activación del 'Asistente de Compras Inteligente', un motor que procesa tendencias históricas de venta, factores de estacionalidad del mercado y plazos de entrega promedio de los proveedores registrados. Al detectar que un ítem ha alcanzado su 'Punto de Pedido' óptimo, el sistema genera automáticamente una sugerencia de orden de compra, incluyendo una terna de cotizaciones competitivas basadas en el historial de transacciones. Este enfoque proactivo minimiza drásticamente el capital inmovilizado en inventario de baja rotación y elimina las pérdidas por ruptura de stock en productos de alta demanda. El resultado es una optimización sustancial del ciclo de conversión de efectivo y una mejora directa en la rentabilidad operativa de la compañía. El sistema también proyecta el flujo de caja necesario para cubrir estas compras futuras, permitiendo una planificación financiera sin sorpresas."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y vigilancia normativa ininterrumpida 24/7.",
        content: [
            {
                sub: "Motor de Auditoría Preventiva y Generación Automatizada de Archivos TXT",
                text: "System Kyron neutraliza la vulnerabilidad operativa ante fiscalizaciones externas mediante un motor de auditoría preventiva que opera de forma autónoma sobre cada transacción registrada. El sistema compila automáticamente los Libros de Compras y Ventas, formateándolos con una precisión del 100% según las especificaciones técnicas vigentes del SENIAT. Antes de cada cierre de periodo mensual, nuestra Inteligencia Artificial ejecuta una 'Prueba de Coherencia Fiscal' exhaustiva que cruza los ingresos declarados con los movimientos de cuentas bancarias y las variaciones de inventario, detectando preventivamente cualquier discrepancia o error de forma que pudiera generar una sanción. El manual operativo proporciona instrucciones detalladas sobre la generación y exportación del archivo TXT para la Declaración de IVA y las Retenciones de ISLR, asegurando que los archivos sean plenamente compatibles con el portal fiscal nacional, garantizando así declaraciones impecables, precisas y siempre a tiempo. El sistema incluye un validador de estructura antes de la descarga final para asegurar el éxito en la carga al portal del SENIAT."
            },
            {
                sub: "RIPF: Reajuste por Inflación Fiscal Automatizado y Cálculo Técnico",
                text: "Dada la complejidad y volatilidad del entorno económico nacional, el Reajuste por Inflación Fiscal (RIPF) es uno de los procedimientos técnicos más críticos y laboriosos para cualquier contribuyente. Kyron automatiza este proceso de forma integral, cargando diariamente los Índices Nacionales de Precios al Consumidor (INPC) oficiales publicados por el BCV. El sistema identifica automáticamente todas las partidas no monetarias de la organización (activos fijos, inventarios, inversiones, patrimonio), aplica los factores de corrección actuarial correspondientes y genera de forma autónoma el asiento contable de ajuste respectivo. Este módulo no solo ahorra semanas de trabajo manual al equipo contable, sino que proporciona un sustento técnico-matemático inatacable ante una inspección fiscal, permitiendo sincerar la utilidad neta gravable real y protegiendo el patrimonio de la empresa contra el efecto erosivo de la inflación. Los reportes incluyen el detalle del factor de actualización aplicado a cada activo individualmente."
            },
            {
                sub: "Vigilancia Activa de Gaceta Oficial y Adaptación Normativa Instantánea",
                text: "El ecosistema integra un nodo de vigilancia legal especializado que monitorea la Gaceta Oficial de la República Bolivariana de Venezuela de forma ininterrumpida. Cualquier modificación legislativa en alícuotas impositivas, la creación de nuevas contribuciones especiales (como la reciente Ley de Protección de Pensiones) o la publicación de decretos de exoneración temporal, se traduce automáticamente en una actualización de las reglas de negocio de la plataforma en tiempo real. El manual describe cómo el sistema notifica proactivamente a los administradores sobre cambios relevantes para su sector económico y adapta todos los cálculos de nómina, facturación y retenciones de manera transparente. Este blindaje normativo dinámico asegura que la organización nunca opere bajo leyes derogadas o parámetros obsoletos, manteniendo un estatus de 'Cero Riesgo Fiscal' permanente y permitiendo a la gerencia enfocarse exclusivamente en el crecimiento del negocio. La IA también resume los puntos clave de cada gaceta para una comprensión rápida de la junta directiva."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y BI Predictivo",
        icon: TrendingUp,
        description: "Dashboard de mando ejecutivo para la toma de decisiones estratégicas basadas en analítica de datos de alta precisión.",
        content: [
            {
                sub: "Modelado de Factibilidad Económica: VAN, TIR y Análisis de Sensibilidad",
                text: "El módulo de Business Intelligence (BI) de Kyron dota a la alta directiva de herramientas de modelado financiero de nivel superior. El manual instruye sobre el uso del simulador de inversiones avanzado, donde el usuario puede proyectar flujos de caja libre (Cash Flow) para nuevos proyectos o líneas de negocio. El sistema calcula de forma automática indicadores de rentabilidad críticos como el Valor Actual Neto (VAN), la Tasa Interna de Retorno (TIR) y el Período de Recuperación del Capital (Payback Period). Además, la plataforma permite realizar análisis de sensibilidad multidimensional mediante la creación de escenarios dinámicos (Optimista, Pesimista y Caso Base), alterando variables macroeconómicas como tasas de cambio, inflación proyectada, costos de insumos o demanda estimada del mercado. Esto proporciona una base científica y cuantitativa para la toma de decisiones sobre expansión, fusiones o adquisiciones, mitigando el riesgo financiero mediante proyecciones basadas en datos reales y algoritmos de Monte Carlo para la evaluación de probabilidades de éxito."
            },
            {
                sub: "Billetera Multimoneda y Protocolo de Conciliación Bancaria Automatizada",
                text: "En un entorno económico caracterizado por el bimonetarismo, la gestión eficiente de la tesorería es vital para la supervivencia empresarial. La Billetera Kyron centraliza saldos y movimientos en VES, USD y EUR, aplicando automáticamente las tasas de cambio oficiales del BCV con actualización en tiempo real. El manual detalla el protocolo de conciliación bancaria inteligente: el sistema procesa extractos bancarios digitales y utiliza algoritmos avanzados de coincidencia de patrones (Pattern Matching) para vincular cada transferencia, depósito o Pago Móvil con su factura o documento de origen correspondiente. Este proceso detecta instantáneamente duplicidades, omisiones o discrepancias menores, asegurando que el flujo de caja reflejado en el sistema sea un espejo exacto de la realidad bancaria de la empresa. Este blindaje técnico previene fraudes internos y asegura que la disponibilidad de fondos reportada para la toma de decisiones sea siempre real, verificada y auditable. El sistema permite la gestión de cuentas en custodia y fondos rotatorios con firmas conjuntas digitales."
            },
            {
                sub: "Análisis Profundo de Margen de Contribución y Punto de Equilibrio Dinámico",
                text: "La inteligencia financiera de Kyron desglosa la rentabilidad operativa hasta el nivel más granular de producto, servicio o cliente individual. El sistema calcula automáticamente el Margen de Contribución por unidad, deduciendo todos los costos variables (directos e indirectos) asociados a cada transacción. El manual enseña a interpretar el reporte de 'Punto de Equilibrio Dinámico', una métrica vital que indica con precisión matemática cuánto debe facturar la organización diariamente para cubrir sus costos fijos operativos. Esta visibilidad total permite a la gerencia realizar ajustes de precios estratégicos en tiempo real y enfocar los recursos de marketing y ventas en los segmentos de mercado que generan el mayor retorno neto. Maximizar la utilidad neta es ahora un proceso impulsado por datos, eliminando las conjeturas y optimizando el rendimiento de cada activo de la compañía. Se incluyen gráficos de Pareto para identificar el 20% de productos que generan el 80% de la utilidad."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento Humano y RR.HH.",
        icon: Briefcase,
        description: "Administración integral del capital humano con cumplimiento estricto de la LOTTT y normativas parafiscales vigentes.",
        content: [
            {
                sub: "Motor de Cálculo de Nómina Automatizado bajo la LOTTT",
                text: "El motor de nómina de System Kyron ha sido desarrollado integrando la totalidad de la lógica jurídica y matemática de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT). El sistema automatiza con precisión absoluta el cálculo de salarios integrales, bonos nocturnos, horas extras diurnas y nocturnas, días feriados y descansos trabajados. El manual describe detalladamente cómo configurar los diversos conceptos salariales y no salariales (como el beneficio de Cestaticket Socialista) y cómo el sistema gestiona la garantía de prestaciones sociales de forma quincenal o mensual. Al finalizar cada ciclo de pago, el motor genera recibos de pago digitales con plena validez legal, que son despachados automáticamente a través de canales de comunicación seguros y encriptados. Esto permite mantener un registro histórico inmutable y auditable de cada remuneración pagada a la fuerza laboral, garantizando la paz laboral y el cumplimiento legal total. El sistema también calcula automáticamente las retenciones de ley (SSO, SPF, FAOV) para cada trabajador."
            },
            {
                sub: "Control de Libros Laborales Obligatorios y Gestión de Solvencias",
                text: "El cumplimiento de las obligaciones laborales en Venezuela exige el mantenimiento de registros administrativos sumamente rigurosos. Kyron automatiza de forma nativa la actualización del Libro de Vacaciones, el Libro de Horas Extras y el Libro de Personal Retirado, entre otros. Paralelamente, el sistema gestiona íntegramente las retenciones y los aportes patronales obligatorios de ley (IVSS, FAOV, INCES), generando los archivos de carga masiva necesarios para los portales institucionales (como el sistema TIUNA). El manual proporciona una guía clara sobre cómo mantener las solvencias laborales al día, evitando bloqueos administrativos innecesarios y garantizando que la organización esté siempre habilitada para licitar, contratar con el estado o realizar trámites notariales sin impedimentos derivados de deudas laborales o retrasos en la declaración parafiscal. Se incluye un calendario de alertas para la presentación de informes trimestrales ante el Ministerio del Trabajo."
            },
            {
                sub: "Protocolo de Finiquito, Liquidación Técnica y Cálculo de Retroactividad",
                text: "El momento del cese de una relación laboral representa un escenario de alto riesgo legal y financiero para cualquier organización. El módulo especializado de prestaciones sociales de Kyron realiza cálculos técnicos exhaustivos de liquidación, contemplando la retroactividad de prestaciones sociales (Art. 142 de la LOTTT), el pago de utilidades fraccionadas, vacaciones vencidas y no disfrutadas, y bonos vacacionales proporcionales. El manual detalla el procedimiento para generar el 'Documento de Finiquito' oficial, el cual incluye un desglose matemático transparente de cada concepto de pago y un código QR de validación única que vincula el documento con la transacción de pago realizada. Este rigor técnico absoluto protege a la empresa contra futuras demandas por errores de cálculo y garantiza al trabajador el cobro exacto y justo de sus haberes acumulados durante su tiempo de servicio, cerrando el ciclo laboral de forma segura y profesional. El sistema también proyecta el pasivo laboral total de la empresa para fines contables."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico Pro",
        icon: Gavel,
        description: "Control centralizado de expedientes, contratos inteligentes y asesoría legal IA entrenada en leyes venezolanas.",
        content: [
            {
                sub: "Gestión Integral del Ciclo de Vida de Contratos (CLM) y Firmas Digitales",
                text: "Este módulo avanzado centraliza y automatiza la totalidad de la gestión documental legal de la organización. El manual operativo explica detalladamente cómo utilizar la vasta biblioteca de plantillas pre-aprobadas, redactadas y visadas por expertos, para instrumentos tales como contratos de servicios, acuerdos de confidencialidad (NDA), contratos de arrendamiento comercial y poderes de representación específicos. El sistema integra un motor de flujo de trabajo (Workflow) donde cada documento puede ser sometido a múltiples niveles de revisión jerárquica antes de su formalización. El Ledger inmutable de Kyron registra cada versión y cambio realizado en el documento (Version Control), garantizando una trazabilidad total y asegurando que la última versión firmada digitalmente sea la única legalmente vinculante y accesible para las partes interesadas, eliminando el riesgo de manipulación o pérdida de documentos físicos críticos. Las firmas digitales cumplen con los requisitos de la Ley de Mensajes de Datos y Firmas Electrónicas."
            },
            {
                sub: "Sistema Inteligente de Alertas de Vencimiento, Caducidad y Renovación",
                text: "La omisión o el retraso en la renovación de poderes legales, licencias o contratos puede resultar en la paralización operativa de una empresa. Kyron incorpora un sistema de monitoreo proactivo que genera alertas automáticas y escalonadas (90, 60 y 30 días de antelación) antes del vencimiento de cualquier instrumento legal registrado. El manual detalla la configuración de estas notificaciones críticas para diversos activos legales: desde poderes de administración y representación judicial, hasta habilitaciones de CONATEL, registros de marcas comerciales ante el SAPI o licencias de uso de software corporativo. Esta vigilancia automatizada permite a la gerencia legal gestionar las renovaciones ante los registros y notarías (SAREN) con el tiempo suficiente, garantizando que la representación jurídica de la empresa y sus derechos de propiedad intelectual permanezcan siempre protegidos y vigentes. El sistema permite adjuntar escaneos de alta resolución de los sellos y firmas oficiales para una consulta rápida."
            },
            {
                sub: "Asistente Consultor Legal IA y Análisis Técnico de Gacetas Oficiales",
                text: "System Kyron integra de forma nativa un modelo de lenguaje avanzado (LLM) entrenado específicamente en el complejo ordenamiento jurídico venezolano. El manual instruye al usuario sobre cómo interactuar con este asistente para realizar consultas técnicas profundas sobre Gacetas Oficiales recientes y complejas, como la N° 6.952 Extraordinario. La IA posee la capacidad de interpretar decretos de exoneración impositiva, nuevas normativas de aduanas o reformas en el régimen arancelario nacional, citando artículos específicos y proporcionando resúmenes ejecutivos sobre las nuevas obligaciones y oportunidades para la organización. Aunque este motor no sustituye el criterio profesional de un abogado, reduce drásticamente los tiempos de respuesta legal y minimiza la dependencia de horas de consultoría externa para la resolución de dudas operativas cotidianas, elevando la eficiencia del departamento jurídico interno. La base de conocimiento se actualiza diariamente con la jurisprudencia del TSJ."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería, Arquitectura y Planificación IA",
        icon: Cpu,
        description: "Herramientas avanzadas de planimetría, cómputos métricos automatizados y presupuestos de obra integrados con visión artificial.",
        content: [
            {
                sub: "Generación Automatizada de Planos mediante Visión Artificial y Fotogrametría",
                text: "Este módulo disruptivo permite la digitalización técnica de espacios físicos con un nivel de esfuerzo mínimo. El manual describe el protocolo operativo: al cargar fotografías de alta resolución de un inmueble o infraestructura industrial, la IA de Kyron despliega algoritmos de fotogrametría y detección de bordes para identificar con precisión la geometría del espacio, la ubicación exacta de muros de carga, tabiquerías y vanos de puertas o ventanas. El usuario solo requiere introducir una única cota de referencia (por ejemplo, el ancho estándar de una puerta) y el sistema extrapola y escala automáticamente el resto de la planta arquitectónica, generando un plano esquemático en formato vectorial (CAD compatible). Esta funcionalidad es vital para la realización de levantamientos rápidos de nuevas sucursales, la auditoría de espacios físicos o la planificación preliminar de remodelaciones estructurales sin necesidad de desplegar costosos equipos de topografía láser en las fases iniciales del proyecto. El sistema genera archivos .DXF y .PDF de alta precisión."
            },
            {
                sub: "Cálculo Automático de Cómputos Métricos y Análisis de Rendimiento de Materiales",
                text: "Vinculado directamente a la planimetría generada por la IA, el sistema permite la asignación virtual de acabados y materiales constructivos a las diversas superficies detectadas en el modelo. El manual técnico explica cómo la plataforma calcula de forma autónoma los cómputos métricos detallados (metros cuadrados de pintura, m² de revestimiento de pisos, metros lineales de rodapiés o ducterías). El usuario tiene acceso a un catálogo de materiales pre-cargado con especificaciones de rendimiento técnico certificadas (por ejemplo, galones de pintura requeridos según la porosidad de la superficie). El software genera una lista de materiales (Bill of Materials) con una precisión matemática, minimizando el desperdicio de suministros en obra y asegurando que la procura de materiales sea exacta, eficiente y optimizada para la ejecución de proyectos de infraestructura o planes de mantenimiento preventivo de activos físicos. Se incluyen factores de desperdicio configurables por categoría de obra."
            },
            {
                sub: "Elaboración de Presupuestos de Obra (APU) y Control de Varianza de Costos",
                text: "El módulo de ingeniería culmina con la generación de un presupuesto de obra detallado y profesional. El manual técnico instruye sobre cómo el sistema integra automáticamente los costos de los materiales calculados con las estimaciones de mano de obra especializada y los gastos operativos de construcción (Análisis de Precios Unitarios - APU). Este presupuesto dinámico está interconectado en tiempo real con el módulo de compras y facturación, permitiendo validar los precios proyectados contra los costos de mercado reales de los proveedores registrados en el sistema. Durante la fase de ejecución, la plataforma proporciona un análisis de varianza continuo, alertando a la gerencia de ingeniería sobre cualquier desviación presupuestaria antes de que esta afecte la rentabilidad final del proyecto, manteniendo un control financiero y técnico riguroso sobre la expansión física de la compañía. Se generan cronogramas de desembolso y curvas S de progreso físico-financiero."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Fundación Kyron",
        icon: Recycle,
        description: "Operatividad de infraestructura verde, economía circular y monetización de residuos mediante tecnología Blockchain.",
        content: [
            {
                sub: "Tecnología de Inducción Magnética Síncrona en Smart Bins de Kyron",
                text: "System Kyron implementa una solución de economía circular de vanguardia a nivel urbano y corporativo a través de sus estaciones de reciclaje inteligentes (Smart Bins). El manual operativo desglosa la base científica: cada estación está equipada con sensores de inducción magnética síncrona de alta sensibilidad que detectan la firma electromagnética específica de los materiales depositados. Esta tecnología permite clasificar de forma autónoma y en milisegundos los metales ferrosos y no ferrosos de los polímeros plásticos (PET, HDPE) y otros residuos reciclables. Cuando un ciudadano o empleado interactúa con la estación, el sistema valida la composición del residuo, su peso neto y su grado de pureza. Esta clasificación automatizada en el punto de origen es el pilar fundamental para un reciclaje industrial eficiente, ya que elimina los elevados costos de separación manual posterior y garantiza una calidad superior de la materia prima recuperada para su reinserción en la cadena productiva. El hardware incluye un sistema de compactación neumática para maximizar la capacidad de almacenamiento."
            },
            {
                sub: "Eco-Créditos: Protocolo de Tokenización de Hábitos Sostenibles",
                text: "Dentro del ecosistema Kyron, cada acción ambiental verificada se traduce automáticamente en un incentivo económico tangible para el usuario. El manual describe el protocolo de emisión de 'Eco-Créditos' registrados en el Blockchain de la plataforma. Al ser reconocido el usuario mediante su Identidad Digital, el Smart Bin autoriza una transferencia inmediata de activos digitales a su billetera electrónica personal. El valor de estos créditos está directamente respaldado por el mercado de comercialización de los materiales recolectados y procesados por la Fundación Kyron. Estos puntos acumulados pueden ser canjeados en una red nacional de comercios aliados por productos, servicios de salud o descuentos directos. Se crea así un círculo virtuoso donde la responsabilidad ambiental genera un rendimiento financiero auditable y transparente, fomentando una cultura de sostenibilidad masiva mediante incentivos económicos reales y medibles. El sistema utiliza Smart Contracts para asegurar la transparencia en la emisión de créditos."
            },
            {
                sub: "Trazabilidad Total de Activos Verdes y Generación de Reportes ESG",
                text: "Para las organizaciones comprometidas con la responsabilidad corporativa, Kyron ofrece una trazabilidad absoluta de su impacto ambiental. El manual técnico detalla cómo el sistema genera certificados de 'Activos Verdes' inmutables. A través de la plataforma, se puede rastrear el ciclo de vida completo de cada kilogramo de material recolectado: desde el Smart Bin específico y la fecha de depósito, hasta su transformación final en un nuevo insumo. Estos datos granulares permiten a las empresas generar Reportes ESG (Environmental, Social, and Governance) de alta fidelidad, certificando su reducción real de la huella de carbono con pruebas basadas en datos inalterables y no en simples estimaciones estadísticas. Esto no solo mejora sustancialmente la reputación corporativa ante inversionistas y clientes, sino que facilita el acceso a incentivos fiscales verdes y líneas de financiamiento internacional condicionadas a parámetros de sostenibilidad verificada. Se integran indicadores de cumplimiento con los Objetivos de Desarrollo Sostenible (ODS)."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y Protección LOPNNA",
        icon: HeartHandshake,
        description: "Servicios civiles integrales para el individuo, gestión de salud inteligente y cumplimiento de obligaciones familiares bajo la LOPNNA.",
        content: [
            {
                sub: "Gestión Automatizada de Documentación Civil y Red de Salud Integrada",
                text: "El Portal Ciudadano actúa como el asistente legal y personal definitivo del usuario. El manual describe detalladamente los flujos de trabajo para la solicitud y obtención de copias certificadas de documentos vitales como Partidas de Nacimiento y Actas de Matrimonio, integrando canales de comunicación directa con los registros civiles. Paralelamente, el portal ofrece un ecosistema de salud inteligente: los usuarios pueden consultar en tiempo real el directorio médico actualizado de los especialistas y centros de salud afiliados a su cobertura de seguro, agendar citas para telemedicina o consultas presenciales, y recibir sus resultados de laboratorio o informes diagnósticos directamente en su Bóveda Civil protegida. La integración nativa con la Identidad Digital garantiza que el historial médico personal sea portátil, estrictamente privado y esté siempre bajo el control exclusivo del ciudadano, facilitando una atención médica de alta calidad, coordinada y eficiente en cualquier momento. El sistema incluye recordatorios de vacunación y chequeos anuales según el perfil de edad."
            },
            {
                sub: "Calculadora Técnica de Manutención y Cumplimiento de la LOPNNA",
                text: "System Kyron simplifica y asegura el cumplimiento de las responsabilidades familiares establecidas en la Ley Orgánica para la Protección de Niños, Niñas y Adolescentes (LOPNNA). El manual operativo explica el funcionamiento de la calculadora de manutención técnica, una herramienta que estima los montos de aporte económico necesarios basándose en parámetros legales objetivos: la unidad tributaria vigente, el nivel de ingresos mensuales documentados del obligado y las necesidades básicas certificadas del menor de edad. El sistema genera registros de depósitos y transacciones verificables que sirven como prueba de cumplimiento inexpugnable ante los tribunales de protección de menores. Este módulo promueve activamente la armonía en el núcleo familiar y asegura que los derechos fundamentales de los niños sean respetados y garantizados mediante una gestión financiera transparente, justa y totalmente automatizada. Se incluyen mecanismos de indexación automática para evitar el rezago del monto de manutención ante la inflación."
            },
            {
                sub: "Asistente de Registro RIF para Menores y Gestión de Cargas Familiares",
                text: "La inscripción de un menor de edad en el Registro de Información Fiscal (RIF) es un requerimiento legal crítico para diversos trámites, desde gestiones de herencia hasta la declaración formal de cargas familiares para la obtención de rebajas en el Impuesto sobre la Renta (ISLR). El manual proporciona una guía interactiva paso a paso y un asistente inteligente de llenado de planillas digitales. Utilizando los datos de la Partida de Nacimiento del menor y el RIF del representante legal, ambos ya almacenados de forma segura en la bóveda digital, el sistema pre-puebla automáticamente los formularios oficiales del SENIAT. Este proceso reduce drásticamente el tiempo de gestión administrativa y garantiza que toda la documentación presentada ante la administración tributaria nacional sea correcta y coherente desde el primer intento, facilitando el acceso de la familia a beneficios fiscales y el resguardo de los derechos sucesorios del menor. El asistente también guía sobre la actualización periódica de la carga familiar en el portal del SENIAT."
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
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 40px;">
                <table style="width: 100%; border: none;">
                    <tr>
                        <td style="width: 80px; border: none;">
                            <div style="background-color: #2563eb; color: white; width: 60px; height: 60px; text-align: center; line-height: 60px; font-weight: bold; font-size: 24pt; border-radius: 10px;">K</div>
                        </td>
                        <td style="border: none; vertical-align: middle;">
                            <h1 style="color: #2563eb; margin: 0; font-size: 28pt; text-transform: uppercase; font-family: 'Arial Black', sans-serif;">SYSTEM KYRON</h1>
                            <p style="color: #666; margin: 0; font-size: 10pt; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Manual de Operaciones Maestro v2.6.5</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-bottom: 50px;">
                <h2 style="color: #1e293b; border-left: 10px solid #2563eb; padding-left: 20px; margin-bottom: 20px;">DOCUMENTACIÓN TÉCNICA INTEGRAL</h2>
                <p style="font-style: italic; color: #475569;">Este documento contiene los protocolos operativos de misión crítica para el ecosistema integral de gestión administrativa, telecomunicaciones avanzadas y activos digitales inmutables.</p>
            </div>
        `;

        manualModules.forEach(mod => {
            docContent += `
                <div style="page-break-before: always; margin-top: 40px;">
                    <h2 style="color: #2563eb; text-transform: uppercase; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 30px;">${mod.title}</h2>
                    <p style="font-weight: bold; color: #475569; margin-bottom: 25px;">${mod.description}</p>
            `;
            
            mod.content.forEach(item => {
                docContent += `
                    <div style="margin-bottom: 35px;">
                        <h3 style="color: #1e293b; font-size: 14pt; margin-bottom: 15px; background-color: #f8fafc; padding: 10px; border-radius: 5px;">${item.sub}</h3>
                        <p style="text-align: justify; line-height: 1.6; font-size: 11pt; color: #334155;">${item.text}</p>
                    </div>
                `;
            });
            
            docContent += `</div>`;
        });

        const footer = `
            <div style="margin-top: 100px; border-top: 1px solid #eee; pt: 20px; text-align: center; font-size: 8pt; color: #94a3b8;">
                <p>PROPIEDAD INTELECTUAL DE SYSTEM KYRON, C.A. • DOCUMENTO CONFIDENCIAL • 2026</p>
                <p>VALIDADO POR EL NODO DE SEGURIDAD MAESTRO • ID: SK-OPER-2.6.5</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual de Usuario System Kyron</title></head><body style='font-family: Arial, sans-serif;'>";
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
                <div className="absolute top-0 right-0 w-full h-[1400px] bg-primary/5 rounded-full blur-[250px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-secondary/5 rounded-full blur-[200px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            {/* Header Fijo */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print">
                <div className="flex items-center gap-6">
                    <Link href="/" className="hover:scale-105 transition-transform">
                        <Logo className="h-10 w-10 shadow-glow" />
                    </Link>
                    <div className="flex flex-col border-l border-white/10 pl-6 ml-2">
                        <span className="text-xs font-black tracking-[0.6em] uppercase italic text-white/90">SYSTEM KYRON</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Manual de Operaciones v2.6.5</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
                        <Link href="/"><Home className="mr-2 h-3.5 w-3.5" /> INICIO</Link>
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl text-[9px] font-black uppercase shadow-glow" onClick={handleDownload}>
                        <Download className="mr-2 h-3.5 w-3.5" /> EXPORTAR WORD (.DOC)
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

                    {/* Contenido Principal */}
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
