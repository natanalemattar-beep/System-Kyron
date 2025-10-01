
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Megaphone, Search, Paintbrush, Tv, Globe, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const servicios = {
    digital: [
        { icon: Search, title: "SEO y SEM", description: "Posicionamos tu marca en los primeros lugares de Google." },
        { icon: Globe, title: "Gestión de Redes Sociales", description: "Creamos contenido atractivo y gestionamos tu comunidad online." },
        { icon: Tv, title: "Publicidad Programática", description: "Campañas de banners y video segmentadas para tu público objetivo." },
    ],
    tradicional: [
        { icon: Tv, title: "Campañas en Prensa y Radio", description: "Llegamos a audiencias masivas a través de medios tradicionales." },
        { icon: Globe, title: "Vallas y Publicidad Exterior", description: "Impacto visual en puntos estratégicos de la ciudad." },
    ],
    marca: [
        { icon: Paintbrush, title: "Creación de Logotipos", description: "Diseñamos un logo memorable que represente la esencia de tu marca." },
        { icon: Search, title: "Desarrollo de Identidad Corporativa", description: "Definimos la voz, tono y estilo visual de tu empresa." },
    ]
}

const proceso = [
    "Diagnóstico Inicial: Analizamos tu marca, mercado y competencia.",
    "Diseño de Estrategia: Creamos un plan de marketing y publicidad a medida.",
    "Ejecución de Campañas: Lanzamos las campañas en los canales seleccionados.",
    "Medición y Optimización: Monitoreamos los resultados y ajustamos la estrategia para maximizar el ROI."
];

export default function AsesoriaPublicidadPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Solicitud de Consulta Enviada",
            description: "Gracias por tu interés. Uno de nuestros asesores se pondrá en contacto contigo a la brevedad.",
        });
    }

  return (
    <div className="p-4 md:p-8 space-y-12">
      <header className="text-center">
        <Megaphone className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Asesoría de Marketing y Publicidad</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Estrategias completas y personalizadas para hacer crecer tu negocio. Potenciamos tu marca y la conectamos con su público.
        </p>
      </header>

      {/* Servicios */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestros Servicios</h2>
        <div className="space-y-10">
            {/* Marketing Digital */}
            <div>
                <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Marketing Digital</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicios.digital.map(s => (
                        <Card key={s.title} className="bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex-row items-center gap-4">
                                <s.icon className="h-8 w-8 text-primary"/>
                                <CardTitle>{s.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{s.description}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
             {/* Publicidad Tradicional */}
            <div>
                <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Publicidad Tradicional</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicios.tradicional.map(s => (
                        <Card key={s.title} className="bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex-row items-center gap-4">
                                <s.icon className="h-8 w-8 text-primary"/>
                                <CardTitle>{s.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{s.description}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
             {/* Identidad de Marca */}
            <div>
                <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Identidad de Marca</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicios.marca.map(s => (
                        <Card key={s.title} className="bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex-row items-center gap-4">
                                <s.icon className="h-8 w-8 text-primary"/>
                                <CardTitle>{s.title}</CardTitle>
                            </CardHeader>
                            <CardContent>{s.description}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Proceso */}
        <section>
            <h2 className="text-3xl font-semibold mb-8 text-center">Nuestro Proceso de Colaboración</h2>
            <div className="max-w-4xl mx-auto">
                <ol className="relative border-l border-border ml-6">
                    {proceso.map((p, index) => (
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
        <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm">
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
