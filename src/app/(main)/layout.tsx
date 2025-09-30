import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
         <header className="p-4 flex justify-between items-center border-b">
           <SidebarTrigger />
           <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Settings className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><LogOut className="h-5 w-5"/></Button>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
