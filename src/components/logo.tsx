
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Kyron Logo"
      >
        <defs>
          <linearGradient id="kyron-hex-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#040434" />
            <stop offset="1" stopColor="#1a1a90" />
          </linearGradient>
          <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Hexagonal Background Traced from User Image */}
        <path
          d="M20 2L36.5 11.5V28.5L20 38L3.5 28.5V11.5L20 2Z"
          fill="url(#kyron-hex-gradient)"
        />
        
        {/* White Symbol Traced from User Image */}
        <g filter="url(#logo-shadow)" transform="translate(4, 4) scale(0.8)">
          <path
            d="M28.5 4L11 21.5H19.75L37.25 4H28.5Z"
            fill="white"
          />
          <path
            d="M11 21.5L2.25 30.25H11L19.75 21.5H11Z"
            fill="white"
          />
          <path
            d="M19.75 21.5L28.5 30.25H19.75L11 21.5H19.75Z"
            fill="white"
            fillOpacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}
