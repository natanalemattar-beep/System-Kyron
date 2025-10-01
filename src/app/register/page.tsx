

"use client";

import { useState } from "react";
import {
  FileText,
  Building,
  User,
  Eye,
  EyeOff,
  Mail,
  Phone,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [step, setStep] = useState(1); // 1 for form, 2 for verification

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit form data would go here
    // After successful submission, move to step 2
    setStep(2);
  };


  if (step === 2) {
    return (
        <div className="flex flex-col min-h-screen">
             <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground p-2 rounded-md">
                    <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                    <span className="text-lg font-bold">
                        System C.S.M
                    </span>
                    </div>
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild>
                    <Link href="/register">Registrarse</Link>
                    </Button>
                </div>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                 <Card className="w-full max-w-md mx-auto">
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
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <FileText className="h-6 w-6" />
            </div>
             <div className="flex flex-col">
              <span className="text-lg font-bold">
                System C.S.M
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Crear Cuenta</h1>
                <p className="text-muted-foreground">
                  Regístrate para acceder a todos los servicios gubernamentales digitales
                </p>
            </div>

            <Tabs defaultValue="juridica" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted h-12 p-1 mb-6">
                <TabsTrigger value="juridica" className="h-full data-[state=active]:bg-background data-[state=active]:shadow-sm flex gap-2">
                    <Building className="h-5 w-5"/> Persona Jurídica
                </TabsTrigger>
                <TabsTrigger value="natural" className="h-full data-[state=active]:bg-background data-[state=active]:shadow-sm flex gap-2">
                    <User className="h-5 w-5"/> Persona Natural
                </TabsTrigger>
              </TabsList>

              <TabsContent value="juridica" className="text-left">
                <form onSubmit={handleRegistration} className="space-y-6">
                    <div>
                    <h3 className="font-semibold mb-4 text-lg">Datos de la Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Razón Social</Label>
                            <Input type="text" placeholder="Nombre de la empresa" className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>RIF</Label>
                            <Input type="text" placeholder="J-12345678-9" className="h-12"/>
                        </div>
                    </div>
                    </div>

                    <div>
                    <h3 className="font-semibold mb-4 text-lg">Datos de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Correo Electrónico Principal</Label>
                            <Input type="email" placeholder="correo@ejemplo.com" className="h-12"/>
                        </div>
                         <div className="space-y-2">
                            <Label>Correo Electrónico de Recuperación</Label>
                            <Input type="email" placeholder="recuperacion@ejemplo.com" className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Teléfono</Label>
                            <Input type="tel" placeholder="0414-1234567" className="h-12"/>
                        </div>
                    </div>
                    </div>

                    <div>
                    <h3 className="font-semibold mb-4 text-lg">Seguridad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 relative">
                            <Label>Contraseña</Label>
                            <Input 
                                type={passwordVisible ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="h-12 pr-10"
                            />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                                {passwordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </button>
                        </div>
                        <div className="space-y-2 relative">
                            <Label>Confirmar Contraseña</Label>
                            <Input 
                                type={confirmPasswordVisible ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="h-12 pr-10"
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                                {confirmPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </button>
                        </div>
                    </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="terms-juridica" />
                        <Label htmlFor="terms-juridica" className="text-sm text-muted-foreground">
                        Acepto los{" "}
                        <Link href="#" className="underline text-primary hover:text-primary/80">
                            Términos de Servicio
                        </Link>{" "}
                        y la{" "}
                        <Link href="#" className="underline text-primary hover:text-primary/80">
                            Política de Privacidad
                        </Link>.
                        </Label>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg font-bold">
                        Registrar Empresa
                    </Button>
                </form>
              </TabsContent>

               <TabsContent value="natural" className="text-left">
                 <form onSubmit={handleRegistration} className="space-y-6">
                    <div>
                    <h3 className="font-semibold mb-4 text-lg">Datos Personales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nombres y Apellidos</Label>
                            <Input type="text" placeholder="Juan Pérez" className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Cédula de Identidad</Label>
                            <Input type="text" placeholder="V-12345678" className="h-12"/>
                        </div>
                    </div>
                    </div>

                    <div>
                    <h3 className="font-semibold mb-4 text-lg">Datos de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Correo Electrónico Principal</Label>
                            <Input type="email" placeholder="juan.perez@email.com" className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Correo Electrónico de Recuperación</Label>
                            <Input type="email" placeholder="recuperacion@email.com" className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Teléfono</Label>
                            <Input type="tel" placeholder="0412-1234567" className="h-12"/>
                        </div>
                    </div>
                    </div>

                    <div>
                    <h3 className="font-semibold mb-4 text-lg">Seguridad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 relative">
                            <Label>Contraseña</Label>
                            <Input 
                                type={passwordVisible ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="h-12 pr-10"
                            />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                                {passwordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </button>
                        </div>
                        <div className="space-y-2 relative">
                            <Label>Confirmar Contraseña</Label>
                            <Input 
                                type={confirmPasswordVisible ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="h-12 pr-10"
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                                {confirmPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </button>
                        </div>
                    </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="terms-natural" />
                        <Label htmlFor="terms-natural" className="text-sm text-muted-foreground">
                        Acepto los{" "}
                        <Link href="#" className="underline text-primary hover:text-primary/80">
                            Términos de Servicio
                        </Link>{" "}
                        y la{" "}
                        <Link href="#" className="underline text-primary hover:text-primary/80">
                            Política de Privacidad
                        </Link>.
                        </Label>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg font-bold">
                        Registrarme
                    </Button>
                 </form>
               </TabsContent>
            </Tabs>
             <p className="mt-8 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
