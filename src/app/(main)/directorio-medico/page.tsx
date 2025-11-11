
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { HeartPulse, Search, MapPin, ShieldCheck, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const medicos = [
    {
        id: 1,
        nombre: "Dr. Carlos Rodríguez",
        especialidad: "Cardiólogo",
        ubicacion: "Caracas",
        avatar: "https://picsum.photos/seed/doc1/200/200",
        seguros: ["Seguros Caracas", "Mercantil Seguros"],
        financiamiento: true,
    },
    {
        id: 2,
        nombre: "Dra. Ana Pérez",
        especialidad: "Dermatólogo",
        ubicacion: "Valencia",
        avatar: "https://picsum.photos/seed/doc2/200/200",
        seguros: ["Banesco Seguros"],
        financiamiento: false,
    },
    {
        id: 3,
        nombre: "Dr. Luis Martínez",
        especialidad: "Pediatra",
        ubicacion: "Maracay",
        avatar: "https://picsum.photos/seed/doc3/200/200",
        seguros: ["Seguros Caracas", "Mapfre Seguros"],
        financiamiento: true,
    },
     {
        id: 4,
        nombre: "Dra. Sofía Gómez",
        especialidad: "Ginecólogo",
        ubicacion: "Caracas",
        avatar: "https://picsum.photos/seed/doc4/200/200",
        seguros: ["Mercantil Seguros", "La Previsora"],
        financiamiento: false,
    },
];

export default function DirectorioMedicoPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMedicos = medicos.filter(medico => 
        medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <HeartPulse className="h-8 w-8" />
                    Directorio Médico
                </h1>
                <p className="text-muted-foreground mt-2">
                    Encuentra profesionales de la salud, seguros aceptados y opciones de financiamiento.
                </p>
            </header>

            <div className="mb-8 relative max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input 
                    placeholder="Buscar por nombre, especialidad o ciudad..."
                    className="pl-10 h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMedicos.map(medico => (
                    <Card key={medico.id} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex-row items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={medico.avatar} alt={medico.nombre} />
                                <AvatarFallback>{medico.nombre.charAt(5)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{medico.nombre}</CardTitle>
                                <CardDescription>{medico.especialidad}</CardDescription>
                                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {medico.ubicacion}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary"/>Seguros Aceptados</h4>
                                <div className="flex flex-wrap gap-2">
                                    {medico.seguros.map(seguro => (
                                        <Badge key={seguro} variant="secondary">{seguro}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary"/>Financiamiento</h4>
                                {medico.financiamiento ? (
                                    <Badge variant="default">Opciones Disponibles</Badge>
                                ) : (
                                    <Badge variant="outline">No disponible</Badge>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Ver Perfil y Agendar Cita</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    );
}

