
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    TabletSmartphone
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const manualModules = [
    {
        id: "telecom",
        title: "1. Gestión de Telecomunicaciones 5G",
        icon: Radio,
        description: "Protocolos de conectividad, activación de líneas y flotas móviles.",
        content: [
            "Activación de Líneas Kyron: Proceso inmediato de asignación de numeración mediante el ingreso de datos del titular y validación de RIF.",
            "Tecnología eSIM: Generación de perfiles digitales mediante código QR para dispositivos compatibles, eliminando la necesidad de hardware físico.",
            "Gestión de Planes: Administración de bolsas de datos de ultra-alta velocidad y servicios de roaming internacional para ejecutivos.",
            "Aprovisionamiento de Hardware: Catálogo de smartphones y equipos de red homologados para operar en la frecuencia Kyron."
        ]
    },
    {
        id: "tpv",
        title: "2. Terminal de Ventas (TPV) Inteligente",
        icon: TabletSmartphone,
        description: "Operación de facturación rápida y control de ingresos en tiempo real.",
        content: [
            "Carga Fiscal Instantánea: El sistema sincroniza con la base de datos central al ingresar el RIF del cliente, pre-llenando todos los campos legales.",
            "Procesamiento Multimoneda: Capacidad de cobrar en VES, USD y EUR aplicando la tasa oficial del día de forma automática.",
            "Cierre y Arqueo de Caja: Desglose físico de billetes por denominación y conciliación inmediata con vouchers de tarjetas y transferencias.",
            "Prevención de Fraude: Protocolos de verificación obligatoria para pagos móviles y transferencias externas."
        ]
    },
    {
        id: "contabilidad",
        title: "3. Blindaje Fiscal y Contabilidad SENIAT",
        icon: Calculator,
        description: "Automatización 100% de obligaciones tributarias con riesgo cero.",
        content: [
            "Libros de Compra y Venta: Generación diaria de registros electrónicos conforme a la Providencia Administrativa 0071.",
            "Declaración de IVA: Cálculo automatizado del débito y crédito fiscal con exportación de archivos .txt para el portal fiscal.",
            "Retenciones de ISLR: Emisión de comprobantes AR-C y gestión de la declaración estimada del ejercicio.",
            "Auditoría IA: Motor de revisión predictiva que alerta sobre inconsistencias antes del cierre del periodo fiscal."
        ]
    },
    {
        id: "credito",
        title: "4. Facturación a Crédito y Plataformas BNPL",
        icon: CreditCard,
        description: "Gestión de ventas con financiamiento y plataformas aliadas.",
        content: [
            "Integración Cashea: Procesamiento de compras bajo el modelo 'Compra Ahora, Paga Después' con validación de niveles de usuario.",
            "Crédito Directo: Configuración de planes de pago internos para clientes corporativos con seguimiento de cuotas.",
            "Gestión de Cobranza: Alertas automáticas por correo y WhatsApp para facturas próximas a vencer o en mora.",
            "Bloqueo de Clientes: Inhabilitación automática de facturación para perfiles con historial de impago crítico."
        ]
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento y Nómina (LOTTT)",
        icon: Users,
        description: "Administración integral del capital humano y obligaciones laborales.",
        content: [
            "Cálculo de Nómina: Procesamiento quincenal de salarios, bonificaciones, horas extras y cestaticket socialista.",
            "Prestaciones Sociales: Calculadora de liquidaciones y finiquitos ajustada a la antigüedad y último salario según ley.",
            "Control de Asistencia: Libros de horas diurnas, nocturnas y registro de personal retirado.",
            "Reclutamiento IA: Publicación de vacantes y filtrado de candidatos mediante análisis de perfiles psicológicos y técnicos."
        ]
    },
    {
        id: "legal",
        title: "6. Escritorio Jurídico y Corporativo",
        icon: Gavel,
        description: "Gestión de contratos, poderes y cumplimiento normativo.",
        content: [
            "Repositorio de Contratos: Redacción y archivo digital de acuerdos de servicio, licencias de software y memorándums.",
            "Poderes de Representación: Registro de apoderados judiciales y socios del holding con alertas de vencimiento.",
            "Gestión SAREN/SAPI: Seguimiento de trámites de registro de marcas, patentes y actas de asamblea.",
            "Compliance: Monitoreo de vigencia de permisos de alcaldía, bomberos y entes regulatorios."
        ]
    },
    {
        id: "ciudadano",
        title: "7. Portal Ciudadano e Identidad Digital",
        icon: Fingerprint,
        description: "Bóveda personal de documentos y trámites civiles.",
        content: [
            "ID Digital 3D: Tarjeta interactiva vinculada a la identidad del usuario para acceso seguro a servicios del ecosistema.",
            "Bóveda de Documentos: Almacenamiento cifrado de cédulas, RIF, títulos y partidas de nacimiento.",
            "Solicitudes Civiles: Gestión de copias certificadas de actas de nacimiento, matrimonio y antecedentes penales.",
            "Directorio de Salud: Acceso a red de médicos y clínicas afiliadas con agendamiento de citas."
        ]
    },
    {
        id: "sostenibilidad",
        title: "8. Reciclaje Magnético (Fundación Kyron)",
        icon: Recycle,
        description: "Monetización de hábitos responsables y activos verdes.",
        content: [
            "Operación de Smart Bins: Uso de papeleras inteligentes con tecnología de sujeción magnética para clasificación de residuos.",
            "Billetera de Eco-Créditos: Acumulación de puntos digitales por cada material reciclado validado por sensores IA.",
            "Canje de Recompensas: Uso de activos acumulados para obtener descuentos en comercios aliados y servicios de la plataforma.",
            "Trazabilidad Blockchain: Registro inmutable del impacto ambiental generado por cada nodo ciudadano."
        ]
    },
    {
        id: "ingenieria",
        title: "9. Ingeniería y Planificación IA",
        icon: Cpu,
        description: "Herramientas técnicas para diseño y presupuestos de obra.",
        content: [
            "Generación de Planos: Uso de visión artificial para convertir fotografías de espacios en planos a escala profesional.",
            "Presupuestos CapEx: Cálculo automático de materiales, rendimientos y mano de obra para proyectos de construcción.",
            "Análisis de Factibilidad: Indicadores económicos (VAN/TIR) integrados para evaluación de proyectos de infraestructura.",
            "Auditoría Técnica: Verificación de cumplimiento de normas de ingeniería y seguridad industrial."
        ]
    },
    {
        id: "bi",
        title: "10. Inteligencia de Negocio (Marketing BI)",
        icon: BrainCircuit,
        description: "Análisis estratégico y crecimiento basado en datos.",
        content: [
            "Análisis de Rentabilidad: Desglose de márgenes por producto, cliente y sucursal.",
            "Estrategias de Venta IA: Generación de planes de marketing basados en el comportamiento histórico del inventario.",
            "Estudios Demográficos: Análisis de población y mercado en zonas ZEDU para expansión comercial.",
            "Fidelización Predictiva: Identificación de clientes VIP y automatización de campañas de retención."
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();

    const handleDownload = (format: 'pdf' | 'word') => {
        toast({
            title: `EXPORTACIÓN ${format.toUpperCase()} INICIADA`,
            description: "Generando documento maestro de alta fidelidad...",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Manual Kyron</title><style>body{font-family:Arial;line-height:1.6}h1{color:#2563eb}h2{color:#1e40af;border-bottom:1px solid #eee;margin-top:20px}li{margin-bottom:10px}</style></head><body>";
            const footer = "</body></html>";
            let body = "<h1>MANUAL MAESTRO DE USUARIO - SYSTEM KYRON v2.6.5</h1>";
            body += "<p>Este documento constituye la guía oficial de operación del Ecosistema Kyron.</p>";
            
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p><strong>Descripción:</strong> ${mod.description}</p><ul>`;
                mod.content.forEach(c => body += `<li>${c}</li>`);
                body += `</ul>`;
            });

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + body + footer);
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = 'Manual_Usuario_Kyron_v2.6.5.doc';
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-24 animate-in fade-in duration-1000">
            {/* Header Maestro */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10 print:hidden">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                        <BookOpen className="h-3 w-3" /> DOC-MASTER v2.6.5
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Manual de <span className="text-primary">Usuario</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Protocolos de Operación y Gestión Maestra del Ecosistema</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => handleDownload('word')}>
                        <FileText className="mr-2 h-4 w-4" /> EXPORTAR WORD
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl" onClick={() => handleDownload('pdf')}>
                        <Download className="mr-2 h-4 w-4" /> DESCARGAR PDF
                    </Button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Navegación Lateral */}
                <div className="lg:col-span-4 space-y-6 print:hidden">
                    <Card className="glass-card p-8 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/40">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary">Mapa del Ecosistema</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2">
                            {manualModules.map((mod) => (
                                <Button 
                                    key={mod.id}
                                    variant="ghost" 
                                    className="w-full justify-start h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/40 group"
                                    onClick={() => document.getElementById(mod.id)?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <mod.icon className="mr-3 h-4 w-4 opacity-40 group-hover:opacity-100" />
                                    {mod.title.split('. ')[1]}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Contenido del Manual */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="relative mb-12 print:hidden">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                        <Input 
                            placeholder="BUSCAR PROTOCOLO TÉCNICO..." 
                            className="h-16 pl-12 rounded-2xl bg-white/[0.03] border-white/10 text-white font-bold uppercase text-xs tracking-widest focus-visible:ring-primary"
                        />
                    </div>

                    <div className="space-y-8" id="manual-content">
                        {manualModules.map((mod) => (
                            <motion.section 
                                key={mod.id} 
                                id={mod.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="scroll-mt-32"
                            >
                                <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden group hover:border-primary/20 transition-all bg-black/40 print:bg-white print:text-black print:border-none">
                                    <CardHeader className="p-10 border-b border-white/5 flex flex-row items-center gap-6 bg-white/[0.01] print:bg-white">
                                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform shadow-glow print:hidden">
                                            <mod.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white print:text-black">{mod.title}</CardTitle>
                                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1 print:text-gray-500">{mod.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10">
                                        <ul className="space-y-6">
                                            {mod.content.map((item, i) => {
                                                const [label, text] = item.split(': ');
                                                return (
                                                    <li key={i} className="flex items-start gap-4">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-glow print:bg-black" />
                                                        <p className="text-sm font-medium text-white/60 leading-relaxed text-justify print:text-black">
                                                            <strong className="text-white uppercase tracking-tighter print:text-black">{label}:</strong> {text}
                                                        </p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.section>
                        ))}
                    </div>

                    {/* Footer de Soporte */}
                    <Card className="bg-primary text-primary-foreground rounded-[3rem] p-12 text-center shadow-glow border-none relative overflow-hidden group print:hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                            <Zap className="h-40 w-40" />
                        </div>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 relative z-10">¿Dudas Técnicas?</h3>
                        <p className="text-sm font-bold opacity-80 mb-8 max-w-lg mx-auto relative z-10">Nuestro equipo de soporte maestro y oficiales de cumplimiento están disponibles para auditorías de nodo en tiempo real.</p>
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-16 px-12 font-black text-xs uppercase tracking-widest shadow-2xl relative z-10 transition-all">
                            CONTACTAR AL NODO CENTRAL
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
