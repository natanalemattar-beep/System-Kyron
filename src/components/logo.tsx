
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 102 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Next.js logomark"
      >
        <circle cx="51" cy="51" r="51" fill="url(#paint0_linear_216_2)"></circle>
        <path
          d="M75.19 28.93L40.87 73.05H26.81L61.13 28.93H75.19Z"
          fill="url(#paint1_linear_216_2)"
        ></path>
        <path
          d="M75.95 28.93H61.89L27.57 73.05H41.63L75.95 28.93Z"
          fill="white"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_216_2"
            x1="0"
            y1="0"
            x2="102"
            y2="102"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white"></stop>
            <stop offset="1" stopColor="white" stopOpacity="0.4"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_216_2"
            x1="51"
            y1="50.99"
            x2="26.81"
            y2="50.99"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#999999"></stop>
            <stop offset="1" stopColor="white" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
