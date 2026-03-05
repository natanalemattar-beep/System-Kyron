
"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Fingerprint,
    Radio,
    TabletSmartphone,
    Calculator,
    Users,
    Gavel,
    CreditCard,
    Recycle,
    Cpu,
    BrainCircuit,
    Download,
    FileText,
    Search,
    ChevronRight,
    Terminal,
    ShieldCheck,
    Database,
    Activity,
    Printer,
    CheckCircle2,
    Lock,
    Zap,
    Smartphone,
    LayoutGrid,
    Scale,
    Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Logo } from "@/components/logo";

/**
 * @fileOverview Manual de Usuario Institucional - Ecosistema Kyron v2.6.5
 * Documentación técnica exhaustiva para la operación de módulos administrativos, fiscales y tecnológicos.
 */

const manualModules = [
    {
        id: "identidad",
        title: "1. Sistema de Identidad Digital y Trámites Civiles",
        icon: Fingerprint,
        description: "Protocolo maestro para la gestión de la identidad ciudadana y administración de activos legales.",
        content: [
            {
                sub: "Validación de Identidad Tier-3",
                text: "El sistema emplea un protocolo de validación biométrica mediante análisis de micro-facciones faciales. Este proceso vincula el documento de identidad físico del ciudadano con un hash criptográfico inmutable en el Ledger del ecosistema. Toda interacción posterior queda sellada digitalmente, otorgando validez jurídica absoluta a las solicitudes tramitadas."
            },
            {
                sub: "Expedición de Copias Certificadas",
                text: "A través del portal, el usuario puede gestionar solicitudes de Partidas de Nacimiento, Actas de Matrimonio y Defunción. Al ingresar los datos de Registro (Tomo, Folio y Acta), el sistema realiza una consulta al archivo digitalizado. El documento final se emite con un código QR de autenticación institucional, permitiendo su validación inmediata por entes externos."
            },
            {
                sub: "Bóveda de Resguardo Documental",
                text: "Espacio de almacenamiento cifrado bajo estándar AES-512 para la protección de títulos académicos, registros de propiedad y certificaciones. El acceso está restringido por protocolos de autenticación multifactor (MFA), garantizando la confidencialidad de la información sensible del ciudadano."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura de Telecomunicaciones 5G y eSIM",
        icon: Radio,
        description: "Gestión avanzada de conectividad móvil, aprovisionamiento de red y servicios de telefonía.",
        content: [
            {
                sub: "Activación de Líneas y eSIM",
                text: "El protocolo de activación permite la asignación instantánea de numeración telefónica oficial. Para dispositivos compatibles con tecnología eSIM, el sistema genera un perfil digital de red entregado mediante un código QR de un solo uso. Este procedimiento elimina la dependencia de medios físicos y optimiza el despliegue de conectividad para usuarios individuales y flotas corporativas."
            },
            {
                sub: "Administración de Planes de Datos",
                text: "La plataforma ofrece una matriz de planes optimizados para tecnología 5G. El usuario puede monitorear su consumo de datos, minutos y mensajes en tiempo real. Las organizaciones disponen de herramientas de telemetría para supervisar y redistribuir cuotas de datos entre los terminales vinculados a su nodo operativo."
            },
            {
                sub: "Cumplimiento Regulatorio CONATEL",
                text: "Este módulo integra el control de habilitaciones y permisos ante el ente regulador. Mantiene un monitoreo preventivo sobre la vigencia de las licencias de telecomunicaciones, emitiendo alertas automáticas para la renovación de concesiones de espectro y habilitaciones postales."
            }
        ]
    },
    {
        id: "ventas",
        title: "3. Terminal de Punto de Venta (TPV) e Inteligencia Comercial",
        icon: TabletSmartphone,
        description: "Sistema operativo para el procesamiento de transacciones comerciales con integración fiscal nativa.",
        content: [
            {
                sub: "Operativa de Facturación Fiscal SENIAT",
                text: "La terminal TPV está programada bajo la Providencia Administrativa 0071. Al iniciar una venta, el operador ingresa la identificación fiscal del cliente. El sistema sincroniza automáticamente la razón social y dirección desde la base de datos centralizada, bloqueando la edición manual de campos críticos para asegurar el cumplimiento tributario absoluto."
            },
            {
                sub: "Control de Inventario y Kardex",
                text: "Cada venta procesada activa una instrucción de descuento en el inventario central. El sistema utiliza un motor de sincronización de baja latencia que previene discrepancias entre sedes. Emite notificaciones de 'Stock Crítico' basadas en algoritmos de demanda histórica, facilitando la planificación de compras."
            },
            {
                sub: "Arqueo de Caja y Cierre de Jornada",
                text: "Procedimiento de auditoría obligatoria al final de cada turno. El sistema presenta el monto esperado en caja cruzando ventas electrónicas, transferencias y pagos móviles. El operador debe realizar el conteo físico de billetes por denominación. Cualquier desviación es registrada automáticamente en el Libro de Sobrantes y Faltantes para su posterior ajuste contable."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "4. Centro Contable y Blindaje Fiscal Institucional",
        icon: Calculator,
        description: "Automatización de obligaciones tributarias y mantenimiento de libros oficiales bajo normativa nacional.",
        content: [
            {
                sub: "Generación de Libros de Compra y Venta",
                text: "Consolidación automática de registros diarios para la emisión de los libros oficiales requeridos por el SENIAT. El sistema verifica la correlatividad de números de control y fechas, asegurando que el reporte final sea técnicamente compatible con los requisitos de carga de la administración tributaria."
            },
            {
                sub: "Gestión de IVA e ISLR",
                text: "Cálculo en tiempo real de los débitos y créditos fiscales. El sistema genera el resumen de declaración de IVA al cierre de cada periodo. Asimismo, gestiona los comprobantes de retención de ISLR (AR-C) del personal y proveedores, manteniendo un historial inmutable para auditorías externas."
            },
            {
                sub: "Ajuste por Inflación Fiscal",
                text: "Herramienta técnica para el cálculo del Reajuste por Inflación Fiscal (RIPF) sobre partidas no monetarias. Mantiene el control de depreciación de activos fijos, permitiendo que los estados financieros de la institución reflejen la realidad económica del ejercicio fiscal vigente."
            }
        ]
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento Humano y Nómina (LOTTT)",
        icon: Users,
        description: "Administración integral del capital humano y estricto cumplimiento de la legislación laboral.",
        content: [
            {
                sub: "Procesamiento de Nómina y Pagos",
                text: "Automatización del cálculo quincenal de salarios, asignaciones y deducciones de ley (IVSS, FAOV, Paro Forzoso). El sistema integra el registro de asistencia y horas extras para emitir recibos de pago digitales con validez legal, notificando al trabajador mediante canales institucionales cifrados."
            },
            {
                sub: "Cálculo de Prestaciones y Fideicomiso",
                text: "Conforme al Artículo 142 de la LOTTT, el sistema realiza el cálculo trimestral de la garantía de prestaciones sociales. Mantiene un registro detallado de los intereses devengados y permite la simulación de liquidaciones (finiquitos) ante egresos de personal, garantizando transparencia en la relación laboral."
            },
            {
                sub: "Expediente Digital del Trabajador",
                text: "Centralización de la documentación laboral: contratos, títulos, amonestaciones y evaluaciones de desempeño. Facilita la gestión de vacaciones y permisos, validando automáticamente la disponibilidad de días según la antigüedad del empleado y notificando a la gerencia para su aprobación."
            }
        ]
    },
    {
        id: "legal",
        title: "6. Escritorio Jurídico y Cumplimiento Corporativo",
        icon: Gavel,
        description: "Administración de contratos, poderes de representación y observancia de normativas comerciales.",
        content: [
            {
                sub: "Redacción Automatizada de Contratos",
                text: "El sistema ofrece una biblioteca de modelos jurídicos homologados por el departamento legal. Permite generar contratos de servicios, arrendamientos y acuerdos de confidencialidad inyectando datos institucionales de forma dinámica. Cada documento final puede ser firmado y sellado digitalmente para asegurar su integridad."
            },
            {
                sub: "Monitoreo de Poderes y Actas",
                text: "Registro centralizado de los apoderados legales y socios de la institución. El sistema supervisa las fechas de vencimiento de los poderes notariados y las asambleas ordinarias, emitiendo alertas preventivas para asegurar que la representación jurídica de la empresa esté siempre vigente ante entes públicos y privados."
            },
            {
                sub: "Gestión ante SAPI y SAREN",
                text: "Guías técnicas para el registro de marcas y patentes. Facilita la recopilación de recaudos para trámites ante el Servicio Autónomo de la Propiedad Intelectual (SAPI) y el Servicio Autónomo de Registros y Notarías (SAREN), optimizando la gestión de la propiedad intelectual y la legalidad societaria."
            }
        ]
    },
    {
        id: "finanzas",
        title: "7. Cobranza, Crédito y Soluciones Fintech",
        icon: CreditCard,
        description: "Optimización de flujos de efectivo y administración de carteras de crédito comerciales.",
        content: [
            {
                sub: "Recuperación de Cartera y Cobranza",
                text: "Análisis del comportamiento de pago de clientes para la clasificación de riesgo. El sistema permite programar recordatorios automáticos y gestionar acuerdos de pago, mejorando el índice de recuperación de cuentas por cobrar y fortaleciendo el capital de trabajo de la institución."
            },
            {
                sub: "Sincronización con Plataformas de Pago (BNPL)",
                text: "Protocolos operativos para transacciones con aplicaciones de financiamiento (Cashea, Krece, entre otras). El sistema valida la aprobación del crédito en la plataforma externa y registra el pago inicial, gestionando la conciliación de cuotas de forma transparente para la contabilidad del comercio."
            },
            {
                sub: "Billetera Multimoneda y Cambio",
                text: "Gestión de saldos en Bolívares (VES), Dólares (USD) y Euros (EUR). El sistema aplica las tasas de cambio oficiales del Banco Central de Venezuela (BCV), permitiendo operaciones multimoneda seguras y manteniendo la contabilidad consolidada en la moneda funcional de curso legal."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "8. Ingeniería Ambiental y Sostenibilidad",
        icon: Recycle,
        description: "Protocolos de reciclaje tecnológico y monetización de residuos para el impacto social.",
        content: [
            {
                sub: "Operación de Unidades de Recolección (Smart Bins)",
                text: "Las unidades operan con tecnología de magnetismo para la sujeción y clasificación de envases metálicos y plásticos. El usuario se autentica con su ID Digital; el sistema valida el residuo y asigna 'Eco-Créditos' basados en la masa y el material procesado, fomentando la responsabilidad ambiental ciudadana."
            },
            {
                sub: "Gestión de Eco-Créditos Blockchain",
                text: "Los puntos generados por prácticas sostenibles se registran en un ledger inmutable. Estos activos digitales pueden ser canjeados en la red de comercios aliados o aplicados al pago de servicios integrados en el ecosistema, creando un incentivo económico real para la sostenibilidad urbana."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "9. Planificación de Infraestructura y Proyectos",
        icon: Cpu,
        description: "Diseño técnico asistido por IA y evaluación de factibilidad para obras civiles.",
        content: [
            {
                sub: "Generación de Planos Técnicos mediante Visión Artificial",
                text: "El sistema procesa imágenes de espacios físicos para generar planos a escala de alta precisión. Identifica puntos críticos de infraestructura y sugiere la distribución óptima de mobiliario y nodos de red, reduciendo significativamente los tiempos de planificación técnica y diseño arquitectónico."
            },
            {
                sub: "Cálculo de Presupuestos CapEx",
                text: "A partir del diseño técnico, el sistema estima los insumos necesarios para la ejecución del proyecto. Vincula los requerimientos con la base de datos de proveedores para generar presupuestos de inversión detallados, permitiendo una gestión financiera precisa desde la fase conceptual de la obra."
            }
        ]
    },
    {
        id: "bi",
        title: "10. Inteligencia de Negocio y Estrategia Gerencial",
        icon: BrainCircuit,
        description: "Análisis masivo de datos para la toma de decisiones estratégicas de alta fidelidad.",
        content: [
            {
                sub: "Análisis Predictivo de Mercado",
                text: "El motor de BI procesa datos históricos de ventas y tendencias de mercado para emitir recomendaciones estratégicas. Identifica productos estrella y áreas de oportunidad, permitiendo a la directiva anticiparse a los cambios en la demanda y optimizar la rentabilidad del holding corporativo."
            },
            {
                sub: "Estudios de Factibilidad y Retorno (ROI)",
                text: "Proporciona indicadores financieros críticos como el Valor Actual Neto (VAN) y la Tasa Interna de Retorno (TIR) para nuevas iniciativas. El sistema simula escenarios económicos adversos y favorables, asegurando que las decisiones de inversión institucional estén respaldadas por proyecciones matemáticas robustas."
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
            title: `PROTOCOLO DE EXPORTACIÓN ${format.toUpperCase()} ACTIVADO`,
            description: "Generando documento técnico institucional...",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Manual de Usuario - Ecosistema Kyron</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; line-height: 1.6; color: #000; padding: 60px; }
                        h1 { color: #000; text-align: center; font-size: 26pt; font-weight: bold; margin-bottom: 25px; border-bottom: 4px solid #000; padding-bottom: 10px; }
                        h2 { color: #000; font-size: 18pt; margin-top: 45px; border-bottom: 2px solid #333; padding-bottom: 8px; text-transform: uppercase; }
                        h3 { color: #000; font-size: 13pt; margin-top: 30px; font-weight: bold; text-decoration: underline; }
                        p { font-size: 11pt; text-align: justify; margin-bottom: 18px; }
                        .footer { font-size: 9pt; text-align: center; color: #666; margin-top: 80px; border-top: 1px solid #ccc; padding-top: 25px; }
                        .ref-id { text-align: right; font-weight: bold; font-size: 10pt; margin-bottom: 50px; color: #444; }
                    </style>
                </head>
                <body>
                    <div class="ref-id">REFERENCIA TÉCNICA: KYR-MANUAL-2026-MIN</div>
                    <h1>MANUAL DE USUARIO INSTITUCIONAL</h1>
                    <p style="text-align: center; font-weight: bold; font-size: 14pt;">Versión 2.6.5 • Ecosistema de Misión Crítica Kyron</p>
                    <p style="text-align: center; font-style: italic;">Guía técnica oficial de operación para los nodos administrativos, fiscales y tecnológicos de la plataforma.</p>
            `;
            
            let body = "";
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p><strong>Definición del Módulo:</strong> ${mod.description}</p>`;
                mod.content.forEach(c => {
                    body += `<h3>${c.sub}</h3><p>${c.text}</p>`;
                });
            });

            const footer = `
                    <div class="footer">
                        © ${new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Todos los derechos reservados.<br/>
                        Este documento es confidencial y para uso exclusivo de la institución autorizada.
                    </div>
                </body></html>
            `;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + body + footer);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `Manual_de_Usuario_Kyron_v265_Oficial.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* CSS para ocultar componentes globales */}
            <style jsx global>{`
                header.fixed.top-0, 
                footer.border-t,
                .no-print {
                    display: none !important;
                }
                body {
                    padding-top: 0 !important;
                }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; color: black !important; }
                    .glass-card { background: white !important; color: black !important; border: 1px solid #ddd !important; box-shadow: none !important; }
                    section { page-break-inside: avoid; }
                }
            `}</style>

            <header className="fixed top-0 left-0 right-0 z-[150] h-20 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print shadow-2xl">
                <Link href="/" className="flex items-center gap-4 group">
                    <Logo className="h-10 w-10 shadow-glow" />
                    <div className="flex flex-col">
                        <span className="text-xs font-black tracking-[0.6em] text-white uppercase italic">SYSTEM KYRON</span>
                        <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">Manual de Usuario Institucional</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-11 rounded-xl text-[10px] font-black uppercase border-white/10 hover:bg-white/5 transition-all" onClick={() => handleDownload('word')}>
                        <FileText className="mr-2 h-4 w-4 text-primary" /> EXPORTAR .DOC
                    </Button>
                    <Button className="btn-3d-primary h-11 px-8 rounded-xl text-[10px] font-black uppercase shadow-2xl" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-6xl pt-32 pb-40 relative z-10">
                <div className="text-center space-y-8 mb-24">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.6em] text-primary shadow-glow">
                        <Terminal className="h-3 w-3" /> PROTOCOLO TÉCNICO DE OPERACIÓN v2.6.5
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">Manual de <br/> <span className="text-primary">Usuario</span></h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-bold uppercase tracking-tight italic leading-relaxed border-l-4 border-primary/20 pl-8">
                        Expediente técnico de alta fidelidad para la administración integral de nodos operacionales.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Barra Lateral de Navegación */}
                    <aside className="lg:col-span-4 space-y-8 no-print">
                        <Card className="glass-card p-8 rounded-[3rem] sticky top-32 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-8 border-b border-white/5 pb-6 flex flex-row items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                    <Activity className="h-4 w-4 animate-pulse" /> Navegación Modular
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-1.5">
                                {manualModules.map((mod) => (
                                    <Button 
                                        key={mod.id}
                                        variant="ghost" 
                                        className="w-full justify-start h-12 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 group"
                                        onClick={() => {
                                            const el = document.getElementById(mod.id);
                                            if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
                                        }}
                                    >
                                        <mod.icon className="mr-4 h-4 w-4 opacity-30 group-hover:opacity-100" />
                                        {mod.title.split('. ')[1]}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-8 space-y-32">
                        <div className="relative mb-16 no-print">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/40" />
                            <Input 
                                placeholder="BUSCAR PROTOCOLO O MÓDULO..." 
                                className="h-20 pl-16 rounded-3xl bg-white/[0.03] border-white/10 text-white font-black uppercase text-xs tracking-widest focus-visible:ring-primary shadow-inner"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-40">
                            {filteredModules.map((mod) => (
                                <motion.section 
                                    key={mod.id} 
                                    id={mod.id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="scroll-mt-32"
                                >
                                    <Card className="glass-card rounded-[4rem] border-white/5 overflow-hidden bg-black/60 hover:border-primary/20 transition-all duration-700 group shadow-2xl">
                                        <CardHeader className="p-12 md:p-20 border-b border-white/5 flex flex-row items-center gap-12 bg-white/[0.01]">
                                            <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-glow group-hover:scale-105 transition-transform duration-500">
                                                <mod.icon className="h-14 w-14 text-primary" />
                                            </div>
                                            <div className="space-y-4">
                                                <CardTitle className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                                <CardDescription className="text-sm font-black uppercase tracking-[0.4em] opacity-40 text-primary">{mod.description}</CardDescription>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-12 md:p-20 space-y-20">
                                            {mod.content.map((item, i) => (
                                                <div key={i} className="space-y-8">
                                                    <div className="flex items-center gap-8">
                                                        <div className="h-[2px] flex-1 bg-white/5" />
                                                        <h4 className="text-sm font-black uppercase tracking-[0.6em] text-primary italic shadow-glow-text">{item.sub}</h4>
                                                        <div className="h-[2px] w-16 bg-white/5" />
                                                    </div>
                                                    <p className="text-lg font-medium text-white/60 leading-relaxed text-justify indent-16 border-l-4 border-primary/10 pl-16">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="p-12 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo de Operación Verificado</span>
                                            </div>
                                            <span className="text-[10px] font-mono text-white/10">ID: {mod.id.toUpperCase()}-2026</span>
                                        </CardFooter>
                                    </Card>
                                </motion.section>
                            ))}
                        </div>

                        {/* Soporte Institucional */}
                        <Card className="bg-primary text-primary-foreground rounded-[4rem] p-20 text-center shadow-glow border-none relative overflow-hidden group no-print mt-40">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                                <ShieldCheck className="h-80 w-80" />
                            </div>
                            <div className="relative z-10 max-w-2xl mx-auto space-y-12">
                                <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight italic-shadow">Asistencia Técnica Especializada</h3>
                                <p className="text-xl font-bold opacity-90 leading-relaxed italic border-l-4 border-white/30 pl-10">
                                    Nuestra mesa de ayuda institucional está capacitada para resolver incidencias operativas bajo protocolo de alta prioridad y seguridad de datos.
                                </p>
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-20 px-16 font-black text-sm uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                    CONTACTAR INGENIERÍA CENTRAL
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Footer Institucional */}
                <div className="mt-40 text-center space-y-10 opacity-30 no-print">
                    <div className="flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.8em]">
                        <span className="flex items-center gap-4"><Lock className="h-4 w-4" /> CIFRADO AES-512</span>
                        <span className="flex items-center gap-4"><Database className="h-4 w-4" /> LEDGER VERIFIED</span>
                        <span className="flex items-center gap-4"><Activity className="h-4 w-4" /> STATUS: OPERATIONAL</span>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <p className="max-w-4xl mx-auto text-[9px] font-bold uppercase tracking-[0.4em] leading-relaxed italic">
                        © {new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Registro Mercantil Primero del Distrito Capital • Todos los derechos reservados. <br/>
                        Este documento constituye propiedad intelectual protegida por la Ley sobre el Derecho de Autor.
                    </p>
                </div>
            </main>
        </div>
    );
}
