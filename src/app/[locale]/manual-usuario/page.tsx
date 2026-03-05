
"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    BookOpen, 
    ShieldCheck, 
    Users, 
    Gavel, 
    Recycle, 
    Cpu, 
    ArrowRight,
    FileText,
    Zap,
    Lock,
    Globe,
    Activity,
    Search,
    Download,
    CheckCircle2,
    Calculator,
    CreditCard,
    BrainCircuit,
    Fingerprint,
    Radio,
    TabletSmartphone,
    Info,
    ChevronRight,
    Terminal,
    Network,
    Database,
    Target
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Logo } from "@/components/logo";

const manualModules = [
    {
        id: "identidad",
        title: "1. Identidad Digital 3D y Bóveda Ciudadana",
        icon: Fingerprint,
        description: "Protocolo de gestión de identidad soberana y resguardo de activos civiles.",
        content: [
            {
                sub: "Validación de Identidad (KYC)",
                text: "El proceso inicia con la captura del documento de identidad físico. El motor 'Kyron-Vision' extrae datos mediante OCR y los valida contra patrones de seguridad. Posteriormente, se realiza una prueba de vida (Liveness Test) para generar el hash biométrico inmutable que firmará todos sus trámites futuros."
            },
            {
                sub: "Gestión de la Tarjeta Interactiva",
                text: "Su ID Digital es un nodo de datos dinámico. Al pulsar sobre la tarjeta en el módulo 'Mi ID Digital', esta realiza un giro 3D revelando el 'Back-Node' con un código QR de alta densidad. Este código permite la transferencia instantánea de perfiles profesionales y la validación de acceso en terminales físicas del ecosistema."
            },
            {
                sub: "Solicitud de Documentos Certificados",
                text: "En la sección de trámites civiles, puede solicitar copias certificadas de Partidas de Nacimiento y Actas de Matrimonio. Cada documento emitido por el sistema posee un 'Digital Seal' verificable por cualquier autoridad mediante escaneo directo, eliminando la necesidad de gestores externos."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Telecomunicaciones Hyper-Connect 5G",
        icon: Radio,
        description: "Provisionamiento de servicios de conectividad y gestión de activos de red.",
        content: [
            {
                sub: "Activación de Líneas y Numeración",
                text: "El sistema permite la búsqueda de patrones numéricos específicos en la red Kyron. Una vez seleccionado el número, se vincula al RIF/Cédula del usuario. El protocolo asegura que la línea esté operativa para voz y datos en menos de 60 segundos tras la confirmación del nodo de pago."
            },
            {
                sub: "Despliegue de Tecnología eSIM",
                text: "Para dispositivos compatibles, el manual recomienda el uso de eSIM. Tras la compra, el sistema genera un perfil de red cifrado que se entrega mediante un QR de un solo uso. Este proceso elimina la logística física y permite la itinerancia global (roaming) bajo demanda desde el panel de control."
            },
            {
                sub: "Monitoreo de Flotas Datos",
                text: "Las empresas pueden gestionar 'Pools de Datos' compartidos. Si un terminal consume más del 80% de su cuota, el sistema emite una alerta al Operador NOC y permite la redistribución de capacidad entre líneas del mismo contrato mayorista."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Punto de Venta (TPV) e Inteligencia de Caja",
        icon: TabletSmartphone,
        description: "Terminal de procesamiento transaccional con integración fiscal nativa.",
        content: [
            {
                sub: "Operativa de Ventas Rápidas",
                text: "La interfaz TPV está optimizada para hardware táctil. Los productos pueden ser llamados mediante escaneo de código de barras o búsqueda inteligente por nombre. El sistema descuenta existencias en milisegundos del inventario central, evitando sobreventas en canales digitales."
            },
            {
                sub: "Facturación Automatizada vía RIF",
                text: "Al ingresar el identificador fiscal del cliente, el TPV consulta el Ledger Global de Kyron. Si hay coincidencia, los datos de facturación se bloquean para edición manual, asegurando la integridad del documento y el cumplimiento estricto de la Providencia 0071 del SENIAT."
            },
            {
                sub: "Protocolo de Cierre y Arqueo",
                text: "El arqueo de caja requiere el desglose físico por denominación. El sistema 'mapea' el efectivo contado contra las ventas registradas en tarjeta, pago móvil y transferencias. Discrepancias mayores al umbral de seguridad bloquean el cierre del turno hasta la intervención del supervisor."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "4. Blindaje Fiscal y Auditoría Predictiva",
        icon: Calculator,
        description: "Sincronización total con la Gaceta Oficial y automatización contable.",
        content: [
            {
                sub: "Libros Oficiales Digitales",
                text: "Los Libros de Compra y Venta se generan automáticamente en formato 'Ready-to-Upload'. El sistema valida cada número de control y cada base imponible, asegurando que el archivo TXT final sea aceptado por el portal del SENIAT sin errores de estructura."
            },
            {
                sub: "Cálculo de IVA e IGTF",
                text: "El motor fiscal identifica transacciones en divisas y aplica el impuesto a las grandes transacciones financieras (IGTF) según la ley vigente. Al final del periodo, presenta un balance neto de IVA (Débito vs Crédito) facilitando la planificación de pagos."
            },
            {
                sub: "Comprobantes de Retención AR-C",
                text: "Generación automatizada de retenciones de ISLR. El sistema consolida los pagos anuales de cada empleado y emite el certificado AR-C con firma digital y código de validación, facilitando la declaración de rentas personal de todo el staff."
            }
        ]
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento y Nómina (LOTTT)",
        icon: Users,
        description: "Administración del capital humano bajo estándares de cumplimiento laboral.",
        content: [
            {
                sub: "Procesamiento de Nómina",
                text: "El motor integra variables de asistencia, horas extras diurnas/nocturnas y bonificaciones por desempeño. Calcula automáticamente los aportes parafiscales (IVSS, FAOV, Paro Forzoso) y genera los recibos de pago con desglose detallado para el trabajador."
            },
            {
                sub: "Cálculo de Prestaciones y Liquidación",
                text: "Basado en el Art. 142 de la LOTTT, el sistema mantiene un historial de la garantía de antigüedad de cada empleado. Ante un egreso, genera el 'Recibo de Liquidación' (Finiquito) con cálculos precisos de días adicionales y utilidades fraccionadas."
            },
            {
                sub: "Portal del Empleado y Notificaciones",
                text: "Los trabajadores acceden a su propio nodo para descargar recibos, cartas de trabajo y solicitar vacaciones. Las solicitudes llegan a RR.HH. como alertas de sistema que pueden ser aprobadas con un solo clic, actualizando el calendario laboral."
            }
        ]
    },
    {
        id: "legal",
        title: "6. Escritorio Jurídico y Gestión de Poderes",
        icon: Gavel,
        description: "Seguridad legal corporativa y administración de documentos notariales.",
        content: [
            {
                sub: "Generador de Contratos Pro",
                text: "Utilice la biblioteca de borradores legales para redactar contratos de servicios, arrendamiento o licencias de software. El sistema inyecta automáticamente los datos de la empresa y las contrapartes, permitiendo la exportación en formatos editables o sellados."
            },
            {
                sub: "Control de Poderes y Representación",
                text: "Módulo para registrar la vigencia de los poderes de los apoderados judiciales y socios. El sistema activa un semáforo de riesgo (Verde/Amarillo/Rojo) basado en la fecha de vencimiento de las representaciones ante el SAREN."
            },
            {
                sub: "Tramitología SAPI",
                text: "Guía paso a paso para la protección de marcas y patentes. El manual detalla cómo realizar las búsquedas fonéticas y gráficas, y cómo consignar los recaudos para asegurar la propiedad intelectual de los desarrollos de la empresa."
            }
        ]
    },
    {
        id: "finanzas",
        title: "7. Cobranza Inteligente y Riesgo Fintech",
        icon: CreditCard,
        description: "Optimización de flujo de caja y gestión de plataformas de pago.",
        content: [
            {
                sub: "Gestión de Cuentas por Cobrar",
                text: "Análisis de antigüedad de deuda en tiempo real. El sistema permite automatizar recordatorios de pago vía WhatsApp y Email, reduciendo el ciclo de cobro (DSO) y alertando sobre clientes con alto índice de morosidad."
            },
            {
                sub: "Integración BNPL (Cashea/Krece)",
                text: "Protocolos para procesar ventas bajo la modalidad 'Compra Ahora, Paga Después'. El manual explica cómo validar la identidad del cliente en la app aliada y cómo registrar el pago inicial en el TPV de Kyron para la entrega inmediata del producto."
            },
            {
                sub: "Conciliación Bancaria IA",
                text: "Suba el extracto bancario en formato Excel o TXT. El motor de IA 'Kyron-Finance' identifica referencias, montos y fechas para cruzar automáticamente las facturas pagadas, dejando solo las excepciones para revisión manual del contador."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "8. Ingeniería Ambiental (Fundación Kyron)",
        icon: Recycle,
        description: "Monetización de residuos mediante tecnología de inducción magnética.",
        content: [
            {
                sub: "Operación de Smart Bins",
                text: "Las papeleras inteligentes cuentan con un sistema de magnetismo activo. El usuario debe identificarse con su ID Digital antes de depositar el residuo. El sensor detecta la densidad y el material, activando la sujeción magnética para una compactación eficiente."
            },
            {
                sub: "Billetera de Eco-Créditos",
                text: "Por cada acción de reciclaje validada, el sistema inyecta activos digitales en la billetera del ciudadano. Estos créditos son inmutables y pueden ser utilizados como cupones de descuento en la red de comercios asociados al ecosistema."
            },
            {
                sub: "Certificación ESG Corporativa",
                text: "Las empresas que implementan nodos de reciclaje en sus sedes pueden generar reportes de impacto ambiental positivo. Estos reportes son validados por la Fundación Kyron y sirven para cumplir con normativas de responsabilidad social empresarial."
            }
        ]
    },
    {
        id: "infraestructura",
        title: "9. Ingeniería y Planificación de Proyectos",
        icon: Cpu,
        description: "Herramientas de diseño asistido por IA y presupuestos de obra.",
        content: [
            {
                sub: "Generación de Planos IA",
                text: "Cargue una fotografía de un espacio físico vacío. La IA procesa las dimensiones, detecta puntos de iluminación y genera un plano a escala detallado. El documento resultante incluye áreas recomendadas para estaciones de trabajo y nodos de red."
            },
            {
                sub: "Calculadora de Materiales",
                text: "A partir de las medidas del plano, el sistema estima la cantidad de materiales (cerámica, pintura, cableado) necesarios. El presupuesto se vincula con los proveedores de la red Kyron para obtener precios actualizados en tiempo real."
            },
            {
                sub: "Dictamen de Factibilidad",
                text: "Módulo estratégico que calcula el retorno de inversión (ROI) para proyectos de infraestructura. Proporciona indicadores financieros (VAN/TIR) que aseguran la viabilidad económica antes de iniciar la ejecución física."
            }
        ]
    },
    {
        id: "inteligencia",
        title: "10. Business Intelligence y Estrategia IA",
        icon: BrainCircuit,
        description: "Análisis masivo de datos para la toma de decisiones de alta gerencia.",
        content: [
            {
                sub: "Estrategias de Venta Predictivas",
                text: "El sistema analiza el inventario y detecta patrones de consumo. Sugiere automáticamente la creación de combos o promociones para productos de baja rotación, maximizando la rentabilidad del stock inactivo."
            },
            {
                sub: "Análisis de Sentimiento del Mercado",
                text: "Al pegar comentarios o reseñas de clientes, la IA clasifica el sentimiento real del usuario. Identifica puntos de insatisfacción y áreas de oportunidad para mejorar el servicio al cliente basándose en lenguaje natural."
            },
            {
                sub: "Estudios Demográficos ZEDU",
                text: "Herramienta para visualizar el potencial comercial de zonas geográficas. Proporciona datos de densidad poblacional, nivel de competencia y perfil de ingresos para asegurar que el despliegue de nuevas sucursales sea exitoso."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredModules = useMemo(() => {
        if (!searchQuery) return manualModules;
        const query = searchQuery.toLowerCase();
        return manualModules.filter(m => 
            m.title.toLowerCase().includes(query) || 
            m.description.toLowerCase().includes(query) ||
            m.content.some(c => c.sub.toLowerCase().includes(query) || c.text.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    const handleDownload = (format: 'pdf' | 'word') => {
        toast({
            title: `PROTOCOLO DE EXPORTACIÓN ${format.toUpperCase()}`,
            description: "Compilando expediente técnico maestro...",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Manual Maestro Kyron v2.6.5</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 40px; }
                        h1 { color: #2563eb; text-align: center; font-size: 28pt; margin-bottom: 10px; border-bottom: 2px solid #2563eb; }
                        h2 { color: #1e40af; font-size: 18pt; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                        h3 { color: #2563eb; font-size: 14pt; margin-top: 20px; }
                        p { font-size: 11pt; text-align: justify; margin-bottom: 10px; }
                        .footer { font-size: 8pt; text-align: center; color: #999; margin-top: 50px; border-top: 1px solid #eee; padding-top: 10px; }
                        .version { text-align: center; font-weight: bold; color: #666; font-size: 10pt; }
                    </style>
                </head>
                <body>
                    <h1>MANUAL MAESTRO DE USUARIO</h1>
                    <p class="version">SYSTEM KYRON v2.6.5 • ECOSISTEMA DE MISIÓN CRÍTICA</p>
                    <p style="text-align: center; font-style: italic;">Guía oficial de operación detallada para los módulos comerciales, civiles y tecnológicos.</p>
            `;
            
            let body = "";
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p><strong>Propósito:</strong> ${mod.description}</p>`;
                mod.content.forEach(c => {
                    body += `<h3>• ${c.sub}</h3><p>${c.text}</p>`;
                });
            });

            const footer = `
                    <div class="footer">
                        © ${new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Todos los derechos reservados.<br/>
                        Documento generado bajo protocolo de alta fidelidad.
                    </div>
                </body></html>
            `;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + body + footer);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `Manual_Kyron_v2.6.5_FULL.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid selection:bg-primary/20">
            {/* CSS para forzar la ocultación de la barra superior global y estilizar el manual */}
            <style jsx global>{`
                header.fixed.top-0, 
                .fixed.top-0.left-0.right-0.z-\[100\],
                header[class*="fixed"] {
                    display: none !important;
                }
                body {
                    padding-top: 0 !important;
                }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; color: black !important; }
                    .glass-card { background: white !important; color: black !important; border: 1px solid #eee !important; box-shadow: none !important; }
                    section { page-break-inside: avoid; }
                }
            `}</style>

            {/* Header del Manual Local (Independiente) */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/80 backdrop-blur-2xl border-b border-white/10 flex items-center px-6 md:px-12 justify-between no-print">
                <Link href="/" className="flex items-center gap-3 group">
                    <Logo className="h-8 w-8 transition-transform group-hover:scale-110 shadow-glow" />
                    <div className="flex flex-col">
                        <span className="text-xs font-black tracking-[0.4em] text-white uppercase italic">System Kyron</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Protocol Node 2.6.5</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-10 rounded-xl text-[9px] font-black uppercase border-white/10 hover:bg-primary/10 hover:text-primary transition-all" onClick={() => handleDownload('word')}>
                        <FileText className="mr-2 h-4 w-4" /> EXPORTAR .DOC
                    </Button>
                    <Button className="btn-3d-primary h-10 px-8 rounded-xl text-[9px] font-black uppercase shadow-2xl" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-32 pb-40">
                {/* Hero del Manual */}
                <div className="text-center space-y-6 mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.5em] text-primary shadow-glow"
                    >
                        <Terminal className="h-3 w-3" /> PROTOCOLO MAESTRO DE ENTRENAMIENTO
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow"
                    >
                        Manual <span className="text-primary">Maestro</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/40 max-w-3xl mx-auto font-bold uppercase tracking-tight italic leading-relaxed"
                    >
                        Documentación técnica de alta fidelidad para el ecosistema corporativo. <br/>
                        Instrucciones de operación detallada para terminales comerciales y civiles.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Navegación por Módulos */}
                    <aside className="lg:col-span-4 space-y-8 no-print">
                        <Card className="glass-card p-8 rounded-[2.5rem] sticky top-28 border-white/5 bg-black/40">
                            <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                    <Activity className="h-4 w-4 animate-pulse" /> Mapa de Ingeniería
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1.5">
                                {manualModules.map((mod) => (
                                    <Button 
                                        key={mod.id}
                                        variant="ghost" 
                                        className="w-full justify-start h-11 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 group relative overflow-hidden"
                                        onClick={() => {
                                            const el = document.getElementById(mod.id);
                                            if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
                                        }}
                                    >
                                        <mod.icon className="mr-4 h-4 w-4 opacity-30 group-hover:opacity-100 transition-all" />
                                        {mod.title.split('. ')[1]}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido de los Módulos */}
                    <div className="lg:col-span-8 space-y-24">
                        <div className="relative mb-16 no-print">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/40" />
                            <Input 
                                placeholder="BUSCAR PROTOCOLO O MÓDULO ESPECÍFICO..." 
                                className="h-20 pl-16 rounded-3xl bg-white/[0.03] border-white/10 text-white font-black uppercase text-xs tracking-widest focus-visible:ring-primary shadow-inner"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-32">
                            {filteredModules.map((mod) => (
                                <motion.section 
                                    key={mod.id} 
                                    id={mod.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="scroll-mt-32"
                                >
                                    <Card className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden bg-black/40 hover:border-primary/20 transition-all group print:bg-white print:text-black print:border-none">
                                        <CardHeader className="p-12 md:p-16 border-b border-white/5 flex flex-row items-center gap-10 bg-white/[0.01] print:bg-white">
                                            <div className="p-8 bg-primary/10 rounded-3xl border border-primary/20 shadow-glow transition-transform group-hover:rotate-6 print:hidden">
                                                <mod.icon className="h-12 w-12 text-primary" />
                                            </div>
                                            <div className="space-y-3">
                                                <CardTitle className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white print:text-black leading-none">{mod.title}</CardTitle>
                                                <CardDescription className="text-sm font-bold uppercase tracking-widest opacity-40 text-primary print:text-gray-500">{mod.description}</CardDescription>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-12 md:p-16 space-y-16">
                                            {mod.content.map((item, i) => (
                                                <div key={i} className="space-y-6">
                                                    <div className="flex items-center gap-6">
                                                        <div className="h-px flex-1 bg-white/5 print:bg-gray-200" />
                                                        <h4 className="text-xs font-black uppercase tracking-[0.5em] text-primary italic print:text-blue-700">{item.sub}</h4>
                                                        <div className="h-px w-12 bg-white/5 print:bg-gray-200" />
                                                    </div>
                                                    <p className="text-base font-medium text-white/60 leading-relaxed text-justify indent-12 border-l-4 border-primary/10 pl-12 print:text-black print:border-gray-300">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="p-10 bg-white/[0.01] border-t border-white/5 flex justify-between items-center print:hidden">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Nodo Operativo: {mod.id.toUpperCase()}</span>
                                            </div>
                                            <Button variant="link" className="text-[9px] font-black uppercase text-primary hover:tracking-widest transition-all">Ver Tutorial en Video <ChevronRight className="ml-2 h-3.5 w-3.5"/></Button>
                                        </CardFooter>
                                    </Card>
                                </motion.section>
                            ))}
                        </div>

                        {/* Footer del Manual */}
                        <Card className="bg-primary text-primary-foreground rounded-[4rem] p-20 text-center shadow-glow border-none relative overflow-hidden group print:hidden mt-40">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                                <BrainCircuit className="h-64 w-64" />
                            </div>
                            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
                                    <Activity className="h-4 w-4" /> SOPORTE TÉCNICO NIVEL 3
                                </div>
                                <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-tight shadow-glow-text">¿Necesita asistencia experta?</h3>
                                <p className="text-xl font-bold opacity-80 leading-relaxed italic">
                                    Nuestros ingenieros de soporte están disponibles 24/7 para garantizar la continuidad de sus operaciones en la red Kyron.
                                </p>
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-20 px-16 font-black text-sm uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                    SOLICITAR INTERVENCIÓN TÉCNICA
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Footer Legal HUD */}
                <div className="mt-40 text-center space-y-6 opacity-30 hover:opacity-100 transition-opacity duration-1000 print:hidden">
                    <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.6em]">
                        <span className="flex items-center gap-3"><Lock className="h-3.5 w-3.5" /> AES-512</span>
                        <span className="flex items-center gap-3"><ShieldCheck className="h-3.5 w-3.5" /> SSL SHA-3</span>
                        <span className="flex items-center gap-3"><Database className="h-3.5 w-3.5" /> LEDGER VERIFIED</span>
                    </div>
                    <p className="max-w-3xl mx-auto text-[8px] font-bold uppercase tracking-[0.3em] leading-relaxed text-balance">
                        © {new Date().getFullYear()} System Kyron, C.A. • Registro Mercantil Primero del Distrito Capital • Expediente Maestro Reservado. <br/>
                        La divulgación no autorizada de estos protocolos está sujeta a sanciones legales según el Art. 226 del Código Orgánico Tributario.
                    </p>
                </div>
            </main>
        </div>
    );
}
