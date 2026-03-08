'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, BookOpen, Briefcase, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    company: "Ingeniero Maestro, System Kyron",
    avatarId: "testimonial-avatar-1",
    module: "Gestión IA",
    icon: BookOpen,
    text: "La plataforma ha eliminado el riesgo de pérdida de documentos. El registro seguro de los expedientes es la garantía que necesitábamos.",
  },
  {
    name: "Ana Pérez",
    company: "Directora, Holding Kyron",
    avatarId: "testimonial-avatar-2",
    module: "Recursos Humanos",
    icon: Briefcase,
    text: "La automatización de procesos nos permite gestionar proyectos a gran escala con una eficiencia profesional nunca antes vista.",
  },
];

export function AboutUsSection() {
    const economyImage = PlaceHolderImages.find(img => img.id === "digital-economy");

    return (
        <section id="nosotros" className="py-20 md:py-32 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-primary/5 blur-[150px] pointer-events-none -z-10" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-start">
                    
                    <motion.div 
                        className="lg:col-span-5 space-y-12 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/20 mx-auto lg:ml-0 shadow-glow-sm">
                                <Sparkles className="h-3 w-3" /> Equipo Profesional
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Sobre <span className="text-primary not-italic">Nosotros</span></h2>
                            <p className="text-base md:text-xl text-white/60 font-bold uppercase tracking-tight leading-relaxed italic border-l-0 lg:border-l-4 border-primary/30 lg:pl-8">Desarrollamos soluciones de gestión diseñadas para la excelencia empresarial.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Card className="glass-card border-none p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all group shadow-2xl">
                                <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:scale-110 transition-transform mb-6 mx-auto lg:ml-0 shadow-inner border border-primary/10">
                                    <Target className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white mb-2">Misión</h3>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Garantizar la gestión empresarial mediante registros seguros y transparentes.</p>
                            </Card>
                            <Card className="glass-card border-none p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all group shadow-2xl">
                                <div className="p-3 bg-secondary/10 rounded-xl w-fit group-hover:scale-110 transition-transform mb-6 mx-auto lg:ml-0 shadow-inner border border-secondary/10">
                                    <Eye className="text-secondary h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white mb-2">Visión</h3>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Consolidarnos como el estándar de eficiencia para empresas e instituciones.</p>
                            </Card>
                        </div>

                        <Card className="glass-card border-none p-2 rounded-[2.5rem] bg-white/[0.01] overflow-hidden group shadow-2xl">
                            <div className="aspect-video relative rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                                {economyImage && (
                                    <Image src={economyImage.imageUrl} alt={economyImage.description} fill className="object-cover contrast-[1.1]" />
                                )}
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div 
                        className="lg:col-span-7 space-y-16"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { val: 500, label: "EMPRESAS", icon: ShieldCheck, color: "text-primary" },
                                { val: 100, label: "CUMPLIMIENTO", suffix: "%", icon: Zap, color: "text-secondary" },
                                { val: 0, label: "ERRORES FISCALES", suffix: "%", icon: Zap, color: "text-rose-400" }
                            ].map((stat, i) => (
                                <Card key={i} className="glass-card border-none p-8 text-center rounded-[2rem] bg-white/[0.02] relative overflow-hidden group shadow-2xl border border-white/5">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all"><stat.icon className="h-16 w-16" /></div>
                                    <p className={cn("text-4xl font-black italic tracking-tighter mb-2", stat.color)}>
                                        <Counter from={0} to={stat.val} />{stat.suffix}
                                    </p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">{stat.label}</p>
                                </Card>
                            ))}
                        </div>

                        <div className="space-y-8">
                            {testimonials.map((testimonial) => {
                                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                                return (
                                    <Card key={testimonial.name} className="glass-card border-none p-10 relative group overflow-hidden rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all shadow-2xl border border-white/5">
                                        <CardContent className="p-0 space-y-8">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-primary/10 rounded-lg shadow-inner"><testimonial.icon className="h-4 w-4 text-primary"/></div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">{testimonial.module}</span>
                                            </div>
                                            <p className="text-xl md:text-2xl font-bold italic text-white/80 leading-relaxed">"{testimonial.text}"</p>
                                            <footer className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-white/5">
                                                {avatar && (
                                                    <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-2xl">
                                                        <AvatarImage src={avatar.imageUrl} alt={testimonial.name} />
                                                        <AvatarFallback className="font-black bg-black text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="text-center sm:text-left space-y-1">
                                                    <p className="font-black text-sm uppercase tracking-widest text-white">{testimonial.name}</p>
                                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{testimonial.company}</p>
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
