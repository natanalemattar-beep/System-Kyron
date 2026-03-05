
"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    BookOpen, 
    Smartphone, 
    ShieldCheck, 
    ShoppingCart, 
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
    Printer,
    CheckCircle2,
    Calculator,
    CreditCard,
    FileScan,
    BrainCircuit,
    Fingerprint,
    Radio,
    TabletSmartphone,
    Info,
    AlertTriangle,
    ChevronRight,
    Layers,
    Target,
    Terminal,
    Box,
    Network,
    MousePointer2,
    Barcode,
    Landmark,
    Briefcase,
    HeartPulse
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Logo } from "@/components/logo";

const manualModules = [
    {
        id: "identidad",
        title: "1. Módulo de Identidad Digital 3D (Portal Ciudadano)",
        icon: Fingerprint,
        description: "Gestión soberana de la identidad civil y digital del ciudadano en el ecosistema Kyron.",
        content: [
            {
                sub: "Validación KYC y Biometría",
                text: "Para activar su ID Digital, debe cargar una fotografía de alta resolución de su cédula de identidad. Nuestro motor de IA (Kyron-Vision) realizará un escaneo OCR para verificar los datos contra el registro civil. Posteriormente, se requerirá una captura facial 3D para generar el hash biométrico inmutable que protegerá sus trámites."
            },
            {
                sub: "Uso de la Tarjeta Digital Interactiva",
                text: "Su tarjeta digital no es una imagen estática. Es un nodo de datos que puede ser pulsado para girar, revelando un código QR dinámico. Este código permite compartir su ficha profesional (vCard) con un solo toque o validar su identidad ante entes oficiales sin necesidad de documentos físicos."
            },
            {
                sub: "Bóveda de Documentos Civiles",
                text: "Acceda a copias certificadas de Partidas de Nacimiento, Actas de Matrimonio y Antecedentes Penales. Cada documento descargado cuenta con un sello de agua digital y un código QR de validación que garantiza su autenticidad mediante el ledger de System Kyron."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Módulo de Telecomunicaciones Hyper-Connect 5G",
        icon: Radio,
        description: "Activación inmediata de servicios de voz y datos de ultra-alta velocidad.",
        content: [
            {
                sub: "Asignación de Números Telefónicos",
                text: "En la terminal de Telecom, el usuario puede buscar y reservar números telefónicos en tiempo real. El sistema permite la portabilidad o la creación de nuevas líneas corporativas vinculadas directamente al RIF de la empresa para facturación centralizada."
            },
            {
                sub: "Protocolo de Despliegue eSIM",
                text: "Seleccione el plan de datos deseado. Tras la confirmación del pago, el sistema provisiona un nodo de red y genera un perfil eSIM. Este se entrega vía código QR en pantalla. Una vez escaneado por el terminal móvil, la conexión 5G se activa en menos de 10 segundos con cifrado punto a punto."
            },
            {
                sub: "Gestión de Flotas Corporativas",
                text: "Permite a los administradores de TI monitorear el estatus de todas las líneas activas, realizar recargas de saldo instantáneas y gestionar contratos mayoristas de datos para operaciones de campo."
            }
        ]
    },
    {
        id: "tpv",
        title: "3. Terminal de Ventas (TPV) e Inteligencia de Caja",
        icon: TabletSmartphone,
        description: "Procesamiento de transacciones comerciales con integración fiscal absoluta.",
        content: [
            {
                sub: "Operativa del Cajero",
                text: "El sistema requiere la selección de un cajero activo para iniciar el turno. La interfaz está optimizada para pantallas táctiles y lectores de código de barras. Al escanear un producto, el sistema descuenta automáticamente del inventario global en tiempo real."
            },
            {
                sub: "Facturación Rápida vía RIF",
                text: "Al ingresar el RIF o Cédula del cliente, el TPV consulta instantáneamente el Ledger de Identidad. Si el cliente está registrado, todos sus datos fiscales se pre-llenan en la factura, asegurando que el documento cumpla con la Providencia SNAT/2011/0071 del SENIAT."
            },
            {
                sub: "Arqueo y Cierre Multimoneda",
                text: "El protocolo de arqueo obliga al conteo físico de billetes por denominación (VES, USD, EUR). El sistema compara este conteo con el reporte de ventas del software. Cualquier discrepancia genera un 'Libro de Sobrantes y Faltantes' que debe ser justificado ante supervisión."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "4. Blindaje Fiscal y Contabilidad Predictiva",
        icon: Calculator,
        description: "Automatización total de obligaciones tributarias con 0% riesgo de sanciones.",
        content: [
            {
                sub: "Libros de Compra y Venta Automatizados",
                text: "Cada factura emitida o gasto cargado alimenta automáticamente los libros fiscales. Al final del periodo, el sistema genera el archivo TXT listo para ser subido al portal del SENIAT, eliminando el error humano en la transcripción de datos."
            },
            {
                sub: "Declaración de IVA e IGTF",
                text: "El módulo de declaración muestra el balance exacto entre Débito y Crédito fiscal. Calcula automáticamente el impuesto a pagar y permite emitir el comprobante de pago para conciliación bancaria inmediata."
            },
            {
                sub: "Gestión de Comprobantes AR-C",
                text: "Genera masivamente los comprobantes de retención de ISLR para empleados y proveedores. Cada comprobante incluye un código QR que permite a cualquier auditor verificar el registro de la retención en el nodo maestro de la empresa."
            }
        ]
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento y Nómina (LOTTT)",
        icon: Users,
        description: "Administración integral del capital humano bajo el marco legal venezolano.",
        content: [
            {
                sub: "Cálculo de Nómina Quincenal",
                text: "El motor de nómina integra sueldos, bonos de productividad, cestaticket y deducciones obligatorias (IVSS, FAOV). El sistema permite emitir recibos de pago digitales que se envían automáticamente al WhatsApp o Email del trabajador."
            },
            {
                sub: "Liquidación y Prestaciones Sociales",
                text: "Calculadora avanzada que proyecta prestaciones sociales basadas en la antigüedad (Art. 142 LOTTT). Incluye el cálculo de garantía de antigüedad, días adicionales y utilidades fraccionadas, generando un documento de finiquito listo para ser firmado."
            },
            {
                sub: "Control de Asistencia y Permisos",
                text: "Los empleados pueden solicitar permisos o reportar inasistencias desde su terminal personal. RR.HH. recibe una alerta en tiempo real para aprobar o rechazar la solicitud, afectando directamente el cálculo de la nómina activa."
            }
        ]
    },
    {
        id: "legal",
        title: "6. Escritorio Jurídico y Cumplimiento Corporativo",
        icon: Gavel,
        description: "Repositorio estratégico para la seguridad legal de la entidad.",
        content: [
            {
                sub: "Generador de Contratos Pro",
                text: "Acceda a plantillas homologadas de contratos de servicios, alquiler, licencias de software y trabajo. El sistema permite la edición dinámica y el sellado digital para mantener un archivo histórico inmutable de todos los acuerdos comerciales."
            },
            {
                sub: "Gestión de Poderes y Representación",
                text: "Registre y monitoree la vigencia de los poderes otorgados a socios y abogados. El sistema emite alertas preventivas 30 días antes del vencimiento de cualquier representación ante registros o notarías (SAREN)."
            },
            {
                sub: "Cumplimiento ante el SAPI",
                text: "Guía técnica para el registro de marcas y patentes. Proporciona los modelos de carta de solicitud y el checklist de recaudos necesarios para proteger la propiedad intelectual de la empresa en Venezuela."
            }
        ]
    },
    {
        id: "fintech",
        title: "7. Finanzas y Cobranza Inteligente",
        icon: CreditCard,
        description: "Gestión de liquidez y recuperación de cartera mediante análisis de riesgo.",
        content: [
            {
                sub: "Pasarelas de Pago y Financiamiento",
                text: "Integración con plataformas 'Compra Ahora, Paga Después' (BNPL) como Cashea, Krece y Lysto. El manual detalla cómo procesar el cobro del pago inicial y cómo el sistema realiza el seguimiento de las cuotas pendientes."
            },
            {
                sub: "Gestor de Cuentas por Cobrar",
                text: "Visualice la antigüedad de su deuda mediante una matriz de riesgo. El sistema permite automatizar campañas de cobro (mensajes de recordatorio) a clientes con facturas próximas a vencer o ya vencidas."
            },
            {
                sub: "Conciliación Bancaria IA",
                text: "Suba su estado de cuenta bancario y nuestra IA cruzará automáticamente los movimientos con las facturas registradas, identificando pagos por referencia o monto para cuadrar la contabilidad en segundos."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "8. Ingeniería de Sostenibilidad (Fundación Kyron)",
        icon: Recycle,
        description: "Monetización del impacto ambiental mediante tecnología magnética.",
        content: [
            {
                sub: "Operación de Smart Bins",
                text: "Las papeleras inteligentes de System Kyron utilizan sensores de inducción magnética síncrona. Al acercar un envase, el sistema detecta si es metálico o plástico PET, activando el protocolo de sujeción y compactación automática."
            },
            {
                sub: "Billetera de Eco-Créditos",
                text: "Cada gramo de residuo validado inyecta puntos en la billetera digital del usuario. Estos puntos son activos digitales sellados en el ledger ambiental y pueden ser canjeados en la red de comercios aliados por productos o servicios."
            },
            {
                sub: "Certificación de Huella de Carbono",
                text: "Las empresas pueden generar reportes de su impacto ambiental positivo, validados por la Fundación Kyron, para ser utilizados en balances de Responsabilidad Social Empresarial (RSE)."
            }
        ]
    },
    {
        id: "proyectos",
        title: "9. Ingeniería y Planificación de Infraestructura",
        icon: Cpu,
        description: "Herramientas de diseño y presupuesto para expansión física.",
        content: [
            {
                sub: "Generación de Planos IA",
                text: "Mediante la carga de una fotografía panorámica del local, el motor de visión artificial calcula perímetros y genera un plano a escala (DXF/PDF). Identifica automáticamente áreas óptimas para puestos de trabajo y cableado de red."
            },
            {
                sub: "Presupuestos de Obra Automatizados",
                text: "Basándose en las medidas del plano, el sistema calcula la cantidad exacta de materiales necesarios (porcelanato, galones de pintura, luminarias) y estima el costo de mano de obra según los baremos actuales del sector construcción."
            },
            {
                sub: "Factibilidad Económica Pro",
                text: "Módulo de análisis de inversión que calcula el VAN (Valor Actual Neto) y la TIR (Tasa Interna de Retorno). Proporciona un dictamen técnico de viabilidad para asegurar que el proyecto sea rentable antes de ejecutar el CapEx."
            }
        ]
    },
    {
        id: "bi",
        title: "10. Inteligencia de Negocio (Business Intelligence)",
        icon: BrainCircuit,
        description: "Análisis estratégico de datos para el crecimiento exponencial.",
        content: [
            {
                sub: "Generador de Estrategias de Venta",
                text: "La IA analiza su inventario y detecta productos de baja rotación. Sugiere automáticamente estrategias de 'Bundling' (combos) o promociones de 'Cross-selling' basadas en el comportamiento histórico de compra de sus clientes."
            },
            {
                sub: "Análisis de Sentimiento del Cliente",
                text: "Pegue las reseñas o comentarios de sus clientes. El motor de procesamiento de lenguaje natural (NLP) clasificará la satisfacción en Positiva, Negativa o Neutral, identificando los 'puntos de dolor' de su servicio."
            },
            {
                sub: "Estudio Demográfico y de Mercado",
                text: "Herramienta para visualizar la densidad de población y el nivel de competencia en zonas geográficas específicas. Ideal para planificar la apertura de nuevas sucursales o franquicias con datos reales."
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
            // Document Builder for Word
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
                    <p style="text-align: center; font-style: italic;">Este documento constituye la guía oficial de operación detallada para los módulos comerciales, civiles y tecnológicos de la plataforma.</p>
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
            fileDownload.download = `Manual_Kyron_v2.6.5_DETALLADO.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden hud-grid selection:bg-primary/20">
            {/* CSS para ocultar la barra de navegación del layout global */}
            <style jsx global>{`
                header.fixed.top-0, 
                header.fixed.top-0 + div,
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

            {/* Header de Manual (Propio, para no depender del global que se oculta) */}
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
                        <Terminal className="h-3 w-3" /> ARCHIVO TÉCNICO DE ENTRENAMIENTO
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
                        Guía de operaciones de alta fidelidad para el ecosistema Kyron. <br/>
                        Desglose modular detallado para el despliegue de infraestructura comercial y civil.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Barra Lateral de Navegación por Anclas */}
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
                                        <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-40 transition-all h-3 w-3" />
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal Detallado */}
                    <div className="lg:col-span-8 space-y-24">
                        {/* Buscador de Protocolos */}
                        <div className="relative mb-16 no-print">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/40" />
                            <Input 
                                placeholder="ESCRIBA EL NOMBRE DE UN MÓDULO O PROCEDIMIENTO..." 
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
                                            <Button variant="link" className="text-[9px] font-black uppercase text-primary hover:tracking-widest transition-all">Ver Tutorial en Video <ArrowRight className="ml-2 h-3.5 w-3.5"/></Button>
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

                {/* Pie de página legal HUD */}
                <div className="mt-40 text-center space-y-6 opacity-30 hover:opacity-100 transition-opacity duration-1000 print:hidden">
                    <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.6em]">
                        <span className="flex items-center gap-3"><Lock className="h-3.5 w-3.5" /> AES-512</span>
                        <span className="flex items-center gap-3"><ShieldCheck className="h-3.5 w-3.5" /> SSL SHA-3</span>
                        <span className="flex items-center gap-3"><Database className="h-3.5 w-3.5" /> LEDGER VERIFIED</span>
                    </div>
                    <p className="max-w-3xl mx-auto text-[8px] font-bold uppercase tracking-[0.3em] leading-relaxed text-balance">
                        © {new Date().getFullYear()} System Kyron, C.A. • Registro Mercantil Primero del Distrito Capital • Expediente Maestro Reservado. <br/>
                        Cualquier reproducción o distribución no autorizada de este manual técnico está sujeta a sanciones legales según el Art. 226 del Código Orgánico Tributario.
                    </p>
                </div>
            </main>
        </div>
    );
}
