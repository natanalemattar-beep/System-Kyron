
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
import { Cog, Menu, ShieldCheck } from "lucide-react";
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
    navGroups: NavGroup[];
    dashboardHref: string;
}

export function AppHeader({ user, navGroups, dashboardHref }: AppHeaderProps) {
  const pathname = usePathname();

  const isLinkActive = (itemHref: string) => {
    if (itemHref === '/') return pathname === '/';
    // Match dashboard links exactly
    if (itemHref.includes("dashboard")) return pathname === itemHref;
    // For other links, check if the path starts with the href
    return pathname.startsWith(itemHref);
  }

  const isGroupActive = (group: NavGroup) => {
    // Check if any item in the main group is active
    if (group.items.some(item => isLinkActive(item.href))) {
      return true;
    }
    // Check if any item in any subgroup is active
    return group.subGroups.some(subGroup => 
      subGroup.items.some(item => isLinkActive(item.href))
    );
  };


  return (
    <motion.header 
      className="sticky top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 20,
        mass: 1,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between border-b">
        <div className="flex items-center gap-6">
            <Link href={dashboardHref} className="flex items-center gap-3">
                <Logo />
                <span className="text-xl font-bold hidden sm:inline-block">System Kyron</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
                 {navGroups.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                    "gap-1",
                                    isGroupActive(group) && "bg-accent text-accent-foreground"
                                )}
                            >
                                {group.title}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {group.subGroups && group.subGroups.length > 0 ? group.subGroups.map((subGroup) => (
                              <div key={subGroup.title}>
                                <DropdownMenuLabel>{subGroup.title}</DropdownMenuLabel>
                                {subGroup.items.map((item) => (
                                  <DropdownMenuItem key={item.href} asChild>
                                    <Link href={item.href} className={cn("flex items-center", isLinkActive(item.href) && "font-bold text-primary")}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                              </div>
                            ))
                          : 
                            group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link href={item.href} className={cn("flex items-center", isLinkActive(item.href) && "font-bold text-primary")}>
                                        <item.icon className="mr-2 h-4 w-4" />
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
        <div className="flex items-center gap-4">
           {/* Mobile Menu */}
           <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Abrir Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle asChild>
                      <Link href={dashboardHref} className="flex items-center gap-3">
                          <Logo />
                          <span className="text-xl font-bold">System Kyron</span>
                      </Link>
                    </SheetTitle>
                </SheetHeader>
                 <ScrollArea className="flex-grow">
                    <nav className="p-4">
                        <Accordion type="multiple" className="w-full">
                          {navGroups.map((group) => (
                            <AccordionItem value={group.title} key={group.title}>
                                <AccordionTrigger>
                                    <h4 className="font-semibold text-base flex items-center gap-2">
                                        <group.icon className="h-5 w-5 text-primary"/>
                                        {group.title}
                                    </h4>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-1 pl-4">
                                        {group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items).map(item => (
                                            <Button key={item.href} asChild variant={isLinkActive(item.href) ? "secondary" : "ghost"} className="justify-start">
                                                <Link href={item.href}>
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    {item.label}
                                                </Link>
                                            </Button>
                                        )) : group.items.map(item => (
                                             <Button key={item.href} asChild variant={isLinkActive(item.href) ? "secondary" : "ghost"} className="justify-start">
                                                <Link href={item.href}>
                                                    <item.icon className="mr-2 h-4 w-4" />
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
                  <div className="p-4 border-t mt-auto">
                      <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/">
                              Cerrar Sesión
                          </Link>
                      </Button>
                  </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                 <p className="font-semibold">{user.name}</p>
                 <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/seguridad" className="flex items-center justify-start">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Seguridad</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/general" className="flex items-center justify-start">
                    <Cog className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Cerrar Sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
      </div>
    </motion.header>
  );
}
