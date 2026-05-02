"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft, ChevronRight, Play, Fingerprint, Building2,
    CreditCard, MapPin, CircleCheck, ArrowRight, User,
    ShieldCheck, Lock, Sparkles, Eye, Phone, Mail, KeyRound,
    Globe, FileSignature, Landmark, Building, Signal, Gavel,
    ShoppingCart, Recycle,
} from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const FAKE_DATA = {
    cedula: "V-00000000",
    rif: "J-00000000-0",
    nombre: "Juan",
    apellido: "Pérez",
    empresa: "Empresa Demo, C.A.",
    email: "demo@systemkyron.com",
    telefono: "0412-000-0000",
    estado: "Distrito Capital",
    municipio: "Libertador",
    password: "••••••••••",
};

interface TutorialStep {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
    content: React.ReactNode;
}

function FakeInput({ label, value, icon: Icon, highlight }: { label: string; value: string; icon?: React.ElementType; highlight?: boolean }) {
    return (
        <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
            <div className={cn(
                "flex items-center gap-2.5 h-10 px-3 rounded-lg border bg-muted/30 transition-all",
                highlight ? "border-sky-500/40 ring-1 ring-sky-500/20" : "border-border/30"
            )}>
                {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />}
                <span className="text-sm text-foreground/70 font-medium">{value}</span>
            </div>
        </div>
    );
}

function FakeCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("rounded-xl border border-border/30 bg-muted/20 p-4", className)}>
            {children}
        </div>
    );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex items-center gap-1.5">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === current ? "w-8 bg-sky-500" :
                        i < current ? "w-4 bg-sky-500/40" :
                        "w-4 bg-muted/40"
                    )}
                />
            ))}
        </div>
    );
}

