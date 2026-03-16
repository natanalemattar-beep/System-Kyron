
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
    Terminal, Coins, Microscope, Ship
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
        id: "nacionales",
        title: "Impuestos Nacionales (SENIAT)",
        desc: "IVA, ISLR, IGTF, Pensiones y Grandes Patrimonios.",
        icon: Landmark,
        color: "text-secondary",
        items: [
            { label: "IVA (Impuesto al Valor Agregado)", href: "/contabilidad/tributos/iva", icon: FileText },
            { label: "ISLR (Renta y Retenciones)", href: "/contabilidad/tributos/islr", icon: Banknote },
            { label: "IGTF (Transacciones Divisas 3%)", href: "/contabilidad/tributos/igtf", icon: CreditCard },
            { label: "DPP (Ley de Pensiones 9%)", href: "/contabilidad/tributos/proteccion-pensiones", icon: ShieldCheck },
            { label: "IGP (Grandes Patrimonios)", href: "/contabilidad/tributos/igp", icon: Coins },
            { label: "Impuesto a Juegos de Azar", href: "/contabilidad/tributos/juegos", icon: Zap },
        ]
    },
    {
        id: "aportes_especiales",
        title: "Aportes y Contribuciones Especiales",
        desc: "Entes descentralizados, FONACIT y Ciencia.",
        icon: Scale,
        color: "text-indigo-500",
        items: [
            { label: "Aporte 70% (Entes Descentralizados)", href: "/contabilidad/tributos/aporte-70", icon: Landmark },
            { label: "FONACIT / LOCTI (Ciencia e Innovación)", href: "/contabilidad/tributos/fonacit", icon: Microscope },
        ]
    },
    {
        id: "regimenes",
        title: "Regímenes Especiales Sectoriales",
        desc: "Hidrocarburos, Minería y Exportación.",
        icon: Globe,
        color: "text-amber-600",
        items: [
            { label: "Hidrocarburos y Minería (Sin Regalías)", href: "/contabilidad/tributos/hidrocarburos", icon: Zap },
            { label: "Exportadores Minerales (Con Regalías)", href: "/contabilidad/tributos/exportadores", icon: Ship },
            { label: "Declaración Trimestral IVA (Exentos)", href: "/contabilidad/tributos/iva-trimestral", icon: FileText },
        ]
    },
    {
        id: "parafiscales",
        title: "Seguridad Social y Parafiscales",
        desc: "IVSS, FAOV, INCES y LOPCYMAT.",
        icon: Users,
        color: "text-primary",
        items: [
            { label: "IVSS (Seguro Social)", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
            { label: "FAOV (Vivienda)", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
            { label: "INCES (Capacitación)", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
            { label: "Paro Forzoso / LOPCYMAT", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
        ]
    },
    {
        id: "registros",
        title: "Registros y Homologaciones",
        desc: "Trámites institucionales y ministeriales.",
        icon: ShieldCheck,
        color: "text-indigo-600",
        items: [
            { label: "Homologación SENIAT (Equipos)", href: "/contabilidad/tributos/homologacion", icon: Printer },
            { label: "Registro de Comercio (SAREN)", href: "/contabilidad/tributos/poderes-representacion", icon: Gavel },
            { label: "Propiedad Intelectual (SAPI)", href: "/contabilidad/tributos/permisos", icon: ShieldCheck },
            { label: "Ministerio de Industrias", href: "/contabilidad/tributos/ministerio-industrias", icon: Building2 },
            { label: "Ministerio de Comercio Exterior", href: "/contabilidad/tributos/ministerio-comercio-exterior", icon: Globe },
            { label: "Ministerio de Transporte", href: "/contabilidad/tributos/ministerio-transporte", icon: Truck },
            { label: "Ministerio de Ecosocialismo", href: "/contabilidad/tributos/ministerio-ecosocialismo", icon: Leaf },
            { label: "Ministerio de Turismo", href: "/contabilidad/tributos/ministerio-turismo", icon: Palmtree },
        ]
    }
];

export default function TributosHubPage() {
  const { toast } = useToast();
  const [isAutoPayActive, setIsAutoPayActive] = useState(false);

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
            <Card className="glass-card border-none rounded-[3rem] bg-white dark:bg-card/40 p-2 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Directorio de Entidades y Gestión 2026</h3>
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary">Acreditado SNAT/2025/000091</Badge>
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
                                            asChild
                                            variant="ghost" 
                                            className="justify-between h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-white/10 group/item transition-all"
                                        >
                                            <Link href={item.href as any}>
                                                <span className="flex items-center gap-3">
                                                    {item.icon && <item.icon className="h-3.5 w-3.5 opacity-30 group-hover/item:opacity-100 transition-opacity" />}
                                                    {item.label}
                                                </span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>

            <div className="grid md:grid-cols-2 gap-10">
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
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 leading-relaxed">Cronograma Preventivo dinámico adaptado a tu Terminal de RIF según Gaceta N° 43.273.</p>
                    </Card>
                </Link>
                <Link href="/contabilidad/tributos/multas">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-white dark:bg-card/40 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-all"><ShieldAlert className="h-24 w-24" /></div>
                        <div className="flex justify-between items-center mb-10">
                            <div className="p-4 bg-rose-600/10 rounded-2xl border border-rose-600/20">
                                <ShieldAlert className="h-8 w-8 text-rose-600" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-200 group-hover:text-rose-600 group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Multas y Sanciones</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 leading-relaxed">Calculadora de contingencias (100%-300%) e intereses moratorios según el COT.</p>
                    </Card>
                </Link>
            </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-slate-100 dark:bg-card/60 shadow-2xl p-10 overflow-hidden relative border-l-4 border-primary">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none"><Bell className="h-48 w-48" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/5 pb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl shadow-inner border border-primary/20">
                            <Settings2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Alertas Maestro</h3>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">Sincronización RIF</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { id: "iva", label: "IVA (Días 12 al 27)" },
                            { id: "islr", label: "ISLR / Estimadas" },
                            { id: "igtf", label: "IGTF (3% Divisas)" },
                            { id: "dpp", label: "Pensiones (9%)" },
                            { id: "igp", label: "Patrimonio (Oct/Nov)" }
                        ].map((tax) => (
                            <div key={tax.id} className="flex items-center justify-between group">
                                <Label htmlFor={`alert-${tax.id}`} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 group-hover:text-primary transition-colors cursor-pointer">{tax.label}</Label>
                                <Checkbox id={`alert-${tax.id}`} defaultChecked className="rounded-md h-5 w-5 border-slate-300 dark:border-white/10 data-[state=checked]:bg-primary" />
                            </div>
                        ))}
                    </div>

                    <Button onClick={() => toast({ title: "ALERTAS CONFIGURADAS", description: "Recibirá avisos a los 15, 7 y 3 días antes del vencimiento." })} className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">GUARDAR PREFERENCIAS</Button>
                </div>
            </Card>

            <Card className="bg-[#050505] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all"><Bot className="h-40 w-40 text-primary" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                        <Badge className="bg-primary text-white border-none text-[8px] font-black px-4 uppercase mb-4 shadow-glow">AUTOPAY ACTIVE</Badge>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">Pago Autónomo</h3>
                        <p className="text-xs font-bold text-white/40 leading-relaxed uppercase">Autorice liquidaciones automáticas desde su Caja Digital configurada.</p>
                    </div>
                    <Button variant="secondary" className="w-full h-14 bg-white text-primary hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl">CONFIGURAR NODO</Button>
                </div>
            </Card>

            <Link href="/contabilidad/tributos/declaraciones-anteriores">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-white dark:bg-card/40 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                            <FolderArchive className="h-6 w-6 text-indigo-500" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Archivo Maestro</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Dossier Histórico Inmutable</p>
                </Card>
            </Link>
        </div>
      </div>
    </div>
  );
}
