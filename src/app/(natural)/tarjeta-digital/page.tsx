"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
    Home, 
    Mail, 
    Phone, 
    Linkedin, 
    Twitter, 
    Github, 
    Download, 
    Share2, 
    RefreshCcw, 
    Briefcase, 
    Sparkles,
    Globe,
    Printer,
    QrCode
} from "lucide-react";
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
        <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)] select-none">
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
                className="text-center mb-12 no-print"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Sparkles className="h-3.5 w-3.5" /> Identidad Digital
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-3">ID Digital Interactiva</h1>
                <p className="text-muted-foreground font-bold text-base">Pulsa la tarjeta para girar</p>
            </motion.div>

            <div 
                className="relative w-full max-w-[360px] h-[540px] perspective-2000 cursor-pointer group mb-12"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                >
                    {/* FRENTE */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border-2 overflow-hidden bg-card/95 backdrop-blur-3xl flex flex-col print-card rounded-[2.5rem] border-primary/5">
                        <div className="h-40 relative overflow-hidden bg-[#050505]">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)),transparent_75%)]"></div>
                            <motion.div 
                                className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px]"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </div>
                        
                        <CardContent className="flex-grow flex flex-col items-center -mt-20 relative z-10 px-8">
                            <Avatar className="h-36 w-36 border-[6px] border-background shadow-xl mb-6">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userData.name} />}
                                <AvatarFallback className="text-4xl bg-secondary font-black">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <h2 className="text-2xl font-black text-center mb-1 tracking-tight leading-none">{userData.name}</h2>
                            <p className="text-primary font-black text-center text-[10px] uppercase tracking-[0.3em] mb-6">{userData.position}</p>
                            
                            <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                                <Briefcase className="h-3.5 w-3.5 text-primary" /> 
                                <span className="text-[10px] font-bold tracking-tight">{userData.company}</span>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="p-2 rounded-xl bg-primary/5 text-primary border border-primary/10"><Phone className="h-4 w-4"/></div>
                                    <span className="font-mono font-bold tracking-tighter">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="p-2 rounded-xl bg-primary/5 text-primary border border-primary/10"><Mail className="h-4 w-4"/></div>
                                    <span className="font-mono font-bold truncate tracking-tighter">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="p-2 rounded-xl bg-primary/5 text-primary border border-primary/10"><Home className="h-4 w-4"/></div>
                                    <span className="font-mono font-bold tracking-tighter">{userData.address}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-auto mb-10">
                                {[Linkedin, Twitter, Github].map((Icon, i) => (
                                    <div key={i} className="p-3 rounded-xl border border-primary/10 hover:bg-primary/5 transition-all">
                                        <Icon className="h-5 w-5 text-primary/70" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        
                        <div className="p-4 border-t border-primary/5 bg-primary/[0.02] text-center no-print">
                            <span className="text-[9px] uppercase font-black tracking-[0.4em] text-muted-foreground/40">Kyron Ecosystem · 2025</span>
                        </div>
                    </Card>

                    {/* REVERSO */}
                    <Card className="absolute inset-0 backface-hidden shadow-2xl border-2 rotate-y-180 bg-card/98 backdrop-blur-3xl flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem] border-primary/5">
                        <div className="mb-12">
                            <div className="p-5 bg-primary/10 rounded-[2rem] w-fit mx-auto mb-6 shadow-inner border border-primary/5">
                                <QrCode className="h-12 w-12 text-primary"/>
                            </div>
                            <h3 className="font-black text-2xl tracking-tighter mb-2">Acceso Digital</h3>
                            <p className="text-xs text-muted-foreground font-semibold">Escanea para conectar</p>
                        </div>

                        <div className="p-6 bg-white rounded-[2rem] shadow-xl border-[1px] border-black/5 relative group/qr">
                            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-xl opacity-0 group-hover/qr:opacity-100 transition-opacity"></div>
                            {qrCodeUrl ? (
                                <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} className="rounded-xl relative z-10"/>
                            ) : (
                                <div className="h-[200px] w-[200px] bg-muted animate-pulse rounded-xl" />
                            )}
                        </div>
                        
                        <div className="mt-12 space-y-4 w-full">
                            <Button variant="outline" className="w-full rounded-xl h-12 border-primary/10 hover:bg-primary/5 text-sm font-bold" onClick={(e) => { e.stopPropagation(); window.open(userData.website); }}>
                                <Globe className="mr-2 h-4 w-4" /> Visitar Website
                            </Button>
                            <Button variant="ghost" className="no-print rounded-lg font-black uppercase text-[9px] tracking-[0.2em] opacity-50 hover:opacity-100" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                                <RefreshCcw className="mr-2 h-3 w-3" /> Volver al frente
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>

            <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full max-w-[360px] no-print"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Button className="flex-1 h-12 font-black rounded-xl shadow-lg btn-3d-primary text-sm" onClick={handleSaveContact}>
                    <Download className="mr-2 h-5 w-5"/> Guardar VCF
                </Button>
                <Button variant="secondary" className="flex-1 h-12 font-black rounded-xl shadow-md text-sm border border-border/50" onClick={handleShare}>
                    <Share2 className="mr-2 h-5 w-5"/> Compartir
                </Button>
            </motion.div>
            
            <Button 
                variant="link" 
                className="mt-10 text-muted-foreground font-black uppercase text-[10px] tracking-[0.3em] no-print hover:text-primary transition-all flex items-center gap-2 opacity-50 hover:opacity-100" 
                onClick={handlePrint}
            >
                <Printer className="h-3.5 w-3.5" />
                no le cambies el nombre solo quiero que se imprima y ya
            </Button>
        </div>
    );
}
