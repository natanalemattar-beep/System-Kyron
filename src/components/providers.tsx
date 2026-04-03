"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth/context';
import { PerformanceProvider } from '@/components/performance-provider';
import { SeasonalThemeProvider } from '@/components/seasonal-theme-provider';
import { SeasonalDecorations } from '@/components/seasonal-decorations';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="kyron-theme"
        >
            <PerformanceProvider>
                <AuthProvider>
                    <SeasonalThemeProvider>
                        {children}
                        <SeasonalDecorations />
                        <Toaster />
                    </SeasonalThemeProvider>
                </AuthProvider>
            </PerformanceProvider>
        </ThemeProvider>
    );
}
