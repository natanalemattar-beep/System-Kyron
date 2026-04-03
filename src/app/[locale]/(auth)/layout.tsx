'use client';

import { ReactNode, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const previousTheme = useRef<string | undefined>(undefined);

    useEffect(() => {
        previousTheme.current = theme;
        setTheme('light');
        return () => {
            if (previousTheme.current && previousTheme.current !== 'light') {
                setTheme(previousTheme.current);
            }
        };
    }, []);

    return (
        <main className="min-h-screen">
            {children}
        </main>
    );
}
