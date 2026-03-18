"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Flame, AlertTriangle, Zap, Globe, Handshake, Users, HardHat, Scale, Shield,
    Smartphone, Leaf, Mountain, Landmark, Building2, UserPlus, Briefcase,
    FileText, CheckCircle, ChevronDown, ChevronUp, Send, Loader as Loader2,
    TrendingUp, Truck, Droplets, Factory, Hotel, TreePine, Package, Phone,
    ShieldCheck, ArrowRight, Star, Radio, Wrench
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// --------------------------------------------------
// Data
// --------------------------------------------------
const LICENCIAS = [
    { code: "GL 46", desc: "Operaciones petroleras con entidades venezolanas — importación/exportación de crudo y derivados." },
    { code: "GL 48", desc: "Inversión extranjera en sector energético venezolano, servicios técnicos, equipos y tecnología." },
    { code: "GL 49", desc: "Fertilizantes y petroquímicos para agricultura — alianza agro-industrial Venezuela-USA." },
];

const MAJORS = [
    { nombre: "Chevron", pais: "EE.UU.", area: "Upstream / Refinación", color: "bg-blue-600" },
    { nombre: "Repsol", pais: "España", area: "Exploración / Gas", color: "bg-orange-600" },
    { nombre: "Eni", pais: "Italia", area: "Offshore / Petroquímica", color: "bg-yellow-600" },
    { nombre: "BP", pais: "Reino Unido", area: "Refinery Ops", color: "bg-green-600" },
    { nombre: "Shell", pais: "Países Bajos", area: "LNG / Trading", color: "bg-red-600" },
    { nombre: "TotalEnergies", pais: "Francia", area: "Deepwater / Solar", color: "bg-cyan-600" },
];

const SECTORES_INDUSTRIALES = [
    { ciiu: "0610", sector: "Petróleo Crudo", icon: Droplets, color: "text-amber-500", desc: "Extracción de petróleo crudo y exploración geológica." },
    { ciiu: "0620", sector: "Gas Natural", icon: Flame, color: "text-orange-500", desc: "Extracción, tratamiento y distribución de gas natural." },
    { ciiu: "2011", sector: "Petroquímica", icon: Factory, color: "text-blue-500", desc: "Fabricación de productos químicos básicos y fertilizantes." },
    { ciiu: "5510", sector: "Turismo / Hoteles", icon: Hotel, color: "text-purple-500", desc: "Hospedaje, gastronomía y servicios de turismo nacional e internacional." },
    { ciiu: "0710", sector: "Minería de Hierro", icon: Mountain, color: "text-gray-500", desc: "Extracción de mineral de hierro y metales ferrosos (Bolívar, Guayana)." },
    { ciiu: "0729", sector: "Minería no Ferrosa", icon: Star, color: "text-yellow-500", desc: "Oro, coltan, bauxita, diamantes — Arco Minero del Orinoco." },
    { ciiu: "4210", sector: "Obras Públicas", icon: HardHat, color: "text-lime-500", desc: "Carreteras, puentes, infraestructura hidráulica y vial." },
    { ciiu: "3811", sector: "Gestión de Residuos", icon: Leaf, color: "text-emerald-500", desc: "Papeleras inteligentes, limpieza industrial y ambiental." },
    { ciiu: "0111", sector: "Agroindustria", icon: TreePine, color: "text-green-600", desc: "Cultivos para fertilizantes, caña de azúcar, maíz, soja." },
    { ciiu: "5210", sector: "Logística / Almacenes", icon: Truck, color: "text-indigo-500", desc: "Almacenamiento, transporte y distribución de hidrocarburos." },
];

