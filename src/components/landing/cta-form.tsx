'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader as Loader2, Send, Building2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
});

export function CtaForm() {
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
            module: "Contabilidad",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const result = await sendDemoRequestAction(values);
            if (result.success) {
                toast({
                    title: "TRANSMISIÓN COMPLETADA",
                    description: "Expediente enviado a revisión. Un oficial de cuenta iniciará contacto.",
                    action: <ShieldCheck className="text-primary h-4 w-4" />
                });
                form.reset();
            } else {
                toast({
                    variant: "destructive",
                    title: "ERROR EN REGISTRO",
                    description: result.error || "No se pudo procesar la solicitud. Intente nuevamente.",
                });
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="glass-liquid space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Building2 className="h-24 w-24 md:h-32 md:w-32 rotate-12 text-primary/20" />
                </div>
                
                <div className="space-y-1 mb-6 relative z-10 text-center sm:text-left">
                    <h3 className="text-lg md:text-2xl font-black tracking-tight uppercase italic text-foreground">Solicitar Acceso</h3>
                    <p className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Registro de interés · System Kyron v2.8.5</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Nombre Maestro</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tu nombre" {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Cargo</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder="Rol..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {["CEO / Dueño", "Gerente General", "Administrador", "Otros"].map(r => (
                                            <SelectItem key={r} value={r} className="text-xs uppercase font-bold">{r}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="tu@correo.com" {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Teléfono</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="0412..." {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Empresa</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la empresa" {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                </FormControl>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Tamaño</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder="Empleados..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {["1-5", "6-20", "21-50", "51-200", "200+"].map(s => (
                                            <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Sector</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder="Sector..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {["Comercio", "Servicios", "Manufactura", "Tecnología", "Construcción", "Salud", "Educación", "Transporte", "Agricultura", "Otro"].map(s => (
                                            <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5 text-left">
                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Urgencia</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                            <SelectValue placeholder="Prioridad..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
                                        {["Inmediata", "Esta semana", "Este mes", "Explorando opciones"].map(u => (
                                            <SelectItem key={u} value={u} className="text-xs uppercase font-bold">{u}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-[8px]" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="module"
                    render={({ field }) => (
                        <FormItem className="space-y-1.5 text-left">
                            <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Módulo de Interés</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold">
                                        <SelectValue placeholder="Seleccionar..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl">
                                    {loginOptions.map(opt => (
                                        <SelectItem key={opt.href} value={opt.label} className="text-xs font-bold uppercase">{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-[8px]" />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full text-[9px] md:text-[10px] font-black h-12 md:h-14 mt-4 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> TRANSMITIENDO...</>
                    ) : (
                        <span className="flex items-center gap-2 justify-center">SOLICITAR AUDITORÍA <Send className="h-3 w-3" /></span>
                    )}
                </Button>
                <p className="text-center text-[7px] md:text-[8px] text-muted-foreground/70 uppercase font-black tracking-[0.4em] mt-4">Cifrado AES-256 • 2026</p>
            </form>
        </Form>
    );
}
