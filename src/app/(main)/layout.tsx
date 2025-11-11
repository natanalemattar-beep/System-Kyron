

"use client";

import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on the main landing page
  if (pathname === "/") {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
  }

  return (
    <>
        {children}
        <Toaster />
    </>
  );
}
