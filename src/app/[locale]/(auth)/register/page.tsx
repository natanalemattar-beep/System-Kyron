"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerOptions } from "@/lib/register-options";
import {
    User, Building2, ArrowRight, ChevronLeft, ShieldCheck, Sparkles, Zap,
    Search, CheckCircle2, AlertCircle, Fingerprint, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DetectedType = null | "natural" | "juridico";

const ALL_PREFIXES = [
    { value: "V", label: "V", desc: "Venezolano" },
    { value: "E", label: "E", desc: "Extranjero" },
    { value: "J", label: "J", desc: "Jurídico" },
    { value: "G", label: "G", desc: "Gobierno" },
    { value: "P", label: "P", desc: "Pasaporte" },
    { value: "C", label: "C", desc: "Comunal" },
    { value: "F", label: "F", desc: "Firma" },
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

const badgeColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    "Ciudadano": { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20", glow: "group-hover:shadow-blue-500/10" },
    "Telecom": { bg: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-500/20", glow: "group-hover:shadow-violet-500/10" },
    "Empresa": { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", glow: "group-hover:shadow-emerald-500/10" },
    "Legal": { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", glow: "group-hover:shadow-amber-500/10" },
    "Ventas": { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/20", glow: "group-hover:shadow-rose-500/10" },
    "RRHH": { bg: "bg-cyan-500/10", text: "text-cyan-600", border: "border-cyan-500/20", glow: "group-hover:shadow-cyan-500/10" },
    "Directivos": { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "border-indigo-500/20", glow: "group-hover:shadow-indigo-500/10" },
    "Ambiental": { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20", glow: "group-hover:shadow-green-500/10" },
    "IT": { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/20", glow: "group-hover:shadow-orange-500/10" },
    "Marketing": { bg: "bg-pink-500/10", text: "text-pink-600", border: "border-pink-500/20", glow: "group-hover:shadow-pink-500/10" },
};

function OptionCard({ option }: { option: typeof registerOptions[0] }) {
    const colors = badgeColors[option.badge] ?? { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", glow: "" };
    return (
        <Link href={option.href as any} className="block h-full">
            <div className={cn(
                "group relative h-full flex flex-col rounded-2xl border bg-card/60 backdrop-blur-sm p-5 transition-all duration-300",
                "hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-xl",
                colors.glow, "border-border/40"
            )}>
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={cn("p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-110", colors.bg, colors.border)}>
                        <option.icon className={cn("h-5 w-5", colors.text)} />
                    </div>
                    <span className={cn("px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.15em] border", colors.bg, colors.text, colors.border)}>
                        {option.badge}
                    </span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {option.label}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium flex-grow">
                    {option.description}
                </p>
                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/20">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/70 group-hover:text-primary transition-colors">
                        Iniciar Registro
                    </span>
                    <ArrowRight className="h-3 w-3 text-primary/70 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}

export default function RegisterSelectionPage() {
    const router = useRouter();
    const [prefix, setPrefix] = useState("V");
    const [docNumber, setDocNumber] = useState("");
    const [detected, setDetected] = useState<{ type: DetectedType; format: "cedula" | "rif" | null; label: string; valid: boolean }>({ type: null, format: null, label: "", valid: false });
    const [checking, setChecking] = useState(false);
    const [existsResult, setExistsResult] = useState<null | { exists: boolean }>(null);

    const fullDocument = `${prefix}-${docNumber}`;

    useEffect(() => {
        const result = detectDocumentType(prefix, docNumber);
        setDetected(result);
        setExistsResult(null);
    }, [prefix, docNumber]);

    const handleNumberChange = (val: string) => {
        const cleaned = val.replace(/[^0-9-]/g, "");
        setDocNumber(cleaned);
    };

    const locale = useLocale();

    const handleContinue = useCallback(async () => {
        if (!detected.type) return;

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

        const target = detected.type === "natural" ? "natural" : "juridico";
        router.push(`/${locale}/register/${target}?doc=${encodeURIComponent(fullDocument)}` as any);
    }, [detected, prefix, fullDocument, router, locale]);

    const personalOptions = registerOptions.filter(o =>
        ["/register/natural", "/register/telecom"].includes(o.href)
    );
    const enterpriseOptions = registerOptions.filter(o =>
        !["/register/natural", "/register/telecom"].includes(o.href)
    );

    const isValidDoc = detected.type !== null && detected.valid;
    const isNatural = detected.type === "natural";
    const isJuridico = detected.type === "juridico";

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/[0.02] relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl relative z-10">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="group rounded-xl h-9 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/50">
                        <Link href="/"><ChevronLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Volver</Link>
                    </Button>
                </div>

                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-5">
                        <ShieldCheck className="h-3 w-3" /> Registro Cifrado AES-256
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-4">
                        <span className="text-foreground">Únete al </span>
                        <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent italic">Ecosistema</span>
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto font-bold uppercase tracking-wide">
                        Ingresa tu cédula o RIF para comenzar
                    </p>
                </header>

                <section className="max-w-2xl mx-auto mb-12">
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
                                    Identificación
                                </h2>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                                    Cédula de identidad o RIF
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <Select value={prefix} onValueChange={setPrefix}>
                                <SelectTrigger className="w-[90px] shrink-0 h-12 text-base font-black rounded-xl border-border/40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {ALL_PREFIXES.map(p => (
                                        <SelectItem key={p.value} value={p.value}>
                                            <span className="font-black">{p.label}</span>
                                            <span className="text-muted-foreground/50 ml-1 text-xs">— {p.desc}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                value={docNumber}
                                onChange={e => handleNumberChange(e.target.value)}
                                placeholder={["J", "G", "C", "F"].includes(prefix) ? "12345678-9" : "12345678"}
                                className="flex-1 h-12 text-lg font-bold rounded-xl border-border/40 tracking-wider"
                                autoFocus
                            />
                        </div>

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
                                            : isNatural ? "Se abrirá el formulario de registro personal" : "Se abrirá el formulario de registro empresarial"
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
                            onClick={handleContinue}
                            disabled={!isValidDoc || checking}
                            className={cn(
                                "w-full h-12 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300",
                                isNatural ? "bg-blue-600 hover:bg-blue-700 text-white" :
                                isJuridico ? "bg-emerald-600 hover:bg-emerald-700 text-white" :
                                "bg-primary hover:bg-primary/90"
                            )}
                        >
                            {checking ? (
                                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verificando...</>
                            ) : (
                                <><ArrowRight className="h-4 w-4 mr-2" /> Continuar Registro</>
                            )}
                        </Button>

                        <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-border/10">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500/60" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                                    V/E = Persona
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500/60" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                                    J/G/C/F = Empresa
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/20 to-transparent" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
                        O selecciona un módulo específico
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/20 to-transparent" />
                </div>

                <section className="mb-8">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/20" />
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10">
                            <User className="h-3.5 w-3.5 text-blue-500" />
                            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-blue-500/80">Portal Ciudadano</span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/20" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {personalOptions.map((option) => (
                            <OptionCard key={option.href + option.label} option={option} />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/20" />
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                            <Building2 className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-emerald-500/80">Módulos Corporativos</span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/20" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {enterpriseOptions.map((option, i) => (
                            <OptionCard key={option.href + option.label + i} option={option} />
                        ))}
                    </div>
                </section>

                <div className="relative rounded-2xl border border-primary/10 bg-primary/[0.03] backdrop-blur-sm p-6 md:p-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Detección Automática</span>
                        <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium mb-4 max-w-md mx-auto">
                        El sistema identifica automáticamente si eres persona natural o empresa según tu documento.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-[8px] font-bold uppercase tracking-widest text-muted-foreground/70">
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> VEN-NIF</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> SENIAT</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> LOTTT</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> BCV</span>
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground/70 mt-8 font-bold">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-primary font-black hover:underline uppercase tracking-wide">
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
