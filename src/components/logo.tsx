
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
          <linearGradient id="kyron-hex-gradient" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#040434" />
            <stop offset="1" stopColor="#1a1a90" />
          </linearGradient>
          {/* Shadow filter to create the folded ribbon depth effect from the user's drawing */}
          <filter id="logo-depth-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Pointy-topped Hexagonal Background - Traced Proportions */}
        <path
          d="M20 2L37.32 12V30L20 40L2.68 30V12L20 2Z"
          fill="url(#kyron-hex-gradient)"
        />
        
        {/* White Symbol - Manual Trace of the folded ribbon/chevron shape from user input */}
        <g filter="url(#logo-depth-shadow)" transform="translate(4, 4) scale(0.8)">
          {/* Top segment: Slanting down from top-right to center-left */}
          <path
            d="M28.5 4L11 21.5H19.75L37.25 4H28.5Z"
            fill="white"
          />
          {/* Bottom-left segment: Slanting down from center to far bottom-left */}
          <path
            d="M11 21.5L2.25 30.25H11L19.75 21.5H11Z"
            fill="white"
          />
          {/* Bottom-right segment: Overlapping to create the depth/chevron look */}
          <path
            d="M19.75 21.5L28.5 30.25H37.25 30.25L28.5 21.5H19.75Z"
            fill="white"
            fillOpacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}
