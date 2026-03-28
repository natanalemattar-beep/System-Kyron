"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { registerOptions } from "@/lib/register-options";
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
                colors.glow,
                "border-border/40"
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
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed font-medium flex-grow">
                    {option.description}
                </p>

                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/20">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/50 group-hover:text-primary transition-colors">
                        Iniciar Registro
                    </span>
                    <ArrowRight className="h-3 w-3 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}

export default function RegisterSelectionPage() {
    const personalOptions = registerOptions.filter(o =>
        ['/register/natural', '/register/telecom'].includes(o.href)
    );
    const enterpriseOptions = registerOptions.filter(o =>
        !['/register/natural', '/register/telecom'].includes(o.href)
    );

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

                <header className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-5">
                        <ShieldCheck className="h-3 w-3" /> Registro Cifrado AES-256
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-4">
                        <span className="text-foreground">Únete al </span>
                        <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent italic">Ecosistema</span>
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground/60 max-w-lg mx-auto font-bold uppercase tracking-wide">
                        Selecciona tu perfil para comenzar el proceso de registro.
                    </p>
                </header>

                <section className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
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
                    <div className="flex items-center gap-4 mb-6">
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
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Registro en 2 Minutos</span>
                        <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground/60 font-medium mb-4 max-w-md mx-auto">
                        Cada módulo tiene un formulario adaptado con verificación de correo y teléfono incluida.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> VEN-NIF</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> SENIAT</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> LOTTT</span>
                        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary/40" /> BCV</span>
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground/50 mt-8 font-bold">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-primary font-black hover:underline uppercase tracking-wide">
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
