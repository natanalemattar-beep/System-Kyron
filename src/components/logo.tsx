
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Kyron logomark"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(180, 80%, 70%)", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path 
          d="M10 30 V 10 L 20 20 L 30 10 V 30" 
          stroke="url(#logo-gradient)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        <path 
          d="M20 20 L 30 30" 
          stroke="url(#logo-gradient)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
