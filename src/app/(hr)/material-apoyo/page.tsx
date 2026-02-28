
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Paintbrush, Download, Settings, CheckCircle } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const notebookDesigns = [
    PlaceHolderImages.find(img => img.id === "notebook-design-1"),
    PlaceHolderImages.find(img => img.id === "notebook-design-2"),
    PlaceHolderImages.find(img => img.id === "notebook-design-3"),
].filter((item): item is NonNullable<typeof item> => !!item);

const presentationTemplates = [
    PlaceHolderImages.find(img => img.id === "presentation-template-1"),
    PlaceHolderImages.find(img => img.id === "presentation-template-2"),
    PlaceHolderImages.find(img => img.id === "presentation-template-3"),
    PlaceHolderImages.find(img => img.id === "presentation-template-4"),
    PlaceHolderImages.find(img => img.id === "presentation-template-5"),
].filter((item): item is NonNullable<typeof item> => !!item);

const letterheadTemplates = [
    PlaceHolderImages.find(img => img.id === "letterhead-template-1"),
    PlaceHolderImages.find(img => img.id === "letterhead-template-2"),
    PlaceHolderImages.find(img => img.id === "letterhead-template-3"),
    PlaceHolderImages.find(img => img.id === "letterhead-template-4"),
    PlaceHolderImages.find(img => img.id === "letterhead-template-5"),
].filter((item): item is NonNullable<typeof item> => !!item);

const packagingDesigns = [
    PlaceHolderImages.find(img => img.id === "corporate-box-1"),
    PlaceHolderImages.find(img => img.id === "corporate-box-2"),
    PlaceHolderImages.find(img => img.id === "shopping-bag-1"),
].filter((item): item is NonNullable<typeof item> => !!item);

const promoItems = [
    PlaceHolderImages.find(img => img.id === "pen-design-1"),
    PlaceHolderImages.find(img => img.id === "pen-design-2"),
].filter((item): item is NonNullable<typeof item> => !!item);


export default function MaterialApoyoPage() {
    const { toast } = useToast();

    const handleDownload = (name: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `Se está descargando la plantilla: ${name}.`,
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
        
        // Simular descarga de archivo
        const blob = new Blob([`Simulación de archivo para: ${name}`], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name.replace(/\s+/g, '_')}_plantilla.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Paintbrush className="h-8 w-8 text-primary" />
                    Material de Apoyo Corporativo
                </h1>
                <p className="text-muted-foreground mt-2">
                    Diseños, plantillas y recursos para estandarizar la imagen profesional de la empresa.
                </p>
            </header>

             <Tabs defaultValue="libretas" className="w-full">
                <TabsList className="grid w-full grid-cols-5 max-w-4xl mx-auto h-auto">
                    <TabsTrigger value="libretas" className="py-2">Libretas</TabsTrigger>
                    <TabsTrigger value="presentaciones" className="py-2">Presentaciones</TabsTrigger>
                    <TabsTrigger value="papeleria" className="py-2">Papelería</TabsTrigger>
                    <TabsTrigger value="empaques" className="py-2">Empaques</TabsTrigger>
                    <TabsTrigger value="promocionales" className="py-2">Promocionales</TabsTrigger>
                </TabsList>
                
                <TabsContent value="libretas" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {notebookDesigns.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                                <div className="p-0 aspect-video relative">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        fill
                                        className="object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </div>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2 p-4 pt-0">
                                    <Button variant="outline" className="w-full" size="sm"><Settings className="mr-2 h-4 w-4"/> Personalizar</Button>
                                    <Button className="w-full" size="sm" onClick={() => handleDownload(design.description)}><Download className="mr-2 h-4 w-4"/> Descargar</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="presentaciones" className="mt-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {presentationTemplates.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                                <div className="p-0 aspect-video relative">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        fill
                                        className="object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </div>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                     <Button className="w-full" size="sm" onClick={() => handleDownload(design.description)}><Download className="mr-2 h-4 w-4"/> Descargar Plantilla</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="papeleria" className="mt-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {letterheadTemplates.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                                <div className="p-0 aspect-video relative">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        fill
                                        className="object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </div>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                     <Button className="w-full" size="sm" onClick={() => handleDownload(design.description)}><Download className="mr-2 h-4 w-4"/> Descargar Hoja</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                 <TabsContent value="empaques" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packagingDesigns.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                                <div className="p-0 aspect-video relative">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        fill
                                        className="object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </div>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2 p-4 pt-0">
                                    <Button variant="outline" className="w-full" size="sm"><Settings className="mr-2 h-4 w-4"/> Personalizar</Button>
                                    <Button className="w-full" size="sm" onClick={() => handleDownload(design.description)}><Download className="mr-2 h-4 w-4"/> Descargar Diseño</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="promocionales" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {promoItems.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                                <div className="p-0 aspect-video relative">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        fill
                                        className="object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </div>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full" size="sm" onClick={() => handleDownload(design.description)}><Download className="mr-2 h-4 w-4"/> Contactar Proveedor</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
