'use client';

import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export function OfficialSeal({ className, variant }: { className?: string; variant?: 'default' | 'stamp' }) {
    const isStamp = variant === 'stamp';

    return (
        <div className={cn(
            "relative flex flex-col items-center justify-center",
            isStamp ? "bg-white/5 backdrop-blur-sm" : "",
            className
        )}>
            {/* Circular Seal Container */}
            <div className={cn(
                "relative",
                isStamp ? "p-1" : ""
            )}>
                <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="seal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <linearGradient id="seal-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <filter id="seal-shadow">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
                        </filter>
                        <clipPath id="circle-clip">
                            <circle cx="200" cy="200" r="195" />
                        </clipPath>
                    </defs>

                    {/* Outer border - thick like a real seal */}
                    <circle cx="200" cy="200" r="195" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.8" className="text-cyan-400" filter="url(#seal-shadow)" />
                    <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="text-cyan-400" />
                    <circle cx="200" cy="200" r="175" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" className="text-cyan-400" strokeDasharray="4 4" />

                    {/* Triangular notch markers (like real notary seals) */}
                    {Array.from({ length: 36 }).map((_, i) => {
                        const angle = (i * 10) - 90;
                        const rad = (angle * Math.PI) / 180;
                        const r1 = 190;
                        const r2 = i % 3 === 0 ? 182 : 186;
                        const x1 = 200 + r1 * Math.cos(rad);
                        const y1 = 200 + r1 * Math.sin(rad);
                        const x2 = 200 + r2 * Math.cos(rad);
                        const y2 = 200 + r2 * Math.sin(rad);
                        return (
                            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="currentColor" strokeWidth={i % 3 === 0 ? 2 : 0.8}
                                opacity={i % 3 === 0 ? 0.6 : 0.2}
                                className="text-cyan-400" />
                        );
                    })}

                    {/* Top arc: REPUBLICA BOLIVARIANA DE VENEZUELA */}
                    <path id="top-arc" d="M 50 200 A 150 150 0 0 1 350 200" fill="none" />
                    <text fontSize="11" fontWeight="700" letterSpacing="4" fill="currentColor" opacity="0.8" className="text-cyan-300">
                        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">REPÚBLICA BOLIVARIANA DE VENEZUELA</textPath>
                    </text>

                    {/* Bottom arc: SYSTEM KYRON */}
                    <path id="bottom-arc" d="M 350 200 A 150 150 0 0 1 50 200" fill="none" />
                    <text fontSize="16" fontWeight="900" letterSpacing="6" fill="url(#seal-cyan)" className="font-black">
                        <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
                    </text>

                    {/* Inner decorative ring */}
                    <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" className="text-cyan-400" />

                    {/* Logo in center */}
                    <foreignObject x="125" y="115" width="150" height="150" clipPath="url(#circle-clip)">
                        <div className="w-full h-full flex items-center justify-center">
                            <Logo className="w-32 h-32" />
                        </div>
                    </foreignObject>

                    {/* RIF below logo */}
                    <text x="200" y="290" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor" opacity="0.9" className="text-cyan-300" letterSpacing="2">
                        RIF J-50832149-9
                    </text>

                    {/* Year and verification */}
                    <text x="200" y="308" textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" opacity="0.5" className="text-cyan-400" letterSpacing="3">
                        2026 · VERIFICADO
                    </text>

                    {/* Small decorative stars */}
                    <g opacity="0.4" className="text-cyan-400">
                        <text x="200" y="325" textAnchor="middle" fontSize="10" fill="currentColor">✦</text>
                    </g>

                    {/* Corner ornaments */}
                    <g opacity="0.15" className="text-cyan-400">
                        <text x="50" y="55" textAnchor="middle" fontSize="18" fill="currentColor">◇</text>
                        <text x="350" y="55" textAnchor="middle" fontSize="18" fill="currentColor">◇</text>
                        <text x="50" y="365" textAnchor="middle" fontSize="18" fill="currentColor">◇</text>
                        <text x="350" y="365" textAnchor="middle" fontSize="18" fill="currentColor">◇</text>
                    </g>
                </svg>
            </div>

            {/* Stamp mode: additional paper-like styling */}
            {isStamp && (
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                    }}
                />
            )}
        </div>
    );
}
