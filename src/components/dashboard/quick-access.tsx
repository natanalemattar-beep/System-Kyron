'use client';

import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/navigation";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

type NavItem = {
    href: string;
    label: string;
    icon: React.ElementType;
};

type NavGroup = {
    title: string;
    icon: React.ElementType;
    items: NavItem[];
    subGroups?: {
        title: string;
        icon: React.ElementType;
        items: NavItem[];
    }[];
};

interface QuickAccessProps {
  navGroups?: NavGroup[];
}

export function QuickAccess({ navGroups }: QuickAccessProps) {
    const groupsToShow = navGroups || (adminNavGroups as NavGroup[]).filter(g => 
        g.title === "Ventas y Facturación" ||
        g.title === "Finanzas y Contabilidad" || 
        g.title === "Impuestos y Cumplimiento" ||
        g.title === "RRHH"
    );
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {groupsToShow.map((group) => (
          (group.items.length > 0 || (group.subGroups?.length ?? 0) > 0) && (
            <div key={group.title} className="w-full">
                <Card className="glass-card border-none h-full flex flex-col group overflow-hidden rounded-[1.5rem]">
                    <CardHeader className="p-4 md:p-6 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="flex items-center gap-2.5 md:gap-3">
                            <div className="p-2 md:p-2.5 bg-primary/10 rounded-lg md:rounded-xl border border-primary/10 shadow-inner group-hover:scale-105 transition-transform">
                                <group.icon className="h-4 w-4 md:h-5 md:w-5 text-primary"/>
                            </div>
                            <span className="text-[11px] md:text-[10px] font-bold uppercase tracking-wide md:tracking-wide text-white/70">{group.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 flex-grow">
                        <div className="flex flex-col gap-1.5 md:gap-2">
                            {(group.subGroups && group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items) : group.items).slice(0, 6).map((item) => (
                            <Button
                                key={`${item.href}-${item.label}`}
                                asChild
                                variant="ghost"
                                className="justify-between h-8 md:h-9 w-full px-2 md:px-3 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-white/[0.01] border border-white/5 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                            >
                                <Link href={item.href as any}>
                                    <div className="flex items-center gap-2 md:gap-2.5">
                                        <item.icon className="h-3 w-3 md:h-3.5 md:w-3.5 opacity-30 group-hover:opacity-100" />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight className="h-2.5 w-2.5 md:h-3 md:w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
          )
          ))}
      </div>
    )
}
