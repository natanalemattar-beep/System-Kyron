import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
          </linearGradient>
        </defs>
        {/* Hexagonal Background Layer */}
        <path
          d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z"
          className="fill-primary/5 stroke-primary/20"
          strokeWidth="1"
        />
        {/* Stylized 'K' geometric shapes */}
        <path
          d="M35 30V70"
          stroke="url(#logo-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M65 30L35 50L65 70"
          stroke="url(#logo-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary animate-pulse" />
      </svg>
    </div>
  );
}
