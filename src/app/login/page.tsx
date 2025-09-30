
"use client";

import { useState } from "react";
import {
  FileText,
  Building,
  User,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e2a5a] via-[#1c244f] to-[#301c56]">
      <header className="sticky top-0 z-50 w-full">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white/10 text-white p-2 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">GobiernaVE</span>
              <span className="text-xs text-gray-300">
                Plataforma Digital Oficial
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Link href="#">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto bg-black/20 dark:bg-black/20 backdrop-blur-lg border-white/10 shadow-2xl rounded-2xl">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="p-4 bg-white/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
            <p className="text-gray-300 mb-6">
              Accede a tu cuenta para gestionar tus trámites
            </p>

            <Tabs defaultValue="juridica" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 h-12 p-1">
                <TabsTrigger value="juridica" className="h-full data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=inactive]:text-gray-400 flex gap-2">
                    <Building className="h-5 w-5"/> Jurídica
                </TabsTrigger>
                <TabsTrigger value="natural" className="h-full data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=inactive]:text-gray-400 flex gap-2">
                    <User className="h-5 w-5"/> Natural
                </TabsTrigger>
              </TabsList>
              <TabsContent value="juridica" className="text-left mt-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">RIF Empresarial</label>
                    <Input type="text" placeholder="J-12345678-9" className="bg-white/5 border-white/10 h-12 text-white placeholder:text-gray-400"/>
                </div>
                <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-gray-300">Contraseña</label>
                    <Input 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="bg-white/5 border-white/10 h-12 text-white placeholder:text-gray-400 pr-10"
                    />
                    <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-gray-400">
                        {passwordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 h-12 text-lg font-bold">
                    Acceder como Jurídica
                </Button>
              </TabsContent>
               <TabsContent value="natural" className="text-left mt-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Cédula de Identidad</label>
                    <Input type="text" placeholder="V-12345678" className="bg-white/5 border-white/10 h-12 text-white placeholder:text-gray-400"/>
                </div>
                <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-gray-300">Contraseña</label>
                    <Input 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="bg-white/5 border-white/10 h-12 text-white placeholder:text-gray-400 pr-10"
                    />
                    <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-9 text-gray-400">
                        {passwordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 h-12 text-lg font-bold">
                    Acceder como Natural
                </Button>
              </TabsContent>
            </Tabs>
             <p className="mt-6 text-sm text-gray-400">
              ¿Primera vez?{" "}
              <Link href="#" className="font-semibold text-purple-400 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
