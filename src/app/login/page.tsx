
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="flex flex-col min-h-screen bg-background">
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
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para gestionar tus trámites</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="juridica" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="juridica" className="data-[state=active]:shadow-sm flex gap-2">
                    <Building className="h-5 w-5"/> Jurídica
                </TabsTrigger>
                <TabsTrigger value="natural" className="data-[state=active]:shadow-sm flex gap-2">
                    <User className="h-5 w-5"/> Natural
                </TabsTrigger>
              </TabsList>
              <TabsContent value="juridica" className="text-left mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>RIF Empresarial</Label>
                    <Input type="text" placeholder="J-12345678-9" value={rif} onChange={handleRifChange}/>
                </div>
                <div className="space-y-2 relative">
                    <Label>Contraseña</Label>
                    <Input 
                        type={juridicaPasswordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pr-10"
                    />
                    <button type="button" onClick={() => setJuridicaPasswordVisible(!juridicaPasswordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                        {juridicaPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                </div>
                <Button asChild className="w-full">
                    <Link href="/dashboard-juridico">Acceder como Jurídica</Link>
                </Button>
              </TabsContent>
               <TabsContent value="natural" className="text-left mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>Cédula de Identidad</Label>
                    <Input type="text" placeholder="V-12345678"/>
                </div>
                <div className="space-y-2 relative">
                    <Label>Contraseña</Label>
                    <Input 
                        type={naturalPasswordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pr-10"
                    />
                    <button type="button" onClick={() => setNaturalPasswordVisible(!naturalPasswordVisible)} className="absolute right-3 top-8 text-muted-foreground">
                        {naturalPasswordVisible ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                </div>
                <Button asChild className="w-full">
                    <Link href="/dashboard">Acceder como Natural</Link>
                </Button>
              </TabsContent>
            </Tabs>
             <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿Primera vez?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
