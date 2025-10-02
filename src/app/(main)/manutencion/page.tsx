
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CheckCircle, HeartHandshake } from "lucide-react";
import Image from "next/image";

const foundationHighlights = [
    { title: "Recolección y Reciclaje", description: "Transformamos papel, cartón y vidrio en recursos para financiar nuestra labor social.", },
    { title: "Apoyo a Comunidades", description: "Colaboramos con casas hogares y fundaciones para llevar alimentos y medicinas a quienes más lo necesitan.", },
    { title: "Generación de Empleo", description: "Creamos oportunidades laborales para personas en situación de vulnerabilidad a través de nuestras operaciones de reciclaje.", },
];

export default function ManutencionRedesignPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="relative py-24 md:py-40 flex items-center text-center text-white">
            <div className="absolute inset-0 -z-10">
                <Image 
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1920&auto=format&fit=crop"
                    alt="Voluntarios trabajando en la fundación"
                    data-ai-hint="volunteers community"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                        Fundación CRS: Reciclaje con Propósito
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-balance text-white/80 max-w-3xl mx-auto"  style={{textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>
                        Creemos en un modelo de negocio que va más allá de lo económico. Transformamos desechos en oportunidades, generando un impacto positivo en nuestra comunidad y en el medio ambiente.
                    </p>
                </div>
            </div>
        </section>
        
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Nuestra Misión: Un Círculo Virtuoso</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Nuestra fundación se dedica a la recolección de desechos como papel y vidrio. Los ingresos generados por el reciclaje se reinvierten directamente en programas de ayuda social.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     {foundationHighlights.map(item => (
                        <Card key={item.title} className="text-center flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm border shadow-lg">
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-6">
                                <HeartHandshake className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card/80 backdrop-blur-sm border-y">
             <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div>
                        <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop" alt="Entrega de donaciones" data-ai-hint="charity donation" width={800} height={600} className="rounded-xl shadow-2xl h-full w-full object-cover"/>
                    </div>
                    <div className="p-8 md:p-12">
                         <h2 className="text-3xl md:text-4xl font-bold">Nuestro Impacto</h2>
                        <p className="text-muted-foreground text-lg mt-4">
                            Cada kilo de material reciclado se convierte en un plato de comida, una medicina o un recurso para quienes más lo necesitan.
                        </p>
                        <ul className="space-y-4 pt-6">
                            <li className="flex items-start gap-3 text-md"><CheckCircle className="h-6 w-6 text-primary mt-1" /> Más de 10 toneladas de desechos reciclados al mes.</li>
                            <li className="flex items-start gap-3 text-md"><CheckCircle className="h-6 w-6 text-primary mt-1" /> Alianzas con 5+ casas hogares y comedores populares.</li>
                            <li className="flex items-start gap-3 text-md"><CheckCircle className="h-6 w-6 text-primary mt-1" /> Apoyo directo a más de 200 personas mensualmente.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 text-center">
             <div className="container mx-auto px-4 md:px-6">
                 <h2 className="text-3xl md:text-4xl font-bold">Únete a Nuestra Causa</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Tu empresa también puede ser parte del cambio. Contáctanos para conocer cómo puedes colaborar con nuestro programa de reciclaje corporativo.
                </p>
                <Button size="lg" className="mt-8">
                    Conviértete en Socio <ArrowRight className="ml-2"/>
                </Button>
            </div>
        </section>
      </main>
    </div>
  );
}
