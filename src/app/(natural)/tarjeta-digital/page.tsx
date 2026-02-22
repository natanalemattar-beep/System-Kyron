
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Home, Mail, Phone, Linkedin, Twitter, Github, Download, Share2, RefreshCcw, Briefcase, Globe } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data for the digital business card
const userData = {
    name: "Usuario Natural",
    position: "Desarrollador de Software & Consultor TI",
    company: "System Kyron, C.A.",
    phone: "+58 414-9377068",
    email: "usuario.natural@email.com",
    address: "Caracas, Venezuela",
    website: "https://systemkyron.com",
    social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
    },
    avatarId: "user-avatar"
};

export default function TarjetaDigitalPage() {
    const userAvatar = PlaceHolderImages.find((img) => img.id === userData.avatarId);
    const { toast } = useToast();
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://systemkyron.com';
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`);
    }, []);

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: `Tarjeta Digital - ${userData.name}`,
                text: `Conecta conmigo a través de System Kyron`,
                url: window.location.href,
            })
            .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Enlace Copiado",
                description: "La URL de tu tarjeta ha sido copiada al portapapeles.",
            });
        }
    };

    const handleSaveContact = (e: React.MouseEvent) => {
        e.stopPropagation();
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${userData.name}
ORG:${userData.company}
TITLE:${userData.position}
TEL;TYPE=WORK,VOICE:${userData.phone}
EMAIL:${userData.email}
ADR;TYPE=WORK:;;${userData.address}
URL:${userData.website}
END:VCARD`;

        const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
        const link = document.body.appendChild(document.createElement("a"));
        link.href = URL.createObjectURL(blob);
        link.download = `${userData.name.replace(/ /g, '_')}.vcf`;
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Contacto Generado",
            description: "Se ha descargado la ficha vCard lista para guardar.",
        });
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        .print-card, .print-card * { visibility: visible; }
                        .print-card { position: absolute; left: 0; top: 0; width: 8.5cm; height: 5.5cm; border: 1px solid #ccc; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>

            <div className="text-center mb-8 no-print">
                <h1 className="text-2xl font-bold tracking-tight">Tu Tarjeta de Presentación Digital</h1>
                <p className="text-muted-foreground text-sm mt-1">Toca la tarjeta para ver el código QR</p>
            </div>

            {/* 3D Card Container */}
            <div 
                className="relative w-full max-w-[400px] h-[550px] perspective-1000 cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* FRONT OF CARD */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border-2 overflow-hidden bg-card/90 backdrop-blur-xl flex flex-col print-card">
                        <div className="h-32 bg-gradient-to-br from-primary via-primary/80 to-blue-600 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                        
                        <CardContent className="flex-grow flex flex-col items-center -mt-16 relative z-10 px-6">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-xl mb-4">
                                {userAvatar && (
                                    <AvatarImage src={userAvatar.imageUrl} alt={userData.name} />
                                )}
                                <AvatarFallback className="text-3xl bg-secondary">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <h2 className="text-2xl font-bold text-center">{userData.name}</h2>
                            <p className="text-primary font-medium text-center text-sm uppercase tracking-widest mt-1">{userData.position}</p>
                            <p className="text-muted-foreground text-xs font-semibold mt-1 flex items-center gap-1">
                                <Briefcase className="h-3 w-3" /> {userData.company}
                            </p>

                            <div className="w-full space-y-4 mt-8">
                                <div className="flex items-center gap-4 text-sm group/item">
                                    <div className="p-2 rounded-full bg-primary/5 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                        <Phone className="h-4 w-4"/>
                                    </div>
                                    <span className="font-medium">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm group/item">
                                    <div className="p-2 rounded-full bg-primary/5 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                        <Mail className="h-4 w-4"/>
                                    </div>
                                    <span className="font-medium truncate">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm group/item">
                                    <div className="p-2 rounded-full bg-primary/5 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                        <Home className="h-4 w-4"/>
                                    </div>
                                    <span className="font-medium">{userData.address}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm group/item">
                                    <div className="p-2 rounded-full bg-primary/5 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                        <Globe className="h-4 w-4"/>
                                    </div>
                                    <span className="font-medium">{userData.website.replace('https://', '')}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-auto mb-6">
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all"><Linkedin className="h-5 w-5"/></Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all"><Twitter className="h-5 w-5"/></Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all"><Github className="h-5 w-5"/></Button>
                            </div>
                        </CardContent>
                        
                        <div className="p-4 border-t bg-secondary/20 flex justify-center items-center gap-2 no-print">
                            <RefreshCcw className="h-3 w-3 text-muted-foreground animate-spin-slow" />
                            <span className="text-[10px] uppercase font-black tracking-tighter text-muted-foreground">System Kyron Ecosystem</span>
                        </div>
                    </Card>

                    {/* BACK OF CARD */}
                    <Card 
                        className="absolute inset-0 backface-hidden shadow-2xl border-2 rotate-y-180 bg-card flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="mb-6">
                            <Image 
                                src="/logo.svg" 
                                alt="Kyron Logo" 
                                width={60} 
                                height={60} 
                                className="mx-auto grayscale opacity-50"
                                onError={(e) => {
                                    // Fallback if SVG logo doesn't exist
                                    const target = e.target as HTMLElement;
                                    target.style.display = 'none';
                                }}
                            />
                            <h3 className="font-bold text-xl mt-2">System Kyron</h3>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow-inner border-4 border-primary/10">
                            {qrCodeUrl ? (
                                <Image src={qrCodeUrl} alt="QR Code del Perfil" width={200} height={200} className="rounded-lg"/>
                            ) : (
                                <div className="h-[200px] w-[200px] bg-muted animate-pulse rounded-lg" />
                            )}
                        </div>
                        <p className="text-sm font-semibold mt-6 text-primary">ESCANEAME</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Usa la cámara de tu móvil para ver mi perfil interactivo completo.</p>
                        
                        <div className="mt-auto pt-8 flex gap-2 w-full no-print">
                            <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                                <RefreshCcw className="mr-2 h-4 w-4" /> Volver
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-[400px] no-print">
                <Button className="flex-1 h-12 text-base font-bold shadow-lg" onClick={handleSaveContact}>
                    <Download className="mr-2 h-5 w-5"/> Guardar Contacto
                </Button>
                <Button variant="secondary" className="flex-1 h-12 text-base font-bold shadow-md" onClick={handleShare}>
                    <Share2 className="mr-2 h-5 w-5"/> Compartir
                </Button>
            </div>
            
            <Button variant="link" className="mt-4 text-muted-foreground no-print" onClick={() => window.print()}>
                Versión para Imprimir
            </Button>
        </div>
    );
}
