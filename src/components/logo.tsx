
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-10 h-10", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--primary) / 0.7)", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Shield/K shape */}
        <path
          d="M20 10 L50 10 L80 40 L80 60 L50 90 L20 90 Z"
          fill="url(#logoGradient)"
          transform="skewX(-10)"
        />
        
        {/* Inner detail */}
        <path
          d="M50 30 L65 45 L65 55 L50 70 Z"
          fill="hsl(var(--primary-foreground) / 0.5)"
          transform="skewX(-10)"
        />
      </svg>
    </div>
  );
}
