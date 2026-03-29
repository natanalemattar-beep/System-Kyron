"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Loader2,
    CircleCheck as CheckCircle,
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    Recycle,
    ShieldCheck,
    RefreshCw,
    Leaf,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { DocumentInput } from "@/components/document-input";

const TOTAL_STEPS = 5;

const ESTADOS_VE = [
    "Amazonas",
    "Anzoátegui",
    "Apure",
    "Aragua",
    "Barinas",
    "Bolívar",
    "Carabobo",
    "Cojedes",
    "Delta Amacuro",
    "Dependencias Federales",
    "Distrito Capital",
    "Falcón",
    "Guárico",
    "Lara",
    "Mérida",
    "Miranda",
    "Monagas",
    "Nueva Esparta",
    "Portuguesa",
    "Sucre",
    "Táchira",
    "Trujillo",
    "La Guaira",
    "Yaracuy",
    "Zulia",
];

const TIPOS_RESIDUOS = [
    "Sólidos Urbanos",
    "Peligrosos",
    "Industriales",
    "Electrónicos (RAEE)",
    "Orgánicos",
    "Reciclables (PET/Vidrio/Cartón)",
    "Médicos/Hospitalarios",
    "Mixtos",
    "Otro",
];
const CERTIFICACIONES = [
    "ISO 14001",
    "OHSAS 18001",
    "ISO 50001",
    "Carbono Neutro",
    "Sin certificación",
    "En proceso de certificación",
];
const AREAS_IMPACTO = [
    "Local (Municipio)",
    "Regional (Estado)",
    "Nacional",
    "Internacional",
];
const TECNOLOGIAS_CLASIFICACION = [
    "Manual",
    "Automatizada (Cintas)",
    "IA/Sensores Magnéticos (Ameru)",
    "Robots Clasificadores",
    "Híbrida",
];

