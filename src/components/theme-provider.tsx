"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

function ThemedBody({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    React.useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode-gradient');
        } else {
            document.body.classList.remove('light-mode-gradient');
        }
    }, [theme]);

    return <>{children}</>;
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
        <ThemedBody>
            {children}
        </ThemedBody>
    </NextThemesProvider>
  )
}
