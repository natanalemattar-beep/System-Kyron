
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { loginOptions } from "@/lib/login-options";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

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

  return (
    <motion.header 
      className="sticky top-0 left-0 right-0 z-50"
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
        <div className="flex h-16 items-center justify-between px-4 md:px-6 rounded-none md:rounded-full mt-0 md:mt-4 border-b md:border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-6">
            <Link href={dashboardHref} className="flex items-center gap-3">
                <Logo />
                <span className="text-xl font-bold hidden sm:inline-block">System Kyron</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
                 {navGroups.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1">
                                {group.title}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {group.subGroups && group.subGroups.length > 0 ? (
                            group.subGroups.map((subGroup) => (
                              <DropdownMenuSub key={subGroup.title}>
                                <DropdownMenuSubTrigger>
                                  <subGroup.icon className="mr-2 h-4 w-4" />
                                  <span>{subGroup.title}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  {subGroup.items.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                      <Link href={item.href} className={cn("flex items-center", pathname === item.href && "font-bold text-primary")}>
                                          <item.icon className="mr-2 h-4 w-4" />
                                          {item.label}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                            ))
                          ) : (
                            group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link href={item.href} className={cn("flex items-center", pathname === item.href && "font-bold text-primary")}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                          )}
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
              <SheetContent side="left" className="w-full max-w-sm p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                    <Link href={dashboardHref} className="flex items-center gap-3">
                        <Logo />
                        <span className="text-xl font-bold">System Kyron</span>
                    </Link>
                </SheetHeader>
                 <ScrollArea className="h-[calc(100%-80px)]">
                    <Accordion type="multiple" className="w-full px-4 py-2">
                      {navGroups.map((group) => (
                        <AccordionItem value={group.title} key={group.title}>
                           <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline">
                              <div className="flex items-center gap-2">
                                <group.icon className="h-4 w-4" />
                                {group.title}
                              </div>
                           </AccordionTrigger>
                           <AccordionContent className="pb-2">
                                {(group.subGroups && group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items) : group.items).map((item) => (
                                <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full">
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                                ))}
                           </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                 </ScrollArea>
                  <div className="p-4 border-t">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" className="w-full justify-start">
                                Portales de Acceso
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start" className="w-64">
                             {loginOptions.map((opt) => (
                                <DropdownMenuItem key={opt.href} asChild>
                                  <Link href={opt.href} className="flex items-center justify-start">
                                      <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                      <p>{opt.label}</p>
                                    </Link>
                                </DropdownMenuItem>
                              ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Portales de Acceso</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {loginOptions.map((opt) => (
                        <DropdownMenuItem key={opt.href} asChild>
                           <Link href={opt.href} className="flex items-center justify-start">
                              <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <p>{opt.label}</p>
                            </Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/general">Configuración</Link>
              </DropdownMenuItem>
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
