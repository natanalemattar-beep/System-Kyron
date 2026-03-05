
"use client";

import { useState, useEffect } from "react";
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
    Scale,
    Shield,
    Smartphone,
    Globe,
    Info,
    ArrowDown
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Logo } from "@/components/logo";

/**
 * @fileOverview MANUAL DE USUARIO INSTITUCIONAL - ECOSISTEMA KYRON v2.6.5
 * Documentación técnica exhaustiva diseñada para el cumplimiento de misión crítica.
 * Este documento es de acceso público y permite la descarga en formatos oficiales.
 */

const manualModules = [
    {
        id: "identidad",
        title: "1. Sistema de Identidad Digital y Trámites Civiles",
        icon: Fingerprint,
        description: "Gestión soberana de la identidad ciudadana y activos legales digitalizados.",
        content: [
            {
                sub: "Protocolo de Validación Biométrica 3D",
                text: "El sistema emplea tecnología de reconocimiento facial para vincular la identidad física del usuario con un hash criptográfico inmutable. Este proceso garantiza que cada trámite realizado en la plataforma posea una firma digital de alta fidelidad, imposible de repudiar ante órganos judiciales."
            },
            {
                sub: "Gestión de Bóveda Civil",
                text: "Usted podrá solicitar y almacenar copias certificadas de Partidas de Nacimiento, Actas de Matrimonio y Defunción. La carga de datos requiere los campos de Tomo, Folio y Acta. Una vez verificado por el registrador, el documento se emite con un sello QR institucional verificable en línea."
            },
            {
                sub: "Seguridad de Datos Ciudadanos",
                text: "Toda la información personal está cifrada bajo el estándar AES-512. El acceso a documentos sensibles requiere de un protocolo de autenticación multifactor (MFA), asegurando que solo el titular o el representante legal autorizado pueda consultar la información."
            }
        ]
    },
    {
        id: "telecom",
        title: "2. Infraestructura Hyper-Connect 5G y eSIM",
        icon: Radio,
        description: "Administración de redes móviles, activación de líneas y servicios de conectividad global.",
        content: [
            {
                sub: "Activación Instantánea de eSIM",
                text: "Para dispositivos compatibles, el sistema permite la descarga de perfiles de red virtuales. Tras la validación de identidad, se genera un código QR único que configura automáticamente los parámetros de red 5G en el terminal del usuario."
            },
            {
                sub: "Gestión de Flotas Corporativas",
                text: "Las instituciones pueden supervisar el consumo de datos y minutos de cada terminal vinculado. El panel permite la redistribución de cuotas en tiempo real para optimizar la operatividad de los nodos desplegados en campo."
            },
            {
                sub: "Cumplimiento Regulatorio CONATEL",
                text: "Integra un módulo de monitoreo de habilitaciones. El sistema emite alertas preventivas 60 días antes del vencimiento de concesiones de espectro o permisos postales, facilitando el inicio del trámite de renovación desde el terminal."
            }
        ]
    },
    {
        id: "ventas",
        title: "3. Terminal de Punto de Venta (TPV) Inteligente",
        icon: TabletSmartphone,
        description: "Procesamiento de transacciones comerciales con integración fiscal automatizada.",
        content: [
            {
                sub: "Carga Fiscal por RIF",
                text: "El cajero solo requiere ingresar el RIF o Cédula del cliente. El sistema sincroniza instantáneamente la Razón Social y Dirección Fiscal desde el nodo central, eliminando errores humanos y cumpliendo con la Providencia SNAT/2011/0071."
            },
            {
                sub: "Arqueo de Caja y Conciliación",
                text: "Al cierre de cada turno, el protocolo de arqueo cruza los montos registrados en el sistema (Ventas, Transferencias, Pago Móvil) con el conteo físico de billetes y monedas. Cualquier discrepancia queda registrada en el Libro de Sobrantes y Faltantes para auditoría."
            },
            {
                sub: "Sincronización de Inventario de Baja Latencia",
                text: "Cada venta descarga automáticamente las existencias del almacén local y actualiza el stock global del holding. El sistema genera alertas de 'Rotación Negativa' para productos con baja demanda."
            }
        ]
    },
    {
        id: "facturacion",
        title: "4. Facturación, Notas de Crédito y Débito",
        icon: CreditCard,
        description: "Control de documentos de venta y gestión de financiamiento comercial.",
        content: [
            {
                sub: "Emisión de Documentos Fiscales",
                text: "Generación de facturas definitivas, notas de débito por recargos y notas de crédito para ajustes. Todos los documentos mantienen una correlatividad estricta y están homologados por la normativa vigente."
            },
            {
                sub: "Gestión de Financiamiento BNPL",
                text: "Protocolos para transacciones con Cashea, Krece y otros aliados. El sistema valida el nivel del cliente y registra el pago inicial, programando automáticamente las cuotas en el calendario de cuentas por cobrar."
            }
        ]
    },
    {
        id: "contabilidad",
        title: "5. Centro Contable y Blindaje Fiscal SENIAT",
        icon: Calculator,
        description: "Automatización total de la carga impositiva y mantenimiento de libros oficiales.",
        content: [
            {
                sub: "Libros Oficiales Automatizados",
                text: "Mantenimiento diario de los Libros de Compras y Ventas. El sistema agrupa las operaciones por periodo fiscal y permite la exportación de archivos planos compatibles con el portal del SENIAT."
            },
            {
                sub: "Declaración de IVA e ISLR",
                text: "Cálculo preciso de débitos y créditos fiscales. El motor de IA audita cada asiento para detectar inconsistencias antes de la emisión del resumen de declaración, garantizando un riesgo de sanción del 0%."
            }
        ]
    },
    {
        id: "bi",
        title: "6. Inteligencia de Negocio (BI) y Estrategia",
        icon: BrainCircuit,
        description: "Análisis predictivo y visualización de datos para la alta gerencia.",
        content: [
            {
                sub: "Cuadro de Mando Ejecutivo",
                text: "Visualización de KPIs críticos: Liquidez, Margen de Contribución y Punto de Equilibrio. Los datos se presentan en tiempo real mediante gráficasHUD de alta fidelidad."
            },
            {
                sub: "Generador de Estrategias con IA",
                text: "El módulo analiza los productos con menor demanda y sugiere promociones, combos o ajustes de precio basados en el comportamiento histórico del mercado y la elasticidad de la demanda."
            }
        ]
    },
    {
        id: "rrhh",
        title: "7. Gestión de Talento Humano y Nómina",
        icon: Users,
        description: "Administración integral de la relación laboral conforme a la LOTTT.",
        content: [
            {
                sub: "Procesamiento de Nómina Quincenal",
                text: "Cálculo automatizado de sueldos, cestatickets, retenciones de ley (IVSS, FAOV) y préstamos. Emite recibos de pago digitales con firma institucional para cada trabajador."
            },
            {
                sub: "Liquidación y Prestaciones Sociales",
                text: "Realiza el cálculo trimestral de la garantía de prestaciones según el Art. 142. Ante egresos, genera el finiquito detallado incluyendo vacaciones y utilidades fraccionadas."
            }
        ]
    },
    {
        id: "legal",
        title: "8. Escritorio Jurídico y Gestión de Poderes",
        icon: Gavel,
        description: "Centralización de contratos, representaciones y cumplimiento normativo.",
        content: [
            {
                sub: "Repositorio de Contratos Homologados",
                text: "Acceso a una biblioteca de minutas legales (Servicios, Obra, Arrendamiento). Permite la inyección de datos dinámicos y el seguimiento de fechas de vencimiento para renovaciones automáticas."
            },
            {
                sub: "Control de Poderes y Socios",
                text: "Módulo para el registro de actas de asamblea y vigencia de poderes notariales. Emite alertas críticas si un apoderado judicial o administrativo está próximo a la extinción de sus facultades."
            }
        ]
    },
    {
        id: "sostenibilidad",
        title: "9. Ingeniería Ambiental y Eco-Créditos",
        icon: Recycle,
        description: "Operación de infraestructuras de reciclaje inteligente y activos verdes.",
        content: [
            {
                sub: "Tecnología de Reciclaje Magnético",
                text: "Protocolo de operación para las Smart Bins. El sistema utiliza sensores de inducción para validar el material. Al finalizar la inyección, los Eco-Créditos se transfieren automáticamente a la billetera del ciudadano."
            },
            {
                sub: "Trazabilidad Blockchain",
                text: "Cada kg de material procesado se registra en un ledger inmutable, permitiendo a la institución certificar su impacto ambiental positivo ante organismos internacionales."
            }
        ]
    },
    {
        id: "ingenieria",
        title: "10. Planificación de Infraestructura y Proyectos",
        icon: Cpu,
        description: "Diseño técnico, presupuestos de obra y soluciones tecnológicas aplicadas.",
        content: [
            {
                sub: "Generación de Planos con IA",
                text: "A partir de levantamientos fotográficos, el sistema genera planos arquitectónicos y de redes con precisión técnica, optimizando la distribución de activos en el local."
            },
            {
                sub: "Presupuestos CapEx Estructurados",
                text: "Herramienta para el cálculo de inversión en proyectos tecnológicos y civiles. Vincula los requerimientos técnicos con los costos de insumos homologados, generando dictámenes de factibilidad económica."
            }
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownload = (format: 'pdf' | 'word') => {
        toast({
            title: `EXPORTACIÓN ${format.toUpperCase()} ACTIVADA`,
            description: "El expediente técnico está siendo procesado para su descarga.",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            const header = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.6; padding: 40px; color: #000; }
                        h1 { text-align: center; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; font-size: 24pt; }
                        h2 { color: #000; border-bottom: 1px solid #333; margin-top: 40px; text-transform: uppercase; font-size: 18pt; }
                        h3 { color: #444; margin-top: 25px; text-decoration: underline; font-size: 14pt; }
                        p { text-align: justify; margin-bottom: 15px; font-size: 11pt; }
                        .footer { font-size: 9pt; text-align: center; color: #666; margin-top: 60px; border-top: 1px solid #ddd; padding-top: 10px; }
                    </style>
                </head>
                <body>
                    <h1>MANUAL DE USUARIO OFICIAL</h1>
                    <p style="text-align: center; font-weight: bold; font-size: 14pt;">Ecosistema Institucional de Misión Crítica Kyron v2.6.5</p>
                    <p style="text-align: center; font-style: italic;">Documento para uso ministerial y administrativo</p>
            `;
            
            let body = "";
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p><strong>Descripción:</strong> ${mod.description}</p>`;
                mod.content.forEach(c => {
                    body += `<h3>${c.sub}</h3><p>${c.text}</p>`;
                });
            });

            const footer = `
                    <div class="footer">
                        © ${new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Documento de Acceso Público.
                    </div>
                </body></html>
            `;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + body + footer);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `Manual_de_Usuario_Kyron_Institucional.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden hud-grid">
            {/* Reglas de Estilo para Ocultar Barra Superior Global */}
            <style jsx global>{`
                header.fixed.top-0, 
                footer.border-t,
                .no-print {
                    display: none !important;
                }
                body { padding-top: 0 !important; }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; color: black !important; }
                    .glass-card { background: white !important; border: 1px solid #ddd !important; box-shadow: none !important; }
                    .text-white { color: black !important; }
                    .text-primary { color: #2563eb !important; }
                    .text-white\/40 { color: #666 !important; }
                }
            `}</style>

            {/* Cabecera Local del Manual (Sustituye a la Global) */}
            <header className="fixed top-0 left-0 right-0 z-[150] h-24 bg-black/95 backdrop-blur-3xl border-b border-white/5 flex items-center px-6 md:px-16 justify-between no-print">
                <div className="flex items-center gap-6">
                    <Logo className="h-12 w-12 shadow-glow" />
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-[0.6em] uppercase italic">SYSTEM KYRON</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] opacity-60">Expediente Técnico de Usuario</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase border-white/10 hover:bg-white/5" onClick={() => handleDownload('word')}>
                        <FileText className="mr-2 h-4 w-4" /> EXPORTAR .DOC
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-6xl pt-40 pb-40 relative z-10">
                <div className="text-center space-y-10 mb-32">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.6em] text-primary">
                        <Terminal className="h-4 w-4" /> PROTOCOLO DE USO INSTITUCIONAL v2.6.5
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic italic-shadow">Manual de <span className="text-primary">Usuario</span></h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-4xl mx-auto font-bold uppercase tracking-tight italic border-l-4 border-primary/20 pl-10">
                        Documentación técnica exhaustiva para la operación de nodos en el ecosistema nacional de gestión integral.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-20">
                    {/* Navegación por Enlaces de Salto (Jump Links) */}
                    <aside className="lg:col-span-4 no-print">
                        <Card className="glass-card p-10 rounded-[3rem] sticky top-40 border-white/5 bg-black/60 shadow-2xl">
                            <CardHeader className="p-0 mb-10 border-b border-white/5 pb-8">
                                <CardTitle className="text-[11px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-4">
                                    <Activity className="h-5 w-5 animate-pulse" /> Índice de Protocolos
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-2">
                                {manualModules.map((mod) => (
                                    <a 
                                        key={mod.id}
                                        href={`#${mod.id}`}
                                        className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/30 group border border-transparent hover:border-primary/20"
                                    >
                                        <mod.icon className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        <span>{mod.title.split('. ')[1]}</span>
                                    </a>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Contenido Modular Detallado */}
                    <div className="lg:col-span-8 space-y-40">
                        {manualModules.map((mod) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="scroll-mt-40"
                            >
                                <Card className="glass-card rounded-[4rem] border-white/5 overflow-hidden bg-black/60 shadow-2xl group transition-all duration-1000 hover:border-primary/30">
                                    <CardHeader className="p-16 md:p-24 border-b border-white/5 flex flex-row items-center gap-16 bg-white/[0.01]">
                                        <div className="p-10 bg-primary/10 rounded-[3rem] border border-primary/20 shadow-glow group-hover:scale-110 transition-transform duration-700">
                                            <mod.icon className="h-16 w-16 text-primary" />
                                        </div>
                                        <div className="space-y-6">
                                            <CardTitle className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">{mod.title}</CardTitle>
                                            <CardDescription className="text-sm font-black uppercase tracking-[0.5em] opacity-40 text-primary">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-16 md:p-24 space-y-24">
                                        {mod.content.map((item, i) => (
                                            <div key={i} className="space-y-10">
                                                <div className="flex items-center gap-10">
                                                    <div className="h-[2px] flex-1 bg-white/5" />
                                                    <h4 className="text-sm font-black uppercase tracking-[0.8em] text-primary italic shadow-glow-text">{item.sub}</h4>
                                                    <div className="h-[2px] w-20 bg-white/5" />
                                                </div>
                                                <p className="text-xl font-medium text-white/60 leading-relaxed text-justify indent-20 border-l-4 border-primary/10 pl-20 italic">
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="p-12 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Protocolo de Alta Fidelidad</span>
                                        </div>
                                        <Button variant="link" className="text-[10px] font-black uppercase text-primary p-0 hover:shadow-glow-text" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                            VOLVER AL ÍNDICE <ArrowDown className="ml-3 h-4 w-4 rotate-180" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.section>
                        ))}

                        {/* Bloque de Soporte Institucional */}
                        <Card className="bg-primary text-primary-foreground rounded-[4rem] p-24 text-center shadow-glow border-none relative overflow-hidden group no-print mt-40">
                            <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                                <ShieldCheck className="h-[400px] w-[400px]" />
                            </div>
                            <div className="relative z-10 max-w-3xl mx-auto space-y-16">
                                <h3 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-tight italic-shadow">Asistencia Técnica Ministerial</h3>
                                <p className="text-2xl font-bold opacity-90 leading-relaxed italic border-l-4 border-white/30 pl-12 text-justify">
                                    Nuestra mesa de ayuda institucional está facultada para la resolución de incidencias operativas bajo protocolos de alta prioridad y seguridad de datos.
                                </p>
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-3xl h-24 px-20 font-black text-lg uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                    CONTACTAR INGENIERÍA CENTRAL
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Pie de Página Institucional */}
                <div className="mt-60 text-center space-y-12 opacity-30 no-print pb-20">
                    <div className="flex justify-center gap-20 text-[11px] font-black uppercase tracking-[1em]">
                        <span className="flex items-center gap-5"><Lock className="h-5 w-5" /> CIFRADO AES-512</span>
                        <span className="flex items-center gap-5"><Database className="h-5 w-5" /> LEDGER VERIFIED</span>
                        <span className="flex items-center gap-5"><Activity className="h-5 w-5" /> STATUS: OPERATIONAL</span>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <p className="max-w-5xl mx-auto text-[10px] font-bold uppercase tracking-[0.5em] leading-relaxed italic">
                        © {new Date().getFullYear()} System Kyron, C.A. • RIF J-12345678-9 • Caracas, Venezuela. <br/>
                        Todos los derechos reservados. Este documento constituye propiedad intelectual bajo registro SAPI.
                    </p>
                </div>
            </main>
        </div>
    );
}
