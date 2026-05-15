'use client';

export function OfficialSeal({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="inner-ring" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Outer decorative ring with dots */}
            <g>
                {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 15) - 90;
                    const rad = (angle * Math.PI) / 180;
                    const r = 170;
                    const cx = 200 + r * Math.cos(rad);
                    const cy = 200 + r * Math.sin(rad);
                    return (
                        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#06b6d4" opacity={i % 2 === 0 ? 0.8 : 0.3} />
                    );
                })}
            </g>

            {/* Outer ring */}
            <circle cx="200" cy="200" r="160" fill="none" stroke="url(#ring-grad)" strokeWidth="3" opacity="0.6" filter="url(#shadow)" />

            {/* Inner ring */}
            <circle cx="200" cy="200" r="145" fill="none" stroke="url(#inner-ring)" strokeWidth="1.5" opacity="0.4" strokeDasharray="8 4" />

            {/* Middle ring */}
            <circle cx="200" cy="200" r="130" fill="none" stroke="url(#ring-grad)" strokeWidth="1" opacity="0.3" strokeDasharray="2 6" />

            {/* Top arc text: SYSTEM KYRON */}
            <path id="top-arc" d="M 80 200 A 120 120 0 0 1 320 200" fill="none" />
            <text fontSize="18" fontWeight="900" letterSpacing="8" fill="url(#text-grad)" filter="url(#glow)">
                <textPath href="#top-arc" startOffset="50%" textAnchor="middle">SYSTEM KYRON</textPath>
            </text>

            {/* Bottom arc text: OFICIAL */}
            <path id="bottom-arc" d="M 320 200 A 120 120 0 0 1 80 200" fill="none" />
            <text fontSize="14" fontWeight="900" letterSpacing="12" fill="url(#text-grad)" opacity="0.7" filter="url(#glow)">
                <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">• OFICIAL •</textPath>
            </text>

            {/* Center star / emblem */}
            <g transform="translate(200, 170)">
                <polygon
                    points="0,-40 9.4,-12.4 38,-12.4 15,4.6 23.4,32.4 0,16 -23.4,32.4 -15,4.6 -38,-12.4 -9.4,-12.4"
                    fill="url(#star-grad)"
                    filter="url(#glow)"
                    opacity="0.9"
                />
            </g>

            {/* Shield shape behind K */}
            <g transform="translate(200, 200)">
                <path d="M-25,-5 L-30,10 L0,35 L30,10 L25,-5 Z" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.3" />
            </g>

            {/* K monogram */}
            <text x="200" y="215" textAnchor="middle" fontSize="48" fontWeight="900" fill="url(#star-grad)" fontStyle="italic" filter="url(#glow)">
                K
            </text>

            {/* Bottom text: RIF J-50832149-9 */}
            <text x="200" y="270" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b" letterSpacing="3">
                RIF J-50832149-9
            </text>

            {/* Year */}
            <text x="200" y="285" textAnchor="middle" fontSize="10" fontWeight="900" fill="#06b6d4" letterSpacing="4" opacity="0.8">
                2026
            </text>

            {/* Corner decorative elements */}
            <g opacity="0.2">
                <line x1="60" y1="60" x2="85" y2="85" stroke="#06b6d4" strokeWidth="1" />
                <line x1="60" y1="85" x2="85" y2="60" stroke="#06b6d4" strokeWidth="1" />
                <line x1="340" y1="60" x2="315" y2="85" stroke="#06b6d4" strokeWidth="1" />
                <line x1="340" y1="85" x2="315" y2="60" stroke="#06b6d4" strokeWidth="1" />
                <line x1="60" y1="340" x2="85" y2="315" stroke="#06b6d4" strokeWidth="1" />
                <line x1="60" y1="315" x2="85" y2="340" stroke="#06b6d4" strokeWidth="1" />
                <line x1="340" y1="340" x2="315" y2="315" stroke="#06b6d4" strokeWidth="1" />
                <line x1="340" y1="315" x2="315" y2="340" stroke="#06b6d4" strokeWidth="1" />
            </g>

            {/* Verification checkmark */}
            <g transform="translate(200, 310)" opacity="0.6">
                <circle cx="0" cy="0" r="10" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                <polyline points="-4,0 -1,3 5,-3" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
}
