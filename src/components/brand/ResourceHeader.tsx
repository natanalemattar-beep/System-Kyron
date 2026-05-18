"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Circle, 
    FileText, 
    Presentation, 
    Sparkles, 
    Home,
    Mail
} from 'lucide-react';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Hub', href: '/brand-kit', icon: Home },
    { name: 'Presentación', href: '/presentacion', icon: Presentation },
    { name: 'Stickers', href: '/stickers', icon: Circle },
    { name: 'Resumen', href: '/resumen-ejecutivo', icon: FileText },
    { name: 'Cartas', href: '/cartas', icon: Mail },
];

export function ResourceHeader() {
    const pathname = usePathname();

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-fit print:hidden pointer-events-none">
            <motion.header 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto flex items-center gap-1 bg-black/40 backdrop-blur-[32px] px-2 py-1.5 rounded-full border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] group transition-all duration-500 hover:border-white/20"
            >
                {/* Logo Minimal con Liquid Glow */}
                <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-zinc-950 border border-white/10 ml-1 group/logo overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 group-hover/logo:opacity-100 transition-opacity duration-500" />
                    <Sparkles className="h-4 w-4 text-white relative z-10" />
                    {/* Animated Glow behind logo */}
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" 
                    />
                </div>

                <div className="w-[1px] h-4 bg-white/10 mx-1.5" />

                {/* Navigation Pills - Liquid Style */}
                <nav className="flex items-center gap-1 relative">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/brand-kit' && (pathname === item.href || pathname.startsWith(item.href + '/')));
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href as any}
                                className={cn(
                                    "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-colors duration-500",
                                    isActive ? "text-black" : "text-zinc-500 hover:text-zinc-200"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5 relative z-10" />
                                <span className="hidden md:inline relative z-10">{item.name}</span>
                                
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-pill-liquid"
                                        className="absolute inset-0 bg-white rounded-full shadow-[0_10px_20px_rgba(255,255,255,0.2)]"
                                        transition={{
                                            duration: 0.45,
                                            ease: [0.23, 1, 0.32, 1]
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-zinc-200 opacity-50" />
                                    </motion.div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="w-[1px] h-4 bg-white/10 mx-1.5" />

                {/* Edition Tag Liquid */}
                <div className="pr-4 pl-1 flex items-center gap-2.5">
                    <div className="relative h-2 w-2">
                        <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-40" />
                        <div className="relative h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                    </div>
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] italic">System Kyron</span>
                </div>
            </motion.header>

            {/* Inset Shadow Border for depth */}
            <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm pointer-events-none" />
        </div>
    );
}
