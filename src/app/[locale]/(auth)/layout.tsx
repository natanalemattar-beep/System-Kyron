'use client';

import { ReactNode, useEffect } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        const html = document.documentElement;
        const wasDark = html.classList.contains('dark');
        html.classList.remove('dark');
        html.style.colorScheme = 'light';
        return () => {
            if (wasDark) {
                html.classList.add('dark');
                html.style.colorScheme = 'dark';
            }
        };
    }, []);

    return (
        <main className="min-h-screen">
            {children}
        </main>
    );
}