function buildSteps(): TutorialStep[] {
    return [
        {
            id: "intro",
            title: "Bienvenido a System Kyron",
            subtitle: "Guía rápida para crear tu cuenta en 3 minutos",
            icon: Play,
            iconColor: "text-sky-400",
            iconBg: "bg-sky-500/10 ring-sky-500/20",
            content: (
                <div className="space-y-5">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Este tutorial te mostrará paso a paso cómo registrarte en la plataforma.
                        Todos los datos mostrados son <span className="text-sky-400 font-semibold">ficticios y de demostración</span>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { icon: Fingerprint, label: "Paso 1", desc: "Identificación", color: "text-sky-400", bg: "bg-sky-500/10" },
                            { icon: Building2, label: "Paso 2", desc: "Elige tu portal", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                            { icon: CircleCheck, label: "Paso 3", desc: "Crea tu cuenta", color: "text-violet-400", bg: "bg-violet-500/10" },
                        ].map(s => (
                            <FakeCard key={s.label}>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", s.bg)}>
                                        <s.icon className={cn("h-5 w-5", s.color)} />
                                    </div>
                                    <p className="text-xs font-semibold text-foreground/70">{s.label}</p>
                                    <p className="text-[10px] text-muted-foreground/50">{s.desc}</p>
                                </div>
                            </FakeCard>
                        ))}
                    </div>
                    <FakeCard className="border-sky-500/15 bg-sky-500/[0.03]">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-sky-300/80">Datos de demostración</p>
                                <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                                    Todos los datos en este tutorial son ficticios. Correo: {FAKE_DATA.email} · Teléfono: {FAKE_DATA.telefono} · Cédula: {FAKE_DATA.cedula}
                                </p>
                            </div>
                        </div>
                    </FakeCard>
                </div>
            ),
        },
        {
            id: "step1-prefix",
            title: "Selecciona tu tipo de documento",
            subtitle: "El sistema identifica automáticamente si eres persona natural o jurídica",
            icon: Fingerprint,
            iconColor: "text-sky-400",
            iconBg: "bg-sky-500/10 ring-sky-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Al ingresar a <span className="text-foreground/70 font-medium">/register</span>, verás un campo donde seleccionas el tipo de documento. Cada prefijo muestra módulos diferentes:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { prefix: "V", desc: "Venezolano — Persona Natural", icon: User, color: "text-sky-400", bg: "bg-sky-500/10", modules: "Personal, Telecom, Sostenibilidad" },
                            { prefix: "E", desc: "Extranjero — Residente", icon: Globe, color: "text-teal-400", bg: "bg-teal-500/10", modules: "Personal, Telecom, Sostenibilidad" },
                            { prefix: "J", desc: "Jurídico — Empresa / Fundación", icon: Building2, color: "text-emerald-400", bg: "bg-emerald-500/10", modules: "Contable, Legal, Telecom, Ventas, ESG" },
                            { prefix: "G", desc: "Gobierno — Organismo Público", icon: Landmark, color: "text-amber-400", bg: "bg-amber-500/10", modules: "Contable, Gestión Pública, Legal, ESG" },
                            { prefix: "C", desc: "Comunal — Consejo Comunal", icon: Building, color: "text-orange-400", bg: "bg-orange-500/10", modules: "Gestión Comunal, Sostenibilidad" },
                            { prefix: "F", desc: "Firma Personal — Emprendedor", icon: FileSignature, color: "text-rose-400", bg: "bg-rose-500/10", modules: "Contable, Legal, Telecom, Ventas, ESG" },
                            { prefix: "P", desc: "Pasaporte — Persona Natural", icon: Globe, color: "text-violet-400", bg: "bg-violet-500/10", modules: "Personal, Sostenibilidad" },
                        ].map(p => (
                            <div key={p.prefix} className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors">
                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", p.bg)}>
                                    <p.icon className={cn("h-4 w-4", p.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("text-sm font-bold", p.color)}>{p.prefix}</span>
                                        <span className="text-xs text-muted-foreground/80">{p.desc}</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground/40 mt-0.5">{p.modules}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: "step1-cedula",
            title: "Ingresa tu número de documento",
            subtitle: "Ejemplo con cédula venezolana (V)",
            icon: Fingerprint,
            iconColor: "text-sky-400",
            iconBg: "bg-sky-500/10 ring-sky-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Para una <span className="text-sky-400 font-semibold">persona natural venezolana</span>, selecciona "V" e ingresa tu número de cédula (sin puntos ni guiones).
                    </p>
                    <FakeCard className="border-sky-500/15">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                                <Fingerprint className="h-4 w-4 text-sky-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-foreground/80">Documento de identidad</p>
                                <p className="text-[10px] text-muted-foreground/50">Cédula de identidad</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <div className="flex items-center gap-1.5 h-10 px-3 rounded-lg border border-sky-500/30 bg-sky-500/5">
                                <User className="h-3.5 w-3.5 text-sky-400" />
                                <span className="text-sm font-bold text-white">V</span>
                            </div>
                            <div className="flex-1 h-10 px-3 rounded-lg border border-sky-500/30 bg-sky-500/5 flex items-center">
                                <span className="text-sm font-semibold text-foreground/70 tracking-wider">00000000</span>
                                <span className="ml-auto text-[11px] text-muted-foreground/30 font-semibold">CI</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-sky-500/15 bg-sky-500/[0.03]">
                            <CircleCheck className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                            <p className="text-[11px] text-sky-300/70">Ciudadano Venezolano — Documento válido</p>
                        </div>
                    </FakeCard>
                    <FakeCard className="border-amber-500/15 bg-amber-500/[0.03]">
                        <div className="flex items-start gap-2.5">
                            <Eye className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-amber-300/60">
                                <span className="font-semibold text-amber-300/80">Consulta automática:</span> Si tu cédula está en SAIME, el sistema autocompletará tu nombre, estado y municipio.
                            </p>
                        </div>
                    </FakeCard>
                </div>
            ),
        },
        {
            id: "step1-rif",
            title: "Registro con RIF (Empresas)",
            subtitle: "Ejemplo con persona jurídica (J)",
            icon: Building2,
            iconColor: "text-emerald-400",
            iconBg: "bg-emerald-500/10 ring-emerald-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Para una <span className="text-emerald-400 font-semibold">empresa o persona jurídica</span>, selecciona "J" e ingresa el RIF en formato <span className="text-foreground/70 font-mono">12345678-9</span>.
                    </p>
                    <FakeCard className="border-emerald-500/15">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <Fingerprint className="h-4 w-4 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-foreground/80">Documento de identidad</p>
                                <p className="text-[10px] text-muted-foreground/50">RIF empresarial</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <div className="flex items-center gap-1.5 h-10 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                                <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-sm font-bold text-white">J</span>
                            </div>
                            <div className="flex-1 h-10 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex items-center">
                                <span className="text-sm font-semibold text-foreground/70 tracking-wider">00000000-0</span>
                                <span className="ml-auto text-[11px] text-muted-foreground/30 font-semibold">RIF</span>
                            </div>
                            <div className="flex items-center gap-1 h-10 px-3 rounded-lg border border-border/40 bg-muted/30">
                                <span className="text-[10px] font-semibold text-muted-foreground">Buscar</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.03]">
                            <CircleCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <div>
                                <p className="text-[11px] text-emerald-300/70 font-semibold">{FAKE_DATA.empresa}</p>
                                <p className="text-[10px] text-muted-foreground/40">Persona Jurídica · {FAKE_DATA.estado}</p>
                            </div>
                        </div>
                    </FakeCard>
                    <p className="text-[11px] text-muted-foreground/50 px-1">
                        El botón <span className="font-semibold text-muted-foreground">"Buscar"</span> consulta el RIF en SENIAT para autocompletar los datos de la empresa.
                    </p>
                </div>
            ),
        },
        {
            id: "step2-modules",
            title: "Elige tu portal de acceso",
            subtitle: "Los módulos se filtran según tu tipo de documento",
            icon: Sparkles,
            iconColor: "text-violet-400",
            iconBg: "bg-violet-500/10 ring-violet-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Después de verificar tu documento, el sistema muestra los <span className="text-foreground/70 font-semibold">portales disponibles</span> según tu tipo de identificación.
                    </p>
                    <p className="text-xs text-muted-foreground/50">Ejemplo: Módulos para <span className="text-emerald-400 font-semibold">Persona Jurídica (J)</span></p>
                    <div className="space-y-2">
                        {[
                            { icon: Building2, title: "Asesoría Contable & Empresarial", desc: "VEN-NIF, SENIAT, IVA/ISLR/IGTF", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                            { icon: Gavel, title: "Escritorio Jurídico", desc: "Contratos, permisos, cumplimiento", color: "text-violet-400", bg: "bg-violet-500/10" },
                            { icon: Signal, title: "Mi Línea 5G", desc: "Telefonía y conectividad", color: "text-cyan-400", bg: "bg-cyan-500/10" },
                            { icon: ShoppingCart, title: "Punto de Venta & Ventas", desc: "TPV, inventario, fidelización", color: "text-rose-400", bg: "bg-rose-500/10" },
                            { icon: Recycle, title: "Sostenibilidad & ESG", desc: "Gestión ambiental, reciclaje", color: "text-green-400", bg: "bg-green-500/10" },
                        ].map(m => (
                            <div key={m.title} className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-muted/20">
                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", m.bg)}>
                                    <m.icon className={cn("h-4 w-4", m.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground/70">{m.title}</p>
                                    <p className="text-[10px] text-muted-foreground/40">{m.desc}</p>
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: "step3-plan",
            title: "Selecciona tu plan (Asesoría Contable)",
            subtitle: "Si eliges Asesoría Contable, primero seleccionas un plan",
            icon: CreditCard,
            iconColor: "text-emerald-400",
            iconBg: "bg-emerald-500/10 ring-emerald-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        El módulo de Asesoría Contable tiene 4 planes. Elige el que mejor se adapte a tu empresa.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { name: "Básico", price: "$12/mes", color: "text-sky-400", border: "border-sky-500/20" },
                            { name: "Profesional", price: "$28/mes", color: "text-emerald-400", border: "border-emerald-500/20" },
                            { name: "Empresarial", price: "$52/mes", color: "text-violet-400", border: "border-violet-500/20" },
                            { name: "Premium", price: "$95/mes", color: "text-amber-400", border: "border-amber-500/20" },
                        ].map(p => (
                            <div key={p.name} className={cn("p-3 rounded-lg border bg-muted/20 text-center", p.border)}>
                                <p className={cn("text-xs font-semibold", p.color)}>{p.name}</p>
                                <p className="text-sm font-bold text-foreground/70 mt-1">{p.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: "step3-data",
            title: "Completa tus datos de empresa",
            subtitle: "Nombre, contacto, ubicación y credenciales de acceso",
            icon: Building2,
            iconColor: "text-emerald-400",
            iconBg: "bg-emerald-500/10 ring-emerald-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Completa los datos de tu empresa. Los campos marcados con <span className="text-red-400">*</span> son obligatorios.
                    </p>
                    <FakeCard>
                        <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-3">Datos de la empresa</p>
                        <div className="grid grid-cols-2 gap-3">
                            <FakeInput label="Razón Social *" value={FAKE_DATA.empresa} icon={Building2} highlight />
                            <FakeInput label="RIF" value={FAKE_DATA.rif} icon={FileSignature} />
                        </div>
                    </FakeCard>
                    <FakeCard>
                        <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-3">Contacto</p>
                        <div className="grid grid-cols-2 gap-3">
                            <FakeInput label="Correo *" value={FAKE_DATA.email} icon={Mail} highlight />
                            <FakeInput label="Teléfono *" value={FAKE_DATA.telefono} icon={Phone} highlight />
                        </div>
                    </FakeCard>
                    <FakeCard>
                        <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-3">Ubicación</p>
                        <div className="grid grid-cols-2 gap-3">
                            <FakeInput label="Estado *" value={FAKE_DATA.estado} icon={MapPin} />
                            <FakeInput label="Municipio *" value={FAKE_DATA.municipio} icon={MapPin} />
                        </div>
                    </FakeCard>
                </div>
            ),
        },
        {
            id: "step3-credentials",
            title: "Crea tu contraseña",
            subtitle: "Tu contraseña debe tener mínimo 8 caracteres",
            icon: KeyRound,
            iconColor: "text-violet-400",
            iconBg: "bg-violet-500/10 ring-violet-500/20",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        Crea una contraseña segura. El sistema validará que cumpla los requisitos mínimos de seguridad.
                    </p>
                    <FakeCard>
                        <div className="space-y-3">
                            <FakeInput label="Correo electrónico" value={FAKE_DATA.email} icon={Mail} />
                            <FakeInput label="Contraseña *" value={FAKE_DATA.password} icon={Lock} highlight />
                            <FakeInput label="Confirmar contraseña *" value={FAKE_DATA.password} icon={Lock} highlight />
                        </div>
                    </FakeCard>
                    <div className="space-y-1.5 px-1">
                        {[
                            { text: "Mínimo 8 caracteres", ok: true },
                            { text: "Al menos una mayúscula", ok: true },
                            { text: "Al menos un número", ok: true },
                            { text: "Las contraseñas coinciden", ok: true },
                        ].map(r => (
                            <div key={r.text} className="flex items-center gap-2">
                                <CircleCheck className="h-3 w-3 text-emerald-400" />
                                <p className="text-[11px] text-emerald-400/60">{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: "done",
            title: "¡Cuenta creada exitosamente!",
            subtitle: "Ya puedes iniciar sesión con tus credenciales",
            icon: CircleCheck,
            iconColor: "text-emerald-400",
            iconBg: "bg-emerald-500/10 ring-emerald-500/20",
            content: (
                <div className="space-y-5">
                    <div className="flex flex-col items-center text-center py-4">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center mb-4">
                            <CircleCheck className="h-8 w-8 text-emerald-400" />
                        </div>
                        <p className="text-lg font-bold text-foreground mb-2">Registro completado</p>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Tu cuenta ha sido creada. Ahora puedes iniciar sesión en el portal correspondiente.
                        </p>
                    </div>
                    <FakeCard className="border-emerald-500/15 bg-emerald-500/[0.03]">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-emerald-300/80">Verificación por correo</p>
                                <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                                    Al iniciar sesión por primera vez, recibirás un código de verificación en tu correo electrónico ({FAKE_DATA.email}) para confirmar tu identidad.
                                </p>
                            </div>
                        </div>
                    </FakeCard>
                    <div className="flex gap-3">
                        <Button asChild className="flex-1 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold">
                            <Link href="/login">Ir a Iniciar Sesión <ArrowRight className="h-4 w-4 ml-2" /></Link>
                        </Button>
                        <Button asChild variant="outline" className="h-10 rounded-lg border-border/40 bg-muted/30 text-muted-foreground/80 hover:text-foreground/70 hover:bg-muted/50 text-sm">
                            <Link href="/register">Registrarse Ahora</Link>
                        </Button>
                    </div>
                </div>
            ),
        },
    ];
}

export default function GuiaRegistroPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = buildSteps();
    const step = steps[currentStep];
    const StepIcon = step.icon;

    const goNext = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
    const goPrev = () => setCurrentStep(s => Math.max(s - 1, 0));

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-gradient-to-b from-sky-600/[0.06] to-transparent blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-violet-600/[0.04] to-transparent blur-[80px]" />
            </div>
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '32px 32px'
            }} />

            <div className="relative z-10 min-h-screen flex flex-col">
                <nav className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto w-full">
                    <Link href="/" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground/70 transition-colors text-sm">
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="font-medium">Inicio</span>
                    </Link>
                    <div className="flex items-center gap-2 text-muted-foreground/30 text-xs font-medium tracking-wider">
                        <Lock className="h-3 w-3" />
                        <span>TUTORIAL DE REGISTRO</span>
                    </div>
                </nav>

                <div className="flex-1 flex flex-col items-center px-4 pb-10">
                    <div className="w-full max-w-lg">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 border border-border/30 mb-4">
                                <Play className="h-3.5 w-3.5 text-sky-400" />
                                <span className="text-xs font-semibold text-muted-foreground/80 tracking-wide">
                                    Guía de Registro — System Kyron v2.8.5
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">
                                ¿Cómo registrarse?
                            </h1>
                            <p className="text-muted-foreground/60 text-sm">
                                Tutorial paso a paso · Datos ficticios de demostración
                            </p>
                        </div>

                        <div className="flex items-center justify-center mb-6">
                            <StepIndicator current={currentStep} total={steps.length} />
                        </div>

                        <div className="rounded-2xl bg-muted/30 border border-border/30 backdrop-blur-sm overflow-hidden">
                            <div className="p-5 border-b border-border/20">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center ring-1", step.iconBg)}>
                                        <StepIcon className={cn("h-5 w-5", step.iconColor)} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm font-semibold text-foreground">{step.title}</h2>
                                        <p className="text-[11px] text-muted-foreground/50">{step.subtitle}</p>
                                    </div>
                                    <span className="text-[10px] font-semibold text-muted-foreground/30 shrink-0">
                                        {currentStep + 1}/{steps.length}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                {step.content}
                            </div>

                            <div className="p-4 border-t border-border/20 flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    onClick={goPrev}
                                    disabled={currentStep === 0}
                                    className="h-9 px-4 rounded-lg border-border/40 bg-muted/30 text-muted-foreground/80 hover:text-foreground/70 hover:bg-muted/50 text-xs font-medium disabled:opacity-20"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Anterior
                                </Button>

                                {currentStep < steps.length - 1 ? (
                                    <Button
                                        onClick={goNext}
                                        className="h-9 px-4 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold hover:from-sky-400 hover:to-blue-500"
                                    >
                                        Siguiente <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                    </Button>
                                ) : (
                                    <Button asChild className="h-9 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold">
                                        <Link href="/register">Registrarse Ahora <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-muted-foreground/30 mt-6 tracking-wider">
                            TODOS LOS DATOS MOSTRADOS SON FICTICIOS · DEMOSTRACIÓN
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
