
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartHandshake, Phone, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const doctores = [
    { id: 1, nombre: "Dr. Roberto Méndez", especialidad: "Cardiología", clinica: "Clínica El Ávila", tlf: "0212-2761111" },
    { id: 2, nombre: "Dra. Elena Vargas", especialidad: "Pediatría", clinica: "Centro Médico Caracas", tlf: "0212-5552222" },
    { id: 3, nombre: "Dr. Luis Castillo", especialidad: "Traumatología", clinica: "Hospital de Clínicas Caracas", tlf: "0212-5086111" },
];

export default function DirectorioMedicoPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <HeartHandshake className="h-8 w-8 text-red-500" />
                    Directorio Médico Afiliado
                </h1>
                <p className="text-muted-foreground mt-2">Consulta los especialistas y centros de salud disponibles para tu cobertura.</p>
            </header>

            <div className="relative max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Buscar por especialidad, nombre o clínica..." className="pl-12 h-12" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {doctores.map(doc => (
                    <Card key={doc.id} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">{doc.nombre}</CardTitle>
                            <CardDescription className="font-semibold text-primary">{doc.especialidad}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" /> {doc.clinica}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" /> {doc.tlf}
                            </div>
                        </CardContent>
                        <CardContent>
                            <Button className="w-full">Agendar Cita</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
