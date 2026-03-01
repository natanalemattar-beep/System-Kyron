
'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, BookOpen, Gavel, Briefcase } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Counter = ({ from, to, duration = 1.5 }: { from: number, to: number, duration?: number }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            animate(count, to, { duration });
        }
    }, [count, inView, to, duration]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

const clientLogos = [
    { id: "client-logo-1", name: "Constructora XYZ" },
    { id: "client-logo-2", name: "Inversiones ABC" },
    { id: "client-logo-3", name: "Tech Solutions LLC" },
    { id: "client-logo-4", name: "Innovate Corp" },
    { id: "client-logo-5", name: "Epsilon Services" },
];

const testimonials = [
  {
    name: "Carlos Rodríguez",
    company: "Director de Contabilidad, Constructora XYZ",
    avatarId: "testimonial-avatar-1",
    module: "Centro de Contabilidad",
    icon: BookOpen,
    text: "Reduje 20 horas a la semana en conciliación manual. La automatización del Libro de Compras y Ventas y la conexión con el SENIAT es impecable.",
  },
  {
    name: "Ana Pérez",
    company: "Gerente de RR.HH., Inversiones ABC",
    avatarId: "testimonial-avatar-2",
    module: "Gestión de RR.HH.",
    icon: Briefcase,
    text: "Calculo y pago la nómina completa de 80 empleados en menos de una hora. El cálculo automático de prestaciones y la generación de recibos me ahorra días de trabajo al mes.",
  },
  {
    name: "Luis Martínez",
    company: "Asesor Legal, Tech Solutions LLC",
    avatarId: "testimonial-avatar-3",
    module: "Escritorio Jurídico",
    icon: Gavel,
    text: "Cero multas del SENIAT este trimestre. El sistema de alertas predictivas y el módulo de cumplimiento son una garantía de tranquilidad que no tiene precio en Venezuela.",
  }
];

export function AboutUsSection() {
    return (
        <section id="nosotros" className="py-20 md:py-28 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    className="mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-center text-muted-foreground font-black text-[10px] uppercase tracking-[0.5em] mb-10 opacity-40">Trust Network • Alianzas Estratégicas</h3>
                    <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
                        {clientLogos.map((logo) => {
                            const logoImage = PlaceHolderImages.find(img => img.id === logo.id);
                            return (
                                logoImage && <Image key={logo.id} src={logoImage.imageUrl} alt={logo.name} width={120} height={50} className="opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110" data-ai-hint={logoImage.imageHint}/>
                            )
                        })}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-16 items-start">
                    <motion.div 
                        className="lg:col-span-2 space-y-12"
                         initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic italic-shadow">El Equipo</h2>
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed">Fusionamos la ingeniería de software con la visión de negocios para transformar la realidad operativa de Venezuela.</p>
                        </div>

                        <div className="space-y-8 pt-6">
                            <div className="group">
                                <h3 className="text-xl font-black uppercase italic tracking-tight mb-3 flex items-center gap-3 group-hover:text-primary transition-colors"><Target className="text-primary h-5 w-5"/>Nuestra Misión</h3>
                                <p className="text-muted-foreground font-medium border-l-2 border-primary/20 pl-6">Empoderar a las empresas venezolanas con herramientas inteligentes que garanticen su tranquilidad fiscal y potencien su crecimiento sostenible.</p>
                            </div>
                            <div className="group">
                                <h3 className="text-xl font-black uppercase italic tracking-tight mb-3 flex items-center gap-3 group-hover:text-primary transition-colors"><Eye className="text-primary h-5 w-5"/>Nuestra Visión</h3>
                                <p className="text-muted-foreground font-medium border-l-2 border-primary/20 pl-6">Ser el ecosistema de gestión empresarial líder en Latinoamérica, reconocido por nuestra innovación, seguridad y compromiso absoluto.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="lg:col-span-3 space-y-10"
                         initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { val: 500, label: "Empresas", prefix: "+" },
                                { val: 10, label: "Declaraciones", suffix: "K+" },
                                { val: 0, label: "Riesgo Fiscal", suffix: "%" }
                            ].map((stat, i) => (
                                <Card key={i} className="bg-primary/[0.02] border-white/5 p-8 text-center rounded-2xl shadow-xl">
                                    <CardContent className="p-0">
                                        <p className="text-4xl font-black text-primary italic tracking-tighter mb-1">
                                            {stat.prefix}<Counter from={0} to={stat.val} />{stat.suffix}
                                        </p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                         <div className="space-y-6">
                            {testimonials.map((testimonial) => {
                                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                                return (
                                    <Card key={testimonial.name} className="glass-card border-none p-8 relative group overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
                                                <testimonial.icon className="h-20 w-24" />
                                            </div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <testimonial.icon className="h-4 w-4 text-primary"/>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{testimonial.module}</span>
                                            </div>
                                            <p className="text-base font-bold italic text-foreground/80 leading-relaxed mb-6">"{testimonial.text}"</p>
                                            <footer className="flex items-center gap-4">
                                                {avatar && (
                                                    <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-lg">
                                                        <AvatarImage src={avatar.imageUrl} alt={testimonial.name} />
                                                        <AvatarFallback className="font-black">{testimonial.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div>
                                                    <p className="font-black text-sm uppercase tracking-tight">{testimonial.name}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{testimonial.company}</p>
                                                </div>
                                            </footer>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
