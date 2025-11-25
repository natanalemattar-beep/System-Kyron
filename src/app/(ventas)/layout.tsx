

'use client';

import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function VentasLayout({ children }: { children: ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <div id="ventas-main-content-container" className="w-full overflow-y-auto">
        <SidebarInset>
           <header className="p-4 flex justify-between items-center border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-10 h-16 px-6 md:px-8">
             <div className="flex items-center gap-4">
              <SidebarTrigger />
             </div>
             <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href="/notificaciones">
                <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <Avatar>
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta (Ventas)</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                      <Link href="/punto-de-venta"><User className="mr-2"/>Perfil</Link>
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
          <main className="flex-1 p-4 md:p-8">
            <div className="w-full">
                {children}
            </div>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
