
'use client';

import {
  adminNavGroups,
  legalNavGroups,
  ventasNavGroups,
  rrhhNavGroups,
  sociosNavGroups,
  informaticaNavGroups,
  marketingNavGroups,
  naturalMenuItems,
} from "@/components/app-sidebar-nav-items";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
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

type User = {
  name: string;
  email: string;
  fallback: string;
};

const getNavGroupsForUser = (user: User) => {
    switch (user.fallback) {
        case "A": return adminNavGroups;
        case "L": return legalNavGroups;
        case "V": return ventasNavGroups;
        case "RH": return rrhhNavGroups;
        case "S": return sociosNavGroups;
        case "IT": return informaticaNavGroups;
        case "M": return marketingNavGroups;
        case "UN": return Object.values(naturalMenuItems);
        default: return [];
    }
}

export function AppHeader({ user }: { user: User }) {
  const pathname = usePathname();
  const navGroups = getNavGroupsForUser(user);

  const dashboardHref = user.fallback === "UN" ? "/dashboard" : "/dashboard-empresa";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
            <Link href={dashboardHref} className="flex items-center gap-3">
                <Logo />
                <span className="text-xl font-bold hidden sm:inline-block">Kyron</span>
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
              <SheetContent side="left" className="w-full max-w-sm">
                <SheetHeader>
                    <Link href={dashboardHref} className="flex items-center gap-3 mb-4">
                        <Logo />
                        <span className="text-xl font-bold">Kyron</span>
                    </Link>
                </SheetHeader>
                 <ScrollArea className="h-[calc(100%-4rem)]">
                    <nav className="flex flex-col gap-2 p-4">
                      {navGroups.map((group) => (
                        <div key={group.title}>
                          <h4 className="font-semibold text-sm text-muted-foreground px-2 py-1 flex items-center gap-2">
                            <group.icon className="h-4 w-4" />
                            {group.title}
                          </h4>
                          {group.subGroups && group.subGroups.length > 0 ? (
                            group.subGroups.map(subGroup => (
                              <div key={subGroup.title} className="pl-2">
                                <h5 className="font-semibold text-xs text-muted-foreground px-2 py-1 mt-2 flex items-center gap-2">
                                  <subGroup.icon className="h-4 w-4" />
                                  {subGroup.title}
                                </h5>
                                {subGroup.items.map(item => (
                                  <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full">
                                    <Link href={item.href}>
                                      <item.icon className="mr-2 h-4 w-4" />
                                      {item.label}
                                    </Link>
                                  </Button>
                                ))}
                              </div>
                            ))
                          ) : (
                            group.items.map((item) => (
                                <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full">
                                  <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                  </Link>
                                </Button>
                            ))
                          )}
                        </div>
                      ))}
                    </nav>
                 </ScrollArea>
              </SheetContent>
            </Sheet>
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
                <Link href="/general">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">Cerrar Sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
