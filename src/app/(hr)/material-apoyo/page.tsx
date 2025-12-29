
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Paintbrush, Download, Settings } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Paintbrush className="h-8 w-8" />
                    Material de Apoyo Corporativo
                </h1>
                <p className="text-muted-foreground mt-2">
                    Diseños y plantillas para estandarizar la imagen de la empresa.
                </p>
            </header>

             <Tabs defaultValue="libretas" className="w-full">
                <TabsList className="grid w-full grid-cols-5 max-w-4xl mx-auto">
                    <TabsTrigger value="libretas">Libretas</TabsTrigger>
                    <TabsTrigger value="presentaciones">Presentaciones</TabsTrigger>
                    <TabsTrigger value="papeleria">Papelería</TabsTrigger>
                    <TabsTrigger value="empaques">Empaques</TabsTrigger>
                    <TabsTrigger value="promocionales">Promocionales</TabsTrigger>
                </TabsList>
                
                <TabsContent value="libretas" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {notebookDesigns.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm">
                                <CardHeader className="p-0">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        width={400} 
                                        height={300} 
                                        className="rounded-t-xl object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="outline" className="w-full"><Settings className="mr-2 h-4 w-4"/> Personalizar</Button>
                                    <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Descargar</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="presentaciones" className="mt-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {presentationTemplates.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm">
                                <CardHeader className="p-0">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        width={400} 
                                        height={300} 
                                        className="rounded-t-xl object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2">
                                     <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Descargar Plantilla</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="papeleria" className="mt-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {letterheadTemplates.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm">
                                <CardHeader className="p-0">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        width={400} 
                                        height={300} 
                                        className="rounded-t-xl object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2">
                                     <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Descargar Hoja</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                 <TabsContent value="empaques" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packagingDesigns.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm">
                                <CardHeader className="p-0">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        width={400} 
                                        height={300} 
                                        className="rounded-t-xl object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button variant="outline" className="w-full"><Settings className="mr-2 h-4 w-4"/> Personalizar</Button>
                                    <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Descargar Diseño</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="promocionales" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {promoItems.map(design => (
                            <Card key={design.id} className="bg-card/50 backdrop-blur-sm">
                                <CardHeader className="p-0">
                                     <Image 
                                        src={design.imageUrl} 
                                        alt={design.description} 
                                        width={400} 
                                        height={300} 
                                        className="rounded-t-xl object-cover"
                                        data-ai-hint={design.imageHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-base">{design.description}</CardTitle>
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Contactar Proveedor</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
