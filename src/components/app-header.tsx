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
import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
    Menu, 
    Bell, 
    LogOut, 
    Search, 
    Lock,
    LayoutGrid
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface AppHeaderProps {
    user: any;
    navGroups?: any[];
    dashboardHref: string;
}

export function AppHeader({ user, navGroups = [], dashboardHref }: AppHeaderProps) {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('es-VE', { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b bg-background/80 backdrop-blur-xl h-16 flex items-center">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between w-full">
          
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><Menu className="h-5 w-5" /></Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <div className="p-6 border-b mb-4 flex items-center gap-3">
                      <Logo className="h-8 w-8" />
                      <span className="font-bold text-lg tracking-tight">System Kyron</span>
                  </div>
                  <nav className="px-4 space-y-2">
                      <Button variant="ghost" asChild className="w-full justify-start h-11"><Link href="/dashboard"><LayoutGrid className="mr-3 h-5 w-5"/> Dashboard</Link></Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Link href={dashboardHref} className="flex items-center gap-2 lg:hidden">
              <Logo className="h-7 w-7" />
              <span className="font-bold text-sm tracking-tight">System Kyron</span>
            </Link>
            <div className="hidden lg:block">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Misión: Operaciones</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <div className="hidden md:flex flex-col items-end gap-0 mr-2">
                <span className="text-xs font-mono font-bold tracking-tight text-primary">
                    {time || '--:--:--'}
                </span>
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-50">Sync Active</span>
            </div>

            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative hover:bg-primary/5 transition-all">
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
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-2xl border bg-background/98">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold truncate tracking-tight">{user.name}</p>
                      <p className="text-xs text-muted-foreground font-medium truncate opacity-70">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/seguridad" className="flex items-center py-2 px-3">
                      <Lock className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg text-destructive focus:text-destructive focus:bg-destructive/5">
                  <Link href="/" className="flex items-center py-2 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-bold">Salir del Sistema</span>
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
