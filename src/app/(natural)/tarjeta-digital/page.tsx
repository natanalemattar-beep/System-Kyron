
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Home, Mail, Phone, Linkedin, Twitter, Github, Download, Share2, RefreshCcw, Briefcase, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const userData = {
    name: "Usuario Natural",
    position: "Desarrollador de Software & Consultor TI",
    company: "System Kyron, C.A.",
    phone: "+58 414-9377068",
    email: "usuario.natural@email.com",
    address: "Caracas, Venezuela",
    website: "https://systemkyron.com",
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
            toast({ title: "Enlace Copiado", description: "La URL de tu tarjeta ha sido copiada." });
        }
    };

    const handleSaveContact = (e: React.MouseEvent) => {
        e.stopPropagation();
        const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${userData.name}\nORG:${userData.company}\nTITLE:${userData.position}\nTEL;TYPE=WORK,VOICE:${userData.phone}\nEMAIL:${userData.email}\nEND:VCARD`;
        const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${userData.name.replace(/ /g, '_')}.vcf`;
        link.click();
        toast({ title: "Contacto Generado", description: "Se ha descargado la ficha vCard." });
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        .print-card, .print-card * { visibility: visible; }
                        .print-card { position: absolute; left: 0; top: 0; width: 8.5cm; height: 5.5cm; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>

            <motion.div 
                className="text-center mb-12 no-print"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl font-black tracking-tighter leading-none mb-3">Identidad Digital 3D</h1>
                <p className="text-muted-foreground font-medium">Toca la tarjeta para ver el reverso interactivo</p>
            </motion.div>

            <div 
                className="relative w-full max-w-[380px] h-[520px] perspective-1000 cursor-pointer group mb-12"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                >
                    {/* FRENTE */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border-2 overflow-hidden bg-card/90 backdrop-blur-xl flex flex-col print-card rounded-[2.5rem] border-primary/10">
                        <div className="h-32 bg-primary relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl"></div>
                        </div>
                        
                        <CardContent className="flex-grow flex flex-col items-center -mt-16 relative z-10 px-10">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl mb-6">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userData.name} />}
                                <AvatarFallback className="text-3xl bg-secondary">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <h2 className="text-2xl font-black text-center mb-1 tracking-tight">{userData.name}</h2>
                            <p className="text-primary font-black text-center text-[10px] uppercase tracking-[0.25em] mb-2">{userData.position}</p>
                            <p className="text-muted-foreground text-xs font-bold flex items-center gap-1.5 mb-10">
                                <Briefcase className="h-3.5 w-3.5 text-primary" /> {userData.company}
                            </p>

                            <div className="w-full space-y-5">
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="p-2.5 rounded-xl bg-primary/5 text-primary"><Phone className="h-4.5 w-4.5"/></div>
                                    <span className="font-bold">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="p-2.5 rounded-xl bg-primary/5 text-primary"><Mail className="h-4.5 w-4.5"/></div>
                                    <span className="font-bold truncate">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="p-2.5 rounded-xl bg-primary/5 text-primary"><Home className="h-4.5 w-4.5"/></div>
                                    <span className="font-bold">{userData.address}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-5 mt-auto mb-10">
                                <div className="p-2.5 rounded-2xl border-2 border-primary/5 hover:bg-primary/5 transition-colors"><Linkedin className="h-5 w-5 text-primary"/></div>
                                <div className="p-2.5 rounded-2xl border-2 border-primary/5 hover:bg-primary/5 transition-colors"><Twitter className="h-5 w-5 text-primary"/></div>
                                <div className="p-2.5 rounded-2xl border-2 border-primary/5 hover:bg-primary/5 transition-colors"><Github className="h-5 w-5 text-primary"/></div>
                            </div>
                        </CardContent>
                        <div className="p-5 border-t bg-secondary/20 text-center no-print">
                            <span className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground/60">Kyron Ecosistema Digital</span>
                        </div>
                    </Card>

                    {/* REVERSO */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border-2 rotate-y-180 bg-card/95 backdrop-blur-xl flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem] border-primary/10">
                        <div className="mb-10">
                            <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-5">
                                <Sparkles className="h-10 w-10 text-primary"/>
                            </div>
                            <h3 className="font-black text-2xl tracking-tighter">Conéctate Conmigo</h3>
                        </div>

                        <div className="bg-white p-5 rounded-[2rem] shadow-inner border-[12px] border-primary/5">
                            {qrCodeUrl ? (
                                <Image src={qrCodeUrl} alt="QR Code" width={220} height={220} className="rounded-2xl"/>
                            ) : (
                                <div className="h-[220px] w-[220px] bg-muted animate-pulse rounded-2xl" />
                            )}
                        </div>
                        <p className="text-xs font-black mt-10 text-primary tracking-[0.3em] uppercase">Escanea el Código</p>
                        <p className="text-sm text-muted-foreground mt-3 max-w-[220px] leading-relaxed">Acceso instantáneo a mis redes y portafolio profesional.</p>
                        
                        <Button variant="ghost" size="sm" className="mt-auto no-print rounded-xl font-bold" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                            <RefreshCcw className="mr-2 h-4 w-4" /> Volver al frente
                        </Button>
                    </Card>
                </motion.div>
            </div>

            <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full max-w-[380px] no-print"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Button className="flex-1 h-14 font-black rounded-2xl shadow-xl btn-3d-primary text-base" onClick={handleSaveContact}>
                    <Download className="mr-2 h-5 w-5"/> Guardar VCF
                </Button>
                <Button variant="secondary" className="flex-1 h-14 font-black rounded-2xl shadow-md text-base" onClick={handleShare}>
                    <Share2 className="mr-2 h-5 w-5"/> Compartir
                </Button>
            </motion.div>
            
            <Button variant="link" className="mt-8 text-muted-foreground font-bold uppercase text-[10px] tracking-widest no-print hover:text-primary transition-colors" onClick={() => window.print()}>
                no me deja en pdf :(
            </Button>
        </div>
    );
}
