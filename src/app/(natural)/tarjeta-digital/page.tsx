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
import { motion } from "framer-motion";

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
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
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

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 min-h-[calc(100vh-8rem)] select-none">
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
                className="text-center mb-16 no-print"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-black uppercase tracking-[0.3em] mb-6">
                    <Sparkles className="h-4 w-4" /> Tecnología de Identidad 3D
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">ID Digital Interactiva</h1>
                <p className="text-muted-foreground font-semibold text-lg">Pulsa la tarjeta para ver el reverso</p>
            </motion.div>

            <div 
                className="relative w-full max-w-[400px] h-[600px] perspective-2000 cursor-pointer group mb-16"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 20 }}
                >
                    {/* FRENTE */}
                    <Card className="absolute inset-0 backface-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-2 overflow-hidden bg-card/95 backdrop-blur-3xl flex flex-col print-card rounded-[3rem] border-primary/10">
                        <div className="h-48 relative overflow-hidden bg-[#050505]">
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)),transparent_75%)]"></div>
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            
                            <motion.div 
                                className="absolute -top-12 -left-12 w-40 h-40 bg-primary/25 rounded-full blur-[70px]"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            />
                        </div>
                        
                        <CardContent className="flex-grow flex flex-col items-center -mt-24 relative z-10 px-10">
                            <Avatar className="h-44 w-44 border-[8px] border-background shadow-2xl mb-8">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userData.name} />}
                                <AvatarFallback className="text-5xl bg-secondary font-black">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <h2 className="text-3xl font-black text-center mb-2 tracking-tight leading-none">{userData.name}</h2>
                            <p className="text-primary font-black text-center text-[11px] uppercase tracking-[0.4em] mb-6">{userData.position}</p>
                            
                            <div className="flex items-center gap-3 mb-12 px-6 py-2.5 rounded-full bg-secondary/50 border border-border/50">
                                <Briefcase className="h-4 w-4 text-primary" /> 
                                <span className="text-xs font-bold tracking-tight">{userData.company}</span>
                            </div>

                            <div className="w-full space-y-5">
                                <div className="flex items-center gap-5 text-sm">
                                    <div className="p-2.5 rounded-2xl bg-primary/5 text-primary border border-primary/10"><Phone className="h-5 w-5"/></div>
                                    <span className="font-mono font-bold tracking-tighter">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-5 text-sm">
                                    <div className="p-2.5 rounded-2xl bg-primary/5 text-primary border border-primary/10"><Mail className="h-5 w-5"/></div>
                                    <span className="font-mono font-bold truncate tracking-tighter">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-5 text-sm">
                                    <div className="p-2.5 rounded-2xl bg-primary/5 text-primary border border-primary/10"><Home className="h-5 w-5"/></div>
                                    <span className="font-mono font-bold tracking-tighter">{userData.address}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-6 mt-auto mb-12">
                                {[Linkedin, Twitter, Github].map((Icon, i) => (
                                    <div key={i} className="p-4 rounded-2xl border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all">
                                        <Icon className="h-6 w-6 text-primary/80" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        
                        <div className="p-6 border-t border-primary/5 bg-primary/[0.03] text-center no-print flex items-center justify-center gap-3">
                            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-muted-foreground/40">Kyron Ecosystem</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse"></div>
                            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-muted-foreground/40">Model 2025</span>
                        </div>
                    </Card>

                    {/* REVERSO */}
                    <Card className="absolute inset-0 backface-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-2 rotate-y-180 bg-card/98 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center rounded-[3rem] border-primary/10">
                        <div className="mb-16">
                            <div className="p-6 bg-primary/10 rounded-[2.5rem] w-fit mx-auto mb-8 shadow-inner border border-primary/5">
                                <QrCode className="h-16 w-16 text-primary"/>
                            </div>
                            <h3 className="font-black text-3xl tracking-tighter mb-3">Acceso Instantáneo</h3>
                            <p className="text-sm text-muted-foreground font-semibold">Escanea para conectar al ecosistema</p>
                        </div>

                        <div className="p-8 bg-white rounded-[3rem] shadow-2xl border-[1px] border-black/5 relative group/qr">
                            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-2xl opacity-0 group-hover/qr:opacity-100 transition-opacity"></div>
                            {qrCodeUrl ? (
                                <Image src={qrCodeUrl} alt="QR Code" width={240} height={240} className="rounded-2xl relative z-10"/>
                            ) : (
                                <div className="h-[240px] w-[240px] bg-muted animate-pulse rounded-2xl" />
                            )}
                        </div>
                        
                        <div className="mt-16 space-y-5 w-full">
                            <Button variant="outline" className="w-full rounded-2xl h-14 border-primary/10 hover:bg-primary/5 text-base font-bold" onClick={(e) => { e.stopPropagation(); window.open(userData.website); }}>
                                <Globe className="mr-3 h-5 w-5" /> Visitar Website Oficial
                            </Button>
                            <Button variant="ghost" className="no-print rounded-xl font-black uppercase text-[10px] tracking-[0.3em] opacity-50 hover:opacity-100" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                                <RefreshCcw className="mr-2 h-4 w-4" /> Volver al frente
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>

            <motion.div 
                className="flex flex-col sm:flex-row gap-6 w-full max-w-[400px] no-print"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Button className="flex-1 h-16 font-black rounded-2xl shadow-2xl btn-3d-primary text-lg" onClick={handleSaveContact}>
                    <Download className="mr-3 h-6 w-6"/> Guardar VCF
                </Button>
                <Button variant="secondary" className="flex-1 h-16 font-black rounded-2xl shadow-xl text-lg border border-border/50" onClick={handleShare}>
                    <Share2 className="mr-3 h-6 w-6"/> Compartir
                </Button>
            </motion.div>
            
            <Button 
                variant="link" 
                className="mt-12 text-muted-foreground font-black uppercase text-[11px] tracking-[0.4em] no-print hover:text-primary transition-all flex items-center gap-3 opacity-60 hover:opacity-100" 
                onClick={handlePrint}
            >
                <Printer className="h-4 w-4" />
                no le cambies el nombre solo quiero que se imprima y ya
            </Button>
        </div>
    );
}