const SERVICIOS_KYRON = [
    {
        icon: Leaf,
        titulo: "Papeleras Inteligentes",
        subtitulo: "IoT + Sostenibilidad",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        puntos: [
            "Papeleras con sensor de llenado y app de control",
            "Rutas optimizadas de recolección en tiempo real",
            "Alianza con petroleras para áreas de trabajo",
            "Certificación ambiental ISO 14001",
            "Reportes de impacto ESG para inversores",
        ]
    },
    {
        icon: Users,
        titulo: "Capital Humano Industrial",
        subtitulo: "Limpieza & Mantenimiento",
        color: "text-blue-500",
        bg: "bg-blue-500/10 border-blue-500/20",
        puntos: [
            "Reclutamiento masivo para zonas petroleras",
            "Personal de limpieza certificado LOPCYMAT",
            "Brigadas de mantenimiento 24/7",
            "Control de asistencia por QR y biometría",
            "Nómina automatizada en bolívares y divisas",
        ]
    },
    {
        icon: HardHat,
        titulo: "Ingeniería & Obras",
        subtitulo: "Pública y Privada",
        color: "text-amber-500",
        bg: "bg-amber-500/10 border-amber-500/20",
        puntos: [
            "Ingenieros civiles, mecánicos y de petróleos",
            "Gestión de proyectos (PMI / ISO 21500)",
            "Presupuesto en USD + fiscalización en campo",
            "Obras con INAPYMI y contratistas nacionales",
            "Integración con SUNDECOP y entes reguladores",
        ]
    },
    {
        icon: Scale,
        titulo: "Asesoría Legal",
        subtitulo: "Jurídico Corporativo",
        color: "text-purple-500",
        bg: "bg-purple-500/10 border-purple-500/20",
        puntos: [
            "Abogados especializados en contratos petroleros",
            "Trámites ante MPPEE, SENIAT y MPPA",
            "Contratos GL 46/48/49 con cláusulas venezolanas",
            "Defensa ante arbitrajes internacionales (CIADI)",
            "Poderes especiales y apostillas expeditas",
        ]
    },
    {
        icon: Shield,
        titulo: "Seguros Especializados",
        subtitulo: "Cobertura Integral",
        color: "text-rose-500",
        bg: "bg-rose-500/10 border-rose-500/20",
        puntos: [
            "Seguro jurídico para contratos extranjeros",
            "Seguro contable ante auditorías SENIAT",
            "Seguro telefónico para equipos en campo",
            "Cobertura por deterioro de importaciones",
            "Alianza con Mercantil Seguros y Mapfre",
        ]
    },
    {
        icon: Smartphone,
        titulo: "Automatización Móvil",
        subtitulo: "Control desde el Teléfono",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10 border-cyan-500/20",
        puntos: [
            "App de control de campo para supervisores",
            "Reportes de producción desde Android/iOS",
            "WhatsApp Business para coordinación de brigadas",
            "Firma digital de contratos desde el móvil",
            "GPS tracking para vehículos y equipos",
        ]
    },
];

const TIPOS_ALIANZA = [
    "Papeleras Inteligentes & Sostenibilidad",
    "Capital Humano / Limpieza Industrial",
    "Ingeniería y Obras (Pública/Privada)",
    "Asesoría Legal & Trámites Petroleros",
    "Seguros Especializados (Jurídico/Contable/Importación)",
    "Automatización Móvil & Control de Campo",
    "Reclutamiento & Capacitación",
    "Turismo Energético / Eco-turismo",
    "Minería & Arco Minero del Orinoco",
    "Agroindustria & Fertilizantes (GL 49)",
    "Logística & Almacenamiento de Hidrocarburos",
];

const AREAS_OP = [
    "Zulia (Maracaibo)", "Anzoátegui (El Tigre)", "Monagas (Maturín)",
    "Falcón (Punto Fijo)", "Miranda / Caracas", "Bolívar (Guayana)",
    "Apure", "Barinas", "Delta Amacuro", "Todo el País",
];

