
"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Building, Briefcase, ShoppingCart, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const idByCountry: Record<string, { label: string, placeholder: string, defaultValue: string }> = {
    "VEN": { label: "Cédula de Identidad", placeholder: "V-12345678", defaultValue: "V-12345678" },
    "USA": { label: "Email / Username", placeholder: "user@email.com", defaultValue: "user@email.com" },
    "ESP": { label: "DNI / NIE", placeholder: "12345678A", defaultValue: "12345678A" },
    "COL": { label: "Cédula de Ciudadanía", placeholder: "1234567890", defaultValue: "1234567890" },
    "ARG": { label: "Documento Nacional de Identidad (DNI)", placeholder: "12.345.678", defaultValue: "12.345.678" },
    "MEX": { label: "Clave Única de Registro de Población (CURP)", placeholder: "ABCD123456HOMBRE12", defaultValue: "ABCD123456HOMBRE12" },
    "CHL": { label: "Rol Único Nacional (RUN)", placeholder: "12.345.678-K", defaultValue: "12.345.678-K" },
    "BRA": { label: "Cadastro de Pessoas Físicas (CPF)", placeholder: "123.456.789-00", defaultValue: "123.456.789-00" },
    "DEU": { label: "Personalausweisnummer", placeholder: "L01X00T29", defaultValue: "L01X00T29" },
    "FRA": { label: "Numéro de Carte Nationale d'Identité", placeholder: "123456789012", defaultValue: "123456789012" },
    "ITA": { label: "Codice Fiscale", placeholder: "ABCDEF12G34H567I", defaultValue: "ABCDEF12G34H567I" },
    "NLD": { label: "Burgerservicenummer (BSN)", placeholder: "123456789", defaultValue: "123456789" },
    "CHN": { label: "Resident Identity Card Number", placeholder: "110101199003071234", defaultValue: "110101199003071234" },
    "ARE": { label: "Emirates ID Number", placeholder: "784-1980-1234567-1", defaultValue: "784-1980-1234567-1" },
    "CAN": { label: "Social Insurance Number (SIN)", placeholder: "123-456-789", defaultValue: "123-456-789" },
};

const Credentials = ({ user, password }: { user: string; password?: string }) => {
    const { toast } = useToast();
    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `${field} copiado`,
            description: `${text} ha sido copiado al portapapeles.`,
        });
    };

    return (
        <div className="mt-6 w-full space-y-3 text-sm">
            <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                <span className="text-muted-foreground">ID: <strong className="text-foreground font-mono">{user}</strong></span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(user, 'ID')}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </div>
            {password && (
                <div className="flex justify-between items-center bg-secondary/50 p-2 rounded-md">
                    <span className="text-muted-foreground">Contraseña: <strong className="text-foreground font-mono">{password}</strong></span>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(password, 'Contraseña')}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function LoginNaturalPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState("VEN");

  const currentId = idByCountry[country] || { label: "Identificación Personal", placeholder: "", defaultValue: "" };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
      <CardHeader className="text-center">
        <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
          <User className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Acceso Personal</CardTitle>
        <CardDescription>Inicia sesión con tu documento de identidad.</CardDescription>
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
          <Label>{currentId.label}</Label>
          <Input id="idValue" type="text" placeholder={currentId.placeholder} defaultValue={currentId.defaultValue} />
        </div>
        <div className="space-y-2 relative">
          <Label>Contraseña</Label>
          <Input
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="••••••••"
            className="pr-10"
            defaultValue="password123"
          />
          <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
            {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <Button asChild className="w-full h-11 text-base">
          <Link href="/dashboard">Acceder</Link>
        </Button>
        <Credentials user={currentId.defaultValue} password="password123" />
      </CardContent>
      <CardFooter className="flex flex-col gap-4 text-center text-sm p-6 border-t">
        <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
        <div className="flex justify-center gap-4">
          <Link href="/login-fintech" className="font-medium text-primary hover:underline flex items-center gap-1">
            <Building className="h-4 w-4" /> FinTech
          </Link>
          <Link href="/login-ventas" className="font-medium text-primary hover:underline flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" /> Ventas
          </Link>
          <Link href="/login-rrhh" className="font-medium text-primary hover:underline flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> RR.HH.
          </Link>
        </div>
        <Separator className="my-2" />
        <Link href="/register/natural" className="font-medium text-primary hover:underline">
          Crear una cuenta nueva
        </Link>
      </CardFooter>
    </Card>
  );
}
