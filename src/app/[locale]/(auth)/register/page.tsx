"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User, Building2, ArrowRight, ChevronLeft, ShieldCheck,
    Search, CheckCircle2, AlertCircle, Fingerprint, Loader2,
    Signal, Gavel, ArrowLeft,
    ChevronDown, Globe, Landmark, FileSignature, Building, UserCircle,
    ShoppingCart, Sparkles, Lock, Recycle,
    Calculator, Brain, Smartphone, Cpu, Shield, BarChart3, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
    { icon: Calculator, label: "Contabilidad VEN-NIF", color: "text-sky-400", bg: "bg-sky-500/10" },
    { icon: Shield, label: "Cifrado AES-256", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Brain, label: "Inteligencia Artificial", color: "text-violet-400", bg: "bg-violet-500/10" },
    { icon: Smartphone, label: "Mi Línea 5G", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: BarChart3, label: "Reportes SENIAT", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Zap, label: "Automatización Total", color: "text-rose-400", bg: "bg-rose-500/10" },
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

function FloatingOrb({ className }: { className?: string }) {
    return <div className={cn("absolute rounded-full blur-[100px] pointer-events-none", className)} />;
}

function BrandingPanel() {
    return (
        <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#060918] via-[#0a1128] to-[#060918] p-10 xl:p-14">
            <FloatingOrb className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/[0.08]" />
            <FloatingOrb className="bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/[0.06]" />
            <FloatingOrb className="top-[40%] right-[10%] w-[300px] h-[300px] bg-violet-600/[0.05]" />

            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
                        <Cpu className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white tracking-widest">SYSTEM KYRON</p>
                        <p className="text-[10px] text-white/30 tracking-widest uppercase">Inteligencia Corporativa</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
                        Tu ecosistema<br />
                        <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            corporativo integral
                        </span>
                    </h2>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                        Cero riesgo fiscal, control operativo total. La plataforma diseñada para Venezuela.
                    </p>
                </motion.div>
            </div>

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-2 gap-3 mb-10"
                >
                    {BRANDING_FEATURES.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={feat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group"
                            >
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", feat.bg)}>
                                    <Icon className={cn("h-4 w-4", feat.color)} />
                                </div>
                                <span className="text-xs font-medium text-white/50 group-hover:text-white/70 transition-colors">{feat.label}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex items-center gap-6"
                >
                    <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-emerald-400/50" />
                        <span className="text-[10px] text-white/25 tracking-wider">AES-256</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-sky-400/50" />
                        <span className="text-[10px] text-white/25 tracking-wider">SENIAT</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-violet-400/50" />
                        <span className="text-[10px] text-white/25 tracking-wider">VEN-NIF</span>
                    </div>
                </motion.div>
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

    const handleSelectModule = useCallback((moduleRoute: string) => {
        const params = new URLSearchParams({ doc: fullDocument });
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
        <div className="min-h-screen flex bg-[#060918]">
            <div className="hidden lg:block lg:w-[45%] xl:w-[42%]">
                <div className="sticky top-0 h-screen">
                    <BrandingPanel />
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                <FloatingOrb className="top-[-5%] right-[-10%] w-[500px] h-[500px] bg-sky-600/[0.06] lg:bg-sky-600/[0.04]" />
                <FloatingOrb className="bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-emerald-600/[0.04]" />

                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />

                <div className="relative z-10 min-h-screen flex flex-col">
                    <nav className="flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
                        {step === "identify" ? (
                            <Link href="/" className="group flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
                                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                                <span className="font-medium">Inicio</span>
                            </Link>
                        ) : (
                            <button onClick={() => setStep("identify")} className="group flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
                                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                                <span className="font-medium">Cambiar Documento</span>
                            </button>
                        )}
                        <div className="flex items-center gap-2 text-white/20 text-xs font-medium tracking-wider">
                            <Lock className="h-3 w-3" />
                            <span>KYRON v2.8.5</span>
                        </div>
                    </nav>

                    <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pb-10">
                        <div className="w-full max-w-lg">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: step === "modules" ? 30 : -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-center mb-8"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-5">
                                    <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                                    <span className="text-xs font-semibold text-white/50 tracking-wide">
                                        {step === "identify" ? "Paso 1 de 3 — Identificación" : "Paso 2 de 3 — Portal"}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                                    {step === "identify" ? "Crea tu cuenta" : "Elige tu portal"}
                                </h1>
                                <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                                    {step === "identify"
                                        ? "Ingresa tu documento de identidad para comenzar el proceso de registro"
                                        : "Selecciona el módulo que mejor se adapte a tus necesidades"
                                    }
                                </p>
                            </motion.div>

                            <div className="flex items-center gap-2 mb-8 px-2">
                                {STEP_LABELS.map((label, n) => {
                                    const isActive = n === currentStepIdx;
                                    const isDone = n < currentStepIdx;
                                    return (
                                        <div key={n} className="flex-1">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 shrink-0",
                                                    isDone ? "bg-gradient-to-br from-sky-500 to-emerald-500 text-white" :
                                                    isActive ? "bg-sky-500/20 text-sky-400 ring-2 ring-sky-500/30" :
                                                    "bg-white/[0.04] text-white/20"
                                                )}>
                                                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : n + 1}
                                                </div>
                                                <span className={cn(
                                                    "text-[10px] font-semibold tracking-wider uppercase transition-colors hidden sm:block",
                                                    isActive ? "text-white/60" : isDone ? "text-emerald-400/50" : "text-white/15"
                                                )}>
                                                    {label}
                                                </span>
                                            </div>
                                            <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                                                <motion.div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        isDone ? "bg-gradient-to-r from-sky-500 to-emerald-500" :
                                                        isActive ? "bg-gradient-to-r from-sky-500 to-sky-400" :
                                                        "bg-transparent"
                                                    )}
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: isDone ? "100%" : isActive ? "50%" : "0%" }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
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
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.35 }}
                                        className="space-y-4"
                                    >
                                        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 backdrop-blur-sm">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center ring-1 transition-all duration-300",
                                                    isNatural ? "bg-sky-500/10 ring-sky-500/20" :
                                                    isJuridico ? "bg-emerald-500/10 ring-emerald-500/20" :
                                                    "bg-white/[0.04] ring-white/[0.08]"
                                                )}>
                                                    <Fingerprint className={cn(
                                                        "h-5 w-5 transition-colors",
                                                        isNatural ? "text-sky-400" :
                                                        isJuridico ? "text-emerald-400" :
                                                        "text-white/30"
                                                    )} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">Documento de identidad</p>
                                                    <p className="text-xs text-white/30">Cédula de identidad o RIF empresarial</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <div ref={prefixRef} className="relative shrink-0" onKeyDown={handlePrefixKeyDown}>
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
                                                            "flex items-center gap-2 h-12 pl-3 pr-2 rounded-xl border transition-all duration-200 cursor-pointer",
                                                            "bg-white/[0.03] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50",
                                                            prefixOpen ? "border-white/20" : "border-white/[0.08] hover:border-white/15"
                                                        )}
                                                    >
                                                        <div className={cn("flex items-center justify-center w-7 h-7 rounded-lg", currentPrefix.bg)}>
                                                            <CurrentPrefixIcon className={cn("h-3.5 w-3.5", currentPrefix.color)} />
                                                        </div>
                                                        <span className="text-base font-bold text-white w-5 text-center">{currentPrefix.value}</span>
                                                        <ChevronDown className={cn("h-3.5 w-3.5 text-white/30 transition-transform duration-200", prefixOpen && "rotate-180")} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {prefixOpen && (
                                                            <motion.div
                                                                id="prefix-listbox"
                                                                role="listbox"
                                                                aria-label="Tipo de documento"
                                                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute top-full left-0 mt-2 z-50 w-[240px] rounded-xl border border-white/10 bg-[#0c1128]/95 backdrop-blur-xl shadow-2xl shadow-black/50"
                                                            >
                                                                <div className="p-1.5">
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
                                                                                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer",
                                                                                    isActive ? `bg-white/[0.06]` :
                                                                                    isFocused ? "bg-white/[0.04]" :
                                                                                    "hover:bg-white/[0.04]"
                                                                                )}
                                                                            >
                                                                                <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg", p.bg)}>
                                                                                    <OptionIcon className={cn("h-4 w-4", p.color)} />
                                                                                </div>
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className={cn("text-sm font-bold", isActive ? p.color : "text-white/80")}>{p.value}</span>
                                                                                        <span className="text-xs text-white/40">{p.desc}</span>
                                                                                    </div>
                                                                                </div>
                                                                                {isActive && <CheckCircle2 className={cn("h-4 w-4 shrink-0", p.color)} />}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                <div className="flex-1 relative">
                                                    <Input
                                                        value={docNumber}
                                                        onChange={e => handleNumberChange(e.target.value)}
                                                        placeholder={["J", "G", "C", "F"].includes(prefix) ? "50328471-6" : "18745632"}
                                                        ref={inputRef}
                                                        className="h-12 text-lg font-semibold rounded-xl border border-white/[0.08] tracking-wider focus:border-sky-500/40 transition-colors pl-4 bg-white/[0.03] text-white placeholder:text-white/15"
                                                    />
                                                    {docNumber && (
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <span className="text-[10px] font-semibold text-white/20 uppercase tracking-widest">
                                                                {["J", "G", "C", "F"].includes(prefix) ? "RIF" : "CI"}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {isJuridico && detected.valid && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={handleRifSearch}
                                                        disabled={rifSearching}
                                                        className={cn(
                                                            "h-12 px-4 rounded-xl font-semibold text-xs tracking-wider shrink-0 transition-all duration-300 border",
                                                            "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white/80 hover:border-white/15"
                                                        )}
                                                    >
                                                        {rifSearching ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <><Search className="h-4 w-4 mr-1.5" /> Buscar</>
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {rifLookup && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 overflow-hidden"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                            <Building2 className="h-4 w-4 text-emerald-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-white truncate">{rifLookup.razonSocial}</p>
                                                            <p className="text-xs text-emerald-400/70 mt-0.5">
                                                                {rifLookup.tipoEmpresa || 'Empresa registrada'}
                                                                {rifLookup.estado && ` · ${rifLookup.estado}`}
                                                            </p>
                                                            {rifLookup.actividadEconomica && (
                                                                <p className="text-xs text-white/30 mt-1">{rifLookup.actividadEconomica}</p>
                                                            )}
                                                        </div>
                                                        {rifLookup.statusFiscal && (
                                                            <span className={cn(
                                                                "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md shrink-0",
                                                                rifLookup.statusFiscal === 'ACTIVO' ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                                                            )}>
                                                                {rifLookup.statusFiscal}
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {rifSearched && rifValidationError && !rifSearching && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-red-500/15 bg-red-500/[0.04]">
                                                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                                                <p className="text-xs font-medium text-red-300/80">{rifValidationError}</p>
                                            </motion.div>
                                        )}

                                        {rifSearched && !rifLookup && !rifValidationError && !rifSearching && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04]">
                                                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                                                <p className="text-xs font-medium text-amber-300/70">
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
                                                        "flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300",
                                                        isNatural ? "border-sky-500/15 bg-sky-500/[0.04]" :
                                                        "border-emerald-500/15 bg-emerald-500/[0.04]"
                                                    )}
                                                >
                                                    {detected.valid ? (
                                                        <CheckCircle2 className={cn("h-4 w-4 shrink-0", isNatural ? "text-sky-400" : "text-emerald-400")} />
                                                    ) : (
                                                        <AlertCircle className="h-4 w-4 shrink-0 text-white/20" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className={cn("text-xs font-semibold", isNatural ? "text-sky-300/80" : "text-emerald-300/80")}>{detected.label}</p>
                                                        <p className="text-[11px] text-white/25 mt-0.5">
                                                            {!detected.valid
                                                                ? (isJuridico ? "Formato: 12345678-9" : "1 a 10 dígitos")
                                                                : "Documento válido"
                                                            }
                                                        </p>
                                                    </div>
                                                    {isNatural ? <User className="h-4 w-4 shrink-0 text-sky-400/40" /> : <Building2 className="h-4 w-4 shrink-0 text-emerald-400/40" />}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {isNatural && detected.valid && cedulaSearching && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 rounded-2xl border border-sky-500/15 bg-sky-500/[0.04]">
                                                <Loader2 className="h-4 w-4 text-sky-400 animate-spin shrink-0" />
                                                <div>
                                                    <p className="text-xs font-semibold text-sky-300/80">Consultando SAIME...</p>
                                                    <p className="text-[11px] text-white/20">Buscando datos del titular</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        <AnimatePresence>
                                            {isNatural && detected.valid && cedulaLookup && !cedulaSearching && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-4 overflow-hidden"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                            <User className="h-4 w-4 text-sky-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-white truncate">{cedulaLookup.nombre} {cedulaLookup.apellido}</p>
                                                            <p className="text-xs text-sky-400/60 mt-0.5">
                                                                {fullDocument}
                                                                {cedulaLookup.estado && ` · ${cedulaLookup.estado}`}
                                                                {cedulaLookup.municipio && ` · ${cedulaLookup.municipio}`}
                                                            </p>
                                                        </div>
                                                        {cedulaLookup.estatus && (
                                                            <span className={cn(
                                                                "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md shrink-0",
                                                                cedulaLookup.estatus === 'VIGENTE' ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                                                            )}>
                                                                {cedulaLookup.estatus}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(cedulaLookup.fechaNacimiento || cedulaLookup.sexo || cedulaLookup.nacionalidad) && (
                                                        <div className="mt-3 pt-3 border-t border-white/[0.04] grid grid-cols-2 gap-x-4 gap-y-1.5">
                                                            {cedulaLookup.nacionalidad && (
                                                                <p className="text-[11px] text-white/30"><span className="text-sky-400/50">Nac:</span> {cedulaLookup.nacionalidad}</p>
                                                            )}
                                                            {cedulaLookup.fechaNacimiento && (
                                                                <p className="text-[11px] text-white/30"><span className="text-sky-400/50">F. Nac:</span> {new Date(cedulaLookup.fechaNacimiento).toLocaleDateString('es-VE')}</p>
                                                            )}
                                                            {cedulaLookup.sexo && (
                                                                <p className="text-[11px] text-white/30"><span className="text-sky-400/50">Sexo:</span> {cedulaLookup.sexo}</p>
                                                            )}
                                                            {cedulaLookup.estadoCivil && (
                                                                <p className="text-[11px] text-white/30"><span className="text-sky-400/50">E. Civil:</span> {cedulaLookup.estadoCivil}</p>
                                                            )}
                                                            {cedulaLookup.parroquia && (
                                                                <p className="text-[11px] text-white/30"><span className="text-sky-400/50">Parroquia:</span> {cedulaLookup.parroquia}</p>
                                                            )}
                                                            {cedulaLookup.fechaEmision && (
                                                                <p className="text-[11px] text-white/30"><span className="text-sky-400/50">Emisión:</span> {new Date(cedulaLookup.fechaEmision).toLocaleDateString('es-VE')}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {isNatural && detected.valid && !cedulaLookup && !cedulaSearching && cedulaValidInfo && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04]">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-emerald-300/80">{cedulaValidInfo.nacionalidad || 'Documento válido'}</p>
                                                    {cedulaValidInfo.edadEstimada && (
                                                        <p className="text-[11px] text-white/25 mt-0.5">
                                                            Generación: {cedulaValidInfo.edadEstimada.generacion} ({cedulaValidInfo.edadEstimada.rangoEdad})
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {existsResult?.exists && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04]">
                                                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-xs font-semibold text-amber-300/80">Documento ya registrado</p>
                                                    <p className="text-[11px] text-white/25 mt-0.5">Ya existe una cuenta con este documento</p>
                                                </div>
                                                <Button size="sm" variant="outline" asChild className="shrink-0 rounded-lg text-xs font-medium border-amber-500/20 text-amber-400/80 hover:bg-amber-500/10 hover:text-amber-300 bg-transparent">
                                                    <Link href="/login">Ir al Login</Link>
                                                </Button>
                                            </motion.div>
                                        )}

                                        <Button
                                            onClick={handleContinueToModules}
                                            disabled={!isValidDoc || checking}
                                            className={cn(
                                                "w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300",
                                                !isValidDoc && !checking
                                                    ? "bg-white/[0.04] text-white/20 border border-white/[0.06] cursor-not-allowed hover:bg-white/[0.04]"
                                                    : "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 hover:from-sky-400 hover:to-blue-500"
                                            )}
                                        >
                                            {checking ? (
                                                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verificando...</>
                                            ) : (
                                                <><span>Continuar</span> <ArrowRight className="h-4 w-4 ml-2" /></>
                                            )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 pt-2">
                                            <ShieldCheck className="h-3 w-3 text-white/10" />
                                            <p className="text-[10px] text-white/15 tracking-wider">
                                                Cifrado AES-256 · Verificación SAIME/SENIAT
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {step === "modules" && (
                                    <motion.div
                                        key="modules"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.35 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", currentPrefix.bg)}>
                                                <CurrentPrefixIcon className={cn("h-4 w-4", currentPrefix.color)} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-white/80 truncate">
                                                    {fullDocument} · {detected.label}
                                                </p>
                                                {cedulaLookup && (
                                                    <p className="text-[11px] text-white/30 truncate">{cedulaLookup.nombre} {cedulaLookup.apellido}</p>
                                                )}
                                                {rifLookup && (
                                                    <p className="text-[11px] text-white/30 truncate">{rifLookup.razonSocial}</p>
                                                )}
                                            </div>
                                            <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shrink-0", currentPrefix.bg, currentPrefix.color)}>
                                                {currentPrefix.desc}
                                            </span>
                                        </div>

                                        <p className="text-[11px] text-white/25 px-1">
                                            {availableModules.length} {availableModules.length === 1 ? 'portal disponible' : 'portales disponibles'} para <span className={cn("font-semibold", currentPrefix.color)}>{currentPrefix.desc}</span>
                                        </p>

                                        <div className="space-y-3">
                                            {availableModules.map((mod, idx) => {
                                                const Icon = mod.icon;
                                                return (
                                                    <motion.button
                                                        key={mod.id}
                                                        initial={{ opacity: 0, y: 15 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: idx * 0.06 }}
                                                        onClick={() => handleSelectModule(mod.route)}
                                                        className="group relative w-full text-left rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 overflow-hidden"
                                                    >
                                                        <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", mod.gradient)} />
                                                        <div className="relative p-5 flex items-center gap-4">
                                                            <div className={cn(
                                                                "w-11 h-11 rounded-xl flex items-center justify-center ring-1 shrink-0 transition-all duration-300 group-hover:scale-105",
                                                                mod.iconBg
                                                            )}>
                                                                <Icon className="h-5 w-5" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-0.5">
                                                                    <h3 className="text-sm font-semibold text-white">{mod.title}</h3>
                                                                    {mod.badge && (
                                                                        <span className={cn("text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded", mod.badgeColor)}>
                                                                            {mod.badge}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-white/30 leading-relaxed line-clamp-2">{mod.description}</p>
                                                            </div>
                                                            <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] transition-colors">
                                                                <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <p className="text-center text-xs text-white/20 mt-6">
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/login" className="text-sky-400/60 hover:text-sky-400 transition-colors font-medium">
                                    Iniciar Sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
