
"use client";

import { useState } from "react";
import {
  FileText,
  Building,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900/50 dark:to-background">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-background/80 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-teal-600 text-white p-2 rounded-md">
              <FileText className="h-6 w-6" />
            </div>
             <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                System C.R.S
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Plataforma Digital Oficial
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg mx-auto bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Crear Cuenta</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Regístrate para acceder a todos los servicios gubernamentales digitales
                </p>
            </div>

            <Tabs defaultValue="juridica" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-background/50 h-12 p-1 mb-6">
                <TabsTrigger value="juridica" className="h-full data-[state=active]:bg-white dark:data-[state=active]:bg-card/80 data-[state=active]:shadow-sm flex gap-2">
                    <Building className="h-5 w-5"/> Persona Jurídica
                </TabsTrigger>
                <TabsTrigger value="natural" className="h-full data-[state=active]:bg-white dark:data-[state=active]:bg-card/80 data-[state=active]:shadow-sm flex gap-2">
                    <User className="h-5 w-5"/> Persona Natural
                </TabsTrigger>
              </TabsList>

              <TabsContent value="juridica" className="text-left space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Datos de la Empresa</h3>
                  <div className="space-y-4">
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
                        <Label>Correo Electrónico</Label>
                        <Input type="email" placeholder="correo@ejemplo.com" className="h-12"/>
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
                        <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-muted-foreground">
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
                        <button onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                            {confirmPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms-juridica" />
                    <Label htmlFor="terms-juridica" className="text-sm text-muted-foreground">
                    Acepto los{" "}
                    <Link href="#" className="underline text-teal-600 hover:text-teal-700">
                        Términos de Servicio
                    </Link>{" "}
                    y la{" "}
                    <Link href="#" className="underline text-teal-600 hover:text-teal-700">
                        Política de Privacidad
                    </Link>.
                    </Label>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg font-bold">
                    Registrar Empresa
                </Button>
              </TabsContent>

               <TabsContent value="natural" className="text-left space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Datos Personales</h3>
                  <div className="space-y-4">
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
                        <Label>Correo Electrónico</Label>
                        <Input type="email" placeholder="juan.perez@email.com" className="h-12"/>
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
                        <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-muted-foreground">
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
                        <button onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                            {confirmPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                        </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms-natural" />
                    <Label htmlFor="terms-natural" className="text-sm text-muted-foreground">
                    Acepto los{" "}
                    <Link href="#" className="underline text-teal-600 hover:text-teal-700">
                        Términos de Servicio
                    </Link>{" "}
                    y la{" "}
                    <Link href="#" className="underline text-teal-600 hover:text-teal-700">
                        Política de Privacidad
                    </Link>.
                    </Label>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg font-bold">
                    Registrarme
                </Button>
               </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
