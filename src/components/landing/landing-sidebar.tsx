
'use client';

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { 
    LayoutGrid, 
    Cpu, 
    Users, 
    HelpCircle, 
    Smartphone, 
    Zap, 
    Magnet, 
    Phone,
    ShoppingCart,
    ShieldCheck,
    Contact,
    Package
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingSidebar() {
    const navLinks = [
      { href: "#inicio", label: "Inicio", icon: LayoutGrid },
      { href: "/ecosistema", label: "Ecosistema", icon: Zap },
      { href: "#servicios", label: "Servicios", icon: ShoppingCart },
      { href: "#tecnologia", label: "Tecnología", icon: Cpu },
      { href: "#nosotros", label: "Nosotros", icon: Users },
      { href: "#faq", label: "FAQ", icon: HelpCircle },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card/80 backdrop-blur-2xl border-r border-primary/10 hidden lg:flex flex-col z-[110] shadow-[10px_0_30px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Header del Sidebar con Brillo y Vida */}
            <div className="p-8 border-b border-primary/5 flex flex-col items-center gap-4 bg-gradient-to-b from-primary/[0.05] to-transparent">
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                    <Logo className="h-16 w-16 relative z-10" />
                </div>
                <div className="text-center relative z-10">
                    <span className="text-[11px] font-black tracking-[0.4em] text-primary uppercase italic">System Kyron</span>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                        <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Status: Operational</p>
                    </div>
                </div>
            </div>

            <nav className="flex-grow py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.3em] mb-6 px-4 italic">Navegación Maestro</p>
                {navLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href as any}
                        className="group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-primary/5 text-muted-foreground hover:text-primary relative overflow-hidden"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                        <link.icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                    </Link>
                ))}
                
                <div className="pt-8 px-4 space-y-4">
                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.3em] mb-4 italic">Comercialización</p>
                    <Link href="/venta-linea" className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">
                        <div className="p-1.5 bg-secondary/10 rounded-lg"><Magnet className="h-3.5 w-3.5 text-secondary" /></div>
                        Smart Bins (Magnet)
                    </Link>
                    <Link href="/venta-linea" className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">
                        <div className="p-1.5 bg-primary/5 rounded-lg"><Smartphone className="h-3.5 w-3.5 text-primary" /></div>
                        Smartphones Pro X
                    </Link>
                    <Link href="/venta-linea" className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">
                        <div className="p-1.5 bg-primary/5 rounded-lg"><Phone className="h-3.5 w-3.5 text-primary" /></div>
                        Números y Datos
                    </Link>
                </div>
            </nav>

            {/* Footer con Botones 3D */}
            <div className="p-6 border-t border-primary/5 bg-gradient-to-t from-primary/[0.03] to-transparent space-y-4">
                <div className="flex justify-center mb-2">
                    <ThemeToggle />
                </div>
                <Button variant="outline" asChild className="w-full justify-center h-12 rounded-xl gap-2 font-black uppercase text-[10px] tracking-widest border-primary/10 hover:bg-primary/5 shadow-inner">
                    <Link href="/login">Acceder <ShieldCheck className="h-4 w-4 text-primary" /></Link>
                </Button>
                <Button asChild className="w-full justify-center h-12 rounded-xl btn-3d-primary text-[10px] uppercase tracking-[0.2em] shadow-xl group">
                    <Link href="/register">REGISTRO <Zap className="ml-2 h-3.5 w-3.5 text-yellow-400 fill-yellow-400 group-hover:scale-125 transition-transform"/></Link>
                </Button>
            </div>
        </aside>
    )
}
