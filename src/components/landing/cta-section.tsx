'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Ticket, Loader2, Send, Building2, User, HelpCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginOptions } from "@/lib/login-options";
import { useToast } from "@/hooks/use-toast";
import { sendDemoRequestAction } from "@/app/actions/send-demo-request";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  role: z.string().min(2, "Especifica tu cargo"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  company: z.string().min(2, "El nombre de la empresa es muy corto"),
  companySize: z.string().min(1, "Selecciona el tamaño"),
  sector: z.string().min(1, "Selecciona el sector"),
  urgency: z.string().min(1, "Selecciona la urgencia"),
  module: z.string().min(1, "Selecciona un módulo"),
  message: z.string().optional(),
});

const sectorOptions = ["Tecnología", "Comercio", "Construcción", "Salud", "Educación", "Logística", "Servicios", "Otros"];
const urgencyOptions = ["Baja (Planificación)", "Media (Próximo Mes)", "Alta (Inmediata)"];

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<{ [key: string]: number } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date("2024-12-31") - +new Date();
            if (difference > 0) {
                return {
                    días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutos: Math.floor((difference / 1000 / 60) % 60),
                    segundos: Math.floor((difference / 1000) % 60),
                };
            }
            return null;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearTimeout(timer);
    }, []);

    if (!timeLeft) return null;

    return (
        <div className="flex justify-center lg:justify-start gap-3 my-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center p-2 bg-card/40 backdrop-blur-md rounded-xl w-16 border border-border/50 shadow-inner">
                    <div className="text-xl font-black tracking-tighter text-foreground">{String(value).padStart(2, '0')}</div>
                    <div className="text-[8px] uppercase font-black tracking-[0.2em] text-muted-foreground/60">{unit}</div>
                </div>
            ))}
        </div>
    );
};

export function CtaSection() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
            company: "",
            companySize: "",
            sector: "",
            urgency: "",
            module: "Centro de Contabilidad",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const result = await sendDemoRequestAction(values);
            if (result.success) {
                toast({
                    title: "TRANSMISIÓN COMPLETADA",
                    description: "Expediente enviado a infosystemkyron@gmail.com. Un oficial de cuenta iniciará contacto.",
                    action: <ShieldCheck className="text-primary h-4 w-4" />
                });
                form.reset();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "FALLA DE PROTOCOLO",
                description: "No se pudo transmitir la solicitud. Verifique su conexión.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contacto" className="py-20 md:py-32 bg-transparent border-t border-border/50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div 
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] border border-primary/20">
                           <Ticket className="h-3 w-3"/> Acceso Prioritario
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-foreground uppercase italic italic-shadow">
                            Inyecta Inteligencia <br/> <span className="text-primary">a tu Operación</span>
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground max-w-xl leading-relaxed font-bold uppercase tracking-tight italic border-l-4 border-primary/30 pl-6 md:pl-8 text-justify">
                            Despliegue de ecosistema personalizado. Complete el expediente técnico detallando sector y nivel de urgencia para priorizar su auditoría de nodo.
                        </p>
                        
                        <div className="pt-4 hidden md:block">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-4 italic">Ventana de oportunidad expira en:</p>
                            <CountdownTimer />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-10 border border-border/50 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden bg-card/40 backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Building2 className="h-32 w-32 rotate-12" />
                                </div>
                                
                                <div className="space-y-1 mb-6 relative z-10">
                                    <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-foreground">Expediente de Demo</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Información para auditoría técnica v2.6.5</p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Nombre Maestro</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Ana Pérez" {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                                </FormControl>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Cargo Institucional</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold text-foreground">
                                                            <SelectValue placeholder="Tu rol..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl bg-card border-border">
                                                        {["CEO / Dueño", "Gerente General", "Administrador", "Contador", "Director Legal", "Socio"].map(r => (
                                                            <SelectItem key={r} value={r} className="text-xs uppercase font-bold">{r}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Razón Social</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Kyron, C.A." {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                                </FormControl>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="companySize"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Escalabilidad</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold text-foreground">
                                                            <SelectValue placeholder="Nº Empleados..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl bg-card border-border">
                                                        {["1-10", "11-50", "51-200", "201+"].map(s => (
                                                            <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s} Personas</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="sector"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Sector Económico</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold text-foreground">
                                                            <SelectValue placeholder="Sector..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl bg-card border-border">
                                                        {sectorOptions.map(s => (
                                                            <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="urgency"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Urgencia Operativa</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold text-foreground">
                                                            <SelectValue placeholder="Nivel..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl bg-card border-border">
                                                        {urgencyOptions.map(u => (
                                                            <SelectItem key={u} value={u} className="text-xs uppercase font-bold">{u}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Email Nodo</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="tu@correo.com" {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                                </FormControl>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Terminal Tlf.</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="0412-1234567" {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                                </FormControl>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="module"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Módulo de Interés</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold text-foreground">
                                                        <SelectValue placeholder="Seleccionar nodo..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl border-border bg-card">
                                                    {loginOptions.map(opt => (
                                                        <SelectItem key={opt.href} value={opt.label} className="text-xs font-bold uppercase">{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[9px]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Notas del Expediente</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="Breve descripción de necesidades operativas..." 
                                                    className="bg-background/50 border-border/50 rounded-xl text-xs font-medium min-h-[80px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[9px]" />
                                        </FormItem>
                                    )}
                                />
                                
                                <Button type="submit" className="w-full text-[10px] font-black h-11 mt-4 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> TRANSMITIENDO...</>
                                    ) : (
                                        <span className="flex items-center gap-2">SOLICITAR AUDITORÍA DE NODO <Send className="h-3 w-3" /></span>
                                    )}
                                </Button>
                                <p className="text-center text-[8px] text-muted-foreground/40 uppercase font-black tracking-[0.4em] mt-4">Protocolo de Datos Seguro • SSL AES-256 • 2026</p>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
