
'use client';

import {
  adminNavGroups,
} from "@/components/app-sidebar-nav-items";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function QuickAccess() {
    return (
      <div className="relative">
        <ScrollArea>
            <div className="flex space-x-4 pb-4">
                {adminNavGroups.map((group) => (
                <div key={group.title} className="w-[320px]">
                    <Card className="bg-card h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <group.icon className="h-6 w-6 text-primary"/>
                                {group.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SidebarMenu>
                                {group.items.slice(0, 5).map((item) => ( // Show first 5 items
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
                </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    )
}
