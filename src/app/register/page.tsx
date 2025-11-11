
"use client";

import { useState } from "react";
import {
  Building,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Briefcase,
  Users,
  Cpu,
  Gavel,
  ShoppingCart,
  Megaphone,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState("juridica");

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };


  if (step === 2) {
    return (
        <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-background">
            <div className="absolute inset-0 z-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_50%)] dark:bg-grid-slate-700/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>
             <header className="sticky top-0 z-50 w-full bg-transparent">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-3">
                    <Logo />
                    <span className="text-lg font-bold">System C.M.S</span>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            Acceder
                            <User className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild><Link href="/login-natural">Acceso Natural</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-juridico">Admin y Finanzas</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/escritorio-juridico">Escritorio Jurídico</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-ventas">Ventas y Facturación</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-rrhh">Acceso RR.HH.</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-socios">Acceso Socios</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-marketing">Productos, Asesoría y Marketing</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/login-informatica">Ingeniería e Informática</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                 <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-md border">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <ShieldCheck className="h-10 w-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Verifica tu Cuenta</h1>
                        <p className="text-muted-foreground mb-6">
                            Introduce el código de 6 dígitos que enviamos a tu correo electrónico.
                        </p>
                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                             <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                         <Button className="w-full h-12 text-lg font-bold mt-8">
                            Verificar y Crear Cuenta
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground">
                            ¿No recibiste el código? <Link href="#" className="font-semibold text-primary hover:underline">Reenviar</Link>
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_50%)] dark:bg-grid-slate-700/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
             <span className="text-lg font-bold">System C.M.S</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    Acceder
                    <User className="ml-2 h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link href="/login-natural">Acceso Natural</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-juridico">Admin y Finanzas</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/escritorio-juridico">Escritorio Jurídico</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-ventas">Ventas y Facturación</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-rrhh">Acceso RR.HH.</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-socios">Acceso Socios</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-marketing">Productos, Asesoría y Marketing</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-informatica">Ingeniería e Informática</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-md border">
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Crear una Cuenta</h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Regístrate para simplificar la gestión de tu empresa o tus trámites personales.
                </p>
            </div>
            
            <form onSubmit={handleRegistration} className="space-y-6">
                 <div className="space-y-2">
                    <Label>Tipo de Cuenta</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo de cuenta..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="juridica">
                                <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4"/> Persona Jurídica (Empresa)
                                </div>
                            </SelectItem>
                            <SelectItem value="natural">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4"/> Persona Natural
                                </div>
                            </SelectItem>
                             <SelectItem value="personal">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4"/> Personal de la Empresa (Ventas, RRHH, etc.)
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            
                <div className={cn("space-y-6", accountType === "juridica" ? "block" : "hidden")}>
                    <h3 className="font-semibold text-lg border-b pb-2">Datos de la Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Razón Social</Label>
                            <Input type="text" placeholder="Nombre de la empresa"/>
                        </div>
                        <div className="space-y-2">
                            <Label>RIF</Label>
                            <Input type="text" placeholder="J-12345678-9"/>
                        </div>
                    </div>
                </div>

                <div className={cn("space-y-6", accountType === "natural" || accountType === "personal" ? "block" : "hidden")}>
                    <h3 className="font-semibold text-lg border-b pb-2">Datos Personales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nombres y Apellidos</Label>
                            <Input type="text" placeholder="Juan Pérez"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Cédula de Identidad</Label>
                            <Input type="text" placeholder="V-12345678"/>
                        </div>
                    </div>
                </div>

                <div className={cn("space-y-4 animate-in fade-in", accountType === "personal" ? "block" : "hidden")}>
                    <div className="p-4 bg-secondary/50 rounded-lg border">
                         <h3 className="font-semibold text-lg border-b pb-2">Datos de Empleado</h3>
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="employee-id">Código de Empleado / ID de Vendedor</Label>
                            <Input id="employee-id" type="text" placeholder="Introduzca su código de empleado"/>
                        </div>
                    </div>
                </div>
                
                <h3 className="font-semibold text-lg border-b pb-2 pt-4">Datos de Contacto y Seguridad</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Correo Electrónico</Label>
                        <Input type="email" placeholder="contacto@email.com"/>
                    </div>
                        <div className="space-y-2">
                        <Label>Teléfono</Label>
                        <Input type="tel" placeholder="0414-1234567"/>
                    </div>
                    <div className="space-y-2 relative">
                        <Label>Contraseña</Label>
                        <Input 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="pr-10"
                        />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                            {passwordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>
                    <div className="space-y-2 relative">
                        <Label>Confirmar Contraseña</Label>
                        <Input 
                            type={confirmPasswordVisible ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="pr-10"
                        />
                        <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                            {confirmPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms-juridica" />
                    <Label htmlFor="terms-juridica" className="text-sm text-muted-foreground">
                        Acepto los{" "}
                        <Link href="/terms" className="underline text-primary hover:text-primary/80">
                            Términos de Servicio
                        </Link>
                        {" y la "}
                        <Link href="/politica-privacidad" className="underline text-primary hover:text-primary/80">
                            Política de Privacidad
                        </Link>.
                    </Label>
                </div>

                <Button type="submit" className="w-full h-12 text-lg font-bold">
                    Registrar Cuenta
                </Button>
            </form>
             <p className="mt-8 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login-natural" className="font-semibold text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
