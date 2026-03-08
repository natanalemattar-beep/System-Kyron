
'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, BookOpen, Briefcase, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

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

const testimonials = [
  {
    name: "Carlos Mattar",
    company: "Líder Estratégico, System Kyron",
    avatarId: "testimonial-avatar-1",
    module: "Arquitectura IA",
    icon: BookOpen,
    text: "System Kyron ha eliminado el riesgo de pérdida de expedientes. La inmutabilidad de los registros es el blindaje que necesitábamos.",
  },
  {
    name: "Ana Pérez",
    company: "Gerente RR.HH., Holding Kyron",
    avatarId: "testimonial-avatar-2",
    module: "Gestión de Talento",
    icon: Briefcase,
    text: "La automatización y la jerarquía de mando nos permite ejecutar proyectos a gran escala con una eficiencia nunca antes vista.",
  },
];

export function AboutUsSection() {
    return (
        <section id="nosotros" className="py-16 md:py-32 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none -z-10" />
            
            <div className="w-full px-4 md:px-10 relative z-10">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
                    <motion.div 
                        className="lg:col-span-2 space-y-8 md:space-y-12 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20 mx-auto lg:ml-0">
                                <Sparkles className="h-3 w-3" /> El Equipo Central
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase italic text-foreground">System <span className="text-primary not-italic">Kyron</span></h2>
                            <p className="text-sm md:text-lg text-muted-foreground font-bold uppercase tracking-tight leading-relaxed italic border-l-0 lg:border-l-4 border-primary/30 lg:pl-8">Ingeniería de software de alta precisión diseñada para el cumplimiento de misión crítica.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                            <div className="group space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-all border border-primary/10 mx-auto lg:ml-0">
                                    <Target className="text-primary h-5 w-5" />
                                </div>
                                <h3 className="text-base md:text-lg font-black uppercase italic tracking-tight text-foreground">Misión</h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">Blindar la gestión institucional mediante tecnología inmutable.</p>
                            </div>
                            <div className="group space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary/20 transition-all">
                                <div className="p-3 bg-secondary/10 rounded-xl w-fit group-hover:bg-secondary/20 transition-all border border-secondary/10 mx-auto lg:ml-0">
                                    <Eye className="text-secondary h-5 w-5" />
                                </div>
                                <h3 className="text-base md:text-lg font-black uppercase italic tracking-tight text-foreground">Visión</h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">Ser el estándar global de interoperabilidad empresarial.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="lg:col-span-3 space-y-12"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 md:gap-8">
                            {[
                                { val: 500, label: "Empresas", icon: ShieldCheck },
                                { val: 100, label: "Cumplimiento", suffix: "%", icon: Zap },
                                { val: 0, label: "Riesgo", suffix: "%", icon: Zap }
                            ].map((stat, i) => (
                                <Card key={i} className="glass-card border-none p-6 md:p-10 text-center rounded-3xl shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-all">
                                        <stat.icon className="h-12 w-12 md:h-16 md:w-16" />
                                    </div>
                                    <p className="text-3xl md:text-4xl font-black text-primary italic tracking-tighter mb-2">
                                        <Counter from={0} to={stat.val} />{stat.suffix}
                                    </p>
                                    <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</p>
                                </Card>
                            ))}
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            {testimonials.map((testimonial) => {
                                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                                return (
                                    <Card key={testimonial.name} className="glass-card border-none p-6 md:p-10 relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                                        <CardContent className="p-0">
                                            <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-all scale-125 md:scale-150">
                                                <testimonial.icon className="h-16 w-16 md:h-24 md:w-24" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-4 md:mb-6">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <testimonial.icon className="h-4 w-4 text-primary"/>
                                                </div>
                                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">{testimonial.module}</span>
                                            </div>
                                            <p className="text-base md:text-xl font-bold italic text-foreground leading-relaxed mb-6 md:mb-8">"{testimonial.text}"</p>
                                            <footer className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                                                {avatar && (
                                                    <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-primary/20 shadow-xl">
                                                        <AvatarImage src={avatar.imageUrl} alt={testimonial.name} />
                                                        <AvatarFallback className="font-black">{testimonial.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="text-center sm:text-left">
                                                    <p className="font-black text-xs md:text-sm uppercase tracking-widest text-foreground">{testimonial.name}</p>
                                                    <p className="text-[8px] md:text-[9px] font-bold text-primary/60 uppercase tracking-[0.2em] mt-1">{testimonial.company}</p>
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
