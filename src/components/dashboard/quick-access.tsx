

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function QuickAccess() {
    const pathname = usePathname();

    return (
        <Accordion type="multiple" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJuridicoGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none bg-card/50 backdrop-blur-sm rounded-xl p-4">
                <AccordionTrigger className="px-2 hover:no-underline font-semibold text-lg hover:bg-accent rounded-md">
                   <div className="flex items-center gap-3">
                      <group.icon className="h-5 w-5 text-primary" />
                      <span>{group.title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2">
                   <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={`${item.href}-${item.label}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          className="justify-start h-9"
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4 mr-2" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
    )
}
