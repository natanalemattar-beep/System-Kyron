
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
    Clock,
    LayoutGrid,
    ChevronDown,
    Sparkles
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
    navGroups?: {
        title: string;
        icon: any;
        items: { href: string; label: string; icon: any }[];
    }[];
}

export function AppHeader({ user, dashboardHref, navGroups }: AppHeaderProps) {
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
          
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10"><Menu className="h-5 w-5" /></Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 flex flex-col">
                  <div className="p-6 border-b mb-4 flex items-center gap-3">
                      <Logo className="h-8 w-8" />
                      <span className="font-black text-lg tracking-tighter uppercase text-primary">System Kyron</span>
                  </div>
                  <nav className="px-4 space-y-6 flex-grow overflow-y-auto custom-scrollbar">
                      <Button variant="secondary" asChild className="w-full justify-start h-11 rounded-xl">
                        <Link href={dashboardHref as any}><LayoutGrid className="mr-3 h-5 w-5"/> Dashboard</Link>
                      </Button>
                      
                      {navGroups?.map(group => (
                        <div key={group.title} className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 px-4">{group.title}</p>
                          <div className="space-y-1">
                            {group.items.map(item => (
                              <Button key={item.href} variant="ghost" asChild className="w-full justify-start h-10 rounded-xl text-xs font-bold">
                                <Link href={item.href as any}>
                                  <item.icon className="mr-3 h-4 w-4" />
                                  {item.label}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[50vw]">
                <Button variant="ghost" asChild className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary/5 text-primary shrink-0">
                    <Link href={dashboardHref as any}><LayoutGrid className="mr-2 h-4 w-4"/> Dashboard</Link>
                </Button>
                
                {navGroups && (
                  <div className="flex items-center gap-1">
                    {navGroups.map(group => (
                      <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-10 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary/10 whitespace-nowrap">
                            {group.title} <ChevronDown className="ml-1.5 h-3 w-3 opacity-40" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 p-2 rounded-2xl shadow-2xl border">
                          <DropdownMenuLabel className="px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Módulos de {group.title}</DropdownMenuLabel>
                          {group.items.map(item => (
                            <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                              <Link href={item.href as any} className="flex items-center py-2 px-3">
                                <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs font-bold">{item.label}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ))}
                  </div>
                )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 shrink-0">
            <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-primary">
                    <Clock className="h-3 w-3" />
                    {mounted ? time : '--:--:--'}
                </div>
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40 italic">System Synced</span>
            </div>

            <div className="h-8 w-px bg-border/50 hidden md:block" />

            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground relative hover:bg-primary/5 transition-all rounded-xl">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-3 right-3 h-1.5 w-1.5 bg-red-500 rounded-full" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border p-0 overflow-hidden hover:border-primary/50 transition-all shadow-md">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className={cn("font-black text-[10px] text-white uppercase", user.color || "bg-primary/10 text-primary")}>
                        {user.fallback}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border bg-background/98 backdrop-blur-xl">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-black truncate tracking-tight uppercase">{user.name}</p>
                      <p className="text-[9px] text-muted-foreground font-bold truncate opacity-60 uppercase tracking-widest">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <Lock className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-bold">Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl text-destructive focus:text-destructive focus:bg-destructive/5">
                  <Link href="/" className="flex items-center py-2.5 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-black uppercase">Cerrar Sesión</span>
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
