
'use client';

import {
  ServicesSection,
  FeaturesSection,
  Footer
} from "@/components/landing";
import { LandingHeader } from "@/components/landing/landing-header";
import { motion, useScroll, useSpring } from "framer-motion";
import { WelcomeTutorial } from "@/components/welcome-tutorial";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
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
import { FloatingOrb } from "@/components/ui/floating-orb";

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
    defaultValues: { 
      name: "", 
      role: "", 
      email: "", 
      phone: "", 
      company: "", 
      companySize: "", 
      sector: "", 
      urgency: "", 
      module: "", 
      message: "" 
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await sendDemoRequestAction(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "SOLICITUD RECIBIDA",
        description: "El expediente ha sido transmitido exitosamente.",
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
    <div className="relative min-h-screen bg-black flex flex-col overflow-x-hidden hud-grid selection:bg-primary/20 w-full">
      <WelcomeTutorial />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-primary/40 shadow-glow origin-left z-[200]" 
        style={{ scaleX }} 
      />
      
      <LandingHeader />
      
      <main className="relative flex-1 w-full pt-32 md:pt-40">
        <div className="container mx-auto px-6 max-w-7xl">
            <section id="inicio" className="mb-32 md:mb-48 relative min-h-[75vh] flex flex-col items-center justify-center">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
                    <FloatingOrb />
                </div>

                <div className="text-center space-y-10 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-glow backdrop-blur-xl"
                    >
                        <Zap className="h-3 w-3" /> NODO ESTRATÉGICO v2.6.5
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-[7.5rem] font-black tracking-tighter leading-none text-white uppercase italic italic-shadow"
                    >
                        System Kyron <br/>
                        <span className="text-primary/40">El Motor de tu Empresa</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-bold uppercase tracking-tight italic border-l-4 border-primary/30 pl-8"
                    >
                        Líneas 5G, Tecnología Magnética y Ledger Inmutable. <br/>
                        Infraestructura de Misión Crítica para el mercado venezolano.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl btn-3d-primary">
                            <Link href="/register" className="flex items-center gap-2">COMENZAR REGISTRO <ArrowRight className="h-4 w-4"/></Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
            
            <ServicesSection />
            <FeaturesSection />
            
            <section id="contacto" className="py-32 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase italic">
                            Solicita tu <span className="text-primary/40">Demo Maestra</span>
                        </h2>
                        <p className="text-lg text-white/40 font-bold uppercase tracking-tight leading-relaxed max-w-lg italic border-l-4 border-primary/30 pl-8">
                            Auditamos tu infraestructura actual y configuramos un nodo de prueba personalizado para tu empresa.
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">
                            <ShieldCheck className="h-4 w-4 text-primary" /> Protocolo Seguro SSL Activo
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 md:p-12 border border-white/10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-[9px] font-black uppercase tracking-widest text-white/40">Nombre</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Tu nombre..." {...field} className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-bold" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="company" render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-[9px] font-black uppercase tracking-widest text-white/40">Empresa</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Nombre empresa..." {...field} className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-bold" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-[9px] font-black uppercase tracking-widest text-white/40">Email</FormLabel>
                                          <FormControl>
                                            <Input type="email" placeholder="tu@correo.com" {...field} className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-bold" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="module" render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-[9px] font-black uppercase tracking-widest text-white/40">Módulo</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                              <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-xl text-xs font-bold">
                                                <SelectValue placeholder="Elegir módulo..." />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-black border-white/10">
                                              {loginOptions.map(opt => (
                                                <SelectItem key={opt.href} value={opt.label} className="text-xs font-bold uppercase">
                                                  {opt.label}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-[9px] font-black uppercase tracking-widest text-white/40">Requerimientos</FormLabel>
                                      <FormControl>
                                        <Textarea placeholder="Describe tus necesidades..." className="bg-white/5 border-white/10 rounded-xl text-xs font-medium min-h-[100px]" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                )} />
                                
                                <Button type="submit" className="w-full h-14 rounded-2xl btn-3d-primary font-black text-[10px] uppercase tracking-widest" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : "ENVIAR SOLICITUD AL NODO CENTRAL"}
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
