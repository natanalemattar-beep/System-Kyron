'use client';

import { ReactNode } from "react";
import { ConstructionBanner } from "@/components/construction-banner";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen">
            <ConstructionBanner />
            {children}
        </main>
    );
}
