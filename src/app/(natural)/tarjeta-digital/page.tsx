
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
    ExternalLink,
    Printer
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
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}&bgcolor=ffffff&color=000000&margin=1`);
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
        // Modern vCard 3.0 with more fields for the "2025 Model"
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
            action: <CheckCircleIcon className="text-green-500 h-4 w-4" />
        });
    };

    const handlePrint = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.print();
    };

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
                className="text-center mb-10 no-print"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Sparkles className="h-3 w-3" /> Tecnología de Identidad 3D
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-3">Tarjeta Interactiva</h1>
                <p className="text-muted-foreground font-medium text-sm">Pulsa la tarjeta para escanear el QR en el reverso</p>
            </motion.div>

            <div 
                className="relative w-full max-w-[360px] h-[540px] perspective-1000 cursor-pointer group mb-12"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 150, damping: 25 }}
                >
                    {/* FRENTE: Estilo High-Tech Glass */}
                    <Card className="absolute inset-0 backface-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-2 overflow-hidden bg-card/90 backdrop-blur-2xl flex flex-col print-card rounded-[2.5rem] border-primary/10">
                        {/* Mesh Gradient Top */}
                        <div className="h-40 relative overflow-hidden bg-[#0a0a0a]">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)),transparent_70%)]"></div>
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            
                            {/* Animated Orbs */}
                            <motion.div 
                                className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px]"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </div>
                        
                        <CardContent className="flex-grow flex flex-col items-center -mt-20 relative z-10 px-8">
                            <Avatar className="h-36 w-36 border-[6px] border-background shadow-2xl mb-6">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userData.name} />}
                                <AvatarFallback className="text-4xl bg-secondary font-black">{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <h2 className="text-2xl font-black text-center mb-1 tracking-tight">{userData.name}</h2>
                            <p className="text-primary font-black text-center text-[10px] uppercase tracking-[0.3em] mb-4">{userData.position}</p>
                            
                            <div className="flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                                <Briefcase className="h-3.5 w-3.5 text-primary" /> 
                                <span className="text-[11px] font-bold tracking-tight">{userData.company}</span>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="p-2 rounded-xl bg-primary/5 text-primary border border-primary/10"><Phone className="h-4 w-4"/></div>
                                    <span className="font-mono font-bold">{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="p-2 rounded-xl bg-primary/5 text-primary border border-primary/10"><Mail className="h-4 w-4"/></div>
                                    <span className="font-mono font-bold truncate">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="p-2 rounded-xl bg-primary/5 text-primary border border-primary/10"><Home className="h-4 w-4"/></div>
                                    <span className="font-mono font-bold">{userData.address}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-auto mb-10">
                                {[Linkedin, Twitter, Github].map((Icon, i) => (
                                    <div key={i} className="p-3 rounded-2xl border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all">
                                        <Icon className="h-5 w-5 text-primary/80" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        
                        <div className="p-5 border-t border-primary/5 bg-primary/[0.02] text-center no-print flex items-center justify-center gap-2">
                            <span className="text-[9px] uppercase font-black tracking-[0.4em] text-muted-foreground/50">Ecosistema Kyron</span>
                            <div className="h-1 w-1 rounded-full bg-primary/30 animate-pulse"></div>
                            <span className="text-[9px] uppercase font-black tracking-[0.4em] text-muted-foreground/50">2025</span>
                        </div>
                    </Card>

                    {/* REVERSO: Minimalista & QR Focus */}
                    <Card className="absolute inset-0 backface-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-2 rotate-y-180 bg-card/95 backdrop-blur-2xl flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem] border-primary/10">
                        <div className="mb-12">
                            <div className="p-5 bg-primary/10 rounded-3xl w-fit mx-auto mb-6 shadow-inner border border-primary/5">
                                <QrCode className="h-12 w-12 text-primary"/>
                            </div>
                            <h3 className="font-black text-2xl tracking-tighter mb-2">Acceso Instantáneo</h3>
                            <p className="text-xs text-muted-foreground font-medium">Escanea para conectar directamente</p>
                        </div>

                        <div className="p-6 bg-white rounded-[2.5rem] shadow-2xl border-[1px] border-black/5 relative group/qr">
                            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-xl opacity-0 group-hover/qr:opacity-100 transition-opacity"></div>
                            {qrCodeUrl ? (
                                <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} className="rounded-xl relative z-10"/>
                            ) : (
                                <div className="h-[200px] w-[200px] bg-muted animate-pulse rounded-xl" />
                            )}
                        </div>
                        
                        <div className="mt-12 space-y-4 w-full">
                            <Button variant="outline" size="sm" className="w-full rounded-2xl h-11 border-primary/10 hover:bg-primary/5" onClick={(e) => { e.stopPropagation(); window.open(userData.website); }}>
                                <Globe className="mr-2 h-4 w-4" /> Visitar Website
                            </Button>
                            <Button variant="ghost" size="sm" className="no-print rounded-xl font-bold opacity-60 hover:opacity-100" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                                <RefreshCcw className="mr-2 h-3.5 w-3.5" /> Volver al frente
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
                <Button className="flex-1 h-14 font-black rounded-2xl shadow-xl btn-3d-primary text-base" onClick={handleSaveContact}>
                    <Download className="mr-2 h-5 w-5"/> Guardar VCF
                </Button>
                <Button variant="secondary" className="flex-1 h-14 font-black rounded-2xl shadow-md text-base" onClick={handleShare}>
                    <Share2 className="mr-2 h-5 w-5"/> Compartir
                </Button>
            </motion.div>
            
            <Button 
                variant="link" 
                className="mt-10 text-muted-foreground font-black uppercase text-[10px] tracking-[0.3em] no-print hover:text-primary transition-all flex items-center gap-2" 
                onClick={handlePrint}
            >
                <Printer className="h-3 w-3" />
                no le cambies el nombre solo quiero que se imprima y ya
            </Button>
        </div>
    );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
