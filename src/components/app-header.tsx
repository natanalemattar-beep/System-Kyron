'use client';

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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShieldCheck, ChevronDown, User, Cog, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type User = {
  name: string;
  email: string;
  fallback: string;
};

type NavItem = {
    href: string;
    label: string;
    icon: React.ElementType;
};

type NavGroup = {
    title: string;
    icon: React.ElementType;
    items: NavItem[];
    subGroups: {
        title: string;
        icon: React.ElementType;
        items: NavItem[];
    }[];
};

interface AppHeaderProps {
    user: User;
    navGroups?: NavGroup[];
    dashboardHref: string;
}

export function AppHeader({ user, navGroups, dashboardHref }: AppHeaderProps) {
  const pathname = usePathname();

  const isLinkActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
  }

  const isGroupActive = (group: NavGroup) => {
    if (!group) return false;
    const allHrefs = [
      ...group.items.map(i => i.href),
      ...(group.subGroups?.flatMap(sg => sg.items.map(i => i.href)) || [])
    ];
    return allHrefs.some(href => isLinkActive(href));
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl h-16 flex items-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-12">
            <Link href={dashboardHref} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-black tracking-tighter">KYRON</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-2">
                 {navGroups?.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                    "h-9 px-4 gap-1.5 font-bold text-[11px] uppercase tracking-[0.1em]",
                                    isGroupActive(group) && "bg-primary/5 text-primary"
                                )}
                            >
                                {group.title}
                                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 rounded-2xl shadow-2xl">
                          {group.subGroups?.length > 0 ? group.subGroups.map((subGroup) => (
                              <div key={subGroup.title}>
                                <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                  {subGroup.title}
                                </DropdownMenuLabel>
                                {subGroup.items.map((item) => (
                                  <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5", isLinkActive(item.href) && "bg-primary/5 font-bold text-primary")}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator className="my-2 opacity-50" />
                              </div>
                            ))
                          : 
                            group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5", isLinkActive(item.href) && "bg-primary/5 font-bold text-primary")}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                          }
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex">
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-offset-background hover:bg-secondary flex items-center justify-center p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="font-bold text-xs bg-primary/5">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl">
                <DropdownMenuLabel className="p-4 font-normal">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold leading-none">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <ShieldCheck className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">Seguridad de la Cuenta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/general" className="flex items-center py-2.5 px-3">
                      <Cog className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem asChild className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <Link href="/" className="flex items-center py-2.5 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-bold">Cerrar Sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl">
                    <Menu className="h-6 w-6"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-background/95 backdrop-blur-xl">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle asChild>
                      <Link href={dashboardHref} className="flex items-center gap-2">
                          <Logo className="h-8 w-8" />
                          <span className="text-xl font-black tracking-tighter">KYRON</span>
                      </Link>
                    </SheetTitle>
                </SheetHeader>
                 <ScrollArea className="flex-grow">
                    <nav className="p-4">
                        <Accordion type="multiple" className="w-full">
                          {navGroups?.map((group) => (
                            <AccordionItem value={group.title} key={group.title} className="border-none">
                                <AccordionTrigger className="hover:no-underline py-3">
                                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        <group.icon className="h-4 w-4 text-primary"/>
                                        {group.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4">
                                    <div className="flex flex-col gap-1 pl-7 mt-2">
                                        {(group.subGroups?.flatMap(sg => sg.items) || group.items).map(item => (
                                            <Button key={item.href} asChild variant={isLinkActive(item.href) ? "secondary" : "ghost"} className="justify-start h-10 px-3 rounded-xl text-sm font-medium">
                                                <Link href={item.href}>
                                                    <item.icon className="mr-3 h-4 w-4" />
                                                    {item.label}
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                    </nav>
                 </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}