const schema = z
    .object({
        razonSocial: z.string().min(3, "Ingrese la razón social"),
        rif: z.string().regex(/^[JGCVEPF]-\d{8}-\d$/, "Formato: J-50328471-6"),
        telefono: z.string().min(7, "Teléfono inválido"),
        estado_empresa: z.string().min(1, "Seleccione el estado"),
        municipio_empresa: z.string().min(2, "Ingrese el municipio"),
        direccion: z.string().min(5, "Ingrese la dirección"),
        tipo_residuos: z.string().min(1, "Seleccione el tipo de residuos"),
        capacidad_toneladas: z.string().min(1, "Ingrese la capacidad mensual"),
        certificacion_ambiental: z
            .string()
            .min(1, "Seleccione la certificación"),
        area_impacto: z.string().min(1, "Seleccione el área de impacto"),
        tecnologia_clasificacion: z.string().min(1, "Seleccione la tecnología"),
        eco_creditos_objetivo: z.string().optional(),
        repNombre: z.string().min(2, "Ingrese el nombre"),
        repApellido: z.string().min(2, "Ingrese el apellido"),
        repCedula: z.string().min(6, "Cédula inválida"),
        rep_cargo: z.string().min(2, "Ingrese el cargo"),
        rep_telefono: z.string().min(7, "Teléfono inválido"),
        repEmail: z.string().email("Correo inválido"),
        password: z
            .string()
            .min(8, "Mínimo 8 caracteres")
            .regex(/[A-Z]/, "Una mayúscula requerida")
            .regex(/[0-9]/, "Un número requerido"),
        confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

type FormData = z.infer<typeof schema>;

const MODULES_SOSTENIBILIDAD = [
    { id: "sostenibilidad", label: "Sostenibilidad" },
    { id: "eco-creditos", label: "Eco-Créditos" },
    { id: "gestion-ambiental", label: "Gestión Ambiental" },
    { id: "ameru-ia", label: "Ameru IA — Clasificación" },
];

export default function RegisterSostenibilidadPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [verifMethod, setVerifMethod] = useState<"email" | "sms">("email");
    const [verifCode, setVerifCode] = useState("");
    const [verifSent, setVerifSent] = useState(false);
    const [verifVerified, setVerifVerified] = useState(false);
    const [verifLoading, setVerifLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const router = useRouter();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

    const stepFields: Record<number, (keyof FormData)[]> = {
        1: [
            "razonSocial",
            "rif",
            "telefono",
            "estado_empresa",
            "municipio_empresa",
            "direccion",
        ],
        2: [
            "tipo_residuos",
            "capacidad_toneladas",
            "certificacion_ambiental",
            "area_impacto",
            "tecnologia_clasificacion",
        ],
        3: [
            "repNombre",
            "repApellido",
            "repCedula",
            "rep_cargo",
            "rep_telefono",
            "repEmail",
            "password",
            "confirmPassword",
        ],
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        if (fields) {
            const v = await trigger(fields);
            if (!v) return;
        }
        setStep((s) => s + 1);
    };

    const startCountdown = () => {
        setCountdown(60);
        const i = setInterval(
            () =>
                setCountdown((c) => {
                    if (c <= 1) {
                        clearInterval(i);
                        return 0;
                    }
                    return c - 1;
                }),
            1000,
        );
    };

    const sendVerificationCode = async () => {
        const destino = verifMethod === "email" ? getValues("repEmail") : getValues("rep_telefono");
        setVerifLoading(true);
        try {
            const res = await fetch("/api/auth/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ destino, tipo: verifMethod }),
            });
            if (!res.ok) throw new Error((await res.json()).error);
            setVerifSent(true);
            startCountdown();
            toast({ title: "Código enviado" });
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setVerifLoading(false);
        }
    };

    const verifyCode = async () => {
        const destino = verifMethod === "email" ? getValues("repEmail") : getValues("rep_telefono");
        setVerifLoading(true);
        try {
            const res = await fetch("/api/auth/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ destino, codigo: verifCode }),
            });
            if (!res.ok) throw new Error((await res.json()).error);
            setVerifVerified(true);
            toast({ title: "¡Verificado!" });
        } catch (e: any) {
            toast({
                title: "Código incorrecto",
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setVerifLoading(false);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!verifVerified) {
            toast({ title: "Verificación pendiente", variant: "destructive" });
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tipo: "juridico",
                    razonSocial: data.razonSocial,
                    rif: data.rif,
                    tipo_empresa: "Gestión Ambiental y Sostenibilidad",
                    actividad_economica: `Gestión de residuos ${data.tipo_residuos} — ${data.tecnologia_clasificacion}`,
                    telefono: data.telefono,
                    estado_empresa: data.estado_empresa,
                    municipio_empresa: data.municipio_empresa,
                    direccion: data.direccion,
                    repNombre: data.repNombre,
                    repApellido: data.repApellido,
                    repCedula: data.repCedula,
                    rep_cargo: data.rep_cargo,
                    rep_telefono: data.rep_telefono,
                    repEmail: data.repEmail,
                    password: data.password,
                    email_verificado: verifMethod === "email",
                    telefono_verificado: verifMethod === "sms",
                    modules: MODULES_SOSTENIBILIDAD,
                }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);
            setStep(TOTAL_STEPS);
        } catch (e: any) {
            toast({
                title: "Error de registro",
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-start justify-center pt-16">
            <Card className="w-full border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-border/50 bg-muted/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <Recycle className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                Registro · Sostenibilidad
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
                                Ameru IA · Eco-Créditos · Gestión Ambiental
                            </CardDescription>
                        </div>
                    </div>
                    <Progress value={progress} className="h-1 mb-4" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Paso {step} de {TOTAL_STEPS}
                    </p>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-8 space-y-5">
                        {step === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2 space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Razón Social / Nombre Organización *
                                    </Label>
                                    <Input
                                        placeholder="Empresa o Asociación..."
                                        {...register("razonSocial")}
                                        className={cn(
                                            errors.razonSocial &&
                                                "border-destructive",
                                        )}
                                    />
                                    {errors.razonSocial && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.razonSocial.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        RIF *
                                    </Label>
                                    <Controller
                                        name="rif"
                                        control={control}
                                        render={({ field }) => (
                                            <DocumentInput
                                                type="rif"
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                error={!!errors.rif}
                                            />
                                        )}
                                    />
                                    {errors.rif && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.rif.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Teléfono *
                                    </Label>
                                    <Input
                                        type="tel"
                                        placeholder="0212-XXXXXXX"
                                        {...register("telefono")}
                                        className={cn(
                                            errors.telefono &&
                                                "border-destructive",
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Estado *
                                    </Label>
                                    <Controller
                                        name="estado_empresa"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger
                                                    className={cn(
                                                        errors.estado_empresa &&
                                                            "border-destructive",
                                                    )}
                                                >
                                                    <SelectValue placeholder="Seleccionar..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {ESTADOS_VE.map((e) => (
                                                        <SelectItem
                                                            key={e}
                                                            value={e}
                                                        >
                                                            {e}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Municipio *
                                    </Label>
                                    <Input
                                        {...register("municipio_empresa")}
                                        className={cn(
                                            errors.municipio_empresa &&
                                                "border-destructive",
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Dirección *
                                    </Label>
                                    <Input
                                        {...register("direccion")}
                                        className={cn(
                                            errors.direccion &&
                                                "border-destructive",
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 mb-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-2">
                                        <Leaf className="h-3.5 w-3.5" /> Perfil
                                        Ambiental
                                    </p>
                                    <p className="text-[9px] text-muted-foreground">
                                        Esta información configura los módulos
                                        de gestión de residuos, Eco-Créditos y
                                        la IA de clasificación Ameru.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            Tipo de Residuos Principales *
                                        </Label>
                                        <Controller
                                            name="tipo_residuos"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            errors.tipo_residuos &&
                                                                "border-destructive",
                                                        )}
                                                    >
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {TIPOS_RESIDUOS.map(
                                                            (t) => (
                                                                <SelectItem
                                                                    key={t}
                                                                    value={t}
                                                                >
                                                                    {t}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.tipo_residuos && (
                                            <p className="text-[10px] text-destructive">
                                                {errors.tipo_residuos.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            Capacidad Mensual (Toneladas) *
                                        </Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            placeholder="Ej: 150"
                                            {...register("capacidad_toneladas")}
                                            className={cn(
                                                errors.capacidad_toneladas &&
                                                    "border-destructive",
                                            )}
                                        />
                                        {errors.capacidad_toneladas && (
                                            <p className="text-[10px] text-destructive">
                                                {
                                                    errors.capacidad_toneladas
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            Certificación Ambiental *
                                        </Label>
                                        <Controller
                                            name="certificacion_ambiental"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            errors.certificacion_ambiental &&
                                                                "border-destructive",
                                                        )}
                                                    >
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {CERTIFICACIONES.map(
                                                            (c) => (
                                                                <SelectItem
                                                                    key={c}
                                                                    value={c}
                                                                >
                                                                    {c}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            Área de Impacto *
                                        </Label>
                                        <Controller
                                            name="area_impacto"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            errors.area_impacto &&
                                                                "border-destructive",
                                                        )}
                                                    >
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {AREAS_IMPACTO.map(
                                                            (a) => (
                                                                <SelectItem
                                                                    key={a}
                                                                    value={a}
                                                                >
                                                                    {a}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            Tecnología de Clasificación *
                                        </Label>
                                        <Controller
                                            name="tecnologia_clasificacion"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            errors.tecnologia_clasificacion &&
                                                                "border-destructive",
                                                        )}
                                                    >
                                                        <SelectValue placeholder="Seleccionar..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {TECNOLOGIAS_CLASIFICACION.map(
                                                            (t) => (
                                                                <SelectItem
                                                                    key={t}
                                                                    value={t}
                                                                >
                                                                    {t}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            Objetivo Eco-Créditos/Mes
                                        </Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="Ej: 500 créditos"
                                            {...register(
                                                "eco_creditos_objetivo",
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: "repNombre", label: "Nombre *" },
                                    { id: "repApellido", label: "Apellido *" },
                                    {
                                        id: "rep_cargo",
                                        label: "Cargo *",
                                        placeholder:
                                            "Ej: Director Ambiental, Gerente...",
                                    },
                                    { id: "rep_telefono", label: "Teléfono *" },
                                    {
                                        id: "repEmail",
                                        label: "Correo *",
                                        type: "email",
                                    },
                                ].map((f) => (
                                    <div key={f.id} className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">
                                            {f.label}
                                        </Label>
                                        <Input
                                            type={f.type || "text"}
                                            placeholder={f.placeholder || ""}
                                            {...register(
                                                f.id as keyof FormData,
                                            )}
                                            className={cn(
                                                (errors as any)[f.id] &&
                                                    "border-destructive",
                                            )}
                                        />
                                        {(errors as any)[f.id] && (
                                            <p className="text-[10px] text-destructive">
                                                {(errors as any)[f.id].message}
                                            </p>
                                        )}
                                    </div>
                                ))}
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Cédula *
                                    </Label>
                                    <Controller
                                        name="repCedula"
                                        control={control}
                                        render={({ field }) => (
                                            <DocumentInput
                                                type="cedula"
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                error={!!errors.repCedula}
                                            />
                                        )}
                                    />
                                    {errors.repCedula && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.repCedula.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Contraseña *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...register("password")}
                                            className={cn(
                                                "pr-10",
                                                errors.password &&
                                                    "border-destructive",
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((p) => !p)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">
                                        Confirmar Contraseña *
                                    </Label>
                                    <Input
                                        type="password"
                                        {...register("confirmPassword")}
                                        className={cn(
                                            errors.confirmPassword &&
                                                "border-destructive",
                                        )}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                {!verifSent ? (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Elige cómo verificar tu identidad:
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {(["email", "sms"] as const).map(
                                                (m) => (
                                                    <button
                                                        key={m}
                                                        type="button"
                                                        onClick={() =>
                                                            setVerifMethod(m)
                                                        }
                                                        className={cn(
                                                            "p-4 rounded-xl border text-xs font-black uppercase tracking-widest transition-all",
                                                            verifMethod === m
                                                                ? "border-emerald-500 bg-emerald-500/5 text-emerald-600"
                                                                : "border-border text-muted-foreground",
                                                        )}
                                                    >
                                                        {m === "email"
                                                            ? "📧 Correo"
                                                            : "📱 SMS"}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={sendVerificationCode}
                                            disabled={verifLoading}
                                        >
                                            {verifLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                "Enviar Código"
                                            )}
                                        </Button>
                                    </div>
                                ) : verifVerified ? (
                                    <div className="text-center py-6 space-y-3">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                                            <CheckCircle className="h-10 w-10 text-green-500" />
                                        </div>
                                        <p className="font-black text-green-600 uppercase tracking-widest text-xs">
                                            Identidad Verificada
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground text-center">
                                            Ingresa el código de 6 dígitos.
                                        </p>
                                        <Input
                                            maxLength={6}
                                            value={verifCode}
                                            onChange={(e) =>
                                                setVerifCode(
                                                    e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 6),
                                                )
                                            }
                                            className="text-center text-2xl tracking-[0.5em] font-mono"
                                        />
                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={verifyCode}
                                            disabled={
                                                verifLoading ||
                                                verifCode.length !== 6
                                            }
                                        >
                                            {verifLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Verificando...
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                                    Verificar
                                                </>
                                            )}
                                        </Button>
                                        <div className="text-center">
                                            {countdown > 0 ? (
                                                <p className="text-xs text-muted-foreground">
                                                    Reenviar en{" "}
                                                    <strong>
                                                        {countdown}s
                                                    </strong>
                                                </p>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        sendVerificationCode
                                                    }
                                                    disabled={verifLoading}
                                                    className="text-xs text-primary underline inline-flex items-center gap-1"
                                                >
                                                    <RefreshCw className="h-3 w-3" />
                                                    Reenviar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === TOTAL_STEPS && (
                            <div className="text-center py-8 space-y-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">
                                    ¡Perfil Ambiental Creado!
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Tu organización fue registrada en el módulo
                                    de{" "}
                                    <strong className="text-emerald-600">
                                        Sostenibilidad Ameru IA
                                    </strong>
                                    .
                                </p>
                                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-left text-xs space-y-2">
                                    <p className="font-black text-emerald-600 uppercase tracking-widest">
                                        Módulos habilitados:
                                    </p>
                                    {MODULES_SOSTENIBILIDAD.map((m) => (
                                        <p
                                            key={m.id}
                                            className="text-muted-foreground"
                                        >
                                            ✓ {m.label}
                                        </p>
                                    ))}
                                </div>
                                <Button
                                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => {
                                        router.push("/");
                                    }}
                                >
                                    Ir al Portal Ambiental
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>

                    {step < TOTAL_STEPS && (
                        <CardFooter className="flex justify-between p-8 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep((s) => s - 1)}
                                disabled={step === 1}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Anterior
                            </Button>
                            {step < 3 && (
                                <Button type="button" onClick={nextStep}>
                                    Siguiente
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                            {step === 3 && (
                                <Button type="button" onClick={nextStep}>
                                    Continuar
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                            {step === 4 && (
                                <Button
                                    type="submit"
                                    disabled={isLoading || !verifVerified}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Registrando...
                                        </>
                                    ) : (
                                        <>
                                            Crear Perfil Ambiental
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    )}
                    {step < TOTAL_STEPS && (
                        <p className="text-center text-xs text-muted-foreground pb-6">
                            ¿Ya tienes cuenta?{" "}
                            <Link
                                href="/login"
                                className="text-primary font-semibold hover:underline"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    )}
                </form>
            </Card>
        </div>
    );
}
