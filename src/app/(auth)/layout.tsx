
'use client';
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Building, User, ShoppingCart, Briefcase, Megaphone, Gavel, Cpu, Users, Banknote, AlertTriangle } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

const loginOptions = [
    { href: "/login-natural", label: "Acceso Personal", icon: User, description: "Para clientes individuales." },
    { href: "/login-fintech", label: "FinTech y Banca Digital", icon: Banknote, description: "Panel de control principal de la empresa." },
    { href: "/login-juridico", label: "Escritorio Jurídico", icon: Gavel, description: "Acceso para el departamento legal." },
    { href: "/login-ventas", label: "Ventas y Facturación", icon: ShoppingCart, description: "Acceso para cajeros y vendedores." },
    { href: "/login-rrhh", label: "Acceso RR.HH.", icon: Briefcase, description: "Portal para gestión de personal." },
    { href: "/login-socios", label: "Acceso Socios", icon: Users, description: "Dashboard para socios y directivos." },
    { href: "/login-marketing", label: "Productos y Marketing", icon: Megaphone, description: "Portal de marketing y asesoría." },
    { href: "/login-informatica", label: "Ingeniería e Informática", icon: Cpu, description: "Acceso para el equipo de IT." },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">System Kyron</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Acceder
                  <User className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Selecciona un Portal</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {loginOptions.map((opt) => (
                    <DropdownMenuItem key={opt.href} asChild>
                        <Link href={opt.href} className="flex items-center justify-start">
                          <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p>{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.description}</p>
                          </div>
                        </Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
       <div className="bg-yellow-400/10 border-y border-yellow-400/20 py-2">
            <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <p>
                    <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
                </p>
            </div>
        </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
