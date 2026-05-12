"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Layout, 
    Circle, 
    FileText, 
    Presentation, 
    Sparkles, 
    ChevronRight,
    Home
} from 'lucide-react';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Hub', href: '/brand-kit', icon: Home },
    { name: 'Pitch', href: '/pitch', icon: Presentation },
    { name: 'Folleto', href: '/sector-privado-system-kyron', icon: Layout },
    { name: 'Stickers', href: '/stickers', icon: Circle },
    { name: 'Resumen', href: '/resumen-ejecutivo', icon: FileText },
];

export function ResourceHeader() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-[100] w-full bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 px-6 py-3 print:hidden">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                {/* Logo & Project */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 leading-none mb-1">System Kyron</p>
                        <p className="text-[12px] font-bold text-white uppercase tracking-tight">Recursos Elite</p>
                    </div>
                </div>

                {/* Navigation Pills */}
                <nav className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/brand-kit' && pathname.includes(item.href));
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    isActive 
                                        ? "bg-white text-black shadow-lg" 
                                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                <span className="hidden lg:inline">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Status / Edition */}
                <div className="hidden sm:flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Live Edition 2026</span>
                </div>
            </div>
        </header>
    );
}
