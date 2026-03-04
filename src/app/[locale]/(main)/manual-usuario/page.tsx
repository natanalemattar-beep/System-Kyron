
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

const manualModules = [
    {
        id: "auth",
        title: "1. Protocolos de Acceso y Seguridad",
        icon: Lock,
        description: "Gestión de credenciales y perímetros de seguridad.",
        content: [
            "Selección de Portal: El sistema se divide en nodos específicos (Ciudadano, Empresa, Ingeniería). Use el botón 'ACCESO' para elegir su terminal.",
            "Autenticación 2FA: Los módulos críticos requieren verificación mediante código OTP enviado a su dispositivo registrado.",
            "Recuperación: En caso de pérdida de acceso, el protocolo de recuperación requiere validación biométrica o aprobación del administrador del nodo."
        ]
    },
    {
        id: "telecom",
        title: "2. Gestión de Telecomunicaciones 5G",
        icon: Radio,
        description: "Administración de conectividad y flotas móviles.",
        content: [
            "Activación de Líneas: Asignación inmediata de numeración Kyron mediante el ingreso de datos del titular.",
            "Protocolo eSIM: Generación de códigos QR para la activación instantánea de planes de datos sin necesidad de chip físico.",
            "Tienda de Equipos: Adquisición de smartphones y tablets homologados para la red 5G de baja latencia."
        ]
    },
    {
        id: "ventas",
        title: "3. Punto de Venta (TPV) Inteligente",
        icon: TabletSmartphone,
        description: "Terminal de procesamiento de ventas y facturación rápida.",
        content: [
            "Carga Fiscal Automática: Al ingresar el RIF del cliente, el sistema sincroniza con la base de datos para pre-llenar la factura conforme a ley.",
            "Multimoneda: Procesamiento simultáneo de pagos en Bolívares (VES) y Divisas (USD), aplicando tasas de cambio oficiales en tiempo real.",
            "Cierre de Caja: El arqueo desglosa billetes por denominación y concilia automáticamente con los vouchers de tarjetas y transferencias."
        ]
    },
    {
        id: "contabilidad",
        title: "4. Blindaje Fiscal y Contabilidad",
        icon: Calculator,
        description: "Cumplimiento 100% ante el SENIAT y auditoría IA.",
        content: [
            "Libros Oficiales: Generación automatizada de Libros de Compra y Venta bajo la Providencia Administrativa 0071.",
            "Declaración de IVA: Cálculo del débito y crédito fiscal con exportación de archivos .txt listos para el portal del SENIAT.",
            "Audit IA: Nuestro motor de IA revisa cada asiento contable para garantizar 0% de riesgo de multas o sanciones."
        ]
    },
    {
        id: "rrhh",
        title: "5. Gestión de Talento y Nómina",
        icon: Users,
        description: "Administración integral del capital humano.",
        content: [
            "Cálculo de Nómina: Procesamiento quincenal que incluye sueldo base, cestaticket, bonificaciones y deducciones de ley (IVSS, FAOV).",
            "Liquidaciones: Calculadora de prestaciones sociales ajustada a la LOTTT para la generación de finiquitos precisos.",
            "Reclutamiento: Portal de vacantes con filtrado de CVs mediante análisis de perfiles por IA."
        ]
    },
    {
        id: "juridico",
        title: "6. Escritorio Jurídico y Contratos",
        icon: Gavel,
        description: "Gestión legal y representación corporativa.",
        content: [
            "Gestión de Contratos: Redacción automatizada de acuerdos de servicio, confidencialidad y licencias de software.",
            "Poderes y Socios: Registro de actas de asamblea y control de apoderados judiciales ante registros y notarías.",
            "Compliance: Monitoreo de vigencia de permisos gubernamentales (SAPI, CONATEL, Alcaldías) con alertas de renovación."
        ]
    },
    {
        id: "ciudadano",
        title: "7. Portal Ciudadano e ID Digital",
        icon: Fingerprint,
        description: "Bóveda personal de activos civiles y documentos.",
        content: [
            "ID Digital 3D: Tarjeta interactiva con código QR dinámico para compartir información de contacto y profesional.",
            "Documentos Civiles: Solicitud y archivo de partidas de nacimiento, actas de matrimonio y antecedentes penales.",
            "Salud: Directorio médico de especialistas y clínicas afiliadas al ecosistema Kyron."
        ]
    },
    {
        id: "sostenibilidad",
        title: "8. Reciclaje y Eco-Créditos",
        icon: Recycle,
        description: "Monetización de hábitos responsables mediante magnetismo.",
        content: [
            "Smart Bins: Uso de papeleras con tecnología de sujeción magnética para la clasificación de residuos metálicos y plásticos.",
            "Eco-Billetera: Acumulación de puntos por cada residuo procesado, reflejados en tiempo real como activos digitales.",
            "Canje: Uso de Eco-Créditos para obtener descuentos y beneficios en la red de comercios aliados."
        ]
    },
    {
        id: "ingenieria",
        title: "9. Ingeniería y Planificación IA",
        icon: Cpu,
        description: "Diseño técnico y presupuestos de alta precisión.",
        content: [
            "Planos IA: Generación de planos a escala a partir de fotografías de locales o terrenos utilizando visión artificial.",
            "Presupuestos CapEx: Cálculo automático de materiales y mano de obra para proyectos de construcción o remodelación.",
            "Auditoría Técnica: Evaluación de factibilidad económica con indicadores VAN/TIR integrados."
        ]
    },
    {
        id: "marketing",
        title: "10. Marketing y Estrategia BI",
        icon: BrainCircuit,
        description: "Business Intelligence para el crecimiento comercial.",
        content: [
            "Estrategias IA: Generador de planes de venta basados en el rendimiento real de productos del inventario.",
            "Análisis Demográfico: Estudio de población en zonas ZEDU para identificar nichos de mercado y potencial de expansión.",
            "Fidelización: Sistemas de correo automatizado para agradecimiento anual y promociones a clientes frecuentes."
        ]
    }
];

