import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src="/logo.png"
        alt="System Kyron Logo"
        width={120}
        height={120}
        className="w-auto h-auto object-contain"
        priority
      />
    </div>
  );
}