
"use client";

import { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";

const idByCountry: Record<string, { label: string, placeholder: string }> = {
    "VEN": { label: "Cédula de Identidad", placeholder: "V-12345678" },
    "USA": { label: "Email / Username", placeholder: "user@email.com" },
    "ESP": { label: "DNI / NIE", placeholder: "12345678A" },
    "COL": { label: "Cédula de Ciudadanía", placeholder: "1234567890" },
    "ARG": { label: "Documento Nacional de Identidad (DNI)", placeholder: "12.345.678" },
    "MEX": { label: "Clave Única de Registro de Población (CURP)", placeholder: "ABCD123456HOMBRE12" },
    "CHL": { label: "Rol Único Nacional (RUN)", placeholder: "12.345.678-K" },
    "BRA": { label: "Cadastro de Pessoas Físicas (CPF)", placeholder: "123.456.789-00" },
    "DEU": { label: "Personalausweisnummer", placeholder: "L01X00T29" },
    "FRA": { label: "Numéro de Carte Nationale d'Identité", placeholder: "123456789012" },
    "ITA": { label: "Codice Fiscale", placeholder: "ABCDEF12G34H567I" },
    "NLD": { label: "Burgerservicenummer (BSN)", placeholder: "123456789" },
    "CHN": { label: "Resident Identity Card Number", placeholder: "110101199003071234" },
    "ARE": { label: "Emirates ID Number", placeholder: "784-1980-1234567-1" },
    "CAN": { label: "Social Insurance Number (SIN)", placeholder: "123-456-789" },
};

export default function RegisterNaturalPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [country, setCountry] = useState("VEN");

    const currentId = idByCountry[country] || { label: "Identificación Personal", placeholder: "" };

    return (
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
                    <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Registro Personal</CardTitle>
                <CardDescription>Crea tu cuenta para gestionar tus trámites personales.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <Label>País</Label>
                    <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar país..." />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="id-number">{currentId.label}</Label>
                    <Input id="id-number" type="text" placeholder={currentId.placeholder} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@correo.com" required />
                </div>
                <div className="space-y-2 relative">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                        required
                    />
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                        {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <Button type="submit" className="w-full h-11 text-base">Crear Cuenta</Button>
            </CardContent>
            <CardFooter className="flex-col p-6 border-t text-sm">
                <p className="text-muted-foreground">¿Ya tienes una cuenta?</p>
                <Link href="/login-natural" className="font-medium text-primary hover:underline">
                    Inicia sesión aquí
                </Link>
            </CardFooter>
        </Card>
    );
}