export default function ManualUsuarioPage() {
    const { toast } = useToast();

    const handleDownload = (format: 'pdf' | 'word') => {
        toast({
            title: `PROTOCOLO DE EXPORTACIÓN ${format.toUpperCase()}`,
            description: "Generando documento maestro de alta fidelidad...",
            action: <CheckCircle2 className="text-primary h-4 w-4" />
        });

        if (format === 'pdf') {
            window.print();
        } else {
            const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
            const footer = "</body></html>";
            let body = "<h1>MANUAL MAESTRO DE USUARIO - SYSTEM KYRON v2.6.5</h1>";
            
            manualModules.forEach(mod => {
                body += `<h2>${mod.title}</h2><p>${mod.description}</p><ul>`;
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
                <div className="lg:col-span-4 space-y-6 print:hidden">
                    <Card className="glass-card p-8 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/40">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary">Mapa de Módulos</CardTitle>
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

                <div className="lg:col-span-8 space-y-10">
                    <div className="relative mb-12 print:hidden">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                        <Input 
                            placeholder="BUSCAR FUNCIÓN TÉCNICA O MÓDULO..." 
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

                    <Card className="bg-primary text-primary-foreground rounded-[3rem] p-12 text-center shadow-glow border-none relative overflow-hidden group print:hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                            <Zap className="h-40 w-40" />
                        </div>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 relative z-10">¿Necesitas Soporte Maestro?</h3>
                        <p className="text-sm font-bold opacity-80 mb-8 max-w-lg mx-auto relative z-10">Nuestro equipo de oficiales de cumplimiento y soporte técnico 5G está disponible para auditorías de nodo en tiempo real.</p>
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl h-16 px-12 font-black text-xs uppercase tracking-widest shadow-2xl relative z-10 transition-all">
                            CONTACTAR AL NODO CENTRAL
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
