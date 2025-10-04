
"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";


export default function HrLayout({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    const handleScroll = () => {
        const currentScrollY = mainContent.scrollTop;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHeaderVisible(false);
        } else {
            setHeaderVisible(true);
        }
        setLastScrollY(currentScrollY);
    };

    mainContent.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        mainContent.removeEventListener('scroll', handleScroll);
    };
}, [lastScrollY]);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
         <header className={cn("p-4 flex justify-between items-center border-b bg-blue-200/30 backdrop-blur-md sticky top-0 z-10 h-16 px-6 md:px-8 transition-transform duration-300", {
           "-translate-y-full": !isHeaderVisible
         })}>
           <div className="flex items-center gap-4">
            <SidebarTrigger />
           </div>
           <div className="flex items-center gap-4">
            <Link href="/notificaciones">
              <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <Avatar>
                    <AvatarFallback>RRHH</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta (RR.HH.)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/dashboard-rrhh"><User className="mr-2"/>Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/seguridad"><Settings className="mr-2"/>Ajustes</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/"><LogOut className="mr-2"/>Cerrar Sesión</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="container mx-auto">
            <div className="animate-in fade-in duration-500">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

    
