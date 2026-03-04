'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Ticket, Loader2, Send, Building2, User, HelpCircle } from "lucide-react";
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
  companySize: z.string().nonempty("Selecciona el tamaño"),
  module: z.string().nonempty("Selecciona un módulo"),
  message: z.string().optional(),
});

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
                <div key={unit} className="text-center p-2 bg-white/[0.03] rounded-xl w-16 border border-white/5 backdrop-blur-sm shadow-inner">
                    <div className="text-xl font-black tracking-tighter text-white">{String(value).padStart(2, '0')}</div>
                    <div className="text-[8px] uppercase font-black tracking-[0.2em] text-white/30">{unit}</div>
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
            module: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const result = await sendDemoRequestAction(values);
            if (result.success) {
                toast({
                    title: "TRANSACCIÓN COMPLETADA",
                    description: "Tus requerimientos han sido enviados a infosystemkyron@gmail.com. Un oficial de cuenta te contactará.",
                });
                form.reset();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "ERROR DE PROTOCOLO",
                description: "No se pudo transmitir la solicitud. Intenta de nuevo.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contacto" className="py-20 md:py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden hud-grid">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div 
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.4em] border border-primary/20">
                           <Ticket className="h-3 w-3"/> Acceso Prioritario
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase italic italic-shadow">
                            Inyecta Inteligencia <br/> <span className="text-primary">a tu Operación</span>
                        </h2>
                        <p className="text-sm md:text-lg text-white/40 max-w-xl leading-relaxed font-bold uppercase tracking-tight italic border-l-4 border-primary/30 pl-6 md:pl-8">
                            Despliegue de ecosistema personalizado. Completa el expediente técnico para iniciar la auditoría de tu negocio.
                        </p>
                        
                        <div className="pt-4 hidden md:block">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 italic">Expira en:</p>
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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-10 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Building2 className="h-32 w-32 rotate-12" />
                                </div>
                                
                                <div className="space-y-1 mb-6 relative z-10">
                                    <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-white">Expediente de Demo</h3>
                                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Información para auditoría técnica</p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Nombre Completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Ana Pérez" {...field} className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" />
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
                                                <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Cargo / Puesto</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold">
                                                            <SelectValue placeholder="Tu rol..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl bg-black border-white/10">
                                                        {["CEO / Dueño", "Gerente General", "Administrador", "Contador", "Director Legal", "Socio", "Otro"].map(r => (
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
                                                <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Empresa</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Kyron, C.A." {...field} className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" />
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
                                                <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Tamaño</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold">
                                                            <SelectValue placeholder="Empleados..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-xl bg-black border-white/10">
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email Corporativo</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="tu@correo.com" {...field} className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" />
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
                                                <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="0412-1234567" {...field} className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" />
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
                                            <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Módulo Maestro</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold">
                                                        <SelectValue placeholder="Seleccionar interés..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl border-white/10 bg-black/95">
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
                                            <FormLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Requerimientos / Notas</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="Describe brevemente tus necesidades operativas..." 
                                                    className="bg-white/[0.03] border-white/10 rounded-xl text-xs font-medium min-h-[80px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[9px]" />
                                        </FormItem>
                                    )}
                                />
                                
                                <Button type="submit" className="w-full text-[9px] font-black h-11 mt-4 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> TRANSMITIENDO...</>
                                    ) : (
                                        <span className="flex items-center gap-2">SOLICITAR ACCESO AL NODO <Send className="h-3 w-3" /></span>
                                    )}
                                </Button>
                                <p className="text-center text-[7px] text-white/20 uppercase font-black tracking-[0.4em] mt-4">Safe Data Protocol • SSL Layer Active • 2026</p>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
