'use client';

import {
  ServicesSection,
  FeaturesSection,
  AboutUsSection,
  FaqSection,
  Footer
} from "@/components/landing";
import { LandingHeader } from "@/components/landing/landing-header";
import { motion, useScroll, useSpring } from "framer-motion";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { WelcomeTutorial } from "@/components/welcome-tutorial";
import { Button } from "@/components/ui/button";
import { ArrowRight, Radio, Send, Building2, ShieldCheck, Zap, Loader2, Cpu } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sendDemoRequestAction } from "@/app/actions/send-demo-request";
import { loginOptions } from "@/lib/login-options";

const formSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  role: z.string().min(2, "Cargo requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(10, "Mínimo 10 dígitos"),
  company: z.string().min(2, "Nombre de empresa requerido"),
  companySize: z.string().min(1, "Selecciona tamaño"),
  sector: z.string().min(1, "Selecciona sector"),
  urgency: z.string().min(1, "Selecciona urgencia"),
  module: z.string().min(1, "Selecciona interés"),
  message: z.string().optional(),
});

export default function LandingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 40, restDelta: 0.001 });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", role: "", email: "", phone: "", company: "", companySize: "", sector: "", urgency: "", module: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await sendDemoRequestAction(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "SOLICITUD RECIBIDA",
        description: "El expediente ha sido transmitido a infosystemkyron@gmail.com.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "FALLA DE TRANSMISIÓN",
        description: "Error en el protocolo de red. Reintente.",
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-black flex flex-col overflow-x-hidden resend-grid selection:bg-white/10 w-full">
      <WelcomeTutorial />
      
      <motion.div className="fixed top-0 left-0 right-0 h-[1px] bg-white/20 origin-left z-[200]" style={{ scaleX }} />
      <LandingHeader />
      
      <main className="relative flex-1 w-full pt-32 md:pt-48">
        <div className="container mx-auto px-6 max-w-7xl">
            {/* HERO SECTION */}
            <section id="inicio" className="mb-32 md:mb-48">
                <div className="text-center space-y-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60"
                    >
                        <Zap className="h-3 w-3 text-white" /> Version 2.6.5 is now live
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tight leading-tight text-white"
                    >
                        System Kyron <br/>
                        <span className="text-white/40">The Business Engine</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
                    >
                        Líneas 5G, Automatización Fiscal y Ledger Inmutable. <br/>
                        La infraestructura definitiva para el comercio moderno.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Button asChild className="btn-premium h-12 px-8">
                            <Link href="/register">REGISTRARSE POR PRIMERA VEZ</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
            
            <ServicesSection />
            <FeaturesSection />
            
            {/* CTA FORM SECTION */}
            <section id="contacto" className="py-32 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                            Solicita tu <span className="text-white/40">Demo Corporativa</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                            Nuestro equipo técnico realizará un diagnóstico de su infraestructura y preparará un nodo de prueba personalizado.
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                            <ShieldCheck className="h-4 w-4" /> Military Grade Encryption
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 md:p-12 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nombre</FormLabel><FormControl><Input placeholder="Ana Pérez" {...field} className="h-11 bg-black border-white/10 rounded-lg text-sm" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="company" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/40">Empresa</FormLabel><FormControl><Input placeholder="Kyron C.A." {...field} className="h-11 bg-black border-white/10 rounded-lg text-sm" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email</FormLabel><FormControl><Input type="email" placeholder="tu@empresa.com" {...field} className="h-11 bg-black border-white/10 rounded-lg text-sm" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="module" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/40">Interés</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-11 bg-black border-white/10 rounded-lg text-sm"><SelectValue placeholder="Módulo..." /></SelectTrigger></FormControl><SelectContent className="bg-black border-white/10">{loginOptions.map(opt => <SelectItem key={opt.href} value={opt.label}>{opt.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem><FormLabel className="text-[10px] font-bold uppercase tracking-widest text-white/40">Notas</FormLabel><FormControl><Textarea placeholder="Requerimientos específicos..." className="bg-black border-white/10 rounded-lg text-sm min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                
                                <Button type="submit" className="w-full btn-premium h-12" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : "Enviar Solicitud"}
                                </Button>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </section>
            
            <Footer />
        </div>
      </main>
    </div>
  );
}
