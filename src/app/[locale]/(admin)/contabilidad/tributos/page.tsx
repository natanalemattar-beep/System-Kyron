
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Landmark, FileText, Banknote, Percent, 
    ShieldCheck, Calendar, Gavel, History,
    ArrowRight, Activity, Zap, Bot, CreditCard,
    Building2, Users, Printer, FolderArchive,
    Scale, Globe, Truck, Leaf, Palmtree, Cpu,
    BookOpen, ShieldAlert, ChevronDown
} from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const tributoCategories = [
    {
        id: "parafiscales",
        title: "Aportes Parafiscales",
        desc: "Seguridad Social y Contribuciones Laborales.",
        icon: Users,
        color: "text-blue-600",
        items: [
            { label: "IVSS (Seguro Social)", href: "/contabilidad/tributos/aportes-parafiscales" },
            { label: "FAOV (Vivienda)", href: "/contabilidad/tributos/aportes-parafiscales" },
            { label: "INCES (Capacitación)", href: "/contabilidad/tributos/aportes-parafiscales" },
            { label: "Paro Forzoso", href: "/contabilidad/tributos/aportes-parafiscales" },
            { label: "LOPCYMAT", href: "/contabilidad/tributos/aportes-parafiscales" },
        ]
    },
    {
        id: "nacionales",
        title: "Impuestos Nacionales",
        desc: "Gestión directa ante el SENIAT.",
        icon: Landmark,
        color: "text-emerald-600",
        items: [
            { label: "IVA", href: "/declaracion-iva" },
            { label: "ISLR", href: "/islr-arc" },
            { label: "IGTF (3% Divisas)", href: "/contabilidad/tributos/igtf" },
            { label: "DPP (Ley de Pensiones 9%)", href: "/contabilidad/tributos/proteccion-pensiones" },
            { label: "IGP (Grandes Patrimonios)", href: "#" },
            { label: "Impuesto a Juegos", href: "#" },
        ]
    },
    {
        id: "retenciones",
        title: "Sistema de Retenciones",
        desc: "Control de agentes y conceptos.",
        icon: Percent,
        color: "text-amber-600",
        items: [
            { label: "Retenciones de IVA", href: "/contabilidad/tributos/retenciones-iva" },
            { label: "Retenciones de ISLR", href: "/contabilidad/tributos/retenciones-islr" },
        ]
    },
    {
        id: "registros",
        title: "Registros y Homologaciones",
        desc: "Trámites institucionales y ministeriales.",
        icon: ShieldCheck,
        color: "text-indigo-600",
        items: [
            { label: "Homologación SENIAT", href: "/contabilidad/tributos/homologacion" },
            { label: "Registro SAREN", href: "/poderes-representacion" },
            { label: "Propiedad Intelectual SAPI", href: "/permisos" },
            { label: "Min. Industrias y Comercio", href: "#" },
            { label: "Min. Comercio Exterior", href: "#" },
            { label: "Min. Transporte", href: "#" },
            { label: "Min. Ecosocialismo", href: "#" },
            { label: "Min. Turismo", href: "#" },
        ]
    }
];

export default function TributosHubPage() {
  const handleAlert = () => alert("Módulo en construcción para el prototipo v2.6.5");

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
      <header className="border-l-4 border-[#0A2472] pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] shadow-sm mb-4">
            <Landmark className="h-3 w-3" /> NODO TRIBUTARIO MAESTRO
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Gestión <span className="text-[#00A86B] italic">de Tributos</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Oficina Virtual de Impuestos • Sincronización Global 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Lado Izquierdo: Menús Desplegables */}
        <div className="lg:col-span-8 space-y-6">
            <Card className="glass-card border-none rounded-[2rem] bg-white p-2 shadow-xl">
                <Accordion type="single" collapsible className="w-full">
                    {tributoCategories.map((cat) => (
                        <AccordionItem value={cat.id} key={cat.id} className="border-b border-slate-100 last:border-none px-6 py-2">
                            <AccordionTrigger className="hover:no-underline group">
                                <div className="flex items-center gap-6">
                                    <div className={cn("p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform", cat.color)}>
                                        <cat.icon className="h-6 w-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">{cat.title}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{cat.desc}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-16">
                                    {cat.items.map((item) => (
                                        <Button 
                                            key={item.label}
                                            asChild={item.href !== "#"}
                                            variant="ghost" 
                                            className="justify-start h-10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-[#0A2472] hover:bg-[#0A2472]/5 gap-3"
                                            onClick={item.href === "#" ? handleAlert : undefined}
                                        >
                                            {item.href !== "#" ? (
                                                <Link href={item.href as any}>
                                                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                                                    {item.label}
                                                </div>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
                <Link href="/contabilidad/tributos/municipales">
                    <Card className="glass-card border-none p-8 rounded-[2rem] bg-white hover:bg-slate-50 transition-all group shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div className="p-3 bg-[#00A86B]/10 rounded-2xl border border-[#00A86B]/20">
                                <Building2 className="h-6 w-6 text-[#00A86B]" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-200 group-hover:text-[#00A86B] group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-800">Impuestos Municipales</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Alícuotas, Mínimo Tributario y Licencias</p>
                    </Card>
                </Link>
                <Link href="/contabilidad/tributos/calendario-fiscal">
                    <Card className="glass-card border-none p-8 rounded-[2rem] bg-white hover:bg-slate-50 transition-all group shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-800">Calendario Fiscal 2026</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Cronograma dinámico por terminal RIF</p>
                    </Card>
                </Link>
            </div>
        </div>

        {/* Lado Derecho: Acciones de Riesgo y Archivo */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="bg-[#0A2472] text-white rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl group border-none">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Gavel className="h-32 w-32" /></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Multas y Sanciones</h3>
                    <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Cuantifique contingencias legales según el Código Orgánico Tributario.</p>
                </div>
                <Button asChild variant="secondary" className="w-full h-12 bg-white text-[#0A2472] hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl relative z-10">
                    <Link href="/contabilidad/tributos/multas">CALCULAR RIESGO</Link>
                </Button>
            </Card>

            <Card className="glass-card border-none p-10 rounded-[2.5rem] bg-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000"><FolderArchive className="h-32 w-32" /></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Archivo Maestro</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Dossier Histórico de Declaraciones</p>
                    <Button asChild variant="outline" className="w-full h-12 border-slate-200 text-slate-400 font-black uppercase text-[9px] tracking-widest rounded-xl hover:bg-[#0A2472] hover:text-white transition-all">
                        <Link href="/contabilidad/tributos/declaraciones-anteriores">ACCEDER AL REPOSITORIO</Link>
                    </Button>
                </div>
            </Card>

            <Card className="glass-card border-none bg-[#00A86B]/5 p-8 rounded-[2rem] border-l-4 border-[#00A86B] shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                    <Bot className="h-6 w-6 text-[#00A86B] animate-pulse" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#00A86B]">Supervisor Fiscal Activo</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed text-justify">
                    El sistema audita automáticamente el 100% de las retenciones practicadas este mes contra las facturas del TPV.
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
