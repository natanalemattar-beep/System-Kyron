
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
          <linearGradient id="kyron-brand-gradient" x1="14" y1="12" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--primary))" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        
        {/* Hexagonal Background Frame (Subtle) */}
        <path
          d="M20 2L35.5885 11V29L20 38L4.41154 29V11L20 2Z"
          className="fill-primary/5 stroke-primary/10"
          strokeWidth="1"
        />
        
        {/* Stylized Node 'K' */}
        <path
          d="M14 11V29"
          stroke="url(#kyron-brand-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M26 11L14 20L26 29"
          stroke="url(#kyron-brand-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Connection Pivot Point */}
        <circle 
          cx="14" 
          cy="20" 
          r="2.5" 
          className="fill-background stroke-primary" 
          strokeWidth="1.5" 
        />
      </svg>
    </div>
  );
}
