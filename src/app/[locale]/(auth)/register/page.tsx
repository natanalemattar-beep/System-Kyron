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
}

const ALL_PREFIXES = [
    { value: "V", label: "V", desc: "Venezolano" },
    { value: "E", label: "E", desc: "Extranjero" },
    { value: "J", label: "J", desc: "Jurídico" },
    { value: "G", label: "G", desc: "Gobierno" },
    { value: "P", label: "P", desc: "Pasaporte" },
    { value: "C", label: "C", desc: "Comunal" },
    { value: "F", label: "F", desc: "Firma" },
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
        id: "juridico",
        route: "juridico",
        icon: Building2,
        title: "Persona Jurídica",
        description: "Registro empresarial con RIF, razón social y documentos legales",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 hover:bg-emerald-500/15",
        borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
        forTypes: ["juridico"],
    },
    {
        id: "contabilidad",
        route: "contabilidad",
        icon: Calculator,
        title: "Contabilidad",
        description: "Módulo contable con régimen IVA, período fiscal y libros obligatorios",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10 hover:bg-violet-500/15",
        borderColor: "border-violet-500/20 hover:border-violet-500/40",
        forTypes: ["juridico"],
    },
    {
        id: "rrhh",
        route: "rrhh",
        icon: Users,
        title: "Recursos Humanos",
        description: "Gestión de nómina, empleados, departamentos y cumplimiento LOTTT",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10 hover:bg-amber-500/15",
        borderColor: "border-amber-500/20 hover:border-amber-500/40",
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
    {
        id: "legal",
        route: "legal",
        icon: Gavel,
        title: "Legal",
        description: "Servicios jurídicos, contratos, representación y documentos legales",
        color: "text-rose-500",
        bgColor: "bg-rose-500/10 hover:bg-rose-500/15",
        borderColor: "border-rose-500/20 hover:border-rose-500/40",
        forTypes: ["juridico"],
    },
    {
        id: "sostenibilidad",
        route: "sostenibilidad",
        icon: Recycle,
        title: "Sostenibilidad",
        description: "Gestión ambiental, residuos, certificaciones y eco-créditos",
        color: "text-green-500",
        bgColor: "bg-green-500/10 hover:bg-green-500/15",
        borderColor: "border-green-500/20 hover:border-green-500/40",
        forTypes: ["juridico"],
    },
];

