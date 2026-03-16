
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Landmark, FileText, Banknote, Percent, 
    ShieldCheck, Calendar, Gavel, History,
    ArrowRight, Activity, Zap, Bot, CreditCard,
    Building2, Users, Printer, FolderArchive,
    Scale, Globe, Truck, Leaf, Palmtree, Cpu,
    BookOpen, ShieldAlert, ChevronDown, Bell,
    Settings2, Smartphone, CheckCircle2, Copy,
    Terminal
} from "lucide-react";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const tributoCategories = [
    {
        id: "parafiscales",
        title: "Aportes Parafiscales",
        desc: "Seguridad Social y Contribuciones Laborales.",
        icon: Users,
        color: "text-primary",
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
        color: "text-secondary",
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
  const { toast } = useToast();
  const [isAutoPayActive, setIsAutoPayActive] = useState(false);

  const handleSaveConfig = () => {
    toast({
        title: "CONFIGURACIÓN GUARDADA",
        description: "Protocolos de alerta y pago actualizados en el sistema maestro.",
        action: <CheckCircle2 className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/5 border border-primary/10 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-sm mb-4">
            <Landmark className="h-3 w-3" /> NODO TRIBUTARIO MAESTRO
        </div>
        <h1 className="text-3xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white uppercase leading-none">
            Gestión <span className="text-secondary italic">de Tributos</span>
        </h1>
        <p className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] mt-4 italic opacity-60">Oficina Virtual de Impuestos • Sincronización Global 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
            {/* Gestión por Entes */}
            <Card className="glass-card border-none rounded-[3rem] bg-white dark:bg-card/40 p-2 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Directorio de Entidades y Gestión</h3>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {tributoCategories.map((cat) => (
                        <AccordionItem value={cat.id} key={cat.id} className="border-b border-slate-100 dark:border-white/5 last:border-none px-8 py-2">
                            <AccordionTrigger className="hover:no-underline group">
                                <div className="flex items-center gap-6">
                                    <div className={cn("p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform shadow-inner", cat.color)}>
                                        <cat.icon className="h-6 w-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-base font-black uppercase tracking-widest text-slate-800 dark:text-white/90">{cat.title}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{cat.desc}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 pb-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-20">
                                    {cat.items.map((item) => (
                                        <Button 
                                            key={item.label}
                                            asChild={item.href !== "#"}
                                            variant="ghost" 
                                            className="justify-between h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-white/10 group/item transition-all"
                                            onClick={item.href === "#" ? () => alert("Área en construcción") : undefined}
                                        >
                                            {item.href !== "#" ? (
                                                <Link href={item.href as any}>
                                                    <span className="flex items-center gap-3">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/20 group-hover/item:bg-primary transition-colors" />
                                                        {item.label}
                                                    </span>
                                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                                </Link>
                                            ) : (
                                                <div className="flex items-center justify-between w-full">
                                                    <span className="flex items-center gap-3">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                                        {item.label}
                                                    </span>
                                                    <Badge variant="outline" className="text-[7px] font-black opacity-40">DEV</Badge>
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

            <div className="grid md:grid-cols-2 gap-10">
                <Link href="/contabilidad/tributos/municipales">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-white dark:bg-card/40 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-all"><Building2 className="h-24 w-24" /></div>
                        <div className="flex justify-between items-center mb-10">
                            <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                                <Building2 className="h-8 w-8 text-secondary" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-200 group-hover:text-secondary group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Impuestos Municipales</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 leading-relaxed">Gestión de Alícuotas por Rubro, Mínimo Tributario (240 UT) y Patentes Locales.</p>
                    </Card>
                </Link>
                <Link href="/contabilidad/tributos/calendario-fiscal">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-white dark:bg-card/40 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-all"><Calendar className="h-24 w-24" /></div>
                        <div className="flex justify-between items-center mb-10">
                            <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                                <Calendar className="h-8 w-8 text-blue-600" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Calendario Fiscal 2026</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 leading-relaxed">Cronograma Preventivo dinámico adaptado a tu Terminal de RIF.</p>
                    </Card>
                </Link>
            </div>
        </div>

        {/* Lado Derecho: Configuración y Alertas */}
        <div className="lg:col-span-4 space-y-10">
            {/* Panel de Alertas */}
            <Card className="glass-card border-none rounded-[3rem] bg-slate-100 dark:bg-card/60 shadow-2xl p-10 overflow-hidden relative border-l-4 border-primary">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none"><Bell className="h-48 w-48" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/5 pb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl shadow-inner border border-primary/20">
                            <Settings2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Alertas y Avisos</h3>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">Configuración de Canales</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { id: "iva", label: "IVA (Terminal RIF)" },
                            { id: "islr", label: "ISLR / Anticipos" },
                            { id: "igtf", label: "IGTF / Retenciones" },
                            { id: "dpp", label: "DPP (Pensiones)" },
                            { id: "ivss", label: "Seguridad Social" }
                        ].map((tax) => (
                            <div key={tax.id} className="flex items-center justify-between group">
                                <Label htmlFor={`alert-${tax.id}`} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 group-hover:text-primary transition-colors cursor-pointer">{tax.label}</Label>
                                <Checkbox id={`alert-${tax.id}`} defaultChecked className="rounded-md h-5 w-5 border-slate-300 dark:border-white/10 data-[state=checked]:bg-primary" />
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4">
                        <p className="text-[8px] font-black uppercase text-slate-400 text-center tracking-[0.2em]">Canales de Transmisión</p>
                        <div className="flex justify-around">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm"><Smartphone className="h-4 w-4 text-secondary" /></div>
                                <span className="text-[7px] font-black uppercase dark:text-white/40">WhatsApp</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm"><FileText className="h-4 w-4 text-primary" /></div>
                                <span className="text-[7px] font-black uppercase dark:text-white/40">Email</span>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleSaveConfig} className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">GUARDAR PREFERENCIAS</Button>
                </div>
            </Card>

            {/* Pago Automático */}
            <Card className="bg-primary text-primary-foreground rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Bot className="h-40 w-48" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                        <Badge className="bg-white/20 text-white border-none text-[8px] font-black px-4 uppercase mb-4">Módulo Maestro IA</Badge>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">Pago Automático</h3>
                        <p className="text-xs font-bold opacity-60 leading-relaxed uppercase">Autorice liquidaciones directas desde su cuenta bancaria configurada.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer" onClick={() => setIsAutoPayActive(!isAutoPayActive)}>
                            <Checkbox checked={isAutoPayActive} className="h-5 w-5 border-white/40 data-[state=checked]:bg-secondary data-[state=checked]:text-black" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Activar Débito Directo</span>
                        </div>
                    </div>

                    <Button variant="secondary" className="w-full h-14 bg-white text-primary hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl">CONFIGURAR NODO</Button>
                </div>
            </Card>

            <Card className="glass-card border-none bg-secondary/5 dark:bg-secondary/10 p-8 rounded-[2rem] border-l-4 border-secondary shadow-inner">
                <div className="flex items-center gap-4 mb-4">
                    <Bot className="h-6 w-6 text-secondary animate-pulse" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Estado del Nodo</h4>
                </div>
                <p className="text-[9px] font-bold text-slate-500 dark:text-white/40 uppercase leading-relaxed text-justify italic">
                    "El Supervisor Fiscal monitorea su terminal de RIF. Próximo vencimiento: IVA (Terminal 4) en 5 días."
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}

function CardComponent({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}>{children}</div>;
}
