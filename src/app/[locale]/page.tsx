'use client';

import {
  ServicesSection,
  FeaturesSection,
  AboutUsSection,
  FaqSection,
  CtaSection,
  Footer
} from "@/components/landing";
import { LandingHeader } from "@/components/landing/landing-header";
import { motion, useScroll, useSpring } from "framer-motion";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { WelcomeTutorial } from "@/components/welcome-tutorial";
import { Button } from "@/components/ui/button";
import { ArrowRight, Radio, Send, Building2, ShieldCheck, Zap, Loader2 } from "lucide-react";
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
        title: "TRANSACCIÓN COMPLETADA",
        description: "Expediente enviado a infosystemkyron@gmail.com. Un analista le contactará.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "ERROR DE RED",
        description: "No se pudo transmitir. Intente de nuevo.",
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-[#020202] flex flex-col overflow-x-hidden hud-grid selection:bg-primary/30 w-full">
      <DynamicBackground />
      <WelcomeTutorial />
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[200] shadow-glow" style={{ scaleX }} />
      <LandingHeader />
      
      <main className="relative flex-1 w-full transition-opacity duration-300">
        <div className="w-full">
            {/* HERO SECTION */}
            <section id="inicio">
              <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
                <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20 shadow-glow">
                        <Radio className="h-3 w-3 animate-pulse" /> Ecosistema de Telecomunicaciones v2.6.5
                      </div>
                      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-foreground uppercase italic italic-shadow">
                        SYSTEM <br/> <span className="text-primary">KYRON</span>
                      </h1>
                      <p className="text-lg md:text-2xl text-muted-foreground max-w-xl leading-snug font-bold border-l-4 border-primary/30 pl-8 opacity-80 uppercase tracking-tight text-balance">
                        Líneas <span className="text-secondary italic">5G Digitales</span>, <br/>
                        Conectividad <span className="text-primary tracking-tighter">eSIM</span> y Automatización.
                      </p>
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <Button asChild size="lg" className="btn-3d-primary h-12 px-8 text-[10px] font-black uppercase tracking-widest rounded-2xl group shadow-2xl">
                            <Link href="/register">REGISTRARSE POR PRIMERA VEZ <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" /></Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-[10px] font-black uppercase tracking-widest rounded-2xl border-white/10 hover:bg-white/5 shadow-xl bg-white/[0.02] backdrop-blur-xl transition-all">
                            <Link href="/estudio-poblacion">MODELO DE ZEDU</Link>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            
            <ServicesSection />
            <FeaturesSection />
            <AboutUsSection />
            <FaqSection />
            
            {/* CTA / FORM SECTION */}
            <section id="contacto" className="py-24 bg-transparent relative overflow-hidden hud-grid border-t border-white/5">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.4em] border border-primary/20">
                           <ShieldCheck className="h-3 w-3"/> Misión Crítica
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic italic-shadow leading-none">
                            Obtén tu <br/> <span className="text-primary">Demo Oficial</span>
                        </h2>
                        <p className="text-sm md:text-lg text-white/40 max-w-xl leading-relaxed font-bold uppercase tracking-tight italic border-l-4 border-primary/30 pl-8">
                            Despliegue de ecosistema personalizado. Los datos se transmiten directamente al buzón oficial de System Kyron para auditoría inmediata.
                        </p>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-8 md:p-12 border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5"><Building2 className="h-32 w-32 rotate-12" /></div>
                                <div className="mb-8 relative z-10"><h3 className="text-2xl font-black tracking-tight uppercase italic text-white">Expediente de Solicitud</h3><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Información de Misión Crítica</p></div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Nombre Completo</FormLabel><FormControl><Input placeholder="Ana Pérez" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="role" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Cargo</FormLabel><FormControl><Input placeholder="CEO / Gerente" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Email Corporativo</FormLabel><FormControl><Input type="email" placeholder="tu@empresa.com" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Teléfono</FormLabel><FormControl><Input type="tel" placeholder="0412-1234567" {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="company" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Razón Social</FormLabel><FormControl><Input placeholder="Kyron, C.A." {...field} className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold" /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="companySize" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Personal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold"><SelectValue placeholder="Empleados..." /></SelectTrigger></FormControl><SelectContent className="bg-black border-white/10">{["1-10", "11-50", "51-200", "201+"].map(s => <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s} Personas</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="sector" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Sector</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold"><SelectValue placeholder="Sector..." /></SelectTrigger></FormControl><SelectContent className="bg-black border-white/10">{["Telecom", "Retail", "Legal", "Educación", "Gobierno", "Otro"].map(s => <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="urgency" render={({ field }) => (
                                        <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Urgencia</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold"><SelectValue placeholder="Tiempo..." /></SelectTrigger></FormControl><SelectContent className="bg-black border-white/10">{["Inmediata", "30 Días", "90 Días", "Solo Consulta"].map(s => <SelectItem key={s} value={s} className="text-xs uppercase font-bold">{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="module" render={({ field }) => (
                                    <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Interés Maestro</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-11 bg-white/[0.03] border-white/10 rounded-xl text-xs font-bold"><SelectValue placeholder="Seleccionar módulo..." /></SelectTrigger></FormControl><SelectContent className="bg-black border-white/10">{loginOptions.map(opt => <SelectItem key={opt.href} value={opt.label} className="text-xs font-bold uppercase">{opt.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                )} />

                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem><FormLabel className="text-[8px] font-black uppercase text-white/40 tracking-widest ml-1">Requerimientos Específicos</FormLabel><FormControl><Textarea placeholder="Describa sus necesidades..." className="bg-white/[0.03] border-white/10 rounded-xl text-xs font-medium min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                
                                <Button type="submit" className="w-full text-[10px] font-black h-12 mt-6 shadow-xl btn-3d-primary rounded-xl" disabled={isSubmitting}>
                                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> TRANSMITIENDO...</> : <span className="flex items-center gap-2">SOLICITAR ACCESO AL NODO <Send className="h-3.5 w-3.5" /></span>}
                                </Button>
                                <p className="text-center text-[7px] text-white/20 uppercase font-black tracking-[0.4em] mt-4 italic">Encrypted Transmission • Master Server Active • 2026</p>
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
