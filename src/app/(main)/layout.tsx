
'use client';

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <div className="w-full">
            {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
