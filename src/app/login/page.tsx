
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
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [juridicaPasswordVisible, setJuridicaPasswordVisible] = useState(false);
  const [naturalPasswordVisible, setNaturalPasswordVisible] = useState(false);
  const [rif, setRif] = useState("");

  const handleRifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value && !value.toUpperCase().startsWith("J-")) {
      value = "J-" + value.replace(/J-/gi, "");
    }
    setRif(value);
  };


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
        <Card className="w-full max-w-md mx-auto bg-white/60 dark:bg-card/60 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="p-4 bg-teal-600/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-teal-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Iniciar Sesión</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Accede a tu cuenta para gestionar tus trámites
            </p>

            <Tabs defaultValue="juridica" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-background/50 h-12 p-1">
                <TabsTrigger value="juridica" className="h-full data-[state=active]:bg-white dark:data-[state=active]:bg-card/80 data-[state=active]:shadow-sm flex gap-2">
                    <Building className="h-5 w-5"/> Jurídica
                </TabsTrigger>
                <TabsTrigger value="natural" className="h-full data-[state=active]:bg-white dark:data-[state=active]:bg-card/80 data-[state=active]:shadow-sm flex gap-2">
                    <User className="h-5 w-5"/> Natural
                </TabsTrigger>
              </TabsList>
              <TabsContent value="juridica" className="text-left mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>RIF Empresarial</Label>
                    <Input type="text" placeholder="J-12345678-9" className="h-12" value={rif} onChange={handleRifChange}/>
                </div>
                <div className="space-y-2 relative">
                    <Label>Contraseña</Label>
                    <Input 
                        type={juridicaPasswordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="h-12 pr-10"
                    />
                    <button type="button" onClick={() => setJuridicaPasswordVisible(!juridicaPasswordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                        {juridicaPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                </div>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg font-bold">
                    <Link href="/dashboard-juridico">Acceder como Jurídica</Link>
                </Button>
              </TabsContent>
               <TabsContent value="natural" className="text-left mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>Cédula de Identidad</Label>
                    <Input type="text" placeholder="V-12345678" className="h-12"/>
                </div>
                <div className="space-y-2 relative">
                    <Label>Contraseña</Label>
                    <Input 
                        type={naturalPasswordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="h-12 pr-10"
                    />
                    <button type="button" onClick={() => setNaturalPasswordVisible(!naturalPasswordVisible)} className="absolute right-3 top-9 text-muted-foreground">
                        {naturalPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                </div>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg font-bold">
                    <Link href="/dashboard">Acceder como Natural</Link>
                </Button>
              </TabsContent>
            </Tabs>
             <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              ¿Primera vez?{" "}
              <Link href="/register" className="font-semibold text-teal-600 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
