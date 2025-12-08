
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog, Palette, Building, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GeneralPage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: "Configuración Guardada",
            description: "Los cambios generales han sido guardados exitosamente.",
        });
    };

  return (
    <div className="p-4 md:p-8 space-y-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Cog className="h-8 w-8" />
            Configuraciones Generales
        </h1>
        <p className="text-muted-foreground mt-2">
          Ajusta los parámetros principales de la aplicación y la empresa.
        </p>
      </header>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building className="text-primary"/> Información de la Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="company-name">Nombre de la Empresa</Label>
                    <Input id="company-name" defaultValue="System Kyron, C.A."/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="company-rif">RIF</Label>
                    <Input id="company-rif" defaultValue="J-12345678-9"/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="company-address">Dirección Fiscal</Label>
                    <Input id="company-address" defaultValue="Av. Principal, Edif. Centro, Piso 1, Caracas"/>
                </div>
            </CardContent>
        </Card>
         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="text-primary"/> Personalización y Tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="primary-color">Color Primario</Label>
                    <Input id="primary-color" type="color" defaultValue="#43a047" className="h-12"/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="logo-upload">Logo de la Empresa</Label>
                    <Input id="logo-upload" type="file" />
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="flex justify-end mt-8">
            <Button size="lg" onClick={handleSaveChanges}>
                <Save className="mr-2"/>
                Guardar Cambios
            </Button>
       </div>
    </div>
  );
}
