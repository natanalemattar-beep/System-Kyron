
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
         <header className="p-4 flex justify-between items-center border-b bg-background sticky top-0 z-10 h-16">
           <div className="flex items-center gap-2">
            <SidebarTrigger />
            <ThemeToggle />
           </div>
           <div className="flex items-center gap-2">
            <Link href="/notificaciones">
              <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard"><User className="mr-2"/>Perfil</Link>
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
          <div className="animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
