
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
    Target
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
        description: "Protocolo maestro de autenticación soberana y resguardo de activos legales.",
        content: [
            {
                sub: "Protocolo de Validación Biométrica 3D",
                text: "El núcleo de seguridad de System Kyron se fundamenta en la soberanía de la identidad. El proceso de enrolamiento no se limita a una captura fotográfica; el sistema ejecuta un escaneo facial tridimensional mediante visión artificial que identifica 128 puntos vectoriales únicos. Esta 'Firma Biométrica' se convierte en un hash criptográfico inmutable que se almacena en el Ledger del sistema. Cada vez que un ciudadano o empleado autoriza una transacción o firma un documento, el sistema realiza una verificación de 'Prueba de Vida' en tiempo real, garantizando que el acceso no pueda ser suplantado ni siquiera por representaciones digitales de alta calidad o deepfakes."
            },
            {
                sub: "Bóveda de Resguardo de Activos Civiles",
                text: "La Bóveda Civil es un entorno de almacenamiento frío (Cold Storage) digital. Los documentos sensibles como Cédulas de Identidad, RIF Personales, Pasaportes y Títulos Universitarios son procesados mediante algoritmos de cifrado AES-512. Al cargar un documento, nuestra IA realiza una limpieza de metadatos y un sellado de tiempo (Timestamping). El usuario mantiene el control total: el documento solo es visible tras una autenticación multifactor exitosa y puede ser revocado del acceso público en cualquier momento. Este nodo garantiza que el ciudadano lleve su historial legal completo en su dispositivo móvil, listo para ser presentado ante autoridades con validez digital verificada."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Telecom 5G y eSIM",
        icon: Radio,
        description: "Administración de redes convergentes y aprovisionamiento digital inmediato.",
        content: [
            {
                sub: "Aprovisionamiento Automático de eSIM",
                text: "Kyron revoluciona la conectividad eliminando la dependencia del hardware físico. El módulo de Telecomunicaciones permite la generación dinámica de perfiles eSIM (Embedded SIM) compatibles con estándares GSMA. Una vez validada la identidad del usuario, el sistema asigna un MSISDN (número telefónico) único y genera un código QR de activación encriptado. El usuario simplemente escanea este código para inyectar las credenciales de red en su smartphone de última generación. Este proceso reduce el tiempo de activación de días a escasos segundos, operando sobre una infraestructura de red 5G de ultra-baja latencia diseñada para aplicaciones de misión crítica y telemetría industrial."
            },
            {
                sub: "Consola NOC de Gestión de Flotas",
                text: "Para el sector corporativo, el manual detalla el uso de la consola del Network Operations Center (NOC). Desde este panel, el administrador puede monitorear el consumo de datos en tiempo real de cientos de líneas vinculadas al holding. El sistema permite aplicar políticas de QoS (Quality of Service), restringir el roaming internacional por regiones, y realizar bloqueos de emergencia inmediatos mediante el protocolo de 'Kill Switch' remoto. Es la herramienta definitiva para garantizar que la conectividad de la empresa nunca sea un cuello de botella para la productividad."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inventario",
        icon: TabletSmartphone,
        description: "Ecosistema comercial con inteligencia fiscal y control de activos físicos.",
        content: [
            {
                sub: "Sincronización Fiscal Síncrona",
                text: "El Punto de Venta (TPV) de Kyron no es un terminal aislado; es un nodo conectado directamente a la base de datos de cumplimiento. Al ingresar el RIF o Cédula de un cliente, el sistema realiza una consulta API síncrona para extraer automáticamente la Razón Social y el Domicilio Fiscal oficial. Esto elimina el 100% de los errores humanos en la cabecera de la factura, cumpliendo estrictamente con la Providencia Administrativa SNAT/2011/0071. Además, el TPV está integrado con el motor de cálculo de IGTF, aplicando la alícuota correspondiente de forma automática según la moneda detectada en la transacción (VES o divisas)."
            },
            {
                sub: "Kardex de Inventario con IA Predictiva",
                text: "La gestión de existencias utiliza un sistema de Kardex avanzado que registra cada movimiento de entrada, salida y ajuste con un identificador único de transacción. El manual explica cómo configurar umbrales de 'Stock de Seguridad'. Cuando un producto alcanza este nivel crítico, la IA genera automáticamente una orden de compra borrador para el proveedor asignado. Además, el sistema realiza análisis de 'Velocidad de Rotación', informando al gerente qué productos son 'vacas lecheras' y cuáles están inmovilizando capital, permitiendo optimizar el inventario y maximizar el flujo de caja."
            }
        ]
    },
    {
        id: "fiscal",
        title: "4. Blindaje Fiscal y Cero Riesgo",
        icon: ShieldCheck,
        description: "Arquitectura de cumplimiento absoluto ante el SENIAT y entes regulatorios.",
        content: [
            {
                sub: "Generación de Libros y Declaraciones (TXT)",
                text: "System Kyron elimina la ansiedad del cierre mensual. El módulo fiscal compila automáticamente todas las operaciones registradas en el TPV y las facturas de proveedores para generar el Libro de Compras y el Libro de Ventas en el formato exacto exigido por el SENIAT. Al finalizar el periodo, el sistema genera el archivo TXT para la Declaración de IVA y el resumen para el ISLR. Cada dato es sometido a una 'Auditoría Cruzada' interna que detecta inconsistencias antes de que el archivo sea exportado, garantizando que lo que se declara coincida exactamente con los registros contables, eliminando multas por errores de forma."
            },
            {
                sub: "RIPF: Ajuste por Inflación Automatizado",
                text: "Dada la complejidad económica del entorno, el Reajuste por Inflación Fiscal (RIPF) es obligatorio para los contribuyentes. El manual detalla cómo el sistema carga automáticamente los índices INPC oficiales para realizar el cálculo técnico de la posición monetaria neta. El sistema identifica las cuentas no monetarias, aplica los factores de corrección y genera el asiento contable de ajuste. Este proceso, que tradicionalmente toma días de trabajo contable manual, se ejecuta en minutos con un rigor técnico impecable, asegurando la sinceración de la utilidad neta ante el fisco."
            }
        ]
    },
    {
        id: "finanzas",
        title: "5. Inteligencia Financiera y BI",
        icon: TrendingUp,
        description: "Dashboard ejecutivo para la toma de decisiones estratégicas basadas en indicadores.",
        content: [
            {
                sub: "Métricas de Rentabilidad VAN y TIR",
                text: "El módulo de Business Intelligence (BI) proporciona a la directiva una visión profunda de la salud financiera. El manual explica el funcionamiento del simulador de factibilidad, donde se pueden proyectar flujos de caja y calcular automáticamente el Valor Actual Neto (VAN) y la Tasa Interna de Retorno (TIR) de nuevos proyectos o inversiones. Estas métricas permiten al holding decidir objetivamente hacia dónde expandir su capital, basándose en la rentabilidad proyectada y no en suposiciones, utilizando datos históricos de la propia operación de la empresa para alimentar los modelos predictivos."
            },
            {
                sub: "Billetera Multimoneda y Conciliación",
                text: "En una economía multimoneda, la conciliación es crítica. La Billetera Kyron gestiona saldos en Bolívares (VES), Dólares (USD) y Euros (EUR) de forma simultánea. El sistema mantiene un registro histórico de las tasas de cambio (BCV) utilizadas en cada operación. El manual detalla el protocolo de conciliación bancaria automatizada, donde el sistema importa los extractos bancarios y cruza cada referencia de Pago Móvil o Transferencia con las facturas emitidas, marcando como 'Cobrado' solo aquello que ha sido efectivamente verificado en el banco, blindando la empresa contra estafas por capturas de pantalla falsas."
            }
        ]
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento y RR.HH.",
        icon: Briefcase,
        description: "Administración integral del capital humano y cumplimiento estricto de la LOTTT.",
        content: [
            {
                sub: "Cálculo de Nómina y Prestaciones Sociales",
                text: "El motor de nómina de Kyron está programado con la lógica completa de la Ley Orgánica del Trabajo (LOTTT). Automatiza el cálculo del salario integral, bono vacacional, utilidades y la garantía de prestaciones sociales quincenales. El manual describe cómo configurar conceptos salariales variables como horas extras (diurnas y nocturnas) y bonificaciones de productividad. Al procesar la nómina, el sistema genera automáticamente los recibos de pago digitales que son enviados por correo y WhatsApp a cada empleado, manteniendo un expediente digital inmutable de toda la relación laboral, listo para cualquier inspección del Ministerio del Trabajo."
            },
            {
                sub: "Libros Laborales y Solvencias",
                text: "El cumplimiento laboral va más allá de pagar salarios. Kyron mantiene actualizados los libros legales obligatorios: el Libro de Vacaciones, el Libro de Horas Extras y el Libro de Horario Nocturno. Además, el sistema gestiona las retenciones de ley (IVSS, FAOV, INCES), generando los comprobantes necesarios para que la empresa mantenga sus solvencias al día. El manual también cubre el proceso de 'Finiquito' o Liquidación, calculando con precisión de centavos los montos adeudados al cese de la relación laboral, incluyendo los días de preaviso y las vacaciones fraccionadas."
            }
        ]
    },
    {
        id: "juridico",
        title: "7. Centro de Mando Jurídico",
        icon: Gavel,
        description: "Control de expedientes, contratos y asesoría legal predictiva.",
        content: [
            {
                sub: "Gestión de Ciclo de Vida de Contratos (CLM)",
                text: "Este módulo centraliza la redacción, revisión y firma de documentos legales. El manual explica cómo utilizar la biblioteca de plantillas homologadas para contratos de servicios, acuerdos de confidencialidad (NDA) y poderes de representación. El sistema incluye un motor de alertas que notifica al departamento jurídico 30 días antes del vencimiento de un contrato o de un poder notarial, permitiendo gestionar renovaciones proactivamente y evitando la caducidad de representaciones legales críticas ante registros y notarías."
            },
            {
                sub: "Asistente Consultor de Gacetas (IA)",
                text: "Kyron integra un agente de IA entrenado específicamente en la legislación venezolana reciente, con especial énfasis en las Gacetas Oficiales de emergencia tributaria como la N° 6.952. El manual instruye al usuario sobre cómo realizar consultas técnicas en lenguaje natural. Por ejemplo, se puede preguntar: '¿Qué exoneraciones de IVA aplican para la importación de materia prima según el Decreto 5.196?'. La IA responde citando artículos específicos y proporcionando una interpretación jurídica preliminar, lo que reduce costos de consultoría externa y acelera la toma de decisiones legales."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "8. Ingeniería y Planificación IA",
        icon: Cpu,
        description: "Herramientas de planimetría y presupuestos de obra con visión artificial.",
        content: [
            {
                sub: "Generación de Planos Mediante Fotografía",
                text: "Una funcionalidad única para empresas de construcción y mantenimiento. El manual describe cómo, al subir una fotografía de un espacio físico, la IA de Kyron identifica las esquinas, vanos de puertas y ventanas para generar un esquema de plano a escala. El usuario puede refinar las medidas introduciendo una cota base (ej. el largo de una pared), y el sistema escala el resto del plano automáticamente. Esto permite una visualización rápida de la planta del local sin necesidad de equipos de topografía complejos en la fase de anteproyecto."
            },
            {
                sub: "Cálculo de Cómputos Métricos y Presupuestos",
                text: "Vinculado al plano generado, el sistema permite asignar materiales (porcelanato, pintura, drywall) a las áreas detectadas. El manual detalla cómo el software calcula los cómputos métricos (m², ml, m³) y genera un presupuesto detallado de materiales y mano de obra. Este presupuesto está conectado al módulo de compras, permitiendo comparar los precios proyectados con las cotizaciones reales de los proveedores, asegurando que los proyectos de infraestructura se mantengan dentro del margen de beneficio planificado."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Sostenibilidad y Fundación Kyron",
        icon: Recycle,
        description: "Operación de infraestructura verde y monetización de residuos en Blockchain.",
        content: [
            {
                sub: "Operación de Smart Bins (Inducción Magnética)",
                text: "Kyron implementa una economía circular real a través de sus papeleras inteligentes. El manual explica el funcionamiento de los sensores de inducción magnética síncrona que clasifican automáticamente los residuos. Cuando un ciudadano deposita un envase, el sistema valida el material y el peso. Si el envase es correcto, el sistema emite una transacción en el Blockchain de Kyron que acredita 'Eco-Créditos' a la billetera digital del usuario. Este protocolo asegura que el incentivo ambiental sea transparente y no pueda ser manipulado."
            },
            {
                sub: "Trazabilidad de Activos Verdes",
                text: "Para las empresas con responsabilidad social corporativa, el sistema genera reportes de 'Impacto Ambiental' basados en la recolección real. Se puede trazar el kilogramo exacto de plástico reciclado desde el Smart Bin hasta el centro de procesamiento. El manual muestra cómo estos datos pueden ser utilizados para certificar la huella de carbono de la empresa y obtener incentivos fiscales o certificaciones internacionales de sostenibilidad, convirtiendo el residuo en un activo estratégico para la marca."
            }
        ]
    },
    {
        id: "personal",
        title: "10. Portal Ciudadano y LOPNNA",
        icon: HeartHandshake,
        description: "Servicios civiles para el individuo y gestión de obligaciones familiares.",
        content: [
            {
                sub: "Documentación Civil y Salud",
                text: "El manual para el Portal Ciudadano describe cómo los individuos pueden gestionar copias certificadas de Partidas de Nacimiento y Actas de Matrimonio. Además, integra un Directorio Médico Afiliado donde el usuario puede consultar su cobertura de salud, agendar citas y ver sus resultados de laboratorio digitalizados. Todo esto vinculado a su Identidad Digital Maestra, permitiendo que el ciudadano tenga su 'Vida Legal y Médica' en un solo punto de acceso seguro."
            },
            {
                sub: "Manutención y RIF de Menores (LOPNNA)",
                text: "Kyron facilita el cumplimiento de las obligaciones establecidas en la LOPNNA. El manual incluye el uso de la calculadora de manutención, que ajusta los montos según la unidad tributaria y los ingresos del obligado. Además, proporciona la guía paso a paso y el llenado de planillas automático para la inscripción de menores en el RIF ante el SENIAT, un trámite esencial para declarar cargas familiares y gestionar herencias o bienes a nombre de niños y adolescentes, asegurando el bienestar del núcleo familiar bajo el marco legal venezolano."
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
                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Manual Maestro v2.6.5</span>
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
                                        <Activity className="h-4 w-4" /> Protocolos Técnicos
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
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Soporte IA Activo</p>
                                        <p className="text-[9px] font-bold text-white/40 leading-relaxed uppercase">Si requiere asistencia inmediata, inicie el chat con el nodo maestro en la esquina inferior derecha.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* Contenido Principal (Detailed Documentation) */}
                    <div className="lg:col-span-8 space-y-24">
                        <motion.section 
                            className="space-y-10"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary">
                                <ShieldCheck className="h-3.5 w-3.5" /> MASTER DOCUMENTATION NODE
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
                                Manual de Usuario <br/> 
                                <span className="text-primary text-4xl md:text-6xl">de System Kyron</span>
                            </h1>
                            <p className="text-lg text-white/40 max-w-2xl font-bold uppercase tracking-widest italic border-l-4 border-primary/20 pl-10 leading-relaxed">
                                Ingeniería de procesos y protocolos operativos del ecosistema integral de gestión, telecomunicaciones y finanzas inmutables.
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
                                    <CardContent className="p-12 md:p-16 space-y-20">
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
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Node Status: Online</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Database className="h-3.5 w-3.5 text-white/20" />
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Ledger: Verified</span>
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
