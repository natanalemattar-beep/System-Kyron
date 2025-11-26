'use client';
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Building, User, ShoppingCart, Briefcase, Megaphone, Gavel, Cpu, Users, Banknote } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_50%)] dark:bg-grid-slate-700/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>

      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold">Kyron</span>
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
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link href="/login-natural">Acceso Personal</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-fintech">FinTech y Banca Digital</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-juridico">Escritorio Jurídico</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-ventas">Ventas y Facturación</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-rrhh">Acceso RR.HH.</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-socios">Acceso Socios</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-marketing">Productos, Asesoría y Marketing</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login-informatica">Ingeniería e Informática</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        {children}
      </main>
    </div>
  );
}
