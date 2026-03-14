
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Ticket, Loader2, Send, Building2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
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
  message: z.string().optional(),
});

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
            module: "Contabilidad",
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
                    description: "Expediente enviado a revisión. Un oficial de cuenta iniciará contacto.",
                    action: <ShieldCheck className="text-primary h-4 w-4" />
                });
                form.reset();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "FALLA DE PROTOCOLO",
                description: "No se pudo transmitir la solicitud.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contacto" className="py-16 md:py-32 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div 
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em] border border-primary/20 mx-auto lg:ml-0">
                           <Ticket className="h-3 w-3"/> Acceso Prioritario
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-foreground uppercase italic">
                            Inyecta Inteligencia <br/> <span className="text-primary not-italic">a tu Operación</span>
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 leading-relaxed font-bold uppercase tracking-tight italic border-l-0 lg:border-l-4 border-primary/30 lg:pl-8">
                            Despliegue de ecosistema personalizado. Complete el expediente técnico para priorizar su auditoría técnica.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-10 border border-border/50 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden bg-card/40 backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Building2 className="h-24 w-24 md:h-32 md:w-32 rotate-12" />
                                </div>
                                
                                <div className="space-y-1 mb-6 relative z-10 text-center sm:text-left">
                                    <h3 className="text-lg md:text-2xl font-black tracking-tight uppercase italic text-foreground">Expediente de Demo</h3>
                                    <p className="text-[8px] md:text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Auditoría técnica v2.6.5</p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5 text-left">
                                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Nombre Maestro</FormLabel>
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
                                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Cargo</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Correo Electrónico</FormLabel>
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
                                                <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="0412..." {...field} className="h-10 bg-background/50 border-border/50 rounded-xl text-xs font-bold" />
                                                </FormControl>
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
                                            <FormLabel className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Módulo de Interés</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                <p className="text-center text-[7px] md:text-[8px] text-muted-foreground/40 uppercase font-black tracking-[0.4em] mt-4">Cifrado AES-256 • 2026</p>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
