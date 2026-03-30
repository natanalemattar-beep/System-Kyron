"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User, Building2, ArrowRight, ChevronLeft, ShieldCheck,
    Search, CheckCircle2, AlertCircle, Fingerprint, Loader2,
    Calculator, Users, Signal, Recycle, Gavel, ArrowLeft,
    ChevronDown, Globe, Landmark, FileSignature, Building, UserCircle,
    ShoppingCart, Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    { value: "V", label: "V", desc: "Venezolano", icon: UserCircle, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", ring: "ring-blue-500/30" },
    { value: "E", label: "E", desc: "Extranjero", icon: Globe, color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20", ring: "ring-cyan-500/30" },
    { value: "J", label: "J", desc: "Jurídico / Fundación", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", ring: "ring-emerald-500/30" },
    { value: "G", label: "G", desc: "Gobierno", icon: Landmark, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", ring: "ring-amber-500/30" },
    { value: "P", label: "P", desc: "Pasaporte", icon: Globe, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20", ring: "ring-violet-500/30" },
    { value: "C", label: "C", desc: "Comunal", icon: Building, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", ring: "ring-orange-500/30" },
    { value: "F", label: "F", desc: "Firma Personal", icon: FileSignature, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", ring: "ring-rose-500/30" },
];

interface ModuleOption {
    id: string;
    route: string;
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    forTypes: DetectedType[];
}

const MODULES: ModuleOption[] = [
    {
        id: "natural",
        route: "natural",
        icon: User,
        title: "Persona Natural",
        description: "Registro personal con cédula, datos de contacto y ubicación",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10 hover:bg-blue-500/15",
        borderColor: "border-blue-500/20 hover:border-blue-500/40",
        forTypes: ["natural"],
    },
    {
        id: "asesoria-contable",
        route: "asesoria-contable",
        icon: Building2,
        title: "Asesoría Contable",
        description: "Contabilidad, RRHH, marketing, facturación, legal y más — todo integrado en un solo módulo empresarial",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 hover:bg-emerald-500/15",
        borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
        forTypes: ["juridico"],
    },
    {
        id: "telecom",
        route: "telecom",
        icon: Signal,
        title: "Mi Línea",
        description: "Planes de telefonía, datos móviles y servicios de conectividad",
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10 hover:bg-cyan-500/15",
        borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
        forTypes: ["natural", "juridico"],
    },
];

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
        } catch {
        }
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

    const availableModules = MODULES.filter(m => detected.type && m.forTypes.includes(detected.type));
    const currentPrefix = ALL_PREFIXES.find(p => p.value === prefix) ?? ALL_PREFIXES[0];
    const CurrentPrefixIcon = currentPrefix.icon;

    const FEATURES = [
        { icon: ShieldCheck, title: "Cifrado AES-256", desc: "Tus datos protegidos con encriptación de grado militar" },
        { icon: Fingerprint, title: "Verificación Biométrica", desc: "Autenticación segura con cédula o RIF venezolano" },
        { icon: Building2, title: "Multi-Módulo", desc: "Contabilidad, RRHH, Legal, Telecom y más en un solo lugar" },
        { icon: Calculator, title: "Cumplimiento Fiscal", desc: "VEN-NIF, IVA 16%, IGTF 3% e ISLR 34% automatizados" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/[0.02] relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                <div className="container mx-auto px-4 pt-6 pb-2 max-w-7xl">
                    <div className="mb-4 lg:mb-0">
                        {step === "identify" ? (
                            <Button variant="ghost" asChild className="group rounded-xl h-9 px-4 text-xs font-bold uppercase tracking-widest hover:bg-secondary/50">
                                <Link href="/"><ChevronLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Volver</Link>
                            </Button>
                        ) : (
                            <Button variant="ghost" onClick={() => setStep("identify")} className="group rounded-xl h-9 px-4 text-xs font-bold uppercase tracking-widest hover:bg-secondary/50">
                                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Cambiar Documento
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex-1 container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-16 py-4 lg:py-0">

                    <div className="hidden lg:flex flex-col justify-center flex-1 min-w-0 max-w-xl lg:pr-4 xl:pr-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6 w-fit">
                            <ShieldCheck className="h-3 w-3" /> Registro Cifrado AES-256
                        </div>
                        <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight leading-[0.95] mb-5">
                            <span className="text-foreground">Tu empresa,</span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent italic">otro nivel</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-wide mb-10 max-w-md">
                            {step === "identify"
                                ? "Regístrate con tu cédula o RIF y accede a la plataforma corporativa más avanzada de Venezuela"
                                : "Elige tu módulo y desbloquea herramientas diseñadas para tu tipo de negocio"
                            }
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {FEATURES.map((f, i) => {
                                const FIcon = f.icon;
                                return (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border border-border/20 bg-card/40 backdrop-blur-sm overflow-hidden">
                                        <div className="shrink-0 p-2 rounded-xl bg-primary/5 border border-primary/10">
                                            <FIcon className="h-4 w-4 text-primary/70" />
                                        </div>
                                        <div className="min-w-0 overflow-hidden">
                                            <p className="text-xs font-bold uppercase tracking-wide text-foreground mb-0.5 truncate">{f.title}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className="flex-1 lg:max-w-lg xl:max-w-xl w-full">

                        <header className="text-center mb-8 lg:hidden">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
                                <ShieldCheck className="h-3 w-3" /> Registro Cifrado AES-256
                            </div>
                            <p aria-hidden="true" className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-4">
                                <span className="text-foreground">Tu empresa, </span>
                                <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent italic">otro nivel</span>
                            </p>
                            <p className="text-xs text-muted-foreground max-w-lg mx-auto font-bold uppercase tracking-wide">
                                {step === "identify"
                                    ? "Regístrate con tu cédula o RIF para comenzar"
                                    : "Elige tu módulo y desbloquea herramientas"
                                }
                            </p>
                        </header>

                {step === "identify" && (
                    <section className="w-full mb-8">
                        <div className={cn(
                            "relative overflow-visible rounded-3xl border-2 bg-card/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl transition-all duration-500",
                            isNatural ? "border-blue-500/30 shadow-blue-500/5" :
                            isJuridico ? "border-emerald-500/30 shadow-emerald-500/5" :
                            "border-border/30"
                        )}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={cn(
                                    "p-3 rounded-2xl border transition-all duration-300",
                                    isNatural ? "bg-blue-500/10 border-blue-500/20" :
                                    isJuridico ? "bg-emerald-500/10 border-emerald-500/20" :
                                    "bg-primary/5 border-border/20"
                                )}>
                                    <Fingerprint className={cn(
                                        "h-6 w-6 transition-colors",
                                        isNatural ? "text-blue-500" :
                                        isJuridico ? "text-emerald-500" :
                                        "text-primary/50"
                                    )} />
                                </div>
                                <div>
                                    <h2 className="text-base font-black uppercase tracking-tight">
                                        Paso 1 — Identificación
                                    </h2>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Cédula de identidad o RIF
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-4">
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
                                            "flex items-center gap-2 h-12 pl-3 pr-2 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                                            "bg-background hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                            prefixOpen
                                                ? `${currentPrefix.border} ${currentPrefix.ring} ring-2`
                                                : "border-border/40 hover:border-border/60"
                                        )}
                                    >
                                        <div className={cn("flex items-center justify-center w-7 h-7 rounded-lg", currentPrefix.bg, currentPrefix.border, "border")}>
                                            <CurrentPrefixIcon className={cn("h-3.5 w-3.5", currentPrefix.color)} />
                                        </div>
                                        <span className="text-base font-black text-foreground w-5 text-center">{currentPrefix.value}</span>
                                        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200", prefixOpen && "rotate-180")} />
                                    </button>

                                    {prefixOpen && (
                                        <div
                                            id="prefix-listbox"
                                            role="listbox"
                                            aria-label="Tipo de documento"
                                            className="absolute top-full left-0 mt-2 z-50 w-[220px] rounded-2xl border border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-top-2 duration-200"
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
                                                                "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer",
                                                                isActive
                                                                    ? `${p.bg} ${p.border} border`
                                                                    : isFocused
                                                                        ? "border border-primary/40 bg-accent/40"
                                                                        : "border border-transparent hover:bg-accent/60"
                                                            )}
                                                        >
                                                            <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg border", p.bg, p.border)}>
                                                                <OptionIcon className={cn("h-4 w-4", p.color)} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={cn("text-sm font-bold", isActive ? p.color : "text-foreground")}>{p.value}</span>
                                                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{p.desc}</span>
                                                                </div>
                                                            </div>
                                                            {isActive && <CheckCircle2 className={cn("h-4 w-4 shrink-0", p.color)} />}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="px-4 py-2 border-t border-border/20">
                                                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider">Selecciona tipo de documento</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 relative">
                                    <Input
                                        value={docNumber}
                                        onChange={e => handleNumberChange(e.target.value)}
                                        placeholder={["J", "G", "C", "F"].includes(prefix) ? "50328471-6" : "18745632"}
                                        ref={inputRef}
                                        className="h-12 text-lg font-bold rounded-xl border-2 border-border/40 tracking-wider focus:border-primary/40 transition-colors pl-4"
                                    />
                                    {docNumber && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <span className="text-xs font-bold text-muted-foreground/50 uppercase tracking-wider">
                                                {["J", "G", "C", "F"].includes(prefix) ? "RIF" : "Cédula"}
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
                                            "h-12 px-5 rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 transition-all duration-300 border-2",
                                            rifLookup
                                                ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10"
                                                : "border-border/40 hover:border-primary/30 hover:bg-primary/5"
                                        )}
                                    >
                                        {rifSearching ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <><Search className="h-4 w-4 mr-1.5" /> Consultar</>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {rifLookup && (
                                <div className="rounded-2xl border bg-emerald-500/5 border-emerald-500/20 mb-4 transition-all duration-300 overflow-hidden animate-in slide-in-from-top-2">
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-foreground truncate">{rifLookup.razonSocial}</p>
                                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                                {rifLookup.tipoEmpresa || 'Empresa registrada'} 
                                                {rifLookup.estado && ` · ${rifLookup.estado}`}
                                                {rifLookup.municipio && ` · ${rifLookup.municipio}`}
                                            </p>
                                        </div>
                                        {rifLookup.statusFiscal && (
                                            <span className={cn(
                                                "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg border shrink-0",
                                                rifLookup.statusFiscal === 'ACTIVO'
                                                    ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
                                                    : "text-amber-600 bg-amber-500/10 border-amber-500/20"
                                            )}>
                                                {rifLookup.statusFiscal}
                                            </span>
                                        )}
                                        <Building2 className="h-5 w-5 text-emerald-500/60 shrink-0" />
                                    </div>
                                    {(rifLookup.actividadEconomica || rifLookup.direccion || rifLookup.telefono) && (
                                        <div className="px-4 pb-3 pt-0 grid grid-cols-1 gap-1.5">
                                            {rifLookup.actividadEconomica && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-emerald-600/80">Actividad:</span>{' '}
                                                    <span className="font-medium">{rifLookup.actividadEconomica}</span>
                                                </p>
                                            )}
                                            {rifLookup.direccion && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-emerald-600/80">Dirección:</span>{' '}
                                                    <span className="font-medium">{rifLookup.direccion}</span>
                                                </p>
                                            )}
                                            {rifLookup.telefono && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-emerald-600/80">Teléfono:</span>{' '}
                                                    <span className="font-medium">{rifLookup.telefono}</span>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {rifSearched && rifValidationError && !rifSearching && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-red-500/5 border-red-500/15 mb-4 transition-all duration-300">
                                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                                    <p className="text-xs font-bold text-red-600">
                                        {rifValidationError}
                                    </p>
                                </div>
                            )}

                            {rifSearched && !rifLookup && !rifValidationError && !rifSearching && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-amber-500/5 border-amber-500/15 mb-4 transition-all duration-300">
                                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                                    <p className="text-xs font-bold text-amber-600">
                                        RIF válido pero no encontrado en el sistema. Podrás ingresar los datos manualmente.
                                    </p>
                                </div>
                            )}

                            {detected.type && (
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl border mb-4 transition-all duration-300",
                                    isNatural ? "bg-blue-500/5 border-blue-500/15 text-blue-600" :
                                    "bg-emerald-500/5 border-emerald-500/15 text-emerald-600"
                                )}>
                                    {detected.valid ? (
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                    ) : (
                                        <AlertCircle className="h-4 w-4 shrink-0 opacity-50" />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-wide">
                                            {detected.label}
                                        </p>
                                        <p className="text-xs font-medium opacity-60 uppercase tracking-wider">
                                            {!detected.valid
                                                ? (isJuridico ? "Formato requerido: 12345678-9" : "Formato requerido: 1 a 10 dígitos")
                                                : "Documento válido — continúa para elegir módulo"
                                            }
                                        </p>
                                    </div>
                                    {isNatural ? (
                                        <User className="h-5 w-5 shrink-0 opacity-60" />
                                    ) : (
                                        <Building2 className="h-5 w-5 shrink-0 opacity-60" />
                                    )}
                                </div>
                            )}

                            {isNatural && detected.valid && cedulaSearching && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-blue-500/5 border-blue-500/15 mb-4 animate-in fade-in duration-300">
                                    <Loader2 className="h-4 w-4 text-blue-500 animate-spin shrink-0" />
                                    <p className="text-xs font-bold text-blue-500">
                                        Consultando SAIME...
                                    </p>
                                </div>
                            )}

                            {isNatural && detected.valid && cedulaLookup && !cedulaSearching && (
                                <div className="rounded-2xl border bg-blue-500/5 border-blue-500/20 mb-4 animate-in slide-in-from-top-2 duration-300 overflow-hidden">
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-foreground truncate">
                                                {cedulaLookup.nombre} {cedulaLookup.apellido}
                                            </p>
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                                                {fullDocument}
                                                {cedulaLookup.estado && ` · ${cedulaLookup.estado}`}
                                                {cedulaLookup.municipio && ` · ${cedulaLookup.municipio}`}
                                            </p>
                                        </div>
                                        {cedulaLookup.estatus && (
                                            <span className={cn(
                                                "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg border shrink-0",
                                                cedulaLookup.estatus === 'VIGENTE'
                                                    ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
                                                    : "text-amber-600 bg-amber-500/10 border-amber-500/20"
                                            )}>
                                                {cedulaLookup.estatus}
                                            </span>
                                        )}
                                        <User className="h-5 w-5 text-blue-500/60 shrink-0" />
                                    </div>
                                    {(cedulaLookup.fechaNacimiento || cedulaLookup.sexo || cedulaLookup.nacionalidad || cedulaLookup.parroquia) && (
                                        <div className="px-4 pb-3 pt-0 grid grid-cols-2 gap-x-4 gap-y-1.5">
                                            {cedulaLookup.nacionalidad && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-blue-600/80">Nac:</span>{' '}
                                                    <span className="font-medium">{cedulaLookup.nacionalidad}</span>
                                                </p>
                                            )}
                                            {cedulaLookup.fechaNacimiento && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-blue-600/80">F. Nac:</span>{' '}
                                                    <span className="font-medium">{new Date(cedulaLookup.fechaNacimiento).toLocaleDateString('es-VE')}</span>
                                                </p>
                                            )}
                                            {cedulaLookup.sexo && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-blue-600/80">Sexo:</span>{' '}
                                                    <span className="font-medium">{cedulaLookup.sexo}</span>
                                                </p>
                                            )}
                                            {cedulaLookup.estadoCivil && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-blue-600/80">E. Civil:</span>{' '}
                                                    <span className="font-medium">{cedulaLookup.estadoCivil}</span>
                                                </p>
                                            )}
                                            {cedulaLookup.parroquia && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-blue-600/80">Parroquia:</span>{' '}
                                                    <span className="font-medium">{cedulaLookup.parroquia}</span>
                                                </p>
                                            )}
                                            {cedulaLookup.fechaEmision && (
                                                <p className="text-xs text-muted-foreground">
                                                    <span className="font-semibold uppercase tracking-wider text-blue-600/80">Emisión:</span>{' '}
                                                    <span className="font-medium">{new Date(cedulaLookup.fechaEmision).toLocaleDateString('es-VE')}</span>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {isNatural && detected.valid && !cedulaLookup && !cedulaSearching && cedulaValidInfo && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-emerald-500/5 border-emerald-500/15 mb-4 animate-in fade-in duration-300">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                            {cedulaValidInfo.nacionalidad || 'Documento válido'}
                                        </p>
                                        {cedulaValidInfo.edadEstimada && (
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Generación estimada: {cedulaValidInfo.edadEstimada.generacion} ({cedulaValidInfo.edadEstimada.rangoEdad})
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {existsResult?.exists && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-amber-500/5 border-amber-500/15 text-amber-600 mb-4">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-wide">
                                            Documento ya registrado
                                        </p>
                                        <p className="text-xs font-medium opacity-60">
                                            Ya existe una cuenta con este documento. ¿Deseas iniciar sesión?
                                        </p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild className="shrink-0 rounded-xl text-xs font-bold uppercase tracking-wider border-amber-500/30 hover:bg-amber-500/10">
                                        <Link href="/login">Ir al Login</Link>
                                    </Button>
                                </div>
                            )}

                            <Button
                                onClick={handleContinueToModules}
                                disabled={!isValidDoc || checking}
                                className={cn(
                                    "w-full h-14 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg",
                                    !isValidDoc && !checking
                                        ? "bg-muted text-muted-foreground/50 border border-border/30 shadow-none cursor-not-allowed"
                                        : isNatural ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:shadow-blue-600/40" :
                                          isJuridico ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 hover:shadow-emerald-600/40" :
                                          "bg-primary hover:bg-primary/90 text-primary-foreground"
                                )}
                            >
                                {checking ? (
                                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verificando...</>
                                ) : (
                                    <><ArrowRight className="h-4 w-4 mr-2" /> Continuar</>
                                )}
                            </Button>
                        </div>
                    </section>
                )}

                {step === "modules" && (
                    <section className="w-full mb-8">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                            <div className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-black",
                                isNatural ? "bg-blue-500/10 border-blue-500/20 text-blue-600" :
                                "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                            )}>
                                <Fingerprint className="h-4 w-4" />
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-2">
                                        <span>{fullDocument}</span>
                                        <span className="text-xs font-medium opacity-60 uppercase">— {detected.label}</span>
                                    </div>
                                    {cedulaLookup && (
                                        <span className="text-xs font-bold opacity-80">
                                            {cedulaLookup.nombre} {cedulaLookup.apellido}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {availableModules.map((mod, index) => {
                                const Icon = mod.icon;
                                return (
                                    <button
                                        key={mod.id}
                                        onClick={() => handleSelectModule(mod.route)}
                                        className={cn(
                                            "group relative rounded-2xl border-2 p-5 text-left transition-all duration-300 cursor-pointer overflow-hidden",
                                            "hover:shadow-xl hover:-translate-y-1",
                                            mod.bgColor,
                                            mod.borderColor
                                        )}
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40", mod.bgColor)} />
                                        <div className="relative flex items-start gap-4">
                                            <div className={cn(
                                                "inline-flex p-3 rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                                                mod.bgColor, mod.borderColor
                                            )}>
                                                <Icon className={cn("h-5 w-5", mod.color)} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold uppercase tracking-tight text-foreground mb-1">
                                                    {mod.title}
                                                </h3>
                                                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                                                    {mod.description}
                                                </p>
                                                <div className={cn(
                                                    "mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                                    mod.bgColor, mod.color
                                                )}>
                                                    Registrarse <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                )}

                <p className="text-center lg:text-left text-xs text-muted-foreground mt-4 mb-8 font-bold">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-primary font-bold hover:underline uppercase tracking-wide">
                        Iniciar Sesión
                    </Link>
                </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
