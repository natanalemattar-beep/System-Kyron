
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";

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
