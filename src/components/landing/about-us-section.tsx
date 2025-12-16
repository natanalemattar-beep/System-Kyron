
'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Target, Eye } from "lucide-react";

const teamMembers = [
  {
    name: "Carlos Mattar",
    role: "CEO & Fundador",
    avatarId: "testimonial-avatar-1",
    description: "Más de 15 años de experiencia liderando proyectos de tecnología y transformación digital en Latinoamérica."
  },
  {
    name: "Maria T. Hernandez",
    role: "CFO & Co-Fundadora",
    avatarId: "testimonial-avatar-2",
    description: "Experta en finanzas corporativas y cumplimiento, asegurando la sostenibilidad y el crecimiento financiero de Kyron."
  },
   {
    name: "Jose Herrera",
    role: "CTO & Co-Fundador",
    avatarId: "testimonial-avatar-3",
    description: "Arquitecto de software con una década de experiencia construyendo plataformas escalables y seguras en la nube."
  },
  {
    name: "Omar Mattar",
    role: "Head of Growth",
    avatarId: "testimonial-avatar-4",
    description: "Estratega de mercado enfocado en la expansión nacional y la creación de alianzas clave para el ecosistema Kyron."
  },
];

const testimonials = [
  {
    name: "Carlos Rodríguez",
    company: "Constructora XYZ",
    text: "System Kyron ha transformado nuestra gestión. Lo que antes nos tomaba días, ahora lo resolvemos en horas. La tranquilidad de saber que cumplimos con el SENIAT no tiene precio.",
  },
  {
    name: "Ana Pérez",
    company: "Inversiones ABC",
    text: "La plataforma es increíblemente intuitiva. El soporte técnico siempre está dispuesto a ayudar. Finalmente tenemos una solución que entiende las complejidades del mercado venezolano.",
  },
];

export function AboutUsSection() {
    const testimonialAvatar1 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-1");
    const testimonialAvatar2 = PlaceHolderImages.find((img) => img.id === "testimonial-avatar-2");

    return (
        <section id="nosotros" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Conoce a Kyron</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Nacimos de la necesidad de crear orden en el caos administrativo venezolano, fusionando tecnología, cumplimiento y visión de futuro.</p>
                </div>
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    <div 
                        className="lg:col-span-2 space-y-8"
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Target className="text-primary"/>Nuestra Misión</h3>
                            <p className="text-muted-foreground">Empoderar a las empresas venezolanas con herramientas inteligentes que garanticen su tranquilidad fiscal y potencien su crecimiento sostenible.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Eye className="text-primary"/>Nuestra Visión</h3>
                            <p className="text-muted-foreground">Ser el ecosistema de gestión empresarial líder en Latinoamérica, reconocido por nuestra innovación, seguridad y compromiso con el éxito de nuestros clientes.</p>
                        </div>
                        <div className="pt-4">
                            <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">Equipo Fundador</h3>
                            <div className="flex flex-wrap items-start justify-center sm:justify-start gap-4">
                                {teamMembers.map((member) => {
                                    const avatar = PlaceHolderImages.find(img => img.id === member.avatarId);
                                    return (
                                        <div key={member.name} className="flex flex-col items-center text-center w-24">
                                            {avatar && <Avatar className="w-20 h-20 mb-2">
                                                <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>}
                                            <h4 className="font-semibold text-sm">{member.name}</h4>
                                            <p className="text-primary font-medium text-xs">{member.role}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div 
                        className="lg:col-span-3"
                    >
                         <h3 className="text-xl font-semibold mb-4 text-center">Lo que Dicen Nuestros Clientes</h3>
                         <div className="space-y-6">
                            {testimonials.map((testimonial, index) => {
                                const avatar = index === 0 ? testimonialAvatar1 : testimonialAvatar2;
                                return (
                                    <blockquote key={index} className="p-6 border rounded-xl bg-card/50 backdrop-blur-sm">
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
                    </div>
                </div>
            </div>
        </section>
    );
}
