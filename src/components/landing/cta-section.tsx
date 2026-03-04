'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Ticket, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
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
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  company: z.string().min(2, "El nombre de la empresa es muy corto"),
  module: z.string().nonempty("Debes seleccionar un módulo de interés"),
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
            email: "",
            phone: "",
            company: "",
            module: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const result = await sendDemoRequestAction(values);
            if (result.success) {
                toast({
                    title: "SOLICITUD TRANSMITIDA",
                    description: "La información ha sido enviada al correo oficial: infosystemkyron@gmail.com. Un consultor te contactará pronto.",
                });
                form.reset();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "ERROR DE CONEXIÓN",
                description: "No se pudo transmitir la solicitud. Inténtalo de nuevo.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contacto" className="py-24 md:py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden hud-grid">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.4em] border border-primary/20">
                           <Ticket className="h-3 w-3"/> Oferta Limitada
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase italic italic-shadow">
                            Inyecta Inteligencia <br/> <span className="text-primary">a tu Negocio</span>
                        </h2>
                        <p className="text-lg text-white/40 max-w-xl leading-relaxed font-bold uppercase tracking-tight italic border-l-4 border-primary/30 pl-8">
                            Elimina la fragmentación operativa. Únete al ecosistema Kyron y obtén acceso total nivel corporativo.
                        </p>
                        
                        <div className="pt-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 italic">Expira en:</p>
                            <CountdownTimer />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-8 md:p-10 border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Send className="h-32 w-32 rotate-12" />
                                </div>
                                
                                <div className="space-y-1 mb-6 relative z-10">
                                    <h3 className="text-2xl font-black tracking-tight uppercase italic text-white">Solicitar Demo</h3>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Transmisión directa al equipo central</p>
                                </div>
                                
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Nombre Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: Ana Pérez" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-primary text-xs font-bold" />
                                            </FormControl>
                                            <FormMessage className="text-[10px] font-bold" />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Empresa</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Kyron, C.A." {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-primary text-xs font-bold" />
                                                </FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="0412-1234567" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-primary text-xs font-bold" />
                                                </FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email Corporativo</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="tu@correo.com" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-primary text-xs font-bold" />
                                            </FormControl>
                                            <FormMessage className="text-[10px] font-bold" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="module"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Módulo de Interés</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold">
                                                        <SelectValue placeholder="Seleccionar módulo..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-xl border-white/10 bg-black/95">
                                                    {loginOptions.map(opt => (
                                                        <SelectItem key={opt.href} value={opt.label} className="text-xs font-bold uppercase">{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px] font-bold" />
                                        </FormItem>
                                    )}
                                />
                                
                                <Button type="submit" className="w-full text-[10px] font-black h-11 mt-4 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> TRANSMITIENDO...</>
                                    ) : (
                                        "COMENZAR PRUEBA GRATIS"
                                    )}
                                </Button>
                                <p className="text-center text-[8px] text-white/20 uppercase font-black tracking-[0.4em] mt-4">Safe Data Protocol • SSL Layer Active</p>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
