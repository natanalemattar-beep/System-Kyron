
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Home, Mail, Phone, Linkedin, Twitter, Github, Download, Share2 } from "lucide-react";
import Image from "next/image";

export default function TarjetaDigitalPage() {
    const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");
    const { toast } = useToast();
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    useEffect(() => {
        // This code runs only on the client, after the component has mounted.
        const currentUrl = window.location.href;
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`);
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Tarjeta de Presentación Digital',
                text: 'Conecta conmigo - [Tu Nombre]',
                url: window.location.href,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Enlace Copiado",
                description: "La URL de tu perfil ha sido copiada al portapapeles.",
            });
        }
    };

    const handleSaveContact = () => {
        toast({
            title: "Descarga Iniciada",
            description: "Se está descargando el contacto en formato vCard.",
        });
        // In a real app, you would generate and download a .vcf file here.
    }


  return (
    <div className="p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="items-center text-center p-8">
          <Avatar className="h-28 w-28 mb-4 border-4 border-primary/50 shadow-lg">
             {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback className="text-4xl">UN</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">Usuario Natural</CardTitle>
          <CardDescription className="text-lg text-primary">Desarrollador de Software</CardDescription>
        </CardHeader>
        <CardContent className="px-6 space-y-4">
            <div className="flex items-center gap-4 text-sm">
                <Mail className="h-5 w-5 text-muted-foreground"/>
                <span>usuario.natural@email.com</span>
            </div>
             <div className="flex items-center gap-4 text-sm">
                <Phone className="h-5 w-5 text-muted-foreground"/>
                <span>+58 412-1234567</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <Home className="h-5 w-5 text-muted-foreground"/>
                <span>Caracas, Venezuela</span>
            </div>
            <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" size="icon"><Linkedin className="h-5 w-5"/></Button>
                <Button variant="outline" size="icon"><Twitter className="h-5 w-5"/></Button>
                <Button variant="outline" size="icon"><Github className="h-5 w-5"/></Button>
            </div>
             <div className="flex justify-center pt-6">
                <div className="bg-white p-3 rounded-lg shadow-md">
                    {qrCodeUrl ? (
                        <Image src={qrCodeUrl} alt="QR Code del Perfil" width={150} height={150}/>
                    ) : (
                        <div className="h-[150px] w-[150px] bg-gray-200 animate-pulse rounded-md" />
                    )}
                </div>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">Escanea para compartir</p>
        </CardContent>
        <CardFooter className="p-6 grid grid-cols-2 gap-4">
            <Button className="w-full" onClick={handleSaveContact}>
                <Download className="mr-2"/> Guardar Contacto
            </Button>
            <Button className="w-full" variant="secondary" onClick={handleShare}>
                <Share2 className="mr-2"/> Compartir
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
