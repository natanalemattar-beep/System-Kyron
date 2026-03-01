
'use client';

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/navigation";
import { Logo } from "./logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
    Menu, 
    Bell, 
    LogOut, 
    Lock,
    LayoutGrid,
    Search,
    Clock
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface AppHeaderProps {
    user: any;
    navGroups?: any[];
    dashboardHref: string;
}

export function AppHeader({ user, dashboardHref }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => setTime(new Date().toLocaleTimeString('es-VE', { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b bg-background/80 backdrop-blur-xl h-16 flex items-center shadow-sm">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between w-full">
          
          {/* Left: Mobile Menu & Search */}
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><Menu className="h-5 w-5" /></Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <div className="p-6 border-b mb-4 flex items-center gap-3">
                      <Logo className="h-8 w-8" />
                      <span className="font-bold text-lg tracking-tight text-primary">System Kyron</span>
                  </div>
                  <nav className="px-4 space-y-2">
                      <Button variant="ghost" asChild className="w-full justify-start h-11">
                        <Link href={dashboardHref as any}><LayoutGrid className="mr-3 h-5 w-5"/> Dashboard</Link>
                      </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="hidden md:flex relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  placeholder="Buscar en el sistema..." 
                  className="pl-9 h-9 w-[200px] lg:w-[300px] bg-secondary/30 border-none rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary/20" 
                />
            </div>
          </div>

          {/* Right: Time, Notifs, Theme, Profile - FORCED TO RIGHT */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex flex-col items-end gap-0">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-tight text-primary">
                    <Clock className="h-3 w-3" />
                    {mounted ? time : '--:--:--'}
                </div>
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-50 italic">System Synced</span>
            </div>

            <div className="h-8 w-px bg-border/50 hidden md:block" />

            <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative hover:bg-primary/5 transition-all rounded-lg">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full border p-0 overflow-hidden hover:border-primary/50 transition-all shadow-sm">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="font-bold text-[10px] bg-primary/10 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border bg-background/98 backdrop-blur-xl">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold truncate tracking-tight">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold truncate opacity-70 uppercase tracking-widest">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <Lock className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Seguridad de Cuenta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl text-destructive focus:text-destructive focus:bg-destructive/5">
                  <Link href="/" className="flex items-center py-2.5 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-bold">Cerrar Sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
