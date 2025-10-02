
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Megaphone, Search, Paintbrush, Bot, Send, Calendar, MessageCircle, Wallet, Briefcase, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socialPlatforms = [
    { name: "WhatsApp", icon: MessageCircle },
    { name: "Instagram", icon: Wallet },
    { name: "Telegram", icon: Send },
]

const services = [
    { title: "Consultoría Estratégica", description: "Análisis y planificación para optimizar la toma de decisiones.", icon: Briefcase },
    { title: "Marketing Digital y Publicidad", description: "Campañas de SEO, redes sociales y publicidad programática.", icon: Megaphone },
    { title: "Análisis de Crecimiento", description: "Estudios de mercado, análisis FODA y estrategias de ventas.", icon: TrendingUp },
];

const processSteps = [
    "Contacto Inicial: El cliente interactúa con el agente virtual en WhatsApp, Instagram o Telegram.",
    "Calificación y Asesoramiento: La IA entiende las necesidades, responde preguntas y presenta los servicios.",
    "Agendamiento o Venta: El agente agenda una cita en el calendario o procesa la venta directamente.",
    "Pago Seguro: Se genera un enlace de pago a través de una pasarela segura conectada a tu banco.",
    "Confirmación y Seguimiento: El cliente recibe confirmación y el equipo es notificado para el seguimiento."
];


export default function AsesoriaVentasPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Solicitud de Consulta Enviada",
            description: "Gracias por tu interés. Uno de nuestros asesores o nuestro agente virtual se pondrá en contacto contigo a la brevedad.",
        });
    }

  return (
    <div className="space-y-12">
      <header className="text-center">
        <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Asesoría y Ventas con Agente Virtual IA</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
          Un asistente inteligente disponible 24/7 en tus redes sociales para agendar citas, cerrar ventas e informar sobre tus servicios.
        </p>
      </header>

      {/* Social Platforms */}
      <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Disponible en tus Plataformas Favoritas</h2>
          <div className="flex justify-center gap-8">
            {socialPlatforms.map(platform => (
                <div key={platform.name} className="flex flex-col items-center gap-2 text-muted-foreground">
                    <platform.icon className="h-10 w-10"/>
                    <span>{platform.name}</span>
                </div>
            ))}
          </div>
      </section>

       {/* Services */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
                <Card key={s.title} className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                           <s.icon className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent>{s.description}</CardContent>
                </Card>
            ))}
        </div>
      </section>

      {/* Proceso */}
        <section>
            <h2 className="text-3xl font-semibold mb-8 text-center">Nuestro Proceso Automatizado</h2>
            <div className="max-w-4xl mx-auto">
                <ol className="relative border-l border-border ml-6">
                    {processSteps.map((p, index) => (
                         <li key={index} className="mb-10 ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-secondary rounded-full -left-4 ring-8 ring-background">
                                <span className="font-bold text-sm">{index + 1}</span>
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold">{p.split(':')[0]}</h3>
                            <p className="text-muted-foreground">{p.split(':')[1]}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>


      {/* Contacto */}
      <section>
        <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
                <CardTitle>Solicita una Consulta Gratuita</CardTitle>
                <CardDescription>Cuéntanos sobre tu negocio y tus objetivos. Te contactaremos para una asesoría sin costo.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" placeholder="Tu nombre" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="empresa">Empresa</Label>
                            <Input id="empresa" placeholder="Nombre de tu empresa" />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="email">Correo Electrónico</Label>
                         <Input id="email" type="email" placeholder="tu@correo.com" required/>
                    </div>
                     <div className="space-y-2">
                         <Label htmlFor="mensaje">¿Cuáles son tus objetivos?</Label>
                         <Textarea id="mensaje" placeholder="Ej: Aumentar ventas online, mejorar mi marca, etc." required/>
                    </div>
                    <Button type="submit" className="w-full">
                        <Send className="mr-2"/>
                        Enviar Solicitud
                    </Button>
                </form>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}

    
