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
    ShoppingCart, Sparkles, Lock,
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
    forTypes: DetectedType[];
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
        forTypes: ["natural"],
    },
    {
        id: "asesoria-contable",
        route: "asesoria-contable",
        icon: Building2,
        title: "Asesoría Contable & Empresarial",
        description: "VEN-NIF, facturación SENIAT, IVA/ISLR/IGTF, nómina LOTTT, RRHH, inventario",
        gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
        iconBg: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
        forTypes: ["juridico"],
    },
    {
        id: "legal",
        route: "legal",
        icon: Gavel,
        title: "Escritorio Jurídico",
        description: "Contratos, poderes, permisos SENIAT/SAPI, actas de asamblea y cumplimiento legal",
        gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
        iconBg: "bg-violet-500/15 text-violet-400 ring-violet-500/20",
        forTypes: ["juridico"],
    },
    {
        id: "telecom",
        route: "telecom",
        icon: Signal,
        title: "Mi Línea 5G",
        description: "Planes de telefonía, datos móviles 5G, eSIM, y servicios de conectividad empresarial",
        gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
        iconBg: "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
        forTypes: ["natural", "juridico"],
    },
    {
        id: "ventas",
        route: "asesoria-contable",
        icon: ShoppingCart,
        title: "Punto de Venta & Ventas",
        description: "TPV integrado, control de inventario, estrategias de venta y fidelización de clientes",
        gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
        iconBg: "bg-rose-500/15 text-rose-400 ring-rose-500/20",
        forTypes: ["juridico"],
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
    const availableModules = MODULES.filter(m => detected.type && m.forTypes.includes(detected.type));
    const currentPrefix = ALL_PREFIXES.find(p => p.value === prefix) ?? ALL_PREFIXES[0];
    const CurrentPrefixIcon = currentPrefix.icon;

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#060918]">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-gradient-to-b from-sky-600/[0.07] to-transparent blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-600/[0.05] to-transparent blur-[80px]" />
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-violet-600/[0.04] to-transparent blur-[80px]" />
            </div>

            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
            }} />

            <div className="relative z-10 min-h-screen flex flex-col">
                <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
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

                <div className="flex-1 flex flex-col items-center justify-center px-4 pb-10">
                    <div className="w-full max-w-lg">
                        <div className="text-center mb-8">
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
                        </div>

                        <div className="flex items-center gap-3 mb-8 px-4">
                            {[1, 2, 3].map(n => {
                                const currentStep = step === "identify" ? 1 : 2;
                                const isActive = n === currentStep;
                                const isDone = n < currentStep;
                                return (
                                    <div key={n} className="flex-1 flex items-center gap-3">
                                        <div className="flex-1 relative">
                                            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-700 ease-out",
                                                        isDone ? "w-full bg-gradient-to-r from-sky-500 to-emerald-500" :
                                                        isActive ? "w-1/2 bg-gradient-to-r from-sky-500 to-sky-400" :
                                                        "w-0"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {step === "identify" && (
                            <div className="space-y-4">
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

                                            {prefixOpen && (
                                                <div
                                                    id="prefix-listbox"
                                                    role="listbox"
                                                    aria-label="Tipo de documento"
                                                    className="absolute top-full left-0 mt-2 z-50 w-[240px] rounded-xl border border-white/10 bg-[#0c1128]/95 backdrop-blur-xl shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-2 duration-200"
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
                                                </div>
                                            )}
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

                                {rifLookup && (
                                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 animate-in slide-in-from-top-2 duration-300">
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
                                    </div>
                                )}

                                {rifSearched && rifValidationError && !rifSearching && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-500/15 bg-red-500/[0.04]">
                                        <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                                        <p className="text-xs font-medium text-red-300/80">{rifValidationError}</p>
                                    </div>
                                )}

                                {rifSearched && !rifLookup && !rifValidationError && !rifSearching && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04]">
                                        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                                        <p className="text-xs font-medium text-amber-300/70">
                                            RIF válido pero no encontrado en el sistema. Podrás ingresar los datos manualmente.
                                        </p>
                                    </div>
                                )}

                                {detected.type && (
                                    <div className={cn(
                                        "flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300",
                                        isNatural ? "border-sky-500/15 bg-sky-500/[0.04]" :
                                        "border-emerald-500/15 bg-emerald-500/[0.04]"
                                    )}>
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
                                    </div>
                                )}

                                {isNatural && detected.valid && cedulaSearching && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-sky-500/15 bg-sky-500/[0.04] animate-in fade-in duration-300">
                                        <Loader2 className="h-4 w-4 text-sky-400 animate-spin shrink-0" />
                                        <div>
                                            <p className="text-xs font-semibold text-sky-300/80">Consultando SAIME...</p>
                                            <p className="text-[11px] text-white/20">Buscando datos del titular</p>
                                        </div>
                                    </div>
                                )}

                                {isNatural && detected.valid && cedulaLookup && !cedulaSearching && (
                                    <div className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-4 animate-in slide-in-from-top-2 duration-300">
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
                                    </div>
                                )}

                                {isNatural && detected.valid && !cedulaLookup && !cedulaSearching && cedulaValidInfo && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] animate-in fade-in duration-300">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-emerald-300/80">{cedulaValidInfo.nacionalidad || 'Documento válido'}</p>
                                            {cedulaValidInfo.edadEstimada && (
                                                <p className="text-[11px] text-white/25 mt-0.5">
                                                    Generación: {cedulaValidInfo.edadEstimada.generacion} ({cedulaValidInfo.edadEstimada.rangoEdad})
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {existsResult?.exists && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04]">
                                        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-amber-300/80">Documento ya registrado</p>
                                            <p className="text-[11px] text-white/25 mt-0.5">Ya existe una cuenta con este documento</p>
                                        </div>
                                        <Button size="sm" variant="outline" asChild className="shrink-0 rounded-lg text-xs font-medium border-amber-500/20 text-amber-400/80 hover:bg-amber-500/10 hover:text-amber-300 bg-transparent">
                                            <Link href="/login">Ir al Login</Link>
                                        </Button>
                                    </div>
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
                            </div>
                        )}

                        {step === "modules" && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className={cn(
                                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                                        isNatural ? "bg-sky-500/10" : "bg-emerald-500/10"
                                    )}>
                                        <Fingerprint className={cn("h-4 w-4", isNatural ? "text-sky-400" : "text-emerald-400")} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={cn("text-xs font-semibold truncate", isNatural ? "text-sky-300/80" : "text-emerald-300/80")}>
                                            {fullDocument} · {detected.label}
                                        </p>
                                        {cedulaLookup && (
                                            <p className="text-[11px] text-white/30 truncate">{cedulaLookup.nombre} {cedulaLookup.apellido}</p>
                                        )}
                                        {rifLookup && (
                                            <p className="text-[11px] text-white/30 truncate">{rifLookup.razonSocial}</p>
                                        )}
                                    </div>
                                    <CheckCircle2 className={cn("h-4 w-4 shrink-0", isNatural ? "text-sky-400/60" : "text-emerald-400/60")} />
                                </div>

                                <div className="space-y-3">
                                    {availableModules.map((mod) => {
                                        const Icon = mod.icon;
                                        return (
                                            <button
                                                key={mod.id}
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
                                                        <h3 className="text-sm font-semibold text-white mb-0.5">{mod.title}</h3>
                                                        <p className="text-xs text-white/30 leading-relaxed line-clamp-2">{mod.description}</p>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] transition-colors">
                                                        <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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
    );
}