function detectDocumentType(prefix: string, number: string): { type: DetectedType; format: "cedula" | "rif" | null; label: string; valid: boolean } {
    const trimmed = number.replace(/\s/g, "");
    if (!trimmed) return { type: null, format: null, label: "", valid: false };

    const isCedulaFormat = /^\d{5,10}$/.test(trimmed);
    const isRifFormat = /^\d{8}-\d$/.test(trimmed);

    if (["J", "G", "C", "F"].includes(prefix)) {
        const label = prefix === "J" ? "Empresa (Persona Jurídica)" : prefix === "G" ? "Organismo del Estado" : prefix === "C" ? "Consejo Comunal" : "Firma Personal";
        return { type: "juridico", format: "rif", label, valid: isRifFormat };
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
    const [docNumber, setDocNumber] = useState("");
    const [detected, setDetected] = useState<{ type: DetectedType; format: "cedula" | "rif" | null; label: string; valid: boolean }>({ type: null, format: null, label: "", valid: false });
    const [checking, setChecking] = useState(false);
    const [existsResult, setExistsResult] = useState<null | { exists: boolean }>(null);
    const [rifLookup, setRifLookup] = useState<RifLookupResult | null>(null);
    const [rifSearching, setRifSearching] = useState(false);
    const [rifSearched, setRifSearched] = useState(false);
    const [cedulaLookup, setCedulaLookup] = useState<{ nombre: string; apellido: string; estado?: string; municipio?: string } | null>(null);
    const [cedulaSearching, setCedulaSearching] = useState(false);

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
                } else {
                    setCedulaLookup(null);
                }
            } catch {
                setCedulaLookup(null);
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

    const handleNumberChange = (val: string) => {
        const cleaned = val.replace(/[^0-9-]/g, "");
        setDocNumber(cleaned);
    };

    const handleRifSearch = useCallback(async () => {
        if (!detected.valid || detected.type !== "juridico") return;
        setRifSearching(true);
        setRifLookup(null);
        try {
            const res = await fetch(`/api/rif/consulta?rif=${encodeURIComponent(fullDocument)}`);
            const data = await res.json();
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
        router.push(`/register/${moduleRoute}?${params.toString()}` as any);
    }, [fullDocument, router, rifLookup, cedulaLookup]);

    const isValidDoc = detected.type !== null && detected.valid;
    const isNatural = detected.type === "natural";
    const isJuridico = detected.type === "juridico";

    const availableModules = MODULES.filter(m => detected.type && m.forTypes.includes(detected.type));

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
                            <Button variant="ghost" asChild className="group rounded-xl h-9 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/50">
                                <Link href="/"><ChevronLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Volver</Link>
                            </Button>
                        ) : (
                            <Button variant="ghost" onClick={() => setStep("identify")} className="group rounded-xl h-9 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/50">
                                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Cambiar Documento
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex-1 container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24 py-4 lg:py-0">

                    <div className="hidden lg:flex flex-col justify-center flex-1 max-w-xl pr-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-6 w-fit">
                            <ShieldCheck className="h-3 w-3" /> Registro Cifrado AES-256
                        </div>
                        <h1 className="text-5xl xl:text-6xl font-black tracking-tighter leading-[0.95] mb-5">
                            <span className="text-foreground">Únete al </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent italic">Ecosistema</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-wide mb-10 max-w-md">
                            {step === "identify"
                                ? "Ingresa tu cédula o RIF para comenzar tu registro en la plataforma corporativa más completa de Venezuela"
                                : "Selecciona el módulo donde deseas registrarte y accede a herramientas especializadas"
                            }
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {FEATURES.map((f, i) => {
                                const FIcon = f.icon;
                                return (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border border-border/20 bg-card/40 backdrop-blur-sm">
                                        <div className="shrink-0 p-2 rounded-xl bg-primary/5 border border-primary/10">
                                            <FIcon className="h-4 w-4 text-primary/70" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-wide text-foreground mb-0.5">{f.title}</p>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                                        <User className="h-3.5 w-3.5 text-primary/50" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-xs font-black text-foreground">+2,500 empresas</p>
                                <p className="text-[10px] text-muted-foreground font-bold">Ya confían en System Kyron</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 lg:max-w-lg xl:max-w-xl w-full">

                        <header className="text-center mb-8 lg:hidden">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-5">
                                <ShieldCheck className="h-3 w-3" /> Registro Cifrado AES-256
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter leading-none mb-4">
                                <span className="text-foreground">Únete al </span>
                                <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent italic">Ecosistema</span>
                            </h1>
                            <p className="text-xs text-muted-foreground max-w-lg mx-auto font-bold uppercase tracking-wide">
                                {step === "identify"
                                    ? "Ingresa tu cédula o RIF para comenzar"
                                    : "Selecciona el módulo donde deseas registrarte"
                                }
                            </p>
                        </header>

                {step === "identify" && (
                    <section className="w-full mb-8">
                        <div className={cn(
                            "relative rounded-3xl border-2 bg-card/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl transition-all duration-500",
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
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                        Cédula de identidad o RIF
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <div className="relative shrink-0 w-[72px]">
                                    <select
                                        value={prefix}
                                        onChange={e => setPrefix(e.target.value)}
                                        className="w-full h-12 px-3 text-base font-black rounded-xl border border-border/40 bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                                    >
                                        {ALL_PREFIXES.map(p => (
                                            <option key={p.value} value={p.value}>
                                                {p.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Input
                                    value={docNumber}
                                    onChange={e => handleNumberChange(e.target.value)}
                                    placeholder={["J", "G", "C", "F"].includes(prefix) ? "50328471-6" : "18745632"}
                                    ref={inputRef}
                                    className="flex-1 h-12 text-lg font-bold rounded-xl border-border/40 tracking-wider"
                                />
                                {isJuridico && detected.valid && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleRifSearch}
                                        disabled={rifSearching}
                                        className={cn(
                                            "h-12 px-4 rounded-xl font-black text-xs uppercase tracking-wider shrink-0 transition-all duration-300",
                                            rifLookup ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/5" : "border-border/40"
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

                            {rifLookup && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-emerald-500/5 border-emerald-500/15 mb-4 transition-all duration-300">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-foreground truncate">{rifLookup.razonSocial}</p>
                                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                            {rifLookup.tipoEmpresa || 'Empresa registrada'} 
                                            {rifLookup.estado && ` · ${rifLookup.estado}`}
                                        </p>
                                    </div>
                                    <Building2 className="h-5 w-5 text-emerald-500/60 shrink-0" />
                                </div>
                            )}

                            {rifSearched && !rifLookup && !rifSearching && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-amber-500/5 border-amber-500/15 mb-4 transition-all duration-300">
                                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                                    <p className="text-xs font-bold text-amber-600">
                                        RIF no encontrado en el sistema. Podrás ingresar los datos manualmente.
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
                                        <p className="text-xs font-black uppercase tracking-wide">
                                            {detected.label}
                                        </p>
                                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                                            {!detected.valid
                                                ? (isJuridico ? "Formato requerido: 12345678-9" : "Formato requerido: 5 a 10 dígitos")
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
                                        Consultando registro civil...
                                    </p>
                                </div>
                            )}

                            {isNatural && detected.valid && cedulaLookup && !cedulaSearching && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-blue-500/5 border-blue-500/20 mb-4 animate-in slide-in-from-top-2 duration-300">
                                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-foreground truncate">
                                            {cedulaLookup.nombre} {cedulaLookup.apellido}
                                        </p>
                                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                            {fullDocument}
                                            {cedulaLookup.estado && ` · ${cedulaLookup.estado}`}
                                            {cedulaLookup.municipio && ` · ${cedulaLookup.municipio}`}
                                        </p>
                                    </div>
                                    <User className="h-5 w-5 text-blue-500/60 shrink-0" />
                                </div>
                            )}

                            {existsResult?.exists && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-amber-500/5 border-amber-500/15 text-amber-600 mb-4">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-xs font-black uppercase tracking-wide">
                                            Documento ya registrado
                                        </p>
                                        <p className="text-[10px] font-bold opacity-60">
                                            Ya existe una cuenta con este documento. ¿Deseas iniciar sesión?
                                        </p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild className="shrink-0 rounded-xl text-[10px] font-black uppercase tracking-wider border-amber-500/30 hover:bg-amber-500/10">
                                        <Link href="/login">Ir al Login</Link>
                                    </Button>
                                </div>
                            )}

                            <Button
                                onClick={handleContinueToModules}
                                disabled={!isValidDoc || checking}
                                className={cn(
                                    "w-full h-14 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 shadow-lg",
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
                                        <span className="text-[10px] font-bold opacity-60 uppercase">— {detected.label}</span>
                                    </div>
                                    {cedulaLookup && (
                                        <span className="text-xs font-bold opacity-80">
                                            {cedulaLookup.nombre} {cedulaLookup.apellido}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {availableModules.map((mod, index) => {
                                const Icon = mod.icon;
                                return (
                                    <button
                                        key={mod.id}
                                        onClick={() => handleSelectModule(mod.route)}
                                        className={cn(
                                            "group relative rounded-2xl border-2 p-5 text-left transition-all duration-300 cursor-pointer",
                                            "hover:shadow-xl hover:-translate-y-1",
                                            mod.bgColor,
                                            mod.borderColor
                                        )}
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "inline-flex p-3 rounded-xl border shrink-0 transition-all duration-300",
                                                mod.bgColor, mod.borderColor
                                            )}>
                                                <Icon className={cn("h-5 w-5", mod.color)} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-black uppercase tracking-tight text-foreground mb-1">
                                                    {mod.title}
                                                </h3>
                                                <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                                                    {mod.description}
                                                </p>
                                                <div className={cn(
                                                    "mt-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                                                    mod.color
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
                    <Link href="/login" className="text-primary font-black hover:underline uppercase tracking-wide">
                        Iniciar Sesión
                    </Link>
                </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
