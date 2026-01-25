
'use client';

import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronRight, Layers, ShoppingCart, ShieldCheck, Briefcase, GitBranch, Megaphone, Video, Loader2 } from "lucide-react";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { FestiveEffect } from "../ui/confetti-effect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginOptions } from "@/lib/login-options";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  company: z.string().min(2, "El nombre de la empresa es muy corto"),
  module: z.string().nonempty("Debes seleccionar un módulo de interés"),
});

export function HeroSection() {
  const { activeHoliday, isHolidayActive } = useHoliday();
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
    console.log(values);
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
    <section id="inicio" className={cn(
        "relative min-h-dvh flex items-center justify-center overflow-hidden py-24 sm:py-32",
        !isHolidayActive && "bg-muted/30",
        isHolidayActive && "bg-transparent"
    )}>
      {isHolidayActive && <FestiveEffect type={activeHoliday.effect} />}
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-balance">
              Integra Contabilidad, RR.HH., Legal y Ventas en una <span className="text-primary">SOLA Plataforma</span>
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0 text-muted-foreground text-balance mt-6">
              Elimina 8 sistemas diferentes. Automatiza todos los departamentos de tu empresa venezolana con IA y Blockchain.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
               <div className="p-3 bg-secondary rounded-lg text-sm font-semibold">
                   30 días gratis | Especial para empresas venezolanas
                </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               <div className="w-full sm:w-auto aspect-video bg-secondary rounded-xl flex flex-col items-center justify-center border hover:border-primary transition-all cursor-pointer">
                    <Video className="h-16 w-16 text-primary mb-2" />
                    <p className="font-semibold">Ver Video (90s)</p>
               </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className={cn(
                  "space-y-4 p-8 border rounded-2xl shadow-2xl",
                  isHolidayActive ? "bg-card/70 backdrop-blur-xl" : "bg-card"
              )}>
                <h3 className="text-xl font-bold text-center">Solicita tu Demo Personalizada</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Ana Pérez" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Constructora XYZ, C.A." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@correo.com" {...field} />
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
                        <Input type="tel" placeholder="0412-1234567" {...field} />
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
                      <FormLabel>Módulo de Interés Principal</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
                
                <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                   Solicitar Demo Personalizada
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
