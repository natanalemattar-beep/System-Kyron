
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
    Lock
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
        title: "1. Identidad Digital y Protocolos de Bóveda Civil",
        icon: Fingerprint,
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales bajo estándares de seguridad militar y cifrado simétrico AES-512 con rotación de llaves.",
        content: [
            {
                sub: "Arquitectura de Validación Biométrica 3D y Motores de Inferencia de Prueba de Vida",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía absoluta de la identidad digital. El proceso de enrolamiento no se limita a una simple captura fotográfica; el sistema despliega un motor de visión artificial de alta fidelidad que ejecuta un escaneo facial tridimensional exhaustivo mediante nubes de puntos infrarrojos. Este proceso identifica y mapea más de 128 puntos vectoriales únicos que definen la morfología ósea y muscular del usuario, creando una 'Firma Biométrica' inalterable. Esta firma es procesada mediante un algoritmo de hashing unidireccional (SHA-3) y almacenada como un registro inmutable en el Ledger del ecosistema. Cada vez que un ciudadano o empleado autoriza una transacción financiera de alto impacto, firma un contrato o accede a nodos de datos sensibles, el sistema exige una validación de 'Prueba de Vida' activa. Este protocolo avanzado detecta micro-movimientos involuntarios, reflejos pupilares ante pulsos lumínicos, cambios en la oxigenación sanguínea detectables por cámara y texturas dérmicas en tiempo real. Esta tecnología garantiza la imposibilidad técnica de suplantación mediante fotografías, pantallas de alta resolución o sofisticados ataques de deepfakes generados por IA. Es, hoy por hoy, el estándar de seguridad más riguroso disponible para la protección de la identidad ciudadana y corporativa, cumpliendo con los estándares de identidad digital de la Unión Europea (eIDAS) y normativas internacionales de firmas electrónicas avanzadas."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles y Arquitectura Cold-Storage Distribuida",
                text: "La Bóveda Civil de Kyron representa un entorno de almacenamiento digital de ultra-seguridad, diseñado para la preservación a largo plazo de la integridad legal del individuo. Los documentos maestros, tales como Cédulas de Identidad, Registros de Información Fiscal (RIF), Pasaportes, Títulos Universitarios y Actas Civiles, no se almacenan como simples archivos en un servidor convencional. Al ser cargados, cada documento es sometido a un proceso de fragmentación y cifrado distribuido utilizando algoritmos AES-512 con rotación dinámica de llaves. La arquitectura de 'Almacenamiento Frío' asegura que los datos permanezcan inaccesibles para el nodo de red general, activándose únicamente tras una secuencia de autenticación exitosa iniciada por el titular biometrizado. Además, nuestra IA realiza una limpieza forense de metadatos y un sellado de tiempo (Timestamping) basado en el protocolo RFC 3161. Esto permite que el usuario porte su historial legal completo en su dispositivo móvil con una validez técnica verificable mediante códigos QR dinámicos ante cualquier organismo nacional o internacional, eliminando la necesidad de portar documentos físicos vulnerables a pérdida, robo o deterioro ambiental. El sistema garantiza la durabilidad del dato por más de 100 años mediante redundancia en múltiples zonas de disponibilidad y protocolos de recuperación de desastres ante fallos electromagnéticos catastróficos."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom de Quinta Generación (5G) y Aprovisionamiento eSIM",
        icon: Radio,
        description: "Administración de redes convergentes de ultra-baja latencia, aprovisionamiento digital remoto bajo estándar GSMA y telemetría de activos de misión crítica.",
        content: [
            {
                sub: "Protocolo de Aprovisionamiento Dinámico de eSIM y Certificación GSMA SM-DP+",
                text: "Kyron redefine la conectividad móvil eliminando por completo las barreras del hardware físico tradicional y la logística de distribución de chips. El módulo de Telecomunicaciones integra un servidor de aprovisionamiento remoto (SM-DP+) certificado bajo los estándares internacionales de la GSMA. Esta tecnología permite la generación instantánea de perfiles eSIM (Embedded SIM) altamente seguros. Una vez que la identidad del usuario ha sido validada mediante el protocolo biométrico 3D, el sistema asigna un MSISDN único y empaqueta las credenciales de red, los planes de datos y las claves de autenticación en un paquete de datos encriptado accesible a través de un código QR de un solo uso o mediante inyección push. El usuario simplemente inyecta este perfil en su smartphone compatible, activando una línea telefónica con capacidades de voz sobre LTE (VoLTE) y datos 5G plenamente funcional en cuestión de milisegundos. Este enfoque no solo agiliza la operatividad empresarial al eliminar el manejo de tarjetas físicas, sino que también permite la gestión remota de flotas internacionales con perfiles multiregión, garantizando una conectividad ininterrumpida sin intervención física sobre el hardware. La seguridad de la conexión está garantizada por el protocolo de enlace EAP-AKA que protege la identidad del abonado contra ataques de intercepción de señal en el aire."
            },
            {
                sub: "Arquitectura de Red Core 5G y Troncalización SIP de Alta Disponibilidad",
                text: "La infraestructura de telecomunicaciones sobre la que opera el ecosistema Kyron está diseñada específicamente para el tráfico de datos de misión crítica. Utilizamos una arquitectura de red Core 5G distribuida que ofrece latencias de extremo a extremo inferiores a 10ms, un requisito indispensable para la sincronización síncrona de bases de datos financieras y operaciones de Puntos de Venta (TPV) distribuidos en entornos de alta transaccionalidad. El manual técnico detalla cómo el sistema gestiona troncales SIP (Session Initiation Protocol) para voz sobre IP (VoIP) de alta definición, permitiendo que las organizaciones desplieguen centrales telefónicas virtuales con capacidades avanzadas de enrutamiento basado en habilidades, IVR interactivo con reconocimiento de voz y grabación de llamadas encriptada. Cada transmisión de voz y datos es encapsulada en túneles VPN dinámicos con cifrado IPsec, protegiendo las comunicaciones corporativas contra ataques de escucha y garantizando que el flujo de información viaje siempre por un carril prioritario dentro de la infraestructura de red de Kyron."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inteligencia de Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal adaptativa, validación síncrona de RIF y control de activos físicos mediante Ledger transaccional.",
        content: [
            {
                sub: "Motores de Validación Fiscal Síncrona y Cumplimiento de Providencia 0071",
                text: "El Punto de Venta (TPV) de System Kyron no es solo una interfaz de cobro; es un nodo de inteligencia fiscal síncrono. En el momento en que se introduce el RIF o Cédula de un cliente, el sistema dispara una consulta API de baja latencia a la base de datos de cumplimiento maestro. Este motor valida instantáneamente la Razón Social, el Domicilio Fiscal y la condición de contribuyente (Ordinario, Especial, Exento) según los registros oficiales actualizados. Este protocolo garantiza que el 100% de las facturas emitidas cumplan rigurosamente con la Providencia Administrativa SNAT/2011/0071 del SENIAT, eliminando errores humanos que derivan en sanciones. El motor gestiona de forma nativa el IGTF (Impuesto a las Grandes Transacciones Financieras), detectando el método de pago (divisas, criptoactivos o bolívares) y aplicando la alícuota legal correspondiente de forma automática. Además, el sistema genera el número de control y la serie fiscal correlativa de forma inalterable, manteniendo la integridad del libro de ventas en tiempo real."
            },
            {
                sub: "Gestión de Inventario mediante Kardex de Precisión y Trazabilidad de SKU",
                text: "El control de existencias dentro del ecosistema opera bajo una arquitectura de Kardex perpetuo de alta fidelidad. Cada movimiento de mercancía queda registrado con un identificador de transacción único y un sellado de tiempo inmutable. El manual detalla la configuración de métodos de valoración como 'Costo Promedio Ponderado' o 'FIFO', adaptándose a la política contable específica de la organización. La interfaz permite la gestión simultánea de múltiples depósitos y sucursales geográficamente distribuidas, donde la transferencia de activos es validada mediante protocolos de escaneo QR y firmas de recepción digital. El sistema asegura la precisión del stock mediante auditorías de 'Conciliación Ciega', forzando una precisión matemática en el control físico de los activos y alertando sobre mermas o discrepancias injustificadas mediante analítica predictiva."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Protocolos de Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y vigilancia normativa ininterrumpida basada en IA entrenada en legislación nacional.",
        content: [
            {
                sub: "Motor de Auditoría Preventiva y Generación de Declaraciones en Tiempo Real",
                text: "System Kyron neutraliza la vulnerabilidad operativa ante fiscalizaciones mediante un motor de auditoría preventiva que opera sobre cada transacción. El sistema compila automáticamente los Libros de Compras y Ventas, formateándolos con una precisión total según las especificaciones técnicas del SENIAT. Antes de cada cierre mensual, nuestra IA ejecuta una 'Prueba de Coherencia' que cruza ingresos declarados con movimientos bancarios y variaciones de inventario, detectando preventivamente cualquier discrepancia. El manual proporciona instrucciones detalladas sobre la generación del archivo XML/TXT para la Declaración de IVA y las Retenciones de ISLR, asegurando una compatibilidad total con el portal fiscal nacional y garantizando declaraciones impecables y siempre a tiempo."
            },
            {
                sub: "Automatización Integral del Reajuste por Inflación Fiscal (RIPF)",
                text: "El Reajuste por Inflación Fiscal (RIPF) es automatizado íntegramente por Kyron, eliminando el error humano en cálculos actuariales complejos. El sistema carga diariamente los Índices Nacionales de Precios al Consumidor (INPC) oficiales del BCV. Identifica automáticamente partidas no monetarias (activos fijos, inventarios, patrimonio), aplica los factores de corrección y genera el asiento contable de ajuste respectivo. Este módulo proporciona un sustento técnico inatacable ante inspecciones, permitiendo sincerar la utilidad neta gravable real y protegiendo el patrimonio de la empresa contra el efecto erosivo de la inflación venezolana."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y Análisis de Factibilidad BI",
        icon: TrendingUp,
        description: "Dashboard de mando ejecutivo para la toma de decisiones estratégicas basadas en analítica predictiva y modelado financiero de alta precisión.",
        content: [
            {
                sub: "Modelado de Inversiones: VAN, TIR y Análisis de Sensibilidad Multidimensional",
                text: "El módulo de Business Intelligence (BI) dota a la directiva de herramientas de modelado financiero superior. El manual instruye sobre el simulador de inversiones, donde se proyectan flujos de caja libre para nuevos proyectos. El sistema calcula indicadores críticos como el Valor Actual Neto (VAN) y la Tasa Interna de Retorno (TIR). Además, permite realizar análisis de sensibilidad mediante la creación de escenarios (Optimista, Pesimista y Caso Base), alterando variables como tasas de cambio, inflación y costos operativos, proporcionando una base científica para decisiones de expansión o adquisición de activos."
            },
            {
                sub: "Protocolo de Conciliación Bancaria Inteligente y Gestión de Tesorería Multimoneda",
                text: "En una economía bimonetaria, la gestión de tesorería es vital. La Billetera Kyron centraliza saldos en VES, USD y EUR, aplicando tasas oficiales del BCV. El protocolo de conciliación bancaria inteligente procesa extractos digitales y utiliza algoritmos de coincidencia de patrones para vincular transferencias o Pago Móvil con sus facturas de origen. Detecta instantáneamente duplicidades u omisiones, asegurando que el flujo de caja reflejado sea un espejo exacto de la realidad bancaria, previniendo fraudes y asegurando que la disponibilidad de fondos sea real y auditable."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión Estratégica de Talento Humano y Nómina",
        icon: Briefcase,
        description: "Administración integral del capital humano con cumplimiento estricto de la LOTTT y normativas parafiscales.",
        content: [
            {
                sub: "Motor de Cálculo de Nómina Automatizado bajo Lógica Jurídica LOTTT",
                text: "Desarrollado integrando la lógica jurídica de la LOTTT, el motor de nómina automatiza el cálculo de salarios integrales, bonos nocturnos, horas extras y vacaciones. El manual describe cómo configurar conceptos salariales y gestionar la garantía de prestaciones sociales. Al finalizar cada ciclo, genera recibos digitales con validez legal, despachados por canales seguros. Esto mantiene un registro inmutable y auditable de cada remuneración, garantizando la paz laboral y el cumplimiento legal total."
            },
            {
                sub: "Control de Libros Laborales y Gestión de Solvencias Parafiscales",
                text: "Kyron automatiza la actualización del Libro de Vacaciones, Horas Extras y Personal Retirado. Gestiona íntegramente las retenciones y aportes patronales (IVSS, FAOV, INCES), generando archivos de carga masiva para portales institucionales como el sistema TIUNA. El manual guía sobre cómo mantener las solvencias al día, evitando bloqueos administrativos y garantizando que la organización esté siempre habilitada para contratar con el estado o realizar trámites notariales."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico Corporativo",
        icon: Gavel,
        description: "Control centralizado de expedientes, contratos inteligentes y vigilancia de poderes de representación legal.",
        content: [
            {
                sub: "Gestión de Ciclo de Vida de Contratos (CLM) y Repositorio de Plantillas Visadas",
                text: "Este módulo centraliza la gestión documental legal. El manual explica cómo utilizar la biblioteca de plantillas redactadas y visadas por expertos para contratos de servicios, acuerdos de confidencialidad y poderes específicos. El Ledger inmutable registra cada versión y cambio (Version Control), garantizando trazabilidad total y asegurando que la última versión firmada digitalmente sea la única vinculante, eliminando el riesgo de manipulación de documentos críticos."
            },
            {
                sub: "Sistema de Alertas de Vencimiento para Activos Legales y Licencias",
                text: "La omisión en la renovación de poderes o licencias puede paralizar una empresa. Kyron genera alertas automáticas antes del vencimiento de cualquier instrumento legal registrado: desde poderes de administración hasta habilitaciones de CONATEL o registros de marcas ante el SAPI. Esta vigilancia proactiva permite gestionar renovaciones ante registros y notarías con tiempo suficiente, garantizando que la representación jurídica y derechos de propiedad intelectual permanezcan protegidos."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería, Arquitectura y Planificación IA",
        icon: Cpu,
        description: "Herramientas de planimetría automatizada, cómputos métricos y presupuestos de obra integrados con visión artificial.",
        content: [
            {
                sub: "Digitalización de Espacios mediante Fotogrametría y Generación de Planos",
                text: "Este módulo permite la digitalización técnica de espacios con esfuerzo mínimo. El manual describe el protocolo: al cargar fotos de alta resolución, la IA despliega algoritmos de fotogrametría para identificar la geometría del espacio y muros de carga. Al introducir una cota de referencia, el sistema escala automáticamente el resto de la planta, generando un plano esquemático vectorial. Es vital para levantamientos rápidos de sucursales o planificación de remodelaciones sin equipos láser costosos."
            },
            {
                sub: "Cálculo Automático de Cómputos Métricos y Elaboración de Presupuestos (APU)",
                text: "Vinculado a la planimetría, el sistema calcula de forma autónoma cómputos métricos (m² de pintura, revestimientos, metros lineales de ductería). El manual explica cómo integrar estos cálculos con estimaciones de mano de obra y costos operativos (Análisis de Precios Unitarios). El presupuesto resultante es dinámico, validando precios proyectados contra costos de mercado de proveedores registrados, manteniendo un control financiero riguroso sobre la expansión física."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Economía Circular Magnética",
        icon: Recycle,
        description: "Operatividad de infraestructura verde y monetización de residuos mediante tecnología de inducción y Blockchain.",
        content: [
            {
                sub: "Tecnología de Inducción Magnética Síncrona en Smart Bins Kyron",
                text: "Kyron implementa una solución de economía circular mediante estaciones de reciclaje inteligentes. Cada estación posee sensores de inducción magnética síncrona que detectan la firma electromagnética de los materiales depositados, clasificando autónomamente metales ferrosos de polímeros plásticos. Esta clasificación en el origen elimina costos de separación manual y garantiza una calidad superior de materia prima para su reinserción en la cadena productiva, operando bajo un modelo de trazabilidad absoluta."
            },
            {
                sub: "Protocolo de Eco-Créditos y Trazabilidad de Activos Verdes",
                text: "Cada acción ambiental verificada genera incentivos económicos. El manual describe el protocolo de emisión de 'Eco-Créditos' registrados en el Blockchain. Al ser reconocido el usuario, el Smart Bin autoriza la transferencia de activos digitales a su billetera personal. Los créditos están respaldados por el valor de mercado de los materiales procesados. Para empresas, el sistema genera Reportes ESG de alta fidelidad, certificando la reducción real de la huella de carbono con datos inalterables."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y Protección LOPNNA",
        icon: HeartHandshake,
        description: "Servicios civiles integrales, gestión de salud y cumplimiento de obligaciones familiares bajo el marco legal de la LOPNNA.",
        content: [
            {
                sub: "Gestión de Documentación Civil y Red de Salud Inteligente",
                text: "El Portal Ciudadano centraliza la obtención de copias certificadas de documentos vitales e integra una red de salud: los usuarios consultan especialistas afiliados, agendan citas y reciben resultados diagnósticos en su Bóveda Civil protegida. La integración con la Identidad Digital garantiza que el historial médico sea portátil y esté bajo el control exclusivo del ciudadano, facilitando una atención coordinada y eficiente en cualquier momento."
            },
            {
                sub: "Calculadora de Manutención Técnica y Registro RIF para Menores",
                text: "El sistema simplifica responsabilidades familiares bajo la LOPNNA mediante una calculadora que estima aportes económicos basados en parámetros legales: unidad tributaria, ingresos documentados y necesidades del menor. Además, el asistente de RIF para menores pre-puebla formularios oficiales utilizando datos de la Partida de Nacimiento, facilitando el acceso a beneficios fiscales y el resguardo de derechos sucesorios del menor de forma automatizada."
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
            <div style="padding: 10pt; border-bottom: 2pt solid #2563eb; margin-bottom: 20pt;">
                <table style="width: 100%; border: none;">
                    <tr>
                        <td style="width: 50pt; border: none;">
                            <div style="background-color: #2563eb; color: white; width: 45pt; height: 45pt; text-align: center; line-height: 45pt; font-weight: bold; font-size: 20pt; border-radius: 6pt;">K</div>
                        </td>
                        <td style="border: none; vertical-align: middle;">
                            <h1 style="color: #2563eb; margin: 0; font-size: 22pt; font-family: 'Arial Black', sans-serif;">SYSTEM KYRON</h1>
                            <p style="color: #666; margin: 0; font-size: 8pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5pt;">Manual de Operaciones Maestro v2.6.5</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-bottom: 20pt; border-left: 8pt solid #2563eb; padding-left: 15pt;">
                <h2 style="color: #1e293b; font-size: 18pt; margin: 0; font-family: 'Arial', sans-serif;">DOCUMENTACIÓN TÉCNICA INTEGRAL</h2>
                <p style="font-style: italic; color: #475569; margin-top: 5pt; font-size: 10pt;">Consolidado operativo de misión crítica.</p>
            </div>
        `;

        manualModules.forEach(mod => {
            docContent += `
                <div style="margin-top: 15pt; margin-bottom: 15pt;">
                    <h2 style="color: #2563eb; text-transform: uppercase; border-bottom: 1pt solid #eee; padding-bottom: 5pt; margin-bottom: 10pt; font-size: 16pt; font-family: 'Arial', sans-serif;">${mod.title}</h2>
                    <p style="font-weight: bold; color: #475569; margin-bottom: 10pt; font-size: 9pt; text-transform: uppercase; font-family: 'Arial', sans-serif;">${mod.description}</p>
            `;
            
            mod.content.forEach(item => {
                docContent += `
                    <div style="margin-bottom: 15pt; padding: 10pt; background-color: #f8fafc; border-radius: 8pt;">
                        <h3 style="color: #1e293b; font-size: 12pt; margin-bottom: 8pt; border-left: 3pt solid #2563eb; padding-left: 10pt; font-family: 'Arial', sans-serif;">${item.sub}</h3>
                        <p style="text-align: justify; line-height: 1.6; font-size: 10pt; color: #334155; font-family: 'Times New Roman', serif;">${item.text}</p>
                    </div>
                `;
            });
            
            docContent += `</div>`;
        });

        const footer = `
            <div style="margin-top: 40pt; border-top: 1pt solid #eee; padding-top: 15pt; text-align: center; font-size: 7pt; color: #94a3b8; font-family: 'Arial', sans-serif;">
                <p>PROPIEDAD INTELECTUAL DE SYSTEM KYRON, C.A. • DOCUMENTO DE GRADO CORPORATIVO • ID: SK-OPER-2.6.5</p>
            </div>
        `;

        const headerHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual de Usuario System Kyron</title></head><body style='padding: 20pt;'>";
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
            description: "El expediente técnico exhaustivo se está exportando a Word.",
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
                                        <p className="text-[8px] font-bold text-white/30 leading-relaxed uppercase">Asistencia técnica sobre protocolos de red o cifrado activa.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-12 md:space-y-16">
                        <motion.section 
                            className="space-y-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
                                <ShieldCheck className="h-3 w-3" /> MASTER USER GUIDE v2.6.5
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
                                Manual de Usuario <br/> 
                                <span className="text-primary text-3xl md:text-5xl">System Kyron</span>
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
