
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Chrome as Home, Mail, Phone, Linkedin, Twitter, Github, Download, Share2, RefreshCcw, Briefcase, Sparkles, Globe, Printer, QrCode } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const userData = {
    name: "Usuario Natural",
    position: "Desarrollador de Software & Consultor TI",
    company: "System Kyron, C.A.",
    phone: "+58 414-9377068",
    email: "usuario.natural@email.com",
    address: "Caracas, Venezuela",
    website: "https://systemkyron.com",
    avatarId: "user-avatar",
    socials: {
        linkedin: "https://linkedin.com/in/systemkyron",
        twitter: "https://twitter.com/systemkyron",
        github: "https://github.com/systemkyron"
    }
};

export default function TarjetaDigitalPage() {
    const userAvatar = PlaceHolderImages.find((img) => img.id === userData.avatarId);
    const { toast } = useToast();
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMounted, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://systemkyron.com';
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(currentUrl)}&bgcolor=ffffff&color=000000&margin=1`);
    }, []);

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: `ID Digital - ${userData.name}`,
                text: `Conecta conmigo en el Ecosistema Kyron`,
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
        const vCard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:${userData.name}`,
            `ORG:${userData.company}`,
            `TITLE:${userData.position}`,
            `TEL;TYPE=CELL,VOICE:${userData.phone}`,
            `EMAIL;TYPE=PREF,INTERNET:${userData.email}`,
            `URL:${userData.website}`,
            `ADR;TYPE=WORK:;;${userData.address}`,
            `X-SOCIALPROFILE;TYPE=linkedin:${userData.socials.linkedin}`,
            `X-SOCIALPROFILE;TYPE=twitter:${userData.socials.twitter}`,
            "REV:" + new Date().toISOString(),
            "END:VCARD"
        ].join("\n");

        const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${userData.name.replace(/\s+/g, '_')}_Kyron.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({ 
            title: "Contacto Actualizado", 
            description: "Se ha descargado la ficha vCard Pro para tu agenda.",
        });
    };

    const handlePrint = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.print();
    };

    if (!isMounted) return null;

    return (
        <div className="flex flex-col items-center justify-center py-8 px-4 min-h-[calc(100vh-8rem)] select-none">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        .print-card, .print-card * { visibility: visible; }
                        .print-card { 
                            position: fixed; 
                            left: 50%; 
                            top: 50%; 
                            transform: translate(-50%, -50%); 
                            width: 85.6mm; 
                            height: 53.98mm; 
                            border: none !important;
                            box-shadow: none !important;
                        }
                        .no-print { display: none !important; }
                    }
                `}
            </style>

            <motion.div 
                className="text-center mb-8 no-print"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                    <Sparkles className="h-3 w-3" /> Identidad Digital
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">ID Digital Interactiva</h1>
                <p className="text-muted-foreground font-bold text-xs">Pulsa la tarjeta para girar</p>
            </motion.div>

            <div 
                className="relative w-full max-w-[320px] h-[480px] perspective-2000 cursor-pointer group mb-10"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                >
                    {/* FRENTE */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border bg-card/95 backdrop-blur-3xl flex flex-col print-card rounded-[2rem] border-primary/5">
                        <div className="h-32 relative overflow-hidden bg-[#050505]">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)),transparent_75%)]"></div>
                        </div>
                        
                        <CardContent className="flex-grow flex flex-col items-center -mt-16 relative z-10 px-6">
                            <Avatar className="h-28 w-28 border-[4px] border-background shadow-xl mb-4">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userData.name} />}
                                <AvatarFallback className="text-2xl bg-secondary font-black">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <h2 className="text-xl font-black text-center mb-1 tracking-tight leading-none">{userData.name}</h2>
                            <p className="text-primary font-black text-center text-[9px] uppercase tracking-[0.2em] mb-4">{userData.position}</p>
                            
                            <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                                <Briefcase className="h-3 w-3 text-primary" /> 
                                <span className="text-[9px] font-bold tracking-tight">{userData.company}</span>
                            </div>

                            <div className="w-full space-y-3">
                                <div className="flex items-center gap-3 text-[11px]">
                                    <div className="p-1.5 rounded-lg bg-primary/5 text-primary border border-primary/10"><Phone className="h-3.5 w-3.5"/></div>
                                    <span className="font-mono font-bold tracking-tighter">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <div className="p-1.5 rounded-lg bg-primary/5 text-primary border border-primary/10"><Mail className="h-3.5 w-3.5"/></div>
                                    <span className="font-mono font-bold truncate tracking-tighter">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <div className="p-1.5 rounded-lg bg-primary/5 text-primary border border-primary/10"><Home className="h-3.5 w-3.5"/></div>
                                    <span className="font-mono font-bold tracking-tighter">{userData.address}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-3 mt-auto mb-8">
                                {[Linkedin, Twitter, Github].map((Icon, i) => (
                                    <div key={i} className="p-2.5 rounded-lg border border-primary/10 hover:bg-primary/5 transition-all">
                                        <Icon className="h-4 w-4 text-primary/70" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        
                        <div className="p-3 border-t border-primary/5 bg-primary/[0.02] text-center no-print">
                            <span className="text-[8px] uppercase font-black tracking-[0.3em] text-muted-foreground/40">Kyron Ecosystem · 2025</span>
                        </div>
                    </Card>

                    {/* REVERSO */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border rotate-y-180 bg-card/98 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center rounded-[2rem] border-primary/5">
                        <div className="mb-8">
                            <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4 shadow-inner border border-primary/5">
                                <QrCode className="h-10 w-10 text-primary"/>
                            </div>
                            <h3 className="font-black text-xl tracking-tighter mb-1">Acceso Digital</h3>
                            <p className="text-[10px] text-muted-foreground font-semibold">Escanea para conectar</p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl shadow-xl border-[1px] border-black/5 relative group/qr">
                            {qrCodeUrl ? (
                                <Image src={qrCodeUrl} alt="QR Code" width={160} height={160} className="rounded-xl relative z-10"/>
                            ) : (
                                <div className="h-[160px] w-[160px] bg-muted animate-pulse rounded-xl" />
                            )}
                        </div>
                        
                        <div className="mt-8 space-y-3 w-full">
                            <Button variant="outline" className="w-full rounded-xl h-10 border-primary/10 hover:bg-primary/5 text-xs font-bold" onClick={(e) => { e.stopPropagation(); window.open(userData.website); }}>
                                <Globe className="mr-2 h-3.5 w-3.5" /> Visitar Website
                            </Button>
                            <Button variant="ghost" className="no-print rounded-lg font-black uppercase text-[8px] tracking-[0.2em] opacity-50 hover:opacity-100" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                                <RefreshCcw className="mr-2 h-3 w-3" /> Volver al frente
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>

            <motion.div 
                className="flex flex-col sm:flex-row gap-3 w-full max-w-[320px] no-print"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Button className="flex-1 h-11 font-black rounded-xl shadow-lg btn-3d-primary text-xs" onClick={handleSaveContact}>
                    <Download className="mr-2 h-4 w-4"/> Guardar VCF
                </Button>
                <Button variant="secondary" className="flex-1 h-11 font-black rounded-xl shadow-md text-xs border border-border/50" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4"/> Compartir
                </Button>
            </motion.div>
            
            <Button 
                variant="link" 
                className="mt-8 text-muted-foreground font-black uppercase text-[9px] tracking-[0.2em] no-print hover:text-primary transition-all flex items-center gap-2 opacity-50 hover:opacity-100" 
                onClick={handlePrint}
            >
                <Printer className="h-3.5 w-3.5" />
                no le cambies el nombre solo quiero que se imprima y ya
            </Button>
        </div>
    );
}
