
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
  allJuridicoGroups,
} from "@/components/app-sidebar-nav-items";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function QuickAccess() {
    const pathname = usePathname();
    const { state } = useSidebar();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allJuridicoGroups.map((group) => (
              <div key={group.title} className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border">
                <h3 className="px-2 font-semibold text-lg flex items-center gap-3 mb-2">
                    <group.icon className="h-5 w-5 text-primary" />
                    <span>{group.title}</span>
                </h3>
                <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          className="justify-start h-9"
                          tooltip={item.label}
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span className={cn(state === 'collapsed' && 'hidden')}>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </div>
            ))}
        </div>
    )
}

    