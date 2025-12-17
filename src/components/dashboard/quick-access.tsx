
'use client';

import {
  adminNavGroups
} from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

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
    
    // Default to adminNavGroups if no specific groups are passed
    const groupsToShow = navGroups || adminNavGroups.filter(g => 
        g.title === "Facturación" ||
        g.title === "Finanzas y Contabilidad" || 
        g.title === "Impuestos y Cumplimiento" ||
        g.title === "Recursos Humanos"
    );
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groupsToShow.map((group) => (
          (group.items.length > 0 || group.subGroups.length > 0) && (
            <div key={group.title} className="w-full">
                <Card className="bg-card/50 backdrop-blur-sm h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <group.icon className="h-6 w-6 text-primary"/>
                            {group.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="flex flex-col gap-2">
                            {(group.subGroups && group.subGroups.length > 0 ? group.subGroups.flatMap(sg => sg.items) : group.items).slice(0, 5).map((item) => (
                            <div key={`${item.href}-${item.label}`}>
                                <Button
                                asChild
                                variant="secondary"
                                className="justify-start h-9 w-full text-xs sm:text-sm"
                                >
                                <Link href={item.href}>
                                    <item.icon className="h-4 w-4 mr-2" />
                                    <span>{item.label}</span>
                                </Link>
                                </Button>
                            </div>
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
