

"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Globe, ArrowRight, Ticket, Users, Mic, Presentation, Code } from "lucide-react";
import Image from "next/image";

const featuredEvent = {
    title: "Venezuela Startup Summit 2024",
    date: "Por Anunciar",
    location: "Caracas, Venezuela",
    description: "Un día completo de conferencias abiertas al público, diseñado para más de 600 asistentes y con la participación de más de 50 speakers de primer nivel. Este espacio único reunirá a fundadores, inversionistas, líderes y visionarios venezolanos que están marcando historia a nivel global.",
    image: "https://picsum.photos/seed/summit2024/1200/400"
};

const workshops = [
    { title: "Bases del Emprendimiento", icon: Code },
    { title: "Construcción y Desarrollo de Productos", icon: Presentation },
    { title: "Financiamiento (Venture Capital)", icon: Code },
    { title: "Habilidades de Pitch y Presentación", icon: Mic },
];


const feriasNacionales = [
    {
        titulo: "ExpoVenta Caracas 2024",
        fecha: "15-18 de Agosto, 2024",
        lugar: "CIEC, Caracas",
        descripcion: "El mayor encuentro de emprendedores y empresas de Venezuela. Una oportunidad única para conectar, vender y aprender.",
        imagen: "https://picsum.photos/seed/expo1/600/400"
    },
    {
        titulo: "Feria Internacional de Turismo de Venezuela (FITVEN)",
        fecha: "23-26 de Noviembre, 2024",
        lugar: "La Guaira",
        descripcion: "Plataforma de promoción turística que reúne a operadores nacionales e internacionales para mostrar el potencial de Venezuela.",
        imagen: "https://picsum.photos/seed/expo2/600/400"
    },
    {
        titulo: "Congreso Nacional de Construcción",
        fecha: "10-12 de Octubre, 2024",
        lugar: "Hotel Eurobuilding, Caracas",
        descripcion: "Evento que reúne a los líderes del sector construcción para discutir sobre innovación, sostenibilidad y nuevas tecnologías.",
        imagen: "https://picsum.photos/seed/expo3/600/400"
    },
];

const feriasInternacionales = [
    {
        titulo: "Web Summit 2024",
        fecha: "11-14 de Noviembre, 2024",
        lugar: "Lisboa, Portugal",
        descripcion: "La conferencia de tecnología más grande del mundo. Conecta con startups, inversores y gigantes tecnológicos.",
        imagen: "https://picsum.photos/seed/expo4/600/400"
    },
    {
        titulo: "CES 2025",
        fecha: "7-10 de Enero, 2025",
        lugar: "Las Vegas, EE.UU.",
        descripcion: "El escenario global para la innovación. Descubre las últimas tendencias en electrónica de consumo y tecnología emergente.",
        imagen: "https://picsum.photos/seed/expo5/600/400"
    },
];

export default function FeriasEventosPage() {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Calendar className="h-8 w-8" />
                Ferias y Eventos
            </h1>
            <p className="text-muted-foreground mt-2">
                Descubre oportunidades para expandir tu negocio en eventos nacionales e internacionales.
            </p>
        </header>

        {/* Featured Event */}
        <Card className="mb-12 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="relative h-64 w-full">
                <Image src={featuredEvent.image} alt={featuredEvent.title} layout="fill" objectFit="cover" className="opacity-80"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-bold text-white shadow-md">{featuredEvent.title}</h2>
                    <div className="flex items-center gap-4 text-white/90 text-sm mt-2">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {featuredEvent.date}</div>
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {featuredEvent.location}</div>
                    </div>
                </div>
            </div>
            <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Conferencias de Primer Nivel</h3>
                    <p className="text-muted-foreground">{featuredEvent.description}</p>
                    <Button className="mt-4">
                        <Ticket className="mr-2"/>
                        Comprar Entradas
                    </Button>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Workshops para Emprendedores</h4>
                        <p className="text-sm text-muted-foreground">Talleres prácticos diseñados para equipar a los emprendedores con herramientas y conocimientos esenciales.</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {workshops.map(w => (
                                <div key={w.title} className="p-3 bg-secondary/50 rounded-lg flex items-center gap-2">
                                    <w.icon className="h-5 w-5 text-primary"/>
                                    <span className="text-xs font-medium">{w.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Pitch Competition</h4>
                        <p className="text-sm text-muted-foreground">Presentaciones de las ideas más prometedoras de las principales universidades del país, agrupadas por vertical, para demostrar la creatividad, resiliencia y visión de la nueva generación de emprendedores.</p>
                    </div>
                </div>
            </CardContent>
        </Card>


         <Tabs defaultValue="nacionales">
            <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
              <TabsTrigger value="nacionales" className="flex items-center gap-2"><MapPin className="h-4 w-4"/>Ferias Nacionales</TabsTrigger>
              <TabsTrigger value="internacionales" className="flex items-center gap-2"><Globe className="h-4 w-4"/>Ferias Internacionales</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nacionales" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {feriasNacionales.map((feria) => (
                        <Card key={feria.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="relative aspect-video mb-4">
                                    <Image src={feria.imagen} alt={feria.titulo} layout="fill" className="rounded-md object-cover"/>
                                </div>
                                <CardTitle>{feria.titulo}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    <Calendar className="h-4 w-4"/> {feria.fecha}
                                </CardDescription>
                                 <CardDescription className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4"/> {feria.lugar}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{feria.descripcion}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    Obtener Información y Registrarse <ArrowRight className="ml-2"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="internacionales" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {feriasInternacionales.map((feria) => (
                        <Card key={feria.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="relative aspect-video mb-4">
                                    <Image src={feria.imagen} alt={feria.titulo} layout="fill" className="rounded-md object-cover"/>
                                </div>
                                <CardTitle>{feria.titulo}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    <Calendar className="h-4 w-4"/> {feria.fecha}
                                </CardDescription>
                                 <CardDescription className="flex items-center gap-2">
                                    <Globe className="h-4 w-4"/> {feria.lugar}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{feria.descripcion}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline">
                                    Ver Sitio Oficial <ArrowRight className="ml-2"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
