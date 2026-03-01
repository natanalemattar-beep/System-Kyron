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
    subGroups: {
        title: string;
        icon: React.ElementType;
        items: NavItem[];
    }[];
};

interface QuickAccessProps {
  navGroups?: NavGroup[];
}

export function QuickAccess({ navGroups }: QuickAccessProps) {
    const pathname = usePathname();
    
    const groupsToShow = navGroups || adminNavGroups.filter(g => 
        g.title === "Ventas y Facturación" ||
        g.title === "Finanzas y Contabilidad" || 
        g.title === "Impuestos y Cumplimiento" ||
        g.title === "Recursos Humanos"
    );
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {groupsToShow.map((group) => (
          (group.items.length > 0 || group.subGroups.length > 0) && (
            <div key={group.title} className="w-full">
                <Card className="glass-card border-none h-full flex flex-col group overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                                <group.icon className="h-6 w-6 text-primary"/>
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/80">{group.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 flex-grow">
                        <div className="flex flex-col gap-3">
                            {(group.subGroups && group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items) : group.items).slice(0, 5).map((item) => (
                            <Button
                                key={`${item.href}-${item.label}`}
                                asChild
                                variant="ghost"
                                className="justify-between h-12 w-full px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-300"
                            >
                                <Link href={item.href as any}>
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4 opacity-40 group-hover:opacity-100" />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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