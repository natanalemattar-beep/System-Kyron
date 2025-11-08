
"use client";

import { useState } from "react";
import { Building, Eye, EyeOff, User, Briefcase, ShoppingCart, Users, Megaphone, Gavel } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/countries";

const taxIdByCountry: Record<string, { label: string, placeholder: string }> = {
    "VEN": { label: "RIF Empresarial", placeholder: "J-12345678-9" },
    "USA": { label: "Employer Identification Number (EIN)", placeholder: "12-3456789" },
    "ESP": { label: "Número de Identificación Fiscal (NIF)", placeholder: "A12345678" },
    "MEX": { label: "Registro Federal de Contribuyentes (RFC)", placeholder: "ABC123456XYZ" },
    "COL": { label: "Número de Identificación Tributaria (NIT)", placeholder: "123.456.789-0" },
    "ARG": { label: "Clave Única de Identificación Tributaria (CUIT)", placeholder: "20-12345678-9" },
    "BRA": { label: "Cadastro Nacional da Pessoa Jurídica (CNPJ)", placeholder: "12.345.678/0001-90" },
    "CHL": { label: "Rol Único Tributario (RUT)", placeholder: "76.123.456-K" },
    "DEU": { label: "Steuernummer / USt-IdNr.", placeholder: "DE123456789" },
    "FRA": { label: "Numéro de TVA / SIREN", placeholder: "FR12345678901" },
    "ITA": { label: "Partita IVA", placeholder: "IT12345678901" },
    "NLD": { label: "BTW-nummer / KvK-nummer", placeholder: "NL123456789B01" },
    "CHN": { label: "Unified Social Credit Code", placeholder: "91310000123456789A" },
    "ARE": { label: "Tax Registration Number (TRN)", placeholder: "100123456700003" },
};

export default function LoginJuridicoPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState("VEN");
  const [taxIdValue, setTaxIdValue] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard-juridico');
  };
  
  const currentTaxId = taxIdByCountry[country] || { label: "Identificación Fiscal", placeholder: "" };

  return (
    <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent animate-gradient-animation" style={{ animationDuration: '20s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/30 via-transparent to-transparent animate-gradient-animation" style={{ animationDuration: '25s', animationDelay: '5s' }}></div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-background/50 backdrop-blur-md border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hover:bg-primary/20">
                        Acceder
                        <User className="ml-2 h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/login-natural">Acceso Natural</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-juridico">Admin y Finanzas</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/escritorio-juridico">Escritorio Jurídico</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-ventas">Ventas y Facturación</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-rrhh">Acceso RR.HH.</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-socios">Acceso Socios</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-marketing">Productos, Asesoría y Marketing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/login-informatica">Informática y Tecnología</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border-border/50">
          <CardHeader className="text-center">
             <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4 mx-auto">
                <Building className="h-8 w-8 text-primary"/>
            </div>
            <CardTitle className="text-2xl">Acceso Administrativo</CardTitle>
            <CardDescription>Inicia sesión con la identificación fiscal de tu empresa.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
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
                <Label>{currentTaxId.label}</Label>
                <Input type="text" placeholder={currentTaxId.placeholder} value={taxIdValue} onChange={(e) => setTaxIdValue(e.target.value)} required />
              </div>
               <div className="space-y-2">
                <Label>Usuario</Label>
                <Input type="text" placeholder="admin.user" required />
              </div>
              <div className="space-y-2 relative">
                <Label>Contraseña</Label>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  required
                />
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                  {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <Button type="submit" className="w-full h-11 text-base">
                Acceder
              </Button>
            </CardContent>
          </form>
           <CardFooter className="flex flex-col gap-4 text-center text-sm p-6 border-t border-border/50">
              <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
              <div className="flex justify-center gap-4">
                <Link href="/login-natural" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <User className="h-4 w-4"/> Personal
                </Link>
                <Link href="/login-ventas" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4"/> Ventas
                </Link>
                 <Link href="/login-rrhh" className="font-medium text-primary hover:underline flex items-center gap-1">
                    <Briefcase className="h-4 w-4"/> RR.HH.
                </Link>
              </div>
               <Separator className="my-2"/>
               <Link href="/register" className="font-medium text-primary hover:underline">
                    Crear una cuenta nueva
                </Link>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}
