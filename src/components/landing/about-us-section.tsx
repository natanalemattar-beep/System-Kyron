
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
    text: "System Kyron ha eliminado el riesgo de pérdida de expedientes por humedad en la U.E.P. Gabriela Mistral. La inmutabilidad de los registros académicos es el blindaje que necesitábamos en La Guaira.",
  },
  {
    name: "Ana Pérez",
    company: "Gerente RR.HH., Holding Kyron",
    avatarId: "testimonial-avatar-2",
    module: "Gestión de Talento",
    icon: Briefcase,
    text: "La automatización del Plan de Acción y la jerarquía de mando nos permite ejecutar proyectos a gran escala con una eficiencia nunca antes vista.",
  },
];

export function AboutUsSection() {
    return (
        <section id="nosotros" className="py-24 md:py-32 bg-[#020202] relative overflow-hidden hud-grid">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none -z-10" />
            
            <div className="w-full px-6 relative z-10">
                <div className="grid lg:grid-cols-5 gap-20 items-start">
                    <motion.div 
                        className="lg:col-span-2 space-y-12"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20">
                                <Sparkles className="h-3 w-3" /> The Core Team
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic italic-shadow text-white">System <span className="text-primary">Kyron</span></h2>
                            <p className="text-lg text-white/40 font-bold uppercase tracking-tight leading-relaxed italic border-l-2 border-primary/30 pl-6">Ingeniería de software de alta precisión diseñada para el cumplimiento y la operatividad de misión crítica.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="group space-y-4">
                                <div className="p-4 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary/10 transition-all border border-primary/10">
                                    <Target className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white">Misión</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-relaxed">Blindar la gestión institucional mediante tecnología inmutable.</p>
                            </div>
                            <div className="group space-y-4">
                                <div className="p-4 bg-secondary/5 rounded-2xl w-fit group-hover:bg-secondary/10 transition-all border border-secondary/10">
                                    <Eye className="text-secondary h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white">Visión</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-relaxed">Ser el estándar global de interoperabilidad empresarial.</p>
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
                        <div className="grid grid-cols-3 gap-8">
                            {[
                                { val: 500, label: "Empresas", icon: ShieldCheck },
                                { val: 100, label: "Cumplimiento", suffix: "%", icon: Zap },
                                { val: 0, label: "Riesgo", suffix: "%", icon: Zap }
                            ].map((stat, i) => (
                                <Card key={i} className="glass-card border-none p-10 text-center rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                                        <stat.icon className="h-16 w-16" />
                                    </div>
                                    <p className="text-4xl font-black text-primary italic tracking-tighter mb-2">
                                        <Counter from={0} to={stat.val} />{stat.suffix}
                                    </p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-primary transition-colors">{stat.label}</p>
                                </Card>
                            ))}
                        </div>

                        <div className="space-y-8">
                            {testimonials.map((testimonial) => {
                                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                                return (
                                    <Card key={testimonial.name} className="glass-card border-none p-10 relative group overflow-hidden rounded-[2.5rem]">
                                        <CardContent className="p-0">
                                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all scale-150">
                                                <testimonial.icon className="h-24 w-24" />
                                            </div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <testimonial.icon className="h-4 w-4 text-primary"/>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{testimonial.module}</span>
                                            </div>
                                            <p className="text-xl font-bold italic text-white/80 leading-relaxed mb-8">"{testimonial.text}"</p>
                                            <footer className="flex items-center gap-6">
                                                {avatar && (
                                                    <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-xl">
                                                        <AvatarImage src={avatar.imageUrl} alt={testimonial.name} />
                                                        <AvatarFallback className="font-black">{testimonial.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div>
                                                    <p className="font-black text-sm uppercase tracking-widest text-white">{testimonial.name}</p>
                                                    <p className="text-[9px] font-bold text-primary/60 uppercase tracking-[0.2em] mt-1">{testimonial.company}</p>
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
