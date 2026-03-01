
'use client';

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { User, LayoutGrid, Cpu, Users, HelpCircle, Phone, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingSidebar() {
    const pathname = usePathname();

    const navLinks = [
      { href: "#inicio", label: "Inicio", icon: LayoutGrid },
      { href: "/ecosistema", label: "Ecosistema", icon: Info },
      { href: "#tecnologia", label: "Tecnología", icon: Cpu },
      { href: "#nosotros", label: "Nosotros", icon: Users },
      { href: "#faq", label: "FAQ", icon: HelpCircle },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r hidden lg:flex flex-col z-[110] shadow-2xl">
            <div className="p-8 border-b flex flex-col items-center gap-4">
                <Logo className="h-16 w-16" />
                <div className="text-center">
                    <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">System Kyron</span>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">Misión Crítica</p>
                </div>
            </div>

            <nav className="flex-grow py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.3em] mb-6 px-4 italic">Navegación</p>
                {navLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href as any}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                    >
                        <link.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t bg-muted/20 space-y-4">
                <div className="flex justify-center mb-2">
                    <ThemeToggle />
                </div>
                <Button variant="outline" asChild className="w-full justify-center h-11 rounded-xl gap-2 font-black uppercase text-[9px] tracking-widest border-primary/10 hover:bg-primary/5">
                    <Link href="/login">Acceder <User className="h-3.5 w-3.5" /></Link>
                </Button>
                <Button asChild className="w-full justify-center h-11 rounded-xl btn-3d-primary text-[9px] uppercase tracking-[0.2em] shadow-lg">
                    <Link href="/register">REGISTRO</Link>
                </Button>
            </div>
        </aside>
    )
}
