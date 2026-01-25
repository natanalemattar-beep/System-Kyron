
'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Target, Eye, Rocket, Building, BookOpen, Gavel, Briefcase } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
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
    const { isHolidayActive } = useHoliday();

    return (
        <section id="nosotros" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                 {/* Social Proof Section */}
                <motion.div 
                    className="mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-center text-muted-foreground font-semibold mb-6">CON LA CONFIANZA DE EMPRESAS LÍDERES EN VENEZUELA</h3>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {clientLogos.map((logo, index) => {
                            const logoImage = PlaceHolderImages.find(img => img.id === logo.id);
                            return (
                                logoImage && <Image key={logo.id} src={logoImage.imageUrl} alt={logo.name} width={100} height={40} className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" data-ai-hint={logoImage.imageHint}/>
                            )
                        })}
                    </div>
                </motion.div>

                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Nuestra Filosofía</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Creemos en el poder de la tecnología para brindar tranquilidad y potenciar el crecimiento. Nuestra misión es simplificar lo complejo.</p>
                </motion.div>
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    <motion.div 
                        className="lg:col-span-2 space-y-8"
                         initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Target className="text-primary"/>Nuestra Misión</h3>
                            <p className="text-muted-foreground">Empoderar a las empresas venezolanas con herramientas inteligentes que garanticen su tranquilidad fiscal y potencien su crecimiento sostenible.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Eye className="text-primary"/>Nuestra Visión</h3>
                            <p className="text-muted-foreground">Ser el ecosistema de gestión empresarial líder en Latinoamérica, reconocido por nuestra innovación, seguridad y compromiso con el éxito de nuestros clientes.</p>
                        </div>
                         <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Rocket className="text-primary"/>Fundación Kyron</h3>
                            <p className="text-muted-foreground">Creemos en un futuro sostenible. A través de nuestra fundación, impulsamos iniciativas como la Tarjeta de Reciclaje, utilizando nuestra tecnología para incentivar la economía circular y la conciencia ambiental.</p>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="lg:col-span-3"
                         initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className={cn("rounded-xl p-6 md:p-8 mb-8 flex justify-around text-center", isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card")}>
                            <div>
                                <p className="text-4xl font-bold text-primary"><Counter from={0} to={500} />+</p>
                                <p className="text-sm text-muted-foreground">Empresas Activas</p>
                            </div>
                             <div>
                                <p className="text-4xl font-bold text-primary"><Counter from={0} to={10} />K+</p>
                                <p className="text-sm text-muted-foreground">Declaraciones Procesadas</p>
                            </div>
                             <div>
                                <p className="text-4xl font-bold text-primary">0%</p>
                                <p className="text-sm text-muted-foreground">Riesgo Fiscal</p>
                            </div>
                        </div>

                         <h3 className="text-xl font-semibold mb-4 text-center">Testimonios por Departamento</h3>
                         <div className="space-y-6">
                            {testimonials.map((testimonial) => {
                                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                                return (
                                    <blockquote key={testimonial.name} className={cn(
                                        "p-6 border rounded-xl",
                                        isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                                    )}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <testimonial.icon className="h-4 w-4 text-primary"/>
                                            <span className="text-xs font-semibold uppercase text-primary">{testimonial.module}</span>
                                        </div>
                                        <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                                        <footer className="flex items-center gap-3 mt-4">
                                            {avatar && (
                                                <Avatar className="h-10 w-10">
                                                <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div>
                                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                                            </div>
                                        </footer>
                                    </blockquote>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
