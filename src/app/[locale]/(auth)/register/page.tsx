"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User, Building2, ArrowRight, ChevronLeft, ShieldCheck,
    Search, CircleCheck as CircleCheck, TriangleAlert as TriangleAlert, Fingerprint, Loader2,
    Signal, Gavel, ArrowLeft,
    ChevronDown, Globe, Landmark, FileSignature, Building, UserCircle,
    ShoppingCart, Lock, Recycle,
    Calculator, Brain, Smartphone, Cpu, Shield, ChartBar as ChartColumn, Zap,
    Hexagon, CircuitBoard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/logo";

type DetectedType = null | "natural" | "juridico";

interface RifLookupResult {
    razonSocial: string;
    tipoEmpresa?: string;
    actividadEconomica?: string;
    estado?: string;
    municipio?: string;
    direccion?: string;
    telefono?: string;
    statusFiscal?: string;
    fechaRegistro?: string;
}

const ALL_PREFIXES = [
    { value: "V", label: "V", desc: "Venezolano", icon: UserCircle, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", ring: "ring-sky-500/30" },
    { value: "E", label: "E", desc: "Extranjero", icon: Globe, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", ring: "ring-teal-500/30" },
    { value: "J", label: "J", desc: "Jurídico / Fundación", icon: Building2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", ring: "ring-emerald-500/30" },
    { value: "G", label: "G", desc: "Gobierno", icon: Landmark, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", ring: "ring-amber-500/30" },
    { value: "P", label: "P", desc: "Pasaporte", icon: Globe, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", ring: "ring-violet-500/30" },
    { value: "C", label: "C", desc: "Comunal", icon: Building, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", ring: "ring-orange-500/30" },
    { value: "F", label: "F", desc: "Firma Personal", icon: FileSignature, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", ring: "ring-rose-500/30" },
];

interface ModuleOption {
    id: string;
    route: string;
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
    iconBg: string;
    forPrefixes: string[];
    badge?: string;
    badgeColor?: string;
}

const MODULES: ModuleOption[] = [
    {
        id: "natural",
        route: "natural",
        icon: User,
        title: "Persona Natural",
        description: "Registro personal con cédula, datos de contacto y ubicación geográfica venezolana",
        gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
        iconBg: "bg-sky-500/15 text-sky-400 ring-sky-500/20",
        forPrefixes: ["V", "E", "P"],
    },
    {
        id: "asesoria-contable",
        route: "asesoria-contable",
        icon: Building2,
        title: "Asesoría Contable & Empresarial",
        description: "VEN-NIF, facturación SENIAT, IVA/ISLR/IGTF, nómina LOTTT, RRHH, inventario",
        gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
        iconBg: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
        forPrefixes: ["J", "G", "F"],
    },
    {
        id: "asesoria-comunal",
        route: "asesoria-contable",
        icon: Building,
        title: "Gestión Contable Comunal",
        description: "Contabilidad comunal, rendición de cuentas, presupuesto participativo y contraloría social",
        gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
        iconBg: "bg-orange-500/15 text-orange-400 ring-orange-500/20",
        forPrefixes: ["C"],
        badge: "COMUNAL",
        badgeColor: "text-orange-400 bg-orange-500/10",
    },
    {
        id: "gestion-publica",
        route: "asesoria-contable",
        icon: Landmark,
        title: "Gestión Pública & Presupuesto",
        description: "Presupuesto público, SIGECOF, rendición de cuentas CGR, ONAPRE y transparencia fiscal",
        gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
        iconBg: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
        forPrefixes: ["G"],
        badge: "GOBIERNO",
        badgeColor: "text-amber-400 bg-amber-500/10",
    },
    {
        id: "legal",
        route: "legal",
        icon: Gavel,
        title: "Escritorio Jurídico",
        description: "Contratos, poderes, permisos SENIAT/SAPI, actas de asamblea y cumplimiento legal",
        gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
        iconBg: "bg-violet-500/15 text-violet-400 ring-violet-500/20",
        forPrefixes: ["J", "G", "F"],
    },
    {
        id: "telecom",
        route: "telecom",
        icon: Signal,
        title: "Mi Línea 5G",
        description: "Planes de telefonía, datos móviles 5G, eSIM y servicios de conectividad",
        gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
        iconBg: "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
        forPrefixes: ["V", "E", "J", "F"],
    },
    {
        id: "ventas",
        route: "asesoria-contable",
        icon: ShoppingCart,
        title: "Punto de Venta & Ventas",
        description: "TPV integrado, control de inventario, estrategias de venta y fidelización de clientes",
        gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
        iconBg: "bg-rose-500/15 text-rose-400 ring-rose-500/20",
        forPrefixes: ["J", "F"],
    },
    {
        id: "sostenibilidad",
        route: "sostenibilidad",
        icon: Recycle,
        title: "Sostenibilidad & ESG",
        description: "Gestión ambiental, reciclaje, huella de carbono, reportes ESG y economía circular",
        gradient: "from-green-500/20 via-lime-500/10 to-transparent",
        iconBg: "bg-green-500/15 text-green-400 ring-green-500/20",
        forPrefixes: ["V", "E", "J", "G", "C", "F"],
    },
];

const BRANDING_FEATURES = [
    { icon: Calculator, label: "Contabilidad VEN-NIF", color: "text-sky-400", bg: "bg-sky-500/10", desc: "Cumplimiento fiscal total" },
    { icon: Shield, label: "Cifrado AES-256", color: "text-emerald-400", bg: "bg-emerald-500/10", desc: "Seguridad bancaria" },
    { icon: Brain, label: "Inteligencia Artificial", color: "text-violet-400", bg: "bg-violet-500/10", desc: "Automatización inteligente" },
    { icon: Smartphone, label: "Mi Línea 5G", color: "text-cyan-400", bg: "bg-cyan-500/10", desc: "Conectividad premium" },
    { icon: ChartColumn, label: "Reportes SENIAT", color: "text-amber-400", bg: "bg-amber-500/10", desc: "Declaraciones al día" },
    { icon: Zap, label: "Automatización", color: "text-rose-400", bg: "bg-rose-500/10", desc: "Procesos en piloto automático" },
];

const STEP_LABELS = ["Identificación", "Portal", "Datos"];

function detectDocumentType(prefix: string, number: string): { type: DetectedType; format: "cedula" | "rif" | null; label: string; valid: boolean } {
    const trimmed = number.replace(/\s/g, "");
    if (!trimmed) return { type: null, format: null, label: "", valid: false };

    const isCedulaFormat = /^\d{1,10}$/.test(trimmed);
    const isRifFormat = /^\d{8}-\d$/.test(trimmed);

    if (["J", "G", "C", "F"].includes(prefix)) {
        const labelMap: Record<string, string> = {
            "J": "Persona Jurídica (Empresa / Fundación / Asociación Civil)",
            "G": "Organismo del Estado",
            "C": "Consejo Comunal",
            "F": "Firma Personal",
        };
        return { type: "juridico", format: "rif", label: labelMap[prefix] || prefix, valid: isRifFormat };
    }

    if (["V", "E"].includes(prefix)) {
        if (isRifFormat) {
            return { type: "natural", format: "cedula", label: "Persona Natural (con RIF)", valid: true };
        }
        if (isCedulaFormat) {
            return { type: "natural", format: "cedula", label: prefix === "V" ? "Ciudadano Venezolano" : "Residente Extranjero", valid: true };
        }
        if (trimmed.length > 0) {
            return { type: "natural", format: "cedula", label: prefix === "V" ? "Ciudadano Venezolano" : "Residente Extranjero", valid: false };
        }
    }

    if (prefix === "P") {
        if (isCedulaFormat) {
            return { type: "natural", format: "cedula", label: "Pasaporte (Persona Natural)", valid: true };
        }
        return { type: "natural", format: "cedula", label: "Pasaporte (Persona Natural)", valid: false };
    }

    return { type: null, format: null, label: "", valid: false };
}

function AnimatedGridBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `
                    linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
            }} />
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `
                    linear-gradient(rgba(56,189,248,0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.2) 1px, transparent 1px)
                `,
                backgroundSize: '15px 15px'
            }} />
            <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-sky-400/30"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${10 + (i % 3) * 30}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.8,
                    }}
                />
            ))}
        </div>
    );
}

function GlowingCard({ children, className, active }: { children: React.ReactNode; className?: string; active?: boolean }) {
    return (
        <div className={cn("relative group/card", className)}>
            <motion.div
                className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-sky-400/30 via-cyan-400/20 to-emerald-400/30 pointer-events-none"
                animate={active ? { opacity: [0.4, 0.7, 0.4] } : { opacity: 0 }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "blur(1px)" }}
            />
            <div className="relative rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-emerald-50/30 dark:from-sky-950/50 dark:to-emerald-950/30 pointer-events-none" />
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>
    );
}

function KyronLogo() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-6 lg:hidden"
        >
            <div className="relative mb-3">
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 blur-xl"
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    <Logo className="h-7 w-7 text-white" />
                </div>
            </div>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.25em]">SYSTEM KYRON</p>
        </motion.div>
    );
}

function BrandingPanel() {
    return (
        <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-[#040714] h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-950/40 via-[#040714] to-emerald-950/20" />

            <AnimatedGridBg />
            <FloatingParticles />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-sky-500/[0.06] blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.05] blur-[100px]" />
            <div className="absolute top-[50%] left-0 w-[300px] h-[300px] rounded-full bg-violet-500/[0.04] blur-[80px]" />

            <div className="relative z-10 p-10 xl:p-14 flex-1 flex flex-col justify-between">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3.5 mb-14"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 blur-lg opacity-40" />
                            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                                <Logo className="h-5 w-5 text-white" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white tracking-wide">SYSTEM KYRON</p>
                            <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase">Inteligencia Corporativa</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-sky-500/50 to-transparent" />
                            <span className="text-[10px] font-semibold text-sky-400/60 tracking-wide uppercase">Crear Cuenta</span>
                        </div>
                        <h2 className="text-3xl xl:text-[2.5rem] font-bold text-white leading-[1.15] mb-5">
                            Tu ecosistema{" "}
                            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                                corporativo
                            </span>
                            <br />
                            <span className="text-white/90">integral.</span>
                        </h2>
                        <p className="text-white/30 text-sm leading-relaxed max-w-[320px]">
                            Gestiona contabilidad, nómina, facturación y más. La plataforma diseñada para el mercado venezolano.
                        </p>
                    </motion.div>
                </div>

                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="grid grid-cols-2 gap-2.5 mb-10"
                    >
                        {BRANDING_FEATURES.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div
                                    key={feat.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.35, delay: 0.4 + idx * 0.07 }}
                                    className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
                                >
                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110", feat.bg)}>
                                        <Icon className={cn("h-3.5 w-3.5", feat.color)} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[11px] font-medium text-white/50 group-hover:text-white/70 transition-colors block truncate">{feat.label}</span>
                                        <span className="text-[11px] text-white/20 block truncate">{feat.desc}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex items-center gap-5 px-1"
                    >
                        {[
                            { icon: Shield, label: "AES-256", color: "text-emerald-400/40" },
                            { icon: ShieldCheck, label: "SENIAT", color: "text-sky-400/40" },
                            { icon: Lock, label: "VEN-NIF", color: "text-violet-400/40" },
                            { icon: CircuitBoard, label: "SAIME", color: "text-cyan-400/40" },
                        ].map(b => (
                            <div key={b.label} className="flex items-center gap-1.5">
                                <b.icon className={cn("h-3 w-3", b.color)} />
                                <span className="text-[11px] text-white/20 tracking-wider font-medium">{b.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function RegisterSelectionPage() {
    const router = useRouter();
    const [step, setStep] = useState<"identify" | "modules">("identify");
    const [prefix, setPrefix] = useState("V");
    const [prefixOpen, setPrefixOpen] = useState(false);
    const [prefixFocusIdx, setPrefixFocusIdx] = useState(-1);
    const prefixRef = useRef<HTMLDivElement>(null);
    const prefixTriggerRef = useRef<HTMLButtonElement>(null);
    const [docNumber, setDocNumber] = useState("");
    const [detected, setDetected] = useState<{ type: DetectedType; format: "cedula" | "rif" | null; label: string; valid: boolean }>({ type: null, format: null, label: "", valid: false });
    const [checking, setChecking] = useState(false);
    const [existsResult, setExistsResult] = useState<null | { exists: boolean }>(null);
    const [rifLookup, setRifLookup] = useState<RifLookupResult | null>(null);
    const [rifSearching, setRifSearching] = useState(false);
    const [rifSearched, setRifSearched] = useState(false);
    const [rifValidationError, setRifValidationError] = useState<string | null>(null);
    const [cedulaLookup, setCedulaLookup] = useState<{
        nombre: string; apellido: string; estado?: string; municipio?: string;
        primerNombre?: string; segundoNombre?: string; primerApellido?: string; segundoApellido?: string;
        fechaNacimiento?: string; sexo?: string; estadoCivil?: string; parroquia?: string;
        lugarNacimiento?: string; nacionalidad?: string; estatus?: string;
        fechaEmision?: string; fechaVencimiento?: string;
    } | null>(null);
    const [cedulaSearching, setCedulaSearching] = useState(false);
    const [cedulaValidInfo, setCedulaValidInfo] = useState<{
        nacionalidad?: string; edadEstimada?: { rangoEdad: string; generacion: string }; info?: string;
    } | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const fullDocument = `${prefix}-${docNumber}`;

    useEffect(() => {
        if (step === "identify" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [step]);

    useEffect(() => {
        const result = detectDocumentType(prefix, docNumber);
        setDetected(result);
        setExistsResult(null);
        setRifLookup(null);
        setRifSearched(false);
        setCedulaLookup(null);
    }, [prefix, docNumber]);

    useEffect(() => {
        if (!detected.valid || detected.type !== "natural") {
            setCedulaLookup(null);
            setCedulaValidInfo(null);
            return;
        }
        const doc = `${prefix}-${docNumber}`;
        setCedulaSearching(true);
        const controller = new AbortController();
        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/cedula/consulta?cedula=${encodeURIComponent(doc)}`, { signal: controller.signal });
                const data = await res.json();
                if (data.found && data.data) {
                    setCedulaLookup(data.data);
                    setCedulaValidInfo(null);
                } else {
                    setCedulaLookup(null);
                    if (data.validacion) {
                        setCedulaValidInfo({
                            nacionalidad: data.validacion.nacionalidad,
                            edadEstimada: data.validacion.edadEstimada,
                            info: data.validacion.info,
                        });
                    } else {
                        setCedulaValidInfo(null);
                    }
                }
            } catch {
                setCedulaLookup(null);
                setCedulaValidInfo(null);
            } finally {
                setCedulaSearching(false);
            }
        }, 400);
        return () => {
            clearTimeout(timeout);
            controller.abort();
            setCedulaSearching(false);
        };
    }, [detected.valid, detected.type, prefix, docNumber]);

    useEffect(() => {
        if (!prefixOpen) return;
        setPrefixFocusIdx(ALL_PREFIXES.findIndex(p => p.value === prefix));
        function handleClickOutside(e: MouseEvent) {
            if (prefixRef.current && !prefixRef.current.contains(e.target as Node)) {
                setPrefixOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [prefixOpen, prefix]);

    const handlePrefixKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!prefixOpen) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPrefixOpen(true);
            }
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setPrefixFocusIdx(i => (i + 1) % ALL_PREFIXES.length);
                break;
            case "ArrowUp":
                e.preventDefault();
                setPrefixFocusIdx(i => (i - 1 + ALL_PREFIXES.length) % ALL_PREFIXES.length);
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                if (prefixFocusIdx >= 0 && prefixFocusIdx < ALL_PREFIXES.length) {
                    setPrefix(ALL_PREFIXES[prefixFocusIdx].value);
                    setPrefixOpen(false);
                    inputRef.current?.focus();
                }
                break;
            case "Escape":
                e.preventDefault();
                setPrefixOpen(false);
                prefixTriggerRef.current?.focus();
                break;
            case "Tab":
                setPrefixOpen(false);
                break;
        }
    }, [prefixOpen, prefixFocusIdx]);

    const handleNumberChange = (val: string) => {
        const cleaned = val.replace(/[^0-9-]/g, "");
        if (["J", "G", "C", "F"].includes(prefix)) {
            const digitsOnly = cleaned.replace(/-/g, "");
            if (digitsOnly.length <= 8) {
                setDocNumber(digitsOnly);
            } else if (digitsOnly.length === 9) {
                setDocNumber(`${digitsOnly.slice(0, 8)}-${digitsOnly.slice(8)}`);
            } else {
                setDocNumber(`${digitsOnly.slice(0, 8)}-${digitsOnly.slice(8, 9)}`);
            }
        } else {
            setDocNumber(cleaned);
        }
    };

    const handleRifSearch = useCallback(async () => {
        if (!detected.valid || detected.type !== "juridico") return;
        setRifSearching(true);
        setRifLookup(null);
        setRifValidationError(null);
        try {
            const res = await fetch(`/api/rif/consulta?rif=${encodeURIComponent(fullDocument)}`);
            const data = await res.json();
            if (!res.ok && data.error) {
                setRifValidationError(data.error);
                setRifSearched(true);
                return;
            }
            if (data.found && data.data) {
                setRifLookup(data.data);
            }
            setRifSearched(true);
        } catch {
            setRifSearched(true);
        } finally {
            setRifSearching(false);
        }
    }, [detected, fullDocument]);

    const handleContinueToModules = useCallback(async () => {
        if (!detected.type || !detected.valid) return;
        setChecking(true);
        try {
            const field = detected.format === "rif" || ["J", "G", "C", "F"].includes(prefix) ? "rif" : "cedula";
            const res = await fetch(`/api/auth/check-document?field=${field}&value=${encodeURIComponent(fullDocument)}`);
            const data = await res.json();
            if (data.exists) {
                setExistsResult({ exists: true });
                setChecking(false);
                return;
            }
        } catch {}
        setChecking(false);
        setStep("modules");
    }, [detected, prefix, fullDocument]);

    const handleSelectModule = useCallback((moduleRoute: string, moduleId: string) => {
        setNavigatingModule(moduleId);
        const params = new URLSearchParams({ doc: fullDocument });
        if (moduleId !== moduleRoute) params.set('modulo', moduleId);
        if (rifLookup?.razonSocial) params.set('razon', rifLookup.razonSocial);
        if (rifLookup?.tipoEmpresa) params.set('tipo', rifLookup.tipoEmpresa);
        if (rifLookup?.actividadEconomica) params.set('actividad', rifLookup.actividadEconomica);
        if (rifLookup?.estado) params.set('estado', rifLookup.estado);
        if (rifLookup?.municipio) params.set('municipio', rifLookup.municipio);
        if (rifLookup?.telefono) params.set('tel', rifLookup.telefono);
        if (cedulaLookup?.nombre) params.set('nombre', cedulaLookup.nombre);
        if (cedulaLookup?.apellido) params.set('apellido', cedulaLookup.apellido);
        if (cedulaLookup?.estado) params.set('estado', cedulaLookup.estado);
        if (cedulaLookup?.municipio) params.set('municipio', cedulaLookup.municipio);
        if (cedulaLookup?.fechaNacimiento) params.set('fechaNac', cedulaLookup.fechaNacimiento.split('T')[0]);
        if (cedulaLookup?.sexo) params.set('sexo', cedulaLookup.sexo);
        if (cedulaLookup?.estadoCivil) params.set('civil', cedulaLookup.estadoCivil);
        if (cedulaLookup?.parroquia) params.set('parroquia', cedulaLookup.parroquia);
        if (cedulaLookup?.lugarNacimiento) params.set('lugarNac', cedulaLookup.lugarNacimiento);
        if (cedulaLookup?.nacionalidad) params.set('nacionalidad', cedulaLookup.nacionalidad);
        router.push(`/register/${moduleRoute}?${params.toString()}` as any);
    }, [fullDocument, router, rifLookup, cedulaLookup]);

    const isValidDoc = detected.type !== null && detected.valid;
    const isNatural = detected.type === "natural";
    const isJuridico = detected.type === "juridico";
    const availableModules = MODULES.filter(m => m.forPrefixes.includes(prefix));
    const currentPrefix = ALL_PREFIXES.find(p => p.value === prefix) ?? ALL_PREFIXES[0];
    const CurrentPrefixIcon = currentPrefix.icon;
    const currentStepIdx = step === "identify" ? 0 : 1;

    return (
        <div className="min-h-screen flex bg-gradient-to-b from-[#e4edf8] via-[#dce7f5] to-[#d2dff0] dark:from-[#0a0f1a] dark:via-[#111827] dark:to-[#0f172a]">
            <div className="hidden lg:block lg:w-[45%] xl:w-[42%]">
                <div className="sticky top-0 h-screen">
                    <BrandingPanel />
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-[#e8f0fa] via-[#dce7f5] to-[#d2dff0] dark:from-[#0a0f1a] dark:via-[#111827] dark:to-[#0f172a]">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-transparent to-emerald-100/20 dark:from-sky-900/20 dark:to-emerald-900/10" />

                <motion.div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/[0.12] blur-[120px] pointer-events-none"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-400/[0.10] blur-[100px] pointer-events-none"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute top-[40%] right-[5%] w-[250px] h-[250px] rounded-full bg-violet-400/[0.08] blur-[80px] pointer-events-none"
                    animate={{ x: [0, 20, 0], y: [0, -15, 0], opacity: [0.06, 0.10, 0.06] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute top-[15%] left-[10%] w-[200px] h-[200px] rounded-full bg-cyan-400/[0.08] blur-[80px] pointer-events-none"
                    animate={{ y: [0, 25, 0], opacity: [0.05, 0.10, 0.05] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                />


                <div className="relative z-10 min-h-screen flex flex-col">
                    <nav className="flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
                        {step === "identify" ? (
                            <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 text-sm">
                                <div className="w-7 h-7 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all shadow-sm">
                                    <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                </div>
                                <span className="font-medium hidden sm:block">Inicio</span>
                            </Link>
                        ) : (
                            <button onClick={() => setStep("identify")} className="group flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 text-sm">
                                <div className="w-7 h-7 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all shadow-sm">
                                    <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                </div>
                                <span className="font-medium hidden sm:block">Cambiar Documento</span>
                            </button>
                        )}
                        <div className="flex items-center gap-2.5 text-slate-400 text-[10px] font-semibold tracking-[0.15em]">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
                            <Lock className="h-3 w-3" />
                            <span>KYRON v2.8.5</span>
                        </div>
                    </nav>

                    <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pb-10 pt-4">
                        <div className="w-full max-w-lg">
                            <KyronLogo />
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center mb-8"
                            >
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
                                    <span className="bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                                        Crear Cuenta
                                    </span>
                                </h1>
                            </motion.div>

                            <div className="flex items-start gap-3 mb-8 px-1">
                                {STEP_LABELS.map((label, n) => {
                                    const isActive = n === currentStepIdx;
                                    const isDone = n < currentStepIdx;
                                    return (
                                        <div key={n} className="flex-1">
                                            <div className="flex items-center gap-2.5 mb-2">
                                                <motion.div
                                                    className={cn(
                                                        "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all duration-500",
                                                        isDone ? "bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20" :
                                                        isActive ? "bg-sky-500/15 text-sky-600 ring-2 ring-sky-500/25 shadow-md shadow-sky-500/10" :
                                                        "bg-white/60 dark:bg-slate-800/60 text-slate-300 dark:text-slate-500 border border-slate-200 dark:border-slate-700"
                                                    )}
                                                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    {isDone ? <CircleCheck className="h-3.5 w-3.5" /> : n + 1}
                                                </motion.div>
                                                <span className={cn(
                                                    "text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors hidden sm:block",
                                                    isActive ? "text-slate-600 dark:text-slate-300" : isDone ? "text-emerald-600/70" : "text-slate-300 dark:text-slate-500"
                                                )}>
                                                    {label}
                                                </span>
                                            </div>
                                            <div className="h-[3px] rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                <motion.div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        isDone ? "bg-gradient-to-r from-sky-500 to-emerald-500" :
                                                        isActive ? "bg-gradient-to-r from-sky-500/80 to-sky-400/80" :
                                                        "bg-transparent"
                                                    )}
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: isDone ? "100%" : isActive ? "50%" : "0%" }}
                                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === "identify" && (
                                    <motion.div
                                        key="identify"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="space-y-4"
                                    >
                                        <div ref={prefixRef} className="relative mb-2" onKeyDown={handlePrefixKeyDown}>
                                            <button
                                                ref={prefixTriggerRef}
                                                type="button"
                                                role="combobox"
                                                aria-expanded={prefixOpen}
                                                aria-haspopup="listbox"
                                                aria-controls="prefix-listbox"
                                                aria-label={`Tipo de documento: ${currentPrefix.value} — ${currentPrefix.desc}`}
                                                onClick={() => setPrefixOpen(o => !o)}
                                                className={cn(
                                                    "flex items-center gap-2.5 w-full h-11 px-3 rounded-xl border transition-all duration-200 cursor-pointer",
                                                    "hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
                                                    prefixOpen
                                                        ? "border-sky-400/40 bg-sky-50 dark:bg-sky-950"
                                                        : "border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                )}
                                            >
                                                <div className={cn("flex items-center justify-center w-7 h-7 rounded-lg transition-all", currentPrefix.bg)}>
                                                    <CurrentPrefixIcon className={cn("h-3.5 w-3.5", currentPrefix.color)} />
                                                </div>
                                                <span className={cn("text-sm font-bold", currentPrefix.color)}>{currentPrefix.value} — {currentPrefix.desc}</span>
                                                <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ml-auto shrink-0", prefixOpen && "rotate-180")} />
                                            </button>

                                            <AnimatePresence>
                                                {prefixOpen && (
                                                    <motion.div
                                                        id="prefix-listbox"
                                                        role="listbox"
                                                        aria-label="Tipo de documento"
                                                        initial={{ opacity: 0, y: -4, scale: 0.97 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                                        className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60"
                                                    >
                                                        <div className="p-1">
                                                            {ALL_PREFIXES.map((p, idx) => {
                                                                const OptionIcon = p.icon;
                                                                const isActive = prefix === p.value;
                                                                const isFocused = prefixFocusIdx === idx;
                                                                return (
                                                                    <div
                                                                        key={p.value}
                                                                        role="option"
                                                                        aria-selected={isActive}
                                                                        aria-label={`${p.value} — ${p.desc}`}
                                                                        onClick={() => { setPrefix(p.value); setPrefixOpen(false); inputRef.current?.focus(); }}
                                                                        className={cn(
                                                                            "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer",
                                                                            isActive ? "bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600" :
                                                                            isFocused ? "bg-slate-50 dark:bg-slate-700/50" :
                                                                            "hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent"
                                                                        )}
                                                                    >
                                                                        <div className={cn("flex items-center justify-center w-6 h-6 rounded-md", p.bg)}>
                                                                            <OptionIcon className={cn("h-3 w-3", p.color)} />
                                                                        </div>
                                                                        <span className={cn("text-xs font-bold", isActive ? p.color : "text-slate-700 dark:text-slate-200")}>{p.value}</span>
                                                                        <span className="text-[11px] text-slate-400">{p.desc}</span>
                                                                        {isActive && <CircleCheck className={cn("h-3.5 w-3.5 shrink-0 ml-auto", p.color)} />}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <GlowingCard active={isValidDoc}>
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-5">
                                                    <motion.div
                                                        className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center ring-1 transition-all duration-500",
                                                            isNatural ? "bg-sky-500/10 ring-sky-500/20" :
                                                            isJuridico ? "bg-emerald-500/10 ring-emerald-500/20" :
                                                            "bg-slate-100 dark:bg-slate-700 ring-slate-200 dark:ring-slate-600"
                                                        )}
                                                        animate={isValidDoc ? { scale: [1, 1.05, 1] } : {}}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        <Fingerprint className={cn(
                                                            "h-5 w-5 transition-colors duration-500",
                                                            isNatural ? "text-sky-500" :
                                                            isJuridico ? "text-emerald-500" :
                                                            "text-slate-300"
                                                        )} />
                                                    </motion.div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Número de documento</p>
                                                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Cédula de identidad o RIF empresarial</p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 items-end">
                                                    <div className="flex-1 relative group/input">
                                                        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-sky-500/0 via-sky-500/0 to-sky-500/0 group-focus-within/input:from-sky-400/20 group-focus-within/input:via-cyan-400/10 group-focus-within/input:to-sky-400/20 transition-all duration-500 blur-[1px] pointer-events-none" />
                                                        <Input
                                                            value={docNumber}
                                                            onChange={e => handleNumberChange(e.target.value)}
                                                            placeholder={["J", "G", "C", "F"].includes(prefix) ? "50328471-6" : "18745632"}
                                                            ref={inputRef}
                                                            className="relative h-12 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-700 tracking-wider focus:border-sky-400/50 transition-all duration-300 pl-4 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:bg-white dark:focus:bg-slate-800"
                                                        />
                                                        {docNumber && (
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest">
                                                                    {["J", "G", "C", "F"].includes(prefix) ? "RIF" : "CI"}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {isJuridico && detected.valid && (
                                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={handleRifSearch}
                                                                disabled={rifSearching}
                                                                className={cn(
                                                                    "h-12 px-4 rounded-xl font-semibold text-xs tracking-wider shrink-0 transition-all duration-300 border",
                                                                    "bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
                                                                )}
                                                            >
                                                                {rifSearching ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <><Search className="h-4 w-4 mr-1.5" /> SENIAT</>
                                                                )}
                                                            </Button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </GlowingCard>

                                        <AnimatePresence>
                                            {rifLookup && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    className="rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/80 p-4 backdrop-blur-sm"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-emerald-500/10">
                                                            <Building2 className="h-4 w-4 text-emerald-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{rifLookup.razonSocial}</p>
                                                            <p className="text-[11px] text-emerald-400/60 mt-0.5">
                                                                {rifLookup.tipoEmpresa || 'Empresa registrada'}
                                                                {rifLookup.estado && ` · ${rifLookup.estado}`}
                                                            </p>
                                                            {rifLookup.actividadEconomica && (
                                                                <p className="text-[11px] text-slate-400 mt-1">{rifLookup.actividadEconomica}</p>
                                                            )}
                                                        </div>
                                                        {rifLookup.statusFiscal && (
                                                            <span className={cn(
                                                                "text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0",
                                                                rifLookup.statusFiscal === 'ACTIVO' ? "text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/10" : "text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/10"
                                                            )}>
                                                                {rifLookup.statusFiscal}
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {rifSearched && rifValidationError && !rifSearching && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-red-200 dark:border-red-700 bg-red-50/80 dark:bg-red-950/80 backdrop-blur-sm">
                                                <TriangleAlert className="h-4 w-4 text-red-400 shrink-0" />
                                                <p className="text-[11px] font-medium text-red-600/70">{rifValidationError}</p>
                                            </motion.div>
                                        )}

                                        {rifSearched && !rifLookup && !rifValidationError && !rifSearching && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-amber-200 dark:border-amber-700 bg-amber-50/80 dark:bg-amber-950/80 backdrop-blur-sm">
                                                <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0" />
                                                <p className="text-[11px] font-medium text-amber-600/70 dark:text-amber-400/70">
                                                    RIF válido pero no encontrado en el sistema. Podrás ingresar los datos manualmente.
                                                </p>
                                            </motion.div>
                                        )}

                                        <AnimatePresence>
                                            {detected.type && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.25 }}
                                                    className={cn(
                                                        "flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500",
                                                        isNatural ? "border-sky-200 dark:border-sky-700 bg-sky-50/80 dark:bg-sky-950/80" :
                                                        "border-emerald-200 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/80"
                                                    )}
                                                >
                                                    {detected.valid ? (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                                        >
                                                            <CircleCheck className={cn("h-4 w-4 shrink-0", isNatural ? "text-sky-400" : "text-emerald-400")} />
                                                        </motion.div>
                                                    ) : (
                                                        <TriangleAlert className="h-4 w-4 shrink-0 text-slate-300" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className={cn("text-[11px] font-semibold", isNatural ? "text-sky-600" : "text-emerald-600")}>{detected.label}</p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">
                                                            {!detected.valid
                                                                ? (isJuridico ? "Formato: 12345678-9" : "1 a 10 dígitos")
                                                                : "Documento válido"
                                                            }
                                                        </p>
                                                    </div>
                                                    {isNatural ? <User className="h-4 w-4 shrink-0 text-sky-400/30" /> : <Building2 className="h-4 w-4 shrink-0 text-emerald-400/30" />}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {isNatural && detected.valid && cedulaSearching && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 rounded-2xl border border-sky-200 dark:border-sky-700 bg-sky-50/80 dark:bg-sky-950/80 backdrop-blur-sm">
                                                <Loader2 className="h-4 w-4 text-sky-400 animate-spin shrink-0" />
                                                <div>
                                                    <p className="text-[11px] font-semibold text-sky-600">Consultando SAIME...</p>
                                                    <p className="text-[10px] text-slate-400">Buscando datos del titular</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        <AnimatePresence>
                                            {isNatural && detected.valid && cedulaLookup && !cedulaSearching && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    className="rounded-2xl border border-sky-200 dark:border-sky-700 bg-sky-50/80 dark:bg-sky-950/80 p-4 backdrop-blur-sm overflow-hidden"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-sky-500/10">
                                                            <User className="h-4 w-4 text-sky-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{cedulaLookup.nombre} {cedulaLookup.apellido}</p>
                                                            <p className="text-[11px] text-sky-400/50 mt-0.5">
                                                                {fullDocument}
                                                                {cedulaLookup.estado && ` · ${cedulaLookup.estado}`}
                                                                {cedulaLookup.municipio && ` · ${cedulaLookup.municipio}`}
                                                            </p>
                                                        </div>
                                                        {cedulaLookup.estatus && (
                                                            <span className={cn(
                                                                "text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 ring-1",
                                                                cedulaLookup.estatus === 'VIGENTE' ? "text-emerald-400 bg-emerald-500/10 ring-emerald-500/10" : "text-amber-400 bg-amber-500/10 ring-amber-500/10"
                                                            )}>
                                                                {cedulaLookup.estatus}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(cedulaLookup.fechaNacimiento || cedulaLookup.sexo || cedulaLookup.nacionalidad) && (
                                                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-x-4 gap-y-2">
                                                            {cedulaLookup.nacionalidad && (
                                                                <p className="text-[10px] text-slate-500"><span className="text-sky-500/60 font-medium">Nac:</span> {cedulaLookup.nacionalidad}</p>
                                                            )}
                                                            {cedulaLookup.fechaNacimiento && (
                                                                <p className="text-[10px] text-slate-500"><span className="text-sky-500/60 font-medium">F. Nac:</span> {new Date(cedulaLookup.fechaNacimiento).toLocaleDateString('es-VE')}</p>
                                                            )}
                                                            {cedulaLookup.sexo && (
                                                                <p className="text-[10px] text-slate-500"><span className="text-sky-500/60 font-medium">Sexo:</span> {cedulaLookup.sexo}</p>
                                                            )}
                                                            {cedulaLookup.estadoCivil && (
                                                                <p className="text-[10px] text-slate-500"><span className="text-sky-500/60 font-medium">E. Civil:</span> {cedulaLookup.estadoCivil}</p>
                                                            )}
                                                            {cedulaLookup.parroquia && (
                                                                <p className="text-[10px] text-slate-500"><span className="text-sky-500/60 font-medium">Parroquia:</span> {cedulaLookup.parroquia}</p>
                                                            )}
                                                            {cedulaLookup.fechaEmision && (
                                                                <p className="text-[10px] text-slate-500"><span className="text-sky-500/60 font-medium">Emisión:</span> {new Date(cedulaLookup.fechaEmision).toLocaleDateString('es-VE')}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {isNatural && detected.valid && !cedulaLookup && !cedulaSearching && cedulaValidInfo && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/80 backdrop-blur-sm">
                                                <CircleCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-semibold text-emerald-600">{cedulaValidInfo.nacionalidad || 'Documento válido'}</p>
                                                    {cedulaValidInfo.edadEstimada && (
                                                        <p className="text-[10px] text-slate-400 mt-0.5">
                                                            Generación: {cedulaValidInfo.edadEstimada.generacion} ({cedulaValidInfo.edadEstimada.rangoEdad})
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {existsResult?.exists && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-amber-200 dark:border-amber-700 bg-amber-50/80 dark:bg-amber-950/80 backdrop-blur-sm">
                                                <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Documento ya registrado</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Ya existe una cuenta con este documento</p>
                                                </div>
                                                <Button size="sm" variant="outline" asChild className="shrink-0 rounded-lg text-[10px] font-semibold border-amber-500/15 text-amber-400/70 hover:bg-amber-500/10 hover:text-amber-300 bg-transparent">
                                                    <Link href="/login">Ir al Login</Link>
                                                </Button>
                                            </motion.div>
                                        )}

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            <Button
                                                onClick={handleContinueToModules}
                                                disabled={!isValidDoc || checking}
                                                className={cn(
                                                    "relative w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-500 overflow-hidden",
                                                    !isValidDoc && !checking
                                                        ? "bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700"
                                                        : "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:shadow-xl hover:from-sky-400 hover:to-blue-500"
                                                )}
                                            >
                                                {isValidDoc && !checking && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite]" />
                                                )}
                                                <span className="relative flex items-center justify-center gap-2">
                                                    {checking ? (
                                                        <><Loader2 className="h-4 w-4 animate-spin" /> Verificando...</>
                                                    ) : (
                                                        <>Continuar <ArrowRight className="h-4 w-4" /></>
                                                    )}
                                                </span>
                                            </Button>
                                        </motion.div>

                                        <div className="flex items-center justify-center gap-3 pt-3">
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck className="h-3 w-3 text-slate-300 dark:text-slate-500" />
                                                <p className="text-[11px] text-slate-400 tracking-wider font-medium">AES-256</p>
                                            </div>
                                            <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                                            <div className="flex items-center gap-1.5">
                                                <Hexagon className="h-3 w-3 text-slate-300 dark:text-slate-500" />
                                                <p className="text-[11px] text-slate-400 tracking-wider font-medium">SAIME</p>
                                            </div>
                                            <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                                            <div className="flex items-center gap-1.5">
                                                <CircuitBoard className="h-3 w-3 text-slate-300 dark:text-slate-500" />
                                                <p className="text-[11px] text-slate-400 tracking-wider font-medium">SENIAT</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === "modules" && (
                                    <motion.div
                                        key="modules"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="space-y-4"
                                    >
                                        <GlowingCard>
                                            <div className="p-4 flex items-center gap-3">
                                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", currentPrefix.bg)}>
                                                    <CurrentPrefixIcon className={cn("h-4 w-4", currentPrefix.color)} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate">
                                                        {fullDocument} · {detected.label}
                                                    </p>
                                                    {cedulaLookup && (
                                                        <p className="text-[10px] text-slate-400 truncate">{cedulaLookup.nombre} {cedulaLookup.apellido}</p>
                                                    )}
                                                    {rifLookup && (
                                                        <p className="text-[10px] text-slate-400 truncate">{rifLookup.razonSocial}</p>
                                                    )}
                                                </div>
                                                <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shrink-0 ring-1 ring-slate-200 dark:ring-slate-700", currentPrefix.bg, currentPrefix.color)}>
                                                    {currentPrefix.desc}
                                                </span>
                                            </div>
                                        </GlowingCard>

                                        <p className="text-[10px] text-slate-400 px-1 tracking-wide">
                                            {availableModules.length} {availableModules.length === 1 ? 'portal disponible' : 'portales disponibles'} para <span className={cn("font-semibold", currentPrefix.color)}>{currentPrefix.desc}</span>
                                        </p>

                                        <div className="space-y-2.5">
                                            {availableModules.map((mod, idx) => {
                                                const Icon = mod.icon;
                                                return (
                                                    <motion.button
                                                        key={mod.id}
                                                        initial={{ opacity: 0, y: 12 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                                        onClick={() => handleSelectModule(mod.route, mod.id)}
                                                        className="group relative w-full text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-400 overflow-hidden"
                                                    >
                                                        <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-600", mod.gradient)} />
                                                        <div className="relative p-4 sm:p-5 flex items-center gap-4">
                                                            <div className={cn(
                                                                "w-11 h-11 rounded-xl flex items-center justify-center ring-1 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                                                                mod.iconBg
                                                            )}>
                                                                <Icon className="h-5 w-5" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-0.5">
                                                                    <h3 className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{mod.title}</h3>
                                                                    {mod.badge && (
                                                                        <span className={cn("text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ring-1 ring-slate-200 dark:ring-slate-700", mod.badgeColor)}>
                                                                            {mod.badge}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors">{mod.description}</p>
                                                            </div>
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 group-hover:border-slate-300 dark:group-hover:border-slate-500 transition-all">
                                                                {navigatingModule === mod.id ? (
                                                                    <Loader2 className="h-3.5 w-3.5 text-sky-500 animate-spin" />
                                                                ) : (
                                                                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center text-[11px] text-slate-400 mt-8"
                            >
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/login" className="text-sky-500 hover:text-sky-600 transition-colors font-medium">
                                    Iniciar Sesión
                                </Link>
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-200%); }
                    50% { transform: translateX(200%); }
                    100% { transform: translateX(200%); }
                }
                @keyframes pulse-ring {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.15); }
                    50% { box-shadow: 0 0 0 6px rgba(56, 189, 248, 0); }
                }
            `}</style>
        </div>
    );
}
