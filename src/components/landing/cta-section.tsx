'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Ticket, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginOptions } from "@/lib/login-options";
import { useToast } from "@/hooks/use-toast";

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
        <div className="flex justify-center lg:justify-start gap-4 my-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center p-2 bg-background/50 rounded-lg w-20 border border-border/50 backdrop-blur-sm shadow-inner">
                    <div className="text-3xl font-bold tracking-tighter">{String(value).padStart(2, '0')}</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{unit}</div>
                </div>
            ))}
        </div>
    );
};


export function CtaSection() {
    const { isHolidayActive } = useHoliday();
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        setTimeout(() => {
            toast({
                title: "¡Solicitud Recibida!",
                description: "Gracias, nos pondremos en contacto contigo pronto para agendar tu demo.",
            });
            form.reset();
            setIsSubmitting(false);
        }, 1500);
    }

    return (
        <section id="contacto" className="py-24 md:py-32 bg-background border-t">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest">
                           <Ticket className="h-4 w-4"/> Oferta por tiempo limitado
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1]">
                            Da el Salto a la <br/> <span className="text-primary">Gestión Inteligente</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                            Únete a las cientos de empresas que ya han eliminado la fragmentación operativa. Regístrate hoy y obtén 30 días de acceso premium sin costo.
                        </p>
                        
                        <div className="pt-4">
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">La oferta expira en:</p>
                            <CountdownTimer />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(
                                "space-y-5 p-8 md:p-10 border rounded-[2rem] shadow-2xl relative overflow-hidden bg-card/40 backdrop-blur-3xl",
                                isHolidayActive ? "border-primary/20" : "border-border"
                            )}>
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Ticket className="h-32 w-32 rotate-12" />
                                </div>
                                
                                <div className="space-y-1 mb-8 relative z-10">
                                    <h3 className="text-3xl font-bold">Solicita tu Demo Gratis</h3>
                                    <p className="text-muted-foreground">Un consultor se contactará contigo para una sesión personalizada.</p>
                                </div>
                                
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: Ana Pérez" {...field} className="h-12 bg-background/50 rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Empresa</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ej: Kyron, C.A." {...field} className="h-12 bg-background/50 rounded-xl" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="0412-1234567" {...field} className="h-12 bg-background/50 rounded-xl" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo Electrónico Corporativo</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="tu@correo.com" {...field} className="h-12 bg-background/50 rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="module"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Módulo de Interés</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 bg-background/50 rounded-xl">
                                                        <SelectValue placeholder="Selecciona un módulo..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {loginOptions.map(opt => (
                                                        <SelectItem key={opt.href} value={opt.label}>{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <Button type="submit" size="lg" className="w-full text-lg h-14 font-bold mt-6 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Procesando...</>
                                    ) : (
                                        "Comenzar mi Prueba Gratis"
                                    )}
                                </Button>
                                <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mt-4 opacity-60">Sin compromisos | Implementación guiada</p>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
