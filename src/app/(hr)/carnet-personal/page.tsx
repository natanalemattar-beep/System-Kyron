
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Briefcase, Building, Mail, Phone, Download, Share2, Contact } from "lucide-react";
import Image from "next/image";

// Mock data for the employee and department
const employeeData = {
    name: "Ana Pérez",
    position: "Gerente de Proyectos",
    department: "Gerencia",
    departmentPhone: "+58-212-555-0101",
    email: "ana.perez@email.com",
    avatarId: "testimonial-avatar-2" // using an existing placeholder
};

export default function CarnetPersonalPage() {
    const userAvatar = PlaceHolderImages.find((img) => img.id === employeeData.avatarId);
    const { toast } = useToast();

    // The QR code will contain a 'tel:' link to the department's phone
    const qrCodeData = `tel:${employeeData.departmentPhone}`;

    const handleShare = () => {
        const cardUrl = typeof window !== 'undefined' ? window.location.href : '';
        if (navigator.share) {
            navigator.share({
                title: `Carnet Digital - ${employeeData.name}`,
                text: `Carnet de personal de ${employeeData.name}, ${employeeData.position} en ${employeeData.department}.`,
                url: cardUrl,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(cardUrl);
            toast({
                title: "Enlace Copiado",
                description: "La URL del carnet ha sido copiada al portapapeles.",
            });
        }
    };

    const handleSaveContact = () => {
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${employeeData.name}
ORG:System Kyron;${employeeData.department}
TITLE:${employeeData.position}
TEL;TYPE=WORK,VOICE:${employeeData.departmentPhone}
EMAIL:${employeeData.email}
END:VCARD`;
        const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${employeeData.name}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Descarga Iniciada",
            description: "Se está descargando el contacto en formato vCard.",
        });
    };


  return (
    <div className="p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="items-center text-center p-8 bg-primary/5 rounded-t-xl">
          <Avatar className="h-28 w-28 mb-4 border-4 border-primary/50 shadow-lg">
             {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback className="text-4xl">{employeeData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{employeeData.name}</CardTitle>
          <CardDescription className="text-lg text-primary font-medium">{employeeData.position}</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pt-6 space-y-4">
            <div className="flex items-center gap-4 text-sm">
                <Building className="h-5 w-5 text-muted-foreground"/>
                <span>Departamento: {employeeData.department}</span>
            </div>
             <div className="flex items-center gap-4 text-sm">
                <Phone className="h-5 w-5 text-muted-foreground"/>
                <span>Contacto Dept.: {employeeData.departmentPhone}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <Mail className="h-5 w-5 text-muted-foreground"/>
                <span>{employeeData.email}</span>
            </div>
            
             <div className="flex justify-center pt-6">
                <div className="bg-white p-3 rounded-lg shadow-md">
                    <Image 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeData)}`} 
                        alt={`QR Code para llamar al departamento de ${employeeData.department}`} 
                        width={150} height={150}
                    />
                </div>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">Escanea para contactar al departamento</p>
        </CardContent>
        <CardFooter className="p-6 grid grid-cols-2 gap-4">
            <Button className="w-full" onClick={handleSaveContact}>
                <Download className="mr-2"/> Guardar Contacto
            </Button>
            <Button className="w-full" variant="secondary" onClick={handleShare}>
                <Share2 className="mr-2"/> Compartir Carnet
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