// --------------------------------------------------
// Sub-componentes
// --------------------------------------------------
function LicenciaCard({ code, desc }: { code: string; desc: string }) {
    return (
        <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-4 md:p-5 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-amber-500/20 shrink-0"><Zap className="h-5 w-5 text-amber-400" /></div>
            <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-400">{code}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function ServicioCard({ s }: { s: typeof SERVICIOS_KYRON[0] }) {
    const [open, setOpen] = useState(false);
    return (
        <Card className={cn("glass-card border rounded-2xl overflow-hidden transition-all", s.bg)}>
            <button className="w-full text-left p-5 md:p-6 flex items-center gap-4" onClick={() => setOpen(o => !o)}>
                <div className={cn("p-3 rounded-xl bg-background/50 shrink-0")}>
                    <s.icon className={cn("h-6 w-6", s.color)} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-black uppercase italic tracking-tight text-foreground">{s.titulo}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{s.subtitulo}</p>
                </div>
                {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <ul className="px-5 pb-5 space-y-2">
                            {s.puntos.map((p, i) => (
                                <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/80">
                                    <CheckCircle className={cn("h-3.5 w-3.5 shrink-0 mt-0.5", s.color)} />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}

// --------------------------------------------------
// Page
// --------------------------------------------------
export default function SectorEnergeticoPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"overview" | "alianza" | "sectores" | "solicitud">("overview");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [solSubmitting, setSolSubmitting] = useState(false);

    // Formulario alianza
    const [alianzaForm, setAlianzaForm] = useState({
        empresa_solicitante: "", rif_solicitante: "", nombre_contacto: "",
        cargo_contacto: "", email_contacto: "", telefono: "",
        tipo_alianza: TIPOS_ALIANZA[0], area_operacion: AREAS_OP[0], descripcion: "",
    });

    // Formulario solicitud sectorial
    const [solForm, setSolForm] = useState({
        categoria: "", subcategoria: "", empresa_solicitante: "", rif: "",
        descripcion: "", ciiu_codigo: "", estado_operacion: AREAS_OP[0],
        municipio: "", personal_requerido: "", presupuesto_estimado: "", moneda: "USD",
    });

    const handleAlianzaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/alianzas-petroleras', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alianzaForm),
            });
            const json = await res.json();
            if (res.ok) {
                setSubmitted(true);
                toast({ title: "SOLICITUD ENVIADA", description: `ID #${json.solicitud?.id} — Revisaremos su propuesta en 48 horas hábiles.` });
            } else {
                toast({ title: "Error", description: json.error ?? "Error al enviar", variant: "destructive" });
            }
        } catch {
            toast({ title: "Error de conexión", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    const handleSolSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSolSubmitting(true);
        try {
            const res = await fetch('/api/sector-solicitudes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(solForm),
            });
            const json = await res.json();
            if (res.ok) {
                toast({ title: "SOLICITUD REGISTRADA", description: `ID #${json.solicitud?.id} — Su solicitud sectorial ha sido guardada.` });
                setSolForm({ categoria: "", subcategoria: "", empresa_solicitante: "", rif: "", descripcion: "", ciiu_codigo: "", estado_operacion: AREAS_OP[0], municipio: "", personal_requerido: "", presupuesto_estimado: "", moneda: "USD" });
            } else {
                toast({ title: "Error", description: json.error ?? "Error al enviar", variant: "destructive" });
            }
        } catch {
            toast({ title: "Error de conexión", variant: "destructive" });
        } finally {
            setSolSubmitting(false);
        }
    };

    const TABS = [
        { id: "overview", label: "Panorama", icon: Globe },
        { id: "alianza", label: "Solicitar Alianza", icon: Handshake },
        { id: "sectores", label: "Industrias", icon: Factory },
        { id: "solicitud", label: "Solicitud Sectorial", icon: FileText },
    ] as const;

    return (
        <div className="space-y-8 md:space-y-10 pb-24">

            {/* ─── HEADER ─── */}
            <header className="border-l-4 border-amber-500 pl-6 py-2 mt-6 md:mt-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-500 mb-2">
                    <AlertTriangle className="h-3 w-3" /> OPORTUNIDAD ESTRATÉGICA ACTIVA
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-none text-foreground italic-shadow">
                    SECTOR <span className="text-amber-500 italic">ENERGÉTICO</span>
                </h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.5em] italic">
                    PDVSA · Petróleo · Minería · Turismo · Agroindustria · GL 46 / GL 48 / GL 49
                </p>
            </header>

            {/* ─── ALERTA LICENCIAS ─── */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent rounded-2xl p-5 md:p-7 flex gap-4 items-start"
            >
                <div className="p-3 rounded-2xl bg-amber-500/20 shrink-0 mt-0.5"><Flame className="h-7 w-7 text-amber-400" /></div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-1">ALERTA — MARZO 2026</p>
                    <p className="font-black uppercase italic text-base md:text-lg text-foreground leading-snug">
                        EE.UU. amplía sanciones petroleras: Venezuela abre paso a Chevron, Repsol, Eni, BP y Shell
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed max-w-3xl">
                        El Departamento del Tesoro actualizó las licencias generales GL 46, 48 y 49 permitiendo inversiones en exploración,
                        producción y exportación de crudo venezolano, con pagos canalizados por mecanismos supervisados por EE.UU.
                        System Kyron es la plataforma de gestión operativa ideal para capitalizar esta apertura en todas las industrias del país.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        {LICENCIAS.map(l => <LicenciaCard key={l.code} {...l} />)}
                    </div>
                </div>
            </motion.div>

            {/* ─── TABS ─── */}
            <div className="flex gap-2 flex-wrap">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                            activeTab === tab.id
                                ? "bg-amber-500 border-amber-500 text-white shadow-lg"
                                : "bg-card/40 border-border/50 text-muted-foreground hover:text-foreground hover:border-amber-500/30"
                        )}
                    >
                        <tab.icon className="h-3.5 w-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ─── TAB: OVERVIEW ─── */}
            <AnimatePresence mode="wait">
            {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

                    {/* Majors internacionales */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 ml-1">
                            <Globe className="h-5 w-5 text-amber-500" />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/70">Empresas Internacionales Habilitadas</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {MAJORS.map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                                    <Card className="glass-card border-none bg-card/40 rounded-2xl p-4 text-center hover:shadow-md transition-all group">
                                        <div className={cn("w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-[10px] font-black", m.color)}>
                                            {m.nombre.substring(0, 2).toUpperCase()}
                                        </div>
                                        <p className="text-[10px] font-black uppercase">{m.nombre}</p>
                                        <p className="text-[9px] text-muted-foreground">{m.pais}</p>
                                        <p className="text-[8px] text-muted-foreground/60 mt-1">{m.area}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Servicios System Kyron */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 ml-1">
                            <Zap className="h-5 w-5 text-amber-500" />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/70">Servicios System Kyron para el Sector</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {SERVICIOS_KYRON.map((s, i) => <ServicioCard key={i} s={s} />)}
                        </div>
                    </section>

                    {/* CTA */}
                    <Card className="glass-card border-none bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-3xl p-8 md:p-10 text-center space-y-5">
                        <Flame className="h-12 w-12 text-amber-400 mx-auto" />
                        <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">
                            ¿Tu empresa opera en el sector energético?
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                            Regístrate como aliado estratégico de System Kyron y accede a servicios de gestión de capital humano,
                            papeleras inteligentes, ingeniería, legal y seguros para el sector petrolero, minero, turístico y agroindustrial venezolano.
                        </p>
                        <Button
                            className="btn-3d-primary h-12 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                            onClick={() => setActiveTab("alianza")}
                        >
                            <Handshake className="mr-2 h-4 w-4" /> SOLICITAR ALIANZA AHORA
                        </Button>
                    </Card>
                </motion.div>
            )}

            {/* ─── TAB: ALIANZA ─── */}
            {activeTab === "alianza" && (
                <motion.div key="alianza" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {submitted ? (
                        <Card className="glass-card border-none bg-emerald-500/10 border-emerald-500/20 rounded-3xl p-12 text-center space-y-5">
                            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
                            <h3 className="text-2xl font-black uppercase italic text-foreground">¡Solicitud Registrada!</h3>
                            <p className="text-muted-foreground">Su solicitud de alianza ha sido guardada en el sistema. Un especialista de System Kyron se comunicará en 48 horas hábiles.</p>
                            <Button variant="outline" className="rounded-2xl" onClick={() => { setSubmitted(false); setAlianzaForm({ empresa_solicitante: "", rif_solicitante: "", nombre_contacto: "", cargo_contacto: "", email_contacto: "", telefono: "", tipo_alianza: TIPOS_ALIANZA[0], area_operacion: AREAS_OP[0], descripcion: "" }); }}>
                                Nueva Solicitud
                            </Button>
                        </Card>
                    ) : (
                        <Card className="glass-card border-none bg-card/40 rounded-3xl p-6 md:p-10">
                            <div className="mb-8 space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-amber-500/10 rounded-xl"><Handshake className="h-6 w-6 text-amber-500" /></div>
                                    <div>
                                        <h2 className="text-xl font-black uppercase italic tracking-tight">Formulario de Alianza Estratégica</h2>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Sector Energético · PDVSA · Minería · Turismo · GL 46/48/49</p>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleAlianzaSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Empresa Solicitante</Label>
                                        <Input
                                            value={alianzaForm.empresa_solicitante}
                                            onChange={e => setAlianzaForm(f => ({ ...f, empresa_solicitante: e.target.value }))}
                                            placeholder="Razón Social o Nombre"
                                            className="rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">RIF / Cédula</Label>
                                        <Input
                                            value={alianzaForm.rif_solicitante}
                                            onChange={e => setAlianzaForm(f => ({ ...f, rif_solicitante: e.target.value }))}
                                            placeholder="J-12345678-9"
                                            className="rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Nombre del Contacto *</Label>
                                        <Input
                                            required
                                            value={alianzaForm.nombre_contacto}
                                            onChange={e => setAlianzaForm(f => ({ ...f, nombre_contacto: e.target.value }))}
                                            placeholder="Nombre completo"
                                            className="rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Cargo</Label>
                                        <Input
                                            value={alianzaForm.cargo_contacto}
                                            onChange={e => setAlianzaForm(f => ({ ...f, cargo_contacto: e.target.value }))}
                                            placeholder="Director / Gerente / Propietario"
                                            className="rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Correo Electrónico *</Label>
                                        <Input
                                            required
                                            type="email"
                                            value={alianzaForm.email_contacto}
                                            onChange={e => setAlianzaForm(f => ({ ...f, email_contacto: e.target.value }))}
                                            placeholder="contacto@empresa.com"
                                            className="rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Teléfono / WhatsApp</Label>
                                        <Input
                                            value={alianzaForm.telefono}
                                            onChange={e => setAlianzaForm(f => ({ ...f, telefono: e.target.value }))}
                                            placeholder="+58 412 000 0000"
                                            className="rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Tipo de Alianza *</Label>
                                        <select
                                            required
                                            value={alianzaForm.tipo_alianza}
                                            onChange={e => setAlianzaForm(f => ({ ...f, tipo_alianza: e.target.value }))}
                                            className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            {TIPOS_ALIANZA.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Área de Operación</Label>
                                        <select
                                            value={alianzaForm.area_operacion}
                                            onChange={e => setAlianzaForm(f => ({ ...f, area_operacion: e.target.value }))}
                                            className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            {AREAS_OP.map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Descripción de la Propuesta</Label>
                                    <Textarea
                                        rows={4}
                                        value={alianzaForm.descripcion}
                                        onChange={e => setAlianzaForm(f => ({ ...f, descripcion: e.target.value }))}
                                        placeholder="Describa brevemente su empresa, los servicios que ofrece y cómo desea aliarse con System Kyron en el sector energético venezolano..."
                                        className="rounded-xl resize-none"
                                    />
                                </div>
                                <Button type="submit" disabled={submitting} className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest">
                                    {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                    {submitting ? "ENVIANDO..." : "ENVIAR SOLICITUD DE ALIANZA"}
                                </Button>
                            </form>
                        </Card>
                    )}
                </motion.div>
            )}

            {/* ─── TAB: SECTORES ─── */}
            {activeTab === "sectores" && (
                <motion.div key="sectores" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                    <p className="text-[11px] text-muted-foreground font-medium ml-1">
                        Selecciona tu sector CIIU para acceder a los servicios de gestión específicos de tu industria dentro de System Kyron.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {SECTORES_INDUSTRIALES.map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Card className="glass-card border-none bg-card/40 rounded-2xl p-5 hover:shadow-md transition-all group cursor-pointer"
                                    onClick={() => { setSolForm(f => ({ ...f, categoria: s.sector, ciiu_codigo: s.ciiu })); setActiveTab("solicitud"); }}>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors shrink-0">
                                            <s.icon className={cn("h-6 w-6", s.color)} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-black uppercase italic truncate">{s.sector}</p>
                                                <Badge variant="outline" className="text-[8px] font-black tracking-widest shrink-0">{s.ciiu}</Badge>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-3">
                                        <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-all" />
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ─── TAB: SOLICITUD SECTORIAL ─── */}
            {activeTab === "solicitud" && (
                <motion.div key="solicitud" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-3xl p-6 md:p-10">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl"><FileText className="h-6 w-6 text-primary" /></div>
                            <div>
                                <h2 className="text-xl font-black uppercase italic tracking-tight">Solicitud por Sector Industrial</h2>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Reclutamiento · Ingeniería · Legal · Seguros · Automatización</p>
                            </div>
                        </div>
                        <form onSubmit={handleSolSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Sector / Categoría *</Label>
                                    <select
                                        required
                                        value={solForm.categoria}
                                        onChange={e => setSolForm(f => ({ ...f, categoria: e.target.value }))}
                                        className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Seleccionar sector</option>
                                        {SECTORES_INDUSTRIALES.map(s => <option key={s.ciiu} value={s.sector}>{s.ciiu} — {s.sector}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Servicio Requerido</Label>
                                    <select
                                        value={solForm.subcategoria}
                                        onChange={e => setSolForm(f => ({ ...f, subcategoria: e.target.value }))}
                                        className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Seleccionar servicio</option>
                                        {TIPOS_ALIANZA.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Empresa</Label>
                                    <Input value={solForm.empresa_solicitante} onChange={e => setSolForm(f => ({ ...f, empresa_solicitante: e.target.value }))} placeholder="Nombre empresa o proyecto" className="rounded-xl h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">RIF</Label>
                                    <Input value={solForm.rif} onChange={e => setSolForm(f => ({ ...f, rif: e.target.value }))} placeholder="J-XXXXXXXX-X" className="rounded-xl h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Código CIIU</Label>
                                    <Input value={solForm.ciiu_codigo} onChange={e => setSolForm(f => ({ ...f, ciiu_codigo: e.target.value }))} placeholder="Ej: 0610" className="rounded-xl h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Estado / Región</Label>
                                    <select
                                        value={solForm.estado_operacion}
                                        onChange={e => setSolForm(f => ({ ...f, estado_operacion: e.target.value }))}
                                        className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {AREAS_OP.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Personal Requerido</Label>
                                    <Input type="number" min="1" value={solForm.personal_requerido} onChange={e => setSolForm(f => ({ ...f, personal_requerido: e.target.value }))} placeholder="Nro. de personas" className="rounded-xl h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Presupuesto Estimado (USD)</Label>
                                    <Input type="number" min="0" step="0.01" value={solForm.presupuesto_estimado} onChange={e => setSolForm(f => ({ ...f, presupuesto_estimado: e.target.value }))} placeholder="0.00" className="rounded-xl h-12" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest">Descripción del Requerimiento</Label>
                                <Textarea
                                    rows={4}
                                    value={solForm.descripcion}
                                    onChange={e => setSolForm(f => ({ ...f, descripcion: e.target.value }))}
                                    placeholder="Describa sus necesidades específicas: tipo de personal, materiales, servicios legales, seguros, automatización, etc."
                                    className="rounded-xl resize-none"
                                />
                            </div>
                            <Button type="submit" disabled={solSubmitting} className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest">
                                {solSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                {solSubmitting ? "REGISTRANDO..." : "REGISTRAR SOLICITUD SECTORIAL"}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ─── MÉTRICAS RÁPIDAS ─── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Empresas Habilitadas", value: "6 Majors", sub: "GL 46 / 48 / 49", icon: Globe, color: "text-amber-500" },
                    { label: "Sectores Cubiertos", value: "10+", sub: "CIIU clasificados", icon: Factory, color: "text-blue-500" },
                    { label: "Servicios System Kyron", value: "6 Módulos", sub: "Integrados en plataforma", icon: Zap, color: "text-primary" },
                    { label: "Control Móvil", value: "100%", sub: "App + WhatsApp + GPS", icon: Smartphone, color: "text-emerald-500" },
                ].map((m, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 rounded-2xl p-4 text-center">
                        <m.icon className={cn("h-6 w-6 mx-auto mb-2", m.color)} />
                        <p className="text-xl font-black italic text-foreground">{m.value}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">{m.label}</p>
                        <p className={cn("text-[8px] font-bold uppercase mt-1", m.color)}>{m.sub}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
