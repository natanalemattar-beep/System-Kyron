
'use client';

import type { ReactNode } from "react";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head />
      <body>
        <Providers>
            <DynamicBackground />
            {children}
        </Providers>
      </body>
    </html>
  );
}
