
'use client';

import {
  FileText,
  Gavel,
  BookOpen,
  ShoppingCart,
  Globe,
  HardHat,
  BrainCircuit,
  Cog,
  Briefcase,
  Megaphone,
} from "lucide-react";
import {
  allAdminGroups,
} from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function QuickAccess() {
    const pathname = usePathname();
    const { state } = useSidebar();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allAdminGroups.map((group) => (
              <Card key={group.title} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <group.icon className="h-6 w-6 text-primary"/>
                        {group.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={`${item.href}-${item.label}`}>
                            <SidebarMenuButton
                              asChild
                              className="justify-start h-10 w-full mb-2 bg-secondary/50"
                            >
                              <Link href={item.href}>
                                <item.icon className="h-4 w-4 mr-2" />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </CardContent>
              </Card>
            ))}
        </div>
    )
}
