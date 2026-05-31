"use client";

import React from 'react';
import { 
    Circle, 
    Home,
    Mail,
    BookOpen
} from 'lucide-react';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Hub', href: '/brand-kit', icon: Home },
    { name: 'Manual KYRON', href: '/brand-kit/manual-usuario', icon: BookOpen },
    { name: 'Stickers', href: '/stickers', icon: Circle },
    { name: 'Cartas', href: '/cartas', icon: Mail },
];

export function ResourceHeader() {
    const pathname = usePathname();

    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-fit print:hidden pointer-events-none">
            <header className="pointer-events-auto flex items-center gap-1 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-lg">
                <div className="flex items-center justify-center h-8 w-8 bg-zinc-800 rounded-md mr-1">
                    <span className="text-[10px] font-black text-zinc-300 tracking-tight">SK</span>
                </div>

                <div className="w-px h-4 bg-zinc-700" />

                <nav className="flex items-center gap-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/brand-kit' && (pathname === item.href || pathname.startsWith(item.href + '/')));
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href as any}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors",
                                    isActive ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                <span className="hidden md:inline">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="w-px h-4 bg-zinc-700" />

                <div className="pl-2 pr-1 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                    <span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">System Kyron</span>
                </div>
            </header>
        </div>
    );
}
