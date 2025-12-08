
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { loginOptions } from "@/lib/login-options";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function ImmersiveLandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-30"
      >
        <source src="https://cdn.coverr.co/videos/coverr-a-digital-background-of-plexus-and-dots-5673/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent -z-10"></div>
     
      {/* Simplified Header */}
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      )}>
          <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
              <Link href="/" className="flex items-center gap-3">
                  <Logo className="h-12 w-12"/>
                  <span className="text-2xl font-bold">System Kyron</span>
              </Link>
              <div className="flex items-center gap-2">
                 <LanguageSwitcher/>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="hidden sm:flex bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
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
                 <Button asChild className="hidden sm:flex">
                    <Link href="/register">Registrarse</Link>
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="sm:hidden">
                          <Menu />
                          <span className="sr-only">Abrir menú</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                      <SheetHeader>
                          <SheetTitle className="flex items-center gap-3">
                            <Logo />
                            <span className="text-xl font-bold">System Kyron</span>
                          </SheetTitle>
                      </SheetHeader>
                       <div className="mt-auto space-y-4">
                          <LanguageSwitcher/>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start">
                                  <User className="mr-2 h-4 w-4" />
                                  Acceder
                                  </Button>
                              </DropdownMenuTrigger>
                               <DropdownMenuContent align="end" side="top" className="w-64 mb-2">
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
                          <Button asChild className="w-full">
                              <Link href="/register">Registrarse</Link>
                          </Button>
                      </div>
                  </SheetContent>
              </Sheet>
              </div>
          </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="animate-fade-up space-y-8">
            <div className="flex justify-center">
                 <Logo className="h-32 w-32 md:h-40 md:w-40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">
                Inteligencia en Cada Transacción.
            </h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="lg" variant="outline" className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
                        Acceder a los Portales
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64">
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
      </main>

       {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} System Kyron. Todos los derechos reservados.
      </footer>
    </div>
  );
}
