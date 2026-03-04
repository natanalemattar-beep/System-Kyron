
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
    Search
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
    {
        id: "introduccion",
        title: "1. Introducción al Ecosistema",
        icon: Globe,
        content: "System Kyron es una plataforma de gestión integral de grado corporativo diseñada para unificar las operaciones tecnológicas, financieras y legales en un único nodo de inteligencia. El sistema opera bajo protocolos de alta seguridad y está optimizado para el mercado venezolano, integrando telecomunicaciones 5G y tecnología blockchain."
    },
    {
        id: "acceso",
        title: "2. Protocolos de Acceso",
        icon: Lock,
        content: "Para ingresar al sistema, el usuario debe seleccionar su portal correspondiente en el botón 'ACCESO' de la barra superior. Existen tres categorías principales: Portal Ciudadano (Personas Naturales), Portales Corporativos (Contabilidad, RR.HH., Legal, Ventas) y Portales de Ingeniería (Telecom, IT). Cada acceso requiere credenciales validadas y, en módulos críticos, verificación de dos factores (2FA)."
    },
    {
        id: "telecom",
        title: "3. Gestión de Telecomunicaciones",
        icon: Smartphone,
        content: "Este módulo permite la administración de la infraestructura de conectividad de la empresa. Las funciones incluyen: Asignación inmediata de números telefónicos, activación de eSIMs digitales para flotas corporativas, monitoreo de consumo de datos 5G y gestión de planes de telefonía inteligente vinculados a la ID digital del titular."
    },
    {
        id: "ventas",
        title: "4. Punto de Venta y Facturación",
        icon: ShoppingCart,
        content: "El TPV (Punto de Venta) está diseñado para una facturación rápida y conforme a la ley. Al ingresar el RIF o Cédula, el sistema carga automáticamente los datos fiscales. Incluye gestión de inventario en tiempo real, procesamiento de pagos multimoneda (VES/USD), emisión de facturas fiscales homologadas por el SENIAT y cierre/arqueo de caja con detección de discrepancias."
    },
    {
        id: "contabilidad",
        title: "5. Finanzas y Blindaje Fiscal",
        icon: Activity,
        content: "Módulo central para la salud financiera. Automatiza la generación de Libros de Compra y Venta, declaraciones de IVA e ISLR, y contribuciones parafiscales. La IA integrada audita cada transacción contra la Gaceta Oficial vigente para garantizar 0% de riesgo de multas. Permite además el análisis de rentabilidad, proyecciones de flujo de caja y gestión de holding de empresas."
    },
    {
        id: "rrhh",
        title: "6. Gestión de Talento Humano",
        icon: Users,
        content: "Administra el ciclo de vida del empleado: desde la publicación de vacantes y reclutamiento con IA, hasta el cálculo automatizado de nóminas quincenales, utilidades, bonos vacacionales y prestaciones sociales. Incluye la generación de contratos laborales ajustados a la LOTTT y la emisión de recibos de pago digitales con respaldo en la nube."
    },
    {
        id: "legal",
        title: "7. Escritorio Jurídico Corporativo",
        icon: Gavel,
        content: "Nodo de control legal para la redacción y archivo de contratos, gestión de poderes de representación ante registros y notarías, y monitoreo de cumplimiento normativo (Compliance). El sistema alerta sobre vencimientos de permisos y habilitaciones gubernamentales para evitar interrupciones operativas."
    },
    {
        id: "sostenibilidad",
        title: "8. Reciclaje Magnético Pro",
        icon: Recycle,
        content: "Iniciativa de la Fundación Kyron que permite a ciudadanos y empresas monetizar sus hábitos responsables. Mediante papeleras inteligentes con tecnología de sujeción magnética, el sistema clasifica y registra residuos, inyectando 'Eco-Créditos' en la billetera digital del usuario, canjeables en la red de comercios aliados."
    }
];

export default function ManualUsuarioPage() {
    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                        <BookOpen className="h-3 w-3" /> DOC-MASTER v2.6
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Manual de <span className="text-primary">Usuario</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Protocolos de Operación y Gestión Maestra</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        DESCARGAR MANUAL PDF
                    </Button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-card p-8 rounded-[2.5rem] sticky top-24 border-white/5 bg-black/40">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary">Índice de Navegación</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2">
                            {sections.map((section) => (
                                <Button 
                                    key={section.id}
                                    variant="ghost" 
                                    className="w-full justify-start h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all text-white/40"
                                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <section.icon className="mr-3 h-4 w-4 opacity-40" />
                                    {section.title.split('. ')[1]}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-8 space-y-10">
                    <div className="relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                        <Input 
                            placeholder="BUSCAR PROTOCOLO O FUNCIONALIDAD..." 
                            className="h-16 pl-12 rounded-2xl bg-white/[0.03] border-white/10 text-white font-bold uppercase text-xs tracking-widest focus-visible:ring-primary"
                        />
                    </div>

                    <div className="space-y-8">
                        {sections.map((section) => (
                            <motion.section 
                                key={section.id} 
                                id={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="scroll-mt-32"
                            >
                                <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden group hover:border-primary/20 transition-all bg-black/40">
                                    <CardHeader className="p-10 border-b border-white/5 flex flex-row items-center gap-6 bg-white/[0.01]">
                                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform shadow-glow">
                                            <section.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">{section.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-10">
                                        <p className="text-sm font-medium text-white/60 leading-relaxed text-justify italic">
                                            {section.content}
                                        </p>
                                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                                            <Button variant="link" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary p-0">
                                                VER DETALLE TÉCNICO <ArrowRight className="ml-2 h-3 w-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.section>
                        ))}
                    </div>

                    <Card className="bg-primary text-primary-foreground rounded-[3rem] p-12 text-center shadow-glow border-none relative overflow-hidden group">
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
