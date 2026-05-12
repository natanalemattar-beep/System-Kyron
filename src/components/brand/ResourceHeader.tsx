"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Layout, 
    Circle, 
    FileText, 
    Presentation, 
    Sparkles, 
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
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-fit print:hidden pointer-events-none">
            <motion.header 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pointer-events-auto flex items-center gap-1.5 bg-[#09090b]/60 backdrop-blur-3xl px-2 py-1.5 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group hover:border-cyan-500/30 transition-colors duration-500"
            >
                {/* Logo Minimal */}
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 ml-1">
                    <Sparkles className="h-4 w-4 text-white" />
                </div>

                <div className="w-[1px] h-4 bg-white/10 mx-1" />

                {/* Navigation Pills */}
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/brand-kit' && pathname.includes(item.href));
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300",
                                    isActive 
                                        ? "bg-white text-black shadow-[0_5px_15px_rgba(255,255,255,0.2)]" 
                                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                                )}
                            >
                                <Icon className="h-3 w-3" />
                                <span className="hidden md:inline">{item.name}</span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-white rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="w-[1px] h-4 bg-white/10 mx-1" />

                {/* Status indicator simple */}
                <div className="pr-3 pl-1 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Elite</span>
                </div>
            </motion.header>
        </div>
    );
}
